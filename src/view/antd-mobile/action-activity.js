import React, { Component } from 'react';
import { ActionSheet, Button, ActivityIndicator,WhiteSpace } from 'antd-mobile';
//ActionSheet 是从下面出来的弹窗效果
//ActivityIndicator 是loading效果
export default class ActionActivity extends Component {
  state={
    animating:false,
  }
  dataList = [
    { url: 'OpHiXAcYzmPQHcdlLFrc', title: '发送给朋友' },
    { url: 'wvEzCMiDZjthhAOcwTOu', title: '新浪微博' },
    { url: 'cTTayShKtEIdQVEMuiWt', title: '生活圈' },
    { url: 'umnHwvEgSyQtXlZjNJTt', title: '微信好友' },
    { url: 'SxpunpETIwdxNjcJamwB', title: 'QQ' },
  ].map(obj => ({
    icon: <img src={`https://gw.alipayobjects.com/zos/rmsportal/${obj.url}.png`} alt={obj.title} style={{ width: 36 }} />,
    title: obj.title,
  }));
  showShareActionSheet=()=>{
    const data = [[...this.dataList, this.dataList[2]], [this.dataList[3], this.dataList[4]]];
    ActionSheet.showShareActionSheetWithOptions({
      options: data,
      message: 'I am description, description, description',
      cancelButtonText :'我是自定义的取消文字',
    });
  }
  showActionSheet=()=>{
    const BUTTONS = ['Operation1', 'Operation2', 'Operation2', 'Delete', 'Cancel'];
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
      destructiveButtonIndex: BUTTONS.length - 2,
      message: 'I am description, description, description',
    },
    (buttonIndex) => {
      console.log('you click '+BUTTONS[buttonIndex]);
    });
  }
  render() {
    return (
      <div> 
        <Button onClick={this.showActionSheet}>点击从下面弹出选择面板</Button>
        <WhiteSpace/>
        <Button onClick={this.showShareActionSheet}>点击从下面弹出分享面板</Button>
        <WhiteSpace/>
        <ActivityIndicator color="white" size="large"  text="正在加载" />
        <WhiteSpace/>
        <Button onClick={this.showLoading}>点击显示loading</Button>
        <div className="toast-example">
          <ActivityIndicator
            toast
            text="Loading..."
            //animating是显隐状态
            animating={this.state.animating}
          />
        </div> 
      </div>
    );
  }
  showLoading=()=>{
    this.setState({ animating: !this.state.animating });
    this.closeTimer = setTimeout(() => {
      this.setState({ animating: !this.state.animating });
    }, 1000);
  }
}
