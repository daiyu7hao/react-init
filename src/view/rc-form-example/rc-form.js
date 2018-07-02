
import React from 'react';
import { createForm } from 'rc-form';
import {InputItem, TextareaItem, Button, ActionSheet} from 'antd-mobile';
import formValidation from './form-validation';
import './form.css';

// https://github.com/ant-design/ant-design-mobile/issues/163
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}


class Form extends React.Component {
  state={
    sex:'',
  }
  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((error, values) => {
      console.log(values);
      
      if (!error) {
        //
      }
      else {
        // console.log('error', error, values);
      }
    });
  }

  fillFields = () => {
    this.props.form.setFieldsValue({
      complaintcategoryId: '77fee867c00044c9ae2bfa41f9dae835',
      submissionDepartment: '部门',
      theme:'主题',
      realName: '郑素素',
      sex: '1',
      idnumber: '430726199410044',
      emailAddress: 'qq@qq.cn',
      contactAddress: '地址',
      telephone: '13971377908',
      phonenumber: '24957945',
      content: '内容',
      openOrNot: '验证码',
      verificationCode: '77fee867c00044c9ae2bfa41f9dae835',
      messageCode: '短信验证',
    });
  }
  onChange = (e) => {
    // console.log(e.target.value);
  }
  resetFields = () => {
    this.props.form.resetFields();
  }
  showSexSheet = () => {
    const BUTTONS = ['男', '女', '取消'];//0男  1女
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
      message: '请选择您的性别',
      maskClosable: true,
      'data-seed': 'sexId',
      wrapProps,
    },
    (buttonIndex) => {
      this.props.form.setFieldsValue({sex:buttonIndex + ''});
    });
  }
  showOpenOrNotSheet = () => {
    const BUTTONS = ['是', '否', '取消'];//0是  1否
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
      message: '请选择是否公开',
      maskClosable: true,
      'data-seed': 'sexId',
      wrapProps,
    },
    (buttonIndex) => {
      this.props.form.setFieldsValue({sex:buttonIndex + ''});
    });
  }
  render() {
    const { getFieldDecorator, getFieldError } = this.props.form;
    const fieldSex = this.props.form.getFieldValue('sex');
    
    return (
      <form className="basic-grey">
        <label className="form-item-required">
          {getFieldDecorator('submissionDepartment', {
            initialValue: '',
            rules: [{
              required: true,
              message: '请填写提交部门',
            }],
          })(
          <InputItem
            clear
            placeholder="提交部门"
            onChange={this.onChange}
          >提交部门：</InputItem>
          )}
          <div style={{ color: 'red' }}>
            {(getFieldError('submissionDepartment') || []).join(', ')}
          </div>
        </label>

        <label className="form-item-required">
          {getFieldDecorator('theme', {
            initialValue: '',
            rules: [{
              required: true,
              message: '请填写主题',
            }],
          })(
          <InputItem
            clear
            placeholder="主题"
            onChange={this.onChange}
          >主题：</InputItem>
          )}
          <div style={{ color: 'red' }}>
            {(getFieldError('theme') || []).join(', ')}
          </div>
        </label>

        <label className="form-item-required">
          {getFieldDecorator('realName', {
            initialValue: '',
            rules: [{
              required: true,
              message: '请填写真实姓名',
            }],
          })(
          <InputItem
            clear
            placeholder="真实姓名"
            onChange={this.onChange}
          >真实姓名：</InputItem>
          )}
          <div style={{ color: 'red' }}>
            {(getFieldError('realName') || []).join(', ')}
          </div>
        </label>

        <label>
          {getFieldDecorator('sex', {
            initialValue: '',
            rules: [{
              required: false,
              message: '请选择性别',
            }],
          })(
            // 没有div包裹，input会被自动赋值
            <div className={`div-imitation-inputitem${(fieldSex === '0' || fieldSex === '1') ? ' placeholder-is-value' : ''}`}>
              <InputItem
                clear
                placeholder={fieldSex === '0' ? '男' : fieldSex === '1' ? '女' : '性别'}
                onChange={this.onChange}
                onFocus={this.showSexSheet}
              >性别：</InputItem>
            </div>
          )}
          <div style={{ color: 'red' }}>
            {(getFieldError('sex') || []).join(', ')}
          </div>
        </label>

        <label className="form-item-required">
          {getFieldDecorator('idnumber', {
            initialValue: '',
            rules: [{
              required: true,
              message: '请填写身份证号',
            }, {
              validator: formValidation.checkIdnumber,
            }],
          })(
          <InputItem
            clear
            placeholder="身份证号"
            onChange={this.onChange}
          >身份证号：</InputItem>
          )}
          <div style={{ color: 'red' }}>
            {(getFieldError('idnumber') || []).join(', ')}
          </div>
        </label>

        <label>
          {getFieldDecorator('emailAddress', {
            initialValue: '',
            rules: [{
              required: false,
            },
            {
              type: 'email',
              message: '请填写正确的邮箱地址',
            }],
          })(
          <InputItem
            clear
            placeholder="email地址"
            onChange={this.onChange}
          >email地址：</InputItem>
          )}
          <div style={{ color: 'red' }}>
            {(getFieldError('emailAddress') || []).join(', ')}
          </div>
        </label>

        <label>
          {getFieldDecorator('contactAddress', {
            initialValue: '',
            rules: [{
              required: false,
              message: '请填写联系地址',
            }],
          })(
          <InputItem
            clear
            placeholder="联系地址"
            onChange={this.onChange}
          >联系地址：</InputItem>
          )}
          <div style={{ color: 'red' }}>
            {(getFieldError('contactAddress') || []).join(', ')}
          </div>
        </label>

        <label className="form-item-required">
          {getFieldDecorator('telephone', {
            initialValue: '',
            rules: [{
              required: true,
              message: '请填写手机号码',
            }, {
              validator: formValidation.checkTelephone,
            }],
          })(
          <InputItem
            clear
            placeholder="手机号码"
            onChange={this.onChange}
          >手机号码：</InputItem>
          )}
          <div style={{ color: 'red' }}>
            {(getFieldError('telephone') || []).join(', ')}
          </div>
        </label>

        <label>
          {getFieldDecorator('phonenumber', {
            initialValue: '',
            rules: [{
              required: false,
              message: '请填写电话号码',
            }, {
              validator: formValidation.checkPhonenumber,
            }],
          })(
          <InputItem
            clear
            placeholder="电话号码"
            onChange={this.onChange}
          >电话号码：</InputItem>
          )}
          <div style={{ color: 'red' }}>
            {(getFieldError('phonenumber') || []).join(', ')}
          </div>
        </label>

        <label className="form-item-required">
          {getFieldDecorator('content', {
            initialValue: '',
            rules: [{
              required: true,
              message: '请填写内容',
            }],
          })(
          <TextareaItem
            className="div-imitation-inputitem"
            clear
            placeholder="内容"
            onChange={this.onChange}
            title="内容："
            autoHeight
          />
          )}
          <div style={{ color: 'red' }}>
            {(getFieldError('content') || []).join(', ')}
          </div>
        </label>
        
        <label className="form-item-required">
          {getFieldDecorator('openOrNot', {
            initialValue: '',
            rules: [{
              required: true,
              message: '请选择是否公开',
            }],
          })(
            <div className={`div-imitation-inputitem${(fieldSex === '0' || fieldSex === '1') ? ' placeholder-is-value' : ''}`}>
              <InputItem
                clear
                placeholder={fieldSex === '0' ? '是' : fieldSex === '1' ? '否' : '是否公开'}
                onChange={this.onChange}
                onFocus={this.showOpenOrNotSheet}
              >是否公开：</InputItem>
            </div>
          )}
          <div style={{ color: 'red' }}>
            {(getFieldError('openOrNot') || []).join(', ')}
          </div>
        </label>

        <UploadFileExample/>

        <label className="form-item-required">
          {getFieldDecorator('verificationCode', {
            initialValue: '',
            rules: [{
              required: true,
              message: '请填写验证码',
            }],
          })(
            <div>
              <InputItem
                clear
                placeholder="验证码"
                onChange={this.onChange}
              >验证码：</InputItem>
              <label htmlFor="">9999</label>
            </div>
          )}
          <div style={{ color: 'red' }}>
            {(getFieldError('verificationCode') || []).join(', ')}
          </div>
        </label>
        
        <label className="form-item-required">
          {getFieldDecorator('messageCode', {
            initialValue: '',
            rules: [{
              required: true,
              message: '请填写短信验证码',
            }],
          })(
            <div>
              <InputItem
                clear
                placeholder="短信验证"
                onChange={this.onChange}
              >短信验证：</InputItem>
              <button onClick={this.getMessageCode}>获取短信验证码</button>
            </div>
          )}
          <div style={{ color: 'red' }}>
            {(getFieldError('messageCode') || []).join(', ')}
          </div>
        </label>

        <button onClick={this.fillFields}>自动填充表单数据</button>
        <button onClick={this.resetFields}>清空</button>
        <button onClick={this.onSubmit}>提交</button>
        
      </form>
    );
  }
  getMessageCode = () => {
    // console.log( 'getMessageCode' );
  }
}
export default createForm()(Form);


function getFileValueProps(value) {
  if (value && value.target) {
    return {
      value: value.target.value,
    };
  }
  return {
    value,
  };
}

function getValueFromFileEvent({ target }) {
  return {
    target,
  };
}
class UploadFile extends React.Component {
  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((error, values) => {
      if (!error) {
        const data = new FormData();
        data.append('file', values.attachment.target.files[0]);
        fetch('/post.htm', {
          method: 'post',
          body: data,
        });
      }
    });
  }
  checkSize = (rule, value, callback) => {
    if (value && value.target) {
      const files = value.target.files;
      if (files[0]) {
        callback(files[0].size > 1000000 ? 'file size must be less than 1M' : undefined);
      } 
      else {
        callback();
      }
    } 
    else {
      callback();
    }
  }
  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    return (<span>
      <span>上传附件:</span>
      <label>
        <input type="file" {...getFieldProps('attachment', {
          getValueProps: getFileValueProps,
          getValueFromEvent: getValueFromFileEvent,
          rules: [this.checkSize],
        })}
        />
      </label>
      <div style={{ color: 'red' }}>
        {(getFieldError('attachment') || []).join(', ')}
      </div>
      <button onClick={this.onSubmit}>submit</button>
    </span>);
  }
}

const UploadFileExample = createForm()(UploadFile);