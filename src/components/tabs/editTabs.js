import React, { Component } from 'react';
import Tabs from './index';
import Tab from './tab';

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
        <button onClick={this.add} >增加</button>
        <Tabs effect="fade" type="editable-card" activeKey={this.state.activeKey} onRemove={this.handleRemove}>
          {
            this.state.tabHeaderData.map( (v,k)=>
            <Tab label={v.label} icon={v.icon} disabled={v.disabled} key={String(k)} closable={v.closable}>
              <div>tab{k} content</div>
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


export default EditTabs;