<template>
    <div slot="right" class="booking-management" v-if="bookingManagement_page">
        <div class="btns">
             <router-link to="/home/areaHome">
             <el-button size="small" class="returnBtn">返 回</el-button>
           </router-link>
        </div>
       <el-form :inline="true" :model="formInline" class="demo-form-inline" labelWidth="100px">
            <el-form-item label="规则时间：">
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
                    :picker-options="pickerOptions">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" icon="el-icon-search" @click="selectData()">查询</el-button>
            </el-form-item>
        </el-form>
        <!-- table -->
        <div class="table-header">
            <!-- &nbsp;放号列表 -->
            <div class="btns-right">
                  <!-- <el-button type="primary" size="small" @click="viewHistory()">预约记录</el-button> -->
                  <!-- &nbsp; -->
                  <router-link to="/bookingManagements/bookingManagementAdd">
                       <el-button type="primary" size="small" icon="el-icon-plus">新增</el-button>
                  </router-link>
            </div>
        </div>
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
                prop="diquName"
                label="放号医院"
                width="120">
            </el-table-column>
             <el-table-column
                prop="project"
                label="预约项目"
                width="100">
            </el-table-column>
            <el-table-column
                prop="issueType"
                label="放号类型"
                width="150">
                <template slot-scope="scope">
                     {{scope.row.issueType == 1?'已选择社区共用':'按社区/区指定数量分配'}}
                </template>
            </el-table-column>
            <el-table-column
                prop="ruleBegin"
                label="规则开始时间">
            </el-table-column>
            <el-table-column
                prop="ruleEnd"
                label="规则结束时间">
            </el-table-column>
            <el-table-column
                prop="communityDeptIdInfo"
                label="社区">
            </el-table-column>
            <el-table-column
                prop="fanghaoNum"
                label="当日放号总数">
            </el-table-column>
            <el-table-column
                prop="shengyu"
                label="当日剩余数量">
            </el-table-column>
             <el-table-column
                prop="status"
                label="状态">
                 <template slot-scope="scope">
                     {{scope.row.status|showStatus}}
                 </template>
            </el-table-column>
             <el-table-column
                fixed="right"
                label="操作"
                width="120">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="viewDetai(scope.row)">查看</el-button>
            <el-button type="text" size="small" v-if="(scope.row.useStatus == 1) && (scope.row.fasongStatus !='3')" @click="stop(scope.row)">停止规则</el-button>
            <el-button type="text" size="small" v-if="(scope.row.useStatus == 2) || (scope.row.fasongStatus =='3')"   style="color:#999999;" disabled>停止规则</el-button>
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
           bookingManagement_page:false,
           btnAuth:{
              
           },
           formInline: {
                date:'',
           },
           queryResult: {
            pageNum: 1,//当前页
            pageSize: 10,//每页的条数
            total: 0,
            tableData:[]
            },
           pickerOptions:{
            //    shortcuts: [{
            //         text: '最近一周',
            //         onClick(picker) {
            //         const end = new Date();
            //         const start = new Date();
            //         start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            //         picker.$emit('pick', [start, end]);
            //         }
            //     }, {
            //         text: '最近一个月',
            //         onClick(picker) {
            //         const end = new Date();
            //         const start = new Date();
            //         start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            //         picker.$emit('pick', [start, end]);
            //         }
            //     }, {
            //         text: '最近三个月',
            //         onClick(picker) {
            //         const end = new Date();
            //         const start = new Date();
            //         start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            //         picker.$emit('pick', [start, end]);
            //         }
            //     }]
           },
           centerDialogVisible:false,
           secondcenterDialogVisible:false,
           form:{
               resource:'1'
           },
           id:'',//停诊id
           today:moment(new Date()).format('YYYY-MM-DD')
        }
    },
    mounted() {
         let obj = this.checkPageAuth(this, "bookingManagement_page", this.btnAuth);
         this.query();
        //  console.log(this.today);
    },
    methods: {
      selectData() {
        if(this.formInline.date.length > 0){
            $axios_http({
            url:'/base/hospital/area/rule/query',
            data:{
                pageSize:this.queryResult.pageSize,
                pageNo:this.queryResult.pageNum,
                ruleBeginToString:moment(this.formInline.date[0]).format('YYYY-MM-DD'),
                ruleEndToString:moment(this.formInline.date[1]).format('YYYY-MM-DD')
                },
                vueObj:this,
                }).then((res) => {
                    if(res.data.statusMsg == "success"){
                        this.queryResult.tableData = res.data.data;
                        this.queryResult.pageNum = res.data.pageInfo.pageNo;
                        this.queryResult.pageSize = res.data.pageInfo.pageSize;
                        this.queryResult.total = res.data.pageInfo.totalRowCount;
                    }
                })
          }else{
              this.query();
          }
      },
      viewHistory(){
         this.$router.push({
             path:'/bookingManagements/bookingManagementHistory'
         })
      },
      query(){
        $axios_http({
            url:'/base/hospital/area/rule/query',
            data:{
                pageSize:this.queryResult.pageSize,
                pageNo:this.queryResult.pageNum,
                ruleBeginToString:"",
                ruleEndToString:""
            },
            vueObj:this,
        }).then((res) => {
            if(res.data.statusMsg == "success"){
                  this.queryResult.tableData = res.data.data;
                  this.queryResult.pageNum = res.data.pageInfo.pageNo;
                  this.queryResult.pageSize = res.data.pageInfo.pageSize;
                  this.queryResult.total = res.data.pageInfo.totalRowCount;
            }
        })

      },
      //每页显示查询结果条数变更事件，做重新查询操作
      pageSizeChange(pageSize) {
        this.queryResult.pageSize = pageSize;
        $axios_http({
            url:'/base/hospital/area/rule/query',
            data:{
                pageSize:this.queryResult.pageSize,
                pageNo:this.queryResult.pageNum,
                ruleBeginToString:this.formInline.date?moment(this.formInline.date[0]).format('YYYY-MM-DD'):'',
                ruleEndToString:this.formInline.date?moment(this.formInline.date[1]).format('YYYY-MM-DD'):''
            },
            vueObj:this,
        }).then((res) => {
            if(res.data.statusMsg == "success"){
                  this.queryResult.tableData = res.data.data;
                  this.queryResult.pageNum = res.data.pageInfo.pageNo;
                  this.queryResult.pageSize = res.data.pageInfo.pageSize;
                  this.queryResult.total = res.data.pageInfo.totalRowCount;
            }
        })
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        this.queryResult.pageNum = currentPage;
        $axios_http({
            url:'/base/hospital/area/rule/query',
            data:{
                pageSize:this.queryResult.pageSize,
                pageNo:this.queryResult.pageNum,
                ruleBeginToString:this.formInline.date?moment(this.formInline.date[0]).format('YYYY-MM-DD'):"",
                ruleEndToString:this.formInline.date?moment(this.formInline.date[1]).format('YYYY-MM-DD'):''
            },
            vueObj:this,
        }).then((res) => {
            if(res.data.statusMsg == "success"){
                  this.queryResult.tableData = res.data.data;
                  this.queryResult.pageNum = res.data.pageInfo.pageNo;
                  this.queryResult.pageSize = res.data.pageInfo.pageSize;
                  this.queryResult.total = res.data.pageInfo.totalRowCount;
            }
        })
      },
      viewDetai(row){
          //查看详情
          this.$router.push({
              path:'/bookingManagements/bookingManagementDetail',
              query:{
                  issueType:row.issueType,
                  ruleId:row.ruleId,
                  yuyueNum:row.yuyueNum,
                  useStatus:row.useStatus
              }
          })
      },
      stop(row){
          //保存停诊ID
          this.id = row.ruleId
          //判断是未开始状态下的停诊还是预约中状态下的停诊，给出不同的提示
          if(row.tingzhenyuyueNum > 0){
              //预约中
              this.secondcenterDialogVisible = true;
          }else{
               //未开始
               this.centerDialogVisible = true;
          }
          
      },
      cancleSure(){
         //确定取消该条记录
         $axios_http({
             url:'/base/hospital/area/rule/diagnosisDown',
             data:{
                 ruleId:this.id
             },
             vueObj:this,
         }).then((res) => {
             if(res.data.statusMsg == "success"){
                this.centerDialogVisible = false;
                 this.query();
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
                 ruleId:this.id,
                 noticeStatus:1
             },
             vueObj:this,
         }).then((res) => {
             if(res.data.statusMsg == "success"){
                  this.secondcenterDialogVisible = false;
                 this.query();
             }
         })
      },
      dateTimepickerChange(value){
          if(value == null){
             this.formInline.date = '';
            $axios_http({
            url:'/base/hospital/area/rule/query',
            data:{
                pageSize:10,
                pageNo:1,
                ruleBeginToString:"",
                ruleEndToString:""
            },
            vueObj:this,
            }).then((res) => {
                if(res.data.statusMsg == "success"){
                    this.queryResult.tableData = res.data.data;
                    this.queryResult.pageNum = res.data.pageInfo.pageNo;
                    this.queryResult.pageSize = res.data.pageInfo.pageSize;
                    this.queryResult.total = res.data.pageInfo.totalRowCount;
                }
            })
          }
      }
    }
}
</script>
<style lang="scss" scoped>
   .booking-management{
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
              width:200px;
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


