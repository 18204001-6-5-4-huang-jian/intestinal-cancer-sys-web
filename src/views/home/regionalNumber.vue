<template>
  <div slot="right" class="content-page" v-if="regionalNumber_page">
    <div class="content">
      <div class="filter-container">
        <router-link to="/home/areaHome">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
        <el-form :model="qc" :inline=true class="clear">
          <el-cascader
            style="float: left;width: 200px;margin-right: 15px;"
            :options="$store.state.regionOptions"
            placeholder="所属区"
            :props="props"
            v-model="ids"
            size="small"
            filterable
            :show-all-levels="false"
            change-on-select
            @change="getQcId"
          ></el-cascader>
          <el-date-picker
            v-model="qc.startDate"
            type="date"
            size="small"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            placeholder="预约时间(起)"
            class="filter-item">
          </el-date-picker>
          <el-date-picker
            v-model="qc.endDate"
            type="date"
            size="small"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            placeholder="预约时间(止)"
            class="filter-item">
          </el-date-picker>
          <div>
            <el-button size="small" type="primary" icon="el-icon-search" @click="query(1,$store.state.regionalNumberPageSize)">查询</el-button>
            <el-button  type="primary" size="small" icon="el-icon-close" @click="reset" >重置</el-button>
          </div>
        </el-form>
      </div>
      <div >
        <div class="table-btn-grooup">
          <el-button size="small" type="primary" icon="el-icon-document">
            <a :href="downloadUrl">导出EXCEL</a>
          </el-button>
          <!--<el-button  size="small" type="primary" icon="el-icon-plus" @click="add()" >新增</el-button>-->
          <!--<el-button  size="small" type="primary" icon="el-icon-search"  @click="openQuitDialog">一键处理</el-button>-->
        </div>
        <!--数据列表-->
        <el-table
          :data="queryResult.tableData"
          border
          ref="multipleTable"
          style="width: 100%;">
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="55">
          </el-table-column>
          <el-table-column
            prop="commName"
            label="所属区"
          >
          </el-table-column>
          <el-table-column
            prop="period"
            label="预约时间"
          >
          </el-table-column>
          <el-table-column
            prop="amount"
            label="放号数量"
            width="120"
          >
          </el-table-column>

          <el-table-column
            prop="alSums1"
            label="已预约人数"
          >
          </el-table-column>
          <el-table-column
            prop="alSums2"
            label="已检查人数"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            width="150"
          >
            <template slot-scope="scope">
              <router-link :to="{path:'/home/regionalNumberList',query:{communityDeptId:scope.row.communityDeptId,id:scope.row.id}}">
                <el-button size="small" class="btnStyle" type="text">查看详情</el-button>
              </router-link>
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
                :current-page="$store.state.regionalNumberPageNo"
                :page-sizes="[10, 20, 50, 100]"
                v-bind:page-size="$store.state.regionalNumberPageSize"
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
  import { date } from '@/utils'
  export default {
    data () {
      return {
        btnAuth:{
          one_colonscopyList_btn:false,
          colonscopyList_query_btn:false,
          colonscopyList_EXCEL_btn:false,
          colonscopyList_add_btn:false
        },
        downloadLoading:false,
        downloadUrl: SERVER_NAME + '/base/hospital/community/list/queryPutCodeForExcel',
        //社区
        deptGroup:[],
        regionalNumber_page:false,
        //查询条件
        "qc":{
          "communityDeptId":null,
          "startDate":null,
          "endDate":null,
          "loginName":null,
//
        },
        //查询结果
        "queryResult":{
          "pageNo":1,//当前页
          "pageSize":10,//每页的条数
          "totalPageCount":0,
          "tableData":[]
        },
        props: {
          value: 'id',
          children: 'child',
          label:'name'
        },
        ids:[],
      }
    },
    mounted(){
      let obj = this.checkPageAuth(this,"regionalNumber_page",this.btnAuth)
      this.query(this.$store.state.regionalNumberPageNo,this.$store.state.regionalNumberPageSize);
    },
    beforeDestroy(){
      this.$store.state.regionalNumberPageNo=1;
      this.$store.state.regionalNumberPageSize=10;
    },
    methods:{
        //导出excel
      handleDownload() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['所属社区','预约时间','放号数量','已预约人数','已查人数']
          const filterVal = ['commName','period','amount','alSums1','alSums2']
          const list = this.queryResult.tableData
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '放号一览表',
            autoWidth: true
          })
          this.downloadLoading = false
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === '1') {
            return date(v[j])
          } else {
            return v[j]
          }
        }))
      },
      //获取选中区
      getQcId(value){
        this.qc.communityDeptId = null
        this.qc.loginName =null
        if(value.length==1){
          this.qc.communityDeptId = value[0]
          this.qc.loginName =null
        }else if(value.length == 2){
          this.qc.communityDeptId = value[0]
          for(let j = 0;j<this.$store.state.regionOptions.length;j++){
            if(value[0] == this.$store.state.regionOptions[j].id){
              for(let k=0;k<this.$store.state.regionOptions[j].child.length;k++){
                if(value[1] == this.$store.state.regionOptions[j].child[k].id){
                  this.qc.loginName =this.$store.state.regionOptions[j].child[k].loginName
                }
              }
            }
          }
        }
      },
      //查询
     query(pageNo,pageSize){
        $axios_http({
          url:"/base/hospital/community/list/queryPutCodeByAreaId",
          data:{
            startDate:this.qc.startDate,
            endDate:this.qc.endDate,
            communityDeptId:this.qc.communityDeptId,
            loginName:this.qc.loginName,
            pageNo:pageNo,//当前页
            pageSize:pageSize//每页条数
          },
          vueObj:this
        }).then((res)=>{
          this.$store.commit('get_regionalNumberPageNo',pageNo)
          this.queryResult.tableData=res.data.data;
          this.queryResult.totalPageCount=res.data.pageInfo.totalPageCount//获取总共多少页
          this.queryResult.totalRowCount=res.data.pageInfo.totalRowCount//获取总共条数
        })
      },
      //重置检索条件
      reset(){
        Object.assign(this.$data.qc, this.$options.data().qc)
        this.ids = []
        this.query(this.$store.state.regionalNumberPageNo,this.$store.state.regionalNumberPageSize);
      },
      //每页显示查询结果条数变更事件，做重新查询操作
      pageSizeChange(pageSize) {
        this.$store.commit('get_regionalNumberPageSize', pageSize)
        //this.queryResult.pageSize = pageSize
        this.query(this.$store.state.regionalNumberPageNo,pageSize);
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        this.$store.commit('get_regionalNumberPageNo',currentPage)
        //this.queryResult.pageNo = currentPage
       this.query(currentPage,this.$store.state.regionalNumberPageSize);
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
