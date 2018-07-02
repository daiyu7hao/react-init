import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import './upload.less';
const defaultImg = require('../styleImages/default.jpg');

export default class Upload extends Component {
  state = {
    imgSrc: this.props.defaultImg || defaultImg,
    ref: new Date().getTime().toString(),
  }
  static propTypes = {
    getImgSrc: PropTypes.func,
    url: PropTypes.string,
  };
  componentWillReceiveProps(nextProps){
    if(this.props.defaultImg!==nextProps.defaultImg){
      this.setState({imgSrc:nextProps.defaultImg});
    }
  }
  
  onChangeImg = (e) => {
    let file = e.target.files[0];
    let type = file.type.split('/')[0];
    if (type !== 'image') {
      message.error('请上传图片!');
      return;
    }
    let size = (file.size / 1024 / 1024).toFixed(2);
    if (size > 3) {
      message.config({
        top: 70,
      });
      message.error('图片大小应小于3M!');
      return;
    }
    let reader = new FileReader(); //新建FileReader对象
    //以下代码可以删除
    reader.onloadstart = function () {
      //console.log('start');  //开始读取
    };
    // reader.onprogress = function(e){
    //     //这个是定时触发的事件,文件较大的时候较明显
    //     let p = '已完成：' + Math.round(e.loaded / e.total * 100) + '%' ;
    //     $(".file_upload").find(".progress").html(p);
    //     console.log('uploading');  //文件较大,就会出现多个uploading
    // };
    reader.onabort = function () {
      //console.log('abort'); //用作取消上传功能
    };
    reader.onerror = function () {
      //console.log('error'); //文件读取出错的时候触发,暂模拟不出
    };
    reader.onload = function () {
      //console.log('load complete'); //完成
    };
    //预览代码,没在onload里面写的原因是我不想
    reader.onloadend = (e)=> {
      //使用new FormData(document.getElementById('file').files[0]) 在火狐中会报参数错误
      let formData = new FormData();
      formData.append('file', document.getElementById('file').files[0]);
      formData.append('filename', file.name);
      let dataURL = reader.result;
      !!this.props.url && fetch(this.props.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundarypB786uKJtk7uNmFQ',
          'Access-Control-Allow-Origin':'https://jsonplaceholder.typicode.com',
        },
        body: formData,
      }).then(function (res) {
        if (res.ok) {
          //alert('Perfect! Your settings are saved.');
        } else if (res.status === 401) {
          //alert('Oops! You are not authorized.');
        }
      }, function (e) {
        // alert('Error submitting form!');
      });
      this.setState({ imgSrc: dataURL });
      !!this.props.getImgSrc && this.props.getImgSrc(dataURL);
    };
    reader.readAsDataURL(file); //读取为base64
  }
  componentDidMount() {
    this.timer = null;
    let img1 = document.getElementsByTagName('img')[0];
    img1.onload = function () {
      img1.crossOrigin = 'Anonymous';
    };
  }
  render() {
    this.textInput = null;
    return (
      <div className="feu-upload">
        <input type="file" onChange={this.onChangeImg} onClick={this.inputClickHandler} onDoubleClick={this.inputDoubleClickHandler} ref="file" id="file"/>
        <div className="feu-upload-container">
          <img src={this.state.imgSrc} alt="默认图片" />
        </div>
      </div>
    );
  }
  inputClickHandler = (event) => {
    event.preventDefault();
  }
  inputDoubleClickHandler = (event) => {
    event.preventDefault();
    let e = document.createEvent('MouseEvents');
    e.initMouseEvent('click',false,false,document.defaultView,0,0,0,0,0,false,false,false,false,0,null);
    this.refs.file.dispatchEvent(e);
  }
}