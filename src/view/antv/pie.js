import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import './index.css';

export default class Pie extends Component {
  onChartdbClick=(ev)=>{
    alert('you dbclick '+ev.name);
  }
  getOption(){
    return {
      xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
          type: 'value',
      },
      series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
      }],
  };
  
  }
  render() {
    let onEvents = {
      'dblclick': this.onChartdbClick,
    };
    return (
      <div>
        使用echarts-for-react展示的饼状图
        <ReactEcharts
          className="echarts-canvas"
          option={this.getOption()}
          notMerge={true}
          lazyUpdate={true}
          onEvents={onEvents} />
      </div>
    );
  }
}