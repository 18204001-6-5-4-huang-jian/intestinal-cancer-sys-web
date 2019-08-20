<template>
    <div slot="right" class="form-container" v-if="economyForm_page">
          <router-link to="/economy/economyList" v-if="$store.state.hospitalType==1">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
         <router-link to="/economy/economyList" v-if="$store.state.hospitalType==2">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
         <router-link to="/economy/economyList" v-if="$store.state.hospitalType==3">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
      <div class="content">
         <div class="title">表EF1-卫生经济学随访表</div>
         <div class="dec"> 您好，我们是项目工作人员，今天希望了解下您参加基线筛查后，您的生活情况及就诊活动信息，整个调查可能需要20分钟完成。若您希望自己填写问卷，请将信息记录在横线上或“|__|”中。我们承诺所有调查内容仅用于科研分析，对您回答的内容保密，请您放心如实回答，感谢您的合作！</div>
         <!-- 表单 -->
         <el-collapse class="economy" v-model="activeNames" accordion @change="handleChange">
        <el-collapse-item title="一、随访对象身份确认" name="1">
        <div class="booking-list">
          <el-row class="booking-list-item">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="4">
                  <div class="grid-content bg-purple">
                    SID：
                  </div>
                </el-col>
                <el-col :span="20">
                  <div class="grid-content bg-purple-light">
                   {{detailData.sid}}
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="4">
                  <div class="grid-content bg-purple">
                    EFID：
                  </div>
                </el-col>
                <el-col :span="20">
                  <div class="grid-content bg-purple-light">
                   {{detailData.heId}}
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="4">
                  <div class="grid-content bg-purple">
                    姓名：
                  </div>
                </el-col>
                <el-col :span="20">
                  <div class="grid-content bg-purple-light">
                    {{detailData.name}}
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
           <el-col :span="6">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="4">
                  <div class="grid-content bg-purple">
                    性别：
                  </div>
                </el-col>
                <el-col :span="20">
                  <div class="grid-content bg-purple-light">
                    {{detailData.sex | reverseSex}}
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
          <el-row class="booking-list-item">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    身份证号：
                  </div>
                </el-col>
                <el-col :span="18">
                  <div class="grid-content bg-purple-light">
                     {{detailData.idCard}}
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">
              <el-row>
             <el-col :span="4">
                  <div class="grid-content bg-purple">
                    手机号：
                  </div>
                </el-col>
                <el-col :span="20">
                  <div class="grid-content bg-purple-light">
                   {{detailData.phone}}
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">
              <el-row>
                 <el-col :span="6">
                  <div class="grid-content bg-purple">
                    所属社区：
                  </div>
                </el-col>
                <el-col :span="18">
                  <div class="grid-content bg-purple-light">
                   {{detailData.depName}}
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">
                 <el-row>
                  <el-col :span="6">
                  <div class="grid-content bg-purple">
                    所属地区：
                  </div>
                </el-col>
                <el-col :span="18">
                  <div class="grid-content bg-purple-light">
                    {{detailData.areaName}}
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
          <el-row class="booking-list-item">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-row>
                 <el-col :span="6">
                  <div class="grid-content bg-purple">
                    常住地址：
                  </div>
                </el-col>
                <el-col :span="18">
                  <div class="grid-content bg-purple-light">
                   {{detailData.address}}
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
         <el-row class="booking-list-item">
            <el-form ref="form" class="time" :model="form" :rules="formrules">
              <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-row>
                      <el-col :span="24">
                         <el-form-item label="调查员：" label-width="90px" prop="investigator">
                            <el-input v-model="form.investigator" style="width:200px;" placeholder="请输入" clearable :disabled="disabledStatus"></el-input>
                         </el-form-item>
                      </el-col>
                    </el-row>
                </div>
             </el-col>
            <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="24">
                  <div class="grid-content bg-purple-light">
                      <el-form-item label="调查日期：" label-width="110px" prop="surveyDate">
                        <el-date-picker
                          v-model="form.surveyDate"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd"
                          type="date"
                          placeholder="选择日期"
                          :picker-options="pickerOptions"
                          clearable
                          :disabled="disabledStatus">
                        </el-date-picker>
                        </el-form-item>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
            </el-form>
        </el-row>
           </div>
            </el-collapse-item>
            <el-collapse-item title="二、个人特质评估" name="2">
              <div class="second-title">2.1 以下每行为各种性格特质描述，请选择与您本人性格最接近的描述（在文本框内输入描述对应的数字）：
                <el-button type="danger" :disabled="disabledStatus" @click="cleanRuleForm()">清空</el-button>
              </div>
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="360px" class="ruleForm demo-ruleForm">
              <el-form-item label="2.1.1 外向，有热情" prop="item1">
                  <el-input class="input-item" v-model="ruleForm.item1" :disabled="disabledStatus"></el-input>
                 <span style="margin-left:200px;">
                    &nbsp;&nbsp;&nbsp;1=完全不同意&nbsp;&nbsp;&nbsp;2=大致上不同意&nbsp;&nbsp;&nbsp;3=有点不同意&nbsp;&nbsp;&nbsp;4=不清楚&nbsp;&nbsp;&nbsp;5=有点同意&nbsp;&nbsp;&nbsp;6=大致上同意&nbsp;&nbsp;&nbsp;7=完全同意
                 </span>
                </el-form-item>
                 <el-form-item label="2.1.2 善批判，好争论" prop="item2">
                  <el-input class="input-item" v-model="ruleForm.item2" :disabled="disabledStatus"></el-input>
                   <span style="margin-left:200px;">
                    &nbsp;&nbsp;&nbsp;1=完全不同意&nbsp;&nbsp;&nbsp;2=大致上不同意&nbsp;&nbsp;&nbsp;3=有点不同意&nbsp;&nbsp;&nbsp;4=不清楚&nbsp;&nbsp;&nbsp;5=有点同意&nbsp;&nbsp;&nbsp;6=大致上同意&nbsp;&nbsp;&nbsp;7=完全同意
                 </span>
                </el-form-item>
                 <el-form-item label="2.1.3 可靠，自律" prop="item3">
                  <el-input class="input-item" v-model="ruleForm.item3" :disabled="disabledStatus"></el-input>
                 <span style="margin-left:200px;">
                    &nbsp;&nbsp;&nbsp;1=完全不同意&nbsp;&nbsp;&nbsp;2=大致上不同意&nbsp;&nbsp;&nbsp;3=有点不同意&nbsp;&nbsp;&nbsp;4=不清楚&nbsp;&nbsp;&nbsp;5=有点同意&nbsp;&nbsp;&nbsp;6=大致上同意&nbsp;&nbsp;&nbsp;7=完全同意
                 </span>
                </el-form-item>
                  <el-form-item label="2.1.4 焦虑，容易烦乱" prop="item4">
                  <el-input class="input-item" v-model="ruleForm.item4" :disabled="disabledStatus"></el-input>
                 <span style="margin-left:200px;">
                    &nbsp;&nbsp;&nbsp;1=完全不同意&nbsp;&nbsp;&nbsp;2=大致上不同意&nbsp;&nbsp;&nbsp;3=有点不同意&nbsp;&nbsp;&nbsp;4=不清楚&nbsp;&nbsp;&nbsp;5=有点同意&nbsp;&nbsp;&nbsp;6=大致上同意&nbsp;&nbsp;&nbsp;7=完全同意
                 </span>
                </el-form-item>
                   <el-form-item label="2.1.5 接受新经验，复杂型" prop="item5">
                  <el-input class="input-item" v-model="ruleForm.item5" :disabled="disabledStatus"></el-input>
                  <span style="margin-left:200px;">
                    &nbsp;&nbsp;&nbsp;1=完全不同意&nbsp;&nbsp;&nbsp;2=大致上不同意&nbsp;&nbsp;&nbsp;3=有点不同意&nbsp;&nbsp;&nbsp;4=不清楚&nbsp;&nbsp;&nbsp;5=有点同意&nbsp;&nbsp;&nbsp;6=大致上同意&nbsp;&nbsp;&nbsp;7=完全同意
                 </span>
                </el-form-item>
                   <el-form-item label="2.1.6 内向，安静" prop="item6">
                  <el-input class="input-item" v-model="ruleForm.item6" :disabled="disabledStatus"></el-input>
                 <span style="margin-left:200px;">
                    &nbsp;&nbsp;&nbsp;1=完全不同意&nbsp;&nbsp;&nbsp;2=大致上不同意&nbsp;&nbsp;&nbsp;3=有点不同意&nbsp;&nbsp;&nbsp;4=不清楚&nbsp;&nbsp;&nbsp;5=有点同意&nbsp;&nbsp;&nbsp;6=大致上同意&nbsp;&nbsp;&nbsp;7=完全同意
                 </span>
                </el-form-item>
                   <el-form-item label="2.1.7 有同情心，温暖" prop="item7">
                  <el-input class="input-item" v-model="ruleForm.item7" :disabled="disabledStatus"></el-input>
                 <span style="margin-left:200px;">
                    &nbsp;&nbsp;&nbsp;1=完全不同意&nbsp;&nbsp;&nbsp;2=大致上不同意&nbsp;&nbsp;&nbsp;3=有点不同意&nbsp;&nbsp;&nbsp;4=不清楚&nbsp;&nbsp;&nbsp;5=有点同意&nbsp;&nbsp;&nbsp;6=大致上同意&nbsp;&nbsp;&nbsp;7=完全同意
                 </span>
                </el-form-item>
                   <el-form-item label="2.1.8 没有条理，粗心大意" prop="item8">
                  <el-input class="input-item" v-model="ruleForm.item8" :disabled="disabledStatus"></el-input>
                  <span style="margin-left:200px;">
                    &nbsp;&nbsp;&nbsp;1=完全不同意&nbsp;&nbsp;&nbsp;2=大致上不同意&nbsp;&nbsp;&nbsp;3=有点不同意&nbsp;&nbsp;&nbsp;4=不清楚&nbsp;&nbsp;&nbsp;5=有点同意&nbsp;&nbsp;&nbsp;6=大致上同意&nbsp;&nbsp;&nbsp;7=完全同意
                 </span>
                </el-form-item>
                   <el-form-item label="2.1.9 平静，情绪稳定" prop="item9">
                  <el-input class="input-item" v-model="ruleForm.item9" :disabled="disabledStatus"></el-input>
                  <span style="margin-left:200px;">
                    &nbsp;&nbsp;&nbsp;1=完全不同意&nbsp;&nbsp;&nbsp;2=大致上不同意&nbsp;&nbsp;&nbsp;3=有点不同意&nbsp;&nbsp;&nbsp;4=不清楚&nbsp;&nbsp;&nbsp;5=有点同意&nbsp;&nbsp;&nbsp;6=大致上同意&nbsp;&nbsp;&nbsp;7=完全同意
                 </span>
                </el-form-item>
                   <el-form-item label="2.1.10 保守，缺乏创造性" prop="item10">
                  <el-input class="input-item" v-model="ruleForm.item10" :disabled="disabledStatus"></el-input>
                 <span style="margin-left:200px;">
                    &nbsp;&nbsp;&nbsp;1=完全不同意&nbsp;&nbsp;&nbsp;2=大致上不同意&nbsp;&nbsp;&nbsp;3=有点不同意&nbsp;&nbsp;&nbsp;4=不清楚&nbsp;&nbsp;&nbsp;5=有点同意&nbsp;&nbsp;&nbsp;6=大致上同意&nbsp;&nbsp;&nbsp;7=完全同意
                 </span>
                </el-form-item>
                <el-form-item class="class" label-width="800px" label="2.2 基线评估/筛查后 或 上次卫生经济学随访后家中有无发生对您生活质量/情绪有重大影响的事件？" prop="item11">
                     <el-radio-group v-model="ruleForm.item11" size="small" :disabled="disabledStatus" @change="changeItem11()">
                         <el-radio label="1" key="1">1=无</el-radio>
                         <el-radio label="2" key="2">2=有</el-radio>
                      </el-radio-group>
                </el-form-item>  
                <div class="dec-contaner" v-if="ruleForm.item11 == 2">
                      <div v-for="(item,index) in ruleForm.influenceList" :key="index">
                        <el-form-item label-width="150px" :label="'事件'+(index+1)" :prop="`influenceList[${index}].event`" :rules="{ required: true, message: '必填', trigger: 'blur'}" style="display:inline-block;float:left;">
                         <el-input  class="input-item_" v-model="item.event" :disabled="disabledStatus"></el-input>
                      </el-form-item>  
                       <el-form-item label-width="150px" label="时间" :prop="`influenceList[${index}].eventData`" :rules="{ required: true, message: '必选', trigger: 'blur' }" style="display:inline-block;float:left;">
                           <el-date-picker
                            v-model="item.eventData"
                            format="yyyy-MM-dd"
                            type="date"
                            placeholder="选择日期"
                            :picker-options="pickerOptions"
                            :disabled="disabledStatus">
                          </el-date-picker>
                           <i style="margin-left:20px;cursor: pointer;" class="el-icon-circle-plus"  title="增加" @click="add()"></i>
                           <i style="margin-left:20px;cursor: pointer;" class="el-icon-error" title="删除" @click="del(index)"></i>
                      </el-form-item> 
                      </div>
                </div>
              </el-form>
            </el-collapse-item>
            <el-collapse-item title="三、EQ-SD-L 健康问卷--供中国地区使用之中文版（Simplified Chinese version for China）" name="3">
              <div class="second-title">请在下列各组选项中，指出哪一项最能反映您今天的健康状况，并选择相应的选项编号：
                <el-button type="danger" :disabled="disabledStatus" @click="cleanRuleForm1()">清空</el-button>
              </div>
               <el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" label-width="450px" class="ruleForm1 demo-ruleForm">
                  <el-form-item label="四处走动：" prop="item12" class="ruleForm1-label">
                  <el-radio-group class="ruleForm1-el-radio-group" v-model="ruleForm1.item12" size="small" :disabled="disabledStatus">
                         <el-radio label="1" key="1">我四处走动没有任何困难。</el-radio>
                         <el-radio label="2" key="2">我四处走动有一点困难。</el-radio>
                         <el-radio label="3" key="3">我四处走动有中度的困难。</el-radio>
                         <el-radio label="4" key="4">我四处走动有严重的困难。</el-radio>
                         <el-radio label="5" key="5">我不能四处走动。</el-radio>
                      </el-radio-group>
                  </el-form-item>
                   <el-form-item label="自我照顾：" prop="item13" class="ruleForm1-label">
                  <el-radio-group class="ruleForm1-el-radio-group" v-model="ruleForm1.item13" size="small" :disabled="disabledStatus">
                         <el-radio label="1" key="1">我自我照顾没有任何困难。</el-radio>
                         <el-radio label="2" key="2">我自己洗脸、刷牙、洗澡或穿衣有一点困难。</el-radio>
                         <el-radio label="3" key="3">我自己洗脸、刷牙、洗澡或穿衣有中度的困难。</el-radio>
                         <el-radio label="4" key="4">我自己洗脸、刷牙、洗澡或穿衣有严重的困难。</el-radio>
                         <el-radio label="5" key="5">我不能够自己洗脸、刷牙、洗澡或穿衣。</el-radio>
                      </el-radio-group>
                  </el-form-item>
                   <el-form-item label="日常活动(如工作、学习、家务事、家庭或休闲活动)：" prop="item14" class="ruleForm1-label">
                  <el-radio-group class="ruleForm1-el-radio-group" v-model="ruleForm1.item14" size="small" :disabled="disabledStatus">
                         <el-radio label="1" key="1">我进行日常活动没有任何困难。</el-radio>
                         <el-radio label="2" key="2">我进行日常活动有一点困难。</el-radio>
                         <el-radio label="3" key="3">我进行日常活动有中度的困难。</el-radio>
                         <el-radio label="4" key="4">我进行日常活动有严重的困难。</el-radio>
                         <el-radio label="5" key="5">我不能够进行日常活动。</el-radio>
                      </el-radio-group>
                  </el-form-item>
                   <el-form-item label="疼痛/不舒服：" prop="item15" class="ruleForm1-label">
                  <el-radio-group class="ruleForm1-el-radio-group" v-model="ruleForm1.item15" size="small" :disabled="disabledStatus">
                         <el-radio label="1" key="1">我没有任何疼痛或不舒服。</el-radio>
                         <el-radio label="2" key="2">我觉得有一点疼痛或不舒服。</el-radio>
                         <el-radio label="3" key="3">我觉得中度的疼痛或不舒服。</el-radio>
                         <el-radio label="4" key="4">我觉得严重的疼痛或不舒服。</el-radio>
                         <el-radio label="5" key="5">我觉得非常严重的疼痛或不舒服。</el-radio>
                      </el-radio-group>
                  </el-form-item>
                    <el-form-item label="焦虑/抑郁：" prop="item16" class="ruleForm1-label">
                  <el-radio-group class="ruleForm1-el-radio-group" v-model="ruleForm1.item16" size="small" :disabled="disabledStatus">
                         <el-radio label="1" key="1">我没有任何焦虑或抑郁。</el-radio>
                         <el-radio label="2" key="2">我觉得有一点焦虑或抑郁。</el-radio>
                         <el-radio label="3" key="3">我觉得中度的焦虑或抑郁。</el-radio>
                         <el-radio label="4" key="4">我觉得严重的焦虑或抑郁。</el-radio>
                         <el-radio label="5" key="5">我觉得非常严重的焦虑或抑郁。</el-radio>
                      </el-radio-group>
                  </el-form-item>
                  <el-form-item label="" label-width="200px" prop="item17">
                     <el-input class="input-item" v-model="ruleForm1.item17" @input="changeSliderInput()" :disabled="disabledStatus"></el-input>
                     为了帮助您反映健康状况的好坏，我们画了一个刻度尺（有点像温度计），在这刻度尺上，100代表您心目中最好的状况，0代表您心目中最差的状况。请在下面的刻度尺上标出您今天的健康状况：
                  </el-form-item>
                  <!-- 刻度尺  -->
                 <div style="width:80%;margin:0 auto;">
                    <el-slider
                    v-model="slidervalue"
                    show-stops
                    :step="5"
                    :min="0"
                    :max="100"
                    disabled
                    @input="changeSlider()">
                  </el-slider>
                 </div>
                  <div class="ruler-container" style="width:80.5%;margin:0 auto;">
                    <span>0</span>
                    <span>5</span>
                    <span>10</span>
                    <span>15</span>
                    <span>20</span>
                    <span>25</span>
                    <span>30</span>
                    <span>35</span>
                    <span>40</span>
                    <span>45</span>
                    <span>50</span>
                    <span>55</span>
                    <span>60</span>
                    <span>65</span>
                    <span>70</span>
                    <span>75</span>
                    <span>80</span>
                    <span>85</span>
                    <span>90</span>
                    <span>95</span>
                    <span>100</span>
                  </div>
               </el-form>
            </el-collapse-item>
            <el-collapse-item title="四、诊疗活动信息" name="4">
               <div class="second-title">
                   <el-button type="danger" style="float:right;margin-right:20%;" :disabled="disabledStatus" @click="cleanRuleForm2()">清空</el-button>
               </div>
               <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="500px" class="ruleForm2 demo-ruleForm">
                   <el-form-item label-width="700px" label="4.0 您在基线评估或筛查后 或上次卫生经济学随访后，是否进行了进一步筛查诊治？（1=是，2=否）" prop="item18">
                     <el-radio-group v-model="ruleForm2.item18" size="small" :disabled="disabledStatus">
                            <el-radio label="1" key="1">是</el-radio>
                            <el-radio label="2" key="2">否</el-radio>
                      </el-radio-group>
                </el-form-item>  
                  <!-- 否  -->
                <el-form-item class="class" v-if="ruleForm2.item18 == 2" label="未进一步筛查诊治的原因及所属情况为（单选，完成本题后剩余部分不需填写）：" prop="item19" label-width="600px">
                  <el-input style="margin-left: -650px;" class="input-item" v-model="ruleForm2.item19" :disabled="disabledStatus"></el-input>
                </el-form-item>
                <div v-if="ruleForm2.item18 == 2" style="padding-left:300px;font-size:14px;">
                    &nbsp;&nbsp;&nbsp;1=医生说没问题<br>
                    &nbsp;&nbsp;&nbsp;2=医生说不需任何治疗/复查<br>
                    &nbsp;&nbsp;&nbsp;3=医生建议过后复查但还没到时间<br>
                    &nbsp;&nbsp;&nbsp;4=因经济原因放弃治疗<br>
                    &nbsp;&nbsp;&nbsp;5=因错过最佳时机而放弃治疗<br>
                    &nbsp;&nbsp;&nbsp;6=其他
                </div>
                 <el-form-item class="class1" v-if="ruleForm2.item18 == 2 && ruleForm2.item19 == 6" label="其他：" label-width="100px"  prop="item20">
                    <el-input style="width:300px;" v-model="ruleForm2.item20" :disabled="disabledStatus"></el-input> 
                 </el-form-item>
                 <!-- 是  -->
                 <el-form-item class="class2" v-if="ruleForm2.item18 == 1"  label="4.0.1 期间一共有几次诊治活动？" label-width="240px" prop="item21">
                    <el-input style="width:100px;" v-model="ruleForm2.item21" @input="inputCount()" :disabled="disabledStatus"></el-input> 次
                 </el-form-item>
                 <div v-if="ruleForm2.item18 == 1" style="text-indent:500px;font-size:16px;">请逐次详情填写下表（包括诊断、治疗、随诊等）：</div>
                 <h3  v-if="ruleForm2.item18 == 1" style="margin:10px 0;" class="h3">PART 1</h3>
                 <div class="part-container" v-if="ruleForm2.item18 == 1">
                  <ul class="column1">
                     <li>序号</li>
                     <li>4.1</li>
                     <li>4.2</li>
                     <li class="li">4.3</li>
                     <li>4.3.1</li>
                     <li class="li">4.4</li>
                     <li class="li">4.4.1</li>
                     <li class="li">4.4.2</li>
                     <li class="li">4.5</li>
                     <li class="li">4.5.1</li>
                     <li class="li">4.6</li>
                     <li class="li">4.6.1</li>
                     <li class="li">4.7</li>
                     <li>4.7.1</li>
                     <li>4.7.2</li>
                     <li>4.7.3</li>
                     <li>4.7.4</li>
                     <li>4.7.5</li>
                     <li>4.7.6</li>
                     <li class="li">4.7.7</li>
                  </ul>
                  <ul class="column2">
                     <li>项目</li>
                     <li>就诊医院名称：</li>
                     <li>当次诊治（开始）日期：</li>
                     <li class="li">方式：1=门诊诊治；2=住院；3=门诊随访/随诊</li>
                     <li>住院天数（天）：</li>
                     <li class="li">当次就医临床诊断为：1=癌症；2=癌前病变；3=其他病变；4=无异常</li>
                     <li class="li">原发癌临床分期为：</li>
                     <li class="li">病变是否确诊？（1=是，2=否）</li>
                     <li class="li">当次病理诊断依据：1=无病理诊断；2=有，对象自述；3=有，一手病理报告单；4=其他，请说明</li>
                     <li class="li">请选择相应的病理结果编码（单选）</li>
                     <li class="li">治疗方案为：</li>
                     <li class="li">有无伴随疾病/并发症？（1=有；2=无）</li>
                     <li class="li">当次诊疗，总共花费（医保报销前）和个人支付的医疗费用分别是多少？（元）</li>
                     <li>其中，报销前 药品费（元）</li>
                     <li>其中，报销前 治疗费（元）</li>
                     <li>其中，报销前 手术费（元）</li>
                     <li>其中，报销前 材料费（元）</li>
                     <li>其中，报销前 检查费（元）</li>
                     <li style="line-height:40px;">其中，报销前 其它费用（元，含医事服务/挂号、床位等费用）</li>
                     <li class="li">信息来源：（最多选三项）</li>
                  </ul>
                  <div class="column3-container">
                          <ul class="column3" v-for="(item,index) in ruleForm2.diagnosisList" :key="index">
                               <li style="padding-top:0">
                                  <img src="../../assets/portrait/leftArrow.png"  v-if="ruleForm2.diagnosisList.length > 1 && index != 0" alt="" class="leftarrow" @click="Scroll('left',index)"/>
                                   <span style="margin:0 30px;">第{{index+1}}次联系</span>
                                  <img src="../../assets/portrait/rightArrow.png" v-if="ruleForm2.diagnosisList.length > 1 && index != ruleForm2.diagnosisList.length -1" alt="" class="rightarrow" @click="Scroll('right',index)"/>
                                 </li>
                                <li>
                                 <el-form-item label-width="0px" label=""  :prop="'diagnosisList.'+index+'.item1'" :rules="diagnosisListRules.item1">
                                     <img src="../../assets/portrait/star.png" alt="" class="starimg" />
                                     <el-input style="width:200px;" v-model="item.item1" :disabled="disabledStatus"></el-input> 
                                 </el-form-item>
                                </li>
                                <li>
                                    <el-form-item label-width="0px" label=""  :prop="'diagnosisList.'+index+'.item2'" :rules="diagnosisListRules.item2">
                                       <img src="../../assets/portrait/star.png" alt="" class="starimg" />
                                       <el-date-picker
                                          v-model="item.item2"
                                          type="date"
                                          style="width:200px;"
                                          format="yyyy 年 MM 月 dd 日"
                                          value-format="yyyy-MM-dd"
                                          placeholder="选择日期"
                                          :picker-options="pickerOptions"
                                          @change="changeDateTimePacker(index)"
                                          :disabled="disabledStatus">
                                      </el-date-picker>
                                    </el-form-item>
                                </li>
                                <li class="li">
                                   <el-form-item label-width="0px" label=""  :prop="'diagnosisList.'+index+'.item3'" :rules="diagnosisListRules.item3" style="margin-bottom:0;">
                                      <img src="../../assets/portrait/star.png" alt="" class="starimg" />
                                    <el-input style="width:200px;" v-model="item.item3" :disabled="disabledStatus"></el-input> 
                                 </el-form-item>
                                   <el-form-item label-width="0px" label=""  :prop="'diagnosisList.'+index+'.item4'" :rules="diagnosisListRules.item4" style="margin-bottom:0;" class="item4">
                                     病案号&nbsp;&nbsp;&nbsp;
                                    <el-input style="width:200px;" v-model="item.item4" :disabled="disabledStatus"></el-input> 
                                 </el-form-item>
                                </li>
                                <li>
                                    <el-form-item label-width="0px" label=""  :prop="'diagnosisList.'+index+'.item5'" :rules="diagnosisListRules.item5">
                                      <img src="../../assets/portrait/star.png" alt="" class="starimg" />
                                    <el-input style="width:200px;" v-model="item.item5" :disabled="disabledStatus"></el-input> 
                                 </el-form-item>
                                </li>
                                <li class="li" style="padding-top:10px;">
                                  <el-form-item label-width="0px" label=""  :prop="'diagnosisList.'+index+'.item6'" :rules="diagnosisListRules.item6" style="margin-bottom:0;">
                                      <img src="../../assets/portrait/star.png" alt="" class="starimg" />
                                    <el-input style="width:200px;" v-model="item.item6" :disabled="disabledStatus" @focus="inputItem6(index)" @input="inputItem6(index)"></el-input> 
                                 </el-form-item>
                                 <el-form-item v-if="item.item6 == '3'" label-width="0px" label=""  :prop="'diagnosisList.'+index+'.item7'" :rules="diagnosisListRules.item7" style="margin-bottom:0;" class="item7">
                                      <img src="../../assets/portrait/star.png" alt="" class="starimg" style="left:40px;"/>
                                      <span>请说明疾病名称</span>&nbsp;&nbsp;
                                    <el-input style="width:200px;" v-model="item.item7" :disabled="disabledStatus"></el-input> 
                                 </el-form-item>
                                </li>
                                <li class="li select">
                                   <el-form-item label-width="0px" label=""  :prop="'diagnosisList.'+index+'.item8'" :rules="item.item6=='4'?{}:diagnosisListRules.item8" style="margin-bottom:0;float:left;margin-left:80px;" ref="item8">
                                      <img src="../../assets/portrait/star.png" alt="" class="starimg" style="left:-30px;"/>
                                      <span>临床分期：</span>
                                      <el-select style="width:90px;" v-model="item.item8" placeholder="" clearable :disabled="disabledStatus">
                                            <el-option value="1" v-bind:key="1" label="1=Ⅰ期"></el-option>
                                            <el-option value="2" v-bind:key="2" label="2=Ⅱ期"></el-option>
                                            <el-option value="3" v-bind:key="3" label="3=Ⅲ期"></el-option>
                                            <el-option value="4" v-bind:key="4" label="4=Ⅳ期"></el-option>
                                            <el-option value="5" v-bind:key="5" label="5=无分期信息"></el-option>
                                      </el-select>
                                   </el-form-item>
                                    <el-form-item label-width="0px" label=""  :prop="'diagnosisList.'+index+'.item9'" :rules="item.item6=='4'?{}:diagnosisListRules.item9" style="margin-bottom:0;float:left;margin-left:30px;" ref="item9">
                                      <el-select style="width:90px;" v-model="item.item9" placeholder="" clearable :disabled="disabledStatus">
                                            <el-option value="1" v-bind:key="1" label="1=a"></el-option>
                                            <el-option value="2" v-bind:key="2" label="2=b"></el-option>
                                            <el-option value="3" v-bind:key="3" label="3=c"></el-option>
                                            <el-option value="4" v-bind:key="4" label="4=无细化"></el-option>
                                      </el-select>
                                   </el-form-item>
                                    <br>
                                     <el-form-item label-width="0px" label=""  :prop="'diagnosisList.'+index+'.item10'" :rules="item.item6=='4'?{}:diagnosisListRules.item10" style="margin-bottom:0;float:left;margin-left:10px;" ref="item10">
                                      <span>TNM：</span>
                                      <el-select style="width:90px;margin-left:0px;" v-model="item.item10" placeholder="" clearable :disabled="disabledStatus">
                                            <el-option value="1" v-bind:key="1" label="Tx"></el-option>
                                            <el-option value="2" v-bind:key="2" label="T0"></el-option>
                                            <el-option value="3" v-bind:key="3" label="T1"></el-option>
                                            <el-option value="4" v-bind:key="4" label="T2"></el-option>
                                            <el-option value="5" v-bind:key="5" label="T3"></el-option>
                                            <el-option value="6" v-bind:key="6" label="T4"></el-option>
                                            <el-option value="7" v-bind:key="7" label="无法提供"></el-option>
                                      </el-select>
                                   </el-form-item>
                                    <el-form-item label-width="0px" label=""  :prop="'diagnosisList.'+index+'.item11'" :rules="item.item6=='4'?{}:diagnosisListRules.item11" style="margin-bottom:0;float:left;margin-left:30px;" ref="item11">
                                      <el-select style="width:90px;" v-model="item.item11" placeholder="" clearable :disabled="disabledStatus">
                                            <el-option value="1" v-bind:key="1" label="Nx"></el-option>
                                            <el-option value="2" v-bind:key="2" label="N0"></el-option>
                                            <el-option value="3" v-bind:key="3" label="N1"></el-option>
                                            <el-option value="4" v-bind:key="4" label="N2"></el-option>
                                            <el-option value="5" v-bind:key="5" label="N3"></el-option>
                                            <el-option value="6" v-bind:key="6" label="无法提供"></el-option>
                                      </el-select>
                                   </el-form-item>
                                    <el-form-item label-width="0px" label=""  :prop="'diagnosisList.'+index+'.item12'" :rules="item.item6=='4'?{}:diagnosisListRules.item12" style="margin-bottom:0;float:left;margin-left:30px;" ref="item12">
                                      <el-select style="width:90px;" v-model="item.item12" placeholder="" clearable :disabled="disabledStatus">
                                            <el-option value="1" v-bind:key="1" label="Mx"></el-option>
                                            <el-option value="2" v-bind:key="2" label="M0"></el-option>
                                            <el-option value="3" v-bind:key="3" label="M1"></el-option>
                                            <el-option value="4" v-bind:key="4" label="无法提供"></el-option>
                                      </el-select>
                                   </el-form-item>
                                </li>
                                <li class="li">
                                   <el-form-item label-width="0px" label=""  :prop="'diagnosisList.'+index+'.item13'" :rules="item.item6=='4'?{}:diagnosisListRules.item13" style="margin-bottom:0;">
                                     <img src="../../assets/portrait/star.png" alt="" class="starimg" />
                                     <el-input style="width:200px;" v-model="item.item13" :disabled="disabledStatus"></el-input> 
                                 </el-form-item>
                                 <el-form-item v-if="item.item13 == '1'" label-width="0px" label=""  :prop="'diagnosisList.'+index+'.item14'" :rules="item.item6=='4'?{}:diagnosisListRules.item14" style="margin-bottom:0;" class="item14">
                                     <img src="../../assets/portrait/star.png" alt="" class="starimg" style="left:30px"/>
                                     <span>请说明确诊方法：</span>&nbsp;&nbsp;<el-input style="width:200px;"  v-model="item.item14" :disabled="disabledStatus"></el-input> 
                                 </el-form-item>
                                </li>
                                <li class="li">
                                   <el-form-item label-width="0px" label=""  :prop="'diagnosisList.'+index+'.item15'" :rules="item.item6=='4'?{}:diagnosisListRules.item15" style="margin-bottom:0;">
                                     <img src="../../assets/portrait/star.png" alt="" class="starimg" />
                                     <el-input style="width:200px;" v-model="item.item15" :disabled="disabledStatus"></el-input> 
                                 </el-form-item>
                                  <el-form-item v-if="item.item15 == '4'" label-width="0px" label=""  :prop="'diagnosisList.'+index+'.item16'" :rules="item.item6=='4'?{}:diagnosisListRules.item16" style="margin-bottom:0;" class="item16">
                                     <img src="../../assets/portrait/star.png" alt="" class="starimg" style="left:30px"/>
                                     <span>请说明：</span>&nbsp;&nbsp;<el-input style="width:200px;"  v-model="item.item16" :disabled="disabledStatus"></el-input> 
                                 </el-form-item>
                                </li>
                                <li class="li select">
                                    <el-form-item label-width="0px" label=""  :prop="'diagnosisList.'+index+'.item17'" :rules="item.item6=='4'?{}:diagnosisListRules.item17" style="margin-bottom:0;float:left;margin-left:80px;">
                                      <img src="../../assets/portrait/star.png" alt="" class="starimg" style="left:-30px;"/>
                                      <el-select style="width:240px;" v-model="item.item17" placeholder="" clearable :disabled="disabledStatus">
                                            <el-option value="1" v-bind:key="1" label="01.正常/大致正常结直肠粘膜"></el-option>
                                            <el-option value="2" v-bind:key="2" label="02.慢性结肠/直肠炎"></el-option>
                                            <el-option value="3" v-bind:key="3" label="03.慢性活动性结肠/直肠炎"></el-option>
                                            <el-option value="4" v-bind:key="4" label="04.慢性肉芽肿性结肠/直肠炎"></el-option>
                                            <el-option value="5" v-bind:key="5" label="05.非腺瘤性息肉"></el-option>
                                            <el-option value="6" v-bind:key="6" label="06.增生性息肉"></el-option>
                                            <el-option value="7" v-bind:key="7" label="07.无蒂锯齿状腺瘤"></el-option>
                                            <el-option value="8" v-bind:key="8" label="08.传统锯齿状腺瘤"></el-option>
                                            <el-option value="9" v-bind:key="9" label="09.锯齿状息肉不能分类"></el-option>
                                            <el-option value="10" v-bind:key="10" label="10.管状腺瘤"></el-option>
                                            <el-option value="11" v-bind:key="11" label="11.绒毛状腺瘤"></el-option>
                                            <el-option value="12" v-bind:key="12" label="12.管状绒毛状腺瘤"></el-option>
                                            <el-option value="13" v-bind:key="13" label="13.腺上皮低级别上皮内瘤变（异型增生）"></el-option>
                                            <el-option value="14" v-bind:key="14" label="14.腺上皮高级别上皮内瘤变（异型增生）"></el-option>
                                            <el-option value="15" v-bind:key="15" label="15.腺上皮高级别上皮内瘤变（粘膜内腺癌）"></el-option>
                                            <el-option value="16" v-bind:key="16" label="16.腺上皮上皮内瘤变不能分级"></el-option>
                                            <el-option value="17" v-bind:key="17" label="17.浸润性腺癌"></el-option>
                                            <el-option value="18" v-bind:key="18" label="18.癌不能分类"></el-option>
                                            <el-option value="19" v-bind:key="19" label="19.恶性肿瘤不能分类"></el-option>
                                            <el-option value="20" v-bind:key="20" label="20.其它"></el-option>
                                            <el-option value="99" v-bind:key="99" label="99.不足以作诊断"></el-option>
                                      </el-select>
                                   </el-form-item>
                                   <br>
                                    <span>详细说明（非必填）：</span>&nbsp;&nbsp;<el-input style="width:200px;"  v-model="item.item18" :disabled="disabledStatus"></el-input> 
                                </li>
                                <li class="li select">
                                        <el-form-item label-width="0px" label=""  :prop="'diagnosisList.'+index+'.item19'" :rules="item.item6=='4'?{}:diagnosisListRules.item19" style="margin-bottom:0;float:left;margin-left:80px;" ref="item19">
                                      <img src="../../assets/portrait/star.png" alt="" class="starimg" style="left:-30px;"/>
                                      <el-select style="width:240px;" v-model="item.item19" placeholder="" clearable :disabled="disabledStatus">
                                            <el-option value="1" v-bind:key="1" label="1=单纯手术治疗"></el-option>
                                            <el-option value="2" v-bind:key="2" label="2=根治术"></el-option>
                                            <el-option value="3" v-bind:key="3" label="3=单纯放疗"></el-option>
                                            <el-option value="4" v-bind:key="4" label="4=单纯化疗"></el-option>
                                            <el-option value="5" v-bind:key="5" label="5=手术+术后辅助化疗"></el-option>
                                            <el-option value="6" v-bind:key="6" label="6=新辅助化疗+手术"></el-option>
                                            <el-option value="7" v-bind:key="7" label="7=同步放化疗"></el-option>
                                            <el-option value="8" v-bind:key="8" label="8=对症支持治疗"></el-option>
                                            <el-option value="9" v-bind:key="9" label="9=其他，请说明"></el-option>
                                      </el-select>
                                   </el-form-item>
                                    <br>
                                      <el-form-item v-if="item.item19 == 9" label-width="0px" label=""  :prop="'diagnosisList.'+index+'.item20'" :rules="diagnosisListRules.item20" style="margin-bottom:0;float:left;margin-left:80px;">
                                         <img src="../../assets/portrait/star.png" alt="" class="starimg" style="left:-30px;"/>
                                         <span>请说明：</span>&nbsp;&nbsp;<el-input style="width:200px;"  v-model="item.item20" :disabled="disabledStatus"></el-input>
                                      </el-form-item>
                                </li>
                                <li class="li complication">
                                     <el-form-item label-width="0px" label=""  :prop="'diagnosisList.'+index+'.item21'" :rules="item.item6=='4'?{}:diagnosisListRules.item21" style="margin-bottom:0;" ref="item21">
                                     <img src="../../assets/portrait/star.png" alt="" class="starimg" />
                                     <el-input style="width:200px;" v-model="item.item21" :disabled="disabledStatus"></el-input> 
                                 </el-form-item>
                                 <el-form-item v-if="item.item21 == '1'" label-width="0px" label=""  :prop="'diagnosisList.'+index+'.item22'" :rules="item.item6=='4'?{}:diagnosisListRules.item22" style="margin-bottom:0;float:left;margin-left:80px;" ref="item22" class="item22">
                                     <img src="../../assets/portrait/star.png" alt="" class="starimg" style="left:-30px"/>
                                     <span>请说明：</span>&nbsp;&nbsp;<el-input style="width:200px;"  v-model="item.item22" :disabled="disabledStatus"></el-input> 
                                 </el-form-item>
                                </li>
                                <li class="li money">
                                   <el-form-item label-width="0px" label=""  :prop="'diagnosisList.'+index+'.item23'" :rules="diagnosisListRules.item23" style="margin-bottom:0;">
                                     <img src="../../assets/portrait/star.png" alt="" class="starimg" style="left:-20px"/>
                                     报销前总额：
                                     <el-input style="width:150px;" v-model="item.item23" :disabled="disabledStatus"></el-input> 
                                 </el-form-item>
                                 <el-form-item label-width="0px" label=""  :prop="'diagnosisList.'+index+'.item24'" :rules="diagnosisListRules.item24" style="margin-bottom:0;">
                                     <img src="../../assets/portrait/star.png" alt="" class="starimg" style="left:-20px"/>
                                     <span>其中个人支付：</span>&nbsp;&nbsp;<el-input style="width:150px;"  v-model="item.item24" :disabled="disabledStatus"></el-input> 
                                 </el-form-item>
                                </li>
                                <li class="money">
                                   <el-form-item label-width="0px" label=""  :prop="'diagnosisList.'+index+'.item25'" :rules="diagnosisListRules.item25">
                                     <img src="../../assets/portrait/star.png" alt="" class="starimg" style="left:-20px"/>
                                     <el-input style="width:200px;" v-model="item.item25" :disabled="disabledStatus"></el-input> 
                                 </el-form-item>
                                </li>
                                <li class="money">
                                   <el-form-item label-width="0px" label=""  :prop="'diagnosisList.'+index+'.item26'" :rules="diagnosisListRules.item26">
                                     <img src="../../assets/portrait/star.png" alt="" class="starimg" style="left:-20px"/>
                                     <el-input style="width:200px;" v-model="item.item26" :disabled="disabledStatus"></el-input> 
                                 </el-form-item>
                                </li>
                                <li class="money">
                                   <el-form-item label-width="0px" label=""  :prop="'diagnosisList.'+index+'.item27'" :rules="diagnosisListRules.item27">
                                     <img src="../../assets/portrait/star.png" alt="" class="starimg" style="left:-20px"/>
                                     <el-input style="width:200px;" v-model="item.item27" :disabled="disabledStatus"></el-input> 
                                 </el-form-item>
                                 </li> 
                                <li class="money">
                                   <el-form-item label-width="0px" label=""  :prop="'diagnosisList.'+index+'.item28'" :rules="diagnosisListRules.item28">
                                     <img src="../../assets/portrait/star.png" alt="" class="starimg" style="left:-20px"/>
                                     <el-input style="width:200px;" v-model="item.item28" :disabled="disabledStatus"></el-input> 
                                 </el-form-item>
                                </li>
                                <li class="money">
                                     <el-form-item label-width="0px" label=""  :prop="'diagnosisList.'+index+'.item29'" :rules="diagnosisListRules.item29">
                                     <img src="../../assets/portrait/star.png" alt="" class="starimg" style="left:-20px"/>
                                     <el-input style="width:200px;" v-model="item.item29" :disabled="disabledStatus"></el-input> 
                                 </el-form-item>
                                </li>
                                <li class="money">
                                     <el-form-item label-width="0px" label=""  :prop="'diagnosisList.'+index+'.item30'" :rules="diagnosisListRules.item30">
                                     <img src="../../assets/portrait/star.png" alt="" class="starimg" style="left:-20px"/>
                                     <el-input style="width:200px;" v-model="item.item30" :disabled="disabledStatus"></el-input> 
                                 </el-form-item>
                                </li>
                                <li class="li select">
                                   <el-form-item label-width="0px" label=""  :prop="'diagnosisList.'+index+'.item31'" :rules="diagnosisListRules.item31" style="margin-bottom:0;float:left;margin-left:80px;">
                                      <img src="../../assets/portrait/star.png" alt="" class="starimg" style="left:-30px;"/>
                                      <el-select  multiple :multiple-limit="3" style="width:240px;" v-model="item.item31" placeholder="" clearable :disabled="disabledStatus">
                                            <el-option value="1" v-bind:key="1" label="1=医疗机构病历"></el-option>
                                            <el-option value="2" v-bind:key="2" label="2=个体自带病历复印件"></el-option>
                                            <el-option value="3" v-bind:key="3" label="3=医疗费用清单"></el-option>
                                            <el-option value="4" v-bind:key="4" label="4=本人口述"></el-option>
                                            <el-option value="5" v-bind:key="5" label="5=家属口述"></el-option>
                                            <el-option value="6" v-bind:key="6" label="6=其他，请说明"></el-option>
                                      </el-select>
                                   </el-form-item>
                                    <br>
                                      <el-form-item  v-if="item.item31.includes('6')" label-width="0px" label=""  :prop="'diagnosisList.'+index+'.item32'" :rules="diagnosisListRules.item32" style="margin-bottom:0;float:left;margin-left:80px;">
                                         <img src="../../assets/portrait/star.png" alt="" class="starimg" style="left:-30px;"/>
                                         <span>其他，请说明：</span>&nbsp;&nbsp;<el-input style="width:200px;"  v-model="item.item32" :disabled="disabledStatus"></el-input>
                                      </el-form-item>
                                </li>
                          </ul>
                  </div>
                          <ul class="column4">
                          <li style="padding-top:0">所有次数合并</li>
                          <li style="background:#cccccc"></li>
                          <li style="background:#cccccc"></li>
                          <li style="background:#cccccc" class="li"></li>
                          <li style="background:#cccccc"></li>
                          <li style="background:#cccccc" class="li"></li>
                          <li style="background:#cccccc" class="li"></li>
                          <li style="background:#cccccc" class="li"></li>
                          <li style="background:#cccccc" class="li"></li>
                          <li style="background:#cccccc" class="li"></li>
                          <li style="background:#cccccc" class="li"></li>
                          <li style="background:#cccccc" class="li"></li>
                          <li class="li money">
                          <el-form-item label-width="0px" label=""  prop="item86" style="margin-bottom:0;">
                                    <img src="../../assets/portrait/star.png" alt="" class="starimg" style="left:-20px"/>
                                    报销前总额：
                                    <el-input style="width:150px;" v-model="ruleForm2.item86" :disabled="disabledStatus"></el-input> 
                                </el-form-item>
                                <el-form-item label-width="0px" label=""  prop="item87" style="margin-bottom:0;">
                                    <img src="../../assets/portrait/star.png" alt="" class="starimg" style="left:-20px"/>
                                    <span>其中个人支付：</span>&nbsp;&nbsp;<el-input style="width:150px;"  v-model="ruleForm2.item87" :disabled="disabledStatus"></el-input> 
                                </el-form-item>
                     </li>
                     <li class="money">
                        <el-form-item label-width="0px" label=""  prop="item88">
                                <img src="../../assets/portrait/star.png" alt="" class="starimg" style="left:-20px"/>
                               <el-input style="width:200px;" v-model="ruleForm2.item88" :disabled="disabledStatus"></el-input> 
                          </el-form-item>
                     </li>
                     <li class="money">
                       <el-form-item label-width="0px" label=""  prop="item89">
                                <img src="../../assets/portrait/star.png" alt="" class="starimg" style="left:-20px"/>
                               <el-input style="width:200px;" v-model="ruleForm2.item89" :disabled="disabledStatus"></el-input> 
                          </el-form-item>
                     </li>
                     <li class="money">
                        <el-form-item label-width="0px" label=""  prop="item90">
                                <img src="../../assets/portrait/star.png" alt="" class="starimg" style="left:-20px"/>
                               <el-input style="width:200px;" v-model="ruleForm2.item90" :disabled="disabledStatus"></el-input> 
                          </el-form-item>
                     </li>
                     <li class="money">
                        <el-form-item label-width="0px" label=""  prop="item91">
                                <img src="../../assets/portrait/star.png" alt="" class="starimg" style="left:-20px"/>
                               <el-input style="width:200px;" v-model="ruleForm2.item91" :disabled="disabledStatus"></el-input> 
                          </el-form-item>
                     </li>
                     <li class="money">
                        <el-form-item label-width="0px" label=""  prop="item92">
                                <img src="../../assets/portrait/star.png" alt="" class="starimg" style="left:-20px"/>
                               <el-input style="width:200px;" v-model="ruleForm2.item92" :disabled="disabledStatus"></el-input> 
                          </el-form-item>
                     </li>
                     <li class="money">
                        <el-form-item label-width="0px" label=""  prop="item93">
                                <img src="../../assets/portrait/star.png" alt="" class="starimg" style="left:-20px"/>
                               <el-input style="width:200px;" v-model="ruleForm2.item93" :disabled="disabledStatus"></el-input> 
                          </el-form-item>
                     </li>
                     <li class="li select">
                        <el-form-item label-width="0px" label=""  prop="item94" style="margin-bottom:0;float:left;margin-left:80px;">
                            <img src="../../assets/portrait/star.png" alt="" class="starimg" style="left:-30px;"/>
                            <el-select multiple :multiple-limit="3" style="width:240px;" v-model="ruleForm2.item94" placeholder="" clearable :disabled="disabledStatus">
                                  <el-option value="1" v-bind:key="1" label="1=医疗机构病历"></el-option>
                                  <el-option value="2" v-bind:key="2" label="2=个体自带病历复印件"></el-option>
                                  <el-option value="3" v-bind:key="3" label="3=医疗费用清单"></el-option>
                                  <el-option value="4" v-bind:key="4" label="4=本人口述"></el-option>
                                  <el-option value="5" v-bind:key="5" label="5=家属口述"></el-option>
                                  <el-option value="6" v-bind:key="6" label="6=其他，请说明"></el-option>
                            </el-select>
                          </el-form-item>
                          <br>
                            <el-form-item  v-if="ruleForm2.item94.includes('6')" label-width="0px" label=""  prop="item95" style="margin-bottom:0;float:left;margin-left:80px;">
                                <img src="../../assets/portrait/star.png" alt="" class="starimg" style="left:-30px;"/>
                                <span>其他，请说明：</span>&nbsp;&nbsp;<el-input style="width:200px;"  v-model="ruleForm2.item95" :disabled="disabledStatus"></el-input>
                            </el-form-item>
                     </li>
                  </ul>
                 </div>
                  <h3 v-if="ruleForm2.item18 == 1" style="margin:10px 0;" class="h3">PART 2</h3>
                  <div class="part-container2" v-if="ruleForm2.item18 == 1">
                    <ul class="column1">
                     <li>4.8</li>
                     <li>4.8.1</li>
                     <li>4.8.2</li>
                     <li>4.8.3</li>
                     <li>4.9</li>
                     <li>4.9.1</li>
                     <li>4.9.2</li>
                     <li>4.9.3</li>
                     <li>4.9.4</li>
                     <li>4.9.5</li>
                     <li>4.9.6</li>
                     <li>4.9.7</li>
                     <li>4.9.8</li>
                     <li class="li">4.10</li>
                     </ul>
                    <ul class="column2">
                          <li>以上常规诊疗以外的其他医疗花费合计？（元）</li>
                          <li>其中：自购药(元)</li>
                          <li>民间偏方等其他特殊治疗(元)</li>
                          <li>其他相关医疗费用(元)</li>
                          <li>以上就医其他相关花费合计？（元）</li>
                          <li>其中：住宿费(元)</li>
                          <li>交通费(元)</li>
                          <li>额外的餐费(元)</li>
                          <li>营养费(元)</li>
                          <li>雇工陪护费(元)</li>
                          <li>其他费用(元)</li>
                          <li>本人诊治期间因病休工或因病不能从事日常劳动的天数</li>
                          <li>亲友陪护人天数(人天)</li>
                          <li class="li">4.8-4.9.8信息来源：（最多选三项）</li>
                      </ul>
                       <ul class="column3">
                          <li>
                             <el-form-item  label-width="0px" label=""  prop="item22" style="margin-bottom:0;float:left;margin-left:80px;">
                                <img src="../../assets/portrait/star.png" alt="" class="starimg" style="left:-30px;"/>
                                <el-input style="width:200px;"  v-model="ruleForm2.item22" :disabled="disabledStatus"></el-input>
                            </el-form-item>
                          </li>
                          <li>
                              <el-form-item  label-width="0px" label=""  prop="item23" style="margin-bottom:0;float:left;margin-left:80px;">
                                <img src="../../assets/portrait/star.png" alt="" class="starimg" style="left:-30px;"/>
                                <el-input style="width:200px;"  v-model="ruleForm2.item23" :disabled="disabledStatus"></el-input>
                            </el-form-item>
                          </li>
                          <li>
                              <el-form-item  label-width="0px" label=""  prop="item24" style="margin-bottom:0;float:left;margin-left:80px;">
                                <img src="../../assets/portrait/star.png" alt="" class="starimg" style="left:-30px;"/>
                                <el-input style="width:200px;"  v-model="ruleForm2.item24" :disabled="disabledStatus"></el-input>
                            </el-form-item>
                          </li>
                          <li>
                              <el-form-item  label-width="0px" label=""  prop="item25" style="margin-bottom:0;float:left;margin-left:80px;">
                                <img src="../../assets/portrait/star.png" alt="" class="starimg" style="left:-30px;"/>
                                <el-input style="width:200px;"  v-model="ruleForm2.item25" :disabled="disabledStatus"></el-input>
                            </el-form-item>
                          </li>
                          <li>
                             <el-form-item  label-width="0px" label=""  prop="item26" style="margin-bottom:0;float:left;margin-left:80px;">
                                <img src="../../assets/portrait/star.png" alt="" class="starimg" style="left:-30px;"/>
                                <el-input style="width:200px;"  v-model="ruleForm2.item26" :disabled="disabledStatus"></el-input>
                            </el-form-item>
                          </li>
                          <li>
                             <el-form-item  label-width="0px" label=""  prop="item27" style="margin-bottom:0;float:left;margin-left:80px;">
                                <img src="../../assets/portrait/star.png" alt="" class="starimg" style="left:-30px;"/>
                                <el-input style="width:200px;"  v-model="ruleForm2.item27" :disabled="disabledStatus"></el-input>
                            </el-form-item>
                          </li>
                          <li>
                             <el-form-item  label-width="0px" label=""  prop="item28" style="margin-bottom:0;float:left;margin-left:80px;">
                                <img src="../../assets/portrait/star.png" alt="" class="starimg" style="left:-30px;"/>
                                <el-input style="width:200px;"  v-model="ruleForm2.item28" :disabled="disabledStatus"></el-input>
                            </el-form-item>
                          </li>
                          <li>
                             <el-form-item  label-width="0px" label=""  prop="item29" style="margin-bottom:0;float:left;margin-left:80px;">
                                <img src="../../assets/portrait/star.png" alt="" class="starimg" style="left:-30px;"/>
                                <el-input style="width:200px;"  v-model="ruleForm2.item29" :disabled="disabledStatus"></el-input>
                            </el-form-item>
                          </li>
                          <li>
                             <el-form-item  label-width="0px" label=""  prop="item30" style="margin-bottom:0;float:left;margin-left:80px;">
                                <img src="../../assets/portrait/star.png" alt="" class="starimg" style="left:-30px;"/>
                                <el-input style="width:200px;"  v-model="ruleForm2.item30" :disabled="disabledStatus"></el-input>
                            </el-form-item>
                          </li>
                          <li>
                             <el-form-item  label-width="0px" label=""  prop="item31" style="margin-bottom:0;float:left;margin-left:80px;">
                                <img src="../../assets/portrait/star.png" alt="" class="starimg" style="left:-30px;"/>
                                <el-input style="width:200px;"  v-model="ruleForm2.item31" :disabled="disabledStatus"></el-input>
                            </el-form-item>
                          </li>
                          <li>
                             <el-form-item  label-width="0px" label=""  prop="item32" style="margin-bottom:0;float:left;margin-left:80px;">
                                <img src="../../assets/portrait/star.png" alt="" class="starimg" style="left:-30px;"/>
                                <el-input style="width:200px;"  v-model="ruleForm2.item32" :disabled="disabledStatus"></el-input>
                            </el-form-item>
                          </li>
                          <li>
                             <el-form-item  label-width="0px" label=""  prop="item33" style="margin-bottom:0;float:left;margin-left:80px;">
                                <img src="../../assets/portrait/star.png" alt="" class="starimg" style="left:-30px;"/>
                                <el-input style="width:200px;"  v-model="ruleForm2.item33" :disabled="disabledStatus"></el-input>
                            </el-form-item>
                          </li>
                           <li>
                              <el-form-item  label-width="0px" label=""  prop="item34" style="margin-bottom:0;float:left;margin-left:80px;">
                                <img src="../../assets/portrait/star.png" alt="" class="starimg" style="left:-30px;"/>
                                <el-input style="width:200px;"  v-model="ruleForm2.item34" :disabled="disabledStatus"></el-input>
                            </el-form-item>
                           </li>
                          <li class="li" style="padding-top:0">
                             <el-form-item  label-width="0px" label=""  prop="item35" style="margin-bottom:0;margin-left:20px;" class="group">
                                <img src="../../assets/portrait/star.png" alt="" class="starimg" style="left:0px;"/>
                                <el-checkbox-group v-model="ruleForm2.item35" class="group" :disabled="disabledStatus">
                                  <el-checkbox label="1" key="1">1=本人口述</el-checkbox>
                                  <el-checkbox label="2" key="2">2=家属口述</el-checkbox>
                                  <el-checkbox label="3" key="3">3=其他，请说明</el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                             <el-form-item  v-if="ruleForm2.item35.includes('3')" label-width="0px" label=""  prop="item36" style="margin-bottom:0;float:left;margin-left:80px;">
                                <img src="../../assets/portrait/star.png" alt="" class="starimg" style="left:-30px;"/>
                               <span>其他，请说明：</span>&nbsp;&nbsp; <el-input style="width:200px;"  v-model="ruleForm2.item36" :disabled="disabledStatus"></el-input>
                            </el-form-item>
                          </li>
                      </ul>
                  </div>
                  <div class="part-container3" v-if="ruleForm2.item18 == 1">
                    <div class="div">
                       <el-form-item  label-width="320px" label="4.11 如有上表无法反映的费用信息，请补充说明"  prop="item37" class="item37">
                               <el-input style="width:400px;"  v-model="ruleForm2.item37" :disabled="disabledStatus"></el-input>
                        </el-form-item>
                    </div>
                    <div class="div">
                       <el-form-item label-width="420px" label="4.12 以上个人支付的医疗和非医疗费用支出的主要经济来源是：" prop="item38" style="margin-bottom:0;">
                          <el-input class="input-item" v-model="ruleForm2.item38" :disabled="disabledStatus" @input="inputItem38"></el-input>
                      </el-form-item>
                       <div style="padding-left:420px;font-size:14px;">
                            <br>&nbsp;&nbsp;&nbsp;1=当年收入<br><br>
                            &nbsp;&nbsp;&nbsp;2=自家往年的存款<br><br>
                            &nbsp;&nbsp;&nbsp;3=向亲朋借钱，借钱的额度大约是（元）：
                              <el-form-item label-width="0px" label="" :prop="ruleForm2.item38 == '3'?'item39':''" style="margin-bottom:0;margin-left:300px;margin-top:-30px;" class="item39" ref="item39">
                                 <el-input  style="width:200px;" v-model="ruleForm2.item39" :disabled="disabledStatus"></el-input>
                              </el-form-item>
                            <br>
                            &nbsp;&nbsp;&nbsp;4=其他，请说明：
                             <el-form-item label-width="0px" label="" prop="item40" style="margin-bottom:0;margin-left:130px;margin-top:-30px;" class="item40">
                                 <el-input  style="width:200px;" v-model="ruleForm2.item40" :disabled="disabledStatus"></el-input>
                              </el-form-item>
                               <br>
                      </div>
                    </div>
                     <div class="div">
                       <el-form-item label-width="420px" label="4.13 您的医疗保障状况属于（最多选两项）：" prop="item41" style="margin-bottom:0;">
                            <el-input class="input-item" v-model="ruleForm2.item41" @input="inputItem41()"></el-input>
                            <el-input class="input-item" style="margin-left:-70px" ref="item411" v-model="ruleForm2.item411" :disabled="disabledStatus" @input="inputItem41()"></el-input>
                      </el-form-item>
                       <div style="padding-left:420px;font-size:14px;">
                            <br>&nbsp;&nbsp;&nbsp;1=城镇职工基本医疗保险<br><br>
                             &nbsp;&nbsp;&nbsp;2=城镇居民医疗保险<br><br>
                             &nbsp;&nbsp;&nbsp;3=新型农村合作医疗<br><br>
                             &nbsp;&nbsp;&nbsp;4=商业医疗保险<br><br>
                             &nbsp;&nbsp;&nbsp;5=公费医疗<br><br>
                             &nbsp;&nbsp;&nbsp;6=自费<br><br>
                            &nbsp;&nbsp;&nbsp;7=民政医疗救助，额度是（元）：
                             <el-form-item label-width="0px" label="" :prop="ruleForm2.item41 == '7' || ruleForm2.item411 == '7'?'item42':''" style="margin-bottom:0;margin-left:240px;margin-top:-30px;" class="item42" ref="item42">
                                <el-input  style="width:200px;" v-model="ruleForm2.item42" :disabled="disabledStatus"></el-input>
                              </el-form-item>
                            <br>
                            &nbsp;&nbsp;&nbsp;8=其他，请说明：
                             <el-form-item label-width="0px" label="" prop="item43" style="margin-bottom:0;margin-left:240px;margin-top:-30px;" class="item43">
                                  <el-input  style="width:200px;" v-model="ruleForm2.item43" :disabled="disabledStatus"></el-input> 
                              </el-form-item>
                            &nbsp;&nbsp;&nbsp;9=不清楚
                      </div>
                     </div>
                      <div class="div">
                         <el-form-item label-width="420px" label="4.13.1 是否为大病医保？" prop="item44" style="margin-bottom:0;">
                            <el-input class="input-item" v-model="ruleForm2.item44" :disabled="disabledStatus"></el-input>
                         </el-form-item>
                          <div style="padding-left:420px;font-size:14px;">
                            <br>&nbsp;&nbsp;&nbsp;1=是<br><br>
                             &nbsp;&nbsp;&nbsp;2=否<br><br>
                          </div>
                      </div>
                       <div class="div">
                          <el-form-item label-width="420px" label="4.14 这次患病给您的家庭造成的经济压力属以下哪种情况？" prop="item45" style="margin-bottom:0;">
                            <el-input class="input-item" v-model="ruleForm2.item45" :disabled="disabledStatus"></el-input>
                         </el-form-item>
                         <div style="padding-left:420px;font-size:14px;">
                            <br>&nbsp;&nbsp;&nbsp;1=基本没有影响<br><br>
                             &nbsp;&nbsp;&nbsp;2=勉强可以承受<br><br>
                             &nbsp;&nbsp;&nbsp;3=有一定压力<br><br>
                             &nbsp;&nbsp;&nbsp;4=压力很大<br><br>
                             &nbsp;&nbsp;&nbsp;5=其他，请说明：
                              <el-form-item label-width="0px" label="" prop="item46" style="margin-bottom:0;margin-left:130px;margin-top:-30px;" class="item46">
                                  <el-input  style="width:200px;" v-model="ruleForm2.item46" :disabled="disabledStatus"></el-input> 
                              </el-form-item>
                          </div>
                       </div>
                        <div class="div">
                           <el-form-item label-width="420px" label="4.15 在过去一年内，您全家年收入大约为多少元？" prop="item47" style="margin-bottom:0;">
                            <el-input class="input-item" v-model="ruleForm2.item47" :disabled="disabledStatus"></el-input>
                         </el-form-item>
                         <div style="padding-left:420px;font-size:14px;">
                          <br>&nbsp;&nbsp;&nbsp;1=2.0万以下<br><br>
                            &nbsp;&nbsp;&nbsp;2=2.0-3.9万<br><br>
                            &nbsp;&nbsp;&nbsp;3=4.0-5.9万<br><br>
                            &nbsp;&nbsp;&nbsp;4=6.0-7.9万<br><br>
                            &nbsp;&nbsp;&nbsp;5=8.0-14.9万<br><br>
                            &nbsp;&nbsp;&nbsp;6=15.0万及以上<br><br>
                         </div>
                        </div>
                         <div class="div">
                            <el-form-item label-width="420px" label="您家里共同生活的有几口人？" prop="item48" style="margin-bottom:0;">
                            <el-input class="input-item" style="width:30px;" v-model="ruleForm2.item48" :disabled="disabledStatus"></el-input>
                         </el-form-item>
                         </div>
                  </div>
               </el-form>
            </el-collapse-item>
             <el-collapse-item title="五、生活质量评估--FACT问卷生活质量评估--通用部分" name="5" v-if="isVerifypart5">
              <div class="second-title" style="text-align:center;text-indent:0px;">（FACIT.org 授权使用：FACT问卷系列，第四版，简体中文版）以下是一些与您患有同样疾病的人所认为重要的陈述。请选择与您过去7天情况最接近的描述（在文本框内输入描述对应的数字）：
                <el-button type="danger" :disabled="disabledStatus" @click="cleanRuleForm3()">清空</el-button>
              </div>
               <el-form :model="ruleForm3" :rules="rules" ref="ruleForm3" label-width="390px" class="ruleForm3 demo-ruleForm">
                 <h3 class="h3">生理状况</h3>
                  <el-form-item label="GP1 我精神不好" prop="item49">
                  <el-input class="input-item" v-model="ruleForm3.item49" :disabled="disabledStatus"></el-input>
                 <span style="margin-left:340px;">
                    &nbsp;&nbsp;&nbsp;0=一点也不&nbsp;&nbsp;&nbsp;1=有一点&nbsp;&nbsp;&nbsp;2=有些&nbsp;&nbsp;&nbsp;3=相当&nbsp;&nbsp;&nbsp;4=非常
                 </span>
                </el-form-item>
                 <el-form-item label="GP2 我感到恶心" prop="item50">
                  <el-input class="input-item" v-model="ruleForm3.item50" :disabled="disabledStatus"></el-input>
                 <span style="margin-left:340px;">
                    &nbsp;&nbsp;&nbsp;0=一点也不&nbsp;&nbsp;&nbsp;1=有一点&nbsp;&nbsp;&nbsp;2=有些&nbsp;&nbsp;&nbsp;3=相当&nbsp;&nbsp;&nbsp;4=非常
                 </span>
                </el-form-item>
                   <el-form-item label="GP3 因为我身体不好，我满足家庭的需要有困难" prop="item51">
                  <el-input class="input-item" v-model="ruleForm3.item51" :disabled="disabledStatus"></el-input>
                 <span style="margin-left:340px;">
                    &nbsp;&nbsp;&nbsp;0=一点也不&nbsp;&nbsp;&nbsp;1=有一点&nbsp;&nbsp;&nbsp;2=有些&nbsp;&nbsp;&nbsp;3=相当&nbsp;&nbsp;&nbsp;4=非常
                 </span>
                </el-form-item>
                 <el-form-item label="GP4 我感到疼痛" prop="item52">
                  <el-input class="input-item" v-model="ruleForm3.item52" :disabled="disabledStatus"></el-input>
                  <span style="margin-left:340px;">
                    &nbsp;&nbsp;&nbsp;0=一点也不&nbsp;&nbsp;&nbsp;1=有一点&nbsp;&nbsp;&nbsp;2=有些&nbsp;&nbsp;&nbsp;3=相当&nbsp;&nbsp;&nbsp;4=非常
                 </span>
                </el-form-item>
                 <el-form-item label="GP5 治疗的副作用使我感到烦恼" prop="item53">
                  <el-input class="input-item" v-model="ruleForm3.item53" :disabled="disabledStatus"></el-input>
                 <span style="margin-left:340px;">
                    &nbsp;&nbsp;&nbsp;0=一点也不&nbsp;&nbsp;&nbsp;1=有一点&nbsp;&nbsp;&nbsp;2=有些&nbsp;&nbsp;&nbsp;3=相当&nbsp;&nbsp;&nbsp;4=非常
                 </span>
                </el-form-item>
                 <el-form-item label="GP6 我觉得病了" prop="item54">
                  <el-input class="input-item" v-model="ruleForm3.item54" :disabled="disabledStatus"></el-input>
                 <span style="margin-left:340px;">
                    &nbsp;&nbsp;&nbsp;0=一点也不&nbsp;&nbsp;&nbsp;1=有一点&nbsp;&nbsp;&nbsp;2=有些&nbsp;&nbsp;&nbsp;3=相当&nbsp;&nbsp;&nbsp;4=非常
                 </span>
                </el-form-item>
                 <el-form-item label="GP7 我因病被迫要卧床休息" prop="item55">
                  <el-input class="input-item" v-model="ruleForm3.item55" :disabled="disabledStatus"></el-input>
                 <span style="margin-left:340px;">
                    &nbsp;&nbsp;&nbsp;0=一点也不&nbsp;&nbsp;&nbsp;1=有一点&nbsp;&nbsp;&nbsp;2=有些&nbsp;&nbsp;&nbsp;3=相当&nbsp;&nbsp;&nbsp;4=非常
                 </span>
                </el-form-item>
                 <h3 class="h3">社会/家庭状况</h3>
                 <el-form-item label="GS1 我和朋友们很亲近" prop="item56">
                  <el-input class="input-item" v-model="ruleForm3.item56" :disabled="disabledStatus"></el-input>
                 <span style="margin-left:340px;">
                    &nbsp;&nbsp;&nbsp;0=一点也不&nbsp;&nbsp;&nbsp;1=有一点&nbsp;&nbsp;&nbsp;2=有些&nbsp;&nbsp;&nbsp;3=相当&nbsp;&nbsp;&nbsp;4=非常
                 </span>
                </el-form-item>
                  <el-form-item label="GS2 我在感情上得到家人的支持" prop="item57">
                  <el-input class="input-item" v-model="ruleForm3.item57" :disabled="disabledStatus"></el-input>
                  <span style="margin-left:340px;">
                    &nbsp;&nbsp;&nbsp;0=一点也不&nbsp;&nbsp;&nbsp;1=有一点&nbsp;&nbsp;&nbsp;2=有些&nbsp;&nbsp;&nbsp;3=相当&nbsp;&nbsp;&nbsp;4=非常
                 </span>
                </el-form-item>
                  <el-form-item label="GS3 我得到朋友的支持" prop="item58">
                  <el-input class="input-item" v-model="ruleForm3.item58" :disabled="disabledStatus"></el-input>
                 <span style="margin-left:340px;">
                    &nbsp;&nbsp;&nbsp;0=一点也不&nbsp;&nbsp;&nbsp;1=有一点&nbsp;&nbsp;&nbsp;2=有些&nbsp;&nbsp;&nbsp;3=相当&nbsp;&nbsp;&nbsp;4=非常
                 </span>
                </el-form-item>
                  <el-form-item label="GS4 我的家人已能正视我患病这一事实" prop="item59">
                  <el-input class="input-item" v-model="ruleForm3.item59" :disabled="disabledStatus"></el-input>
                  <span style="margin-left:340px;">
                    &nbsp;&nbsp;&nbsp;0=一点也不&nbsp;&nbsp;&nbsp;1=有一点&nbsp;&nbsp;&nbsp;2=有些&nbsp;&nbsp;&nbsp;3=相当&nbsp;&nbsp;&nbsp;4=非常
                 </span>
                </el-form-item>
                  <el-form-item label="GS5 我满意家人间对我疾病的沟通方式" prop="item60">
                  <el-input class="input-item" v-model="ruleForm3.item60" :disabled="disabledStatus"></el-input>
                <span style="margin-left:340px;">
                    &nbsp;&nbsp;&nbsp;0=一点也不&nbsp;&nbsp;&nbsp;1=有一点&nbsp;&nbsp;&nbsp;2=有些&nbsp;&nbsp;&nbsp;3=相当&nbsp;&nbsp;&nbsp;4=非常
                 </span>
                </el-form-item>
                  <el-form-item  label="GS6 我与自己的配偶（或给我主要支持的人）很亲近" prop="item61">
                  <el-input class="input-item" v-model="ruleForm3.item61" :disabled="disabledStatus"></el-input>
                 <span style="margin-left:340px;">
                    &nbsp;&nbsp;&nbsp;0=一点也不&nbsp;&nbsp;&nbsp;1=有一点&nbsp;&nbsp;&nbsp;2=有些&nbsp;&nbsp;&nbsp;3=相当&nbsp;&nbsp;&nbsp;4=非常
                 </span>
                </el-form-item>
                <div style="padding-left:100px;">Q1 不管你近期的性生活的程度，请回答下面的问题（如果你不愿回答，请在这里注明 □，然后回答下一组问题）</div>
                 <el-form-item label="GS7 我对自己的性生活感到满意" prop="item62">
                  <el-input class="input-item" v-model="ruleForm3.item62" :disabled="disabledStatus"></el-input>
                  <span style="margin-left:340px;">
                    &nbsp;&nbsp;&nbsp;0=一点也不&nbsp;&nbsp;&nbsp;1=有一点&nbsp;&nbsp;&nbsp;2=有些&nbsp;&nbsp;&nbsp;3=相当&nbsp;&nbsp;&nbsp;4=非常&nbsp;&nbsp;&nbsp;5=不愿回答
                 </span>
                </el-form-item>
                 <h3 class="h3">情感状况</h3>
                  <el-form-item label="GE1 我感到悲伤" prop="item63">
                  <el-input class="input-item" v-model="ruleForm3.item63" :disabled="disabledStatus"></el-input>
                  <span style="margin-left:340px;">
                    &nbsp;&nbsp;&nbsp;0=一点也不&nbsp;&nbsp;&nbsp;1=有一点&nbsp;&nbsp;&nbsp;2=有些&nbsp;&nbsp;&nbsp;3=相当&nbsp;&nbsp;&nbsp;4=非常
                 </span>
                </el-form-item>
                 <el-form-item label="GE2 我满意自己处理疾病的方式" prop="item64">
                  <el-input class="input-item" v-model="ruleForm3.item64" :disabled="disabledStatus"></el-input>
                 <span style="margin-left:340px;">
                    &nbsp;&nbsp;&nbsp;0=一点也不&nbsp;&nbsp;&nbsp;1=有一点&nbsp;&nbsp;&nbsp;2=有些&nbsp;&nbsp;&nbsp;3=相当&nbsp;&nbsp;&nbsp;4=非常
                 </span>
                </el-form-item>
                 <el-form-item label="GE3 在与疾病的抗争中，我越来越感到失望" prop="item65">
                  <el-input class="input-item" v-model="ruleForm3.item65" :disabled="disabledStatus"></el-input>
                 <span style="margin-left:340px;">
                    &nbsp;&nbsp;&nbsp;0=一点也不&nbsp;&nbsp;&nbsp;1=有一点&nbsp;&nbsp;&nbsp;2=有些&nbsp;&nbsp;&nbsp;3=相当&nbsp;&nbsp;&nbsp;4=非常
                 </span>
                </el-form-item>
                 <el-form-item label="GE4 我感到紧张" prop="item66">
                  <el-input class="input-item" v-model="ruleForm3.item66" :disabled="disabledStatus"></el-input>
                 <span style="margin-left:340px;">
                    &nbsp;&nbsp;&nbsp;0=一点也不&nbsp;&nbsp;&nbsp;1=有一点&nbsp;&nbsp;&nbsp;2=有些&nbsp;&nbsp;&nbsp;3=相当&nbsp;&nbsp;&nbsp;4=非常
                 </span>
                </el-form-item>
                 <el-form-item label="GE5 我担心我可能会去世" prop="item67">
                  <el-input class="input-item" v-model="ruleForm3.item67" :disabled="disabledStatus"></el-input>
                 <span style="margin-left:340px;">
                    &nbsp;&nbsp;&nbsp;0=一点也不&nbsp;&nbsp;&nbsp;1=有一点&nbsp;&nbsp;&nbsp;2=有些&nbsp;&nbsp;&nbsp;3=相当&nbsp;&nbsp;&nbsp;4=非常
                 </span>
                </el-form-item>
                 <el-form-item label="GE6 我担心自己的病情会恶化" prop="item68">
                  <el-input class="input-item" v-model="ruleForm3.item68" :disabled="disabledStatus"></el-input>
                 <span style="margin-left:340px;">
                    &nbsp;&nbsp;&nbsp;0=一点也不&nbsp;&nbsp;&nbsp;1=有一点&nbsp;&nbsp;&nbsp;2=有些&nbsp;&nbsp;&nbsp;3=相当&nbsp;&nbsp;&nbsp;4=非常
                 </span>
                </el-form-item>
                <h3 class="h3">功能状况</h3>
                    <el-form-item label="GF1 我能够工作（包括在家里工作）" prop="item69">
                  <el-input class="input-item" v-model="ruleForm3.item69" :disabled="disabledStatus"></el-input>
                 <span style="margin-left:340px;">
                    &nbsp;&nbsp;&nbsp;0=一点也不&nbsp;&nbsp;&nbsp;1=有一点&nbsp;&nbsp;&nbsp;2=有些&nbsp;&nbsp;&nbsp;3=相当&nbsp;&nbsp;&nbsp;4=非常
                 </span>
                </el-form-item>
                  <el-form-item label="GF2 我能够享受生活" prop="item70">
                  <el-input class="input-item" v-model="ruleForm3.item70" :disabled="disabledStatus"></el-input>
                 <span style="margin-left:340px;">
                    &nbsp;&nbsp;&nbsp;0=一点也不&nbsp;&nbsp;&nbsp;1=有一点&nbsp;&nbsp;&nbsp;2=有些&nbsp;&nbsp;&nbsp;3=相当&nbsp;&nbsp;&nbsp;4=非常
                 </span>
                </el-form-item>
                  <el-form-item label="GF3 我已能面对自己的疾病" prop="item71">
                  <el-input class="input-item" v-model="ruleForm3.item71" :disabled="disabledStatus"></el-input>
                 <span style="margin-left:340px;">
                    &nbsp;&nbsp;&nbsp;0=一点也不&nbsp;&nbsp;&nbsp;1=有一点&nbsp;&nbsp;&nbsp;2=有些&nbsp;&nbsp;&nbsp;3=相当&nbsp;&nbsp;&nbsp;4=非常
                 </span>
                </el-form-item>
                  <el-form-item label="GF4 我感到紧张" prop="item72">
                  <el-input class="input-item" v-model="ruleForm3.item72" :disabled="disabledStatus"></el-input>
                 <span style="margin-left:340px;">
                    &nbsp;&nbsp;&nbsp;0=一点也不&nbsp;&nbsp;&nbsp;1=有一点&nbsp;&nbsp;&nbsp;2=有些&nbsp;&nbsp;&nbsp;3=相当&nbsp;&nbsp;&nbsp;4=非常
                 </span>
                </el-form-item>
                  <el-form-item label="GF5 我睡得很好" prop="item73">
                  <el-input class="input-item" v-model="ruleForm3.item73" :disabled="disabledStatus"></el-input>
                <span style="margin-left:340px;">
                    &nbsp;&nbsp;&nbsp;0=一点也不&nbsp;&nbsp;&nbsp;1=有一点&nbsp;&nbsp;&nbsp;2=有些&nbsp;&nbsp;&nbsp;3=相当&nbsp;&nbsp;&nbsp;4=非常
                 </span>
                </el-form-item>
                  <el-form-item label="GF6 我在享受我常做的娱乐活动" prop="item74">
                  <el-input class="input-item" v-model="ruleForm3.item74" :disabled="disabledStatus"></el-input>
                 <span style="margin-left:340px;">
                    &nbsp;&nbsp;&nbsp;0=一点也不&nbsp;&nbsp;&nbsp;1=有一点&nbsp;&nbsp;&nbsp;2=有些&nbsp;&nbsp;&nbsp;3=相当&nbsp;&nbsp;&nbsp;4=非常
                 </span>
                </el-form-item>
                  <el-form-item label="GF7 我对现在的生活质量感到满意" prop="item75">
                  <el-input class="input-item" v-model="ruleForm3.item75" :disabled="disabledStatus"></el-input>
                 <span style="margin-left:340px;">
                    &nbsp;&nbsp;&nbsp;0=一点也不&nbsp;&nbsp;&nbsp;1=有一点&nbsp;&nbsp;&nbsp;2=有些&nbsp;&nbsp;&nbsp;3=相当&nbsp;&nbsp;&nbsp;4=非常
                 </span>
                </el-form-item>
                <div style="padding-left:100px;">5.1 大肠病变特异性项目（FACT-C，Mainland Chinese，23 November 2009，Copyright 1987，1997）
请在每行圈选或标出一个数字来表明适用于您过去7天情况的回答。</div>
                 <h3 class="h3">附加关注</h3>
                  <el-form-item label="C1 我肚子肿胀或绞痛" prop="item76">
                  <el-input class="input-item" v-model="ruleForm3.item76" :disabled="disabledStatus"></el-input>
                 <span style="margin-left:340px;">
                    &nbsp;&nbsp;&nbsp;0=一点也不&nbsp;&nbsp;&nbsp;1=有一点&nbsp;&nbsp;&nbsp;2=有些&nbsp;&nbsp;&nbsp;3=相当&nbsp;&nbsp;&nbsp;4=非常
                 </span>
                </el-form-item>
                 <el-form-item label="C2 我的体重在下降" prop="item77">
                  <el-input class="input-item" v-model="ruleForm3.item77" :disabled="disabledStatus"></el-input>
                 <span style="margin-left:340px;">
                    &nbsp;&nbsp;&nbsp;0=一点也不&nbsp;&nbsp;&nbsp;1=有一点&nbsp;&nbsp;&nbsp;2=有些&nbsp;&nbsp;&nbsp;3=相当&nbsp;&nbsp;&nbsp;4=非常
                 </span>
                </el-form-item>
                 <el-form-item label="C3 我能控制我的大便" prop="item78">
                  <el-input class="input-item" v-model="ruleForm3.item78" :disabled="disabledStatus"></el-input>
                 <span style="margin-left:340px;">
                    &nbsp;&nbsp;&nbsp;0=一点也不&nbsp;&nbsp;&nbsp;1=有一点&nbsp;&nbsp;&nbsp;2=有些&nbsp;&nbsp;&nbsp;3=相当&nbsp;&nbsp;&nbsp;4=非常
                 </span>
                </el-form-item>
                 <el-form-item label="C4 我能很好地消化食物" prop="item79">
                  <el-input class="input-item" v-model="ruleForm3.item79" :disabled="disabledStatus"></el-input>
                 <span style="margin-left:340px;">
                    &nbsp;&nbsp;&nbsp;0=一点也不&nbsp;&nbsp;&nbsp;1=有一点&nbsp;&nbsp;&nbsp;2=有些&nbsp;&nbsp;&nbsp;3=相当&nbsp;&nbsp;&nbsp;4=非常
                 </span>
                </el-form-item>
                 <el-form-item label="C5 我拉肚子" prop="item80">
                  <el-input class="input-item" v-model="ruleForm3.item80" :disabled="disabledStatus"></el-input>
                 <span style="margin-left:340px;">
                    &nbsp;&nbsp;&nbsp;0=一点也不&nbsp;&nbsp;&nbsp;1=有一点&nbsp;&nbsp;&nbsp;2=有些&nbsp;&nbsp;&nbsp;3=相当&nbsp;&nbsp;&nbsp;4=非常
                 </span>
                </el-form-item>
                 <el-form-item label="C6 我的食欲好" prop="item81">
                  <el-input class="input-item" v-model="ruleForm3.item81" :disabled="disabledStatus"></el-input>
                 <span style="margin-left:340px;">
                    &nbsp;&nbsp;&nbsp;0=一点也不&nbsp;&nbsp;&nbsp;1=有一点&nbsp;&nbsp;&nbsp;2=有些&nbsp;&nbsp;&nbsp;3=相当&nbsp;&nbsp;&nbsp;4=非常
                 </span>
                </el-form-item>
                 <el-form-item label="C7 我喜欢我的外表" prop="item82">
                  <el-input class="input-item" v-model="ruleForm3.item82" :disabled="disabledStatus"></el-input>
                 <span style="margin-left:340px;">
                    &nbsp;&nbsp;&nbsp;0=一点也不&nbsp;&nbsp;&nbsp;1=有一点&nbsp;&nbsp;&nbsp;2=有些&nbsp;&nbsp;&nbsp;3=相当&nbsp;&nbsp;&nbsp;4=非常
                 </span>
                </el-form-item>
                <el-form-item label-width="600px" label="Q2 您使用造瘘器吗（请勾选一个方框）（如果是，请回答下面两个问题：）" prop="item83">
                  <el-radio-group v-model="ruleForm3.item83" size="small" :disabled="disabledStatus">
                         <el-radio label="1" key="1">不</el-radio>
                         <el-radio label="2" key="2">是</el-radio>
                      </el-radio-group>
                </el-form-item>
                 <el-form-item v-if="ruleForm3.item83 == 2" label="C8 造瘘器让我感到难为情" prop="item84">
                  <el-input class="input-item" v-model="ruleForm3.item84" :disabled="disabledStatus"></el-input>
                  <span style="margin-left:340px;">
                    &nbsp;&nbsp;&nbsp;0=一点也不&nbsp;&nbsp;&nbsp;1=有一点&nbsp;&nbsp;&nbsp;2=有些&nbsp;&nbsp;&nbsp;3=相当&nbsp;&nbsp;&nbsp;4=非常
                 </span>
                </el-form-item>
                  <el-form-item v-if="ruleForm3.item83 == 2" label="C9 照顾我的造瘘器有困难" prop="item85">
                  <el-input class="input-item" v-model="ruleForm3.item85" :disabled="disabledStatus"></el-input>
                 <span style="margin-left:340px;">
                    &nbsp;&nbsp;&nbsp;0=一点也不&nbsp;&nbsp;&nbsp;1=有一点&nbsp;&nbsp;&nbsp;2=有些&nbsp;&nbsp;&nbsp;3=相当&nbsp;&nbsp;&nbsp;4=非常
                 </span>
                </el-form-item>
               </el-form>
            </el-collapse-item>
          </el-collapse>
      </div>
      <div class="btns">
          <router-link to="/economy/economyList" v-if="$store.state.hospitalType==1 && $route.query.status != 'see'">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
         <router-link to="/economy/economyList" v-if="$store.state.hospitalType==2 && $route.query.status != 'see'">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
         <router-link to="/economy/economyList" v-if="$store.state.hospitalType==3 && $route.query.status != 'see'">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
        <el-button type="success" @click="saveData()" v-if="$route.query.status != 'see'">暂时保存</el-button>
        <el-button type="danger" @click="submitForm()" v-if="$route.query.status != 'see'">提交</el-button>
      </div>
    </div>
</template>
<script>
import $ from 'jquery'
export default {
    data(){
      // 20个字，数字/汉字/字母
      let validInvestigator = (rule,value,callback) => {
         let reg = /^[A-Za-z0-9\u4e00-\u9fa5]{1,20}$/;
          if(!value){
            callback(new Error('必填'))
          }else if(!reg.test(value)){
            callback(new Error('请输入20个以内数字/汉字/字母'))
          }else{
           callback()
          }
      }
      // 20个字，数字/字母
      let validInvestigator1 = (rule,value,callback) =>{
          let reg = /^[A-Za-z0-9]{1,20}$/;
          if(!value){
            callback()
          }else if(!reg.test(value)){
            callback(new Error('请输入20个以内数字/字母'))
          }else{
           callback()
          }
      }
      // 1-7
      let validNumber = (rule,value,callback) => {
        let reg = /^\d+$/;
        if(!value){
          callback(new Error('必填'))
        }else if(!reg.test(value) || value < 1 || value > 7){
           callback(new Error('请录入1/2/3/4/5/6/7'))
        }else{
           callback()
        }
      }
      // 0-4
      let validNumber1 = (rule,value,callback) => {
        let reg = /^\d+$/;
        if(!value){
          callback(new Error('必填'))
        }else if(!reg.test(value) || value < 0 || value > 4){
           callback(new Error('请录入0/1/2/3/4'))
        }else{
           callback()
        }
      }
      // 0-5
       let validNumber2 = (rule,value,callback) => {
        let reg = /^\d+$/;
        if(!value){
          callback(new Error('必填'))
        }else if(!reg.test(value) || value < 0 || value > 5){
           callback(new Error('请录入0/1/2/3/4/5'))
        }else{
           callback()
        }
      }
       // 0-10
       let validCount010 = (rule,value,callback) => {
        let reg = /^\d+$/;
        if(!value){
          callback(new Error('必填'))
        }else if(!reg.test(value) || value < 0 || value > 10){
           callback(new Error('请录入0-10的整数'))
        }else{
           callback()
        }
      }
      // 1-10
      let validCount10 = (rule,value,callback) => {
        let reg = /^\d+$/;
        if(!value){
          callback(new Error('必填'))
        }else if(!reg.test(value) || value < 1 || value > 10){
           callback(new Error('请录入1-10的整数'))
        }else{
           callback()
        }
      }
      // 1-3
        let validCount1_3 = (rule,value,callback) => {
        let reg = /^\d+$/;
        if(!value){
          callback(new Error('必填'))
        }else if(!reg.test(value) || value < 1 || value > 3){
           callback(new Error('请录入1/2/3'))
        }else{
           callback()
        }
      }
      // 1-4
      let validCount1_4 = (rule,value,callback) => {
        let reg = /^\d+$/;
        if(!value){
          callback(new Error('必填'))
        }else if(!reg.test(value) || value < 1 || value > 4){
           callback(new Error('请录入1/2/3/4'))
        }else{
           callback()
        }
      }
      // 1-9
      let validCount1_9 = (rule,value,callback) => {
        let reg = /^\d+$/;
        if(!value){
          callback(new Error('必填'))
        }else if(!reg.test(value) || value < 1 || value > 9){
           callback(new Error('请录入1-9的整数'))
        }else{
           callback()
        }
      }
      // 多选的input验证
      let validMoreInput = (rule,value,callback) => {
        let item411 = this.$refs.item411.value;
        let reg = /^\d+$/;
        if (!value && !item411) {
           callback(new Error('必填'));
        }else if(value && (!reg.test(value) || value < 1 || value > 9)){
           callback(new Error('请录入1-9的整数'))
        }else if(item411 && (!reg.test(item411) || item411 < 1 || item411 > 9)){
           callback(new Error('请录入1-9的整数'))
        }else if(value == item411){
            callback(new Error('不能相同'))
        }else{
           callback()
        }
      }
      // 1-2
      let validCount1_2 = (rule,value,callback) => {
        let reg = /^\d+$/;
        if(!value){
          callback(new Error('必填'))
        }else if(!reg.test(value) || value < 1 || value > 2){
           callback(new Error('请录入1/2'))
        }else{
           callback()
        }
      }
      // 1-5
       let validCount1_5 = (rule,value,callback) => {
        let reg = /^\d+$/;
        if(!value){
          callback(new Error('必填'))
        }else if(!reg.test(value) || value < 1 || value > 5){
           callback(new Error('请录入1/2/3/4/5'))
        }else{
           callback()
        }
      }
      // 1-6
      let validCount1_6 = (rule,value,callback) => {
        let reg = /^\d+$/;
        if(!value){
          callback(new Error('必填'))
        }else if(!reg.test(value) || value < 1 || value > 6){
           callback(new Error('请录入1/2/3/4/5/6'))
        }else{
           callback()
        }
      }
      // 0-100
      let validCount100 = (rule,value,callback) => {
        let reg = /^\d+$/;
        if(!value){
          callback(new Error('必填'))
        }else if(!reg.test(value) || value < 0 || value > 100){
           callback(new Error('请录入小于0-100整数'))
        }else{
           callback()
        }
      }
      // 0-500 可以有一位小数
      let validCount500Float = (rule,value,callback) => {
        let reg = /^\d+(?:\.\d{1})?$/;
         if(!value){
          callback(new Error('必填'))
        }else if(!reg.test(value) || value < 0 || value > 501){
           callback(new Error('请录入0-500的数字'))
        }else{
           callback()
        }
      }
      // 0-500
      let validCount500 = (rule,value,callback) => {
        let reg = /^\d+$/;
        if(!value){
          callback(new Error('必填'))
        }else if(!reg.test(value) || value < 0 || value > 500){
           callback(new Error('请录入0-500的整数'))
        }else{
           callback()
        }
      }
      // 小于300个字符
      let valid300Str = (rule,value,callback) =>{
         if(!value){
          callback()
        }else if(value.length > 300){
           callback(new Error('请输入小于300个字符'))
        }else{
           callback()
        }
      }
      // 小于等于6位整数
      let valid6Int = (rule,value,callback) => {
        let reg = /^(0|[1-9]\d{0,5})$/;
         if(!value){
            callback(new Error('必填'))
          }else if(!reg.test(value)){
            callback(new Error('请录入小于等于6位整数'))
          }else{
            callback()
          }
        }
      // 小于等于7位整数
      let valid7Int = (rule,value,callback) => {
        let reg = /^(0|[1-9]\d{0,6})$/;
         if(!value){
            callback(new Error('必填'))
          }else if(!reg.test(value)){
            callback(new Error('请录入小于等于7位整数'))
          }else{
            callback()
          }
        }
        // 所有次数合计 (报销前总额)
        let valid7Int_ = (rule,value,callback) => {
        let reg = /^(0|[1-9]\d{0,6})$/;
         if(!value){
            callback(new Error('必填'))
          }else if(!reg.test(value)){
            callback(new Error('请录入小于等于7位整数'))
          }else if(this.ruleForm2.item86 != '9'){
            // 填写“9”时，不做合计效验
            if(this.ruleForm2.item87 != '9' && (Number(this.ruleForm2.item86) <= Number(this.ruleForm2.item87))){
               callback(new Error('请录入小于等于7位整数'))
            }
            // 报销前总额大于所有诊疗次数之和；
            let total = null;
            for(let k = 0;k<this.ruleForm2.diagnosisList.length;k++){
              if(this.ruleForm2.diagnosisList[k].item23 && this.ruleForm2.diagnosisList[k].item23 != '9'){
                  total = Number(total) + Number(this.ruleForm2.diagnosisList[k].item23);
              }
            }
            if(Number(this.ruleForm2.item86) < Number(total)){
               callback(new Error('请录入小于等于7位整数'))
            }
          }else{
            callback()
          }
        }
        // 所有次数合计 (个人支付)
        let valid7Int1_ = (rule,value,callback) => {
        let reg = /^(0|[1-9]\d{0,6})$/;
         if(!value){
            callback(new Error('必填'))
          }else if(!reg.test(value)){
            callback(new Error('请录入小于等于7位整数'))
          }else if(this.ruleForm2.item86 != '9'){
            // 填写“9”时，不做合计效验
            if(this.ruleForm2.item87 != '9' && (Number(this.ruleForm2.item86) <= Number(this.ruleForm2.item87))){
               callback(new Error('请录入小于等于7位整数'))
            }
            // 个人支付大于所有诊疗次数之和；
            let total = null;
            for(let k = 0;k<this.ruleForm2.diagnosisList.length;k++){
              if(this.ruleForm2.diagnosisList[k].item24 && this.ruleForm2.diagnosisList[k].item24 != '9'){
                  total = Number(total) + Number(this.ruleForm2.diagnosisList[k].item24);
              }
            }
            if(Number(this.ruleForm2.item87) < Number(total)){
               callback(new Error('请录入小于等于7位整数'))
            }
          }else{
            callback()
          }
        }
        // 【4.8大于4.8.1+4.8.2+4.8.3】
        let valid4_8 = (rule,value,callback) =>{
            let reg = /^(0|[1-9]\d{0,6})$/;
            let a;let b;let c;
             if(this.ruleForm2.item23 == null || this.ruleForm2.item23 == ''){
               a = 0
             }else{
               a = this.ruleForm2.item23;
             }
             if(this.ruleForm2.item24 == null || this.ruleForm2.item24 == ''){
               b = 0
             }else{
               b = this.ruleForm2.item24;
             }
             if(this.ruleForm2.item25 == null || this.ruleForm2.item25 == ''){
               c = 0
             }else{
               c = this.ruleForm2.item25;
             }
             if(!value){
               callback(new Error('必填'))
             }else if(!reg.test(value)){
               callback(new Error('请录入小于等于7位整数'))
             }else if(Number(value) <= Number(a) + Number(b) + Number(c)){
               callback(new Error('请录入小于等于7位整数'))
             }else{
               callback()
             }
        }
        let valid4_8_ = (rule,value,callback) => {
            let reg = /^(0|[1-9]\d{0,6})$/;
            let a;let b;let c;let d;
             if(this.ruleForm2.item23 == null || this.ruleForm2.item23 == ''){
               a = 0
             }else{
               a = this.ruleForm2.item23;
             }
             if(this.ruleForm2.item24 == null || this.ruleForm2.item24 == ''){
               b = 0
             }else{
               b = this.ruleForm2.item24;
             }
             if(this.ruleForm2.item25 == null || this.ruleForm2.item25 == ''){
               c = 0
             }else{
               c = this.ruleForm2.item25;
             }
             if(this.ruleForm2.item22 == null || this.ruleForm2.item22 == ''){
               d = 0
             }else{
               d = this.ruleForm2.item22;
             }
              if(!value){
               callback(new Error('必填'))
             }else if(!reg.test(value)){
               callback(new Error('请录入小于等于7位整数'))
             }else if(Number(d) <= Number(a) + Number(b) + Number(c)){
               callback(new Error('请录入小于等于7位整数'))
             }else{
               callback()
             }
        }
        // 4.9.1+4.9.2+4.9.3+4.9.4+4.9.5+4.9.6】
        let valid4_9 = (rule,value,callback) => {
          let reg = /^(0|[1-9]\d{0,6})$/;
          let a;let b;let c;let d;let e;let f;
            if(this.ruleForm2.item27 == null || this.ruleForm2.item27 == ''){
               a = 0
             }else{
               a = this.ruleForm2.item27;
             }
             if(this.ruleForm2.item28 == null || this.ruleForm2.item28 == ''){
               b = 0
             }else{
               b = this.ruleForm2.item28;
             }
             if(this.ruleForm2.item29 == null || this.ruleForm2.item29 == ''){
               c = 0
             }else{
               c = this.ruleForm2.item29;
             }
             if(this.ruleForm2.item30 == null || this.ruleForm2.item30 == ''){
               d = 0
             }else{
               d = this.ruleForm2.item30;
             }
              if(this.ruleForm2.item31 == null || this.ruleForm2.item31 == ''){
               e = 0
             }else{
               e = this.ruleForm2.item31;
             }
              if(this.ruleForm2.item32 == null || this.ruleForm2.item32 == ''){
               f = 0
             }else{
               f = this.ruleForm2.item32;
             }
              if(!value){
               callback(new Error('必填'))
             }else if(!reg.test(value)){
               callback(new Error('请录入小于等于7位整数'))
             }else if(Number(value) <= Number(a) + Number(b) + Number(c) + Number(d) + Number(e) + Number(f)){
               callback(new Error('请录入小于等于7位整数'))
             }else{
               callback()
             }
        }
         let valid4_9_ = (rule,value,callback) => {
          let reg = /^(0|[1-9]\d{0,6})$/;
          let a;let b;let c;let d;let e;let f;let g;
            if(this.ruleForm2.item27 == null || this.ruleForm2.item27 == ''){
               a = 0
             }else{
               a = this.ruleForm2.item27;
             }
             if(this.ruleForm2.item28 == null || this.ruleForm2.item28 == ''){
               b = 0
             }else{
               b = this.ruleForm2.item28;
             }
             if(this.ruleForm2.item29 == null || this.ruleForm2.item29 == ''){
               c = 0
             }else{
               c = this.ruleForm2.item29;
             }
             if(this.ruleForm2.item30 == null || this.ruleForm2.item30 == ''){
               d = 0
             }else{
               d = this.ruleForm2.item30;
             }
              if(this.ruleForm2.item31 == null || this.ruleForm2.item31 == ''){
               e = 0
             }else{
               e = this.ruleForm2.item31;
             }
              if(this.ruleForm2.item32 == null || this.ruleForm2.item32 == ''){
               f = 0
             }else{
               f = this.ruleForm2.item32;
             }
              if(this.ruleForm2.item26 == null || this.ruleForm2.item26 == ''){
               g = 0
             }else{
               g = this.ruleForm2.item26;
             }
              if(!value){
               callback(new Error('必填'))
             }else if(!reg.test(value)){
               callback(new Error('请录入小于等于7位整数'))
             }else if(Number(g) <= Number(a) + Number(b) + Number(c) + Number(d) + Number(e) + Number(f)){
               callback(new Error('请录入小于等于7位整数'))
             }else{
               callback()
             }
        }
        return{
           economyForm_page:false,
           btnAuth:{

           },
           pickerOptions:{
             disabledDate(time) {
                return time.getTime() > Date.now();
              },
           },
           activeNames: ['1'],
          // 一、随访对象身份确认
           detailData:{
              sid:'',
              heId:'',
              name:'',
              sex:null,
              idCard:'',
              phone:'',
              depName:'',
              areaName:'',
              address:'',
           },
           form:{
              investigator:'',
              surveyDate:'',
           },
          //  二
           ruleForm:{
             item1:null,
             item2:null,
             item3:null,
             item4:null,
             item5:null,
             item6:null,
             item7:null,
             item8:null,
             item9:null,
             item10:null,
             item11:null,
             influenceList:[
               { event:'',eventData:''}
             ]
           },
          //  三
           ruleForm1:{
             item12:null,
             item13:null,
             item14:null,
             item15:null,
             item16:null,
             item17:null,
           },
          //  四
           ruleForm2:{
             item18:null,
             item19:null,
             item20:'',
             item21:null,
            //PART 1
             diagnosisList:[
              { 
                item1:'',
                item2:'',
                item3:'',
                item4:'',
                item5:'',
                item6:'',
                item7:'',
                item8:null,
                item9:null,
                item10:null,
                item11:null,
                item12:null,
                item13:'',
                item14:'',
                item15:'',
                item16:'',
                item17:null,
                item18:'',
                item19:null,
                item20:'',
                item21:'',
                item22:'',
                item23:'',
                item24:'',
                item25:null,
                item26:null,
                item27:null,
                item28:null,
                item29:null,
                item30:null,
                item31:[],
                item32:''
              }
           ],
          // 所有次数合计
             item86:'',
             item87:'',
             item88:'',
             item89:'',
             item90:'',
             item91:'',
             item92:'',
             item93:'',
             item94:[],
             item95:'',

             //PART 2
             item22:'',
             item23:'',
             item24:'',
             item25:'',
             item26:'',
             item27:'',
             item28:'',
             item29:'',
             item30:'',
             item31:'',
             item32:'',
             item33:'',
             item34:'',
             item35:[],
             item36:'',
             item37:'',
             item38:'',
             item39:'',
             item40:'',
             item41:'',
             item411:'',
             item42:'',
             item43:'',
             item44:'',
             item45:'',
             item46:'',
             item47:'',
             item48:''
           },
           //  五
           ruleForm3:{
             item49:null,
             item50:null,
             item51:null,
             item52:null,
             item53:null,
             item54:null,
             item55:null,
             item56:null,
             item57:null,
             item58:null,
             item59:null,
             item60:null,
             item61:null,
             item62:null,
             item63:null,
             item64:null,
             item65:null,
             item66:null,
             item67:null,
             item68:null,
             item69:null,
             item70:null,
             item71:null,
             item72:null,
             item73:null,
             item74:null,
             item75:null,
             item76:null,
             item77:null,
             item78:null,
             item79:null,
             item80:null,
             item81:null,
             item82:null,
             item83:null,
             item84:null,
             item85:null,
           },
           formrules:{
                investigator:[
                   { required: true, message: '必填', trigger: 'blur' },
                    { validator:validInvestigator,trigger:'blur'}
                ],
                surveyDate:[
                   { required: true, message: '必填', trigger: 'change' },
                ]
           },
           rules:{
             item1:[
                 { required: true, message: '必填', trigger: 'blur' },
                 { validator:validNumber,trigger:['blur','change']}
             ],
             item2:[
                 { required: true, message: '必填', trigger: 'blur' },
                 { validator:validNumber,trigger:['blur','change']}
             ],
             item3:[
                 { required: true, message: '必填', trigger: 'blur' },
                 { validator:validNumber,trigger:['blur','change']}
             ],
             item4:[
                 { required: true, message: '必填', trigger: 'blur' },
                 { validator:validNumber,trigger:['blur','change']}
             ],
             item5:[
                 { required: true, message: '必填', trigger: 'blur' },
                 { validator:validNumber,trigger:['blur','change']}
             ],
             item6:[
                 { required: true, message: '必填', trigger: 'blur' },
                 { validator:validNumber,trigger:['blur','change']}
             ],
             item7:[
                 { required: true, message: '必填', trigger: 'blur' },
                 { validator:validNumber,trigger:['blur','change']}
             ],
             item8:[
                 { required: true, message: '必填', trigger: 'blur' },
                 { validator:validNumber,trigger:['blur','change']}
             ],
             item9:[
                 { required: true, message: '必填', trigger: 'blur' },
                 { validator:validNumber,trigger:['blur','change']}
             ],
             item10:[
                 { required: true, message: '必填', trigger: 'blur' },
                 { validator:validNumber,trigger:['blur','change']}
             ],
             item11:[
                 { required: true, message: '必选', trigger: 'change' }
             ],
             item12:[
                 { required: true, message: '必选', trigger: 'change' }
             ],
             item13:[
                 { required: true, message: '必选', trigger: 'change' }
             ],
             item14:[
                 { required: true, message: '必选', trigger: 'change' }
             ],
             item15:[
                 { required: true, message: '必选', trigger: 'change' }
             ],
             item16:[
                { required: true, message: '必选', trigger: 'change' }
             ],
             item17:[
                { required: true, message: '必填', trigger: ['blur','change'] },
                 // 0-100
                 { validator:validCount100,trigger:'blur'}
             ],
             item18:[
               { required: true, message: '必选', trigger: 'change' },
             ],
             item19:[
               { required: true, message: '必填', trigger: 'blur' },
                { validator:validCount1_6,trigger:'blur'}
             ],
             item20:[
               { required: true, message: '必填', trigger: 'blur' },
               { validator:valid300Str,trigger:['blur','change']}
             ],
             item21:[
                 { required: true, message: '必填', trigger: 'blur' },
                 { validator:validCount10,trigger:'blur'}
             ],
             item49:[
                 { required: true, message: '必填', trigger: ['blur','change'] },
                 { validator:validNumber1,trigger:'blur'}
             ],
             item50:[
                 { required: true, message: '必填', trigger: ['blur','change'] },
                 { validator:validNumber1,trigger:'blur'}
             ],
             item51:[
                 { required: true, message: '必填', trigger: ['blur','change'] },
                 { validator:validNumber1,trigger:'blur'}
             ],
             item52:[
                 { required: true, message: '必填', trigger: ['blur','change'] },
                 { validator:validNumber1,trigger:'blur'}
             ],
              item53:[
                 { required: true, message: '必填', trigger: ['blur','change'] },
                 { validator:validNumber1,trigger:'blur'}
             ],
              item54:[
                 { required: true, message: '必填', trigger: ['blur','change'] },
                 { validator:validNumber1,trigger:'blur'}
             ],
              item55:[
                 { required: true, message: '必填', trigger: ['blur','change'] },
                 { validator:validNumber1,trigger:'blur'}
             ],
             item56:[
                 { required: true, message: '必填', trigger: ['blur','change'] },
                 { validator:validNumber1,trigger:'blur'}
             ],
             item57:[
                 { required: true, message: '必填', trigger: ['blur','change'] },
                 { validator:validNumber1,trigger:'blur'}
             ],
             item58:[
                 { required: true, message: '必填', trigger: ['blur','change'] },
                 { validator:validNumber1,trigger:'blur'}
             ],
             item59:[
                 { required: true, message: '必填', trigger: ['blur','change'] },
                 { validator:validNumber1,trigger:'blur'}
             ],
             item60:[
                 { required: true, message: '必填', trigger: ['blur','change'] },
                 { validator:validNumber1,trigger:'blur'}
             ],  
             item61:[
                 { required: true, message: '必填', trigger:['blur','change'] },
                 { validator:validNumber1,trigger:'blur'}
             ],
             item62:[
                 { required: true, message: '必填', trigger: ['blur','change'] },
                 { validator:validNumber2,trigger:'blur'}
             ],
             item63:[
                { required: true, message: '必填', trigger: ['blur','change'] },
                { validator:validNumber1,trigger:'blur'}
             ],
             item64:[
                { required: true, message: '必填', trigger: ['blur','change'] },
                { validator:validNumber1,trigger:'blur'}
             ],
             item65:[
                { required: true, message: '必填', trigger: ['blur','change']},
                { validator:validNumber1,trigger:'blur'}
             ],
             item66:[
                { required: true, message: '必填', trigger: ['blur','change'] },
                { validator:validNumber1,trigger:'blur'}
             ],
             item67:[
                { required: true, message: '必填', trigger: ['blur','change'] },
                { validator:validNumber1,trigger:'blur'}
             ],
             item68:[
                { required: true, message: '必填', trigger: ['blur','change'] },
                { validator:validNumber1,trigger:'blur'}
             ],
              item69:[
                { required: true, message: '必填', trigger: ['blur','change'] },
                { validator:validNumber1,trigger:'blur'}
             ],
              item70:[
                { required: true, message: '必填', trigger: ['blur','change'] },
                { validator:validNumber1,trigger:'blur'}
             ],
              item71:[
                { required: true, message: '必填', trigger: ['blur','change'] },
                { validator:validNumber1,trigger:'blur'}
             ],
             item72:[
                { required: true, message: '必填', trigger: ['blur','change'] },
                { validator:validNumber1,trigger:'blur'}
             ],
             item73:[
                { required: true, message: '必填', trigger: ['blur','change'] },
                { validator:validNumber1,trigger:'blur'}
             ],
             item74:[
                { required: true, message: '必填', trigger: ['blur','change'] },
                { validator:validNumber1,trigger:'blur'}
             ],
             item75:[
                { required: true, message: '必填', trigger: ['blur','change'] },
                { validator:validNumber1,trigger:'blur'}
             ],
             item76:[
                { required: true, message: '必填', trigger: ['blur','change'] },
                { validator:validNumber1,trigger:'blur'}
             ],
             item77:[
                { required: true, message: '必填', trigger: ['blur','change'] },
                { validator:validNumber1,trigger:'blur'}
             ],
             item78:[
                { required: true, message: '必填', trigger: ['blur','change'] },
                { validator:validNumber1,trigger:'blur'}
             ],
             item79:[
                { required: true, message: '必填', trigger: ['blur','change'] },
                { validator:validNumber1,trigger:'blur'}
             ],
             item80:[
                { required: true, message: '必填', trigger: ['blur','change'] },
                { validator:validNumber1,trigger:'blur'}
             ],
             item81:[
                { required: true, message: '必填', trigger: ['blur','change'] },
                { validator:validNumber1,trigger:'blur'}
             ],
             item82:[
                { required: true, message: '必填', trigger: ['blur','change'] },
                { validator:validNumber1,trigger:'blur'}
             ],
             item83:[
               { required: true, message: '必选', trigger: ['blur','change'] }
             ],
             item84:[
                { required: true, message: '必填', trigger: ['blur','change'] },
                { validator:validNumber1,trigger:'blur'}
             ],
             item85:[
                { required: true, message: '必填', trigger: ['blur','change'] },
                { validator:validNumber1,trigger:'blur'}
             ],
            // 所有次数合计
             item86:[
                { required: true, message: '必填', trigger: 'blur' },
                { validator:valid7Int_,trigger:['blur','change']}
             ],
             item87:[
                { required: true, message: '必填', trigger: 'blur' },
                { validator:valid7Int1_,trigger:['blur','change']}
             ],
             item88:[
                { required: true, message: '必填', trigger: 'blur' },
                { validator:valid7Int,trigger:['blur','change']}
             ],
             item89:[
                { required: true, message: '必填', trigger: 'blur' },
                { validator:valid7Int,trigger:['blur','change']}
             ],
             item90:[
                { required: true, message: '必填', trigger: 'blur' },
                { validator:valid7Int,trigger:['blur','change']}
             ],
             item91:[
                { required: true, message: '必填', trigger: 'blur' },
                { validator:valid7Int,trigger:['blur','change']}
             ],
             item92:[
                { required: true, message: '必填', trigger: 'blur' },
                { validator:valid7Int,trigger:['blur','change']}
             ],
             item93:[
                { required: true, message: '必填', trigger: 'blur' },
                { validator:valid7Int,trigger:['blur','change']}
             ],
             item94:[
                { required: true, message: '必选', trigger: 'change' },
             ],
             item95:[
                { required: true, message: '必填', trigger: 'blur' },
             ],
             item22:[
               { required: true, message: '必填', trigger: 'blur' },
               { validator:valid4_8,trigger:['blur','change']}
             ],
             item23:[
               { required: true, message: '必填', trigger: 'blur' },
               { validator:valid4_8_,trigger:['blur','change']}
             ],
             item24:[
               { required: true, message: '必填', trigger: 'blur' },
               { validator:valid4_8_,trigger:['blur','change']}
             ],
             item25:[
               { required: true, message: '必填', trigger: 'blur' },
               { validator:valid4_8_,trigger:['blur','change']}
             ],
             item26:[
               { required: true, message: '必填', trigger: 'blur' },
               { validator:valid4_9,trigger:['blur','change']}
             ],
             item27:[
               { required: true, message: '必填', trigger: 'blur' },
               { validator:valid4_9_,trigger:['blur','change']}
             ],
             item28:[
               { required: true, message: '必填', trigger: 'blur' },
               { validator:valid4_9_,trigger:['blur','change']}
             ],
             item29:[
               { required: true, message: '必填', trigger: 'blur' },
               { validator:valid4_9_,trigger:['blur','change']}
             ],
             item30:[
               { required: true, message: '必填', trigger: 'blur' },
               { validator:valid4_9_,trigger:['blur','change']}
             ],
             item31:[
               { required: true, message: '必填', trigger: 'blur' },
               { validator:valid4_9_,trigger:['blur','change']}
             ],
             item32:[
               { required: true, message: '必填', trigger: 'blur' },
               { validator:valid4_9_,trigger:['blur','change']}
             ],
             item33:[
               { required: true, message: '必填', trigger: 'blur' },
               { validator:validCount500,trigger:['blur','change']}
             ],
             item34:[
               { required: true, message: '必填', trigger: 'blur' },
               { validator:validCount500,trigger:['blur','change']}
             ],
              item35:[
               { required: true, message: '必选', trigger: 'change' },
             ],
              item36:[
               { required: true, message: '必填', trigger: 'blur' },
             ],
             item37:[
                { validator:valid300Str,trigger:'blur'} 
             ],
             item38:[
                { required: true, message: '必填', trigger: 'blur' },
                { validator:validCount1_4,trigger:'blur'}
             ],
             item39:[
                 { validator:valid6Int,trigger:'blur'}
             ],
             item40:[
                 { validator:valid300Str,trigger:'blur'}
             ],
             item41:[
                { validator:validMoreInput,trigger:'blur'}
             ],
             item42:[
                 { required: true, message: '必填', trigger: 'blur' },
                 { validator:valid6Int,trigger:'blur'}
             ],
             item43:[
                 { validator:valid300Str,trigger:'blur'}
             ],
             item44:[
                { required: true, message: '必填', trigger: 'blur' },
                { validator:validCount1_2,trigger:'blur'}
             ],
             item45:[
                { required: true, message: '必填', trigger: 'blur' },
                { validator:validCount1_5,trigger:'blur'}
             ],
             item46:[
                 { validator:valid300Str,trigger:'blur'}
             ],
             item47:[
               { required: true, message: '必填', trigger: 'blur' },
               { validator:validCount1_6,trigger:'blur'} 
             ],
             item48:[
                { required: true, message: '必填', trigger: 'blur' },
                { validator:validCount010,trigger:'blur'}
             ]
           },
           // 诊治记录
           diagnosisListRules:{
             item1:[
                { required: true, message: '必填', trigger: 'blur' },
             ],
             item2:[
                { required: true, message: '必填', trigger: 'blur' },
             ],
             item3:[
                { required: true, message: '必填', trigger: 'blur' },
                // 1/2/3
                 { validator:validCount1_3,trigger:'blur'}
             ],
             item4:[
                 //20个字，数字/字母
                { validator:validInvestigator1,trigger:'blur'}
             ],
             item5:[
                { required: true, message: '必填', trigger: 'blur'},
                // 0-500 可以有一位小数
                 { validator:validCount500Float,trigger:'blur'}
             ],
             item6:[
                { required: true, message: '必填', trigger:'blur'},
                // 1-4
                { validator:validCount1_4,trigger:'blur'}
             ],
             item7:[
                { required: true, message: '必填', trigger: 'blur'},
             ],
             item8:[
                { required: true, message: '必选', trigger: 'change' },
             ],
             item9:[
                { required: true, message: '必选', trigger: 'change' },
             ],
             item10:[
                { required: true, message: '必选', trigger: 'change' },
             ],
             item11:[
                { required: true, message: '必选', trigger: 'change' },
             ],
             item12:[
                { required: true, message: '必选', trigger: 'change' },
             ],
             item13:[
                { required: true, message: '必填', trigger:'blur'},
                // 1-2
                { validator:validCount1_2,trigger:'blur'}
             ],
             item14:[
                { required: true, message: '必填', trigger:'blur'},
             ],
             item15:[
                { required: true, message: '必填', trigger:'blur'},
                // 1-4
                { validator:validCount1_4,trigger:'blur'}
             ],
             item16:[
                { required: true, message: '必填', trigger:'blur'},
             ],
             item17:[
                { required: true, message: '必选', trigger: 'change' },
             ],
             item19:[
                { required: true, message: '必选', trigger: 'change' },
             ],
             item20:[
                { required: true, message: '必填', trigger: 'blur' },
             ],
             item21:[
                { required: true, message: '必填', trigger: 'blur' },
                // 1-2
                { validator:validCount1_2,trigger:'blur'}
             ],
             item22:[
                { required: true, message: '必填', trigger: 'blur' },
             ],
             item23:[
                { required: true, message: '必填', trigger: 'blur' },
                { validator:valid7Int,trigger:'blur'}
             ],
             item24:[
                { required: true, message: '必填', trigger: 'blur' },
                { validator:valid7Int,trigger:'blur'}
             ],
             item25:[
                { required: true, message: '必填', trigger: 'blur' },
                { validator:valid7Int,trigger:['blur','change']}
             ],
             item26:[
                { required: true, message: '必填', trigger: 'blur' },
                { validator:valid7Int,trigger:['blur','change']}
             ],
             item27:[
                { required: true, message: '必填', trigger: 'blur' },
                { validator:valid7Int,trigger:['blur','change']}
             ],
             item28:[
                { required: true, message: '必填', trigger: 'blur' },
                { validator:valid7Int,trigger:['blur','change']}
             ],
             item29:[
                { required: true, message: '必填', trigger: 'blur' },
                { validator:valid7Int,trigger:['blur','change']}
             ],
             item30:[
                { required: true, message: '必填', trigger: 'blur' },
                { validator:valid7Int,trigger:['blur','change']}
             ],
             item31:[
                { required: true, message: '必选', trigger: 'change' },
             ],
             item32:[
                { required: true, message: '必填', trigger: 'blur' },
             ],
           },
           slidervalue:0,
           ischangeSlider:true,
           id:'',
           disabledStatus:false,
           isVerifypart4:true,
           isVerifypart5:true,
        }
    },
    components:{

    },
    created() {
      // console.log(Array.from($('.column3-container')))
    },
    mounted(){
         let obj = this.checkPageAuth(this,"economyForm_page",this.btnAuth) 
         //查询个人基本信息
          $axios_http({
             url:'/base/hospital/healthEconomicsPerson/query',
             data:{
               sid:this.$route.query.sid
             },
             vueObj: this
           }).then((res)=>{
              if(res.data.statusMsg == 'success'){
                 this.detailData = res.data.data;
              }
           }) 
          //查询填写信息
          $axios_http({
             url:'/base/hospital/healthEconomicsInfo/query',
             data:{
               id:this.$route.query.id
             },
             vueObj: this
           }).then((res)=>{
              if(res.data.statusMsg == 'success'){
                 this.id = res.data.data.id; //用于 保存和提交
                if(this.$route.query.status == 'see'){
                  this.disabledStatus = true;
                }
                if(this.$route.query.status == 'input'){
                  // 第一次录入
                   this.form.surveyDate = new Date();
                   this.form.investigator = '';
                }else{
                  this.form.surveyDate = res.data.data.surveyDate;
                  this.form.investigator = res.data.data.investigator;
                }
                //赋值form
                // ruleForm
                this.ruleForm.item1 = res.data.data.item1;
                this.ruleForm.item2 = res.data.data.item2;
                this.ruleForm.item3 = res.data.data.item3;
                this.ruleForm.item4 = res.data.data.item4;
                this.ruleForm.item5 = res.data.data.item5;
                this.ruleForm.item6 = res.data.data.item6;
                this.ruleForm.item7 = res.data.data.item7;
                this.ruleForm.item8 = res.data.data.item8;
                this.ruleForm.item9 = res.data.data.item9;
                this.ruleForm.item10 = res.data.data.item10;
                if(res.data.data.item11 != null){
                  this.ruleForm.item11 = res.data.data.item11 + '';
                }else{
                  this.ruleForm.item11 = null;
                }
                if(res.data.data.influenceList == null){
                  this.ruleForm.influenceList = [
                     { event:'',eventData:''}
                  ]
                }else{
                  this.ruleForm.influenceList = res.data.data.influenceList;
                  for(let k = 0;k<this.ruleForm.influenceList.length;k++){
                    this.ruleForm.influenceList[k].eventData = new Date(this.ruleForm.influenceList[k].eventData);
                  }
                }
                // ruleForm1
                if(res.data.data.item12 != null){
                   this.ruleForm1.item12 = res.data.data.item12 + '';
                }else{
                   this.ruleForm1.item12 = null;
                }
                if(res.data.data.item13 != null){
                   this.ruleForm1.item13 = res.data.data.item13 + '';
                }else{
                   this.ruleForm1.item13 = null;
                }
                if(res.data.data.item14 != null){
                   this.ruleForm1.item14 = res.data.data.item14 + '';
                }else{
                   this.ruleForm1.item14 = null;
                }
                if(res.data.data.item15 != null){
                   this.ruleForm1.item15 = res.data.data.item15 + '';
                }else{
                   this.ruleForm1.item15 = null;
                }
                if(res.data.data.item16 != null){
                   this.ruleForm1.item16 = res.data.data.item16 + '';
                }else{
                   this.ruleForm1.item16 = null;
                }
                if(res.data.data.item17 != null){
                  this.ruleForm1.item17 = res.data.data.item17 + '';
                }else{
                  this.ruleForm1.item17 = null;
                }
                // this.slidervalue = Number(this.ruleForm1.item17);
                // ruleForm2
                if(res.data.data.item18 != null){
                  this.ruleForm2.item18 = res.data.data.item18 + '';
                }else{
                  this.ruleForm2.item18 = null;
                }
                this.ruleForm2.item19 = res.data.data.item19;
                this.ruleForm2.item20 = res.data.data.item20;
                this.ruleForm2.item21 = res.data.data.item21;
                let reg = /^\d+$/;
                if(this.ruleForm2.item21 && reg.test(this.ruleForm2.item21) && this.ruleForm2.item21 > 0 && this.ruleForm2.item21 < 11){
                  this.ruleForm2.diagnosisList = [];
                  for(let k = 0;k<this.ruleForm2.item21;k++){
                      this.ruleForm2.diagnosisList.push(
                        {
                              item1:'',
                              item2:'',
                              item3:'',
                              item4:'',
                              item5:'',
                              item6:'',
                              item7:'',
                              item8:null,
                              item9:null,
                              item10:null,
                              item11:null,
                              item12:null,
                              item13:'',
                              item14:'',
                              item15:'',
                              item16:'',
                              item17:null,
                              item18:'',
                              item19:null,
                              item20:'',
                              item21:'',
                              item22:'',
                              item23:'',
                              item24:'',
                              item25:null,
                              item26:null,
                              item27:null,
                              item28:null,
                              item29:null,
                              item30:null,
                              item31:[],
                              item32:''
                            }
                      )
                    }
                     this.ruleForm2.diagnosisList = res.data.data.diagnosisList;
                  }else{
                     //只有一次联系 
                      this.ruleForm2.diagnosisList = [];
                      this.ruleForm2.diagnosisList.push(
                        { 
                              item1:'',
                              item2:'',
                              item3:'',
                              item4:'',
                              item5:'',
                              item6:'',
                              item7:'',
                              item8:null,
                              item9:null,
                              item10:null,
                              item11:null,
                              item12:null,
                              item13:'',
                              item14:'',
                              item15:'',
                              item16:'',
                              item17:null,
                              item18:'',
                              item19:null,
                              item20:'',
                              item21:'',
                              item22:'',
                              item23:'',
                              item24:'',
                              item25:null,
                              item26:null,
                              item27:null,
                              item28:null,
                              item29:null,
                              item30:null,
                              item31:[],
                              item32:''
                            }
                      )
                  }
                  if(this.ruleForm2.diagnosisList != null && this.ruleForm2.diagnosisList.length > 0){
                    for(let k = 0;k<this.ruleForm2.diagnosisList.length;k++){
                    if(this.ruleForm2.diagnosisList[k].item31 == null || this.ruleForm2.diagnosisList[k].item31 == ''){
                       this.ruleForm2.diagnosisList[k].item31 = []
                     }else{
                       this.ruleForm2.diagnosisList[k].item31 = this.ruleForm2.diagnosisList[k].item31.split(',');
                     }
                    }
                  }

                  this.ruleForm2.item86 = res.data.data.item86;
                  this.ruleForm2.item87 = res.data.data.item87;
                  this.ruleForm2.item88 = res.data.data.item88;
                  this.ruleForm2.item89 = res.data.data.item89;
                  this.ruleForm2.item90 = res.data.data.item90;
                  this.ruleForm2.item91 = res.data.data.item91;
                  this.ruleForm2.item92 = res.data.data.item92;
                  this.ruleForm2.item93 = res.data.data.item93;
                  if(res.data.data.item94 != null){
                     this.ruleForm2.item94 = res.data.data.item94.split(',');
                  }else{
                     this.ruleForm2.item94 = [];
                  }
                   this.ruleForm2.item95 = res.data.data.item95;
                   this.ruleForm2.item22 = res.data.data.item22;
                   this.ruleForm2.item23 = res.data.data.item23;
                   this.ruleForm2.item24 = res.data.data.item24;
                   this.ruleForm2.item25 = res.data.data.item25;
                   this.ruleForm2.item26 = res.data.data.item26;
                   this.ruleForm2.item27 = res.data.data.item27;
                   this.ruleForm2.item28 = res.data.data.item28;
                   this.ruleForm2.item29 = res.data.data.item29;
                   this.ruleForm2.item30 = res.data.data.item30;
                   this.ruleForm2.item31 = res.data.data.item31;
                   this.ruleForm2.item32 = res.data.data.item32;
                   this.ruleForm2.item33 = res.data.data.item33;
                   this.ruleForm2.item34 = res.data.data.item34;
                   if(res.data.data.item35 != null){
                     this.ruleForm2.item35 = res.data.data.item35.split(',');
                   }else{
                     this.ruleForm2.item35 = [];
                   }
                   this.ruleForm2.item36 = res.data.data.item36;
                   this.ruleForm2.item37 = res.data.data.item37;
                   this.ruleForm2.item38 = res.data.data.item38;
                   this.ruleForm2.item39 = res.data.data.item39;
                   this.ruleForm2.item40 = res.data.data.item40;
                   if(res.data.data.item41 != ',' && res.data.data.item41.split('').length == 3){
                         this.ruleForm2.item41 = res.data.data.item41.split('')[0];
                         this.ruleForm2.item411 = res.data.data.item41.split('')[2];
                   }else if(res.data.data.item41 != ',' && res.data.data.item41.split('').length == 2){
                     if(res.data.data.item41.split('')[0] == ','){
                        this.ruleForm2.item41 = '';
                        this.ruleForm2.item411 = res.data.data.item41.split('')[1];
                     }else if(res.data.data.item41.split('')[1] == ','){
                        this.ruleForm2.item41 = res.data.data.item41.split('')[0];
                        this.ruleForm2.item411 = '';
                     }
                   }
                   this.ruleForm2.item42 = res.data.data.item42;
                   this.ruleForm2.item43 = res.data.data.item43;
                   this.ruleForm2.item44 = res.data.data.item44;
                   this.ruleForm2.item45 = res.data.data.item45;
                   this.ruleForm2.item46 = res.data.data.item46;
                   this.ruleForm2.item47 = res.data.data.item47;
                   this.ruleForm2.item48 = res.data.data.item48;
                   this.ruleForm3.item49 = res.data.data.item49;
                   this.ruleForm3.item50 = res.data.data.item50;
                   this.ruleForm3.item51 = res.data.data.item51;
                   this.ruleForm3.item52 = res.data.data.item52;
                   this.ruleForm3.item53 = res.data.data.item53;
                   this.ruleForm3.item54 = res.data.data.item54;
                   this.ruleForm3.item55 = res.data.data.item55;
                   this.ruleForm3.item56 = res.data.data.item56;
                   this.ruleForm3.item57 = res.data.data.item57;
                   this.ruleForm3.item58 = res.data.data.item58;
                   this.ruleForm3.item59 = res.data.data.item59;
                   this.ruleForm3.item60 = res.data.data.item60;
                   this.ruleForm3.item61 = res.data.data.item61;
                   this.ruleForm3.item62 = res.data.data.item62;
                   this.ruleForm3.item63 = res.data.data.item63;
                   this.ruleForm3.item64 = res.data.data.item64;
                   this.ruleForm3.item65 = res.data.data.item65;
                   this.ruleForm3.item66 = res.data.data.item66;
                   this.ruleForm3.item67 = res.data.data.item67;
                   this.ruleForm3.item68 = res.data.data.item68;
                   this.ruleForm3.item69 = res.data.data.item69;
                   this.ruleForm3.item70 = res.data.data.item70;
                   this.ruleForm3.item71 = res.data.data.item71;
                   this.ruleForm3.item72 = res.data.data.item72;
                   this.ruleForm3.item73 = res.data.data.item73;
                   this.ruleForm3.item74 = res.data.data.item74;
                   this.ruleForm3.item75 = res.data.data.item75;
                   this.ruleForm3.item76 = res.data.data.item76;
                   this.ruleForm3.item77 = res.data.data.item77;
                   this.ruleForm3.item78 = res.data.data.item78;
                   this.ruleForm3.item79 = res.data.data.item79;
                   this.ruleForm3.item80 = res.data.data.item80;
                   this.ruleForm3.item81 = res.data.data.item81;
                   this.ruleForm3.item82 = res.data.data.item82;
                   if(res.data.data.item83 != null){
                     this.ruleForm3.item83 = res.data.data.item83 + '';
                   }else{
                     this.ruleForm3.item83 = null;
                   }
                   this.ruleForm3.item84 = res.data.data.item84;
                   this.ruleForm3.item85 = res.data.data.item85;
              }
           }) 
    },
    methods: {
      cleanRuleForm(){
         for(let k in this.ruleForm){
             if(k == 'influenceList'){
               this.ruleForm[k] = [
                 { event:'',eventData:''}
               ]
             }else{
               this.ruleForm[k] = null;
             }
         }
      },
      cleanRuleForm1(){
         this.ischangeSlider = false;
         this.slidervalue = 0;
         for(let k in this.ruleForm1){
            this.ruleForm1[k] = null;
         }
      },
      cleanRuleForm2(){
           for(let k in this.ruleForm2){
             if(k == 'diagnosisList'){
               this.ruleForm2[k] = [
                 { 
                    item1:'',
                    item2:'',
                    item3:'',
                    item4:'',
                    item5:'',
                    item6:'',
                    item7:'',
                    item8:null,
                    item9:null,
                    item10:null,
                    item11:null,
                    item12:null,
                    item13:'',
                    item14:'',
                    item15:'',
                    item16:'',
                    item17:null,
                    item18:'',
                    item19:null,
                    item20:'',
                    item21:'',
                    item22:'',
                    item23:'',
                    item24:'',
                    item25:null,
                    item26:null,
                    item27:null,
                    item28:null,
                    item29:null,
                    item30:null,
                    item31:[],
                    item32:''
                 }
               ]
             }else if(k == 'item35' || k == 'item94'){
               this.ruleForm2[k] = [];
             }else{
               this.ruleForm2[k] = null;
             }
         }
      },
      cleanRuleForm3(){
         for(let k in this.ruleForm3){
            this.ruleForm3[k] = null;
         }
      },
      handleChange(val) {
        // 切换
        // console.log(val)
      },
      changeSlider(){
        // if(!this.ischangeSlider){
        //    this.ischangeSlider = true; 
        //    return false;
        // }else{
        //    this.ruleForm1.item17 = this.slidervalue.toString();
        // }
       
      },
      changeSliderInput(){
        // if(Number(this.ruleForm1.item17)<0){
        //   this.slidervalue = 0;
        // }else if(Number(this.ruleForm1.item17)>100){
        //   this.slidervalue = 100;
        // }else if(Number(this.ruleForm1.item17)>=0 && Number(this.ruleForm1.item17)%5==0 && Number(this.ruleForm1.item17)<=100){
        //   this.slidervalue = Number(this.ruleForm1.item17)
        // }
      },
      changeItem11(){
          this.ruleForm.influenceList = [
                { event:'',eventData:''}
          ]
      },
      inputCount(){
        let value = this.ruleForm2.item21;
        let reg = /^\d+$/;
        if(value && reg.test(value) && value > 0 && value < 11){
           this.ruleForm2.diagnosisList = [];
           for(let k = 0;k<this.ruleForm2.item21;k++){
              this.ruleForm2.diagnosisList.push(
                 { 
                      item1:'',
                      item2:'',
                      item3:'',
                      item4:'',
                      item5:'',
                      item6:'',
                      item7:'',
                      item8:null,
                      item9:null,
                      item10:null,
                      item11:null,
                      item12:null,
                      item13:'',
                      item14:'',
                      item15:'',
                      item16:'',
                      item17:null,
                      item18:'',
                      item19:null,
                      item20:'',
                      item21:'',
                      item22:'',
                      item23:'',
                      item24:'',
                      item25:null,
                      item26:null,
                      item27:null,
                      item28:null,
                      item29:null,
                      item30:null,
                      item31:[],
                      item32:''
                    }
              )
           }
        }
      },
      add(){
         if(this.ruleForm.influenceList.length == 3){
          this.$message({
            message: '最多只能有三个事件',
            type: 'warning'
           });
           return false;
         }
         this.ruleForm.influenceList.push({
            event:'',eventData:''
         })
      },
      del(index){
        if(this.ruleForm.influenceList.length == 1){
           this.$message({
            message: '至少要有一个事件',
            type: 'warning'
          });
          return false;
        }
        this.ruleForm.influenceList.splice(index,1)
      },
      changeDateTimePacker(index){
        // 联系记录的诊治开始时间
        // 第一次诊治日期≤调查日期；第一次诊治日期＜第二次诊治日期＜第三次诊治日期。。。＜第十次诊治日期
        if(index == 0 && this.form.surveyDate){
           let date1 = new Date(this.form.surveyDate);
           let date2 = new Date(this.ruleForm2.diagnosisList[0].item2)
           if(date2.getTime() > date1.getTime()){
            this.$message.error('第一次诊治日期≤调查日期');
            return false;
           }
        } 
        if(index != 0 && this.ruleForm2.diagnosisList.length > (index+1)){
           let date1 = new Date(this.ruleForm2.diagnosisList[index-1].item2);
           let date2 = new Date(this.ruleForm2.diagnosisList[index].item2)
           let date3 = new Date(this.ruleForm2.diagnosisList[index+1].item2)
           if(date2.getTime() < date1.getTime() || date2.getTime() > date3.getTime()){
               this.$message.error(`第${index+1}次诊治日期必须在第${index}次诊治时间和第${index+2}次诊治时间之间`);
               return false;
           }
        } 
        if(index != 0 && this.ruleForm2.diagnosisList.length == (index+1)){
             let date1 = new Date(this.ruleForm2.diagnosisList[index-1].item2);
             let date2 = new Date(this.ruleForm2.diagnosisList[index].item2)
             if(date2.getTime() < date1.getTime()){
                  this.$message.error(`第${index+1}次诊治日期必须大于第${index}次诊治时间`);
                  return false;
             }
        }
      },
      inputItem6(index){
        // 当次就医临床诊断 输入4， 不需填写4.4.1和4.6-4.6.1，和第五部分，其他均要填写
        // 移除该表单项的校验结果
        this.$refs.item8[index].clearValidate();
        this.$refs.item9[index].clearValidate();
        this.$refs.item10[index].clearValidate();
        this.$refs.item11[index].clearValidate();
        this.$refs.item12[index].clearValidate();
        this.$refs.item19[index].clearValidate();
        this.$refs.item21[index].clearValidate();
        if(this.$refs.item22){
             this.$refs.item22[index].clearValidate();
        }
        // 控制第五部分是否必填
        if(this.ruleForm2.diagnosisList.length == 1 && this.ruleForm2.diagnosisList[0].item6 == '4'){
            this.isVerifypart5 = false;
        }else{
            this.isVerifypart5 = true;
        }
        let array = [];
        if(this.ruleForm2.diagnosisList.length > 1){
           for(let k = 0;k<this.ruleForm2.diagnosisList.length;k++){
             if(this.ruleForm2.diagnosisList.length[k].item6 == '4'){
                 array.push('0');
             }
           }
           if(array.length == this.ruleForm2.diagnosisList.length){
               //全部输入了4
               this.isVerifypart5 = false;
           }else{
               this.isVerifypart5 = true;
           }
        }
      },
      inputItem38(){
         this.$refs.item39.clearValidate();
      },
      inputItem41(){
         this.$refs.item42.clearValidate();
      },
      saveData(){
          //处理数据
          if(this.ruleForm2.diagnosisList != null && this.ruleForm2.diagnosisList.length){
            for(let k = 0;k<this.ruleForm2.diagnosisList.length;k++){
                      if(this.ruleForm2.diagnosisList[k].item31 && this.ruleForm2.diagnosisList[k].item31.length){
                        this.ruleForm2.diagnosisList[k].item31 = this.ruleForm2.diagnosisList[k].item31.join(',')
                      }else{
                        this.ruleForm2.diagnosisList[k].item31 = null
              }
            }
          }
          if(this.ruleForm2.item94 && this.ruleForm2.item94.length){
            this.ruleForm2.item94 = this.ruleForm2.item94.join(',');
          }else{
             this.ruleForm2.item94 = null
          }
          if(this.ruleForm2.item35 && this.ruleForm2.item35.length){
            this.ruleForm2.item35 = this.ruleForm2.item35.join(',');
          }else{
            this.ruleForm2.item35 = null;
          }
          if(this.ruleForm2.item41 != '' || this.ruleForm2.item411 != ''){
            this.ruleForm2.item41 = this.ruleForm2.item41  + ',' + this.ruleForm2.item411;
          }else{
            this.ruleForm2.item41 = '';
          }
          //无需验证
         let dataobj = Object.assign(
            {},this.detailData,this.form,this.ruleForm,this.ruleForm1,this.ruleForm2,this.ruleForm3,{id:this.id,saveType:1}
          )
          $axios_http({
             url:'/base/hospital/healthEconomics/save',
             data:dataobj,
             vueObj: this
           }).then((res)=>{
              if(res.data.statusMsg == 'success'){
                   this.$message({
                      message: '保存成功',
                      type: 'success'
                    });
                  this.$router.push('/economy/economyList')
              }
           }) 
      },
      submitForm(){
         //验证
         let flag = false;
         this.$refs.form.validate((valid) => {
            if(valid){
              flag = true;
            }else{
              flag = false;
            }
         });
         if(!flag){
           this.activeNames = ['1'];
           return false;
         }
         let flagArray = []; 
         this.$refs.ruleForm.validate((valid) => {
            if (!valid) {
              flagArray.push('2')
              return false;
            }else{
              flagArray.push('0')
            }
          });
          this.$refs.ruleForm1.validate((valid) => {
          if (!valid) {
            flagArray.push('3')
            return false;
          }else{
            flagArray.push('0')
          }
        });
         this.$refs.ruleForm2.validate((valid) => {
          if (!valid) {
            flagArray.push('4')
            return false;
          }else{
            flagArray.push('0')
          }
        });
        // 是否验证第五部分
        if(this.isVerifypart5){
          this.$refs.ruleForm3.validate((valid) => {
          if (!valid) {
            flagArray.push('5')
            return false;
          }else{
            flagArray.push('0')
          }
        });
        }else{
           flagArray.push('0')
        }
        if(flagArray[0] == '2'){
          this.activeNames = ['2'];
        }else if(flagArray[0] == '0' && flagArray[1] == '3'){
          this.activeNames = ['3'];
        }else if(flagArray[0] == '0' && flagArray[1] == '0' && flagArray[2] == '4'){
          this.activeNames = ['4'];
        }else if(flagArray[0] == '0' && flagArray[1] == '0' && flagArray[2] == '0' && flagArray[3] == '5'){
          this.activeNames = ['5'];
        }else if(flagArray[0] == '0' && flagArray[1] == '0' && flagArray[2] == '0' && flagArray[3] == '0'){
          //处理数据
          if(this.ruleForm2.diagnosisList != null && this.ruleForm2.diagnosisList.length){
            for(let k = 0;k<this.ruleForm2.diagnosisList.length;k++){
                      if(this.ruleForm2.diagnosisList[k].item31 && this.ruleForm2.diagnosisList[k].item31.length){
                        this.ruleForm2.diagnosisList[k].item31 = this.ruleForm2.diagnosisList[k].item31.join(',')
                      }else{
                        this.ruleForm2.diagnosisList[k].item31 = null
              }
            }
          }
          if(this.ruleForm2.item94 && this.ruleForm2.item94.length){
            this.ruleForm2.item94 = this.ruleForm2.item94.join(',');
          }else{
             this.ruleForm2.item94 = null
          }
          if(this.ruleForm2.item35 && this.ruleForm2.item35.length){
            this.ruleForm2.item35 = this.ruleForm2.item35.join(',');
          }else{
            this.ruleForm2.item35 = null;
          }
          if(this.ruleForm2.item41 != '' || this.ruleForm2.item411 != ''){
            this.ruleForm2.item41 = this.ruleForm2.item41  + ',' + this.ruleForm2.item411;
          }else{
            this.ruleForm2.item41 = '';
          }
          let dataobj = Object.assign(
            {},this.detailData,this.form,this.ruleForm,this.ruleForm1,this.ruleForm2,this.ruleForm3,{id:this.id,saveType:2}
          )
          $axios_http({
             url:'/base/hospital/healthEconomics/save',
             data:dataobj,
             vueObj: this
           }).then((res)=>{
              if(res.data.statusMsg == 'success'){
                   this.$message({
                      message: '提交成功',
                      type: 'success'
                    });
                  this.$router.push('/economy/economyList')
              }
           }) 
        }
      },
      Scroll(params,index){
        // console.log(params)
        // console.log(index)
        let div = document.getElementsByClassName('column3')[0];
        if(params == 'left' && index != 0){
           document.querySelector('.column3-container').scrollTo((div.offsetWidth)*(index-1),0); 
        }else if(params == 'right' && index != this.ruleForm2.diagnosisList.length -1){
           document.querySelector('.column3-container').scrollTo((div.offsetWidth)*(index+1),0); 
        }
      }
    },
}
</script>
<style scoped>
.content {
  background: #fff;
  border: 1px solid #000;
  overflow: hidden;
}
.return-home {
  text-align: center;
  margin-left:10px;
  margin-bottom: 20px;
}
.title{
  height: 80px;
  line-height: 80px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #000;
  font-family: "Microsoft YaHei";
}
.second-title{
  margin: 10px 0;
  height: 80px;
  /* text-align: center; */
  text-indent: 200px;
  font-size: 16px;
  color: #000;
  font-family: "Microsoft YaHei";
}
.dec{
  height: 80px;
  background: #cccccc;
  padding:20px 100px 10px 100px;
  font-size: 14px;
  text-indent: 2em;
}
.el-collapse{
  border: none;
}
.booking-list {
  margin:20px auto;
  padding:20px 40px;
  position: relative;
}
.booking-list-item {
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
}
.input-item{
  width: 30px;
}
.input-item_{
  width: 400px;
}
.dec-contaner{
  width: 80%;
  min-height: 240px;
  margin:0 auto;
  border:1px solid #000;
  padding: 10px 0;
}
.btns{
  margin-top: 20px;
  text-align: center;
}
.btns .el-button{
  margin:0 10px;
}
.el-icon-circle-plus {
  font-size: 20px;
}
.el-icon-error {
  font-size: 18px;
}
.el-radio-group.ruleForm1-el-radio-group{
   width: 300px;
}
.el-radio-group.ruleForm1-el-radio-group .el-radio{
  margin-top: 15px;
  margin-left: 30px;
}
.h3{
  padding-left:90px; 
}
.ruler-container{
  position: relative;
}
.ruler-container span{
  position: absolute;

}
.ruler-container span:nth-child(1){
  transform: translateX(-50%);
  left: 0%;
}
.ruler-container span:nth-child(2){
  transform: translateX(-50%);
  left: calc(5% + 3px);
}
.ruler-container span:nth-child(3){
  transform: translateX(-50%);
  left: calc(10% + 3px);
}
.ruler-container span:nth-child(4){
  transform: translateX(-50%);
  left: calc(15% + 3px);
}
.ruler-container span:nth-child(5){
  transform: translateX(-50%);
  left: calc(20% + 3px);
}
.ruler-container span:nth-child(6){
  transform: translateX(-50%);
  left: calc(25% + 3px);
}
.ruler-container span:nth-child(7){
  transform: translateX(-50%);
  left: calc(30% + 3px);
}
.ruler-container span:nth-child(8){
  transform: translateX(-50%);
  left: calc(35% + 3px);
}
.ruler-container span:nth-child(9){
  transform: translateX(-50%);
  left: calc(40% + 3px);
}
.ruler-container span:nth-child(10){
  transform: translateX(-50%);
  left: calc(45% + 1px);
}
.ruler-container span:nth-child(11){
  transform: translateX(-50%);
  left: calc(50% + 1px);
}
.ruler-container span:nth-child(12){
  transform: translateX(-50%);
  left: calc(55% + 1px);
}
.ruler-container span:nth-child(13){
  transform: translateX(-50%);
  left: calc(60% + 1px);
}
.ruler-container span:nth-child(14){
  transform: translateX(-50%);
  left: calc(65% + 1px);
}
.ruler-container span:nth-child(15){
  transform: translateX(-50%);
  left: calc(70% + 1px);
}
.ruler-container span:nth-child(16){
  transform: translateX(-50%);
  left: calc(75% + 1px);
}
.ruler-container span:nth-child(17){
  transform: translateX(-50%);
  left: calc(80% + 1px);
}
.ruler-container span:nth-child(18){
  transform: translateX(-50%);
  left: calc(85% + 1px);
}
.ruler-container span:nth-child(19){
  transform: translateX(-50%);
  left: calc(90% + 1px);
}
.ruler-container span:nth-child(20){
  transform: translateX(-50%);
  left: calc(95% + 1px);
}
.ruler-container span:nth-child(21){
  transform: translateX(-50%);
  left: calc(100% + 1px);
}
.part-container{
  width: 90%;
  height: 1850px;
  margin:0 auto;
  overflow:hidden;
  border: 1px solid #cccccc;
}
.part-container .column1{
  width: 10%;
  height: 100%;
  float: left;
}
.part-container .column1 li{
  list-style: none;
  width: 100%;
  height: 80px;
  line-height: 80px;
  border-top: 1px solid #cccccc;
  border-right: 1px solid #cccccc;
  text-align: center;
  font-size: 16px;
}
.part-container .column1 .li{
  height: 100px;
  line-height: 100px;
}
.part-container .column1 li:first-child{
  border-top: none;
  background: #ffc52d;
}
.part-container .column1 li:last-child{
  height: 150px;
  line-height: 150px;
}
.part-container .column2{
  width: 30%;
  height: 100%;
  float: left;
}
.part-container .column2 li{
  list-style: none;
  width: 100%;
  height: 80px;
  line-height: 80px;
  border-top: 1px solid #cccccc;
  border-right: 1px solid #cccccc;
  text-indent: 10px;
  font-size: 16px;
  padding-left:10px;
}
.part-container .column2 .li{
  padding-top: 10px;
  height: 100px;
  line-height: 40px;
}
.part-container .column2 li:first-child{
  border-top: none;
  background: #ffc52d;
}
.part-container .column2 li:last-child{
  height: 150px;
}
.part-container .column3-container{
  width: 30%;
  height: 100%;
  float: left;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling:touch;
  box-sizing:border-box;
  -moz-box-sizing:border-box; /* Firefox */
  -webkit-box-sizing:border-box; /* Safari */
  border-right: 1px solid #cccccc;
}
.part-container .column3-container .column3{
  display:inline-block;
  width: 100%;
  height:100%;
  border-right:1px solid #cccccc;
} 
.part-container .column3-container .column3 li{
    list-style: none;
    width: 100%;
    height: 80px;
    line-height: 80px;
    border-top: 1px solid #cccccc;
    text-align: center;
    font-size: 16px;
    padding-top: 10px;
}
.part-container .column3-container .column3 .li{
  padding-top: 10px;
  height: 100px;
  line-height: 40px;
}
.part-container .column3-container .column3 li:first-child{
  border-top: none;
  background: #ffc52d;
}
.part-container .column3-container .column3 li:last-child{
  height: 150px;
}
.part-container .column4{
  width: 30%;
  height: 100%;
  float: left;
}
.part-container .column4 li{
  list-style: none;
  width: 100%;
  height: 80px;
  line-height: 80px;
  border-top: 1px solid #cccccc;
  text-align: center;
  font-size: 16px;
  padding-top: 10px;
}
.part-container .column4 .li{
   padding-top: 10px;
   height: 100px;
   line-height: 40px;
}
.part-container .column4 li:first-child{
  border-top: none;
  background: #ffc52d;
}
.part-container .column4 li:last-child{
  height: 150px;
}
.starimg{
  width: 7px;
  height: 7px;
  position: absolute;
  left: 80px;
  top: 14px;
}
.part-container2{
  width: 63%;
  height: 620px;
  margin-left:5%;
  overflow:hidden;
  border: 1px solid #cccccc;
}
.part-container2 .column1{
  width: 14.28%;
  height: 100%;
  float: left;
}
.part-container2 .column1 li{
  list-style: none;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-top: 1px solid #cccccc;
  border-right: 1px solid #cccccc;
  text-align: center;
  font-size: 16px;
}
.part-container2 .column1 .li{
  height: 100px;
  line-height: 100px;
}
.part-container2 .column1 li:first-child{
  border-top: none;
  background: #ffc52d;
}
.part-container2 .column1 li:nth-child(5){
  border-top: none;
  background: #ffc52d;
}
.part-container2 .column2{
  width: 42.85%;
  height: 100%;
  float: left;
}
.part-container2 .column2 li{
  list-style: none;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-top: 1px solid #cccccc;
  border-right: 1px solid #cccccc;
  text-indent: 10px;
  font-size: 16px;
  padding-left:10px;
}
.part-container2 .column2 li:first-child{
  border-top: none;
  background: #ffc52d;
}
.part-container2 .column2 li:nth-child(5){
  border-top: none;
  background: #ffc52d;
}
.part-container2 .column2 .li{
   height: 100px;
   padding-top: 10px;
}
.part-container2 .column3{
  width:calc(100% - 14.28% - 42.85%);
  height: 100%;
  float: left;
}
.part-container2 .column3 li{
   list-style: none;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-top: 1px solid #cccccc;
    text-indent: 10px;
    font-size: 16px;
}
.part-container2 .column3 li:first-child{
  border-top: none;
}
.part-container2 .column3 .li{
   height: 100px;
   padding-top: 10px;
}
.part-container3{
    width: 90%;
    height: 1800px;
    margin:20px auto;
    overflow:hidden;
} 
.part-container3 .div{
  width: 100%;
}
/* .el-form.time .el-form-item__label{
    font-size: 16px;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
} */
.leftarrow,.rightarrow{
  cursor: pointer;
  vertical-align: middle;
}
</style>
<style lang="css">
.el-collapse.economy .el-collapse-item__header{
  background:#41c8db;
  overflow: hidden;
  text-indent: 10px;
  border-top:1px solid #000; 
  border-bottom: none;
}
.el-collapse.economy .el-collapse-item__header .el-collapse-item__arrow{
  color: #000;
}
.input-item .el-input__inner{
    height: 30px;
    line-height: 30px;
    padding: 0;
    text-align: center;
}
/* form */
.el-form.ruleForm.demo-ruleForm .input-item.el-input{
    margin-left: -240px;
}
.el-form.ruleForm.demo-ruleForm .el-form-item__error{
    left:-240px;
}
.el-form.ruleForm.demo-ruleForm .el-form-item__label{
    text-align: left;
    padding-left: 160px;
}
.el-form.ruleForm.demo-ruleForm .class .el-form-item__error{
    left: 0;
}
.dec-contaner .el-form-item__label{
  text-align: right !important;
  padding-left: 0 !important;
}
.dec-contaner .el-form-item__error{
  left:0 !important;
}
.el-form.ruleForm1.demo-ruleForm .el-form-item__label{
    text-align: left;
    padding-left: 200px;
}
.el-form.ruleForm2.demo-ruleForm .input-item.el-input{
   margin-left:-460px;
}
.el-form.ruleForm2.demo-ruleForm .el-input__inner{
    height: 30px;
    line-height: 30px;
    padding: 0;
    text-align:center;
}
.el-form.ruleForm2.demo-ruleForm .part-container3 .el-form-item__error{
   left: -355px;
}
.el-form.ruleForm2.demo-ruleForm .part-container3 .item37 .el-form-item__error{
  left: 100px;
}
.el-form.ruleForm2.demo-ruleForm .part-container3 .item39 .el-form-item__error{
  left: 0px;
}
.el-form.ruleForm2.demo-ruleForm .part-container3 .item40 .el-form-item__error{
  left: 0px;
}
.el-form.ruleForm2.demo-ruleForm .part-container3 .item42 .el-form-item__error{
  left: 0px;
}
.el-form.ruleForm2.demo-ruleForm .part-container3 .item46 .el-form-item__error{
  left: 0px;
}
.el-form.ruleForm2.demo-ruleForm .part-container3 .item43 .el-form-item__error{
  left: 0px;
}
.el-form.ruleForm2.demo-ruleForm .el-form-item__label{
  margin-left:100px;
  text-align: left;
}
.el-form.ruleForm2.demo-ruleForm .class .el-form-item__error{
   left: -555px;
}
.el-form.ruleForm2.demo-ruleForm .class1 .el-form-item__error{
   left: 100px;;
}
.el-form.ruleForm2.demo-ruleForm .class2 .el-form-item__error{
   left: 100px;;
}
.el-form.ruleForm3.demo-ruleForm .input-item.el-input{
    margin-left: -370px;
}
.el-form.ruleForm3.demo-ruleForm .el-form-item__error{
    left:-270px;
}
.el-form.ruleForm3.demo-ruleForm  .el-form-item__label{
   margin-left: 100px;
   padding-left:60px;
   text-align: left;
}
.el-slider__runway{
  background-color: #cccccc;
}
.el-slider__stop{
  background: #000;
  opacity:0.5;
  width: 4px;
  height: 6px;
}
.el-slider__button{
  border: none;
  /* background-color: #41c8db; */
  background-color:transparent;
}
.el-slider__bar{
   /* background-color: #41c8db; */
   background-color:transparent;
}
.part-container .column3-container .column3 .el-input__inner{
   height: 30px;
   line-height: 30px;
   padding: 0;
   text-align: center;
}
.part-container .column3-container .column3 .li.select .el-input__inner{
   text-align: left;
   padding-left:10px;
}
.part-container .column3-container .column3 .el-form-item__error{
  top: 30%;
  left:75%;
}
.part-container .column3-container .column3 .item4{
  text-align: left;
  padding-left:30px;
}
.part-container .column3-container .column3 .item4 .el-form-item__error{
  top: 30%;
  left:65%;
}
.part-container .column3-container .column3 .item7 .el-form-item__error{
  top: 30%;
  left:85%;
}
.part-container .column3-container .column3 .item14 .el-form-item__error{
  top: 30%;
  left:86%;
}
.part-container .column3-container .column3 .item16 .el-form-item__error{
  top: 30%;
  left:80%;
}
.part-container .column3-container .column3 .li.complication .el-form-item.item22 .el-form-item__error{
  left:calc(100% + 2px);
} 
.part-container .column3-container .column3 .li.money{
  text-align: left;
  padding-left: 50px;
}
.part-container .column3-container .column3 .li.money .el-form-item__error{
  top: 30%;
  left:65%;
}
.part-container .column3-container .column3 li.money{
  text-align: left;
  padding-left: 50px;
}
.part-container .column3-container .column3 li.money .el-form-item__error{
  top: 30%;
  left:60%;
}
.part-container .column3-container .column3 .li.select .el-form-item__error{
  top: 30%;
  left:calc(100% + 2px);
}
.part-container .column4 .el-input__inner{
   height: 30px;
   line-height: 30px;
   padding: 0;
}
.part-container .column4 .el-form-item__error{
  top: 30%;
  left:75%;
}
.part-container .column4 .li.money{
  text-align: left;
  padding-left: 50px;
}
.part-container .column4 .li.money .el-form-item__error{
  top: 30%;
  left:65%;
}
.part-container .column4 li.money{
  text-align: left;
  padding-left: 50px;
}
.part-container .column4 li.money .el-form-item__error{
  top: 30%;
  left:60%;
}
.part-container .column4 .li.select .el-form-item__error{
  top: 30%;
  left:calc(100% + 2px);
}
.part-container2 .el-input__inner{
   height: 30px;
   line-height: 30px;
   padding: 0;
}
.part-container2 .el-form-item__error{
  top: 30%;
  left:calc(100% + 2px);
}
.el-checkbox-group.group{
  height:60px;
  overflow: hidden;
}
.el-checkbox-group.group .el-checkbox__label{
  padding-left:0;
}
.el-checkbox-group.group .el-checkbox+.el-checkbox{
  margin-left:0;
}
.el-form-item.group .el-form-item__error{
    top: 50%;
    left: 40%;
}
.el-form.time .el-form-item__label{
    font-size: 16px;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
}
/* disabled样式 */
.el-radio__input.is-disabled.is-checked .el-radio__inner{
  background: #409EFF;
  border-color:#409EFF;
}
.el-input.is-disabled .el-input__inner{
  color: #000;
}
</style>


