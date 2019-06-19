<template>
  <div slot="right" class="content-page" v-if="uncompletedBloodList_page">
    <h4>待办-待录入粪便样本</h4>
    <div class="content">
      <div class="filter-container">
        <router-link to="/home/areaHome">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
        <el-form :model="qc" :inline=true class="clear">
          <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="姓名" v-model="qc.name"   clearable>
          </el-input>
          <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="SID" v-model="qc.sid"   clearable>
          </el-input>
          <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="手机号" v-model="qc.phone"   clearable>
          </el-input>
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
          <!-- <el-select v-model="qc.followGroup" clearable placeholder="随访分组" size="small" class="filter-item">
              <el-option v-for="(item,index) in followGroup" 
              :key="index" 
              :value="item.id" 
              :label="item.name"></el-option>
            </el-select> -->
          <div>
            <el-button size="small" type="primary" icon="el-icon-search" @click="query(1,$store.state.uncompletedfecalListPageSize)">查询</el-button>
            <el-button  type="primary" size="small" icon="el-icon-close" @click="reset" >重置</el-button>
          </div>
        </el-form>
      </div>
      <el-dialog :visible.sync="addFormDialog" :show-close="false">
        <el-form :model="addForms" :rules="addFormRules" ref="addForms" >
          <el-form-item label="SID" :label-width="formLabelWidth" prop="sid" >
            <el-input v-model="addForms.sid" auto-complete="off" class="notification-input" @blur="getSidInfo()"></el-input>
          </el-form-item>
          <el-form-item label="样本类型" :label-width="formLabelWidth" prop="sampleType">
            <el-select v-model="addForms.sampleType" placeholder="样本类型" style="width: 220px;"  @change="getSidInfo1">
              <el-option value="S" v-bind:key="1" label="血清样本"></el-option>
              <el-option value="P" v-bind:key="2" label="血浆样本"></el-option>
              <el-option value="W" v-bind:key="3" label="白细胞样本"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="采样日期" :label-width="formLabelWidth" prop="collectStatusDateBySql" >
            <el-date-picker
              v-model="addForms.collectStatusDateBySql"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="采样日期"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="样本ID" :label-width="formLabelWidth" prop="sampleId">
            <el-input v-model="addForms.sampleId" auto-complete="off" class="notification-input" ></el-input>
          </el-form-item>
          <el-form-item label="冷冻盒编号" :label-width="formLabelWidth" prop="frozenBoxCode">
            <el-input v-model="addForms.frozenBoxCode" auto-complete="off" class="notification-input" ></el-input>
          </el-form-item>
          <div class="clearfloat">
            <el-form-item  label="位置" :label-width="formLabelWidth" prop="sampleColumn" style="float: left;">
              <el-select v-model="addForms.sampleColumn" placeholder="" style="width: 60px;" size="small">
                <el-option :value="item.value" :key="item.value" :label="item.label" v-for="item in sampleColumnOptions"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item  label-width="10px" prop="sampleLine" style="float: left;">
              <el-select v-model="addForms.sampleLine" placeholder="" style="width: 60px;" size="small">
                <el-option :value="item.value" :key="item.value" :label="item.label" v-for="item in sampleLineOptions"></el-option>

              </el-select>
            </el-form-item>
          </div>

          <el-form-item label="备注" :label-width="formLabelWidth" prop="sampleNote">
            <el-input v-model="addForms.sampleNote" auto-complete="off" class="notification-input"></el-input>
          </el-form-item>
          <div class="dialog-footer" style="text-align: center;">
            <el-button size="small" type="primary" @click="addData('addForms')">提交</el-button>
            <el-button size="small" @click="cancelAddForm('addForms')">取 消</el-button>
          </div>
        </el-form>
      </el-dialog>
      <el-dialog :visible.sync="insertDialog" :show-close="false">
        <el-form :model="insertForm" :rules="insertFormRule" ref="insertForm" >
          <el-form-item label="采样日期" :label-width="formLabelWidth" prop="collectStatusDateBySql" >
            <el-date-picker
              v-model="insertForm.collectStatusDateBySql"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="采样日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="样本ID" :label-width="formLabelWidth" prop="sampleId" >
            <el-input v-model="insertForm.sampleId" auto-complete="off" class="notification-input" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="冷冻盒编号" :label-width="formLabelWidth" prop="frozenBoxCode">
            <el-input v-model="insertForm.frozenBoxCode" auto-complete="off" class="notification-input" ></el-input>
          </el-form-item>
          <div class="clearfloat">
            <el-form-item  label="位置" :label-width="formLabelWidth" prop="sampleColumn" style="float: left;">
              <el-select v-model="insertForm.sampleColumn" placeholder="" style="width: 60px;" size="small">
                <el-option :value="item.value" :key="item.value" :label="item.label" v-for="item in sampleColumnOptions"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item  label-width="10px" prop="sampleLine" style="float: left;">
              <el-select v-model="insertForm.sampleLine" placeholder="" style="width: 60px;" size="small">
                <el-option :value="item.value" :key="item.value" :label="item.label" v-for="item in sampleLineOptions"></el-option>

              </el-select>
            </el-form-item>
          </div>
          <el-form-item label="备注" :label-width="formLabelWidth" prop="sampleNote" >
            <el-input v-model="insertForm.sampleNote" auto-complete="off" class="notification-input"></el-input>
          </el-form-item>
          <div class="dialog-footer" style="text-align: center;">
            <el-button size="small" type="primary" @click="insert('insertForm')">提交</el-button>
            <el-button size="small" @click="cancel('insertForm')">取 消</el-button>
          </div>
        </el-form>
      </el-dialog>
      <el-dialog :visible.sync="quitDialog" :show-close="false" width="30%">
        <div style="height: 60px;text-align: center;">您确认所选受试者未提供样本？</div>
        <div class="dialog-footer" style="text-align: center;">
          <el-button size="small" type="primary" @click="submit()">提交</el-button>
          <el-button size="small" @click="cancelQuit()">取 消</el-button>
        </div>
      </el-dialog>
      <div >
        <div class="table-btn-grooup">
          <!--<el-button  size="small" type="primary" icon="el-icon-search" >导出EXCEL</el-button>-->
          <!--<el-button  size="small" type="primary" icon="el-icon-plus" @click="add()" >新增</el-button>-->
          <!--<el-button  size="small" type="primary" icon="el-icon-search"  @click="openQuitDialog">一键处理</el-button>-->
        </div>
        <!--数据列表-->
        <el-table
          :data="queryResult.tableData"
          border
          ref="multipleTable"
          @select="changeData"
          @select-all="changeDataAll"
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
            prop="cellPhone"
            label="手机号"
            width="120"
          >
          </el-table-column>

          <el-table-column
            prop="depName"
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
          <!-- <el-table-column
            label="随访分组"
            >
            <template slot-scope="scope">
              <span>{{scope.row.followGroup | followGroup}}</span>
            </template>
          </el-table-column> -->
          <el-table-column
            label="样本类型"
          >
            <template slot-scope="scope">
              <span>{{scope.row.sampleType | sampleType}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="150"
          >
            <template slot-scope="scope">
              <el-button type="text" class="btnStyle" size="small"  @click="openInsertDialog(scope.row)" >录入</el-button>
              <el-button type="text" class="btnStyle" size="small"  @click="openCancel(scope.row)" >未提供</el-button>
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
                :current-page="$store.state.uncompletedfecalListPageNo"
                :page-sizes="[10, 20, 50, 100]"
                v-bind:page-size="$store.state.uncompletedfecalListPageSize"
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
import DICTIONARY from "@/utils/dictionary.js";
  export default {

    data () {
      var validateSid = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('SID不能为空'));
        } else if (!(/^TC[0-9]{5}$/.test(value))) {
          callback(new Error('SID格式不正确'))
        } else{
          $axios_http({
            url:'/base/hospital/person/info/checkSid/'+this.addForms.sid,
            data: {},
            vueObj: this
          }).then((res) => {
            if(res.data.statusCode == '880005'){
              callback(new Error('该系统不存在SID'));
            }else{
              callback();
            }
          })
        }
      };
      var validateSampleId = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('SID不能为空'));
        } else if (!(/^CS[0-9]{5}$/.test(value))) {
          callback(new Error('样本ID格式不正确'))
        } else{
          callback();
        }
      };
      var validatefrozenBoxCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('冷冻盒编号不能为空'));
        } else if (!(/^CS[0-9]{1}F[0-9]{3}$/.test(value))) {
          callback(new Error('冷冻盒编号格式不正确'))
        } else{
          callback()

        }
      };
      return {
        followGroup:DICTIONARY.followGroup,
        disabled:false,
        addFormDialog:false,
        insertDialog:false,
        quitDialog:false,
        notificationFormSeeDialog:false,
        uncompletedBloodList_page:false,
        btnAuth:{
          one_colonscopyList_btn:false,
          colonscopyList_query_btn:false,
          colonscopyList_EXCEL_btn:false,
          colonscopyList_add_btn:false
        },
        //查询条件
        "qc":{
          "name":null,
          "sex":null,
          "phone":"",
          "sid":"",
          "group":null,
          "communityDeptId":null,
          "loginName":null,
          "followGroup":null,
          "sampleType":'F',
//          "sampleId":null,
//          "frozenBoxCode":null,
//          "courierStatus":null,
//          "collectStatus":null,
//          "collectStatusStartDate":null,
//          "collectStatusEndDate":null,
//          "sampleTypeAll3":'123',
        },
        //查询结果
        "queryResult":{
          "pageNo":1,//当前页
          "pageSize":10,//每页的条数
          "totalPageCount":0,
          "tableData":[]
        },
        insertForm:{
          "frozenBoxCode":'CS',
          'sampleId':'CS',
          'collectStatus':'1',
          'collectStatusDateBySql':'',
          'sampleColumn':'',
          'sampleLine':'',
          'sampleNote':'',
          'id':'',
        },
        props: {
          value: 'id',
          children: 'child',
          label:'name'
        },
        ids:[],
        id:"",
        insertFormRules: {
          reserveable:{required: true, message: '必填', trigger: 'change'},
          deptName:{required: true, message: '必填', trigger: 'blur'},
          examinationName:{required: true, message: '必填', trigger: 'blur'},
          period:[{required: false, message: '必填', trigger: 'blur'}],
          name:[{required: false, message: '必填', trigger: 'blur'}],
        },
        addForms:{
          'sid':'TC',
          "frozenBoxCode":'',
          'sampleId':'',
          'sampleType':'',
          'collectStatusDateBySql':'',
          'sampleColumn':'',
          'sampleLine':'',
          'sampleNote':'',
        },
        multipleTable:[],
        deptGroup:[],
        addFormRules: {
          sid:[
            {required: true, message: '必填', trigger: 'blur'},
            {validator: validateSid, trigger: 'blur'}
          ],
          frozenBoxCode:[
            {required: true, message: '必填', trigger: 'blur'},
            {validator: validatefrozenBoxCode, trigger: 'blur'}
          ],
          sampleId:[
            {required: true, message: '必填', trigger: 'blur'},
            {validator: validateSampleId, trigger: 'blur'}
          ],
          sampleType:{required: true, message: '必填', trigger: 'change'},
          collectStatusDateBySql:{required: true, message: '必填', trigger: 'change'},
          sampleColumn:{required: true, message: '必填', trigger: 'change'},
          sampleLine:{required: true, message: '必填', trigger: 'change'},
          sampleNote:{required: false, message: '必填', trigger: 'blur'},
        },
        insertFormRule: {
          frozenBoxCode:[
            {required: true, message: '必填', trigger: 'blur'},
            {validator: validatefrozenBoxCode, trigger: 'blur'}
          ],
          sampleId:[
            {required: true, message: '必填', trigger: 'blur'},
            {validator: validateSampleId, trigger: 'blur'}
          ],
          collectStatusDateBySql:{required: true, message: '必填', trigger: 'change'},
          sampleColumn:{required: true, message: '必填', trigger: 'change'},
          sampleLine:{required: true, message: '必填', trigger: 'change'},
          sampleNote:{required: false, message: '必填', trigger: 'blur'},
        },
        formLabelWidth: '180px',
        sampleColumnOptions:[
          {
            label:'A',
            value:'A'
          },
          {
            label:'B',
            value:'B'
          },
          {
            label: 'C',
            value: 'C'
          },
          {
            label: 'D',
            value: 'D'
          },
        ],
        sampleLineOptions:[
          {
            label:1,
            value:1
          },
          {
            label:2,
            value:2
          },
          {
            label:3,
            value:3
          },
          {
            label:4,
            value:4
          },
        ],
        sampleType:''

      }
    },
    mounted(){
      let obj = this.checkPageAuth(this,"uncompletedBloodList_page",this.btnAuth)
      this.query(this.$store.state.uncompletedfecalListPageNo,this.$store.state.uncompletedfecalListPageSize);
    },
    beforeDestroy(){
      this.$store.state.uncompletedfecalListPageNo=1;
      this.$store.state.uncompletedfecalListPageSize=10;
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
      //获取今天日期
      getToday(){
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        this.insertForm.surveyDate = currentdate
      },
      //录入样本弹窗
      openInsertDialog(row){
        this.insertDialog = true
        this.insertForm.id = row.id
        this.sampleType = row.sampleType
        this.insertForm.sampleId = row.sampleIdHeader
        this.insertForm.frozenBoxCode = row.frozenBoxCodeHeader
        $axios_http({
          url: "/base/area/sample/result/querySampleId",
          data:{
            associatedSampleId:row.associatedSampleId
          },
          vueObj: this
        }).then((res) => {
          if(res.data.data!=null) {
            this.insertForm.sampleId = res.data.data
            this.disabled=true
          }

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
      getSidInfo(){
        this.addForms.sampleId = 'CS'+this.addForms.sid.slice(2,3)
        this.addForms.frozenBoxCode = 'CS'+this.addForms.sid.slice(2,3)
        this.getSidInfo1(this.addForms.sampleType)
      },
      getSidInfo1(value){
        this.addForms.frozenBoxCode = 'CS'+this.addForms.sid.slice(2,3)
        this.sampleColumnOptions = this.checkTable
        if(value == 'S'){
          this.addForms.frozenBoxCode += 'S'
          this.sampleLineOptions = this.checkCount1
        }else if(value == 'P'){
          this.addForms.frozenBoxCode += 'P'
          this.sampleLineOptions = this.checkCount1
        }else if(value == 'W'){
          this.addForms.frozenBoxCode += 'W'
          this.sampleLineOptions = this.checkCount
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
              return true
            }else {
              return false
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
          this.query(this.$store.state.uncompletedfecalListPageNo,this.$store.state.uncompletedfecalListPageSize)
        })
      },
      cancel(formName){
        this.insertDialog = false
        this.$refs[formName].resetFields();
      },
      cancelAddForm(formName){
        this.addFormDialog = false
        this.$refs[formName].resetFields();
      },
      //查询
      queryDepartMent(){
        $axios_http({
          url:"/base/department/underling/hospital/query",
          data:{
          },
          vueObj:this
        }).then((res)=>{
          this.deptGroup = res.data.data
        })
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
              this.insertDialog = false
              this.$refs[formName].resetFields();
              this.query(this.$store.state.uncompletedfecalListPageNo,this.$store.state.uncompletedfecalListPageSize)
            })
          }
        })
      },
      addData(formName){
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
              this.query(this.$store.state.uncompletedfecalListPageNo,this.$store.state.uncompletedfecalListPageSize)
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
          url:"/base/hospital/person/bloodSample/notification/result/query",
          data:{
            name:this.qc.name,
            sid:this.qc.sid,
            phone:this.qc.phone,
            sex:this.qc.sex,
            group:this.qc.group,
            sampleType:this.qc.sampleType,
            communityDeptId:this.qc.communityDeptId,
            loginName:this.qc.loginName,
            sampleTypeAll3:this.qc.sampleTypeAll3,
            followGroup:this.qc.followGroup,
            delayFlag:this.$route.query.flag == 1?1:null,
            pageNo:pageNo,//当前页
            pageSize:pageSize//每页条数
          },
          vueObj:this
        }).then((res)=>{
          this.$store.commit('get_uncompletedfecalListPageNo',pageNo)
          this.queryResult.tableData=res.data.data;
          this.queryResult.totalPageCount=res.data.pageInfo.totalPageCount//获取总共多少页
          this.queryResult.totalRowCount=res.data.pageInfo.totalRowCount//获取总共条数
        })
      },
      //重置检索条件
      reset(){
        Object.assign(this.$data.qc, this.$options.data().qc)
        this.ids = []
        this.query(this.$store.state.uncompletedfecalListPageNo,this.$store.state.uncompletedfecalListPageSize)
      },
      //每页显示查询结果条数变更事件，做重新查询操作
      pageSizeChange(pageSize) {
        this.$store.commit('get_uncompletedfecalListPageSize', pageSize)
       this.query(this.$store.state.uncompletedfecalListPageNo,pageSize);
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        this.$store.commit('get_uncompletedfecalListPageNo',currentPage)
        //this.queryResult.pageNo = currentPage
        this.query(currentPage,this.$store.state.uncompletedfecalListPageSize);
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
  .clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}
  .filter-item{
    width:200px;
    margin-right:10px;
  }
</style>
