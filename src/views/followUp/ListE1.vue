<template>
    <div slot="right" class="content-page" v-if="liste1_list_page">
      <div class="content">
      <div class="filter-container">
         <router-link to="/home/home" v-if="$store.state.hospitalType == 1">
           <el-button size="mini" class="return-home">返 回</el-button>
         </router-link>
         <router-link to="/home/areaHome" v-if="$store.state.hospitalType == 2">
           <el-button size="mini" class="return-home">返 回</el-button>
         </router-link>
          <router-link to="/home/countryHome" v-if="$store.state.hospitalType == 3">
           <el-button size="mini" class="return-home">返 回</el-button>
         </router-link>
         <el-form :model="formData" class="clearfix" :inline="true">
           <el-input style="width: 200px;" v-model.trim="formData.name" clearable placeholder="姓名" size="small"></el-input>
            <el-input style="width: 200px;" v-model.trim="formData.sid" clearable placeholder="SID" size="small"></el-input>
            <el-input style="width: 200px;" v-model.trim="formData.phone" clearable placeholder="手机号" size="small"></el-input>
           <el-select v-model="formData.group" placeholder="分组方案" size="small" class="filter-item" clearable>
              <el-option 
              v-for="(item,index) in group" 
              :key="index" 
              :value="item.id" 
              :label="item.name"></el-option>
            </el-select>
             <el-select v-model="formData.insertStatus" placeholder="E1录入状态" size="small" class="filter-item" clearable>
            <el-option v-for="(item,index) in inputStatus" 
            :key="index" 
            :value="item.id" 
            :label="item.name"></el-option>
          </el-select>
          <el-select v-model="formData.followState" placeholder="随访状态" size="small" class="filter-item" clearable>
              <el-option v-for="(item,index) in followStatus" 
              :key="index" 
              :value="item.id" 
              :label="item.name"></el-option>
            </el-select>
              <el-select v-model="formData.followGroup" placeholder="随访分组" size="small" class="filter-item" clearable>
            <el-option v-for="(item,index) in followGroup" 
            :key="index" 
            :value="item.id" 
            :label="item.name"></el-option>
          </el-select>
             <el-form-item class="btns" style="display:block;margin-top:-5px;">
           <el-button  size="small" type="primary" icon="el-icon-search" @click="query(1,$store.state.followUpListE1PageSize)" >查询</el-button>
          <el-button  type="primary" size="small" icon="el-icon-close" @click="reset()">重置</el-button>
        </el-form-item>
         </el-form>
      </div>
         <!--数据列表-->
        <el-table
          :data="queryResult.tableData"
          border
          style="width: 100%;">
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="55">
          </el-table-column>
          <el-table-column
            prop="sid"
            label="SID"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="followGroup"
            label="随访分组"
            width="120"
          >
           <template slot-scope="scope">
              <span>{{scope.row.followGroup | followGroup}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="group"
            label="分组方案"
          >
          <template slot-scope="scope">
              <span>{{scope.row.group | group}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="overallStatusCy"
            label="总体状态"
          >
          <template slot-scope="scope">
            <span>{{scope.row.overallStatusCy | overallStatusCy}}</span>
        </template>
          </el-table-column>
           <el-table-column
            label="随访状态"
          >
            <template slot-scope="scope">
              <span>{{scope.row.followState | followState}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="insertStatus"
            label="表E1录入状态"
          >
           <template slot-scope="scope">
              <span>{{scope.row.insertStatus | codeEntryStatus}}</span>
            </template>
          </el-table-column>
           <el-table-column
            prop="followNum"
            label="随访次数"
          >
          </el-table-column>
           <el-table-column
            prop="entryTime"
            label="随访表录入日期"
          >
           <template slot-scope="scope">
              <span v-if="scope.row.entryTime">{{scope.row.entryTime | dateformat}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            width="120"
          >
            <template slot-scope="scope">
                  <el-button type="text" v-if="scope.row.insertStatus == 1" @click="inputE1(scope.row)">录入</el-button>
                  <el-button type="text" v-if="scope.row.insertStatus != 1" @click="ViewinputE1(scope.row)">查看</el-button>
                  <el-button type="text" v-if="scope.row.insertStatus != 1" @click="inputE1Edit(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
               <!-- 分页 -->
         <el-row>
          <el-col :span="10"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="14"><div class="grid-content bg-purple">
            <div class="block" style="margin-top: 18px">
              <el-pagination
                @size-change="pageSizeChange"
                @current-change="currentPageChange"
                :current-page="$store.state.followUpListE1PageNo"
                :page-sizes="[10, 20, 50, 100]"
                v-bind:page-size="$store.state.followUpListE1PageSize"
                layout="total, sizes, prev, pager, next, jumper"
                v-bind:total="queryResult.totalPageCount">
              </el-pagination>
            </div>
          </div>
          </el-col>
        </el-row>
        </div>
    </div>
</template>
<script>
import DICTIONARY from "@/utils/dictionary.js";
  export default {
    data () {
      return {
        liste1_list_page:false,
        btnAuth:{
  
        },
        formData:{
          name:'',
          sid:'',
          phone:'',
          group:'',
          insertStatus:'',
          followState:'',
          followGroup:''
        },
         queryResult: {
          pageNum: 1, //当前页
          pageSize: 10, //每页的条数
          totalPageCount: 0,
          tableData: []
        },
        group:DICTIONARY.group,
        inputStatus: DICTIONARY.inputStatus,
        followStatus: DICTIONARY.followStatus,
        followGroup:DICTIONARY.followGroup
      }
    },
    mounted(){
      let obj = this.checkPageAuth(this,"liste1_list_page",this.btnAuth)
      this.formData.sid=this.$route.query.sid;
      // 编辑之后的跳转 分页有问题
      this.$store.commit('get_followUpListE1PageNo', 1)
      this.$store.commit('get_followUpListE1PageSize', 10)
      this.query(this.$store.state.followUpListE1PageNo,this.$store.state.followUpListE1PageSize);
    },
    beforeDestroy(){
      
    },
    methods:{
        reset(){
            this.formData.name = '';
            this.formData.sid = '';
            this.formData.phone = '';
            this.formData.group = '';
            this.formData.insertStatus = '';
            this.formData.followState = '';
            this.formData.followGroup = '';
            let dataobj = {}; 
            if(localStorage.getItem('communityType')=='true'){
                dataobj = Object.assign(
                  {},
                  this.formData,
                  {loginName:localStorage.getItem('loginName')},
                  {
                    pageNum:1,
                    pageSize:10
                  })
            }else{
              dataobj =  Object.assign(
                  {},
                  this.formData,
                  {
                    pageNum:1,
                    pageSize:10
                  })
            }
            $axios_http({
              url:'/base/follow/contactRecordList/query',
              data:dataobj,
              vueObj: this
            }).then((res)=>{
                if(res.data.statusMsg == 'success'){
                  this.queryResult.tableData = res.data.data.list;
                  this.queryResult.totalPageCount = res.data.data.total;
                  this.$store.commit('get_followUpListE1PageNo',res.data.data.pageNum)
                }
            })
        },
        query(pageNum, pageSize){
          let dataobj = {}; 
          if(localStorage.getItem('communityType')=='true'){
              dataobj = Object.assign(
                {},
                this.formData,
                {loginName:localStorage.getItem('loginName')},
                {
                  pageNum:pageNum,
                  pageSize:pageSize
                })
          }else{
            dataobj =  Object.assign(
                {},
                this.formData,
                {
                  pageNum:pageNum,
                  pageSize:pageSize
                })
          }
            $axios_http({
              url:'/base/follow/contactRecordList/query',
              data:dataobj,
              vueObj: this
            }).then((res)=>{
                if(res.data.statusMsg == 'success'){
                  this.queryResult.tableData = res.data.data.list;
                  this.queryResult.totalPageCount = res.data.data.total;
                  this.$store.commit('get_followUpListE1PageNo',res.data.data.pageNum)
                }
            })
       },
       pageSizeChange(val){
          //  this.queryResult.pageSize = val;
         this.$store.commit('get_followUpListE1PageSize', val)
         this.query(this.$store.state.followUpListE1PageNo,val);
       },
       currentPageChange(val){
           //  this.queryResult.pageSize = val;
         this.$store.commit('get_followUpListE1PageNo', val)
         this.query(val,this.$store.state.followUpListE1PageSize);
       },
       inputE1(row){
         localStorage.setItem('followupE1ListInfo',JSON.stringify(row))
           this.$router.push({
             path:'/followup/followupE1',
             query:{
                flag:1
             }
           })
       },
       inputE1Edit(row){
          localStorage.setItem('followupE1ListInfo',JSON.stringify(row))
           this.$router.push({
             path:'/followup/followupE1',
             query:{
                flag:1,
                action:'edit'
             }
           })
       },
       ViewinputE1(row){
          localStorage.setItem('followupE1ListInfo',JSON.stringify(row))
           this.$router.push({
             path:'/followup/followupE1',
             query:{
                flag:0
             }
           })
       },
    }
}

</script>

<style scoped>
  .content {
    background: #fff;
    padding: 10px;
    }
    .el-form{
      margin-top: 20px;
    }
    .el-form .el-input{
    /* float: left; */
    margin-right: 10px;
    margin-bottom: 10px;
  }
 .el-form .el-select{
    /* float: left; */
    margin-right: 10px;
   margin-bottom: 0.5px;
 }
</style>
