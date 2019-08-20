<template>
    <div slot="right" class="content-page" v-if="home_followup_progress_page">
      <div class="filter-container" >
          <el-button size="mini" class="return-home" @click="$router.go(-1)">返 回</el-button>
      </div>
        <div class="content">
            <el-row>
                <div class="home-message-title">项目概况</div>
                <el-col :span="12">
                   <sanKeychart></sanKeychart>
                </el-col>
                <el-col :span="12">
                   <pieChart></pieChart>
                </el-col>
            </el-row>
              <el-row style="margin-top:20px">
                  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <div style="text-align:right">
                      <img src="../../assets/img/fullscreen.png" class="fullscreen-img" alt="" @click="fullscreen()"/>
                    </div>
                    <el-tab-pane label="A组" name="1">
                        <organizationChartA :option="option"></organizationChartA>
                    </el-tab-pane>
                    <el-tab-pane label="B组" name="2">
                       <organizationChartB :option="option"></organizationChartB>
                    </el-tab-pane>
                    <el-tab-pane label="C组高危" name="3">
                        <organizationChartC :option="option"></organizationChartC>
                    </el-tab-pane>
                    <el-tab-pane label="C组低危" name="4">
                       <organizationChartD :option="option"></organizationChartD>
                    </el-tab-pane>
                  </el-tabs>
               </el-row>
        </div>
    </div>
</template>
<script>
import sanKeychart from '../components/sankeyChart'   //桑葚图
import pieChart from '../components/pieChart'   //饼图
import organizationChartA from '../components/organizationChartA'
import organizationChartB from '../components/organizationChartB'
import organizationChartC from '../components/organizationChartC'
import organizationChartD from '../components/organizationChartD'
export default {
    components:{
      sanKeychart,
      pieChart,
      organizationChartA,
      organizationChartB,
      organizationChartC,
      organizationChartD
    },
    data(){
        return{
            home_followup_progress_page:false,
            btnAuth:{

            },
            activeName:'1',
            dataA:[
              ['肠镜组基线招募','T0结肠镜已完成'],
              ['肠镜组基线招募','T0结肠镜未完成'],
              ['T0结肠镜已完成','需要进行年度随访问卷调查'],
              ['需要进行年度随访问卷调查', '已邀请'],
              ['已邀请', '随访中'],
              ['已邀请', '随访成功'],
              ['已邀请', '失访'],
              ['T0结肠镜未完成','需要进行年度随访问卷调查1'],
              ['需要进行年度随访问卷调查1', '已邀请1'],
              ['已邀请1', '随访中1'],
              ['已邀请1', '随访成功1'],
              ['已邀请1', '失访1'],
            ],
            dataB:[
              ['FIT组基线招募','已完成FIT'],
              ['已完成FIT','FIT阳性'],
              ['FIT阳性','已完成结肠镜'],
              ['已完成结肠镜','需要进行年度随访问卷调查'],
              ['需要进行年度随访问卷调查','已邀请'],
              ['已邀请', '随访中'],
              ['已邀请', '随访成功'],
              ['已邀请', '失访'],
              ['FIT阳性','未完成结肠镜'],
              ['未完成结肠镜','需再次FIT检测'],
              ['需再次FIT检测','已邀请1'],
              ['已邀请1','失访1'],
              ['已邀请1','已发放FIT200'],
              ['已发放FIT200','FIT结果录入'],
              ['FIT结果录入','FIT阳性1'],
              ['FIT结果录入','FIT无效'],
              ['FIT结果录入','FIT无结果'],
              ['FIT阳性1','结肠镜接受检查'],
              ['结肠镜接受检查','结肠镜已预约'],
              ['结肠镜已预约','结肠镜已完成'],
              ['结肠镜已完成','随访成功1'],
              ['FIT结果录入','FIT阴性1'],
              ['FIT阴性1','随访成功1'],
              ['已完成FIT','FIT阴性'],
              ['FIT阴性','需再次FIT检测1'],
              ['需再次FIT检测1','已邀请2'],
              ['已邀请2','失访2'],
              ['已邀请2','已发放FIT2001'],
              ['已发放FIT2001','FIT结果录入1'],
              ['FIT结果录入1','FIT阳性2'],
              ['FIT结果录入1','FIT无效1'],
              ['FIT结果录入1','FIT无结果1'],
              ['FIT阳性2','结肠镜接受检查1'],
              ['结肠镜接受检查1','结肠镜已预约1'],
              ['结肠镜已预约1','结肠镜已完成1'],
              ['结肠镜已完成1','随访成功2'],
              ['FIT结果录入1','FIT阴性2'],
              ['FIT阴性2','随访成功2'],
              ['FIT组基线招募','未完成FIT'],
              ['未完成FIT','待完成FIT检测'],
              ['待完成FIT检测','已邀请3'],
              ['已邀请3','失访3'],
              ['已邀请3','已发放FIT2002'],
              ['已发放FIT2002','FIT结果录入2'],
              ['FIT结果录入2','FIT无效2'],
              ['FIT结果录入2','FIT无结果2'],
              ['FIT结果录入2','FIT阳性3'],
              ['FIT阳性3','结肠镜接受检查2'],
              ['结肠镜接受检查2','结肠镜已预约2'],
              ['结肠镜已预约2','结肠镜已完成2'],
              ['结肠镜已完成2','随访成功3'],
              ['FIT结果录入2','FIT阴性3'],
              ['FIT阴性3','随访成功3'],
            ],
            dataC:[
              ['风险评估高危人群基线招募','已完成结肠镜'],
              ['风险评估高危人群基线招募','未完成结肠镜'],
              ['已完成结肠镜','需要进行年度随访问卷调查'],
              ['需要进行年度随访问卷调查','已邀请'],
              ['已邀请', '随访中'],
              ['已邀请', '随访成功'],
              ['已邀请', '失访'],
              ['未完成结肠镜','需要进行结肠镜检查'],
              ['需要进行结肠镜检查','已邀请1'],
              ['已邀请1','结肠镜接受检查'],
              ['结肠镜接受检查','结肠镜已预约'],
              ['结肠镜已预约','随访成功1'],
              ['已邀请1','失访1'],
            ],
            dataD:[
              ['风险评估低危人群招募','已完成FIT'],
              ['已完成FIT','FIT阳性'],
              ['FIT阳性','已完成结肠镜'],
              ['已完成结肠镜','需要进行年度随访问卷调查'],
              ['需要进行年度随访问卷调查','已邀请'],
              ['已邀请', '随访中'],
              ['已邀请', '随访成功'],
              ['已邀请', '失访'],
              ['FIT阳性','未完成结肠镜'],
              ['未完成结肠镜','需再次FIT检测'],
              ['需再次FIT检测','已邀请1'],
              ['已邀请1','失访1'],
              ['已邀请1','已发放FIT200'],
              ['已发放FIT200','FIT结果录入'],
              ['FIT结果录入','FIT阳性1'],
              ['FIT结果录入','FIT无效'],
              ['FIT结果录入','FIT无结果'],
              ['FIT阳性1','结肠镜接受检查'],
              ['结肠镜接受检查','结肠镜已预约'],
              ['结肠镜已预约','结肠镜已完成'],
              ['结肠镜已完成','随访成功1'],
              ['FIT结果录入','FIT阴性1'],
              ['FIT阴性1','随访成功1'],
              ['已完成FIT','FIT阴性'],
              ['FIT阴性','需再次FIT检测1'],
              ['需再次FIT检测1','已邀请2'],
              ['已邀请2','失访2'],
              ['已邀请2','已发放FIT2001'],
              ['已发放FIT2001','FIT结果录入1'],
              ['FIT结果录入1','FIT阳性2'],
              ['FIT结果录入1','FIT无效1'],
              ['FIT结果录入1','FIT无结果1'],
              ['FIT阳性2','结肠镜接受检查1'],
              ['结肠镜接受检查1','结肠镜已预约1'],
              ['结肠镜已预约1','结肠镜已完成1'],
              ['结肠镜已完成1','随访成功2'],
              ['FIT结果录入1','FIT阴性2'],
              ['FIT阴性2','随访成功2'],
              ['风险评估低危人群招募','未完成FIT'],
              ['未完成FIT','待完成FIT检测'],
              ['待完成FIT检测','已邀请3'],
              ['已邀请3','失访3'],
              ['已邀请3','已发放FIT2002'],
              ['已发放FIT2002','FIT结果录入2'],
              ['FIT结果录入2','FIT无效2'],
              ['FIT结果录入2','FIT无结果2'],
              ['FIT结果录入2','FIT阳性3'],
              ['FIT阳性3','结肠镜接受检查2'],
              ['结肠镜接受检查2','结肠镜已预约2'],
              ['结肠镜已预约2','结肠镜已完成2'],
              ['结肠镜已完成2','随访成功3'],
              ['FIT结果录入2','FIT阴性3'],
              ['FIT阴性3','随访成功3'],
            ],
            option:{},
        }
    },
    mounted() {
         let obj = this.checkPageAuth(this,"home_followup_progress_page",this.btnAuth);
         this.getDataA()
    },
    methods: {
      getDataA(){
          $axios_http({
            url:"/base/hospital/statistics/area/groupProjectAnalysis",
            data:{
              group:"A"
            },
            vueObj:this
          }).then((res)=>{
            if(res.data.statusMsg == 'success'){
                let nodes = [
                  {
                    id: '肠镜组基线招募',
                    title: '',
                    name: '肠镜组基线招募',
                    description:res.data.data[0].data1,
                    borderRadius:'35',
                    height:'110',
                    color: '#223968',
                  },
                  {
                    id: 'T0结肠镜已完成',
                    title: '',
                    name: 'T0结肠镜已完成',
                    description:res.data.data[0].data2,
                    color: '#223968',
                  },
                  {
                     id: '需要进行年度随访问卷调查',
                     title: '',
                     name: '需要进行年度随访问卷调查',
                     description:res.data.data[0].data3,
                  },
                  {
                     id: '已邀请',
                     title: '',
                     name: '已邀请',
                     description:res.data.data[0].data4,
                  },
                   {
                     id: '随访中',
                     title: '',
                     name: '随访中',
                     description:res.data.data[0].data5,
                  },
                   {
                     id: '随访成功',
                     title: '',
                     name: '随访成功',
                     description:res.data.data[0].data6,
                     color:'#006400'
                  },
                   {
                     id: '失访',
                     title: '',
                     name: '失访',
                     description:res.data.data[0].data7,
                     color:'#B22222'
                  },
                  {
                    id: 'T0结肠镜未完成',
                    title: '',
                    name: 'T0结肠镜未完成',
                    description:res.data.data[0].data8,
                    color: '#223968',
                  },
                   {
                     id: '需要进行年度随访问卷调查1',
                     title: '',
                     name: '需要进行年度随访问卷调查',
                     description:res.data.data[0].data9,
                  },
                  {
                     id: '已邀请1',
                     title: '',
                     name: '已邀请',
                     description:res.data.data[0].data10,
                  },
                   {
                     id: '随访中1',
                     title: '',
                     name: '随访中',
                     description:res.data.data[0].data11,
                  },
                   {
                     id: '随访成功1',
                     title: '',
                     name: '随访成功',
                     description:res.data.data[0].data12,
                     color:'#006400'
                  },
                   {
                     id: '失访1',
                     title: '',
                     name: '失访',
                     description:res.data.data[0].data13,
                     color:'#B22222'
                  },
               ]
               this.option = {
                credits:{
                  enabled:false	
                },
                title: {
                  text: ''
                },
                chart: {
                  height: 600,
                  inverted: false //控制横向纵向
                },
                series: [
                {
                  type: 'organization',
                  name: '',
                  keys: ['from', 'to'],
                  data:this.dataA,
                  levels: [
                  {
                    level: 0,
                    color: '#223968',
                    dataLabels: {
                      color: '#ffffff',
                    },
                  }],
                  nodes: nodes,
                  colorByPoint: false,
                  color: '#0270C1',
                  dataLabels: { 
                    color: '#ffffff',
                  },
                  borderColor: '#ffffff',
                  nodeWidth: 100
                }],
                tooltip: {
                  outside: true,
                  style:{
                    fontSize:'18px'
                  },
                  // formatter:function(){
                    // console.log(this)
                    // }
                },
                exporting: {
                    enabled:false
                }
               }
            }
          })
      },
      getDataB(){
         $axios_http({
            url:"/base/hospital/statistics/area/groupProjectAnalysis",
            data:{
              group:"B"
            },
            vueObj:this
          }).then((res)=>{
            if(res.data.statusMsg == 'success'){
              let nodes = [
                  {
                    id:'FIT组基线招募',
                    title: '',
                    name: 'FIT组基线招募',
                    description:res.data.data[0].data1,
                    height:'120',
                    borderRadius:'35'
                  },
                  {
                    id:'已完成FIT',
                    title: '',
                    name: '已完成FIT',
                    description:res.data.data[0].data2,
                    color: '#223968',
                    height:'80',
                    offset:-150
                  },
                  {
                    id:'FIT阳性',
                    title: '',
                    name: 'FIT阳性',
                    description:res.data.data[0].data3,
                    color: '#223968',
                    height:'80',
                    offset:-300
                  },
                  {
                    id:'已完成结肠镜',
                    title: '',
                    name: '已完成结肠镜',
                    description:res.data.data[0].data4,
                    color: '#223968',
                    height:'80',
                    offset:-397
                  },
                  {
                    id:'需要进行年度随访问卷调查',
                    title:'',
                    name:'需要进行年度随访问卷调查',
                    description:res.data.data[0].data5,
                    height:'80',
                    offset:-298
                  },
                   {
                    id:'已邀请',
                    title: '',
                    name: '已邀请',
                    description:res.data.data[0].data6,
                    height:'80',
                    offset:-298
                  },
                  {
                    id:'随访中',
                    title: '',
                    name: '随访中',
                    description:res.data.data[0].data7,
                    height:'80',
                    offset:100
                  },
                   {
                    id:'随访成功',
                    title: '',
                    name: '随访成功',
                    description:res.data.data[0].data8,
                    height:'80',
                    color:'#006400'
                  },
                   {
                    id:'失访',
                    title: '',
                    name: '失访',
                    description:res.data.data[0].data9,
                    height:'80',
                    color:'#B22222',
                    offset:-100
                  },
                  {
                    id:'未完成结肠镜',
                    title: '',
                    name: '未完成结肠镜',
                    description:res.data.data[0].data10,
                    height:'80',
                    color: '#223968',
                    offset:-250
                  },
                  {
                      id:'需再次FIT检测',
                      title: '',
                      name: '需再次FIT检测',
                      description:res.data.data[0].data11,
                      height:'80',
                      offset:-150
                  },
                  {
                      id:'已邀请1',
                      title: '',
                      name: '已邀请',
                      description:res.data.data[0].data12,
                      height:'80',
                      offset:-150
                  },
                  {
                     id:'失访1',
                     title: '',
                     name: '失访',
                     description:res.data.data[0].data13,
                     height:'80',
                     color:'#B22222',
                     offset:-150
                  },
                  {
                     id:'已发放FIT200',
                     title: '',
                     name: '已发放FIT',
                     description:res.data.data[0].data14,
                     height:'80',
                     offset:-150
                  },
                  {
                     id:'FIT结果录入',
                     title: '',
                     name: 'FIT结果录入',
                     description:res.data.data[0].data15,
                     height:'80',
                     offset:247
                  },
                  {
                     id:'FIT阳性1',
                     title: '',
                     name: 'FIT阳性',
                     description:res.data.data[0].data16,
                     height:'80',
                     offset:147
                  },
                  {
                    id:'结肠镜接受检查',
                    title: '',
                    name: '结肠镜接受检查',
                    description:res.data.data[0].data17,
                    height:'80',
                    offset:-150
                  },
                  {
                    id:'结肠镜已预约',
                    title: '',
                    name: '结肠镜已预约',
                    description:res.data.data[0].data18,
                    height:'80',
                     offset:-150
                  },
                  {
                    id:'结肠镜已完成',
                    title: '',
                    name: '结肠镜已完成',
                    description:res.data.data[0].data19,
                    height:'80',
                    offset:-250
                  },
                  {
                    id:'随访成功1',
                    title: '',
                    name: '随访成功',
                    description:res.data.data[0].data20,
                    height:'80',
                    color:'#006400',
                    offset:-349
                  },
                  {
                    id:'FIT阴性1',
                    title: '',
                    name: 'FIT阴性',
                    description:res.data.data[0].data21,
                    height:'80',
                    offset:-348
                  },
                  {
                    id:'FIT无效',
                    title: '',
                    name: 'FIT无效',
                    description:res.data.data[0].data22,
                    height:'80',
                    offset:150
                  },
                  {
                    id:'FIT无结果',
                    title: '',
                    name: 'FIT无结果',
                    description:res.data.data[0].data23,
                    height:'80',
                    offset:50
                  },
                  {
                    id:'FIT阴性',
                    title: '',
                    name: 'FIT阴性',
                    description:res.data.data[0].data24,
                    height:'80',
                    color: '#223968',
                    offset:150
                  },
                  {
                    id:'需再次FIT检测1',
                    title: '',
                    name: '需再次FIT检测',
                    description:res.data.data[0].data25,
                    height:'80',
                    offset:50
                  },
                  {
                     id:'已邀请2',
                     title: '',
                     name: '已邀请',
                     description:res.data.data[0].data26,
                     height:'80',
                     offset:150
                  },
                  {
                    id:'失访2',
                    title: '',
                    name: '失访',
                    description:res.data.data[0].data27,
                    height:'80',
                    color:'#B22222',
                    offset:50
                  },
                  {
                    id:'已发放FIT2001',
                    title: '',
                    name: '已发放FIT',
                    description:res.data.data[0].data28,
                    height:'80',
                    offset:30
                  },
                  {
                    id:'FIT结果录入1',
                    title: '',
                    name: 'FIT结果录入',
                    description:res.data.data[0].data29,
                    height:'80',
                    offset:130
                  },
                  {
                    id:'FIT阳性2',
                    title: '',
                    name: 'FIT阳性',
                    description:res.data.data[0].data30,
                    height:'80',
                    offset:430
                  },
                  {
                    id:'结肠镜接受检查1',
                    title: '',
                    name: '结肠镜接受检查',
                    description:res.data.data[0].data31,
                    height:'80',
                    offset:-165
                  },
                  {
                    id:'结肠镜已预约1',
                    title: '',
                    name: '结肠镜已预约',
                    description:res.data.data[0].data32,
                    height:'80',
                    offset:132
                  },
                  {
                    id:'结肠镜已完成1',
                    title: '',
                    name: '结肠镜已完成',
                    description:res.data.data[0].data33,
                    height:'80',
                    offset:132
                  },
                  {
                    id:'随访成功2',
                    title: '',
                    name: '随访成功',
                    description:res.data.data[0].data34,
                    height:'80',
                    color:'#006400',
                    offset:32
                  },
                  {
                    id:'FIT阴性2',
                    title: '',
                    name: 'FIT阴性',
                    description:res.data.data[0].data35,
                    height:'80',
                  },
                  {
                    id:'FIT无效1',
                    title: '',
                    name: 'FIT无效',
                    description:res.data.data[0].data36,
                    height:'80',
                  },
                  {
                    id:'FIT无结果1',
                    title: '',
                    name: 'FIT无结果',
                    description:res.data.data[0].data37,
                    height:'80',
                    offset:-80
                  },
                  {
                    id:'未完成FIT',
                    title: '',
                    name: '未完成FIT',
                    description:res.data.data[0].data38,
                    height:'80',
                    color: '#223968',
                    offset:400
                  },
                  {
                    id:'待完成FIT检测',
                    title: '',
                    name: '待完成FIT检测',
                    description:res.data.data[0].data39,
                    height:'80',
                    color: '#223968',
                    offset:300
                  },
                  {
                    id:'已邀请3',
                    title: '',
                    name: '已邀请',
                    description:res.data.data[0].data40,
                    height:'80',
                    offset:200
                  },
                  {
                    id:'失访3',
                    title: '',
                    name: '失访',
                    description:res.data.data[0].data41,
                    height:'80',
                    color:'#B22222',
                    offset:200
                  },
                  {
                    id:'已发放FIT2002',
                    title: '',
                    name: '已发放FIT',
                    description:res.data.data[0].data42,
                    height:'80',
                    offset:200
                  },
                  {
                    id:'FIT结果录入2',
                    title: '',
                    name: 'FIT结果录入',
                    description:res.data.data[0].data43,
                    height:'80',
                    offset:200
                  },
                  {
                    id:'FIT阳性3',
                    title: '',
                    name: 'FIT阳性',
                    description:res.data.data[0].data44,
                    height:'80',
                  },
                   {
                    id:'FIT阴性3',
                    title: '',
                    name: 'FIT阴性',
                    description:res.data.data[0].data49,
                    height:'80',
                  },
                  {
                    id:'FIT无效2',
                    title: '',
                    name: 'FIT无效',
                    description:res.data.data[0].data50,
                    height:'80',
                    offset:100
                  },
                  {
                    id:'FIT无结果2',
                    title: '',
                    name: 'FIT无结果',
                    description:res.data.data[0].data51,
                    height:'80',
                    offset:50
                  },
                  {
                    id:'结肠镜接受检查2',
                    title: '',
                    name: '结肠镜接受检查',
                    description:res.data.data[0].data45,
                    height:'80',
                    offset:198
                  },
                  {
                    id:'结肠镜已预约2',
                    title: '',
                    name: '结肠镜已预约',
                    description:res.data.data[0].data46,
                    height:'80',
                    offset:198
                  },
                  {
                    id:'结肠镜已完成2',
                    title: '',
                    name: '结肠镜已完成',
                    description:res.data.data[0].data47,
                    height:'80',
                    offset:496
                  },
                  {
                    id:'随访成功3',
                    title: '',
                    name: '随访成功',
                    description:res.data.data[0].data48,
                    height:'80',
                    color:'#006400',
                    offset:496
                  }
              ]
              this.option = {
                credits:{
                  enabled:false	
                },
                title: {
                  text: ''
                },
                chart: {
                  height: 2000,
                  inverted: false //控制横向纵向
                },
                series: [
                {
                  type: 'organization',
                  name: '',
                  keys: ['from', 'to'],
                  data:this.dataB,
                  levels: [
                  {
                    level: 0,
                    color: '#223968',
                    dataLabels: {
                      color: '#ffffff',
                    },
                  }
                  ],
                  nodes:nodes,
                  colorByPoint: false,
                  color: '#0270C1',
                  dataLabels: {
                    color: '#ffffff',
                  },
                  borderColor: '#ffffff',
                  nodeWidth: 90
                }],
                tooltip: {
                  outside: true,
                  style:{
                    fontSize:'18px'
                  },
                   // formatter:function(){
                    // console.log(this)
                    // }
                },
                exporting: {
                    enabled:false
                }
               }
             }
          })
      },
      getDataCG(){
         $axios_http({
            url:"/base/hospital/statistics/area/groupProjectAnalysis",
            data:{
              group:"Cg"
            },
            vueObj:this
          }).then((res)=>{
            if(res.data.statusMsg == 'success'){
                 let nodes = [
                    {
                    id: '风险评估高危人群基线招募',
                    title: '',
                    name: '风险评估高危人群基线招募',
                    description:res.data.data[0].data1,
                    borderRadius:'35',
                    color: '#223968',
                  },
                  {
                    id:'已完成结肠镜',
                    title: '',
                    name: '已完成结肠镜',
                    description:res.data.data[0].data2,
                    color: '#223968',
                  },
                  {
                    id:'需要进行年度随访问卷调查',
                    title: '',
                    name: '需要进行年度随访问卷调查',
                    description:res.data.data[0].data3,
                  },
                  {
                    id:'已邀请',
                    title: '',
                    name: '已邀请',
                    description:res.data.data[0].data4,
                  },
                   {
                     id: '随访中',
                     title: '',
                     name: '随访中',
                     description:res.data.data[0].data5,
                  },
                   {
                     id: '随访成功',
                     title: '',
                     name: '随访成功',
                     description:res.data.data[0].data6,
                     color:'#006400'
                  },
                   {
                     id: '失访',
                     title: '',
                     name: '失访',
                     description:res.data.data[0].data7,
                     color:'#B22222'
                  },
                  {
                    id:'未完成结肠镜',
                    title: '',
                    name: '未完成结肠镜',
                    description:res.data.data[0].data8,
                    color: '#223968',
                  },
                  {
                    id:'需要进行结肠镜检查',
                    title: '',
                    name: '需要进行结肠镜检查',
                    description:res.data.data[0].data9,
                  },
                  {
                    id:'已邀请1',
                    title: '',
                    name: '已邀请',
                    description:res.data.data[0].data10,
                  },
                  {
                     id: '失访1',
                     title: '',
                     name: '失访',
                     description:res.data.data[0].data11,
                     color:'#B22222'
                  },
                  {
                    id:'结肠镜接受检查',
                    title: '',
                    name: '结肠镜接受检查',
                    description:res.data.data[0].data12,
                    // layout: 'hanging'
                  },
                  {
                    id:'结肠镜已预约',
                    title: '',
                    name: '结肠镜已预约',
                    description:res.data.data[0].data13,
                    offset:116
                    // layout: 'hanging'
                  },
                   {
                     id: '随访成功1',
                     title: '',
                     name: '随访成功',
                     description:res.data.data[0].data14,
                     color:'#006400',
                     offset:116
                  },
                 ]
                this.option = {
                credits:{
                  enabled:false	
                },
                title: {
                  text: ''
                },
                chart: {
                  height:600,
                  inverted: false //控制横向纵向
                },
                series: [
                {
                  type: 'organization',
                  name: '',
                  keys: ['from', 'to'],
                  data:this.dataC,
                  levels: [
                  {
                    level: 0,
                    color: '#223968',
                    dataLabels: {
                      color: '#ffffff',
                    },
                   }
                  ],
                  nodes:nodes,
                  colorByPoint: false,
                  color: '#0270C1',
                  dataLabels: {
                    color: '#ffffff',
                  },
                  borderColor: '#ffffff',
                  nodeWidth: 100
                }],
                tooltip: {
                  outside: true,
                  style:{
                    fontSize:'18px'
                  },
                   // formatter:function(){
                    // console.log(this)
                    // }
                },
                exporting: {
                    enabled:false
                }
               }
             }
          })
      },
      getDataCD(){
         $axios_http({
            url:"/base/hospital/statistics/area/groupProjectAnalysis",
            data:{
              group:"Cd"
            },
            vueObj:this
          }).then((res)=>{
            if(res.data.statusMsg == 'success'){
                  let nodes = [
                  {
                    id:'风险评估低危人群招募',
                    title: '',
                    name: '风险评估低危人群招募',
                    description:res.data.data[0].data1,
                    height:'120',
                    borderRadius:'35'
                  },
                  {
                    id:'已完成FIT',
                    title: '',
                    name: '已完成FIT',
                    description:res.data.data[0].data2,
                    color: '#223968',
                    height:'80',
                    offset:-150
                  },
                  {
                    id:'FIT阳性',
                    title: '',
                    name: 'FIT阳性',
                    description:res.data.data[0].data3,
                    color: '#223968',
                    height:'80',
                    offset:-300
                  },
                  {
                    id:'已完成结肠镜',
                    title: '',
                    name: '已完成结肠镜',
                    description:res.data.data[0].data4,
                    color: '#223968',
                    height:'80',
                    offset:-397
                  },
                  {
                    id:'需要进行年度随访问卷调查',
                    title:'',
                    name:'需要进行年度随访问卷调查',
                    description:res.data.data[0].data5,
                    height:'80',
                    offset:-298
                  },
                   {
                    id:'已邀请',
                    title: '',
                    name: '已邀请',
                    description:res.data.data[0].data6,
                    height:'80',
                    offset:-298
                  },
                  {
                    id:'随访中',
                    title: '',
                    name: '随访中',
                    description:res.data.data[0].data7,
                    height:'80',
                    offset:100
                  },
                   {
                    id:'随访成功',
                    title: '',
                    name: '随访成功',
                    description:res.data.data[0].data8,
                    height:'80',
                    color:'#006400'
                  },
                   {
                    id:'失访',
                    title: '',
                    name: '失访',
                    description:res.data.data[0].data9,
                    height:'80',
                    color:'#B22222',
                    offset:-100
                  },
                  {
                    id:'未完成结肠镜',
                    title: '',
                    name: '未完成结肠镜',
                    description:res.data.data[0].data10,
                    height:'80',
                    color: '#223968',
                    offset:-250
                  },
                  {
                      id:'需再次FIT检测',
                      title: '',
                      name: '需再次FIT检测',
                      description:res.data.data[0].data11,
                      height:'80',
                      offset:-150
                  },
                  {
                      id:'已邀请1',
                      title: '',
                      name: '已邀请',
                      description:res.data.data[0].data12,
                      height:'80',
                      offset:-150
                  },
                  {
                     id:'失访1',
                     title: '',
                     name: '失访',
                     description:res.data.data[0].data13,
                     height:'80',
                     color:'#B22222',
                     offset:-150
                  },
                  {
                     id:'已发放FIT200',
                     title: '',
                     name: '已发放FIT',
                     description:res.data.data[0].data14,
                     height:'80',
                     offset:-150
                  },
                  {
                     id:'FIT结果录入',
                     title: '',
                     name: 'FIT结果录入',
                     description:res.data.data[0].data15,
                     height:'80',
                     offset:247
                  },
                  {
                     id:'FIT阳性1',
                     title: '',
                     name: 'FIT阳性',
                     description:res.data.data[0].data16,
                     height:'80',
                     offset:147
                  },
                  {
                    id:'结肠镜接受检查',
                    title: '',
                    name: '结肠镜接受检查',
                    description:res.data.data[0].data17,
                    height:'80',
                    offset:-150
                  },
                  {
                    id:'结肠镜已预约',
                    title: '',
                    name: '结肠镜已预约',
                    description:res.data.data[0].data18,
                    height:'80',
                     offset:-150
                  },
                  {
                    id:'结肠镜已完成',
                    title: '',
                    name: '结肠镜已完成',
                    description:res.data.data[0].data19,
                    height:'80',
                    offset:-250
                  },
                  {
                    id:'随访成功1',
                    title: '',
                    name: '随访成功',
                    description:res.data.data[0].data20,
                    height:'80',
                    color:'#006400',
                    offset:-349
                  },
                  {
                    id:'FIT阴性1',
                    title: '',
                    name: 'FIT阴性',
                    description:res.data.data[0].data21,
                    height:'80',
                    offset:-348
                  },
                  {
                    id:'FIT无效',
                    title: '',
                    name: 'FIT无效',
                    description:res.data.data[0].data22,
                    height:'80',
                    offset:150
                  },
                  {
                    id:'FIT无结果',
                    title: '',
                    name: 'FIT无结果',
                    description:res.data.data[0].data23,
                    height:'80',
                    offset:50
                  },
                  {
                    id:'FIT阴性',
                    title: '',
                    name: 'FIT阴性',
                    description:res.data.data[0].data24,
                    height:'80',
                    color: '#223968',
                    offset:150
                  },
                  {
                    id:'需再次FIT检测1',
                    title: '',
                    name: '需再次FIT检测',
                    description:res.data.data[0].data25,
                    height:'80',
                    offset:50
                  },
                  {
                     id:'已邀请2',
                     title: '',
                     name: '已邀请',
                     description:res.data.data[0].data26,
                     height:'80',
                     offset:150
                  },
                  {
                    id:'失访2',
                    title: '',
                    name: '失访',
                    description:res.data.data[0].data27,
                    height:'80',
                    color:'#B22222',
                    offset:50
                  },
                  {
                    id:'已发放FIT2001',
                    title: '',
                    name: '已发放FIT',
                    description:res.data.data[0].data28,
                    height:'80',
                    offset:30
                  },
                  {
                    id:'FIT结果录入1',
                    title: '',
                    name: 'FIT结果录入',
                    description:res.data.data[0].data29,
                    height:'80',
                    offset:130
                  },
                  {
                    id:'FIT阳性2',
                    title: '',
                    name: 'FIT阳性',
                    description:res.data.data[0].data30,
                    height:'80',
                    offset:430
                  },
                  {
                    id:'结肠镜接受检查1',
                    title: '',
                    name: '结肠镜接受检查',
                    description:res.data.data[0].data31,
                    height:'80',
                    offset:-165
                  },
                  {
                    id:'结肠镜已预约1',
                    title: '',
                    name: '结肠镜已预约',
                    description:res.data.data[0].data32,
                    height:'80',
                    offset:132
                  },
                  {
                    id:'结肠镜已完成1',
                    title: '',
                    name: '结肠镜已完成',
                    description:res.data.data[0].data33,
                    height:'80',
                    offset:132
                  },
                  {
                    id:'随访成功2',
                    title: '',
                    name: '随访成功',
                    description:res.data.data[0].data34,
                    height:'80',
                    color:'#006400',
                    offset:32
                  },
                  {
                    id:'FIT阴性2',
                    title: '',
                    name: 'FIT阴性',
                    description:res.data.data[0].data35,
                    height:'80',
                  },
                  {
                    id:'FIT无效1',
                    title: '',
                    name: 'FIT无效',
                    description:res.data.data[0].data36,
                    height:'80',
                  },
                  {
                    id:'FIT无结果1',
                    title: '',
                    name: 'FIT无结果',
                    description:res.data.data[0].data37,
                    height:'80',
                    offset:-80
                  },
                  {
                    id:'未完成FIT',
                    title: '',
                    name: '未完成FIT',
                    description:res.data.data[0].data38,
                    height:'80',
                    color: '#223968',
                    offset:400
                  },
                  {
                    id:'待完成FIT检测',
                    title: '',
                    name: '待完成FIT检测',
                    description:res.data.data[0].data39,
                    height:'80',
                    color: '#223968',
                    offset:300
                  },
                  {
                    id:'已邀请3',
                    title: '',
                    name: '已邀请',
                    description:res.data.data[0].data40,
                    height:'80',
                    offset:200
                  },
                  {
                    id:'失访3',
                    title: '',
                    name: '失访',
                    description:res.data.data[0].data41,
                    height:'80',
                    color:'#B22222',
                    offset:200
                  },
                  {
                    id:'已发放FIT2002',
                    title: '',
                    name: '已发放FIT',
                    description:res.data.data[0].data42,
                    height:'80',
                    offset:200
                  },
                  {
                    id:'FIT结果录入2',
                    title: '',
                    name: 'FIT结果录入',
                    description:res.data.data[0].data43,
                    height:'80',
                    offset:200
                  },
                  {
                    id:'FIT阳性3',
                    title: '',
                    name: 'FIT阳性',
                    description:res.data.data[0].data44,
                    height:'80',
                  },
                   {
                    id:'FIT阴性3',
                    title: '',
                    name: 'FIT阴性',
                    description:res.data.data[0].data49,
                    height:'80',
                  },
                  {
                    id:'FIT无效2',
                    title: '',
                    name: 'FIT无效',
                    description:res.data.data[0].data50,
                    height:'80',
                    offset:100
                  },
                  {
                    id:'FIT无结果2',
                    title: '',
                    name: 'FIT无结果',
                    description:res.data.data[0].data51,
                    height:'80',
                    offset:50
                  },
                  {
                    id:'结肠镜接受检查2',
                    title: '',
                    name: '结肠镜接受检查',
                    description:res.data.data[0].data45,
                    height:'80',
                    offset:198
                  },
                  {
                    id:'结肠镜已预约2',
                    title: '',
                    name: '结肠镜已预约',
                    description:res.data.data[0].data46,
                    height:'80',
                    offset:198
                  },
                  {
                    id:'结肠镜已完成2',
                    title: '',
                    name: '结肠镜已完成',
                    description:res.data.data[0].data47,
                    height:'80',
                    offset:496
                  },
                  {
                    id:'随访成功3',
                    title: '',
                    name: '随访成功',
                    description:res.data.data[0].data48,
                    height:'80',
                    color:'#006400',
                    offset:496
                  }
              ]
              this.option = {
                credits:{
                  enabled:false	
                },
                title: {
                  text: ''
                },
                chart: {
                  height:2000,
                  inverted: false //控制横向纵向
                },
                series: [
                {
                  type: 'organization',
                  name: '',
                  keys: ['from', 'to'],
                  data:this.dataD,
                  levels: [
                  {
                    level: 0,
                    color: '#223968',
                    dataLabels: {
                      color: '#ffffff',
                    },
                   }
                  ],
                  nodes:nodes,
                  colorByPoint: false,
                  color: '#0270C1',
                  dataLabels: {
                    color: '#ffffff',
                  },
                  borderColor: '#ffffff',
                  nodeWidth: 100
                }],
                tooltip: {
                  outside: true,
                  style:{
                    fontSize:'18px'
                  },
                   // formatter:function(){
                    // console.log(this)
                    // }
                },
                exporting: {
                    enabled:false
                }
               }
             }
          })
      },
      handleClick(){
          if(this.activeName == '2'){
              this.getDataB();
          }else if(this.activeName == '3'){
              this.getDataCG();
          }else if(this.activeName == '4'){
              this.getDataCD();
          }else if(this.activeName == '1'){
            this.getDataA()
          }
      },
      fullscreen(){
         localStorage.setItem('option',JSON.stringify(this.option));
         this.$router.push('/fullscreen');
      }
    },
}
</script>
<style scoped>
  .content{
    background: #fff;
    padding:10px;
  }
.home-message-title{
    height: 25px;
    line-height: 25px;
    font-size: 14px;
    color:#B3B3BB;
  }
  .return-home{
    margin-left:14px;
  }
  .fullscreen-img{
    width: 25px;
    height: 25px;
    cursor: pointer;
  }
</style>


