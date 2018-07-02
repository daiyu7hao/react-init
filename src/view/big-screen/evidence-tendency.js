import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

export default class EvidenceTendency extends Component {
  constructor(props){
    super(props);
    this.state={
      option:this.getOption(),
    };
  }
  getOption(){
    let option = {
      xAxis: {
          type: 'category',
          data: ['第一周', '第二周', '第三周', '第四周', '第五周', '第六周', '第七周'],
      },
      yAxis: {
          type: 'value',
      },
      series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
      }],
    };
    return option;
  }
  componentDidMount(){
    // this.setState({option:this.option});
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
