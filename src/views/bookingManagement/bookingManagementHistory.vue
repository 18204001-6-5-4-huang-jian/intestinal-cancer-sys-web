<template>
    <div class="history-container" v-if="bookingManagementHistory_page">
        <div class="btns">
             <router-link to="/home/areaHome">
             <el-button size="small" class="returnBtn">返 回</el-button>
           </router-link>
        </div>
          <el-form :inline="true" :model="formInline" class="demo-form-inline" labelWidth="100px">
            <el-form-item label="放号时间：">
               <el-date-picker
                    v-model="formInline.date"
                    type="daterange"
                    size="small"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="dateTimepickerChange"
                    >
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" icon="el-icon-search" @click="selectData">查询</el-button>
            </el-form-item>
        </el-form>
          <div class="table-header">
            <!-- &nbsp;放号列表 -->
            <div class="btns-right">
                <router-link to="/bookingManagements/bookingManagementAdd">
                      <el-button type="primary" size="small" icon="el-icon-plus">新增</el-button>
                </router-link>
            </div>
        </div>
        <!-- table -->
          <el-table
            :data="queryResult.tableData"
            border
            style="width:100%">
            <el-table-column
                type="index"
                label="序号"
                width="50">
            </el-table-column>
            <el-table-column
                prop="deptName"
                label="放号医院"
                >
            </el-table-column>
            <el-table-column
                prop="reservation_date"
                label="放号时间">
            </el-table-column>
            <el-table-column
                prop="SumYuyue"
                label="放号总量/放号余量"
                >
            </el-table-column>
            <el-table-column
                prop="yuyueNum"
                label="已预约数量">
            </el-table-column>
                <el-table-column
                fixed="right"
                label="操作"
                width="120">
          <template slot-scope="scope">
             <el-button type="text" size="small" @click="viewDetail(scope.row)">查看</el-button>
             <el-button type="text" size="small" v-if="scope.row.useStatus == 1 && scope.row.fasongStatus !='3'" @click="stop(scope.row)">停诊</el-button>
              <el-button type="text" size="small" v-if="scope.row.useStatus == 2 || scope.row.fasongStatus == '3'" style="color:#999999;" disabled>停诊</el-button>
          </template>
        </el-table-column>
    </el-table>
     <!-- 分页 -->
     <div class="block" style="margin-top: 10px">
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
     <!-- Dialog -->
      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <span>您确定取消本次放号记录么？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible=false">取 消</el-button>
            <el-button type="primary" @click="cancleSure()">确 定</el-button>
        </span>
      </el-dialog>
        <!-- Dialog -->
        <el-dialog
        title="提示"
        :visible.sync="secondcenterDialogVisible"
        width="30%"
        center>
        <span style="display:block;text-align:center;">该放号规则已经预约记录，确认立即停诊？</span>
        <el-form :model="form">
            <el-form-item label="">
             <el-radio-group v-model="form.resource" size="small">
                <el-radio  label="1">短信通知已预约受试者</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="secondcenterDialogVisible=false">取 消</el-button>
            <el-button type="primary" @click="cancleSecondSure()">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>
<script>
import moment from 'moment'
export default {
    data(){
        return{
           bookingManagementHistory_page:false,
           btnAuth:{

           },
           formInline:{
                date:null,
           },
           queryResult:{
               pageNum: 1,//当前页
               pageSize: 10,//每页的条数
               total: 0,
               tableData:[]
           },
           centerDialogVisible:false,
           secondcenterDialogVisible:false,
           form:{
               resource:'1'
           },
           reservationDate:''
        }
    },
    mounted() {
        let obj = this.checkPageAuth(this, "bookingManagementHistory_page", this.btnAuth);
        this.query();
    },
    methods: {
        query(){
            $axios_http({
                url:'/base/hospital/num/list/queryFanghao',
                data:{
                    startDate:'',
                    endDate:'',
                    pageNo:this.queryResult.pageNum,
                    pageSize:this.queryResult.pageSize
                },
                vueObj:this
            }).then((res)=> {
               if(res.data.statusMsg == 'success'){
                   this.queryResult.tableData = res.data.data;
                   this.queryResult.total = res.data.pageInfo.totalRowCount;
               }
            })

        },
        pageSizeChange(pageSize){
            this.queryResult.pageSize = pageSize;
            $axios_http({
                url:'/base/hospital/num/list/queryFanghao',
                data:{
                    startDate:this.formInline.date?moment(this.formInline.date[0]).format('YYYY-MM-DD'):'',
                    endDate:this.formInline.date?moment(this.formInline.date[1]).format('YYYY-MM-DD'):'',
                    pageNo:this.queryResult.pageNum,
                    pageSize:this.queryResult.pageSize
                },
                vueObj:this
            }).then((res)=> {
               if(res.data.statusMsg == 'success'){
                   this.queryResult.tableData = res.data.data;
                   this.queryResult.total = res.data.pageInfo.totalRowCount;
               }
            })
        },
        currentPageChange(currentPage){
           this.queryResult.pageNum = currentPage;
            $axios_http({
                url:'/base/hospital/num/list/queryFanghao',
                data:{
                    startDate:this.formInline.date?moment(this.formInline.date[0]).format('YYYY-MM-DD'):'',
                    endDate:this.formInline.date?moment(this.formInline.date[1]).format('YYYY-MM-DD'):'',
                    pageNo:this.queryResult.pageNum,
                    pageSize:this.queryResult.pageSize
                },
                vueObj:this
            }).then((res)=> {
               if(res.data.statusMsg == 'success'){
                   this.queryResult.tableData = res.data.data;
                   this.queryResult.total = res.data.pageInfo.totalRowCount;
               }
            })
        },
        selectData(){
            if(this.formInline.date != null){
            $axios_http({
                url:'/base/hospital/num/list/queryFanghao',
                data:{
                    startDate:moment(this.formInline.date[0]).format('YYYY-MM-DD'),
                    endDate:moment(this.formInline.date[1]).format('YYYY-MM-DD'),
                    pageNo:this.queryResult.pageNum,
                    pageSize:this.queryResult.pageSize
                },
                vueObj:this
            }).then((res)=> {
               if(res.data.statusMsg == 'success'){
                   this.queryResult.tableData = res.data.data;
                   this.queryResult.total = res.data.pageInfo.totalRowCount;
               }
            })
            }else{
                this.query();
            }
        },
        dateTimepickerChange(value){
           if(value == null){
             this.formInline.date = "";
             $axios_http({
                url:'/base/hospital/num/list/queryFanghao',
                data:{
                    startDate:'',
                    endDate:'',
                    pageNo:1,
                    pageSize:10
                },
                vueObj:this
            }).then((res)=> {
               if(res.data.statusMsg == 'success'){
                   this.queryResult.tableData = res.data.data;
                   this.queryResult.total = res.data.pageInfo.totalRowCount;
               }
            })
          }
        },
        viewDetail(row){
            this.$router.push({
                path:'/bookingManagements/bookingManagementHistoryDetail',
                query:{
                    aId:row.allocationId,
                    communityDeptId:'',
                    reservationDate:row.reservation_date,
                }
            })
        },
        stop(row){
            this.reservationDate = row.reservation_date;
            if(row.yuyueNum == '0'){
                this.centerDialogVisible = true;
            }else{
                this.secondcenterDialogVisible = true;
            }
        },
        cancleSure(){
           $axios_http({
             url:'/base/hospital/area/rule/diagnosisDown',
             data:{
                 ruleId:'',
                 reservationDate:this.reservationDate
             },
             vueObj:this,
         }).then((res) => {
             if(res.data.statusMsg == 'success'){
                 this.query();
                 this.centerDialogVisible = false;
             }
         })
        },
        cancleSecondSure(){
        //确定取消该条记录
        //   let noticeStatus = null;
        //   if(this.form.resource == ''){
        //       noticeStatus = 2;
        //   }else if(this.form.resource == '1'){
        //       noticeStatus = 1;
        //   }
          $axios_http({
             url:'/base/hospital/area/rule/diagnosisDown',
             data:{
                 ruleId:'',
                 reservationDate:this.reservationDate,
                 noticeStatus:1
             },
             vueObj:this,
         }).then((res) => {
             if(res.data.statusMsg == 'success'){
                this.query();
                this.secondcenterDialogVisible = false;
             }
         })
        }
    },
}
</script>
<style lang="scss" scoped>
      .history-container{
          background: #ffffff;
           padding: 10px;
            .btns{
                width: 100%;
                height: 30px;
                line-height: 30px;
                margin: 10px 0;
            }
            .demo-form-inline{
               margin-top: 30px;
           }
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
        .block{
            text-align:center;
        }
        .el-radio-group{
            width: 100%;
            text-align: center;
            margin:10px auto;
        }
      }
</style>


