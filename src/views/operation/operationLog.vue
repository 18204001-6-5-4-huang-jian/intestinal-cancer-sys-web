<template>
    <div slot="right" class="content-page" v-if="page_operation">
        <div class="content">
            <div class="filter-container" >
              <el-form :model="qc" :inline=true>
                <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="用户名称" v-model="qc.user"  v-if="btnAuth.buttonRoleQuery">
                </el-input>
                  <el-date-picker
                    v-model="value3"
                    type="datetimerange"
                    class="filter-item"
                    size="small"
                    placeholder="选择时间范围">
                  </el-date-picker>
                <el-button class="filter-item" size="small" type="primary" icon="el-icon-search" @click="query" v-if="btnAuth.button_operation">查询</el-button>
              </el-form>
                  <!--数据列表-->
                  <el-table
                      :data="queryResult.tableData"
                      border
                      style="width: 100%;">
                      <el-table-column
                        type="index"
                        label="序号"
                        width="80">
                      </el-table-column>
                      <el-table-column
                        prop="user"
                        label="用户名称"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="dateCreated"
                        label="操作时间"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="type"
                        label="操作事件"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="result"
                        label="操作结果"
                        >
                        <template slot-scope="scope">
                          <span>{{scope.row.result | changeResult}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="content"
                        label="操作内容"
                        width="300">
                      </el-table-column>
                    </el-table>
                  <!--分页栏-->
                  <el-row>
                    <el-col :span="10"><div class="grid-content bg-purple"></div></el-col>
                    <el-col :span="14"><div class="grid-content bg-purple">
                      <div class="block" style="margin-top: 18px">
                          <el-pagination
                            @size-change="pageSizeChange"
                            @current-change="currentPageChange"
                            :current-page="$store.state.pageNo"
                            :page-sizes="[10, 20, 50, 100]"
                            v-bind:page-size="$store.state.pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            v-bind:total="queryResult.totalRowCount">
                          </el-pagination>
                      </div>
                    </div></el-col>
                  </el-row>
            <router-view></router-view>
        </div>
    </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    Vue.filter('changeResult',function(value){
        if(value==0){
          return '操作成功'
        }else{
          return '操作失败'
        }
    })
    export default {
        name: 'Right',
        data () {
            return {
              //权限判定
              value3: [],
               page_operation:false,
                btnAuth:{
                    buttonRoleAdd:false,
                    buttonRoleEditor:false,
                    buttonRoleDel:false,
                    buttonRoleQuery:false,
                    buttonUserRoleDis:false,
                    button_operation:false
                },
                //查询条件
                "qc":{
                    "user":"",
                    "startTime":'',
                    "endTime":''
                },
                //查询结果
                "queryResult":{
                    "pageNo":1,//当前页
                    "pageSize":10,//每页的条数
                    "totalPageCount":0,
                    "tableData":[]
                },
                //分页
                "queryResultSource":{
                    "pageNoSource":1,//当前页
                    "pageSizeSource":15,//每页的条数
                    "totalPageCount":0
                },
                allocateResourcesData:[],
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
          let obj = this.checkPageAuth(this,"page_operation",this.btnAuth);
            this.query();
         },
        methods:{
            //查询
            query(){
              console.log(this.value3.length!=0)
              if(this.value3.length!=0){
                this.qc.startTime=new Date(this.value3[0]).getTime()
                this.qc.endTime=new Date(this.value3[1]).getTime()
              }
              $axios_http({
                url:"/base/operation/query",
                data:{
                    user:this.qc.user,
                    startTime:this.qc.startTime,
                    endTime:this.qc.endTime,
                    pageNo:this.$store.state.pageNo,//当前页
                    pageSize:this.$store.state.pageSize//每页条数
                },
                vueObj:this
                }).then((res)=>{
                    console.log('options')
                    console.log(res)
                    this.queryResult.tableData=res.data.data
                    this.queryResult.totalPageCount=res.data.pageInfo.totalPageCount//获取总共多少页
                    this.queryResult.totalRowCount=res.data.pageInfo.totalRowCount//获取总共条数
                })
            },
            //每页显示查询结果条数变更事件，做重新查询操作
            pageSizeChange(pageSize) {
                //this.queryResult.pageSize = pageSize
                this.$store.commit('get_pageSize',pageSize)
                console.log(`每页 ${pageSize} 条`)
                this.query()
            },
            //切换当前页事件，做重新查询操作
            currentPageChange(currentPage) {
                //this.queryResult.pageNo = currentPage
              this.$store.commit('get_pageNo',currentPage)
                console.log(`当前页: ${currentPage}`);
                this.query()
            }
        }}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .checkbox{
        display: block;
        margin-left: 5px;
        font-weight: normal;
    }
    .inline{
        display: inline-block;
        margin-top: 20px;
    }
    .btnStyle{
      padding-left: 10px;
    }
</style>
