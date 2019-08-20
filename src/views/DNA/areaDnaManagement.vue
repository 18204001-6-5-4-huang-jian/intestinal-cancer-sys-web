<template>
  <div slot="right" class="content-page" v-if="area_stool_dna_list_page">
    <div class="content">
      <div class="filter-container" >
        <router-link to="/home/areaHome">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
        <el-form :model="qc" :inline=true>
          <el-input  style="width: 200px;" size="small" class="filter-item" clearable placeholder="姓名" v-model="qc.name" >
          </el-input>
          <el-input  style="width: 200px;" size="small" class="filter-item" clearableplaceholder="SID" v-model="qc.sid" >
          </el-input>
          <el-input  style="width: 200px;" size="small" class="filter-item" clearable placeholder="手机号" v-model="qc.phone" >
          </el-input>
          <el-input style="width: 200px;" size="small" clearable class="filter-item" placeholder="DNA编码"
                    v-model="qc.dnaCode"></el-input>
            <el-select v-model="qc.group" clearable placeholder="分组方案" size="small" class="filter-item">
            <el-option value="A" label="A组">A组</el-option>
            <el-option value="B" label="B组">B组</el-option>
            <el-option value="C" label="C组">C组</el-option>
            <el-option value="Cg" label="C组高危">C组高危</el-option>
            <el-option value="Cd" label="C组低危">C组低危</el-option>
          </el-select>
          <el-select v-model="qc.codeEntryStatus" placeholder="DNA编码录入状态" size="small" class="filter-item" clearable>
             <el-option v-for="(item,index) in inputStatus" 
                :key="index" 
                :value="item.id" 
                :label="item.name">
                </el-option>
          </el-select>
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
          <!-- <el-select v-model="qc.group" clearable placeholder="分组方案" size="small" class="filter-item">
            <el-option value="A" label="A组">A组</el-option>
            <el-option value="B" label="B组">B组</el-option>
            <el-option value="C" label="C组">C组</el-option>
            <el-option value="Cg" label="C组高危">C组高危</el-option>
            <el-option value="Cd" label="C组低危">C组低危</el-option>
          </el-select>
          <el-select v-model="qc.codeEntryStatus" placeholder="DNA编码录入状态" size="small" class="filter-item" >
             <el-option v-for="(item,index) in inputStatus" 
                :key="index" 
                :value="item.id" 
                :label="item.name">
                </el-option>
          </el-select> -->
          <el-select v-model="qc.dna_check_inform_status" clearable placeholder="DNA结果状态" size="small" class="filter-item">
            <el-option value="1" v-bind:key="1" label="待返回"></el-option>
            <el-option value="2" v-bind:key="2" label="已返回"></el-option>

          </el-select>
          <el-select v-model="qc.dnaCheckResult" clearable placeholder="DNA结果" size="small" class="filter-item">
            <el-option value="2" v-bind:key="2" label="阳性"></el-option>
            <el-option value="1" v-bind:key="1" label="阴性"></el-option>
            <el-option value="3" v-bind:key="3" label="无效"></el-option>
          </el-select>
          <el-select v-model="qc.dnaCommunityInformStatus" clearable placeholder="结果发放状态" size="small" class="filter-item">
            <el-option value="1" v-bind:key="1" label="已发放"></el-option>
            <el-option value="2" v-bind:key="2" label="未发放"></el-option>
          </el-select>
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
              :label="item.name"></el-option>
            </el-select>
          </div>
          <div>
            <el-button  size="small" type="primary" icon="el-icon-search" @click="query(1,$store.state.areaDnaManagementPageSize)" >查询</el-button>
            <el-button  type="primary" size="small" icon="el-icon-close" @click="reset" >重置</el-button>
          </div>
        </el-form>
        <div class="table-btn-grooup">
          <el-button  type="primary" size="small" icon="el-icon-plus" @click="addFormDialog = true">新增</el-button>
          <!--<el-button class="filter-item" size="small" type="primary" icon="el-icon-search"  v-if="btnAuth.fit_export__excel_btn">导出EXCEL</el-button>-->
        </div>
        <!--数据列表-->
        <!--<div class="table-btn-grooup">
          <el-button class="filter-item" type="primary" size="small" icon="el-icon-close"  v-if="btnAuth.fit_reserve_btn">一键预约</el-button>
          <el-button class="filter-item" size="small" type="primary" icon="el-icon-search"  v-if="btnAuth.fit_export__excel_btn">导出EXCEL</el-button>
        </div>-->
        <el-dialog :visible.sync="seeDialog" width="30%">
          <ul class="resultList">
            <li><span>录入状态：</span><span>{{this.insertStatus}}</span></li>
            <li><span>有无结果：</span><span>{{this.resultStatus}}</span></li>
            <li v-if="this.resultStatus=='无结果'"><span>无结果原因：</span><span>{{this.noResonResult}}</span></li>
            <li v-if="this.resultStatus=='有结果'"><span>结果为：</span><span>{{this.result}}</span></li>
            <li v-if="this.resultStatus=='有结果'"><span>上线值：</span><span>{{this.upLineValue}}</span></li>
            <li v-if="this.resultStatus=='有结果'"><span>下线值：</span><span>{{this.downLineValue}}</span></li>
          </ul>
        </el-dialog>
        <el-dialog :visible.sync="inputResultDialog">
          <el-dialog
            width="30%"
            :visible.sync="inputResultPrompt"
            append-to-body>
            <div v-if="resultInfo==2" class="resultInfo">
              <p>FIT结果为阳性</p>
              <p>请及时为该受试者预约结肠镜检查</p>
            </div>
            <div v-if="resultInfo==1" class="resultInfo">
              <p>FIT结果为阴性</p>
              <p>该受试者一年后随访</p>
            </div>
            <div v-if="resultInfo==3" class="resultInfo">
              <p>FIT结果为无效</p>
              <p>请重新检测</p>
            </div>
            <el-button size="small" @click="closeInputResultDialog" class="dialog-footer">确 定</el-button>
          </el-dialog>
          <el-form :model="insertForm" ref="insertForm">
            <el-form-item label="结果日期" :label-width="formLabelWidth">
              <el-date-picker
                v-model="insertForm.resultDate"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="结果日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item  :label-width="formLabelWidth">
              <el-radio v-model="insertForm.resultStatus" label="1">有结果</el-radio>
              <el-radio v-model="insertForm.resultStatus" label="2">无结果</el-radio>
            </el-form-item>
            <div v-if="insertForm.resultStatus==1">
              <el-form-item label="上线" :label-width="formLabelWidth">
                <el-input v-model="insertForm.upLineValue" auto-complete="off" class="lineWidth"></el-input>
              </el-form-item>
              <el-form-item label="下线" :label-width="formLabelWidth" style="margin-top:10px">
                <el-input v-model="insertForm.downLineValue" auto-complete="off" class="lineWidth"></el-input>
              </el-form-item>
            </div>
            <el-form-item label="请说明原因" :label-width="formLabelWidth" v-if="insertForm.resultStatus==2">
              <el-input v-model="insertForm.noResonResult" auto-complete="off" class="lineWidth"></el-input>
            </el-form-item>
            <div class="dialog-footer">
              <el-button size="small" @click="inputResult" type="primary">确 定</el-button>
              <el-button size="small" @click="inputResultDialog=false">取 消</el-button>
            </div>
          </el-form>
        </el-dialog>
        <el-dialog :visible.sync="inputCodeDialog" :show-close="false">
          <el-form :model="addCodeForm" :rules="addCodeFormRules" ref="addCodeForm">
            <el-form-item label="DNA编码" :label-width="formLabelWidth" prop="dnaCode">
              <el-input v-model="addCodeForm.dnaCode" auto-complete="off" class="lineWidth"></el-input>
            </el-form-item>
            <el-form-item label="发放经手人工作编码" :label-width="formLabelWidth" prop="personCode">
              <el-input v-model="addCodeForm.personCode" auto-complete="off" class="lineWidth"></el-input>
            </el-form-item>
            <el-form-item label="发放日期" :label-width="formLabelWidth" prop="releaseDate">
              <el-date-picker
                v-model="addCodeForm.releaseDate"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="结果日期"
                class="lineWidth">
              </el-date-picker>
            </el-form-item>
            <div class="dialog-footer">
              <el-button size="small" @click="inputCode('addCodeForm')" type="primary">确 定</el-button>
              <el-button size="small" @click="cancel('addCodeForm')">取 消</el-button>
            </div>
          </el-form>
        </el-dialog>
        <el-dialog :visible.sync="addFormDialog" :show-close="false" >
          <el-form :model="addForms" :rules="addFormRules" ref="addForms" >
            <el-form-item label="SID" :label-width="formLabelWidth" prop="sid" >
              <el-input v-model="addForms.sid" auto-complete="off" class="notification-input" @blur="getInfo()"></el-input>
            </el-form-item>
            <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
              <el-input v-model="addForms.name" auto-complete="off" class="notification-input"  disabled></el-input>
            </el-form-item>
            <el-form-item label="电话号码" :label-width="formLabelWidth" prop="phone">
              <el-input v-model="addForms.phone" auto-complete="off" class="notification-input" disabled></el-input>
            </el-form-item>
            <el-form-item label="DNA编码" :label-width="formLabelWidth" prop="dnaCode">
              <el-input v-model="addForms.dnaCode" auto-complete="off" class="notification-input" ></el-input>
            </el-form-item>
            <el-form-item label="工作人员编码" :label-width="formLabelWidth" prop="personCode">
              <el-input v-model="addForms.personCode" auto-complete="off" class="notification-input" ></el-input>
            </el-form-item>
            <el-form-item label="发放日期" :label-width="formLabelWidth" prop="releaseDate">
              <el-date-picker
                v-model="addForms.releaseDate"
                type="date"
                :picker-options="pickerOptions1"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="发放日期">
              </el-date-picker>
            </el-form-item>
            <div class="dialog-footer" style="text-align: center;">
              <el-button size="small" type="primary" @click="addForm('addForms')" >提交</el-button>
              <el-button size="small" @click="cancelDNA()">取 消</el-button>
            </div>
          </el-form>
        </el-dialog>
        <el-table
          :data="queryResult.tableData"
          border
          :default-sort = "{prop: 'releaseDate', order: 'descending'}"
          style="width: 100%;margin-top: 10px;">
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="80">
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
            width="140"
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
            label="总体状态"
          >
            <template slot-scope="scope">
              <span>{{scope.row.overallStatusCy| overallStatusCy}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="codeEntryStatus"
            label="DNA编码录入状态"
            width="140"
          >
            <template slot-scope="scope">
              <span>{{scope.row.codeEntryStatus| codeEntryStatusNew}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="dnaCode"
            label="DNA编码"
          >

          </el-table-column>
          <el-table-column
            label="编码录入日期"
            prop="releaseDate"
            width="140"
            sortable
          >
            <template slot-scope="scope">
              <span>{{scope.row.releaseDate | date}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="codeEntryStatus"
            label="DNA结果状态"
            width="140"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.codeEntryStatus == 2 && scope.row.dnaCheckInformStatus ==2">已返回</span>
              <span v-if="scope.row.codeEntryStatus == 2 && scope.row.dnaCheckInformStatus != 2">待返回</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="dnaCheckResult"
            label="DNA结果"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.codeEntryStatus == 2 && scope.row.dnaCheckInformStatus ==2">{{scope.row.dnaCheckResult | result}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="dnaCommunityInformStatus"
            label="DNA结果发放状态"
            width="140"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.codeEntryStatus == 2 && scope.row.dnaCheckInformStatus ==2">{{scope.row.dnaCommunityInformStatus | dnaCommunityInformStatus }}</span>
            </template>
          </el-table-column>
         <el-table-column
            label="操作"
            width="180"
            fixed="right"
            align="center"
          >
            <template slot-scope="scope">
              <!-- 解除锁定组件 -->
              <approvalDialog ref="approvalDialog" @refreshList="query" :id="scope.row.id" :approvalArr="approvalArr" v-if="scope.row.codeEntryStatus==2 && scope.row.dnaCommunityInformStatus !=1 && scope.row.approvalStatus==0"></approvalDialog>
              <!-- <el-button type="text" size="small" @click="approvalEdit(scope.row)" v-if="scope.row.approvalStatus==1" :disabled="true">解除锁定</el-button> -->
              <span><el-button type="text" class="btnStyle" @click="updateCourierResult(scope.row.id)" v-if="scope.row.codeEntryStatus==2 && scope.row.dnaCommunityInformStatus !=1 && scope.row.dnaCheckEnterStatus!=2">编辑</el-button></span>
              <span><el-button type="text" class="btnStyle"  v-if="scope.row.codeEntryStatus==1" @click="inputCodeDialogIsShow(scope.row.id)">录入粪便DNA编码</el-button></span>
              <span><el-button type="text" class="btnStyle" 
              v-if="scope.row.codeEntryStatus==1 || (scope.row.codeEntryStatus==2 && scope.row.dnaCommunityInformStatus !=1 && scope.row.applyStatus==0 && scope.row.dnaCheckEnterStatus!=2)" 
              @click="noProvided(scope.row)">未提供</el-button></span>
              <span><el-button type="text" class="btnStyle" v-if="scope.row.dnaCommunityInformStatus ==2" @click="sendMessage(scope.row.phone,scope.row.dnaCheckResult)">短信通知</el-button></span>
              <span><el-button type="text" class="btnStyle" v-if="scope.row.dnaCommunityInformStatus ==2" @click="openNotificationFormDialog(scope.row.id,scope.row.sid)">发放</el-button></span>
              <span><el-button type="text" class="btnStyle"  v-if="scope.row.codeEntryStatus == 2 && scope.row.dnaCheckInformStatus ==2 &&scope.row.dnaCheckFilePath != null&&scope.row.dnaCheckFilePath != ''"><a :href="serverName + '/base/dnafile/downFile?filePath=' + scope.row.dnaCheckFilePath">下载PDF</a></el-button></span>
              <span><el-button type="text" class="btnStyle" v-if="scope.row.dnaCommunityInformStatus ==1 " @click="showDatas(scope.row)">查看发放记录</el-button></span>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog :visible.sync="notificationFormDialog" >
          <el-form :model="notificationForm" :rules="rules" ref="notificationForm" >
            <el-form-item label="发放方式" :label-width="formLabelWidth" prop="mode">
              <el-select v-model="notificationForm.mode" :disabled="showData"  placeholder="请选择" @change="getMode" style="width: 250px;">
                <el-option label="1.受试者/家属到社区中心自取" :value="1" ></el-option>
                <el-option label="2.社区工作人员入户递送"  :value="2"></el-option>
                <el-option label="3.邻居从社区中心捎带取走" :value="3" ></el-option>
                <el-option label="4.受试者/家属到医院自取" :value="4"></el-option>
                <el-option label="5.其它，请备注" :value="5"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发放日期" :label-width="formLabelWidth" prop="issueDate">
              <el-date-picker
                v-model="notificationForm.issueDate"
                :disabled="showData"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="工作人员编码" :label-width="formLabelWidth" prop="workerCode" >
              <el-input v-model="notificationForm.workerCode" :disabled="showData"  auto-complete="off" class="notification-input"></el-input>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth" prop="note">
              <el-input v-model="notificationForm.note" :disabled="showData"  auto-complete="off" class="notification-input"></el-input>
            </el-form-item>
            <div class="dialog-footer" v-if="!showData">
              <el-button size="small" type="primary" @click="notificationSure('notificationForm')">确定</el-button>
              <el-button size="small" @click="notificationFormDialog = false">取 消</el-button>
            </div>
          </el-form>
        </el-dialog>
        <!--分页栏-->
        <el-row>
          <el-col :span="10"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="14"><div class="grid-content bg-purple">
            <div class="block" style="margin-top: 18px">
              <el-pagination
                @size-change="pageSizeChange"
                @current-change="currentPageChange"
                :current-page="$store.state.areaDnaManagementPageNo"
                :page-sizes="[10, 20, 50, 100]"
                v-bind:page-size="$store.state.areaDnaManagementPageSize"
                layout="total, sizes, prev, pager, next, jumper"
                v-bind:total="queryResult.totalRowCount">
              </el-pagination>
            </div>
          </div></el-col>
        </el-row>
        <el-dialog :visible.sync="messageDialog" :show-close="false">
          <el-form :model="messageForms" :rules="messageFormRules" ref="messageForms">
            <el-form-item label="短信" :label-width="formLabelWidth" prop="sid" >
              <el-input
                type="textarea"
                disabled
                :autosize="{ minRows: 4, maxRows: 4}"
                placeholder="请输入内容"
                v-model="dnaCheckResultStr">
              </el-input>            </el-form-item>
            <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone" >
              <el-input v-model="messageForms.phone" auto-complete="off" class="notification-input"></el-input>
            </el-form-item>
            <div class="dialog-footer" style="text-align: center;">
              <el-button size="small" type="primary" @click="sureSend('messageForms')">提交</el-button>
              <el-button size="small" @click="messageDialog = false">取 消</el-button>
            </div>
          </el-form>
        </el-dialog>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import approvalDialog from "../components/approvalDialog";
import DICTIONARY from "@/utils/dictionary.js";
export default {
  name: "Right",
  data() {
    var validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("手机号不能为空"));
      } else if (!/\d/.test(value)) {
        callback(new Error("手机号只能是数字"));
      } else if (value.length != 11) {
        callback(new Error("请输入合法的11位手机号"));
      } else if (value) {
        callback();
      }
    };
    var validateFitCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("DNA编号不能为空"));
      } else if (!/^[A-Za-z0-9]{12}$/.test(value)) {
        callback(new Error("请输入12位数字或字母"));
      } else {
        callback();
      }
    };
    return {
      followGroup: DICTIONARY.followGroup,
      messageDialog: false,
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      approvalArr: {
        formType: "HOSPITAL_STOOL_DNA"
      }, //解除锁定相关信息
      id: "",
      sid: "",
      insertStatus: "", //结果状态
      resultStatus: "", //有无结果
      noResonResult: "", //无结果原因
      upLineValue: "", //上线值
      downLineValue: "", //下线值
      result: "", //结果为
      resultInfo: "", //结果弹框提示信息
      inputResultPrompt: false, //结果提示信息
      inputResultDialog: false,
      addFormDialog: false,
      inputCodeDialog: false,
      seeDialog: false,
      reserveDialog: false,
      editBtn: false,
      serverName: SERVER_NAME,
      //权限判定
      area_stool_dna_list_page: false,
      btnAuth: {
        buttonRoleAdd: false,
        fit_return_btn: false,
        buttonRoleDel: false,
        fit_query_btn: false,
        buttonUserRoleDis: false,
        fit_reserve_btn: false,
        fit_export__excel_btn: false,
        fit_input_num_btn: false,
        fit_del_btn: false,
        fit_input_result_btn: false,
        fit_examine_btn: false,
        fit_see_btn: false
      },
      period: "",
      periodData: [],
      //查询条件
      qc: {
        sid: null,
        name: null,
        phone: null,
        group: null,
        codeEntryStatus: null,
        result: null,
        insertStatus: null,
        communityDeptId: null,
        loginName: null,
        dnaCode: null,
        dnaCheckResult: null,
        dna_check_inform_status: null,
        dnaCommunityInformStatus: null,
        dnaCheckEnterStatus: null,
        followGroup: null,
        followState:null
      },
      inputStatus:DICTIONARY.inputStatusNew,
      followStatus:DICTIONARY.followStatus,
      props: {
        value: "id",
        children: "child",
        label: "name"
      },
      messageForms: {
        phone: ""
      },
      ids: [],
      //查询结果
      queryResult: {
        pageNo: 1, //当前页
        pageSize: 10, //每页的条数
        totalPageCount: 0,
        tableData: []
      },
      //分页
      queryResultSource: {
        pageNoSource: 1, //当前页
        pageSizeSource: 15, //每页的条数
        totalPageCount: 0
      },
      notificationForm: {
        id: "",
        sid: "",
        mode: "",
        workerCode: "",
        note: "",
        issueDate: ""
      },
      notificationFormDialog: false,
      showData: true,
      deptGroup: [],
      insertForm: {
        resultDate: "",
        upLineValue: null,
        downLineValue: null,
        noResonResult: "",
        resultStatus: ""
      },
      addCodeForm: {
        dnaCode: "",
        personCode: "",
        releaseDate: ""
      },
      addForms: {
        sid: "",
        phone: "",
        name: "",
        dnaCode: "",
        personCode: "",
        releaseDate: ""
      },
      allocateResourcesData: [],
      allocationId: "",
      colonoscopyRecordId: "",
      formLabelWidth: "150px",
      rules: {
        mode: [{ required: true, message: "必选", trigger: "change" }],
        issueDate: [{ required: true, message: "必填", trigger: "blur" }],
        workerCode: [{ required: true, message: "必填", trigger: "blur" }],
        note: [{ required: false, message: "必填", trigger: "blur" }]
      },
      notificationFormDialog: false,
      notificationForm: {
        issueDate: "",
        mode: "",
        workerCode: "",
        note: ""
      },
      messageFormRules: {
        phone: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ]
      },
      addFormRules: {
        sid: { required: true, message: "必填", trigger: "blur" },
        name: { required: true, message: "必填", trigger: "change" },
        phone: { required: true, message: "必填", trigger: "change" },
        dnaCode: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validateFitCode, trigger: "blur" }
        ],
        personCode: { required: true, message: "必填", trigger: "blur" },
        releaseDate: { required: true, message: "必填", trigger: "blur" }
      },
      addCodeFormRules: {
        dnaCode: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validateFitCode, trigger: "blur" }
        ],
        personCode: [{ required: true, message: "必填", trigger: "blur" }],
        releaseDate: [{ required: true, message: "必填", trigger: "blur" }]
      },
      dnaCheckResult: Number,
      dnaCheckResultStr: ""
    };
  },
  components: {
    approvalDialog
  },
  mounted() {
    this.$store.commit("LOGOUT_USER");
    let obj = this.checkPageAuth(
      this,
      "area_stool_dna_list_page",
      this.btnAuth
    );
    this.qc.sid = this.$route.query.sid;
    this.query(
      this.$store.state.areaDnaManagementPageNo,
      this.$store.state.areaDnaManagementPageSize
    );
  },
  beforeDestroy() {
    this.$store.state.areaDnaManagementPageNo = 1;
    this.$store.state.areaDnaManagementPageSize = 10;
  },
  filters: {
      formatDate: function (value) {
        let date = new Date(value);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return y + '-' + MM + '-' + d;
      }
    },
  methods: {
    updateCourierResult(id) {
      this.id = id;
      $axios_http({
        url: "/base/area/stool/dna/queryById",
        data: {
          id: id
        },
        vueObj: this
      }).then(res => {
        this.inputCodeDialog = true;
        this.addCodeForm.dnaCode = res.data.data.dnaCode;
        this.addCodeForm.personCode = res.data.data.personCode;
        this.addCodeForm.releaseDate = new Date(res.data.data.releaseDate);
        this.editBtn = true;
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
    showDatas(row) {
      $axios_http({
        url: "/base/stool/dna/get/" + row.id,
        vueObj: this
      }).then(res => {
        console.log(res.data.data.dna_community_inform_mode);
        this.notificationForm.mode = res.data.data.dna_community_inform_mode;
        this.notificationForm.issueDate =
          res.data.data.dna_community_inform_work_time;
        this.notificationForm.note = res.data.data.dna_community_inform_note;
        this.notificationForm.workerCode =
          res.data.data.dna_community_inform_worker_code;
        this.showData = true;
        this.notificationFormDialog = true;
      });
    },
    getMode(value) {
      if (value == "5") {
        this.rules.note[0].required = true;
      } else {
        this.rules.note[0].required = false;
      }
    },
    openNotificationFormDialog(id, sid) {
      // this.$refs.notificationForm.resetFields();
      Object.assign(
        this.$data.notificationForm,
        this.$options.data().notificationForm
      );
      this.showData = false;
      this.notificationFormDialog = true;
      this.notificationForm.id = id;
      this.notificationForm.sid = sid;
    },
    cancel(formName) {
      this.inputCodeDialog = false;
      this.$refs[formName].resetFields();
    },
    cancelDNA() {
      this.addFormDialog = false;
      this.$refs["addForms"].resetFields();
    },
    getInfo(value) {
      if (this.addForms.sid) {
        $axios_http({
          url: "/base/area/hospital/person/detail/getSid",
          data: {
            sid: this.addForms.sid
          },
          vueObj: this
        }).then(res => {
          this.addForms.name = res.data.data[0].name;
          this.addForms.phone = res.data.data[0].phone;
        });
      }
    },
    addForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          $axios_http({
            url: "/base/hospital/person/notentry/dnacode/addDNA",
            data: {
              sid: this.addForms.sid,
              dnaCode: this.addForms.dnaCode,
              releaseDate: this.addForms.releaseDate,
              personCode: this.addForms.personCode
            },
            vueObj: this
          }).then(res => {
             if(res.data.statusMsg=='success'){
                $successMsg(this, "添加成功");
                this.addFormDialog = false;
                this.$refs["addForms"].resetFields();
                this.query(1, this.$store.state.dnaManagementPageSize);
             }else{
                this.$message({
                  message:res.data.statusMsg,
                  type: 'warning'
                });
             }
          });
        }
      });
    },
    //查询
    query(pageNo, pageSize) {
      $axios_http({
        url: "/base/stool/dna/query",
        data: {
          name: this.qc.name,
          sid: this.qc.sid,
          communityDeptId: this.qc.communityDeptId,
          loginName: this.qc.loginName,
          phone: this.qc.phone,
          group: this.qc.group,
          codeEntryStatus: this.qc.codeEntryStatus,
          insertStatus: this.qc.insertStatus,
          dna_check_inform_status: this.qc.dna_check_inform_status, //返回状态
          dnaCheckEnterStatus: this.qc.dnaCheckEnterStatus,
          dna_check_result: this.qc.dnaCheckResult,
          dna_community_inform_status: this.qc.dnaCommunityInformStatus,
          followGroup: this.qc.followGroup,
          followState:this.qc.followState,
          dnaCode: this.qc.dnaCode,
          result: this.qc.result,
          pageNo: pageNo, //当前页
          pageSize: pageSize //每页条数
        },
        vueObj: this
      }).then(res => {
        this.$store.commit("get_areaDnaManagementPageNo",pageNo);
        this.queryResult.tableData = res.data.data;
        this.queryResult.totalPageCount = res.data.pageInfo.totalPageCount; //获取总共多少页
        this.queryResult.totalRowCount = res.data.pageInfo.totalRowCount; //获取总共条数
      });
    },
    closeInputResultDialog() {
      Object.assign(this.$data.insertForm, this.$options.data().insertForm);
      this.inputResultDialog = false;
      this.inputResultPrompt = false;
    },
    inputCodeDialogIsShow(id) {
      // this.$refs.addCodeForm.resetFields();
      Object.assign(this.$data.addCodeForm, this.$options.data().addCodeForm);
      this.id = id;
      this.inputCodeDialog = true;
      this.editBtn = false;
    },
    inputResultDialogIsShow(id, sid) {
      this.id = id;
      this.sid = sid;
      this.inputResultDialog = true;
    },
    inputResult() {
      $axios_http({
        url: "/base/fit/result/add",
        data: {
          id: this.id,
          sid: this.sid,
          resultStatus: this.insertForm.resultStatus,
          resultDate: this.insertForm.resultDate,
          upLineValue: this.insertForm.upLineValue,
          downLineValue: this.insertForm.downLineValue,
          noResonResult: this.insertForm.noResonResult
        },
        vueObj: this
      }).then(res => {
        console.log("add");
        console.log(res);
        $successMsg(this, "结果录入成功");
        this.query(
          this.$store.state.areaDnaManagementPageNo,
          this.$store.state.areaDnaManagementPageSize
        );
        //this.inputResultDialog=false;
        this.inputResultPrompt = true;
        this.resultInfo = res.data.data.result;
      });
    },
    inputCode(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let _url = "";
          if (this.editBtn == true) {
            _url = "/base/area/stool/dna/updateDnaCode";
          } else {
            _url = "/base/stool/dna/addDnaCode";
          }
          $axios_http({
            url: _url,
            data: {
              id: this.id,
              dnaCode: this.addCodeForm.dnaCode,
              personCode: this.addCodeForm.personCode,
              releaseDate: this.addCodeForm.releaseDate
            },
            vueObj: this
          }).then(res => {
            if(res.data.statusMsg == 'success'){
                $successMsg(this, "编码录入成功");
                this.query(
                  this.$store.state.dnaManagementPageNo,
                  this.$store.state.dnaManagementPageSize
                );
                this.inputCodeDialog = false;
                this.editBtn = false;
                Object.assign(
                  this.$data.addCodeForm,
                  this.$options.data().addCodeForm
                );
            }else{
                this.$message({
                  message: res.data.statusMsg,
                  type: 'warning'
                });
            }
          });
        } else {
          return false;
        }
      });
    },
    seeEvent(id) {
      this.seeDialog = true;
      $axios_http({
        url: "/base/fit/result/getFItResult/" + id,
        data: {},
        vueObj: this
      }).then(res => {
        console.log("see");
        console.log(res);
        this.insertStatus = res.data.data.insertStatus;
        this.resultStatus = res.data.data.resultStatus;
        this.noResonResult = res.data.data.noResonResult;
        this.upLineValue = res.data.data.upLineValue;
        this.downLineValue = res.data.data.downLineValue;
        this.result = res.data.data.result;
        if (this.insertStatus == 1) {
          this.insertStatus = "未录入";
        } else if (this.insertStatus == 2) {
          this.insertStatus = "已录入";
        } else if (this.insertStatus == 3) {
          this.insertStatus = "待审核";
        }
        if (this.resultStatus == 1) {
          this.resultStatus = "有结果";
        } else if (this.resultStatus == 2) {
          this.resultStatus = "无结果";
        }
        if (this.result == 1) {
          this.result = "阳性";
        } else if (this.result == 2) {
          this.result = "阴性";
        } else if (this.result == 3) {
          this.result = "无效";
        }
      });
    },
    changePeriod(obj) {
      console.log(obj);
      console.log(this.insertForm.period);
      console.log(this.periodData);
      this.periodData.forEach((item, ind) => {
        if (item.period == obj) {
          console.log(item, 999);
          this.insertForm.examinationName = item.examinationName;
          this.insertForm.deptName = item.deptName;
          this.insertForm.name = item.name;
          this.insertForm.reserveable = item.reserveable;
          this.allocationId = item.id;
        }
      });
    },
    getServerInfo(colonoscopyRecordId, sid) {
      this.reserveDialog = true;
      this.sid = sid;
      this.colonoscopyRecordId = colonoscopyRecordId;
      $axios_http({
        url: "/base/hospital/community/allocation/query",
        data: {},
        vueObj: this
      }).then(res => {
        this.periodData = res.data.data;
        this.insertForm = res.data.data[0];
        this.allocationId = res.data.data[0].id;
        this.period = this.insertForm.period;
      });
    },
    resverEvent() {
      $axios_http({
        url: "/base/hospital/colonoscopy/record/booking",
        data: {
          colonoscopyRecordId: this.colonoscopyRecordId,
          sid: this.sid,
          allocationId: this.allocationId
        },
        vueObj: this
      }).then(res => {
        $successMsg(this, "预约成功");
        this.reserveDialog = false;
        this.query(
          this.$store.state.areaDnaManagementPageNo,
          this.$store.state.areaDnaManagementPageSize
        );
      });
    },
    // showPDF(dnaCheckFilePath){

    //   // window.open(dnaCheckFilePath);
    //   $axios_http({
    //         url:"/base/dnafile/downFile",
    //         data:{
    //           filePath:dnaCheckFilePath,
    //         },
    //         vueObj:this
    //       }).then((res)=>{

    //       })
    // },
    notificationSure(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          $axios_http({
            url: "/base/stool/dna/updateCommDnaInformStatus",
            data: {
              id: this.notificationForm.id,
              sid: this.notificationForm.sid,
              dna_community_inform_mode: this.notificationForm.mode,
              dna_community_inform_work_time: this.notificationForm.issueDate,
              dna_community_inform_worker_code: this.notificationForm
                .workerCode,
              dna_community_inform_note: this.notificationForm.note
            },
            vueObj: this
          }).then(res => {
            this.$refs[formName].resetFields();
            $successMsg(this, "发放成功");
            this.notificationFormDialog = false;
            Object.assign(
              this.$data.notificationForm,
              this.$options.data().notificationForm
            );
            this.query(
              this.$store.state.dnaManagementPageNo,
              this.$store.state.dnaManagementPageSize
            );
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    sendMessage(phone, dnaCheckResult) {
      this.messageDialog = true;
      this.messageForms.phone = phone;
      this.dnaCheckResult = dnaCheckResult;
      // textarea
      var status = "";
      if (dnaCheckResult == 1) {
        status = "阴性";
      } else if (dnaCheckResult == 2) {
        status = "阳性";
      } else if (dnaCheckResult == 3) {
        status = "无效";
      }
      this.dnaCheckResultStr = `【结直肠癌筛查项目】尊敬的受试者，您近期参加了由国家癌症中心组织的人群结直肠癌筛查项目，您的粪便DNA检查结果为${status}。如需完整报告，可在工作时间至当地社区卫生服务中心领取。感谢您的参与！`;
    },
    sureSend(formName) {
      this.$refs[formName].validate((valid, obj) => {
        if (valid) {
          $axios_http({
            url: "/base/dna/result/sendDna",
            data: {
              phone: this.messageForms.phone,
              dnaCheckResult: this.dnaCheckResult
            },
            vueObj: this
          }).then(res => {
            $successMsg(this, "发送成功");
            this.messageDialog = false;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 未提供
    noProvided(row) {
      this.$confirm("该受试者未提供粪便DNA样本？", "提示", {
        closeOnClickModal: false,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(res => {
          $axios_http({
            url: "/base/hospital/stooldna/noProvided",
            data: {
              id: Number(row.id)
            },
            vueObj: this
          }).then(res => {
            $successMsg(this, "操作成功");
            this.query(
              this.$store.state.areaDnaManagementPageNo,
              this.$store.state.areaDnaManagementPageSize
            );
          });
        })
        .catch(() => {});
    },
    //重置检索条件
    reset() {
      Object.assign(this.$data.qc, this.$options.data().qc);
      this.ids = [];
      this.query(
        this.$store.state.areaDnaManagementPageNo,
        this.$store.state.areaDnaManagementPageSize
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
            url: "/base/role/delete/" + id,
            vueObj: this
          }).then(res => {
            $successMsg(this, "删除成功");
            this.query(
              this.$store.state.areaDnaManagementPageNo,
              this.$store.state.areaDnaManagementPageSize
            );
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
      this.$store.commit("get_areaDnaManagementPageSize", pageSize);
      this.query(this.$store.state.areaDnaManagementPageNo, pageSize);
    },
    //切换当前页事件，做重新查询操作
    currentPageChange(currentPage) {
      this.$store.commit("get_areaDnaManagementPageNo", currentPage);
      this.query(currentPage, this.$store.state.areaDnaManagementPageSize);
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
  margin-left: 5px;
  font-weight: normal;
}
.inline {
  display: inline-block;
  margin-top: 20px;
}
.btnStyle {
  padding-left: 10px;
}
.return-home {
  text-align: center;
  margin-bottom: 20px;
}
.table-btn-grooup {
  margin-bottom: 10px;
  margin-top: 20px;
}
.resultList {
  width: 60%;
  list-style: none;
  margin: 20px auto;
}
.resultList li {
  line-height: 40px;
  font-weight: 600;
  font-size: 18px;
}
.lineWidth {
  width: 50%;
}
.dialog-footer {
  /* position: absolute;right:20px;bottom:20px; */
  text-align: center;
}
.resultInfo {
  text-align: center;
  line-height: 30px;
  font-size: 18px;
  font-weight: 500;
}
.filter-item {
  width: 200px;
  margin-right: 10px;
}
</style>
