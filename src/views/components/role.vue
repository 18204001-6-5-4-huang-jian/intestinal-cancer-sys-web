<template>
    <div slot="right" class="content-page" v-if="rolePageMain">
        <div class="content">
            <div class="filter-container" >
              <el-form :model="qc" :inline=true>
                <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="角色名称" v-model="qc.name"  v-if="btnAuth.buttonRoleQuery">
                </el-input>
                <el-button class="filter-item" size="small" type="primary" icon="el-icon-search" @click="query" v-if="btnAuth.buttonRoleQuery">查询</el-button>
                <router-link to="/components/roleListInsert"><el-button class="filter-item"  size="small"  type="primary" icon="el-icon-plus" v-if="btnAuth.buttonRoleAdd">添加</el-button></router-link>
                <el-button class="filter-item" type="primary" size="small" icon="el-icon-close" @click="reset" v-if="btnAuth.buttonRoleQuery">重置</el-button>
              </el-form>
                  <!--数据列表-->
                  <el-table
                      :data="$store.state.list"
                      border
                      style="width: 100%;">
                      <el-table-column
                        type="index"
                        label="序号"
                        width="80">
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        label="角色名"
                        width="240">
                      </el-table-column>
                      <el-table-column
                        prop="desc"
                        label="备注"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        label="操作"
                        >
                        <template slot-scope="scope">
                          <router-link :to="{path:'/components/roleListUpdate',query:{id:scope.row.id}}"><el-button type="text" icon="el-icon-edit" class="btnStyle" size="small" title="编辑" v-if="btnAuth.buttonRoleEditor"></el-button></router-link>
                          <el-button type="text" @click="del(scope.row.id)" icon="el-icon-delete" size="small" class="btnStyle" title="删除" v-if="btnAuth.buttonRoleDel"></el-button>
                          <router-link :to="{path:'/components/allocatingMenu',query:{id:scope.row.id}}"><el-button type="text" icon="el-icon-menu" class="btnStyle" size="small" title="分配权限" v-if="btnAuth.buttonUserRoleDis"></el-button></router-link>
                        </template>
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
                            :current-page="$store.state.roleListNo"
                            :page-sizes="[10, 20, 50, 100]"
                            v-bind:page-size="$store.state.roleListSize"
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
    export default {
        name: 'Right',
        data () {
            return {
              //权限判定
               rolePageMain:false,
                btnAuth:{
                    buttonRoleAdd:false,
                    buttonRoleEditor:false,
                    buttonRoleDel:false,
                    buttonRoleQuery:false,
                    buttonUserRoleDis:false
                },
                //查询条件
                "qc":{
                    "name":"",
                    "desc":""
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
          this.$store.commit('LOGOUT_USER');

          let obj = this.checkPageAuth(this,"rolePageMain",this.btnAuth);
            this.query();
         },
        methods:{
            //查询
            query(){
                $axios_http({
                    url:"/base/role/query",
                    data:{
                        name:this.qc.name,
                        pageNo:this.$store.state.roleListNo,//当前页
                        pageSize:this.$store.state.roleListSize//每页条数
                    },
                vueObj:this
                }).then((res)=>{
                    this.queryResult.tableData=res.data.data;

                      this.$store.commit('update_list',res.data.data);

                    this.queryResult.totalPageCount=res.data.pageInfo.totalPageCount//获取总共多少页
                    this.queryResult.totalRowCount=res.data.pageInfo.totalRowCount//获取总共条数
                })
            },
            //重置检索条件
            reset(){
              Object.assign(this.$data.qc, this.$options.data().qc)
              this.query()
              this.ids = []
            },
            //删除一条数据
            del(id){
                this.$confirm('确认删除数据?', '提示', {
                  closeOnClickModal:false,
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {

                    $axios_http({
                        url:"/base/role/delete/"+id,
                        vueObj:this
                    }).then((res)=>{
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
            //每页显示查询结果条数变更事件，做重新查询操作
            pageSizeChange(pageSize) {
                //this.queryResult.pageSize = pageSize
                this.$store.commit('get_roleListSize', pageSize)
                console.log(`每页 ${pageSize} 条`)
                this.query()
            },
            //切换当前页事件，做重新查询操作
            currentPageChange(currentPage) {
                //this.queryResult.pageNo = currentPage
              this.$store.commit('get_roleListNo',currentPage)
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
