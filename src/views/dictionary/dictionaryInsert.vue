<template>
	<div class="zindex" v-if="page_dictionary_add">
		<div class="contentMain">
      <div class="formWidth">
          <el-form :model="insertForm" :rules="rules" ref="insertForm">
                <el-form-item label="类型" prop="key" :label-width="formLabelWidth">
                    <el-select v-model="insertForm.key" filterable placeholder="请选择字典类型">
                      <el-option v-for='item in queryResult.operationData' :key="item.id" :label="item.cnName" :value="item.enName"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="值" :label-width="formLabelWidth" prop="value">
                  <el-input v-model="insertForm.value" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述" :label-width="formLabelWidth" prop="label">
                  <el-input v-model="insertForm.label" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                  <div class="dialog-footer">
                   <router-link to="/dictionary/dictionary"><el-button size="small">返 回</el-button></router-link>
                   <el-button size="small" type="primary" @click="add('insertForm')" v-if="btnAuth.buttonDictionaryAddSave">保 存</el-button>
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
              queryResult:{
                    "pageNo":1,//当前页
                    "pageSize":10,//每页的条数
                    "totalPageCount":0,
                    "tableData":[],
                    "operationData":[]
                },
                page_dictionary_add:false,
                btnAuth:{
                    buttonDictionaryAddSave:false,
                },
                //添加表单数据对象
                 "insertForm":{
                    "value":"",
                    "label":"",
                    "pId":"1",
                    "key": "",
                    "sort": 0
                },
                formLabelWidth: '80px',
                rules:{
                    key:[
                        {required:true,message:'请选择字典类型',trigger:'change'}
                    ],
                    value:[
                        {required:true,message:'请输入value',trigger:'blur'},
                        {min:1,max:32,message:'长度在1到32个字符',trigger:'blur'}
                    ],
                    label:[
                        {required:true,message:'请输入字典数据的描述信息',trigger:'blur'},
                        {min:1,max:16,message:'长度在1到16个字符',trigger:'blur'}
                    ],
                    sort:[
                        {data:'int',required:true,message:'请输入字典数据的序号',trigger:'blur'},
                        {min:1,max:10,message:'长度在1到64个字符',trigger:'blur'}
                    ]

                }
            }
        },
        mounted(){
          let obj = this.checkPageAuth(this,"page_dictionary_add",this.btnAuth);
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
                    $axios_http({
                        url:"/base/dictionary/insert",
                        data:this.insertForm,
                        vueObj:this
                    }).then((res)=> {
                        //显示操作成功浮动提示框
                        $successMsg(this,"添加成功")
                        this.$router.push({ path: '/dictionary/dictionary'})
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
