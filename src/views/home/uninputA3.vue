<template>
    <div slot="right" class="content-page" v-if="uninput_a3_page">
        <div class="content">
      <div class="filter-container">
         <h4>待办-待录入A3</h4>
          <p>&nbsp;</p>
          <router-link to="/home/home">
            <el-button size="mini" class="return-home">返 回</el-button>
          </router-link>
         <el-form :model="formData" class="clearfix" :inline="true">
            <div>
            <el-input style="width: 200px;" v-model.trim="formData.name" clearable placeholder="姓名" size="small"></el-input>
            <el-input style="width: 200px;" v-model.trim="formData.sid" clearable placeholder="SID" size="small"></el-input>
            <el-input style="width: 200px;" v-model.trim="formData.phone" clearable placeholder="手机号" size="small"></el-input>
            </div>
        <div>
            <el-cascader
                style="float: left;width: 200px;margin-right: 15px;"
                :options="$store.state.regionOptions"
                placeholder="所属社区"
                :props="props"
                v-model="ids"
                size="small"
                filterable
                :show-all-levels="false"
                change-on-select
                @change="getQcId"
              ></el-cascader>
                <el-select v-model="formData.group" clearable placeholder="分组方案" size="small" class="filter-item">
                  <el-option value="A"  v-bind:key="1" label="A组"></el-option>
                  <el-option value="B"  v-bind:key="2" label="B组"></el-option>
                  <el-option value="C"  v-bind:key="3" label="C组"></el-option>
                  <el-option value="Cg" v-bind:key="4" label="C组高危"></el-option>
                  <el-option value="Cd" v-bind:key="5" label="C组低危"></el-option>
            </el-select>
              <el-select v-model="formData.followGroup" clearable placeholder="随访分组" size="small" class="filter-item">
              <el-option v-for="(item,index) in followGroup" 
              :key="index" 
              :value="item.id" 
              :label="item.name"></el-option>
            </el-select>
        </div>
          <el-form-item class="btns" style="margin-top:5px;">
          <el-button  size="small" type="primary" icon="el-icon-search" @click="query(1,$store.state.uninputA3ListPageSize)" >查询</el-button>
           <el-button type="primary" size="small" icon="el-icon-close" @click="reset()">重置
                       </el-button>
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
            width="110"
          >
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号"
            width="110"
          >
          </el-table-column>
          <el-table-column
            prop="followGroup"
            label="随访分组"
            width="150"
          >
            <template slot-scope="scope">
              <span>{{scope.row.followGroup | followGroup}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="group"
            label="分组方案"
            width="150"
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
          <!-- <el-table-column
            prop="insertStatus"
            label="年度随访表录入状态"
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
            prop="followFinish"
            label="随访结束日期"
          >
          </el-table-column> -->
          <el-table-column
            label="操作"
            fixed="right"
            width="200"
          >
            <template slot-scope="scope">
                  <el-button type="text" @click="input(scope.row)">录入</el-button>
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
                :current-page="$store.state.uninputA3ListPageNo"
                :page-sizes="[10, 20, 50, 100]"
                v-bind:page-size="$store.state.uninputA3ListPageSize"
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
        uninput_a3_page:false,
        btnAuth:{
          subjectsList_query_btn:false,
          subjectsList_EXCEL_btn:false,
        },
        formData:{
          name:'',
          sid:'',
          phone:'',
          group:'',
          followGroup:'',
          loginName:''
        },
        queryResult: {
          pageNo: 1, //当前页
          pageSize: 10, //每页的条数
          totalPageCount: 0,
          tableData: []
        },
        group:DICTIONARY.group,
        followGroup: DICTIONARY.followGroup,
        ids:[],
        props: {
        value: "loginName",
        children: "child",
        label: "name"
         },
      }
    },
    mounted(){
      let obj = this.checkPageAuth(this,"uninput_a3_page",this.btnAuth) 
      this.query(this.$store.state.uninputA3ListPageNo,this.$store.state.uninputA3ListPageSize);
    },
    methods:{
       getQcId(value){
            this.formData.loginName = value[0];
        },
        reset(){
          this.formData.sid = '';
          this.formData.name = '';
          this.formData.phone ='';
          this.formData.group = '';
          this.formData.followGroup = '';
          let flag = {};
          let dataobj = {};
          if(this.$route.query.flag == 1){
              flag = {delayFlag:1}
          }else{
              flag = {}
          }
           if (localStorage.getItem("communityType") == "true") {
               this.ids.push(localStorage.getItem("loginName"));
               this.formData.loginName = localStorage.getItem("loginName");
               dataobj = Object.assign({},flag,this.formData,{pageNo:1,pageSize:10})
           }else{
               dataobj = Object.assign({},flag,this.formData,{pageNo:1,pageSize:10})
           }
          $axios_http({
            url:'/base/follow/hospital/yearUpdate/notEntry',
            data:dataobj,
            vueObj:this
          }).then((res) => {
             if(res.data.statusMsg == 'success'){
                   this.queryResult.tableData = res.data.data.list;
                   this.queryResult.totalPageCount = res.data.data.total;
                   this.$store.commit('get_uninputA3ListPageNo',res.data.data.pageNum)
                }
          })
        },
       query(pageNum,pageSize){
          let flag = {};
          let dataobj = {};
          if(this.$route.query.flag == 1){
              flag = {delayFlag:1}
          }else{
              flag = {}
          }
           if (localStorage.getItem("communityType") == "true") {
               this.ids.push(localStorage.getItem("loginName"));
               this.formData.loginName = localStorage.getItem("loginName");
               dataobj = Object.assign({},flag,this.formData,{pageNo:pageNum,pageSize:pageSize})
           }else{
               dataobj = Object.assign({},flag,this.formData,{pageNo:pageNum,pageSize:pageSize})
           }
          $axios_http({
            url:'/base/follow/hospital/yearUpdate/notEntry',
            data:dataobj,
            vueObj:this
          }).then((res) => {
             if(res.data.statusMsg == 'success'){
                   this.queryResult.tableData = res.data.data.list;
                   this.queryResult.totalPageCount = res.data.data.total;
                   this.$store.commit('get_uninputA3ListPageNo',res.data.data.pageNum)
                }
          })
       },
       pageSizeChange(val){
          this.$store.commit('get_uninputA3ListPageSize', val);
          this.query(this.$store.state.uninputA3ListPageNo,val);
       },
       currentPageChange(val){
          this.$store.commit('get_uninputA3ListPageNo', val);
          this.query(val,this.$store.state.uninputA3ListPageSize);
       },
       input(row){
           localStorage.setItem('followupA3ListInfo',JSON.stringify(row))
           this.$router.push({
             path:'/followup/followupA3',
             query:{
                flag:1
             }
           })
       }
    }
}

</script>

<style scoped>
.filter-item {
    width: 200px;
    margin-right: 10px;
  }
  .content {
  background: #fff;
  padding: 10px;
  }
    .el-form .el-input{
    margin-right: 10px;
    margin-bottom: 10px;
  }
   .el-form .el-select{
    margin-right: 10px;
    margin-bottom: 0.5px;
 }
  .return-home {
    text-align: center;
    /* float: left; */
    margin-bottom: 20px;
  }
</style>

