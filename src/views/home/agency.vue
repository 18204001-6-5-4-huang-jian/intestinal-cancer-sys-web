<template>
  <div slot="right" class="content-page" v-if="countryAgency_page">
    <div class="content">
      <h4 style="margin-bottom: 10px;">{{title}}</h4>
      <div class="filter-container" >
        <!--<router-link to="/home/countryHome">-->
          <el-button size="mini" class="return-home" @click="goBack()">返 回</el-button>
        <!--</router-link>-->
        <el-form :model="qc" :inline=true>
          <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="姓名" v-model="qc.name" >
          </el-input>
          <el-input  style="width: 200px;margin-left: 10px;" size="small" class="filter-item" placeholder="SID" v-model="qc.sid" >
          </el-input>
          <el-input  style="width: 200px;margin-left: 10px;" size="small" class="filter-item" placeholder="手机号" v-model="qc.phone" >
          </el-input>
          <div>
            <el-cascader
              v-if="areaFlag==3"
              style="float: left;width: 200px;margin-right: 15px;"
              :options="$store.state.regionOptions"
              placeholder="所属地区"
              :props="props"
              v-model="ids"
              size="small"
              :show-all-levels="false"
              change-on-select
              @change="getQcId"
            ></el-cascader>
            <el-cascader
              v-if="areaFlag==2"
              style="float: left;width: 200px;margin-right: 15px;"
              :options="$store.state.regionOptions"
              placeholder="所属区"
              :props="props"
              v-model="ids"
              size="small"
              :show-all-levels="false"
              change-on-select
              @change="getQcIdArea"
            ></el-cascader>
            <el-cascader
              v-if="areaFlag==1"
              style="float: left;width: 200px;margin-right: 15px;"
              :options="$store.state.regionOptions"
              placeholder="所属社区"
              :props="props"
              v-model="ids"
              size="small"
              :show-all-levels="false"
              change-on-select
              @change="getQcIdcommunity"
            ></el-cascader>
            <el-select v-model="qc.group" clearable placeholder="请选择分组方案" style="width: 200px;" size="small" class="filter-item">
              <el-option value="A" v-bind:key="1" label="A组"></el-option>
              <el-option value="B" v-bind:key="2" label="B组"></el-option>
              <el-option value="C" v-bind:key="3" label="C组"></el-option>
              <el-option value="Cg" v-bind:key="4" label="C组高危"></el-option>
              <el-option value="Cd" v-bind:key="5" label="C组低危"></el-option>
            </el-select>
             <el-select v-model="qc.followGroup" clearable placeholder="随访分组" style="width: 200px;margin-left:10px;" size="small" class="filter-item">
              <el-option v-for="(item,index) in followGroup" 
              :key="index" 
              :value="item.id" 
              :label="item.name">
               </el-option>
            </el-select>
          </div>

          <el-button class="filter-item" size="small" type="primary" icon="el-icon-search" @click="query(1,$store.state.uncompletedAgencyPageSize)" >查询</el-button>
          <el-button class="filter-item" type="primary" size="small" icon="el-icon-close" @click="reset" >重置</el-button>
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
            label="随访分组"
          >
          <template slot-scope="scope">
              <span>{{scope.row.followGroup | followGroup}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="分组"
          >
            <template slot-scope="scope">
              <span>{{scope.row.group | group}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="inGroupDate"
            label="入组日期"
          >
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
                :current-page="$store.state.uncompletedAgencyPageNo"
                :page-sizes="[10, 20, 50, 100]"
                v-bind:page-size="$store.state.uncompletedAgencyPageSize"
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
import DICTIONARY from "@/utils/dictionary.js";
  export default {
    name: 'Right',
    data () {
      return {
        //权限判定
        countryAgency_page:false,
        btnAuth:{
          countryAgencySearch_page:false,
        },
       areaFlag:this.$store.state.hospitalType,
        //网页顶部title
        title:this.$route.query.title,
        //查询条件
        "qc":{
          "name":null,
          "phone":"",
          "sid":"",
          "areaDeptId":this.$route.query.areaId,
          "communityDeptId":this.$route.query.communityDeptId,
          "loginName":null,
          "type":this.$route.query.type,
          "delayFlag":this.$route.query.delayFlag,
          "group":null,
          'followGroup':null
        },
        followGroup: DICTIONARY.followGroup,
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
        formLabelWidth: '180px',
        props: {
          value: 'id',
          children: 'child',
          label:'name'
        },
        ids:[],
      }
    },
    mounted(){
      this.$store.commit('LOGOUT_USER');
      let obj = this.checkPageAuth(this,"countryAgency_page",this.btnAuth);
      this.query(this.$store.state.uncompletedAgencyPageNo,this.$store.state.uncompletedAgencyPageSize);
      if(this.$route.query.areaId){
        this.ids.push(this.$route.query.areaId.toString())
      }else if(this.$route.query.communityDeptId) {
        this.ids.push(this.$route.query.communityDeptId.toString())
      }

    },
    beforeDestroy(){
      this.$store.state.uncompletedAgencyPageNo=1;
      this.$store.state.uncompletedAgencyPageSize=10;
    },
    methods:{
      //国家获取选中社区
      getQcId(value){
        this.qc.communityDeptId = null
        this.qc.areaDeptId = null
        if(value.length==1){
          this.qc.areaDeptId = value[0]
          this.qc.communityDeptId=null
          this.qc.loginName =null
        }else if(value.length == 2){
          this.qc.areaDeptId = value[0]
          this.qc.communityDeptId = value[1]
          this.qc.loginName =null
        }else if(value.length == 3){
          this.qc.areaDeptId = value[0]
          this.qc.communityDeptId = value[1]
          for(let i =0;i<this.$store.state.regionOptions.length;i++){
            if(value[0] == this.$store.state.regionOptions[i].id){
              console.log(1)
              for(let j = 0;j<this.$store.state.regionOptions[i].child.length;j++){
                if(value[1] == this.$store.state.regionOptions[i].child[j].id){
                  console.log(2)
                  for(let k=0;k<this.$store.state.regionOptions[i].child[j].child.length;k++){
                    if(value[2] == this.$store.state.regionOptions[i].child[j].child[k].id){
                      this.qc.loginName =this.$store.state.regionOptions[i].child[j].child[k].loginName
                      console.log(this.qc.loginName,1)
                    }
                  }
                }
              }
            }
          }

        }

      },
      //地区获取选中区
      getQcIdArea(value){
        this.qc.areaDeptId = null
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
      //获取选中区
      getQcIdcommunity(value){
        this.qc.areaDeptId = null
        this.qc.communityDeptId = null
        for(let i=0;i<this.$store.state.regionOptions.length;i++){
          if(value[0] == this.$store.state.regionOptions[i].id){
            this.qc.loginName = this.$store.state.regionOptions[i].loginName
          }
        }
      },
      //查询
     query(pageNo,pageSize){
        $axios_http({
          url:"/base/hospital/type/detail/notListDetailById",
          data:{
            name:this.qc.name,
            sid:this.qc.sid,
            phone:this.qc.phone,
            group:this.qc.group,
            followGroup:this.qc.followGroup,
            type:this.qc.type,
            delayFlag:this.qc.delayFlag,
            communityDeptId:this.qc.communityDeptId,
            loginName:this.qc.loginName,
            areaDeptId:this.qc.areaDeptId,
            pageNo:pageNo,//当前页
            pageSize:pageSize//每页条数
          },
          vueObj:this
        }).then((res)=>{
          this.$store.commit('get_uncompletedAgencyPageNo',pageNo)
          this.queryResult.tableData=res.data.data;
          this.queryResult.totalPageCount=res.data.pageInfo.totalPageCount//获取总共多少页
          this.queryResult.totalRowCount=res.data.pageInfo.totalRowCount//获取总共条数
        })
      },
      //重置检索条件
      reset(){
//        Object.assign(this.$data.qc, this.$options.data().qc)
        this.qc.name = null
        this.qc.sid = null
        this.qc.group =null
        this.qc.followGroup = null
        this.qc.phone = null
        this.qc.areaDeptId = this.$route.query.areaId
        this.qc.communityDeptId = this.$route.query.communityDeptId
        this.qc.delayFlag = this.$route.query.delayFlag
        this.qc.loginName = null
        this.ids = []
        if(this.$route.query.areaId){
          this.ids.push(this.$route.query.areaId.toString())
        }else if(this.$route.query.communityDeptId) {
          this.ids.push(this.$route.query.communityDeptId.toString())
        }

        this.query(this.$store.state.uncompletedAgencyPageNo,this.$store.state.uncompletedAgencyPageSize);
      },
      //每页显示查询结果条数变更事件，做重新查询操作
      pageSizeChange(pageSize) {
        //this.queryResult.pageSize = pageSize
          this.$store.commit('get_uncompletedAgencyPageSize', pageSize)
        this.query(this.$store.state.uncompletedAgencyPageNo,pageSize);
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        //this.queryResult.pageNo = currentPage
        this.$store.commit('get_uncompletedAgencyPageNo',currentPage)
        this.query(currentPage,this.$store.state.uncompletedAgencyPageSize);
      }
    }}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
