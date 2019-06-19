<template>
  <div class="" v-if="showRiskFactor_page" id="riskFactors">
    <div class="contentMain">
      <div class="header">
        <!--<router-link to="/home/home">-->
          <el-button size="mini" class="returnBtn" ref="return" @click="goBack()">返回</el-button>
        <!--</router-link>-->
        <!--<el-button size="mini" class="returnBtn" v-if="page2" @click="beforePage" >上一页</el-button>-->
        <h2>表A2-联系信息与危险因素调查表</h2>
        <!--<el-button size="mini" class="resaveBtn">保存</el-button>-->
      </div>
      <el-form :model="insertForm"  :label-position="labelPosition">
        <div class="page1" v-if="page1" style="position: relative">
          <p class="title">项目工作人员填写</p>
          <el-row>
            <el-col :span="12">
              <el-form-item label="调查日期" label-width="130px">
                <el-date-picker
                  v-model="insertForm.survey_date"
                  type="date"
                  size="small"
                  disabled
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="调查员签名" label-width="130px">
                <el-input v-model="insertForm.investigator" disabled auto-complete="off" size="small"
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
              <el-form-item label="审核员签名" label-width="130px">
                <el-input v-model="insertForm.reviewer"   disabled auto-complete="off" size="small"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="筛查现场工作人员编码" label-width="170px">
                <el-input v-model="insertForm.investigator_code"   disabled auto-complete="off" size="small"
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
            <el-form-item label="其他联系电话（可为亲属号码）：" label-width="230px">
              <el-form-item label="（与本人关系）：" label-width="150px" prop="contact_relationship" >
                <el-input   disabled v-model="insertForm.contact_relationship" auto-complete="off" size="small"
                ></el-input>
              </el-form-item>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="手机：" label-width="100px" prop="contact_cell_phone">
              <el-input   disabled v-model="insertForm.contact_cell_phone" auto-complete="off" size="small"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="固定电话：" label-width="100px" prop="contact_telephone">
              <el-input   disabled v-model="insertForm.contact_telephone" auto-complete="off" size="small"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="常住地址：" label-width="100px" >
              <span>{{insertForm.address}}</span>
            </el-form-item>
          </el-col>
          <p class="title">第一部分  一般信息</p>
          <el-col :span="24">
            <el-form-item label="1.1您的身高：" label-width="120px" prop="height">
              <el-input disabled v-model="insertForm.height" auto-complete="off" size="small"></el-input>
            </el-form-item>
            <span>厘米</span>
          </el-col>
          <el-col :span="24">
            <el-form-item label="1.2您的体重：" label-width="120px" prop="weight">
              <el-input   disabled v-model="insertForm.weight" auto-complete="off" size="small"
                       ></el-input>
            </el-form-item>
            <span>公斤</span>
          </el-col>
          <el-col :span="24">
            <el-form-item label="1.3您的腰围：" label-width="120px" prop="yao_wei">
              <el-input   disabled v-model="insertForm.yao_wei" auto-complete="off" size="small"
                        ></el-input>
            </el-form-item>
            <span>厘米</span>
          </el-col>
          <el-col :span="24">
            <span class="label">1.4您的最高学历是：</span>
            <el-form-item  class="indent" prop="education">
              <el-radio-group v-model="insertForm.education"   disabled >
                <el-radio :label="1">未正式上过学</el-radio>
                <el-radio :label="2">小学</el-radio>
                <el-radio :label="3">初中</el-radio>
                <el-radio :label="4">高中/中专</el-radio>
                <el-radio :label="5">大学/大专</el-radio>
                <el-radio :label="6">研究生及以上</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <span class="label">1.5 您目前的婚姻状况：</span>
            <el-form-item class="indent" prop="marriage">
              <el-radio-group v-model="insertForm.marriage"  disabled  >
                <el-radio :label="1">未婚</el-radio>
                <el-radio :label="2">同居（不在婚但有伴侣）</el-radio>
                <el-radio :label="3">已婚</el-radio>
                <el-radio :label="4">离婚（不在婚但有伴侣）</el-radio>
                <el-radio :label="5">丧偶（不在婚但有伴侣）</el-radio>
                <el-radio :label="6">其它</el-radio>
              </el-radio-group>
              <el-form-item class="indent" prop="marriage_other" style="width: 80px">
                <el-input   v-model="insertForm.marriage_other" :disabled='true' auto-complete="off" size="small"
                ></el-input>
              </el-form-item>
            </el-form-item>
          </el-col>
          <p class="title">第二部分  肠道疾病和肠道检查史</p>
          <el-col :span="24">
            <el-form-item label="2.1您现在是否存在腹部不适或其他肠道异常的症状" prop="item_2_1">
              <div class="indent">
                <br>
                <el-radio-group v-model="insertForm.item_2_1"   disabled >
                  <el-radio :label="1">否</el-radio>
                  <el-radio :label="2">是</el-radio>
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
                  disabled
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  size="small"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item class="indent2" prop="item_2_1_2" label="2.1.2主要的症状为？">
                <br>
                  <el-checkbox disabled v-model="insertForm.item_2_1_2_1" :true-label='1' :false-label='2' label="腹痛"></el-checkbox>
                  <br>
                  <el-checkbox disabled v-model="insertForm.item_2_1_2_2" :true-label='1' :false-label='2'label="排便异常（腹泻、便秘、大便不成形等）" ></el-checkbox>
                  <br>
                  <el-checkbox disabled v-model="insertForm.item_2_1_2_3" :true-label='1' :false-label='2'label="便血（肉眼可见）"></el-checkbox>
                  <br>
                  <el-checkbox disabled v-model="insertForm.item_2_1_2_4" :true-label='1' :false-label='2'label="其他（请具体阐明）"></el-checkbox>
                  <el-form-item label=""  prop="item_2_1_2_4_other" class="longInput">
                    <el-input   disabled v-model="insertForm.item_2_1_2_4_other" auto-complete="off" size="small"
                    ></el-input>
                  </el-form-item>
              </el-form-item>
            </el-col>
          </div>
          <el-col :span="24">
            <el-form-item label="2.2 您是否曾经由于肠道疾病而服用药物？" prop="item_2_2">
              <div class="indent">
                <br>
                <el-radio-group v-model="insertForm.item_2_2"  disabled >
                  <el-radio :label="1">否</el-radio>
                  <br>
                  <el-radio :label="2" class="radio">是(药物的名称为)</el-radio>
                  <el-form-item label="" labelWidth="20px" prop="item_2_2_1">
                    <el-input   disabled v-model="insertForm.item_2_2_1"  auto-complete="off" size="small"
                    ></el-input>
                  </el-form-item>
                </el-radio-group>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="2.3 您是否曾经由于肠道不适而去医院做过检查？" prop="item_2_3">
              <div class="indent">
                <br>
                <el-radio-group v-model="insertForm.item_2_3"  disabled >

                  <el-radio :label="1">否</el-radio>
                  <br>
                  <el-radio :label="2" class="radio">是</el-radio>
                </el-radio-group>
              </div>
            </el-form-item>
          </el-col>
          <div v-if="insertForm.item_2_3 != '1'">
            <el-col :span="24">
              <el-form-item label="2.3.1 检查的项目为" label-width="180px" class="indent2" prop="item_2_3_1">
                <el-input   disabled v-model="insertForm.item_2_3_1" auto-complete="off" size="small"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="2.3.2 最后一次检查的时间为" label-width="200px" class="indent2" prop="item_2_3_2">
                <el-date-picker
                  v-model="insertForm.item_2_3_2"
                  type="date"
                  disabled
                  size="small"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </div>
          <el-col :span="24">
            <el-form-item label="2.4 您是否曾经做过结肠镜检查？" prop="item_2_4">
              <div class="indent">
                <br>
                <el-radio-group v-model="insertForm.item_2_4"   disabled >
                  <el-radio :label="1">否</el-radio>
                  <br>
                  <el-radio :label="2" class="radio">是</el-radio>
                </el-radio-group>
              </div>
            </el-form-item>
          </el-col>
          <div v-if="insertForm.item_2_4 != '1'">
            <el-col :span="24">
              <el-form-item label="2.4.1上一次肠镜检查的时间为" label-width="220px" class="indent2" prop="item_2_4_1">
                <el-date-picker
                  v-model="insertForm.item_2_4_1"
                  type="date"
                  disabled
                  size="small"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="2.4.2 总共做过几次肠镜？"  label-width="200px" class="indent2" prop="item_2_4_2">
                <el-input   disabled v-model="insertForm.item_2_4_2"  auto-complete="off" size="small"
                ></el-input>
              </el-form-item>
              次
            </el-col>
            <el-col :span="24">
              <el-form-item label="2.4.3 是否在结肠镜检查中发现大肠息肉 / 腺瘤？" label-width="340px" class="indent2" prop="item_2_4_3">
                <div class="indent">
                  <br>
                  <el-radio-group  disabled  v-model="insertForm.item_2_4_3" >
                    <el-radio :label="1">否</el-radio>
                    <el-radio :label="2" class="radio">是</el-radio>
                    <el-radio :label="3" class="radio">不清楚</el-radio>
                  </el-radio-group>
                </div>
              </el-form-item>
            </el-col>
          </div>
          <p class="title">第三部分  药物史</p>
          <el-form-item  label="3.1  镇痛药或者抗风湿类药物：您是否偶尔或规律服用镇痛药或抗风湿类药物（例如：阿司匹林、对乙酰氨基酚、消炎痛、扶他林、扑热息痛、布洛芬等）？" prop="item_3_1">
            <div class="indent">

              <el-radio-group  disabled v-model="insertForm.item_3_1">
                <el-radio class='radio' :label="1">否</el-radio>
                <br>
                <el-radio class='radio' :label="2">是，偶尔</el-radio>
                <br>
                <el-radio class='radio' :label="3">是，规律服用（每周大于1次)</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>
          <div v-if="insertForm.item_3_1 != '1'">
            <el-col :span="24">
              <el-form-item   disabled label="3.1.1 总共服用的年数" label-width="180px" class="indent2" prop="item_3_1_1">
                <el-input   disabled v-model.number="insertForm.item_3_1_1"   auto-complete="off" size="small"
                ></el-input>
              </el-form-item>年
            </el-col>
            <el-col :span="24">

              <el-form-item class="indent2" label=" 3.1.2 您现在是否正在服用镇痛药或抗风湿类药物？" prop="item_3_1_2">
                <el-radio-group   disabled v-model="insertForm.item_3_1_2"    >
                  <el-radio :label="1">是，药物名称为</el-radio>
                  <el-form-item labelWidth="20px" prop="item_3_1_2_1">
                    <el-input   disabled v-model="insertForm.item_3_1_2_1" auto-complete="off" size="small"
                    ></el-input>
                  </el-form-item>
                  <br>
                  <el-radio :label="2">否 上次服用的年份为？</el-radio>
                  <el-form-item prop="item_3_1_2_2" labelWidth="20px">
                    <el-input   disabled v-model="insertForm.item_3_1_2_2"  auto-complete="off" size="small"></el-input>
                  </el-form-item>年
                </el-radio-group>
              </el-form-item>
            </el-col>
          </div>
          <el-form-item label=" 3.2  抗凝血药物：您是否偶尔或规律服用过抗凝血药物（例如：华法林、肝素、达比加群、通心络等）?" prop="item_3_2">
            <div class="indent">
              <el-radio-group   disabled v-model="insertForm.item_3_2">
                <el-radio :label="1" class="radio">否</el-radio>
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
                <el-input   disabled v-model.number="insertForm.item_3_2_1"   auto-complete="off" size="small"></el-input>
              </el-form-item>
              年
            </el-col>
            <el-col :span="24">
              <el-form-item label="3.2.2 您现在是否正在服用镇痛药或抗风湿类药物？" class="indent2" >
                <el-radio-group v-model="insertForm.item_3_2_2" disabled >
                  <el-radio :label="1" >是，药物名称为</el-radio>
                  <el-form-item labelWidth="20px" prop="item_3_2_2_1">
                    <el-input v-model="insertForm.item_3_2_2_1" disabled auto-complete="off" size="small"></el-input>
                  </el-form-item>
                  <br>
                  <el-radio :label="2" >否 上次服用的年份为？</el-radio>
                  <el-form-item prop="item_3_2_2_2" labelWidth="20px">
                    <el-input v-model.number="insertForm.item_3_2_2_2" disabled auto-complete="off" size="small"></el-input>
                  </el-form-item>年
                </el-radio-group>
              </el-form-item>
            </el-col>
          </div>
          <div v-if="insertForm.sex == '2'">
            <el-form-item  label="3.3  激素替代治疗：您是否曾经接受过或者目前正在接受激素替代治疗（雌激素或雌 / 孕激素联合治疗，给药途径包括口服、皮贴、涂抹霜剂或凝胶、经阴道使用的霜、片、栓、硅胶环等）" prop="item_3_3">
              <div class="indent">
                <el-radio-group   disabled v-model="insertForm.item_3_3" >
                  <el-radio :label="1">否</el-radio>
                  <br>
                  <el-radio :label="2">是，总共服药年数</el-radio>
                  <el-form-item class="indent" prop="item_3_3_years">
                    <el-input   disabled v-model="insertForm.item_3_3_years" auto-complete="off" size="small"
                    ></el-input>
                  </el-form-item>
                </el-radio-group>
              </div>
            </el-form-item>
            <div v-if="insertForm.item_3_3 != '1'">
              <el-col :span="24">
                <p class="label indent2">
                </p>
                <el-form-item label=" 3.3.1 您现在是否正在接受激素替代治疗？" class="indent2" prop="item_3_3_1">
                  <br>
                  <el-radio-group   disabled v-model="insertForm.item_3_3_1"  prop="item_3_3_1">
                    <el-radio :label="1">是，药物名称为</el-radio>
                    <el-form-item labelWidth="20px" prop="item_3_3_1_1">
                      <el-input   disabled v-model="insertForm.item_3_3_1_1" auto-complete="off" size="small"
                      ></el-input>
                    </el-form-item>
                    <br>
                    <el-radio :label="2">否 上次服用的年份为？</el-radio>
                    <el-form-item prop="item_3_3_1_2" labelWidth="20px">
                      <el-input   disabled v-model.number="insertForm.item_3_3_1_2"  auto-complete="off" size="small"></el-input>
                    </el-form-item>年
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </div>
          </div>
          <p class="title">第四部分  生活方式和习惯</p>
          <p>A、吸烟和被动吸烟</p>
          <el-col :span="24">
            <el-form-item label="4.1 您是否曾经吸烟？" prop="item_4_1" >
              <div class="indent">
                <el-radio-group   disabled v-model="insertForm.item_4_1"  ref="item_4_1">
                  <el-radio :label="1" class="radio" >不吸烟</el-radio>
                  <br>
                  <el-radio :label="2" class="radio">吸烟</el-radio>
                </el-radio-group>
              </div>
            </el-form-item>
          </el-col>
          <div v-if="insertForm.item_4_1 != '1'">
            <el-col :span="24">
              <el-form-item label="4.2 您首次吸烟的年龄为？：" label-width="200px" prop="item_4_2" >
                <el-input   disabled v-model.number="insertForm.item_4_2" auto-complete="off" size="small" ref="item_4_2"></el-input>
              </el-form-item>
              <span>岁</span>
            </el-col>
            <el-col :span="24">
              <el-form-item label="4.3 您最近的吸烟频率如何？" prop="item_4_3">
                <div class="indent">
                  <el-radio-group   disabled v-model="insertForm.item_4_3" >
                    <el-radio :label="1" class="radio">每天</el-radio>
                    <br>
                    <el-radio :label="2" class="radio">偶尔吸烟</el-radio>
                    <br>
                    <el-radio :label="3" class="radio">已戒烟</el-radio>
                  </el-radio-group>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-if="insertForm.item_4_3 == '3'">
              <el-form-item class="indent2" label="4.3.1如果已经戒烟，您最后一次吸烟是什么时候？" prop="item_4_3_1">
                <el-radio-group   disabled v-model="insertForm.item_4_3_1" >
                  <el-radio :label="1" class="radio">半年前</el-radio>
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
              <el-form-item label="4.4  您总共吸烟的年数为？" label-width="200px" prop="item_4_4">
                <el-input    disabled v-model.number="insertForm.item_4_4" auto-complete="off" size="small"
                ></el-input>
              </el-form-item>
              <span>年</span>
            </el-col>
            <el-col :span="24">
              <el-form-item label="4.5  您现在/过去吸烟时平均每天吸烟的支数为？" label-width="320px" prop="item_4_5">
                <el-input    disabled v-model.number="insertForm.item_4_5" auto-complete="off" size="small"
                ></el-input>
              </el-form-item>
              <span>支</span>
            </el-col>
          </div>
          <el-col :span="24">
            <el-form-item prop="item_4_6" label="4.6  您是否（正在或曾经）和吸烟者一同居住？">
              <el-radio-group   disabled v-model="insertForm.item_4_6" >
                <el-radio :label="2" class="radio">否</el-radio>
                <br>
                <el-radio :label="1" class="radio">是</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item  prop="item_4_7" label="4.7  您工作过的室内场所中是否有人经常吸烟？">
              <el-radio-group   disabled v-model="insertForm.item_4_7" >
                <el-radio :label="2" class="radio">否</el-radio>
                <br>
                <el-radio :label="1" class="radio">是</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="4.8 吸二手烟的年数（与研究对象一起生活的家人每天吸烟，一起生活的年数，无则填0 )" label-width="570px" prop="item_4_8">
              <el-input    disabled v-model.number="insertForm.item_4_8" auto-complete="off" size="small"
              ></el-input>
            </el-form-item>
            <span>年</span>
          </el-col>
          <p>B、饮酒</p>
          <el-col :span="24">
            <el-form-item label="4.9  您多长时间饮一次酒 ？" prop="item_4_9">
              <div class="indent">
                <el-radio-group   disabled v-model="insertForm.item_4_9" >
                  <el-radio :label="1" class="radio">从不饮酒</el-radio>
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
            <el-form-item prop="item_4_10" label="4.10 平均每周饮酒含多少单位酒精？（1单位酒精约为：350毫升啤酒，或150毫升葡萄酒，或50毫升（1两）白酒；饮两种及以上类型酒时酒精量累加）">
              <div class="indent">
                <el-radio-group   disabled v-model="insertForm.item_4_10" >
                  <el-radio class="radio" :label="1">1单位及以下</el-radio>
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
          <p>C、饮食</p>
          <p class="label">4.11 在过去12个月中，您以下食物的食用频率如何？</p>
          <p style="font-size:12px;">（填写说明：请在符合描述的方格中打钩）</p>
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
              <td>肉类（猪、牛、羊肉等)</td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_1" :label="1"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_1" :label="2"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_1" :label="3"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_1" :label="4"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_1" :label="5"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_1" :label="6"><span style="display: none">www</span></el-radio>
              </td>
              <td style="border: none;color: red;font-size: 12px;text-align: left;padding-left: 20px;" v-show="item_4_11_1_radioState">
                未选择
              </td>
            </tr>
            <tr>
              <td>鱼/禽肉（鸡、鸭、鹅肉等）</td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_2" :label="1"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_2" :label="2"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_2" :label="3"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_2" :label="4"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_2" :label="5"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_2" :label="6"><span style="display: none">www</span></el-radio>
              </td>
              <td style="border: none;color: red;font-size: 12px;text-align: left;padding-left: 20px;" v-show="item_4_11_2_radioState">
                未选择
              </td>
            </tr>
            <tr>
              <td>蛋类（鸡蛋、鸭蛋等）</td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_3" :label="1"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_3" :label="2"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_3" :label="3"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_3" :label="4"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_3" :label="5"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio  disabled  v-model="insertForm.item_4_11_3" :label="6"><span style="display: none">www</span></el-radio>
              </td>
              <td style="border: none;color: red;font-size: 12px;text-align: left;padding-left: 20px;" v-show="item_4_11_3_radioState">
                未选择
              </td>
            </tr>
            <tr>
              <td>奶类（牛奶、羊奶）</td>
              <td>
                <el-radio  disabled  v-model="insertForm.item_4_11_4" :label="1"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_4" :label="2"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_4" :label="3"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_4" :label="4"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_4" :label="5"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_4" :label="6"><span style="display: none">www</span></el-radio>
              </td>
              <td style="border: none;color: red;font-size: 12px;text-align: left;padding-left: 20px;" v-show="item_4_11_4_radioState">
                未选择
              </td>
            </tr>
            <tr>
              <td>香肠</td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_5" :label="1"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_5" :label="2"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_5" :label="3"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_5" :label="4"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio  disabled  v-model="insertForm.item_4_11_5" :label="5"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_5" :label="6"><span style="display: none">www</span></el-radio>
              </td>
              <td style="border: none;color: red;font-size: 12px;text-align: left;padding-left: 20px;" v-show="item_4_11_5_radioState">
                未选择
              </td>
            </tr>
            <tr>
              <td>细粮（大米、面食）</td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_6" :label="1"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_6" :label="2"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_6" :label="3"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_6" :label="4"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_6" :label="5"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_6" :label="6"><span style="display: none">www</span></el-radio>
              </td>
              <td style="border: none;color: red;font-size: 12px;text-align: left;padding-left: 20px;" v-show="item_4_11_6_radioState">
                未选择
              </td>
            </tr>
            <tr>
              <td>粗粮（五谷杂粮，包括小米、玉米、高粱等）</td>
              <td>
                <el-radio  disabled  v-model="insertForm.item_4_11_7" :label="1"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_7" :label="2"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_7" :label="3"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio  disabled  v-model="insertForm.item_4_11_7" :label="4"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_7" :label="5"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_7" :label="6"><span style="display: none">www</span></el-radio>
              </td>
              <td style="border: none;color: red;font-size: 12px;text-align: left;padding-left: 20px;" v-show="item_4_11_7_radioState">
                未选择
              </td>
            </tr>
            <tr>
              <td>水果</td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_8" :label="1"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_8" :label="2"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_8" :label="3"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio  disabled  v-model="insertForm.item_4_11_8" :label="4"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_8" :label="5"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio  disabled  v-model="insertForm.item_4_11_8" :label="6"><span style="display: none">www</span></el-radio>
              </td>
              <td style="border: none;color: red;font-size: 12px;text-align: left;padding-left: 20px;" v-show="item_4_11_8_radioState">
                未选择
              </td>
            </tr>
            <tr>
              <td>新鲜蔬菜</td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_9" :label="1"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_9" :label="2"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_9" :label="3"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_9" :label="4"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_9" :label="5"><span style="display: none">www</span></el-radio>
              </td>
              <td>
                <el-radio   disabled v-model="insertForm.item_4_11_9" :label="6"><span style="display: none">www</span></el-radio>
              </td>
              <td style="border: none;color: red;font-size: 12px;text-align: left;padding-left: 20px;" v-show="item_4_11_9_radioState">
                未选择
              </td>

            </tr>
          </table>

          <p>D、运动</p>
          <p class="label">4.12  在过去12个月中，您每周从事以下活动的时间为多少？</p>
          <p style="font-size:12px;">（填写说明：请您填写每周从事相应活动的时间，30分钟以内算0.5小时，30-59分钟算1小时，未做过相应活动请填写0）</p>
          <table class="foodTable activeTime">
            <tr>
              <td>活动类型</td>
              <td>小时/周</td>
            </tr>
            <tr>
              <td>照顾其他成人</td>
              <td>
                <el-form-item prop="item_4_12_1" :show-message="false">
                  <el-input  disabled  v-model.number="insertForm.item_4_12_1" auto-complete="off" size="small"
                  ></el-input>
                </el-form-item>
                <span>小时</span>
              </td>
            </tr>
            <tr>
              <td>照顾婴儿/儿童</td>
              <td>
                <el-form-item prop="item_4_12_2" :show-message="false">
                  <el-input   disabled v-model.number="insertForm.item_4_12_2" auto-complete="off" size="small"
                  ></el-input>
                </el-form-item>
                <span>小时</span>
              </td>
            </tr>
            <tr>
              <td>中等强度体力家务劳动（包括扫地、擦玻璃、洗衣服、做饭、整理房间等）</td>
              <td>
                <el-form-item prop="item_4_12_3" :show-message="false">
                  <el-input   disabled v-model.number="insertForm.item_4_12_3" auto-complete="off" size="small"
                  ></el-input>
                </el-form-item>
                <span>小时</span>
              </td>
            </tr>
            <tr>
              <td>高强度体力家务劳动（包括搬运重物、砍柴、扫雪、拖地板等）</td>
              <td>
                <el-form-item prop="item_4_12_4" :show-message="false">
                  <el-input  disabled  v-model.number="insertForm.item_4_12_4" auto-complete="off" size="small"
                  ></el-input>
                </el-form-item>
                <span>小时</span>
              </td>
            </tr>
            <tr>
              <td>球类运动（篮球、乒乓球、羽毛球等）</td>
              <td>
                <el-form-item prop="item_4_12_5" :show-message="false">
                  <el-input  disabled  v-model.number="insertForm.item_4_12_5" auto-complete="off" size="small"
                  ></el-input>
                </el-form-item>
                <span>小时</span>
              </td>
            </tr>
            <tr>
              <td>散步或慢跑</td>
              <td>
                <el-form-item prop="item_4_12_6" :show-message="false">
                  <el-input  disabled  v-model.number="insertForm.item_4_12_6" auto-complete="off" size="small"
                  ></el-input>
                </el-form-item>
                <span>小时</span>
              </td>
            </tr>
            <tr>
              <td>骑自行车</td>
              <td>
                <el-form-item prop="item_4_12_7" :show-message="false">
                  <el-input  disabled  v-model.number="insertForm.item_4_12_7" auto-complete="off" size="small"
                  ></el-input>
                </el-form-item>
                <span>小时</span>
              </td>
            </tr>
            <tr>
              <td>高强度身体锻炼（包括游泳、爬山、器械锻炼等）</td>
              <td>
                <el-form-item prop="item_4_12_8" :show-message="false">
                  <el-input  disabled  v-model.number="insertForm.item_4_12_8" auto-complete="off" size="small"
                  ></el-input>
                </el-form-item>
                <span>小时</span>
              </td>
            </tr>
            <tr>
              <td>低强度身体锻炼（包括太极、瑜伽等）</td>
              <td>
                <el-form-item prop="item_4_12_9" :show-message="false">
                  <el-input   disabled v-model.number="insertForm.item_4_12_9" auto-complete="off" size="small"
                  ></el-input>
                </el-form-item>
                <span>小时</span>
              </td>
            </tr>
            <tr>
              <td>坐着看电视或听收音机</td>
              <td>
                <el-form-item prop="item_4_12_10" :show-message="false">
                  <el-input  disabled  v-model.number="insertForm.item_4_12_10" auto-complete="off" size="small"
                  ></el-input>
                </el-form-item>
                <span>小时</span>
              </td>
            </tr>
          </table>
          <p class="title">第五部分  既往疾病史</p>
          <el-form-item  prop="item_5_1" style="margin-bottom: 20px;" label="5.1 医生是否曾经诊断过您曾患过以下疾病？如果是，第一次患病是在何时？">
            <el-radio-group   disabled v-model="insertForm.item_5_1"  >
              <el-radio :label="2" >否</el-radio>
              <el-radio :label="1" >是</el-radio>
            </el-radio-group>
          </el-form-item>
          <table class="foodTable doctorDiagnosis ctable" v-if="insertForm.item_5_1 != '2'">
            <tr>
              <td>疾病或症状</td>
              <td>是否患过此病（1. 是 2. 否）</td>
              <td>确诊年龄（岁）</td>
            </tr>
            <tr>
              <td>慢性腹泻*</td>
              <td>
                <el-form-item  prop="item_5_1_1">
                  <el-input   disabled v-model="insertForm.item_5_1_1" auto-complete="off" size="small"
                            class="item_5_2_table_width"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="item_5_1_1_age" :show-message="true">
                  <el-input   disabled v-model.number="insertForm.item_5_1_1_age"  auto-complete="off" size="small"
                            class="item_5_2_age_table_width"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>慢性结肠炎</td>
              <td>
                <el-form-item prop="item_5_1_2">
                  <el-input   disabled v-model="insertForm.item_5_1_2" auto-complete="off" size="small"
                            class="item_5_2_table_width"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="item_5_1_2_age" :show-message="false">
                  <el-input   disabled v-model.number="insertForm.item_5_1_2_age" auto-complete="off" size="small"
                            class="item_5_2_age_table_width"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>慢性便秘**</td>
              <td>
                <el-form-item prop="item_5_1_3">
                  <el-input   disabled v-model="insertForm.item_5_1_3" auto-complete="off" size="small"
                            class="item_5_2_table_width"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="item_5_1_3_age" :show-message="false">
                  <el-input   disabled v-model.number="insertForm.item_5_1_3_age" auto-complete="off" size="small"
                            class="item_5_2_age_table_width"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>粘液和/或血便</td>
              <td>
                <el-form-item prop="item_5_1_4">
                  <el-input   disabled v-model="insertForm.item_5_1_4" auto-complete="off" size="small"
                            class="item_5_2_table_width"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="item_5_1_4_age" :show-message="false">
                  <el-input   disabled v-model.number="insertForm.item_5_1_4_age" auto-complete="off" size="small"
                            class="item_5_2_age_table_width"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>肠息肉</td>
              <td>
                <el-form-item  prop="item_5_1_5">
                  <el-input   disabled v-model="insertForm.item_5_1_5" auto-complete="off" size="small"
                            class="item_5_2_table_width"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="item_5_1_5_age" :show-message="false">
                  <el-input  disabled  v-model.number="insertForm.item_5_1_5_age" auto-complete="off" size="small"
                            class="item_5_2_age_table_width"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>慢性阑尾炎或阑尾切除史</td>
              <td>
                <el-form-item  prop="item_5_1_6">
                  <el-input   disabled v-model="insertForm.item_5_1_6" auto-complete="off" size="small"
                            class="item_5_2_table_width"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="item_5_1_6_age" :show-message="false">
                  <el-input   disabled v-model.number="insertForm.item_5_1_6_age" auto-complete="off" size="small"
                            class="item_5_2_age_table_width"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>糖尿病</td>
              <td>
                <el-form-item  prop="item_5_1_7">
                  <el-input   disabled v-model="insertForm.item_5_1_7" auto-complete="off" size="small"
                            class="item_5_2_table_width" ></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="item_5_1_7_age" :show-message="false">
                  <el-input   disabled v-model.number="insertForm.item_5_1_7_age" auto-complete="off" size="small"
                            class="item_5_2_age_table_width"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>高血压</td>
              <td>
                <el-form-item  prop="item_5_1_8">
                  <el-input   disabled v-model="insertForm.item_5_1_8" auto-complete="off" size="small"
                            class="item_5_2_table_width" ></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="item_5_1_8_age" :show-message="false">
                  <el-input   disabled v-model.number="insertForm.item_5_1_8_age" auto-complete="off" size="small"
                            class="item_5_2_age_table_width"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>中风</td>
              <td>
                <el-form-item  prop="item_5_1_9">
                  <el-input   disabled v-model="insertForm.item_5_1_9" auto-complete="off" size="small"
                            class="item_5_2_table_width"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="item_5_1_9_age" :show-message="false">
                  <el-input   disabled v-model.number="insertForm.item_5_1_9_age" auto-complete="off" size="small"
                            class="item_5_2_age_table_width" ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>心脏病或心衰</td>
              <td>
                <el-form-item  prop="item_5_1_10">
                  <el-input   disabled v-model="insertForm.item_5_1_10" auto-complete="off" size="small"
                            class="item_5_2_table_width"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="item_5_1_10_age" :show-message="true">
                  <el-input  disabled  v-model.number="insertForm.item_5_1_10_age" auto-complete="off" size="small"
                            class="item_5_2_age_table_width"></el-input>
                </el-form-item>
              </td>
            </tr>
          </table>
          <p class="label">* 慢性腹泻指近2年来腹泻累计持续超过3个月，每次发作持续时间在1周以上；</p>
          <p class="label">** 慢性便秘指近2年来便秘每年在2个月以上；</p>
          <el-col :span="24">
            <p class="label">5.2  您是否患过以下任何一种癌症？</p>
            <el-form-item class="indent" prop="item_5_2">
              <el-radio-group   disabled v-model="insertForm.item_5_2" >
                <el-radio  :label="2" >否</el-radio>
                <el-radio  :label="1" >是</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <table class="foodTable cancer">
            <tr>
              <td>疾病名称</td>
              <td>是否曾患此癌症（1. 是 2. 否）</td>
              <td>确诊年龄</td>
              <td>疾病名称</td>
              <td>是否曾患此癌症（1. 是 2. 否）</td>
              <td>确诊年龄</td>
            </tr>
            <tr>
              <td>膀胱癌</td>
              <td>
                <el-form-item>
                  <el-input   disabled v-model="insertForm.item_5_2_1" auto-complete="off" size="small"
                            class="item_5_2_table_width"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="item_5_2_1_age" :show-message="false">
                  <el-input   disabled v-model="insertForm.item_5_2_1_age" auto-complete="off" size="small"
                  ></el-input>
                </el-form-item>
              </td>
              <td>肺癌</td>
              <td>
                <el-form-item>
                  <el-input  disabled  v-model="insertForm.item_5_2_8" auto-complete="off" size="small"
                            class="item_5_2_table_width"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="item_5_2_8_age" :show-message="false">
                  <el-input  disabled  v-model="insertForm.item_5_2_8_age" auto-complete="off" size="small"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>乳腺癌</td>
              <td>
                <el-form-item>
                  <el-input   disabled v-model="insertForm.item_5_2_2" auto-complete="off" size="small"
                            class="item_5_2_table_width"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="item_5_2_2_age" :show-message="false">
                  <el-input  disabled  v-model="insertForm.item_5_2_2_age" auto-complete="off" size="small"
                  ></el-input>
                </el-form-item>
              </td>
              <td>口腔癌</td>
              <td>
                <el-form-item>
                  <el-input   disabled v-model="insertForm.item_5_2_9" auto-complete="off" size="small"
                            class="item_5_2_table_width"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="item_5_2_9_age" :show-message="false">
                  <el-input   disabled v-model="insertForm.item_5_2_9_age" auto-complete="off" size="small"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>子宫颈癌</td>
              <td>
                <el-form-item>
                  <el-input   disabled v-model="insertForm.item_5_2_3" auto-complete="off" size="small"
                            class="item_5_2_table_width"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="item_5_2_3_age" :show-message="false">
                  <el-input   disabled v-model="insertForm.item_5_2_3_age" auto-complete="off" size="small"
                  ></el-input>
                </el-form-item>
              </td>
              <td>鼻癌</td>
              <td>
                <el-form-item>
                  <el-input  disabled  v-model="insertForm.item_5_2_10" auto-complete="off" size="small"
                            class="item_5_2_table_width"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="item_5_2_10_age" :show-message="false">
                  <el-input   disabled v-model="insertForm.item_5_2_10_age" auto-complete="off" size="small"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>结直肠癌</td>
              <td>
                <el-form-item>
                  <el-input  disabled  v-model="insertForm.item_5_2_4" auto-complete="off" size="small"
                            class="item_5_2_table_width"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="item_5_2_4_age" :show-message="false">
                  <el-input  disabled  v-model="insertForm.item_5_2_4_age" auto-complete="off" size="small"
                  ></el-input>
                </el-form-item>
              </td>
              <td>胰腺癌</td>
              <td>
                <el-form-item>
                  <el-input   disabled v-model="insertForm.item_5_2_11" auto-complete="off" size="small"
                            class="item_5_2_table_width"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="item_5_2_11_age" :show-message="false">
                  <el-input   disabled v-model="insertForm.item_5_2_11_age" auto-complete="off" size="small"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>食管癌</td>
              <td>
                <el-form-item>
                  <el-input  disabled  v-model="insertForm.item_5_2_5" auto-complete="off" size="small"
                            class="item_5_2_table_width"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="item_5_2_5_age" :show-message="false">
                  <el-input   disabled v-model="insertForm.item_5_2_5_age" auto-complete="off" size="small"
                  ></el-input>
                </el-form-item>
              </td>
              <td>胃癌</td>
              <td>
                <el-form-item>
                  <el-input  disabled  v-model="insertForm.item_5_2_12" auto-complete="off" size="small"
                            class="item_5_2_table_width"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="item_5_2_12_age" :show-message="false">
                  <el-input  disabled  v-model="insertForm.item_5_2_12_age" auto-complete="off" size="small"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>肾癌</td>
              <td>
                <el-form-item>
                  <el-input   disabled v-model="insertForm.item_5_2_6" auto-complete="off" size="small"
                            class="item_5_2_table_width"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="item_5_2_6_age" :show-message="false">
                  <el-input  disabled  v-model="insertForm.item_5_2_6_age" auto-complete="off" size="small"
                  ></el-input>
                </el-form-item>
              </td>
              <td>甲状腺癌</td>
              <td>
                <el-form-item>
                  <el-input   disabled v-model="insertForm.item_5_2_13" auto-complete="off" size="small"
                            class="item_5_2_table_width"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="item_5_2_13_age" :show-message="false">
                  <el-input  disabled  v-model="insertForm.item_5_2_13_age" auto-complete="off" size="small"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>喉癌</td>
              <td>
                <el-form-item >
                  <el-input  disabled  v-model="insertForm.item_5_2_7" auto-complete="off" size="small"
                            class="item_5_2_table_width"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="item_5_2_7_age" :show-message="false">
                  <el-input  disabled  v-model="insertForm.item_5_2_7_age" auto-complete="off" size="small"
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
          <p class="label">5.3 您的直系亲属是否患过结直肠癌？</p>
          <el-form-item class="indent" prop="item_5_3">
            <el-radio-group  disabled  v-model="insertForm.item_5_3" >
              <el-radio  :label="2" >否</el-radio>
              <el-radio  :label="3" >不清楚</el-radio>
              <el-radio  :label="1" >是</el-radio>
            </el-radio-group>
          </el-form-item>
          <table class="foodTable activeTime">
            <tr>
              <td>直系亲属</td>
              <td>是否曾患此癌症（1. 是 2. 否）</td>
              <td>患病年龄（岁）</td>
            </tr>
            <tr>
              <td>父亲</td>
              <td>
                <el-form-item>
                  <el-input   disabled v-model="insertForm.item_5_3_1" auto-complete="off" size="small"
                            class="item_5_2_table_width"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="item_5_3_1_age" :show-message="false">
                  <el-input  disabled  v-model="insertForm.item_5_3_1_age" auto-complete="off" size="small"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>母亲</td>
              <td>
                <el-form-item>
                  <el-input  disabled  v-model="insertForm.item_5_3_2" auto-complete="off" size="small"
                            class="item_5_2_table_width"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="item_5_3_2_age" :show-message="false">
                  <el-input   disabled v-model="insertForm.item_5_3_2_age" auto-complete="off" size="small"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>兄弟，包括同父异母兄弟或同母异父兄弟</td>
              <td>
                <el-form-item>
                  <el-input   disabled v-model="insertForm.item_5_3_3" auto-complete="off" size="small"
                            class="item_5_2_table_width"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="item_5_3_3_age" :show-message="false">
                  <el-input   disabled v-model="insertForm.item_5_3_3_age" auto-complete="off" size="small"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>姐妹，包括同父异母姐妹或同母异父姐妹</td>
              <td>
                <el-form-item>
                  <el-input  disabled  v-model="insertForm.item_5_3_4" auto-complete="off" size="small"
                            class="item_5_2_table_width"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="item_5_3_4_age" :show-message="false">
                  <el-input   disabled v-model="insertForm.item_5_3_4_age" auto-complete="off" size="small"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
          </table>
        </div>

      </el-form>
      <applyOpen ref="applyOpenVisible" :applyArr="applyArr"></applyOpen>
      <div class="submit-btn">
        <!-- 解除锁定组件 -->
        <!-- <approvalDialog ref="approvalDialog" @refreshList="query" :id="insertForm.id"  :approvalArr="approvalArr" v-if="$store.state.hospitalType==2 && approvalStatus==0"></approvalDialog>
        <el-button type="primary" @click="applyEdit"  v-if="$store.state.hospitalType==1 && applyStatus==0">申请编辑</el-button>
        <el-button type="primary"  v-if="$store.state.hospitalType==1 && applyStatus==1" :disabled="true">申请编辑</el-button>
        <el-button type="primary" v-if="$store.state.hospitalType==2 && approvalStatus==1" :disabled="true">解除锁定</el-button> -->
      </div>
    </div>
  </div>
</template>
<script>
import applyOpen from '../components/applyDialog'
import approvalDialog from '../components/approvalDialog'
  export default {
    name: 'Right',
    data() {
      return {
        applyArr:{},   //申请编辑快递相关信息
        approvalArr:{
          formType:"HOSPITAL_INTESTINE_RISK_FACTOR",
        },  //解除锁定相关信息
        applyStatus:'',   //0---申请按钮出现  1---按钮消失   
        approvalStatus:'',   //0--出现审核页面  1--国家审核页面  2--审核不通过
        editStatus:'',    //0--不可编辑  1---编辑  
        marriageOtherState : true,
        item_2_1_2_4_otherState : true,
        item_2_2_State :true,
        item_2_3_1_State : true,
        item_2_3_2_State : true,
        item_2_4_1_state:true,
        item_3_1_2_1_State:true,
        item_3_1_2_2_State:true,
        item_3_1_1_state:true,
        item_3_2_1_state:true,
        item_3_2_state:true,
        item_3_2_2_1_State:true,
        item_3_2_2_2_State:true,
        item_3_3_years_State:true,
        item_3_3_1_1_State:true,
        item_3_3_1_2_State:true,
        item_4_11_1_radioState:false,
        item_4_11_2_radioState:false,
        item_4_11_3_radioState:false,
        item_4_11_4_radioState:false,
        item_4_11_5_radioState:false,
        item_4_11_6_radioState:false,
        item_4_11_7_radioState:false,
        item_4_11_8_radioState:false,
        item_4_11_9_radioState:false,

        page1:true,
        page2:false,
        item_2_1_1: true,
        item_2_3_1: true,
        item_2_4_1: true,
        item_3_1_1: true,
        item_3_2_1: true,
        item_3_3_1: true,
        item_4_2: true,
        item_4_3_1:false,
        item_3_3:true,
        labelPosition: 'left',
        dialogTableVisible: false,
        showRiskFactor_page: false,
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
          "investigatorCode": "",//筛查现场工作人员编码
          "site_id": "",//筛查现场id
          "contact_relationship": "",//其他 联系人与本人关系
          "contact_cell_phone": "",//其他联系人手机
          "contact_telephone": "",//其他联系人固定电话
          "height": "",//身高(cm)
          "weight": "",//当前体重(kg)
          "yao_wei": "",//腰围(cm)
          "education": "1",//您的最高学历是：1：未正式上学，2：小学，3：初中，4：高中/中专，5：大学/大专，6：研究生及以上，7：其他
          "marriage": "",//婚姻 状况，1：未婚，2：同居（不在婚但有伴侣），3：已婚，4：离婚，5：丧偶，6：其他
          "marriage_other": "",//婚姻状况其他
          "item_2_1": "",//您现在是否存在腹部不适或其他肠道异常的症状？,1：是，2：否
          "item_2_1_1": null,//肠道的疼痛或异常症状出现的时间？
          "item_2_1_2":[],
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
          "item_2_4_2": "",//总共做过几次肠镜？
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
        item_2_1_2:[],
        formLabelWidth: '80px',
        autograph: '120px',
      }
    },

    mounted() {
      this.getCustomerInfo()
      this.getSiteId()
      setTimeout(()=>{
        this.query()
      },200)
      let obj = this.checkPageAuth(this, "showRiskFactor_page", this.btnAuth);
    },
    components:{
      applyOpen,
      approvalDialog
    },
    methods: {
      applyEdit(){   //申请编辑弹窗
        this.$refs.applyOpenVisible.applyOpenVisible=true;
        this.applyArr.id=this.insertForm.id;
        this.applyArr.formType="HOSPITAL_INTESTINE_RISK_FACTOR";
        this.applyArr.sid=this.$route.query.sid;
      },
      //查看危险因素
      query(){
        $axios_http({
          url: "/base/hospital/riskfactor/findAll/"+this.$route.query.sid,
          data: {},
          vueObj: this
        }).then((res) => {
          //显示操作成功浮动提示框
          this.insertForm = res.data.data
          this.insertForm.sid = this.showData.sid
          this.insertForm.name = this.showData.name
          this.insertForm.sex = this.showData.sex
          this.insertForm.idCard = this.showData.idCard
          this.insertForm.phone = this.showData.phone
          this.insertForm.address = this.showData.address.replace('undefined','').replace('null','')
          this.insertForm.site_id = this.showData.site_id
          this.applyStatus=this.insertForm.applyStatus;
          this.approvalStatus=this.insertForm.approvalStatus;
        })
      },
      getCustomerInfo(){
        $axios_http({
          url: "/base/hospital/review/get/"+this.$route.query.sid,
          data:{} ,
          vueObj: this
        }).then((res) => {
          this.showData.sid = res.data.data.sid
          this.showData.name = res.data.data.name
          this.showData.sex = res.data.data.sex
          this.showData.idCard = res.data.data.idCard
          this.showData.phone = res.data.data.phone
          this.showData.address = res.data.data.address
          if(res.data.data.address){
              this.showData.address = res.data.data.address
          }else{
            this.showData.address=res.data.data.province+res.data.data.city+res.data.data.area+res.data.data.township+res.data.data.village+res.data.data.cityOther
          }
        })
      },
      //获取筛查现场id
      getSiteId(){
        $axios_http({
          url: "/base/hospital/screeningtype/get/",
          data: {},
          vueObj: this
        }).then((res) => {
          this.showData.site_id = res.data.data

        })
      },
    }
  }
</script>
<style scoped>
  .header {
    width: 100%;
    position: relative;
  }
  .riskFactorsTable tr td{
    width: 200px;
    line-height:30px;
    color:#4d4d4d;
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
    font-weight: 700
  }

  .foodTable tr th, .foodTable tr td,.riskFactorsTable tr td {
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
  .item_5_2_table_width{
    width: 40px;
  }
  .nextPage{
    position: absolute;bottom: 0px;right:20px;
  }
  .radio{
    margin-top: 20px;
  }
  .form-item{
    margin-top: 20px;
  }
  .item_5_2_age_table_width{
    width:100px;
  }
  .longInput{
    width: 350px;
  }
</style>
<style>
  #riskFactors .el-form-item {
    margin-bottom: 0px;
    display: inline-block;
  }
  #riskFactors .el-dialog__body .el-form-item {
    display: block;
  }
  #riskFactors .el-col{
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
  #riskFactors .el-input-group__append{
    padding:0 10px;
  }
  #riskFactors .el-form-item.is-error .el-input__inner,.j_content .el-form-item.is-error .el-input__inner:focus, .j_content .el-form-item.is-error .el-textarea__inner, .j_content .el-form-item.is-error .el-textarea__inner:focus, .j_content .el-message-box__input input.invalid, .j_content .el-message-box__input input.invalid:focus {
    border-color: #f56c6c !important;
  }
  #riskFactors .el-form-item__error {
    z-index: 9;
  }
  #riskFactors .el-radio__input.is-disabled.is-checked+span.el-radio__label {
    color: #409EFF;
  }
  #riskFactors .el-radio__input.is-disabled.is-checked .el-radio__inner {
    background-color: #409EFF;
    border-color: #409EFF;
  }
  #riskFactors .el-radio__input.is-disabled.is-checked .el-radio__inner::after {
    background-color: #f5f7fa;
  }
  #riskFactors .el-textarea.is-disabled .el-textarea__inner {
    background-color: #fff;
    border-color: #dcdfe6;
    color: #606266;
    cursor: not-allowed;
  }
  #riskFactors .el-checkbox__input.is-disabled.is-checked+span.el-checkbox__label {
    color: #409EFF;
    cursor: not-allowed;
  }
  #riskFactors .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
    background-color: #409EFF;
    border-color: #409EFF;
  }
  #riskFactors .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
    border-color: #fff;
  }
  .submit-btn {
    text-align: center;
    margin: 20px;
  }
</style>
