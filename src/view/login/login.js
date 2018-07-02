import React, { Component } from 'react';
import './login.less';
import './checkbox.less';

const info = [{ id: 'email', label: '邮箱', placeholder: '邮箱', type: 'text' }, { id: 'password', label: '密码', placeholder: '密码', type: 'password' }];
const reg_email = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;

export default class Login extends Component {
  state = {
    isfocus: [false, false],
    hascontent: [false, false],
    error: ['', ''],
    remember: false,
  }
 
  downEnter = (e) => {
    if (e.keyCode === 13) { this.submit(); }
  }
  componentDidMount() {
    const obj = JSON.parse(localStorage.getItem('logininfo')), doc=document;
    if (obj) {
      doc.getElementById('email').value = obj['email'];
      this.setState({ remember: true, hascontent: [true, true] });
    }
    window.addEventListener('keydown', this.downEnter);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.downEnter);
  }
  submit() {
    let error = this.state.error;
    let obj = {}, errorflag = false;
    for (let i = 0; i < info.length; i++) {
      const value = document.getElementById(info[i].id).value;
      obj[info[i].id] = value;
      if (!value) {
        error[i] = `请填写${info[i].label}`;
      }
    }
    for (let i = 0; i < error.length; i++) {
      if (error[i]) {
        errorflag = true;
        break;
      }
    }
    if (!errorflag) {
      //
    }
  }
  rememberpwd(remember) {
    this.setState({ remember:!this.state.remember });
  }
  render() {
    const { hascontent, isfocus, error, remember } = this.state;

    return (
      <div className="login">
        <div className="wholebg" />
        <div className="form-box">
          <div className="irgraph">
            <img src={require('./images/bg.png')} alt="" className="logo-bg" />
          </div>
          <form>
            <div className="logo-text">Web</div>
            {
              info.map((v, index) =>
                <div className={`checkinput${isfocus[index] ? ' is-focus' : ''}${hascontent[index] ? ' has-content'
                  : ''}${error[index] ? ' error-checkinput' : ''}`} role="name" key={index}>
                  <input className="checkinput-label" type={info[index].type} placeholder={!isfocus[index] && !hascontent[index] ? info[index].placeholder : ''} onFocus={this.focus.bind(this, index)} onBlur={this.blur.bind(this, index)} id={info[index].id} onChange={this.change.bind(this, index)} />
                  <div className="float-label">{//info[index].label
                  }
                    <div className="error-message">{error[index]}</div>
                  </div>
                </div>
              )
            }
            {/* <input type="button" value="submit" type="submit"/> */}
            <div className="clearfix">
              <div className="remember">
                <BeautifyCheckbox oncheck={this.rememberpwd.bind(this)} remember={remember}>下次自动登录</BeautifyCheckbox>
              </div>
              <div className="forget">
                <span><a className="reset-a" href="#/forgetpwd">忘记密码</a></span>
              </div>
            </div>

            <div className="clearfix">
              <div className="oper-btn login-btn" onClick={this.submit.bind(this)}>登录</div>
              <div className="oper-btn register-link"><a className="reset-a" href="#/register">暂时没有账户？马上注册！</a></div>
            </div>
          </form>
        </div>
      </div>
    );
  }
  change(index, e) {
    let error = this.state.error;
    const value = e.target.value;
    switch (index) {
    case 0:
      if (!value) {
        error[index] = '请填写邮箱';
      } else if (!reg_email.test(value)) {
        error[index] = '邮箱格式不正确';
      } else {
        error[index] = '';
      }
      break;
    case 1:
      error[index] = value ? '' : '请填写密码';
      break;
    default:
      break;
    }

    this.setState({ error });
  }
  focus(index) {
    let isfocus = this.state.isfocus;
    isfocus[index] = true;
    this.setState({ isfocus });
  }
  blur(index) {
    const dom = document.getElementById(info[index].id);
    let isfocus = this.state.isfocus, hascontent = this.state.hascontent;
    isfocus[index] = false;
    hascontent[index] = dom.value;
    this.setState({
      isfocus,
      hascontent,
    });
  }
}

function BeautifyCheckbox (props){
  return (<div>
    <span className="check-box-container">
      <input type="checkbox" onChange={props.oncheck} />
      <label className={`check-box${props.remember ? ' checked' : ''}`} />
      <div style={{ textAlign: 'center', clear: 'both' }} />
    </span>
    <span onClick={props.oncheck}>{props.children}</span>
  </div>
  );
}
