import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './dragdiv.less';

export default class Dragdiv extends Component {
  state = {
    width: this.props.width, height: this.props.height, top: 0, right: 'auto', bottom: 'auto', left: 0, id:new Date().getTime().toString(),
  }
  static propTypes = {
    getSize: PropTypes.func,
    width: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    height: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  };
  static defaultProps = {
    width: '200px',
    height: '200px',
  }
  componentDidMount() {
    let oDiv = document.getElementById(this.state.id);
    let aSpan = oDiv.getElementsByClassName('span-oper');
    for (let i = 0; i < aSpan.length; i++) {
      this.dragFn(aSpan[i]);
    }
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.width!==nextProps.width){
      this.setState({
        width:nextProps.width,
      });      
    }else if(this.props.height!==nextProps.height){
      this.setState({
        height:nextProps.height,
      });      
    }
  }
  dragFn(obj) {
    let oDiv = document.getElementById(this.state.id);
    let that = this;
    obj.onmousedown = function (ev) {
      let oEv = ev;

      let oldWidth = oDiv.offsetWidth;
      let oldHeight = oDiv.offsetHeight;
      let oldX = oEv.clientX;
      let oldY = oEv.clientY;
      let oldLeft = oDiv.offsetLeft;
      let oldTop = oDiv.offsetTop;
      // console.log(oldWidth,oldHeight,oldX,oldY,oldLeft,oldTop);
      let width, height, top, right, bottom, left;

      document.onmousemove = function (ev) {
        let oEv = ev;

        if (obj.className === 'tl span-oper') {
          width = oldWidth - (oEv.clientX - oldX) + 'px';
          height = oldHeight - (oEv.clientY - oldY) + 'px';
          left = oldLeft + (oEv.clientX - oldX) + 'px';
          top = oldTop + (oEv.clientY - oldY) + 'px';
          that.setState({ height, width, left, top }, function () {
            !!that.props.getSize && that.props.getSize(that.state);
          });
        }
        else if (obj.className === 'bl span-oper') {
          width = oldWidth - (oEv.clientX - oldX) + 'px';
          height = oldHeight + (oEv.clientY - oldY) + 'px';
          left = oldLeft + (oEv.clientX - oldX) + 'px';
          bottom = oldTop + (oEv.clientY + oldY) + 'px';
          that.setState({ width, height, left, bottom }, function () {
            !!that.props.getSize && that.props.getSize(that.state);
          });
        }
        else if (obj.className === 'tr span-oper') {
          width = oldWidth + (oEv.clientX - oldX) + 'px';
          height = oldHeight - (oEv.clientY - oldY) + 'px';
          right = oldLeft - (oEv.clientX - oldX) + 'px';
          top = oldTop + (oEv.clientY - oldY) + 'px';
          that.setState({ width, height, right, top }, function () {
            !!that.props.getSize && that.props.getSize(that.state);
          });
        }
        else if (obj.className === 'br span-oper') {
          width = oldWidth + (oEv.clientX - oldX) + 'px';
          height = oldHeight + (oEv.clientY - oldY) + 'px';
          right = oldLeft - (oEv.clientX - oldX) + 'px';
          bottom = oldTop + (oEv.clientY + oldY) + 'px';
          that.setState({ width, height, right, bottom }, function () {
            !!that.props.getSize && that.props.getSize(that.state);
          });
        }
        else if (obj.className === 't span-oper') {
          oDiv.style.height = oldHeight - (oEv.clientY - oldY) + 'px';
          oDiv.style.top = oldTop + (oEv.clientY - oldY) + 'px';
          that.setState({ height, bottom }, function () {
            !!that.props.getSize && that.props.getSize(that.state);
          });
        }
        else if (obj.className === 'b span-oper') {
          height = oldHeight + (oEv.clientY - oldY) + 'px';
          bottom = oldTop - (oEv.clientY + oldY) + 'px';
          that.setState({ height, bottom }, function () {
            !!that.props.getSize && that.props.getSize(that.state);
          });
        }
        else if (obj.className === 'l span-oper') {
          height = oDiv.style.height = oldHeight + 'px';
          width = oldWidth - (oEv.clientX - oldX) + 'px';
          left = oldLeft + (oEv.clientX - oldX) + 'px';
          that.setState({ width, height, left }, function () {
            !!that.props.getSize && that.props.getSize(that.state);
          });
        }
        else if (obj.className === 'r span-oper') {
          height = oldHeight + 'px';
          width = oldWidth + (oEv.clientX - oldX) + 'px';
          right = oldLeft - (oEv.clientX - oldX) + 'px';
          that.setState({ width, height, right }, function () {
            !!that.props.getSize && that.props.getSize(that.state);
          });
        }
      };

      document.onmouseup = function () {
        document.onmousemove = null;
      };
      return false;
    };
  }
  render() {
    const { height, width, top, right, bottom, left, id } = this.state;
    let style = {
      height, width, top, right, bottom, left,
    };
    //console.log(style);
    return (
      <div className="dragdiv-wrapper" style={{ height, width }}>
        <div className="dragdiv-box" id={id} style={style}>
          <span className="r span-oper"/>
          {/* <span className="l span-oper"/>
          <span className="t span-oper"/> */}
          <span className="b span-oper"/>
          <span className="br span-oper"/>
{/*           <span className="bl span-oper"/>
          <span className="tr span-oper"/>
          <span className="tl span-oper"/> */}
          {this.props.children}
        </div>
      </div>
    );
  }
}