<template>
  <div slot="right" class="content-page" v-if="area_person_list_page">
    <div class="content">
      <div class="filter-container">
        <router-link to="/home/areaHome">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
        <el-form :model="qc" :inline=true class="clear">
          <div>
            <el-input  style="width: 200px;" size="small" class="filter-item" clearable placeholder="姓名" v-model="qc.name"></el-input>
            <el-input  style="width: 200px;" size="small" class="filter-item" clearable placeholder="SID" v-model="qc.sid">
            </el-input>
            <el-input  style="width: 200px;" size="small" class="filter-item" clearable placeholder="手机号" v-model="qc.phone">
            </el-input>
            <el-input  style="width: 200px;" size="small" class="filter-item" clearable placeholder="身份证号" v-model="qc.idCard">
            </el-input>
             <el-select v-model="qc.sex" placeholder="请选择性别" size="small" class="filter-item" clearable>
              <el-option value="1" v-bind:key="1" label="男"></el-option>
              <el-option value="2" v-bind:key="2" label="女"></el-option>
            </el-select>
            <el-date-picker
              v-model="qc.inGroupDateStart"
              clearable
              type="date"
              size="small"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="入组日期(起)"
              class="filter-item">
            </el-date-picker>
            <el-date-picker
              v-model="qc.inGroupDateEnd"
              clearable
              type="date"
              size="small"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="入组日期(止)"
              class="filter-item">
            </el-date-picker>
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
            <el-select v-model="qc.group" placeholder="分组方案" size="small" class="filter-item" clearable>
              <el-option value="A" v-bind:key="1" label="A组"></el-option>
              <el-option value="B" v-bind:key="2" label="B组"></el-option>
              <el-option value="C" v-bind:key="3" label="C组"></el-option>
              <el-option value="Cg" v-bind:key="4" label="C组高危"></el-option>
              <el-option value="Cd" v-bind:key="5" label="C组低危"></el-option>
            </el-select>
            <el-select v-model="qc.overallStatusCy" placeholder="总体状态" size="small" class="filter-item" clearable>
              <el-option value="1" v-bind:key="1" label="正常"></el-option>
              <el-option value="2" v-bind:key="2" label="失访"></el-option>
              <el-option value="4" v-bind:key="4" label="死亡"></el-option>
              <el-option value="3" v-bind:key="3" label="患结直肠癌"></el-option>
            </el-select>
            <!-- <el-select v-model="qc.violationPlanStatusCy" placeholder="是否有违反方案" size="small" class="filter-item">
              <el-option value="1" v-bind:key="1" label="有"></el-option>
              <el-option value="2" v-bind:key="2" label="无"></el-option>
            </el-select> -->
            <el-select v-model="qc.followState" clearable placeholder="随访状态" size="small" class="filter-item">
              <el-option v-for="(item,index) in followStatus" 
              :key="index" 
              :value="item.id" 
              :label="item.name"></el-option>
            </el-select>
          <el-select v-model="qc.followGroup" clearable placeholder="随访分组" size="small" class="filter-item">
            <el-option v-for="(item,index) in followGroup" 
            :key="index" 
            :value="item.id" 
            :label="item.name"></el-option>
          </el-select>
           <el-date-picker
              clearable
              v-model="qc.followBegin"
              type="date"
              size="small"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="计划随访开始时间(起)"
              class="filter-item"
              @change="changeFollowbegin">
            </el-date-picker>
             <el-date-picker
              clearable
              v-model="qc.followEnd"
              type="date"
              size="small"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="计划随访开始时间(止)"
              :picker-options="pickerOptionsEnd"
              class="filter-item">
            </el-date-picker>
            <span>
              <el-popover
                placement="bottom"
                width="660"
                trigger="click">
                <el-select v-model="qc.examinationStatus" placeholder="肠镜检查状态" size="small" class="filter-item" clearable>
                  <el-option :value="item.value" :key="item.key" :label="item.label" v-for="item in $store.state.colonscopyCheckStatus"></el-option>
                </el-select>
                <el-select v-model="qc.finishedStatus" placeholder="肠镜完成情况" size="small" class="filter-item" clearable>
                 <el-option :value="item.value" :key="item.key" :label="item.label" v-for="item in $store.state.colonscopyCompleteStatus"></el-option>
                </el-select>
                <el-select v-model="qc.resultStatus" placeholder="肠镜结果录入状态" size="small" class="filter-item" clearable>
                  <el-option :value="item.value" :key="item.key" :label="item.label" v-for="item in $store.state.editStatus"></el-option>
                </el-select>
                <el-select v-model="qc.insertStatus" placeholder="FIT结果录入状态" size="small" class="filter-item" clearable>
                  <el-option :value="item.value" :key="item.key" :label="item.label" v-for="item in $store.state.editStatus"></el-option>
                </el-select>
                <el-select v-model="qc.fitResult" placeholder="FIT结果" size="small" class="filter-item" clearable>
                  <el-option :value="item.value" :key="item.key" :label="item.label" v-for="item in $store.state.fitResult"></el-option>
                </el-select>
                <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="粪便DNA编码" v-model="qc.dnaCode"></el-input>
                <el-select v-model="qc.codeEntryStatus" placeholder="粪便DNA结果返回状态" size="small" class="filter-item" clearable>
                  <el-option :value="item.value" :key="item.key" :label="item.label" v-for="item in $store.state.backResult"></el-option>
                </el-select>
                <!-- <el-select v-model="qc.dnaCheckInformStatus" placeholder="粪便DNA结果审核状态" size="small" class="filter-item">
                  <el-option :value="item.value" :key="item.key" :label="item.label" v-for="item in $store.state.reviewStatus"></el-option>
                </el-select> -->
                <el-select v-model="qc.dnaResult" placeholder="粪便DNA结果" size="small" class="filter-item" clearable>
                  <el-option :value="item.value" :key="item.key" :label="item.label" v-for="item in $store.state.dnaResult"></el-option>
                </el-select>
                <el-button slot="reference" size="mini" type="text" plain>更多<i class="el-icon-arrow-down"></i></el-button>
              </el-popover>
            </span>
          </div>
          <div>
            <el-button  size="small" type="primary" icon="el-icon-search" @click="query(1,$store.state.subjectsListPageSize)" >查询</el-button>
            <el-button  type="primary" size="small" icon="el-icon-close" @click="reset" >重置</el-button>
          </div>
        </el-form>
      </div>

      <div >
        <div class="table-btn-grooup">
          <el-button size="small" type="primary" icon="el-icon-document"
                     >
            <a :href="downloadUrl">导出EXCEL</a>
          </el-button>
          <!--<el-button class="filter-item" type="primary" size="small" icon="el-icon-close">退出研究</el-button>-->
          <!--<el-button class="filter-item" size="small" type="primary" icon="el-icon-search"  v-if="btnAuth.subjectsList_EXCEL_btn">导出EXCEL</el-button>-->
        </div>
        <!-- 退出研究弹窗 -->
        <el-dialog :visible.sync="quitDialog" :show-close="false" >
          <el-form :model="quitForms" :rules="quitFormsRules" ref="quitForms" >
            <el-form-item label="违反时间" :label-width="formLabelWidth" prop="quitDate">
              <el-date-picker
                v-model="quitForms.quitDate"
                type="date"
                :picker-options="pickerOptions1"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="违反时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="违反方案" :label-width="formLabelWidth" prop="reasons">
              <el-radio-group v-model="quitForms.reasons">
                 <el-radio v-for="(item,index) in followCategory" 
                  style="margin-top: 15px;display:block;margin-left:0;"
                  :key="index" 
                  :label="item.id">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <div class="dialog-footer" style="text-align: center;">
              <el-button size="small" type="primary" @click="addQuitData('quitForms')" ref="addBtns" id="subjectsList_quit_btn">提交</el-button>
              <el-button size="small" @click="cancel()">取 消</el-button>
            </div>
          </el-form>
        </el-dialog>
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
          >
          </el-table-column>
          <el-table-column
            label="姓名"
            width="110"
          >
            <template slot-scope="scope">
              <div class="subjectsName">
                <div>
                  {{scope.row.name}}
                </div>
                <span class="corner" v-if="scope.row.violationPlanStatusCy==1">违</span>
              </div>
            </template>
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
            width="60"
            label="年龄"
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
            prop="inGroupDate"
            label="入组日期"
            sortable
            width="160"
          >
          </el-table-column>
          <el-table-column
            prop="followBegin"
            label="计划随访开始时间"
            width="160"
          >
          </el-table-column>
          <el-table-column
            prop="followEnd"
            label="计划随访结束时间"
            width="160"
          >
          </el-table-column>
          <el-table-column
            label="总体状态"
          >
            <template slot-scope="scope">
              <span>{{scope.row.overallStatusCy | overallStatusCy}}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column
            label="DNA结果"
          >
            <template slot-scope="scope">
              <span>{{scope.row.dnaResult | result}}</span>
            </template>
          </el-table-column> -->
          <el-table-column
            label="FIT结果"
          >
            <template slot-scope="scope">
              <span>{{scope.row.fitResult | result}}</span>
            </template>
          </el-table-column>
           <el-table-column
            label="FIT结果录入状态"
            width="130"
          >
            <template slot-scope="scope">
              <span>{{scope.row.insertStatus | codeEntryStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="肠镜检查状态"
            width="110"
          >
            <template slot-scope="scope">
              <span>{{scope.row.examinationStatus | examinationStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="肠镜完成情况"
            width="110"
          >
            <template slot-scope="scope">
              <span>{{scope.row.finishedStatus | finishedStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="肠镜结果录入状态"
            width="140"
          >
            <template slot-scope="scope">
              <span>{{scope.row.resultStatus | codeEntryStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="粪便DNA编码"
            prop='dnaCode'
            width="130"
          >
          </el-table-column>
          
          <el-table-column
            label="粪便DNA结果返回状态"
            width="170"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.codeEntryStatus == 2 && scope.row.dnaCheckInformStatus ==2">已返回</span>
              <span v-if="scope.row.codeEntryStatus == 2 && scope.row.dnaCheckInformStatus != 2">待返回</span>
            </template>
          </el-table-column>
          <el-table-column
            label="粪便DNA结果"
            width="110"
          >
            <template slot-scope="scope">
              <span>{{scope.row.dnaResult | result}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            width="200"
            align="center"
          >
            <template slot-scope="scope">
              <el-button type="text" @click="invite(scope.row)" :disabled="scope.row.followState!=2">开始邀请</el-button>
              <router-link :to="{path:'/subjects/areaSubjectDetail',query:{id:scope.row.sid,overallStatusCy:scope.row.overallStatusCy}}">
                <el-button type="text">查看详情</el-button>
              </router-link>
               <el-button type="text" v-if="btnAuth.subjectsList_quit_btn && scope.row.followState==3 && scope.row.overallStatusCy !=2" @click="openQuitDialog(scope.row)">违反方案</el-button>
               <el-button type="text" v-if="btnAuth.subjectsList_quit_btn && scope.row.violationPlanStatusCy ==1" @click='openInsertDialog(scope.row.sid)'>取消违反</el-button>
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
                :current-page="$store.state.subjectsListPageNo"
                :page-sizes="[10, 20, 50, 100]"
                v-bind:page-size="$store.state.subjectsListPageSize"
                layout="total, sizes, prev, pager, next, jumper"
                v-bind:total="queryResult.totalRowCount">
              </el-pagination>
            </div>
          </div></el-col>
        </el-row>
          <!-- 重新入组确认弹窗 -->
        <el-dialog
          :visible.sync="insertDialogVisible"
          width="30%"
          :before-close="handleClose">
          <span>确定要重新开始随访？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="insertDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmInsert" ref="addBtn" id="addGroupBtn">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 开始邀请弹窗 -->
        <el-dialog :visible.sync="inviteDialog" :show-close="false" width="600px">
          <div>
            <p style="text-align:center;font-weight:bold;">系统将给该受试者发送随访开始通知</p>
            <br>
            <p>短信内容：</p>
            <br>
            <p>【结直肠癌筛查项目】感谢您参加由国家癌症中心/中国医学科学院肿瘤医院联合多家省市肿瘤医院共同实施的中国人群结直肠癌筛查项目！
              您在本项目中的编码为：{{message.sid}}。
              目前第二年度随访工作已经开始，工作人员将会与您联系后续事宜。感谢您的配合和积极参与！</p>
          </div>
          <el-form :model="message" :inline="true" :rules="messageRules" ref="messageForms" >
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="message.phone"></el-input>
            </el-form-item>
            <div class="dialog-footer" style="text-align: center;">
              <el-button size="small" type="primary" @click="sendInvitationFollow('messageForms')">确定</el-button>
              <el-button size="small" @click="inviteDialog = false">取 消</el-button>
            </div>
          </el-form>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import DICTIONARY from "@/utils/dictionary.js";
export default {
  data() {
    return {
      group: DICTIONARY.group,
      followStatus: DICTIONARY.followStatus,
      followGroup: DICTIONARY.followGroup,
      followCategory: DICTIONARY.followCategory,
      isShow: false,
      inviteDialog: false,
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      pickerOptionsEnd:{},
      quitDialog: false,
      insertDialogVisible: false,
      reGroupSid: [],
      deptGroup: [],
      area_person_list_page: false,
      btnAuth: {
        one_subjectsList_btn: false,
        subjectsList_query_btn: false,
        subjectsList_quit_btn: false,
        subjectsList_restart_btn: false,
        subjectsList_add_btn: false
      },
      downloadUrl: SERVER_NAME + "/base/hospital/person/areaUsersQueryExcel",
      quitForms: {
        sid: [],
        reason: [],
        reasons: "",
        quitDate: null
      },
      quitFormsRules: {
        quitDate: { required: true, message: "必填", trigger: "change" },
        reasons: { required: true, message: "必填", trigger: "change" }
      },
      messageRules: {
        phone: { required: true, message: "必填", trigger: "blur" }
      },
      //查询条件
      qc: {
        name: "",
        sex: null,
        phone: "",
        sid: "",
        inGroupDateStart: "",
        inGroupDateEnd: "",
        group: null,
        overallStatusCy: null,
        violationPlanStatusCy: null,
        communityDeptId: null,
        sortParameter: null,
        loginName: null,
        sortRule: null,
        resultStatus: null,
        examinationStatus: null,
        finishedStatus: null,
        fitResult: null,
        insertStatus: null,
        dnaResult: null,
        dnaCode: null,
        codeEntryStatus: null,
        idCard: null,
        followGroup: null,
        followState: null,
        followViolateType: null,
        followBegin:'',
        followEnd:''
      },
      //查询结果
      queryResult: {
        pageNo: 1, //当前页
        pageSize: 10, //每页的条数
        totalPageCount: 0,
        tableData: []
      },
      //编辑表单数据对象
      updateForm: {
        nickName: "",
        phone: "",
        loginName: ""
      },
      userId: "",
      formLabelWidth: "100px",
      props: {
        value: "id",
        children: "child",
        label: "name"
      },
      ids: [],
      message: {
        phone: null,
        sid: null
      }
    };
  },
  mounted() {
    let obj = this.checkPageAuth(this, "area_person_list_page", this.btnAuth);
    this.query(
      this.$store.state.subjectsListPageNo,
      this.$store.state.subjectsListPageSize
    );
  },
  beforeDestroy() {
    this.$store.state.subjectsListPageNo = 1;
    this.$store.state.subjectsListPageSize = 10;
  },
  methods: {
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
    //查询
    query(pageNo, pageSize) {
      $axios_http({
        url: "/base/hospital/person/query",
        data: {
          name: this.qc.name,
          sid: this.qc.sid,
          phone: this.qc.phone,
          sex: this.qc.sex,
          inGroupDateStart: this.qc.inGroupDateStart,
          inGroupDateEnd: this.qc.inGroupDateEnd,
          group: this.qc.group,
          communityDeptId: this.qc.communityDeptId,
          loginName: this.qc.loginName,
          overallStatusCy: this.qc.overallStatusCy,
          violationPlanStatusCy: this.qc.violationPlanStatusCy,
          sortParameter: this.qc.sortParameter,
          sortRule: this.qc.sortRule,
          resultStatus: this.qc.resultStatus,
          examinationStatus: this.qc.examinationStatus,
          finishedStatus: this.qc.finishedStatus,
          fitResult: this.qc.fitResult,
          insertStatus: this.qc.insertStatus,
          dnaResult: this.qc.dnaResult,
          dnaCode: this.qc.dnaCode,
          codeEntryStatus: this.qc.codeEntryStatus,
          idCard: this.qc.idCard,
          followGroup: this.qc.followGroup,
          followState: this.qc.followState,
          followViolateType: this.qc.followViolateType,
          followBegin:this.qc.followBegin,
          followEnd:this.qc.followEnd,
          pageNo: pageNo, //当前页
          pageSize: pageSize //每页条数
        },
        vueObj: this
      }).then(res => {
        this.$store.commit("get_subjectsListPageNo", pageNo);
        this.queryResult.tableData = res.data.data;
        this.queryResult.totalPageCount = res.data.pageInfo.totalPageCount; //获取总共多少页
        this.queryResult.totalRowCount = res.data.pageInfo.totalRowCount; //获取总共条数
      });
    },
    changeTableSort(value) {
      if (value.prop == "inGroupDate") {
        this.qc.sortParameter = "inGroupDate";
      } else if (value.prop == "sid") {
        this.qc.sortParameter = "sid";
      }
      if (value.order == "descending") {
        this.qc.sortRule = "desc";
      } else if (value.order == "ascending") {
        this.qc.sortRule = "asc";
      }
      this.query(
        this.$store.state.subjectsListPageNo,
        this.$store.state.subjectsListPageSize
      );
    },
    //重置检索条件
    reset() {
      Object.assign(this.$data.qc, this.$options.data().qc);
      this.ids = [];
      this.query(
        this.$store.state.subjectsListPageNo,
        this.$store.state.subjectsListPageSize
      );
    },
    //删除一条数据
    del(id) {
      this.$confirm("确认删除数据?", "提示", {
        closeOnClickModal: false,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          $axios_http({
            url: "/base/user/del/" + id,
            vueObj: this
          }).then(res => {
            $successMsg(this, "删除成功");
            this.query();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //每页显示查询结果条数变更事件，做重新查询操作
    pageSizeChange(pageSize) {
      this.$store.commit("get_subjectsListPageSize", pageSize);
      this.query(this.$store.state.subjectsListPageNo, pageSize);
    },
    //切换当前页事件，做重新查询操作
    currentPageChange(currentPage) {
      this.$store.commit("get_subjectsListPageNo", currentPage);
      this.query(currentPage, this.$store.state.subjectsListPageSize);
    },
    openQuitDialog(row) {
      this.quitForms.sid = [];
      this.quitForms.sid.push(row.sid);
      this.quitDialog = true;
    },
    addQuitData(formName) {
      this.quitForms.reason = [];
      this.quitForms.reason.push(this.quitForms.reasons);
      //按钮权限判断
      let _id = this.$refs.addBtn.$attrs.id;
      if (authority(_id)) {
        return;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm(
            "受试者的随访年度状态将改为“失访”，失访后的受试者在各个列表中的数据不可编辑！",
            "提示",
            {
              closeOnClickModal: false,
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }
          )
            .then(() => {
              $axios_http({
                url: "/base/hospital/person/quit",
                data: {
                  reason: this.quitForms.reason,
                  sid: this.quitForms.sid,
                  quitDate: this.quitForms.quitDate
                },
                vueObj: this
              }).then(res => {
                $successMsg(this, "提交成功");
                Object.assign(
                  this.$data.quitForms,
                  this.$options.data().quitForms
                );
                this.quitDialog = false;
                this.confirmGoToForm(res);
              });
            })
            .catch(() => {
              this.quitDialog = false;
              Object.assign(
                this.$data.quitForms,
                this.$options.data().quitForms
              );
            });
        }
      });
    },
    // 确认填写违反方案问卷
    confirmGoToForm(res) {
      this.$confirm("现在去填写E2违反方案表吗?", "提示", {
        closeOnClickModal: false,
        confirmButtonText: "是",
        cancelButtonText: "不,谢谢",
        type: "warning"
      })
        .then(() => {
          this.$router.push({
            path: "/followup/followupE2",
            query: {
              sid: res.data.data[0].sid,
              formId: res.data.data[0].formId,
              flag: 4
            }
          });
        })
        .catch(() => {
          this.query(
            this.$store.state.subjectsListPageNo,
            this.$store.state.subjectsListPageSize
          );
        });
    },
    cancel() {
      this.quitDialog = false;
      Object.assign(this.$data.quitForms, this.$options.data().quitForms);
    },
    handleClose(done) {
      done();
    },
    // 开始邀请
    invite(row) {
      this.inviteDialog = true;
      this.message.phone = row.phone;
      this.message.sid = row.sid;
    },
    // 发送开始邀请短信
    sendInvitationFollow(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          $axios_http({
            url: "/base/follow/sendInvitationFollow",
            data: Object.assign({}, this.message),
            vueObj: this
          }).then(res => {
            if (res.data.statusMsg === "success") {
              $successMsg(this, "短信发送成功");
              this.inviteDialog = false;
              this.invitationFollow();
            }
          });
        }
      });
    },
    // 开始邀请随访
    invitationFollow() {
      $axios_http({
        url: "/base/follow/invitationFollow",
        data: Object.assign({}, { sid: this.message.sid }),
        vueObj: this
      }).then(res => {
        if (res.data.statusMsg === "success") {
          $successMsg(this, "邀请成功");
          this.query(
            this.$store.state.subjectsListPageNo,
            this.$store.state.subjectsListPageSize
          );
        }
      });
    },
    openInsertDialog(sid) {
      this.insertDialogVisible = true;
      this.reGroupSid.push(sid);
    },
    // 确定重新入组
    confirmInsert() {
      let _id = this.$refs.addBtn.$attrs.id;
      //按钮权限判断
      if (authority(_id)) {
        return;
      }
      $axios_http({
        url: "/base/hospital/deathCertificate/addCheck",
        data: {
          sid: this.reGroupSid[0]
        },
        vueObj: this
      }).then(res => {
        if (res.data.data) {
          this.$confirm(
            "取消违反后，该受试者的整体状态将由“死亡”变更为“正常”，已录入的终点事件-表单C5死亡相关信息将会删除！",
            "提示",
            {
              confirmButtonText: "确定删除",
              cancelButtonText: "取消",
              showCancelButton: false,
              type: "warning"
            }
          )
            .then(() => {
              this.reresearch();
            })
            .catch(() => {});
        } else {
          this.reresearch();
        }
      });
    },
    // 取消违反
    reresearch() {
      $axios_http({
        url: "/base/hospital/person/reresearch",
        data: {
          sid: this.reGroupSid
        },
        vueObj: this
      }).then(res => {
        this.insertDialogVisible = false;
        this.query(
          this.$store.state.subjectsListPageNo,
          this.$store.state.subjectsListPageSize
        );
      });
    },
    changeFollowbegin(){
        this.qc.followEnd = '';
        let followBegin = this.qc.followBegin;
        this.pickerOptionsEnd = {
           disabledDate(time) {
              return time.getTime() < new Date(followBegin).getTime() - 86400000;
           }
       }
    },
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
.filter-item {
  width: 200px;
  margin-right: 10px;
}
.el-popover .filter-item {
  float: left;
  margin-bottom: 10px;
}
</style>
