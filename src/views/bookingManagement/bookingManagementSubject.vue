<template>
    <div class="subject-container" v-if="bookingManagementSubject_page">
         <div style="margin:10px 0 10px 0;">
              <el-button size="small" @click="$router.go(-1)">返回</el-button>
        </div>
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="放号日期：">
            <el-date-picker
                v-model="formInline.date"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                >
            </el-date-picker>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="small" icon="el-icon-search" @click="selectData()">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="table-header">
            &nbsp;社区放号详情
            <span class="span">放号总数：{{fanghaoNum}}；剩余：{{shengyuNum}}</span>
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
            prop="depName"
            label="放号医院"
            >
        </el-table-column>
        <el-table-column
            prop="communityName"
            label="社区"
            >
        </el-table-column>
        <el-table-column
            prop="yuyueNum"
            label="预约数量">
        </el-table-column>
        <el-table-column
            prop="reservationDate"
            label="放号时间"
        >
        </el-table-column>
         <el-table-column
            prop="startTime"
            label="开始时间">
        </el-table-column>
         <el-table-column
            prop="endTime"
            label="结束时间">
        </el-table-column>
        <el-table-column
            fixed="right"
            width="100"
            label="操作">
            <template slot-scope="scope">
                <el-button type="text" size="small" @click="viewSubject(scope.row)">查看受试者</el-button>
            </template>
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
        <!-- <div style="margin:10px 0 0 10px;">
              <el-button type="primary" size="small" @click="$router.go(-1)">返回</el-button>
        </div> -->
    </div>
</template>
<script>
import moment from 'moment'
export default {
    data(){
        return{
             bookingManagementSubject_page:false,
             btnAuth:{
                 
             },
             formInline:{
                date:''
             },
             defaultValue:'',
             queryResult:{
                 pageNum:1,
                 pageSize:10,
                 total:0,
                 tableData:[],
             },
             fanghaoNum:null,
             shengyuNum:null

        }
    },
    mounted() {
        let obj = this.checkPageAuth(this, "bookingManagementSubject_page", this.btnAuth);
        this.formInline.date = this.$route.query.reservationDate;
        this.queryData();
    },
    methods: {
        queryData(){
            $axios_http({
                url:'/base/hospital/num/list/queryNumByRuleIdAndRule',
                data:{
                    reservationDateToString:this.$route.query.reservationDate,
                    communityDeptId:this.$route.query.communityDeptId,
                    ruleId:this.$route.query.ruleId
                },
                vueObj:this
            }).then((res)=>{
                if(res.data.statusMsg == "success"){
                     this.fanghaoNum = res.data.data.fanghaoNum;
                     this.shengyuNum = res.data.data.shengyuNum
                }
            })
            $axios_http({
                url:'/base/hospital/num/list/queryEntityByRuleIdAndRule',
                data:{
                    reservationDateToString:this.$route.query.reservationDate,
                    communityDeptId:this.$route.query.communityDeptId,
                    ruleId:this.$route.query.ruleId,
                    pageNo:this.queryResult.pageNum,
                    pageSize:this.queryResult.pageSize
                },
                vueObj:this
            }).then((resp)=>{
                if(resp.data.statusMsg == "success"){
                    this.queryResult.tableData = resp.data.data;
                    this.queryResult.total = resp.data.pageInfo.totalRowCount;
                }
            })
        },
        selectData(){
            if(this.formInline.date != null){
            $axios_http({
                url:'/base/hospital/num/list/queryEntityByRuleIdAndRule',
                data:{
                    reservationDateToString:moment(this.formInline.date).format('YYYY-MM-DD'),
                    communityDeptId:this.$route.query.communityDeptId,
                    ruleId:this.$route.query.ruleId,
                    pageNo:this.queryResult.pageNum,
                    pageSize:this.queryResult.pageSize
                    },
                    vueObj:this
                }).then((resp)=>{
                    if(resp.data.statusMsg == "success"){
                        this.queryResult.tableData = resp.data.data;
                        this.queryResult.total = resp.data.pageInfo.totalRowCount;
                    }
                })
            $axios_http({
                url:'/base/hospital/num/list/queryNumByRuleIdAndRule',
                data:{
                    reservationDateToString:this.formInline.date,
                    communityDeptId:this.$route.query.communityDeptId,
                    ruleId:this.$route.query.ruleId
                },
                vueObj:this
                }).then((res)=>{
                    if(res.data.statusMsg == "success"){
                        this.fanghaoNum = res.data.data.fanghaoNum;
                        this.shengyuNum = res.data.data.shengyuNum
                    }
                })
            }else{
                this.$message.error('请选择时间');
            }
            
        },
        pageSizeChange(pageSize){
            this.queryResult.pageSize = pageSize;
            $axios_http({
                url:'/base/hospital/num/list/queryEntityByRuleIdAndRule',
                data:{
                    reservationDateToString:this.$route.query.reservationDate,
                    communityDeptId:this.$route.query.communityDeptId,
                    ruleId:this.$route.query.ruleId,
                    pageNo:this.queryResult.pageNum,
                    pageSize:this.queryResult.pageSize
                },
                vueObj:this
            }).then((resp)=>{
                if(resp.data.statusMsg == "success"){
                    this.queryResult.tableData = resp.data.data;
                    this.queryResult.total = resp.data.pageInfo.totalRowCount;
                }
            })
        },
        currentPageChange(currentPage){
            this.queryResult.pageNum = currentPage
            $axios_http({
                url:'/base/hospital/num/list/queryEntityByRuleIdAndRule',
                data:{
                    reservationDateToString:this.$route.query.reservationDate,
                    communityDeptId:this.$route.query.communityDeptId,
                    ruleId:this.$route.query.ruleId,
                    pageNo:this.queryResult.pageNum,
                    pageSize:this.queryResult.pageSize
                },
                vueObj:this
            }).then((resp)=>{
                if(resp.data.statusMsg == "success"){
                    this.queryResult.tableData = resp.data.data;
                    this.queryResult.total = resp.data.pageInfo.totalRowCount;
                }
            })
        },
        viewSubject(row){
            this.$router.push({
                path:'/bookingManagements/bookingManagementHistoryDetail',
                query:{
                    aId:row.aId,
                    communityDeptId:row.communityDeptId,
                    reservationDate:row.reservationDate
                }
            })
        }
    },
}
</script>
<style lang="scss" scoped>
    .subject-container{
        background: #ffffff;
        padding: 10px;
         .table-header{
          width: 100%;
          height: 60px;
          line-height: 60px;
          margin: 10px 0;
          position: relative;
          text-indent:5px;
          &:after{
              content: '';
              position: absolute;
              width: 4px;
              height: 40%;
              top:30%;
              left: 0;
              background: #409EFF;
          }
        .span{
            display: inline-block;
            padding:0 10px;
            float:right;
            margin-right: 20px;
            font-size: 14px;
          }
        }
    }
</style>

