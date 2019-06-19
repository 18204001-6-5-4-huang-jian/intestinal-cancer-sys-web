<template>
    <div class="zindex" v-if="userPageEditor">
    	<div class="contentMain">
        <div class="formWidth">
    		<el-form :model="updateForm" :rules="rules" ref="updateForm">
          <el-form-item label="编号" :label-width="formLabelWidth">
            <el-input v-model="updateForm.encode" auto-complete="off" placeholder="请输入编号"></el-input>
          </el-form-item>
          <el-form-item label="用户名" :label-width="formLabelWidth" prop="nickName">
            <el-input v-model="updateForm.nickName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="登录名" :label-width="formLabelWidth" prop="loginName">
            <el-input v-model="updateForm.loginName" auto-complete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
            <el-input v-model="updateForm.phone" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" :label-width="formLabelWidth">
            <el-input v-model="updateForm.tel" auto-complete="off" placeholder="请输入联系电话"></el-input>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth">
            <el-input v-model="updateForm.address" auto-complete="off" placeholder="请输入地址"></el-input>
          </el-form-item>
          <el-form-item label="传真" :label-width="formLabelWidth">
            <el-input v-model="updateForm.facsimile" auto-complete="off" placeholder="请输入传真"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱" :label-width="formLabelWidth">
            <el-input v-model="updateForm.email" auto-complete="off" placeholder="请输入电子邮箱"></el-input>
          </el-form-item>
          <el-form-item label="QQ" :label-width="formLabelWidth">
            <el-input v-model="updateForm.qq" auto-complete="off" placeholder="请输入QQ"></el-input>
          </el-form-item>
          <el-form-item>
              <div class="dialog-footer">
                  <router-link to="/components/userList"><el-button size="small">返 回</el-button></router-link>
                  <el-button type="primary" size="small" @click="update('updateForm')" v-if="btnAuth.buttonUserEditorSave">保 存</el-button>
              </div>
          </el-form-item>
        </el-form>
      </div>
    	</div>
    </div>
</template>
<script>
	export default {
        name: 'Right',
        data () {
            return {
                btnAuth:{
                    buttonUserEditorSave:false
                },
                userPageEditor:false,
                //编辑表单数据对象
                "updateForm":{
                  "userId":'',
                  "nickName":"",
                  "loginName":"",
                  "phone":"",
                  "pwd":"",
                  "encode":'',
                  "address":'',
                  "facsimile":'',
                  "email":'',
                  "qq":'',
                  "tel":''
                },
                userId:"",
                formLabelWidth: '100px',
                rules:{
                    nickName:[
                        {required:true,message:'请输入用户昵称',trigger:'blur'},
                        {min:1,max:64,message:'长度在1到64个字符',trigger:'blur'}
                    ],
                    loginName:[
                        {required:true,message:'请输入登录名',trigger:'blur'},
                        {min:1,max:128,message:'长度在1到128个字符',trigger:'blur'}

                    ],
                    phone:[
                      {required:true,message:'请输入手机号',trigger:'blur'},

                    ]
                }
            }
        },
        mounted(){
            let obj = this.checkPageAuth(this,"userPageEditor",this.btnAuth)
          $axios_http({
            url:'/base/user/get/'+this.$route.query.id,
            vueObj:this
          }).then((res)=>{
            console.log('this is userid res')
            console.log(res)
            this.updateForm=res.data.data
 			    })
        },
        methods:{
            //更新一条旧数据
            update(formName){
                this.$refs[formName].validate((valid) => {
                  if (valid) {
                    this.updateForm.userId=this.$route.query.id
                    $axios_http({
                    url:'/base/user/update',
                    data:this.updateForm,
                    vueObj:this
                    }).then((res)=>{
                        console.log(res)
                        $successMsg(this,"编辑成功")
                        this.$router.push({ path: '/components/userList'})
                    })
                      } else {
                        console.log('error submit!!');
                        return false;
                      }
                    });
            }
        }}
</script>
<style scoped>

</style>
