import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isComponentOfType from './is-component-of-type';
import Tab from './tab';
import TabContent from './tabContent';
import './tabs.less';

const isTab = child => isComponentOfType(Tab, child);
const isTabContent = child => isComponentOfType(TabContent, child);
class Tabs extends Component {
  state = {
    activeKey: this.props.activeKey,
    arrows: {},
    newHeaderScrollx: 0,
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.activeKey !== nextProps.activeKey){
      this.setState({ activeKey: nextProps.activeKey },()=>{
        this.updateActivebar();
      });
    }
    if(this.props.children !== nextProps.children){
      this.handleResize();
    }
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();

  }
  componentWillUnmount() {
    window.removeEventListener('resize',this.handleResize);
  }
  handleResize = () => {
    if (this.resizeTimeout) {clearTimeout(this.resizeTimeout);}
    this.resizeTimeout = setTimeout(() => {
      this.updateContent();
      this.updateActivebar();
      this.updateArrows();
    }, 100);
  }
  nextHeader = () => {
    const { wWidth, hWidth, currentScrollx } = this.getWidthAndScrollx();
    let newHeaderScrollx;
    if (hWidth - currentScrollx >= wWidth * 2) {
      newHeaderScrollx = wWidth;
    } else {
      newHeaderScrollx = hWidth - currentScrollx - wWidth;
    }
    this.setState({ newHeaderScrollx: currentScrollx + newHeaderScrollx }, function () { this.updateArrows(); });
  }
  prevHeader = () => {
    const { wWidth, currentScrollx } = this.getWidthAndScrollx();
    let newHeaderScrollx;
    if (currentScrollx >= wWidth) {
      newHeaderScrollx = wWidth;
    } else {
      newHeaderScrollx = currentScrollx;
    }
    this.setState({ newHeaderScrollx: currentScrollx - newHeaderScrollx }, function () { this.updateArrows(); });
  }
  updateArrows() {
    const { wWidth, hWidth, maxScrollx, currentScrollx } = this.getWidthAndScrollx();
    let arrows = {
      hasArrows: wWidth < hWidth,
      hasRight: currentScrollx !== 0,
      hasLeft: currentScrollx !== maxScrollx,
    };
    this.setState({ arrows });
  }
  getWidthAndScrollx() {
    // scroll and header's width
    const wWidth = this.tabsRef.offsetWidth;
    const hWidth = this.headerRef.offsetWidth + 20;
    //max translate3dx
    const maxScrollx = hWidth - wWidth;
    const currentScrollx = this.state.newHeaderScrollx;
    return {
      wWidth,
      hWidth,
      maxScrollx,
      currentScrollx,
    };
  }
  updateContent=()=> {
    this.tabsRef&&this.setState({
      tabsWidth: this.tabsRef.offsetWidth - 1,
    });
  }
  updateActivebar() {
    if(!this.headerRef){return;}
    const headerChildren = this.headerRef.children;
    //find the index
    let index = this.findIndex();
    this.setState({
      barOffLeft: headerChildren[index].offsetLeft,
      width: headerChildren[index].offsetWidth,
    });
  }
  findIndex() {
    const theKey = this.state.activeKey ? this.state.activeKey : this.props.defaultActiveKey;
    const headers = this.parseChildren().headers;
    let index = 0;
    headers.map((item, idx) => {
      if (item.key === theKey) {
        index = idx;
      }
    });
    return index;
  }
  parseChildren() {
    const headers = [];
    const contents = [];

    React.Children.forEach(this.props.children, (item) => {
      if (isTab(item)) {
        headers.push(item);
        if (item.props.children) {
          if (!item.key) {
            throw new Error('please give each tab a unique key!');
          }
          contents.push(
            <TabContent key={item.key}>
              {item.props.children}
            </TabContent>
          );
        }
      } else if (isTabContent(item)) {
        contents.push(item);
      }
    });
    return { headers, contents };
  }
  verificateDefaultActiveKey(defaultActiveKey, arr) {
    let effective = false;
    arr.map((v) => {
      if (v.key === defaultActiveKey) { effective = true; }
    });
    return effective;
  }
  getActiveStatus(theKey, arr, effective) {
    const defaultActiveKey = this.props.defaultActiveKey;
    const activeKey = this.state.activeKey;
    //有默认值defaultActiveKey，但没有一个tab的key值等于他； 没有默认值
    if (activeKey)
    { return activeKey === theKey; }
    else if (defaultActiveKey) {
      if (effective)
      { return defaultActiveKey === theKey; }
      else
      { return arr[0].key === theKey; }
    }
    else
    { return arr[0].key === theKey; }
  }
  renderHeaders(headers) {
    const effective = this.verificateDefaultActiveKey(this.props.defaultActiveKey, headers);
    return headers.map((item, idx) => React.cloneElement(item, {
      children: null,
      key: item.key,
      type:this.props.type,
      active: this.getActiveStatus(item.key, headers, effective),
      onClick: (event, index) => {//回调
        this.handleHeaderClick(event, item.key);
        if (item.props.onClick) { item.props.onClick(event); }
      },
      handleRemove:(event, index)=>{
        this.handleRemove(event, item.key);
        if (item.props.onClick) { item.props.onClick(event); }        
      },
    }));
  }
  renderContents(contents) {
    const effective = this.verificateDefaultActiveKey(this.props.defaultActiveKey, contents);
    const contentElements = contents.map((item, index) => React.cloneElement(item, {
      key: item.key,
      active: this.getActiveStatus(item.key, contents, effective),
      tabIndex: index,
      style: { width: this.state.tabsWidth },
    }));
    return contentElements;
  }
  render() {
    const { headers, contents } = this.parseChildren();
    const { prefixCls, type, effect, children, className } = this.props;
    const { barOffLeft, width, tabsWidth, arrows, newHeaderScrollx } = this.state;
    const activeIndex = this.findIndex();
    const theClassName = classNames(
      className, `${prefixCls}`, `${prefixCls}-${type}`, `${prefixCls}-${effect}`,
    );
    const preIconClassName = classNames(`${prefixCls}-icon`, `${prefixCls}-icon-prev`, {
      ['feu-btn-disabled']: arrows.hasLeft,
    });
    const nextIconClassName = classNames(`${prefixCls}-icon`, `${prefixCls}-icon-next`, {
      ['feu-btn-disabled']: arrows.hasRight,
    });
    const headerStyle = {
      transform: `translate3d(-${arrows.hasArrows ? newHeaderScrollx : '0'}px, 0px, 0px)`,

    };
    const activebarStyle = {
      transform: `translate3d(${barOffLeft}px, 0px, 0px)`,
      width: `${width}px`,
    };
    let contentStyle = {
      width: children && tabsWidth && tabsWidth * children.length,
      transform: `translate3d(-${tabsWidth * activeIndex}px, 0px, 0px)`,
    };
    return (
      <div className={theClassName} ref={ref => this.tabsRef = ref}>
        <div className={`${prefixCls}-header-wrapper ${arrows.hasArrows ? `${prefixCls}-header-wrapper-hasarrows` : ''}`}>
          {arrows.hasArrows && <span className={preIconClassName} onClick={this.prevHeader}><i className="fa fa-angle-left" /></span>}
          {arrows.hasArrows && <span className={nextIconClassName} onClick={this.nextHeader}><i className="fa fa-angle-right" /></span>}
          <div className={`${prefixCls}-header-scroll`}>
            <div className={`${prefixCls}-header`} ref={(header) => this.headerRef = header} style={headerStyle}>
              {this.renderHeaders(headers)}
              <div className={`${prefixCls}-activebar`} role="activebar" style={activebarStyle} />
            </div>
          </div>
        </div>
        <div className={`${prefixCls}-content feu-clearfix`} style={contentStyle}>
          {this.renderContents(contents)}
        </div>
      </div>
    );
  }
  handleHeaderClick = (event, key) => {
    this.setState({ activeKey: key }, () => this.updateActivebar());

    this.props.onChange && this.props.onChange(event, key);
  }
  handleRemove=(event, key)=>{
    this.props.onRemove && this.props.onRemove(event, key);    
  }
}
Tabs.defaultProps = {
  prefixCls: 'feu-tabs',
  type: 'line',
  effect: 'normal',
};

Tabs.propTypes = {
  prefixCls: PropTypes.string,
  activeKey: PropTypes.string,
  defaultActiveKey: PropTypes.string,
  type: PropTypes.oneOf(['line', 'card','editable-card']),
  effect: PropTypes.oneOf(['normal', 'fade', 'scrollx']),
  className: PropTypes.string,
  children: PropTypes.node,
  onChange: PropTypes.func,
};
export default Tabs;