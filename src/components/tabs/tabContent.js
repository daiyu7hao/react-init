import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class TabContent extends Component {
  static defaultProps = {
    prefixCls: 'feu-tabs',
    className:'',
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
  };
  render() {
    const {prefixCls, active, className, tabIndex, style} = this.props;
    const theClassName = classNames(`${prefixCls}-tabcontent`,{
      [`${prefixCls}-tabcontent-active`]: active,
    }, className);
    return (
      <section className={theClassName} role="tabcontent" tabIndex={tabIndex} style={style}>
        {this.props.children}
      </section>
    );
  }
}

export default TabContent;