<template>
    <div slot="right" class="content-page" v-if="userPageMain">
        <div class="content">
        	<div class="filter-container">
	        	<el-form :model="qc" :inline=true>
			      <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="用户昵称" v-model="qc.nickName" v-if="btnAuth.buttonUserQuery">
			      </el-input>
			      <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="登录名" v-model="qc.loginName" v-if="btnAuth.buttonUserQuery">
			      </el-input>
			      <el-button class="filter-item" size="small" type="primary" icon="el-icon-search" @click="query" v-if="btnAuth.buttonUserQuery">查询</el-button>
		      		<router-link to="/components/userListInsert"><el-button type="primary" size="small" icon="el-icon-plus" class="filter-item" v-if="btnAuth.buttonUserAdd">添加</el-button></router-link>
		      		<el-button class="filter-item" type="primary" size="small" icon="el-icon-close" @click="reset" v-if="btnAuth.buttonUserQuery">重置</el-button>
		      	</el-form>
    		</div>
            <div >
                <!--数据列表-->
                <el-table
                    :data="queryResult.tableData"
                    border
                    style="width: 100%;">
                    <el-table-column
                      type="index"
                      label="序号"
                      width="70">
                    </el-table-column>
                  <el-table-column
                    prop="encode"
                    label="编号"
                    >
                  </el-table-column>
                    <el-table-column
                      prop="loginName"
                      label="登录名"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="nickName"
                      label="昵称"
                     >
                    </el-table-column>
                  <el-table-column
                    prop="phone"
                    label="手机号"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="tel"
                    label="联系电话"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="地址"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="facsimile"
                    label="传真"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="email"
                    label="电子邮箱"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="qq"
                    label="QQ"
                    >
                  </el-table-column>
                    <el-table-column
                      label="操作"
                      >
                      <template slot-scope="scope">
                        <router-link :to="{path:'/components/userListUpdate',query:{id:scope.row.id}}"><el-button class="btnStyle" type="text" icon="el-icon-edit" size="small" title="编辑" v-if="btnAuth.buttonUserEditor"></el-button></router-link>
                        <el-button class="btnStyle" type="text" @click="del(scope.row.id)" icon="el-icon-delete" size="small" title="删除" v-if="btnAuth.buttonUserDel"></el-button>
                        <router-link :to="{path:'/components/allocatingRole',query:{id:scope.row.id}}"><el-button class="btnStyle" type="text" icon="el-icon-setting" size="small" title="分配角色" v-if="btnAuth.buttonUserRoleDis"></el-button></router-link>
                        <el-button class="btnStyle" type="text" @click="resetPassword(scope.row.id)" icon="el-icon-refresh" size="small" title="重置密码"></el-button>
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
	                          :current-page="$store.state.userListNo"
	                          :page-sizes="[10, 20, 50, 100]"
	                          v-bind:page-size="$store.state.userListSize"
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
    </div>
</template>
<script>
    export default {
        data () {
            return {
                userPageMain:false,
                btnAuth:{
                    buttonUserAdd:false,
                    buttonUserEditor:false,
                    buttonUserDel:false,
                    buttonUserQuery:false,
                    buttonUserRoleDis:false
                },
                //查询条件
                "qc":{
                    "nickName":"",
                    "loginName":""

                },
                //查询结果
                "queryResult":{
                    "pageNo":1,//当前页
                    "pageSize":10,//每页的条数
                    "totalPageCount":0,
                    "tableData":[]
                },
                //编辑表单数据对象
                "updateForm":{
                    "nickName":"",
                    "phone":"",
                    "loginName":""
                },
                userId:"",
                formLabelWidth: '100px'

            }
        },
        mounted(){
            let obj = this.checkPageAuth(this,"userPageMain",this.btnAuth)
            this.query();
        },
        methods:{
            //查询
            query(){

                $axios_http({
                    url:"/base/user/query",
                    data:{
                        nickName:this.qc.nickName,
                        loginName:this.qc.loginName,
                        pageNo:this.$store.state.userListNo,//当前页
                        pageSize:this.$store.state.userListSize//每页条数
                    },
                vueObj:this
                }).then((res)=>{
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
                        url:"/base/user/del/"+id,
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
            resetPassword(id){
                $axios_http({
                        url:"/base/user/resetPassword",
                        data:{
                            id:id
                        },
                        vueObj:this
                    }).then((res)=>{
                        $successMsg(this,"重置成功")
                        this.query()
                    })
            },
            //每页显示查询结果条数变更事件，做重新查询操作
            pageSizeChange(pageSize) {
                this.$store.commit('get_userListSize', pageSize)
                //this.queryResult.pageSize = pageSize
                console.log(`每页 ${pageSize} 条`)
                this.query()
            },
            //切换当前页事件，做重新查询操作
            currentPageChange(currentPage) {
                this.$store.commit('get_userListNo',currentPage)
                //this.queryResult.pageNo = currentPage
                console.log(`当前页: ${currentPage}`);
                this.query()
            }

        }}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .checkbox{
        display: block;
        margin-left: 20px;
        font-weight: normal;
    }
     .btnStyle{
      padding-left: 10px;
    }
</style>
