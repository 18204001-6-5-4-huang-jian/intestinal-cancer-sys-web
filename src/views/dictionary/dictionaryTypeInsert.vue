<template>
	<div class="zindex" v-if="page_dictionaryType_add">
		<div class="contentMain">
      <div class="formWidth">
          <el-form :model="insertForm" :rules="rules" ref="insertForm">
                <el-form-item label="英文名称" :label-width="formLabelWidth" prop="enName">
                  <el-input v-model="insertForm.enName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="中文名称" :label-width="formLabelWidth" prop="cnName">
                  <el-input v-model="insertForm.cnName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                  <div class="dialog-footer">
                   <router-link to="/dictionary/dictionaryType"><el-button size="small">返 回</el-button></router-link>
                   <el-button size="small" type="primary" @click="add('insertForm')" v-if="btnAuth.buttonDictionaryTypeAddSave">保 存</el-button>
                  </div>
              </el-form-item>
              </el-form>
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
              queryResult:{
                    "pageNo":1,//当前页
                    "pageSize":10,//每页的条数
                    "totalPageCount":0,
                    "tableData":[],
                    "operationData":[]
                },
                 page_dictionaryType_add:false,
                btnAuth:{
                    buttonDictionaryTypeAddSave:false,
                },
                //添加表单数据对象
                "insertForm":{
                    "enName":"",
                    "cnName":""
                },
                formLabelWidth: '80px',
                rules:{
                    enName:[
                        {required:true,message:'请输入英文名称',trigger:'blur'},
                        {min:1,max:32,message:'长度在1到32个字符',trigger:'blur'}
                    ],
                    cnName:[
                        {required:true,message:'请输入中文名称',trigger:'blur'},
                        {min:1,max:16,message:'长度在1到16个字符',trigger:'blur'}
                    ]
                }
            }
        },
        mounted(){
          let obj = this.checkPageAuth(this,"page_dictionaryType_add",this.btnAuth);
          $axios_http({
              url:"/base/dictionaryType/query",
              data:{},
              vueObj:this
          }).then((res)=>{
              console.log('Init query qc.类型 select data list response.')
              console.log(res)
              this.queryResult.operationData=res.data.data
          })
        },
        methods:{
            //保存一条新增数据
            add(formName){
                this.$refs[formName].validate((valid) => {
                  if (valid) {
                    console.log("Add dict type event.")

                    $axios_http({
                        url:"/base/dictionaryType/insert",
                        data:this.insertForm,
                        vueObj:this
                    }).then( (res)=> {
                        console.log("Add dict type response.")
                        //显示操作成功浮动提示框
                        $successMsg(this,"添加成功")
                        this.$router.push({ path: '/dictionary/dictionaryType'})
                        //重新查询
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
