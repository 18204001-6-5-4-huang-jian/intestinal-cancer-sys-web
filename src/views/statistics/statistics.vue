<template>
  <div slot="right" class="content-page" v-if="statistics_page">
    <div class="content">
      <div class="filter-container" >
        <router-link to="/home/home">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
        <el-form :model="qc" :inline="true">
          <el-date-picker
            v-model="qc.startDate"
            clearable
            type="date"
            size="small"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            placeholder="开始日期"
            style="width: 200px;margin-right: 20px">
          </el-date-picker>
          <el-date-picker
            v-model="qc.endDate"
            clearable
            type="date"
            size="small"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            placeholder="截止日期"
            style="width: 200px;margin-right: 20px">
          </el-date-picker>
            <el-button size="small" type="primary" icon="el-icon-search"  v-if="btnAuth.statistics_query_btn" @click="query()">查询</el-button>
            <el-button type="primary" size="small" icon="el-icon-close"   v-if="btnAuth.statistics_query_btn" @click="reset()">重置</el-button>
        </el-form>
        <!--数据列表-->
        <!--<div class="table-btn-grooup">-->
          <!--<el-button class="filter-item" type="primary" size="small" icon="el-icon-close"  v-if="btnAuth.fit_reserve_btn">一键预约</el-button>-->
          <!--<el-button class="filter-item" size="small" type="primary" icon="el-icon-search"  v-if="btnAuth.fit_export__excel_btn">导出EXCEL</el-button>-->
        <!--</div>-->
        <!-- <el-table
          :data="queryResult.tableData"
          border
          style="width: 100%;margin-top: 20px;">
          <el-table-column
            prop="group"
            label="分组"
          >
          </el-table-column>
          <el-table-column
            prop="groupsNum"
            label="入组人数"
            width="120">
          </el-table-column>
          <el-table-column
            prop="bookingColonscopyNum"
            label="已预约肠镜检查人数">
          </el-table-column>
          <el-table-column
            prop="inspectColonscopyNum"
            label="实际接受肠镜检查人数">
          </el-table-column>
          <el-table-column
            prop="DNANum"
            label="粪便DNA发放数">
          </el-table-column>
          <el-table-column
              prop="DNAFeedbackNum"
              label="粪便DNA检查已返回数">
            </el-table-column>
          <el-table-column
            prop="FitNum"
            label="FIT发放数">
          </el-table-column>
          <el-table-column
              prop="FitResultReturnNum"
              label="FIT结果返回数">
            </el-table-column>
            <el-table-column
              prop="FitResultNum"
              width="190"
              label="FIT结果（阳性/阴性/无效）">
            </el-table-column> -->
          <!-- <el-table-column
            prop="FitPositiveNum"
            label="FIT阳性人数">
          </el-table-column>
          <el-table-column
            prop="FitNegativeNum"
            label="FIT阴性人数">
          </el-table-column> -->
          <!-- <el-table-column
            prop="SearchOutNum"
            label="退出研究人数"
          >
          </el-table-column>
        </el-table> -->
        <!--分页栏-->
          <el-tabs style="margin:20px 0;" v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="随访任务量-分地区和分月份" name="1">
                 <tasknumTable :tableData="taskNumtableData"></tasknumTable>
            </el-tab-pane>
            <el-tab-pane label="随访任务进度表格-分地区和组别" name="2">
               <taskprocessTable :tableData="taskprocesstableData"></taskprocessTable>
            </el-tab-pane>
            <el-tab-pane label="FIT检查完成情况-分地区和组别" name="3">
              <fitTable :tableData="fittableData"></fitTable>
            </el-tab-pane>
            <el-tab-pane label="结肠镜完成情况-分地区和组别" name="4">
              <taskcolorectalTable :tableData="taskcolorectaltableData"></taskcolorectalTable>
            </el-tab-pane>
          </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import tasknumTable from './tasknumtable.vue'
import taskprocessTable from './taskprocesstable.vue'
import fitTable from './fittable.vue'
import taskcolorectalTable from './taskcolorectaltable.vue'
  export default {
    name: 'Right',
    components:{
      tasknumTable,
      taskprocessTable,
      fitTable,
      taskcolorectalTable
    },
    data () {
      return {
        //权限判定
        statistics_page:false,
        btnAuth:{
          statistics_query_btn:false,
        },
        //查询条件
        "qc":{
          "startDate":"",
          "endDate":""
        },
        activeName:'1',
        taskNumtableData:[],
        taskprocesstableData:[],
        fittableData:[],
        taskcolorectaltableData:[],
        // groupsNumArr:[],
        // bookingColonscopyArr:[],
        // inspectColonscopyArr:[],
        // DNAArr:[],
        // FitArr:[],
        // FitPositiveArr:[],
        // FitNegativeArr:[],
        // countryTableDataPathological:[],
        //查询结果
        "queryResult":{
          "pageNo":1,//当前页
          "pageSize":10,//每页的条数
          "totalPageCount":0,
          "tableData":[
            {
              group:'A组',
              groupsNum:'',
              bookingColonscopyNum:'',
              inspectColonscopyNum:'',
              DNANum:'',
              DNAFeedbackNum:'',
              FitNum:'',
              FitResultReturnNum:'',
              FitPositiveNum:'',
              FitNegativeNum:'',
              SearchOutNum:'',
              FitResultNum:''
            },
            {
              group:'B组',
              groupsNum:'',
              bookingColonscopyNum:'',
              inspectColonscopyNum:'',
              DNANum:'',
              DNAFeedbackNum:'',
              FitNum:'',
              FitResultReturnNum:'',
              FitPositiveNum:'',
              FitNegativeNum:'',
              SearchOutNum:'',
              FitResultNum:''
            },
            {
              group:'C组高危',
              groupsNum:'',
              bookingColonscopyNum:'',
              inspectColonscopyNum:'',
              DNANum:'',
              DNAFeedbackNum:'',
              FitNum:'',
              FitResultReturnNum:'',
              FitPositiveNum:'',
              FitNegativeNum:'',
              SearchOutNum:'',
              FitResultNum:''
            },
            {
              group:'C组低危',
              groupsNum:'',
              bookingColonscopyNum:'',
              inspectColonscopyNum:'',
              DNANum:'',
              DNAFeedbackNum:'',
              FitNum:'',
              FitResultReturnNum:'',
              FitPositiveNum:'',
              FitNegativeNum:'',
              SearchOutNum:'',
              FitResultNum:''
            },
            {
              group:'C组未评估',
             groupsNum:'',
              bookingColonscopyNum:'',
              inspectColonscopyNum:'',
              DNANum:'',
              DNAFeedbackNum:'',
              FitNum:'',
              FitResultReturnNum:'',
              FitPositiveNum:'',
              FitNegativeNum:'',
              SearchOutNum:'',
              FitResultNum:''
            },
            {
              group:'C组',
              groupsNum:'',
              bookingColonscopyNum:'',
              inspectColonscopyNum:'',
              DNANum:'',
              DNAFeedbackNum:'',
              FitNum:'',
              FitResultReturnNum:'',
              FitPositiveNum:'',
              FitNegativeNum:'',
              SearchOutNum:'',
              FitResultNum:''
            },
            {
              group:'总计',
              groupsNum:'',
              bookingColonscopyNum:'',
              inspectColonscopyNum:'',
              DNANum:'',
              DNAFeedbackNum:'',
              FitNum:'',
              FitResultReturnNum:'',
              FitPositiveNum:'',
              FitNegativeNum:'',
              SearchOutNum:'',
              FitResultNum:''
            },
          ]
        },
        //分页
        "queryResultSource":{
          "pageNoSource":1,//当前页
          "pageSizeSource":15,//每页的条数
          "totalPageCount":0
        },
        insertForm:{
          "resultDate":'',
          'upLineValue':null,
          'downLineValue':null,
          'noResonResult':'',
          'resultStatus':''
        },
        tableData:[
            'A','B','cg','cd','cp'
        ]
      }
    },
    mounted(){
      this.$store.commit('LOGOUT_USER');
      let obj = this.checkPageAuth(this,"statistics_page",this.btnAuth);
      this.query();
    },
    methods:{
      //查询入组人数
      query(){
//         $axios_http({
//           url:"/base/hospital/person/notentry/riskfactors/groupByAcounts",
//           data:{
//             startDate:this.qc.startDate,
//             endDate:this.qc.endDate,
//           },
//           vueObj:this
//         }).then((res)=>{
//               this.queryResult.tableData[0].groupsNum = res.data.data[0].A
//               this.queryResult.tableData[0].bookingColonscopyNum = res.data.data[1].A
//               this.queryResult.tableData[0].inspectColonscopyNum = res.data.data[2].A
//               this.queryResult.tableData[0].DNANum = res.data.data[3].A
//               this.queryResult.tableData[0].FitNum = res.data.data[4].A
//               this.queryResult.tableData[0].FitPositiveNum = res.data.data[5].A
//               this.queryResult.tableData[0].FitNegativeNum = res.data.data[6].A
//               this.queryResult.tableData[0].SearchOutNum = res.data.data[7].A
//               this.queryResult.tableData[0].DNAFeedbackNum = res.data.data[8].A
//               this.queryResult.tableData[0].FitInvalidNum = res.data.data[9].A
//               this.queryResult.tableData[0].FitResultReturnNum = res.data.data[10].A
//               this.queryResult.tableData[0].FitResultNum = res.data.data[5].A +' / '+res.data.data[6].A+' / '+res.data.data[9].A

//               this.queryResult.tableData[1].groupsNum = res.data.data[0].B
//               this.queryResult.tableData[1].bookingColonscopyNum = res.data.data[1].B
//               this.queryResult.tableData[1].inspectColonscopyNum = res.data.data[2].B
//               this.queryResult.tableData[1].DNANum = res.data.data[3].B
//               this.queryResult.tableData[1].FitNum = res.data.data[4].B
//               this.queryResult.tableData[1].FitPositiveNum = res.data.data[5].B
//               this.queryResult.tableData[1].FitNegativeNum = res.data.data[6].B
//               this.queryResult.tableData[1].SearchOutNum = res.data.data[7].B
//               this.queryResult.tableData[1].DNAFeedbackNum = res.data.data[8].B
//               this.queryResult.tableData[1].FitInvalidNum = res.data.data[9].B
//               this.queryResult.tableData[1].FitResultReturnNum = res.data.data[10].B
//               this.queryResult.tableData[1].FitResultNum = res.data.data[5].B +' / '+res.data.data[6].B+' / '+res.data.data[9].B


//               this.queryResult.tableData[2].groupsNum = res.data.data[0].cg
//               this.queryResult.tableData[2].bookingColonscopyNum = res.data.data[1].cg
//               this.queryResult.tableData[2].inspectColonscopyNum = res.data.data[2].cg
//               this.queryResult.tableData[2].DNANum = res.data.data[3].cg
//               this.queryResult.tableData[2].FitNum = res.data.data[4].cg
//               this.queryResult.tableData[2].FitPositiveNum = res.data.data[5].cg
//               this.queryResult.tableData[2].FitNegativeNum = res.data.data[6].cg
//               this.queryResult.tableData[2].SearchOutNum = res.data.data[7].cg
//               this.queryResult.tableData[2].DNAFeedbackNum = res.data.data[8].cg
//               this.queryResult.tableData[2].FitInvalidNum = res.data.data[9].cg
//               this.queryResult.tableData[2].FitResultReturnNum = res.data.data[10].cg
//               this.queryResult.tableData[2].FitResultNum = res.data.data[5].cg +' / '+res.data.data[6].cg+' / '+res.data.data[9].cg

//               this.queryResult.tableData[3].groupsNum = res.data.data[0].cd
//               this.queryResult.tableData[3].bookingColonscopyNum = res.data.data[1].cd
//               this.queryResult.tableData[3].inspectColonscopyNum = res.data.data[2].cd
//               this.queryResult.tableData[3].DNANum = res.data.data[3].cd
//               this.queryResult.tableData[3].FitNum = res.data.data[4].cd
//               this.queryResult.tableData[3].FitPositiveNum = res.data.data[5].cd
//               this.queryResult.tableData[3].FitNegativeNum = res.data.data[6].cd
//               this.queryResult.tableData[3].SearchOutNum = res.data.data[7].cd
//               this.queryResult.tableData[3].DNAFeedbackNum = res.data.data[8].cd
//               this.queryResult.tableData[3].FitInvalidNum = res.data.data[9].cd
//               this.queryResult.tableData[3].FitResultReturnNum = res.data.data[10].cd
//               this.queryResult.tableData[3].FitResultNum = res.data.data[5].cd +' / '+res.data.data[6].cd+' / '+res.data.data[9].cd

//               this.queryResult.tableData[4].groupsNum = res.data.data[0].cp
//               this.queryResult.tableData[4].bookingColonscopyNum = res.data.data[1].cp
//               this.queryResult.tableData[4].inspectColonscopyNum = res.data.data[2].cp
//               this.queryResult.tableData[4].DNANum = res.data.data[3].cp
//               this.queryResult.tableData[4].FitNum = res.data.data[4].cp
//               this.queryResult.tableData[4].FitPositiveNum = res.data.data[5].cp
//               this.queryResult.tableData[4].FitNegativeNum = res.data.data[6].cp
//               this.queryResult.tableData[4].SearchOutNum = res.data.data[7].cp
//               this.queryResult.tableData[4].DNAFeedbackNum = res.data.data[8].cp
//               this.queryResult.tableData[4].FitInvalidNum = res.data.data[9].cp
//               this.queryResult.tableData[4].FitResultReturnNum = res.data.data[10].cp
//               this.queryResult.tableData[4].FitResultNum = res.data.data[5].cp +' / '+res.data.data[6].cp+' / '+res.data.data[9].cp

//               this.queryResult.tableData[5].groupsNum = this.queryResult.tableData[4].groupsNum + this.queryResult.tableData[3].groupsNum + this.queryResult.tableData[2].groupsNum
//               this.queryResult.tableData[5].bookingColonscopyNum = this.queryResult.tableData[4].bookingColonscopyNum + this.queryResult.tableData[3].bookingColonscopyNum + this.queryResult.tableData[2].bookingColonscopyNum
//               this.queryResult.tableData[5].inspectColonscopyNum =this.queryResult.tableData[4].inspectColonscopyNum + this.queryResult.tableData[3].inspectColonscopyNum + this.queryResult.tableData[2].inspectColonscopyNum
//               this.queryResult.tableData[5].DNANum = this.queryResult.tableData[4].DNANum + this.queryResult.tableData[3].DNANum + this.queryResult.tableData[2].DNANum
//               this.queryResult.tableData[5].FitNum = this.queryResult.tableData[4].FitNum + this.queryResult.tableData[3].FitNum + this.queryResult.tableData[2].FitNum
//               this.queryResult.tableData[5].FitPositiveNum = this.queryResult.tableData[4].FitPositiveNum + this.queryResult.tableData[3].FitPositiveNum + this.queryResult.tableData[2].FitPositiveNum
//               this.queryResult.tableData[5].FitNegativeNum =this.queryResult.tableData[4].FitNegativeNum + this.queryResult.tableData[3].FitNegativeNum + this.queryResult.tableData[2].FitNegativeNum
//               this.queryResult.tableData[5].FitInvalidNum =this.queryResult.tableData[4].FitInvalidNum + this.queryResult.tableData[3].FitInvalidNum + this.queryResult.tableData[2].FitInvalidNum
//               this.queryResult.tableData[5].SearchOutNum =this.queryResult.tableData[4].SearchOutNum + this.queryResult.tableData[3].SearchOutNum + this.queryResult.tableData[2].SearchOutNum
//               this.queryResult.tableData[5].DNAFeedbackNum = this.queryResult.tableData[4].DNAFeedbackNum + this.queryResult.tableData[3].DNAFeedbackNum + this.queryResult.tableData[2].DNAFeedbackNum
//               this.queryResult.tableData[5].FitResultReturnNum = this.queryResult.tableData[4].FitResultReturnNum + this.queryResult.tableData[3].FitResultReturnNum + this.queryResult.tableData[2].FitResultReturnNum
//               this.queryResult.tableData[5].FitResultNum = this.queryResult.tableData[5].FitPositiveNum +' / '+this.queryResult.tableData[5].FitNegativeNum+' / '+this.queryResult.tableData[5].FitInvalidNum

//               this.queryResult.tableData[6].groupsNum = this.queryResult.tableData[0].groupsNum + this.queryResult.tableData[1].groupsNum + this.queryResult.tableData[5].groupsNum
//               this.queryResult.tableData[6].bookingColonscopyNum = this.queryResult.tableData[0].bookingColonscopyNum + this.queryResult.tableData[1].bookingColonscopyNum + this.queryResult.tableData[5].bookingColonscopyNum
//               this.queryResult.tableData[6].inspectColonscopyNum =this.queryResult.tableData[0].inspectColonscopyNum + this.queryResult.tableData[1].inspectColonscopyNum + this.queryResult.tableData[5].inspectColonscopyNum
//               this.queryResult.tableData[6].DNANum = this.queryResult.tableData[0].DNANum + this.queryResult.tableData[1].DNANum + this.queryResult.tableData[5].DNANum
//               this.queryResult.tableData[6].FitNum = this.queryResult.tableData[0].FitNum + this.queryResult.tableData[1].FitNum + this.queryResult.tableData[5].FitNum
//               this.queryResult.tableData[6].FitPositiveNum = this.queryResult.tableData[0].FitPositiveNum + this.queryResult.tableData[1].FitPositiveNum + this.queryResult.tableData[5].FitPositiveNum
//               this.queryResult.tableData[6].FitNegativeNum =this.queryResult.tableData[0].FitNegativeNum + this.queryResult.tableData[1].FitNegativeNum + this.queryResult.tableData[5].FitNegativeNum
//               this.queryResult.tableData[6].FitInvalidNum =this.queryResult.tableData[0].FitInvalidNum + this.queryResult.tableData[1].FitInvalidNum + this.queryResult.tableData[5].FitInvalidNum
//               this.queryResult.tableData[6].SearchOutNum =this.queryResult.tableData[0].SearchOutNum + this.queryResult.tableData[1].SearchOutNum + this.queryResult.tableData[5].SearchOutNum
//               this.queryResult.tableData[6].DNAFeedbackNum = this.queryResult.tableData[0].DNAFeedbackNum + this.queryResult.tableData[1].DNAFeedbackNum + this.queryResult.tableData[5].DNAFeedbackNum
//               this.queryResult.tableData[6].FitResultReturnNum = this.queryResult.tableData[0].FitResultReturnNum + this.queryResult.tableData[1].FitResultReturnNum + this.queryResult.tableData[5].FitResultReturnNum
//               this.queryResult.tableData[6].FitResultNum = this.queryResult.tableData[6].FitPositiveNum +' / '+this.queryResult.tableData[6].FitNegativeNum+' / '+this.queryResult.tableData[6].FitInvalidNum
// //            }
//         })
        // 社区统计随访任务量
        $axios_http({
          url:"/base/hospital/statistics/community/followTask",
          data:{
            startDate:this.qc.startDate,
            endDate:this.qc.endDate,
          },
          vueObj:this
        }).then((res)=>{
           if(res.data.statusMsg == 'success'){
             this.taskNumtableData = res.data.data;
           }
        })
        // 社区随访任务进度
         $axios_http({
          url:"/base/hospital/statistics/community/followSchedule",
          data:{
            startDate:this.qc.startDate,
            endDate:this.qc.endDate,
          },
          vueObj:this
        }).then((res)=>{
           if(res.data.statusMsg == 'success'){
             this.taskprocesstableData = res.data.data;
           }
        })
        // FIT检查完成情况
        $axios_http({
          url:"/base/hospital/statistics/community/fitSchedule",
          data:{
            startDate:this.qc.startDate,
            endDate:this.qc.endDate,
          },
          vueObj:this
        }).then((res)=>{
           if(res.data.statusMsg == 'success'){
             this.fittableData = res.data.data;
           }
        })
        // 结直肠镜完成情况
          $axios_http({
          url:"/base/hospital/statistics/community/cjSchedule",
          data:{
            startDate:this.qc.startDate,
            endDate:this.qc.endDate,
          },
          vueObj:this
        }).then((res)=>{
           if(res.data.statusMsg == 'success'){
             this.taskcolorectaltableData = res.data.data;
           }
        })
      },
      //重置检索条件
      reset(){
        Object.assign(this.$data.qc, this.$options.data().qc)
        this.query()
        this.ids = []
      },
      handleClick(tab, event){
         console.log(tab, event);
      }
    }}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .filter-item{
    width: 200px;
    margin-right: 10px;

  }
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
  .return-home {
    display: block;
    text-align: center;
    margin-bottom:20px;
  }
  .table-btn-grooup{
    margin-bottom:10px;
  }
  .resultList{
    width: 60%;
    list-style: none;
    margin:20px auto;
  }
  .resultList li{
    line-height: 40px;
    font-weight: 600;
    font-size: 18px;
  }
  .lineWidth{
    width: 50%;
  }
  .dialog-footer{
    position: absolute;right:20px;bottom:20px;
  }
  .resultInfo{
    text-align: center;
    line-height: 30px;
    font-size: 18px;
    font-weight: 500;
  }
</style>
<style>
  .content {
    background: #fff;
    padding: 10px;
  }
</style>
