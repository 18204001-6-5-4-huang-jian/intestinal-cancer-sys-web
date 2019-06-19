<template>
    <div slot="right" class="content-page" v-if="lista3__list_page">
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
            <el-select v-model="formData.insertStatus" placeholder="电话随访表录入状态" size="small" class="filter-item" clearable>
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
             <!-- <el-select v-model="formData.informStatus" placeholder="发放状态" size="small" class="filter-item" clearable>
              <el-option v-for="(item,index) in providStatus" 
              :key="index" 
              :value="item.id" 
              :label="item.name"></el-option>
            </el-select> -->
            <br>
          <el-form-item class="btns" style="display:block;margin-top:-5px;">
            <el-button  size="small" type="primary" icon="el-icon-search" @click="query(1,$store.state.followUpListA3PageSize)" >查询</el-button>
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
            label="随访表录入状态"
          >
           <template slot-scope="scope">
              <span>{{scope.row.insertStatus | codeEntryStatus}}</span>
            </template>
          </el-table-column>
           <el-table-column
            prop="followFinish"
            label="随访完成日期"
          >
           <template slot-scope="scope">
              <span v-if="scope.row.followFinish">{{scope.row.followFinish | dateformat}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            width="120"
          >
            <template slot-scope="scope">
                  <el-button type="text" v-if="scope.row.insertStatus == 1" @click="inputA3(scope.row)">录入</el-button>
                  <el-button type="text" v-if="scope.row.insertStatus == 2  && scope.row.overallStatusCy != 2" @click="ViewinputA3(scope.row)">查看</el-button>
                  <el-button type="text" v-if="scope.row.insertStatus == 2  && scope.row.overallStatusCy != 2 && scope.row.overallStatusCy != 4" @click="inputA3Edit(scope.row)">编辑</el-button>
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
                :current-page="$store.state.followUpListA3PageNo"
                :page-sizes="[10, 20, 50, 100]"
                v-bind:page-size="$store.state.followUpListA3PageSize"
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
        lista3__list_page:false,
        btnAuth:{
          subjectsList_query_btn:false,
          subjectsList_EXCEL_btn:false,
        },
        formData:{
          name:'',
          sid:'',
          phone:'',
          group:'',
          insertStatus:'',
          followState:'',
          followGroup:'',
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
        followGroup:DICTIONARY.followGroup,
        // providStatus:DICTIONARY.providStatus
      }
    },
    mounted(){
      let obj = this.checkPageAuth(this,"lista3__list_page",this.btnAuth)
      this.formData.sid=this.$route.query.sid;
      // 编辑之后的跳转 分页有问题
      this.$store.commit('get_followUpListA3PageNo', 1)
      this.$store.commit('get_followUpListA3PageSize', 10)
      this.query(this.$store.state.followUpListA3PageNo,this.$store.state.followUpListA3PageSize);
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
              url:'/base/follow/yearUpdate/query',
              data:dataobj,
              vueObj: this
            }).then((res)=>{
                if(res.data.statusMsg == 'success'){
                  this.queryResult.tableData = res.data.data.list;
                  this.queryResult.totalPageCount = res.data.data.total;
                  this.$store.commit('get_followUpListA3PageNo',res.data.data.pageNum)
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
              url:'/base/follow/yearUpdate/query',
              data:dataobj,
              vueObj: this
            }).then((res)=>{
                if(res.data.statusMsg == 'success'){
                  this.queryResult.tableData = res.data.data.list;
                  this.queryResult.totalPageCount = res.data.data.total;
                  this.$store.commit('get_followUpListA3PageNo',res.data.data.pageNum)
                }
            })
       },
       inputA3(row){
         localStorage.setItem('followupA3ListInfo',JSON.stringify(row))
           this.$router.push({
             path:'/followup/followupA3',
             query:{
                flag:1
             }
           })
       },
       inputA3Edit(row){
          localStorage.setItem('followupA3ListInfo',JSON.stringify(row))
           this.$router.push({
             path:'/followup/followupA3',
             query:{
                flag:1,
                action:'edit'
             }
           })
       },
       ViewinputA3(row){
           localStorage.setItem('followupA3ListInfo',JSON.stringify(row))
           this.$router.push({
             path:'/followup/followupA3',
             query:{
                flag:0
             }
           })
       },
       pageSizeChange(val){
        //  this.queryResult.pageSize = val;
         this.$store.commit('get_followUpListA3PageSize', val)
         this.query(this.$store.state.followUpListA3PageNo,val);
       },
       currentPageChange(val){
          // this.queryResult.pageNum = val;
          this.$store.commit('get_followUpListA3PageNo', val)
          this.query(val,this.$store.state.followUpListA3PageSize);
       }
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

