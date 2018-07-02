import React, { Component } from 'react';
import { Table, Code } from 'yrui';
import Carousel from '../carousel';
import Tabs from '../tabs';
import Tab from '../tabs/tab';
import EditTabs from '../tabs/editTabs';
const t1 = `
import Tabs from './tabs';
import Tab from './tabs/tab';
<Tabs defaultActiveKey="1" onChange={this.changeTabs} activeKey={this.state.activeKey} effect="scrollx">
  <Tab label="su" icon="user" disabled key="0">
    <div>tab1 content</div>
  </Tab>
  <Tab label="susu" icon="user" key="2">
    <div>tab2 content</div>
  </Tab>
  <Tab label="sususu" icon="user" key="21">
    <div>tab3 content</div>
  </Tab>
  <Tab label="susususu" icon="user" key="3">
    <div>tab4 content</div>
  </Tab>
</Tabs>
changeTabs=(event, key)=>{
  this.setState({activeKey:key});
}`;
const t2 = `
<Carousel onChange={this.changeCarousel} dots={true} height="300px" autoPlay effect="scrollx" dotTrigger="click" interval={2000} arrows="hover">
  <div>
    <h3>1</h3>
  </div>
  <div>
    <h3>2</h3>
  </div>
  <div>
    <h3>3</h3>
  </div>
</Carousel>`;
const t3=`
function arrRemove(arr, from, to){
  let rest = arr.slice((to||from)+1 || arr.length);
  arr.length=from<0 ? arr.length+from:from;
  return arr.push.apply(arr,rest);
}

class EditTabs extends Component {
  state={
    tabHeaderData,
    activeKey:'0',
  }
  render() {
    return (
      <div>
        <Button color={'info'} size="sm" text="ADD" click={this.add} />
        <Tabs effect="fade" type="editable-card" activeKey={this.state.activeKey} onRemove={this.handleRemove}>
          {
            this.state.tabHeaderData.map( (v,k)=>
            <Tab label={v.label} icon={v.icon} disabled={v.disabled} key={String(k)} closable={v.closable}>
              <div>tab1 content</div>
            </Tab>
            )
          }
        </Tabs>
      </div>
    );
  }
  add=()=>{
    const tabHeaderData=this.state.tabHeaderData;
    tabHeaderData.push({
      label:'su',
      icon:'user',
      txt:'tab1 content',
    });
    this.setState({
      tabHeaderData,
      activeKey:String(tabHeaderData.length-1),
    });
  }
  handleRemove=(event, key)=>{//key === index
    const tabHeaderData=this.state.tabHeaderData;
    arrRemove(tabHeaderData,Number(key),Number(key));
    this.setState({
      tabHeaderData,
      activeKey:String(Number(key)-1),
    });
  }
}

const tabHeaderData=[{
  label:'su',
  icon:'user',
  disabled:true,
  txt:'tab1 content',
  closable:false,
}];

设置为 type="editable-card" 时，卡头可被关闭，此时effect不能等于scrollx，使用 closable={false} 禁止关闭。
`;
let thead = [ {key: 'key',value:'参数'}, {key: 'explain',value:'说明'}, {key: 'type',value:'类型'}, {key: 'values',value:'可选值'}, {key: 'default',value:'默认值'}];
const tbody1 = [{
  key: 'activeKey',
  explain: '当前激活 tab 面板的 key	',
  type: 'string',
  values: '--',
  default: '--',
}, {
  key: 'defaultActiveKey',
  explain: '初始化选中面板的 key',
  type: 'string',
  values: '--',
  default: '第一个面板的key值',
}, {
  key: 'onChange',
  explain: '切换面板的回调',
  type: 'function(event, key)',
  values: '--',
  default: '--',
}, {
  key: 'className',
  explain: '样式',
  type: 'string',
  values: '--',
  default: '--',
}, {
  key: 'effect',
  explain: '切换面板的效果',
  type: 'string',
  values: 'normal | fade | scrollx',
  default: 'normal',
}, {
  key: 'type',
  explain: '页签的基本样式，type===editable-card时，effect不能等于scrollx',
  type: 'string',
  values: 'line | card | editable-card',
  default: 'line',
}];
const tbody2 = [{
  key: 'key',
  explain: '对应 activeKey',
  type: 'string',
  values: '--',
  default: '--',
},{
  key: 'label',
  explain: '选项卡头显示文字',
  type: 'string',
  values: '--',
  default: '--',
},{
  key: 'icon',
  explain: '选项卡头显示文字',
  type: 'string',
  values: '--',
  default: '--',
}, {
  key: 'disabled',
  explain: '禁用卡头',
  type: 'bool',
  values: 'true | false',
  default: 'false',
},{
  key: 'className',
  explain: '单个页签自定义样式',
  type: 'string',
  values: '--',
  default: '--',
},{
  key: 'activeClassName',
  explain: '单个页签自定义活动样式',
  type: 'string',
  values: '--',
  default: '--',
}];

const tbody3=[{
  key: 'height',
  explain: '高度',
  type: 'string | number',
  values: '--',
  default: '300',
}, {
  key: 'effect',
  explain: '切换效果',
  type: 'string',
  values: 'fade | scrollx',
  default: 'scrollx',
},{
  key: 'autoPlay',
  explain: '自动播放',
  type: 'bool',
  values: 'true | false',
  default: 'false',
}, {
  key: 'interval',
  explain: '自动切换的时间间隔，单位为毫秒	number',
  type: 'number',
  values: '--',
  default: '3000',
},{
  key: 'dots',
  explain: '是否显示面板指示点',
  type: 'bool',
  values: 'true | false',
  default: 'true',
}, {
  key: 'dotTrigger',
  explain: '指示点的触发方式',
  type: 'string',
  values: 'click | hover',
  default: 'click',
}, {
  key: 'arrows',
  explain: '切换箭头的显示时机',
  type: 'string',
  values: 'always | hover | never	',
  default: 'always',
}, {
  key: 'onChange',
  explain: '切换轮播的回调',
  type: 'function(event, key)',
  values: '--',
  default: '--',
}];

class CarouselAndTabs extends Component {
  state={
  }
  componentDidMount() {
    // const bigdiv = document.getElementById('bigdiv');
    const myul = document.getElementById('myul');

    myul.innerHTML=ul;
    const arr = [];
    const selectUl = document.getElementById('selectUl');
    const lis = selectUl.getElementsByTagName('li');

    // const childs = selectUl.childNodes; 
    // console.log(childs);
    for(let i=0;i<lis.length;i++){
      arr.push(lis[i].innerHTML);
    }
  }
  render() {
    return (
      <div id="bigdiv">
        <h2>Tabs标签页</h2>
        <Tabs defaultActiveKey="1" onChange={this.changeTabs} activeKey={this.state.activeKey} effect="scrollx" className="thespecailclass">
          <Tab label="su" icon="user" disabled key="0">
            <div>tab1 content</div>
          </Tab>
          <Tab label="susu" icon="user" key="2" activeClassName="specialActiveclass" className="specialclass">
            <div>tab2 content</div>
          </Tab>
          <Tab label="sususu" icon="user" key="21">
            <div>tab3 content</div>
          </Tab>
          <Tab label="susususu" icon="user" key="3">
            <div>tab4 content</div>
          </Tab>
        </Tabs>
        <br/>
        <div className="textarea">
          <Code title="Demo" code={t1} />
        </div>
        <h3>配置 Tabs</h3>
        <Table thead={thead} tbody={tbody1} noBorder={true} />
        <h3>配置 Tab</h3>
        <Table thead={thead} tbody={tbody2} noBorder={true} />
        <br/>
        <EditTabs/>
        <div className="textarea">
          <Code title="可编辑页签示例" code={t3} />
        </div>
        <br/>
        <h2>Carousel轮播</h2>
        <Carousel onChange={this.changeCarousel} dots={true} height="300px"  effect="scrollx" dotTrigger="click" interval={2000} arrows="hover" cardMode>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
        </Carousel>
        <div className="textarea">
          <Code title="Demo" code={t2} />
        </div>
        <h3>配置 Carousel</h3>
        <Table thead={thead} tbody={tbody3} noBorder={true} />
        <div id="myul"/>
      </div>
    );
  }

  changeTabs=(event, key)=>{
    this.setState({activeKey:key});
  }
  changeCarousel=(activeIndex)=>{
  }
}

export default CarouselAndTabs;
const ul = '<ul id="selectUl" class="ant-select-dropdown-menu ant-select-dropdown-menu-vertical  ant-select-dropdown-menu-root" role="menu" aria-activedescendant=""><li unselectable="unselectable" class="ant-select-dropdown-menu-item-active ant-select-dropdown-menu-item" role="menuitem" aria-selected="false" style="user-select: none;">FitData2.0</li><li unselectable="unselectable" class="ant-select-dropdown-menu-item" role="menuitem" aria-selected="false" style="user-select: none;">大数据聚合公共服务平台-民生数据开放平台</li><li unselectable="unselectable" class="ant-select-dropdown-menu-item" role="menuitem" aria-selected="false" style="user-select: none;">光电产业云共享支撑平台项目</li><li unselectable="unselectable" class="ant-select-dropdown-menu-item" role="menuitem" aria-selected="false" style="user-select: none;">智慧园区-社区版</li><li unselectable="unselectable" class="ant-select-dropdown-menu-item" role="menuitem" aria-selected="false" style="user-select: none;">体育数据管理运营平台开发建设项目</li><li unselectable="unselectable" class="ant-select-dropdown-menu-item" role="menuitem" aria-selected="false" style="user-select: none;">上海新虹桥国际医学中心互联网+医生平台项目</li><li unselectable="unselectable" class="ant-select-dropdown-menu-item" role="menuitem" aria-selected="false" style="user-select: none;">文博会与文化产业网两个官网的合并改版项目</li><li unselectable="unselectable" class="ant-select-dropdown-menu-item" role="menuitem" aria-selected="false" style="user-select: none;">FitData BI</li><li unselectable="unselectable" class="ant-select-dropdown-menu-item" role="menuitem" aria-selected="false" style="user-select: none;">售前非确定项目</li><li unselectable="unselectable" class="ant-select-dropdown-menu-item" role="menuitem" aria-selected="false" style="user-select: none;">SmartAS</li><li unselectable="unselectable" class="ant-select-dropdown-menu-item" role="menuitem" aria-selected="false" style="user-select: none;">厦门体育云平台-指挥调度部分</li><li unselectable="unselectable" class="ant-select-dropdown-menu-item" role="menuitem" aria-selected="false" style="user-select: none;">FitQ</li><li unselectable="unselectable" class="ant-select-dropdown-menu-item" role="menuitem" aria-selected="false" style="user-select: none;">厦门体育云平台-推荐系统</li><li unselectable="unselectable" class="ant-select-dropdown-menu-item" role="menuitem" aria-selected="false" style="user-select: none;">网络爬虫</li><li unselectable="unselectable" class="ant-select-dropdown-menu-item" role="menuitem" aria-selected="false" style="user-select: none;">建行湖北省公安交通管理局互联网服务边界平台</li><li unselectable="unselectable" class="ant-select-dropdown-menu-item" role="menuitem" aria-selected="false" style="user-select: none;">悠趣平台产品</li><li unselectable="unselectable" class="ant-select-dropdown-menu-item" role="menuitem" aria-selected="false" style="user-select: none;">武汉地铁运营公司物资采购平台</li><li unselectable="unselectable" class="ant-select-dropdown-menu-item-selected ant-select-dropdown-menu-item" role="menuitem" aria-selected="true" style="user-select: none;">前端编辑器</li><li unselectable="unselectable" class="ant-select-dropdown-menu-item" role="menuitem" aria-selected="false" style="user-select: none;">国内销售部作战室综合管理平台一期项目</li><li unselectable="unselectable" class="ant-select-dropdown-menu-item" role="menuitem" aria-selected="false" style="user-select: none;">开发非确定项目</li><li unselectable="unselectable" class="ant-select-dropdown-menu-item" role="menuitem" aria-selected="false" style="user-select: none;">园博园IBMS系统开发</li><li unselectable="unselectable" class="ant-select-dropdown-menu-item" role="menuitem" aria-selected="false" style="user-select: none;">厦门体育云平台-统计分析系统</li><li unselectable="unselectable" class="ant-select-dropdown-menu-item" role="menuitem" aria-selected="false" style="user-select: none;">3D GIS技术预研</li><li unselectable="unselectable" class="ant-select-dropdown-menu-item" role="menuitem" aria-selected="false" style="user-select: none;">厦门体育云平台-需求把控</li><li unselectable="unselectable" class="ant-select-dropdown-menu-item" role="menuitem" aria-selected="false" style="user-select: none;">工业生产数据采集与展示系统</li><li unselectable="unselectable" class="ant-select-dropdown-menu-item" role="menuitem" aria-selected="false" style="user-select: none;">湖北省物价局大数据项目/楚天云</li><li unselectable="unselectable" class="ant-select-dropdown-menu-item" role="menuitem" aria-selected="false" style="user-select: none;">联投商业微信会员管理服务系统（一期）</li><li unselectable="unselectable" class="ant-select-dropdown-menu-item" role="menuitem" aria-selected="false" style="user-select: none;">FitData应用组件</li><li unselectable="unselectable" class="ant-select-dropdown-menu-item" role="menuitem" aria-selected="false" style="user-select: none;">智慧园区产品设计项目计划</li><li unselectable="unselectable" class="ant-select-dropdown-menu-item" role="menuitem" aria-selected="false" style="user-select: none;">3D展示系统</li><li unselectable="unselectable" class="ant-select-dropdown-menu-item" role="menuitem" aria-selected="false" style="user-select: none;">万分一-APP</li><li unselectable="unselectable" class="ant-select-dropdown-menu-item" role="menuitem" aria-selected="false" style="user-select: none;">慧创云项目</li><li unselectable="unselectable" class="ant-select-dropdown-menu-item" role="menuitem" aria-selected="false" style="user-select: none;">数据交换平台</li><li unselectable="unselectable" class="ant-select-dropdown-menu-item" role="menuitem" aria-selected="false" style="user-select: none;">场馆运营服务</li><li unselectable="unselectable" class="ant-select-dropdown-menu-item" role="menuitem" aria-selected="false" style="user-select: none;">SESAME</li><li unselectable="unselectable" class="ant-select-dropdown-menu-item" role="menuitem" aria-selected="false" style="user-select: none;">电子沙盘预研项目</li><li unselectable="unselectable" class="ant-select-dropdown-menu-item" role="menuitem" aria-selected="false" style="user-select: none;">烽火路跑服务平台</li><li unselectable="unselectable" class="ant-select-dropdown-menu-item" role="menuitem" aria-selected="false" style="user-select: none;">FAE项目</li><li unselectable="unselectable" class="ant-select-dropdown-menu-item" role="menuitem" aria-selected="false" style="user-select: none;">澳门海关风险管理平台项目</li><li unselectable="unselectable" class="ant-select-dropdown-menu-item" role="menuitem" aria-selected="false" style="user-select: none;">南宁特警基地项目</li><li unselectable="unselectable" class="ant-select-dropdown-menu-item" role="menuitem" aria-selected="false" style="user-select: none;">SmartMS项目 </li><li unselectable="unselectable" class="ant-select-dropdown-menu-item" role="menuitem" aria-selected="false" style="user-select: none;">nkythpt产品设计</li></ul>';