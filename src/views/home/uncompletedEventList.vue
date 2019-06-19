<template>
  <div slot="right" class="content-page" v-if="uncompletedEventList_page">
    <h4>待办-待录入终点事件</h4>
    <div class="content">
      <div class="filter-container">
        <router-link to="/home/areaHome">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
        <el-form :model="qc" :inline=true class="clear">
            <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="姓名" v-model="qc.name"></el-input>
            <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="SID" v-model="qc.sid">
            </el-input>
            <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="手机号" v-model="qc.phone">
            </el-input>
            <div class="filter-item" v-if="$store.state.hospitalType==1">
              <el-cascader
                style="width: 200px;margin-right: 15px;"
                :options="$store.state.regionOptions"
                placeholder="所属地区"
                :props="props"
                v-model="ids"
                size="small"
                filterable
                :show-all-levels="false"
                change-on-select
                @change="getQcId1"
              ></el-cascader>
            </div>
            <div class="filter-item" v-if="$store.state.hospitalType==2">
              <el-cascader
                style="width: 200px;margin-right: 15px;"
                :options="$store.state.regionOptions"
                placeholder="所属地区"
                :props="props"
                v-model="ids"
                size="small"
                filterable
                :show-all-levels="false"
                change-on-select
                @change="getQcId2"
              ></el-cascader>
            </div>
            <el-select v-model="qc.group" placeholder="请选择分组方案" size="small" class="filter-item">
              <el-option value="A" v-bind:key="1" label="A组"></el-option>
              <el-option value="B" v-bind:key="2" label="B组"></el-option>
              <el-option value="C" v-bind:key="3" label="C组"></el-option>
              <el-option value="Cg" v-bind:key="4" label="C组高危"></el-option>
              <el-option value="Cd" v-bind:key="5" label="C组低危"></el-option>
            </el-select>
            <el-select v-model="qc.cancerFormType" placeholder="表单类型" size="small" class="filter-item">
              <el-option value="20" v-bind:key="20" label="《表C1-癌症报告表》"></el-option>
              <el-option value="21" v-bind:key="21" label="《表C2-癌症诊断表》"></el-option>
              <el-option value="22" v-bind:key="22" label="《表C3-结直肠癌诊断信息摘录表》"></el-option>
              <el-option value="23" v-bind:key="23" label="《表C4-结直肠癌治疗信息摘录表》"></el-option>
            </el-select>
            <el-select v-model="qc.followGroup" clearable placeholder="随访分组" size="small" class="filter-item">
              <el-option v-for="(item,index) in followGroup" 
              :key="index" 
              :value="item.id" 
              :label="item.name"></el-option>
            </el-select>
          <div>
            <el-button  size="small" type="primary" icon="el-icon-search" @click="query(1,$store.state.cancerList1PageSize)" >查询</el-button>
            <el-button  type="primary" size="small" icon="el-icon-close" @click="reset" >重置</el-button>
          </div>
        </el-form>
      </div>
        <!-- <div class="table-btn-grooup">
          <el-button size="small" type="primary" icon="el-icon-document"
          >
            <a :href="downloadUrl">导出EXCEL</a>
          </el-button>
        </div> -->
        <!--数据列表-->
        <el-table
          :data="queryResult.tableData"
          border
          @sort-change="changeTableSort"
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
             width="110"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="110"
          >
          </el-table-column>
            <el-table-column
              label="性别"
              width="60"
            >
              <template slot-scope="scope">
              <span>{{scope.row.sex | reverseSex}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="age"
            label="年龄"
            width="60"
          >
          </el-table-column>
          <el-table-column
            prop="cellPhone"
            label="手机号"
            width="110"
          >
          </el-table-column>
          <el-table-column
            prop="depName"
            label="所属区"
             width="110"
            v-if="$store.state.hospitalType==2 || $store.state.hospitalType==1"
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
            label="入组日期"
            sortable
            width="110"
          >
          </el-table-column>
          <el-table-column
            label="表单类型"
          >
            <template slot-scope="scope">
              <span>{{scope.row.cancerFormType | cancerFormType}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
             width="100"
          >
            <template slot-scope="scope">
              <router-link :to="{path:'/event/cancerReport1',query:{sid:scope.row.sid,id:scope.row.id,flag:1,resource:0}}" v-if="scope.row.cancerFormType==20">
                <el-button type="text">录入</el-button>
              </router-link>
              <router-link :to="{path:'/event/cancerReport2',query:{sid:scope.row.sid,id:scope.row.id,flag:1,resource:0}}" v-if="scope.row.cancerFormType==21">
                <el-button type="text">录入</el-button>
              </router-link>
              <router-link :to="{path:'/event/cancerReport3',query:{sid:scope.row.sid,id:scope.row.id,flag:1,resource:0}}" v-if="scope.row.cancerFormType==22">
                <el-button type="text">录入</el-button>
              </router-link>
              <router-link :to="{path:'/event/cancerReport4',query:{sid:scope.row.sid,id:scope.row.id,flag:1,resource:0}}" v-if="scope.row.cancerFormType==23">
                <el-button type="text">录入</el-button>
              </router-link>
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
                :current-page="$store.state.cancerList1PageNo"
                :page-sizes="[10, 20, 50, 100]"
                v-bind:page-size="$store.state.cancerList1PageSize"
                layout="total, sizes, prev, pager, next, jumper"
                v-bind:total="queryResult.totalRowCount">
              </el-pagination>
            </div>
          </div></el-col>
        </el-row>
      </div>
    </div>
</template>
<script>
import DICTIONARY from "@/utils/dictionary.js";
  export default {
    data () {
      return {
        followGroup:DICTIONARY.followGroup,
        isShow:false,
        deptGroup:[],
        uncompletedEventList_page:false,
        btnAuth:{
          subjectsList_query_btn:false,
          subjectsList_EXCEL_btn:false,
        },
        //查询条件
        "qc":{
          "name":"",
          "phone":"",
          "sid":"",
          "loginName":null,
          "inGroupDateStart":"",
          "inGroupDateEnd":"",
          "group":null,
          "areaDeptId":null,
          "communityDeptId":null,
          "followGroup":null,
          "cancerFormType":null
        },
        //查询结果
        "queryResult":{
          "pageNo":1,//当前页
          "pageSize":10,//每页的条数
          "totalPageCount":0,
          "tableData":[]
        },
        formLabelWidth: '100px',
        props: {
          value: 'id',
          children: 'child',
          label:'name'
        },

        ids:[],
      }
    },
    mounted(){
      let obj = this.checkPageAuth(this,"uncompletedEventList_page",this.btnAuth)
      this.query(this.$store.state.cancerList1PageNo,this.$store.state.cancerList1PageSize);
    },
    beforeDestroy(){
      this.$store.state.cancerList1PageNo=1;
      this.$store.state.cancerList1PageSize=10;
    },
    methods:{
      //获取选中社区
      getQcId3(value){
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
                  for(let j = 0;j<this.$store.state.regionOptions[i].child.length;j++){
                      if(value[1] == this.$store.state.regionOptions[i].child[j].id){
                          for(let k=0;k<this.$store.state.regionOptions[i].child[j].child.length;k++){
                              if(value[2] == this.$store.state.regionOptions[i].child[j].child[k].id){
                                  this.qc.loginName =this.$store.state.regionOptions[i].child[j].child[k].loginName
                              }
                          }
                      }
                  }
              }
          }

        }

      },
              //获取选中区
      getQcId2(value){
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
      getQcId1(value){
        this.qc.loginName =value[0]
      },
      //查询
      query(pageNo,pageSize){
        $axios_http({
          url:"/base/hospital/person/cancer/notification/result/query",
          data:{
            name:this.qc.name,
            sid:this.qc.sid,
            loginName:this.qc.loginName,
            phone:this.qc.phone,
            inGroupDateStart:this.qc.inGroupDateStart,
            inGroupDateEnd:this.qc.inGroupDateEnd,
            group:this.qc.group,
            communityDeptId:this.qc.communityDeptId,
            cancerFormType:this.qc.cancerFormType,
            areaDeptId:this.qc.areaDeptId,
            cancerType:this.qc.cancerType,
            followGroup:this.qc.followGroup,
            delayFlag:this.$route.query.flag == 1?1:null,
            pageNo:pageNo,//当前页
            pageSize:pageSize//每页条数
          },
          vueObj:this
        }).then((res)=>{
          this.$store.commit('get_cancerList1PageNo',pageNo)
          this.queryResult.tableData=res.data.data;
          this.queryResult.totalPageCount=res.data.pageInfo.totalPageCount//获取总共多少页
          this.queryResult.totalRowCount=res.data.pageInfo.totalRowCount//获取总共条数
        })
      },
      changeTableSort(value){
        if(value.prop == 'inGroupDate'){
          this.qc.sortParameter = 'in_group_date'
        }else if(value.prop == 'sid'){
          this.qc.sortParameter = 'sid'
        }
        if(value.order == 'descending'){
          this.qc.sortRule = 'desc'
        }
        else if(value.order == 'ascending'){
          this.qc.sortRule = 'asc'
        }
        this.query(this.$store.state.cancerList1PageNo,this.$store.state.cancerList1PageSize)
      },
      //重置检索条件
      reset(){
        Object.assign(this.$data.qc, this.$options.data().qc)
        this.ids=[]
        this.query(this.$store.state.cancerList1PageNo,this.$store.state.cancerList1PageSize)
      },
      //每页显示查询结果条数变更事件，做重新查询操作
      pageSizeChange(pageSize) {
        this.$store.commit('get_cancerList1PageSize', pageSize)
        this.query(this.$store.state.cancerList1PageNo,pageSize);
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        this.$store.commit('get_cancerList1PageNo',currentPage)
        this.query(currentPage,this.$store.state.cancerList1PageSize);
      }

    }}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content{
    background: #fff;
    padding:10px;
  }
  .checkbox{
    display: block;
    margin-left: 20px;
    font-weight: normal;
  }
  .btnStyle{
    padding-left: 10px;
  }
  .return-home {
    display: block;
    text-align: center;
    float: left;
    margin-bottom:20px;
  }
  .table-btn-grooup{
    margin-bottom:10px;
  }
  .subjectsName{
    position: relative;
  }
  .filter-item{
    width:200px;
    margin-right:10px;
  }
 .el-button.is-plain:hover,.el-button.is-plain:focus{
  border-color:#fff;
}
h4{
  margin-left: 10px;
  margin-bottom: 15px;
}
</style>
