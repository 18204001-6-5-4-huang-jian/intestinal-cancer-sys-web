<template>
  <div class="container" id="nav">
    <el-menu class="navbar" mode="horizontal">
      <img src="../../assets/portrait/logo1.png" alt="" class="logoImg">
      <el-dropdown class="avatar-container" hide-on-click >
        <div class="avatar-wrapper">
          <span>欢迎您，{{loginName}}</span>
          <img class="user-avatar" src="../../assets/portrait/avatar-1.jpg" >
          <!--<i class="el-icon-caret-bottom"></i>-->
        </div>
        <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <!--<router-link class='inlineBlock' to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>-->
          <el-dropdown-item><span @click="modifyPassword" style="display:block;">修改密码</span></el-dropdown-item>
          <el-dropdown-item divided><span @click="logout" style="display:block;">退出</span></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>
    <!-- 修改密码弹出框 -->
    <el-dialog title="修改密码" :visible.sync="dialogVisiblePass" style="z-index:800" :modal-append-to-body=false>
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="160px" class="demo-ruleForm">
        <el-form-item label="请输入原密码" prop="oldpass">
          <el-input type="password" v-model="ruleForm2.oldpass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="请输入新密码" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="请再次输入新密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
          <el-button type="primary" @click="dialogVisiblePass=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import axios from 'axios'
  import router from '../../router';
  export default {
    data() {
      var checkOldPass = (rule, value, callback) => { if (!value) { return callback(new Error('原密码不能为空')); } 
      let oldArr=value.toString().split(""); 
      setTimeout(() => { if (oldArr.indexOf("/")>-1||oldArr.indexOf("\\")>-1) { callback(new Error('原密码输出错误，请重新输入')); } else { if (oldArr.length
        < 6|| oldArr.length>16) { callback(new Error('密码长度应该是6-16位')); } else { callback(); } } }, 1000); }; 
        var validatePass = (rule, value, callback) => { if (value === '') { callback(new Error('新密码不能为空')); }else if(value.indexOf("\\")>-1||value.indexOf("/")>-1){ callback(new Error('新密码不能包含非法字符')); }else if(value.length
        < 6|| value.length>16){ callback(new Error('密码长度应该是6-16位')); }else{ if (this.ruleForm2.checkPass !== '') { this.$refs.ruleForm2.validateField('checkPass'); } callback(); } }; var validatePass2 = (rule, value, callback) => { if (value === '') { callback(new Error('请再次输入密码')); } else if (value !== this.ruleForm2.pass) { callback(new Error('两次输入密码不一致!')); } else { callback(); } };
      return {
        loginName:'',
        dialogVisiblePass:false,
        ruleForm2: {
          pass: '',
          checkPass: '',
          oldpass: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          oldpass: [
            { validator: checkOldPass, trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'name',
        'avatar'
      ])
    },
    mounted(){
       this.getUser()
      /*var strCookie = document.cookie;
      var arrCookie = strCookie.split("; ");
      for(var i = 0; i < arrCookie.length; i++){
        var arr = arrCookie[i].split("=");
        if('nickName' == arr[0]){
          this.loginName=decodeURI(decodeURI(arr[1]));
        }
      }*/
    },
    methods: {
      getUser(){
        var session = sessionStorage.getItem("token").split(";")
        for(var i = 0; i < session.length; i++){
          var arr = session[i].split("=");
          if(arr[0]=='nickName'){
            this.loginName = arr[1]
          }
        }
      },
      logout() {
        this.$confirm('您确认要退出登录吗？', '退出登录提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          $axios_http({
            url: "/auth/loginout",
            data: {},
            vueObj: this
          }).then((res) => {
            router.push({path: "/login"});
            window.localStorage.clear();
            window.sessionStorage.clear();
          })

        }).catch(function(err){
          console.log("取消登出"+err)
        });
      },
      modifyPassword(){
        console.log("已点击修改密码")
        // this.dialogVisiblePass=true;
        this.$router.push('/updatePassword');
      },
      submitForm(formName) {
        // console.log(valid);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            $axios_http({
              url: "/base/user/changepwd",
              data: {
                // loginName:this.$route.query.loginName,
                oldpwd:this.ruleForm2.oldpass,
                pwd:this.ruleForm2.pass
              },
              vueObj: this
            }).then((res) => {
              if(res.data.statusCode==824007){
                $failMsg(this, "用户原密码错误,请重试");
                this.ruleForm2.oldpass="";
                this.ruleForm2.pass="";
                this.ruleForm2.checkPass="";
              }else{
                $successMsg(this, "密码修改成功");
                this.ruleForm2.oldpass="";
                this.ruleForm2.pass="";
                this.ruleForm2.checkPass="";
                this.dialogVisiblePass=false;

              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 51px;
    line-height: 50px;
    background: #ffffff !important;
    border-radius: 0px !important;
    margin-bottom: 10px;
    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }
    .errLog-container {
      display: inline-block;
      position: absolute;
      right: 150px;
    }
    .screenfull {
      position: absolute;
      right: 105%;
      top: 16px;
      color: red;
    }
    .avatar-container {
      height: 50px;
      display: inline-block;
      position: absolute;
      right: 35px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }

</style>
<style>
  .logoImg{
    height: 50px;
  }
  #nav .v-model{
    z-index:980!important;
  }
</style>


