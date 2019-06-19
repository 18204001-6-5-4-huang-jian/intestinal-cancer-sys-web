<template>
  <div slot="right" class="content-page" v-if="uncompletedCommunity_page">
    <router-link to="/home/areaHome">
      <el-button size="mini" class="return-home">返 回</el-button>
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
        prop="commityName"
        label="所属区"
        width="80"
       >
      </el-table-column>
       <el-table-column
        prop="noInvitation"
        sortable
        label="未邀请随访"
       >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'未邀请随访', communityDeptId:scope.row.communityDeptId,type:'c10'}}" v-if="scope.row.noInvitation>0">
          <span style="color: blue;">{{scope.row.noInvitation}}</span>
        </router-link>
          <span v-else>0</span>
           </template>
      </el-table-column>
       <el-table-column
        prop="noStoolSample"
        sortable
        label="待录入粪便编码（新）"
       >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'待录入粪便编码（新）', communityDeptId:scope.row.communityDeptId,type:'c11'}}" v-if="scope.row.noStoolSample>0">
          <span style="color: blue;">{{scope.row.noStoolSample}}</span>
        </router-link>
          <span v-else>0</span>
           </template>
      </el-table-column>
       <el-table-column
        prop="noYearUpdate"
        sortable
        label="待录入A3"
       >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'待录入A3', communityDeptId:scope.row.communityDeptId,type:'c12'}}" v-if="scope.row.noYearUpdate>0">
          <span style="color: blue;">{{scope.row.noYearUpdate}}</span>
        </router-link>
          <span v-else>0</span>
           </template>
      </el-table-column>
       <el-table-column
        prop="noContact"
        sortable
        label="待录入E1"
       >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'待录入E1', communityDeptId:scope.row.communityDeptId,type:'c13'}}" v-if="scope.row.noContact>0">
          <span style="color: blue;">{{scope.row.noContact}}</span>
        </router-link>
          <span v-else>0</span>
           </template>
      </el-table-column>
      <!-- <el-table-column
        sortable
        label="未完成危险因素调查表"
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'未完成危险因素调查表', communityDeptId:scope.row.communityDeptId,type:'c1'}}" v-if="scope.row.notRiskFactors>0">
          <span style="color: blue;">{{scope.row.notRiskFactors}}</span>
        </router-link>
          <span v-else>0</span>
        </template>
      </el-table-column> -->
      <el-table-column
        sortable
        label="未录入FIT编号"
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'未录入FIT编号', communityDeptId:scope.row.communityDeptId,type:'c2'}}" v-if="scope.row.notFitcodes>0">
          <span style="color: blue;">{{scope.row.notFitcodes}}</span>
        </router-link>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column
        label="未录入FIT结果"
        sortable
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'未录入FIT结果', communityDeptId:scope.row.communityDeptId,type:'c3'}}" v-if="scope.row.notFitResult>0">
          <span style="color: blue;">{{scope.row.notFitResult}}</span>
        </router-link>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column
        label="未录入粪便DNA编码"
        sortable
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'未录入粪便DNA编号', communityDeptId:scope.row.communityDeptId,type:'c4'}}" v-if="scope.row.notStollDNA>0">
          <span style="color: blue;">{{scope.row.notStollDNA}}</span>
        </router-link>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column
        label="未预约结肠镜检查"
        sortable
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'未预约结肠镜检查', communityDeptId:scope.row.communityDeptId,type:'c5'}}" v-if="scope.row.notEntryallocations>0">
          <span style="color: blue;">{{scope.row.notEntryallocations}}</span>
        </router-link>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        label="未完成结肠镜检查"
        sortable
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'未完成结肠镜检查', communityDeptId:scope.row.communityDeptId,type:'c6'}}" v-if="scope.row.notFinishes>0">
          <span style="color: blue;">{{scope.row.notFinishes}}</span>
        </router-link>
          <span v-else>0</span>
        </template>
      </el-table-column> -->
      <el-table-column
        prop="notNotices"
        label="未发放筛查告知书"
        sortable
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'未通知筛查结果告知书', communityDeptId:scope.row.communityDeptId,type:'c7'}}" v-if="scope.row.notNotices>0">
          <span style="color: blue;">{{scope.row.notNotices}}</span>
        </router-link>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column
        label="未发放粪便DNA结果"
        sortable
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'未发放粪便DNA结果', communityDeptId:scope.row.communityDeptId,type:'c8'}}" v-if="scope.row.notDNAResults>0">
          <span style="color: blue;">{{scope.row.notDNAResults}}</span>
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
        prop="commityName"
        label="所属区"
        width="80"
       >
      </el-table-column>
       <el-table-column
        prop="noInvitation"
        sortable
        label="未邀请随访"
       >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'未邀请随访', communityDeptId:scope.row.communityDeptId,type:'c10',delayFlag:1}}" v-if="scope.row.noInvitation>0">
          <span style="color: blue;">{{scope.row.noInvitation}}</span>
        </router-link>
          <span v-else>0</span>
           </template>
      </el-table-column>
       <el-table-column
        prop="noStoolSample"
        sortable
        label="待录入粪便编码（新）"
       >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'待录入粪便编码（新）', communityDeptId:scope.row.communityDeptId,type:'c11',delayFlag:1}}" v-if="scope.row.noStoolSample>0">
          <span style="color: blue;">{{scope.row.noStoolSample}}</span>
        </router-link>
          <span v-else>0</span>
           </template>
      </el-table-column>
       <el-table-column
        prop="noYearUpdate"
        sortable
        label="待录入A3"
       >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'待录入A3', communityDeptId:scope.row.communityDeptId,type:'c12',delayFlag:1}}" v-if="scope.row.noYearUpdate>0">
          <span style="color: blue;">{{scope.row.noYearUpdate}}</span>
        </router-link>
          <span v-else>0</span>
           </template>
      </el-table-column>
       <el-table-column
        prop="noContact"
        sortable
        label="待录入E1"
       >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'待录入E1', communityDeptId:scope.row.communityDeptId,type:'c13',delayFlag:1}}" v-if="scope.row.noContact>0">
          <span style="color: blue;">{{scope.row.noContact}}</span>
        </router-link>
          <span v-else>0</span>
           </template>
      </el-table-column>
      <!-- <el-table-column
        sortable
        label="未完成危险因素调查表"
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'未完成危险因素调查表', communityDeptId:scope.row.communityDeptId,type:'c1'}}" v-if="scope.row.notRiskFactors>0">
          <span style="color: blue;">{{scope.row.notRiskFactors}}</span>
        </router-link>
          <span v-else>0</span>
        </template>
      </el-table-column> -->
      <el-table-column
        sortable
        label="未录入FIT编号"
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'未录入FIT编号', communityDeptId:scope.row.communityDeptId,type:'c2',delayFlag:1}}" v-if="scope.row.notFitcodes>0">
          <span style="color: blue;">{{scope.row.notFitcodes}}</span>
        </router-link>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column
        label="未录入FIT结果"
        sortable
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'未录入FIT结果', communityDeptId:scope.row.communityDeptId,type:'c3',delayFlag:1}}" v-if="scope.row.notFitResult>0">
          <span style="color: blue;">{{scope.row.notFitResult}}</span>
        </router-link>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column
        label="未录入粪便DNA编码"
        sortable
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'未录入粪便DNA编号', communityDeptId:scope.row.communityDeptId,type:'c4',delayFlag:1}}" v-if="scope.row.notStollDNA>0">
          <span style="color: blue;">{{scope.row.notStollDNA}}</span>
        </router-link>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column
        label="未预约结肠镜检查"
        sortable
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'未预约结肠镜检查', communityDeptId:scope.row.communityDeptId,type:'c5',delayFlag:1}}" v-if="scope.row.notEntryallocations>0">
          <span style="color: blue;">{{scope.row.notEntryallocations}}</span>
        </router-link>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        label="未完成结肠镜检查"
        sortable
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'未完成结肠镜检查', communityDeptId:scope.row.communityDeptId,type:'c6'}}" v-if="scope.row.notFinishes>0">
          <span style="color: blue;">{{scope.row.notFinishes}}</span>
        </router-link>
          <span v-else>0</span>
        </template>
      </el-table-column> -->
      <el-table-column
        prop="notNotices"
        label="未发放筛查告知书"
        sortable
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'未通知筛查结果告知书', communityDeptId:scope.row.communityDeptId,type:'c7',delayFlag:1}}" v-if="scope.row.notNotices>0">
          <span style="color: blue;">{{scope.row.notNotices}}</span>
        </router-link>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column
        label="未发放粪便DNA结果"
        sortable
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'未发放粪便DNA结果', communityDeptId:scope.row.communityDeptId,type:'c8',delayFlag:1}}" v-if="scope.row.notDNAResults>0">
          <span style="color: blue;">{{scope.row.notDNAResults}}</span>
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
        uncompletedCommunity_page:false,
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

      let obj = this.checkPageAuth(this,"uncompletedCommunity_page",this.btnAuth);
      this.query();
    },
    methods:{
      //查询
      query(){
        $axios_http({
          url:"/base/hospital/person/notentry/riskfactors/notRiskfactorsByAreaId",
          data:{
          },
          vueObj:this
        }).then((res)=>{
          this.queryResult.current=res.data.data.current;
          this.queryResult.delay=res.data.data.delay;
        })
      },
    }}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
