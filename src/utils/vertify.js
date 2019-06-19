// 大于0的整数
const countB0 = (rule, value, callback) => {
    if (value && !(/^[0-9]{1,}$/.test(value))) {
        callback(new Error('大于0的整数'))
    }else if(value == 0) {
        callback(new Error('大于0的整数'))
    }else{
        callback();
    }
};

export default {
    countB0
  }