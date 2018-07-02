/*
  截图功能下载网址：http://www.cnblogs.com/yanweidie/p/5203943.html
*/
import React, { Component } from 'react';
import { Table, Code } from 'yrui';
import html2canvas from 'html2canvas';
import $ from 'jquery';
import {Upload, Dragdiv} from '../index';
import Reactecharts from '../../echartComp/ReactEcharts';

let thead = [ {key: 'arg',value:'参数'}, {key: 'explain',value:'说明'}, {key: 'type',value:'类型'}, {key: 'options',value:'可选值'}, {key: 'default',value:'默认值'}];
let tbody1 = [{
  arg: 'width',
  explain: '设置div的原始宽度',
  type: 'string|number',
  options: '--',
  default: '100',
}, {
  arg: 'height',
  explain: '设置div的原始高度',
  type: 'string|number',
  options: '--',
  default: '100',
}, {
  arg: 'getSize',
  explain: '获取div的大小和位置',
  type: 'function(size)',
  options: '--',
  default: '--',
}];
let tbody2 = [{
  arg: 'defaultImg',
  explain: '默认图片',
  type: 'string',
  options: '--',
  default: '--',
}, {
  arg: 'getImgSrc',
  explain: '获取图片的base64进制编码',
  type: 'function(size)',
  options: '--',
  default: '--',
}, {
  arg: 'url',
  explain: '上传路径，如果不加，说明不需要上传图片到服务器',
  type: 'string',
  options: '--',
  default: '--',
}];

export default class DragUploadDemo extends Component {
  state = {
  }
  consoleImg = (img) => {
  }
  consoleDivSize = (size) => {
  }
  shotimg = () => {
    //let dom = document.getElementById('shotDiv');
    let dom1 = $('#shotDivParent');
    
    // let copyDom = dom1.clone();
    // copyDom.width(dom1.width() + 'px');
    // copyDom.height(dom1.height() + 'px');
    //console.log($("#shotDiv").outerHeight());
   // $('body').append(copyDom);

    const h = dom1[0].ownerDocument.defaultView.innerHeight;
    
    dom1[0].ownerDocument.defaultView.innerHeight = dom1.outerHeight();
    dom1[0].ownerDocument.defaultView.pageXOffset = 22;
    
    
    html2canvas(dom1, {
      //height: dom1[].outerHeight(),
      onrendered: function (canvas) {
        dom1[0].ownerDocument.defaultView.innerHeight = h;        
        $('.y-pagecontent')[0].appendChild(canvas);
        // let url = canvas.toDataURL();
        // //以下代码为下载此图片功能
        // let triggerDownload = $('<a>').attr('href', url).attr('download', new Date() + '设计页面.png').appendTo('body');
        // triggerDownload[0].click();
        // triggerDownload.remove();
      },
    });
  }
  render() {
    const t1 = `
<Dragdiv getSize={this.consoleDivSize} width="200px" height="200px">
  <Upload getImgSrc = {this.consoleImg} url="https://jsonplaceholder.typicode.com/posts/"/>
</Dragdiv>`;
    return (
      <div id="shotDivParent">
        <section id="shotDiv" style={{ backgroundColor: '#fff' }}>
          <h2>缩放div尺寸 && 图片上传控件</h2>
          <Dragdiv getSize={this.consoleDivSize} width="200px" height="200px">
            <Upload getImgSrc={this.consoleImg} url="https://jsonplaceholder.typicode.com/posts/" />
          </Dragdiv>
          <div className="textarea">
            <h4>代码示例</h4>
            <Code title="div尺寸缩放与图片上传控件的综合应用" code={t1} />
          </div>
          <h3>配置Dragdiv</h3>
          <Table thead={thead} tbody={tbody1} noBorder={true} />
          <h3>配置Upload</h3>
          <Table thead={thead} tbody={tbody2} noBorder={true} />
          <div style={{ width: '300px' }}>
            <Reactecharts option={option} />
          </div>
        </section>
        <button onClick={this.shotimg}>截图</button>
      </div>
    );
  }
}
const option = {
  color: ['#3398DB'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
      type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisTick: {
        alignWithLabel: true,
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: [
    {
      name: '直接访问',
      type: 'bar',
      barWidth: '60%',
      data: [10, 52, 200, 334, 390, 330, 220],
    },
  ],
};

