<template>
    <div class="history-detail-container" v-if="bookingManagementHistoryDetail_page">
      <div class="table-header">
            <!-- &nbsp;受试者列表 -->
             <div class="btns-right">
                  <el-button size="small" @click="$router.go(-1)">返回</el-button>
            </div>
        </div>
        <!-- table -->
        <el-table
        :data="queryResult.tableData"
        style="width:100%"
        border>
        <el-table-column
        label="序号"
        type="index"
        width="50">
      </el-table-column>
       <el-table-column
        prop="sid"
        label="SID"
         width="80">
      </el-table-column>
      <el-table-column
       prop="name"
       label="姓名"
       width="80">
      </el-table-column>
       <el-table-column
        prop="sex"
        label="性别"
        width="50">
        <template slot-scope="scope">
         {{scope.row.sex | reverseSex}}
        </template>
      </el-table-column>
      <!-- <el-table-column
       prop="idCard"
       label="身份证号">
      </el-table-column> -->
       <el-table-column
        prop="phone"
        label="手机号"
        >
      </el-table-column>
       <el-table-column
        prop="countryName"
        label="所属社区"
        width="100">
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
        prop="startTime"
        label="开始时间">
      </el-table-column>
      <el-table-column
        prop="endTime"
        label="结束时间">
      </el-table-column>
        </el-table>
        <!-- 分页 -->
    <div class="block" style="margin-top:10px;text-align:center;">
        <el-pagination
          @size-change="pageSizeChange"
          @current-change="currentPageChange"
          :current-page="queryResult.pageNum"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="queryResult.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="queryResult.total">
        </el-pagination>
      </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            bookingManagementHistoryDetail_page:false,
            btnAuth:{

            },
            queryResult:{
                pageNum: 1,//当前页
                pageSize: 10,//每页的条数
                total: 0,
                tableData:[]
            }
            
        }
    },
    mounted() {
       let obj = this.checkPageAuth(this, "bookingManagementHistoryDetail_page", this.btnAuth);
       this.query();
    },
    methods: {
        query(){
           $axios_http({
               url:'/base/hospital/num/list/queryPerSonByRuleIdAndRule',
               data:{
                  allocationId:this.$route.query.aId,
                  reservationDateToString:this.$route.query.reservationDate,
                  communityDeptId:this.$route.query.communityDeptId == ''?null:this.$route.query.communityDeptId,
                  pageNo:this.queryResult.pageNum,
                  pageSize:this.queryResult.pageSize
               },
               vueObj:this
           }).then((res)=>{
               if(res.data.statusMsg == 'success'){
                   this.queryResult.tableData = res.data.data;
                   this.queryResult.total = res.data.pageInfo.totalRowCount;
               }
           })
        },
        pageSizeChange(pageSize){
            this.queryResult.pageSize = pageSize;
            $axios_http({
               url:'/base/hospital/num/list/queryPerSonByRuleIdAndRule',
               data:{
                  allocationId:this.$route.query.aId,
                  reservationDateToString:this.$route.query.reservationDate,
                  communityDeptId:this.$route.query.communityDeptId == ''?null:this.$route.query.communityDeptId,
                  pageNo:this.queryResult.pageNum,
                  pageSize:this.queryResult.pageSize
               },
               vueObj:this
           }).then((res)=>{
               if(res.data.statusMsg == 'success'){
                   this.queryResult.tableData = res.data.data;
                   this.queryResult.total = res.data.pageInfo.totalRowCount;
               }
           })
        },
        currentPageChange(currentPage){
            this.queryResult.pageNum = currentPage;
            $axios_http({
               url:'/base/hospital/num/list/queryPerSonByRuleIdAndRule',
               data:{
                  allocationId:this.$route.query.aId,
                  reservationDateToString:this.$route.query.reservationDate,
                  communityDeptId:this.$route.query.communityDeptId == ''?null:this.$route.query.communityDeptId,
                  pageNo:this.queryResult.pageNum,
                  pageSize:this.queryResult.pageSize
               },
               vueObj:this
           }).then((res)=>{
               if(res.data.statusMsg == 'success'){
                   this.queryResult.tableData = res.data.data;
                   this.queryResult.total = res.data.pageInfo.totalRowCount;
               }
           })
        }
    },
}
</script>
<style lang="scss" scoped>
    .history-detail-container{
        background: #ffffff;
        padding:10px;
        .table-header{
          width: 100%;
          height: 60px;
          line-height: 60px;
          margin: 10px 0;
          position: relative;
          text-indent:5px;
        //   &:after{
        //       content: '';
        //       position: absolute;
        //       width: 4px;
        //       height: 40%;
        //       top:30%;
        //       left: 0;
        //       background: #409EFF;
        //   }
           .btns-right{
              width:85px;
              float: left;
          }
        }
    }
</style>


