<template>
  <div slot="right" class="content-page" v-if="uncompletedArea_page">
    <router-link to="/home/countryHome">
      <el-button size="mini" class="return-home">返 回</el-button>
    </router-link>
    <h4 style="margin:15px 0;">地区待办查看</h4>
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
        width="250"
       >
      </el-table-column>
      <el-table-column
        sortable
        label="待录入肠镜结果"
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'待录入肠镜结果', areaId:scope.row.areaId,type:'a1'}}" v-if="scope.row.list[0].notEntryColonoscopyResult>0">
          <span style="color: blue;">{{scope.row.list[0].notEntryColonoscopyResult}}</span>
        </router-link>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        label="待录入病理结果"
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'待录入病理结果', areaId:scope.row.areaId,type:'a2'}}" v-if="scope.row.list[0].notEntryPathologyResult>0">
          <span style="color: blue;">{{scope.row.list[0].notEntryPathologyResult}}</span>
        </router-link>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column
        label="待录入筛查结果告知书"
        sortable
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'待录入筛查结果告知书', areaId:scope.row.areaId,type:'a3'}}" v-if="scope.row.list[0].notEntryNotificationResult>0">
          <span style="color: blue;">{{scope.row.list[0].notEntryNotificationResult}}</span>
        </router-link>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column
        label="待录入血液样本"
        sortable
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'待录入血液样本', areaId:scope.row.areaId,type:'a6'}}" v-if="scope.row.list[0].notEntrySampleS>0">
          <span style="color: blue;">{{scope.row.list[0].notEntrySampleS}}</span>
        </router-link>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column
        label="待录入粪便样本"
        sortable
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'待录入粪便样本', areaId:scope.row.areaId,type:'a4'}}" v-if="scope.row.list[0].notEntrySampleF>0">
          <span style="color: blue;">{{scope.row.list[0].notEntrySampleF}}</span>
        </router-link>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column
        label="待录入唾液样本"
        sortable
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'待录入唾液样本', areaId:scope.row.areaId,type:'a5'}}" v-if="scope.row.list[0].notEntrySampleM>0">
          <span style="color: blue;">{{scope.row.list[0].notEntrySampleM}}</span>
        </router-link>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column
        label="待录入终点事件"
        sortable
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'待录入终点事件', areaId:scope.row.areaId,type:'a7'}}" v-if="scope.row.list[0].notEntryCancer>0">
          <span style="color: blue;">{{scope.row.list[0].notEntryCancer}}</span>
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
        width="250"
       >
      </el-table-column>
      <el-table-column
        sortable
        label="待录入肠镜结果"
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'待录入肠镜结果', areaId:scope.row.areaId,type:'a1',delayFlag:1}}" v-if="scope.row.list[0].notEntryColonoscopyResult>0">
          <span style="color: blue;">{{scope.row.list[0].notEntryColonoscopyResult}}</span>
        </router-link>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        label="待录入病理结果"
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'待录入病理结果', areaId:scope.row.areaId,type:'a2',delayFlag:1}}" v-if="scope.row.list[0].notEntryPathologyResult>0">
          <span style="color: blue;">{{scope.row.list[0].notEntryPathologyResult}}</span>
        </router-link>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column
        label="待录入筛查结果告知书"
        sortable
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'待录入筛查结果告知书', areaId:scope.row.areaId,type:'a3',delayFlag:1}}" v-if="scope.row.list[0].notEntryNotificationResult>0">
          <span style="color: blue;">{{scope.row.list[0].notEntryNotificationResult}}</span>
        </router-link>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column
        label="待录入血液样本"
        sortable
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'待录入血液样本', areaId:scope.row.areaId,type:'a6',delayFlag:1}}" v-if="scope.row.list[0].notEntrySampleS>0">
          <span style="color: blue;">{{scope.row.list[0].notEntrySampleS}}</span>
        </router-link>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column
        label="待录入粪便样本"
        sortable
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'待录入粪便样本', areaId:scope.row.areaId,type:'a4',delayFlag:1}}" v-if="scope.row.list[0].notEntrySampleF>0">
          <span style="color: blue;">{{scope.row.list[0].notEntrySampleF}}</span>
        </router-link>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column
        label="待录入唾液样本"
        sortable
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'待录入唾液样本', areaId:scope.row.areaId,type:'a5',delayFlag:1}}" v-if="scope.row.list[0].notEntrySampleM>0">
          <span style="color: blue;">{{scope.row.list[0].notEntrySampleM}}</span>
        </router-link>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column
        label="待录入终点事件"
        sortable
      >
        <template slot-scope="scope"><router-link :to="{path:'/home/agency',query:{title:'待录入终点事件', areaId:scope.row.areaId,type:'a7',delayFlag:1}}" v-if="scope.row.list[0].notEntryCancer>0">
          <span style="color: blue;">{{scope.row.list[0].notEntryCancer}}</span>
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
        uncompletedArea_page:false,
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

      let obj = this.checkPageAuth(this,"uncompletedArea_page",this.btnAuth);
      this.query();
    },
    methods:{
      //查询
      query(){
        $axios_http({
          url:"/base/hospital/person/notentry/notAreaSumsByNationId",
          data:{
          },
          vueObj:this
        }).then((res)=>{
          this.queryResult.current = res.data.data.current;
          this.queryResult.delay = res.data.data.delay;
        })
      },
    }}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
