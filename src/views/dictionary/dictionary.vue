<template>
    <div slot="right" class="content-page" v-if="page_dictionary">
        <div class="content">
             <div class="filter-container" >
              <el-form :model="qc" :inline=true>
                <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="key" v-model="qc.key"  v-if="btnAuth.buttonDictionaryQuery">
                </el-input>
                <el-button class="filter-item" size="small" type="primary" icon="el-icon-search" @click="query" v-if="btnAuth.buttonDictionaryQuery">查询</el-button>
                <router-link to="/dictionary/dictionaryInsert"><el-button class="filter-item"  size="small"  type="primary" icon="el-icon-plus" v-if="btnAuth.buttonDictionaryAdd">添加</el-button></router-link>
                <el-button class="filter-item" type="primary" size="small" icon="el-icon-close" @click="reset" v-if="btnAuth.buttonDictionaryQuery">重置</el-button>
              </el-form>
            <div class="">
                <!--数据列表-->
                <el-table
                    :data="queryResult.tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                      type="index"
                      width="80"
                      label="序号">
                    </el-table-column>
                    <el-table-column
                      prop="key"
                      label="类型"
                      width="280">
                    </el-table-column>
                    <el-table-column
                      prop="label"
                      label="描述"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="value"
                      label="值"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      label="操作">
                      <template slot-scope="scope">
                        <router-link :to="{path:'/dictionary/dictionaryUpdate',query:{id:scope.row.id}}"><el-button type="text" icon="el-icon-edit" @click="edit(scope.row.id)" size="small" title="编辑" v-if="btnAuth.buttonDictionaryUpdate"></el-button>
                        </router-link>
                        <el-button type="text" @click="del(scope.row.id)" icon="el-icon-delete" size="small" title="删除" v-if="btnAuth.buttonDictionaryDel"></el-button>
                      </template>
                    </el-table-column>
                  </el-table>

                  <el-row>
                    <el-col :span="10"><div class="grid-content bg-purple"></div></el-col>
                    <el-col :span="14">
                      <div class="block" style="margin-top: 18px">
                        <el-pagination
                          @size-change="pageSizeChange"
                          @current-change="currentPageChange"
                          :current-page="this.$store.state.dictionaryPageNo"
                          :page-sizes="[10, 20, 50, 100]"
                          v-bind:page-size="this.$store.state.dictionaryPageSize"
                          layout="total, sizes, prev, pager, next, jumper"
                          v-bind:total="queryResult.totalRowCount">
                        </el-pagination>
                      </div>
                    </el-col>
                  </el-row>


              </div>
            <router-view></router-view>
        </div>
    </div>
</div>
</template>
<script>
    export default {
        name: 'Right',
        data () {
            return {
                page_dictionary:false,
                btnAuth:{
                    buttonDictionaryAdd:false,
                    buttonDictionaryUpdate:false,
                    buttonDictionaryDel:false,
                    buttonDictionaryQuery:false,
                },
                //查询条件
                "qc":{
                    "key":""
                },
                //查询结果
                queryResult:{
                    "pageNo":1,//当前页
                    "pageSize":10,//每页的条数
                    "totalPageCount":0,
                    "tableData":[],
                    "operationData":[]
                },
                pidData:[],
                insertDialogVisible: false,
                updateDialogVisible: false,
                buttonDisabled:false,
                formLabelWidth: '80px',
                rules:{
                    key:[
                        {required:true,message:'请选择字典类型',trigger:'change'}
                    ],
                    value:[
                        {required:true,message:'请输入value',trigger:'blur'},
                        {min:1,max:32,message:'长度在1到32个字符',trigger:'blur'}
                    ],
                    desc:[
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
             let obj = this.checkPageAuth(this,"page_dictionary",this.btnAuth);
            //初始化页面查询一次
            this.query();
        },
        methods:{
            insertDialogVisibleFn(formName){
                this.insertDialogVisible=true
                //对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
                  this.$nextTick(function() {
                    this.$refs[formName].resetFields();
                  })
            },
            //查询
            query(){
                console.log("Query dict data event.")
                console.log(this.qc.key)

                $axios_http({
                    url:"/base/dictionary/query",
                    data:{
                        key:this.qc.key,
                        pageNo:this.$store.state.dictionaryPageNo,//当前页
                        pageSize:this.$store.state.dictionaryPageSize//每页条数
                    },
                    vueObj:this//将当前VUE对象传递给发送请求上一层代码，便于对当前页面做操作
                }).then((res)=>{
                    console.log("Quert dict data response.22222222")
                    console.log(res)
                    //将查询结果数据赋值给数据对象
                    this.queryResult.tableData=res.data.data
                    this.queryResult.totalPageCount=res.data.pageInfo.totalPageCount//获取总共多少页
                    this.queryResult.totalRowCount=res.data.pageInfo.totalRowCount//获取总共条数
                })
            },
            //重置检索条件
            reset(){
                console.log("Clear query conditions.")

                Object.assign(this.$data.qc, this.$options.data().qc)
                this.query()
            },
            //删除一条数据
            del(id){
                this.$confirm('确认删除数据?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                    console.log("Delete dict Data event.")

                    $axios_http({
                        url:"/base/dictionary/del/"+id,
                        vueObj:this
                    }).then((res)=>{
                        console.log("Delete dict Data response.")
                        $successMsg(this,"删除成功")
                        this.query()
                    })
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消删除'
                  });
                });
            },
            //弹出编辑对话框
            edit(id){
                console.log("Get dict data event.")

                $axios_http({
                    url:'/base/dictionary/get/'+id,
                    vueObj:this
                }).then((res)=>{
                    console.log("Get dict data response.")
                    console.log(res)
                    this.updateForm = res.data.data

                    console.log(this.updateForm)
                    this.updateDialogVisible = true
                })
            },
            //每页显示查询结果条数变更事件，做重新查询操作
            pageSizeChange(pageSize) {
                console.log("---------")

                //this.queryResult.pageSize = pageSize
                this.$store.commit('get_dictionaryPageSize',pageSize)
                console.log(`每页 ${pageSize} 条`)
                this.query()
            },
            //切换当前页事件，做重新查询操作
            currentPageChange(currentPage) {
                //this.queryResult.pageNo = currentPage
              this.$store.commit('get_dictionaryPageNo',currentPage)
                console.log(`当前页: ${currentPage}`);
                this.query()
            }

        }}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  /*  .isremove{
        padding:0 0 15px 50px;
        font-size: 16px;
        font-weight: bolder;
    }
    .removeBox{
        overflow: hidden;
    }
    .isSure{
        position: absolute;right:20px;bottom: 10px;

    }
    .sure{
        font-size: 14px;
        margin-left: 10px;
    }*/
    /* @import "../css/right.css" */
</style>
