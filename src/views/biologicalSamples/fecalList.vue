<template>
  <div slot="right" class="content-page" v-if="fecalList_page">
    <div class="content">
      <div class="filter-container">
        <router-link to="/home/areaHome">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
        <el-form :model="qc" :inline=true class="clear">
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
              placeholder="所属区"
              :props="props"
              v-model="ids"
              size="small"
              filterable
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
            <el-button size="small" type="primary" icon="el-icon-search" @click="query(1,$store.state.fecalListPageSize)">查询</el-button>
            <el-button  type="primary" size="small" icon="el-icon-close" @click="reset" >重置</el-button>
          </div>
        </el-form>
      </div>

      <el-dialog :visible.sync="addFormDialog" title="粪便样本" :show-close="false">
        <el-form :model="addForms" :rules="addFormRules" ref="addForms" >
          <el-form-item label="SID" :label-width="formLabelWidth" prop="sid" >
            <el-input v-model="addForms.sid" auto-complete="off" class="notification-input" @blur="getSidInfo()"></el-input>
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
          <el-button  size="small" type="primary" icon="el-icon-plus" @click="add()" >新增</el-button>
           <el-button size="small" type="primary" icon="el-icon-document"
                     >
            <a :href="downloadUrl">导出EXCEL</a>
          </el-button>
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
            prop="phone"
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
              <el-button type="text" class="btnStyle" @click="openInsertDialog(scope.row)" v-if="scope.row.collectStatus == -1">录入</el-button>
              <el-button type="text" class="btnStyle" @click="openCancel(scope.row)" v-if="scope.row.collectStatus == -1">未提供</el-button>
              <el-button type="text" @click="applyEdit(scope.row)" v-if="scope.row.collectStatus == 1 && scope.row.applyStatus==0 && !(scope.row.courierStatus==1 || scope.row.courierStatus==3)">申请编辑</el-button>
              <el-button type="text" 
              @click="del(scope.row)" 
              v-if="scope.row.collectStatus == 1 && scope.row.applyStatus==0 && !(scope.row.courierStatus==1 || scope.row.courierStatus==3)">删除</el-button>
              <el-button type="text" @click="updateCourierResult(scope.row)"  v-if="scope.row.editStatus==1">编辑</el-button>
              <!-- <el-button type="text" size="small" v-if="scope.row.applyStatus==1" :disabled="true">申请编辑</el-button> -->
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
                :current-page="$store.state.fecalListPageNo"
                :page-sizes="[10, 20, 50, 100]"
                v-bind:page-size="$store.state.fecalListPageSize"
                layout="total, sizes, prev, pager, next, jumper"
                v-bind:total="queryResult.totalRowCount">
              </el-pagination>
            </div>
          </div></el-col>
        </el-row>
        <!-- 申请编辑弹窗 -->
        <applyOpen ref="applyOpenVisible" :applyArr="applyArr"></applyOpen>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import applyOpen from "../components/applyDialog";
import DICTIONARY from "@/utils/dictionary.js";
export default {
  data() {
    var validateSid = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("SID不能为空"));
      } else if (!/^TC[0-9]{5}$/.test(value)) {
        callback(new Error("SID格式不正确"));
      } else {
        $axios_http({
          url: "/base/hospital/person/info/checkSid/" + this.addForms.sid,
          data: {},
          vueObj: this
        }).then(res => {
          if (res.data.statusCode == "880005") {
            callback(new Error("该系统不存在SID"));
          } else {
            callback();
          }
        });
      }
    };
    var validateSampleId = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("SID不能为空"));
      } else if (!/^CS[0-9]{5}$/.test(value)) {
        callback(new Error("样本ID格式不正确"));
      } else {
        callback();
      }
    };
    var validatefrozenBoxCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("冷冻盒编号不能为空"));
      } else if (!/^CS[0-9]{1}F[0-9]{3}$/.test(value)) {
        callback(new Error("冷冻盒编号格式不正确"));
      } else {
        callback();
      }
    };
    return {
      applyArr: {}, //申请编辑快递相关信息
      editBtn: false,
      addFormDialog: false,
      insertDialog: false,
      quitDialog: false,
      notificationFormSeeDialog: false,
      fecalList_page: false,
      downloadUrl:
        SERVER_NAME + "/base/hospital/sample/stoolSampleQueryExcel?type=stool",
      btnAuth: {
        one_colonscopyList_btn: false,
        colonscopyList_query_btn: false,
        colonscopyList_EXCEL_btn: false,
        colonscopyList_add_btn: false
      },
      //查询条件
      qc: {
        name: "",
        sex: null,
        phone: "",
        sid: "",
        group: null,
        sampleType: "F",
        sampleId: null,
        frozenBoxCode: null,
        courierStatus: null,
        collectStatus: null,
        communityDeptId: null,
        loginName: null,
        collectStatusStartDate: null,
        collectStatusEndDate: null,
        followState:null,
        followGroup:null,
      },
      followGroup:DICTIONARY.followGroup,
      followStatus:DICTIONARY.followStatus,
      //查询结果
      queryResult: {
        pageNo: 1, //当前页
        pageSize: 10, //每页的条数
        totalPageCount: 0,
        tableData: []
      },
      insertForm: {
        frozenBoxCode: "CS",
        sampleId: "CS",
        collectStatus: "1",
        collectStatusDateBySql: "",
        sampleColumn: "",
        sampleLine: "",
        sampleNote: "",
        id: ""
      },
      id: "",
      insertFormRules: {
        reserveable: { required: true, message: "必填", trigger: "change" },
        deptName: { required: true, message: "必填", trigger: "blur" },
        examinationName: { required: true, message: "必填", trigger: "blur" },
        period: [{ required: false, message: "必填", trigger: "blur" }],
        name: [{ required: false, message: "必填", trigger: "blur" }]
      },
      props: {
        value: "id",
        children: "child",
        label: "name"
      },
      ids: [],

      addForms: {
        sid: "TC",
        frozenBoxCode: "",
        sampleId: "",
        sampleType: "F",
        collectStatusDateBySql: "",
        sampleColumn: "",
        sampleLine: "",
        sampleNote: ""
      },
      multipleTable: [],
      deptGroup: [],
      addFormRules: {
        sid: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validateSid, trigger: "blur" }
        ],
        frozenBoxCode: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validatefrozenBoxCode, trigger: "blur" }
        ],
        sampleId: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validateSampleId, trigger: "blur" }
        ],
        sampleType: { required: true, message: "必填", trigger: "change" },
        collectStatusDateBySql: {
          required: true,
          message: "必填",
          trigger: "change"
        },
        sampleColumn: { required: true, message: "必填", trigger: "change" },
        sampleLine: { required: true, message: "必填", trigger: "change" },
        sampleNote: { required: false, message: "必填", trigger: "blur" }
      },
      insertFormRule: {
        frozenBoxCode: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validatefrozenBoxCode, trigger: "blur" }
        ],
        sampleId: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validateSampleId, trigger: "blur" }
        ],
        collectStatusDateBySql: {
          required: true,
          message: "必填",
          trigger: "change"
        },
        sampleColumn: { required: true, message: "必填", trigger: "change" },
        sampleLine: { required: true, message: "必填", trigger: "change" },
        sampleNote: { required: false, message: "必填", trigger: "blur" }
      },
      formLabelWidth: "180px",
      sampleColumnOptions: [
        {
          label: "A",
          value: "A"
        },
        {
          label: "B",
          value: "B"
        },
        {
          label: "C",
          value: "C"
        },
        {
          label: "D",
          value: "D"
        }
      ],
      sampleLineOptions: [
        {
          label: 1,
          value: 1
        },
        {
          label: 2,
          value: 2
        },
        {
          label: 3,
          value: 3
        },
        {
          label: 4,
          value: 4
        }
      ],
      disabled: false
    };
  },
  components: {
    applyOpen
  },
  mounted() {
    let obj = this.checkPageAuth(this, "fecalList_page", this.btnAuth);
    this.qc.sid = this.$route.query.sid;
    this.query(
      this.$store.state.fecalListPageNo,
      this.$store.state.fecalListPageSize
    );
  },
  beforeDestroy() {
    this.$store.state.fecalListPageNo = 1;
    this.$store.state.fecalListPageSize = 10;
  },
  methods: {
    // 申请编辑
    applyEdit(row) {
      this.$refs.applyOpenVisible.applyOpenVisible = true;
      this.applyArr.id = row.id;
      this.applyArr.formType = "HOSPITAL_BIOLOGICAL_SAMPLE_RESULT";
    },
    updateCourierResult(row) {
      this.disabled = false;
      this.insertDialog = true;
      this.editBtn = true;
      this.insertForm.id = row.id;
      $axios_http({
        url: "/base/area/sample/result/querySampleIdByMF",
        data: {
          id: row.id,
          sampleType: row.sampleType
        },
        vueObj: this
      }).then(res => {
        this.insertForm.collectStatusDateBySql = new Date(
          res.data.data[0].collectStatusDate
        );
        this.insertForm.sampleId = res.data.data[0].sampleId;
        this.insertForm.frozenBoxCode = res.data.data[0].frozenBoxCode;
        this.insertForm.sampleColumn = res.data.data[0].sampleColumn;
        this.insertForm.sampleLine = res.data.data[0].sampleLine;
        this.insertForm.sampleNote = res.data.data[0].sampleNote;
      });
    },
    //获取选中区
    getQcId(value) {
      this.qc.communityDeptId = null;
      this.qc.loginName = null;
      if (value.length == 1) {
        this.qc.communityDeptId = value[0];
        this.qc.loginName = null;
      } else if (value.length == 2) {
        this.qc.communityDeptId = value[0];
        for (let j = 0; j < this.$store.state.regionOptions.length; j++) {
          if (value[0] == this.$store.state.regionOptions[j].id) {
            for (
              let k = 0;
              k < this.$store.state.regionOptions[j].child.length;
              k++
            ) {
              if (value[1] == this.$store.state.regionOptions[j].child[k].id) {
                this.qc.loginName = this.$store.state.regionOptions[j].child[
                  k
                ].loginName;
              }
            }
          }
        }
      }else{
        this.qc.loginName = null;
      }
    },
    //录入样本弹窗
    openInsertDialog(row) {
      this.disabled = false;
      this.insertDialog = true;
      this.insertForm.id = row.id;
      this.sampleType = row.sampleType;
      this.insertForm.sampleId = row.sampleIdHeader;
      this.insertForm.frozenBoxCode = row.frozenBoxCodeHeader;
      $axios_http({
        url: "/base/area/sample/result/querySampleId",
        data: {
          associatedSampleId: row.associatedSampleId
        },
        vueObj: this
      }).then(res => {
        if (res.data.data != null) {
          this.disabled = true;
          this.insertForm.sampleId = res.data.data;
        }
      });
    },
    //一键处理弹窗
    openQuitDialog() {
      if (this.quitForms.length > 0) {
        this.quitDialog = true;
      } else {
        this.$message({
          type: "warning",
          message: "请至少选择一人"
        });
      }
    },
    getSidInfo() {
      let num = this.addForms.sid.slice(2, 3);
      if (num == 6) {
        num = 1;
      }
      this.addForms.sampleId = "CS" + num;
      this.addForms.frozenBoxCode = "CS" + num + "F";
    },
    getInfo(value) {
      if (this.addForms.sid) {
        $axios_http({
          url: "/base/hospital/person/detail/get/" + this.addForms.sid,
          data: {},
          vueObj: this
        }).then(res => {
          if (res.data.data.base) {
            this.addForms.name = res.data.data.base.name;
            this.addForms.phone = res.data.data.base.phone;
            return true;
          } else {
            return false;
            this.addForms.name = "";
            this.addForms.phone = "";
            this.$message({
              type: "error",
              message: "您输入的SID不在系统中，请重新输入"
            });
          }
        });
      }
    },
    //一键处理退出
    cancelQuit() {
      this.quitDialog = false;
    },
    openCancel(row) {
      this.quitDialog = true;
      this.id = row.id;
    },
    submit() {
      $axios_http({
        url: "/base/area/sample/result/addSampleResult",
        data: {
          id: this.id,
          collectStatus: 2
        },
        vueObj: this
      }).then(res => {
        this.quitDialog = false;
        this.query(
          this.$store.state.fecalListPageNo,
          this.$store.state.fecalListPageSize
        );
      });
    },
    cancel(formName) {
      this.insertDialog = false;
      this.editBtn = false;
      this.$refs[formName].resetFields();
    },
    cancelAddForm(formName) {
      this.addFormDialog = false;
      this.$refs[formName].resetFields();
    },
    changeData(selection) {
      this.quitForms.sid = [];
      for (let i = 0; i < selection.length; i++) {
        this.quitForms.push(selection[i].sid);
      }
    },
    changeDataAll(selection) {
      this.quitForms.sid = [];
      for (let i = 0; i < selection.length; i++) {
        this.quitForms.push(selection[i].sid);
      }
    },
    insert(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.editBtn == true) {
            // 编辑
            $axios_http({
              url: "/base/area/sample/result/updateSampleResult",
              data: {
                frozenBoxCode: this.insertForm.frozenBoxCode,
                sampleId: this.insertForm.sampleId,
                collectStatus: this.insertForm.collectStatus,
                collectStatusDateBySql: this.insertForm.collectStatusDateBySql,
                sampleColumn: this.insertForm.sampleColumn,
                sampleLine: this.insertForm.sampleLine,
                sampleNote: this.insertForm.sampleNote,
                id: this.insertForm.id
              },
              vueObj: this
            }).then(res => {
              $successMsg(this, "添加成功");
              this.insertDialog = false;
              this.editBtn = false;
              this.$refs[formName].resetFields();
              this.query(
                this.$store.state.fecalListPageNo,
                this.$store.state.fecalListPageSize
              );
            });
          } else {
            // 提交
            $axios_http({
              url: "/base/area/sample/result/addSampleResult",
              data: {
                frozenBoxCode: this.insertForm.frozenBoxCode,
                sampleId: this.insertForm.sampleId,
                collectStatus: this.insertForm.collectStatus,
                collectStatusDateBySql: this.insertForm.collectStatusDateBySql,
                sampleColumn: this.insertForm.sampleColumn,
                sampleLine: this.insertForm.sampleLine,
                sampleNote: this.insertForm.sampleNote,
                id: this.insertForm.id
              },
              vueObj: this
            }).then(res => {
              $successMsg(this, "添加成功");
              this.insertDialog = false;
              this.$refs[formName].resetFields();
              this.query(
                this.$store.state.fecalListPageNo,
                this.$store.state.fecalListPageSize
              );
            });
          }
        }
      });
    },
    addData(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          $axios_http({
            url: "/base/hospital/biological/sample/addSample",
            data: {
              sid: this.addForms.sid,
              frozenBoxCode: this.addForms.frozenBoxCode,
              sampleId: this.addForms.sampleId,
              sampleType: this.addForms.sampleType,
              collectStatusDateBySql: this.addForms.collectStatusDateBySql,
              sampleColumn: this.addForms.sampleColumn,
              sampleLine: this.addForms.sampleLine,
              sampleNote: this.addForms.sampleNote
            },
            vueObj: this
          }).then(res => {
            $successMsg(this, "添加成功");
            this.addFormDialog = false;
            this.$refs["addForms"].resetFields();
            this.query(1, this.$store.state.fecalListPageSize);
          });
        }
      });
    },
    add() {
      this.addFormDialog = true;
    },
    del(row) {
      this.$confirm("确定删除该受试者粪便样本?", "提示", {
        closeOnClickModal: false,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          $axios_http({
            url: "/base/area/sample/delete",
            data: { id: row.id },
            vueObj: this
          }).then(res => {
            $successMsg(this, "删除成功");
            this.query(
              this.$store.state.fecalListPageNo,
              this.$store.state.fecalListPageSize
            );
          });
        })
        .catch(() => {});
    },
    //查询
    query(pageNo, pageSize) {
      $axios_http({
        url: "/base/area/biological/sample/query",
        data: {
          name: this.qc.name,
          sid: this.qc.sid,
          phone: this.qc.phone,
          sex: this.qc.sex,
          frozenBoxCode: this.qc.frozenBoxCode,
          group: this.qc.group,
          sampleType: this.qc.sampleType,
          sampleId: this.qc.sampleId,
          collectStatus: this.qc.collectStatus,
          courierStatus: this.qc.courierStatus,
          communityDeptId: this.qc.communityDeptId,
          loginName: this.qc.loginName,
          sampleTypeAll3: this.qc.sampleTypeAll3,
          collectStatusStartDate: this.qc.collectStatusStartDate,
          collectStatusEndDate: this.qc.collectStatusEndDate,
          followState:this.qc.followState,
          followGroup:this.qc.followGroup,
          pageNo: pageNo, //当前页
          pageSize: pageSize //每页条数
        },
        vueObj: this
      }).then(res => {
        this.$store.commit("get_fecalListPageNo", pageNo);
        this.queryResult.tableData = res.data.data;
        this.queryResult.totalPageCount = res.data.pageInfo.totalPageCount; //获取总共多少页
        this.queryResult.totalRowCount = res.data.pageInfo.totalRowCount; //获取总共条数
      });
    },
    //重置检索条件
    reset() {
      Object.assign(this.$data.qc, this.$options.data().qc);
      this.ids = [];
      this.query(
        this.$store.state.fecalListPageNo,
        this.$store.state.fecalListPageSize
      );
    },
    //每页显示查询结果条数变更事件，做重新查询操作
    pageSizeChange(pageSize) {
      this.$store.commit("get_fecalListPageSize", pageSize);
      //this.queryResult.pageSize = pageSize
      this.query(this.$store.state.fecalListPageNo, pageSize);
    },
    //切换当前页事件，做重新查询操作
    currentPageChange(currentPage) {
      this.$store.commit("get_fecalListPageNo", currentPage);
      //this.queryResult.pageNo = currentPage
      this.query(currentPage, this.$store.state.fecalListPageSize);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  background: #fff;
  padding: 10px;
}
.checkbox {
  display: block;
  margin-left: 20px;
  font-weight: normal;
}
.btnStyle {
  padding-left: 10px;
}
.return-home {
  display: block;
  text-align: center;
  float: left;
  margin-bottom: 20px;
}
.table-btn-grooup {
  margin-top: 20px;
  margin-bottom: 10px;
}
.subjectsName {
  position: relative;
}
.corner {
  width: 20px;
  height: 20px;
  line-height: 20px;
  position: absolute;
  right: 10px;
  top: 0px;
  display: block;
  border-radius: 10px;
  text-align: center;
  background: #f56a00;
  color: #fff;
}
.notification-input {
  width: 220px;
}
.clearfloat:after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}
.filter-item {
  width: 200px;
  margin-right: 10px;
}
.fecal-title-dialog {
}
</style>
