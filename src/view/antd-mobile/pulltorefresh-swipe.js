import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Button, PullToRefresh, SwipeAction, List} from 'antd-mobile';
//拉动刷新，可以上拉或者下拉
//拉动刷新常和列表结合起来使用
//SwipeAction 可以list和左右滑动结合起来
//SwipeAction 的使用方法是将其他的元素包裹起来
export default class PulltorefreshSwipe extends Component {
  state={
    data:genData(),
    height:document.documentElement.clientHeight,
  }
  componentDidMount() {
    this.setState({
      height:this.state.height-ReactDOM.findDOMNode(this.ptr).offsetTop,
    });
  }
  render() {
    return (
      <div>
        <Button
          style={{ marginBottom: 15 }}
          onClick={() => this.setState({ down: !this.state.down })}
        >
          direction: {this.state.down ? 'down' : 'up'}
        </Button>
        <PullToRefresh
          damping={60}//拉动距离限制
          //给定高度让其拉动刷新
          ref={el => this.ptr = el}
          style={{
            height: this.state.height,
            overflow: 'auto',
          }}
          direction={this.state.down ? 'down' : 'up'}
          indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}//指示器配置
          //刷新状态和刷新动作的回调函数
          refreshing={this.state.refreshing}
          onRefresh={() => {
            this.setState({ refreshing: true });
            setTimeout(() => {
              this.setState({ refreshing: false });
            }, 1000);
          }}
        >
          {this.state.data.map(i => (
            <div key={i} style={{ textAlign: 'center', padding: 20 }}>
              {this.state.down ? 'pull down' : 'pull up'} {i}
            </div>
          ))}
        </PullToRefresh>
        <List>
          
          <SwipeAction
            style={{ backgroundColor: 'gray' }}
            autoClose//点击关闭后自动隐藏按钮
            left={[
              {
                text: 'Cancel',
                onPress: () => console.log('cancel'),
                style: { backgroundColor: '#ddd', color: 'white' },
              },
              {
                text: 'Delete',
                onPress: () => console.log('delete'),
                style: { backgroundColor: '#F4333C', color: 'white' },
              },
            ]}
            right={[
              {
                text: 'Cancel',
                onPress: () => console.log('cancel'),
                style: { backgroundColor: '#ddd', color: 'white' },
              },
              {
                text: 'Delete',
                onPress: () => console.log('delete'),
                style: { backgroundColor: '#F4333C', color: 'white' },
              },
            ]}
          >
            <List.Item
              extra="More"
              arrow="horizontal"
              onClick={e => console.log(' you click ListItem')}
            >
              这个ListItem左右都可以滑动，ListItem也可以点击
            </List.Item>
          </SwipeAction>
        </List>
      </div>
    );
  }
}

function genData() {
  const dataArr = [];
  for (let i = 0; i < 20; i++) {
    dataArr.push(i);
  }
  return dataArr;
}
