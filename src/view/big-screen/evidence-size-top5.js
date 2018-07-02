// 参考例子：http://gallery.echartsjs.com/editor.html?c=xr1XxW-i7M
import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
const data = [{
    name:'xxxxxxx',
    value:46,
},{
    name:'xxxxxxx',
    value:34,
},{
    name:'xxxxxxx',
    value:32,
},{
    name:'xxxxxxx',
    value:25,
},{
    name:'xxxxxxx',
    value:25,
}];

export default class EvidenceSizeTop5 extends Component {
  
  render() {
    // const maxvalue = data.filter(p=>);
    return (
      <div className="percent-bar">
        {
            // data.map((v,k)=>{
            //     return <div className="percent-bar-item" key={k}>
            //         <p className="percent-bar-name">{v.name}</p>
            //         <div className="percent-bar-color">
            //             <div style={{width:(v.value/data[0].value*100).toFixed(2)+'%'}}/>
            //             <span>{v.value}</span>
            //         </div>
            //     </div>;
            // })
        }
        <ReactEcharts
          className="echarts-auto-size"
          option={option}
          notMerge={true}
          lazyUpdate={true}/>
      </div>
    );
  }
}



const baifenbi = [0.111, 0.333, 0.444, 0.555, 0.777];
const grayBar = [1, 1, 1, 1, 1];
const paiming = [7, 6, 5, 4, 3];
const zongjine = [10000000, 20000000, 30000000, 40000000, 50000000];
const fenpeijine = [100000, 200000, 300000, 400000, 500000];
const city = ['北京市', '西红市', '上海市', '广州市', '厦门市'];
const option = {
    color: ['#61A8FF'], //进度条颜色
    grid:{
        top:20,
        bottom:20,
        left:20,
        right:20,
        containLabel: true,
    },
    xAxis: [{
            show: false,
        },
        //由于下边X轴已经是百分比刻度了,所以需要在顶部加一个X轴,刻度是金额,也隐藏掉
        {
            show: false,
        },
    ],
    yAxis: {
        type: 'category',
        axisLabel: {
            show: false, //让Y轴数据不显示
        },
        itemStyle: {

        },
        axisTick: {
            show: false, //隐藏Y轴刻度
        },
        axisLine: {
            show: false, //隐藏Y轴线段
        },
        data: city,
    },
    series: [
        //背景色--------------------我是分割线君------------------------------//
        {
            show: true,
            type: 'bar',
            barGap: '-100%',
            barWidth: '45%', //统计条宽度 
            itemStyle: {
                normal: {
                    color: 'rgba(102, 102, 102,0.5)',
                },
            },
            label: {
                normal: {
                    show: true,
                    //label 的position位置可以是top bottom left,right,也可以是固定值
                    //在这里需要上下统一对齐,所以用固定值
                    position:'insideRight',
                    formatter: function(data) {
                        return 'susu';
                        
                    },
                },
            },
            z:1,
            data: grayBar,
        },
        //蓝条--------------------我是分割线君------------------------------//
        {
            show: true,
            type: 'bar',
            barGap: '-100%',
            barWidth: '45%', //统计条宽度
            max: 1,
            labelLine: {
                show: false,
            },
            z:2,
            data: baifenbi,
            itemStyle: {
                normal: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 1,
                        colorStops: [
                            {offset: 0, color: '#83bff6'},
                            {offset: 0.5, color: '#188df0'},
                            {offset: 1, color: '#188df0'}],
                        globalCoord: false, // 缺省为 false
                    },
                    
                },
                
            },
        },
        //数据条--------------------我是分割线君------------------------------//
        {
            show: true,
            type: 'bar',
            xAxisIndex: 1, //代表使用第二个X轴刻度!!!!!!!!!!!!!!!!!!!!!!!!
            barGap: '-100%',
            barWidth: '25%', //统计条宽度
            itemStyle: {
                normal: {
                    barBorderRadius: 20,
                    color: 'rgba(22,203,115,0.05)',
                },
            },
            label: {
                normal: {
                    show: true,
                    //label 的position位置可以是top bottom left,right,也可以是固定值
                    //在这里需要上下统一对齐,所以用固定值
                    position: [0, '-200%'],
                    rich: {
                        blue: {
                            color: 'red',
                        },
                    },
                    formatter: function(data) {
                        //富文本固定格式{colorName|这里填你想要写的内容}
                        return '{blue|第' + paiming[data.dataIndex] + '名:' + city[data.dataIndex] + '}';
                    },
                },
            },
            data: zongjine,
        },

    ],
};