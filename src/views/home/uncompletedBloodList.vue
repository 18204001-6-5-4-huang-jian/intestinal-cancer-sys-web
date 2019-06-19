<template>
  <div slot="right" class="content-page" v-if="uncompletedBloodList_page">
    <h4>待办-待录入血液样本</h4>
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
          <el-select v-model="qc.followGroup" clearable placeholder="随访分组" size="small" class="filter-item">
              <el-option v-for="(item,index) in followGroup" 
              :key="index" 
              :value="item.id" 
              :label="item.name"></el-option>
            </el-select>
           <div>
             <el-button size="small" type="primary" icon="el-icon-search" @click="query(1,$store.state.uncompletedbloodListPageSize)">查询</el-button>
             <el-button  type="primary" size="small" icon="el-icon-close" @click="reset" >重置</el-button>
           </div>
        </el-form>
      </div>
      <el-dialog
        title="血液样本"
        :visible.sync="addVisible"
        width="70%"
        :before-close="handleClose1">
        <el-form :model="addForm" :rules="addFormRule" ref="addForm" :inline="true">
          <el-form-item label="采样日期" :label-width="formLabelWidth" prop="collectStatusDateBySql" >
            <el-date-picker
              v-model="addForm.collectStatusDateBySql"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="采样日期"
              size="small"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="样本ID" :label-width="formLabelWidth" prop="sampleId">
            <el-input v-model="addForm.sampleId" auto-complete="off" :disabled="disabled" class="notification-input" size="small"></el-input>
          </el-form-item>
          <div >
            <div v-for="item,index in addForm.hospitalBiologicalSampleResultPOList" class="clearfloat" >
              <el-form :model="item" :rules="formRule" ref="forms" :inline="true">
                <el-form-item :label="item.name" :label-width="formLabelWidth" prop="sampleId" style="float: left;">
                  <el-checkbox v-model="item.checklist" @change="changeList1(item,index)"></el-checkbox>
                </el-form-item>
                <el-form-item label="冷冻盒编号" label-width="120px" prop="frozenBoxCode" style="float: left;">
                  <el-input v-model="item.frozenBoxCode" :disabled="!item.checklist" auto-complete="off" class="notification-input" size="mini" style="width: 120px;"></el-input>
                </el-form-item>
                <div>
                  <div class="clearfloat" style="float: left;" v-if="item.sampleType == 'W'">
                    <el-form-item  label="位置" label-width="50px" prop="num" style="float: left;">
                      <el-cascader
                        separator=""
                        :disabled="!item.checklist"
                        :options="sampleColumnOption"
                        v-model="item.num"
                        @change="handleChange(item)"
                        placeholder=""
                        size="mini"
                        style="width: 70px;">
                      </el-cascader>
                    </el-form-item>
                  </div>
                  <div class="clearfloat" style="float: left;" v-else>
                    <el-form-item  label="位置" label-width="50px" prop="num" style="float: left;">
                      <el-cascader
                        separator=""
                        :options="sampleColumnOptions"
                        :disabled="!item.checklist"
                        v-model="item.num"
                        placeholder=""
                        @change="handleChange(item)"
                        size="mini"
                        style="width: 70px;">
                      </el-cascader>
                      <el-input v-model="item.sampleColumnAndLine[1]" disabled auto-complete="off" style="width:50px;margin-left: 20px"  size="mini"></el-input>
                      <el-input v-model="item.sampleColumnAndLine[2]" disabled auto-complete="off" style="width:50px;margin-left: 20px"  size="mini"></el-input>
                      <el-input v-model="item.sampleColumnAndLine[3]" disabled auto-complete="off" style="width:50px;margin-left: 20px"  size="mini"></el-input>
                      <el-input v-model="item.sampleColumnAndLine[4]" disabled auto-complete="off" style="width:50px;margin-left: 20px"  size="mini"></el-input>
                    </el-form-item>
                  </div>
                </div>

              </el-form>
            </div>
            <el-form-item label="备注" :label-width="formLabelWidth" prop="sampleNote">
              <el-input v-model="addForm.sampleNote" auto-complete="off"  class="notification-input" size="small"></el-input>
            </el-form-item>
          </div>

          <div class="dialog-footer" style="text-align: center;">
            <el-button size="small" type="primary" @click="addData('addForm')">提交</el-button>
            <el-button size="small" @click="cancelAddForm('addForm')">取 消</el-button>
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
          <el-table-column
            label="随访分组"
            >
            <template slot-scope="scope">
              <span>{{scope.row.followGroup | followGroup}}</span>
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
                :current-page="$store.state.uncompletedbloodListPageNo"
                :page-sizes="[10, 20, 50, 100]"
                v-bind:page-size="$store.state.uncompletedbloodListPageSize"
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
        } else if (!(/^CS[0-9]{1}[SWP]{1}[0-9]{3}$/.test(value))) {
          callback(new Error('冷冻盒编号格式不正确'))
        } else{
            callback()

        }
      };
      return {
        followGroup:DICTIONARY.followGroup,
        disabled:false,
        addFormDialog:false,
        addVisible:false,
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
          "followGroup":null,
          "loginName":null,
          "sampleTypeAll3":'A',
        },
        //查询结果
        "queryResult":{
          "pageNo":1,//当前页
          "pageSize":10,//每页的条数
          "totalPageCount":0,
          "tableData":[]
        },
        props: {
          value: 'id',
          children: 'child',
          label:'name'
        },
        ids:[],
        formRule:{
          frozenBoxCode:[
            {required: true, message: '必填', trigger: 'blur'},
            {validator: validatefrozenBoxCode, trigger: 'blur'}
          ],
          num:[
            {required: true, message: '必填', trigger: 'blur'},
          ],
        },
        sampleColumnOption:[
          {
            value:'A',
            label:'A',
            children:[
              {
                value:'1',
                label:'1',
              },
              {
                value:'2',
                label:'2',
              },
              {
                value:'3',
                label:'3',
              },
              {
                value:'4',
                label:'4',
              },
              {
                value:'5',
                label:'5',
              },
              {
                value:'6',
                label:'6',
              },
              {
                value:'7',
                label:'7',
              },
              {
                value:'8',
                label:'8',
              },
              {
                value:'9',
                label:'9',
              },
              {
                value:'10',
                label:'10',
              },

            ]
          },
          {
            value:'B',
            label:'B',
            children:[
              {
                value:'1',
                label:'1',
              },
              {
                value:'2',
                label:'2',
              },
              {
                value:'3',
                label:'3',
              },
              {
                value:'4',
                label:'4',
              },
              {
                value:'5',
                label:'5',
              },
              {
                value:'6',
                label:'6',
              },
              {
                value:'7',
                label:'7',
              },
              {
                value:'8',
                label:'8',
              },
              {
                value:'9',
                label:'9',
              },
              {
                value:'10',
                label:'10',
              },

            ]
          },
          {
            value:'C',
            label:'C',
            children:[
              {
                value:'1',
                label:'1',
              },
              {
                value:'2',
                label:'2',
              },
              {
                value:'3',
                label:'3',
              },
              {
                value:'4',
                label:'4',
              },
              {
                value:'5',
                label:'5',
              },
              {
                value:'6',
                label:'6',
              },
              {
                value:'7',
                label:'7',
              },
              {
                value:'8',
                label:'8',
              },
              {
                value:'9',
                label:'9',
              },
              {
                value:'10',
                label:'10',
              },

            ]
          },
          {
            value:'D',
            label:'D',
            children:[
              {
                value:'1',
                label:'1',
              },
              {
                value:'2',
                label:'2',
              },
              {
                value:'3',
                label:'3',
              },
              {
                value:'4',
                label:'4',
              },
              {
                value:'5',
                label:'5',
              },
              {
                value:'6',
                label:'6',
              },
              {
                value:'7',
                label:'7',
              },
              {
                value:'8',
                label:'8',
              },
              {
                value:'9',
                label:'9',
              },
              {
                value:'10',
                label:'10',
              },

            ]
          },
          {
            value:'E',
            label:'E',
            children:[
              {
                value:'1',
                label:'1',
              },
              {
                value:'2',
                label:'2',
              },
              {
                value:'3',
                label:'3',
              },
              {
                value:'4',
                label:'4',
              },
              {
                value:'5',
                label:'5',
              },
              {
                value:'6',
                label:'6',
              },
              {
                value:'7',
                label:'7',
              },
              {
                value:'8',
                label:'8',
              },
              {
                value:'9',
                label:'9',
              },
              {
                value:'10',
                label:'10',
              },

            ]
          },
          {
            value:'F',
            label:'F',
            children:[
              {
                value:'1',
                label:'1',
              },
              {
                value:'2',
                label:'2',
              },
              {
                value:'3',
                label:'3',
              },
              {
                value:'4',
                label:'4',
              },
              {
                value:'5',
                label:'5',
              },
              {
                value:'6',
                label:'6',
              },
              {
                value:'7',
                label:'7',
              },
              {
                value:'8',
                label:'8',
              },
              {
                value:'9',
                label:'9',
              },
              {
                value:'10',
                label:'10',
              },

            ]
          },
          {
            value:'G',
            label:'G',
            children:[
              {
                value:'1',
                label:'1',
              },
              {
                value:'2',
                label:'2',
              },
              {
                value:'3',
                label:'3',
              },
              {
                value:'4',
                label:'4',
              },
              {
                value:'5',
                label:'5',
              },
              {
                value:'6',
                label:'6',
              },
              {
                value:'7',
                label:'7',
              },
              {
                value:'8',
                label:'8',
              },
              {
                value:'9',
                label:'9',
              },
              {
                value:'10',
                label:'10',
              },

            ]
          },
          {
            value:'H',
            label:'H',
            children:[
              {
                value:'1',
                label:'1',
              },
              {
                value:'2',
                label:'2',
              },
              {
                value:'3',
                label:'3',
              },
              {
                value:'4',
                label:'4',
              },
              {
                value:'5',
                label:'5',
              },
              {
                value:'6',
                label:'6',
              },
              {
                value:'7',
                label:'7',
              },
              {
                value:'8',
                label:'8',
              },
              {
                value:'9',
                label:'9',
              },
              {
                value:'10',
                label:'10',
              },

            ]
          },
          {
            value:'I',
            label:'I',
            children:[
              {
                value:'1',
                label:'1',
              },
              {
                value:'2',
                label:'2',
              },
              {
                value:'3',
                label:'3',
              },
              {
                value:'4',
                label:'4',
              },
              {
                value:'5',
                label:'5',
              },
              {
                value:'6',
                label:'6',
              },
              {
                value:'7',
                label:'7',
              },
              {
                value:'8',
                label:'8',
              },
              {
                value:'9',
                label:'9',
              },
              {
                value:'10',
                label:'10',
              },

            ]
          },
          {
            value:'J',
            label:'J',
            children:[
              {
                value:'1',
                label:'1',
              },
              {
                value:'2',
                label:'2',
              },
              {
                value:'3',
                label:'3',
              },
              {
                value:'4',
                label:'4',
              },
              {
                value:'5',
                label:'5',
              },
              {
                value:'6',
                label:'6',
              },
              {
                value:'7',
                label:'7',
              },
              {
                value:'8',
                label:'8',
              },
              {
                value:'9',
                label:'9',
              },
              {
                value:'10',
                label:'10',
              },

            ]
          },
        ],
        sampleColumnOptions:[
          {
            value:'A',
            label:'A',
            children:[
              {
                value:'1',
                label:'1',
              },
              {
                value:'6',
                label:'6',
              },

            ]
          },
          {
            value:'B',
            label:'B',
            children:[
              {
                value:'1',
                label:'1',
              },
              {
                value:'6',
                label:'6',
              },

            ]
          },
          {
            value:'C',
            label:'C',
            children:[
              {
                value:'1',
                label:'1',
              },
              {
                value:'6',
                label:'6',
              },

            ]
          },
          {
            value:'D',
            label:'D',
            children:[
              {
                value:'1',
                label:'1',
              },
              {
                value:'6',
                label:'6',
              },

            ]
          },
          {
            value:'E',
            label:'E',
            children:[
              {
                value:'1',
                label:'1',
              },
              {
                value:'6',
                label:'6',
              },

            ]
          },
          {
            value:'F',
            label:'F',
            children:[
              {
                value:'1',
                label:'1',
              },
              {
                value:'6',
                label:'6',
              },

            ]
          },
          {
            value:'G',
            label:'G',
            children:[
              {
                value:'1',
                label:'1',
              },
              {
                value:'6',
                label:'6',
              },

            ]
          },
          {
            value:'H',
            label:'H',
            children:[
              {
                value:'1',
                label:'1',
              },
              {
                value:'6',
                label:'6',
              },

            ]
          },
          {
            value:'I',
            label:'I',
            children:[
              {
                value:'1',
                label:'1',
              },
              {
                value:'6',
                label:'6',
              },

            ]
          },
          {
            value:'J',
            label:'J',
            children:[
              {
                value:'1',
                label:'1',
              },
              {
                value:'6',
                label:'6',
              },

            ]
          },
        ],
        addFormRule:{
          sid:[
            {required: true, message: '必填', trigger: 'blur'},
            {validator: validateSid, trigger: 'blur'}
          ],
          collectStatusDateBySql:[
            {required: true, message: '必填', trigger: 'blur'},
          ],
          sampleId:[
            {required: true, message: '必填', trigger: 'blur'},
            {validator: validateSampleId, trigger: 'blur'}
          ],

        },
        deptGroup:[],
        formLabelWidth: '120px',
        id:'',
        addForm:{
          "id":"",
          "collectStatus":"1",
          "sampleId": "",
          "collectStatusDateBySql": "",
          "hospitalBiologicalSampleResultPOList":
            [{
              "bloodSampleId":'',
              "frozenBoxCode": "",
              "checklist":false,
              "selectedOptions":'',
              "num":[],
              "name":'血浆',
              "sampleColumnAndLine": [],
              "sampleType": "P"
            },{
              "bloodSampleId":'',
              "checklist":false,
              "sampleColumnAndLine": [],
              "selectedOptions":'',
              "num":[],
              "sampleType": "S",
              "name":'血清',
              "frozenBoxCode": ""
            },{
              "bloodSampleId":'',
              "frozenBoxCode": "",
              "num":[],
              "checklist":false,
              "name":'白细胞',
              "sampleColumnAndLine": [],
              "sampleType": "W"
            }],
          "sampleType": "A",
          "sampleNote": ""
        },
      }
    },
    mounted(){
      let obj = this.checkPageAuth(this,"uncompletedBloodList_page",this.btnAuth)
      this.query(this.$store.state.uncompletedbloodListPageNo,this.$store.state.uncompletedbloodListPageSize);
    },
    beforeDestroy(){
      this.$store.state.uncompletedbloodListPageNo=1;
      this.$store.state.uncompletedbloodListPageSize=10;
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
      openCancel(row){
        this.quitDialog = true
        this.id = row.id
      },
      cancelQuit(){
        this.quitDialog = false
      },

      cancelAddForm(formName){
        this.addVisible = false
        Object.assign(this.$data.addForm, this.$options.data().addForm)
        this.$refs['addForm'].resetFields()
        for(let i = 0; i < 3;i++){
          this.$refs.forms[i].resetFields()
          this.addForm.hospitalBiologicalSampleResultPOList[i].checklist = false
        }
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
         this.query(this.$store.state.uncompletedbloodListPageNo,this.$store.state.uncompletedbloodListPageSize);
        })
      },
      cancel(formName){
          this.insertDialog = false
          this.$refs[formName].resetFields();
        },
      addData(formName){
        var validd = true
        this.$refs[formName].validate((valid) => {
          if (valid) {
            for(let i =0;i<this.addForm.hospitalBiologicalSampleResultPOList.length;i++){
              if(this.addForm.hospitalBiologicalSampleResultPOList[i].checklist == true){
                var item = this.$refs.forms[i]
                item.validate((valid) => {
                  if (!valid){
                    validd = false
                    return
                  }
                })
              }

            }
            if(validd){
              $axios_http({
                url: "/base/area/sample/result/addSampleResult",
                data:this.addForm,
                vueObj: this
              }).then((res) => {
                $successMsg(this, "录入成功")
                this.addVisible = false
                this.query(this.$store.state.uncompletedbloodListPageNo,this.$store.state.uncompletedbloodListPageSize);
              })
            }
          }
        })
      },
      handleClose1(done) {
        Object.assign(this.$data.addForm, this.$options.data().addForm)
        this.$refs['addForm'].resetFields()
        for(let i = 0; i < 3;i++){
          this.$refs.forms[i].resetFields()
          this.addForm.hospitalBiologicalSampleResultPOList[i].checklist = false
        }
        done();
      },
      handleClose2(done) {
        Object.assign(this.$data.insertForm, this.$options.data().insertForm)
        this.$refs['insertForm'].resetFields()
        for(let i = 0; i < 3;i++){
          this.$refs.form[i].resetFields()
          this.insertForm.hospitalBiologicalSampleResultPOList[i].checklist = false
        }
        done();
      },
      handleChange(item){
        console.log(item)
        if(item.sampleType == 'W'){
          item.sampleColumnAndLine=[]
          var obj = ''
          obj = item.num[0]+(item.num[1])
          item.sampleColumnAndLine.push(obj)
        }else{
          item.sampleColumnAndLine=[]
          for(let i =0;i<5;i++){
            var obj = ''
            obj = item.num[0]+(item.num[1]/1+i)
            item.sampleColumnAndLine.push(obj)
          }
        }
        $axios_http({
          url: "/base/area/biological/sample/checkFrozen",
          data:{
            frozenBoxCode:item.frozenBoxCode,
            sampleColumnAndLine:item.sampleColumnAndLine,
            sampleType:item.sampleType
          },
          vueObj: this
        }).then((res) => {

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
          this.$store.commit('get_uncompletedbloodListPageNo',pageNo)
          this.queryResult.tableData=res.data.data;
          this.queryResult.totalPageCount=res.data.pageInfo.totalPageCount//获取总共多少页
          this.queryResult.totalRowCount=res.data.pageInfo.totalRowCount//获取总共条数
        })
      },
      changeList1(item,index){
        if(item.checklist == false){
          item.num = []
          item.frozenBoxCode = ""
          item.sampleColumnAndLine = []
          this.$refs.forms[index].resetFields
        }
      },
      //录入样本弹窗
      openInsertDialog(row){
        this.addVisible = true
        $axios_http({
          url: "/base/area/sample/result/querySampleId",
          data:{
            associatedSampleId:row.associatedSampleId
          },
          vueObj: this
        }).then((res) => {
           let num=''
          num=row.sid.substr(2,1)
          if(num==6){
            num=1
          }
          if(res.data.data!=null) {
            this.addForm.sampleId = res.data.data
            this.disabled = true
          }else{
            this.disabled = false
            this.addForm.sampleId = "CS"+num
          }
        })
        this.addForm.id = row.id
        let num=''
          num=row.sid.substr(2,1)
          if(num==6){
            num=1
          }
        this.addForm.hospitalBiologicalSampleResultPOList[0].bloodSampleId = row.id
        this.addForm.hospitalBiologicalSampleResultPOList[1].bloodSampleId = row.id
        this.addForm.hospitalBiologicalSampleResultPOList[2].bloodSampleId = row.id
        this.addForm.hospitalBiologicalSampleResultPOList[0].frozenBoxCode = "CS"+num+"P"
        this.addForm.hospitalBiologicalSampleResultPOList[1].frozenBoxCode = "CS"+num+"S"
        this.addForm.hospitalBiologicalSampleResultPOList[2].frozenBoxCode = "CS"+num+"W"
      },
      //重置检索条件
      reset(){
        Object.assign(this.$data.qc, this.$options.data().qc)
        this.ids=[]
        this.query(this.$store.state.uncompletedbloodListPageNo,this.$store.state.uncompletedbloodListPageSize);
      },
      //每页显示查询结果条数变更事件，做重新查询操作
      pageSizeChange(pageSize) {
        this.$store.commit('get_uncompletedbloodListPageSize', pageSize)
        this.query(this.$store.state.uncompletedbloodListPageNo,pageSize);
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        this.$store.commit('get_uncompletedbloodListPageNo',currentPage)
        //this.queryResult.pageNo = currentPage
        this.query(currentPage,this.$store.state.uncompletedbloodListPageSize);
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
