<template>
  <div slot="right" class="content-page" v-if="countryBlood_page">
    <div class="content">
      <div class="filter-container">
        <router-link to="/home/countryHome">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
        <el-form :model="qc" :inline="true" class="clear">
          <div>
            <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="姓名" v-model="qc.name"   clearable>
            </el-input>
            <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="SID" v-model="qc.sid"   clearable>
            </el-input>
            <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="手机号" v-model="qc.phone"   clearable>
            </el-input>
            <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="冷冻盒编号" v-model="qc.frozenBoxCode"   clearable>
            </el-input>
            <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="样本ID" v-model="qc.sampleId"   clearable>
            </el-input>
          </div>
         <div>
           <el-cascader
             style="float: left;width: 200px;margin-right: 15px;"
             clearable
             :options="$store.state.regionOptions"
             placeholder="所属地区"
             :props="props"
             v-model="ids"
             size="small"
             :show-all-levels="false"
             change-on-select
             @change="getQcId"
           ></el-cascader>
           <el-select v-model="qc.courierStatus" placeholder="快递状态" size="small" class="filter-item"   clearable>
             <el-option value="2" v-bind:key="2" label="未寄出"></el-option>
             <el-option value="3  " v-bind:key="3" label="已寄出"></el-option>
             <el-option value="1" v-bind:key="1" label="已接收"></el-option>
           </el-select>
           <el-select v-model="qc.collectStatus" placeholder="采集状态" size="small" class="filter-item"   clearable>
             <el-option value="1" v-bind:key="1" label="已采集"></el-option>
             <el-option value="2" v-bind:key="2" label="未提供"></el-option>
           </el-select>
           <el-date-picker
             v-model="qc.collectStatusStartDate"
             type="date"
             clearable
             size="small"
             format="yyyy 年 MM 月 dd 日"
             value-format="yyyy-MM-dd"
             placeholder="采样日期(起)"
             class="filter-item">
           </el-date-picker>
           <el-date-picker
             v-model="qc.collectStatusEndDate"
             type="date"
             size="small"
             clearable
             format="yyyy 年 MM 月 dd 日"
             value-format="yyyy-MM-dd"
             placeholder="采样日期(止)"
             class="filter-item">
           </el-date-picker>
           </div>
           <div>
               <el-select v-model="qc.followState" placeholder="随访状态" size="small" class="filter-item" clearable>
                 <el-option v-for="(item,index) in followStatus" 
                 :key="index" 
                 :value="item.id" 
                 :label="item.name">
                 </el-option>
               </el-select>
                <el-select v-model="qc.followGroup" placeholder="随访分组" size="small" class="filter-item" clearable>
                <el-option v-for="(item,index) in followGroup" 
                :key="index" 
                :value="item.id" 
                :label="item.name">
                 </el-option>
               </el-select>
           </div>
           <div>
             <el-button size="small" type="primary" icon="el-icon-search" @click="query(1,$store.state.countryFecalListPageSize)">查询</el-button>
             <el-button  type="primary" size="small" icon="el-icon-close" @click="reset" >重置</el-button>
              <el-button size="small" type="primary" icon="el-icon-document"
                     >
            <a :href="downloadUrl">导出EXCEL</a>
          </el-button>
           </div>
        </el-form>
      </div>
      <div >
        <!--数据列表-->
        <el-table
          :data="queryResult.tableData"
          border
          ref="multipleTable"
          @select="changeData"
          @select-all="changeDataAll"
          :default-sort = "{prop: 'collectStatusDate', order: 'descending'}"
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
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
          >
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="AreaName"
            label="地区医院"
            width="160"
          >
          </el-table-column>
          <el-table-column
            prop="depName"
            label="所属区"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="nickName"
            label="所属社区"
          >
          </el-table-column>
            <el-table-column
             label="随访状态"
           >
             <template slot-scope="scope">
               <span>{{scope.row.followState | followState}}</span>
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
            label="分组"
          >
            <template slot-scope="scope">
              <span>{{scope.row.group | group}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="样本类型"
          >
            <template slot-scope="scope">
              <span>{{scope.row.sampleType | sampleType}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="采集状态"
          >
            <template slot-scope="scope">
              <span>{{scope.row.collectStatus | collectStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="collectStatusDate"
            label="采样日期"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="sampleId"
            label="样本ID"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="frozenBoxCode"
            label="冷冻盒编号"
            width="100"
          >
          </el-table-column>
          <el-table-column
          prop="sampleColumnAndLine"
          label="样本位置"
          width="100"
        >

        </el-table-column>
         <el-table-column
            label="快递状态"
            width="100"
          >
            <template slot-scope="scope">
              <span>{{scope.row.courierStatus | courierStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="sampleNote"
            label="备注"
            width="100"
          >
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
            label="操作"
            width="150"
            align="center"
            fixed="right"
          >
            <template slot-scope="scope">
              <!-- 解除锁定组件 -->
              <approvalDialog ref="approvalDialog" @refreshList="query" :id="scope.row.id" :approvalArr="approvalArr" v-if="scope.row.approvalStatus==0"></approvalDialog>
              <!-- <el-button type="text" size="small"  v-if="scope.row.approvalStatus==1" :disabled="true">解除锁定</el-button> -->
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
                :current-page="$store.state.countryFecalListPageNo"
                :page-sizes="[10, 20, 50, 100]"
                v-bind:page-size="$store.state.countryFecalListPageSize"
                layout="total, sizes, prev, pager, next, jumper"
                v-bind:total="queryResult.totalRowCount">
              </el-pagination>
            </div>
          </div></el-col>
        </el-row>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import approvalDialog from '../components/approvalDialog'
import DICTIONARY from "@/utils/dictionary.js";
  export default {
    data () {
      return {
        approvalArr:{
          formType:"HOSPITAL_BIOLOGICAL_SAMPLE_RESULT",
        },  //解除锁定相关信息
        countryBlood_page:false,
        downloadUrl: SERVER_NAME + '/base/hospital/sample/stoolSampleQueryExcel?type=stool',
        btnAuth:{
          one_colonscopyList_btn:false,
          colonscopyList_query_btn:false,
          colonscopyList_EXCEL_btn:false,
          colonscopyList_add_btn:false
        },
        //查询条件
        "qc":{
          "name":"",
          "sex":null,
          "phone":"",
          "sid":"",
          "group":null,
          "sampleType":'F',
          "sampleId":null,
          "frozenBoxCode":null,
          "courierStatus":null,
          "collectStatus":null,
          "communityDeptId":null,
          "areaDeptId":null,
          "loginName":null,
          "collectStatusStartDate":null,
          "collectStatusEndDate":null,
           "followState":null,
           "followGroup":null,
        },
        followGroup:DICTIONARY.followGroup,
        followStatus:DICTIONARY.followStatus,
        //查询结果
        "queryResult":{
          "pageNo":1,//当前页
          "pageSize":10,//每页的条数
          "totalPageCount":0,
          "tableData":[]
        },
        id:"",
        deptGroup:[],
        formLabelWidth: '180px',
        props: {
          value: 'id',
          children: 'child',
          label:'name'
        },

        ids:[],

      }
    },
    components:{
      approvalDialog
    },
    mounted(){
      let obj = this.checkPageAuth(this,"countryBlood_page",this.btnAuth)
      this.qc.sid=this.$route.query.sid;
      this.query(this.$store.state.countryFecalListPageNo,this.$store.state.countryFecalListPageSize);
    },
    beforeDestroy(){
      this.$store.state.countryFecalListPageNo=1;
      this.$store.state.countryFecalListPageSize=10;
    },
    methods:{
      //获取选中社区
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

        }else{
          this.qc.loginName = null;
        }

      },
      //录入样本弹窗
      openInsertDialog(row){
        this.insertForm.sampleId = null
        this.insertDialog = true
        this.insertForm.id = row.id
        $axios_http({
          url: "/base/area/sample/result/querySampleId",
          data:{
            associatedSampleId:row.associatedSampleId
          },
          vueObj: this
        }).then((res) => {
          this.insertForm.sampleId = res.data.data

        })

      },
      //一键处理弹窗
      openQuitDialog(){
        if(this.quitForms.length>0){
          this.quitDialog = true
        }else{
          this.$message({
            type:'warning',
            message:'请至少选择一人'
          })
        }
      },
      getInfo(value){
        if (this.addForms.sid){
          $axios_http({
            url: "/base/hospital/person/detail/get/"+this.addForms.sid,
            data:{},
            vueObj: this
          }).then((res) => {
            if(res.data.data.base){
              this.addForms.name = res.data.data.base.name
              this.addForms.phone = res.data.data.base.phone
            }else {
              this.addForms.name = ''
              this.addForms.phone = ''
              this.$message({
                type:'error',
                message:'您输入的SID不在系统中，请重新输入'
              })
            }

          })
        }

      },
      //一键处理退出
      cancelQuit(){
        this.quitDialog = false
      },
      openCancel(row){
        this.quitDialog = true
        this.id = row.id
      },
      submit(){
        $axios_http({
          url:"/base/area/sample/result/addSampleResult",
          data:{
              id:this.id,
            collectStatus:2

          },
          vueObj:this
        }).then((res)=>{

         this.quitDialog = false
         this.query(this.$store.state.countryFecalListPageNo,this.$store.state.countryFecalListPageSize);
        })
      },
      cancel(){
          this.addFormDialog = false
          this.$refs['addForms'].resetFields();
        },
      changeData(selection){
        this.quitForms.sid = []
        for(let i=0;i<selection.length;i++){
          this.quitForms.push(selection[i].sid)
        }
      },
      changeDataAll(selection){
        this.quitForms.sid = []
        for(let i=0;i<selection.length;i++){
          this.quitForms.push(selection[i].sid)
        }
      },
      insert(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            $axios_http({
              url: "/base/area/sample/result/addSampleResult",
              data: {
                frozenBoxCode:this.insertForm.frozenBoxCode,
                sampleId:this.insertForm.sampleId,
                collectStatus:this.insertForm.collectStatus,
                collectStatusDateBySql:this.insertForm.collectStatusDateBySql,
                sampleColumn:this.insertForm.sampleColumn,
                sampleLine:this.insertForm.sampleLine,
                sampleNote:this.insertForm.sampleNote,
                id:this.insertForm.id
              },
              vueObj: this
            }).then((res) => {
              $successMsg(this, "添加成功")
              this.insertDialog = true
              this.$refs[formName].resetFields();
              this.query(this.$store.state.countryFecalListPageNo,this.$store.state.countryFecalListPageSize);
            })
          }
        })
      },
      addForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            $axios_http({
              url: "/base/hospital/biological/sample/addSample",
              data: {
                sid: this.addForms.sid,
                frozenBoxCode:this.addForms.frozenBoxCode,
                sampleId:this.addForms.sampleId,
                sampleType:this.addForms.sampleType,
                collectStatusDateBySql:this.addForms.collectStatusDateBySql,
                sampleColumn:this.addForms.sampleColumn,
                sampleLine:this.addForms.sampleLine,
                sampleNote:this.addForms.sampleNote,
              },
              vueObj: this
            }).then((res) => {
              $successMsg(this, "添加成功")
              this.addFormDialog = false
              this.$refs['addForms'].resetFields();
              this.query(this.$store.state.countryFecalListPageNo,this.$store.state.countryFecalListPageSize);
            })
          }
        })
      },
      add(){
        this.addFormDialog = true
      },
      //查询
      query(pageNo,pageSize){
        $axios_http({
          url:"/base/country/biological/sample/query",
          data:{
            name:this.qc.name,
            sid:this.qc.sid,
            phone:this.qc.phone,
            sex:this.qc.sex,
            frozenBoxCode:this.qc.frozenBoxCode,
            group:this.qc.group,
            sampleType:this.qc.sampleType,
            sampleId:this.qc.sampleId,
            collectStatus:this.qc.collectStatus,
            courierStatus:this.qc.courierStatus,
            communityDeptId:this.qc.communityDeptId,
            areaDeptId:this.qc.areaDeptId,
            loginName:this.qc.loginName,
            sampleTypeAll3:this.qc.sampleTypeAll3,
            collectStatusStartDate:this.qc.collectStatusStartDate,
            collectStatusEndDate:this.qc.collectStatusEndDate,
            followState:this.qc.followState,
            followGroup:this.qc.followGroup,
            pageNo:pageNo,//当前页
            pageSize:pageSize//每页条数
          },
          vueObj:this
        }).then((res)=>{
          this.$store.commit('get_countryFecalListPageNo',pageNo)
          this.queryResult.tableData=res.data.data;
          this.queryResult.totalPageCount=res.data.pageInfo.totalPageCount//获取总共多少页
          this.queryResult.totalRowCount=res.data.pageInfo.totalRowCount//获取总共条数
        })
      },
      //重置检索条件
      reset(){
        Object.assign(this.$data.qc, this.$options.data().qc)
        this.ids = []
        this.query(this.$store.state.countryFecalListPageNo,this.$store.state.countryFecalListPageSize);
      },
      //每页显示查询结果条数变更事件，做重新查询操作
      pageSizeChange(pageSize) {
        this.$store.commit('get_countryFecalListPageSize', pageSize)
        //this.queryResult.pageSize = pageSize
        this.query(this.$store.state.countryFecalListPageNo,pageSize);
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        this.$store.commit('get_countryFecalListPageNo',currentPage)
        //this.queryResult.pageNo = currentPage
        this.query(currentPage,this.$store.state.countryFecalListPageSize);
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
   margin-top:20px;
   margin-bottom:10px;
  }
  .subjectsName{
    position: relative;
  }
  .corner{
    width: 20px;
    height: 20px;
    line-height: 20px;
    position: absolute;right:10px;top:0px;
    display: block;
    border-radius: 10px;
    text-align: center;
    background: #f56a00;
    color:#fff;
  }
  .notification-input{
    width: 220px;
  }
  .filter-item{
    width:200px;
    margin-right:10px;
  }
</style>
