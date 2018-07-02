import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Tab extends Component {
  handleClick = (event) => {
    if (!this.props.disabled && this.props.onClick) {
      this.props.onClick(event, this.props.key);
    }
  }
  handleRemove=(event)=>{
    if (this.props.type==='editable-card'&&this.props.closable && this.props.handleRemove) {
      this.props.handleRemove(event, this.props.key);
    }
  }
  render() {
    const {
        prefixCls, active, activeClassName, className, disabled, icon, label, type, closable, children,
      } = this.props;
    const theClassName = classNames(`${prefixCls}-tab`,{
      [`${prefixCls}-tab-active`]: active,
      [`${prefixCls}-tab-disabled`]: disabled,
      [activeClassName]: active,
    }, className);
    return (
      <div className={theClassName} role="tab" aria-disabled="true" aria-selected="false" onClick={this.handleClick}>
        {icon && <i className={`fa fa-${icon}`}/>}
        {label}
        {children}
        {type==='editable-card'&&closable&&<i className="fa fa-remove" onClick={this.handleRemove}/>}
      </div>
    );
  }
}
Tab.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  active: PropTypes.bool,
  activeClassName: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  label: PropTypes.node,
  closable:PropTypes.bool,
  onClick: PropTypes.func,
};

Tab.defaultProps = {
  prefixCls: 'feu-tabs',
  active: false,
  className: '',
  closable:true,
  activeClassName:'',
  disabled: false,
};
export default Tab;