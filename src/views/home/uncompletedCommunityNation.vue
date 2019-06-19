<template>
  <div slot="right" class="content-page" v-if="uncompletedCommunityNation_page">
    <router-link to="/home/countryHome">
      <el-button size="mini" class="return-home" >返 回</el-button>
    </router-link>
     <h4 style="margin:15px 0;">社区待办查看</h4>
    <div style="color:#B3B3BB;">当前待办</div>
    <el-table
      :data="queryResult.current"
      border
      :default-sort = "{prop: 'commityName', order: 'descending'}"
      style="width: 100%;margin-top: 20px;">
      <el-table-column
        type="index"
        align="center"
        sortable
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        prop="areaName"
        label="地区"
        sortable
        width="200"
       >
      </el-table-column>
        <el-table-column
        prop="noInvitation"
        sortable
        label="未邀请随访"
       >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'未邀请随访', areaId:scope.row.areaId,type:'b9'}}" v-if="scope.row.list[0].noInvitation>0">
          <span style="color: blue;">{{scope.row.list[0].noInvitation}}</span>
        </router-link>
          <span v-else>0</span>
           </template>
      </el-table-column>
       <el-table-column
        prop="noStoolSample"
        sortable
        label="待录入粪便编码（新）"
       >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'待录入粪便编码（新）', areaId:scope.row.areaId,type:'b10'}}" v-if="scope.row.list[0].noStoolSample>0">
          <span style="color: blue;">{{scope.row.list[0].noStoolSample}}</span>
        </router-link>
          <span v-else>0</span>
           </template>
      </el-table-column>
       <el-table-column
        prop="noYearUpdate"
        sortable
        label="待录入A3"
       >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'待录入A3', areaId:scope.row.areaId,type:'b11'}}" v-if="scope.row.list[0].noYearUpdate>0">
          <span style="color: blue;">{{scope.row.list[0].noYearUpdate}}</span>
        </router-link>
          <span v-else>0</span>
           </template>
      </el-table-column>
       <el-table-column
        prop="noContact"
        sortable
        label="待录入E1"
       >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'待录入E1', areaId:scope.row.areaId,type:'b12'}}" v-if="scope.row.list[0].noContact>0">
          <span style="color: blue;">{{scope.row.list[0].noContact}}</span>
        </router-link>
          <span v-else>0</span>
           </template>
      </el-table-column>
      <!-- <el-table-column
        sortable
        label="未完成危险因素调查表"
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'未完成危险因素调查表', areaId:scope.row.areaId,type:'b1'}}" v-if="scope.row.list[0].riskFactors>0">
            <span style="color: blue;">{{scope.row.list[0].riskFactors}}</span>
          </router-link>
            <span v-else>0</span>
        </template>
      </el-table-column> -->
      <el-table-column
        sortable
        label="未录入FIT编号"
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'未录入FIT编号', areaId:scope.row.areaId,type:'b2'}}" v-if="scope.row.list[0].notEntryFITCode>0">
          <span style="color: blue;">{{scope.row.list[0].notEntryFITCode}}</span>
        </router-link>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column
        label="未录入FIT结果"
        sortable
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'未录入FIT结果', areaId:scope.row.areaId,type:'b3'}}" v-if="scope.row.list[0].notEntryFITResult>0">
          <span style="color: blue;">{{scope.row.list[0].notEntryFITResult}}</span>
        </router-link>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column
        label="未录入粪便DNA编号"
        sortable
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'未录入粪便DNA编号', areaId:scope.row.areaId,type:'b4'}}" v-if="scope.row.list[0].notStoolDnaCode>0">
          <span style="color: blue;">{{scope.row.list[0].notStoolDnaCode}}</span>
        </router-link>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column
        label="未预约结肠镜检查"
        sortable
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'未预约结肠镜检查', areaId:scope.row.areaId,type:'b5'}}" v-if="scope.row.list[0].notReserve>0">
          <span style="color: blue;">{{scope.row.list[0].notReserve}}</span>
        </router-link>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="list[0].notFinishExamination"
        label="未完成结肠镜检查"
        sortable
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'未完成结肠镜检查', areaId:scope.row.areaId,type:'b6'}}" v-if="scope.row.list[0].notFinishExamination>0">
          <span style="color: blue;">{{scope.row.list[0].notFinishExamination}}</span>
        </router-link>
          <span v-else>0</span>
        </template>
      </el-table-column> -->
      <el-table-column
        label="未发放筛查告知书"
        sortable
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'未通知筛查结果告知书', areaId:scope.row.areaId,type:'b7'}}" v-if="scope.row.list[0].notIssueNotification>0">
          <span style="color: blue;">{{scope.row.list[0].notIssueNotification}}</span>
        </router-link>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column
        label="未发放粪便DNA结果"
        sortable
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'未发放粪便DNA结果', areaId:scope.row.areaId,type:'b8'}}" v-if="scope.row.list[0].notStoolDNAput>0">
          <span style="color: blue;">{{scope.row.list[0].notStoolDNAput}}</span>
        </router-link>
          <span v-else>0</span>
        </template>
      </el-table-column>
    </el-table>
      <div style="margin:20px 0;color:#B3B3BB;">延期待办</div>
          <el-table
      :data="queryResult.delay"
      border
      :default-sort = "{prop: 'commityName', order: 'descending'}"
      style="width: 100%;margin-top: 20px;">
      <el-table-column
        type="index"
        align="center"
        sortable
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        prop="areaName"
        label="地区"
        sortable
        width="200"
       >
      </el-table-column>
        <el-table-column
        prop="noInvitation"
        sortable
        label="未邀请随访"
       >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'未邀请随访', areaId:scope.row.areaId,type:'b9',delayFlag:1}}" v-if="scope.row.list[0].noInvitation>0">
          <span style="color: blue;">{{scope.row.list[0].noInvitation}}</span>
        </router-link>
          <span v-else>0</span>
           </template>
      </el-table-column>
       <el-table-column
        prop="noStoolSample"
        sortable
        label="待录入粪便编码（新）"
       >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'待录入粪便编码（新）', areaId:scope.row.areaId,type:'b10',delayFlag:1}}" v-if="scope.row.list[0].noStoolSample>0">
          <span style="color: blue;">{{scope.row.list[0].noStoolSample}}</span>
        </router-link>
          <span v-else>0</span>
           </template>
      </el-table-column>
       <el-table-column
        prop="noYearUpdate"
        sortable
        label="待录入A3"
       >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'待录入A3', areaId:scope.row.areaId,type:'b11',delayFlag:1}}" v-if="scope.row.list[0].noYearUpdate>0">
          <span style="color: blue;">{{scope.row.list[0].noYearUpdate}}</span>
        </router-link>
          <span v-else>0</span>
           </template>
      </el-table-column>
       <el-table-column
        prop="noContact"
        sortable
        label="待录入E1"
       >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'待录入E1', areaId:scope.row.areaId,type:'b12',delayFlag:1}}" v-if="scope.row.list[0].noContact>0">
          <span style="color: blue;">{{scope.row.list[0].noContact}}</span>
        </router-link>
          <span v-else>0</span>
           </template>
      </el-table-column>
      <!-- <el-table-column
        sortable
        label="未完成危险因素调查表"
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'未完成危险因素调查表', areaId:scope.row.areaId,type:'b1'}}" v-if="scope.row.list[0].riskFactors>0">
            <span style="color: blue;">{{scope.row.list[0].riskFactors}}</span>
          </router-link>
            <span v-else>0</span>
        </template>
      </el-table-column> -->
      <el-table-column
        sortable
        label="未录入FIT编号"
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'未录入FIT编号', areaId:scope.row.areaId,type:'b2',delayFlag:1}}" v-if="scope.row.list[0].notEntryFITCode>0">
          <span style="color: blue;">{{scope.row.list[0].notEntryFITCode}}</span>
        </router-link>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column
        label="未录入FIT结果"
        sortable
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'未录入FIT结果', areaId:scope.row.areaId,type:'b3',delayFlag:1}}" v-if="scope.row.list[0].notEntryFITResult>0">
          <span style="color: blue;">{{scope.row.list[0].notEntryFITResult}}</span>
        </router-link>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column
        label="未录入粪便DNA编号"
        sortable
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'未录入粪便DNA编号', areaId:scope.row.areaId,type:'b4',delayFlag:1}}" v-if="scope.row.list[0].notStoolDnaCode>0">
          <span style="color: blue;">{{scope.row.list[0].notStoolDnaCode}}</span>
        </router-link>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column
        label="未预约结肠镜检查"
        sortable
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'未预约结肠镜检查', areaId:scope.row.areaId,type:'b5',delayFlag:1}}" v-if="scope.row.list[0].notReserve>0">
          <span style="color: blue;">{{scope.row.list[0].notReserve}}</span>
        </router-link>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="list[0].notFinishExamination"
        label="未完成结肠镜检查"
        sortable
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'未完成结肠镜检查', areaId:scope.row.areaId,type:'b6',delayFlag:1}}" v-if="scope.row.list[0].notFinishExamination>0">
          <span style="color: blue;">{{scope.row.list[0].notFinishExamination}}</span>
        </router-link>
          <span v-else>0</span>
        </template>
      </el-table-column> -->
      <el-table-column
        label="未发放筛查告知书"
        sortable
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'未通知筛查结果告知书', areaId:scope.row.areaId,type:'b7',delayFlag:1}}" v-if="scope.row.list[0].notIssueNotification>0">
          <span style="color: blue;">{{scope.row.list[0].notIssueNotification}}</span>
        </router-link>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column
        label="未发放粪便DNA结果"
        sortable
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'未发放粪便DNA结果', areaId:scope.row.areaId,type:'b8',delayFlag:1}}" v-if="scope.row.list[0].notStoolDNAput>0">
          <span style="color: blue;">{{scope.row.list[0].notStoolDNAput}}</span>
        </router-link>
          <span v-else>0</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'Right',
    data () {
      return {
        //权限判定
        uncompletedCommunityNation_page:false,
        btnAuth:{
        },
        //查询结果
        "queryResult":{
          "pageNo":1,//当前页
          "pageSize":10,//每页的条数
          "totalPageCount":0,
          "tableData":[],
          "current":[],
          "delay":[]
        },
        //分页
        "queryResultSource":{
          "pageNoSource":1,//当前页
          "pageSizeSource":15,//每页的条数
          "totalPageCount":0
        },
      }
    },
    mounted(){
      this.$store.commit('LOGOUT_USER');

      let obj = this.checkPageAuth(this,"uncompletedCommunityNation_page",this.btnAuth);
      this.query();
    },
    methods:{
      //查询
      query(){
        $axios_http({
          url:"/base/hospital/person/notentry/notfinishSumsByNationId",
          data:{
          },
          vueObj:this
        }).then((res)=>{
          // this.queryResult.tableData=res.data.data;
          this.queryResult.current = res.data.data.current;
          this.queryResult.delay = res.data.data.delay;
        })
      },
    }}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
