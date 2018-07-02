import React, { Component } from 'react';
import {Row, Col, Form, Checkbox, Icon, Input, Button} from 'antd';
const FormItem = Form.Item;
import {Carousel} from 'antd';
import './login-antd.less';

const BASEURL = 'http://10.39.183.123:3000';
const LOGIN = BASEURL + '/login';
const REGISTER = BASEURL + '/register';
const LOGINCHECK = BASEURL + '/login/checkname';

function CHECKNAME(_name, callback){
  fetch(LOGINCHECK+'/'+_name)
  .then(res => res.json())
  .then(data => {
    callback && callback(data);
  });     
}

export default class LoginAntd extends Component {
  state={
    flag:'login',
  }
  switchFunc(_flag){
    this.setState({flag:_flag});
  }
  render() {
    return (
      <div className="login-antd">
        <div className="header">
          <div className="logo">logo
            {/* <img src={require('../img/logo2.png')} alt="logo"/> */}
          </div>
        </div>
        <div className="content">
          <Row>
            <Col span={14}>
              <div className="pic">
                <Carousel autoplay>
                  <div><img src={require('./images/house.png')} alt="house"/></div>
                  <div><img src={require('./images/poster.png')} alt="poster"/></div>
                </Carousel>
              </div>
            </Col>
            <Col span={7}>
            <div className="">
              {this.state.flag==='login'?
              <Formlogin switchFunc={this.switchFunc.bind(this,'register')}/>
              :<Formregister switchFunc={this.switchFunc.bind(this,'login')}/>}
            </div>
            </Col>
          </Row>
        </div>
        <div className="footer">素素 © 2018 版权所有</div>
      </div>
    );
  }
}

class Demo extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    if(!this.props.form.getFieldError('name')){
      this.props.form.validateFields((err, values) => {
        if (!err) {
          fetch(LOGIN,{ 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify(values) })
          .then(res => res.json())
          .then(data => {
            if(data.result){
              //跳转
            }else{
              this.props.form.setFields({
                password:{ value:values.password, errors: [new Error('密码错误！')] },
              });
            }
          });          
        }
      });
    }
  }
  checkname(e){
    const value = e.target.value;
    CHECKNAME(value,(data)=>{
      if(data.result){
        this.props.form.setFields({name:{ value:value}});
      }else{
        this.props.form.setFields({name:{ value:value, errors: [new Error('该用户不存在！')] }});
      }
    });
  }
  register(){
    this.props.switchFunc && this.props.switchFunc();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form" layout="vertical">
        <div className="moveball"/>
        <FormItem>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入用户名' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" onBlur={this.checkname.bind(this)}/>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住密码</Checkbox>
          )}
          <a className="login-form-forgot" href="">忘记密码</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登陆
          </Button>
          或者 <a onClick={this.register.bind(this)}>马上注册！</a>
        </FormItem>
      </Form>
    );
  }
}

const Formlogin = Form.create()(Demo);


class Demo2 extends React.Component {
  state={
    confirmDirty: false,
  }
  handleSubmit = (e) => {
    e.preventDefault();
    if(!this.props.form.getFieldError('name')){
      this.props.form.validateFields((err, values) => {
        if (!err) {
          fetch(REGISTER,{ 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify(values) })
          .then(res => res.json())
          .then(data => {
            if(data.result){
              //跳转
            }else{
              this.props.form.setFields({
                password:{ value:values.password, errors: [new Error('密码错误！')] },
              });
            }
          });
        }
      });
    }
  }
  checkname(e){
    const value = e.target.value;
    CHECKNAME(value,(data)=>{
      if(data.result){
        this.props.form.setFields({name:{ value:value, errors: [new Error('该用户名已存在！')]}});
      }else{
        this.props.form.setFields({name:{ value:value }});
      }
    });
  }
  login(){
    this.props.switchFunc && this.props.switchFunc();
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不一致！');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form" layout="vertical">
        <div className="moveball"/>
        <FormItem>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入用户名' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" onBlur={this.checkname.bind(this)}/>
          )}
        </FormItem>
        <FormItem>
        {getFieldDecorator('password', {
          rules: [{
            required: true, message: '请输入密码',
          }, {
            validator: this.checkConfirm,
          }],
        })(
          <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('confirm', {
          rules: [{
            required: true, message: '请再次输入密码',
          }, {
            validator: this.checkPassword,
          }],
        })(
          <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" onBlur={this.handleConfirmBlur} placeholder="重复密码" />
        )}
      </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            注册
          </Button>
          已有账号？ <a onClick={this.login.bind(this)}>马上登陆！</a>
        </FormItem>
      </Form>
    );
  }
}

const Formregister = Form.create()(Demo2);