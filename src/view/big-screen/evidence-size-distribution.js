import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

export default class EvidenceSizeDistribution extends Component {
  constructor(props){
    super(props);
    this.state={
      option:this.getOption(),
    };
  }
  getOption(){
    let option = {
      color:['#58a','beige','burlywood','darkcyan','coral','purple'],
      series : [
          {
              name: '访问来源',
              type: 'pie',
              radius : '55%',
              center: ['50%', '50%'],
              data:[
                  {value:335, name:'直接访问'},
                  {value:310, name:'邮件营销'},
                  {value:234, name:'联盟广告'},
                  {value:135, name:'视频广告'},
                  {value:548, name:'搜索引擎'},
              ],
              itemStyle: {
                  emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)',
                  },
              },
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



