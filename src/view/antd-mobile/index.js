/** 
 *  包含的组件有：
TabBar（可以当做大导航条）、
Grid（九宫格）、
ActionSheet（活动面板，操作后出现屏幕下方长出来的弹窗）、
ActivityIndicator（活动指示器，类似loading）、
PullToRefresh（拉动刷新）、
SwipeAction（滑动操作）
 */
import React, { Component } from 'react';
import {TabBar} from 'antd-mobile';
import Grid from './grid';
import ActionActivity from './action-activity';
import PulltorefreshSwipe from './pulltorefresh-swipe';
//引入antd-mobile的样式，官网建议两个组件库不要混用，而且antd-mobile确实影响我项目的样式
import 'antd-mobile/dist/antd-mobile.less';
const TabBarItem = TabBar.Item;

export default class Index extends Component {
  state={
    selectedTab:'Grid',
  }
  getComponent(key){
    let newkey=null, content=null;
    switch (key) {
      case 'Grid':
        newkey='ActionActivity';
        content=<Grid/>;
        break;
      case 'ActionActivity':
        newkey='PulltorefreshSwipe';    
        content=<ActionActivity/>;
        break;
      case 'PulltorefreshSwipe':
        newkey='Grid';    
        content=<PulltorefreshSwipe/>;
        break;
      default:
        break;
    }
    return <div>
      <div onClick={this.changeKey.bind(this, newkey)}>jump to {newkey}</div>
      {content}
      </div>;
  }
  changeKey=(newkey)=>{
    this.setState({selectedTab:newkey});
  }
  render() {
    const tabbarData=[{
      key:'Grid',
      title:'Grid',
      icon:'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg',
      selectedIcon:'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg',
      component:this.getComponent('Grid'),
    },{
      key:'ActionActivity',
      title:'ActionActivity',
      icon:'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg',
      selectedIcon:'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg',
      component:this.getComponent('ActionActivity'),
    },{
      key:'PulltorefreshSwipe',
      title:'PulltorefreshSwipe',
      icon:'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg',
      selectedIcon:'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg',
      component:this.getComponent('PulltorefreshSwipe'),
    //检查这里的this问题
  }];
    return (
      <div style={ { position: 'fixed', height: '100%', width: 'calc(100% - 250px)', top: 0 } }>
        <TabBar>
          {
            tabbarData.map(v=>
              <TabBarItem
              key={v.key}
              title={v.title}
              icon={<div style={{
                width: '22px',
                height: '22px',
                background: 'url(' +v.icon+') center center /  21px 21px no-repeat' }}/>}
              selectedIcon={<div style={{
                width: '22px',
                height: '22px',
                background: 'url(' +v.selectedIcon+') center center /  21px 21px no-repeat' }}/>}
              badge={v.badge}
              selected={this.state.selectedTab===v.key}
              onPress={()=>{
                this.setState({selectedTab:v.key});
              }}
              >
                {v.component}
              </TabBarItem>
            )
          }
        </TabBar>
      </div>
    );
  }
}


