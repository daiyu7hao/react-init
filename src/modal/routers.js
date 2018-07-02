import React from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import {connect} from 'react-redux';
import {Main} from '../base';
import {Homepage, Pie, Bar, EchartsMap, Page404, AntdMobile, Login, LoginAntd, BigScreen, RcFormExample} from '../view';

const Routers = (props) => <Router>
  <Switch>
    <Route path="/login" component={Login}/>
    <Route path="/login-antd" component={LoginAntd}/>
    <Route path="/big-screen" component={BigScreen}/>
    <Route path="/rc-form-example" component={RcFormExample}/>

      <Main>
        {/* Switch表示匹配到了一个路由，就不接着往下匹配了，就到此为止了 */}
        {/* 不加path的Route表示匹配所有项 */}
        <Switch>
          <Route exact path="/" component={Homepage}/>
          <Route path="/antv/pie" component={Pie}/>
          <Route path="/antv/bar" component={Bar}/>
          <Route path="/antv/echarts-map" component={EchartsMap}/>
          <Route path="/antd-mobile" component={AntdMobile}/>
          
          <Route component={Page404}/>
        </Switch>
      </Main>
  </Switch>
</Router>;

export default connect(
  state =>{
    return {
      theme:state.theme,
    };
  }
)(Routers);



