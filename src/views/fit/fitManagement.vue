<template>
  <div slot="right" class="content-page" v-if="fitManagement_page">
    <div class="content">
      <div class="filter-container" >
        <router-link to="/home/home" v-if="$store.state.hospitalType == 1">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
        <router-link to="/home/areaHome" v-if="$store.state.hospitalType == 2">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
        <el-form :model="qc" :inline=true>
          <div>
          <el-input  style="width: 200px;" size="small" class="filter-item" clearable placeholder="姓名" v-model="qc.name" >
          </el-input>
          <el-input  style="width: 200px;" size="small" class="filter-item" clearable placeholder="SID" v-model="qc.sid" >
          </el-input>
          <el-input  style="width: 200px;" size="small" class="filter-item" clearable placeholder="手机号" v-model="qc.phone" >
          </el-input>
             <el-select v-model="qc.group" clearable placeholder="分组方案" size="small" class="filter-item">
              <el-option value="A" label="A组">A组</el-option>
              <el-option value="B" label="B组">B组</el-option>
              <el-option value="C" label="C组">C组</el-option>
              <el-option value="Cg" label="C组高危">C组高危</el-option>
              <el-option value="Cd" label="C组低危">C组低危</el-option>
            </el-select>
          <el-select v-model="qc.codeEntryStatus" clearable placeholder="FIT编码录入状态" size="small" class="filter-item" >
            <el-option value="1" label="未录入"></el-option>
            <el-option value="2" label="已录入"></el-option>
          </el-select>
          </div>
          <div>
            <el-cascader
              v-if="$store.state.hospitalType==1"
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
             <el-cascader
             v-if="$store.state.hospitalType==2"
            style="float: left;width: 200px;margin-right: 15px;"
            clearable
            :options="$store.state.regionOptions"
            placeholder="所属区"
            :props="propsArea"
            v-model="ids"
            size="small"
            filterable
            :show-all-levels="false"
            change-on-select
            @change="getQcIdArea"
          ></el-cascader>
          <el-select v-model="qc.insertStatus" clearable placeholder="FIT结果录入状态" size="small" class="filter-item" >
            <el-option value="1" label="未录入"></el-option>
            <el-option value="2" label="已录入"></el-option>
          </el-select>
          <el-select v-model="qc.result" clearable placeholder="FIT结果" size="small" class="filter-item" >
            <el-option value="2" label="阳性"></el-option>
            <el-option value="1" label="阴性"></el-option>
            <el-option value="3" label="无效"></el-option>
            <el-option value="4" label="无结果"></el-option>
          </el-select>
          <!-- add -->
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
          <el-button size="small" type="primary" icon="el-icon-search" @click="query(1,$store.state.fitManagementPageSize)" v-if="btnAuth.fit_query_btn">查询</el-button>
          <el-button type="primary" size="small" icon="el-icon-close" @click="reset" v-if="btnAuth.fit_query_btn">重置</el-button>
          </div>
        </el-form>
        <!--数据列表-->
        <div class="table-btn-grooup">
          <el-button  type="primary" size="small" icon="el-icon-plus"  v-if="btnAuth.fit_query_btn" @click="addFormDialog = true">新增</el-button>
          <!--<el-button class="filter-item" size="small" type="primary" icon="el-icon-search"  v-if="btnAuth.fit_export__excel_btn">导出EXCEL</el-button>-->
        </div>
        <el-dialog :visible.sync="seeDialog" width="600px">
          <div class="clearfix">
            <ul class="resultList fl">
              <li><span>录入状态：</span><span>{{this.insertStatus}}</span></li>
              <li><span>有无结果：</span><span>{{this.resultStatus}}</span></li>
              <li v-if="this.resultStatus=='无结果'"><span>无结果原因：</span><span>{{this.noResonResult}}</span></li>
              <li v-if="this.resultStatus=='有结果'"><span>结果为：</span><span>{{this.result}}</span></li>
              <li v-if="this.resultStatus=='有结果'"><span>上线值/C值：</span><span>{{this.upLineValue}}</span></li>
              <li v-if="this.resultStatus=='有结果'"><span>下线值/T值：</span><span>{{this.downLineValue}}</span></li>
              <li v-if="this.resultStatus!='无结果'"><span>是否10分钟内读取：</span><span v-if="this.intenM == 1">是</span><span v-if="this.intenM == 0">否</span></li>
            </ul>
            <img :src="pathUrl?pathUrl:require('../../assets/img/no-image.jpg')" alt="" class="fl seeImg" >
          </div>
        </el-dialog>
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
              <div v-if="resultInfo==4" class="resultInfo">
                <p>无结果</p>
                <p>请重新检测</p>
              </div>
              <p style="text-align:center;margin-top:5px;">
                <el-checkbox v-model="checked" v-if="resultInfo==2 || resultInfo==1 || resultInfo==3"  class="submitDialog-item-check">短信发送受试者</el-checkbox>
              </p>
              <div style="margin-top: 20px;text-align: center;">
                <el-button size="small" @click="closeInputResultDialog" class="dialog-footer">确 定</el-button>
              </div>

            </el-dialog>
        <el-dialog :visible.sync="inputResultDialog">
          <el-form :model="insertForm" :rules="rules" ref="insertForm">
            <el-form-item label="结果日期" :label-width="formLabelWidth" prop="resultDate">
              <el-date-picker
                v-model="insertForm.resultDate"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="结果日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item  :label-width="formLabelWidth" prop="resultStatus">
              <el-radio v-model="insertForm.resultStatus" label="1" @change="changeRadio">有结果</el-radio>
              <el-radio v-model="insertForm.resultStatus" label="2" @change="changeRadio">无结果</el-radio>
            </el-form-item>
            <div v-if="insertForm.resultStatus==1">
              <el-form-item label="上线值/C值" :label-width="formLabelWidth" prop="upLineValue">
                <el-input v-model="insertForm.upLineValue" auto-complete="off" class="lineWidth"></el-input>
              </el-form-item>
              <el-form-item label="下线值/T值" :label-width="formLabelWidth" style="margin-top:10px" prop="downLineValue">
                <el-input v-model="insertForm.downLineValue" auto-complete="off" class="lineWidth"></el-input>
              </el-form-item>
              <el-form-item label="检测结果是否在10分钟内读取" :label-width="formLabelWidth" style="margin-top:10px" prop="inTenMin">
                <el-radio v-model="insertForm.inTenMin" label="1">是</el-radio>
                <el-radio v-model="insertForm.inTenMin" label="0">否</el-radio>
              </el-form-item>
            </div>
              <el-form-item label="请说明原因" :label-width="formLabelWidth" v-if="insertForm.resultStatus==2">
                <el-input v-model="insertForm.noResonResult" auto-complete="off" class="lineWidth"></el-input>
              </el-form-item>
              <!-- 上传文件 -->
              <el-form-item label="上传文件" :label-width="formLabelWidth">
                <el-upload
                  class="uploadComponent"
                  ref="upload"
                  :action="uploadUrl()"
                  :before-upload="beforeAvatarUpload"
                  :on-preview="handlePreview"
                  :on-success="handleAvatarSuccess"
                  :on-remove="handleRemove"
                  :on-change="handleChange"
                  :limit="1"
                  :with-credentials="true"
                  :file-list="fileList"
                  :auto-upload="false"
                  accept='image/*'>
                  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">确定上传</el-button>
                </el-upload>
              </el-form-item>
              <div class="dialog-footer">
                <el-button size="small" @click="inputResult('insertForm')" type="primary">确 定</el-button>
                <el-button size="small" @click="inputResultDialog=false">取 消</el-button>
              </div>
          </el-form>
        </el-dialog>
        <!-- 编辑fit结果弹窗 -->
         <el-dialog :visible.sync="inputFitResultDialog" width="850px">
          <el-form :model="inputFitForm" :rules="inputFitFormRules" ref="inputFitForm" class="editFitResultDialog">
            <div class="clearfix">
              <div class="left fl">
                  <el-form-item label="工作人员编码" :label-width="formLabelWidth" prop="releasePersonCode">
                  <el-input v-model="inputFitForm.releasePersonCode" auto-complete="off" class="lineWidth"></el-input>
                </el-form-item>
                <el-form-item label="发放日期" :label-width="formLabelWidth" prop="releaseDate">
                  <el-date-picker
                    v-model="inputFitForm.releaseDate"
                    type="date"
                    :picker-options="pickerOptions1"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    placeholder="发放日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="噗噗管ID" :label-width="formLabelWidth" prop="fitCode">
                  <el-input v-model="inputFitForm.fitCode" auto-complete="off" class="lineWidth"></el-input>
                </el-form-item>
                <el-form-item label="结果日期" :label-width="formLabelWidth" prop="resultDate">
                  <el-date-picker
                    v-model="inputFitForm.resultDate"
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    placeholder="结果日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item  :label-width="formLabelWidth" prop="resultStatus">
                  <el-radio v-model="inputFitForm.resultStatus" label="1" @change="changeRadio">有结果</el-radio>
                  <el-radio v-model="inputFitForm.resultStatus" label="2" @change="changeRadio">无结果</el-radio>
                </el-form-item>
                <div v-if="inputFitForm.resultStatus==1">
                  <el-form-item label="上线值/C值" :label-width="formLabelWidth" prop="upLineValue">
                    <el-input v-model="inputFitForm.upLineValue" auto-complete="off" class="lineWidth"></el-input>
                  </el-form-item>
                  <el-form-item label="下线值/T值" :label-width="formLabelWidth" style="margin-top:10px" prop="downLineValue">
                    <el-input v-model="inputFitForm.downLineValue" auto-complete="off" class="lineWidth"></el-input>
                  </el-form-item>
                  <el-form-item label="检测结果是否在10分钟内读取" :label-width="formLabelWidth" style="margin-top:10px" prop="inTenMin">
                    <el-radio v-model="inputFitForm.inTenMin" label="1">是</el-radio>
                    <el-radio v-model="inputFitForm.inTenMin" label="0">否</el-radio>
                  </el-form-item>
                </div>
                  <el-form-item label="请说明原因" :label-width="formLabelWidth" v-if="inputFitForm.resultStatus==2">
                    <el-input v-model="inputFitForm.noResonResult" auto-complete="off" class="lineWidth"></el-input>
                  </el-form-item>
                </div>
                <div class="right fl">
                  <img :src="imgSrc" alt="">
                </div>
            </div>
            
            <!-- 上传文件 -->
              <el-form-item label="上传文件" :label-width="formLabelWidth">
                <el-upload
                  class="upload-demo"
                  ref="upload"
                  :action="uploadUrl()"
                  :before-upload="beforeAvatarUpload"
                  :on-preview="handlePreview"
                  :on-success="handleAvatarSuccess"
                  :on-remove="handleRemove"
                  :on-change="handleChange"
                  :limit="1"
                  :with-credentials="true"
                  :file-list="fileList"
                  :auto-upload="false"
                  accept='image/*'>
                  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">确定上传</el-button>
                </el-upload>
              </el-form-item>
              <div class="dialog-footer">
                <el-button size="small" @click="inputFitResult('inputFitForm')" type="primary">确 定</el-button>
                <el-button size="small" @click="inputFitResultDialog=false">取 消</el-button>
              </div>
          </el-form>
        </el-dialog>
        <el-dialog :visible.sync="inputCodeDialog" >
          <el-form :model="addCodeForm" :rules="addCodeFormRules" ref="addCodeForm">
            <el-form-item label="工作人员编码" :label-width="formLabelWidth" prop="releasePersonCode">
              <el-input v-model="addCodeForm.releasePersonCode" auto-complete="off" class="lineWidth"></el-input>
            </el-form-item>
            <el-form-item label="发放日期" :label-width="formLabelWidth" prop="releaseDate">
              <el-date-picker
                v-model="addCodeForm.releaseDate"
                type="date"
                :picker-options="pickerOptions1"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="发放日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="噗噗管ID" :label-width="formLabelWidth" prop="fitCode">
              <el-input v-model="addCodeForm.fitCode" auto-complete="off" class="lineWidth"></el-input>
            </el-form-item>
            <div class="dialog-footer">
              <el-button size="small" @click="inputCode('addCodeForm')" type="primary">确 定</el-button>
              <el-button size="small" @click="inputCodeDialog=false">取 消</el-button>
            </div>
          </el-form>
        </el-dialog>
        <el-dialog width="40%" :visible.sync="messageDialog" :show-close="false" >
          <el-form :model="sendForm" :rules="sendFormRules" ref="sendForm">
            <el-form-item label="短信内容" prop="releasePersonCode">
              <div>
                {{sendForm.message}}
              </div>
            </el-form-item>
            <el-form-item label="电话号" prop="releasePersonCode">
              <el-input v-model="sendForm.phone" auto-complete="off" class="lineWidth"></el-input>
            </el-form-item>
            <div class="dialog-footer">
              <el-button size="small" @click="sendMessage()" type="primary">确 定</el-button>
              <el-button size="small" @click="messageDialog = false">取 消</el-button>
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
            <el-form-item label="噗噗管ID" :label-width="formLabelWidth" prop="fitCode">
              <el-input v-model="addForms.fitCode" auto-complete="off" class="notification-input" ></el-input>
            </el-form-item>
            <el-form-item label="工作人员编码" :label-width="formLabelWidth" prop="releasePersonCode">
              <el-input v-model="addForms.releasePersonCode" auto-complete="off" class="notification-input" ></el-input>
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
              <el-button size="small" @click="cancel()">取 消</el-button>
            </div>
          </el-form>
        </el-dialog>
        <el-table
          :data="queryResult.tableData"
          border
          :default-sort = "{prop: 'inGroupDate', order: 'descending'}"
          style="width: 100%;margin-top: 20px;">
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="80">
          </el-table-column>
          <el-table-column
            prop="sid"
            label="SID"
            width="80">
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
            prop="followGroup"
            label="随访分组"
            width="130"
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
            label="FIT编码录入状态"
            width="160"
          >
            <template slot-scope="scope">
              <span>{{scope.row.codeEntryStatus| codeEntryStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="fitCode"
            label="FIT编码"
            width="120"
          >

          </el-table-column>
          <el-table-column
            prop="releaseDate"
            label="发放日期"
            sortable
            width="130"
          >
          </el-table-column>
          <el-table-column
            label="FIT结果状态"
            width="120"
          >
            <template slot-scope="scope">
              <span>{{scope.row.insertStatus| insertStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="FIT结果"
            width="120"
          >
            <template slot-scope="scope">
              <span>{{scope.row.result| result}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="resultDate"
            label="结果录入日期"
            sortable
            width="160"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            width="250"
            align="center"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="applyEdit(scope.row)" v-if="$store.state.hospitalType==1 && scope.row.codeEntryStatus==2 && (scope.row.insertStatus==1 || scope.row.insertStatus==null) && scope.row.applyStatus==0 && scope.row.overallStatusCy != 2 && scope.row.overallStatusCy != 4 && scope.row.result != 3 && scope.row.result != 4">申请编辑</el-button>
              <!-- <el-button type="text" size="small" v-if="$store.state.hospitalType==1 && scope.row.codeEntryStatus==2 && (scope.row.insertStatus==1 || scope.row.insertStatus==null) && scope.row.applyStatus==1" :disabled="true">申请编辑</el-button> -->
              <el-button type="text" size="small" @click="applyEdit(scope.row)" v-if="$store.state.hospitalType==1 && scope.row.insertStatus == 2 && scope.row.applyStatus==0 && scope.row.overallStatusCy != 2 && scope.row.overallStatusCy != 4 && scope.row.result != 3 && scope.row.result != 4" >申请编辑</el-button>
              <!-- <el-button type="text" size="small" v-if="$store.state.hospitalType==1 && scope.row.insertStatus == 2 && scope.row.applyStatus==1" :disabled="true">申请编辑</el-button> -->
              <el-button type="text" size="small" @click="updateCourierResult(scope.row.id)"  v-if="$store.state.hospitalType==1 && scope.row.codeEntryStatus==2 && scope.row.dnaCommunityInformStatus !=1 && scope.row.insertStatus != 2 && scope.row.editStatus==1 && scope.row.overallStatusCy != 2 && scope.row.overallStatusCy != 4 && scope.row.result != 3 && scope.row.result != 4">编辑</el-button>
              <el-button type="text" size="small" @click="updateFitResult(scope.row.id,scope.row.sid,scope.row.phone)"  v-if="$store.state.hospitalType==1 && scope.row.codeEntryStatus==2 && scope.row.insertStatus == 2 && scope.row.editStatus==1 && scope.row.overallStatusCy != 2 && scope.row.overallStatusCy != 4 && scope.row.result != 3 && scope.row.result != 4">编辑</el-button>
              <el-button type="text" size="small" @click="updateCourierResult(scope.row.id)"  v-if="$store.state.hospitalType==2 && scope.row.codeEntryStatus==2 && scope.row.dnaCommunityInformStatus !=1 && scope.row.insertStatus != 2 && scope.row.overallStatusCy != 2 && scope.row.overallStatusCy != 4 && scope.row.result != 3 && scope.row.result != 4">编辑</el-button>
              <el-button type="text" size="small" @click="updateFitResult(scope.row.id,scope.row.sid,scope.row.phone)"  v-if="$store.state.hospitalType==2 && scope.row.codeEntryStatus==2 && scope.row.insertStatus == 2 && scope.row.overallStatusCy != 2 && scope.row.overallStatusCy != 4 && scope.row.result != 3 && scope.row.result != 4">编辑</el-button>
              <!-- 解除锁定组件 -->
              <approvalDialog ref="approvalDialog" @refreshList="query" :id="scope.row.id" :approvalArr="approvalArr" v-if="$store.state.hospitalType==2 && scope.row.codeEntryStatus==2 && (scope.row.insertStatus==1 || scope.row.insertStatus==null) && scope.row.approvalStatus==0 && scope.row.overallStatusCy != 2 && scope.row.overallStatusCy != 4 && scope.row.result != 3 && scope.row.result != 4"></approvalDialog>
              <!-- <el-button type="text" size="small" @click="approvalEdit(scope.row)" v-if="$store.state.hospitalType==2 && scope.row.codeEntryStatus==2 && (scope.row.insertStatus==1 || scope.row.insertStatus==null) && scope.row.approvalStatus==1" :disabled="true">解除锁定</el-button> -->
              <approvalDialog ref="approvalDialog" @refreshList="query" :id="scope.row.id" :approvalArr="approvalArr" v-if="$store.state.hospitalType==2 && scope.row.insertStatus == 2 && scope.row.approvalStatus==0 && scope.row.overallStatusCy != 2 && scope.row.overallStatusCy != 4 && scope.row.result != 3 && scope.row.result != 4"></approvalDialog>
              <!-- <el-button type="text" size="small" @click="approvalEdit(scope.row)" v-if="$store.state.hospitalType==2 && scope.row.insertStatus == 2 && scope.row.approvalStatus==1" :disabled="true">解除锁定</el-button> -->
              <el-button type="text" class="btnStyle" size="small"  v-if="(scope.row.codeEntryStatus==1 || scope.row.codeEntryStatus==null) && scope.row.overallStatusCy != 2 && scope.row.overallStatusCy != 4" @click="inputCodeDialogIsShow(scope.row.id,scope.row.sid)">录入编码</el-button>
              <el-button type="text" class="btnStyle" size="small"  v-if="$store.state.hospitalType==1 && scope.row.codeEntryStatus==2 && (scope.row.insertStatus==1 || scope.row.insertStatus==null) && scope.row.editStatus!='1' && scope.row.applyStatus!='1' && scope.row.overallStatusCy != 2 && scope.row.overallStatusCy != 4" @click='inputResultDialogIsShow(scope.row.id,scope.row.sid,scope.row.phone)'>录入结果</el-button>
              <el-button type="text" class="btnStyle" size="small"  v-if="$store.state.hospitalType==2 && scope.row.codeEntryStatus==2 && (scope.row.insertStatus==1 || scope.row.insertStatus==null) && scope.row.overallStatusCy != 2 && scope.row.overallStatusCy != 4" @click='inputResultDialogIsShow(scope.row.id,scope.row.sid,scope.row.phone)'>录入结果</el-button>
              <!-- 社区查看 -->
              <el-button type="text" class="btnStyle" size="small"  v-if="$store.state.hospitalType==1 && scope.row.insertStatus == 2 && scope.row.editStatus!='1'" @click="seeEvent(scope.row.id)">查看</el-button>
              <!-- 地区查看 -->
              <el-button type="text" class="btnStyle" size="small"  v-if="$store.state.hospitalType==2 && scope.row.insertStatus == 2" @click="seeEvent(scope.row.id)">查看</el-button>
              <el-button type="text" class="btnStyle" size="small"  v-if="$store.state.hospitalType==2 && (scope.row.result==2 || scope.row.result==1 || scope.row.result==3)" @click="sendOpen(scope.row.result,scope.row.phone,scope.row.id)">发送短信</el-button>
              <el-button type="text" class="btnStyle" size="small"  v-if="$store.state.hospitalType==1 && (scope.row.result==2 || scope.row.result==1 || scope.row.result==3) && scope.row.applyStatus!='1'" @click="sendOpen(scope.row.result,scope.row.phone,scope.row.id)">发送短信</el-button>
              <!-- 上传图片 -->
              <el-upload
                style="display:inline-block;margin-left:10px;"
                v-if="scope.row.insertStatus == 2"
                class="upload-demo"
                :action="uploadListUrl(scope.row.id)"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :beforeUpload="beforeListUpload"
                :on-success="handleListSuccess"
                :with-credentials="true"
                :show-file-list='false'
                accept='image/*'
                list-type="picture">
                <el-button size="small" type="text">上传图片</el-button>
              </el-upload>
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
                :current-page="$store.state.fitManagementPageNo"
                :page-sizes="[10, 20, 50, 100]"
                v-bind:page-size="$store.state.fitManagementPageSize"
                layout="total, sizes, prev, pager, next, jumper"
                v-bind:total="queryResult.totalRowCount">
              </el-pagination>
            </div>
          </div></el-col>
        </el-row>
        <!-- 申请编辑弹窗 -->
        <applyOpen ref="applyOpenVisible" :applyArr="applyArr"></applyOpen>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import applyOpen from '../components/applyDialog'
import approvalDialog from '../components/approvalDialog'
import dateFormater  from '../../filters/index'
import DICTIONARY from "@/utils/dictionary.js";
let loading;
  export default {
    name: 'Right',
    data () {
      var validateFitCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('噗噗管ID不能为空'));
        } else if (!(/^[A-Za-z0-9]{8}$/.test(value))) {
          callback(new Error('请输入8位数字或字母'));
        } else {
          callback();
        }
      };
      var validateLineValue = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('不能为空'));
        } else if (!(/\d/.test(value))) {
          callback(new Error('只能是数字'))
        } else if (!(/^[1-9]{1}$/.test(value))) {
          callback(new Error('数字范围1-9'));
        } else {
          callback();
        }
      };
      return {
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        applyArr:{},   //申请编辑快递相关信息
        approvalArr:{
          formType:"HOSPITAL_FIT_RESULT",
        },  //解除锁定相关信息
        editBtn:false,
        //上传图片
        fileList: [{name: '', url: ''}],
        imgSrc:'',  //图片上传地址
        pathUrl:null,  //查看图片路径
        changeImg:false,   //是否选择了图片
        url:'',   //查询请求的url
        id:'',
        sid:'',
        insertStatus:'',//结果状态
        resultStatus:'',//有无结果
        noResonResult:'',//无结果原因
        upLineValue:'',//上线值/C值
        downLineValue:'',//下线值/T值
        result:'',//结果为
        resultInfo:'',//结果弹框提示信息
        inputResultPrompt:false,//结果提示信息
        intenM:'',
        inputResultDialog:false,
        inputFitResultDialog:false,
        addFormDialog:false,
        messageDialog:false,
        inputCodeDialog:false,
        seeDialog:false,
        reserveDialog:false,
        checked:true,   //发送短信
        //权限判定
        fitManagement_page:false,
        btnAuth:{
          buttonRoleAdd:false,
          fit_return_btn:false,
          buttonRoleDel:false,
          fit_query_btn:false,
          buttonUserRoleDis:false,
          fit_reserve_btn:false,
          fit_export__excel_btn:false,
          fit_input_num_btn:false,
          fit_del_btn:false,
          fit_input_result_btn:false,
          fit_examine_btn:false,
          fit_see_btn:false
        },
        sendForm:{
          'phone':'',
           'id':''
        },
        sendFormRules: {
          phone:{required: true, message: '必填', trigger: 'change'},
        },
        message1:'【结直肠癌筛查项目】尊敬的先生/女士，您近期参加了中国人群结直肠癌筛查项目，您的粪便隐血试验结果为阴性，工作人员将于第二年对您进行随访。如果您对筛查结果或关于本筛查有任何疑问，请直接致电当地协调员。衷心感谢您的参与！',
        message2:'【结直肠癌筛查项目】尊敬的先生/女士，您近期参加了中国人群结直肠癌筛查项目，您的粪便隐血试验结果为阳性，工作人员将尽快为您安排结直肠镜检查。如果您对筛查结果或关于本筛查有任何疑问，请直接致电当地协调员。衷心感谢您的参与！',
        message3:'【结直肠癌筛查项目】尊敬的先生/女士，您近期参加了中国人群结直肠癌筛查项目，您的粪便隐血试验结果为无效，请联系项目工作人员重新领取粪便检测装置。如果您对筛查结果或关于本筛查有任何疑问，请直接致电当地协调员。衷心感谢您的参与！',
        addForms:{
          'sid':'',
          'phone':'',
          'name':'',
          "fitCode":'',
          "releasePersonCode":'',
          "releaseDate":''
        },
        addFormRules: {
          sid:{required: true, message: '必填', trigger: 'blur'},
          name:{required: true, message: '必填', trigger: 'change'},
          phone:{required: true, message: '必填', trigger: 'change'},
          fitCode:[
            {required:true,message:'必填',trigger:'blur'},
            {validator: validateFitCode, trigger: 'blur'}
          ],
          releasePersonCode:{required: true, message: '必填', trigger: 'blur'},
          releaseDate:{required: true, message: '必填', trigger: 'blur'},
        },
        period:'',
        periodData:[],
        //查询条件
        "qc":{
          "sid":null,
          "name":null,
          "phone":null,
          "group":null,
          "codeEntryStatus":null,
          "result":null,
          "insertStatus":null,
          "loginName":null,
          "communityDeptId":null,
          "followGroup":null,
          "followState":null,
        },
        followGroup:DICTIONARY.followGroup,
        followStatus:DICTIONARY.followStatus,
        props: {
          value: 'loginName',
          children: 'child',
          label:'name'
        },
        propsArea: {
          value: 'id',
          children: 'child',
          label:'name'
        },
        ids:[],
        //查询结果
        "queryResult":{
          "pageNo":1,//当前页
          "pageSize":10,//每页的条数
          "totalPageCount":0,
          "tableData":[]
        },
        //分页
        "queryResultSource":{
          "pageNoSource":1,//当前页
          "pageSizeSource":15,//每页的条数
          "totalPageCount":0
        },
        insertForm:{
          "resultDate":'',
          'upLineValue':null,
          'downLineValue':null,
          'noResonResult':'',
          'resultStatus':'',
           'inTenMin':''
        },
        addCodeForm:{
          'releasePersonCode':'',
          'releaseDate':'',
          'fitCode':''
        },
        inputFitForm:{
          'releasePersonCode':'',
          'releaseDate':'',
          'fitCode':'',
          "resultDate":'',
          'upLineValue':null,
          'downLineValue':null,
          'noResonResult':'',
          'resultStatus':'',
           'inTenMin':''
        },
        allocateResourcesData:[],
        allocationId:'',
        colonoscopyRecordId:'',
        formLabelWidth: '220px',

        rules:{
          upLineValue:[
            {required:true,message:'必填',trigger:'blur'},
            {validator: validateLineValue, trigger: 'blur'}
          ],
          downLineValue:[
            {required:true,message:'必填',trigger:'blur'},
            {validator: validateLineValue, trigger: 'blur'}
          ],
          resultDate:[
            {required:true,message:'必填',trigger:'blur'},
          ],
          desc:[
            {required:true,message:'请输入角色描述信息',trigger:'blur'},
            {min:1,max:32,message:'长度在1到32个字符',trigger:'blur'}
          ],
          resultStatus:[
            {required:true,message:'必选',trigger:'change'},
          ],
          inTenMin:[
            {required:true,message:'必选',trigger:'change'},
          ]
        },
        addCodeFormRules:{
          releasePersonCode:[
            {required:true,message:'必填',trigger:'blur'},
          ],
          releaseDate:[
            {required:true,message:'必填',trigger:'blur'},
          ],
          fitCode:[
            {required:true,message:'必填',trigger:'blur'},
            {validator: validateFitCode, trigger: 'blur'}
          ]
        },
        inputFitFormRules:{
          releasePersonCode:[
            {required:true,message:'必填',trigger:'blur'},
          ],
          releaseDate:[
            {required:true,message:'必填',trigger:'blur'},
          ],
          fitCode:[
            {required:true,message:'必填',trigger:'blur'},
            {validator: validateFitCode, trigger: 'blur'}
          ],
          upLineValue:[
            {required:true,message:'必填',trigger:'blur'},
            {validator: validateLineValue, trigger: 'blur'}
          ],
          downLineValue:[
            {required:true,message:'必填',trigger:'blur'},
            {validator: validateLineValue, trigger: 'blur'}
          ],
          resultDate:[
            {required:true,message:'必填',trigger:'blur'},
          ],
          desc:[
            {required:true,message:'请输入角色描述信息',trigger:'blur'},
            {min:1,max:32,message:'长度在1到32个字符',trigger:'blur'}
          ],
          resultStatus:[
            {required:true,message:'必选',trigger:'change'},
          ],
          inTenMin:[
            {required:true,message:'必选',trigger:'change'},
          ]
        },
      }
    },
    components:{
      applyOpen,
      approvalDialog
    },
    created(){
      if(localStorage.getItem('communityType')=='true'){
        this.ids.push(localStorage.getItem('loginName'));
        this.qc.loginName=localStorage.getItem('loginName');
      }
    },
    mounted(){
      this.$store.commit('LOGOUT_USER');
      let obj = this.checkPageAuth(this,"fitManagement_page",this.btnAuth);
      this.qc.sid=this.$route.query.sid;
      this.query(this.$store.state.fitManagementPageNo,this.$store.state.fitManagementPageSize);
      this.getToday()
    },
    beforeDestroy(){
      this.$store.state.fitManagementPageNo=1;
      this.$store.state.fitManagementPageSize=10;
    },
    methods:{
      beforeListUpload(file){
         const isLt2M = file.size / 1024 / 1024 < 100
          if(!isLt2M) {
            this.$message({
              message: '上传文件大小不能超过 100MB!',
              type: 'warning'
            });
            return false;
          }else{
            loading = this.$loading({
              lock: true,
              text: '图片拼命上传中...',
              spinner: 'el-icon-loading',
              background: 'rgba(255, 255, 255, 0.5)'
            });
          }
      },
      handleListSuccess(response, file, fileList){
         loading.close();
         this.$message({
              message: '图片上传成功',
              type: 'success'
            });
          this.query(this.$store.state.fitManagementPageNo,this.$store.state.fitManagementPageSize);
      },
      // 上传list
      uploadListUrl(id){
        return SERVER_NAME+"/base/fit/imgUpload?id="+id
      },
      // 上传
      uploadUrl(){
          return SERVER_NAME+"/base/fit/imgUpload"
      },
      handleChange(file,fileList){
        this.imgSrc=file.url;
        this.changeImg=true;   //是否选择了图片
      },
      beforeAvatarUpload(file){
         const isLt2M = file.size / 1024 / 1024 < 100
          if(!isLt2M) {
            this.$message({
              message: '上传文件大小不能超过 100MB!',
              type: 'warning'
            });
            return false;
          }else{
            loading = this.$loading({
              lock: true,
              text: '图片拼命上传中...',
              spinner: 'el-icon-loading',
              background: 'rgba(255, 255, 255, 0.5)'
            });
          }
      },
      handlePreview(file) {
         console.log(file);
        
      },
       submitUpload() {
         this.$refs.upload.submit();
      },
      handleAvatarSuccess(res, file,fileList) {
         loading.close();
         this.$message({
              message: '图片上传成功',
              type: 'success'
            });
          this.pathUrl=res.data.filePath
          this.fileList = fileList
      },
      handleRemove(file, fileList) {
        this.fileList =  fileList;
        this.imgSrc='';
        this.pathUrl=null;
        this.changeImg=false;   //是否选择了图片
      },
      // 申请编辑
      applyEdit(row){
        this.$refs.applyOpenVisible.applyOpenVisible=true;
        this.applyArr.id=row.id;
        this.applyArr.formType="HOSPITAL_FIT_RESULT";
        this.applyArr.sid=row.sid;
      },
       updateCourierResult(id){
        this.id=id;
        $axios_http({
          url: "/base/fit/result/queryById",
          data:{
            id:id
          },
          vueObj: this
        }).then((res) => {
          this.inputCodeDialog=true;
          this.addCodeForm.fitCode=res.data.data.fitCode;
          this.addCodeForm.releasePersonCode=res.data.data.releasePersonCode;
          this.addCodeForm.releaseDate=new Date(res.data.data.releaseDate);
          this.editBtn=true;
        })
      },
      updateFitResult(id,sid,phone){   //编辑回显fit结果
        this.id=id;
        this.sid=sid;
        // 编辑结果发送短信值
        this.sendForm.phone=phone;
        this.sendForm.id=id;
        $axios_http({
          url: "/base/fit/result/queryById",
          data:{
            id:id
          },
          vueObj: this
        }).then((res) => {
          this.inputFitForm.fitCode=res.data.data.fitCode;
          this.inputFitForm.releasePersonCode=res.data.data.releasePersonCode;
          this.inputFitForm.releaseDate=new Date(res.data.data.releaseDate);
          this.inputFitForm.resultDate=new Date(res.data.data.resultDate);
          this.inputFitForm.insertStatus=res.data.data.insertStatus;
          this.inputFitForm.resultStatus=res.data.data.resultStatus+'';
          this.inputFitForm.noResonResult=res.data.data.noResonResult;
          this.inputFitForm.upLineValue=res.data.data.upLineValue;
          this.inputFitForm.downLineValue=res.data.data.downLineValue;
          this.inputFitForm.inTenMin = res.data.data.inTenMin;
          this.inputFitForm.result=res.data.data.result;
          if(!res.data.data.pathUrl){
            this.fileList=[];
          }else{
            this.fileList= [{name: '', url: ''}];
            this.fileList[0].name=res.data.data.pathUrl.split('/').slice(res.data.data.pathUrl.split('/').length-1)[0];
            this.fileList[0].url=res.data.data.pathUrl;
          }
          this.pathUrl=res.data.data.pathUrl;
          this.imgSrc=res.data.data.pathUrl?SERVER_NAME + '/base/dnafile/downFile?filePath=' + res.data.data.pathUrl:'';
        })
        this.inputFitResultDialog=true;
      },
      //获取选中区
      getQcId(value){
        this.qc.loginName =value[0]
      },
      //地区获取选中区
      getQcIdArea(value){
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
      sendOpen(result,phone,id){
        this.messageDialog = true
        this.sendForm.phone = phone
        this.sendForm.id = id
        if(result == 1){
            this.sendForm.message = this.message1
        }else if(result == 2){
          this.sendForm.message = this.message2
        }else if(result == 3){
          this.sendForm.message = this.message3
        }
      },
      sendMessage(){
        $axios_http({
          url: "/base/fit/result/sendFit",
          data: {
            id: this.sendForm.id,
            phone:this.sendForm.phone,
          },
          vueObj: this
        }).then((res) => {
            setTimeout(()=>{
              $successMsg(this, "发送成功")
            },500)
          this.messageDialog = false
          this.$refs['sendForm'].resetFields();
          this.query(this.$store.state.fitManagementPageNo,this.$store.state.fitManagementPageSize);
        })
      },
      addForm(formName){
        let _url='';
        if(this.$store.state.hospitalType == 1){
              _url = '/base/fit/result/addFit'
          }else if(this.$store.state.hospitalType == 2){
              // _url = '/base/area/fit/result/addFit'
               _url = '/base/fit/result/addFit'
          }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            $axios_http({
              url: _url,
              data: {
                sid: this.addForms.sid,
                fitCode:this.addForms.fitCode,
                releaseDate:this.addForms.releaseDate,
                releasePersonCode:this.addForms.releasePersonCode,
              },
              vueObj: this
            }).then((res) => {
              if(res.data.statusCode=='000000'){
                $successMsg(this, "添加成功")
                this.addFormDialog = false
                this.$refs['addForms'].resetFields();
                this.query(this.$store.state.fitManagementPageNo,this.$store.state.fitManagementPageSize);
              }else{
                $failMsg(this, res.data.statusMsg)
              }
            })
          }
        })
      },
      //查询
      query(pageNo,pageSize){
        let obj={};
        if(this.$store.state.hospitalType == 1){
              this.url = '/base/fit/result/query'
          }else if(this.$store.state.hospitalType == 2){
              // this.url = '/base/area/fit/result/query'
              this.url = '/base/fit/result/query'
          }
           if(this.$store.state.hospitalType == 1){
              obj={
                name:this.qc.name,
                sid:this.qc.sid,
                phone:this.qc.phone,
                group:this.qc.group,
                codeEntryStatus:this.qc.codeEntryStatus,
                insertStatus:this.qc.insertStatus,
                result:this.qc.result,
                followGroup:this.qc.followGroup,
                followState:this.qc.followState,
                loginName:this.qc.loginName,
                pageNo:pageNo,//当前页
                pageSize:pageSize//每页条数
              }
          }else if(this.$store.state.hospitalType == 2){
              obj={
                name:this.qc.name,
                sid:this.qc.sid,
                communityDeptId:this.qc.communityDeptId,
                loginName:this.qc.loginName,
                phone:this.qc.phone,
                group:this.qc.group,
                codeEntryStatus:this.qc.codeEntryStatus,
                insertStatus:this.qc.insertStatus,
                result:this.qc.result,
                followGroup:this.qc.followGroup,
                followState:this.qc.followState,
                pageNo:pageNo,//当前页
                pageSize:pageSize//每页条数
              }
          }
        $axios_http({
          url:this.url,
          data:obj,
          vueObj:this
        }).then((res)=>{
          this.$store.commit('get_fitManagementPageNo',pageNo)
          this.queryResult.tableData=res.data.data;
          this.queryResult.totalPageCount=res.data.pageInfo.totalPageCount//获取总共多少页
          this.queryResult.totalRowCount=res.data.pageInfo.totalRowCount//获取总共条数
        })
      },
      closeInputResultDialog(){
        Object.assign(this.$data.insertForm, this.$options.data().insertForm);
        this.inputResultDialog=false;
        this.inputResultPrompt=false;
        if((this.resultInfo==2 || this.resultInfo==1 || this.resultInfo==3) && this.checked){
           $axios_http({
            url: "/base/fit/result/sendFit",
            data: {
              id: this.sendForm.id,
              phone:this.sendForm.phone,
            },
            vueObj: this
          }).then((res) => {
              setTimeout(()=>{
                $successMsg(this, "发送成功")
              },500)
          })
        }
        Object.assign(this.$data.sendForm, this.$options.data().sendForm);     
        this.checked=true;     
      },
      inputCodeDialogIsShow(id,sid){
        this.id=id;
        this.sid=sid;
        this.editBtn=false;
        this.inputCodeDialog=true;
      },
      getInfo(value){
        let _url='';
        if(this.$store.state.hospitalType == 1){
              _url = '/base/hospital/person/detail/getSid'
          }else if(this.$store.state.hospitalType == 2){
              _url = '/base/area/hospital/person/detail/getSid'
          }
        if (this.addForms.sid){
          $axios_http({
            url: _url,
            data:{
                sid:this.addForms.sid
            },
            vueObj: this
          }).then((res) => {
              this.addForms.name = res.data.data[0].name
              this.addForms.phone = res.data.data[0].phone
          })
        }

      },
      inputResultDialogIsShow(id,sid,phone){
        this.id=id;
        this.sid=sid;
        // 清空文件列表和图片路径
        this.fileList=[];
        this.pathUrl=null;
        this.inputResultDialog=true;
        // 录入结果发送短信值
        this.sendForm.phone=phone;
        this.sendForm.id=id;
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
        this.addCodeForm.releaseDate = currentdate
        this.insertForm.resultDate = currentdate
      },
      cancel(){
        this.addFormDialog = false
        this.$refs['addForms'].resetFields();
      },
      inputResult(formName){
        let _url='';
        if(this.$store.state.hospitalType == 1){
              _url = '/base/fit/result/add'
          }else if(this.$store.state.hospitalType == 2){
              // _url = '/base/area/fit/result/add'
              _url = '/base/fit/result/add'
          }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            $axios_http({
              url:_url,
              data:{
                id:this.id,
                sid:this.sid,
                resultStatus:this.insertForm.resultStatus,
                resultDate:this.insertForm.resultDate,
                upLineValue:this.insertForm.upLineValue,
                downLineValue:this.insertForm.downLineValue,
                noResonResult:this.insertForm.noResonResult,
                inTenMin:this.insertForm.inTenMin,
                pathUrl:this.pathUrl
              },
              vueObj:this
            }).then((res)=>{
              $successMsg(this,"结果录入成功")
              this.query(this.$store.state.fitManagementPageNo,this.$store.state.fitManagementPageSize);
              this.inputResultDialog=false;
              this.inputResultPrompt=true;
              this.resultInfo=res.data.data.result;
            })
          } else {
            return false;
          }
        });

      },
       inputFitResult(formName){   //编辑fit结果
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.changeImg && !this.pathUrl){
               this.$message({
                  type: 'error',
                  message: '图片未上传!'
                });
            }else{
              $axios_http({
                url:'/base/fit/result/editFitResult',
                data:{
                  id:this.id,
                  sid:this.sid,
                  resultStatus:this.inputFitForm.resultStatus,
                  releaseDate:dateFormater.dateFormater(this.inputFitForm.releaseDate),
                  resultDate:dateFormater.dateFormater(this.inputFitForm.resultDate),
                  upLineValue:this.inputFitForm.upLineValue,
                  downLineValue:this.inputFitForm.downLineValue,
                  noResonResult:this.inputFitForm.noResonResult,
                  inTenMin:this.inputFitForm.inTenMin,
                  releasePersonCode:this.inputFitForm.releasePersonCode,
                  noResonDate:this.inputFitForm.noResonDate,
                  fitCode:this.inputFitForm.fitCode,
                  pathUrl:this.pathUrl
                },
                vueObj:this
              }).then((res)=>{
                $successMsg(this,"结果编辑成功")
                this.query(this.$store.state.fitManagementPageNo,this.$store.state.fitManagementPageSize);
                this.inputFitResultDialog=false;
                this.inputResultPrompt=true;
                this.changeImg=false;
                this.pathUrl=null;
                this.resultInfo=res.data.data.result;
              })
            }
            
          } else {
            return false;
          }
        });

      },
      inputCode(formName){
        let _url='';
        if(this.editBtn==true && this.$store.state.hospitalType == 1){  //编辑
            _url = '/base/area/fit/result/code/updateEntry'
        }
        if(this.editBtn==false && this.$store.state.hospitalType == 1){  //新增
              _url = '/base/fit/result/code/entry'
          }
        if(this.editBtn==false && this.$store.state.hospitalType == 2){   //新增
              // _url = '/base/area/fit/result/code/entry'
               _url = '/base/fit/result/code/entry'
        }
        if(this.editBtn==true && this.$store.state.hospitalType == 2){   //编辑
              _url = '/base/area/fit/result/code/updateEntry'
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            $axios_http({
              url:_url,
              data:{
                id:this.id,
                sid:this.sid,
                releasePersonCode:this.addCodeForm.releasePersonCode,
                releaseDate:this.addCodeForm.releaseDate,
                fitCode:this.addCodeForm.fitCode
              },
              vueObj:this
            }).then((res)=>{
              $successMsg(this,"编码录入成功")
              this.query(this.$store.state.fitManagementPageNo,this.$store.state.fitManagementPageSize);
              this.inputCodeDialog=false;
              this.editBtn=false;
              Object.assign(this.$data.addCodeForm, this.$options.data().addCodeForm)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      seeEvent(id){
        this.seeDialog=true;
        $axios_http({
          url: "/base/fit/result/getFItResult/"+id,
          data: {},
          vueObj: this
        }).then((res) => {
          this.insertStatus=res.data.data.insertStatus;
          this.resultStatus=res.data.data.resultStatus;
          this.noResonResult=res.data.data.noResonResult;
          this.upLineValue=res.data.data.upLineValue;
          this.downLineValue=res.data.data.downLineValue;
          this.intenM = res.data.data.inTenMin
          this.result=res.data.data.result;
          // this.pathUrl=res.data.data.pathUrl;
          this.pathUrl= SERVER_NAME + '/base/dnafile/downFile?filePath=' + res.data.data.pathUrl;         
          if(this.insertStatus==1){
            this.insertStatus='未录入'
          }else if(this.insertStatus==2){
            this.insertStatus='已录入'
          }else if(this.insertStatus==3){
            this.insertStatus='待审核'
          }
          if(this.resultStatus==1){
            this.resultStatus='有结果'
          }else if(this.resultStatus==2){
            this.resultStatus='无结果'
          }
          if(this.result==2){
            this.result='阳性'
          }else if(this.result==1){
            this.result='阴性'
          }else if(this.result==3){
            this.result='无效'
          }

        })
      },
      changePeriod(obj){
        this.periodData.forEach((item,ind)=>{
          if(item.period==obj){
            console.log(item,999)
            this.insertForm.examinationName=item.examinationName;
            this.insertForm.deptName=item.deptName;
            this.insertForm.name=item.name;
            this.insertForm.reserveable=item.reserveable;
            this.allocationId=item.id;
          }
        })
      },
      getServerInfo(colonoscopyRecordId,sid){
        this.reserveDialog=true;
        this.sid=sid;
        this.colonoscopyRecordId=colonoscopyRecordId;
        $axios_http({
          url: "/base/hospital/community/allocation/query",
          data: {},
          vueObj: this
        }).then((res) => {
          this.periodData=res.data.data
          this.insertForm=res.data.data[0]
          this.allocationId=res.data.data[0].id;
          this.period=this.insertForm.period;
        })
      },
      resverEvent(){
        $axios_http({
          url:"/base/hospital/colonoscopy/record/booking",
          data:{
            colonoscopyRecordId:this.colonoscopyRecordId,
            sid:this.sid,
            allocationId:this.allocationId
          },
          vueObj:this
        }).then((res)=>{
          $successMsg(this,"预约成功")
          this.reserveDialog=false
          this.query(this.$store.state.fitManagementPageNo,this.$store.state.fitManagementPageSize);
        })
      },
      //重置检索条件
      reset(){
        Object.assign(this.$data.qc, this.$options.data().qc)
        if(localStorage.getItem('communityType')=='true'){
          this.ids.push(localStorage.getItem('loginName'));
          this.qc.loginName=localStorage.getItem('loginName');
        }else{
          this.ids = []
        }
        this.query(this.$store.state.fitManagementPageNo,this.$store.state.fitManagementPageSize);
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
            url:"/base/role/delete/"+id,
            vueObj:this
          }).then((res)=>{
            $successMsg(this,"删除成功")
            this.query(this.$store.state.fitManagementPageNo,this.$store.state.fitManagementPageSize);
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
        //this.queryResult.pageSize = pageSize
//        setTimeout(()=> {
          this.$store.commit('get_fitManagementPageSize', pageSize)
          console.log(`每页 ${pageSize} 条`)
//            ,3000})
        this.query(this.$store.state.fitManagementPageNo,pageSize);
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        //this.queryResult.pageNo = currentPage
        this.$store.commit('get_fitManagementPageNo',currentPage)
        this.query(currentPage,this.$store.state.fitManagementPageSize);
      },
      changeRadio(value){
        if(value==1){
          this.insertForm.noResonResult=''
          this.inputFitForm.noResonResult=''
        }else if(value==2){
          this.insertForm.upLineValue=null;
          this.insertForm.downLineValue=null;
          this.insertForm.inTenMin='';
          this.inputFitForm.upLineValue=null;
          this.inputFitForm.downLineValue=null;
          this.inputFitForm.inTenMin='';
        }
      }
    }}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .filter-item{
    width: 200px;
    margin-right: 10px;

  }
  .checkbox{
    display: block;
    margin-left: 5px;
    font-weight: normal;
  }
  .inline{
    display: inline-block;
    margin-top: 20px;
  }
  .btnStyle{
    padding-left: 10px;
  }
  .return-home {
    display: block;
    text-align: center;
    margin-bottom:20px;
  }
  .table-btn-grooup{
    margin-top:20px;
    margin-bottom:10px;
  }
  .resultList{
    width: 50%;
    list-style: none;
    margin-left:50px;
  }
  .resultList li{
    line-height: 40px;
    font-size: 14px;
  }
  .lineWidth{
    width: 50%;
  }
  .dialog-footer{
    position: absolute;right:20px;bottom:20px;
  }
  .resultInfo{
    text-align: center;
    line-height: 30px;
    font-size: 18px;
    font-weight: 500;
  }
  .notification-input{
    width: 220px;
  }
  .editFitResultDialog .left{
    width: 60%;
  }
  .editFitResultDialog .lineWidth{
    width: 220px;
  }
  .editFitResultDialog .right{
    width: 40%;
    height: 420px;
    overflow: hidden;
    position: relative;
  }
  .editFitResultDialog .right img{
    width: 100%;
    position:absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  img.seeImg{
    width: 214px;
  }
</style>
<style>
  .content {
    background: #fff;
    padding: 10px;
  }
  .upload-demo .el-upload-list__item .el-progress{
    display: none !important;
  }
</style>
