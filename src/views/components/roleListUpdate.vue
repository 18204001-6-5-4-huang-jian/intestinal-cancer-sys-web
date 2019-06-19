<template>
	<div class="zindex" v-if="rolePageEditor">
		<div class="contentMain">
      <div class="formWidth">
        <el-form :model="updateForm" ref="updateForm" :rules="rules">
            <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="updateForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="desc" :label-width="formLabelWidth" prop="desc">
            <el-input v-model="updateForm.desc" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="dialog-footer">
              <router-link to="/components/role"><el-button size="small">返 回</el-button></router-link>
              <el-button type="primary" size="small" @click="update('updateForm')" v-if="btnAuth.buttonRoleEditorSave">保 存</el-button>
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
                 rolePageEditor:false,
                btnAuth:{
                    buttonRoleEditorSave:false,

                },
                //编辑表单数据对象
                "updateForm":{
                    "id":null,
                    "name":"",
                    "desc":""
                },
                formLabelWidth: '80px',
                rules:{
                  name:[
                    {required:true,message:'请输入角色名称',trigger:'blur'},
                    {min:1,max:16,message:'长度在1到16个字符',trigger:'blur'}
                  ],
                  desc:[
                    {required:true,message:'请输入角色描述信息',trigger:'blur'},
                    {min:1,max:32,message:'长度在1到32个字符',trigger:'blur'}
                  ]
                }
            }
        },
        mounted(){
        	let obj = this.checkPageAuth(this,"rolePageEditor",this.btnAuth);
            $axios_http({
            	url:'/base/role/get/'+this.$route.query.id,
            	data:{},
            	vueObj:this
            }).then((res)=>{
            	console.log('this is role res')
            	console.log(res)
            	this.updateForm=res.data.data
            })
        },
        methods:{
           //更新一条旧数据
            update(formName){
              this.$refs[formName].validate((valid) => {
                if (valid) {
                  $axios_http({
                    url:'/base/role/update',
                    data:this.updateForm,
                    vueObj:this
                  }).then((res)=>{
                      console.log("Update dict type response.")
                      $successMsg(this,"编辑成功")
                      //关闭更新数据对话框
                      this.$router.push({ path: '/components/role'})
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