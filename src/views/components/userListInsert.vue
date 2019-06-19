<template>
  <div class="zindex" v-if="userPageAdd">
    <div class="contentMain">
      <div class="formWidth">
        <el-form :model="insertForm" :rules="rules" ref="insertForm">
          <el-form-item label="编号" :label-width="formLabelWidth">
            <el-input v-model="insertForm.encode" auto-complete="off" placeholder="请输入编号"></el-input>
          </el-form-item>
          <el-form-item label="用户名" :label-width="formLabelWidth" prop="nickName">
            <el-input v-model="insertForm.nickName" auto-complete="off" placeholder="请输入用户昵称"></el-input>
          </el-form-item>
          <el-form-item label="登录名" :label-width="formLabelWidth" prop="loginName">
            <el-input v-model="insertForm.loginName" auto-complete="off" placeholder="请输入登录名"></el-input>
          </el-form-item>
          <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
            <el-input v-model="insertForm.phone" type="number" auto-complete="off" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" :label-width="formLabelWidth">
            <el-input v-model="insertForm.tel" auto-complete="off" type="number" placeholder="请输入联系电话"></el-input>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth">
            <el-input v-model="insertForm.address" auto-complete="off" placeholder="请输入地址"></el-input>
          </el-form-item>
          <el-form-item label="传真" :label-width="formLabelWidth">
            <el-input v-model="insertForm.facsimile" auto-complete="off" placeholder="请输入传真"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱" :label-width="formLabelWidth">
            <el-input v-model="insertForm.email" auto-complete="off" placeholder="请输入电子邮箱"></el-input>
          </el-form-item>
          <el-form-item label="QQ" :label-width="formLabelWidth">
            <el-input v-model="insertForm.qq" auto-complete="off" placeholder="请输入QQ"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="dialog-footer">
              <router-link to="/components/userList">
                <el-button size="small">返 回</el-button>
              </router-link>
              <el-button size="small" type="primary" @click="add('insertForm')">保 存</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        userPageAdd: false,
        btnAuth: {
          buttonUserAddSave: false
        },
        //添加表单数据对象
        "insertForm": {
          "nickName": "",
          "loginName": "",
          "phone": "",
          "pwd": "",
          "encode": '',
          "address": '',
          "facsimile": '',
          "email": '',
          "qq": '',
          "tel": '',
        },
        'formLabelWidth': '100px',
        'rules': {
          'nickName': [
            {required: true, message: '请输入用户昵称', trigger: 'blur'},
            {min: 1, max: 64, message: '长度在1到64个字符', trigger: 'blur'}
          ],
          'loginName': [
            {required: true, message: '请输入登录名', trigger: 'blur'},
            {min: 1, max: 128, message: '长度在1到128个字符', trigger: 'blur'}

          ],
          'phone': [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            {min: 11, max: 11, message: '长度为11位手机号', trigger: 'blur'}
          ]

        }
      }
    },
    mounted() {
      let obj = this.checkPageAuth(this, "userPageAdd", this.btnAuth)

    },
    methods: {
      //保存一条新增数据
      add(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            $axios_http({
              url: "/base/user/insert",
              data: this.insertForm,
              vueObj: this
            }).then((res) => {
              //显示操作成功浮动提示框
              $successMsg(this, "添加成功")
              //关闭添加数据对话框
              this.$router.push({path: '/components/userList'})
              //清空添加数据对话框数据
              //Object.assign(this.$data.insertForm, this.$options.data().insertForm)
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
<style scoped>

</style>
