<template>
  <div class="login-container">
    <div class="login">
      <div class="form-box">

        <img src="../../assets/img/login_logo.png" alt="logo" class="login-img">
        <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
        class="card-box login-form">
          <!--<el-form-item prop="loginName">
            <el-input name="loginName" type="text" v-model="loginForm.loginName" autoComplete="on" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="pwd">
            <el-input name="pwd" type="password"  v-model="loginForm.pwd" autoComplete="on"
              placeholder="密码" @keyup.enter.native="handleLogin('loginForm')"  @blur="checkMsg()"></el-input>
          </el-form-item>-->
        <!--<el-form-item prop="pwd">
          <el-input name="pwd" type="password"  v-model="loginForm.pwd" autoComplete="on"
                    placeholder="密码" @keyup.enter.native="handleLogin('loginForm')"  @blur="checkMsg()"></el-input>
        </el-form-item>-->
          <el-form-item prop="loginName">
            <i class="icon iconfont icon-user"></i>
            <el-input name="loginName" type="text" v-model="loginForm.loginName" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="pwd">
            <i class="icon iconfont icon-ico-pwd1"></i>
            <el-input name="pwd" type="password" v-model="loginForm.pwd" placeholder="密码"></el-input>
          </el-form-item>
        <el-form-item prop="capText">
          <el-input name="capText" type="text"  v-model="loginForm.capText" autoComplete="on"
                    placeholder="图片校验码" @keyup.enter.native="handleLogin('loginForm')" class="yanzheng"></el-input>
          <span class="svg-container"  @click="changeImgUrl"><img id="codeImg" style="width:100%;vertical-align:middle;height:40px;" alt="点击更换" title="图片验证" :src="imgUrl"/></span>
          <span style="color:#52a2e5;cursor:pointer;" @click="changeImgUrl">看不清,换一张</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%;" :loading="loading"  @click.native.prevent="handleLogin('loginForm')">
            登录
          </el-button>
        </el-form-item>
      </el-form>
      </div>
    </div>


  </div>
</template>

<script>
  import { isWscnEmail } from 'utils/validate';
  import socialSign from './socialsignin';
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";
  import ElForm from "../../../node_modules/element-ui/packages/form/src/form.vue";
  import ElInput from "../../../node_modules/element-ui/packages/input/src/input.vue";
  export default {
    components: {
      ElInput,
      ElForm,
      ElButton,
      socialSign },
    name: 'login',
    data() {
      const validatePass = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能小于6位'));
        } else {
          callback();
        }
      };
      return {
        disabled:false,
        nickName:'',
        imgUrl:SERVER_NAME+'/auth/authCode/images',
        testCode:'获取验证码',
        loginForm: {
          loginName: '',
          pwd: '',
          capText: ''
        },
        loginRules: {
          loginName: [
            { required: true,message:'用户名不能为空' , trigger: 'blur' }
          ],
          pwd: [
            { required: true,message:'密码不能为空' , trigger: 'blur' }
          ],
          capText: [
            { required: true,message:'请填写图片验证码' , trigger: 'blur' }
          ]
        },
        loading: false,
        showDialog: false,
        hospitalType:''

      }
    },
    mounted(){
      /*$axios_http({
        url:"/base/wx/images",
        vueObj:this
      }).then((res)=> {
        console.log("---------------------")
        console.log(res)
        $successMsg(this,"获取成功")
      })*/
      this.changeImgUrl()
    },
    methods: {
      checkMsg(){
      },
      changeImgUrl(){
        var num=Math.ceil(Math.random()*10);
        this.imgUrl=SERVER_NAME+'/auth/authCode/images?'+num
      },
      hasAuth(authName){
            localStorage.setItem(authName,authName)
      },
      handleLogin(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.isshow = false;
            $axios_http({
              url: '/auth/login',
              data: {
                loginName: this.loginForm.loginName.trim(),
                pwd: this.loginForm.pwd,
                capText: this.loginForm.capText
              },
              vueObj: this
            }).then((res) => {
              this.hospitalType=res.data.data.hospitalType;
              var strCookie = document.cookie;
              if (res.data.statusCode === '000000') {
                var strCookie = document.cookie;
                  var arrCookie = strCookie.split("; ");
                  for(var i = 0; i < arrCookie.length; i++){
                    var arr = arrCookie[i].split("=");
                    if('nickName' == arr[0]){
                      this.nickName=decodeURI(decodeURI(arr[1]));
                    }else if('COOKIE_XTYNAME' == arr[0]){
                      window.sessionStorage.setItem('COOKIE_XTYNAME',decodeURI(decodeURI(arr[1])));
                    }else if('COOKIE_XTYPHONE' == arr[0]){
                      window.sessionStorage.setItem('COOKIE_XTYPHONE',arr[1]);
                    }
                  }
                  var co = 'LOGINNAME=' + this.loginForm.loginName + ';TOKEN=' + res.data.data.token + ';nickName=' +this.nickName;
                  window.localStorage.clear()
                  window.sessionStorage.setItem('token',co);
                  window.sessionStorage.setItem('hospitalType',res.data.data.hospitalType);
                  this.$store.commit('get_hospitalType',window.sessionStorage.getItem('hospitalType'))
                  localStorage.setItem('communityType',res.data.data.communityType);    //是否社区操作员
                  localStorage.setItem('loginName',this.loginForm.loginName);    //社区操作员用户
                  if(res.data.data.firstLogin){
                    window.sessionStorage.setItem('loginName',res.data.data.loginName);
                    this.$router.push('/updatePassword')
                  }else{
                    $axios_http({
                      url: "/base/user/resource",
                      data: {},
                      vueObj: this
                    }).then((res)=> {

                      let btnArr=res.data.data.buttons;
                      let pageArr=res.data.data.pages;
                      localStorage.setItem('btnArr',btnArr);    //设置btnArr
                      for (var i = 0; i < btnArr.length; i++) {
                        this.hasAuth(btnArr[i]);
                      }
                      for(var j=0;j<pageArr.length;j++){
                        this.hasAuth(pageArr[j]);
                      }
                      this.$store.commit('allAuthResource',res.data.data.menu.child);
                      if(this.hospitalType==1){
                        this.$router.push({ path: '/home/home'})
                      }else if(this.hospitalType==2){
                        this.$router.push({ path: '/home/areaHome'})
                      }else if(this.hospitalType==3){
                        this.$router.push({ path: '/home/countryHome'})
                      }else if(this.hospitalType==4){
                        this.$router.push({ path: '/fileUpload/upload'})
                      }else{
                        this.$router.push({ path: '/dashboard'})
                      }
                        $axios_http({
                          url:"/base/department/getAllOtherDepts/1",
                          data:{},
                        }).then((res)=>{
                          this.$store.state.regionOptions = res.data.data
                        })

                      //this.totalData = res.data.data.menu.child;

                    })
                  }
              } else {

                //if (res.data.statusMsg === '811015'){
                  $failMsg(this, res.data.statusMsg);
              //}
//                $failMsg(this, "账号或密码错误，请重新登录");
                this.isshow = true;

                // console.log("111111111111111111")
                // this.alerts = true;

                // console.log(this.errmsg)
                //                 alert(res.data.statusCode + ' : ' + res.data.statusMsg);
              }
              //                if(res.response. == )
            }).catch((err) => {
            })
          }
        })
      },

    },
    created() {
        // window.addEventListener('hashchange', this.afterQRScan);
    },
    destroyed() {
        // window.removeEventListener('hashchange', this.afterQRScan);
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scope>
  // @import "src/styles/mixin.scss";
  .phone_error{
    color: #ff4949;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 37%;
    left: 35px;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 5px;
  }
  .testCode{
    color: #ff4949;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 55%;
    left: 35px;
  }
  .login-container {
    height: 100vh;
    // background-image: url(../../assets/img/login_bg.jpg);
     background-image: url(../../assets/img/login_bg1.jpeg);
    background-position-x: 66%;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px white inset !important;
      /*-webkit-text-fill-color: #fff !important;*/
      /*-webkit-box-shadow:none !important;*/
    }
    input {
      /*background: transparent !important;*/
     /* border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #eeeeee;
      height: 47px;*/
    }
    .login{
      width: 24%;
      float:right;
      min-width: 425px;
      height: 597px;
      margin: 7% 16% 0 auto;
      background-color: #fff;
    }
    .form-box{
      padding: 80px 0px 0px 0px;
      text-align: center;
    }
    .login-img{
      width: 80%;
    }
    .el-input {
      display: inline-block;
      height: 48px;
      width: 75%;
      margin-left: 83px;
      border-top:none;
    }
    .svg-container {
      display: inline-block;
      width: 100px;
      cursor:pointer;
      padding: 6px 0px 6px 0px;
      color: #889aa4;
      background: none;
      border:none;
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: #eeeeee;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      width: 400px;
      padding: 0px 35px 15px 35px;
      margin: 0 auto;

    }
    .big{
      text-align: left;
      border: none;
      height: 30px;
    }
    .el-form-item {
      /*border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;*/
      width: 100%;
      height: 42px;
      border: solid 1px #e1e1e1;
      border-radius: 4px;
      margin: 36px auto;
    }
    .forget-pwd {
      color: #fff;
    }
    .yanzheng{
      margin-left: -11px;
      width: 40%;
      border-top:none;
    }
    .svg-container{
      padding:0;
    }
    .icon{
      position: absolute;left:16px;
      color:#ccc;
    }
    .icon-ico-pwd1{
      left:23px;
    }
  }

</style>
<style>
 /* .el-input .el-input__inner{
    background: #fff !important;
  }*/
 input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill{
   background-color: rgb(20, 255, 189) !important;
 }
</style>
