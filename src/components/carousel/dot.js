import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Dot extends Component {
  clickDot=(e)=>{
    this.props.onClick && this.props.onClick(e);
  }
  hoverDot=(e)=>{
    this.props.onMouseEnter && this.props.onMouseEnter(e);    
  }
  render() {
    const {className} = this.props;
    return (
      <li className={className} onClick={this.clickDot} onMouseEnter={this.hoverDot}>
        <div className="dot-anchor"/>
        <div className="dot-state"/>
        </li>
    );
  }
}
Dot.defaultProps = {
  className: '',
};

Dot.propTypes = {
  className: PropTypes.string,
  onMouseEnter:PropTypes.func,
  onClick:PropTypes.func,
};
export default Dot;
