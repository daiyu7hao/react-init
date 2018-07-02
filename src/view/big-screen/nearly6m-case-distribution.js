import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

export default class Nearly6mCaseDistribution extends Component {
  constructor(props){
    super(props);
    this.state={
      option:this.getOption(),
    };
  }
  getOption(){
    let option = {
      color: ['#3398DB'],
      tooltip : {
          trigger: 'axis',
          axisPointer : {  
              type : 'shadow',   
          },
      },
      // grid: {
      //     left: '3%',
      //     right: '4%',
      //     bottom: '3%',
      //     containLabel: true,
      // },
      xAxis : [
          {
              type : 'category',
              data : ['1月', '2月', '3月', '4月', '5月', '6月'],
              axisTick: {
                  alignWithLabel: true,
              },
          },
      ],
      yAxis : [
          {
              type : 'value',
          },
      ],
      series : [
          {
              name:'直接访问',
              type:'bar',
              barWidth: '60%',
              data:[10, 52, 200, 334, 390, 330],
          },
      ],
    };
    
    return option;
  }
  render() {
    return (
      <div>
        <ReactEcharts
          className="echarts-auto-size"
          option={this.state.option}
          notMerge={true}
          lazyUpdate={true}/>
      </div>
    );
  }
}


