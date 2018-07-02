const checkIdnumber = (rule, value, callback) => {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
  if(value && !reg.test(value)){
    callback('请填写正确的身份证号');
  }
  else{
    callback();
  }
};

const checkTelephone = (rule, value, callback) => {
  const pattern = /0?(13|14|15|17|18|19)[0-9]{9}/;
  if(value && !pattern.test(value)){
    callback('请填写正确的手机号码');
  }
  else{
    callback();
  }
};

const checkPhonenumber = (rule, value, callback) => {
  const pattern = /[0-9-()（）]{7,18}/;
  if(value && !pattern.test(value)){
    callback('请填写正确的电话号码');
  }
  else{
    callback();
  }
};

export default {checkIdnumber, checkTelephone, checkPhonenumber};