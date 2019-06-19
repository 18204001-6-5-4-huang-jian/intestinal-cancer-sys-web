<template>
    <div slot="right" class="content-page" v-if="page_resourceList">
        <div class="content">
          <div class="filter-container" >
            <el-form :model="qc" :inline=true>
              <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="唯一标识" v-model="qc.name"  v-if="btnAuth.buttonResourceQuery">
              </el-input>
              <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="URL" v-model="qc.url"  v-if="btnAuth.buttonResourceQuery">
              </el-input>
              <el-select v-model="qc.type" placeholder="请选择" size="small" class="filter-item" v-if="btnAuth.buttonResourceQuery">
                <el-option value="1" v-bind:key="1" label="菜单"></el-option>
                <el-option value="2" v-bind:key="2" label="页面"></el-option>
                <el-option value="3" v-bind:key="3" label="按钮"></el-option>
              </el-select>
              <el-button class="filter-item" size="small" type="primary" icon="el-icon-search" @click="query" v-if="btnAuth.buttonResourceQuery">查询</el-button>
              <router-link to="/resource/resourceInsert"><el-button class="filter-item"  size="small"  type="primary" icon="el-icon-plus" v-if="btnAuth.buttonResourceAdd">添加</el-button></router-link>
              <el-button class="filter-item" type="primary" size="small" icon="el-icon-close" @click="reset" v-if="btnAuth.buttonResourceQuery">重置</el-button>
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
                prop="name"
                label="唯一标识"
                width="240">
              </el-table-column>
              <el-table-column
                prop="type"
                label="类型"
                width="180">
              </el-table-column>
              <el-table-column
                prop="url"
                label="URL"
                width="180">
              </el-table-column>
              <el-table-column
                prop="desc"
                label="描述"
                width="180">
              </el-table-column>
              <el-table-column
                label="操作"
              >
                <template slot-scope="scope">
                  <router-link :to="{path:'/resource/resourceUpdate',query:{id:scope.row.id}}"><el-button type="text" icon="el-icon-edit" class="btnStyle" size="small" title="编辑" v-if="btnAuth.buttonResourceEditor"></el-button></router-link>
                  <el-button type="text" @click="del(scope.row.id)" icon="el-icon-delete" size="small" class="btnStyle" title="删除" v-if="btnAuth.buttonResourceDel"></el-button>
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
                    :current-page="this.$store.state.resourcePageNo"
                    :page-sizes="[10, 20, 50, 100]"
                    v-bind:page-size="this.$store.state.resourcePageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    v-bind:total="queryResult.totalRowCount">
                  </el-pagination>
                </div>
              </div></el-col>
            </el-row>
          </div>
          <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Right',
        data () {
            return {
              //权限判定
              page_resourceList:false,
                btnAuth:{
                    buttonResourceAdd:false,
                  buttonResourceEditor:false,
                    buttonResourceDel:false,
                  buttonResourceQuery:false
                },
                //查询条件
                "qc":{
                    "name":"",
                    "url":'',
                    "type":''
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
                formLabelWidth: '80px'
            }
        },
        mounted(){
          let obj = this.checkPageAuth(this,"page_resourceList",this.btnAuth);
            this.query();
         },
        methods:{
            //查询
            query(){
                $axios_http({
                    url:"/base/auth/queryPageAuth",
                    data:{
                        name:this.qc.name,
                        url:this.qc.url,
                        type:this.qc.type,
                        pageNo:this.$store.state.resourcePageNo,//当前页
                        pageSize:this.$store.state.resourcePageSize//每页条数
                    },
                vueObj:this
                }).then((res)=>{
                    console.log('tototot')
                    console.log(res)
                    this.queryResult.tableData=res.data.data
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
                        url:"/base/auth/delAuth/"+id,
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
              this.$store.commit('get_resourcePageSize',pageSize)
                console.log(`每页 ${pageSize} 条`)
                this.query()
            },
            //切换当前页事件，做重新查询操作
            currentPageChange(currentPage) {
                //this.queryResult.pageNo = currentPage
              this.$store.commit('get_resourcePageNo',currentPage)
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
