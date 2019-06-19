<template>
  <div slot="right" class="content-page" v-if="area_colonoscopy_list_page">
    <div class="content">
      <div class="filter-container">
        <router-link to="/home/areaHome">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
        <el-form :model="qc" :inline=true class="clear">
          <div>
            <el-input  style="width: 200px;" size="small" class="filter-item" clearable placeholder="姓名" v-model="qc.name">
            </el-input>
            <el-input  style="width: 200px;" size="small" class="filter-item" clearable placeholder="SID" v-model="qc.sid">
            </el-input>
            <el-input  style="width: 200px;" size="small" class="filter-item" clearable placeholder="手机号" v-model="qc.phone">
            </el-input>
             <el-select v-model="qc.group" placeholder="分组方案" size="small" class="filter-item" clearable>
             <el-option value="A" v-bind:key="1" label="A组"></el-option>
             <el-option value="B" v-bind:key="2" label="B组"></el-option>
             <el-option value="C" v-bind:key="3" label="C组"></el-option>
             <el-option value="Cg" v-bind:key="4" label="C组高危"></el-option>
             <el-option value="Cd" v-bind:key="5" label="C组低危"></el-option>
           </el-select>
           <el-select v-model="qc.reserveStatus" placeholder="是否预约" size="small" class="filter-item" clearable>
             <el-option value="1" v-bind:key="1" label="未预约"></el-option>
             <el-option value="2" v-bind:key="2" label="已预约"></el-option>
           </el-select>
           <el-select v-model="qc.examinationStatus" placeholder="是否检查" size="small" class="filter-item" clearable>
             <el-option value="1" v-bind:key="1" label="未检查"></el-option>
             <el-option value="2" v-bind:key="2" label="已检查"></el-option>
           </el-select>
           <el-select v-model="qc.finishedStatus" placeholder="完成情况" size="small" class="filter-item" clearable>
             <el-option value="1" v-bind:key="1" label="未完成"></el-option>
             <el-option value="2" v-bind:key="2" label="已完成"></el-option>
           </el-select>
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
           <el-select v-model="qc.notificationIssueStatus" placeholder="是否发放" size="small" class="filter-item" clearable>
             <el-option value="1" v-bind:key="1" label="未发放"></el-option>
             <el-option value="2" v-bind:key="2" label="已发放"></el-option>
           </el-select>
           <el-select v-model="qc.resultStatus" placeholder="肠镜结果录入状态" size="small" class="filter-item" clearable>
             <el-option value="1" v-bind:key="1" label="未录入"></el-option>
             <el-option value="2" v-bind:key="2" label="已录入"></el-option>
           </el-select>
           <el-select v-model="qc.signState" placeholder="签到状态" size="small" class="filter-item" clearable>
             <el-option value="1" v-bind:key="1" label="未签到"></el-option>
             <el-option value="2" v-bind:key="2" label="已签到"></el-option>
           </el-select>
             <!-- add -->
           <el-select v-model="qc.noCompleteFlag" placeholder="是否有已检查未完成" size="small" class="filter-item" clearable>
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
               <el-select v-model="qc.followGroup" placeholder="随访分组" size="small" class="filter-item" clearable>
               <el-option v-for="(item,index) in followGroup" 
               :key="index" 
               :value="item.id" 
               :label="item.name">
                </el-option>
              </el-select>
           </div>
           <div>
             <el-button size="small" type="primary" icon="el-icon-search" @click="query(1,$store.state.regionColonscopyListPageSize)">查询</el-button>
             <el-button  type="primary" size="small" icon="el-icon-close" @click="reset" >重置</el-button>
           </div>
        </el-form>
      </div>
      <!-- 立即预约 -->
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
              <el-option :label="item.period" :value="item.id" v-for="item in periodData" :key="item.id"></el-option>
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
      <!-- 重新预约 -->
      <el-dialog :visible.sync="secondDialog">
        <el-form :model="secondForm" ref="secondForm">
           <el-form-item label="剩余放号数量" :label-width="formLabelWidth" prop="reserveable">
            {{this.secondForm.reserveable}}
          </el-form-item>
           <el-form-item label="项目名称" :label-width="formLabelWidth" prop="examinationName">
            <el-input v-model="secondForm.examinationName" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="就诊时间" :label-width="formLabelWidth" prop="period">
            <el-select v-model="secondperiod" placeholder="分组方案" size="small" class="filter-item" @change="changePeriodsecond">
              <el-option :label="item.period" :value="item.id" v-for="item in secondperiodData" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="就诊地点" :label-width="formLabelWidth" prop="deptName">
            <el-input v-model="secondForm.deptName" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="就诊科室" :label-width="formLabelWidth" prop="name">
            <el-input v-model="secondForm.name" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <div class="dialog-footer">
            <el-button size="small" type="primary" @click="secondresverEvent('secondForm')">立即预约</el-button>
            <el-button size="small" @click="secondDialog=false">取 消</el-button>
          </div>
        </el-form>
      </el-dialog>
      <!--  -->
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
      <el-dialog :visible.sync="addFormDialog" :show-close="false">
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
          <div class="dialog-footer" style="text-align: center;">
            <el-button size="small" type="primary" @click="addForm('addForms')" :disabled="!addForms.name">确 定</el-button>
            <el-button size="small" @click="cancel()">取 消</el-button>
          </div>
        </el-form>
      </el-dialog>
      <div >
        <div class="table-btn-grooup">
          <!-- <el-button  size="small" type="primary" icon="el-icon-plus" @click="add()" >新增</el-button> -->
          <el-button  size="small" type="primary" icon="el-icon-document">
            <a :href="downloadUrl">导出EXCEL</a>
          </el-button>
        </div>
        <!--数据列表-->
        <el-table
          :data="queryResult.tableData"
          border
          :default-sort = "{prop: 'inGroupDate', order: 'descending'}"
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
            width="120"
            sortable
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
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            label="检查状态"
          >
            <template slot-scope="scope">
              <el-button type="text" size='small' class="signBtn" v-if="!scope.row.examinationStatus && scope.row.reserveStatus == 2 && scope.row.noInspectFlag==1" @click="sign(scope.row.id,scope.row.sid,2)">已检查</el-button>
              <el-button type="text" size='small' class="signBtn" v-if="!scope.row.examinationStatus && scope.row.reserveStatus == 2 && scope.row.noInspectFlag==1" @click="sign(scope.row.id,scope.row.sid,1)">未检查</el-button>
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
            prop="resultState"
            label="肠镜结果"
            width="140"
          >
            <template slot-scope="scope">
              <router-link :to="{path:'/colonscopy/report1',query:{sid:scope.row.sid,id:scope.row.id,resultId:scope.row.id,flag:2}}">
                <el-button type="text" size='small'  v-if="scope.row.resultState == 1 ">录入</el-button>
              </router-link>
              <!--<el-popover-->
                <!--placement="top"-->
                <!--width="160"-->
                <!--v-model="visible2"-->
                <!--v-if="scope.row.examinationStatus== null && scope.row.reserveStatus == 2">-->
                <!--<p>您确定该受试者未按时就诊？</p>-->
                <!--<div style="text-align: right; margin: 0">-->
                  <!--<el-button size="mini" type="text" @click="visible2 = false">取消</el-button>-->
                  <!--<el-button type="primary" size="mini" @click="sign(scope.row.id,scope.row.sid)">确定</el-button>-->
                <!--</div>-->
                <!--<el-button type="text" slot="reference">未检查</el-button>-->
              <!--</el-popover>-->
                <!-- <el-button type="text" size='small' v-if="scope.row.examinationStatus== null && scope.row.reserveStatus == 2" @click="sign(scope.row.id,scope.row.sid)" >未检查</el-button> -->
              <router-link :to="{path:'/colonscopy/report1',query:{id:scope.row.resultId,sid:scope.row.sid,colonoscopyRecordId:scope.row.id,show:1}}">
                <el-button type="text" size='small' v-if="scope.row.resultState == 2">查看</el-button>
              </router-link>
              <!-- 上传图片 -->
              <uploadFile :id='scope.row.resultId' :flag="1" v-if="scope.row.resultState == 2 && scope.row.finishedStatus == 2" @refreshList='query'></uploadFile>
            </template>
          </el-table-column>
          <el-table-column
            prop="pathologyStatus"
            label="病理结果"
            width="90"
          >
            <template slot-scope="scope">
              <router-link :to="{path:'/colonscopy/report2',query:{sid:scope.row.sid,id:scope.row.id,resultId:scope.row.resultId}}">
                <el-button type="text" size='small' v-if="scope.row.pathologyStatus==1 ">录入</el-button>
              </router-link>
              <router-link :to="{path:'/colonscopy/report2',query:{id:scope.row.pathologyId,sid:scope.row.sid,colonoscopyRecordId:scope.row.id,show:1}}">
                <el-button type="text" size='small' v-if="scope.row.pathologyStatus==2">查看</el-button>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column
            prop="notificationEntryStatus"
            label="告知书结果"
            width="100"
          >
            <template slot-scope="scope">
              <router-link :to="{path:'/colonscopy/noInforming',query:{sid:scope.row.sid,id:scope.row.id}}">
                <el-button type="text" size='small' v-if="scope.row.notificationEntryStatus==1 ">录入</el-button>
              </router-link>
              <router-link :to="{path:'/colonscopy/report3',query:{id:scope.row.id,notificationId:scope.row.notificationId,sid:scope.row.sid,show:1}}">
                <el-button type="text" size='small' v-if="scope.row.notificationEntryStatus==2">查看</el-button>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column
            prop="notificationIssueStatus"
            label="告知书发放"
            width="100"
          >
            <template slot-scope="scope">
                <el-button type="text" size='small' v-if="scope.row.notificationIssueStatus==1 && scope.row.overallStatusCy !=2 && scope.row.overallStatusCy !=4" @click="openNotificationFormDialog(scope.row.id,scope.row.sid)">发放记录</el-button>
                <el-button type="text" size='small' v-if="scope.row.notificationIssueStatus==2" @click="openNotificationFormSeeDialog(scope.row.id,scope.row.sid,scope.row)">查看</el-button>
            </template>
          </el-table-column>
          <!-- 增加操作 -->
           <el-table-column
            fixed="right"
            width="200"
            align="center"
            label="操作">
          <template slot-scope="scope">
              <el-button type="text" size="small" v-if="btnAuth.colonscopyList_book_btn && scope.row.reserveStatus == '1' "
                         @click="getServerInfo(scope.row.id,scope.row.sid)">立即预约
              </el-button>
              <el-button type="text" size="small" v-if="btnAuth.colonscopyList_book_btn && scope.row.reserveStatus == '1' && scope.row.dept_code!='anhui'"
                        @click="openBooking(scope.row.id,scope.row.sid)">已预约
              </el-button>
              <el-button type="text" size="small" v-if="btnAuth.colonscopyList_book_btn && scope.row.chongxinyuyue == '1'"
                        @click="secondBook(scope.row.id,scope.row.sid)">重新预约
              </el-button>
              <el-button type="text" size="small" v-if="btnAuth.colonscopyList_book_btn && scope.row.cancelBookingState == '2'" @click="cancelBooking(scope.row)">取消预约</el-button>
               <router-link :to="{path:'colonscopyDetailHN',query:{id:scope.row.id}}" v-if="scope.row.dept_code=='hunan'">
                 <el-button type="text" size="small"
                           v-if="btnAuth.colonscopyList_book_btn && scope.row.reserveStatus == '2' && scope.row.examinationStatus == null && scope.row.reserveId != null">
                  查看预约单
                </el-button>
               </router-link>
                <router-link :to="{path:'colonscopyDetailYN',query:{id:scope.row.id}}" v-if="scope.row.dept_code=='yunnan'">
                <el-button type="text" size="small"
                           v-if="btnAuth.colonscopyList_book_btn  && scope.row.reserveStatus == '2' && scope.row.examinationStatus == null && scope.row.reserveId != null">
                  查看预约单
                </el-button>
              </router-link>
              <router-link :to="{path:'colonscopyDetailXZ',query:{id:scope.row.id}}" v-if="scope.row.dept_code=='xuzhou'">
                <el-button type="text" size="small"
                           v-if="btnAuth.colonscopyList_book_btn  && scope.row.reserveStatus == '2' && scope.row.examinationStatus == null && scope.row.reserveId != null">
                  查看预约单
                </el-button>
              </router-link>
              <router-link :to="{path:'colonscopyDetailTZ',query:{id:scope.row.id}}" v-if="scope.row.dept_code=='taizhou'">
                <el-button type="text" size="small"
                           v-if="btnAuth.colonscopyList_book_btn  && scope.row.reserveStatus == '2' && scope.row.examinationStatus == null && scope.row.reserveId != null">
                  查看预约单
                </el-button>
              </router-link>
              <router-link :to="{path:'colonscopyDetailAH',query:{id:scope.row.id}}" v-if="scope.row.dept_code=='anhui'">
                <el-button type="text" size="small"
                           v-if="btnAuth.colonscopyList_book_btn  && scope.row.reserveStatus == '2' && scope.row.examinationStatus == null && scope.row.reserveId != null">
                  查看预约单
                </el-button>
              </router-link>
              <router-link :to="{path:'colonscopyDetail',query:{id:scope.row.id}}" v-if="scope.row.dept_code!='hunan' && scope.row.dept_code!='yunnan' && scope.row.dept_code!='xuzhou' && scope.row.dept_code!='taizhou' && scope.row.dept_code!='anhui'">
                <el-button type="text" size="small"
                           v-if="btnAuth.colonscopyList_book_btn  && scope.row.reserveStatus == '2' && scope.row.examinationStatus == null && scope.row.reserveId != null">
                  查看预约单
                </el-button>
              </router-link>
          </template>
           </el-table-column>
        </el-table>
        <el-dialog :visible.sync="signFormDialog" >
          <el-form :model="signForm" ref="notificationForm" >
            <!--<div style="font-size: 18px;text-align: center;">你已经选中{{multipleSelection.length}}人,请选择检查状态</div>-->
            <el-form-item label="检查状态" :label-width="formLabelWidth" ref="examinationStatus">
              <el-radio-group v-model="signForm.examinationStatus" >
                <el-radio :label="2">已检查</el-radio>
                <el-radio :label="1">未检查</el-radio>
              </el-radio-group>
            </el-form-item>
            <div class="dialog-footer" style="text-align: center;">
              <el-button size="small" type="primary" @click="sign('signForm')">确定</el-button>
              <el-button size="small" @click="signFormDialog = false">取 消</el-button>
            </div>
          </el-form>
        </el-dialog>
        <el-dialog :visible.sync="notificationFormDialog" >
          <el-form :model="notificationForm" :rules="rules" ref="notificationForm" >
            <el-form-item label="发放方式" :label-width="formLabelWidth" prop="mode">
              <el-select v-model="notificationForm.mode" placeholder="请选择" @change="getMode">
                <el-option label="受试者/家属到社区中心自取" value="1" ></el-option>
                <el-option label="社区工作人员入户递送"  value="2"></el-option>
                <el-option label="邻居从社区中心捎带取走" value="3" ></el-option>
                <el-option label="受试者/家属到医院自取" value="4"></el-option>
                <el-option label="其它，请备注" value="5"></el-option>
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
            <el-form-item label="工作人员编码" :label-width="formLabelWidth" prop="workerCode" >
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
        <!--分页栏-->
        <el-row>
          <el-col :span="10"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="14"><div class="grid-content bg-purple">
            <div class="block" style="margin-top: 18px">
              <el-pagination
                @size-change="pageSizeChange"
                @current-change="currentPageChange"
                :current-page="$store.state.regionColonscopyListPageNo"
                :page-sizes="[10, 20, 50, 100]"
                v-bind:page-size="$store.state.regionColonscopyListPageSize"
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
import uploadFile from '../components/uploadMultipleFile'
import DICTIONARY from "@/utils/dictionary.js";
let loading;
  export default {
    data () {
      return {
        visible2:false,
        reserveDialog:false,
        secondDialog:false,
        signFormDialog:false,
        addFormDialog:false,
        notificationFormDialog:false,
        notificationFormSeeDialog:false,
        bookingDialog:false,
        bookingForm:{
          id:null,
          sid:null,
          reserveDate:null,
          bookingEntrance:2,
        },
        bookingFormRule: {
          reserveDate: {required: true, message: '必填', trigger: 'change'},
        },
        isShow:false,
        area_colonoscopy_list_page:false,
        downloadUrl: SERVER_NAME + '/base/hospital/colonoscopy/queryForAreaListExcel',
        btnAuth:{
          one_colonscopyList_btn:false,
          colonscopyList_query_btn:false,
          colonscopyList_book_btn:false,
          colonscopyList_add_btn:false,

        },
        //查询条件
        "qc":{
          "name":"",
          "sex":null,
          "phone":"",
          "sid":"",
          "group":null,
          "reserveStatus":"",
          "examinationStatus":"",
          "finishedStatus":null,
          "notificationIssueStatus":null,
          "signState":null,
          "resultStatus":null,
          "communityDeptId":null,
          "loginName":null,
          "noCompleteFlag":null,
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
        //编辑表单数据对象
        "updateForm":{
          "nickName":"",
          "phone":"",
          "loginName":""
        },
        insertForm:{
          "reserveable":'',
          'deptName':'',
          'examinationName':'',
          'period':'',
          'name':''
        },
        secondForm:{
          "reserveable":'',
          'deptName':'',
          'examinationName':'',
          'period':'',
          'name':''
        },
        signForm:{
          "examinationStatus":'',
          "hospitalColonoscopyRecords":[
            {
              id:'',
              sid:''
            }
          ]
        },
        props: {
          value: 'id',
          children: 'child',
          label:'name'
        },
        ids:[],
        multipleSelection:[
        ],
        insertFormRules: {
          reserveable:{required: true, message: '必填', trigger: 'change'},
          deptName:{required: true, message: '必填', trigger: 'blur'},
          examinationName:{required: true, message: '必填', trigger: 'blur'},
          period:[{required: false, message: '必填', trigger: 'blur'}],
          name:[{required: false, message: '必填', trigger: 'blur'}],
        },
        secondFormRules:{
          reserveable:{required: true, message: '必填', trigger: 'change'},
          deptName:{required: true, message: '必填', trigger: 'blur'},
          examinationName:{required: true, message: '必填', trigger: 'blur'},
          period:[{required: false, message: '必填', trigger: 'blur'}],
          name:[{required: false, message: '必填', trigger: 'blur'}],
        },
        notificationForm:{
          "id":'',
          'sid':'',
          'mode':'',
          'workerCode':'',
          'note':'',
          'issueDate':''
        },
        addForms:{
          'sid':'',
          'phone':'',
          'name':'',
        },
        deptGroup:[],
        seeGrantForm:{
          notificationIssueDate:'',
          notificationIssueMode:'',
          notificationIssueWorkerCode:'',
          notificationIssueNote:''
        },
        rules: {
          mode:{required: true, message: '必填', trigger: 'change'},
          issueDate:{required: true, message: '必填', trigger: 'blur'},
          workerCode:{required: true, message: '必填', trigger: 'blur'},
          note:[{required: false, message: '必填', trigger: 'blur'}],
        },
        addFormRules: {
          sid:{required: true, message: '必填', trigger: 'change'},
          name:{required: true, message: '必填', trigger: 'change'},
          phone:{required: true, message: '必填', trigger: 'change'},
        },
        periodData:[],
        secondperiodData:[],
        period:'',
        secondperiod:'',
        userId:"",
        formLabelWidth: '180px',
        colonoscopyRecordId:'',
        sid:'',
        secondcolonoscopyRecordId:'',
        secondsid:''
      }
    },
    components:{
      uploadFile
    },
    mounted(){
      let obj = this.checkPageAuth(this,"area_colonoscopy_list_page",this.btnAuth)
      this.qc.sid=this.$route.query.sid;
      this.query(this.$store.state.regionColonscopyListPageNo,this.$store.state.regionColonscopyListPageSize);
    },
    beforeDestroy(){
      this.$store.state.regionColonscopyListPageNo=1;
      this.$store.state.regionColonscopyListPageSize=10;
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
        }else{
          this.qc.loginName = null;
        }
      },
        cancel(){
          this.addFormDialog = false
          this.$refs['addForms'].resetFields();
        },
      addForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            $axios_http({
              url: "/base/hospital/colonoscopy/record/addColonoscopyRecord",
              data: {
                sid: this.addForms.sid
              },
              vueObj: this
            }).then((res) => {
              $successMsg(this, "添加成功")
              this.addFormDialog = false
              this.$refs['addForms'].resetFields();
              this.query(this.$store.state.regionColonscopyListPageNo,this.$store.state.regionColonscopyListPageSize);
            })
          }
        })
      },
      changePeriod(obj){
        this.periodData.forEach((item,index)=>{
          if(item.id == obj){
            this.insertForm.examinationName=item.examinationName;
            this.insertForm.deptName=item.deptName;
            this.insertForm.name=item.name;
            this.insertForm.reserveable=item.reserveable;
            this.allocationId=item.id;
          }
        })
      },
      changePeriodsecond(obj){
        this.secondperiodData.forEach((item,index)=>{
          if(item.id == obj){
            this.secondForm.examinationName=item.examinationName;
            this.secondForm.deptName=item.deptName;
            this.secondForm.name=item.name;
            this.secondForm.reserveable=item.reserveable;
            this.secondallocationId=item.id;
          }
        })
      },
      add(){
        this.addFormDialog = true
      },
      getInfo(value){
        if (this.addForms.sid){
          $axios_http({
            // url: "/base/hospital/person/detail/get/"+this.addForms.sid,
            url: "/base/hospital/person/detail/getSid",
            data:{
              sid:this.addForms.sid
            },
            vueObj: this
          }).then((res) => {
            // if(res.data.data.base){
            if(res.data.data){
              this.addForms.name = res.data.data[0].name
              this.addForms.phone = res.data.data[0].phone
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
      getMode(value){
        if(value == '5'){
          this.rules.note[0].required = true
        }else {
          this.rules.note[0].required = false
        }
      },
      openNotificationFormDialog(id,sid){
        this.notificationFormDialog=true;
        this.notificationForm.id = id;
        this.notificationForm.sid =sid;
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
      //立即预约
      getServerInfo(colonoscopyRecordId,sid){
        this.sid = sid;
        this.colonoscopyRecordId = colonoscopyRecordId;
         $axios_http({
          url: "/base/hospital/area/allocation/query",
          data: {
            id:colonoscopyRecordId
          },
          vueObj: this
        }).then((res) => {
          if(res.data.data.length>0){
            this.reserveDialog = true;
            this.periodData = res.data.data;
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
      // 已预约弹窗
      openBooking(id,sid){
        this.bookingDialog = true;
        this.bookingForm.id = id
        this.bookingForm.sid = sid
      },
      // 已预约弹窗确定
      resverEvent1(formName){
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
            return false;
          }
        });
      },
      //签到
      sign(id,sid,examinationStatus){
        this.multipleSelection =[]
        var obj ={}
        obj.id=id
        obj.sid=sid
        this.multipleSelection.push(obj)
        this.signForm.hospitalColonoscopyRecords = this.multipleSelection
        this.signForm.examinationStatus = examinationStatus
        $axios_http({
          url: "/base/hospital/examination/updateExaminationStatus",
          data: this.signForm,
          vueObj: this
        }).then((res) => {
          if(res.data.statusMsg=='success'){
              $successMsg(this, "签到成功！");
              this.visible2 = false
              this.query(this.$store.state.regionColonscopyListPageNo,this.$store.state.regionColonscopyListPageSize);
          }
          
        })
      },
      //未检查弹窗
      openSignDialog(count,id,sid){
        if(count==1){
          this.multipleSelection =[]
          var obj ={}
          obj.id=id
          obj.sid=sid
          this.multipleSelection.push(obj)
          this.signFormDialog = true
        }else if(count == 2 && this.multipleSelection.length == 0 ){
          this.$message({
            type:'warning',
            message:'请选择患者'
          })
          return
        }else{
          this.signFormDialog = true
        }

      },
      //查询
      query(pageNo,pageSize){
        $axios_http({
          url:"/base/hospital/colonoscopy/record/query",
          data:{
            name:this.qc.name,
            sid:this.qc.sid,
            phone:this.qc.phone,
            sex:this.qc.sex,
            reserveStatus:this.qc.reserveStatus,
            examinationStatus:this.qc.examinationStatus,
            resultStatus:this.qc.resultStatus,
            signState:this.qc.signState,
            group:this.qc.group,
            finishedStatus:this.qc.finishedStatus,
            communityDeptId:this.qc.communityDeptId,
            loginName:this.qc.loginName,
            notificationIssueStatus:this.qc.notificationIssueStatus,
            noCompleteFlag:Number(this.qc.noCompleteFlag),
            followGroup:this.qc.followGroup,
            followState:this.qc.followState,
            pageNo:pageNo,//当前页
            pageSize:pageSize//每页条数
          },
          vueObj:this
        }).then((res)=>{
          this.$store.commit('get_regionColonscopyListPageNo',pageNo)
          console.log(res.data.data)
          this.queryResult.tableData=res.data.data;
          this.queryResult.totalPageCount=res.data.pageInfo.totalPageCount//获取总共多少页
          this.queryResult.totalRowCount=res.data.pageInfo.totalRowCount//获取总共条数
        })
      },
      notificationSure(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            $axios_http({
              url:"/base/colonoscopy/notification/issue/",
              data:{
                id:this.notificationForm.id,
                sid:this.notificationForm.sid,
                mode:this.notificationForm.mode,
                issueDate:this.notificationForm.issueDate,
                workerCode:this.notificationForm.workerCode,
                note:this.notificationForm.note,
              },
              vueObj:this
            }).then((res)=>{
//              this.notificationForm.workerCode = ''
//              this.notificationForm.issueDate = ''
//              this.notificationForm.note = ''
//              this.notificationForm.mode = ''
//              this.notificationForm.sid = ''
//              this.notificationForm.id = ''
              this.$refs[formName].resetFields();
              $successMsg(this,"发送成功")
              this.notificationFormDialog=false
              this.query(this.$store.state.regionColonscopyListPageNo,this.$store.state.regionColonscopyListPageSize);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      //立即预约
      resverEvent(formName){
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
          this.query(this.$store.state.regionColonscopyListPageNo,this.$store.state.regionColonscopyListPageSize);
        })
      },
      secondresverEvent(formName){
        $axios_http({
          url: "/base/hospital/colonoscopy/record/rebooking",
          data: {
            colonoscopyRecordId: this.secondcolonoscopyRecordId,
            sid: this.secondsid,
            allocationId: this.secondallocationId
          },
          vueObj: this
        }).then((res) => {
          $successMsg(this, "重新预约成功")
          this.secondDialog = false
          this.query(this.$store.state.regionColonscopyListPageNo,this.$store.state.regionColonscopyListPageSize);
        })
      },
      //重置检索条件
      reset(){
        Object.assign(this.$data.qc, this.$options.data().qc)
        this.ids = []
        this.query(this.$store.state.regionColonscopyListPageNo,this.$store.state.regionColonscopyListPageSize);
      },
      //删除一条数据
      del(id){
        this.$confirm('确认删除数据?', '提示', {
          closeOnClickModal:false,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          $axios_http({
            url:"/base/user/del/"+id,
            vueObj:this
          }).then((res)=>{
            $successMsg(this,"删除成功")
            this.query(this.$store.state.regionColonscopyListPageNo,this.$store.state.regionColonscopyListPageSize);
          })
        }).catch(() => {
          this.$successMsg({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //每页显示查询结果条数变更事件，做重新查询操作
      pageSizeChange(pageSize) {
        this.$store.commit('get_regionColonscopyListPageSize', pageSize)
        this.query(this.$store.state.regionColonscopyListPageNo,pageSize);
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        this.$store.commit('get_regionColonscopyListPageNo',currentPage)
        this.query(currentPage,this.$store.state.regionColonscopyListPageSize);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      //重新预约
      secondBook(colonoscopyRecordId,sid){
        this.secondcolonoscopyRecordId = colonoscopyRecordId;
        this.secondsid = sid;
        $axios_http({
          url: "/base/hospital/area/allocation/query",
          data: {
            id:colonoscopyRecordId
          },
          vueObj:this
        }).then((res) => {
          if(res.data.data.length>0){
            this.secondDialog = true;
            this.secondperiodData = res.data.data;
            this.secondForm.reserveable=res.data.data[0].reserveable
            this.secondForm.deptName=res.data.data[0].deptName
            this.secondForm.examinationName=res.data.data[0].examinationName
            this.secondForm.period=res.data.data[0].id
            this.secondForm.name=res.data.data[0].name
            this.secondallocationId = res.data.data[0].id;
            this.secondperiod = this.secondForm.period;
          }else{
            this.$message({
              type: 'warning',
              message: '没有可预约的人数，暂时不能预约'
            });
          }
        })
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
  .signBtn{
    margin:0;
  }
  .upload-demo{
    display: inline-block;
    margin-left: 10px;
  }
  .dialog-footer{
    position: absolute;right:20px;bottom:10px;
  }
</style>
