// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios'
import store from './store';
import ElementUI from 'element-ui';
import echarts from 'echarts';
import moment from 'moment';
// import 'element-ui/lib/theme-default/index.css';
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css/normalize.css'; // normalize.css 样式格式化
import './assets/iconfont/iconfont'; // iconfont 具体图标见https://github.com/PanJiaChen/vue-element-admin/wiki
import './assets/font/iconfont.css';
import * as filters from './filters'; // 全局vue filter
//import Multiselect from 'vue-multiselect';// 使用的一个多选框组件，element-ui的select不能满足所有需求
import 'vue-multiselect/dist/vue-multiselect.min.css'; // 多选框组件css
//import Sticky from 'components/Sticky'; // 粘性header组件
axios.defaults.withCredentials = true; //让ajax携带cookie
Vue.prototype.$ajax = axios
import {
  Loading
} from 'element-ui'
import {
  Message
} from 'element-ui'
import './assets/common/global'
Vue.use(ElementUI);
Vue.use(echarts);

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

Vue.filter('resultStatus', function (value) {
  if (value == 1) {
    return '有结果'
  } else if (value == 2) {
    return '无结果'
  } else if (value == 3) {
    return '无效'
  }
});
Vue.filter('reverseSex', function (value) {
  if (value == 1) {
    return '男'
  } else if (value == 2) {
    return '女'
  }
});
Vue.filter('examinationStatus', function (value) {
  if (value == 1) {
    return '未检查'
  } else if (value == 2) {
    return '已检查'
  }
});
Vue.filter('finishedStatus', function (value) {
  if (value == 1) {
    return '未完成'
  } else if (value == 2) {
    return '已完成'
  }
});
Vue.filter('overallStatusCy', function (value) {
  if (value == 1) {
    return '正常'
  } else if (value == 2) {
    return '失访'
  } else if (value == 3) {
    return '肠癌'
  } else if (value == 4) {
    return '死亡'
  }
});
Vue.filter('reserveStatus', function (value) {
  if (value == 1) {
    return '未预约'
  } else if (value == 2) {
    return '已预约'
  }
});
Vue.filter('notificationIssueStatus', function (value) {
  if (value == 1) {
    return '未发放'
  } else if (value == 2) {
    return '已发放'
  }
});
Vue.filter('dnaCommunityInformStatus', function (value) {
  if (value == 1) {
    return '已发放'
  } else if (value == 2) {
    return '未发放'
  }
});
Vue.filter('codeEntryStatus', function (value) {
  if (value == 1) {
    return '未录入'
  } else if (value == 2) {
    return '已录入'
  }
});
Vue.filter('codeEntryStatusNew', function (value) {
  if (value == 1) {
    return '未录入'
  } else if (value == 2) {
    return '已录入'
  }else if(value == 3){
    return '未提供'
  }
});
Vue.filter('insertStatus', function (value) {
  if (value == 1) {
    return '未录入'
  } else if (value == 2) {
    return '已录入'
  } else if (value == 3) {
    return '待审核'
  }
});
Vue.filter('riskLevel', function (value) {
  if (value == 2) {
    return '(风险评估高危)'
  } else if (value == 1) {
    return '(风险评估低风险)'
  } else {
    return ''
  }
});
Vue.filter('riskLevelNew', function (value) {
  if (value == 2) {
    return '（风险评估组高危）'
  } else if (value == 1) {
    return '（风险评估组低风险）'
  } else {
    return ''
  }
});
Vue.filter('dnaCheckEnterStatus', function (value) {
  if (value == 1) {
    return '待返回'
  } else if (value == 2) {
    return '已返回'
  }
});
Vue.filter('dnaCheckInformStatus', function (value) {
  if (value == 1) {
    return '未通过'
  } else if (value == 2) {
    return '通过'
  } else if (value == 3) {
    return '未审核'
  }
});
//inserStatus
Vue.filter('result', function (value) {
  if (value == 2) {
    return '阳性'
  } else if (value == 1) {
    return '阴性'
  } else if (value == 3) {
    return '无效'
  } else if (value == 4) {
    return '无结果'
  }
});
//notificationEntryStatus
Vue.filter('notificationEntryStatus', function (value) {
  if (value == 1) {
    return '未录入'
  } else if (value == 2) {
    return '已录入'
  }
});
//c_resultStatus
Vue.filter('c_resultStatus', function (value) {
  if (value == 1) {
    return '未录入'
  } else if (value == 2) {
    return '已录入'
  }
});
//examinationStatus
Vue.filter('examinationStatus', function (value) {
  if (value == 1) {
    return '未检查'
  } else if (value == 2) {
    return '已检查'
  } else if (value == 0) {
    return '未签到'
  }
});
//c_resultStatus
Vue.filter('dnaCheckInformStatus', function (value) {
  if (value == 1) {
    return '未通过'
  } else if (value == 2) {
    return '通过'
  } else if (value == 3) {
    return '未审核'
  }
});

//data
Vue.filter('date', function (value) {
  if (value == null || value == '') {
    return value
  } else {
    if (typeof value == 'object') {
      return value
    } else {
      return value.substring(0, 10)
    }
  }

});
//inserStatus
Vue.filter('siteId', function (value) {
  if (value == 1) {
    return '浙江'
  } else if (value == 2) {
    return '安徽'
  } else if (value == 3) {
    return '徐州'
  } else if (value == 4) {
    return '湖南'
  } else if (value == 5) {
    return '云南'
  } else if (value == 6) {
    return '浙江2'
  } else {
    return value
  }
});
Vue.filter('group', function (value) {
  if (value == 'A') {
    return 'A组(结肠镜组)'
  } else if (value == 'B') {
    return 'B组(便潜血组)'
  } else if (value == 'C') {
    return 'C组'
  } else if (value == 'Cg') {
    return 'C组(风险评估高危)'
  } else if (value == 'Cd') {
    return 'C组(风险评估低风险)'
  }
});
Vue.filter('sampleType', function (value) {
  if (value == 'S') {
    return '血清'
  } else if (value == 'P') {
    return '血浆'
  } else if (value == 'W') {
    return '白细胞'
  } else if (value == 'M') {
    return '唾液'
  } else if (value == 'F') {
    return '粪便'
  }
});
Vue.filter('courierStatus', function (value) {
  if (value == '1') {
    return '已接收'
  } else if (value == '2') {
    return '未寄出'
  } else if (value == '3') {
    return '已寄出'
  }
});
Vue.filter('collectStatus', function (value) {
  if (value == '1') {
    return '已采集'
  } else if (value == '2') {
    return '未提供'
  }
});

Vue.filter('sample_S', function (value) {
  if (value == '1') {
    return '已采集'
  } else if (value == '2') {
    return '未提供'
  } else if (value == null || value == '-1') {
    return '未录入'
  } else if (value == 0) {
    return '未录入'
  }
});
Vue.filter('schemeType', function (value) {
  if (value == '1') {
    return '退出研究'
  } else if (value == '2') {
    return '随机分组无效'
  } else {
    return ''
  }
});
Vue.filter('cancerFormType', function (value) {
  if (value == '20') {
    return '《表C1-癌症报告表》'
  } else if (value == '21') {
    return '《表C2-癌症诊断表》'
  } else if (value == '22') {
    return '《表C3-结直肠癌诊断信息摘录表》'
  } else if (value == '23') {
    return '《表C4-结直肠癌治疗信息摘录表》'
  } else {
    return ''
  }
});
// showStatus
Vue.filter('showStatus', function (value) {
  if (value == '1') {
    return '未开始'
  } else if (value == '2') {
    return '预约中'
  } else if (value == '3') {
    return '已过期'
  } else {
    return '已停诊'
  }
})
Vue.filter('filterWeek', function (value) {
  if (value == 1) {
    return '周一';
  } else if (value == 2) {
    return '周二';
  } else if (value == 3) {
    return '周三';
  } else if (value == 4) {
    return '周四';
  } else if (value == 5) {
    return '周五';
  } else if (value == 6) {
    return '周六';
  } else {
    return '周日';
  }
})
Vue.filter('followGroup', function (value) {
  if (value == 0) {
    return '癌-T0';
  } else if (value == 1) {
    return '结肠镜组';
  } else if (value == 2) {
    return 'FIT组';
  } else if (value == 3) {
    return '年度随访问卷组';
  }
})
Vue.filter('followState', function (value) {
  if (value == 0) {
    return '癌-T0';
  } else if (value == 1) {
    return '未开始';
  } else if (value == 2) {
    return '未邀请';
  } else if (value == 3) {
    return '随访中';
  } else if (value == 4) {
    return '失访';
  } else if (value == 9) {
    return '随访成功';
  }
})
Vue.filter('quitFollowReason', function (value) {
  if (value == 1) {
    return '受试者失联';
  } else if (value == 2) {
    return '拒绝年度随访问卷调查';
  } else if (value == 3) {
    return '拒绝接受FIT检查';
  } else if (value == 4) {
    return 'FIT阳性者拒绝接受结肠镜检查';
  } else if (value == 5) {
    return '风险评估高危者拒绝结肠镜检查';
  }
})
// 随访表单类型
Vue.filter('followFormType',function(value){
  if (value == 'A3') {
    return '表A3年度信息更新表';
  } else if (value == 'E1') {
    return '表E1受试者联系记录表';
  } else if (value == 'E2') {
    return '表E2受试者无应答/违反研究方案表';
  }
})
Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD') {
  return moment(dataStr).format(pattern)

})
var clientStatus = 1 //刷新整个页面时，可能会调用多个http请求，如果此时报811007，所有请求都会弹一个确认框，用此标记只弹一次
/*路由实例*/
//let router = new router();
/*跳转方法，实例.push({path: "路径"})*/

//封装axios http请求，用于全局请求token失效时，重置token 或 跳转至登录页面
//1、发送请求错误码为 811006 时，说明token失效，可重置
//2、发送请求错误码为 811007 时，说明token已失效，且不可重置，需提示用户并引导用户重新登录

/* window.onbeforeunload = function(){//关闭浏览器清除localStorage
  window.localStorage.clear()
}*/

if (!sessionStorage.getItem('token')) {
  router.push({
    path: "/login"
  });
}
window.$axios_http = function (obj) {
  return new Promise(function (resolve, reject) {
    //请求默认加全屏遮罩层，仅当请求对象中的isLoading属性为false时，不显示遮罩层；
    let loadingInstance;
    //请求时加入遮罩层
    //let loadingInstance = Loading.service({ fullscreen: true })
    if (obj.isLoading == null || obj.isLoading == undefined || obj.isLoading == true) {
      //请求时加入遮罩层
      loadingInstance = Loading.service({
        fullscreen: true
      })
    }

    //请求时将按钮置为不可用
    if (obj.vueObj) {
      obj.vueObj.$data.buttonDisabled = true
    }

    axios({
      method: obj.method ? obj.method : 'POST',
      url: global.SERVER_NAME + (obj.url ? obj.url : '/'),
      data: obj.data ? obj.data : "",
      withCredentials: true,
      responseType: obj.responseType ? obj.responseType : 'json'
    }).then(function (res) {
      //响应时关闭遮罩层
      //loadingInstance.close()
      if (loadingInstance) {
        loadingInstance.close()
      }
      if (obj.url.indexOf('excel') >= 0) {
        resolve(res);
        return;
      }
      if (!res || !res.data) {
        obj.vueObj.$confirm('对不起，您的登录状态已过期，请重新登录', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log("Redirect to login page.")
          router.push({
            path: "/login"
          });
          clientStatus = 1
        }).catch(() => {
          console.log("Cancel redirect to login page.")
          clientStatus = 1
        });
      }
      //响应时，将按钮置为可用
      if (obj.vueObj) {
        obj.vueObj.$data.buttonDisabled = false
      }
      // console.log(res)
      if (res.data.statusCode == "811006") {
        resetToken($axios_http, obj, resolve)
      } else if (res.data.statusCode == "811007") {
        if (!sessionStorage.getItem('token')) {
          // window.sessionStorage.clear();
          router.push({
            path: "/login"
          });
        } else {
          if (clientStatus == 1) {
            obj.vueObj.$confirm('对不起，您的登录状态已过期，请重新登录', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              console.log("Redirect to login page.")
              router.push({
                path: "/login"
              });
              clientStatus = 1
            }).catch(() => {
              console.log("Cancel redirect to login page.")
              clientStatus = 1
            });
            clientStatus = 2;
          }
        }
      } else if (res.data.statusCode == "000000") {
        resolve(res);
      } else if (res.data.statusCode == "860028") {
        resolve(res);
      } else if (res.data.statusCode == "860003") {
        resolve(res);
      } else if (res.data.statusCode == "880005") {
        resolve(res);
      } else if (res.data.statusCode == "900002") {
        resolve(res);
      } else if (res.data.statusCode == "860004") {
        resolve(res);
      } else if (res.data.statusCode == "860029") {
        resolve(res);
      }else if(res.data.statusCode == "860025"){
        resolve(res);
      }else if(res.data.statusCode == "880014"){
        resolve(res);
      }else if(res.data.statusCode == "880004"){
        resolve(res);
      }else if (res.data.statusCode == "860030") {
        resolve(res);
        // }else if(res.data.statusCode=="900005"){
        //   resolve(res);
        // }else if(res.data.statusCode=="900001"){
        //   resolve(res);
        // }else if(res.data.statusCode=="811017"){
        //   resolve(res);
        // }else if(res.data.statusCode=="811019"){
        //   resolve(res);
        // }else if(res.data.statusCode=="811021"){
        //   resolve(res);
        // }else if(res.data.statusCode=="811010"){
        //   resolve(res);
        // }else if(res.data.statusCode=="811013"){
        //   resolve(res);
        // }else if(res.data.statusCode=="811018"){
        //   resolve(res);
        // }else if(res.data.statusCode=="811020"){
        //   resolve(res);
        // }else if(res.data.statusCode=="824015"){
        //   resolve(res);
        // }else if(res.data.statusCode=="850208"){
        //   resolve(res);
      } else if (res.data.statusCode == "1000001") {
        resolve(res);
      } else if (res.data.statusCode == "811027") { //拦截初始状态
        if (clientStatus == 1) {
          // clientStatus = 2;
          obj.vueObj.$confirm('对不起，您的登录状态已过期，请重新登录', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            console.log("Redirect to login page.")
            router.push({
              path: "/login"
            });
            clientStatus = 1
          }).catch(() => {
            console.log("Cancel redirect to login page.")
            clientStatus = 1
          });
          clientStatus = 2;
        }
      } else {
        console.log(res);
        // if(obj.vueObj.$router.history.current.path=='/biology/sendExpress'){   //寄出样本表单校验
        //   obj.vueObj.$store.commit('get_checkCourierNumber', false)
        // }
        //弹出错误提示框
        window.$failMsg(obj.vueObj, res.data.statusMsg)
        // "["+ res.data.statusCode + "]"
        // console.log("报错undefined")
        //console.log(res)
        // alert(res.data.statusMsg+".["+res.data.statusCode+"]"+"error");

        //  resolve(res);
        //   alert(res.data.statusMsg+".["+res.data.statusCode+"]");

        // router.push({path: "/login"});
      }

    }).catch(function (err) {
      reject(err);
    })
  })
}

window.$successMsg = function (obj, content, customDuration) {
  var successMsg = "操作成功."
  var durationValue = 3000
  if (content) {
    successMsg = content
  }
  if (customDuration) {
    durationValue = customDuration
  }
  obj.$message({
    message: successMsg,
    duration: durationValue,
    type: 'success'
  });
}
window.$failMsg = function (obj, content, customDuration) {
  var failMsg = "失败"
  var durationValue = 3000
  if (content) {
    failMsg = content
  }
  if (customDuration) {
    durationValue = customDuration
  }
  if (obj) {
    obj.$message.error({
      message: failMsg,
      duration: durationValue,
      type: 'success'
    });
  }
}


window.dialogAuth = (dialogObj, name) => {
  if (window.localStorage.getItem(name) == name) {
    dialogObj[name] = true
  } else {
    Message.error('抱歉，您没有该权限！')
  }
}
Vue.prototype.goBack = function () {
  router.go(-1)
}

// if(store.state.regionOptions.length==0){
//   $axios_http({
//     url:"/base/department/getAllOtherDepts/1",
//     data:{},
//   }).then((res)=>{
//     store.state.regionOptions = res.data.data
//   })
// }
Vue.prototype.checkPageAuth = function (obj, pageName, btnData) {
  if (window.localStorage.getItem(pageName) == pageName) {
    obj[pageName] = true;
    if (obj[pageName] == true) {
      for (var i in btnData) {
        if (window.localStorage.getItem(i) == i) {
          btnData[i] = true;
        }
      }
    }
  } else {
    console.log("没有页面权限")


    $failMsg(this, "对不起，您没有此页面的权限，请联系管理员.")
    window.history.go(-1)
    setTimeout(function () {
      router.go(0)


    }, 200)


  }
}
//重置token方法
function resetToken(callback, obj, resolve) {
  axios({
    method: 'post',
    url: global.SERVER_NAME + "/auth/renewToken",
    withCredentials: true
  }).then(function (res) {
    console.log("Reset token response:")
    // console.log(res)
    if (res.data.statusCode == "000000") {
      console.log("Reset token success，new token info：")
    } else if (res.data.statusCode == "811009") {
      console.log("No need to reset token.")
    }
    callback(obj).then((res) => {
      resolve(res)
    })
  })
}
// 按钮权限判断
window.authority = (id) => {
  let btnArr = window.localStorage.getItem('btnArr');
  if (btnArr.indexOf(id) < 0) {
    //无权限
    Message.error('抱歉，您没有该权限！')
    return true;
  }
}

/*router.afterEach(() => {
  NProgress.done(); // 结束Progress
});*/

Vue.config.productionTip = false;

// 生产环境错误日志
if (process.env.NODE_ENV === 'production') {
  Vue.config.errorHandler = function (err, vm) {
    // console.log(err, window.location.href);
  };
}

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})

const whiteList = ['/login', '/dashboard'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth == window.localStorage.getItem(to.meta.requireAuth)) {
    next()
  } else {
    Message.error('抱歉，您没有该权限！')
  }
})
