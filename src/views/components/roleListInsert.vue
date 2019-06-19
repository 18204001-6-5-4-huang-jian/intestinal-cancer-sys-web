<template>
	<div class="zindex" v-if="rolePageAdd">
		<div class="contentMain">
      <div class="formWidth">
          <el-form :model="insertForm" :rules="rules" ref="insertForm">
            <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
              <el-input v-model="insertForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="desc" :label-width="formLabelWidth" prop="desc">
              <el-input v-model="insertForm.desc" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
            <div class="dialog-footer">
             <router-link to="/components/role"><el-button size="small">返 回</el-button></router-link>
             <el-button size="small" type="primary" @click="add('insertForm')" v-if="btnAuth.buttonRoleAddSave">保 存</el-button>
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
                rolePageAdd:false,
                btnAuth:{
                    buttonRoleAddSave:false,
                },
                //添加表单数据对象
                "insertForm":{
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
          let obj = this.checkPageAuth(this,"rolePageAdd",this.btnAuth);
        },
        methods:{
            //保存一条新增数据
            add(formName){
                 this.$refs[formName].validate((valid) => {
                  if (valid) {
                    $axios_http({
                        url:"/base/role/insert",
                        data:this.insertForm,
                        vueObj:this
                    }).then((res)=> {
                        //显示操作成功浮动提示框
                        $successMsg(this,"添加成功")
                        this.$router.push({ path: '/components/role'})
                        //清空添加数据对话框数据
                        Object.assign(this.$data.insertForm, this.$options.data().insertForm)
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
