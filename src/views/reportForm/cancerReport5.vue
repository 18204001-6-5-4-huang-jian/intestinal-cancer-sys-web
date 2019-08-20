<!---
 $route.query.flag:0,查看；1：录入（来源于列表）；2：编辑；5：录入（来源于新增）
 -->
<template>
  <div class="j_content" v-if="cancerReport5_page">
    <div style="min-width: 941px;">
      <div class="btns">
        <el-button type="normal" size="small" class="fl" @click="goBack()">返回</el-button>
        <p class="text">表C5-死亡证明相关组表</p>
      </div>
      <el-form :inline="true" :model="formInline" label-width="125px" :rules="rules" ref="formInline">
      <div class="formcon">
        <div class="title">
          基本信息
        </div>
        <div class="tables">
            <el-row>
              <el-col :span="8">
                 <el-form-item label="SID:" class="formoneline">
                   {{formInline.sid}}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                 <el-form-item label="调查员:" class="formoneline" prop="investigator">
                   <el-input type="text" v-model.trim="formInline.investigator" maxlength="20" :disabled="$route.query.flag==0"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                 <el-form-item label="质控者:" class="formoneline" prop="qualitycontrol">
                   <el-input type="text" v-model.trim="formInline.qualitycontrol" :disabled="$route.query.flag==0"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                 <el-form-item label="姓名:" class="formoneline">
                   {{formInline.name}}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                 <el-form-item label="性别:" class="formoneline">
                   {{formInline.sex | reverseSex}}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                 <el-form-item label="年龄:" class="formoneline">
                   {{formInline.age}}
                </el-form-item>
              </el-col>
            </el-row>
        </div>
      </div>
      <div class="formcon">
        <div class="title">
          一、死亡证明追踪记录表
        </div>
        <div class="tables">
          <el-row>
            <el-form-item label="1、筛查现场得知受试者死亡的日期:" class="formoneline" prop="itemA1" label-width="245px">
                <el-date-picker 
                   :clearable="false"
                   :disabled="$route.query.flag==0"
                   v-model="formInline.itemA1"
                   type="date"
                   format="yyyy年MM月dd日"
                   value-format="yyyy-MM-dd"
                   placeholder="选择日期"
                   :picker-options="pickerOptions1">
                </el-date-picker>
              </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="2、索要死亡证明的日期:" class="formoneline" prop="itemA2" label-width="175px">
                <el-date-picker 
                   :clearable="false"
                   :disabled="$route.query.flag==0"
                   v-model="formInline.itemA2"
                   type="date"
                   format="yyyy年MM月dd日"
                   value-format="yyyy-MM-dd"
                   placeholder="选择日期"
                   @change="changeItemA2"
                   :picker-options="pickerOptions1">
                </el-date-picker>
              </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="3、死亡证明是否收到:" class="formoneline" prop="itemA3" label-width="163px">
              <el-radio-group v-model="formInline.itemA3" :disabled="$route.query.flag==0" @change="clearItemA4">
                <el-radio :label="1">1.是</el-radio>
                <el-radio :label="2">2.否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-row>
          <el-row v-if="formInline.itemA3==1">
            <el-form-item label="3a、收到日期:" class="formoneline" prop="itemA4" label-width="113px">
                <el-date-picker 
                   :clearable="false"
                   :disabled="$route.query.flag==0"
                   v-model="formInline.itemA4"
                   type="date"
                   format="yyyy年MM月dd日"
                   value-format="yyyy-MM-dd"
                   placeholder="选择日期"
                   :picker-options="pickerOptions2">
                </el-date-picker>
              </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="4、备注:" class="formoneline" prop="itemA5" label-width="75px">
              <el-input type="textarea" v-model="formInline.itemA5" style="width:800px;" :disabled="$route.query.flag==0" maxlength="500"></el-input>
            </el-form-item>
          </el-row>
        </div>
      </div>
      <div class="formcon">
        <div class="title">
          二、死亡证明材料清单
        </div>
        <div class="tables">
          <el-row>
            <el-col :span="8">
               <el-form-item label="筛查现场ID:" class="formoneline">
                 {{formInline.siteId | siteId}}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="死亡日期:" class="formoneline" prop="itemBA2">
                  <el-date-picker 
                     :clearable="false"
                     :disabled="$route.query.flag==0"
                     v-model="formInline.itemBA2"
                     type="date"
                     format="yyyy年MM月dd日"
                     value-format="yyyy-MM-dd"
                     placeholder="选择日期"
                     :picker-options="pickerOptions1">
                  </el-date-picker>
                </el-form-item>
              </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
               <el-form-item label="填表人:" class="formoneline" prop="itemBA3">
                 <el-input type="text" v-model.trim="formInline.itemBA3" maxlength="20" :disabled="$route.query.flag==0"></el-input>
              </el-form-item>
            </el-col>
              <el-col :span="8">
                 <el-form-item label="质控者:" class="formoneline" prop="itemBA4">
                   <el-input type="text" v-model.trim="formInline.itemBA4" maxlength="20" :disabled="$route.query.flag==0"></el-input>
                </el-form-item>
              </el-col>
          </el-row>
        </div>
      </div>
      <div class="formcon">
        <div class="title">
          A部分：癌症确认
          <el-button class="fr" size="mini" type="danger" v-if="$route.query.flag!=0" @click="clear1">清空</el-button>
        </div>
        <div class="tables">
          <el-row>
            <p class="pTitle">请核实以下每一项内容:</p>
            <el-form-item label="" class="formoneline" prop="itemBB1List">
              <el-checkbox-group v-model="formInline.itemBB1List" :disabled="$route.query.flag==0">
                <el-checkbox label="1">1、所有的《年度信息更新表》全部收到</el-checkbox><br>
                <el-checkbox label="2">2、所有外部报告的癌症病例已记录在《癌症报告表》中</el-checkbox><br>
                <el-checkbox label="3">3、所有可疑癌症病例已在《癌症诊断表》中确认</el-checkbox><br>
                <el-checkbox label="4">4、所有筛查阳性结果的随访情况已记录在《肺癌诊断信息摘录表》或《结直肠癌诊断信息摘录表》中</el-checkbox><br>
                <el-checkbox label="5">5、所有确诊的肺癌或大肠癌患者已记录在《肺癌诊断信息摘录表》或《结直肠癌诊断信息摘录表》中</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="此病例是否被选为审核病例" class="formoneline" prop="itemBB2" label-width="180px">
              <el-radio-group v-model="formInline.itemBB2" :disabled="$route.query.flag==0">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="2">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-row>
        </div>
      </div>

      <div class="formcon">
        <div class="title">
          B部分：医疗记录证明
          <el-button class="fr" size="mini" type="danger" v-if="$route.query.flag!=0" @click="clear2">清空</el-button>
        </div>
        <div class="tables">
          <el-row>
            <el-col :span="10">
              <p :class="$route.query.flag==0?'fileListLook':''">
              依据肿瘤确诊记录的类型完成下表
                <el-upload
                    :action="uploadUrl"
                    :before-upload="handleUpload"
                    :http-request="uploadFileHandle"
                    :on-change="handleChangeFile"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :show-file-list="true"
                    :withCredentials="true"
                    :file-list="fileList"
                    ref="uploadFile"
                    multiple>
                    <el-button size="small" type="primary" v-if="$route.query.flag!=0"><i class="el-icon-upload2"></i>上传文件</el-button>
                </el-upload>
              </p>
            </el-col>
          </el-row>
          <table class="cancerTable">
            <tr>
              <th>文件类型<br>（以下可获得的文件都请附上）</th>
              <th>是否收到<br>（1=是，2=否，3=不适用）</th>
              <th>意见/备注</th>
            </tr>
            <tr>
              <td>终点事件</td>
              <td>
                <el-input type="text" v-model.trim="formInline.itemBB3" :disabled="$route.query.flag==0"></el-input>
              </td>
              <td>
                <el-input type="textarea" v-model.trim="formInline.itemBB4" :disabled="$route.query.flag==0" maxlength="500"></el-input>
              </td>
            </tr>
            <tr>
              <td>住院史/体检</td>
              <td>
                <el-input type="text" v-model.trim="formInline.itemBB5" :disabled="$route.query.flag==0"></el-input>
              </td>
              <td>
                <el-input type="textarea" v-model.trim="formInline.itemBB6" :disabled="$route.query.flag==0" maxlength="500"></el-input>
              </td>
            </tr>
            <tr>
              <td>手术报告</td>
              <td>
                <el-input type="text" v-model.trim="formInline.itemBB7" :disabled="$route.query.flag==0"></el-input>
              </td>
              <td>
                <el-input type="textarea" v-model.trim="formInline.itemBB8" :disabled="$route.query.flag==0" maxlength="500"></el-input>
              </td>
            </tr>
            <tr>
              <td>病理报告</td>
              <td>
                <el-input type="text" v-model.trim="formInline.itemBB9" :disabled="$route.query.flag==0"></el-input>
              </td>
              <td>
                <el-input type="textarea" v-model.trim="formInline.itemBB10" :disabled="$route.query.flag==0" maxlength="500"></el-input>
              </td>
            </tr>
            <tr>
              <td>化疗记录</td>
              <td>
                <el-input type="text" v-model.trim="formInline.itemBB11" :disabled="$route.query.flag==0"></el-input>
              </td>
              <td>
                <el-input type="textarea" v-model.trim="formInline.itemBB12" :disabled="$route.query.flag==0" maxlength="500"></el-input>
              </td>
            </tr>
            <tr>
              <td>放疗记录</td>
              <td>
                <el-input type="text" v-model.trim="formInline.itemBB13" :disabled="$route.query.flag==0"></el-input>
              </td>
              <td>
                <el-input type="textarea" v-model.trim="formInline.itemBB14" :disabled="$route.query.flag==0" maxlength="500"></el-input>
              </td>
            </tr>
            <tr>
              <td>多发性肿瘤的管理</td>
              <td>
                <el-input type="text" v-model.trim="formInline.itemBB15" :disabled="$route.query.flag==0"></el-input>
              </td>
              <td>
                <el-input type="textarea" v-model.trim="formInline.itemBB16" :disabled="$route.query.flag==0" maxlength="500"></el-input>
              </td>
            </tr>
            <tr>
              <td>出院病史摘要</td>
              <td>
                <el-input type="text" v-model.trim="formInline.itemBB17" :disabled="$route.query.flag==0"></el-input>
              </td>
              <td>
                <el-input type="textarea" v-model.trim="formInline.itemBB18" :disabled="$route.query.flag==0" maxlength="500"></el-input>
              </td>
            </tr>
            <tr>
              <td>出院病史小结</td>
              <td>
                <el-input type="text" v-model.trim="formInline.itemBB19" :disabled="$route.query.flag==0"></el-input>
              </td>
              <td>
                <el-input type="textarea" v-model.trim="formInline.itemBB20" :disabled="$route.query.flag==0" maxlength="500"></el-input>
              </td>
            </tr>
            <tr>
              <td>诊断报告</td>
              <td>
                <el-input type="text" v-model.trim="formInline.itemBB21" :disabled="$route.query.flag==0"></el-input>
              </td>
              <td>
                <el-input type="textarea" v-model.trim="formInline.itemBB22" :disabled="$route.query.flag==0" maxlength="500"></el-input>
              </td>
            </tr>
            <tr>
              <td>影像诊断报告</td>
              <td>
                <el-input type="text" v-model.trim="formInline.itemBB23" :disabled="$route.query.flag==0"></el-input>
              </td>
              <td>
                <el-input type="textarea" v-model.trim="formInline.itemBB24" :disabled="$route.query.flag==0" maxlength="500"></el-input>
              </td>
            </tr>
            <tr>
              <td>门诊记录</td>
              <td>
                <el-input type="text" v-model.trim="formInline.itemBB25" :disabled="$route.query.flag==0"></el-input>
              </td>
              <td>
                <el-input type="textarea" v-model.trim="formInline.itemBB26" :disabled="$route.query.flag==0" maxlength="500"></el-input>
              </td>
            </tr>
            <tr>
              <td>尸检报告</td>
              <td>
                <el-input type="text" v-model.trim="formInline.itemBB27" :disabled="$route.query.flag==0"></el-input>
              </td>
              <td>
                <el-input type="textarea" v-model.trim="formInline.itemBB28" :disabled="$route.query.flag==0" maxlength="500"></el-input>
              </td>
            </tr>
            <tr>
              <td>临床实验数据</td>
              <td>
                <el-input type="text" v-model.trim="formInline.itemBB29" :disabled="$route.query.flag==0"></el-input>
              </td>
              <td>
                <el-input type="textarea" v-model.trim="formInline.itemBB30" :disabled="$route.query.flag==0" maxlength="500"></el-input>
              </td>
            </tr>
            <tr>
              <td>咨询报告</td>
              <td>
                <el-input type="text" v-model.trim="formInline.itemBB31" :disabled="$route.query.flag==0"></el-input>
              </td>
              <td>
                <el-input type="textarea" v-model.trim="formInline.itemBB32" :disabled="$route.query.flag==0" maxlength="500"></el-input>
              </td>
            </tr>
            <tr>
              <td>急诊医学记录</td>
              <td>
                <el-input type="text" v-model.trim="formInline.itemBB33" :disabled="$route.query.flag==0"></el-input>
              </td>
              <td>
                <el-input type="textarea" v-model.trim="formInline.itemBB34" :disabled="$route.query.flag==0" maxlength="500"></el-input>
              </td>
            </tr>
            <tr v-for="(item,index) in formInline.itemBBDiagnosisList" :key="`itemBBDiagnosisList${index}`">
              <td>其它诊断记录</td>
              <td>
                <el-input type="text" v-model.trim="item.item1" :disabled="$route.query.flag==0"></el-input>
              </td>
              <td>
                <el-input type="textarea" v-model.trim="item.item2" :disabled="$route.query.flag==0" maxlength="500"></el-input>
              </td>
              <td class="noborder" v-if="$route.query.flag!=0">
                <el-button type="primary" icon="el-icon-plus" size="mini" :disabled="formInline.itemBBDiagnosisList.length>=5" @click="add"></el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" :disabled="formInline.itemBBDiagnosisList.length<=1" @click="del(index)"></el-button>
              </td>
            </tr>
            <tr v-for="(item,index) in formInline.itemBBTreatmentList" :key="`itemBBTreatmentList${index}`">
              <td>其它治疗记录</td>
              <td>
                <el-input type="text" v-model.trim="item.item1" :disabled="$route.query.flag==0"></el-input>
              </td>
              <td>
                <el-input type="textarea" v-model.trim="item.item2" :disabled="$route.query.flag==0" maxlength="500"></el-input>
              </td>
              <td class="noborder" v-if="$route.query.flag!=0">
                <el-button type="primary" icon="el-icon-plus" size="mini" :disabled="formInline.itemBBTreatmentList.length>=5" @click="add1"></el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" :disabled="formInline.itemBBTreatmentList.length<=1" @click="del1(index)"></el-button>
              </td>
            </tr>
          </table>
        </div>
      </div>


      <div class="formcon">
        <div class="title">
          C部分：编辑并邮寄癌症病例确认程序的相关文件
          <el-button class="fr" size="mini" type="danger" v-if="$route.query.flag!=0" @click="clear3">清空</el-button>
        </div>
        <div class="tables">
          <el-row>
            <p class="pTitle">请核实以下每一项内容并完成填写核查记录情况:</p>
            <el-form-item label="" class="formoneline" prop="itemBC1List">
              <el-checkbox-group v-model="formInline.itemBC1List" :disabled="$route.query.flag==0">
                <el-checkbox label="1">1、病人身份信息已去除</el-checkbox><br>
                <el-checkbox label="2">2、肿瘤检查方法信息已删除或不适用</el-checkbox><br>
                <el-checkbox label="3">3、涉及本研究的内容已删除或不适用</el-checkbox><br>
                <el-checkbox label="4">4、涉及受试者分组信息已删除或不适用</el-checkbox><br>
                <el-checkbox label="5">5、受试者ID编码标签已粘贴至每一页</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="病历记录是否完整？" class="formoneline" prop="itemBC2" label-width="138px">
              <el-radio-group v-model="formInline.itemBC2" :disabled="$route.query.flag==0">
                <el-radio :label="1">1、是</el-radio>
                <el-radio :label="2">2、否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-row>
          <el-row>
            <p class="pTitle">邮寄的材料:</p>
            <el-form-item label="" class="formoneline" prop="itemBC3List">
              <el-checkbox-group v-model="formInline.itemBC3List" :disabled="$route.query.flag==0">
                <el-checkbox label="1">1、肿瘤验证程序副本文件夹副本</el-checkbox><br>
                <el-checkbox label="2">2、死亡证明副本</el-checkbox><br>
                <el-checkbox label="3">3、病史调查问卷副本</el-checkbox><br>
                <el-checkbox label="4">4、多个受试者ID标签</el-checkbox><br>
                <el-checkbox label="5">5、文件夹已整理排序</el-checkbox><br>
                <el-checkbox label="6">6、肿瘤验证程序材料上交完成</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="邮寄给协调中心的日期:" class="formoneline" prop="itemBC4" label-width="160px">
              <el-date-picker 
                  :clearable="false"
                  :disabled="$route.query.flag==0"
                  v-model="formInline.itemBC4"
                  type="date"
                  format="yyyy年MM月dd日"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                :picker-options="pickerOptions1">
              </el-date-picker>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="备注:" class="formoneline" prop="itemBC5" label-width="45px">
              <el-input type="textarea" v-model="formInline.itemBC5" style="width:800px;" :disabled="$route.query.flag==0" maxlength="500"></el-input>
            </el-form-item>
          </el-row>
        </div>
      </div>
      </el-form>
      <div class="text-center" style="margin-top: 40px;" v-if="$route.query.flag!=0">
        <el-button type="primary" @click="submit()">提交</el-button>
        <el-button @click='goBack()'>取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
var askDate = "";
import dateFormater from "../../filters/index";
import axios from "axios";
let loading;
export default {
  name: "report1",
  data() {
    return {
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      pickerOptions2: {
        disabledDate(time) {
          return (
            time.getTime() > Date.now() ||
            new Date(askDate).getTime() - 86400000 > time.getTime()
          );
        }
      },
      uploadUrl: SERVER_NAME + "/base/hospital/deathCertificateList/fileUpload",
      fileList: [],
      formParamsTable: {},
      formInline: {
        id: null,
        sid: null,
        siteId: null, //  '筛查现场id',
        investigator: null, //'调查员',
        qualitycontrol: null, //'质控者',
        name: null, //'姓名',
        sex: null, //'性别',
        age: null, //'年龄',
        itemA1: null, //'筛查现场得知受试者死亡的日期',
        itemA2: null, //'索要死亡证明的日期',
        itemA3: null, // '死亡证明是否收到 1.是；2.否',
        itemA4: null, //'收到日期',
        itemA5: null, // '备注',
        itemBA1: null, //'筛查现场ID',
        itemBA2: null, // '死亡日期',
        itemBA3: null, //'填表人',
        itemBA4: null, //'质控者',
        itemBB1List: [], //      '请核实以下每一项内容,逗号分隔',
        itemBB2: null, //'此病例是否被选为审核病例 1.是；2.否',
        itemBB3: null, //'终点事件是否收到 1=是，2=否，3=不适用',
        itemBB4: null, // '意见/备注',
        itemBB5: null, //'住院史/体检是否收到 1=是，2=否，3=不适用',
        itemBB6: null, // '意见/备注',
        itemBB7: null, //'手术报告是否收到 1=是，2=否，3=不适用',
        itemBB8: null, // '意见/备注',
        itemBB9: null, //'病理报告是否收到 1=是，2=否，3=不适用',
        itemBB10: null, //  '意见/备注',
        itemBB11: null, // '化疗记录是否收到 1=是，2=否，3=不适用',
        itemBB12: null, //  '意见/备注',
        itemBB13: null, // '放疗记录是否收到 1=是，2=否，3=不适用',
        itemBB14: null, //  '意见/备注',
        itemBB15: null, // '多发性肿瘤的管理是否收到 1=是，2=否，3=不适用',
        itemBB16: null, //  '意见/备注',
        itemBB17: null, // '出院病史摘要是否收到 1=是，2=否，3=不适用',
        itemBB18: null, //  '意见/备注',
        itemBB19: null, // '出院病史小结是否收到 1=是，2=否，3=不适用',
        itemBB20: null, //  '意见/备注',
        itemBB21: null, // '诊断报告是否收到 1=是，2=否，3=不适用',
        itemBB22: null, //  '意见/备注',
        itemBB23: null, // '影像诊断报告是否收到 1=是，2=否，3=不适用',
        itemBB24: null, //  '意见/备注',
        itemBB25: null, // '门诊记录是否收到 1=是，2=否，3=不适用',
        itemBB26: null, //  '意见/备注',
        itemBB27: null, // '尸检报告是否收到 1=是，2=否，3=不适用',
        itemBB28: null, //  '意见/备注',
        itemBB29: null, // '临床实验数据是否收到 1=是，2=否，3=不适用',
        itemBB30: null, //  '意见/备注',
        itemBB31: null, // '咨询报告是否收到 1=是，2=否，3=不适用',
        itemBB32: null, //  '意见/备注',
        itemBB33: null, // '急诊医学记录是否收到 1=是，2=否，3=不适用',
        itemBB34: null, //  '意见/备注',
        itemBBDiagnosisList: [{ item1: null, item2: null }],
        itemBBTreatmentList: [{ item1: null, item2: null }],
        itemBC1List: [], //     '请核实以下每一项内容并完成填写核查记录情况,逗号分隔',
        itemBC2: null, //'病历记录是否完整？ 1.是；2.否',
        itemBC3List: [], //      '邮寄的材料,逗号分隔',
        itemBC4: null, // '邮寄给协调中心的日期',
        itemBC5: null // '备注',
      },
      rules: {
        investigator: [{ required: true, message: "必填", trigger: "blur" }],
        qualitycontrol: [{ required: true, message: "必填", trigger: "blur" }],
        itemA1: [{ required: true, message: "必填", trigger: "blur" }],
        itemA2: [{ required: true, message: "必填", trigger: "blur" }],
        itemA3: [{ required: true, message: "必填", trigger: "change" }],
        itemA4: [{ required: true, message: "必填", trigger: "blur" }],
        itemBA1: [{ required: true, message: "必填", trigger: "blur" }],
        itemBA2: [{ required: true, message: "必填", trigger: "blur" }],
        itemBA3: [{ required: true, message: "必填", trigger: "blur" }],
        itemBA4: [{ required: true, message: "必填", trigger: "blur" }]
      }
    };
  },
  created() {
    this.formInline.id = this.$route.query.id;
    this.formInline.sid = this.$route.query.sid;
    let obj = this.checkPageAuth(this, "cancerReport5_page", this.btnAuth);
    if (this.$route.query.flag == 0 || this.$route.query.flag == 2) {
      // 0-查看  1-录入  2-编辑
      this.queryreportbyid();
    } else {
      // 录入  or  新增
      this.getCustomerInfo();
    }
  },
  methods: {
    // 获取用户基本信息
    getCustomerInfo() {
      $axios_http({
        url: "/base/hospital/review/get/" + this.$route.query.sid,
        data: {},
        vueObj: this
      }).then(res => {
        const { siteId, name, sex, age } = res.data.data;
        this.formInline.siteId = siteId; //  '筛查现场id',
        this.formInline.itemBA1 = siteId; //  '筛查现场id',
        this.formInline.name = name; //'姓名',
        this.formInline.sex = sex; //'性别',
        this.formInline.age = age; //'年龄',
      });
    },
    changeItemA2() {
      askDate = this.formInline.itemA2;
    },
    // 其他诊断依据
    add() {
      this.formInline.itemBBDiagnosisList.push({
        item1: null,
        item2: null
      });
    },
    del(index) {
      this.formInline.itemBBDiagnosisList.splice(index, 1);
    },
    // 其他治疗依据
    add1() {
      this.formInline.itemBBTreatmentList.push({
        item1: null,
        item2: null
      });
    },
    del1(index) {
      this.formInline.itemBBTreatmentList.splice(index, 1);
    },
    submit() {
      //提交
      let validd = true;
      this.$refs.formInline.validate(valid => {
        if (!valid) {
          validd = false;
        }
        if (validd) {
          if (this.$route.query.flag != 2) {
            this.$confirm("该受试者年度总体状态为“死亡”", "提示", {
              confirmButtonText: "是",
              cancelButtonText: "否",
              type: "warning"
            })
              .then(() => {
                this.saveC5();
              })
              .catch(() => {});
          } else {
            this.saveC5();
          }
        } else {
          $failMsg(this, "有未填项");
        }
      });
    },
    saveC5() {
      let _url = null;
      if (this.$route.query.flag != 5) {
        _url = "/base/hospital/deathCertificate/save";
      } else {
        _url = "/base/hospital/deathCertificate/add";
      }
      this.fileList.filter(item => {
        item.status = null;
      });
      $axios_http({
        url: _url,
        data: Object.assign({}, this.formInline, {
          fileList: this.fileList
        }),
        vueObj: this
      }).then(res => {
        if (res.data.statusCode === "000000") {
          $successMsg(this, "保存成功");
          this.goBack();
        }
      });
    },
    clear1() {
      this.formInline.itemBB2 = null;
      this.formInline.itemBB1List = [];
    },
    clear2() {
      for (let itemA in this.formInline) {
        if (
          itemA.startsWith("itemBB") &&
          itemA != "itemBB2" &&
          itemA != "itemBB1List" &&
          itemA != "itemBBDiagnosisList" &&
          itemA != "itemBBTreatmentList"
        ) {
          this.formInline[itemA] = null;
        }
      }
      this.formInline.itemBBDiagnosisList = [{ item1: null, item2: null }];
      this.formInline.itemBBTreatmentList = [{ item1: null, item2: null }];
      this.fileList = []
    },
    clear3() {
      for (let itemA in this.formInline) {
        if (
          itemA.startsWith("itemBC") &&
          itemA != "itemBC1List" &&
          itemA != "itemBC3List"
        ) {
          this.formInline[itemA] = null;
        }
      }
      this.formInline.itemBC1List = [];
      this.formInline.itemBC3List = [];
    },
    cancel() {
      if (this.$route.query.resource == 0) {
        this.$router.push("/home/uncompletedEventList");
      } else if (this.$route.query.resource == 1) {
        this.$router.push("/event/eventList5");
      }
    },
    // 查看癌症信息
    queryreportbyid() {
      $axios_http({
        url: "/base/hospital/deathCertificate/query",
        data: { id: this.$route.query.id },
        vueObj: this
      }).then(res => {
        if (res.data.statusMsg === "success") {
          this.formInline = res.data.data;
          this.fileList = res.data.data.fileList || [];
          this.fileList.filter(item => {
            item.name = item.fileNickname;
            item.url =
              SERVER_NAME + "/base/dnafile/downFile?filePath=" + item.filePath;
          });
        }
      });
    },
    clearItemA4() {
      if (this.formInline.itemA3 == 2) {
        this.formInline.itemA4 = null;
      }
    },
    // 跟文件上传相关
    handleUpload(file) {
      const size = file.size / 1024 /1024 < 200;
      if (!size) {
        $failMsg(this, "上传文件大小不能超过200M");
        return false;
      }
      loading = this.$loading({
        lock: true,
        text: "拼命上传中...",
        spinner: "el-icon-loading",
        background: "rgba(255, 255, 255, 0.5)"
      });
    },
    uploadFileHandle(file) {
      this.formParamsTable.append("files", file.file);
    },
    handleChangeFile() {
      this.formParamsTable = new FormData();
      // this.$refs.uploadFile.submit();
      // 后端接受参数 ，可以接受多个参数
      let config = {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      axios
        .post(
          SERVER_NAME + "/zuul/base/hospital/deathCertificateList/fileUpload",
          this.formParamsTable,
          config
        )
        .then(res => {
          loading.close();
          if (res.data.statusCode == "000000") {
            let result = res.data.data;
            result.filter(item => {
              item.name = item.fileNickname;
              item.url =
                SERVER_NAME +
                "/base/dnafile/downFile?filePath=" +
                item.filePath;
            });
            this.fileList = [...this.fileList, ...result];
            // 查询数量
            this.$refs.uploadFile.clearFiles();
          } else {
            $failMsg(this, res.data.statusMsg);
          }
        })
        .catch(res => {
          loading.close();
        });
    },
    // 下载图片
    downloadIamge(filePath, name) {
      var image = new Image();
      // 解决跨域 Canvas 污染问题
      image.setAttribute("crossOrigin", "anonymous");
      image.onload = function() {
        var canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;

        var context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        var url = canvas.toDataURL("image/png");
        // 生成一个a元素
        var a = document.createElement("a");
        // 创建一个单击事件
        var event = new MouseEvent("click");
        // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
        a.download = name || "下载图片名称";
        // 将生成的URL设置为a.href属性
        a.href = url;
        // 触发a的单击事件
        a.dispatchEvent(event);
      };
      image.src = filePath;
    },
    handlePreview(file) {
      if (file.fileSuffix == "png") {
        this.downloadIamge(
          SERVER_NAME + "/base/dnafile/downFile?filePath=" + file.filePath,
          file.name
        );
      }
      window.open(file.url);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleRemove(file, fileList) {
      this.fileList = fileList;
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.fl {
  float: left;
}

.fr {
  float: right;
}

.text-right {
  text-align: right;
  margin-top: -20px;
  min-height: 20px;
}

.text-center {
  text-align: center;
}

.j_content {
  padding: 10px;
  height: 100%;
  overflow: auto;
}

.btns {
  padding: 20px;
}

.btns .text {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  line-height: 1.5;
  margin: 0;
  padding: 0;
}

.formcon {
  margin: 0px 20px 20px;
  border: 1px solid rgb(204, 204, 204);
}

.formcon .title {
  font-size: 16px;
  text-align: center;
  line-height: 2;
  background: rgb(204, 204, 204);
  color: #000000;
  .el-button {
    margin-top: 1px;
    margin-right: 5px;
  }
}

.tables {
  margin: 40px 50px 30px 50px;
}
.cancerTable {
  margin-top: 10px;
  td {
    border-top: 0;
    padding: 5px 10px;
    border: 1px solid #e0dcdc;
    text-align: center;
    vertical-align: middle;
    .el-input {
      width: 50px;
      text-align: center;
    }
  }
  th {
    padding: 10px;
    background: #cccccc;
    border: 1px solid #e0dcdc;
    text-align: center;
    vertical-align: middle;
  }
  th:last-child {
    width: 400px;
  }
  .noborder {
    border: 0;
  }
}

.formoneline {
  width: 100%;
  margin-right: 0 !important;
}
.formoneline .el-form-item__label {
  text-align: right;
}
.el-date-editor.el-input {
  width: 202px;
}
.requiredLabel {
  color: #f56c6c;
}
.tables .el-checkbox-group {
  padding-left: 40px;
  height: auto;
}
.pTitle {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  font-weight: bold;
}
.tables .el-checkbox-group {
  padding-left: 40px;
  height: auto;
}
.j_content {
  overflow-x: hidden;
}
.requiredLabel {
  color: #f56c6c;
}
</style>
<style>
.fileListLook .el-upload-list__item .el-upload-list__item-status-label,
.fileListLook .el-upload-list__item .el-icon-close-tip,
.fileListLook .el-upload-list__item .el-icon-close {
  display: none !important;
}
.j_content .el-radio__input.is-disabled.is-checked + span.el-radio__label {
  color: #409eff;
}
.j_content .el-radio__input.is-disabled.is-checked .el-radio__inner {
  background-color: #409eff;
  border-color: #409eff;
}
.j_content .el-radio__input.is-disabled.is-checked .el-radio__inner::after {
  background-color: #f5f7fa;
}
.j_content .el-input.is-disabled .el-input__inner {
  background-color: #fff;
  border-color: #dcdfe6;
  color: #606266;
  cursor: not-allowed;
}
.j_content .el-textarea.is-disabled .el-textarea__inner {
  background-color: #fff;
  border-color: #dcdfe6;
  color: #606266;
  cursor: not-allowed;
}
.j_content
  .el-checkbox__input.is-disabled.is-checked
  + span.el-checkbox__label {
  color: #409eff;
  cursor: not-allowed;
}
.j_content .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
  background-color: #409eff;
  border-color: #409eff;
}
.j_content
  .el-checkbox__input.is-disabled.is-checked
  .el-checkbox__inner::after {
  border-color: #fff;
}
</style>

