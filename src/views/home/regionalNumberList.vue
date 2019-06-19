<template>
  <div slot="right" class="content-page" v-if="regionalNumber_page">
    <div class="content">
      <div class="filter-container">
        <!--<router-link to="/home/areaHome">-->
          <el-button size="mini" class="return-home" @click="goBack()">返 回</el-button>
        <!--</router-link>-->
        <el-form :model="qc" :inline=true class="clear">
          <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="姓名" v-model="qc.name"   clearable>
          </el-input>
          <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="SID" v-model="qc.sid"   clearable>
          </el-input>
          <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="手机号" v-model="qc.phone"   clearable>
          </el-input>
          <el-select v-model="qc.reserveStatus" clearable placeholder="是否预约" size="small" class="filter-item">
            <el-option value="1" v-bind:key="1" label="未预约"></el-option>
            <el-option value="2" v-bind:key="2" label="已预约"></el-option>
          </el-select>
          <el-select v-model="qc.examinationStatus" clearable placeholder="是否检查" size="small" class="filter-item">
            <el-option value="1" v-bind:key="1" label="未检查"></el-option>
            <el-option value="2" v-bind:key="2" label="已检查"></el-option>
          </el-select>
          <el-select v-model="qc.finishedStatus" clearable placeholder="完成情况" size="small" class="filter-item">
            <el-option value="1" v-bind:key="1" label="未完成"></el-option>
            <el-option value="2" v-bind:key="2" label="已完成"></el-option>
          </el-select>
          <div>
            <el-button size="small" type="primary" icon="el-icon-search" @click="query(1,$store.state.uncompletedfecalListPageSize)">查询</el-button>
            <el-button  type="primary" size="small" icon="el-icon-close" @click="reset" >重置</el-button>
          </div>
        </el-form>
      </div>
      <div >
        <div class="table-btn-grooup">
          <!--<el-button  size="small" type="primary" icon="el-icon-search" >导出EXCEL</el-button>-->
          <!--<el-button  size="small" type="primary" icon="el-icon-plus" @click="add()" >新增</el-button>-->
          <!--<el-button  size="small" type="primary" icon="el-icon-search"  @click="openQuitDialog">一键处理</el-button>-->
        </div>
        <!--数据列表-->
        <el-table
          :data="queryResult.tableData"
          border
          :default-sort = "{prop: 'inGroupDate', order: 'descending'}"
          style="width: 100%;">
          <el-table-column
            type="selection"
            align="center"
            label="序号"
            width="55">
          </el-table-column>
          <el-table-column
            prop="sid"
            label="SID"
          >
          </el-table-column>
          <el-table-column
            label="姓名"
          >
            <template slot-scope="scope">
              <div class="subjectsName">
                <div>
                  {{scope.row.name}}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="性别"
          >
            <template slot-scope="scope">
              <span>{{scope.row.sex | reverseSex}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="age"
            label="年龄"
          >
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号"
            width="160"
          >
          </el-table-column>
          <el-table-column
            prop="nickName"
            label="所属社区"
          >
          </el-table-column>
          <el-table-column
            label="分组"
          >
            <template slot-scope="scope">
              <span>{{scope.row.group | group}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="年度状态"
          >
            <template slot-scope="scope">
              <span>{{scope.row.overallStatusCy | overallStatusCy}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="预约状态"
          >
            <template slot-scope="scope">
              <span>{{scope.row.reserveStatus | reserveStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="检查状态"
          >
            <template slot-scope="scope">
              <span>{{scope.row.examinationStatus | examinationStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="完成情况"
          >
            <template slot-scope="scope">
              <span>{{scope.row.finishedStatus | finishedStatus}}</span>
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
                :current-page="$store.state.bloodListPageNo"
                :page-sizes="[10, 20, 50, 100]"
                v-bind:page-size="$store.state.bloodListPageSize"
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

    data () {
      return {
        btnAuth:{
          one_colonscopyList_btn:false,
          colonscopyList_query_btn:false,
          colonscopyList_EXCEL_btn:false,
          colonscopyList_add_btn:false
        },
        //社区
        deptGroup:[],
        regionalNumber_page:false,
        //查询条件
        "qc":{
          "name":null,
          "phone":null,
          "sid":null,
          "reserveStatus": null,
          "examinationStatus": null,
          "finishedStatus": null,
          "commDeptId":null
        },
        //查询结果
        "queryResult":{
          "pageNo":1,//当前页
          "pageSize":10,//每页的条数
          "totalPageCount":0,
          "tableData":[]
        },
      }
    },
    mounted(){
      let obj = this.checkPageAuth(this,"regionalNumber_page",this.btnAuth)
      this.query(this.$store.state.uncompletedfecalListPageNo,this.$store.state.uncompletedfecalListPageSize);
      this.queryDepartMent()
    },
    beforeDestroy(){
      this.$store.state.uncompletedfecalListPageNo=1;
      this.$store.state.uncompletedfecalListPageSize=10;
    },
    methods:{
      //查询社区
      queryDepartMent(){
        $axios_http({
          url:"/base/department/underling/hospital/query",
          data:{
          },
          vueObj:this
        }).then((res)=>{
          this.deptGroup = res.data.data
        })
      },
      //查询
     query(pageNo,pageSize){
        $axios_http({
          url:"/base/hospital/community/detaillist/queryPutCodeDetailByCommId",
          data:{
            communityDeptId:this.$route.query.communityDeptId,
            id:this.$route.query.id,
            name:this.qc.name,
            sid:this.qc.sid,
            phone:this.qc.phone,
            reserveStatus: this.qc.reserveStatus,
            examinationStatus: this.qc.examinationStatus,
            finishedStatus: this.qc.finishedStatus,
            pageNo:pageNo,//当前页
            pageSize:pageSize//每页条数
          },
          vueObj:this
        }).then((res)=>{
          this.$store.commit('get_uncompletedfecalListPageNo',pageNo)
          this.queryResult.tableData=res.data.data;
          this.queryResult.totalPageCount=res.data.pageInfo.totalPageCount//获取总共多少页
          this.queryResult.totalRowCount=res.data.pageInfo.totalRowCount//获取总共条数
        })
      },
      //重置检索条件
      reset(){
        Object.assign(this.$data.qc, this.$options.data().qc)
        this.query(this.$store.state.uncompletedfecalListPageNo,this.$store.state.uncompletedfecalListPageSize);
        this.ids = []
      },
      //每页显示查询结果条数变更事件，做重新查询操作
      pageSizeChange(pageSize) {
        this.$store.commit('get_uncompletedfecalListPageSize', pageSize)
        //this.queryResult.pageSize = pageSize
       this.query(this.$store.state.uncompletedfecalListPageNo,pageSize);
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        this.$store.commit('get_uncompletedfecalListPageNo',currentPage)
        //this.queryResult.pageNo = currentPage
        this.query(currentPage,this.$store.state.uncompletedfecalListPageSize);
      }

    }}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content{
    background: #fff;
    padding:10px;
  }
  .btnStyle{
    padding-left: 10px;
  }
  .return-home {
    display: block;
    text-align: center;
    float: left;
    margin-bottom:20px;
  }
  .table-btn-grooup{
    margin-top:20px;
    margin-bottom:10px;
  }

  .filter-item{
    width:200px;
    margin-right:10px;
  }
</style>
