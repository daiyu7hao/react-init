import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Dot from './dot';
import './carousel.less';


class Carousel extends Component {
  state = {
    activeIndex: 0,
    width: 0,
    arrows: false,
  }
  componentDidMount() {
    this.startAutoPlay(this.props.autoPlay, this.props.interval);
    window.addEventListener('resize',this.handleResize);
    this.handleResize();
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.autoPlay!==nextProps.autoPlay || this.props.interval!==nextProps.interval){
      this.startAutoPlay(nextProps.autoPlay ,nextProps.interval);
    }
  }
  componentWillUnmount() {
    this.stopAutoPlay();
    window.removeEventListener('resize',this.handleResize,false);    
  }
  handleResize=()=>{
    this.carouselRef&&this.setState({
      width: this.carouselRef.offsetWidth - 1,
    });
  }
  startAutoPlay = (autoPlay, interval) => {
    clearInterval(this.timer);
    if (autoPlay) {
      this.timer = setInterval(() => {
        let activeIndex = this.state.activeIndex;
        if (activeIndex !== this.props.children.length - 1) {//is not last pic 
          activeIndex++;
        } else {
          activeIndex = 0;
        }
        this.setState({
          activeIndex,
        });
      }, interval);
    }
  }
  stopAutoPlay = () => {
    clearInterval(this.timer);
  }
  onMouseEnter = () => {
    this.setState({ arrows: true });
    this.stopAutoPlay();
  }
  onMouseLeave = () => {
    this.setState({ arrows: false });
    this.startAutoPlay(this.props.autoPlay, this.props.interval);
  }
  handlePreOrNext(isNext) {
    const len = this.props.children.length;
    const { activeIndex } = this.state;
    let nextActiveIndex = 0;
    if (activeIndex === 0) {//current is first
      if (len === 1) {//only one pic
        nextActiveIndex = 0;
      } else {
        nextActiveIndex = isNext ? activeIndex + 1 : len - 1;
      }
    }
    else if (activeIndex === len - 1) {//current is last
      nextActiveIndex = isNext ? 0 : activeIndex - 1;
    }
    else {
      nextActiveIndex = isNext ? activeIndex + 1 : activeIndex - 1;
    }
    this.setState({ activeIndex: nextActiveIndex });
  }
  onHandleDot = (activeIndex, e) => {
    const dotTrigger = this.props.dotTrigger;
    if (e.type === 'mouseenter') {
      dotTrigger === 'hover' && activeIndex !== this.state.activeIndex && this.onChange(activeIndex);
    } else if (e.type === 'click') {
      dotTrigger === 'click' && activeIndex !== this.state.activeIndex && this.onChange(activeIndex);
    }
  }
  onChange = (activeIndex) => {
    this.setState({
      activeIndex,
    });
    this.props.onChange && this.props.onChange(activeIndex);
  }
  renderDots() {
    const { prefixCls, children, dots } = this.props;
    if (!dots) { return; }
    const { activeIndex } = this.state;
    let dotArr = [];
    for (let index = 0; index < children.length; index++) {
      const theclassname = classNames({
        [`${prefixCls}-dot-active`]: activeIndex === index,
      });
      dotArr.push(<Dot className={theclassname} key={index} onClick={this.onHandleDot.bind(this, index)} onMouseEnter={this.onHandleDot.bind(this, index)} />);
    }
    return dotArr;
  }
  renderChildren() {
    const { children, prefixCls } = this.props;
    const { activeIndex } = this.state;
    return React.Children.map(children, (item, index) => {
      return React.cloneElement(item, {
        className: classNames(`${prefixCls}-item`, {
          [`${prefixCls}-item-active`]: index === activeIndex,
        }),
        key: index,
        style: { width: this.state.width },
      });
    });
  }
  renderNextArrow() {
    const { prefixCls, arrows } = this.props;
    if (arrows === 'never' || (arrows === 'hover' && !this.state.arrows)) { return; }
    return <div className={`${prefixCls}-arrow ${prefixCls}-nextarrow`} onClick={this.handlePreOrNext.bind(this, true)}>
      <i className="fa fa-angle-right" />
    </div>;
  }
  renderPreArrow() {
    const { prefixCls, arrows } = this.props;
    if (arrows === 'never' || (arrows === 'hover' && !this.state.arrows)) { return; }
    return <div className={`${prefixCls}-arrow ${prefixCls}-prearrow`} onClick={this.handlePreOrNext.bind(this, false)}>
      <i className="fa fa-angle-left" />
    </div>;
  }
  render() {
    const { prefixCls, children, height, effect, cardMode } = this.props;
    const { width, activeIndex } = this.state;
    const theclassname = classNames(`${prefixCls}`, `${prefixCls}-${effect}`, {
      [`${prefixCls}-card`]: cardMode,
    });
    const thestyle = {
      height:height+'px',
    };
    let wrapperStyle = {
      width: children && width * children.length,
      transform: `translate3d(-${width * activeIndex}px, 0px, 0px)`,
    };
    const dotsClassName = classNames(`${prefixCls}-dots`, {
      //[`${prefixCls}-dots-${dotEffect}`]:dotEffect,
    });
    return (
      <div>
        {children && <div className={theclassname} ref={ref => this.carouselRef = ref} style={thestyle} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
          <div className={`${prefixCls}-wrapper feu-clearfix`} style={wrapperStyle}>
            {this.renderChildren()}
          </div>
          {this.renderPreArrow()}
          {this.renderNextArrow()}
          <ul className={dotsClassName}>
            {this.renderDots()}
          </ul>
        </div>}
      </div>
    );
  }
}

Carousel.defaultProps = {
  prefixCls: 'feu-carousel',
  height: 300,
  effect: 'scrollx',
  autoPlay: false,
  interval: 3000,
  dots: true,
  dotTrigger: 'click',
  //dotEffect:'',
  arrows: 'always',
  cardMode: false,
};

Carousel.propTypes = {
  prefixCls: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  effect: PropTypes.oneOf(['scrollx', 'fade']),
  autoPlay: PropTypes.bool,
  interval: PropTypes.number,
  dots: PropTypes.bool,
  dotTrigger: PropTypes.oneOf(['click', 'hover']),
  //dotEffect: PropTypes.oneOf(['','slide']),
  arrows: PropTypes.oneOf(['always', 'never', 'hover']),
  cardMode: PropTypes.bool,
  children: PropTypes.node,
  onChange: PropTypes.func,
};
export default Carousel;
