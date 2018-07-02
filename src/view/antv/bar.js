import React, { Component } from 'react';
import G2 from '@antv/g2';

let data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

//显而易见，不适合react，可以使用G2的封装 bizcharts
export default class Bar extends Component {
  componentDidMount(){
    const chart = new G2.Chart({
      container: 'myChart',
      width: 600,
      height: 300,
    });
    // Step 2: 载入数据源
    chart.source(data);
    // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
    chart.interval().position('genre*sold').color('genre');
    //点击事件
    chart.on('click', ev => {
      data[1].sold=1;
      data[2].sold=1;
      chart.changeData(data);//动态修改数据或异步加载数据源
    });
    // Step 4: 渲染图表
    chart.render();
  }
  render() {
    return (
      <div>
        使用antv g2展示的柱状图
        <div id="myChart"/>
      </div>
    );
  }
}