<template>
  <div class="" v-if="riskFactors_page" id="riskFactors">
    <div class="contentMain">
      <div class="header">
        <!--<router-link to="/home/home">-->
          <el-button size="mini" class="returnBtn" ref="return" @click="goBack()">返回</el-button>
        <!--</router-link>-->


        <h2>表A2-联系信息与危险因素调查表</h2>
      </div>
      <el-form :model="insertForm" :rules="rules" ref="insertForm" :label-position="labelPosition">
        <p class="title">项目工作人员填写</p>
        <el-row>
          <el-col :span="12">
            <el-form-item label="调查日期" label-width="130px" prop="survey_date" >
              <el-date-picker
                v-model="insertForm.survey_date"
                type="date"
                size="small"
                ref="survey_date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="调查员签名" label-width="130px" prop="investigator">
              <el-input v-model="insertForm.investigator" ref="investigator" auto-complete="off" size="small"  style="width:200px"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="筛查现场ID" label-width="130px">
              <span>{{insertForm.site_id | siteId}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="审核员签名" label-width="130px" prop="reviewer">
              <el-input v-model="insertForm.reviewer" ref="reviewer" auto-complete="off" size="small"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="筛查现场工作人员编码" label-width="170px" prop="investigator_code">
              <el-input v-model="insertForm.investigator_code" auto-complete="off" size="small" ref="investigator_code"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="SID：" label-width="130px">
              <span>{{insertForm.sid}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <p class="title">基本信息</p>
        <el-col :span="24">
          <el-form-item label="姓名：" label-width="80px">
            <span>{{insertForm.name}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="性别：" label-width="80px">
            <span>{{insertForm.sex | reverseSex}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="身份证号：" label-width="100px">
            <span>{{insertForm.idCard}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="联系电话：" label-width="100px">
            <span>{{insertForm.phone}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="其他联系电话（可为亲属号码）:" label-width="215px">(
            <el-form-item label="与本人关系:" label-width="98px" prop="contact_relationship">
              <el-input v-model="insertForm.contact_relationship"  ref="contact_relationship" auto-complete="off" size="small"
              ></el-input>
            </el-form-item> )
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="手机：" label-width="100px" prop="contact_cell_phone">
            <el-input v-model="insertForm.contact_cell_phone" auto-complete="off" ref="contact_cell_phone" size="small"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="固定电话：" label-width="100px" prop="contact_area">
            <el-input v-model="insertForm.contact_area" auto-complete="off" ref="contact_area" size="small" style="width: 70px
           ;"
            ></el-input>
          </el-form-item>-
          <el-form-item label=""  prop="contact_phone">
            <el-input v-model="insertForm.contact_phone" ref="contact_phone" auto-complete="off" size="small" style="width: 120px"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="常住地址：" label-width="100px">
            <span>{{insertForm.address}}</span>
          </el-form-item>
        </el-col>
        <p class="title">第一部分  一般信息</p>
        <el-col :span="24">
          <el-form-item label="1.1 您的身高：" label-width="120px" prop="height">
            <el-input v-model="insertForm.height" auto-complete="off" size="small"  ref="height"
            ></el-input>
          </el-form-item>
          <span>厘米</span>
        </el-col>
        <el-col :span="24">
          <el-form-item label="1.2 您的体重：" label-width="120px" prop="weight">
            <el-input v-model="insertForm.weight" auto-complete="off" size="small"  ref="weight"
            ></el-input>
          </el-form-item>
          <span>公斤</span>
        </el-col>
        <el-col :span="24">
          <el-form-item label="1.3 您的腰围：" label-width="120px" prop="yao_wei">
            <el-input v-model="insertForm.yao_wei" auto-complete="off" size="small" ref="yao_wei"
            ></el-input>
          </el-form-item>
          <span>厘米</span>
        </el-col>
        <el-col :span="24">
          <el-form-item label="1.4 您的最高学历是：" prop="education">
            <div class="indent">
              <el-radio-group v-model="insertForm.education">
                <el-radio :label="1" ref="education">未正式上过学</el-radio>
                <el-radio :label="2">小学</el-radio>
                <el-radio :label="3">初中</el-radio>
                <el-radio :label="4">高中/中专</el-radio>
                <el-radio :label="5">大学/大专</el-radio>
                <el-radio :label="6">研究生及以上</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="1.5 您目前的婚姻状况：" prop="marriage">
            <div class="indent">
              <el-radio-group v-model="insertForm.marriage" >
                <el-radio :label="1" ref="marriage">未婚</el-radio>
                <el-radio :label="2">同居（不在婚但有伴侣）</el-radio>
                <el-radio :label="3">已婚</el-radio>
                <el-radio :label="4">离婚（不在婚但有伴侣）</el-radio>
                <el-radio :label="5">丧偶（不在婚但有伴侣）</el-radio>
                <el-radio :label="6">其它</el-radio>
              </el-radio-group>
              <el-form-item class="indent" prop="marriage_other" style="width: 80px">
                <el-input v-model="insertForm.marriage_other" :disabled="insertForm.marriage != '6'" auto-complete="off" ref="marriage_other"
                          size="small"
                ></el-input>
              </el-form-item>
            </div>
          </el-form-item>
        </el-col>
        <p class="title">第二部分  肠道疾病和肠道检查史</p>
        <el-col :span="24">
          <el-form-item label="2.1" prop="item_2_1">
            <div style="width: 400px;">您<u style="font-weight: 600">现在</u>是否存在腹部不适或其他肠道异常的症状</div>
            <!--<span>2.1您<u style="font-weight: 700;">现在</u>是否存在腹部不适或其他肠道异常的症状</span>-->
            <div class="indent">
              <el-radio-group v-model="insertForm.item_2_1">
                <el-radio :label="1" ref="item_2_1">否</el-radio>
                <br>
                <el-radio :label="2" class="radio">是</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>
        </el-col>
        <div v-if="insertForm.item_2_1 != '1'">
          <el-col :span="24">
            <el-form-item label="2.1.1 肠道的疼痛或异常症状出现的时间？" label-width="290px" class="indent2" prop="item_2_1_1">
              <el-date-picker
                v-model="insertForm.item_2_1_1"
                type="date"
                :disabled="insertForm.item_2_1!='2'"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                size="small"
                ref="item_2_1_1"
                placeholder="选择日期"
                :picker-options="pickerOptions1">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item class="indent2" prop="item_2_1_2" label="2.1.2 主要的症状为？">
              <br>
              <div class="indent">
                <el-checkbox-group v-model="insertForm.item_2_1_2" :disabled="insertForm.item_2_1 != '2'" @change="item_2_1_2Change">
                  <el-checkbox label="腹痛" ref="item_2_1_2" v-model="insertForm.item_2_1_2_1" ></el-checkbox>
                  <br>
                  <el-checkbox label="排便异常（腹泻、便秘、大便不成形等）" v-model="insertForm.item_2_1_2_2"></el-checkbox>
                  <br>
                  <el-checkbox label="便血（肉眼可见）" v-model="insertForm.item_2_1_2_3" ></el-checkbox>
                  <br>
                  <el-checkbox label="其他（请具体阐明）" v-model="insertForm.item_2_1_2_4"></el-checkbox>
                  <el-form-item label="" prop="item_2_1_2_4_other" style="margin-bottom: 20px;">
                    <el-input v-model="insertForm.item_2_1_2_4_other" :disabled="item_2_1_2_show"
                              auto-complete="off" size="small" ref="item_2_1_2_4_other"
                    ></el-input>
                  </el-form-item>
                </el-checkbox-group>
              </div>
            </el-form-item>
          </el-col>
        </div>
        <el-col :span="24">
          <el-form-item label="2.2 您是否曾经由于肠道疾病而服用药物？" prop="item_2_2">
            <div class="indent">
              <br>
              <el-radio-group v-model="insertForm.item_2_2" >
                <el-radio :label="1" ref="item_2_2">否</el-radio>
                <br>
                <el-radio :label="2" class="radio">是，药物的名称为</el-radio>
                <el-form-item label="" labelWidth="20px" prop="item_2_2_1">
                  <el-input v-model="insertForm.item_2_2_1" :disabled="insertForm.item_2_2 != '2'" auto-complete="off"
                            size="small" ref="item_2_2_1"
                  ></el-input>
                </el-form-item>
              </el-radio-group>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="2.3 " prop="item_2_3" >
            <div style="width:400px">您是否<u style="font-weight: 600">曾经</u>由于肠道不适而去医院做过检查？</div>
            <div class="indent">
              <el-radio-group v-model="insertForm.item_2_3" >
                <el-radio :label="1" ref="item_2_3">否</el-radio>
                <br>
                <el-radio :label="2" class="radio">是</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>
        </el-col>
        <div v-if="insertForm.item_2_3 != '1'">
          <el-col :span="24">
            <el-form-item label="2.3.1 检查的项目为" label-width="180px" class="indent2" prop="item_2_3_1">
              <el-input v-model="insertForm.item_2_3_1" auto-complete="off"  :disabled="insertForm.item_2_3 != '2'" size="small" ref="item_2_3_1"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="2.3.2 最后一次检查的时间为" label-width="200px" class="indent2" prop="item_2_3_2">
              <el-date-picker
                v-model="insertForm.item_2_3_2"
                type="date"
                ref="item_2_3_2"
                size="small"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                :disabled="insertForm.item_2_3 != '2'"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </div>
        <el-col :span="24">
          <el-form-item label="2.4" prop="item_2_4">
            <div style="width:400px;">您是否<u style="font-weight: 600">曾经</u>做过<u style="font-weight: 600">结肠镜</u>检查？</div>
            <div class="indent">
              <el-radio-group v-model="insertForm.item_2_4">
                <el-radio :label="1" ref="item_2_4">否</el-radio>
                <br>
                <el-radio :label="2" class="radio">是</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>
        </el-col>
        <div v-if="insertForm.item_2_4 != '1'">
          <el-col :span="24">
            <el-form-item label="2.4.1 上一次肠镜检查的时间为" label-width="220px" class="indent2" prop="item_2_4_1">
              <el-date-picker
                v-model="insertForm.item_2_4_1"
                type="date"
                size="small"
                ref="item_2_4_1"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                :disabled="insertForm.item_2_4 != '2'"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="2.4.2 总共做过几次肠镜？" label-width="200px" class="indent2" prop="item_2_4_2">
              <el-input v-model="insertForm.item_2_4_2"  :disabled="insertForm.item_2_4 != '2'" ref="item_2_4_2" auto-complete="off" size="small"
              ></el-input>
            </el-form-item>
            次
          </el-col>
          <el-col :span="24">
            <el-form-item class="indent2" label=" 2.4.3 " prop="item_2_4_3">
              <div style="width:400px;">是否在结肠镜检查中发现<u style="font-weight: 600">大肠息肉 / 腺瘤</u>？</div>
              <div class="indent">
                <el-radio-group v-model="insertForm.item_2_4_3"  :disabled="insertForm.item_2_4 != '2'">
                  <el-radio :label="1" ref="item_2_4_3">否</el-radio>
                  <el-radio :label="2" class="radio">是</el-radio>
                  <el-radio :label="3" class="radio">不清楚</el-radio>
                </el-radio-group>
              </div>
            </el-form-item>
          </el-col>
        </div>
        <p class="title">第三部分  药物史</p>
        <el-form-item label="3.1 "
                      prop="item_3_1">
          <div style="width:800px;"><u style="font-weight: 600">镇痛药或者抗风湿类药物</u>：您是否偶尔或规律服用镇痛药或抗风湿类药物（例如：阿司匹林、对乙酰氨基酚、消炎痛、扶他林、扑热息痛、布洛芬等）？</div>
          <div class="indent">
            <el-radio-group v-model="insertForm.item_3_1" >
              <el-radio class='radio' ref="item_3_1" :label="1">否</el-radio>
              <br>
              <el-radio class='radio' :label="2">是，偶尔</el-radio>
              <br>
              <el-radio class='radio' :label="3">是，规律服用（每周大于1次)</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <div v-if="insertForm.item_3_1 != '1'">
          <el-col :span="24">
            <el-form-item label="3.1.1 总共服用的年数" label-width="180px" class="indent2" prop="item_3_1_1">
              <el-input v-model.number="insertForm.item_3_1_1" ref="item_3_1_1" :disabled="insertForm.item_3_1 != '2' && insertForm.item_3_1 != '3'" auto-complete="off"
                        size="small"
              ></el-input>
            </el-form-item>
            年
          </el-col>
          <el-col :span="24">

            <el-form-item class="indent2" label=" 3.1.2 " prop="item_3_1_2">
              <div style="width:400px;">您<u style="font-weight: 600">现在</u>是否正在服用镇痛药或抗风湿类药物？</div>
              <el-radio-group v-model="insertForm.item_3_1_2" :disabled="insertForm.item_3_1 != '2'&& insertForm.item_3_1 != '3'">
                <el-radio :label="1" ref="item_3_1_2">是，药物名称为</el-radio>
                <el-form-item labelWidth="20px" prop="item_3_1_2_1">
                  <el-input v-model="insertForm.item_3_1_2_1" ref="item_3_1_2_1" :disabled="insertForm.item_3_1_2 != '1'" auto-complete="off"
                            size="small"
                  ></el-input>
                </el-form-item>
                <br>
                <el-radio :label="2">否 上次服用的年份为？</el-radio>
                <el-form-item prop="item_3_1_2_2" labelWidth="20px">
                  <el-input v-model.number="insertForm.item_3_1_2_2" ref="item_3_1_2_2" :disabled="insertForm.item_3_1_2 != '2'"
                            auto-complete="off"
                            size="small"></el-input>
                </el-form-item>
                年
              </el-radio-group>
            </el-form-item>
          </el-col>
        </div>
        <el-form-item label=" 3.2 " prop="item_3_2">
          <div style="width:800px;"><u style="font-weight: 600">抗凝血药物</u>：您是否偶尔或规律服用过抗凝血药物（例如：华法林、肝素、达比加群、通心络等）?</div>
          <div class="indent">
            <el-radio-group v-model="insertForm.item_3_2">
              <el-radio :label="1" class="radio" ref="item_3_2">否</el-radio>
              <br>
              <el-radio :label="2" class="radio">是，偶尔</el-radio>
              <br>
              <el-radio :label="3" class="radio">是，规律服用（每周大于1次)</el-radio>
            </el-radio-group>
          </div>

        </el-form-item>
        <div v-if="insertForm.item_3_2 != '1'">
          <el-col :span="24">
            <el-form-item label="3.2.1 总共服用的年数" label-width="180px" class="indent2" prop="item_3_2_1">
              <el-input v-model.number="insertForm.item_3_2_1" ref="item_3_2_1" :disabled="insertForm.item_3_2 != '2' && insertForm.item_3_2 != '3'" auto-complete="off"
                        size="small"></el-input>
            </el-form-item>
            年
          </el-col>
          <el-col :span="24">
            <el-form-item label="3.2.2 " class="indent2" prop="item_3_2_2">
              <div style="width:400px;">您<u style="font-weight: 600">现在</u>是否正在服用抗凝血药物？</div>
              <el-radio-group v-model="insertForm.item_3_2_2" :disabled="insertForm.item_3_2 != '2' && insertForm.item_3_2 != '3'">
                <el-radio :label="1" ref="item_3_2_2">是，药物名称为</el-radio>
                <el-form-item labelWidth="20px" prop="item_3_2_2_1">
                  <el-input v-model="insertForm.item_3_2_2_1" ref="item_3_2_2_1" :disabled="insertForm.item_3_2_2 != '1'" auto-complete="off"
                            size="small"
                  ></el-input>
                </el-form-item>
                <br>
                <el-radio :label="2">否 上次服用的年份为？</el-radio>
                <el-form-item prop="item_3_2_2_2" labelWidth="20px">
                  <el-input v-model.number="insertForm.item_3_2_2_2" ref="item_3_2_2_2" :disabled="insertForm.item_3_2_2 != '2'"
                            auto-complete="off" size="small"></el-input>
                </el-form-item>
                年
              </el-radio-group>
            </el-form-item>
          </el-col>
        </div>
        <div v-if="insertForm.sex == '2'">
          <el-form-item
            label="3.3"
            prop="item_3_3">
            <div style="width:800px;"><u style="font-weight: 600">激素替代治疗</u>：您是否<u style="font-weight: 600">曾经接受过或者目前正在</u>接受激素替代治疗（<u style="font-weight: 600">雌激素或雌 / 孕激素联合治疗</u>，给药途径包括口服、皮贴、涂抹霜剂或凝胶、经阴道使用的霜、片、栓、硅胶环等）?</div>

            <div class="indent">
              <el-radio-group v-model="insertForm.item_3_3">
                <el-radio :label="1" ref="item_3_3">否</el-radio>
                <br>
                <el-radio :label="2">是，总共服药年数</el-radio>
                <el-form-item class="indent" prop="item_3_3_years">
                  <el-input v-model="insertForm.item_3_3_years"  ref="item_3_3_years" :disabled="insertForm.item_3_3 != '2'" auto-complete="off"
                            size="small"></el-input>
                </el-form-item>
              </el-radio-group>
            </div>
          </el-form-item>
          <div v-if="insertForm.item_3_3 != '1'">
            <el-col :span="24">
              <p class="label indent2">
              </p>
              <el-form-item label=" 3.3.1" class="indent2" prop="item_3_3_1">
                <div style="width:400px;">您<u style="font-weight: 600">现在</u>是否正在接受激素替代治疗？</div>
                <el-radio-group v-model="insertForm.item_3_3_1" :disabled="insertForm.item_3_3 != '2'"
                                 prop="item_3_3_1">
                  <el-radio :label="1" ref="item_3_3_1">是，药物名称为</el-radio>
                  <el-form-item labelWidth="20px" prop="item_3_3_1_1">
                    <el-input v-model="insertForm.item_3_3_1_1" :disabled="insertForm.item_3_3_1 != '1'" auto-complete="off"
                              size="small" ref="item_3_3_1_1"
                    ></el-input>
                  </el-form-item>
                  <br>
                  <el-radio :label="2">否 上次服用的年份为？</el-radio>
                  <el-form-item prop="item_3_3_1_2" labelWidth="20px">
                    <el-input v-model.number="insertForm.item_3_3_1_2" ref="item_3_3_1_2" :disabled="insertForm.item_3_3_1 != '2'"
                              auto-complete="off" size="small"></el-input>
                  </el-form-item>
                  年
                </el-radio-group>
              </el-form-item>
            </el-col>
          </div>
        </div>
        <p class="title">第四部分  生活方式和习惯</p>
        <el-col :span="24">
          <div style="height:20px;line-height:20px;font-size:20px;margin-top:10px;font-weight:700">
            <span><u>A、吸烟和被动吸烟</u></span>
          </div>
        </el-col>
        <el-col :span="24">
          <el-form-item label="4.1 您是否曾经吸烟？" prop="item_4_1">
            <div class="indent">
              <el-radio-group v-model="insertForm.item_4_1"  >
                <el-radio :label="1" class="radio" ref="item_4_1">不吸烟</el-radio>
                <br>
                <el-radio :label="2" class="radio">吸烟</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>
        </el-col>
        <div v-if="insertForm.item_4_1 != '1'">
          <el-col :span="24">
            <el-form-item label="4.2 您首次吸烟的年龄为？"  prop="item_4_2">
              <el-input v-model.number="insertForm.item_4_2" auto-complete="off" size="small"
                        ref="item_4_2"></el-input>
            </el-form-item>
            <span>岁</span>
          </el-col>
          <el-col :span="24">
            <el-form-item label="4.3 您最近的吸烟频率如何？" prop="item_4_3">
              <div class="indent">
                <el-radio-group v-model="insertForm.item_4_3" >
                  <el-radio :label="1" class="radio" ref="item_4_3">每天</el-radio>
                  <br>
                  <el-radio :label="2" class="radio">偶尔吸烟</el-radio>
                  <br>
                  <el-radio :label="3" class="radio">已戒烟</el-radio>
                </el-radio-group>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="insertForm.item_4_3 == '3'">
            <el-form-item class="indent2" label="4.3.1 如果已经戒烟，您最后一次吸烟是什么时候？" prop="item_4_3_1">
              <el-radio-group v-model="insertForm.item_4_3_1">
                <el-radio :label="1" class="radio" ref="item_4_3_1">半年前</el-radio>
                <br>
                <el-radio :label="2" class="radio">半年到4年前</el-radio>
                <br>
                <el-radio :label="3" class="radio">4年到10年前</el-radio>
                <br>
                <el-radio :label="4" class="radio">10年到15年前</el-radio>
                <br>
                <el-radio :label="5" class="radio">15年或更久以前</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="4.4" prop="item_4_4">
              <el-col :span="8">
                <div style="width:400px;">您<u style="font-weight: 600">总共</u>吸烟的年数为？</div></el-col>
              <el-col :span="14">
                <el-input v-model.number="insertForm.item_4_4" auto-complete="off" size="small" style="width: 80px;" ref="item_4_3"
                ></el-input><span>年</span>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="4.5"  prop="item_4_5">
              <el-col :span="16">
                <div style="width:360px;display: inline-block;"> 您现在/过去吸烟时<u style="font-weight: 600">平均每天</u>吸烟的支数为？ </div>
              </el-col>
              <el-col :span="6">
                <el-input v-model.number="insertForm.item_4_5"  auto-complete="off" size="small" style="width: 80px;" ref="item_4_5"></el-input> <span>支</span>
              </el-col>
            </el-form-item>

          </el-col>
        </div>
        <el-col :span="24">
          <el-form-item prop="item_4_6" label="4.6 您是否（正在或曾经）和吸烟者一同居住？">
            <div class="indent">
            <el-radio-group v-model="insertForm.item_4_6" prop="item_4_6" >
              <el-radio :label="2" class="radio" ref="item_4_6">否</el-radio>
              <br>
              <el-radio :label="1" class="radio">是</el-radio>
            </el-radio-group>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="item_4_7" label="4.7 您工作过的室内场所中是否有人经常吸烟？">
            <div class="indent">
            <el-radio-group v-model="insertForm.item_4_7" prop="item_4_7">
              <el-radio :label="2" class="radio" ref="item_4_7">否</el-radio>
              <br>
              <el-radio :label="1" class="radio">是</el-radio>
            </el-radio-group>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="4.8 吸二手烟的年数（与研究对象一起生活的家人每天吸烟，一起生活的年数，无则填0 )" label-width="570px" prop="item_4_8">
            <el-input v-model.number="insertForm.item_4_8" :disabled="insertForm.item_4_6 == '2'" auto-complete="off" size="small" ref="item_4_8"
            ></el-input>
          </el-form-item>
          <span>年</span>
        </el-col>
        <el-col :span="24">
          <div style="height:20px;line-height:20px;font-size:20px;margin-top:10px;font-weight:700">
            <span><u>B、饮酒</u></span>
          </div>
        </el-col>

        <el-col :span="24">
          <el-form-item label="4.9 您多长时间饮一次酒 ？" prop="item_4_9">
            <div class="indent">
              <el-radio-group v-model="insertForm.item_4_9">
                <el-radio :label="1" class="radio" ref="item_4_9">从不饮酒</el-radio>
                <br>
                <el-radio :label="2" class="radio">每月1次或更少</el-radio>
                <br>
                <el-radio :label="3" class="radio">每月2次-4次</el-radio>
                <br>
                <el-radio :label="4" class="radio">每周2次-3次</el-radio>
                <br>
                <el-radio :label="5" class="radio">每周4次及以上</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="insertForm.item_4_9 != '1'">
          <el-form-item prop="item_4_10"
                        label="4.10 ">
            <div style="width:800px;"><u style="font-weight: 600">平均每周</u>饮酒含多少单位酒精？（1单位酒精约为：350毫升啤酒，或150毫升葡萄酒，或50毫升（1两）白酒；饮两种及以上类型酒时酒精量累加）</div>
            <div class="indent">
              <el-radio-group v-model="insertForm.item_4_10">
                <el-radio class="radio" :label="1" ref="item_4_10">1单位及以下</el-radio>
                <br/>
                <el-radio class="radio" :label="2">2-3单位</el-radio>
                <br/>
                <el-radio class="radio" :label="3">4单位</el-radio>
                <br/>
                <el-radio class="radio" :label="4">5-7单位</el-radio>
                <br/>
                <el-radio class="radio" :label="5">8单位及以上</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <div style="height:20px;line-height:20px;font-size:20px;margin-top:10px;font-weight:700">
            <span><u>C、饮食</u></span>
          </div>
        </el-col>
        <p class="label">4.11 在过去<u style="font-weight:700">12个月</u>中，您以下食物的食用频率如何？</p>
        <p style="font-size:12px;">（填写说明：<u style="font-weight: 600">请在符合描述的方格中打钩</u>）</p>
        <table class="foodTable">
          <tr>
            <th>过去12个月</th>
            <th>>1次/天</th>
            <th>1次/天</th>
            <th>>1次/周</th>
            <th>1次/周</th>
            <th>≈1次/月</th>
            <th>未吃</th>
          </tr>
          <tr>
            <td class="left">肉类（猪、牛、羊肉等)</td>
            <td>
              <el-radio v-model="insertForm.item_4_11_1" id="item_4_11_1" ref="item_4_11_1" :label="1"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_1" :label="2"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_1" :label="3"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_1" :label="4"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_1" :label="5"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_1" :label="6"><span style="display: none">www</span></el-radio>
            </td>
            <td style="border: none;color: red;font-size: 12px;text-align: left;padding-left: 20px;"
                v-show="item_4_11_1_radioState">
              未选择
            </td>
          </tr>
          <tr>
            <td class="left">鱼/禽肉（鸡、鸭、鹅肉等）</td>
            <td>
              <el-radio v-model="insertForm.item_4_11_2" ref="item_4_11_2" :label="1"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_2" :label="2"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_2" :label="3"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_2" :label="4"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_2" :label="5"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_2" :label="6"><span style="display: none">www</span></el-radio>
            </td>
            <td style="border: none;color: red;font-size: 12px;text-align: left;padding-left: 20px;"
                v-show="item_4_11_2_radioState">
              未选择
            </td>
          </tr>
          <tr>
            <td class="left">蛋类（鸡蛋、鸭蛋等）</td>
            <td>
              <el-radio v-model="insertForm.item_4_11_3" ref="item_4_11_3" :label="1"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_3" :label="2"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_3" :label="3"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_3" :label="4"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_3" :label="5"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_3" :label="6"><span style="display: none">www</span></el-radio>
            </td>
            <td style="border: none;color: red;font-size: 12px;text-align: left;padding-left: 20px;"
                v-show="item_4_11_3_radioState">
              未选择
            </td>
          </tr>
          <tr>
            <td class="left">奶类（牛奶、羊奶）</td>
            <td>
              <el-radio v-model="insertForm.item_4_11_4" ref="item_4_11_4" :label="1"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_4" :label="2"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_4" :label="3"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_4" :label="4"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_4" :label="5"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_4" :label="6"><span style="display: none">www</span></el-radio>
            </td>
            <td style="border: none;color: red;font-size: 12px;text-align: left;padding-left: 20px;"
                v-show="item_4_11_4_radioState">
              未选择
            </td>
          </tr>
          <tr>
            <td class="left">香肠</td>
            <td>
              <el-radio v-model="insertForm.item_4_11_5" ref="item_4_11_5" :label="1"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_5" :label="2"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_5" :label="3"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_5" :label="4"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_5" :label="5"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_5" :label="6"><span style="display: none">www</span></el-radio>
            </td>
            <td style="border: none;color: red;font-size: 12px;text-align: left;padding-left: 20px;"
                v-show="item_4_11_5_radioState">
              未选择
            </td>
          </tr>
          <tr>
            <td class="left">细粮（大米、面食）</td>
            <td>
              <el-radio v-model="insertForm.item_4_11_6" ref="item_4_11_6" :label="1"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_6" :label="2"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_6" :label="3"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_6" :label="4"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_6" :label="5"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_6" :label="6"><span style="display: none">www</span></el-radio>
            </td>
            <td style="border: none;color: red;font-size: 12px;text-align: left;padding-left: 20px;"
                v-show="item_4_11_6_radioState">
              未选择
            </td>
          </tr>
          <tr>
            <td class="left">粗粮（五谷杂粮，包括小米、玉米、高粱等）</td>
            <td>
              <el-radio v-model="insertForm.item_4_11_7" ref="item_4_11_7" :label="1"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_7" :label="2"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_7" :label="3"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_7" :label="4"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_7" :label="5"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_7" :label="6"><span style="display: none">www</span></el-radio>
            </td>
            <td style="border: none;color: red;font-size: 12px;text-align: left;padding-left: 20px;"
                v-show="item_4_11_7_radioState">
              未选择
            </td>
          </tr>
          <tr>
            <td class="left">水果</td>
            <td>
              <el-radio v-model="insertForm.item_4_11_8" ref="item_4_11_8" :label="1"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_8" :label="2"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_8" :label="3"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_8" :label="4"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_8" :label="5"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_8" :label="6"><span style="display: none">www</span></el-radio>
            </td>
            <td style="border: none;color: red;font-size: 12px;text-align: left;padding-left: 20px;"
                v-show="item_4_11_8_radioState">
              未选择
            </td>
          </tr>
          <tr>
            <td class="left">新鲜蔬菜</td>
            <td>
              <el-radio v-model="insertForm.item_4_11_9" ref="item_4_11_9" :label="1"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_9" :label="2"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_9" :label="3"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_9" :label="4"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_9" :label="5"><span style="display: none">www</span></el-radio>
            </td>
            <td>
              <el-radio v-model="insertForm.item_4_11_9" :label="6"><span style="display: none">www</span></el-radio>
            </td>
            <td style="border: none;color: red;font-size: 12px;text-align: left;padding-left: 20px;"
                v-show="item_4_11_9_radioState">
              未选择
            </td>

          </tr>
        </table>
        <el-col :span="24">
          <div style="height:20px;line-height:20px;font-size:20px;margin-top:10px;font-weight:700">
            <span><u>D、运动</u></span>
          </div>
        </el-col>
        <p class="label">4.12 在过去<u style="font-weight: 600">12个月</u>中，您每周从事以下活动的时间为多少？</p>
        <p style="font-size:12px;">（填写说明：<u style="font-weight: 600">请您填写每周从事相应活动的时间，30分钟以内算0.5小时，30-59分钟算1小时，未做过相应活动请填写0</u>）</p>
        <table class="foodTable activeTime">
          <tr>
            <th>活动类型</th>
            <th>小时/周</th>
          </tr>
          <tr>
            <td class="left">照顾其他成人</td>
            <td>
              <el-form-item prop="item_4_12_1" :show-message="false">
                <el-input v-model.number="insertForm.item_4_12_1" ref="item_4_12_1" auto-complete="off" size="small"
                ></el-input>
              </el-form-item>
              <span>小时</span>
            </td>
          </tr>
          <tr>
            <td class="left">照顾婴儿/儿童</td>
            <td>
              <el-form-item prop="item_4_12_2" :show-message="false">
                <el-input v-model.number="insertForm.item_4_12_2" ref="item_4_12_2" auto-complete="off" size="small"
                ></el-input>
              </el-form-item>
              <span>小时</span>
            </td>
          </tr>
          <tr>
            <td class="left">中等强度体力家务劳动（包括扫地、擦玻璃、洗衣服、做饭、整理房间等）</td>
            <td>
              <el-form-item prop="item_4_12_3" :show-message="false">
                <el-input v-model.number="insertForm.item_4_12_3" ref="item_4_12_3" auto-complete="off" size="small"
                ></el-input>
              </el-form-item>
              <span>小时</span>
            </td>
          </tr>
          <tr>
            <td class="left">高强度体力家务劳动（包括搬运重物、砍柴、扫雪、拖地板等）</td>
            <td>
              <el-form-item prop="item_4_12_4" :show-message="false">
                <el-input v-model.number="insertForm.item_4_12_4" ref="item_4_12_4" auto-complete="off" size="small"
                ></el-input>
              </el-form-item>
              <span>小时</span>
            </td>
          </tr>
          <tr>
            <td class="left">球类运动（篮球、乒乓球、羽毛球等）</td>
            <td>
              <el-form-item prop="item_4_12_5" :show-message="false">
                <el-input v-model.number="insertForm.item_4_12_5" ref="item_4_12_5" auto-complete="off" size="small"
                ></el-input>
              </el-form-item>
              <span>小时</span>
            </td>
          </tr>
          <tr>
            <td class="left">散步或慢跑</td>
            <td>
              <el-form-item prop="item_4_12_6" :show-message="false">
                <el-input v-model.number="insertForm.item_4_12_6" ref="item_4_12_6" auto-complete="off" size="small"
                ></el-input>
              </el-form-item>
              <span>小时</span>
            </td>
          </tr>
          <tr>
            <td class="left">骑自行车</td>
            <td>
              <el-form-item prop="item_4_12_7" :show-message="false">
                <el-input v-model.number="insertForm.item_4_12_7" ref="item_4_12_7" auto-complete="off" size="small"
                ></el-input>
              </el-form-item>
              <span>小时</span>
            </td>
          </tr>
          <tr>
            <td class="left">高强度身体锻炼（包括游泳、爬山、器械锻炼等）</td>
            <td>
              <el-form-item prop="item_4_12_8" :show-message="false">
                <el-input v-model.number="insertForm.item_4_12_8" ref="item_4_12_8" auto-complete="off" size="small"
                ></el-input>
              </el-form-item>
              <span>小时</span>
            </td>
          </tr>
          <tr>
            <td class="left">低强度身体锻炼（包括太极、瑜伽等）</td>
            <td>
              <el-form-item prop="item_4_12_9" :show-message="false">
                <el-input v-model.number="insertForm.item_4_12_9" ref="item_4_12_9" auto-complete="off" size="small"
                ></el-input>
              </el-form-item>
              <span>小时</span>
            </td>
          </tr>
          <tr>
            <td class="left">坐着看电视或听收音机</td>
            <td>
              <el-form-item prop="item_4_12_10" :show-message="false">
                <el-input v-model.number="insertForm.item_4_12_10" ref="item_4_12_10" auto-complete="off" size="small"
                ></el-input>
              </el-form-item>
              <span>小时</span>
            </td>
          </tr>
        </table>
        <p class="title">第五部分  既往疾病史</p>
        <el-form-item prop="item_5_1" style="margin-bottom: 20px;" label="5.1 医生是否曾经诊断过您曾患过以下疾病？如果是，第一次患病是在何时？">
          <el-radio-group v-model="insertForm.item_5_1" @change="item_5_1">
            <el-radio :label="2" ref="item_5_1">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <table class="foodTable doctorDiagnosis ctable" v-if="insertForm.item_5_1 != '2'">
          <tr>
            <th>疾病或症状</th>
            <th>是否患过此病（1. 是 2. 否）</th>
            <th>确诊年龄（岁）</th>
          </tr>
          <tr>
            <td class="left">慢性腹泻*</td>
            <td>
              <el-form-item prop="item_5_1_1" :show-message="false">
                <el-input v-model="insertForm.item_5_1_1" ref="item_5_1_1" :disabled=" insertForm.item_5_1 !=1" auto-complete="off"
                          size="small"
                          class="item_5_2_table_width"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item prop="item_5_1_1_age" :show-message="false">
                <el-input v-model.number="insertForm.item_5_1_1_age" ref="item_5_1_1_age" :disabled="insertForm.item_5_1_1 != 1"
                          auto-complete="off" size="small"
                          class="item_5_2_age_table_width"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="left">慢性结肠炎</td>
            <td>
              <el-form-item prop="item_5_1_2" :show-message="false">
                <el-input v-model="insertForm.item_5_1_2" ref="item_5_1_2" :disabled=" insertForm.item_5_1 !=1" auto-complete="off"
                          size="small"
                          class="item_5_2_table_width"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item prop="item_5_1_2_age" :show-message="false">
                <el-input v-model.number="insertForm.item_5_1_2_age" ref="item_5_1_2_age" :disabled="insertForm.item_5_1_2 != 1"
                          auto-complete="off" size="small"
                          class="item_5_2_age_table_width"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="left">慢性便秘**</td>
            <td>
              <el-form-item prop="item_5_1_3" :show-message="false">
                <el-input v-model="insertForm.item_5_1_3" ref="item_5_1_3" :disabled=" insertForm.item_5_1 !=1" auto-complete="off"
                          size="small"
                          class="item_5_2_table_width"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item prop="item_5_1_3_age" :show-message="false">
                <el-input v-model.number="insertForm.item_5_1_3_age" ref="item_5_1_3_age" :disabled="insertForm.item_5_1_3 != 1"
                          auto-complete="off" size="small"
                          class="item_5_2_age_table_width"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="left">粘液和/或血便</td>
            <td>
              <el-form-item prop="item_5_1_4" :show-message="false">
                <el-input v-model="insertForm.item_5_1_4" ref="item_5_1_4" :disabled=" insertForm.item_5_1 !=1" auto-complete="off"
                          size="small"
                          class="item_5_2_table_width"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item prop="item_5_1_4_age" :show-message="false">
                <el-input v-model.number="insertForm.item_5_1_4_age" ref="item_5_1_4_age" :disabled="insertForm.item_5_1_4 != 1"
                          auto-complete="off" size="small"
                          class="item_5_2_age_table_width"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="left">肠息肉</td>
            <td>
              <el-form-item prop="item_5_1_5" :show-message="false">
                <el-input v-model="insertForm.item_5_1_5" ref="item_5_1_5" :disabled=" insertForm.item_5_1 !=1" auto-complete="off"
                          size="small"
                          class="item_5_2_table_width"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item prop="item_5_1_5_age" :show-message="false">
                <el-input v-model.number="insertForm.item_5_1_5_age" ref="item_5_1_5_age" :disabled="insertForm.item_5_1_5 != 1"
                          auto-complete="off" size="small"
                          class="item_5_2_age_table_width"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="left">慢性阑尾炎或阑尾切除史</td>
            <td>
              <el-form-item prop="item_5_1_6" :show-message="false">
                <el-input v-model="insertForm.item_5_1_6" ref="item_5_1_6" :disabled=" insertForm.item_5_1 !=1" auto-complete="off"
                          size="small"
                          class="item_5_2_table_width"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item prop="item_5_1_6_age" :show-message="false">
                <el-input v-model.number="insertForm.item_5_1_6_age" ref="item_5_1_6_age" :disabled="insertForm.item_5_1_6 != 1"
                          auto-complete="off" size="small"
                          class="item_5_2_age_table_width"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="left">糖尿病</td>
            <td>
              <el-form-item prop="item_5_1_7" :show-message="false">
                <el-input v-model="insertForm.item_5_1_7" ref="item_5_1_7" :disabled=" insertForm.item_5_1 !=1" auto-complete="off"
                          size="small"
                          class="item_5_2_table_width"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item prop="item_5_1_7_age" :show-message="false">
                <el-input v-model.number="insertForm.item_5_1_7_age" ref="item_5_1_7_age" :disabled="insertForm.item_5_1_7 != 1"
                          auto-complete="off" size="small"
                          class="item_5_2_age_table_width"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="left">高血压</td>
            <td>
              <el-form-item prop="item_5_1_8" :show-message="false">
                <el-input v-model="insertForm.item_5_1_8" ref="item_5_1_8" :disabled=" insertForm.item_5_1 !=1" auto-complete="off"
                          size="small"
                          class="item_5_2_table_width"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item prop="item_5_1_8_age" :show-message="false">
                <el-input v-model.number="insertForm.item_5_1_8_age" ref="item_5_1_8_age" :disabled="insertForm.item_5_1_8 != 1"
                          auto-complete="off" size="small"
                          class="item_5_2_age_table_width"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="left">中风</td>
            <td>
              <el-form-item prop="item_5_1_9" :show-message="false">
                <el-input v-model="insertForm.item_5_1_9" ref="item_5_1_9" :disabled=" insertForm.item_5_1 !=1" auto-complete="off"
                          size="small"
                          class="item_5_2_table_width"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item prop="item_5_1_9_age" :show-message="false">
                <el-input v-model.number="insertForm.item_5_1_9_age" ref="item_5_1_9_age" :disabled="insertForm.item_5_1_9 != 1"
                          auto-complete="off" size="small"
                          class="item_5_2_age_table_width"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="left">心脏病或心衰</td>
            <td>
              <el-form-item prop="item_5_1_10" :show-message="false">
                <el-input v-model="insertForm.item_5_1_10" ref="item_5_1_10" :disabled=" insertForm.item_5_1 !=1" auto-complete="off"
                          size="small"
                          class="item_5_2_table_width"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item prop="item_5_1_10_age" :show-message="false">
                <el-input v-model.number="insertForm.item_5_1_10_age" ref="item_5_1_10_age" :disabled="insertForm.item_5_1_10 != 1"
                          auto-complete="off" size="small"
                          class="item_5_2_age_table_width"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
        <p class="label">* 慢性腹泻指近2年来腹泻累计持续超过3个月，每次发作持续时间在1周以上；</p>
        <p class="label">** 慢性便秘指近2年来便秘每年在2个月以上；</p>
        <el-col :span="24">
          <el-form-item label="5.2 您是否患过以下任何一种癌症？" prop="item_5_2">
            <el-radio-group v-model="insertForm.item_5_2"  @change="item_5_2">
              <el-radio :label="2" ref="item_5_2">否</el-radio>
              <el-radio :label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <table class="foodTable cancer" v-if="insertForm.item_5_2 != '2'">
          <tr>
            <th>疾病名称</th>
            <th>是否曾患此癌症 <br>（1. 是 2. 否）</th>
            <th>确诊年龄</th>
            <th>疾病名称</th>
            <th>是否曾患此癌症 <br>（1. 是 2. 否）</th>
            <th>确诊年龄</th>
          </tr>
          <tr>
            <td class="left">膀胱癌</td>
            <td>
              <el-form-item prop="item_5_2_1" :show-message="false">
                <el-input v-model="insertForm.item_5_2_1" :disabled=" insertForm.item_5_2 !=1" auto-complete="off"
                          size="small" ref="item_5_2_1"
                          class="item_5_2_table_width"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item prop="item_5_2_1_age" :show-message="false">
                <el-input v-model="insertForm.item_5_2_1_age" ref="item_5_2_1_age" :disabled="insertForm.item_5_2_1 != 1"
                          auto-complete="off"  class="item_5_2_age_table_width" size="small"
                ></el-input>
              </el-form-item>
            </td>
            <td class="left">肺癌</td>
            <td>
              <el-form-item prop="item_5_2_8" :show-message="false">
                <el-input v-model="insertForm.item_5_2_8" ref="item_5_2_8" :disabled=" insertForm.item_5_2 !=1" auto-complete="off"
                          size="small"
                          class="item_5_2_table_width"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item prop="item_5_2_8_age" :show-message="false">
                <el-input v-model="insertForm.item_5_2_8_age" ref="item_5_2_8_age" :disabled="insertForm.item_5_2_8 != 1"
                          auto-complete="off"  class="item_5_2_age_table_width" size="small"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="left">乳腺癌</td>
            <td>
              <el-form-item prop="item_5_2_2" :show-message="false">
                <el-input v-model="insertForm.item_5_2_2" ref="item_5_2_2" :disabled=" insertForm.item_5_2 !=1" auto-complete="off"
                          size="small"
                          class="item_5_2_table_width"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item prop="item_5_2_2_age" :show-message="false">
                <el-input v-model="insertForm.item_5_2_2_age" ref="item_5_2_2_age" :disabled="insertForm.item_5_2_2 != 1"
                          auto-complete="off"   class="item_5_2_age_table_width"size="small"
                ></el-input>
              </el-form-item>
            </td>
            <td class="left">口腔癌</td>
            <td>
              <el-form-item prop="item_5_2_9" :show-message="false">
                <el-input v-model="insertForm.item_5_2_9" ref="item_5_2_9" :disabled=" insertForm.item_5_2 !=1" auto-complete="off"
                          size="small"
                          class="item_5_2_table_width"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item prop="item_5_2_9_age" :show-message="false">
                <el-input v-model="insertForm.item_5_2_9_age" ref="item_5_2_9_age" :disabled="insertForm.item_5_2_9 != 1"
                          auto-complete="off"  class="item_5_2_age_table_width" size="small"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="left">子宫颈癌</td>
            <td>
              <el-form-item prop="item_5_2_3" :show-message="false">
                <el-input v-model="insertForm.item_5_2_3" ref="item_5_2_3" :disabled=" insertForm.item_5_2 !=1" auto-complete="off"
                          size="small"
                          class="item_5_2_table_width"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item prop="item_5_2_3_age" :show-message="false">
                <el-input v-model="insertForm.item_5_2_3_age" ref="item_5_2_3_age" :disabled="insertForm.item_5_2_3 != 1"
                          auto-complete="off"  class="item_5_2_age_table_width" size="small"
                ></el-input>
              </el-form-item>
            </td>
            <td class="left">鼻癌</td>
            <td>
              <el-form-item prop="item_5_2_10" :show-message="false">
                <el-input v-model="insertForm.item_5_2_10" ref="item_5_2_10" :disabled=" insertForm.item_5_2 !=1" auto-complete="off"
                          size="small"
                          class="item_5_2_table_width"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item prop="item_5_2_10_age" :show-message="false">
                <el-input v-model="insertForm.item_5_2_10_age" ref="item_5_2_10_age" :disabled="insertForm.item_5_2_10 != 1"
                          auto-complete="off" class="item_5_2_age_table_width" size="small"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="left">结直肠癌</td>
            <td>
              <el-form-item prop="item_5_2_4" :show-message="false">
                <el-input v-model="insertForm.item_5_2_4" ref="item_5_2_4" :disabled=" insertForm.item_5_2 !=1" auto-complete="off"
                          size="small"
                          class="item_5_2_table_width"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item prop="item_5_2_4_age" :show-message="false">
                <el-input v-model="insertForm.item_5_2_4_age" ref="item_5_2_4_age" :disabled="insertForm.item_5_2_4 != 1"
                          auto-complete="off"  class="item_5_2_age_table_width" size="small"
                ></el-input>
              </el-form-item>
            </td>
            <td class="left">胰腺癌</td>
            <td>
              <el-form-item prop="item_5_2_11" :show-message="false">
                <el-input v-model="insertForm.item_5_2_11" ref="item_5_2_11" :disabled=" insertForm.item_5_2 !=1" auto-complete="off"
                          size="small"
                          class="item_5_2_table_width"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item prop="item_5_2_11_age" :show-message="false">
                <el-input v-model="insertForm.item_5_2_11_age" ref="item_5_2_11_age" :disabled="insertForm.item_5_2_11 != 1"
                          auto-complete="off" class="item_5_2_age_table_width"  size="small"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="left">食管癌</td>
            <td>
              <el-form-item prop="item_5_2_5" :show-message="false">
                <el-input v-model="insertForm.item_5_2_5" ref="item_5_2_5" :disabled=" insertForm.item_5_2 !=1" auto-complete="off"
                          size="small"
                          class="item_5_2_table_width"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item prop="item_5_2_5_age" :show-message="false">
                <el-input v-model="insertForm.item_5_2_5_age" ref="item_5_2_5_age" :disabled="insertForm.item_5_2_5 != 1"
                          auto-complete="off"  class="item_5_2_age_table_width" size="small"
                ></el-input>
              </el-form-item>
            </td>
            <td class="left">胃癌</td>
            <td>
              <el-form-item prop="item_5_2_12" :show-message="false">
                <el-input v-model="insertForm.item_5_2_12" ref="item_5_2_12" :disabled=" insertForm.item_5_2 !=1" auto-complete="off"
                          size="small"
                          class="item_5_2_table_width"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item prop="item_5_2_12_age" :show-message="false">
                <el-input v-model="insertForm.item_5_2_12_age" ref="item_5_2_12_age" :disabled="insertForm.item_5_2_12 != 1"
                          auto-complete="off" class="item_5_2_age_table_width"  size="small"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="left">肾癌</td>
            <td>
              <el-form-item prop="item_5_2_6" :show-message="false">
                <el-input v-model="insertForm.item_5_2_6" ref="item_5_2_6" :disabled=" insertForm.item_5_2 !=1" auto-complete="off"
                          size="small"
                          class="item_5_2_table_width"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item prop="item_5_2_6_age" :show-message="false">
                <el-input v-model="insertForm.item_5_2_6_age" ref="item_5_2_6_age" :disabled="insertForm.item_5_2_6 != 1"
                          auto-complete="off"  class="item_5_2_age_table_width" size="small"
                ></el-input>
              </el-form-item>
            </td>
            <td class="left">甲状腺癌</td>
            <td>
              <el-form-item prop="item_5_2_13" :show-message="false">
                <el-input v-model="insertForm.item_5_2_13" ref="item_5_2_13" :disabled=" insertForm.item_5_2 !=1" auto-complete="off"
                          size="small"
                          class="item_5_2_table_width"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item prop="item_5_2_13_age" :show-message="false">
                <el-input v-model="insertForm.item_5_2_13_age" ref="item_5_2_13_age" :disabled="insertForm.item_5_2_13 != 1"
                          auto-complete="off"  class="item_5_2_age_table_width" size="small"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="left">喉癌</td>
            <td>
              <el-form-item prop="item_5_2_7" :show-message="false">
                <el-input v-model="insertForm.item_5_2_7" ref="item_5_2_7" :disabled=" insertForm.item_5_2 !=1" auto-complete="off"
                          size="small"
                          class="item_5_2_table_width"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item prop="item_5_2_7_age" :show-message="false">
                <el-input v-model="insertForm.item_5_2_7_age" ref="item_5_2_7_age" :disabled="insertForm.item_5_2_7 != 1"
                          auto-complete="off"  class="item_5_2_age_table_width" size="small"
                ></el-input>
              </el-form-item>
            </td>
            <td></td>
            <td>
            </td>
            <td>
            </td>
          </tr>
        </table>
        <el-form-item label='5.3 ' prop="item_5_3" >
          <p class="label" style="width: 400px">您的直系亲属是否患过<u style="font-weight: 600">结直肠癌</u>？</p>
          <el-radio-group v-model="insertForm.item_5_3" @change="item_5_3">
            <el-radio :label="2" ref="item_5_3">否</el-radio>
            <el-radio :label="3">不清楚</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <table class="foodTable activeTime" v-if="insertForm.item_5_3 != '2'">
          <tr>
            <th>直系亲属</th>
            <th>是否曾患此癌症 （1. 是 2. 否）</th>
            <th>患病年龄（岁）</th>
          </tr>
          <tr>
            <td class="left">父亲</td>
            <td>
              <el-form-item prop="item_5_3_1" :show-message="false">
                <el-input v-model="insertForm.item_5_3_1"
                          :disabled="insertForm.item_5_3 != 1" ref="item_5_3_1" auto-complete="off" size="small"
                          class="item_5_2_table_width"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item prop="item_5_3_1_age"  :show-message="false">
                <el-input v-model="insertForm.item_5_3_1_age" :disabled="insertForm.item_5_3_1 != 1"
                           ref="item_5_3_1_age" auto-complete="off"  class="item_5_2_age_table_width" size="small"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="left">母亲</td>
            <td>
              <el-form-item  prop="item_5_3_2" :show-message="false">
                <el-input v-model="insertForm.item_5_3_2"
                          :disabled="insertForm.item_5_3 != 1" auto-complete="off" size="small"
                           ref="item_5_3_2" class="item_5_2_table_width"></el-input>

              </el-form-item>
            </td>
            <td>
              <el-form-item prop="item_5_3_2_age" :show-message="false">
                <el-input v-model="insertForm.item_5_3_2_age" :disabled="insertForm.item_5_3_2 != 1"
                         ref="item_5_3_2_age" auto-complete="off"  class="item_5_2_age_table_width" size="small"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="left">兄弟，包括同父异母兄弟或同母异父兄弟</td>
            <td>
              <el-form-item  prop="item_5_3_3" :show-message="false">
                <el-input v-model="insertForm.item_5_3_3"
                         ref="item_5_3_3" :disabled="insertForm.item_5_3 != 1" auto-complete="off"
                          size="small"
                          class="item_5_2_table_width"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item prop="item_5_3_3_age" :show-message="false">
                <el-input v-model="insertForm.item_5_3_3_age" :disabled="insertForm.item_5_3_3 != 1"
                         ref="item_5_3_3_age" auto-complete="off"  class="item_5_2_age_table_width" size="small"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="left">姐妹，包括同父异母姐妹或同母异父姐妹</td>
            <td>
              <el-form-item  prop="item_5_3_4" :show-message="false">
                <el-input v-model="insertForm.item_5_3_4"
                          ref="item_5_3_4" :disabled="insertForm.item_5_3 != 1" auto-complete="off"
                          size="small"
                          class="item_5_2_table_width"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item prop="item_5_3_4_age" :show-message="false">
                <el-input v-model="insertForm.item_5_3_4_age" :disabled="insertForm.item_5_3_4 != 1"
                         ref="item_5_3_4_age" auto-complete="off"  class="item_5_2_age_table_width" size="small"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
        <div style="text-align: center;margin-top:20px">
          <el-button type="primary" @click="submitForm('insertForm')" ref="addBtn" id="buttonAtwoSave">提交</el-button>

          <!--<router-link to="home/home">-->
            <el-button @click="resetForm('insertForm')">取消</el-button>
          <!--</router-link>-->
        </div>

      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Right',
    data() {
      var contact_relationship = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必填'));
        } else if (!(/^[\u4e00-\u9fa5]*$/.test(value))) {
          callback(new Error('只能是汉字'))
        } else {
          callback();
        }
      };
      var validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('手机号不能为空'));
        } else if (!(/^\d{11}$/.test(value))) {
          callback(new Error('请输入11位手机号码'))
        } else {
          callback();
        }
      };
      var validatecontact_telephone = (rule, value, callback) => {
        if (value && !(/^\d{7,8}$/.test(value))) {
          callback(new Error('请输入7-8位座机号码'))
        } else {
          callback();
        }
      };
      var validatecontact_area = (rule, value, callback) => {
        if (value && !(/^\d{3,4}$/.test(value))) {
          callback(new Error('请输入3-4位区号'))
        } else {
          callback();
        }
      };
      var validateItem_2_4_2 = (rule, value, callback) => {
        if (value && !(/^\+?[1-9][0-9]*$/.test(value))) {
          callback(new Error('请输入正整数'))
        } else if (value * 1 < 1 || value * 1 > 20) {
          callback(new Error('次数：1-20之间'));
        }else {
          callback();
        }
      };
      var validateHeight = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必填'));
        } else if (!(/^\d*$/.test(value))) {
          callback(new Error('请填写数字'))
        } else if (value * 1 < 100 || value * 1 > 250) {
          callback(new Error('身高限制：100-250之间'));
        } else {
          callback();
        }
      };
      var validateWeight = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必填'));
        } else if (!(/^\d*$/.test(value))) {
          callback(new Error('只能是数字'))
        } else if (value * 1 < 10 || value * 1 > 200) {
          callback(new Error('体重：10-200之间'));
        } else {
          callback();
        }
      };
      var validateyaowei = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必填'));
        } else if (!(/^\d*$/.test(value))) {
          callback(new Error('只能是数字'))
        } else if (value * 1 < 10 || value * 1 > 200) {
          callback(new Error('腰围：10-150之间'));
        } else {
          callback();
        }
      };
      var validateItem_3_1_1 = (rule, value, callback) => {
        if (value === ''|| value === null) {
          callback();
        }else if (!(/^\+?[1-9][0-9]*$/.test(value))) {
          callback(new Error('请输入有效数字'));
        } else if (value * 1 < 1 || value * 1 > 100) {
          callback(new Error('年数：1-100之间'));
        } else {
          callback();
        }
      };
      let val = /(^[0-9]{4}$)/;
      var validateItem_3_1_2_2 = (rule, value, callback) => {
        if (value == '' || value == null) {
          callback();
        } else if (!val.test(value)) {
          callback(new Error('只能输入数字,并且为4位正确的年数'));
        } else {
          callback();
        }
      };
      var validateItem_4_2 = (rule, value, callback) => {
        if (!(/^\d*$/.test(value))) {
          callback(new Error('只能输入数字'));
        } else if (value * 1 < 1 || value * 1 > 74 ) {
          callback(new Error('在1-74之间'));
        } else {
          callback();
        }
      };
      var validateItem_4_8 = (rule, value, callback) => {
        if (!(/^\d*$/.test(value))) {
          callback(new Error('只能输入数字'));
        } else if (value * 1 < 0 || value * 1 > 74) {
          callback(new Error('在0-74之间'));
        } else {
          callback();
        }
      };
      var validateItem_4_5 = (rule, value, callback) => {
        if (!(/^\d*$/.test(value))) {
          callback(new Error('只能输入数字'));
        } else if (value * 1 < 1 || value * 1 > 80) {
          callback(new Error('在1-80之间'));
        } else {
          callback();
        }
      };
      var validateItem_4_12_1 = (rule, value, callback) => {
        if (!/^[0-9]+(\.5)*$/.test(value)) {
          callback(new Error('只能输入数字'));
        } else if ((parseInt(value) < 0 || parseInt(value) > 168)) {
          callback(new Error('年数在1-168之间'));
        } else {
          callback();
        }
      }
      var validateItem_5 = (rule, value, callback) => {
        if (!/^[0-9]*$/.test(value)) {
          callback(new Error('只能输入数字'));
        } else if ((parseInt(value) < 0 || parseInt(value) > 74)) {
          callback(new Error('年数在1-74之间'));

        } else {
          callback();
        }
      }
       var validateItem_5_num = (rule, value, callback) => {
        if (!/^[0-9]*$/.test(value)) {
          callback(new Error('只能输入数字'));
        }else {
          callback();
        }
      }



      var item_isyes = (items, is, ie) => {
        let b = false;
        for (let i = is; i <= ie; i++) {
          if (this.insertForm[items + i] == 1) {
            b = true;
            break;
          }
        }
        return b;
      }
      var validateitem_5_1 = (rule, value, callback) => {
        if (value == '1') {
          if (!item_isyes('item_5_1_', 1, 10)) {
            callback(new Error('请输入疾病或症状'));
          }
        }
        callback();
      }
      var item_5_1s = (rule, value, callback) => {
        if(value == ''){
          callback(new Error('必填'));
        }
        this.$refs.insertForm.validateField('item_5_1');
        callback();
      }
      var validateitem_5_2 = (rule, value, callback) => {
        if (value == '1') {
          if (!item_isyes('item_5_2_', 1, 13)) {
            callback(new Error('请输入疾病或症状'));
          }
        }
        callback();
      }
      var item_5_2s = (rule, value, callback) => {
        this.$refs.insertForm.validateField('item_5_2');
        callback();
      }
      var validateitem_5_3 = (rule, value, callback) => {
        if (value == '1') {
          if (!item_isyes('item_5_3_', 1, 4)) {
            callback(new Error('请输入亲属情况'));
          }
        }
        callback();
      }
      var item_5_3s = (rule, value, callback) => {
        this.$refs.insertForm.validateField('item_5_3');
        callback();
      }
      return {
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },

        item_4_11_1_radioState: false,
        item_4_11_2_radioState: false,
        item_4_11_3_radioState: false,
        item_4_11_4_radioState: false,
        item_4_11_5_radioState: false,
        item_4_11_6_radioState: false,
        item_4_11_7_radioState: false,
        item_4_11_8_radioState: false,
        item_4_11_9_radioState: false,
        item_2_1_2_show:false,
        editFlag:true,
        labelPosition: 'left',
        riskFactors_page: true,
        btnAuth: {
          buttonRoleAddSave: false,
        },
         showData:{},
        //添加表单数据对象
        'insertForm': {
          "sid": "",
          "survey_date": null,//调查日期
          "reviewer": "",//审核人
          "investigator": "",//调查人
          "investigator_code": "",//筛查现场工作人员编码
          "site_id": "",//筛查现场id
          "contact_relationship": "",//其他 联系人与本人关系
          "contact_cell_phone": "",//其他联系人手机
          "contact_area":"",
          "contact_phone":"",
          "contact_telephone": "",//其他联系人固定电话
          "height": "",//身高(cm)
          "weight": "",//当前体重(kg)
          "yao_wei": "",//腰围(cm)
          "education": "",//您的最高学历是：1：未正式上学，2：小学，3：初中，4：高中/中专，5：大学/大专，6：研究生及以上，7：其他
          "marriage": "",//婚姻 状况，1：未婚，2：同居（不在婚但有伴侣），3：已婚，4：离婚，5：丧偶，6：其他
          "marriage_other": "",//婚姻状况其他
          "item_2_1": "",//您现在是否存在腹部不适或其他肠道异常的症状？,1：是，2：否
          "item_2_1_1": null,//肠道的疼痛或异常症状出现的时间？
          "item_2_1_2": [],
          "item_2_1_2_1": "",//主要的症状为？腹痛，1：是，2：否
          "item_2_1_2_2": "",//主要的症状为？排便异常（腹泻、便秘、大便不成形等），1：是，2：否
          "item_2_1_2_3": "",//便血（肉眼可见），1：是，2：否
          "item_2_1_2_4": "",//其他（请具体阐明），1：是，2：否
          "item_2_1_2_4_other": "",//其他说明
          "item_2_2": "",//您是否曾经由于肠道疾病而服用药物？1：是，2：否
          "item_2_2_1": "",//药物名称
          "item_2_3": "",//您是否曾经由于肠道不适而去医院做过检查？1：是，2：否
          "item_2_3_1": "",//检查的项目为
          "item_2_3_2": null,//最后一次检查的时间为
          "item_2_4": "",//您是否曾经做过结肠镜检查？1：是，2：否
          "item_2_4_1": null,//上一次肠镜检查的时间为
          "item_2_4_2": null,//总共做过几次肠镜？
          "item_2_4_3": "",//是否在结肠镜检查中发现大肠息肉 / 腺瘤？1：是，2：否，3：不清楚
          "item_3_1": "",//镇痛药或者抗风湿类药物：您是否偶尔或规律服用镇痛药或抗风湿类药物（例如：阿司匹林、对乙酰氨基酚、消炎痛、扶他林、扑热息痛、布洛芬等）？1：是，偶尔，2：是，规律服用（每周大于1次），3：否
          "item_3_1_1": null,//总共服用的年数？
          "item_3_1_2": "",//您现在是否正在服用镇痛药或抗风湿类药物？1：是，2：否
          "item_3_1_2_1": "",//药物名称
          "item_3_1_2_2": null,//上次服用的年份为？
          "item_3_2": "",//抗凝血药物：您是否偶尔或规律服用过抗凝血药物（例如：华法林、肝素、达比加群、通心络等）？1：是，偶尔，2：是，规律服用（每周大于1次），3：否
          "item_3_2_1": null,//总共服用的年数？
          "item_3_2_2": "",//您现在是否正在服用抗凝血药物？1：是，2：否
          "item_3_2_2_1": "",//药物名称
          "item_3_2_2_2": null,//上次服用的年份为？
          "item_3_3": "",//激素替代治疗：您是否曾经接受过或者目前正在接受激素替代治疗（雌激素或雌 / 孕激素联合治疗，给药途径包括口服、皮贴、涂抹霜剂或凝胶、经阴道使用的霜、片、栓、硅胶环等）1：是，2：否
          "item_3_3_years": null,//总共服药年龄
          "item_3_3_1": "",//您现在是否正在接受激素替代治疗？1：是，2：否
          "item_3_3_1_1": "",//药物名称
          "item_3_3_1_2": null,//最后一次接受治疗的年份？
          "item_4_1": "",//您是否曾经吸烟？1：不吸烟，2：吸烟
          "item_4_2": "",//您首次吸烟的年龄为？
          "item_4_3": "",//您最近的吸烟频率如何？1：每天，2：偶尔吸烟，3：已戒烟
          "item_4_3_1": "",//如果已经戒烟，您最后一次吸烟是什么时候？1：半年前，2：，3：，4：，5：
          "item_4_4": null,//您总共吸烟的年数为？
          "item_4_5": "",//您现在/过去吸烟时平均每天吸烟的支数为？
          "item_4_6": "",//您是否（正在或曾经）和吸烟者一同居住？1：是，2：否
          "item_4_7": "",//您工作过的室内场所中是否有人经常吸烟？1：是，2：否
          "item_4_8": null,//吸二手烟的年数（与研究对象一起生活的家人每天吸烟，一起生活的年数，无则填0 ) ？
          "item_4_9": "",//您多长时间饮一次酒 ？1：从不饮酒，2：每月1次或更少，3：每月2次-4次，4：每周2次-3次，5：每周4次及以上
          "item_4_10": "",//平均每周饮酒含多少单位酒精？（1单位酒精约为：350毫升啤酒，或150毫升葡萄酒，或50毫升（1两）白酒；饮两种及以上类型酒时酒精量累加）1：1单位及以下，2：2-3单位，3：4单位，4：5-7单位，5：8单位及以上
          "item_4_11_1": "",//在过去  12个月  中，您以下食物的食用频率如何？肉类（猪、牛、羊肉等），1：>1次/天，2：1次/天，3：>1次/周，4：1次/周，5：≈1次/月，6：未吃，
          "item_4_11_2": "",//在过去  12个月  中，您以下食物的食用频率如何？鱼/禽肉（鸡、鸭、鹅肉等），1：>1次/天，2：1次/天，3：>1次/周，4：1次/周，5：≈1次/月，6：未吃，
          "item_4_11_3": "",//在过去  12个月  中，您以下食物的食用频率如何？蛋类（鸡蛋、鸭蛋等），1：>1次/天，2：1次/天，3：>1次/周，4：1次/周，5：≈1次/月，6：未吃，
          "item_4_11_4": "",//在过去  12个月  中，您以下食物的食用频率如何？奶类（牛奶、羊奶），1：>1次/天，2：1次/天，3：>1次/周，4：1次/周，5：≈1次/月，6：未吃，
          "item_4_11_5": "",//在过去  12个月  中，您以下食物的食用频率如何？香肠，1：>1次/天，2：1次/天，3：>1次/周，4：1次/周，5：≈1次/月，6：未吃，
          "item_4_11_6": "",//在过去  12个月  中，您以下食物的食用频率如何？细粮（大米、面食），1：>1次/天，2：1次/天，3：>1次/周，4：1次/周，5：≈1次/月，6：未吃，
          "item_4_11_7": "",//在过去  12个月  中，您以下食物的食用频率如何？粗粮（五谷杂粮，包括小米、玉米、高粱等），1：>1次/天，2：1次/天，3：>1次/周，4：1次/周，5：≈1次/月，6：未吃，
          "item_4_11_8": "",//在过去  12个月  中，您以下食物的食用频率如何？水果，1：>1次/天，2：1次/天，3：>1次/周，4：1次/周，5：≈1次/月，6：未吃，
          "item_4_11_9": "",//在过去  12个月  中，您以下食物的食用频率如何？新鲜蔬菜，1：>1次/天，2：1次/天，3：>1次/周，4：1次/周，5：≈1次/月，6：未吃，
          "item_4_12_1": "",//照顾其他成人
          "item_4_12_2": "",//照顾婴儿/儿童
          "item_4_12_3": "",//中等强度体力家务劳动（包括扫地、擦玻璃、洗衣服、做饭、整理房间等）
          "item_4_12_4": "",//高强度体力家务劳动（包括搬运重物、砍柴、扫雪、拖地板等）
          "item_4_12_5": "",//球类运动（篮球、乒乓球、羽毛球等）
          "item_4_12_6": "",//散步或慢跑
          "item_4_12_7": "",//骑自行车
          "item_4_12_8": "",//高强度身体锻炼（包括游泳、爬山、器械锻炼等）
          "item_4_12_9": "",//低强度身体锻炼（包括太极、瑜伽等）
          "item_4_12_10": "",//坐着看电视或听收音机
          "item_5_1": "",//医生是否曾经诊断过您曾患过以下疾病？如果是，第一次患病是在何时？1：是，2：否
          "item_5_1_1": "",//慢性腹泻*,1：是，2：否
          "item_5_1_1_age": "",//确诊年龄（岁）
          "item_5_1_2": "",//慢性结肠炎
          "item_5_1_2_age": "",//确诊年龄（岁）
          "item_5_1_3": "",//慢性便秘**
          "item_5_1_3_age": "",//确诊年龄（岁）
          "item_5_1_4": "",//粘液和/或血便
          "item_5_1_4_age": "",//确诊年龄（岁）
          "item_5_1_5": "",//肠息肉
          "item_5_1_5_age": "",//确诊年龄（岁）
          "item_5_1_6": "",//慢性阑尾炎或阑尾切除史
          "item_5_1_6_age": "",//确诊年龄（岁）
          "item_5_1_7": "",//糖尿病
          "item_5_1_7_age": "",//确诊年龄（岁）
          "item_5_1_8": "",//高血压
          "item_5_1_8_age": "",//确诊年龄（岁）
          "item_5_1_9": "",//中风
          "item_5_1_9_age": "",//确诊年龄（岁）
          "item_5_1_10": "",//心脏病或心衰
          "item_5_1_10_age": "",//确诊年龄（岁）
          "item_5_2": "",//您是否患过以下任何一种癌症？1：是，2：否
          "item_5_2_1": "",//膀胱癌
          "item_5_2_1_age": "",//确诊年龄（岁）
          "item_5_2_2": "",//乳腺癌
          "item_5_2_2_age": "",//确诊年龄（岁）
          "item_5_2_3": "",//子宫颈癌
          "item_5_2_3_age": "",//确诊年龄（岁）
          "item_5_2_4": "",//结直肠癌
          "item_5_2_4_age": "",//确诊年龄（岁）
          "item_5_2_5": "",//食管癌
          "item_5_2_5_age": "",//确诊年龄（岁）
          "item_5_2_6": "",//肾癌
          "item_5_2_6_age": "",//确诊年龄（岁）
          "item_5_2_7": "",//喉癌
          "item_5_2_7_age": "",//确诊年龄（岁）
          "item_5_2_8": "",//肺癌
          "item_5_2_8_age": "",//确诊年龄（岁）
          "item_5_2_9": "",//口腔癌
          "item_5_2_9_age": "",//确诊年龄（岁）
          "item_5_2_10": "",//鼻癌
          "item_5_2_10_age": "",//确诊年龄（岁）
          "item_5_2_11": "",//胰腺癌
          "item_5_2_11_age": "",//确诊年龄（岁）
          "item_5_2_12": "",//胃癌
          "item_5_2_12_age": "",//确诊年龄（岁）
          "item_5_2_13": "",//甲状腺癌
          "item_5_2_13_age": "",//确诊年龄（岁）
          "item_5_3": "",//您的直系亲属是否患过结直肠癌？1：是，2：否，3：不清楚
          "item_5_3_1": "",//父亲
          "item_5_3_1_age": "",//患病年龄（岁）
          "item_5_3_2": "",//母亲
          "item_5_3_2_age": "",//患病年龄（岁）
          "item_5_3_3": "",//兄弟，包括同父异母兄弟或同母异父兄弟
          "item_5_3_3_age": "",//患病年龄（岁）
          "item_5_3_4": "",//姐妹，包括同父异母姐妹或同母异父姐妹
          "item_5_3_4_age": ""//患病年龄（岁）
        },
        rulesArr:[
            'education','marriage','item_2_1','item_2_1_2','item_2_1_2_4_other','item_2_2','item_2_3','item_2_4','item_2_4_3','item_3_1','item_3_1_2','item_3_2','item_3_2_2','item_3_3','item_3_3_1','item_4_1','item_4_3','item_4_3_1','item_4_6','item_4_7'
             ,'item_4_9', 'item_4_10', 'item_4_11_1','item_4_11_2','item_4_11_3','item_4_11_4','item_4_11_5','item_4_11_6','item_4_11_7','item_4_11_8','item_4_11_9','item_5_1','item_5_2','item_5_3'],

        formLabelWidth: '80px',
        autograph: '120px',
        rules: {
          survey_date: [{required: true, message: '必填', trigger: 'blur'},],
          investigator: [{required: true, message: '必填', trigger: 'blur'},],
          reviewer: [{required: true, message: '必填', trigger: 'blur'},],
          investigator_code: [{required: true, message: '必填', trigger: 'blur'},],
          contact_relationship: [{required: true, message: '必填', trigger: 'blur'}, {
            validator: contact_relationship,
            trigger: 'blur'
          },],
          contact_cell_phone: [{required: true, message: '必填', trigger: 'blur'}, {
            validator: validatePhone,
            trigger: 'blur'
          },],
          contact_area:[{validator: validatecontact_area, trigger: 'blur'},],
          contact_phone: [{validator: validatecontact_telephone, trigger: 'blur'},],
          height: [{required: true, message: '必填', trigger: 'blur'}, {validator: validateHeight, trigger: 'blur'},],
          weight: [{required: true, message: '必填', trigger: 'blur'}, {validator: validateWeight, trigger: 'blur'},],
          yao_wei: [{required: true, message: '必填', trigger: 'blur'}, {validator: validateyaowei, trigger: 'blur'},],
          education: [{required: true, message: '必填', trigger: 'change'},],
          marriage: [{required: true, message: '必填', trigger: 'change'},],
          marriage_other: [{required: false, message: '必填', trigger: 'blur'},],
          item_2_1: [{required: true, message: '必填', trigger: 'change'},],
          item_2_1_1: [{required: false, message: '必填', trigger: 'blur'},],
          item_2_1_2: [{required: false, message: '必填', trigger: 'change'},],
          item_2_1_2_4_other: [{required: false, message: '必填', trigger: 'blur'},],
          item_2_2: [{required: true, message: '必填', trigger: 'change'},],
          item_2_2_1: [{required: false, message: '必填', trigger: 'blur'},],
          item_2_3: [{required: true, message: '必填', trigger: 'change'},],
          item_2_3_1: [{required: false, message: '必填', trigger: 'blur'},],
          item_2_3_2: [{required: false, message: '必填', trigger: 'blur'},],
          item_2_4: [{required: true, message: '必填', trigger: 'change'},],
          item_2_4_1: [{required: false, message: '必填', trigger: 'blur'}],
          item_2_4_2: [{required: false, message: '必填', trigger: 'blur'},{validator: validateItem_2_4_2, trigger: 'blur'},],
          item_2_4_3: [{required: false, message: '必填', trigger: 'change'},],
          item_3_1: [{required: true, message: '必填', trigger: 'change'},],
          item_3_1_1: [{required: false, message: '必填'},{validator: validateItem_3_1_1, trigger: 'blur'},],
          item_3_1_2: [{required: false, message: '必填',},],
          item_3_1_2_1: [{required: false, message: '必填', },],
          item_3_1_2_2: [{required: false, message: '必填', },{validator: validateItem_3_1_2_2, trigger: 'blur'}],
          item_3_2: [{required: true, message: '必填', },],
          item_3_2_1: [{required: false, message: '必填',},{validator: validateItem_3_1_1, trigger: 'blur'},],
          item_3_2_2: [{required: false, message: '必填', },],
          item_3_2_2_1: [{required: false, message: '必填', },],
          item_3_2_2_2: [{required: false, message: '必填', },{validator: validateItem_3_1_2_2, }],
          item_3_3: [{required: true, message: '必填', trigger: 'change'},],
          item_3_3_1: [{required: false, message: '必填',},],
          item_3_3_years: [{required: false, message: '必填', },{validator: validateItem_3_1_1, },],
          item_3_3_1_1: [{required: false, message: '必填',},],
          item_3_3_1_2: [{required: false, message: '必填', },{validator: validateItem_3_1_2_2, }],
          item_4_1: [{required: true, message: '必填', trigger: 'change'},],
          item_4_2: [{required: false, message: '必填', trigger: 'change'},{validator: validateItem_4_2, }],
          item_4_3: [{required: false, message: '必填', trigger: 'change'},],
          item_4_4: [{required: false, message: '必填', trigger: 'change'},{validator: validateItem_4_2, }],
          item_4_5: [{required: false, message: '必填', trigger: 'change'},{validator: validateItem_4_5, }],
          item_4_3_1: [{required: false, message: '必填', trigger: 'change'},],
          item_4_6: [{required: true, message: '必填', trigger: 'change'},],
          item_4_7: [{required: true, message: '必填', trigger: 'change'},],
          item_4_8: [{required: true, message: '必填', trigger: 'change'},{validator: validateItem_4_8, }],
          item_4_9: [{required: true, message: '必填', trigger: 'change'},],
          item_4_10: [{required: false, message: '必填', trigger: 'change'},],
          item_4_12_1: [
            {required: false, message: '必选', trigger: 'change'},
            {type: 'number', message: '必须为数字值'},
            {
              validator: validateItem_4_12_1, trigger: 'blur'
            },
          ],
          item_4_12_2: [
            {required: false, message: '必选', trigger: 'change'},
            {type: 'number', message: '必须为数字值'},
            {
              validator: validateItem_4_12_1, trigger: 'blur'
            },
          ],
          item_4_12_3: [
            {required: false, message: '必选', trigger: 'change'},
            {type: 'number', message: '必须为数字值'},
            {
              validator: validateItem_4_12_1, trigger: 'blur'
            },
          ],
          item_4_12_4: [
            {required: false, message: '必选', trigger: 'change'},
            {type: 'number', message: '必须为数字值'},
            {
              validator: validateItem_4_12_1, trigger: 'blur'
            },
          ],
          item_4_12_5: [
            {required: false, message: '必选', trigger: 'change'},
            {type: 'number', message: '必须为数字值'},
            {
              validator: validateItem_4_12_1, trigger: 'blur'
            },
          ],
          item_4_12_6: [
            {required: false, message: '必选', trigger: 'change'},
            {type: 'number', message: '必须为数字值'},
            {
              validator: validateItem_4_12_1, trigger: 'blur'
            },
          ],
          item_4_12_7: [
            {required: false, message: '必选', trigger: 'change'},
            {type: 'number', message: '必须为数字值'},
            {
              validator: validateItem_4_12_1, trigger: 'blur'
            },
          ],
          item_4_12_8: [
            {required: false, message: '必选', trigger: 'change'},
            {type: 'number', message: '必须为数字值'},
            {
              validator: validateItem_4_12_1, trigger: 'blur'
            },
          ],
          item_4_12_9: [
            {required: false, message: '必选', trigger: 'change'},
            {type: 'number', message: '必须为数字值'},
            {
              validator: validateItem_4_12_1, trigger: 'blur'
            },
          ],
          item_4_12_10: [
            {required: false, message: '必选', trigger: 'change'},
            {type: 'number', message: '必须为数字值'},
            {
              validator: validateItem_4_12_1, trigger: 'blur'
            },
          ],
          item_5_1: [{required: true, message: '必填', trigger: 'change'}, {validator: validateitem_5_1, trigger: 'change'},],
          item_5_1_1: [{required: false, message: '必填', trigger: 'change'},{validator: item_5_1s, trigger: 'change'}],
          item_5_1_2: [{required: false, message: '必填', trigger: 'change'},{validator: item_5_1s, trigger: 'change'}],
          item_5_1_3: [{required: false, message: '必填', trigger: 'change'},{validator: item_5_1s, trigger: 'change'}],
          item_5_1_4: [{required: false, message: '必填', trigger: 'change'},{validator: item_5_1s, trigger: 'change'}],
          item_5_1_5: [{required: false, message: '必填', trigger: 'change'},{validator: item_5_1s, trigger: 'change'}],
          item_5_1_6: [{required: false, message: '必填', trigger: 'change'},{validator: item_5_1s, trigger: 'change'}],
          item_5_1_7: [{required: false, message: '必填', trigger: 'change'},{validator: item_5_1s, trigger: 'change'}],
          item_5_1_8: [{required: false, message: '必填', trigger: 'change'},{validator: item_5_1s, trigger: 'change'}],
          item_5_1_9: [{required: false, message: '必填', trigger: 'change'},{validator: item_5_1s, trigger: 'change'}],
          item_5_1_10: [{required: false, message: '必填', trigger: 'change'},{validator: item_5_1s, trigger: 'change'}],

          item_5_1_1_age: [{required: false, message: '必选',},
            {validator: validateItem_5, trigger: 'blur,change'}

          ],
          item_5_1_2_age: [{required: false, message: '必选',},
            {validator: validateItem_5, trigger: 'blur,change'}
          ],
          item_5_1_3_age: [{required: false, message: '必选',},
            {validator: validateItem_5, trigger: 'blur,change'}
          ],
          item_5_1_4_age: [{required: false, message: '必选',},
            {validator: validateItem_5, trigger: 'blur,change'}
          ],
          item_5_1_5_age: [{required: false, message: '必选',},
            {validator: validateItem_5, trigger: 'blur,change'}
          ],
          item_5_1_6_age: [{required: false, message: '必选',},
            {validator: validateItem_5, trigger: 'blur,change'}
          ],
          item_5_1_7_age: [{required: false, message: '必选',},
            {validator: validateItem_5, trigger: 'blur'}
          ],

          item_5_1_8_age: [{required: false, message: '必选',},
            {validator: validateItem_5, trigger: 'blur,change'}
          ],
          item_5_1_9_age: [{required: false, message: '必选',},
            {validator: validateItem_5, trigger: 'blur,change'}
          ],
          item_5_1_10_age: [{required: false, message: '必选',},
            {validator: validateItem_5, trigger: 'blur,change'}
          ],
          item_5_2: [{required: true, message: '必填', trigger: 'change'},{validator: validateitem_5_2, trigger: 'change'},],
          item_5_2_1: [{required: false, message: '必选',}, {validator: item_5_2s, trigger: 'change'}],
          item_5_2_2: [{required: false, message: '必选',}, {validator: item_5_2s, trigger: 'change'}],
          item_5_2_3: [{required: false, message: '必选',}, {validator: item_5_2s, trigger: 'change'}],
          item_5_2_4: [{required: false, message: '必选',}, {validator: item_5_2s, trigger: 'change'}],
          item_5_2_5: [{required: false, message: '必选',}, {validator: item_5_2s, trigger: 'change'}],
          item_5_2_6: [{required: false, message: '必选',}, {validator: item_5_2s, trigger: 'change'}],
          item_5_2_7: [{required: false, message: '必选',}, {validator: item_5_2s, trigger: 'change'}],
          item_5_2_8: [{required: false, message: '必选',}, {validator: item_5_2s, trigger: 'change'}],
          item_5_2_9: [{required: false, message: '必选',}, {validator: item_5_2s, trigger: 'change'}],
          item_5_2_10: [{required: false, message: '必选',}, {validator: item_5_2s, trigger: 'change'}],
          item_5_2_11: [{required: false, message: '必选',}, {validator: item_5_2s, trigger: 'change'}],
          item_5_2_12: [{required: false, message: '必选',}, {validator: item_5_2s, trigger: 'change'}],
          item_5_2_13: [{required: false, message: '必选',}, {validator: item_5_2s, trigger: 'change'}],
          item_5_2_1_age: [
            {required: false, message: '必选',},
            {validator: validateItem_5, trigger: 'bhange'}
          ],
          item_5_2_2_age: [
            {required: false, message: '必选', },
            {validator: validateItem_5, trigger: 'change'}
          ],
          item_5_2_3_age: [
            {required: false, message: '必选', },
            {validator: validateItem_5, trigger: 'change'}
          ],
          item_5_2_4_age: [
            {required: false, message: '必选', },
            {validator: validateItem_5, trigger: 'change'}
          ],
          item_5_2_5_age: [
            {required: false, message: '必选', },
            {validator: validateItem_5, trigger: 'change'}
          ],
          item_5_2_6_age: [
            {required: false, message: '必选', },
            {validator: validateItem_5, trigger: 'change'}
          ],
          item_5_2_7_age: [
            {required: false, message: '必选',},
            {validator: validateItem_5, trigger: 'change'}
          ],
          item_5_2_8_age: [
            {required: false, message: '必选', },
            {validator: validateItem_5, trigger: 'change'}
          ],
          item_5_2_9_age: [
            {required: false, message: '必选', },
            {validator: validateItem_5, trigger: 'change'}
          ],
          item_5_2_10_age: [
            {required: false, message: '必选', },
            {validator: validateItem_5, trigger: 'change'}
          ],
          item_5_2_11_age: [
            {required: false, message: '必选',},
            {validator: validateItem_5, trigger: 'change'}
          ],
          item_5_2_12_age: [
            {required: false, message: '必选', },
            {validator: validateItem_5, trigger: 'change'}
          ],
          item_5_2_13_age: [
            {required: false, message: '必选', },
            {validator: validateItem_5, trigger: 'change'}
          ],
          item_5_3: [{required: true, message: '必填', trigger: 'change'},{validator: validateitem_5_3, trigger: 'change'},],
          item_5_3_1: [{required: false, message: '必选',}, {validator: item_5_3s, trigger: 'change'}],
          item_5_3_2: [{required: false, message: '必选',}, {validator: item_5_3s, trigger: 'change'}],
          item_5_3_3: [{required: false, message: '必选',}, {validator: item_5_3s, trigger: 'change'}],
          item_5_3_4: [{required: false, message: '必选',}, {validator: item_5_3s, trigger: 'change'}],
          item_5_3_1_age: [
            {required: false, message: '必选', },
            {validator: validateItem_5_num, trigger: 'change'}
          ],
          item_5_3_2_age: [
            {required: false, message: '必选', },
            {validator: validateItem_5_num, trigger: 'change'}
          ],
          item_5_3_3_age: [
            {required: false, message: '必选', },
            {validator: validateItem_5_num, trigger: 'change'}
          ],
          item_5_3_4_age: [
            {required: false, message: '必选', },
            {validator: validateItem_5_num, trigger: 'change'}
          ],
        },
      }
    },
    mounted() {
      let obj = this.checkPageAuth(this, "riskFactors_page", this.btnAuth);
      this.getCustomerInfo();
      // if(this.$route.query.id){
      //   this.query();   //编辑回显
      // }
    },
    watch: {
      'insertForm.marriage': function (val, b) {
        if (val != '6') {
          this.$nextTick(function () {
            this.rules.marriage_other[0].required = false
            this.insertForm.marriage_other = ''
            this.$refs.insertForm.validateField('marriage_other')
          })
        } else {
          this.$nextTick(function () {
            this.rules.marriage_other[0].required = true
          })
        }
      },
      'insertForm.item_2_1': function (val, b) {
        if (val == '2') {
          this.$nextTick(function () {
            this.rules.item_2_1_1[0].required = true
            this.rules.item_2_1_2[0].required = true
          })
        } else {
          this.$nextTick(function () {
            this.rules.item_2_1_1[0].required = false
            this.rules.item_2_1_2[0].required = true
            // 选择否的时候隐藏的选项值清空
            this.insertForm.item_2_1_1=null;
            this.insertForm.item_2_1_2=[];
            this.insertForm.item_2_1_2_1="",
            this.insertForm.item_2_1_2_2= "";
            this.insertForm.item_2_1_2_3= "";
            this.insertForm.item_2_1_2_4= "";
            this.insertForm.item_2_1_2_4_other= ""
          })
        }
      },
      'insertForm.item_2_2': function (val, b) {
        if (val == '2') {
          this.$nextTick(function () {
            this.rules.item_2_2_1[0].required = true
          })
        } else {
          this.$nextTick(function () {
            this.rules.item_2_2_1[0].required = false
            this.$refs.insertForm.validateField('item_2_2_1')
            // 选择否的时候隐藏的选项值清空
            this.insertForm.item_2_2_1='';
          })
        }
      },
      'insertForm.item_2_3': function (val, b) {
        if (val == '2') {
          this.$nextTick(function () {
            this.rules.item_2_3_1[0].required = true
            this.rules.item_2_3_2[0].required = true
          })
        } else {
          this.$nextTick(function () {
            this.rules.item_2_3_1[0].required = false
            this.rules.item_2_3_2[0].required = false
            // 选择否的时候隐藏的选项值清空
            this.insertForm.item_2_3_1= ""
            this.insertForm.item_2_3_2=null
          })
        }
      },
      'insertForm.item_2_4': function (val, b) {
        if (val == '2') {
          this.$nextTick(function () {
            this.rules.item_2_4_1[0].required = true
            this.rules.item_2_4_2[0].required = true
            this.rules.item_2_4_3[0].required = true
          })
        } else {
          this.$nextTick(function () {
            this.rules.item_2_4_1[0].required = false
            this.rules.item_2_4_2[0].required = false
            this.rules.item_2_4_3[0].required = false
            // 选择否的时候隐藏的选项值清空
            this.insertForm.item_2_4_1= null
            this.insertForm.item_2_4_2=null
            this.insertForm.item_2_4_3= ""
          })
        }
      },
      'insertForm.item_3_1': function (val, b) {
        if (val == '2'||val == '3') {
          this.$nextTick(function () {
            this.rules.item_3_1_1[0].required = true
            this.rules.item_3_1_2[0].required = true
          })
        } else {
          this.$nextTick(function () {
            this.rules.item_3_1_1[0].required = false
            this.rules.item_3_1_2[0].required = false
            // 选择否的时候隐藏的选项值清空
            this.insertForm.item_3_1_1= null
            this.insertForm.item_3_1_2= ""
            this.insertForm.item_3_1_2_1= ""
            this.insertForm.item_3_1_2_2= null
          })
        }
      },
      'insertForm.item_3_1_2': function (val, b) {
        if (val == '2') {
          this.$nextTick(function () {
            this.rules.item_3_1_2_1[0].required = false
            this.rules.item_3_1_2_2[0].required = true
            this.$refs.insertForm.validateField('item_3_1_2_1')
            this.insertForm.item_3_1_2_1 = ''

          })
        } else {
          this.$nextTick(function () {
            this.rules.item_3_1_2_1[0].required = true
            this.rules.item_3_1_2_2[0].required = false
            this.$refs.insertForm.validateField('item_3_1_2_2')
            this.insertForm.item_3_1_2_2 = ''
          })
        }
      },
      'insertForm.item_3_2': function (val, b) {
        if (val == '2'||val == '3') {
          this.$nextTick(function () {
            this.rules.item_3_2_1[0].required = true
            this.rules.item_3_2_2[0].required = true
          })
        } else {
          this.$nextTick(function () {
            this.rules.item_3_2_1[0].required = false
            this.rules.item_3_2_2[0].required = false
            // 选择否的时候隐藏的选项值清空
            this.insertForm.item_3_2_1= null
            this.insertForm.item_3_2_2=""
            this.insertForm.item_3_2_2_1= ""
            this.insertForm.item_3_2_2_2= null

          })
        }
      },
      'insertForm.item_3_2_2': function (val, b) {
        if (val == '2') {
          this.$nextTick(function () {
            this.rules.item_3_2_2_1[0].required = false
            this.rules.item_3_2_2_2[0].required = true
            this.$refs.insertForm.validateField('item_3_2_2_1')
            this.insertForm.item_3_2_2_1 = ''
          })
        } else {
          this.$nextTick(function () {
            this.rules.item_3_2_2_1[0].required = true
            this.rules.item_3_2_2_2[0].required = false
            this.$refs.insertForm.validateField('item_3_2_2_2')
            this.insertForm.item_3_2_2_2 = ''
          })
        }
      },
      'insertForm.item_3_3': function (val, b) {
        if (val == '2') {
          this.$nextTick(function () {
            this.rules.item_3_3_years[0].required = true
            this.rules.item_3_3_1[0].required = true
          })
        } else {
          this.$nextTick(function () {
            this.rules.item_3_3_years[0].required = false
            this.rules.item_3_3_1[0].required = false
            this.insertForm.item_3_3_years = null
            this.$refs.insertForm.validateField('item_3_3_years')
          })
        }
      },
      'insertForm.item_3_3_1': function (val, b) {
        if (val == '2') {
          this.$nextTick(function () {
            this.rules.item_3_3_1_1[0].required = false
            this.rules.item_3_3_1_2[0].required = true
            this.insertForm.item_3_3_1_1 = ''
            this.$refs.insertForm.validateField('item_3_3_1_1')

          })
        } else {
          this.$nextTick(function () {
            this.rules.item_3_3_1_1[0].required = true
            this.rules.item_3_3_1_2[0].required = false
            this.insertForm.item_3_3_1_2 = ''
            this.$refs.insertForm.validateField('item_3_3_1_2')

          })
        }
      },
      'insertForm.item_4_1': function (val, b) {
        if (val == '2') {
          this.$nextTick(function () {
            this.rules.item_4_2[0].required = true
            this.rules.item_4_3[0].required = true
            this.rules.item_4_4[0].required = true
            this.rules.item_4_5[0].required = true
          })
        } else {
          this.$nextTick(function () {
            this.rules.item_4_2[0].required = false
            this.rules.item_4_3[0].required = false
            this.rules.item_4_4[0].required = false
            this.rules.item_4_5[0].required = false
            // 选择否的时候隐藏的选项值清空
            this.insertForm.item_4_2= ""
            this.insertForm.item_4_3= ""
            this.insertForm.item_4_3_1= ""
            this.insertForm.item_4_4= null
            this.insertForm.item_4_5= ""

          })
        }
      },
      'insertForm.item_4_3': function (val, b) {
        if (val == '3') {
          this.$nextTick(function () {
            this.rules.item_4_3_1[0].required = true
          })
        } else {
          this.$nextTick(function () {
            this.rules.item_4_3_1[0].required = false
            // 选择否的时候隐藏的选项值清空
            this.insertForm.item_4_3_1= ""

          })
        }
      },
      'insertForm.item_4_6': function (val, b) {
        if (val == '2') {
          this.$nextTick(function () {
            this.insertForm.item_4_8 = '0'
          })
        } else {
          // this.$nextTick(function () {
          //   this.insertForm.item_4_8 = ''
          // })
        }
      },
      'insertForm.item_4_9': function (val, b) {
        if (val == '1') {
          this.$nextTick(function () {
            this.rules.item_4_10[0].required = false
             this.insertForm.item_4_10=''
          })
        } else {
          this.$nextTick(function () {
            this.rules.item_4_10[0].required = true
           
          })
        }
      },
      'insertForm.item_4_11_1': function (val, b) {
        if (val == '') {
          this.item_4_11_1_radioState = true
        } else {

          this.item_4_11_1_radioState = false
        }
      },
      'insertForm.item_4_11_2': function (val, b) {
        if (val == '') {
          this.item_4_11_2_radioState = true
        } else {
          this.item_4_11_2_radioState = false
        }
      },
      'insertForm.item_4_11_3': function (val, b) {
        if (val == '') {
          this.item_4_11_3_radioState = true
        } else {
          this.item_4_11_3_radioState = false
        }
      },
      'insertForm.item_4_11_4': function (val, b) {
        if (val == '') {
          this.item_4_11_4_radioState = true
        } else {
          this.item_4_11_4_radioState = false
        }
      },
      'insertForm.item_4_11_5': function (val, b) {
        if (val == '') {
          this.item_4_11_5_radioState = true
        } else {
          this.item_4_11_5_radioState = false
        }
      },
      'insertForm.item_4_11_6': function (val, b) {
        if (val == '') {
          this.item_4_11_6_radioState = true
        } else {
          this.item_4_11_6_radioState = false
        }
      },
      'insertForm.item_4_11_7': function (val, b) {
        if (val == '') {
          this.item_4_11_7_radioState = true
        } else {
          this.item_4_11_7_radioState = false
        }
      },
      'insertForm.item_4_11_8': function (val, b) {
        if (val == '') {
          this.item_4_11_8_radioState = true
        } else {
          this.item_4_11_8_radioState = false
        }
      },
      'insertForm.item_4_11_9': function (val, b) {
        if (val == '') {
          this.item_4_11_9_radioState = true
        } else {
          this.item_4_11_9_radioState = false
        }
      },
      'insertForm.item_5_1_1': function (val, b) {
        this.watchInputVal2(val, this, 'insertForm', 'item_5_1_1')
        if (val == '1') {
          this.rules.item_5_1_1_age[0].required = true
        } else if (val == '2') {
          this.rules.item_5_1_1_age[0].required = false
          this.insertForm.item_5_1_1_age = ""
        }
      },
      'insertForm.item_5_1_2': function (val, b) {
        this.watchInputVal2(val, this, 'insertForm', 'item_5_1_2')
        if (val == '1') {
          this.rules.item_5_1_2_age[0].required = true
        } else if (val == '2') {
          this.rules.item_5_1_2_age[0].required = false
          this.insertForm.item_5_1_2_age = ""
        }
      },
      'insertForm.item_5_1_3': function (val, b) {
        this.watchInputVal2(val, this, 'insertForm', 'item_5_1_3')
        if (val == '1') {
          this.rules.item_5_1_3_age[0].required = true
        } else if (val == '2') {
          this.rules.item_5_1_3_age[0].required = false
          this.insertForm.item_5_1_3_age = ""
        }
      },
      'insertForm.item_5_1_4': function (val, b) {
        this.watchInputVal2(val, this, 'insertForm', 'item_5_1_4')
        if (val == '1') {
          this.rules.item_5_1_4_age[0].required = true
        } else if (val == '2') {
          this.rules.item_5_1_4_age[0].required = false
          this.insertForm.item_5_1_4_age = ""
        }
      },
      'insertForm.item_5_1_5': function (val, b) {
        this.watchInputVal2(val, this, 'insertForm', 'item_5_1_5')
        if (val == '1') {
          this.rules.item_5_1_5_age[0].required = true
        } else if (val == '2') {
          this.rules.item_5_1_5_age[0].required = false
          this.insertForm.item_5_1_5_age = ""
        }
      },
      'insertForm.item_5_1_6': function (val, b) {
        this.watchInputVal2(val, this, 'insertForm', 'item_5_1_6')
        if (val == '1') {

          this.rules.item_5_1_6_age[0].required = true
        } else if (val == '2') {
          this.rules.item_5_1_6_age[0].required = false
          this.insertForm.item_5_1_6_age = ""
        }
      },
      'insertForm.item_5_1_7': function (val, b) {
        this.watchInputVal2(val, this, 'insertForm', 'item_5_1_7')
        if (val == '1') {

          this.rules.item_5_1_7_age[0].required = true
        } else if (val == '2') {
          this.rules.item_5_1_7_age[0].required = false
          this.insertForm.item_5_1_7_age = ""
        }
      },
      'insertForm.item_5_1_8': function (val, b) {
        this.watchInputVal2(val, this, 'insertForm', 'item_5_1_8')
        if (val == '1') {

          this.rules.item_5_1_8_age[0].required = true
        } else if (val == '2') {
          this.rules.item_5_1_8_age[0].required = false
          this.insertForm.item_5_1_8_age = ""
        }
      },
      'insertForm.item_5_1_9': function (val, b) {
        this.watchInputVal2(val, this, 'insertForm', 'item_5_1_9')
        if (val == '1') {

          this.rules.item_5_1_9_age[0].required = true
        } else if (val == '2') {
          this.rules.item_5_1_9_age[0].required = false
          this.insertForm.item_5_1_9_age = ""
        }
      },
      'insertForm.item_5_1_10': function (val, b) {
        this.watchInputVal2(val, this, 'insertForm', 'item_5_1_10')
        if (val == '1') {
          this.rules.item_5_1_10_age[0].required = true
        } else if (val == '2') {
          this.rules.item_5_1_10_age[0].required = false
          this.insertForm.item_5_1_10_age = ""
        }
      },
      'insertForm.item_5_2_1': function (val, b) {
        this.watchInputVal2(val, this, 'insertForm', 'item_5_2_1')
        if (val == '1') {
          this.rules.item_5_2_1_age[0].required = true
        } else if (val == '2') {
          this.rules.item_5_2_1_age[0].required = false
          this.insertForm.item_5_2_1_age = ''
        }
      },
      'insertForm.item_5_2_2': function (val, b) {
        this.watchInputVal2(val, this, 'insertForm', 'item_5_2_2')
        if (val == '1') {
          this.rules.item_5_2_2_age[0].required = true
        } else if (val == '2') {
          this.rules.item_5_2_2_age[0].required = false
          this.insertForm.item_5_2_2_age = ''
        }
      },
      'insertForm.item_5_2_3': function (val, b) {
        this.watchInputVal2(val, this, 'insertForm', 'item_5_2_3')
        if (val == '1') {
          this.rules.item_5_2_3_age[0].required = true
        } else if (val == '2') {
          this.rules.item_5_2_3_age[0].required = false
          this.insertForm.item_5_2_3_age = ''
        }
      },
      'insertForm.item_5_2_4': function (val, b) {
        this.watchInputVal2(val, this, 'insertForm', 'item_5_2_4')
        if (val == '1') {
          this.rules.item_5_2_4_age[0].required = true
        } else if (val == '2') {
          this.rules.item_5_2_4_age[0].required = false
          this.insertForm.item_5_2_4_age = ''
        }
      },
      'insertForm.item_5_2_5': function (val, b) {
        this.watchInputVal2(val, this, 'insertForm', 'item_5_2_5')
        if (val == '1') {
          this.rules.item_5_2_5_age[0].required = true
        } else if (val == '2') {
          this.rules.item_5_2_5_age[0].required = false
          this.insertForm.item_5_2_5_age = ''
        }
      },
      'insertForm.item_5_2_6': function (val, b) {
        this.watchInputVal2(val, this, 'insertForm', 'item_5_2_1')
        if (val == '1') {
          this.rules.item_5_2_6_age[0].required = true
        } else if (val == '2') {
          this.rules.item_5_2_6_age[0].required = false
          this.insertForm.item_5_2_6_age = ''
        }
      },
      'insertForm.item_5_2_7': function (val, b) {
        this.watchInputVal2(val, this, 'insertForm', 'item_5_2_7')
        if (val == '1') {
          this.rules.item_5_2_7_age[0].required = true
        } else if (val == '2') {
          this.rules.item_5_2_7_age[0].required = false
          this.insertForm.item_5_2_7_age = ''
        }
      },
      'insertForm.item_5_2_8': function (val, b) {
        this.watchInputVal2(val, this, 'insertForm', 'item_5_2_8')
        if (val == '1') {
          this.rules.item_5_2_8_age[0].required = true
        } else if (val == '2') {
          this.rules.item_5_2_8_age[0].required = false
          this.insertForm.item_5_2_8_age = ''
        }
      },
      'insertForm.item_5_2_9': function (val, b) {
        this.watchInputVal2(val, this, 'insertForm', 'item_5_2_9')
        if (val == '1') {
          this.rules.item_5_2_9_age[0].required = true
        } else if (val == '2') {
          this.rules.item_5_2_9_age[0].required = false
          this.insertForm.item_5_2_9_age = ''
        }
      },
      'insertForm.item_5_2_10': function (val, b) {
        this.watchInputVal2(val, this, 'insertForm', 'item_5_2_10')
        if (val == '1') {
          this.rules.item_5_2_10_age[0].required = true
        } else if (val == '2') {
          this.rules.item_5_2_10_age[0].required = false
          this.insertForm.item_5_2_10_age = ''
        }
      },
      'insertForm.item_5_2_11': function (val, b) {
        this.watchInputVal2(val, this, 'insertForm', 'item_5_2_11')
        if (val == '1') {
          this.rules.item_5_2_11_age[0].required = true
        } else if (val == '2') {
          this.rules.item_5_2_11_age[0].required = false
          this.insertForm.item_5_2_11_age = ''
        }
      },
      'insertForm.item_5_2_12': function (val, b) {
        this.watchInputVal2(val, this, 'insertForm', 'item_5_2_12')
        if (val == '1') {
          this.rules.item_5_2_12_age[0].required = true
        } else if (val == '2') {
          this.rules.item_5_2_12_age[0].required = false
          this.insertForm.item_5_2_12_age = ''
        }
      },
      'insertForm.item_5_2_13': function (val, b) {
        this.watchInputVal2(val, this, 'insertForm', 'item_5_2_13')
        if (val == '1') {
          this.rules.item_5_2_13_age[0].required = true
        } else if (val == '2') {
          this.rules.item_5_2_13_age[0].required = false
          this.insertForm.item_5_2_13_age = ''
        }
      },
      'insertForm.item_5_3_1': function (val, b) {
        this.watchInputVal2(val, this, 'insertForm', 'item_5_3_1')
        if (val == '1') {
          this.rules.item_5_3_1_age[0].required = true
        } else if (val == '2') {
          this.rules.item_5_3_1_age[0].required = false

          this.insertForm.item_5_3_1_age = ''
        }
      },
      'insertForm.item_5_3_2': function (val, b) {
        this.watchInputVal2(val, this, 'insertForm', 'item_5_3_2')
        if (val == '1') {
          this.rules.item_5_3_2_age[0].required = true
        } else if (val == '2') {
          this.rules.item_5_3_2_age[0].required = false
          this.insertForm.item_5_3_2_age = ''
        }
      },
      'insertForm.item_5_3_3': function (val, b) {
        this.watchInputVal2(val, this, 'insertForm', 'item_5_3_3')
        if (val == '1') {
          this.rules.item_5_3_3_age[0].required = true
        } else if (val == '2') {
          this.rules.item_5_3_3_age[0].required = false
          this.insertForm.item_5_3_3_age = ''
        }
      },
      'insertForm.item_5_3_4': function (val, b) {
        this.watchInputVal2(val, this, 'insertForm', 'item_5_3_4')
        if (val == '1') {
          this.rules.item_5_3_4_age[0].required = true
        } else if (val == '2') {
          this.rules.item_5_3_4_age[0].required = false
          this.insertForm.item_5_3_4_age = ''
        }
      },
    },

    methods: {
      watchInputVal2(val, opt, a, b) {
        if (val != '1' && val != '2') {
          this.$nextTick(function () {
            opt[a][b] = ''
          })
        }
      },
      item_5_2(value){
        if (value == '2') {
          this.insertForm.item_5_2_1 = '2';
          this.insertForm.item_5_2_2 = '2';
          this.insertForm.item_5_2_3 = '2';
          this.insertForm.item_5_2_4 = '2';
          this.insertForm.item_5_2_5 = '2';
          this.insertForm.item_5_2_6 = '2';
          this.insertForm.item_5_2_7 = '2';
          this.insertForm.item_5_2_8 = '2';
          this.insertForm.item_5_2_9 = '2';
          this.insertForm.item_5_2_10 = '2';
          this.insertForm.item_5_2_11 = '2';
          this.insertForm.item_5_2_12 = '2';
          this.insertForm.item_5_2_13 = '2';
        } else if (value == '1') {
          this.insertForm.item_5_2_1 = '';
          this.insertForm.item_5_2_2 = '';
          this.insertForm.item_5_2_3 = '';
          this.insertForm.item_5_2_4 = '';
          this.insertForm.item_5_2_5 = '';
          this.insertForm.item_5_2_6 = '';
          this.insertForm.item_5_2_7 = '';
          this.insertForm.item_5_2_8 = '';
          this.insertForm.item_5_2_9 = '';
          this.insertForm.item_5_2_10 = '';
          this.insertForm.item_5_2_11 = '';
          this.insertForm.item_5_2_12 = '';
          this.insertForm.item_5_2_13 = '';
          this.rules.item_5_2_1[0].required = true
          this.rules.item_5_2_2[0].required = true
          this.rules.item_5_2_3[0].required = true
          this.rules.item_5_2_4[0].required = true
          this.rules.item_5_2_5[0].required = true
          this.rules.item_5_2_6[0].required = true
          this.rules.item_5_2_7[0].required = true
          this.rules.item_5_2_8[0].required = true
          this.rules.item_5_2_9[0].required = true
          this.rules.item_5_2_10[0].required = true
          this.rules.item_5_2_11[0].required = true
          this.rules.item_5_2_12[0].required = true
          this.rules.item_5_2_13[0].required = true

        }
      },
        item_5_1(value){
          if (value == '1') {
            this.insertForm.item_5_1_1 = ''
            this.insertForm.item_5_1_2 = ''
            this.insertForm.item_5_1_3 = ''
            this.insertForm.item_5_1_4 = ''
            this.insertForm.item_5_1_5 = ''
            this.insertForm.item_5_1_6 = ''
            this.insertForm.item_5_1_7 = ''
            this.insertForm.item_5_1_8 = ''
            this.insertForm.item_5_1_9 = ''
            this.insertForm.item_5_1_10 = ''
            this.rules.item_5_1_1[0].required = true
            this.rules.item_5_1_2[0].required = true
            this.rules.item_5_1_3[0].required = true
            this.rules.item_5_1_4[0].required = true
            this.rules.item_5_1_5[0].required = true
            this.rules.item_5_1_6[0].required = true
            this.rules.item_5_1_7[0].required = true
            this.rules.item_5_1_8[0].required = true
            this.rules.item_5_1_9[0].required = true
            this.rules.item_5_1_10[0].required = true
          } else if (value == '2') {
            this.insertForm.item_5_1_1 = '2'
            this.insertForm.item_5_1_2 = '2'
            this.insertForm.item_5_1_3 = '2'
            this.insertForm.item_5_1_4 = '2'
            this.insertForm.item_5_1_5 = '2'
            this.insertForm.item_5_1_6 = '2'
            this.insertForm.item_5_1_7 = '2'
            this.insertForm.item_5_1_8 = '2'
            this.insertForm.item_5_1_9 = '2'
            this.insertForm.item_5_1_10 = '2'
          }
        },
      item_5_3(value){
        if (value == '2') {
          this.insertForm.item_5_3_1 = '2'
          this.insertForm.item_5_3_2 = '2'
          this.insertForm.item_5_3_3 = '2'
          this.insertForm.item_5_3_4 = '2'
        } else if (value == '1') {
          this.insertForm.item_5_3_1 = ''
          this.insertForm.item_5_3_2 = ''
          this.insertForm.item_5_3_3 = ''
          this.insertForm.item_5_3_4 = ''
          this.rules.item_5_3_1[0].required = true
          this.rules.item_5_3_2[0].required = true
          this.rules.item_5_3_3[0].required = true
          this.rules.item_5_3_4[0].required = true
        }else if(value == '3'){
          this.insertForm.item_5_3_1 = ''
          this.insertForm.item_5_3_2 = ''
          this.insertForm.item_5_3_3 = ''
          this.insertForm.item_5_3_4 = ''
          this.rules.item_5_3_1[0].required = false
          this.rules.item_5_3_2[0].required = false
          this.rules.item_5_3_3[0].required = false
          this.rules.item_5_3_4[0].required = false
          this.$refs.insertForm.validateField('item_5_3_1')
          this.$refs.insertForm.validateField('item_5_3_2')
          this.$refs.insertForm.validateField('item_5_3_3')
          this.$refs.insertForm.validateField('item_5_3_4')
        }
      },
      watchInputValAge(val, opt, a, b) {
        if (parseInt(val) > 74 || parseInt(val) < 1) {
          this.$nextTick(function () {
            opt[a][b] = ''
          })
        }
      },
      item_2_1_2Change(value){
        if (value.indexOf('腹痛') > -1) {
          this.insertForm.item_2_1_2_1 = '1'
        } else {
          this.insertForm.item_2_1_2_1 = '2'
        }
        if (value.indexOf('排便异常（腹泻、便秘、大便不成形等）') > -1) {
          this.insertForm.item_2_1_2_2 = '1'
        } else {
          this.insertForm.item_2_1_2_2 = '2'
        }
        if (value.indexOf('便血（肉眼可见）') > -1) {
          this.insertForm.item_2_1_2_3 = '1'
        } else {
          this.insertForm.item_2_1_2_3 = '2'
        }
        if (value.indexOf('其他（请具体阐明）') > -1) {
          this.insertForm.item_2_1_2_4 = '1'
          this.rules.item_2_1_2_4_other[0].required = true
          this.item_2_1_2_show=false;
        } else {
          this.$nextTick(function () {
            this.$refs.insertForm.validateField('item_2_1_2_4_other')
          })
          this.insertForm.item_2_1_2_4 = '2'
          this.rules.item_2_1_2_4_other[0].required = false
          this.insertForm.item_2_1_2_4_other = ''
          this.item_2_1_2_show=true;
        }
      },
       //查看危险因素
      query(){    //编辑回显
        $axios_http({
          url: "/base/hospital/riskfactor/findAll/"+this.$route.query.sid,
          data: {},
          vueObj: this
        }).then((res) => {
          //显示操作成功浮动提示框
          
          res.data.data.item_2_1_2=[];
          this.insertForm = res.data.data
          this.insertForm.sid = this.showData.sid
          this.insertForm.name = this.showData.name
          this.insertForm.sex = this.showData.sex
          this.insertForm.idCard = this.showData.idCard
          this.insertForm.phone = this.showData.phone
          this.insertForm.address = this.showData.address
          this.insertForm.site_id = this.showData.site_id
          // for(let i in this.insertForm){
          //    if(i.indexOf('item_')>-1){
          //      if(!this.insertForm[i]){
          //         this.insertForm[i]=''
          //      }
          //    }
          // }
          if(this.insertForm.item_2_1_2_1=='1'){
            this.insertForm.item_2_1_2.push('腹痛')
          }
          if(this.insertForm.item_2_1_2_2=='1'){
            this.insertForm.item_2_1_2.push('排便异常（腹泻、便秘、大便不成形等）')
          }
          if(this.insertForm.item_2_1_2_3=='1'){
            this.insertForm.item_2_1_2.push('便血（肉眼可见）')
          }
          if(this.insertForm.item_2_1_2_4=='1'){
            this.insertForm.item_2_1_2.push('其他（请具体阐明）')
          }

          // 判断之前是否违反
          let sysTime,sysTimeArray,sysYear,sysMonth;
              $axios_http({
                url: "/base/get/violation/getTime",
                vueObj: this
              }).then((res) => {
                sysTime=res.data.data;
                 //处理系统时间
                 if(sysTime){
                   sysTimeArray=sysTime.split('-');
                   sysYear=Number(sysTimeArray[0]);
                   sysMonth=Number(sysTimeArray[1])
                 }
                  //处理上一次结肠镜检查时间
                let newDateArray,newDateYear,newDateMonth;
                if(this.insertForm.item_2_4_1){
                newDateArray=this.insertForm.item_2_4_1.split('-');
                newDateYear=Number(newDateArray[0]);
                newDateMonth=Number(newDateArray[1]);
                }
                if((this.insertForm.item_2_4=="2" && (sysYear-newDateYear<5 || (sysYear-newDateYear==5 && sysMonth-newDateMonth<=0))) || (this.insertForm.item_5_2=="1" && this.insertForm.item_5_2_4=="1")){
                   this.editFlag=false;
                }else{
                   this.editFlag=true;
                }
              })

        })
      },
      //获取受试者审核表个人信息
      getCustomerInfo(){
        $axios_http({
          url: "/base/hospital/review/get/" + this.$route.query.sid,
          data: {},
          vueObj: this
        }).then((res) => {
          if(this.$route.query.id){
            // 编辑回显
            this.showData.site_id = res.data.data.siteId
            this.showData.sid = res.data.data.sid
            this.showData.name = res.data.data.name
            this.showData.sex = res.data.data.sex
            this.showData.idCard = res.data.data.idCard
            this.showData.phone = res.data.data.phone
            if(res.data.data.address){
              this.showData.address = res.data.data.address.replace('undefined','')
              this.showData.address = this.showData.address.replace('null','')
            }else{
              this.showData.address=res.data.data.province+res.data.data.city+res.data.data.area+res.data.data.township+res.data.data.village+res.data.data.cityOther
              this.showData.address=this.showData.address.replace('undefined','')
              this.showData.address=this.showData.address.replace('null','')
            }
            this.showData.investigator = res.data.data.investigator
            this.showData.reviewer = res.data.data.reviewer
            this.query();   //编辑回显
          }else{
            // 录入
          this.insertForm.site_id = res.data.data.siteId
          this.insertForm.sid = res.data.data.sid
          this.insertForm.name = res.data.data.name
          this.insertForm.sex = res.data.data.sex
          this.insertForm.idCard = res.data.data.idCard
          this.insertForm.phone = res.data.data.phone
            if(res.data.data.address){
              this.insertForm.address = res.data.data.address.replace('undefined','')
              this.insertForm.address = this.insertForm.address.replace('null','')
            }else{
              this.insertForm.address=res.data.data.province+res.data.data.city+res.data.data.area+res.data.data.township+res.data.data.village+res.data.data.cityOther
              this.insertForm.address=this.insertForm.address.replace('undefined','')
              this.insertForm.address = this.insertForm.address.replace('null','')
            }
          this.insertForm.investigator = res.data.data.investigator
          this.insertForm.reviewer = res.data.data.reviewer
          }
        })
      },
      submitForm(formName) {
        //按钮权限判断
        let _id=this.$refs.addBtn.$attrs.id;
        if(authority(_id)){
          return;
        }
        this.$refs[formName].validate((valid,obj) => {
          if (!valid) {
            for(var item in obj){
              for(let i = 0;i<this.rulesArr.length;i++){
                  if(item == this.rulesArr[i]){
                    this.$refs[item].$el.focus();
                    return
                  }
              }
              this.$refs[item].focus();
              break;
            }
          }else{
            if (this.insertForm.item_4_11_1 == '') {
              this.item_4_11_1_radioState = true
              document.getElementById('item_4_11_1' ).scrollIntoView(true);
              return
            } else if (this.insertForm.item_4_11_2 == '') {
              this.item_4_11_2_radioState = true
              return
            } else if (this.insertForm.item_4_11_3 == '') {
              this.item_4_11_3_radioState = true
              return
            } else if (this.insertForm.item_4_11_4 == '') {
              this.item_4_11_4_radioState = true
              return
            } else if (this.insertForm.item_4_11_5 == '') {
              this.item_4_11_5_radioState = true
              return
            } else if (this.insertForm.item_4_11_6 == '') {
              this.item_4_11_6_radioState = true
              return
            } else if (this.insertForm.item_4_11_7 == '') {
              this.item_4_11_7_radioState = true
              return
            } else if (this.insertForm.item_4_11_8 == '') {
              this.item_4_11_8_radioState = true
              return
            } else if (this.insertForm.item_4_11_9 == '') {
              this.item_4_11_9_radioState = true
              return
            }
          }
          if (valid) {
            this.insertForm.contact_telephone = ''
            this.insertForm.contact_telephone += this.insertForm.contact_area?this.insertForm.contact_area:''
            this.insertForm.contact_telephone += this.insertForm.contact_phone?this.insertForm.contact_phone:''

            let sysTime,sysTimeArray,sysYear,sysMonth;
              $axios_http({
                url: "/base/get/violation/getTime",
                vueObj: this
              }).then((res) => {
                sysTime=res.data.data;
                 //处理系统时间
                 if(sysTime){
                   sysTimeArray=sysTime.split('-');
                   sysYear=Number(sysTimeArray[0]);
                   sysMonth=Number(sysTimeArray[1])
                 }
                  //处理上一次结肠镜检查时间
                let newDateArray,newDateYear,newDateMonth;
                if(this.insertForm.item_2_4_1){
                newDateArray=this.insertForm.item_2_4_1.split('-');
                newDateYear=Number(newDateArray[0]);
                newDateMonth=Number(newDateArray[1]);
                }
                if(this.editFlag && ((this.insertForm.item_2_4=="2" && (sysYear-newDateYear<5 || (sysYear-newDateYear==5 && sysMonth-newDateMonth<=0))) || (this.insertForm.item_5_2=="1" && this.insertForm.item_5_2_4=="1"))){
                    this.$confirm('<p>请及时将该受试者退出研究并填写违反方案表。</p><p> (无效原因：在过去5年做过结肠镜检查)</p>', '该受试者随机分配无效', {
                        confirmButtonText: '保存，去填写违反方案表',
                        cancelButtonText: '取消',
                        dangerouslyUseHTMLString: true,
                        center: true
                      }).then(() => {
                        this.$message({
                          type: 'success',
                          message: '保存成功!'
                        });
                        if(this.$route.query.id){
                            // 编辑接口
                            this.insertForm.id=this.$route.query.id;
                            delete this.insertForm.address;
                            delete this.insertForm.area_dept_id
                            delete this.insertForm.community_dept_id
                            delete this.insertForm.delete_flag
                             $axios_http({
                              url: "/base/hospital/riskfactor/updateRiskfactor",
                              data: this.insertForm,
                              vueObj: this
                            }).then((res) => {
                              //显示操作成功浮动提示框
                              $axios_http({
                                url: "/base/add/violation/savescheme",
                                data:{
                                  sid:this.$route.query.sid,
                                  eventType:'1',
                                  schemeType:null,
                                  quitLogId:null
                                },
                                vueObj: this
                              }).then((res) => {
                                console.log('保存成功');
                                this.editFlag=true;
                                this.$router.push({ path: '/subjects/report4',query:{sid:this.$route.query.sid,schemeId:res.data.data.id,flag:this.$route.query.flag}})
                              })
                            })
                        }else{
                             // 新增接口
                             $axios_http({
                              url: "/base/hospital/riskfactor/insert",
                              data: this.insertForm,
                              vueObj: this
                            }).then((res) => {
                              //显示操作成功浮动提示框
                              $axios_http({
                                url: "/base/add/violation/savescheme",
                                data:{
                                  sid:this.$route.query.sid,
                                  eventType:'1',
                                  schemeType:null,
                                  quitLogId:null
                                },
                                vueObj: this
                              }).then((res) => {
                                console.log('保存成功');
                                this.$router.push({ path: '/subjects/report4',query:{sid:this.$route.query.sid,schemeId:res.data.data.id,flag:this.$route.query.flag}})
                              })
                            })
                        }
                          // $axios_http({
                          //   url: "/base/hospital/riskfactor/insert",
                          //   data: this.insertForm,
                          //   vueObj: this
                          // }).then((res) => {
                          //   //显示操作成功浮动提示框
                          //    $axios_http({
                          //     url: "/base/add/violation/savescheme",
                          //     data:{
                          //       sid:this.$route.query.sid,
                          //       eventType:'1',
                          //       schemeType:null,
                          //       quitLogId:null
                          //     },
                          //     vueObj: this
                          //   }).then((res) => {
                          //     console.log('保存成功');
                          //     this.$router.push({ path: '/subjects/report4',query:{sid:this.$route.query.sid,schemeId:res.data.data.id,flag:this.$route.query.flag}})
                          //   })
                          // })
                      }).catch(() => {
                      
                      });
                }else{
                  let _url='';
                  if(this.$route.query.id){
                    // 编辑
                    _url='/base/hospital/riskfactor/updateRiskfactor'
                    this.insertForm.survey_date=this.insertForm.survey_date.substring(0,10);
                    delete this.insertForm.delete_flag
                  }else{
                    // 新增
                    _url="/base/hospital/riskfactor/insert"
                  }
                  $axios_http({
                     url:_url ,
                     data: this.insertForm,
                     vueObj: this
                   }).then((res) => {
                     //显示操作成功浮动提示框
                     $successMsg(this, "提交成功")
                     if(this.$route.query.id){
                       this.$router.go(-1);
                     }else{
                        this.$router.replace({
                          path: '/home/riskFactorsResult',
                          query: {riskLevel: res.data.data.riskLevel, group: res.data.data.group}
                        })
                     }
                     this.editFlag=true;
                     //清空添加数据对话框数据
                     Object.assign(this.$data.insertForm, this.$options.data().insertForm)
                   })
                }
              })
           
            // $axios_http({
            //   url: "/base/hospital/riskfactor/insert",
            //   data: this.insertForm,
            //   vueObj: this
            // }).then((res) => {
            //   //显示操作成功浮动提示框
            //   $successMsg(this, "添加成功")
            //   this.$router.replace({
            //     path: '/home/riskFactorsResult',
            //     query: {riskLevel: res.data.data.riskLevel, group: res.data.data.group}
            //   })
            //   //清空添加数据对话框数据
            //   Object.assign(this.$data.insertForm, this.$options.data().insertForm)
            // })
          }
        });
      },
      resetForm(formName){
        this.$refs[formName].resetFields();
        this.$router.go(-1)
      }
    }
  }
</script>
<style scoped>
  .header {
    width: 100%;
    position: relative;
  }

  .riskFactorsTable tr td {
    width: 200px;
    line-height: 30px;
    color: #4d4d4d;
  }

  .returnBtn {
    position: absolute;
    left: 0px;
    top: -20px;
  }

  .resaveBtn {
    position: absolute;
    right: 0px;
    top: -20px;
  }

  .header h2 {
    text-align: center;
  }

  .title {
    width: 100%;
    margin-top: 10px;
    line-height: 40px;
    border-bottom: 1px solid #ededed;
    margin-bottom: 10px;
    color: #97a1be;

  }

  .option p {
    font-size: 14px;
    padding-left: 52px;
  }

  .contentMain {
    width: 90%;
    margin-left: 5%;

  }

  .indent {
    margin-left: 20px;

  }

  .indent2 {
    margin-left: 43px;
  }

  /*.signAgreement {
    padding-left: 200px;
  }*/

  .label {
    font-size: 14px;
    color: #606266;
    line-height: 40px;
  }
  .foodTable{
    margin-top: 20px;
  }

  .foodTable tr th, .foodTable tr td, .riskFactorsTable tr td {
    border: 1px solid #e5e5e0;
    text-align: center;
    height:30px;
    font-size:14px;
    line-height:30px;
  }

  .foodTable tr td {
    width: 100px;

  }

  .foodTable tr td:nth-child(1) {
    width: 200px;
  }

  .activeTime tr td:nth-child(1) {
    width: 500px;
  }

  .activeTime tr td {
    width: 300px;
    text-align: center;
  }

  .doctorDiagnosis tr td:nth-child(1) {
    width: 200px;
  }

  .doctorDiagnosis tr td {
    width: 300px;
    text-align: center;
  }

  .cancer tr td {
    width: 200px;
    text-align: center;
  }

  .item_5_2_table_width {
    width: 40px;
  }

  .nextPage {
    position: absolute;
    bottom: 0px;
    right: 20px;
  }

  .radio {
    margin-top: 20px;
  }

  .form-item {
    margin-top: 20px;
  }

  .item_5_2_age_table_width {
    width: 100px;
  }
  .left{
    text-align: left!important;
    padding-left:10px;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    font-weight: 700
  }
</style>
<style>
  #riskFactors .el-form-item {
    margin-bottom: 0px;
    display: inline-block;
  }
  #riskFactors .el-col {
    margin-bottom: 15px;
  }

  #riskFactors .el-checkbox-group {
    height: auto;
  }

  .option .el-form-item__error {
    top: 85%;
  }

  .answerBox .el-input__inner {
    padding: 0;
    font-weight: 800;
    text-align: center;
  }

  .el-form-item__error {
    padding: 0;
  }

  .ctable .el-form-item__error {
    position: relative;
  }
  #riskFactors .el-input.is-disabled .el-input__inner {
    background-color: #fff;
    border-color: #dcdfe6;
    color: #606266;
    cursor: not-allowed;
  }
</style>
