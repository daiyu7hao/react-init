import React, { Component } from 'react';
import {Dragdiv} from '../index';
import {Upload} from '../index';
export default class Img extends Component {
  state={
    width:this.props.width,
    height:this.props.height,
    src:this.props.src,
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
    } else if (nextProps.src!==this.props.src){
      this.setState({
        src:nextProps.src,
      });
    }
  }
  getSize = (size) => {
    this.props.onChange && this.props.onChange('size',size);
  }
  getImgSrc = (src) => {
    this.props.onChange && this.props.onChange('src',src);    
  }
  render() {
    const {width, height, src} = this.state;
    return (
      <Dragdiv getSize={this.getSize} width={width} height={height}>
        <Upload url="https://jsonplaceholder.typicode.com/posts/" defaultImg={src} getImgSrc={this.getImgSrc} />
      </Dragdiv>
    );
  }
}
