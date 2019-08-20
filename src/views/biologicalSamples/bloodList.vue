<template>
  <div slot="right" class="content-page" v-if="bloodList_page">
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
           <!--<el-select v-model="qc.courierStatus" placeholder="快递状态" size="small" class="filter-item"   clearable>-->
             <!--<el-option value="1" v-bind:key="1" label="已接收"></el-option>-->
             <!--<el-option value="2" v-bind:key="2" label="未寄出"></el-option>-->
             <!--<el-option value="3  " v-bind:key="3" label="已寄出"></el-option>-->
           <!--</el-select>-->
           <!--<el-select v-model="qc.sampleType" placeholder="样本类型" size="small" class="filter-item"   clearable>-->
             <!--<el-option value="S" v-bind:key="1" label="血清样本"></el-option>-->
             <!--<el-option value="P" v-bind:key="2" label="血浆样本"></el-option>-->
             <!--<el-option value="W" v-bind:key="3" label="白细胞样本"></el-option>-->
           <!--</el-select>-->
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
           <el-select v-model="qc.sCourierStatus" placeholder="血清快递状态" size="small" class="filter-item"   clearable>
             <el-option value="2" v-bind:key="2" label="未寄出"></el-option>
             <el-option value="3" v-bind:key="3" label="已寄出"></el-option>
             <el-option value="1" v-bind:key="1" label="已接收"></el-option>
           </el-select>
           </div>
           <div>
           <el-select v-model="qc.pCourierStatus" placeholder="血浆快递状态" size="small" class="filter-item"   clearable>
             <el-option value="2" v-bind:key="2" label="未寄出"></el-option>
             <el-option value="3" v-bind:key="3" label="已寄出"></el-option>
             <el-option value="1" v-bind:key="1" label="已接收"></el-option>
           </el-select>
           <el-select v-model="qc.wCourierStatus" placeholder="白细胞快递状态" size="small" class="filter-item"   clearable>
             <el-option value="2" v-bind:key="2" label="未寄出"></el-option>
             <el-option value="3" v-bind:key="3" label="已寄出"></el-option>
             <el-option value="1" v-bind:key="1" label="已接收"></el-option>
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
             <el-button size="small" type="primary" icon="el-icon-search" @click="query(1,$store.state.bloodListPageSize)">查询</el-button>
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
            <div v-for="(item,index) in addForm.hospitalBiologicalSampleResultPOList" class="clearfloat" :key="index">
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
      <el-dialog
        title="血液样本"
        :visible.sync="showVisible"
        width="70%"
       >
        <el-form :model="showForm" :inline="true">
          <el-form-item label="采样日期" :label-width="formLabelWidth" prop="collectStatusDateBySql" >
            <el-date-picker
              v-model="showForm.collectStatusDateBySql"
              type="date"
              disabled
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="采样日期"
              size="small"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="样本ID" :label-width="formLabelWidth" prop="sampleId">
            <el-input v-model="showForm.sampleId" auto-complete="off" disabled class="notification-input" size="small"></el-input>
          </el-form-item>
          <div >
            <div v-for="(item,index) in showForm.hospitalBiologicalSampleResultPOList" class="clearfloat" :key="index">
              <el-form-item :label="item.name" :label-width="formLabelWidth" prop="sampleId" style="float: left;">
                <el-checkbox v-model="item.checklist" disabled ></el-checkbox>
              </el-form-item>
              <el-form-item label="冷冻盒编号" label-width="120px" prop="frozenBoxCode" style="float: left;">
                <el-input v-model="item.frozenBoxCode" disabled auto-complete="off" class="notification-input" size="mini" style="width: 120px;"></el-input>
              </el-form-item>
              <div class="clearfloat" style="float: left;" v-if="item.sampleType == 'W'">
                <el-form-item  label="位置" label-width="50px"  style="float: left;">
                  <el-input v-model="item.sampleColumnAndLine[0]" disabled auto-complete="off" style="width:50px;margin-left: 20px"  size="mini" ></el-input>
                </el-form-item>
              </div>
              <div class="clearfloat" style="float: left;" v-else>
                <el-form-item  label="位置" label-width="50px" style="float: left;">
                    <el-input v-model="item.sampleColumnAndLine[0]" disabled auto-complete="off" style="width:50px;margin-left: 20px"  size="mini" ></el-input>
                    <el-input v-model="item.sampleColumnAndLine[1]" disabled auto-complete="off" style="width:50px;margin-left: 20px"  size="mini" ></el-input>
                    <el-input v-model="item.sampleColumnAndLine[2]" disabled auto-complete="off" style="width:50px;margin-left: 20px"  size="mini" ></el-input>
                    <el-input v-model="item.sampleColumnAndLine[3]" disabled auto-complete="off" style="width:50px;margin-left: 20px"  size="mini" ></el-input>
                    <el-input v-model="item.sampleColumnAndLine[4]" disabled auto-complete="off" style="width:50px;margin-left: 20px"  size="mini" ></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
          <el-form-item label="备注" :label-width="formLabelWidth" prop="sampleId">
            <el-input v-model="showForm.sampleNote" auto-complete="off" disabled class="notification-input" size="small"></el-input>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog :visible.sync="insertDialog"  title="血液样本" :show-close="false"   width="70%" :before-close="handleClose2">
        <el-form :model="insertForm" :rules="insertFormRule" ref="insertForm" :inline="true">
          <el-form-item label="SID" :label-width="formLabelWidth" prop="sid">
            <el-input v-model="insertForm.sid" auto-complete="off"  class="notification-input" size="small" @change="getInsertFormInfo"></el-input>
          </el-form-item>
          <el-form-item label="采样日期" :label-width="formLabelWidth" prop="collectStatusDateBySql" >
            <el-date-picker
              v-model="insertForm.collectStatusDateBySql"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="采样日期"
              size="small"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="样本ID" :label-width="formLabelWidth" prop="sampleId">
            <el-input v-model="insertForm.sampleId" auto-complete="off" :disabled="disabled" class="notification-input" size="small"></el-input>
          </el-form-item>
          <div >
            <div v-for="(item,index) in insertForm.hospitalBiologicalSampleResultPOList" class="clearfloat" :key="index">
            <el-form :model="item" :rules="formRule" ref="form" :inline="true">
              <el-form-item :label="item.name" :label-width="formLabelWidth" prop="sampleId" style="float: left;">
                <el-checkbox v-model="item.checklist" @change="changeList(item,index)"></el-checkbox>
              </el-form-item>
              <el-form-item label="冷冻盒编号" label-width="120px" prop="frozenBoxCode" style="float: left;">
                <el-input v-model="item.frozenBoxCode" :disabled="!item.checklist" auto-complete="off" class="notification-input" size="mini" style="width: 120px;"></el-input>
                <!--<p style="margin-top:-15px;color:red;font-size:12px;">该冷冻盒已被占用</p>-->
              </el-form-item>
              <div  style="display: block;" v-if="item.sampleType == 'W'">
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
              <div v-else>
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
              </el-form>
            </div>
            <el-form-item label="备注" :label-width="formLabelWidth" prop="sampleNote">
              <el-input v-model="insertForm.sampleNote" auto-complete="off"  class="notification-input" size="small"></el-input>
            </el-form-item>
          </div>
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
            label="血清快递状态"
            width="120"
          >
          <template slot-scope="scope">
              <span>{{scope.row.sCourierStatus | courierStatus}}</span>
            </template>
          </el-table-column>
           <el-table-column
            label="血浆快递状态"
            width="120"
          >
           <template slot-scope="scope">
              <span>{{scope.row.pCourierStatus | courierStatus}}</span>
            </template>
          </el-table-column>
           <el-table-column
            label="白细胞快递状态"
            width="120"
          >
          <template slot-scope="scope">
              <span>{{scope.row.wCourierStatus | courierStatus}}</span>
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
          <!--<el-table-column-->
            <!--label="快递状态"-->
            <!--width="100"-->
          <!--&gt;-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{scope.row.courierStatus | courierStatus}}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column
            label="操作"
            width="150"
            align="center"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button type="text" class="btnStyle" @click="openInsertDialog(scope.row)" v-if="scope.row.collectStatus == -1">录入</el-button>
              <el-button type="text" class="btnStyle" @click="showData(scope.row)" v-if="scope.row.collectStatus == 1 && scope.row.approvalStatus!=1">查看</el-button>
              <el-button type="text" class="btnStyle" @click="openCancel(scope.row)" v-if="scope.row.collectStatus == -1">未提供</el-button>
              <el-button type="text" @click="applyEdit(scope.row)" v-if="scope.row.collectStatus == 1 && scope.row.applyStatus==0 && !(scope.row.pCourierStatus==1 || scope.row.pCourierStatus==3 || scope.row.sCourierStatus==1 || scope.row.sCourierStatus==3 || scope.row.wCourierStatus==1 || scope.row.wCourierStatus==3)">申请编辑</el-button>
              <el-button type="text" @click="del(scope.row)" 
              v-if="scope.row.collectStatus == 1 && scope.row.applyStatus==0 && !(scope.row.pCourierStatus==1 || scope.row.pCourierStatus==3 || scope.row.sCourierStatus==1 || scope.row.sCourierStatus==3 || scope.row.wCourierStatus==1 || scope.row.wCourierStatus==3)">删除</el-button>
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
                :current-page="$store.state.bloodListPageNo"
                :page-sizes="[10, 20, 50, 100]"
                v-bind:page-size="$store.state.bloodListPageSize"
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
          url: "/base/hospital/person/info/checkSid/" + this.insertForm.sid,
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
      } else if (!/^CS-T1[0-9]{5}$/.test(value)) {
        callback(new Error("样本ID格式不正确"));
      } else {
        callback();
      }
    };
    var validatefrozenBoxCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("冷冻盒编号不能为空"));
      } else if (!/^CS-T1[0-9]{1}[SWP]{1}[0-9]{3}$/.test(value)) {
        callback(new Error("冷冻盒编号格式不正确"));
      } else {
        callback();
        //            var position = null
        //            var sampleType = null
        //            for(let i =0;i<this.addForm.hospitalBiologicalSampleResultPOList.length;i++){
        //                if(value == this.addForm.hospitalBiologicalSampleResultPOList[i].frozenBoxCode){
        //                    if(this.addForm.hospitalBiologicalSampleResultPOList[i].num.length=='2'){
        //                      position = this.addForm.hospitalBiologicalSampleResultPOList[i].sampleColumnAndLine
        //                      sampleType = this.addForm.hospitalBiologicalSampleResultPOList[i].sampleType
        //                    }
        //                }
        //            }
        //          if(position != null && sampleType!=null){
        //            $axios_http({
        //              url: "/base/area/biological/sample/checkFrozen",
        //              data:{
        //                frozenBoxCode:value,
        //                sampleColumnAndLine:position,
        //                sampleType:sampleType
        //              },
        //              vueObj: this
        //            }).then((res) => {
        //              if(res.data.statusCode == 900005){
        //                callback(new Error('冷冻盒编码格式存在问题'))
        //              }else if (res.data.statusCode == '900001'){
        //                callback(new Error('该位置已经存在采集管'))
        //              }
        //              else if (res.data.statusCode == '000000'){
        //                callback()
        //              }
        //            })
        //          }
      }
    };
    return {
      applyArr: {}, //申请编辑快递相关信息
      editBtn: false, //申请编辑按钮
      disabled: false,
      addFormDialog: false,
      insertDialog: false,
      quitDialog: false,
      addVisible: false,
      notificationFormSeeDialog: false,
      bloodList_page: false,
      downloadUrl: SERVER_NAME + "/base/hospital/sample/bloodSampleQueryExcel",
      btnAuth: {
        one_colonscopyList_btn: false,
        colonscopyList_query_btn: false,
        colonscopyList_EXCEL_btn: false,
        colonscopyList_add_btn: false
      },
      title: "",
      //查询条件
      qc: {
        name: "",
        sex: null,
        phone: "",
        sid: "",
        group: null,
        sampleType: null,
        sampleId: null,
        frozenBoxCode: null,
        courierStatus: null,
        collectStatus: null,
        communityDeptId: null,
        loginName: null,
        collectStatusStartDate: null,
        collectStatusEndDate: null,
        sampleTypeAll3: "A",
        sCourierStatus: null, //血清快递状态血清快递状态
        pCourierStatus: null, //血浆快递状态
        wCourierStatus: null, //白细胞快递状态
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
      id: "",
      showVisible: false,
      showForm: {},
      insertFormRules: {
        reserveable: { required: true, message: "必填", trigger: "change" },
        deptName: { required: true, message: "必填", trigger: "blur" },
        examinationName: { required: true, message: "必填", trigger: "blur" },
        period: [{ required: false, message: "必填", trigger: "blur" }],
        name: [{ required: false, message: "必填", trigger: "blur" }]
      },
      insertForm: {
        sid: "TC",
        sampleId: "",
        collectStatusDateBySql: "",
        hospitalBiologicalSampleResultPOList: [
          {
            frozenBoxCode: "",
            checklist: false,
            selectedOptions: "",
            num: [],
            name: "血浆",
            sampleColumnAndLine: [],
            sampleType: "P"
          },
          {
            checklist: false,
            sampleColumnAndLine: [],
            selectedOptions: "",
            num: [],
            sampleType: "S",
            name: "血清",
            frozenBoxCode: ""
          },
          {
            frozenBoxCode: "",
            num: [],
            checklist: false,
            name: "白细胞",
            sampleColumnAndLine: [],
            sampleType: "W"
          }
        ],
        sampleType: "A",
        sampleNote: ""
      },
      addForm: {
        id: "",
        collectStatus: "1",
        sampleId: "",
        collectStatusDateBySql: "",
        hospitalBiologicalSampleResultPOList: [
          {
            bloodSampleId: "",
            frozenBoxCode: "",
            checklist: false,
            selectedOptions: "",
            num: [],
            name: "血浆",
            sampleColumnAndLine: [],
            sampleType: "P"
          },
          {
            bloodSampleId: "",
            checklist: false,
            sampleColumnAndLine: [],
            selectedOptions: "",
            num: [],
            sampleType: "S",
            name: "血清",
            frozenBoxCode: ""
          },
          {
            bloodSampleId: "",
            frozenBoxCode: "",
            num: [],
            checklist: false,
            name: "白细胞",
            sampleColumnAndLine: [],
            sampleType: "W"
          }
        ],
        sampleType: "A",
        sampleNote: ""
      },
      insertFormRule: {
        sid: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validateSid, trigger: "blur" }
        ],
        collectStatusDateBySql: [
          { required: true, message: "必填", trigger: "blur" }
        ],
        sampleId: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validateSampleId, trigger: "blur" }
        ]
      },
      addFormRule: {
        sid: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validateSid, trigger: "blur" }
        ],
        collectStatusDateBySql: [
          { required: true, message: "必填", trigger: "blur" }
        ],
        sampleId: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validateSampleId, trigger: "blur" }
        ]
      },
      formRule: {
        frozenBoxCode: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validatefrozenBoxCode, trigger: "blur" }
        ],
        num: [{ required: true, message: "必填", trigger: "blur" }]
      },
      multipleTable: [],
      deptGroup: [],
      addFormSid: "",
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
      formLabelWidth: "120px",
      sampleColumnOption: [
        {
          value: "A",
          label: "A",
          children: [
            {
              value: "1",
              label: "1"
            },
            {
              value: "2",
              label: "2"
            },
            {
              value: "3",
              label: "3"
            },
            {
              value: "4",
              label: "4"
            },
            {
              value: "5",
              label: "5"
            },
            {
              value: "6",
              label: "6"
            },
            {
              value: "7",
              label: "7"
            },
            {
              value: "8",
              label: "8"
            },
            {
              value: "9",
              label: "9"
            },
            {
              value: "10",
              label: "10"
            }
          ]
        },
        {
          value: "B",
          label: "B",
          children: [
            {
              value: "1",
              label: "1"
            },
            {
              value: "2",
              label: "2"
            },
            {
              value: "3",
              label: "3"
            },
            {
              value: "4",
              label: "4"
            },
            {
              value: "5",
              label: "5"
            },
            {
              value: "6",
              label: "6"
            },
            {
              value: "7",
              label: "7"
            },
            {
              value: "8",
              label: "8"
            },
            {
              value: "9",
              label: "9"
            },
            {
              value: "10",
              label: "10"
            }
          ]
        },
        {
          value: "C",
          label: "C",
          children: [
            {
              value: "1",
              label: "1"
            },
            {
              value: "2",
              label: "2"
            },
            {
              value: "3",
              label: "3"
            },
            {
              value: "4",
              label: "4"
            },
            {
              value: "5",
              label: "5"
            },
            {
              value: "6",
              label: "6"
            },
            {
              value: "7",
              label: "7"
            },
            {
              value: "8",
              label: "8"
            },
            {
              value: "9",
              label: "9"
            },
            {
              value: "10",
              label: "10"
            }
          ]
        },
        {
          value: "D",
          label: "D",
          children: [
            {
              value: "1",
              label: "1"
            },
            {
              value: "2",
              label: "2"
            },
            {
              value: "3",
              label: "3"
            },
            {
              value: "4",
              label: "4"
            },
            {
              value: "5",
              label: "5"
            },
            {
              value: "6",
              label: "6"
            },
            {
              value: "7",
              label: "7"
            },
            {
              value: "8",
              label: "8"
            },
            {
              value: "9",
              label: "9"
            },
            {
              value: "10",
              label: "10"
            }
          ]
        },
        {
          value: "E",
          label: "E",
          children: [
            {
              value: "1",
              label: "1"
            },
            {
              value: "2",
              label: "2"
            },
            {
              value: "3",
              label: "3"
            },
            {
              value: "4",
              label: "4"
            },
            {
              value: "5",
              label: "5"
            },
            {
              value: "6",
              label: "6"
            },
            {
              value: "7",
              label: "7"
            },
            {
              value: "8",
              label: "8"
            },
            {
              value: "9",
              label: "9"
            },
            {
              value: "10",
              label: "10"
            }
          ]
        },
        {
          value: "F",
          label: "F",
          children: [
            {
              value: "1",
              label: "1"
            },
            {
              value: "2",
              label: "2"
            },
            {
              value: "3",
              label: "3"
            },
            {
              value: "4",
              label: "4"
            },
            {
              value: "5",
              label: "5"
            },
            {
              value: "6",
              label: "6"
            },
            {
              value: "7",
              label: "7"
            },
            {
              value: "8",
              label: "8"
            },
            {
              value: "9",
              label: "9"
            },
            {
              value: "10",
              label: "10"
            }
          ]
        },
        {
          value: "G",
          label: "G",
          children: [
            {
              value: "1",
              label: "1"
            },
            {
              value: "2",
              label: "2"
            },
            {
              value: "3",
              label: "3"
            },
            {
              value: "4",
              label: "4"
            },
            {
              value: "5",
              label: "5"
            },
            {
              value: "6",
              label: "6"
            },
            {
              value: "7",
              label: "7"
            },
            {
              value: "8",
              label: "8"
            },
            {
              value: "9",
              label: "9"
            },
            {
              value: "10",
              label: "10"
            }
          ]
        },
        {
          value: "H",
          label: "H",
          children: [
            {
              value: "1",
              label: "1"
            },
            {
              value: "2",
              label: "2"
            },
            {
              value: "3",
              label: "3"
            },
            {
              value: "4",
              label: "4"
            },
            {
              value: "5",
              label: "5"
            },
            {
              value: "6",
              label: "6"
            },
            {
              value: "7",
              label: "7"
            },
            {
              value: "8",
              label: "8"
            },
            {
              value: "9",
              label: "9"
            },
            {
              value: "10",
              label: "10"
            }
          ]
        },
        {
          value: "I",
          label: "I",
          children: [
            {
              value: "1",
              label: "1"
            },
            {
              value: "2",
              label: "2"
            },
            {
              value: "3",
              label: "3"
            },
            {
              value: "4",
              label: "4"
            },
            {
              value: "5",
              label: "5"
            },
            {
              value: "6",
              label: "6"
            },
            {
              value: "7",
              label: "7"
            },
            {
              value: "8",
              label: "8"
            },
            {
              value: "9",
              label: "9"
            },
            {
              value: "10",
              label: "10"
            }
          ]
        },
        {
          value: "J",
          label: "J",
          children: [
            {
              value: "1",
              label: "1"
            },
            {
              value: "2",
              label: "2"
            },
            {
              value: "3",
              label: "3"
            },
            {
              value: "4",
              label: "4"
            },
            {
              value: "5",
              label: "5"
            },
            {
              value: "6",
              label: "6"
            },
            {
              value: "7",
              label: "7"
            },
            {
              value: "8",
              label: "8"
            },
            {
              value: "9",
              label: "9"
            },
            {
              value: "10",
              label: "10"
            }
          ]
        }
      ],
      sampleColumnOptions: [
        {
          value: "A",
          label: "A",
          children: [
            {
              value: "1",
              label: "1"
            },
            {
              value: "6",
              label: "6"
            }
          ]
        },
        {
          value: "B",
          label: "B",
          children: [
            {
              value: "1",
              label: "1"
            },
            {
              value: "6",
              label: "6"
            }
          ]
        },
        {
          value: "C",
          label: "C",
          children: [
            {
              value: "1",
              label: "1"
            },
            {
              value: "6",
              label: "6"
            }
          ]
        },
        {
          value: "D",
          label: "D",
          children: [
            {
              value: "1",
              label: "1"
            },
            {
              value: "6",
              label: "6"
            }
          ]
        },
        {
          value: "E",
          label: "E",
          children: [
            {
              value: "1",
              label: "1"
            },
            {
              value: "6",
              label: "6"
            }
          ]
        },
        {
          value: "F",
          label: "F",
          children: [
            {
              value: "1",
              label: "1"
            },
            {
              value: "6",
              label: "6"
            }
          ]
        },
        {
          value: "G",
          label: "G",
          children: [
            {
              value: "1",
              label: "1"
            },
            {
              value: "6",
              label: "6"
            }
          ]
        },
        {
          value: "H",
          label: "H",
          children: [
            {
              value: "1",
              label: "1"
            },
            {
              value: "6",
              label: "6"
            }
          ]
        },
        {
          value: "I",
          label: "I",
          children: [
            {
              value: "1",
              label: "1"
            },
            {
              value: "6",
              label: "6"
            }
          ]
        },
        {
          value: "J",
          label: "J",
          children: [
            {
              value: "1",
              label: "1"
            },
            {
              value: "6",
              label: "6"
            }
          ]
        }
      ],

      sampleLineOptions: [],
      checkTable1: [],
      addForms: {},
      checkTable: [
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
        },
        {
          label: "E",
          value: "E"
        },
        {
          label: "F",
          value: "F"
        },
        {
          label: "G",
          value: "G"
        },
        {
          label: "H",
          value: "H"
        },
        {
          label: "I",
          value: "I"
        },
        {
          label: "J",
          value: "J"
        }
      ],
      checkCount1: [
        {
          label: 1,
          value: 1
        },
        {
          label: 6,
          value: 6
        }
      ],
      checkCount: [
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
        },
        {
          label: 5,
          value: 5
        },
        {
          label: 6,
          value: 6
        },
        {
          label: 7,
          value: 7
        },
        {
          label: 8,
          value: 8
        },
        {
          label: 9,
          value: 9
        },
        {
          label: 10,
          value: 10
        }
      ],
      sampleType: "",
      props: {
        value: "id",
        children: "child",
        label: "name"
      },
      ids: []
    };
  },
  components: {
    applyOpen
  },
  mounted() {
    let obj = this.checkPageAuth(this, "bloodList_page", this.btnAuth);
    this.qc.sid = this.$route.query.sid;
    this.query(
      this.$store.state.bloodListPageNo,
      this.$store.state.bloodListPageSize
    );
  },
  beforeDestroy() {
    this.$store.state.bloodListPageNo = 1;
    this.$store.state.bloodListPageSize = 10;
  },
  methods: {
    // 申请编辑
    applyEdit(row) {
      this.$refs.applyOpenVisible.applyOpenVisible = true;
      this.applyArr.id = row.id;
      this.applyArr.formType = "HOSPITAL_BIOLOGICAL_SAMPLE_RESULT";
    },
    updateCourierResult(row) {
      this.addVisible = true;
      this.editBtn = true; //能编辑
      $axios_http({
        url: "/base/area/sample/result/querySampleBloodId",
        data: {
          id: row.id
        },
        vueObj: this
      }).then(res => {
        var arr = res.data.data;
        this.addForm.sid = arr.sid;
        (this.addForm.id = arr.id),
          (this.addForm.collectStatus = arr.collectStatus);
        this.addForm.sampleId = arr.sampleId;
        this.addForm.collectStatusDateBySql = arr.collectStatusDateBySql;
        this.addForm.sampleNote = arr.sampleNote;
        arr.hospitalBiologicalSampleResultPOList.filter(ele => {
          if (ele.sampleType == "S" && ele.sampleColumnAndLine) {
            this.addForm.hospitalBiologicalSampleResultPOList[1].bloodSampleId =
              ele.bloodSampleId;
            this.addForm.hospitalBiologicalSampleResultPOList[1].checklist = true;
            this.addForm.hospitalBiologicalSampleResultPOList[1].sampleColumnAndLine =
              ele.sampleColumnAndLine;
            this.addForm.hospitalBiologicalSampleResultPOList[1].selectedOptions =
              ele.selectedOptions;
            this.addForm.hospitalBiologicalSampleResultPOList[1].num = ele.sampleColumnAndLine[0].split(
              ""
            );
            this.addForm.hospitalBiologicalSampleResultPOList[1].frozenBoxCode =
              ele.frozenBoxCode;
            this.addForm.hospitalBiologicalSampleResultPOList[1].id = ele.id;
          } else if (ele.sampleType == "P" && ele.sampleColumnAndLine) {
            this.addForm.hospitalBiologicalSampleResultPOList[0].bloodSampleId =
              ele.bloodSampleId;
            this.addForm.hospitalBiologicalSampleResultPOList[0].checklist = true;
            this.addForm.hospitalBiologicalSampleResultPOList[0].sampleColumnAndLine =
              ele.sampleColumnAndLine;
            this.addForm.hospitalBiologicalSampleResultPOList[0].selectedOptions =
              ele.selectedOptions;
            this.addForm.hospitalBiologicalSampleResultPOList[0].num = ele.sampleColumnAndLine[0].split(
              ""
            );
            this.addForm.hospitalBiologicalSampleResultPOList[0].frozenBoxCode =
              ele.frozenBoxCode;
            this.addForm.hospitalBiologicalSampleResultPOList[0].id = ele.id;
          } else if (ele.sampleType == "W" && ele.sampleColumnAndLine) {
            this.addForm.hospitalBiologicalSampleResultPOList[2].bloodSampleId =
              ele.bloodSampleId;
            this.addForm.hospitalBiologicalSampleResultPOList[2].checklist = true;
            this.addForm.hospitalBiologicalSampleResultPOList[2].sampleColumnAndLine =
              ele.sampleColumnAndLine;
            this.addForm.hospitalBiologicalSampleResultPOList[2].selectedOptions =
              ele.selectedOptions;
            this.addForm.hospitalBiologicalSampleResultPOList[2].num = ele.sampleColumnAndLine[0].split(
              ""
            );
            this.addForm.hospitalBiologicalSampleResultPOList[2].frozenBoxCode =
              ele.frozenBoxCode;
            this.addForm.hospitalBiologicalSampleResultPOList[2].id = ele.id;
          }
        });
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
    verification(value, position, sampleType) {
      $axios_http({
        url: "/base/area/biological/sample/checkFrozen",
        data: {
          frozenBoxCode: value,
          sampleColumnAndLine: position,
          sampleType: sampleType
        },
        vueObj: this
      }).then(res => {
        if (res.data.statusCode == 900005) {
          callback(new Error("冷冻盒编码格式存在问题"));
        } else if (res.data.statusCode == "000000") {
          callback();
        }
      });
    },
    changeList(item, index) {
      if (item.checklist == false) {
        //
        console.log(this.$refs.form[index]);
        this.$refs.form[index].resetFields;
        item.num = [];
        item.frozenBoxCode = "";
        item.sampleColumnAndLine = [];
      }
    },
    changeList1(item, index) {
      if (item.checklist == false) {
        item.num = [];
        item.frozenBoxCode = "";
        item.sampleColumnAndLine = [];
        this.$refs.forms[index].resetFields;
      }
    },
    //根据sid获取编号格式
    getInsertFormInfo(value) {
      // 浙江2 逢6改1
      let num = "";
      num = value.substr(2, 1);
      // if (num == 6) {
      //   num = 1;
      // }
      this.insertForm.sampleId = "CS-T1" + num;
      this.insertForm.hospitalBiologicalSampleResultPOList[0].frozenBoxCode =
        "CS-T1" + num + "P";
      this.insertForm.hospitalBiologicalSampleResultPOList[1].frozenBoxCode =
        "CS-T1" + num + "S";
      this.insertForm.hospitalBiologicalSampleResultPOList[2].frozenBoxCode =
        "CS-T1" + num + "W";
    },
    //查看样本弹窗
    showData(row) {
      $axios_http({
        url: "/base/area/sample/result/querySampleBloodId",
        data: {
          id: row.id
        },
        vueObj: this
      }).then(res => {
        this.showVisible = true;
        this.showForm = res.data.data;
        for (
          let i = 0;
          i < this.showForm.hospitalBiologicalSampleResultPOList.length;
          i++
        ) {
          if (
            this.showForm.hospitalBiologicalSampleResultPOList[i]
              .sampleColumnAndLine == null
          ) {
            this.showForm.hospitalBiologicalSampleResultPOList[
              i
            ].sampleColumnAndLine = ["", "", "", "", ""];
          }
          if (
            this.showForm.hospitalBiologicalSampleResultPOList[i].sampleType ==
            "S"
          ) {
            this.showForm.hospitalBiologicalSampleResultPOList[i].name = "血清";
          } else if (
            this.showForm.hospitalBiologicalSampleResultPOList[i].sampleType ==
            "P"
          ) {
            this.showForm.hospitalBiologicalSampleResultPOList[i].name = "血浆";
          } else if (
            this.showForm.hospitalBiologicalSampleResultPOList[i].sampleType ==
            "W"
          ) {
            this.showForm.hospitalBiologicalSampleResultPOList[i].name =
              "白细胞";
          }
        }
        //          console.log(this.showForm);
      });
    },
    //录入样本弹窗
    openInsertDialog(row) {
      this.addVisible = true;
      let num = "";
      $axios_http({
        url: "/base/area/sample/result/querySampleId",
        data: {
          associatedSampleId: row.associatedSampleId
        },
        vueObj: this
      }).then(res => {
        if (res.data.data != null) {
          this.addForm.sampleId = res.data.data;
          this.disabled = true;
        } else {
          this.disabled = false;
          num = row.sid.substr(2, 1);
          // if (num == 6) {
          //   num = 1;
          // }
          this.addForm.sampleId = "CS-T1" + num;
        }
      });
      this.addForm.id = row.id;
      this.addForm.hospitalBiologicalSampleResultPOList[0].bloodSampleId =
        row.id;
      this.addForm.hospitalBiologicalSampleResultPOList[1].bloodSampleId =
        row.id;
      this.addForm.hospitalBiologicalSampleResultPOList[2].bloodSampleId =
        row.id;
      num = row.sid.substr(2, 1);
      // if (num == 6) {
      //   num = 1;
      // }
      this.addForm.hospitalBiologicalSampleResultPOList[0].frozenBoxCode =
        "CS-T1" + num + "P";
      this.addForm.hospitalBiologicalSampleResultPOList[1].frozenBoxCode =
        "CS-T1" + num + "S";
      this.addForm.hospitalBiologicalSampleResultPOList[2].frozenBoxCode =
        "CS-T1" + num + "W";
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
    handleChange(item) {
      if (item.sampleType == "W") {
        item.sampleColumnAndLine = [];
        var obj = "";
        obj = item.num[0] + item.num[1];
        item.sampleColumnAndLine.push(obj);
      } else {
        item.sampleColumnAndLine = [];
        for (let i = 0; i < 5; i++) {
          var obj = "";
          obj = item.num[0] + (item.num[1] / 1 + i);
          item.sampleColumnAndLine.push(obj);
        }
      }
      var objData = {};
      if (this.editBtn == true) {
        objData = {
          frozenBoxCode: item.frozenBoxCode,
          sampleColumnAndLine: item.sampleColumnAndLine,
          sampleType: item.sampleType,
          id: item.id
        };
      } else {
        objData = {
          frozenBoxCode: item.frozenBoxCode,
          sampleColumnAndLine: item.sampleColumnAndLine,
          sampleType: item.sampleType
        };
      }
      $axios_http({
        url: "/base/area/biological/sample/checkFrozen",
        data: objData,
        vueObj: this
      }).then(res => {});
    },
    getSidInfo() {
      let num = this.addForms.sid.slice(2, 3);
      // if (num == 6) {
      //   num = 1;
      // }
      this.addForms.sampleId = "CS-T1" + num;
      this.addForms.frozenBoxCode = "CS-T1" + num;
      this.getSidInfo1(this.addForms.sampleType);
    },
    handleClose1(done) {
      Object.assign(this.$data.addForm, this.$options.data().addForm);
      this.$refs["addForm"].resetFields();
      for (let i = 0; i < 3; i++) {
        this.$refs.forms[i].resetFields();
        this.addForm.hospitalBiologicalSampleResultPOList[i].checklist = false;
      }
      done();
    },
    handleClose2(done) {
      Object.assign(this.$data.insertForm, this.$options.data().insertForm);
      this.$refs["insertForm"].resetFields();
      for (let i = 0; i < 3; i++) {
        this.$refs.form[i].resetFields();
        this.insertForm.hospitalBiologicalSampleResultPOList[
          i
        ].checklist = false;
      }
      done();
    },
    getSidInfo1(value) {
      let num = this.addForms.sid.slice(2, 3);
      // if (num == 6) {
      //   num = 1;
      // }
      this.addForms.frozenBoxCode = "CS-T1" + num;
      this.sampleColumnOptions = this.checkTable;
      if (value == "S") {
        this.addForms.frozenBoxCode += "S";
        this.sampleLineOptions = this.checkCount1;
      } else if (value == "P") {
        this.addForms.frozenBoxCode += "P";
        this.sampleLineOptions = this.checkCount1;
      } else if (value == "W") {
        this.addForms.frozenBoxCode += "W";
        this.sampleLineOptions = this.checkCount;
      }
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
          this.$store.state.bloodListPageNo,
          this.$store.state.bloodListPageSize
        );
      });
    },
    cancel(formName) {
      this.insertDialog = false;
      Object.assign(this.$data.insertForm, this.$options.data().insertForm);
      this.$refs["insertForm"].resetFields();
      for (let i = 0; i < 3; i++) {
        this.$refs.form[i].resetFields();
        this.insertForm.hospitalBiologicalSampleResultPOList[
          i
        ].checklist = false;
      }
    },
    cancelAddForm(formName) {
      this.addVisible = false;
      this.editBtn = false;
      Object.assign(this.$data.addForm, this.$options.data().addForm);
      this.$refs["addForm"].resetFields();
      for (let i = 0; i < 3; i++) {
        this.$refs.forms[i].resetFields();
        this.addForm.hospitalBiologicalSampleResultPOList[i].checklist = false;
      }
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
      var validd = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          for (
            let i = 0;
            i < this.insertForm.hospitalBiologicalSampleResultPOList.length;
            i++
          ) {
            if (
              this.insertForm.hospitalBiologicalSampleResultPOList[i]
                .checklist == true
            ) {
              var item = this.$refs.form[i];
              item.validate(valid => {
                if (!valid) {
                  validd = false;
                  return;
                }
              });
            }
          }
          if (validd) {
            $axios_http({
              url: "/base/hospital/biological/sample/addSample",
              data: this.insertForm,
              vueObj: this
            }).then(res => {
              $successMsg(this, "添加成功");
              this.insertDialog = false;
              this.query(1, this.$store.state.bloodListPageSize);
              Object.assign(
                this.$data.insertForm,
                this.$options.data().insertForm
              );
              this.$refs["insertForm"].resetFields();
              for (let i = 0; i < 3; i++) {
                this.$refs.form[i].resetFields();
                this.insertForm.hospitalBiologicalSampleResultPOList[
                  i
                ].checklist = false;
              }
            });
          }
        }
      });
    },
    addData(formName) {
      var validd = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          for (
            let i = 0;
            i < this.addForm.hospitalBiologicalSampleResultPOList.length;
            i++
          ) {
            if (
              this.addForm.hospitalBiologicalSampleResultPOList[i].checklist ==
              true
            ) {
              var item = this.$refs.forms[i];
              item.validate(valid => {
                if (!valid) {
                  validd = false;
                  return;
                }
              });
            }
          }

          if (validd) {
            if (this.editBtn == true) {
              this.addForm.hospitalBiologicalSampleResultPOList.filter(ele => {
                delete ele.num;
                delete ele.name;
                delete ele.bloodSampleId;
              });
              // 编辑
              $axios_http({
                url: "/base/area/sample/result/updateSampleResult",
                data: this.addForm,
                vueObj: this
              }).then(res => {
                $successMsg(this, "录入成功");
                this.addVisible = false;
                this.query(
                  this.$store.state.bloodListPageNo,
                  this.$store.state.bloodListPageSize
                );
                Object.assign(this.$data.addForm, this.$options.data().addForm);
                this.$refs["addForm"].resetFields();
                for (let i = 0; i < 3; i++) {
                  this.$refs.forms[i].resetFields();
                  this.addForm.hospitalBiologicalSampleResultPOList[
                    i
                  ].checklist = false;
                }
                this.editBtn = false;
              });
            } else {
              //新增
              $axios_http({
                url: "/base/area/sample/result/addSampleResult",
                data: this.addForm,
                vueObj: this
              }).then(res => {
                $successMsg(this, "录入成功");
                this.addVisible = false;
                this.query(
                  this.$store.state.bloodListPageNo,
                  this.$store.state.bloodListPageSize
                );
                Object.assign(this.$data.addForm, this.$options.data().addForm);
                this.$refs["addForm"].resetFields();
                for (let i = 0; i < 3; i++) {
                  this.$refs.forms[i].resetFields();
                  this.addForm.hospitalBiologicalSampleResultPOList[
                    i
                  ].checklist = false;
                }
              });
            }
          }
        }
      });
    },
    add() {
      this.insertDialog = true;
      //        this.insertForm.hospitalBiologicalSampleResultPOList[0].frozenBoxCode = "CS"+row.sid.substr(2,1)+"S"
      //        this.insertForm.hospitalBiologicalSampleResultPOList[1].frozenBoxCode = "CS"+row.sid.substr(2,1)+"P"
      //        this.insertForm.hospitalBiologicalSampleResultPOList[2].frozenBoxCode = "CS"+row.sid.substr(2,1)+"W"
    },
    del(row) {
      this.$confirm("确定删除该受试者血液样本（血清/血浆/白细胞）?", "提示", {
        closeOnClickModal: false,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          $axios_http({
            url: "/base/area/sample/delete",
            data: {id:row.id},
            vueObj: this
          }).then(res => {
            $successMsg(this, "删除成功");
            this.query(
              this.$store.state.bloodListPageNo,
              this.$store.state.bloodListPageSize
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
          sCourierStatus: this.qc.sCourierStatus,
          pCourierStatus: this.qc.pCourierStatus,
          wCourierStatus: this.qc.wCourierStatus,
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
        this.$store.commit("get_bloodListPageNo", pageNo);
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
        this.$store.state.bloodListPageNo,
        this.$store.state.bloodListPageSize
      );
    },
    //每页显示查询结果条数变更事件，做重新查询操作
    pageSizeChange(pageSize) {
      this.$store.commit("get_bloodListPageSize", pageSize);
      this.query(this.$store.state.bloodListPageNo, pageSize);
    },
    //切换当前页事件，做重新查询操作
    currentPageChange(currentPage) {
      this.$store.commit("get_bloodListPageNo", currentPage);
      this.query(currentPage, this.$store.state.bloodListPageSize);
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
.addTable {
  width: 100%;
}
.addTable td {
  width: 33%;
  text-align: center;
  border: 1px solid #e0e0e0;
}
</style>
