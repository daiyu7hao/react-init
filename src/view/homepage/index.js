import React, { Component } from 'react';
import {Button, Tag} from 'antd';

export default class Homepage extends Component {
  state={
    loading:true,
  }
  loadData=()=>{
    this.setState({
      loading:true,
    },()=>{
      setTimeout(() => {
        this.setState({
          loading:false,
        });
      }, 2000);
    });
  }
  render() {
    return (
      <div>
         {/* <Button type="primary" loading={this.state.loading} onClick={this.loadData}>
          加载数据
        </Button> */}
        {this.state.loading && <div>
          <h4 style={{ marginBottom: 16 }}>该脚手架用到的技术及插件主要有：</h4>
          <div className="home-tags">
            <Tag color="magenta">react</Tag>
            <Tag color="red">react-router</Tag>
            <Tag color="volcano">redux</Tag>
            <Tag color="orange">node</Tag>
            <Tag color="gold">webpack</Tag>
            <Tag color="lime">html5</Tag>
            <Tag color="magenta">ES6</Tag>
            <Tag color="green">css3</Tag>
          </div>
          <div style={{ marginTop: 16 }}>
            <Tag color="cyan">echarts</Tag>
            <Tag color="blue">antv</Tag>
            <Tag color="geekblue">antd</Tag>
            <Tag color="purple">antd-mobile</Tag>
          </div>
          <div style={{ marginTop: 16 }}>更新中...
          </div>
        </div>}
      </div>
    );
  }
}