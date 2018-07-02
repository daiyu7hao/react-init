import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
export default class DataNodeDistribution extends Component {
  render() {
    return (
      <div>
        <ReactEcharts
          className="echarts-auto-size"
          option={option}
          notMerge={true}
          lazyUpdate={true}/>
      </div>
    );
  }
}

const option = {
  tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
  },
  series: [
      {
          name:'访问来源',
          type:'pie',
          selectedMode: 'single',
          radius: [0, '41%'],
          data:[
              {value:335, name:'直达'},
              {value:679, name:'营销广告'},
              {value:1548, name:'搜索引擎'},
          ],
          label:{
              color:'#fff',
              formatter: '{b}\n{c}',
              textStyle:{
                padding:2,
              },
          },
          labelLine:{
            lineStyle:{
                color:'#fff',
            },
            length:0,
            smooth:true,
          },
      },
      {
          name:'访问来源',
          type:'pie',
          radius: ['40%', '55%'],
          data:[
              {value:335, name:'直达',itemStyle:{
                  color:'rgba(225,225,225,.1)',
              }},
          ],
          labelLine: {
            normal: {
                show: false,
            },
         },
         label: {
          normal: {
            show: false,
          },
      },
      },
  ],
};