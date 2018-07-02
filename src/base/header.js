import React, { Component } from 'react';
import { Select } from 'antd';
import {connect} from 'react-redux';
const Option = Select.Option;
const i18n = $q.i18n;

@connect(
  state =>{
    return {
      lk:state.language,
      theme:state.theme,
    };
  }
)
export default class Header extends Component {
  changeLan=(value)=>{
    this.props.dispatch({type:'LANGUAGE', payload:value});
  }
  changeTheme=(value)=>{
    this.props.dispatch({type:'THEME', payload:value});
  }
  render() {
    return (
      <header className="header clearfix">
        <ul className="tools clearfix">
          <li>用户</li>
          <li>
            <Select defaultValue={this.props.lk} style={{ width: 120 }} onChange={this.changeLan}>
              <Option value={0}>简体中文</Option>
              <Option value={1}>英文</Option>
            </Select>
          </li>
          <li>
            <Select defaultValue={this.props.theme} style={{ width: 120 }} onChange={this.changeTheme}>
              <Option value="blue">蓝色</Option>
              <Option value="red">红色</Option>
              <Option value="purple">紫色</Option>
            </Select>
          </li>
          <li>{i18n['systemName'][this.props.lk]}</li>
        </ul>
      </header>
    );
  }
}


// const mapStateToProps = state =>{
//   return {
//     lk:state.language,
//   }
// }
// const HeaderWrapper = connect(mapStateToProps)(Header);
// export default HeaderWrapper;