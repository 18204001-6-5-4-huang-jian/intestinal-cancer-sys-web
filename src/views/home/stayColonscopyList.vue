<template>
  <div slot="right" class="content-page" v-if="stayColonscopyList_page">
    <div class="content">
      <div class="filter-container stayColonscopyList" >
        <h4>待办-待上传肠镜图片</h4>
        <p>&nbsp;</p>
        <router-link to="/home/areaHome">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
        <el-form :model="qc" :inline=true>
          <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="姓名" v-model="qc.name" >
          </el-input>
          <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="SID" v-model="qc.sid" >
          </el-input>
          <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="手机号" v-model="qc.phone" >
          </el-input>
          <div>

          </div>
          <el-select v-model="qc.group" clearable placeholder="分组方案" size="small" class="filter-item">
            <el-option value="A" label="A组">A组</el-option>
            <el-option value="B" label="B组">B组</el-option>
            <el-option value="C" label="C组">C组</el-option>
            <el-option value="Cg" label="C组高危">C组高危</el-option>
            <el-option value="Cd" label="C组低危">C组低危</el-option>
          </el-select>
          <el-cascader
            style="float: left;width: 200px;margin-right: 15px;"
            :options="$store.state.regionOptions"
            placeholder="所属区"
            :props="props"
            v-model="ids"
            size="small"
            filterable
            :show-all-levels="false"
            change-on-select
            @change="getQcId"
          ></el-cascader>
          <el-select v-model="qc.followGroup" clearable placeholder="随访分组" size="small" class="filter-item">
              <el-option v-for="(item,index) in followGroup" 
              :key="index" 
              :value="item.id" 
              :label="item.name"></el-option>
            </el-select>
          <div style="margin-bottom: 10px;">
            <el-button size="small" type="primary" icon="el-icon-search" @click="query(1,$store.state.uncompletedDNAPageSize)" >查询</el-button>
            <el-button type="primary" size="small" icon="el-icon-close" @click="reset" >重置</el-button>
          </div>

        </el-form>
        <!--数据列表-->
        <el-table
          :data="queryResult.tableData"
          border
          :default-sort = "{prop: 'inGroupDate', order: 'descending'}"
          style="width: 100%;">
          <el-table-column
            prop="sid"
            label="SID"
            width="80">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            label="性别"
          >
            <template slot-scope="scope">
              <span>{{scope.row.sex | reverseSex}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="age"
            label="年龄"
          >
          </el-table-column>
          <el-table-column
            prop="cellPhone"
            label="手机号"
          >
          </el-table-column>
          <el-table-column
            prop="commdeptName"
            label="所属区"
          >
          </el-table-column>
          <el-table-column
            prop="nickName"
            label="所属社区"
          >
          </el-table-column>
          <el-table-column
            label="分组"
          >
            <template slot-scope="scope">
              <span>{{scope.row.group | group}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="随访分组"
            >
            <template slot-scope="scope">
              <span>{{scope.row.followGroup | followGroup}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="inGroupDate"
            sortable
            label="入组日期"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            width="180"
          >
            <template slot-scope="scope">
              <!-- 上传图片 -->
              <uploadFile :id='scope.row.id' :flag="0" @refreshList='query'></uploadFile>
            </template>
          </el-table-column>
        </el-table>
        <!--分页栏-->
        <el-row>
          <el-col :span="10"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="14"><div class="grid-content bg-purple">
            <div class="block" style="margin-top: 18px">
              <el-pagination
                @size-change="pageSizeChange"
                @current-change="currentPageChange"
                :current-page="$store.state.uncompletedDNAPageNo"
                :page-sizes="[10, 20, 50, 100]"
                v-bind:page-size="$store.state.uncompletedDNAPageSize"
                layout="total, sizes, prev, pager, next, jumper"
                v-bind:total="queryResult.totalRowCount">
              </el-pagination>
            </div>
          </div></el-col>
        </el-row>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import uploadFile from '../components/uploadMultipleFile'
import DICTIONARY from "@/utils/dictionary.js";
  export default {
    name: 'Right',
    data () {
      return {
        followGroup:DICTIONARY.followGroup,
        visible2:false,
        //权限判定
        stayColonscopyList_page:false,
        btnAuth:{
//          buttonRoleAdd:false,
//          uncompletedDNA_add_btn:false,
//          buttonRoleDel:false,
//          uncompletedDNA_query_btn:false,
//          buttonUserRoleDis:false
        },
        deptGroup:[],
        multipleSelection:[
        ],
        //查询条件
        "qc":{
          "sid":'',
          "name":'',
          "phone":'',
          "group":'',
          "communityDeptId":null,
          "followGroup":null,
          "loginName":null,
        },
        props: {
          value: 'id',
          children: 'child',
          label:'name'
        },
        ids:[],
        //查询结果
        "queryResult":{
          "pageNo":1,//当前页
          "pageSize":10,//每页的条数
          "totalPageCount":0,
          "tableData":[]
        },
        //分页
        "queryResultSource":{
          "pageNoSource":1,//当前页
          "pageSizeSource":15,//每页的条数
          "totalPageCount":0
        },
        allocateResourcesData:[],
        formLabelWidth: '80px'
      }
    },
    components:{
      uploadFile
    },
    mounted(){
      this.$store.commit('LOGOUT_USER');

      let obj = this.checkPageAuth(this,"stayColonscopyList_page",this.btnAuth);
      this.query(this.$store.state.stayColonscopyListPageNo,this.$store.state.stayColonscopyListPageSize);
    },
    beforeDestroy(){
      this.$store.state.stayColonscopyListPageNo=1;
      this.$store.state.stayColonscopyListPageSize=10;
    },
    methods:{
      //获取选中区
      getQcId(value){
        this.qc.communityDeptId = null
        this.qc.loginName =null
        if(value.length==1){
          this.qc.communityDeptId = value[0]
          this.qc.loginName =null
        }else if(value.length == 2){
          this.qc.communityDeptId = value[0]
          for(let j = 0;j<this.$store.state.regionOptions.length;j++){
            if(value[0] == this.$store.state.regionOptions[j].id){
              for(let k=0;k<this.$store.state.regionOptions[j].child.length;k++){
                if(value[1] == this.$store.state.regionOptions[j].child[k].id){
                  this.qc.loginName =this.$store.state.regionOptions[j].child[k].loginName
                }
              }
            }
          }
        }
      },
      //查询
      query(pageNo,pageSize){
        $axios_http({
          url:"/base/hospital/person/notentry/colonoscopy/result/picture/query",
          data:{
            name:this.qc.name,
            sid:this.qc.sid,
            phone:this.qc.phone,
            group:this.qc.group,
            communityDeptId:this.qc.communityDeptId,
            loginName:this.qc.loginName,
            followGroup:this.qc.followGroup,
            delayFlag:this.$route.query.flag == 1?1:null,
            pageNo:pageNo,//当前页
            pageSize:pageSize//每页条数
          },
          vueObj:this
        }).then((res)=>{
          this.$store.commit('get_stayColonscopyNo',pageNo);
          this.queryResult.tableData=res.data.data;
          this.queryResult.totalPageCount=res.data.pageInfo.totalPageCount//获取总共多少页
          this.queryResult.totalRowCount=res.data.pageInfo.totalRowCount//获取总共条数
        })
      },
      //重置检索条件
      reset(){
        Object.assign(this.$data.qc, this.$options.data().qc)
        this.ids =[]
        this.query(this.$store.state.stayColonscopyListPageNo,this.$store.state.stayColonscopyListPageSize);
      },
      //每页显示查询结果条数变更事件，做重新查询操作
      pageSizeChange(pageSize) {
        //this.queryResult.pageSize = pageSize
        this.$store.commit('get_stayColonscopyListSize', pageSize)
        this.query(this.$store.state.stayColonscopyListPageNo,pageSize);
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        //this.queryResult.pageNo = currentPage
        this.$store.commit('get_stayColonscopyNo',currentPage)
        this.query(currentPage,this.$store.state.stayColonscopyListPageSize);
      }
    }}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .return-home {
    display: block;
    text-align: center;
    margin-bottom:20px;
  }
  .filter-item{
    width:200px;
    margin-right:10px;
  }
</style>
<style>
.stayColonscopyList table td{
  padding:5px 0;
}
.stayColonscopyList table .uploadFile{
  margin-left:0;
}
</style>

