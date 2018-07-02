import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

export default class EvidenceCaseState extends Component {
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
                  {value:45, name:'已判决'},
                  {value:56, name:'调查取证'},
                  {value:23, name:'提起诉讼'},
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



