<template>
    <div class="bookingManagementDetail-container" v-if="bookingManagementDetail_page">
        <div class="btns" style="margin:10px 0 10px 0;">
        <router-link to="/bookingManagements/bookingManagement">
        <el-button size="small">返回</el-button>
        </router-link>
     </div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
             <el-form-item label="预约规则：">
                  <el-radio-group v-model="formInline.issueType">
                  <el-radio label="1" v-if="$route.query.issueType == 1">已选择社区共用</el-radio>
                  <el-radio label="1" v-if="$route.query.issueType == 2">按社区/区指定数量分配</el-radio>
                  </el-radio-group>
            </el-form-item>
        </el-form>
        <div class="period">
            <span class="titleTime">预约日期</span>
            <ul class="tableTitle">
                <li class="fl" v-for="(item,index) in dataArray.slice(7,14)" :key="index">
                    {{item.week | filterWeek}}
                </li>
            </ul>
            <ul class="date" v-if="changeSelectStatus">
                 <li class="fl" v-for="(item,index) in dataArray" :key="index" :class="{'activeLi':index==activeIndex}" @click="changeData(index,item.day)">
                     <span v-if="index==0">今日</span>
                     <span v-if="index!=0">{{item.day}}</span>
                     <span v-if="item.status != '未排班'">剩余：{{item.num==null?'0':item.num}}</span>
                     <span>{{item.status}}</span>
                </li>
            </ul>
            <ul class="nodata" v-if="!changeSelectStatus">
                <li>暂无数据</li>
            </ul>
        </div>
         <div class="table-header">
            &nbsp;机构放号列表
        </div>
          <!-- table -->
        <el-table
        :data="tableData"
        border
        style="width:100%">
        <el-table-column
           type="index"
           label="序号"
           width="50px">
        </el-table-column>
        <el-table-column
            prop="name"
            label="社区"
            >
        </el-table-column>
        <el-table-column
            prop="project"
            label="预约项目"
            >
        </el-table-column>
        <el-table-column
            prop="fanghaoNum"
            label="放号数量">
        </el-table-column>
        <el-table-column
            prop="yuyueNum"
            label="预约数量">
        </el-table-column>
        <el-table-column
            prop="levelName"
            label="类型">
            <template slot-scope="scope">
              {{scope.row.levelName == '1'?'国家':scope.row.levelName == '11'?'地区':'社区'}}
            </template>
        </el-table-column>
        <el-table-column
            label="操作"
            fixed="right"
            width="100px">
            <template slot-scope="scope">
                <router-link :to="{path:'/bookingManagements/bookingManagementSubject',query:{communityDeptId:scope.row.communityDeptId,ruleId:scope.row.ruleId,reservationDate:scope.row.reservationDate}}">
                    <el-button type="text" size="small">查看</el-button>
                </router-link>
            </template>
        </el-table-column>
        </el-table>
     <!-- <div class="btns" style="margin:10px 0 0 10px;">
        <router-link to="/bookingManagements/bookingManagement">
        <el-button type="primary" size="small">返回</el-button>
        </router-link>
     </div> -->
    </div>
</template>
<script>
export default {
    data(){
        return{
           bookingManagementDetail_page:false,
           btnAuth:{
               
           },
           formInline:{
              issueType:'1'
           },
           form:{
              resource:''
           },
           tableData:[],
           dataArray:[],
           activeIndex:0,
           changeSelectStatus:false
        }
    },
    mounted() {
        let obj = this.checkPageAuth(this, "bookingManagementDetail_page", this.btnAuth);
        this.getData()
    },
    methods: {
        getData(){
        $axios_http({
            url:'/base/hospital/num/list/queryCalendar',
            data:{
                ruleId:this.$route.query.ruleId
            },
            vueObj:this,
            }).then((res) => {
                if(res.data.statusMsg == "success"){
                this.changeSelectStatus = true;
                this.dataArray = res.data.data;
                //请求table数据
                $axios_http({
                    url:'/base/hospital/num/list/queryByRuleIdAndRule',
                    data:{
                        ruleId:this.$route.query.ruleId,
                        issueType:this.$route.query.issueType,
                        reservationDateToString:res.data.data[0].day
                    },
                    vueObj:this
                }).then((resp)=>{
                    if(resp.data.statusMsg == "success"){
                        this.tableData = resp.data.data;
                    }
                })
               }
            })
         },
         changeData(index,day){
            this.activeIndex = index;
            $axios_http({
                url:'/base/hospital/num/list/queryByRuleIdAndRule',
                data:{
                    ruleId:this.$route.query.ruleId,
                    issueType:this.$route.query.issueType,
                    reservationDateToString:day
                },
                vueObj:this
                }).then((resp)=>{
                    if(resp.data.statusMsg == "success"){
                        this.tableData = resp.data.data;
                    }
                })
         }
    }
}
</script>
<style lang="scss" scoped>
    .bookingManagementDetail-container{
          background: #ffffff;
          padding: 10px;
      .table-header{
          clear: both;
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
        }
       .period{
           width: 100%;
            ul{
            width: 80%;
            margin: 0 auto;
            li{
                list-style: none;
            }
            }
        .tableTitle li{
            width: 14.28%;
            border-top: 1px solid  #ECECEF;
            height: 28px;
            line-height: 28px;
            background: #409EFF;
            color: #ECECEF;
            text-align: center;
            border-left: 1px solid #ECECEF;
            border-bottom:1px solid #ECECEF;
            margin-top: -1px;
            list-style:none;
          }
          .date .activeLi{
              background: gray;
              color: #ffffff;
          }
          .date li{
                width: 14.28%;
                border-top: 1px solid  #ECECEF;
                height: 78px;
                background: #ffffff;
                color: #000000;
                text-align: center;
                border-left: 1px solid #ECECEF;
                border-bottom:1px solid #ECECEF;
                margin-top: -1px;
                list-style:none;
                cursor: pointer;
                span{
                    display: inline-block;
                    width: 100%;
                    margin:2px 0;
                    font-size: 14px;
                    text-align: center;
                }
          }
       }
        .el-radio-group{
            width: 100%;
            text-align: center;
            margin:10px auto;
        }
    }
</style>


