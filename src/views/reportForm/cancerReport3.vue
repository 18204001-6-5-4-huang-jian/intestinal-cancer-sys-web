<template>
  <div class="j_content" v-if="cancerReport3_page">
    <div style="min-width: 941px;">
      <div class="btns">
        <el-button type="normal" size="small" class="fl" @click="goBack()">返回</el-button>
        <p class="text">表C3-结直肠癌诊断信息摘录表</p>
      </div>
      <el-form :inline="true" :model="formInline" label-width="115px" :rules="rules" ref="formInline">
      <div class="formcon">
        <div class="title">
          管理部分
        </div>
        <div class="tables">
            <el-row>
              <el-col :span="12">
                <el-form-item label="摘录目的:" class="formoneline" prop="excerptPurpose">
                 <el-radio-group v-model="formInline.excerptPurpose" :disabled="$route.query.flag==0">
                    <el-radio :label="1">初次摘录</el-radio>
                    <el-radio :label="2">为质量保证（QA）再次摘录</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                 <el-checkbox v-model="formInline.cfScreening" :disabled="$route.query.flag==0">若筛查对象曾填写过另一份该表，请勾选此项</el-checkbox>
              </el-col>
              
            </el-row>
            <el-row>
              <el-col :span="8">
                 <el-form-item label="sid:" class="formoneline">
                   {{$route.query.sid}}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                  <el-form-item label="摘录日期:" class="formoneline" prop="excerptsDateToString">
                    <el-date-picker 
                                :clearable="false"
                                :disabled="$route.query.flag==0"
                                v-model="formInline.excerptsDateToString"
                                type="date"
                                format="yyyy年MM月dd日"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期"
                                :picker-options="pickerOptions1">
                    </el-date-picker>
                  </el-form-item>
              </el-col>
              <el-col :span="8">
                 <el-form-item label="工作人员编码:" class="formoneline" prop="investigatorCode">
                   <el-input type="text" v-model.trim="formInline.investigatorCode" maxlength="18" :disabled="$route.query.flag==0"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                 <el-form-item label="姓名:" class="formoneline">
                   {{base.name}}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                  <el-form-item label="摘录员ID:" class="formoneline" prop="excerptPersonId">
                    <el-input type="text" v-model.trim="formInline.excerptPersonId" maxlength="18" :disabled="$route.query.flag==0"></el-input>
                  </el-form-item>
                </el-col>
              <el-col :span="8">
                 <el-form-item label="填表人:" class="formoneline" prop="tbTablePerson">
                   <el-input type="text" v-model.trim="formInline.tbTablePerson" maxlength="18" :disabled="$route.query.flag==0"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                 <el-form-item label="性别:" class="formoneline">
                   {{base.sex | reverseSex}}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                  <el-form-item label="筛查现场ID:" class="formoneline">
                    {{base.siteId | siteId}}
                  </el-form-item>
                </el-col>
              <el-col :span="8">
                 <el-form-item label="质控者:" class="formoneline" prop="qualityControlPerson">
                   <el-input type="text" v-model.trim="formInline.qualityControlPerson" maxlength="18" :disabled="$route.query.flag==0"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
                <el-col :offset='8'>
                  <el-form-item label="研究年份:" class="formoneline" prop="researchYear">
                    <el-date-picker
                    :clearable="false"
                    :disabled="$route.query.flag==0"
                      v-model="formInline.researchYear"
                      type="year"
                      format="yyyy年"
                      value-format="yyyy"
                      placeholder="选择年"
                      :picker-options="pickerOptions2">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
        </div>
      </div>
      <div class="formcon">
        <div class="title">
          A部分：诊断评估和分期
        </div>
        <div class="tables tablesPartTwo">
            <el-row>
              <p class="pTitle"><span class="requiredLabel">*</span>&nbsp;1. 受试者是否进入了诊断流程？</p>
              <el-form-item label="" class="formoneline" prop="item1">
                <el-radio-group v-model="formInline.item1" :disabled="$route.query.flag==0">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否，医生报告</el-radio>
                  <el-radio :label="3">否，受试者自己报告</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <p class="pTitle"><span class="requiredLabel">*</span>&nbsp;2. 初次就诊原因（可多选）</p>
              <el-form-item label="" style="float:left" prop="checkList2">
                <el-checkbox-group v-model="formInline.checkList2">
                  <el-checkbox label="item21" :disabled="$route.query.flag==0">出现症状</el-checkbox>
                  <el-checkbox label="item22" :disabled="$route.query.flag==0">本研究筛查阳性的随访</el-checkbox>
                  <el-checkbox label="item23" :disabled="$route.query.flag==0">其他，请说明：</el-checkbox>
                </el-checkbox-group>
                <!-- <div class="el-checkbox-group">
                  <el-checkbox v-model="formInline.item21" :label="1" :disabled="$route.query.flag==0">出现症状</el-checkbox>
                  <el-checkbox v-model="formInline.item22" :label="1" :disabled="$route.query.flag==0">本研究筛查阳性的随访</el-checkbox>
                  <el-checkbox v-model="formInline.item23" :label="1" :disabled="$route.query.flag==0">其他，请说明：</el-checkbox>
                </div> -->
                </el-form-item>
                <el-form-item label="" prop="item23Other"  style="width:150px;float:left"  v-if="formInline.checkList2.indexOf('item23')>-1">
                  <el-input v-model.trim="formInline.item23Other"  size="small" maxlength="50" :disabled="$route.query.flag==0"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
              <p class="pTitle"><span class="requiredLabel">*</span>&nbsp;3. 全肠镜检查（不用记录全肠镜检查结果）</p>
              <table class="j_table cancerTable table01">
                <tr>
                  <th width="180px">检查日期</th>
                  <th width="180px">是否到达回肠</th>
                  <th width="180px">肠道准备</th>
                  <th width="180px">增生性息肉</th>
                </tr>
                <tr>
                  <td>
                    <el-form-item label="" prop="item3CheckDateToString">
                    <el-date-picker 
                                :clearable="false"
                                :disabled="$route.query.flag==0"
                                v-model="formInline.item3CheckDateToString"
                                type="date"
                                format="yyyy年MM月dd日"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期"
                                :picker-options="pickerOptions1">
                    </el-date-picker>
                    </el-form-item>
                  </td>
                  <td>
                    <el-form-item label="" class="formoneline" prop="item31">
                      <el-radio-group v-model="formInline.item31" :disabled="$route.query.flag==0">
                        <el-radio :label="1">否</el-radio>
                        <el-radio :label="2">是</el-radio>
                        <el-radio :label="3">不详</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </td>
                  <td>
                    <el-form-item label="" class="formoneline" prop="item32">
                      <el-radio-group v-model="formInline.item32" :disabled="$route.query.flag==0">
                        <el-radio :label="1">充分</el-radio>
                        <el-radio :label="2">不充分</el-radio>
                        <el-radio :label="3">不详</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </td>
                  <td>
                     <el-form-item label="" class="formoneline" prop="item33">
                      <el-radio-group v-model="formInline.item33" :disabled="$route.query.flag==0">
                        <el-radio :label="1">无</el-radio>
                        <el-radio :label="2">1枚</el-radio>
                        <el-radio :label="3">多枚</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </td>
                </tr>
              </table>
            </el-row>
            <el-row>
              <p class="pTitle">
                &nbsp;4. 全肠镜检查腺瘤评估
                <el-button size="mini" type="danger" @click="clearNumFour" :disabled="$route.query.flag==0">清空</el-button>
              </p>
              <table class="j_table cancerTable table01 table02">
                <tr>
                  <th width="180px">部位</th>
                  <th width="180px">距离肛缘</th>
                  <th width="180px">大小</th>
                  <th width="180px">组织学类型</th>
                  <th width="180px">上皮内瘤变</th>
                  <th width="180px">高危腺瘤</th>
                </tr>
                <tr>
                  <td>
                    <el-form-item label="" class="formoneline" prop="item41">
                      <el-radio-group v-model="formInline.item41" :disabled="$route.query.flag==0">
                        <el-radio :label="1">回肠</el-radio>
                        <el-radio :label="2">升结肠</el-radio>
                        <el-radio :label="3">结肠肝曲</el-radio>
                        <el-radio :label="4">横结肠</el-radio>
                        <el-radio :label="5">结肠脾曲</el-radio>
                        <el-radio :label="6">降结肠</el-radio>
                        <el-radio :label="7">乙状结肠</el-radio>
                        <el-radio :label="8">直肠</el-radio>
                        <el-radio :label="9">阑尾</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </td>
                  <td>
                    <el-form-item label="" class="formoneline" :prop="formInline.item421?'':'item422'">
                      <el-input v-model.trim="formInline.item422" @change="item422Change"   size="small"  style="width:150px;" :disabled="$route.query.flag==0"><template slot="append"  size="small" >cm</template></el-input>
                    </el-form-item>
                    <el-form-item label="" class="formoneline" :prop="formInline.item422?'':'item421'">
                      <el-radio v-model="formInline.item421" @change="item421Change"  :label="1" :disabled="$route.query.flag==0">不详</el-radio>
                    </el-form-item>
                  </td>
                  <td>
                    <el-form-item label="最大直径：" class="formoneline" :prop="formInline.item431?'':'item432'">
                      <el-input v-model.trim="formInline.item432" @change="item432Change"   size="small" style="width:150px;" :disabled="$route.query.flag==0"><template slot="append"  size="small" >cm</template></el-input>
                    </el-form-item>
                    <el-form-item label="" class="formoneline" :prop="formInline.item432?'':'item431'">
                      <el-radio v-model="formInline.item431" @change="item431Change"  :label="1" :disabled="$route.query.flag==0">不详</el-radio>
                    </el-form-item>
                  </td>
                  <td>
                    <el-form-item label="" class="formoneline" prop="item44">
                      <el-radio-group v-model="formInline.item44" :disabled="$route.query.flag==0">
                        <el-radio :label="1">管状腺瘤</el-radio>
                        <el-radio :label="2">管状绒毛腺瘤</el-radio>
                        <el-radio :label="3">绒毛状腺瘤</el-radio>
                        <el-radio :label="4">腺瘤(不详)</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </td>
                  <td>
                     <el-form-item label="" class="formoneline" prop="item45">
                      <el-radio-group v-model="formInline.item45" :disabled="$route.query.flag==0">
                        <el-radio :label="1">否</el-radio>
                        <el-radio :label="2">低级别上皮内瘤变</el-radio>
                        <el-radio :label="3">高级别上皮内瘤变</el-radio>
                        <el-radio :label="4">不详</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </td>
                  <td>
                     <el-form-item label="数目：" class="formoneline" prop="item46">
                      <el-input v-model.trim="formInline.item46"  size="small"  style="width:100px;" :disabled="$route.query.flag==0"></el-input>
                    </el-form-item>
                    <div class="tableTips">定义: (必须满足以下至少一项才能定义为高危腺瘤:<br/>①≥1cm;<br/>②绒毛状腺瘤;<br/>③高级别上皮内瘤变)</div>
                  </td>
                </tr>
              </table>
            </el-row>
            <el-row>
              <p class="pTitle">5. 诊断评估（不用记录检查结果，如为CEA，请记录数值）</p>
              <table class="j_table cancerTable">
                    <tr class="title" style="display:block">
                      <th width="100" rowspan="2">流程</th>
                      <th width="191" rowspan="2">检查日期</th>
                      <th width="280" rowspan="2">诊断方法&nbsp;&nbsp;
                        <el-popover
                          placement="top"
                          width="750"
                          trigger="click">
                            <!-- 提示信息 -->
                            <table class="tableNumTips">
                              <tr>
                                <th colspan="3" style="text-align:center;"><h2>诊断方法代码</h2></th>
                              </tr>
                              <tr>
                                <td>
                                  <p class="txsm">01=腹部平片</p>
                                  <p class="txsm">02=钡剂灌肠造影检查</p>
                                  <p class="txsm">03=活检（请详细标明）</p>
                                  <p class="txsm">04=胸片</p>
                                  <p class="txsm">05=临床评估</p>
                                  <p class="txsm">06=腹部（或肝脏）CT</p>
                                  <p class="txsm">07=其他部位CT（请详细标明）</p>
                                  <p class="txsm">08=盆CT</p>
                                  <p class="txsm">09=膀胱镜</p>
                                  <p class="txsm">10=直肠指诊</p>
                                </td>
                                <td>
                                  <p class="txsm">11=静脉肾盂造影或排泄性尿道造影</p>
                                  <p class="txsm">12=腹部（或肝脏）MRI</p>
                                  <p class="txsm">13=其他部位MRI（请详细标明）</p>
                                  <p class="txsm">14=盆MRI</p>
                                  <p class="txsm">15=术前CEA（请记录数值）</p>
                                  <p class="txsm">16=便潜血</p>
                                  <p class="txsm">17=记录</p>
                                  <p class="txsm">18=切除（请详细标明）</p>
                                  <p class="txsm">19=腹部超声</p>
                                  <p class="txsm">20=腹、盆CT</p>
                                </td>
                                <td>
                                  <p class="txsm">21=结肠部分切除术胸MRI</p>
                                  <p class="txsm">22=腹腔镜检查</p>
                                  <p class="txsm">23=剖腹检查</p>
                                  <p class="txsm">24=淋巴结活检术</p>
                                  <p class="txsm">25=其他部位X线检查（请详细标明）</p>
                                  <p class="txsm">26=超声检查（请详细标明）</p>
                                  <p class="txsm">27=上消化道评估―内镜或上消化道造影</p>
                                  <p class="txsm">88=其他检查（请详细标明）</p>
                                </td>
                              </tr>
                            </table>
                          <el-button slot="reference" type="text">诊断方法代码</el-button>
                        </el-popover>
                      </th>
                      
                      <th width="100" rowspan="2">操作</th>
                    </tr>
                    <div v-for="(x,index) in formInline.hospitalInformationDiagnoseEvaluationVos" :key="index">
                      <el-form :inline="true" :model="x" class="demo-form-inline" :ref="'formInlinelist'+index" style="display:table-row-group;" :rules="formInlinelist">
                        <tr>
                          <td style="text-align:center;width:100px;">{{index+1}}</td>
                          <td width="180">
                              <el-form-item label="" prop="checkDateToString">
                                <el-date-picker 
                                  width="150px"
                                  :clearable="false"
                                  :disabled="$route.query.flag==0"
                                  v-model="x.checkDateToString"
                                  size="small"
                                  type="date"
                                  format="yyyy年MM月dd日"
                                  value-format="yyyy-MM-dd"
                                  placeholder="选择日期"
                                  :picker-options="pickerOptions1">
                                </el-date-picker>
                              </el-form-item>
                            </td>
                            <td style="text-align:left;width:280px;">
                              <el-form-item label=" " prop="diagnosticMethods">
                                <el-input v-model.trim="x.diagnosticMethods"  size="small" style="width:50px;" :disabled="$route.query.flag==0"></el-input>
                              </el-form-item>
                              <el-form-item label=" " prop="diagnosticMethodsOther" v-if="x.diagnosticMethods=='03' || x.diagnosticMethods=='07' || x.diagnosticMethods=='13' || x.diagnosticMethods=='15' || x.diagnosticMethods=='18' || x.diagnosticMethods=='25'  || x.diagnosticMethods=='26' || x.diagnosticMethods=='88'">
                                <el-input v-model.trim="x.diagnosticMethodsOther"  size="small"  style="width:150px;" maxlength="50" :disabled="$route.query.flag==0"></el-input>
                              </el-form-item>
                            </td>
                            <td width="100">
                              <el-button type="text" size="small" @click="del(index)" v-if="delBtnShow && $route.query.flag!=0">删除</el-button>
                            </td>
                        </tr>
                      </el-form>
                    </div>
                  </table>
                  <div v-if="$route.query.flag!=0">
                    <el-button type="primary"  size="small" class="addBtn" @click="add"><i class="el-icon-plus"></i>添加记录</el-button>
                  </div>
            </el-row>
            <el-row>
              <p class="pTitle"><span class="requiredLabel">*</span>&nbsp;6. 是否有因诊断和分期进行的检查而导致的并发症？</p>
              <el-form-item label="" class="formoneline" prop="item61">
                <el-radio-group v-model="formInline.item61" :disabled="$route.query.flag==0">
                  <el-radio :label="1">否</el-radio>
                  <el-radio :label="2">是</el-radio>
                  <el-radio :label="3">不详</el-radio>
                </el-radio-group>
              </el-form-item>
              <table class="j_table cancerTable" v-if="formInline.item61==2">
                    <tr class="title" style="display:block;">
                      <th width="191" rowspan="2">并发症发生日期</th>
                      <th width="280" rowspan="2">医疗并发症&nbsp;&nbsp;
                        <el-popover
                          placement="top"
                          width="550"
                          trigger="click">
                            <!-- 提示信息 -->
                            <table class="tableNumTips">
                              <tr>
                                <th colspan="3" style="text-align:center;"><h2>并发症代码</h2></th>
                              </tr>
                              <tr>
                                <td>
                                  <p class="txsm">1=感染（请详细标明）</p>
                                  <p class="txsm">2=发热（需要抗生素治疗）</p>
                                  <p class="txsm">3=穿孔</p>
                                  <p class="txsm">4=出血</p>
                                  <p class="txsm">6=呼吸骤停</p>
                                  <p class="txsm">20=心脏骤停</p>
                                  <p class="txsm">22=住院治疗</p>
                                  <p class="txsm">23=肺栓塞</p>
                                </td>
                                <td>
                                  <p class="txsm">24=心肌梗死</p>
                                  <p class="txsm">25=心律失常</p>
                                  <p class="txsm">26=脑血管意外（CAV）/卒中</p>
                                  <p class="txsm">27=失血（需要输血）</p>
                                  <p class="txsm">28=深静脉血栓</p>
                                  <p class="txsm">30=低血压</p>
                                  <p class="txsm">31=充血性心力衰竭（CHF）</p>
                                  <p class="txsm">32=伤口裂开</p>
                                </td>
                                <td>
                                  <p class="txsm">33=低钾血症</p>
                                  <p class="txsm">300=腹泻</p>
                                  <p class="txsm">301=小肠梗阻</p>
                                  <p class="txsm">302=肠梗阻</p>
                                  <p class="txsm">306=直肠损伤</p>
                                  <p class="txsm">307=便血</p>
                                </td>
                              </tr>
                            </table>
                          <el-button slot="reference" type="text">并发症代码</el-button>
                        </el-popover>
                      </th>
                      
                      <th width="100" rowspan="2">操作</th>
                    </tr>
                    <div v-for="(x,index) in formInline.hospitalCancerInformationComplicationsVos">
                      <el-form :inline="true" :model="x" class="demo-form-inline" :ref="'formInlinelistFirst'+index" style="display:table-row-group;" :rules="formInlinelistFirst">
                        <tr>
                          <td width="180">
                              <el-form-item label="" prop="complicationsDateToString">
                                <el-date-picker 
                                  width="150px"
                                  :clearable="false"
                                  :disabled="$route.query.flag==0"
                                  v-model="x.complicationsDateToString"
                                  size="small"
                                  type="date"
                                  format="yyyy年MM月dd日"
                                  value-format="yyyy-MM-dd"
                                  placeholder="选择日期"
                                  :picker-options="pickerOptions1">
                                </el-date-picker>
                              </el-form-item>
                            </td>
                            <td style="text-align:left;width:280px;">
                              <el-form-item label=" " prop="complicationsCode">
                                <el-input v-model.trim="x.complicationsCode"  size="small" style="width:60px;" :disabled="$route.query.flag==0"></el-input>
                              </el-form-item>
                              <el-form-item label=" " prop="complicationsCodeOther" v-if="x.complicationsCode==1">
                                <el-input v-model.trim="x.complicationsCodeOther"  size="small"  style="width:150px;" maxlength="50" :disabled="$route.query.flag==0"></el-input>
                              </el-form-item>
                            </td>
                            <td width="100">
                              <el-button type="text" size="small" @click="del02(index)" v-if="delBtnShow02 && $route.query.flag!=0">删除</el-button>
                            </td>
                        </tr>
                      </el-form>
                    </div>
                  </table>
                  <div  v-if="formInline.item61==2 && $route.query.flag!=0">
                    <el-button type="primary"  size="small" class="addBtn" @click="add02"><i class="el-icon-plus"></i>添加记录</el-button>
                  </div>
            </el-row>
            <el-row class="rowBlock">
              <p class="pTitle"><span class="requiredLabel">*</span>&nbsp;7. 结直肠癌诊断评估结果:</p>
              <el-form-item label="" class="formoneline" prop="item71">
                <el-radio-group v-model="formInline.item71" @change="changeRadioItem71" :disabled="$route.query.flag==0">
                  <el-radio :label="1">非恶性，经组织学或细胞学证实</el-radio>
                  <el-radio :label="2">非恶性，仅通过临床评估判断，无病理依据</el-radio>
                  <el-radio :label="3">原发性结直肠恶性肿瘤，通过组织学证实</el-radio>
                  <el-radio :label="4">其他恶性肿瘤，通过组织学或细胞学证实</el-radio>
                  <el-radio :label="5">原发性结直肠恶性肿瘤，通过细胞学证实</el-radio>
                  <el-radio :label="6">未获得信息</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
        </div>
      </div>
      <div class="formcon" v-if="formInline.item71==4 || formInline.item71==6 || formInline.item71==null">
        <div class="title">
          B部分：结直肠癌外的其余诊断信息
        </div>
        <div class="tables tablesPartTwo">
            <el-row>
              <el-form-item label="8a. 非肿瘤诊断:" class="formoneline" :prop="formInline.item71!=6?'item8a1':''"  label-width="140px">
                 <el-radio-group v-model="formInline.item8a1" :disabled="$route.query.flag==0"> 
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="ICD-10分类:" class="formoneline" :prop="formInline.item71!=6?'item8a2':''" v-if="formInline.item8a1==1">
                <el-input v-model.trim="formInline.item8a2"  size="small" maxlength="18" :disabled="$route.query.flag==0"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col :span="8" >
                 <el-form-item label="8b. 诊断日期:" class="formoneline" :prop="formInline.item71!=6?'item8b1ToString':''"  v-if="formInline.item8a1==1"  label-width="118px">
                  <el-date-picker 
                    width="150px"
                    :clearable="false"
                    :disabled="$route.query.flag==0"
                    v-model="formInline.item8b1ToString"
                    size="small"
                    type="date"
                    format="yyyy年MM月dd日"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    :picker-options="pickerOptions1">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="疾病分类员/摘录员 ID:" class="formoneline" :prop="formInline.item71!=6?'item8b2':''" label-width="180px">
                  <el-input v-model.trim="formInline.item8b2"  size="small" maxlength="18" :disabled="$route.query.flag==0"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
             <el-row>
              <el-form-item label="8c. 肿瘤诊断，其他部位（非原发性侵润性大肠癌）" class="formoneline" :prop="formInline.item71!=6?'item8c1':''" label-width="355px">
                 <el-radio-group v-model="formInline.item8c1" :disabled="$route.query.flag==0">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
             <el-row v-if="formInline.item8c1==1">
              <table class="tableRow">
               <tr>
                 <td>ICD-O-3 肿瘤分类:C:</td>
                 <td><el-form-item label="" :prop="formInline.item71!=6?'item8c12':''"><el-input type="text" v-model.trim="formInline.item8c12" maxlength="11" :disabled="$route.query.flag==0"></el-input></el-form-item></td>
                 <td><el-form-item label="" :prop="formInline.item71!=6?'item8c13':''"><el-input type="text" v-model.trim="formInline.item8c13" maxlength="11" :disabled="$route.query.flag==0"></el-input></el-form-item></td>
                 <td><el-form-item label="" :prop="formInline.item71!=6?'item8c14':''"><el-input type="text" v-model.trim="formInline.item8c14" maxlength="11" :disabled="$route.query.flag==0"></el-input></el-form-item></td>
                 <td><el-form-item label="" :prop="formInline.item71!=6?'item8c15':''"><el-input type="text" v-model.trim="formInline.item8c15" maxlength="11" :disabled="$route.query.flag==0"></el-input></el-form-item></td>
               </tr>
               <tr class="tipsRow">
                 <td></td>
                 <td>部位</td>
                 <td>形态学</td>
                 <td>行为学</td>
                 <td>分级</td>
               </tr>
             </table>
            </el-row>
            <el-row>
              <el-col :span="8" v-if="formInline.item8c1==1">
                <el-form-item label="8d. 诊断日期:" class="formoneline" :prop="formInline.item71!=6?'item8d11ToString':''"  label-width="118px">
                  <el-date-picker 
                    width="150px"
                    :clearable="false"
                    :disabled="$route.query.flag==0"
                    v-model="formInline.item8d11ToString"
                    size="small"
                    type="date"
                    format="yyyy年MM月dd日"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    :picker-options="pickerOptions1">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="肿瘤登记员（CTR）ID:" class="formoneline" :prop="formInline.item71!=6?'item8d12':''" label-width="180px">
                   <el-input v-model.trim="formInline.item8d12"  size="small" maxlength="18" :disabled="$route.query.flag==0"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
             <el-row>
              <el-form-item label="8e. 肿瘤是否转移到大肠？" class="formoneline" :prop="formInline.item71!=6?'item8e11':''" label-width="200px">
                 <el-radio-group v-model="formInline.item8e11" :disabled="$route.query.flag==0">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
        </div>
      </div>
       <div class="formcon" v-if="formInline.item71!=1 && formInline.item71!=4">
        <div class="title">
          C部分：原发性结直肠癌诊断信息
        </div>
        <div class="tables">
            <el-row>
              <el-form-item label="9. 原发性结直肠癌诊断日期:" class="formoneline" :prop="formInline.item71!=6?'item9ToString':''" label-width="200px">
                   <el-date-picker 
                    width="150px"
                    :clearable="false"
                    :disabled="$route.query.flag==0"
                    v-model="formInline.item9ToString"
                    size="small"
                    type="date"
                    format="yyyy年MM月dd日"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    :picker-options="pickerOptions1">
                  </el-date-picker>
                </el-form-item>
            </el-row>
            <el-row class="rowBlock">
              <p class="pTitle"><span class="requiredLabel" v-if="formInline.item71!=6">*&nbsp;</span>10.确诊原发性结直肠癌诊断报告的复印件:</p>
              <el-form-item label="" class="formoneline" :prop="formInline.item71!=6?'item10':''">
                  <el-radio-group v-model="formInline.item10" :disabled="$route.query.flag==0">
                    <el-radio :label="1">无报告/临床检查</el-radio>
                    <el-radio :label="2">组织学/组织病理学（附带复印件）</el-radio>
                    <el-radio :label="3">细胞学/细胞病理学（附带复印件）</el-radio>
                    <el-radio :label="4">有报告但无法获得</el-radio>
                  </el-radio-group>
                </el-form-item>
                <!-- 多文件上传 -->
                <uploadMultipleFileSubmit :reportUrls="formInline.reportUrls" @getUrl='getUrl' @getUrl2='getUrl2' v-if="reportUrlsFlag"></uploadMultipleFileSubmit> 
                <uploadMultipleFileSubmitBtn @getUrl='getUrl' @getUrl2='getUrl2' v-if="!reportUrlsFlag"></uploadMultipleFileSubmitBtn>
            </el-row>
            <el-row>
              <p class="pTitle"><span class="requiredLabel" v-if="formInline.item71!=6">*&nbsp;</span>11. 逐字描述病历中原发性结直肠癌的诊断:</p>
              <el-form-item label="" class="formoneline" :prop="formInline.item71!=6?'item11':''">
                   <el-input type="textarea" v-model="formInline.item11" style="width:600px;" maxlength="1000" :disabled="$route.query.flag==0"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
              <p class="pTitle">12.ICD-O-3 肿瘤分类：（由CTR或有CTR资质的人员填写）:</p>
              <el-form-item label="CTR ID：" class="formoneline" :prop="formInline.item71!=6?'item121':''">
                   <el-input type="text" v-model="formInline.item121" maxlength="18" :disabled="$route.query.flag==0"></el-input>
                </el-form-item>
                <table class="tableRow">
                  <tr>
                    <td>C:</td>
                    <td><el-form-item label="" :prop="formInline.item71!=6?'item122':''"><el-input type="text" v-model.trim="formInline.item122" :disabled="$route.query.flag==0" maxlength="11"></el-input></el-form-item></td>
                    <td><el-form-item label="" :prop="formInline.item71!=6?'item123':''"><el-input type="text" v-model.trim="formInline.item123" :disabled="$route.query.flag==0" maxlength="11"></el-input></el-form-item></td>
                    <td><el-form-item label="" :prop="formInline.item71!=6?'item124':''"><el-input type="text" v-model.trim="formInline.item124" :disabled="$route.query.flag==0" maxlength="11"></el-input></el-form-item></td>
                    <td><el-form-item label="" :prop="formInline.item71!=6?'item125':''"><el-input type="text" v-model.trim="formInline.item125" :disabled="$route.query.flag==0" maxlength="11"></el-input></el-form-item></td>
                  </tr>
                  <tr class="tipsRow">
                    <td></td>
                    <td>部位</td>
                    <td>形态学</td>
                    <td>行为学</td>
                    <td>分级</td>
                  </tr>
                </table>
            </el-row>
            <el-row>
              <p class="pTitle"><span class="requiredLabel" v-if="formInline.item71!=6">*&nbsp;</span>13.原发肿瘤位置（可多选）:</p>
              <el-form-item label="" class="formoneline" :prop="formInline.item71!=6?'checkList13':''">
                 <el-checkbox-group v-model="formInline.checkList13">
                  <el-checkbox label="item131" :disabled="$route.query.flag==0">回肠</el-checkbox>
                  <el-checkbox label="item132" :disabled="$route.query.flag==0">升结肠</el-checkbox>
                  <el-checkbox label="item133" :disabled="$route.query.flag==0">结肠肝曲</el-checkbox>
                  <el-checkbox label="item134" :disabled="$route.query.flag==0">横结肠</el-checkbox>
                  <el-checkbox label="item135" :disabled="$route.query.flag==0">结肠脾曲</el-checkbox>
                  <el-checkbox label="item136" :disabled="$route.query.flag==0">降结肠</el-checkbox>
                  <el-checkbox label="item137" :disabled="$route.query.flag==0">乙状结肠</el-checkbox>
                  <el-checkbox label="item138" :disabled="$route.query.flag==0">直肠</el-checkbox>
                  <el-checkbox label="item139" :disabled="$route.query.flag==0">阑尾</el-checkbox>
                  <el-checkbox label="item1310" :disabled="$route.query.flag==0">不详</el-checkbox>
                </el-checkbox-group>
                <!-- <div class="el-checkbox-group" style="float:left">
                  <el-checkbox v-model="formInline.item131" :disabled="$route.query.flag==0">回肠</el-checkbox>
                  <el-checkbox v-model="formInline.item132" :disabled="$route.query.flag==0">升结肠</el-checkbox>
                  <el-checkbox v-model="formInline.item133" :disabled="$route.query.flag==0">结肠肝曲</el-checkbox>
                  <el-checkbox v-model="formInline.item134" :disabled="$route.query.flag==0">横结肠</el-checkbox>
                  <el-checkbox v-model="formInline.item135" :disabled="$route.query.flag==0">结肠脾曲</el-checkbox>
                  <el-checkbox v-model="formInline.item136" :disabled="$route.query.flag==0">降结肠</el-checkbox>
                  <el-checkbox v-model="formInline.item137" :disabled="$route.query.flag==0">乙状结肠</el-checkbox>
                  <el-checkbox v-model="formInline.item138" :disabled="$route.query.flag==0">直肠</el-checkbox>
                  <el-checkbox v-model="formInline.item139" :disabled="$route.query.flag==0">阑尾</el-checkbox>
                  <el-checkbox v-model="formInline.item1310" :disabled="$route.query.flag==0">不详</el-checkbox>
                </div> -->
              </el-form-item>
              <el-form-item label="距离肛缘:" class="formoneline" :prop="formInline.item71!=6?'item1311':''">
                <el-input v-model.trim="formInline.item1311"  size="small"  style="width:150px;" :disabled="$route.query.flag==0"><template slot="append"  size="small" >cm</template></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <p class="pTitle"><span class="requiredLabel" v-if="formInline.item71!=6">*&nbsp;</span>14. 原发性结直肠癌的病理类型：（由CTR资质或相当人员填写）</p>
              <el-form-item label="" class="formoneline" :prop="formInline.item71!=6?'checkList14':''">
                 <el-checkbox-group v-model="formInline.checkList14" class="Hheight">
                  <el-checkbox label="item141" :disabled="$route.query.flag==0">腺癌</el-checkbox>
                  <el-checkbox label="item146" :disabled="$route.query.flag==0">粘液腺癌</el-checkbox>
                  <el-checkbox label="item142" :disabled="$route.query.flag==0">印戒细胞癌</el-checkbox>
                  <el-checkbox label="item147" :disabled="$route.query.flag==0">鳞状细胞癌</el-checkbox>
                  <el-checkbox label="item143" :disabled="$route.query.flag==0">腺鳞癌</el-checkbox>
                  <el-checkbox label="item148" :disabled="$route.query.flag==0">未分化癌</el-checkbox>
                  <el-checkbox label="item144" :disabled="$route.query.flag==0">癌</el-checkbox>
                  <el-checkbox label="item149" :disabled="$route.query.flag==0">其他（请详细说明）</el-checkbox>
                  <el-form-item label="" :prop="formInline.item71!=6?'item1410':''" v-if="formInline.checkList14.indexOf('item149')>-1">
                    <el-input v-model.trim="formInline.item1410"  size="small"  style="width:150px;" maxlength="50" :disabled="$route.query.flag==0"></el-input>
                  </el-form-item>
                  <el-checkbox label="item145" :disabled="$route.query.flag==0">不详</el-checkbox>
                </el-checkbox-group>
                <!-- <div class="el-checkbox-group Hheight">
                  <el-checkbox v-model="formInline.item141" style="float:left" :disabled="$route.query.flag==0">腺癌</el-checkbox>
                  <el-checkbox v-model="formInline.item146" style="float:left" :disabled="$route.query.flag==0">粘液腺癌</el-checkbox>
                  <el-checkbox v-model="formInline.item142" style="float:left" :disabled="$route.query.flag==0">印戒细胞癌</el-checkbox>
                  <el-checkbox v-model="formInline.item147" style="float:left" :disabled="$route.query.flag==0">鳞状细胞癌</el-checkbox>
                  <el-checkbox v-model="formInline.item143" style="float:left" :disabled="$route.query.flag==0">腺鳞癌</el-checkbox>
                  <el-checkbox v-model="formInline.item148" style="float:left" :disabled="$route.query.flag==0">未分化癌</el-checkbox>
                  <el-checkbox v-model="formInline.item144" style="float:left" :disabled="$route.query.flag==0">癌</el-checkbox>
                  <el-checkbox v-model="formInline.item149" style="float:left" :disabled="$route.query.flag==0">其他（请详细说明）</el-checkbox>
                  <el-form-item label="" prop="item1410" style="float:left" v-if="formInline.item149==1">
                    <el-input v-model.trim="formInline.item1410"  size="small"  style="width:150px;" maxlength="50" :disabled="$route.query.flag==0"></el-input>
                  </el-form-item>
                  <el-checkbox v-model="formInline.item145" style="float:left" :disabled="$route.query.flag==0">不详</el-checkbox>
                </div> -->
              </el-form-item>
            </el-row>
            <el-row>
              <p class="pTitle"><span class="requiredLabel" v-if="formInline.item71!=6">*&nbsp;</span>15. 原发性结直肠癌的分化程度：（由CTR资质或相当人员填写）</p>
              <el-form-item label="" class="formoneline" :prop="formInline.item71!=6?'checkList15':''">
                 <el-checkbox-group v-model="formInline.checkList15">
                  <el-checkbox label="item151" :disabled="$route.query.flag==0">无法评估（GX）</el-checkbox>
                  <el-checkbox label="item152" :disabled="$route.query.flag==0">高分化（G1）</el-checkbox>
                  <el-checkbox label="item153" :disabled="$route.query.flag==0">未分化（G4）</el-checkbox>
                  <el-checkbox label="item157" :disabled="$route.query.flag==0">病理报告中未描述</el-checkbox>
                  <el-checkbox label="item154" :disabled="$route.query.flag==0">中分化（G2）</el-checkbox>
                  <el-checkbox label="item155" :disabled="$route.query.flag==0">低分化（G3）</el-checkbox>
                  <el-checkbox label="item156" :disabled="$route.query.flag==0">不详---病理报告丢失</el-checkbox>
                </el-checkbox-group>
                <!-- <div class="el-checkbox-group">
                  <el-checkbox v-model="formInline.item151" :disabled="$route.query.flag==0">无法评估（GX）</el-checkbox>
                  <el-checkbox v-model="formInline.item152" :disabled="$route.query.flag==0">高分化（G1）</el-checkbox>
                  <el-checkbox v-model="formInline.item153" :disabled="$route.query.flag==0">未分化（G4）</el-checkbox>
                  <el-checkbox v-model="formInline.item157" :disabled="$route.query.flag==0">病理报告中未描述</el-checkbox>
                  <el-checkbox v-model="formInline.item154" :disabled="$route.query.flag==0">中分化（G2）</el-checkbox>
                  <el-checkbox v-model="formInline.item155" :disabled="$route.query.flag==0">低分化（G3）</el-checkbox>
                  <el-checkbox v-model="formInline.item156" :disabled="$route.query.flag==0">不详---病理报告丢失</el-checkbox>
                </div> -->
              </el-form-item>
            </el-row>
            <el-row>
              <p class="pTitle">16.原发性结直肠癌的TNM分期：（由CTR资质或相当人员填写）</p>
              <el-form-item label="16a. TNM临床分期：" class="formoneline" :prop="formInline.item71!=6?'item16a1':''" label-width="160px">
                 <el-radio-group v-model="formInline.item16a1" :disabled="$route.query.flag==0">
                  <el-radio :label="1">有</el-radio>
                  <el-radio :label="2">无</el-radio>
                </el-radio-group>
              </el-form-item>
              <table class="j_table cancerTable table01" v-if="formInline.item16a1==1">
                <tr>
                  <th width="180px">原发肿瘤大小（T）</th>
                  <th width="180px">淋巴结转移（N）</th>
                  <th width="180px">远处转移（M）</th>
                </tr>
                <tr>
                  <td>
                    <el-form-item label="" class="formoneline" :prop="formInline.item71!=6?'item16a11':''">
                      <el-radio-group v-model="formInline.item16a11" :disabled="$route.query.flag==0">
                        <el-radio :label="1">Tx</el-radio>
                        <el-radio :label="2">T0</el-radio>
                        <el-radio :label="3">T1</el-radio>
                        <el-radio :label="4">T2</el-radio>
                        <el-radio :label="5">T3</el-radio>
                        <el-radio :label="6">T4</el-radio>
                        <el-radio :label="7">无法提供</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </td>
                  <td>
                    <el-form-item label="" class="formoneline" :prop="formInline.item71!=6?'item16a12':''">
                      <el-radio-group v-model="formInline.item16a12" :disabled="$route.query.flag==0">
                        <el-radio :label="1">Nx</el-radio>
                        <el-radio :label="2">N0</el-radio>
                        <el-radio :label="3">N1</el-radio>
                        <el-radio :label="4">N2</el-radio>
                        <el-radio :label="5">N3</el-radio>
                        <el-radio :label="6">无法提供</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </td>
                  <td>
                     <el-form-item label="" class="formoneline" :prop="formInline.item71!=6?'item16a13':''">
                      <el-radio-group v-model="formInline.item16a13" :disabled="$route.query.flag==0">
                        <el-radio :label="1">Mx</el-radio>
                        <el-radio :label="2">M0</el-radio>
                        <el-radio :label="3">M1</el-radio>
                        <el-radio :label="4">无法提供</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </td>
                </tr>
              </table>
            </el-row>
            <el-row>
              <el-form-item label="16b. TNM病理分期：" class="formoneline" :prop="formInline.item71!=6?'item16b1':''" label-width="160px">
                 <el-radio-group v-model="formInline.item16b1" :disabled="$route.query.flag==0">
                  <el-radio :label="1">有</el-radio>
                  <el-radio :label="2">无</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="分期前是否已进行新辅助治疗？" class="formoneline" :prop="formInline.item71!=6?'item16b2':''" label-width="220px">
                 <el-radio-group v-model="formInline.item16b2" :disabled="$route.query.flag==0">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <table class="j_table cancerTable table01" v-if="formInline.item16b1==1">
                <tr>
                  <th width="180px">原发肿瘤大小（T）</th>
                  <th width="180px">淋巴结转移（N）</th>
                  <th width="180px">远处转移（M）</th>
                </tr>
                <tr>
                  <td>
                     <el-form-item label="" class="formoneline" :prop="formInline.item71!=6?'item16b11':''">
                      <el-radio-group v-model="formInline.item16b11" :disabled="$route.query.flag==0">
                        <el-radio :label="1">Tx</el-radio>
                        <el-radio :label="2">T1</el-radio>
                        <el-radio :label="3">T2</el-radio>
                        <el-radio :label="4">T3</el-radio>
                        <el-radio :label="5">T4</el-radio>
                        <el-radio :label="6">无法提供</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </td>
                  <td>
                     <el-form-item label="" class="formoneline" :prop="formInline.item71!=6?'item16b12':''">
                      <el-radio-group v-model="formInline.item16b12" :disabled="$route.query.flag==0">
                        <el-radio :label="1">Nx</el-radio>
                        <el-radio :label="2">N0</el-radio>
                        <el-radio :label="3">N1</el-radio>
                        <el-radio :label="4">N2</el-radio>
                        <el-radio :label="5">N3</el-radio>
                        <el-radio :label="6">无法提供</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </td>
                  <td>
                     <el-form-item label="" class="formoneline" :prop="formInline.item71!=6?'item16b13':''">
                      <el-radio-group v-model="formInline.item16b13" :disabled="$route.query.flag==0">
                        <el-radio :label="1">Mx</el-radio>
                        <el-radio :label="2">M0</el-radio>
                        <el-radio :label="3">M1</el-radio>
                        <el-radio :label="4">无法提供</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </td>
                </tr>
              </table>
            </el-row>
            <el-row>
              <p class="pTitle">17. 记录分期：仅在TNM分期中有不详项目时才完成此表（由CTR资质或相当人员填写）
                <el-button size="mini" type="danger" @click="clearNumSevenTeen" :disabled="$route.query.flag==0">清空</el-button>
              </p>
              <table class="j_table cancerTable table01">
                <tr>
                  <th width="180px">分期</th>
                  <th width="180px">DUKES</th>
                  <th width="180px">简要分期</th>
                </tr>
                <tr>
                  <td>
                    <el-form-item label="" class="formoneline">
                      <el-radio-group v-model="formInline.item1711" :disabled="$route.query.flag==0">
                        <el-radio :label="1">I</el-radio>
                        <el-radio :label="2">II</el-radio>
                        <el-radio :label="3">III</el-radio>
                        <el-radio :label="4">IV</el-radio>
                        <el-radio :label="5">无法提供</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </td>
                  <td>
                    <el-form-item label="" class="formoneline">
                      <el-radio-group v-model="formInline.item1712" :disabled="$route.query.flag==0">
                        <el-radio :label="1">A</el-radio>
                        <el-radio :label="2">B</el-radio>
                        <el-radio :label="3">C</el-radio>
                        <el-radio :label="4">无法提供</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </td>
                  <td>
                    <el-form-item label="" class="formoneline">
                      <el-radio-group v-model="formInline.item1713" :disabled="$route.query.flag==0">
                        <el-radio :label="1">局部/未扩散</el-radio>
                        <el-radio :label="2">局部侵润</el-radio>
                        <el-radio :label="3">远处转移</el-radio>
                        <el-radio :label="4">无法提供</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </td>
                </tr>
              </table>
              <div class="el-form-item__error" v-if="item17Show">必填</div>
            </el-row>
        </div>
      </div>
      <div class="formcon">
        <div class="title">
          D部分：备注
        </div>
        <div class="tables">
            <el-row>
              <p class="pTitle"><span class="requiredLabel" v-if="formInline.item71==1 || formInline.item71==6">*&nbsp;</span>18. 备注:</p>
              <el-form-item label="" class="formoneline" prop="item18" ref="item18Form"
              :rules="(formInline.item71==1||formInline.item71==6)?{ required: true, message: '必填', trigger: 'blur' }:{}">
                  <el-input type="textarea" v-model="formInline.item18" style="width:600px;" maxlength="1000" :disabled="$route.query.flag==0"></el-input>
              </el-form-item>
            </el-row>
        </div>
      </div>
      </el-form>
      <div class="text-center" style="margin-top: 40px;" v-if="$route.query.flag!=0">
        <el-button type="primary" @click="submit()" ref="addBtn" id="buttonBoneSave">提交</el-button>
        <el-button @click='cancel'>取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
var birthDate='';
import dateFormater  from '../../filters/index'
import uploadMultipleFileSubmit from '../components/uploadMultipleFileSubmit'   //上传文件
import uploadMultipleFileSubmitBtn from '../components/uploadMultipleFileSubmitBtn'   //上传文件
  export default {
    name: 'report1',
    data() {
       const item1_a = (rule, value, callback) => {
        if (value && !(/^[A-Za-z0-9\u4e00-\u9fa5]+$/.test(value))) {
          callback(new Error('请输入50个以内的数字、字母、中文及符号组合'))
        }else {
          callback();
        }
      };
        const item1_b = (rule, value, callback) => {
        if (value && !(/^[\u4e00-\u9fa5]+$/.test(value))) {
          callback(new Error('请输入18个以内的汉字'))
        }else {
          callback();
        }
      };
      const item1_c = (rule, value, callback) => {
        if (value && !(/^\d+(\.\d{1})?$/.test(value))) {
          callback(new Error('非负数，保留小数点后一位'))
        }else {
          callback();
        }
      };
      //add
      const item122_c = (rule, value, callback) => {
        if (value && !(/^(\d{1,4})(\.\d{1})?$/.test(value))) {
          callback(new Error('非负数，保留小数点后一位'))
        }else {
          callback();
        }
      };
      const item1_d = (rule, value, callback) => {
        if (value && !(/^[1-9]*[1-9][0-9]*$/.test(value))) {
          callback(new Error('大于0的整数'))
        }else {
          callback();
        }
      };
       const item1_e = (rule, value, callback) => {
        if (value && !(/^((0|1)[1-9]{1}|10|2{1}[0-7]|88)+$/.test(value))) {
          callback(new Error('编码错误'))
        }else {
          callback();
        }
      };
      const item1_f = (rule, value, callback) => {
        let arr=['1','2','3','4','6','20','22','23','24','25','26','27','28','30','31','32','33','300','301','302','306','307'];
        if (value && arr.indexOf(value)<0) {
          callback(new Error('编码错误'))
        }else {
          callback();
        }
      };
       const item1_g = (rule, value, callback) => {
        if (value && !(/^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、0-9A-Za-z]+$/.test(value))) {
          callback(new Error('请输入18个以内的数字、字母及符号的组合'))
        }else {
          callback();
        }
      };
       const item1_h = (rule, value, callback) => {
        if (value && !(/^[0-9]+(\.\d{1})?$/.test(value))) {
          callback(new Error('请输入11位以内的数字'))
        }else {
          callback();
        }
      };
      //  const item1_e = (rule, value, callback) => {
      //   if (value && (/^[\u4e00-\u9fa5]+$/.test(value))) {
      //     callback(new Error('请输入18个以内的数字、字母及符号的组合'))
      //   }else {
      //     callback();
      //   }
      // };
      return {
         pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now() ;
          }
        },
         pickerOptions2:{
          disabledDate(time) {
            return time.getTime() > Date.now() || new Date(birthDate).getTime()>time.getTime();
          }
        },
        delBtnShow:true,    //删除按钮
        delBtnShow02:true,    //删除按钮
        base:{    //用户基本信息
          name:'',
          siteId:'',
          sex:'',
        },
        item17Show:false,
        reportUrlsFlag:false,
        formInline:{
          excerptPurpose:null,
          cfScreening:null,
          excerptPersonId:null,
          excerptsDateToString:new Date(),
          investigatorCode:null,
          tbTablePerson:null,
          researchYear:new Date(),
          qualityControlPerson:null,
          item1:null,
          checkList2:[],   //初次就诊原因
          checkList13:[],   //初次就诊原因
          checkList14:[],   //初次就诊原因
          checkList15:[],   //初次就诊原因
          item21:null,     
          item22:null,
          item23:null,
          item23Other:null,
          item3CheckDateToString:new Date(),
          item31:null,
          item32:null,
          item33:null,
          item41:null,
          item421:null,
          item422:null,
          item431:null,
          item432:null,
          item44:null,
          item45:null,
          item46:null,
          item61:null,
          item71:null,
          item8a1:null,
          item8a2:null,
          item8b1ToString:new Date(),
          item8b2:null,
          item8c1:null,
          item8c12:null,
          item8c13:null,
          item8c14:null,
          item8c15:null,
          item8d11ToString:new Date(),
          item8d12:null,
          item8e11:null,
          item9ToString:new Date(),
          item10:null,
          item11:null,
          item121:null,
          item122:null,
          item123:null,
          item124:null,
          item125:null,
          item131:null,
          item132:null,
          item133:null,
          item134:null,
          item135:null,
          item136:null,
          item137:null,
          item138:null,
          item139:null,
          item1310:null,
          item1311:null,
          item141:null,
          item142:null,
          item143:null,
          item144:null,
          item145:null,
          item146:null,
          item147:null,
          item148:null,
          item149:null,
          item1410:null,
          item151:null,
          item152:null,
          item153:null,
          item154:null,
          item155:null,
          item156:null,
          item157:null,
          item16a1:null,
          item16a11:null,
          item16a12:null,
          item16a13:null,
          item16b1:null,
          item16b2:null,
          item16b11:null,
          item16b12:null,
          item16b13:null,
          item1711:null,
          item1712:null,
          item1713:null,
          item18:null,
          hospitalInformationDiagnoseEvaluationVos:[{
          	checkDateToString:new Date(),
          	diagnosticMethods:null,
          	diagnosticMethodsOther:null
          }],
          hospitalCancerInformationComplicationsVos:[{
          	complicationsDateToString:new Date(),
          	complicationsCode:null,
          	complicationsCodeOther:null
          }]
        },
        uploadUrls:[],    //上传文件url
        uploadUrls2:[],  //上传文件url----删除传的urls
        picVisible:false,
        dialogImageUrl:'', //当前图片地址
       rules:{
         investigatorCode:[
            { required: true, message: '必填', trigger: 'blur' },
            // { message: '请输入50个以内的数字、字母、中文及符号组合', trigger: 'blur', validator: item1_a}
          ],
          excerptsDateToString:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          researchYear:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
         tbTablePerson:[
            { required: true, message: '必填', trigger: 'blur' },
            { message: '请输入18个以内的汉字', trigger: 'blur', validator: item1_b}
          ],
         qualityControlPerson:[
            { required: true, message: '必填', trigger: 'blur' },
            { message: '请输入18个以内的汉字', trigger: 'blur', validator: item1_b}
          ],
          excerptPurpose:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          excerptPersonId:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item1:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          checkList2:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          checkList13:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          checkList14:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          checkList15:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item23Other:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item3CheckDateToString:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
           item31:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
         item32:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
         item33:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item41:[
            { required: false, message: '必填', trigger: 'blur' },
          ],
          item421:[
            { required: false, message: '必填', trigger: 'blur' },
          ],
          item422:[
            { required: false, message: '必填', trigger: 'blur' },
            { message: '非负数，保留小数点后一位', trigger: 'blur', validator: item1_c}
          ],
          item431:[
            { required: false, message: '必填', trigger: 'blur' },
          ],
          item432:[
            { required: false, message: '必填', trigger: 'blur' },
            { message: '非负数，保留小数点后一位', trigger: 'blur', validator: item1_c}
          ],
          item44:[
            { required: false, message: '必填', trigger: 'blur' },
          ],
          item45:[
            { required: false, message: '必填', trigger: 'blur' },
          ],
          item46:[
             { required: false, message: '必填', trigger: 'blur' },
            { message: '大于0的整数', trigger: 'blur', validator: item1_d}
          ],
          item61:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item71:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item8a1:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item8b1ToString:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item8b2:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item8c1:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item8d11ToString:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item8d12:[
            { required: true, message: '必填', trigger: 'blur' },
            { message: '请输入18个以内的汉字', trigger: 'blur', validator: item1_b}
          ],
          item8e11:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item9ToString:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item10:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item11:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item121:[
            { required: true, message: '必填', trigger: 'blur' },
             { message: '非负数，保留小数点后一位', trigger: 'blur', validator: item1_c}
          ],
          
          item132:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item133:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item134:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item135:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item136:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item137:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item138:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item139:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item1310:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item141:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item142:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item143:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item144:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item145:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item146:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item147:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item148:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item149:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item151:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item152:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item153:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item154:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item155:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item156:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item157:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item16a1:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item16b1:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item16b2:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item1711:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item1712:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item1713:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item8a2:[
            { required: true, message: '必填', trigger: 'blur' },
            { message: '数字、字母、符号组合', trigger: 'blur', validator: item1_g}
          ],
          item8c12:[
            { required: true, message: '必填', trigger: 'blur' },
            { message: '请输入11位以内的数字', trigger: 'blur', validator: item1_h}
          ],
          item8c13:[
            { required: true, message: '必填', trigger: 'blur' },
            { message: '请输入11位以内的数字', trigger: 'blur', validator: item1_h}
          ],
          item8c14:[
            { required: true, message: '必填', trigger: 'blur' },
            { message: '请输入11位以内的数字', trigger: 'blur', validator: item1_h}
          ],
          item8c15:[
            { required: true, message: '必填', trigger: 'blur' },
            { message: '请输入11位以内的数字', trigger: 'blur', validator: item1_h}
          ],
          item122:[
            { required: true, message: '必填', trigger: 'blur' },
            // { message: '请输入11位以内的数字', trigger: 'blur', validator: item1_h}
             { message: '非负数，保留小数点后一位', trigger: 'blur', validator: item122_c}
          ],
          item123:[
            { required: true, message: '必填', trigger: 'blur' },
            { message: '请输入11位以内的数字', trigger: 'blur', validator: item1_h}
          ],
          item124:[
            { required: true, message: '必填', trigger: 'blur' },
            { message: '请输入11位以内的数字', trigger: 'blur', validator: item1_h}
          ],
          item125:[
            { required: true, message: '必填', trigger: 'blur' },
            { message: '请输入11位以内的数字', trigger: 'blur', validator: item1_h}
          ],
          item1311:[
            { required: true, message: '必填', trigger: 'blur' },
            { message: '非负数，保留小数点后一位', trigger: 'blur', validator: item1_c}
          ],
          item1410:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item16a11:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item16a12:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item16a13:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item16b11:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item16b12:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item16b13:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          // item18:[
          //   { required: true, message: '必填', trigger: 'blur' },
          // ],

          
       },
        formInlinelist:{
          checkDateToString:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          diagnosticMethods:[
            { required: true, message: '必填', trigger: 'blur' },
            { message: '编码错误', trigger: 'blur', validator: item1_e}
          ],
          diagnosticMethodsOther:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
       },
        formInlinelistFirst:{
          complicationsDateToString:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          complicationsCode:[
            { required: true, message: '必填', trigger: 'blur' },
            { message: '编码错误', trigger: 'blur', validator: item1_f}
          ],
          complicationsCodeOther:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
       }
      }
    },
    created() {
      let obj = this.checkPageAuth(this,"cancerReport3_page",this.btnAuth);
      this.getCustomerInfo();
      if(this.$route.query.flag==0 || this.$route.query.flag==2 ){
        // 0-查看  1-录入  2-编辑
        this.queryreportbyid();
      }else{
        // 录入
      }
      // 控制删除按钮显示隐藏
      if(this.formInline.hospitalInformationDiagnoseEvaluationVos.length==1){
        this.delBtnShow=false;
      }else{
        this.delBtnShow=true;
      }
      if(this.formInline.hospitalCancerInformationComplicationsVos.length==1){
        this.delBtnShow02=false;
      }else{
        this.delBtnShow02=true;
      }
    },
    components:{
      uploadMultipleFileSubmit,
      uploadMultipleFileSubmitBtn
    },
    methods:{
      item421Change(){
        if(this.formInline.item421){
          this.formInline.item422=null;
        }
      },
      item422Change(){
        if(this.formInline.item422){
          this.formInline.item421=null;
        }
      },
      item431Change(){
        if(this.formInline.item431){
          this.formInline.item432=null;
        }
      },
      item432Change(){
        if(this.formInline.item432){
          this.formInline.item431=null;
        }
      },
      getUrl(data){
        this.uploadUrls=data;
      },
      getUrl2(data){
        this.uploadUrls2=data;
      },
      changeRadioItem71(){
         this.$refs['item18Form'].clearValidate() // 清除b备注的验证
        //  时间默认
        if(this.formInline.item71=="2" || this.formInline.item71=="3" || this.formInline.item71=="5"){
          this.formInline.item9ToString=new Date();
        }
        if(this.formInline.item71=="4"){
          this.formInline.item8d11ToString=new Date();
        }
        if(this.formInline.item71=="6"){
        }
      },
      // changeItem1711(){
      //   this.$refs['item1711Form'].clearValidate() // 清除17题的验证
      //   this.$refs['item1712Form'].clearValidate() // 清除17题的验证
      //   this.$refs['item1713Form'].clearValidate() // 清除17题的验证
      // },
      add(){// 添加癌症信息
        this.formInline.hospitalInformationDiagnoseEvaluationVos.push({
          	checkDateToString:new Date(),
          	diagnosticMethods:null,
          	diagnosticMethodsOther:null
          });
        // 控制删除按钮显示隐藏
        this.delBtnShow=true;
      },
      add02(){// 添加癌症信息
        this.formInline.hospitalCancerInformationComplicationsVos.push({
          	complicationsDateToString:new Date(),
          	complicationsCode:null,
          	complicationsCodeOther:null
          });
        // 控制删除按钮显示隐藏
        this.delBtnShow02=true;
      },
      del(index){// 删除癌症信息
        // 控制删除按钮显示隐藏
        if(this.formInline.hospitalInformationDiagnoseEvaluationVos.length<=2){
          this.delBtnShow=false;
        }
        this.formInline.hospitalInformationDiagnoseEvaluationVos.splice(index,1)
      },
      del02(index){// 删除癌症信息
        // 控制删除按钮显示隐藏
        if(this.formInline.hospitalCancerInformationComplicationsVos.length<=2){
          this.delBtnShow02=false;
        }
        this.formInline.hospitalCancerInformationComplicationsVos.splice(index,1)
      },
      submit(){ //提交
      // 17题校验
      if((this.formInline.item16a11==7||this.formInline.item16a12==6 ||this.formInline.item16a13==4||this.formInline.item16b11==6||this.formInline.item16b12==6||this.formInline.item16b13==4) && (!this.formInline.item1711 && !this.formInline.item1712 && !this.formInline.item1713)){
        this.item17Show=true;
      }else{
        this.item17Show=false;
      }
          let validd = true
          this.$refs.formInline.validate((valid) => {
          if (!valid){
            validd = false
          }
          if(this.formInline.hospitalInformationDiagnoseEvaluationVos && this.formInline.hospitalInformationDiagnoseEvaluationVos.length){
          for(var i=0;i<this.formInline.hospitalInformationDiagnoseEvaluationVos.length;i++){
            this.$refs['formInlinelist'+i][0].validate((valid) => {
              if (!valid){
                validd = false
              }
            })
          }
        }
         if(this.formInline.item61==2 && this.formInline.hospitalInformationDiagnoseEvaluationVos && this.formInline.hospitalCancerInformationComplicationsVos.length){
          for(var i=0;i<this.formInline.hospitalCancerInformationComplicationsVos.length;i++){
            this.$refs['formInlinelistFirst'+i][0].validate((valid) => {
              if (!valid){
                validd = false
              }
            })
          }
        }
          if(validd && !this.item17Show){
            let dd = this.formInline
            for(let item in dd){
              if(dd[item]==true){
                dd[item]="1"
              }else if(dd[item]==false){
                dd[item]="2"
              }
            }
            // 多选题赋值
            // 初次就诊原因
          if(typeof this.formInline.checkList2=="object"){
            this.formInline.item21=null;
            this.formInline.item22=null;
            this.formInline.item23=null;
            this.formInline.checkList2.filter(item=>{
              this.formInline[item]=1;
            })
          }
          if(typeof this.formInline.checkList13=="object"){
             // 原发肿瘤位置
            this.formInline.item131=null;
            this.formInline.item132=null;
            this.formInline.item133=null;
            this.formInline.item134=null;
            this.formInline.item135=null;
            this.formInline.item136=null;
            this.formInline.item137=null;
            this.formInline.item138=null;
            this.formInline.item139=null;
            this.formInline.item1310=null;
            this.formInline.checkList13.filter(item=>{
              this.formInline[item]=1;
            })
          }
         if(typeof this.formInline.checkList14=="object"){
               // 原发性结直肠癌的病理类型
          this.formInline.item141=null;
          this.formInline.item142=null;
          this.formInline.item143=null;
          this.formInline.item144=null;
          this.formInline.item145=null;
          this.formInline.item146=null;
          this.formInline.item147=null;
          this.formInline.item148=null;
          this.formInline.item149=null;
          this.formInline.checkList14.filter(item=>{
            this.formInline[item]=1;
          })
         }
        if(typeof this.formInline.checkList15=="object"){
            // 原发性结直肠癌的分化程度
          this.formInline.item151=null;
          this.formInline.item152=null;
          this.formInline.item153=null;
          this.formInline.item154=null;
          this.formInline.item155=null;
          this.formInline.item156=null;
          this.formInline.item157=null;
          this.formInline.checkList15.filter(item=>{
            this.formInline[item]=1;
          })
        }
            // 设置时间格式
             if(typeof dd.researchYear=='object'){
               dd.researchYear = dd.researchYear.getFullYear()+''
             }
             if(typeof dd.excerptsDateToString=='object'){
               dd.excerptsDateToString=dateFormater.dateFormater(dd.excerptsDateToString)
             }
             if(typeof dd.item3CheckDateToString=='object'){
               dd.item3CheckDateToString=dateFormater.dateFormater(dd.item3CheckDateToString)
             }
             if(typeof dd.item8b1ToString=='object'){
               dd.item8b1ToString=dateFormater.dateFormater(dd.item8b1ToString)
             }
             if(typeof dd.item8d11ToString=='object'){
               dd.item8d11ToString=dateFormater.dateFormater(dd.item8d11ToString)
             }
             if(typeof dd.item9ToString=='object'){
               dd.item9ToString=dateFormater.dateFormater(dd.item9ToString)
             }
             if(dd.hospitalInformationDiagnoseEvaluationVos){
               dd.hospitalInformationDiagnoseEvaluationVos.filter(item=>{
                  if(typeof item.checkDateToString=='object'){
                  item.checkDateToString=dateFormater.dateFormater(item.checkDateToString)
                }
                })
             }
              if(dd.item61==2 && dd.hospitalCancerInformationComplicationsVos){
                dd.hospitalCancerInformationComplicationsVos.filter(item=>{
                  if(typeof item.complicationsDateToString=='object'){
                  item.complicationsDateToString=dateFormater.dateFormater(item.complicationsDateToString)
                }
                })
             }
             if(this.uploadUrls2.length==0 && this.uploadUrls.length==0){
                dd.reportUrls=this.formInline.reportUrls;
             }else if(this.uploadUrls2.length>0){
              dd.reportUrls=this.uploadUrls2;
            }else{
              dd.reportUrls=this.uploadUrls;
            }
             //  新增
            if(this.$route.query.flag==1){
              dd.sid=this.$route.query.sid;
              dd.cancerRecordId=this.$route.query.id;
            }else if(this.$route.query.flag==2){
              dd.sid=this.$route.query.sid;
              dd.cancerRecordId=this.$route.query.cancerRecordId;
              dd.id=this.$route.query.id;
                  // 删除多余的参数
              delete dd.createUser;
              delete dd.dateCreated;
              delete dd.deptCode;
              delete dd.excerptsDate;
              delete dd.item3CheckDate;
              delete dd.item8b1;
              delete dd.item8d11;
              delete dd.item9;
              delete dd.updateTime;
              delete dd.reportUrlToString;
              if(dd.hospitalInformationDiagnoseEvaluationVos){
                  dd.hospitalInformationDiagnoseEvaluationVos.filter(item=>{
                  delete item.checkDate;
                  delete item.dateCreated;
                  delete item.updateTime;
              })
              }
              if(dd.hospitalCancerInformationComplicationsVos){
                dd.hospitalCancerInformationComplicationsVos.filter(item=>{
                delete item.complicationsDate;
                delete item.dateCreated;
                delete item.updateTime;
            })
              }
             
            if(dd.reportUrls){
               dd.reportUrls.filter(item=>{
                delete item.fileUploadTime;
            })
            }
            }
            // 删除隐藏的题目---跟7题相关
            if(dd.item71=="1"){
              delete dd.item8a1;
              delete dd.item8a2;
              delete dd.item8b1ToString;
              delete dd.item8b2;
              delete dd.item8c1;
              delete dd.item8c12;
              delete dd.item8c13;
              delete dd.item8c14;
              delete dd.item8c15;
              delete dd.item8d11ToString;
              delete dd.item8d12;
              delete dd.item8e11;
              delete dd.item9ToString;
              delete dd.item10;
              delete dd.item11;
              delete dd.item121;
              delete dd.item122;
              delete dd.item123;
              delete dd.item124;
              delete dd.item125;
              delete dd.item131;
              delete dd.item132;
              delete dd.item133;
              delete dd.item134;
              delete dd.item135;
              delete dd.item136;
              delete dd.item137;
              delete dd.item138;
              delete dd.item139;
              delete dd.item1310;
              delete dd.item1311;
              delete dd.item141;
              delete dd.item142;
              delete dd.item143;
              delete dd.item144;
              delete dd.item145;
              delete dd.item146;
              delete dd.item147;
              delete dd.item148;
              delete dd.item149;
              delete dd.item1410;
              delete dd.item151;
              delete dd.item152;
              delete dd.item153;
              delete dd.item154;
              delete dd.item155;
              delete dd.item156;
              delete dd.item157;
              delete dd.item16a1;
              delete dd.item16a11;
              delete dd.item16a12;
              delete dd.item16a13;
              delete dd.item16b1;
              delete dd.item16b2;
              delete dd.item16b11;
              delete dd.item16b12;
              delete dd.item16b13;
              delete dd.item1711;
              delete dd.item1712;
              delete dd.item1713;
              delete dd.reportUrls;
            }else if(dd.item71=="2" || dd.item71=="3" || dd.item71=="5"){
               delete dd.item8a1;
              delete dd.item8a2;
              delete dd.item8b1ToString;
              delete dd.item8b2;
              delete dd.item8c1;
              delete dd.item8c12;
              delete dd.item8c13;
              delete dd.item8c14;
              delete dd.item8c15;
              delete dd.item8d11ToString;
              delete dd.item8d12;
              delete dd.item8e11;
            }else if(dd.item71=="4"){
              delete dd.item9ToString;
              delete dd.item10;
              delete dd.item11;
              delete dd.item121;
              delete dd.item122;
              delete dd.item123;
              delete dd.item124;
              delete dd.item125;
              delete dd.item131;
              delete dd.item132;
              delete dd.item133;
              delete dd.item134;
              delete dd.item135;
              delete dd.item136;
              delete dd.item137;
              delete dd.item138;
              delete dd.item139;
              delete dd.item1310;
              delete dd.item1311;
              delete dd.item141;
              delete dd.item142;
              delete dd.item143;
              delete dd.item144;
              delete dd.item145;
              delete dd.item146;
              delete dd.item147;
              delete dd.item148;
              delete dd.item149;
              delete dd.item1410;
              delete dd.item151;
              delete dd.item152;
              delete dd.item153;
              delete dd.item154;
              delete dd.item155;
              delete dd.item156;
              delete dd.item157;
              delete dd.item16a1;
              delete dd.item16a11;
              delete dd.item16a12;
              delete dd.item16a13;
              delete dd.item16b1;
              delete dd.item16b2;
              delete dd.item16b11;
              delete dd.item16b12;
              delete dd.item16b13;
              delete dd.item1711;
              delete dd.item1712;
              delete dd.item1713;
              delete dd.reportUrls;
            }
            // 删除隐藏的题目
            if(dd.item23=="2"){
              delete dd.item23Other;
            }
            if(dd.item61!='2'){
              delete dd.hospitalCancerInformationComplicationsVos;
            }
            if(dd.item16a1=='2'){
              delete dd.item16a11;
              delete dd.item16a12;
              delete dd.item16a13;
            }
            if(dd.item16b1=='2'){
              delete dd.item16b11;
              delete dd.item16b12;
              delete dd.item16b13;
            }
            if(dd.item8a1=='2'){
              delete dd.item8a2;
              delete dd.item8b1ToString;
            }
            if(dd.item8c1=='2'){
              delete dd.item8c12;
              delete dd.item8c13;
              delete dd.item8c14;
              delete dd.item8c15;
              delete dd.item8d11ToString;
            }
            let _url='';
            if(this.$route.query.flag==1){
              _url="/base/hospital/cancer/addDiagnoseInformation"
            }else{
              _url='/base/hospital/cancer/updatereportC3'
            }
             $axios_http({
              url:_url,
              data: dd,
              vueObj: this
            }).then((res) => {
              this.$message({
                 type: 'success',
                 message: '提交成功，请及时填写C4表!'
               });
              //  resource 0-来源待办   1-来源终点事件管理列表
               if(this.$route.query.resource==0){
                 this.$router.push("/home/uncompletedEventList");
               }else if(this.$route.query.resource==1){
                  this.$router.push("/event/eventList3");
               }
             
            })
          }
        })
      },
      cancel(){
        if(this.$route.query.resource==0){
                 this.$router.push("/home/uncompletedEventList");
               }else if(this.$route.query.resource==1){
                  this.$router.push("/event/eventList3");
               }
      },
       // 获取用户基本信息
       getCustomerInfo(){
        $axios_http({
          url: "/base/hospital/review/get/" + this.$route.query.sid,
          data: {},
          vueObj: this
        }).then((res) => {
          this.base=res.data.data;
          //获取出生日期
          var value=res.data.data.idCard;
          var len = value.length;
          if (len == '15') {
            var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
            var arr_data = value.match(re_fifteen);
            var year = arr_data[2];
            var month = arr_data[3];
            var day = arr_data[4];
            var _birthday = '19' + year + '/' + month + '/' + day;
            birthDate = _birthday
          }
          if (len == '18') {
            var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
            var arr_data = value.match(re_eighteen);
            var year = arr_data[2];
            var month = arr_data[3];
            var day = arr_data[4];
            var _birthday = year + '/' + month + '/' + day;
            birthDate = _birthday
          }
        })
      },
       // 查看癌症信息
      queryreportbyid(){
        $axios_http({
          url: "/base/hospital/cancer/queryDiagnoseInformationbyId",
          data: {
            id:this.$route.query.id,
          },
          vueObj: this
        }).then((res) => {
          let _data=res.data.data;
          _data.checkList2=new Array();
          _data.checkList13=new Array();
          _data.checkList14=new Array();
          _data.checkList15=new Array();
           for(let item in _data){
              if(item.indexOf('item2')>-1 && item.indexOf('Other')==-1){
                if(_data[item]==1){
                  _data.checkList2.push(item);
                }
              }
              if(item.indexOf('item13')>-1){
                if(_data[item]==1){
                  _data.checkList13.push(item);
                }
              }
              if(item.indexOf('item14')>-1 && item.indexOf('Other')==-1){
                if(_data[item]==1){
                  _data.checkList14.push(item);
                }
              }
              if(item.indexOf('item15')>-1){
                if(_data[item]==1){
                  _data.checkList15.push(item);
                }
              }
            }
          this.formInline=_data;
          if(this.formInline.reportUrls){
            this.reportUrlsFlag=true;
          }else{
            this.reportUrlsFlag=false;
          }
          if(this.formInline.cfScreening && this.formInline.cfScreening==1){
            this.formInline.cfScreening=true
          }
         
             //设置默认值
          if(!this.formInline.hospitalCancerInformationComplicationsVos){
              this.formInline.hospitalCancerInformationComplicationsVos=[{
                complicationsDateToString:new Date(),
                complicationsCode:null,
                complicationsCodeOther:null
              }]
          }
          if(!this.formInline.item8b1ToString){
            this.formInline.item8b1ToString=new Date()
          }
          if(!this.formInline.item8d11ToString){
            this.formInline.item8d11ToString=new Date()
          }
           // 控制删除按钮显示隐藏
          if(this.formInline.hospitalCancerInformationComplicationsVos.length==1){
            this.delBtnShow02=false;
          }else{
            this.delBtnShow02=true;
          }
          if(this.formInline.hospitalInformationDiagnoseEvaluationVos.length==1){
            this.delBtnShow=false;
          }else{
            this.delBtnShow=true;
          }
        })
      },
      // 清空第4题
      clearNumFour(){
        for(let item in this.formInline){
          if(item.startsWith('item4')){
            this.formInline[item]=null
          }
        }
      },
        // 清空第17题
      clearNumSevenTeen(){
        for(let item in this.formInline){
          if(item.startsWith('item17')){
            this.formInline[item]=null
          }
        }
      },
    }
  }
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
    margin-top:-20px;
    min-height:20px;
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
  }

  .tables {
    margin: 40px 50px 30px 50px;
  }

  .formoneline {
    width: 100%;
    margin-right: 0 !important;
  }

  .addBtn {
    margin-top: 20px;
  }
  .bbsm h1{
    font-size: 18px;
  }
  .txsm {
    font-size: 14px;
    margin: 10px 0;
  }
  .formoneline .el-form-item__label{
    text-align: right;
  }
  .el-date-editor.el-input{
    width: 202px;
  }
  .cancerTable .el-date-editor.el-input{
    width: 180px;
  }
  .j_table th{
    font-weight: normal;
    font-size: 14px;
    color: #000;
    background: #f3f3f3;
  }
  .j_table th span{
    color:#3a8ee6;
    cursor: pointer;
  }
  .cancerTable td,.cancerTable th{
     border:1px solid #e0dcdc;
     text-align: center;
     vertical-align: middle;
  }
  .cancerTable td{
    border-top:0;
  }
   .cancerTable td:nth-child(1){
      text-align: left;
   }
   .cancerTable .el-form-item{
     margin:0 0 5px 0;
     padding:0 5px;
   }
  .requiredLabel{
    color: #f56c6c;
  }
    .tables .el-checkbox-group,.tablesPartTwo .el-radio-group{
    padding-left:30px;
    height: auto;
  }
  .pTitle{
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    font-weight: bold;
  }
  .tables .el-checkbox-group.Hheight{
    padding-left:30px;
    min-height: 60px;
  }
  .j_content{
    overflow-x: hidden
  }
  .tipsRow td{
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .tableRow {
    margin-left: 15px;
  }
  .tableRow td{
    padding: 0 10px;
  }
  .requiredLabel{
    color: #f56c6c;
  }
  .evaluate input{
    width: 100%;
    margin-top: 5px;
  }
  .evaluate td{
    padding: 5px 0;
    vertical-align: middle;
  }
  .ulTitle li{
    list-style-type: none;
    height: 40px;
    line-height: 40px;
    border-right:1px solid #e0dcdc;
    border-top:1px solid #e0dcdc;
    padding: 0 10px;
    vertical-align: middle;
  }
  .ulTitleFirst li{
     border-left:1px solid #e0dcdc;
  }
  .ulTitle li:last-child{
    border-bottom:1px solid #e0dcdc;
  }
  .tables .table01 .el-radio,.rowBlock .el-radio{
    display: block;
    margin: 10px 0;
    text-align: left;
  }
  .tablesPartTwo .table01 .el-radio-group,.rowBlock .el-radio-group{
    padding-left:30px;
  }
  .table01{
    margin-bottom: 20px;
  }
  .table01 td{
    padding:0 10px;
    
  }
  .table01 th{
    height: 40px;
    line-height: 40px;
  }
  .table01 .tableTips{
    font-size: 14px;
    text-align: left;
    margin-top: 20px;
    color: #888;
  }
  .table02 td{
    vertical-align: top;
  }
  .tablesPartTwo .table02 .el-radio-group{
    padding-left:0;
  }
.tableNumTips td{
  padding:0 10px;
  vertical-align: top;
  }
  .fileList{
    margin-left: 30px;

  }
   .fileList li{
     list-style: none;
     font-size: 14px;
     color: #606266;
     margin: 10px 0;
     width: 400px;
     position: relative;
     height: 20px;
     cursor: pointer;
   }
   .fileName{
     display: inline-block;
     width: 350px;
     overflow: hidden;
     text-overflow: ellipsis;
     white-space: nowrap;
     color: #409EFF;
     line-height: 20px;
   }
</style>
<style>
.j_content .el-radio__input.is-disabled.is-checked+span.el-radio__label {
    color: #409EFF;
  }
  .j_content .el-radio__input.is-disabled.is-checked .el-radio__inner {
    background-color: #409EFF;
    border-color: #409EFF;
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
  .j_content .el-input.is-disabled.grayInput .el-input__inner{
    background:#ededed;
  }
  .j_content .el-textarea.is-disabled .el-textarea__inner {
    background-color: #fff;
    border-color: #dcdfe6;
    color: #606266;
    cursor: not-allowed;
  }
  .j_content .el-checkbox__input.is-disabled.is-checked+span.el-checkbox__label {
    color: #409EFF;
    cursor: not-allowed;
  }
  .j_content .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
    background-color: #409EFF;
    border-color: #409EFF;
  }
  .j_content .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
    border-color: #fff;
  }
</style>
