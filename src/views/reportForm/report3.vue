<template>
  <div class="j_content" v-if="area_notification_add_page">
    <div style="min-width: 941px;">
      <div class="btns">
        <el-button type="normal" size="small" class="fl" @click="goBack()">返回</el-button>
        <el-button size="small" class="print" @click="printContent('print')" v-if="show">打印</el-button>
        <!--<el-button type="normal" size="small" class="fr" @click="submitForm()"  v-if="!show">保存</el-button>-->
        <p class="text">表B9：结直肠癌筛查结果告知书</p>
      </div>
     <div id="print">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="170px" :rules="rules" ref="formInline" :disabled="show" >
        <div style="padding:0 20px; margin:0 auto;width: 941px;">
          <p class="texts" style="margin-bottom: 12px;">
            尊敬的<span class="underline">{{formInline.name}}</span>
          </p>
          <p class="texts">
            您好！前不久您参加了由中国结直肠癌筛查和干预新技术新方案研究组织的结直肠筛查，以下为您的检查结果以及进一步处理建议。
          </p>
        <table class="j_table cmc">
          <tr class="title">
            <td width="210">检查类型</td>
            <td width="520">检查结果</td>
            <td >进一步处理建议</td>
          </tr>
          <tr>
            <td>
                <el-form-item  prop="item_a_type">
                  <el-checkbox-group v-model="formInline.item_a_type" style="height: 30px;">
                    <el-checkbox name="item_a_type">1.结肠镜镜下检查结果</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
            </td>
            <td>
              <div class="dbib">
                <el-form-item  prop="item_a_r_1" class=" mb0">
                  <el-checkbox-group v-model="formInline.item_a_r_1" style="height: auto;">
                    <el-checkbox name="item_a_r_1" label="1" class="specialCheck">1=正常</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="item_a_r_2" class=" mb0">
                  <el-checkbox-group v-model="formInline.item_a_r_2" style="height: auto;">
                    <el-checkbox name="item_a_r_2" label="2" class="specialCheck">2=息肉</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="item_a_r_3" class=" mb0">
                  <el-checkbox-group v-model="formInline.item_a_r_3" style="height: auto;">
                    <el-checkbox name="item_a_r_3" label="3" class="specialCheck">3=直肠癌</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="item_a_r_4" class=" mb0">
                  <el-checkbox-group v-model="formInline.item_a_r_4" style="height: auto;">
                    <el-checkbox name="item_a_r_4" label="4" class="specialCheck">4=疑似直肠癌</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="item_a_r_5" class=" mb0">
                  <el-checkbox-group v-model="formInline.item_a_r_5" style="height: auto;">
                    <el-checkbox name="item_a_r_5" label="5" class="specialCheck">5=结肠癌</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="item_a_r_6" class=" mb0">
                  <el-checkbox-group v-model="formInline.item_a_r_6" style="height: auto;">
                    <el-checkbox name="item_a_r_6" label="6" class="specialCheck">6=疑似结肠癌</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="item_a_r_7" class=" mb0">
                  <el-checkbox-group v-model="formInline.item_a_r_7" style="height: auto;">
                    <el-checkbox name="item_a_r_7" label="7" class="specialCheck">7=克隆恩病</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="item_a_r_8" class=" mb0">
                  <el-checkbox-group v-model="formInline.item_a_r_8" style="height: auto;">
                    <el-checkbox name="item_a_r_8" label="8" class="specialCheck">8=溃疡性结肠炎</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>

              </div>
              <div class="dbib">
                <el-form-item  prop="item_a_r_9" class=" mb0">
                  <el-checkbox-group v-model="formInline.item_a_r_9" style="height: auto;">
                  <el-checkbox name="item_a_r_9" label="9" class="specialCheck">9=非典型结肠炎</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="item_a_r_10" class=" mb0">
                <el-checkbox-group v-model="formInline.item_a_r_10" style="height: auto;">
                <el-checkbox name="item_a_r_10" label="10" class="specialCheck">10=血管畸形</el-checkbox>
                </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="item_a_r_11" class=" mb0">
                <el-checkbox-group v-model="formInline.item_a_r_11" style="height: auto;">
                <el-checkbox name="item_a_r_11" label="11" class="specialCheck">11=憩室</el-checkbox>
                </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="item_a_r_12" class=" mb0">
                <el-checkbox-group v-model="formInline.item_a_r_12" style="height: auto;">
                <el-checkbox name="item_a_r_12" label="12" class="specialCheck">12=肛裂</el-checkbox>
                </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="item_a_r_13" class=" mb0">
                <el-checkbox-group v-model="formInline.item_a_r_13" style="height: auto;">
                <el-checkbox name="item_a_r_13" label="13" class="specialCheck">13=痔疮</el-checkbox>
                </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="item_a_r_14" class=" mb0">
                <el-checkbox-group v-model="formInline.item_a_r_14" style="height: auto;">
                <el-checkbox name="item_a_r_14" label="14" class="specialCheck">14=直肠脱垂</el-checkbox>
                </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="item_a_r_15" class="formhalfline mb0">
                  <el-checkbox-group v-model="formInline.item_a_r_15" style="height: auto;">
                    <el-checkbox name="item_a_r_15" label="15" class="specialCheck">15=其它，请说明：</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="item_a_r_15_other" class="formhalfline printDomHide">
                <p class="printDom">{{formInline.item_a_r_15_other}}</p>
                <el-input type="textarea" v-model="formInline.item_a_r_15_other" style="width: 200px; margin-left: 20px;" size="mini" maxlength="50"></el-input>
                </el-form-item>
              </div>

            </td>
            <td>
              <div class="dbib">
                <el-form-item  prop="item_a_s_1" class="formhalfline mb0">
                  <el-checkbox-group v-model="formInline.item_a_s_1" style="height: auto;">
                <el-checkbox name="item_a_s_1" label="1" class="specialCheck">待病理诊断</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="item_a_s_2" class="formhalfline mb0">
                  <el-checkbox-group v-model="formInline.item_a_s_2" style="height: auto;">
                <el-checkbox name="item_a_s_2" label="2" class="specialCheck">密切观察</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="item_a_s_3" class="formhalfline mb0">
                  <el-checkbox-group v-model="formInline.item_a_s_3" style="height: auto;">
                <el-checkbox name="item_a_s_3" label="3" class="specialCheck">保守治疗</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="item_a_s_4" class="formhalfline mb0">
                  <el-checkbox-group v-model="formInline.item_a_s_4" style="height: auto;">
                <el-checkbox name="item_a_s_4" label="4" class="specialCheck">内镜治疗</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="item_a_s_5" class="formhalfline mb0">
                  <el-checkbox-group v-model="formInline.item_a_s_5" style="height: auto;">
                <el-checkbox name="item_a_s_5" label="5" class="specialCheck">手术治疗</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="item_a_s_6" class="formhalfline mb0">
                  <el-checkbox-group v-model="formInline.item_a_s_6" style="height: auto;">
                    <el-checkbox name="item_a_s_6" label="6" class="specialCheck">其它，请说明：</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="item_a_s_6_other" class="formhalfline">
                  <p class="printDom">{{formInline.item_a_s_6_other}}</p>
                  <el-input type="textarea" v-model="formInline.item_a_s_6_other" style="width: 200px; margin-left: 20px;" size="mini" maxlength="50"></el-input>
                </el-form-item>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <el-form-item  prop="item_b_type">
                <el-checkbox-group v-model="formInline.item_b_type"   style="height: 30px;">
                  <el-checkbox name="item_b_type">2. FIT大便潜血试验</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </td>
            <td style="padding-top: 0;padding-bottom: 0;">
              <div class="dbib cmb">
                <el-form-item prop="item_b_r">
                  <!-- 打印区域 -->
                   <p  class="redioPrint" v-if="formInline.item_b_r==1"><span class="cirle">&bull;</span>1=阴性</p>
                   <p  class="redioPrint" v-if="formInline.item_b_r==2"><span class="cirle">&bull;</span>2=阳性</p>
                   <p  class="redioPrint" v-if="formInline.item_b_r==3"><span class="cirle">&bull;</span>3=无效</p>
                  <el-radio-group v-model="formInline.item_b_r">
                    <el-radio name="sex" :label="1" style="display:block;margin:10px 20px;" :class="formInline.item_b_r==1?'redioPrintLabel':''">1=阴性</el-radio>
                    <el-radio name="sex" :label="2" style="display:block;margin:10px 20px;" :class="formInline.item_b_r==2?'redioPrintLabel':''">2=阳性</el-radio>
                    <el-radio name="sex" :label="3" style="display:block;margin:10px 20px;" :class="formInline.item_b_r==3?'redioPrintLabel':''">3=无效</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </td>
            <td style="padding-top: 0;padding-bottom: 0;">
              <div class="dbib cmb">
                <el-form-item prop="item_b_s">
                   <!-- 打印区域 -->
                   <p  class="redioPrint" v-if="formInline.item_b_s==1"><span class="cirle">&bull;</span>第二年回访</p>
                   <p  class="redioPrint" v-if="formInline.item_b_s==2"><span class="cirle">&bull;</span>尽快进行全肠镜检查</p>
                   <p  class="redioPrint" v-if="formInline.item_b_s==3"><span class="cirle">&bull;</span>重新取粪便标本</p>
                  <el-radio-group v-model="formInline.item_b_s">
                    <el-radio label="1" style="display:block;margin:10px 20px;" :class="formInline.item_b_s==1?'redioPrintLabel':''">第二年回访</el-radio>
                    <el-radio label="2" style="display:block;margin:10px 20px;" :class="formInline.item_b_s==2?'redioPrintLabel':''">尽快进行全肠镜检查</el-radio>
                    <el-radio label="3" style="display:block;margin:10px 20px;" :class="formInline.item_b_s==3?'redioPrintLabel':''">重新取粪便标本</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <el-form-item  prop="item_c_type">
                <el-checkbox-group v-model="formInline.item_c_type" style="height: 30px;">
                  <el-checkbox name="item_c_type">3. 结肠镜病理检查结果</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </td>
            <td>
              <div class="dbib">
                <p class="texts">病变类型</p>
                <el-form-item  prop="item_c_r_1" class=" mb0 mr0">
                  <el-checkbox-group v-model="formInline.item_c_r_1" style="height: auto;">
                    <el-checkbox name="item_c_r_1" label="1" class="specialCheck">良性肿瘤</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="item_c_r_2" class=" mb0 mr0">
                  <el-checkbox-group v-model="formInline.item_c_r_2" style="height: auto;">
                  <el-checkbox name="item_c_r_2" label="2" class="specialCheck">管状腺瘤</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="item_c_r_3" class=" mb0 mr0">
                  <el-checkbox-group v-model="formInline.item_c_r_3" style="height: auto;">
                    <el-checkbox name="item_c_r_3" label="3" class="specialCheck">管状绒毛状腺瘤</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="item_c_r_4" class=" mb0 mr0">
                  <el-checkbox-group v-model="formInline.item_c_r_4" style="height: auto;">
                   <el-checkbox name="item_c_r_4" label="4" class="specialCheck">绒毛状腺瘤</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="item_c_r_5" class=" mb0 mr0">
                  <el-checkbox-group v-model="formInline.item_c_r_5" style="height: auto;">
                    <el-checkbox nmae="item_c_r_5" label="5" class="specialCheck">扁平腺瘤（管状型）</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="item_c_r_6" class=" mb0 mr0" >
                  <el-checkbox-group v-model="formInline.item_c_r_6" style="height: auto;">
                    <el-checkbox name="item_c_r_6" label="6" class="specialCheck">扁平腺瘤（管状绒毛状型）</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="item_c_r_7" class=" mb0 mr0">
                  <el-checkbox-group v-model="formInline.item_c_r_7" style="height: auto;">
                    <el-checkbox name="item_c_r_7" label="7" class="specialCheck">扁平腺瘤（绒毛状型）</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="item_c_r_8" class=" mb0 mr0">
                  <el-checkbox-group v-model="formInline.item_c_r_8" style="height: auto;">
                    <el-checkbox name="item_c_r_8" label="8" class="specialCheck">混合型腺瘤</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="item_c_r_9" class=" mb0 mr0" >
                  <el-checkbox-group v-model="formInline.item_c_r_9" style="height: auto;">
                    <el-checkbox name="item_c_r_9" class="specialCheck">其它，请说明：</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                
                <el-form-item  prop="item_c_r_9_other" class="formhalfline">
                  <p class="printDom">{{formInline.item_c_r_9_other}}</p>
                  <el-input  type="textarea" v-model="formInline.item_c_r_9_other" style="width: 200px; margin-left: 20px;" size="mini" maxlength="50"></el-input>
                </el-form-item>
              </div>
              <div class="dbib">
                <p class="texts">其它良性病变</p>
                <el-form-item  prop="item_c_r_10" class=" mb0">
                  <el-checkbox-group v-model="formInline.item_c_r_10" style="height: auto;">
                    <el-checkbox name="item_c_r_10" label="10" class="specialCheck">增生性息肉</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="item_c_r_11" class=" mb0">
                  <el-checkbox-group v-model="formInline.item_c_r_11" style="height: auto;">
                    <el-checkbox name="item_c_r_11" label="11" class="specialCheck">肉芽肿性息肉</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="item_c_r_12" class=" mb0">
                  <el-checkbox-group v-model="formInline.item_c_r_12" style="height: auto;">
                    <el-checkbox name ="item_c_r_12" label="12" class="specialCheck">炎性息肉</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="item_c_r_13" class=" mb0">
                  <el-checkbox-group v-model="formInline.item_c_r_13" style="height: auto;">
                    <el-checkbox name="item_c_r_13" label="13" class="specialCheck">其它，请说明：</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                
                <el-form-item  prop="item_c_r_13_other" class="formhalfline">
                  <p class="printDom">{{formInline.item_c_r_13_other}}</p>
                    <el-input type="textarea" v-model="formInline.item_c_r_13_other" style="width: 200px; margin-left: 20px;" size="mini" maxlength="50"></el-input>
                </el-form-item>
                    <span style="font-size:14px;line-height:1.5;display:block;color: #606266;margin-left:20px;">不典型增生（上皮内瘤变）</span>
                    <span style="font-size:14px;line-height:1.5;display:block;color: #606266;margin-left:20px;">/ 分化程度</span>

                <el-form-item  prop="item_c_r_14" class=" mb0">
                  <el-checkbox-group v-model="formInline.item_c_r_14" style="height: auto;">
                    <el-checkbox name="item_c_r_14" label="14" class="specialCheck">低级别上皮内瘤变</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="item_c_r_15" class=" mb0">
                  <el-checkbox-group v-model="formInline.item_c_r_15" style="height: auto;">
                    <el-checkbox name="item_c_r_15" label="15" class="specialCheck">高级别上皮内瘤变</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="item_c_r_16" class=" mb0">
                  <el-checkbox-group v-model="formInline.item_c_r_16" style="height: auto;">
                    <el-checkbox name="item_c_r_16" label="16" class="specialCheck">高分化腺癌</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="item_c_r_17" class=" mb0">
                  <el-checkbox-group v-model="formInline.item_c_r_17" style="height: auto;">
                    <el-checkbox name="item_c_r_17" label="17" class="specialCheck">中分化腺癌</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="item_c_r_18" class=" mb0">
                  <el-checkbox-group v-model="formInline.item_c_r_18" style="height: auto;">
                    <el-checkbox name="item_c_r_18" label="18" class="specialCheck">低分化腺癌</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="item_c_r_19" class=" mb0">
                  <el-checkbox-group v-model="formInline.item_c_r_19" style="height: auto;">
                    <el-checkbox name="item_c_r_19" label="19" class="specialCheck">其它，请说明：</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                
                <el-form-item  prop="item_c_r_19_other" class="formhalfline">
                   <p class="printDom">{{formInline.item_c_r_19_other}}</p>
                    <el-input type="textarea" v-model="formInline.item_c_r_19_other" style="width: 200px; margin-left: 20px;" size="mini" maxlength="50"></el-input>
                </el-form-item>
              </div>
            </td>
            <td>
              <div class="dbib">
                <el-form-item  prop="item_c_s_1" class=" mb0">
                  <el-checkbox-group v-model="formInline.item_c_s_1" style="height: auto;">
                    <el-checkbox name="item_c_s_1" label="1" class="specialCheck">密切观察</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="item_c_s_2" class=" mb0">
                  <el-checkbox-group v-model="formInline.item_c_s_2" style="height: auto;">
                    <el-checkbox name="item_c_s_2" label="2" class="specialCheck">保守治疗</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="item_c_s_3" class=" mb0">
                  <el-checkbox-group v-model="formInline.item_c_s_3" style="height: auto;">
                    <el-checkbox name="item_c_s_3" label="3" class="specialCheck">内镜治疗</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="item_c_s_4" class=" mb0">
                  <el-checkbox-group v-model="formInline.item_c_s_4" style="height: auto;">
                    <el-checkbox name="item_c_s_4" label="4" class="specialCheck">手术治疗</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item  prop="item_c_s_5" class="formhalfline mb0">
                  <el-checkbox-group v-model="formInline.item_c_s_5" style="height: auto;">
                    <el-checkbox v-model="formInline.item_c_s_5" label="5" class="specialCheck">其它，请说明：</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                
                <el-form-item  prop="item_c_s_5_other" class="formhalfline">
                  <p class="printDom">{{formInline.item_c_s_5_other}}</p>
                  <el-input type="textarea" v-model="formInline.item_c_s_5_other" style="width: 200px; margin-left: 20px;" size="mini" maxlength="50"></el-input>
                </el-form-item>
              </div>
            </td>
          </tr>
        </table>
          <p class="texts" style="line-height:1.5;">
            本项目仅负担结直肠癌筛查的费用，若您需进一步检查/治疗，建议您选择当地肿瘤医院，中国医学科学院肿瘤医院也可为您提供绿色通道，但其间花费应由您的医疗保险或其他方式支付。本筛查并不是充分的身体检查，也不能替代在医院的全面检查。如果您对筛查结果或关于本筛查有任何疑问，请直接致电当地协调员。衷心感谢您的参与！
          </p>
      </div>
      </el-form>
      <div class="tables">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="170px" :rules="rules" ref="formInline1" :disabled="show" v-if="!show">
          <el-form-item label="筛查现场协调员姓名：" prop="xtyName" class="formhalfline zdysinput">
            <el-input v-model="formInline.xtyName"  size="small" style="width: 220px;"></el-input>
          </el-form-item>
          <el-form-item label="肿瘤医院：" prop="hosName" class="formhalfline zdysinput">
            <el-input v-model="formInline.hosName"  size="small" style="width: 220px;"></el-input>
          </el-form-item>
          <el-form-item label="筛查现场协调员电话：" prop="xtyPhone" class="formhalfline zdysinput">
            <el-input v-model="formInline.xtyPhone"  size="small" style="width: 220px;"></el-input>
          </el-form-item>
          <el-form-item label="日期：" class="formhalfline">
            <el-date-picker
              v-model="formInline.scDate"
              :clearable="false"
              align="right"
              size="small"
              format="yyyy年MM月dd日"
              value-format="yyyy-MM-dd"
              style="width:160px;"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="170px" :rules="rules" ref="formInline1" :disabled="show" v-if="show">
          <el-form-item label="筛查现场协调员姓名：" prop="xtyName" class="formhalfline zdysinput">
            <div>{{formInline.xtyName}}</div>
          </el-form-item>
          <el-form-item label="肿瘤医院：" prop="hosName" class="formhalfline zdysinput">
            <div>{{formInline.hosName}}</div>
          </el-form-item>
          <el-form-item label="筛查现场协调员电话：" prop="xtyPhone" class="formhalfline zdysinput">
            <div>{{formInline.xtyPhone}}</div>
          </el-form-item>
          <el-form-item label="日期：" class="formhalfline">
            <div>{{formInline.scDate | date }}</div>
          </el-form-item>
        </el-form>
      </div>
     </div>
      <div class="text-center" style="margin-top: 40px;" v-if="!show">
        <el-button type="primary" @click="submitForm()" ref="addBtn" id="buttonBthreeSave">提交</el-button>
        <el-button @click="cancel()">取消</el-button>
      </div>
      <div class="text-center" style="margin-top: 40px;" v-if="$route.query.flagEdit!='edit' && $route.path=='/colonscopy/report3'">
          <!-- 编辑相关btn -->
          <el-button type="primary" @click="applyEdit"  v-if="$store.state.hospitalType==2 && ShowData.applyStatus==0 && $route.query.overallStatusCy!=2 && $route.query.overallStatusCy!=4">申请编辑</el-button>
          <el-button type="primary"  v-if="($store.state.hospitalType==2 && ShowData.applyStatus==1) || ($store.state.hospitalType==2 && $route.query.overallStatusCy==2) || ($store.state.hospitalType==2 && $route.query.overallStatusCy==4)" :disabled="true">申请编辑</el-button>
          <router-link :to="{path:'/colonscopy/noInforming',query:{id:$route.query.id,sid:$route.query.sid,colonoscopyRecordId:$route.query.notificationId,flagEdit:'edit'}}" v-if="$store.state.hospitalType==2 && ShowData.editStatus==1 && $route.query.overallStatusCy!=2 && $route.query.overallStatusCy!=4">
            <el-button type="primary">编辑</el-button>
          </router-link>
          <!-- 编辑相关btn -->
        </div>
        <!-- 申请编辑弹窗 -->
      <applyOpen ref="applyOpenVisible" :applyArr="applyArr"></applyOpen>
    </div>
  </div>
</template>
<script>
 import applyOpen from '../components/applyDialog'
  export default {
    name: 'report4',
    data() {
      var checkitems = (items,index)=>{
        for(let i=1;i<=index;i++){
          if(this.formInline[items+i]){
            return  true;
            break;
          }
        }
        return false;
      };
      var set_item = (items,index,b)=>{
        for(let i=1;i<=index;i++){
          this.formInline[items+i] = b;
        }
      };
      var validate_item_a_type = (rule, value, callback) => {
        if (value) {
          if(checkitems('item_a_r_',15) ){
            if(checkitems('item_a_s_',6) ){
              callback();
            }else callback(new Error('请选择最少一项处理建议'));
          }
          else callback(new Error('请选择最少一项检查结果'));
        }else{
          set_item('item_a_r_',15,false);
          set_item('item_a_s_',6,false);
          callback();
        }
      };

      var item_a_r = (rule, value, callback) => {
        if(value){
          this.formInline.item_a_type = true;
         }
        this.$refs.formInline.validateField('item_a_type');
        callback();
      };
      var validate_item_a_r_15 = (rule, value, callback) => {
        if(!value)
          this.formInline.item_a_r_15_other = '';
        this.$refs.formInline.validateField('item_a_r_15_other');
        callback();
      };
      var item_a_r_15_other = (rule, value, callback) => {
        if(this.formInline.item_a_r_15){
          this.formInline.item_a_type = true;
          if (value === '') {
           this.$refs.formInline.validateField('item_a_type');
             callback(new Error('请说明其他结果'));
          }else{
            this.$refs.formInline.validateField('item_a_type');
            callback();
          }
        }else{
          if (value === '') {}
          else {this.formInline.item_a_r_15 = true;}
          this.$refs.formInline.validateField('item_a_type');
          callback();
        }
      };
      var item_a_s_6 = (rule, value, callback) => {
        if(!value)
          this.formInline.item_a_s_6_other = '';
        this.$refs.formInline.validateField('item_a_s_6_other');
        callback();
      };
      var item_a_s_6_other = (rule, value, callback) => {
        if(this.formInline.item_a_s_6){
          this.formInline.item_a_type = true;
          if (value === '') {
           this.$refs.formInline.validateField('item_a_type');
             callback(new Error('请说明其他结果'));
          }else{
            this.$refs.formInline.validateField('item_a_type');
            callback();
          }
        }else{
          if (value === '') {}
          else {this.formInline.item_a_s_6 = true;}
          this.$refs.formInline.validateField('item_a_type');
          callback();
        }
      };
      var item_b_type = (rule, value, callback) => {
        if(value) {
          if(this.formInline.item_b_r == 1 || this.formInline.item_b_r == 2 || this.formInline.item_b_r==3){
            callback();
          }else {
            callback(new Error('请选择检查结果'));
          }
        }else{
          this.formInline.item_b_r= '';
          this.formInline.item_b_s= '';
        }
      };
      var item_b_r =  (rule, value, callback) => {//console.log(this.formInline.item_b_r)
        if(value == 1 || value == 2 || value == 3){
          this.formInline.item_b_type = true;
          this.$refs.formInline.validateField('item_b_type');
        }
        callback();
      };
      var item_b_s =  (rule, value, callback) => {//console.log(this.formInline.item_b_r)
        if(value == 1 || value == 2 || value==3){
          this.formInline.item_b_type = true;
          this.$refs.formInline.validateField('item_b_type');
        }
        callback();
      };
//item_c_type
      var item_c_type = (rule, value, callback) => {
        if (value) {
          if(checkitems('item_c_r_',19)){
            if(checkitems('item_c_s_',5) ){
              callback();
            }else callback(new Error('请选择最少一项处理建议'));
          }
          else callback(new Error('请选择最少一项检查结果'));
        }else{
          set_item('item_c_r_',19,false);
          set_item('item_c_s_',5,false);
          callback();
        }
      };

      var item_c_r = (rule, value, callback) => {
        if(value){
          this.formInline.item_c_type = true;
        }
        this.$refs.formInline.validateField('item_c_type');
        callback();
      };
      var item_c_r_9 = (rule, value, callback) => {
        if(!value)
          this.formInline.item_c_r_9_other = '';
        this.$refs.formInline.validateField('item_c_r_9_other');
        callback();
      };
      var item_c_r_9_other = (rule, value, callback) => {
        if(this.formInline.item_c_r_9){
          this.formInline.item_c_type = true;
          if (value === '') {
            this.$refs.formInline.validateField('item_c_type');
            callback(new Error('请说明其他结果'));
          }else{
            this.$refs.formInline.validateField('item_c_type');
            callback();
          }
        }else{
          if (value === '') {}
          else {this.formInline.item_c_r_9 = true;}
          this.$refs.formInline.validateField('item_c_type');
          callback();
        }
      };
      var item_c_r_13 = (rule, value, callback) => {
        if(!value)
          this.formInline.item_c_r_13_other = '';
        this.$refs.formInline.validateField('item_c_r_13_other');
        callback();
      };
      var item_c_r_13_other = (rule, value, callback) => {
        if(this.formInline.item_c_r_13){
          this.formInline.item_c_type = true;
          if (value === '') {
            this.$refs.formInline.validateField('item_c_type');
            callback(new Error('请说明其他结果'));
          }else{
            this.$refs.formInline.validateField('item_c_type');
            callback();
          }
        }else{
          if (value === '') {}
          else {this.formInline.item_c_r_13 = true;}
          this.$refs.formInline.validateField('item_c_type');
          callback();
        }
      };

      var item_c_r_19 = (rule, value, callback) => {
        if(!value)
          this.formInline.item_c_r_19_other = '';
        this.$refs.formInline.validateField('item_c_r_19_other');
        callback();
      };
      var item_c_r_19_other = (rule, value, callback) => {
        if(this.formInline.item_c_r_19){
          this.formInline.item_c_type = true;
          if (value === '') {
            this.$refs.formInline.validateField('item_c_type');
            callback(new Error('请说明其他结果'));
          }else{
            this.$refs.formInline.validateField('item_c_type');
            callback();
          }
        }else{
          if (value === '') {}
          else {this.formInline.item_c_r_19 = true;}
          this.$refs.formInline.validateField('item_c_type');
          callback();
        }
      };

      var item_c_s_5 = (rule, value, callback) => {
        if(!value)
          this.formInline.item_c_s_5_other = '';
        this.$refs.formInline.validateField('item_c_s_5_other');
        callback();
      };
      var item_c_s_5_other = (rule, value, callback) => {
        if(this.formInline.item_c_s_5){
          this.formInline.item_c_type = true;
          if (value === '') {
            this.$refs.formInline.validateField('item_c_type');
            callback(new Error('请说明其他建议'));
          }else{
            this.$refs.formInline.validateField('item_c_type');
            callback();
          }
        }else{
          if (value !== '') { this.formInline.item_c_s_5 = true;}
          this.$refs.formInline.validateField('item_c_type');
          callback()
        }
      };

      return {
        ShowData:null,
        applyArr:{},   //申请编辑相关
        area_notification_add_page:false,
        show:'',
        btnAuth:{},
        formInline: {
          name: '张三',
          sid: 'TC10001',//受试者唯一编号值固定为TC0001
          todoId:'1',//待办id 值固定为1
          colonoscopyRecordId :'1',//结肠镜检查记录id 值固定1
          scDate: new Date(),//筛查日期
          xtyName: '',//协调员项目
          xtyPhone: '',//协调员电话
          hosName: '',//肿瘤医院名称
          item_a_type: false,
          item_a_r_1:false,
          item_a_r_2:false,
          item_a_r_3:false,
          item_a_r_4:false,
          item_a_r_5:false,
          item_a_r_6:false,
          item_a_r_7:false,
          item_a_r_8:false,
          item_a_r_9:false,
          item_a_r_10:false,
          item_a_r_11:false,
          item_a_r_12:false,
          item_a_r_13:false,
          item_a_r_14:false,
          item_a_r_15:false,
          item_a_r_15_other:'',
          item_a_s_1:false,
          item_a_s_2:false,
          item_a_s_3:false,
          item_a_s_4:false,
          item_a_s_5:false,
          item_a_s_6:false,
          item_a_s_6_other:'',
          item_b_type:false,
          item_b_r:'',
          item_b_s:'',
          item_c_type: false,//结肠镜病理检查结果 1：是，2：否
          item_c_r_1: false,//良性肿瘤  1：是，2：否
          item_c_r_2: false,//管状腺瘤 1：是，2：否
          item_c_r_3: false,//管状绒毛状腺瘤 1：是，2：否
          item_c_r_4: false,//绒毛状腺瘤 1：是，2：否
          item_c_r_5: false,//扁平腺瘤（管状型） 1：是，2：否
          item_c_r_6: false,//扁平腺瘤（管状绒毛状型） 1：是，2：否
          item_c_r_7: false,//扁平腺瘤（绒毛状型） 1：是，2：否
          item_c_r_8: false,// 混合型腺瘤 1：是，2：否
          item_c_r_9: false,//其它 1：是，2：否
          item_c_r_9_other: "",//其它内容
          item_c_r_10: false,//增生性息肉 1：是，2：否
          item_c_r_11: false,//肉芽肿性息肉 1：是，2：否
          item_c_r_12: false,//炎性息肉 1：是，2：否
          item_c_r_13: false,//其它 1：是，2：否
          item_c_r_13_other: "",//其它内容
          item_c_r_14: false,//低级别上皮内瘤变 1：是，2：否
          item_c_r_15: false,//高级别上皮内瘤变 1：是，2：否
          item_c_r_16: false,//高分化腺癌 1：是，2：否
          item_c_r_17: false,//中分化腺癌 1：是，2：否
          item_c_r_18: false,//低分化腺癌 1：是，2：否
          item_c_r_19: false,//其它 1：是，2：否
          item_c_r_19_other: "",//其它内容
          item_c_s_1: false,//密切观察 1：是，2：否
          item_c_s_2: false,// 保守治疗 1：是，2：否
          item_c_s_3: false,//int 内镜治疗 1：是，2：否
          item_c_s_4: false,// int 手术治疗 1：是，2：否
          item_c_s_5: false,// int 其它 1：是，2：否
          item_c_s_5_other: "",// varchar(255) 其它内容
        }
        ,rules:{
          item_a_type: [ { validator: validate_item_a_type, trigger: 'change' }],
          item_a_r_1:[ { validator: item_a_r, trigger: 'change' } ],
          item_a_r_2:[ { validator: item_a_r, trigger: 'change' } ],
          item_a_r_3:[ { validator: item_a_r, trigger: 'change' } ],
          item_a_r_4:[ { validator: item_a_r, trigger: 'change' } ],
          item_a_r_5:[ { validator: item_a_r, trigger: 'change' } ],
          item_a_r_6:[ { validator: item_a_r, trigger: 'change' } ],
          item_a_r_7:[ { validator: item_a_r, trigger: 'change' } ],
          item_a_r_8:[ { validator: item_a_r, trigger: 'change' } ],
          item_a_r_9:[ { validator: item_a_r, trigger: 'change' } ],
          item_a_r_10:[ { validator: item_a_r, trigger: 'change' } ],
          item_a_r_11:[ { validator: item_a_r, trigger: 'change' } ],
          item_a_r_12:[ { validator: item_a_r, trigger: 'change' } ],
          item_a_r_13:[ { validator: item_a_r, trigger: 'change' } ],
          item_a_r_14:[ { validator: item_a_r, trigger: 'change' } ],
          item_a_r_15:[  { validator: validate_item_a_r_15, trigger: 'change' }],
          item_a_r_15_other:[ { validator: item_a_r_15_other, trigger: 'blur' },{ min: 0, max: 120, message: '长度在 0 到 120 个汉字', trigger: 'blur'} ],
          item_a_s_1:[{ validator: item_a_r, trigger: 'change' }  ],
          item_a_s_2:[{ validator: item_a_r, trigger: 'change' }  ],
          item_a_s_3:[{ validator: item_a_r, trigger: 'change' }  ],
          item_a_s_4:[{ validator: item_a_r, trigger: 'change' }  ],
          item_a_s_5:[{ validator: item_a_r, trigger: 'change' }  ],
          item_a_s_6:[{ validator: item_a_s_6, trigger: 'change' }  ],
          item_a_s_6_other:[{ validator: item_a_s_6_other, trigger: 'blur' },{ min: 0, max: 120, message: '长度在 0 到 120 个汉字', trigger: 'blur'} ],
          item_b_type:[
            { validator: item_b_type,trigger: 'change'}
          ],
          item_b_r:[
            { validator: item_b_r,trigger: 'change'}
          ],
          item_b_s:[
            { validator: item_b_s,trigger: 'change'}
          ],
          item_c_type: [ { validator: item_c_type, trigger: 'change' }],
          item_c_r_1:[ { validator: item_c_r, trigger: 'change' } ],
          item_c_r_2:[ { validator: item_c_r, trigger: 'change' } ],
          item_c_r_3:[ { validator: item_c_r, trigger: 'change' } ],
          item_c_r_4:[ { validator: item_c_r, trigger: 'change' } ],
          item_c_r_5:[ { validator: item_c_r, trigger: 'change' } ],
          item_c_r_6:[ { validator: item_c_r, trigger: 'change' } ],
          item_c_r_7:[ { validator: item_c_r, trigger: 'change' } ],
          item_c_r_8:[ { validator: item_c_r, trigger: 'change' } ],
          item_c_r_9:[ { validator: item_c_r_9, trigger: 'change' } ],
          item_c_r_9_other:[ { validator: item_c_r_9_other, trigger: 'blur' },{ min: 0, max: 120, message: '长度在 0 到 120 个汉字', trigger: 'change'} ],
          item_c_r_10:[ { validator: item_c_r, trigger: 'change' } ],
          item_c_r_11:[ { validator: item_c_r, trigger: 'change' } ],
          item_c_r_12:[ { validator: item_c_r, trigger: 'change' } ],
          item_c_r_13:[ { validator: item_c_r_13, trigger: 'change' } ],
          item_c_r_13_other:[ { validator: item_c_r_13_other, trigger: 'blur' },{ min: 0, max: 120, message: '长度在 0 到 120 个汉字', trigger: 'change'} ],
          item_c_r_14:[ { validator: item_c_r, trigger: 'change' } ],
          item_c_r_15:[ { validator: item_c_r, trigger: 'change' } ],
          item_c_r_16:[ { validator: item_c_r, trigger: 'change' } ],
          item_c_r_17:[ { validator: item_c_r, trigger: 'change' } ],
          item_c_r_18:[ { validator: item_c_r, trigger: 'change' } ],
          item_c_r_19:[ { validator: item_c_r_19, trigger: 'change' } ],
          item_c_r_19_other:[  { validator: item_c_r_19_other, trigger: 'blur' },{ min: 0, max: 120, message: '长度在 0 到 120 个汉字', trigger: 'change'}],
          item_c_s_1:[{ validator: item_c_r, trigger: 'change' }  ],
          item_c_s_2:[{ validator: item_c_r, trigger: 'change' }  ],
          item_c_s_3:[{ validator: item_c_r, trigger: 'change' }  ],
          item_c_s_4:[{ validator: item_c_r, trigger: 'change' }  ],
          item_c_s_5:[{ validator: item_c_s_5, trigger: 'change' }  ],
          item_c_s_5_other:[{ validator: item_c_s_5_other, trigger: 'blur' },
            { min: 0, max: 120, message: '长度在 0 到 120 个汉字', trigger: 'change'}],
          xtyPhone:[{ required: true, message: '请输入', trigger: 'change' }],
          hosName:[{ required: true, message: '请输入', trigger: 'change' }],
          xtyName:[{ required: true, message: '请输入', trigger: 'change' }]
        }
      }
    },
    // mounted(){
    //   let obj = this.checkPageAuth(this,"area_notification_add_page",this.btnAuth);
    //   //this.formInline.name
    //   this.queryInfo()
    //   this.formInline.sid=this.$route.query.sid;
    //
    // },
    created() {
      let obj = this.checkPageAuth(this,"area_notification_add_page",this.btnAuth)
      this.formInline.sid=this.$route.query.sid;
      this.formInline.id = this.$route.query.id;
      this.formInline.colonoscopyRecordId = this.$route.query.id;
      this.show = this.$route.query.show;
      if(this.show || this.$route.query.flagEdit=='edit'){
          this.queryDate();
        // this.rules = {};
      }else{
        this.queryInfo();
        this.queryFITResult()
        this.queryHospitalName()
      }
    },
    mounted(){
      if(window.sessionStorage.getItem('COOKIE_XTYNAME')){
        this.formInline.xtyName=window.sessionStorage.getItem('COOKIE_XTYNAME')
      }
      if(window.sessionStorage.getItem('COOKIE_XTYPHONE')){
        this.formInline.xtyPhone=window.sessionStorage.getItem('COOKIE_XTYPHONE')
      }
    },
    components:{
      applyOpen
    },
    methods:{
      cancel(){
        this.$router.go(-1)
      },
      queryFITResult(){
        $axios_http({
          url:"/base/fit/result/queryLatestFitInfo/"+this.$route.query.sid,
          data:{},
          vueObj:this
        }).then((res)=> {
          if (res.data.data){
            this.formInline.item_b_r = res.data.data.result
          }
        })
      },
      queryInfo(){
        $axios_http({
          url:"/base/hospital/person/info/get/"+this.$route.query.sid,
          data:{},
          vueObj:this
        }).then((res)=> {
          this.formInline.name=res.data.data.name;
        })
      },
      queryHospitalName(){
        $axios_http({
          url:"/base/department/hospital/findHospitalByLoginName",
          data:{},
          vueObj:this
        }).then((res)=> {
          if(res.data.data){
            this.formInline.hosName=res.data.data.name;
          }
          //显示操作成功浮动提示框
          //$successMsg(this,"保存成功")
          // this.$router.push({ path: '/dictionary/dictionary'})
          //清空数据
          //this.clearFiled()
        })
      },
      queryDate(){
        var set_item_values=(items,data,is,ie)=>{
          for(let i=is;i<=ie;i++){
            this.formInline[items+i] = data[items+i] == 1 ?true:false;
          }
        }
        // item_b_r_1:1
        var inttobool_radio = (items,data,index)=>{
          var v = '';
          for(let i=1;i<=index;i++){
            if(data[items+i] == 1){
              v = i;
              break;
            }
          }
          return v;
        }
        $axios_http({
          url:"/base/colonoscopy/notification/get/"+this.formInline.id,
          data:{
              idType:'record'
          },
          vueObj:this
        }).then((res)=> {
          this.ShowData = res.data.data;
          this.formInline.sid= res.data.data.sid;
          this.formInline.name=res.data.data.name;
          this.formInline.scDate=res.data.data.sc_date;
          this.formInline.xtyName=res.data.data.xty_name;
          this.formInline.xtyPhone=res.data.data.xty_phone;
          this.formInline.hosName=res.data.data.hos_name;
          this.formInline.item_a_type=res.data.data.item_a_type === 1?true:false;
          set_item_values('item_a_r_',res.data.data,1,15);
          this.formInline.item_a_r_15_other=res.data.data.item_a_r_15_other;
          set_item_values('item_a_s_',res.data.data,1,6);
          this.formInline.item_a_s_6_other=res.data.data.item_a_s_6_other;
          this.formInline.item_b_type=res.data.data.item_b_type === 1?true:false;

          this.formInline.item_b_r = inttobool_radio('item_b_r_',res.data.data,3);
          this.formInline.item_b_s = ""+inttobool_radio('item_b_s_',res.data.data,3)+"";

          this.formInline.item_c_type=res.data.data.item_c_type === 1?true:false;
          set_item_values('item_c_r_',res.data.data,1,19);
          this.formInline.item_c_r_9_other=res.data.data.item_c_r_9_other;
          this.formInline.item_c_r_13_other=res.data.data.item_c_r_13_other;
          this.formInline.item_c_r_19_other=res.data.data.item_c_r_19_other;

          set_item_values('item_c_s_',res.data.data,1,5);
          this.formInline.item_c_s_5_other=res.data.data.item_c_s_5_other;



          //显示操作成功浮动提示框
          //$successMsg(this,"保存成功")
          // this.$router.push({ path: '/dictionary/dictionary'})
          //清空数据
          //this.clearFiled()
        })
      },
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },
      addbbFun(){// 添加病变部位//最多6个//对应数据：addbb
        if(this.addbb.length>=6){
          this.$alert('您最多可添加6个表格', '提示', {
            confirmButtonText: '确定',
            callback: action => {
//              this.$message({
//                type: 'info',
//                message: `action: ${ action }`
//              });
            }
          });
        }else{
          this.addbb.push({})
        }
      },
      submitForm() {
           //按钮权限判断
        let _id=this.$refs.addBtn.$attrs.id;
        if(authority(_id)){
          return;
        }
        var that = this;
        console.log(this.formInline);
      //  console.log(this.$refs);
     //   console.log(this.formInline.item_a_type);
       // debugger
        let validd = true

        this.$refs.formInline1.validate((valid) => {
          if (!valid){
          validd = false
          }
        })
          this.$refs.formInline.validate((valid) => {
            if (!valid){
            validd = false
          }
        })
          if (validd){
            console.log('valid true');
            let dd = JSON.parse(JSON.stringify(that.formInline))


            var booltoint = (items,index)=>{
              for(let i=1;i<=index;i++){
                dd[items+i] =  dd[items+i] == false ? 2 : 1;
              }
            }
            var booltoint_radio = (items,index,ischeck,istype)=>{
              for(let i=1;i<=index;i++){
                dd[items+i] =  i == ischeck && istype ? 1 : 2;
              }
            }

            dd.item_a_type =  dd.item_a_type === false ? 2 : 1;
            booltoint('item_a_r_',15);
            booltoint('item_a_s_',6);

            if(dd.item_b_type)
              booltoint_radio('item_b_r_',3,dd.item_b_r,true);
            else  booltoint_radio('item_b_r_',3,dd.item_b_r,false);
            delete  dd.item_b_r;
            if(dd.item_b_type)
              booltoint_radio('item_b_s_',3,dd.item_b_s,true);
            else  booltoint_radio('item_b_r_',3,dd.item_b_r,false);
            delete  dd.item_b_r;
            delete  dd.item_b_s;
            dd.item_b_type =  dd.item_b_type === false ? 2 : 1;

            dd.item_c_type =  dd.item_c_type === false ? 2 : 1;
            booltoint('item_c_r_',19);
            booltoint('item_c_s_',5);
            if(dd.scDate.indexOf("T")>-1)
            dd.scDate = dd.scDate.split('T')[0];
            // 新增，编辑的接口地址
          let _url = null;
          if(this.$route.query.flagEdit == 'edit'){
            _url = "/base/screening/notification/updateScreeningNotification"
            dd.id = this.$route.query.colonoscopyRecordId
            dd.colonoscopyRecordId = this.$route.query.id
          }else{
            _url = "/base/screening/notification/addScreeningNotification"
          }
          // 保存数据
           if(this.$route.query.flagEdit=='edit'){
            /**
             * 编辑情况下，先查询告知书是否已发放
             * 选是则重新发放
             * 选否直接保存
             */
              this.queryRecord(dd,_url);
            }else{
              this.saveColonResult(dd,_url);
            }

          }


      },
      printContent:function(element){
        let subOutputRankPrint = document.getElementById(element);
        let newContent =subOutputRankPrint.innerHTML;
        let oldContent = document.body.innerHTML;
        document.body.innerHTML = newContent;
        window.print();
        window.location.reload();
        document.body.innerHTML = oldContent;
        return false;
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
       // 申请编辑
      applyEdit () {   //申请编辑弹窗
        this.$refs.applyOpenVisible.applyOpenVisible=true;
        this.applyArr.id=this.ShowData.id;
        this.applyArr.formType="HOSPITAL_SCREENING_NOTIFICATION";
        this.applyArr.sid=this.$route.query.sid;
      },
      // 提交保存
      saveColonResult(dataObj,dataUrl){
        $axios_http({
              url:dataUrl,
              data:dataObj,
              vueObj:this
            }).then((res)=> {
              $successMsg(this,"保存成功")
              this.$router.push({path:'/colonscopy/regionColonscopyList'});
            })
      },
       // 查询告知书
      queryRecord (dataObj,dataUrl) {
         $axios_http({
            url:'/base/colonoscopy/result/queryColonoscopyInfo',
            data:{
              colonoscopyRecordId:this.$route.query.id
            },
            vueObj:this
          }).then((res)=> {
              if(res.data.data.notification_issue_status==2) {
                // 告知书已发放
                this.$confirm('<p>告知书已发放，是否重新发放？</p>', '', {
                        confirmButtonText: '是',
                        cancelButtonText: '否',
                        dangerouslyUseHTMLString: true,
                        showClose:false,
                        center: true
                      }).then(() => {
                        // 保存结果
                        dataObj.reissueNotification=1;
                        this.saveColonResult(dataObj,dataUrl);
                      }).catch(() => {
                        // 保存结果
                        dataObj.reissueNotification=2;
                        this.saveColonResult(dataObj,dataUrl);
                      });
              }else{
              // 告知书未发放
              // dataObj.reissueNotification=2;
              this.saveColonResult(dataObj,dataUrl);
            }
          })
      },
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.printDomHide{
  position: relative;
}
.printDom{
      display: none;
      padding:0 10px;
      font-size: 14px;
      position: absolute;
      left:15px;
      z-index: 2;
      top: 5px;
      color: #666;
      line-height: 20px;
      word-break: break-all;
    }
.cirle{
  display: inline-block;
  width: 14px;
  height: 14px;
  border:1px solid #dcdfe6;
  border-radius: 50%;
  line-height: 10px;
  text-align: center;
  line-height: 14px;
  color: #999;
  font-size: 16px;
  margin-right: 10px;
}
.redioPrint{
  display: none;
  margin-left: 20px;
  margin-top: 10px;
}
@media print {
                .printDom,.redioPrint{
                  display: block;
                }
                .el-radio.redioPrintLabel{
                  display: none !important;
                }
                .cirle{
                  display: inline-block;
                  width: 14px;
                  height: 14px;
                  border:1px solid #dcdfe6;
                  border-radius: 50%;
                  color: #999;
                  font-size: 16px;
                  line-height: 14px;
                }
            }
.j_content{
  overflow: auto;
}
  .fl {
    float: left;
  }

  .fr {
    float: right;
  }

  .text-right {
    text-align: right;
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
    margin:0 20px 20px;
    border: 1px solid rgb(204, 204, 204);
  }

  .formcon .title {
    font-size: 16px;
    text-align: center;
    line-height: 2;
    background: rgb(204, 204, 204);
    color: #000000;
  }

  .formcon .title.nobg {
    background: none;
  }

  .tables {
    margin: 15px 50px 15px 160px;
    font-size: 0;
    line-height: 0;
  }
  .formoneline {
    width: 100%;
    margin-right: 0 !important;
  }



  .formhalfline {
    width: 50%;
    margin-right: 0 !important;
  }

  .mb0 {
    margin-bottom:0 !important;
  }
  .mr0 {
    margin-right:0 !important;
  }

  .addbb {
    font-size: 20px;
    font-weight: bold;
    color: #3a8ee6;
  }

  .zdysinput input {
    border-width: 0 0 1px 0;
  }

  .texts{
    color: #000000;
    line-height: 1;
    font-size: 14px;

  }
  .texts .underline{
    border-bottom: 1px solid #000000;
    text-decoration: underline;
    min-width: 120px;
    text-align: center;
    display: inline-block;
    vertical-align: middle;
  }
  .j_table{
    margin: 20px 0;
    border-collapse: collapse;
    table-layout: auto;
  }
  .j_table td{
    border:1px solid #000000;
    padding:10px;
    vertical-align: top;
  }
  .j_table .title{
    font-size: 14px;
    text-align: center;
    color: #000000;
    line-height: 15px;
  }
  .db{
    display: block;
    margin-left: 30px;
    line-height: 30px;
  }
  .specialWidth{
    width:calc(100% - 450px);
    min-width: 220px;
  }
  .specialCheck{
    /*width: 170px;*/
    margin: 5px 20px;
  }
  .dbib{
    float:left;
    width: 215px;
  }
  .zdysinput{
    margin-bottom: 10px;
  }
  .formhalfline.el-form-item{
    margin-bottom: 16px;
  } 
  .mb22{
    margin-bottom: 22px;
  }
</style>
<style>
.db .el-checkbox__input{
  vertical-align: top;
  margin-top: 11px;
}
.db .el-checkbox__label{
  white-space: normal;
  width: 100%;
  line-height: 34px;
}
.zdysinput input {
  border-width: 0 0 1px 0;
  border-radius: 0;
}
.el-input-group__append{
  padding:0 10px;
}
.cmc .el-form-item__content{
  line-height: 0;
}
.cmc .el-form-item__error{
  padding-left:20px !important;
}
.cmb .el-form-item{
  margin-bottom: 0;
}

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

.zdysinput.el-input.is-disabled .el-input__inner{
  background: transparent;
}
  .print{
    float: right;
  }
</style>
