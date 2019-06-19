<template>
  <div slot="right" class="content-page" v-if="colonscopyList_page">
    <div class="content">
      <div class="filter-container">
        <router-link to="/home/home">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
        <el-form :model="qc" :inline=true class="clear">
          <div>
          <el-input style="width: 200px;" size="small" class="filter-item"  clearable placeholder="姓名" v-model="qc.name">
          </el-input>
          <el-input style="width: 200px;" size="small" class="filter-item" clearable placeholder="SID" v-model="qc.sid">
          </el-input>
          <el-input style="width: 200px;" size="small" class="filter-item" clearable placeholder="手机号" v-model="qc.phone">
          </el-input>
          <el-select v-model="qc.group" clearable placeholder="分组方案" size="small" class="filter-item">
            <el-option value="A" v-bind:key="1" label="A组"></el-option>
            <el-option value="B" v-bind:key="2" label="B组"></el-option>
            <el-option value="C" v-bind:key="3" label="C组"></el-option>
            <el-option value="Cg" v-bind:key="4" label="C组高危"></el-option>
            <el-option value="Cd" v-bind:key="5" label="C组低危"></el-option>
          </el-select>
          <el-select v-model="qc.reserveStatus" clearable placeholder="是否预约" size="small" class="filter-item">
            <el-option value="1" v-bind:key="1" label="未预约"></el-option>
            <el-option value="2" v-bind:key="2" label="已预约"></el-option>
          </el-select>
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
          <el-select v-model="qc.examinationStatus" clearable placeholder="是否检查" size="small" class="filter-item">
            <el-option value="1" v-bind:key="1" label="未检查"></el-option>
            <el-option value="2" v-bind:key="2" label="已检查"></el-option>
          </el-select>
          <el-select v-model="qc.finishedStatus" clearable placeholder="完成情况" size="small" class="filter-item">
            <el-option value="1" v-bind:key="1" label="未完成"></el-option>
            <el-option value="2" v-bind:key="2" label="已完成"></el-option>
          </el-select>
          <el-select v-model="qc.notificationIssueStatus" clearable placeholder="是否发放" size="small" class="filter-item">
            <el-option value="1" v-bind:key="1" label="未发放"></el-option>
            <el-option value="2" v-bind:key="2" label="已发放"></el-option>
          </el-select>
          <!-- add -->
           <el-select v-model="qc.noCompleteFlag" clearable placeholder="是否有已检查未完成" size="small" class="filter-item">
            <el-option value="1" v-bind:key="1" label="有"></el-option>
            <el-option value="2" v-bind:key="2" label="无"></el-option>
          </el-select>
            <el-select v-model="qc.followState" placeholder="随访状态" size="small" class="filter-item" clearable>
                <el-option v-for="(item,index) in followStatus" 
                :key="index" 
                :value="item.id" 
                :label="item.name">
                </el-option>
              </el-select>
               <el-select v-model="qc.followGroup" clearable placeholder="随访分组" size="small" class="filter-item" clearable>
               <el-option v-for="(item,index) in followGroup" 
               :key="index" 
               :value="item.id" 
               :label="item.name">
                </el-option>
              </el-select>
          </div>
          <div>
            <el-button  size="small" type="primary" icon="el-icon-search" @click="query(1,$store.state.colonscopyListSize)"
            >查询
            </el-button>
            <el-button  type="primary" size="small" icon="el-icon-close" @click="reset"
            >重置
            </el-button>
          </div>
        </el-form>
      </div>

      <el-dialog :visible.sync="reserveDialog">
        <el-form :model="insertForm" ref="insertForm">
          <el-form-item label="剩余放号数量" :label-width="formLabelWidth" prop="reserveable">
            {{this.insertForm.reserveable}}
          </el-form-item>
          <el-form-item label="项目名称" :label-width="formLabelWidth" prop="examinationName">
            <el-input v-model="insertForm.examinationName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="就诊时间" :label-width="formLabelWidth" prop="period">
            <el-select v-model="period" placeholder="分组方案" size="small" class="filter-item" @change="changePeriod">
              <el-option :label="item.period" :value="item.id" :key="item.id" v-for="item in periodData"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="就诊地点" :label-width="formLabelWidth" prop="deptName">
            <el-input v-model="insertForm.deptName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="就诊科室" :label-width="formLabelWidth" prop="name">
            <el-input v-model="insertForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <div class="dialog-footer">
            <el-button size="small" type="primary" @click="resverEvent('insertForm')">立即预约</el-button>
            <el-button size="small" @click="reserveDialog=false">取 消</el-button>
          </div>
        </el-form>
      </el-dialog>
      <el-dialog :visible.sync="notificationFormSeeDialog" >
        <el-form :model="seeGrantForm" :rules="rules" ref="notificationForm" >
          <el-form-item label="发放方式" :label-width="formLabelWidth" prop="mode">
            <el-select v-model="seeGrantForm.notificationIssueMode" placeholder="请选择" @change="getMode" disabled>
              <el-option label="受试者/家属到社区中心自取" value="1"></el-option>
              <el-option label="社区工作人员入户递送"  value="2"></el-option>
              <el-option label="邻居从社区中心捎带取走" value="3" ></el-option>
              <el-option label="受试者/家属到医院自取" value="4"></el-option>
              <el-option label="其它，请备注" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发放日期" :label-width="formLabelWidth" prop="issueDate" >
            <el-date-picker
              v-model="seeGrantForm.notificationIssueDate"
              type="date"
              disabled
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="工作人员编码" :label-width="formLabelWidth" prop="workerCode" >
            <el-input v-model="seeGrantForm.notificationIssueWorkerCode" auto-complete="off" class="notification-input" disabled></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth" prop="note">
            <el-input v-model="seeGrantForm.notificationIssueNote" auto-complete="off" class="notification-input" disabled></el-input>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog :visible.sync="notificationFormDialog">
        <el-form :model="notificationForm" :rules="rules" ref="notificationForm">
          <el-form-item label="发放方式" :label-width="formLabelWidth" prop="mode">
            <el-select v-model="notificationForm.mode" placeholder="请选择" @change="getMode">
              <el-option label="1.受试者/家属到社区中心自取" value="1"></el-option>
              <el-option label="2.社区工作人员入户递送" value="2"></el-option>
              <el-option label="3.邻居从社区中心捎带取走" value="3"></el-option>
              <el-option label="4.受试者/家属到医院自取" value="4"></el-option>
              <el-option label="5.其它，请备注" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发放日期" :label-width="formLabelWidth" prop="issueDate">
            <el-date-picker
              v-model="notificationForm.issueDate"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="工作人员编码" :label-width="formLabelWidth" prop="workerCode">
            <el-input v-model="notificationForm.workerCode" auto-complete="off" class="notification-input"></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth" prop="note">
            <el-input v-model="notificationForm.note" auto-complete="off" class="notification-input"></el-input>
          </el-form-item>
          <div class="dialog-footer">
            <el-button size="small" type="primary" @click="notificationSure('notificationForm')">确定</el-button>
            <el-button size="small" @click="notificationFormDialog = false">取 消</el-button>
          </div>
        </el-form>
      </el-dialog>
      <div>
        <div class="table-btn-grooup">
          <!--<el-button class="filter-item" size="small" type="primary" icon="el-icon-search" @click="query" v-if="btnAuth.colonscopyList_add_btn">新增</el-button>-->
          <!--<el-button class="filter-item" size="small" type="primary" icon="el-icon-search"  v-if="btnAuth.colonscopyList_EXCEL_btn">导出EXCEL</el-button>-->
        </div>
        <!--数据列表-->
        <el-table
          :data="queryResult.tableData"
          border
          :default-sort = "{prop: 'inGroupDate', order: 'descending'}"
          style="width: 100%;">
          <el-table-column
            type="selection"
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
            label="姓名"
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
            label="年龄"
          >
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号"
            width="130"
          >
          </el-table-column>
          <el-table-column
            prop="nickName"
            label="所属社区"
            width="130"
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
            width="130"
          >
          </el-table-column>
          <el-table-column
            label="总体状态"
          >
            <template slot-scope="scope">
              <span>{{scope.row.overallStatusCy | overallStatusCy}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="预约状态"
          >
            <template slot-scope="scope">
              <span>{{scope.row.reserveStatus | reserveStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="reservationNum"
            label="预约次数"
            width="130"
          >
          </el-table-column>
          <el-table-column
            prop="breakReservationNum"
            label="爽约次数"
            width="130"
          >
          </el-table-column>
          <el-table-column
            prop="noCompleteNum"
            label="已检查未完成次数"
            width="140"
          >
          </el-table-column>
          <el-table-column
            prop="reserveDate"
            label="预约时间"
            width="130"
          >
          </el-table-column>
          <el-table-column
            label="检查状态"
          >
            <template slot-scope="scope">
              <span>{{scope.row.examinationStatus | examinationStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="完成情况"
          >
            <template slot-scope="scope">
              <span>{{scope.row.finishedStatus | finishedStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="发放报告状态"
            width="120"
          >
            <template slot-scope="scope">
              <span>{{scope.row.notificationIssueStatus | notificationIssueStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="notificationIssueDate"
            label="发放日期"
            width="160"
          >
          </el-table-column>

          <el-table-column
            label="操作"
            fixed="right"
            width="300"
            align="center"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" v-if="btnAuth.colonscopyList_EXCEL_btn&& scope.row.reserveStatus == '1' "
                         @click="getServerInfo(scope.row.id,scope.row.sid)">立即预约
              </el-button>
              <el-button type="text" size="small" v-if="btnAuth.colonscopyList_EXCEL_btn&& scope.row.reserveStatus == '1' && scope.row.dept_code!='anhui'"
                         @click="openBooking(scope.row.id,scope.row.sid)">已预约
              </el-button>
              <el-button type="text" size="small" v-if="btnAuth.colonscopyList_EXCEL_btn && scope.row.cancelBookingState == '2'" @click="cancelBooking(scope.row)">取消预约</el-button>
              <!--<el-button type="text" v-if="btnAuth.colonscopyList_EXCEL_btn">返回代办</el-button>-->
              <router-link :to="{path:'colonscopyDetailHN',query:{id:scope.row.id}}" v-if="scope.row.dept_code=='hunan'">
                <el-button type="text" size="small"
                           v-if="btnAuth.colonscopyList_EXCEL_btn  && scope.row.reserveStatus == '2' && scope.row.examinationStatus == null && scope.row.reserveId != null">
                  查看预约单
                </el-button>
              </router-link>
              <router-link :to="{path:'colonscopyDetailYN',query:{id:scope.row.id}}" v-if="scope.row.dept_code=='yunnan'">
                <el-button type="text" size="small"
                           v-if="btnAuth.colonscopyList_EXCEL_btn  && scope.row.reserveStatus == '2' && scope.row.examinationStatus == null && scope.row.reserveId != null">
                  查看预约单
                </el-button>
              </router-link>
              <router-link :to="{path:'colonscopyDetailXZ',query:{id:scope.row.id}}" v-if="scope.row.dept_code=='xuzhou'">
                <el-button type="text" size="small"
                           v-if="btnAuth.colonscopyList_EXCEL_btn  && scope.row.reserveStatus == '2' && scope.row.examinationStatus == null && scope.row.reserveId != null">
                  查看预约单
                </el-button>
              </router-link>
              <router-link :to="{path:'colonscopyDetailTZ',query:{id:scope.row.id}}" v-if="scope.row.dept_code=='taizhou'">
                <el-button type="text" size="small"
                           v-if="btnAuth.colonscopyList_EXCEL_btn  && scope.row.reserveStatus == '2' && scope.row.examinationStatus == null && scope.row.reserveId != null">
                  查看预约单
                </el-button>
              </router-link>
              <router-link :to="{path:'colonscopyDetailAH',query:{id:scope.row.id}}" v-if="scope.row.dept_code=='anhui'">
                <el-button type="text" size="small"
                           v-if="btnAuth.colonscopyList_EXCEL_btn  && scope.row.reserveStatus == '2' && scope.row.examinationStatus == null && scope.row.reserveId != null">
                  查看预约单
                </el-button>
              </router-link>
              <router-link :to="{path:'colonscopyDetail',query:{id:scope.row.id}}" v-if="scope.row.dept_code!='hunan' && scope.row.dept_code!='yunnan' && scope.row.dept_code!='xuzhou' && scope.row.dept_code!='taizhou' && scope.row.dept_code!='anhui'">
                <el-button type="text" size="small"
                           v-if="btnAuth.colonscopyList_EXCEL_btn  && scope.row.reserveStatus == '2' && scope.row.examinationStatus == null && scope.row.reserveId != null">
                  查看预约单
                </el-button>
              </router-link>

              <el-button type="text" size="small" v-if="btnAuth.colonscopyList_EXCEL_btn && scope.row.notificationIssueStatus == '1'"
                         @click="sendMessage(scope.row.sid,scope.row.phone)">短信通知
              </el-button>
              <el-button type="text" size="small"
                         v-if="btnAuth.colonscopyList_EXCEL_btn  && scope.row.notificationIssueStatus == '1' && scope.row.overallStatusCy !=2 && scope.row.overallStatusCy !=4"
                         @click="openNotificationFormDialog(scope.row.id,scope.row.sid)">发放记录
              </el-button>
              <!--<el-button type="text" v-if="btnAuth.colonscopyList_EXCEL_btn">重新预约</el-button>-->
              <router-link :to="{path:'/colonscopy/report3',query:{id:scope.row.id,show:1}}">
                <el-button type="text" size="small" v-if="btnAuth.colonscopyList_EXCEL_btn && scope.row.notificationEntryStatus==2">查看报告</el-button>
              </router-link>
              <el-button type="text" size="small" v-if="scope.row.notificationIssueStatus==2" @click="openNotificationFormSeeDialog(scope.row.id,scope.row.sid,scope.row)">查看发放记录</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog :visible.sync="bookingDialog" :show-close="false">
          <el-form :model="bookingForm"  :rules="bookingFormRule" ref="bookingForm" >
            <el-form-item label="预约时间" :label-width="formLabelWidth" prop="reserveDate" >
                <el-date-picker
                  v-model="bookingForm.reserveDate"
                  type="date"
                  size="small"
                  ref="survey_date"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            <div  style="text-align: center;margin-top: 40px;">
              <el-button size="small" type="primary" @click="resverEvent1('bookingForm')">确定</el-button>
              <el-button size="small" @click="bookingDialog = false">取 消</el-button>
            </div>
          </el-form>
        </el-dialog>
        <el-dialog :visible.sync="messageDialog" :show-close="false">
          <el-form :model="messageForms"  ref="messageForms" >
            <el-form-item label="短信" :label-width="formLabelWidth" prop="sid" >
              <el-input
                type="textarea"
                disabled
                :autosize="{ minRows: 3, maxRows: 4}"
                placeholder="请输入内容"
                v-model="textarea3">
              </el-input>            </el-form-item>
            <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone" >
              <el-input v-model="messageForms.phone" auto-complete="off" class="notification-input" disabled></el-input>
            </el-form-item>
            <div class="dialog-footer" style="text-align: center;">
              <el-button size="small" type="primary" @click="sureSend('messageForms')">确定</el-button>
              <el-button size="small" @click="messageDialog = false">取 消</el-button>
            </div>
          </el-form>
        </el-dialog>
        <!--分页栏-->
        <el-row>
          <el-col :span="10">
            <div class="grid-content bg-purple"></div>
          </el-col>
          <el-col :span="14">
            <div class="grid-content bg-purple">
              <div class="block" style="margin-top: 18px">
                <el-pagination
                  @size-change="pageSizeChange"
                  @current-change="currentPageChange"
                  :current-page="$store.state.colonscopyListNo"
                  :page-sizes="[10, 20, 50, 100]"
                  v-bind:page-size="$store.state.colonscopyListSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  v-bind:total="queryResult.totalRowCount">
                </el-pagination>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import DICTIONARY from "@/utils/dictionary.js";
  export default {
    data() {
      return {
        notificationFormSeeDialog:false,
        reserveDialog: false,
        notificationFormDialog: false,
        bookingDialog:false,
        isShow: false,
        colonscopyList_page: false,
        btnAuth: {
          one_colonscopyList_btn: false,
          colonscopyList_query_btn: false,
          colonscopyList_EXCEL_btn: false,
          colonscopyList_add_btn: false
        },
        seeGrantForm:{
          notificationIssueDate:'',
          notificationIssueMode:'',
          notificationIssueWorkerCode:'',
          notificationIssueNote:''
        },
        messageDialog:false,
        textarea3:'【结直肠癌筛查项目】感谢您参加中国人群结直肠癌筛查项目！您的结肠镜检查报告已返回，请在工作时间至当地社区领取您的报告。感谢您的配合！（Target-C）',
        "messageForms":{
          "phone":'',
          "sid":'',
        },
        bookingForm:{
          id:null,
          sid:null,
          reserveDate:null,
          bookingEntrance:2,
        },
        bookingFormRule: {
          reserveDate: {required: true, message: '必填', trigger: 'change'},
        },
        //查询条件
        "qc": {
          "name": "",
          "sex": null,
          "phone": "",
          "sid": "",
          "group": null,
          "reserveStatus": "",
          "examinationStatus": "",
          "finishedStatus": null,
          "notificationIssueStatus": null,
          "noCompleteFlag":null,
          "followState":null,
          "followGroup":null,
          "loginName":null,
        },
         followGroup:DICTIONARY.followGroup,
         followStatus:DICTIONARY.followStatus,
        props: {
          value: 'loginName',
          children: 'child',
          label:'name'
        },
        ids:[],
        //查询结果
        "queryResult": {
          "pageNo": 1,//当前页
          "pageSize": 10,//每页的条数
          "totalPageCount": 0,
          "tableData": []
        },
        //编辑表单数据对象
        "updateForm": {
          "nickName": "",
          "phone": "",
          "loginName": ""
        },
        insertForm: {
          "reserveable": '',
          'deptName': '',
          'examinationName': '',
          'period': '',
          'name': ''
        },
        insertFormRules: {
          reserveable: {required: true, message: '必填', trigger: 'change'},
          deptName: {required: true, message: '必填', trigger: 'blur'},
          examinationName: {required: true, message: '必填', trigger: 'blur'},
          period: [{required: false, message: '必填', trigger: 'blur'}],
          name: [{required: false, message: '必填', trigger: 'blur'}],
        },
        notificationForm: {
          "id": '',
          'sid': '',
          'mode': '',
          'workerCode': '',
          'note': '',
          'issueDate': ''
        },
        rules: {
          mode: {required: true, message: '必填', trigger: 'change'},
          issueDate: {required: true, message: '必填', trigger: 'blur'},
          workerCode: {required: true, message: '必填', trigger: 'blur'},
          note: [{required: false, message: '必填', trigger: 'blur'}],
        },
        periodData: [],
        period: '',
        userId: "",
        formLabelWidth: '140px'

      }
    },
    created(){
      if(localStorage.getItem('communityType')=='true'){
        this.ids.push(localStorage.getItem('loginName'));
        this.qc.loginName=localStorage.getItem('loginName');
      }
    },
    mounted() {
      let obj = this.checkPageAuth(this, "colonscopyList_page", this.btnAuth)
      this.qc.sid=this.$route.query.sid;
      this.query(this.$store.state.colonscopyListNo,this.$store.state.colonscopyListSize);
    },
    beforeDestroy(){
      this.$store.state.colonscopyListNo=1;
      this.$store.state.colonscopyListSize=10;
    },
    methods: {
      //获取选中区
      getQcId(value){
        this.qc.loginName =value[0]
      },
      //已预约弹窗
      openBooking(id,sid){
        this.bookingDialog = true
        this.bookingForm.id = id
        this.bookingForm.sid = sid
      },
      changePeriod(obj) {
        this.periodData.forEach((item, index) => {
          if (item.id == obj) {
            this.insertForm.examinationName = item.examinationName;
            this.insertForm.deptName = item.deptName;
            this.insertForm.name = item.name;
            this.insertForm.reserveable = item.reserveable;
            this.allocationId = item.id;
          }
        })
      },
      getMode(value) {
        if (value == '5') {
          this.rules.note[0].required = true
        } else {
          this.rules.note[0].required = false
        }
      },
      openNotificationFormDialog(id, sid) {
        this.notificationFormDialog = true;
        this.notificationForm.id = id
        this.notificationForm.sid = sid
      },
      getServerInfo(colonoscopyRecordId, sid) {
        this.sid = sid;
        this.colonoscopyRecordId = colonoscopyRecordId;
        $axios_http({
          url: "/base/hospital/community/allocation/query",
          data: {},
          vueObj: this
        }).then((res) => {
          if(res.data.data.length>0){
            this.reserveDialog = true;
            this.periodData = res.data.data
            this.insertForm.reserveable=res.data.data[0].reserveable
            this.insertForm.deptName=res.data.data[0].deptName
            this.insertForm.examinationName=res.data.data[0].examinationName
            this.insertForm.period=res.data.data[0].id
            this.insertForm.name=res.data.data[0].name
            this.allocationId = res.data.data[0].id;
            this.period = this.insertForm.period;
          }else{
            this.$message({
              type: 'warning',
              message: '没有可预约的人数，暂时不能预约'
            });
          }

        })
      },
      openNotificationFormSeeDialog(id,sid,row){
        this.seeGrantForm.notificationIssueDate=row.notificationIssueDate;
        this.seeGrantForm.notificationIssueMode=row.notificationIssueMode+'';
        this.seeGrantForm.notificationIssueWorkerCode=row.notificationIssueWorkerCode;
        this.seeGrantForm.notificationIssueNote=row.notificationIssueNote;
        this.notificationFormSeeDialog=true;

        this.notificationForm.id = id;
        this.notificationForm.sid =sid;
      },
      //查询
      query(pageNo,pageSize) {
        $axios_http({
          url: "/base/hospital/colonoscopy/record/query",
          data: {
            name: this.qc.name,
            sid: this.qc.sid,
            phone: this.qc.phone,
            sex: this.qc.sex,
            group: this.qc.group,
            reserveStatus: this.qc.reserveStatus,
            examinationStatus: this.qc.examinationStatus,
            finishedStatus: this.qc.finishedStatus,
            loginName:this.qc.loginName,
            notificationIssueStatus: this.qc.notificationIssueStatus,
            noCompleteFlag:Number(this.qc.noCompleteFlag),
            followState:this.qc.followState,
            followGroup:this.qc.followGroup,
            pageNo: pageNo,//当前页
            pageSize:pageSize//每页条数
          },
          vueObj: this
        }).then((res) => {
          this.$store.commit('get_colonscopyListNo',pageNo)
          this.queryResult.tableData = res.data.data;
          this.queryResult.totalPageCount = res.data.pageInfo.totalPageCount//获取总共多少页
          this.queryResult.totalRowCount = res.data.pageInfo.totalRowCount//获取总共条数
        })
      },
      notificationSure(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            $axios_http({
              url: "/base/colonoscopy/notification/issue/",
              data: {
                id: this.notificationForm.id,
                sid: this.notificationForm.sid,
                mode: this.notificationForm.mode,
                issueDate: this.notificationForm.issueDate,
                workerCode: this.notificationForm.workerCode,
                note: this.notificationForm.note,
              },
              vueObj: this
            }).then((res) => {
//              this.notificationForm.workerCode = ''
//              this.notificationForm.issueDate = ''
//              this.notificationForm.note = ''
//              this.notificationForm.mode = ''
//              this.notificationForm.sid = ''
//              this.notificationForm.id = ''
              this.$refs[formName].resetFields();
              $successMsg(this, "发送成功")
              this.notificationFormDialog = false
              this.query(this.$store.state.colonscopyListNo,this.$store.state.colonscopyListSize);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      //立即预约 确定
      resverEvent(formName) {
        $axios_http({
          url: "/base/hospital/colonoscopy/record/booking",
          data: {
            colonoscopyRecordId: this.colonoscopyRecordId,
            sid: this.sid,
            allocationId: this.allocationId
          },
          vueObj: this
        }).then((res) => {
          $successMsg(this, "预约成功")
          this.reserveDialog = false
          this.query(this.$store.state.colonscopyListNo,this.$store.state.colonscopyListSize);
        })
      },
      cancelBooking(row){
        $axios_http({
          url: "/base/hospital/colonoscopy/record/cancelBooking",
          data: {
            colonoscopyRecordId: row.id,
            sid: row.sid,
          },
          vueObj: this
        }).then((res) => {
          $successMsg(this, "取消成功")
          this.query(this.$store.state.colonscopyListNo,this.$store.state.colonscopyListSize);
        })
      },
      //立即预约
      resverEvent1(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            $axios_http({
              url: "/base/hospital/colonoscopy/record/booking",
              data: {
                colonoscopyRecordId: this.bookingForm.id,
                sid: this.bookingForm.sid,
                bookingEntrance: this.bookingForm.bookingEntrance,
                reserveDate: this.bookingForm.reserveDate
              },
              vueObj: this
            }).then((res) => {
              $successMsg(this, "预约成功")
              this.bookingDialog = false
              this.query(this.$store.state.colonscopyListNo,this.$store.state.colonscopyListSize);
            })
           } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //重置检索条件
      reset() {
        Object.assign(this.$data.qc, this.$options.data().qc);
        if(localStorage.getItem('communityType')=='true'){
          this.ids.push(localStorage.getItem('loginName'));
          this.qc.loginName=localStorage.getItem('loginName');
        }else{
          this.ids = []
        }
        this.query(this.$store.state.colonscopyListNo,this.$store.state.colonscopyListSize);
      },
      //删除一条数据
      del(id) {
        this.$confirm('确认删除数据?', '提示', {
          closeOnClickModal: false,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          $axios_http({
            url: "/base/user/del/" + id,
            vueObj: this
          }).then((res) => {
            $successMsg(this, "删除成功")
            this.query(this.$store.state.colonscopyListNo,this.$store.state.colonscopyListSize);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //每页显示查询结果条数变更事件，做重新查询操作
      pageSizeChange(pageSize) {
        this.$store.commit('get_colonscopyListSize', pageSize)
        //this.queryResult.pageSize = pageSize
        this.query(this.$store.state.colonscopyListNo,pageSize);
      },
      //切换当前页事件，做重新查询操作切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        this.$store.commit('get_colonscopyListNo', currentPage)
        //this.queryResult.pageNo = currentPage
        this.query(currentPage,this.$store.state.colonscopyListSize);
      },
      sendMessage(sid,phone){
        this.messageDialog = true
        this.messageForms.phone = phone
        this.messageForms.sid = sid
      },
      sureSend(formName){
        $axios_http({
          url: "/base/hospital/person/sms/colonoscopy/"+this.messageForms.sid,
          data: {},
          vueObj: this
        }).then((res) => {
          //显示操作成功浮动提示框
          $successMsg(this, "发送成功")

        })
      },

    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .filter-item{
    width:200px;
    margin-right:10px;
  }
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
  .dialog-footer{
    position: absolute;right:20px;bottom:10px;
  }
  .notification-input {
    width: 220px;
  }
</style>
