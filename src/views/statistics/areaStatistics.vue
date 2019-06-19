<template>
  <div slot="right" class="content-page" v-if="areaStatistics_page">
    <div class="content">
      <div class="filter-container" style>
          <el-button size="mini" class="return-home" @click="goBack()">返 回</el-button>
        <el-form :model="qc" :inline="true">
          <el-date-picker
            v-model="qc.startDate"
            clearable
            type="date"
            size="small"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            placeholder="开始日期"
            style="width: 200px;margin-right: 20px"
            >
          </el-date-picker>
          <el-date-picker
            v-model="qc.endDate"
            clearable
            type="date"
            size="small"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            placeholder="截止日期"
            style="width: 200px;margin-right: 20px;"
           >
          </el-date-picker>
            <el-button size="small" type="primary" icon="el-icon-search"  @click="queryClick" v-if="btnAuth.area_statistics_query_btn">查询</el-button>
            <el-button type="primary" size="small" icon="el-icon-close" @click="reset" v-if="btnAuth.area_statistics_query_btn">重置</el-button>
          <!-- <div style="margin-top:10px">
            <el-button type="primary" size="small"  @click="jump" v-if="btnAuth.area_statistics_query_btn">智能数据统计平台<i class="el-icon-arrow-right el-icon--right"></i></el-button>
          </div> -->
        </el-form>
        <!--<div class="table-btn-grooup">-->
          <!--<el-button class="filter-item" type="primary" size="small" icon="el-icon-close"  v-if="btnAuth.fit_reserve_btn">一键预约</el-button>-->
          <!--<el-button class="filter-item" size="small" type="primary" icon="el-icon-search"  v-if="btnAuth.fit_export__excel_btn">导出EXCEL</el-button>-->
        <!--</div>-->
        <!-- <div v-for="(item,index) in tableData" :key="index" class="community-item">
           <div >{{item.commdtName}}</div>
          <el-table
            :data="item.list"
            border
            style="width: 100%;margin-top: 20px;">
            <el-table-column
              label="分组"
              prop="group"
            >
            </el-table-column>
            <el-table-column
              prop="groupsNum"
              label="入组人数"
              width="100">
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
          </el-table>
        </div> -->
         <!-- <el-table
          :data="areaTableData"
          border
          style="width: 100%;margin-top: 20px;">
          <el-table-column
            label="社区"
            prop="name"

          >
          </el-table-column>
          <el-table-column
            prop="groupsNum"
            label="入组人数"
            width="100">
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
        <!--病变结果相关统计表-->
        <!-- <div class="bj">
          <div style="margin-top:20px;">病变结果相关统计表</div>
          <el-table
            :data="areaTableDataPathological"
            :span-method="objectSpanMethod"
            border
            style="width: 100%;margin-top: 20px;">
            <el-table-column
              label="地区"
              prop="name"

            >
            </el-table-column>
            <el-table-column
              label="组别"
              prop="group"

            >
            </el-table-column>
            <el-table-column
              prop="colorectalCancerNum"
              label="结直肠癌（N,%）">
            </el-table-column>
            <el-table-column
              prop="advancedAdenomaNum"
              label="进展期腺瘤（N,%）">
            </el-table-column>
            <el-table-column
              prop="nonAdvancedAdenomaNum"
              label="非进展期腺瘤（N,%）">
            </el-table-column>
            <el-table-column
              prop="otherLesionsNum"
              label="其他息肉性病变或者炎症（N,%）">
            </el-table-column>
            <el-table-column
                prop="colonoscopyNum"
                label="肠镜数">
              </el-table-column>
          </el-table>
        </div> -->
          <el-tabs style="margin:20px 0;" v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="随访任务量-分地区和分月份" name="1">
                 <commonTable :tableData="taskNumtableData"></commonTable>
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
              <el-tab-pane label="病变检出情况" name="5">
               <pathologyTable :tableData="pathologytableData"></pathologyTable>
            </el-tab-pane>
          </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import commonTable from './tasknumtableArea.vue'
import taskprocessTable from './taskprocesstableArea.vue'
import fitTable from './fittableArea.vue'
import taskcolorectalTable from './taskcolorectaltableArea.vue'
import pathologyTable from './pathologytableArea.vue'
  export default {
    name: 'Right',
    components:{
      commonTable,
      taskprocessTable,
      fitTable,
      taskcolorectalTable,
      pathologyTable
    },
    data () {
      return {
        tableData:[],
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        //权限判定
        areaStatistics_page:false,
        btnAuth:{
          area_statistics_query_btn:false,
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
        pathologytableData:[],
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
              FitResultNum:''
            },
          ]
        },
        groupData: {
          group:'C组',
          groupsNum:1,//入组人数
          bookingColonscopyNum:2,//预约
          inspectColonscopyNum:3,//实际
          DNANum:0,
          DNAFeedbackNum:0,
          FitNum:0,
          FitResultReturnNum:0,
          FitPositiveNum:0,
          FitNegativeNum:0,
          FitResultNum:0
        },
        areaTableData:[],
        areaTableDataPathological:[]
      }
    },
    mounted(){
      this.$store.commit('LOGOUT_USER');
      let obj = this.checkPageAuth(this,"areaStatistics_page",this.btnAuth);
      this.query();
    },
    methods:{
      //跳转到bi
      jump(){
        $axios_http({
          url:"/base/sendToken",
          data:{
           userId:window.localStorage.getItem('loginName')
          },
          vueObj:this
        }).then((res)=>{
            if(res.data.statusCode){
//              window.open('http://192.168.1.16/login?userId='+window.localStorage.getItem('loginName'), '_blank');
              window.open('http://111.202.40.136:9300/login?userId='+window.localStorage.getItem('loginName'), '_blank');
            }

        })
      },
      //查询入组人数
      query(){
        // $axios_http({
        //   url:"/base/hospital/person/notentry/riskfactors/getGroupsByAreaId",
        //   data:{
        //     startDate:this.qc.startDate,
        //     endDate:this.qc.endDate,
        //   },
        //   vueObj:this
        // }).then((res)=>{
        //     this.areaTableData = []
        //     //循环拼接fit结果
        //     res.data.data.filter( itemList=>{
        //       itemList.list.filter( item=> {
        //         item.FitResultNum = item.FitPositiveNum+' / '+item.FitNegativeNum+' / '+item.FitInvalidNum
        //       })
        //     })
        //     this.tableData = res.data.data
        //     for(let i = 0;i<this.tableData.length;i++){
        //         var obj={}
        //         obj.group = 'C组'
        //         obj.groupsNum = this.tableData[i].list[2].groupsNum +this.tableData[i].list[3].groupsNum +this.tableData[i].list[4].groupsNum
        //         obj.bookingColonscopyNum = this.tableData[i].list[2].bookingColonscopyNum +this.tableData[i].list[3].bookingColonscopyNum +this.tableData[i].list[4].bookingColonscopyNum
        //       obj.inspectColonscopyNum = this.tableData[i].list[2].inspectColonscopyNum +this.tableData[i].list[3].inspectColonscopyNum +this.tableData[i].list[4].inspectColonscopyNum
        //       obj.DNANum = this.tableData[i].list[2].DNANum +this.tableData[i].list[3].DNANum +this.tableData[i].list[4].DNANum
        //       obj.DNAFeedbackNum = this.tableData[i].list[2].DNAFeedbackNum +this.tableData[i].list[3].DNAFeedbackNum +this.tableData[i].list[4].DNAFeedbackNum
        //       obj.FitNum = this.tableData[i].list[2].FitNum +this.tableData[i].list[3].FitNum +this.tableData[i].list[4].FitNum
        //       obj.FitResultReturnNum = this.tableData[i].list[2].FitResultReturnNum +this.tableData[i].list[3].FitResultReturnNum +this.tableData[i].list[4].FitResultReturnNum
        //       obj.FitPositiveNum = this.tableData[i].list[2].FitPositiveNum +this.tableData[i].list[3].FitPositiveNum +this.tableData[i].list[4].FitPositiveNum
        //       obj.FitNegativeNum = this.tableData[i].list[2].FitNegativeNum +this.tableData[i].list[3].FitNegativeNum +this.tableData[i].list[4].FitNegativeNum
        //       obj.FitInvalidNum = this.tableData[i].list[2].FitInvalidNum +this.tableData[i].list[3].FitInvalidNum +this.tableData[i].list[4].FitInvalidNum
        //       obj.FitResultNum = obj.FitPositiveNum+' / '+obj.FitNegativeNum+' / '+obj.FitInvalidNum
        //       obj.SearchOutNum = this.tableData[i].list[2].SearchOutNum +this.tableData[i].list[3].SearchOutNum +this.tableData[i].list[4].SearchOutNum
        //       this.tableData[i].list.splice(5,0,obj)
        //         for(let j = 0;j<this.tableData[i].list.length;j++){
        //           if(j == 0){
        //             this.tableData[i].list[j].group = 'A组'
        //           }else if(j==1){
        //             this.tableData[i].list[j].group = 'B组'
        //           }else if(j==2){
        //             this.tableData[i].list[j].group = 'C组高危'
        //           }else if(j==3){
        //             this.tableData[i].list[j].group = 'C组低危'
        //           }else if(j==4){
        //             this.tableData[i].list[j].group = 'C组未评估'
        //           }else if(j==6){
        //             this.tableData[i].list[j].group = '合计'
        //           }

        //         }
        //     }
        //     for(let i=0;i<this.tableData.length-1;i++){
        //       this.tableData[i].list[6].name = this.tableData[i].commdtName
        //       this.areaTableData.push(this.tableData[i].list[6]);
        //     }
        //     // 地区的合计
        //     let $groupsNum=0;
        //     let $bookingColonscopyNum=0;
        //     let $inspectColonscopyNum=0;
        //     let $DNANum=0;
        //     let $DNAFeedbackNum=0;
        //     let $FitNum=0;
        //     let $FitResultReturnNum=0;
        //     let $FitPositiveNum=0;
        //     let $FitNegativeNum=0;
        //     let $FitInvalidNum=0;
        //     let $FitResultNum=0;
        //     let $SearchOutNum=0;
        //     for(let i=0;i<this.areaTableData.length;i++){
        //       $groupsNum += this.areaTableData[i].groupsNum
        //       $bookingColonscopyNum += this.areaTableData[i].bookingColonscopyNum
        //       $inspectColonscopyNum += this.areaTableData[i].inspectColonscopyNum
        //       $DNANum += this.areaTableData[i].DNANum
        //       $DNAFeedbackNum += this.areaTableData[i].DNAFeedbackNum
        //       $FitNum += this.areaTableData[i].FitNum
        //       $FitResultReturnNum += this.areaTableData[i].FitResultReturnNum
        //       $FitPositiveNum += this.areaTableData[i].FitPositiveNum
        //       $FitNegativeNum += this.areaTableData[i].FitNegativeNum
        //       $FitInvalidNum += this.areaTableData[i].FitInvalidNum
        //       $FitResultNum += this.areaTableData[i].FitResultNum
        //       $SearchOutNum += this.areaTableData[i].SearchOutNum
              
        //     }
        //     let sumobj={
        //       name:'合计',
        //       groupsNum:$groupsNum,
        //       bookingColonscopyNum:$bookingColonscopyNum,
        //       inspectColonscopyNum:$inspectColonscopyNum,
        //       DNANum:$DNANum,
        //       DNAFeedbackNum:$DNAFeedbackNum,
        //       FitNum:$FitNum,
        //       FitResultReturnNum:$FitResultReturnNum,
        //       SearchOutNum:$SearchOutNum,
        //       FitPositiveNum:$FitPositiveNum,
        //       FitNegativeNum:$FitNegativeNum,
        //       FitInvalidNum:$FitInvalidNum,
        //       FitResultNum:$FitPositiveNum+' / '+$FitNegativeNum+' / '+$FitInvalidNum,
        //     }
        //     this.areaTableData.push(sumobj)
        // })

        // 随访任务量
        $axios_http({
          url:"/base/hospital/statistics/area/followTask",
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
        // 随访任务进度 
         $axios_http({
          url:"/base/hospital/statistics/area/followSchedule",
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
          url:"/base/hospital/statistics/area/fitSchedule",
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
          url:"/base/hospital/statistics/area/cjSchedule",
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
        // 病变检出
        $axios_http({
          url:"/base/hospital/person/notentry/riskfactors/lesionStatisticsByAreaId",
          data:{
            startDate:this.qc.startDate,
            endDate:this.qc.endDate,
          },
          vueObj:this
        }).then((res)=>{
           if(res.data.statusMsg == 'success'){
              res.data.data.filter(item=> {
              item.list[0].group="A组";
              item.list[1].group="B组";
              item.list[2].group="C组高危";
              item.list[3].group="C组低危";
              item.list[4].group="C组未评估";
              item.list[5].group="C组";
              item.list[6].group="合计";
              item.list[4] = item.list[5];
              item.list[5] = item.list[6]
              item.list.pop();
              })
              this.pathologytableData = res.data.data;
           }
        })
      },
      //重置检索条件
      reset(){
        Object.assign(this.$data.qc, this.$options.data().qc)
        this.query()
        this.ids = []
      },
      // 合并单元格
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex % 6 === 0) {
            return {
              rowspan: 6,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
      // 点击查询
      queryClick(){
        this.query();
      },
       handleClick(tab, event){
        //  console.log(tab, event);
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
  .community-item{
    margin-top:20px;
  }
</style>
<style>
  .content {
    background: #fff;
    padding: 10px;
  }
</style>
