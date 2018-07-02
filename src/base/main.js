import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Nav, Header, Footer} from './index';
import './base.less';

@connect(
  state =>{
    return {
      theme:state.theme,
    };
  }
)
export default class Main extends Component {
  render() {
    return (
      <div className={`ui-base theme-${this.props.theme}`}>
        <Header/>
        <div className="ui-layout clearfix">
          <Nav/>
          <main className="main">
            {this.props.children}
          </main>
        </div>
        <Footer/>
      </div>
    );
  }
}


