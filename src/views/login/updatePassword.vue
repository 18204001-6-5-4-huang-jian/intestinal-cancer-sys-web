<template>
  <div class="change-container">
    <div class='top'>
      <img src="../../assets/img/login_logo.png" alt="logo" class="login-img">
      <p class="tips">为了数据安全，请您修改登录密码！</p>
      </div>
   <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="旧密码" prop="pwd">
        <el-input type="password" v-model="ruleForm2.pwd" auto-complete="off"  placeholder="请输入旧密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd">
        <el-input type="password" v-model="ruleForm2.newPwd" auto-complete="off"  placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"  placeholder="请再次输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="capText" label="验证码">
          <el-input name="capText" type="text"  v-model="ruleForm2.capText" autoComplete="on"
                    placeholder="图片校验码" @keyup.enter.native="updatePsd('ruleForm2')" class="yanzheng fl"></el-input>
          <span class="svg-container"  @click="changeImgUrl"><img id="codeImg" style="vertical-align:middle;height:40px;" alt="点击更换" title="图片验证" :src="imgUrl"/></span>
          <span style="color:#52a2e5;cursor:pointer;" @click="changeImgUrl">看不清,换一张</span>
        </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updatePsd('ruleForm2')">确认</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('新密码不能为空'));
        } else {
          if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(value))) {
            callback(new Error('新密码只能由字母和数字组成，长度为6-16位'))
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(value))) {
            callback(new Error('新密码只能由字母和数字组成，长度为6-16位'))
          }else if (value !== this.ruleForm2.newPwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        imgUrl:'',
        ruleForm2: {
          pwd: '',
          newPwd: '',
          checkPass:'',
          capText: ''
        },
        rules2: {
          pwd: [
            { required: true,message:'旧密码不能为空' , trigger: 'blur' }
          ],
          newPwd: [
            { required: true,message:'新密码不能为空' , trigger: 'blur' },
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { required: true,message:'请再次输入密码' , trigger: 'blur' },
            { validator: validatePass2, trigger: 'blur' }
          ],
          capText: [
            { required: true,message:'验证码不能为空' , trigger: 'blur' }
          ]
        }
      };
    },
     mounted(){
      this.changeImgUrl()
    },
    methods: {
      changeImgUrl(){
        var num=Math.ceil(Math.random()*10);
        this.imgUrl=SERVER_NAME+'/auth/authCode/updateimages?'+num
      },
      updatePsd(formName) {
        var that=this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            $axios_http({
              url: '/base/user/changepwd',
              data: {
                // loginName: window.sessionStorage.getItem('loginName')?window.sessionStorage.getItem('loginName'):window.sessionStorage.getItem('token_nickname'),
                pwd: this.ruleForm2.pwd,
                newPwd:this.ruleForm2.newPwd,
                capText: this.ruleForm2.capText
              },
              vueObj: this
            }).then((res)=>{
              this.$message({
                type:'success',
                message:'修改密码成功',
                duration:1000
              })
              setTimeout(function(){
                that.$router.push('/login')
              },1000)
              
            })
          } else {
            return false;
          }
        });
      },
      cancel(){
        this.$router.push('/login')
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scope>
.change-container{
  width: 800px;
  background: #fff;
  padding:10px 30px 30px;
  margin: 100px auto;
  .top{
    width: 100%;
    img{
      width: 300px;
      margin: 0 auto;
      display: block;
    }
  }
  form{
    width: 500px;
    margin:0 auto;
    .yanzheng{
      width: 150px;
      margin-right:10px;
    }
  }
  .tips{
    color: red;
    text-align: center;
    margin:30px 0 15px;
  }
}
  
</style>
