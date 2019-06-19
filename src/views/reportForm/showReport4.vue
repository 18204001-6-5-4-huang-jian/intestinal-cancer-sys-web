<template>
  <div class="j_content">
    <div style="min-width: 941px;">
      <div class="btns">
        <!--<router-link to="/subjects/subjectsList">-->
          <el-button size="mini" class="return-home" @click="goBack()">返 回</el-button>
        <!--</router-link>-->
        <!--<el-button type="normal" size="small" class="fr">保存</el-button>-->
        <p class="text">表D2-违反方案事件记录表</p>
      </div>
      <div class="formcon">
        <div class="title">
        </div>
        <div class="tables">
          <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="120px">
            <el-form-item label="填表日期:"  class="formhalfline">
              <el-date-picker
                v-model="formInline.tbDate"
                :clearable="false"
                disabled
                type="date"
                size="small"
                format="yyyy年MM月dd日"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="填表人签名:" prop="tbrName" class="formhalfline">
              <el-input v-model="formInline.tbrName"  disabled size="small" style="width: 220px;"></el-input>
            </el-form-item>
            <el-form-item label="筛查现场编码:" class="formhalfline">
              <span>{{formInline.deptCode | siteId}}</span>
            </el-form-item>
            <el-form-item label="质控者签名:" prop="zkzName" class="formhalfline">
              <el-input v-model="formInline.zkzName"  disabled size="small" style="width: 220px;"></el-input>
            </el-form-item>
            <el-form-item label="工作人员编码:" class="formhalfline">
              <span>{{formInline.investigatorCode}}</span>
              <!--<el-input v-model="formInline.investigatorCode"  size="small" style="width: 220px;"></el-input>-->
            </el-form-item>
            <el-form-item label="SID:" class="formhalfline">
              <span>{{formInline.sid}}</span>
            </el-form-item>
            <el-form-item label="检查年份:" prop="checkYear" class="formhalfline">
              <el-date-picker
                v-model="formInline.checkYear"
                :clearable="false"
                align="right"
                disabled
                style="width:100px;"
                size="small"
                type="year"
                format="yyyy"
                value-format="yyyy"
                placeholder="选择年">
              </el-date-picker>
            </el-form-item>
          </el-form>
        </div>
        <p class="txsm">
          填写说明：请在下方勾选方案违规项目，并基于所违规的类型，完成表中要求填写的必要信息。
        </p>
      </div>
      <div class="formcon">
        <div class="tables">
          <el-form :model="formInline" class="demo-form-inline cmb cmba" ref="formInline">
            <div class="texts" id="1a">
              1.请勾选方案违规的种类
            </div>
              <el-form-item  prop="item_1a_1" >
                <el-checkbox-group v-model="formInline.item_1a_1" style="height: auto;">
                  <el-checkbox name="item_1a_1" disabled :true-label="1" :false-label="2" label="1" class="db">01=筛查对象随机分配无效；</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            <div v-if="formInline.item_1a_1" style="padding-left: 50px;">
              <div id="3a" class="texts">
               无效原因：（请勾选所有适用选项）
              </div>
              <el-form-item  prop="item_3a_1" >
                <el-checkbox-group v-model="formInline.item_3a_1" style="height: auto;">
                  <el-checkbox name="item_3a_1" disabled :true-label="1" :false-label="2" label="1" class="db">01=年龄小于50或大于74岁；</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item  prop="item_3a_2" >
                <el-checkbox-group v-model="formInline.item_3a_2" style="height: auto;margin-left: 30px;">
                  <el-checkbox label="1":true-label="1" :false-label="2"disabled >02=曾有医生告诉过患有结直肠癌，若有，则结直肠癌确诊日期：
                    <el-date-picker
                      v-model="formInline.item_3a_2_time"
                      :clearable="false"
                      type="date"
                      disabled
                      size="small"
                      style="width:160px;margin-right:15px;"
                      value-format="yyyy-MM-dd"
                      format="yyyy年MM月dd日"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-checkbox>
                  <el-checkbox label="2" disabled >为估计日期</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item  prop="item_3a_3" >
                <el-checkbox-group v-model="formInline.item_3a_3" style="height: auto;">
                  <el-checkbox label="3" disabled name="item_3a_3" :true-label="1" :false-label="2"class="db">03=进行过结直肠癌切除手术</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item  prop="item_3a_4" >
                <el-checkbox-group v-model="formInline.item_3a_4" style="height: auto;">
                  <el-checkbox label="4" disabled name="item_3a_4" :true-label="1" :false-label="2"class="db">04=正在接受任何癌症相关的治疗（非黑色素皮肤癌除外）</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item  prop="item_3a_5" >
                <el-checkbox-group v-model="formInline.item_3a_5" style="height: auto;">
                  <el-checkbox label="5" disabled name="item_3a_5"  :true-label="1" :false-label="2"class="db">05=在过去5年里，做过结肠镜、乙状结肠镜检查、气钡双重造影、CT仿真结肠镜等结直肠癌筛查；</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <!--<el-form-item  prop="item_3a_5__" >-->
              <!--<el-checkbox-group v-model="formInline.item_3a_5__" style="height: auto;">-->
              <!--<el-checkbox label="6"  class="db">或者CT肠道成像等结直肠癌筛查；</el-checkbox>-->
              <!--</el-checkbox-group>-->
              <!--</el-form-item>-->
              <el-form-item  prop="item_3a_6" >
                <el-checkbox-group v-model="formInline.item_3a_6" style="height: auto;">
                  <el-checkbox label="7" disabled nam="item_3a_6" :true-label="1" :false-label="2"class="db">06=在过去1年里，接受过粪便潜血检测或者粪便DNA检测；</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item  prop="item_3a_7" >
                <el-checkbox-group v-model="formInline.item_3a_7" style="height: auto;">
                  <el-checkbox label="8" disabled name="item_3a_7" :true-label="1" :false-label="2"class="db">07=有下列下消化道疾病提示需要结肠镜进行确认？1）过去半年中长时间的直肠出血；2）明确诊断的缺铁性贫血；3）过去6个月中有记录的不明原因的体重下降（超过10%基础体重）</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item  prop="item_3a_8" >
                <el-checkbox-group v-model="formInline.item_3a_8" style="height: auto;">
                  <el-checkbox label="9" disabled name="item_3a_8" :true-label="1" :false-label="2"class="db">08=有其他严重疾病（包括严重的肺部疾病，晚期肾病，晚期肝病、严重的心衰、近期诊断为除黑色素皮肤癌外的其他癌症）；</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item  prop="item_3a_9" >
                <el-checkbox-group v-model="formInline.item_3a_9" style="height: auto;">
                  <el-checkbox label="10" disabled name="item_3a_9" :true-label="1" :false-label="2"class="db">09=未签署知情同意书；</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item  prop="item_3a_10" >
                <el-checkbox-group v-model="formInline.item_3a_10" style="height: auto;">
                  <el-checkbox label="11" disabled name="item_3a_10" :true-label="1" :false-label="2"class="db">10=随机分组后分配ID号后，因受试者主观原因（备注原因：
                    <el-input v-model="formInline.item_3a_10_cause" disabled size="small" style="width:220px;"></el-input>）在未接受任何筛查干预前决意退出试验。
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>
              <el-form-item  prop="item_1a_2" >
                <el-checkbox-group v-model="formInline.item_1a_2" style="height: auto;">
                  <el-checkbox name="item_1a_2" label="2"  disabled :true-label="1" :false-label="2"class="db cmbi">02=对筛查对象进行了一次以上的随机分配（初始ID为：

                    <!--<el-input v-model="formInline.item_1a_2_id" disabled  size="small" :maxlength='5' style="width:100px;height:34px;line-height: 34px;"></el-input>）-->
                    <span>{{formInline.item_1a_2_id}}</span>)
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            <el-form-item  prop="item_1a_3" >
              <el-checkbox-group v-model="formInline.item_1a_3"  style="height: auto;">
                  <el-checkbox name="item_1a_3" label="3"  disabled :true-label="1" :false-label="2"class="db">03=筛查对象在完成研究前未填写知情同意书；</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item  prop="item_1a_4" >
              <el-checkbox-group v-model="formInline.item_1a_4"  style="height: auto;">
                <el-checkbox label="4"  disabled :true-label="1" :false-label="2"class="db">04=筛查对象在筛查之前已报告或确诊患有癌症；</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item  prop="item_1a_5" >
              <el-checkbox-group v-model="formInline.item_1a_5" style="height: auto;">
                  <el-checkbox name="item_1a_5" label="5"  disabled :true-label="1" :false-label="2"class="db">05=随机化分组后的对象接受了其它干预组提供的筛查，请具体说明
                      <el-input v-model="formInline.item_1a_5_des"  disabled size="small" class="specialWidth" ></el-input>
                  </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item  prop="item_1a_6" >
              <el-checkbox-group v-model="formInline.item_1a_6"  style="height: auto;">
                  <el-checkbox name="item_1a_6" label="6"  disabled :true-label="1" :false-label="2"  class="db">06=向筛查对象报告了错误的结果；</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item  prop="item_1a_7" >
              <el-checkbox-group v-model="formInline.item_1a_7" style="height: auto;">
                  <el-checkbox prop="item_1a_7" label="7"  disabled :true-label="1" :false-label="2"class="db">07=进行了重复的筛查；</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item  prop="item_1a_8" >
              <el-checkbox-group v-model="formInline.item_1a_8"  style="height: auto;">
                  <el-checkbox label="8" name="item_1a_8"  disabled :true-label="1" :false-label="2"class="db">08=受保护的医疗信息遭泄露；</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item  prop="item_1a_9" >
              <el-checkbox-group v-model="formInline.item_1a_9" style="height: auto;">
                <el-checkbox label="9" name="item_1a_9" disabled :true-label="1" :false-label="2"class="db">09=随机分组分配ID号后，因受试者主观原因（备注原因：
                    <el-input v-model="formInline.item_1a_9_cause"  disabled size="small" style="width:220px;"></el-input>），在进行到一定程度后决意退出试验（预约或完成了哪些检查，请说明：
                    <el-input v-model="formInline.item_1a_9_des" disabled  size="small" style="width:220px;"></el-input>
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item  prop="item_1a_10" >
              <el-checkbox-group v-model="formInline.item_1a_10"  style="height: auto;">
                <el-checkbox label="10"  :true-label="1" disabled :false-label="2" class="db">10=其它，请说明（请在下方详细说明任何上述未涉及的违规情况）：
                    <el-input type="textarea" style="display:block; padding-right: 20px;" disabled v-model="formInline.item_1a_10_other"></el-input>
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="2a.方案违规事件发现日期：" prop="item_2a_1" class="cmba190">
              <el-date-picker
                disabled
                v-model="formInline.item_2a_1"
                :clearable="false"
                size="small"
                type="date"
                style="width:160px;"
                format="yyyy年MM月dd日"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="2b.方案违规事件发生日期：" prop="item_2b_1" class="cmba190">
              <el-date-picker
                disabled
                v-model="formInline.item_2b_1"
                :clearable="false"
                type="date"
                style="width:160px;"
                size="small"
                format="yyyy年MM月dd日"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>


            <div class="texts">
              3.关于违反方案内容的具体描述：
            </div>
            <div class="textsnormal">
              请依据以下几点描述违反方案情况：违规是如何被发现的？如何发生的？对受试者的影响是什么？此次违规进行了怎样的处理（包括与筛查对象联系、更换系统或流程、填写表格等）？为预防此类事件的再次发生，采取了哪些措施？
            </div>
            <el-form-item label="" prop="item_4a_1" style="padding:10px 0 0;margin-bottom:0;">
              <el-input type="textarea" prop="item_4a_1" disabled style="display:block; padding-right: 20px;" v-model="formInline.item_4a_1"  placeholder="（非必填）"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!--<div class="text-center" style="margin-top: 40px;">-->
        <!--<el-button type="primary" @click="submitForm()" >提交</el-button>-->
        <!--<el-button @click="goBack()">取消</el-button>-->
      <!--</div>-->
    </div>
  </div>
</template>
<script>
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

      var item_1a_1 = (rule, value, callback) => {
        if(value){
          callback()
//          document.getElementById('3a' ).scrollIntoView(true);
        }

      };
      var item_1a_2 = (rule, value, callback) => {
        if(value)
          if(this.formInline.item_1a_2_id === '' || this.formInline.item_1a_2_id === null || this.formInline.item_1a_2_id === undefined){
            callback(new Error('请输入初始ID'))
          }else callback();
        else this.formInline.item_1a_2_id ='';

        callback()
      };
      var item_1a_5 = (rule, value, callback) => {
        if(value)
          if(this.formInline.item_1a_5_des === '' || this.formInline.item_1a_5_des === null || this.formInline.item_1a_5_des === undefined){
            callback(new Error('请输入具体说明'))
          }else callback();
        else {
          this.formInline.item_1a_5_des ='';
          callback()
        }

      };
      var item_1a_9 = (rule, value, callback) => {
        if(value)
          if(this.formInline.item_1a_9_cause === '' || this.formInline.item_1a_9_des === ''|| this.formInline.item_1a_9_cause === null || this.formInline.item_1a_9_cause === undefined === ''  || this.formInline.item_1a_9_des === null || this.formInline.item_1a_9_des === undefined){
            callback(new Error('请输入原因'))
          }else callback();
        else {
          this.formInline.item_1a_9_cause ='';
          this.formInline.item_1a_9_des ='';
          callback()
        }

      };
      var item_1a_10=(rule, value, callback) => {
        if(value)
          if(this.formInline.item_1a_10_other === '' || this.formInline.item_1a_10_other === null || this.formInline.item_1a_10_other === undefined){
            callback(new Error('请输入其他情况'))
          }else callback();
        else {
          this.formInline.item_1a_10_other ='';
          callback()
        }

      };
      var item_2a_1 =(rule, value, callback) => {
        if(this.formInline.item_1a_2 || this.formInline.item_1a_3 || this.formInline.item_1a_4 || this.formInline.item_1a_5 || this.formInline.item_1a_1 || this.formInline.item_1a_7 || this.formInline.item_1a_8 || this.formInline.item_1a_9 || this.formInline.item_1a_10){
          if(!value){
            callback(new Error('请选择发现日期'));
          }else{
            callback();
          }
        }
        if(this.formInline.item_2b_1){
          if(new Date(this.formInline.item_2a_1) - new Date(this.formInline.item_2b_1) >=0){
            callback();
          }else{
            callback(new Error('发现日期必须大于等于发生日期'));
          }
        }else{
          callback();
        }

      };
      var item_2b_1 =(rule, value, callback) => {
        if(this.formInline.item_1a_2 || this.formInline.item_1a_3 || this.formInline.item_1a_4 || this.formInline.item_1a_5 || this.formInline.item_1a_1 || this.formInline.item_1a_7 || this.formInline.item_1a_8 || this.formInline.item_1a_9 || this.formInline.item_1a_10){
          if(!value){
            callback(new Error('请选择发生日期'));
          }else{
            callback();
          }
        }

        if(this.formInline.item_2a_1){
          if(new Date(this.formInline.item_2a_1) - new Date(this.formInline.item_2b_1) >=0){
            callback();
          }else{
            callback(new Error('发现日期必须大于等于发生日期'));
          }
        }else{
          callback();
        }
      };
      var item_3a_2 = (rule, value, callback) => {
        if(value.indexOf('2')>-1 && value.indexOf('1')<0){
          console.log(value)
          this.formInline.item_3a_2.push('1')
        }
        if(value.length){
          if (this.formInline.item_3a_2_time === '' || this.formInline.item_3a_2_time === null || this.formInline.item_3a_2_time === undefined) {
            callback(new Error('请选择确诊日期'));
          }else{
            callback();
          }

        }else{
          callback();
        }
      };
      var item_3a_10 = (rule, value, callback) => {
        if(value)
          if(this.formInline.item_3a_10_cause === ''|| this.formInline.item_3a_10_cause === null || this.formInline.item_3a_10_cause === undefined){
            callback(new Error('请输入其他原因'))
          }else callback();
        else {
          this.formInline.item_3a_10_cause ='';
        }
        callback();
      };
      return {
        formInline: {
          "eventType": "1",//1代表违反方案 2.代表不良事件 值固定为1
          "schemeType":'1',
          "sid": this.$route.query.sid,//受试者sid  值固定为TC0001
          "quitLogId":this.$route.query.quitLogId,
          "tbDate": new Date(),//填表日期
          "tbrName": "",//填表人姓名
          "zkzName": "",//质控者姓名
          "investigatorCode": "001",//筛查现场编码
          "checkYear": new Date(),//检查年份
          "item_1a_1": false,// 筛查对象随机分配无效   1：是，2：否
          "item_1a_2": false,//对筛查对象进行了一次以上的随机分配  1：是，2：否
          "item_1a_2_id": "",// 初始ID
          "item_1a_3": false,// 筛查对象在完成研究前未填写知情同意书   1：是，2：否
          "item_1a_4": false,//筛查对象在筛查之前已报告或确诊患有癌症 1：是，2：否
          "item_1a_5": false,//随机化分组后的对象接受了其它干预组提供的筛查   1：是，2：否
          "item_1a_5_des": "",//具体说明
          "item_1a_6": false,//向筛查对象报告了错误的结果   1：是，2：否
          "item_1a_7": false,//进行了重复的筛查   1：是，2：否
          "item_1a_8": false,//受保护的医疗信息遭泄露 1：是，2：否
          "item_1a_9": false,//随机分组分配ID号后，因受试者主观原因 1：是，2：否
          "item_1a_9_cause": "",//具体原因
          "item_1a_9_des": "",//说明
          "item_1a_10": false,//其它，请说明（请在下方详细说明任何上述未涉及的违规情况）
          "item_1a_10_other":"",
          "item_2a_1": "",// 方案违规事件发现日期
          "item_2b_1": "",// 方案违规事件发生日期
          "item_3a_1": false,// 年龄小于50或大于74岁 1：是，2：否
          "item_3a_2": [],// 曾有医生告诉过患有结直肠癌   1：是，2：否
          "item_3a_2_time": "",// 结直肠癌确诊日期
          "item_3a_2_estimate":false,//为预估日期 1：是，2：否
          "item_3a_3": false,// 进行过结直肠癌切除手术   1：是，2：否
          "item_3a_4": false,//正在接受任何癌症相关的治疗（非黑色素皮肤癌除外）   1：是，2：否
          "item_3a_5": false,//在过去5年里，做过结肠镜、乙状结肠镜检查、气钡双重造影、CT仿真结肠镜等结直肠癌筛查；或者CT肠道成像等结直肠癌筛查   1：是，2：否
          "item_3a_6": false,//在过去1年里，接受过粪便潜血检测或者粪便DNA检测   1：是，2：否
          "item_3a_7": false,//有下列下消化道疾病提示需要结肠镜进行确认？1）过去半年中长时间的直肠出血；2）明确诊断的缺铁性贫血；3）过去6个月中有记录的不明原因的体重下降（超过10%基础体重）1：是，2：否
          "item_3a_8": false,//有其他严重疾病（包括严重的肺部疾病，晚期肾病，晚期肝病、严重的心衰、近期诊断为除黑色素皮肤癌外的其他癌症）   1：是，2：否
          "item_3a_9": false,// 未签署知情同意书 1：是，2：否
          "item_3a_10": false,// 随机分组后分配ID号后，因受试者主观原因在未接受任何筛查干预前决意退出试验   1：是，2：否
          "item_3a_10_cause": "",//原因
          "item_4a_1": "",//请依据以下几点描述违反方案情况：违规是如何被发现的？如何发生的？对受试者的影响是什么？此次违规进行了怎样的处理（包括与筛查对象联系、更换系统或流程、填写表格等）？为预防此类事件的再次发生，采取了哪些措施？
        },
//        rules:{
//          tbDate:[{ required: true, message: '请输入', trigger: 'blur' }],
//          tbrName:[{ required: true, message: '请输入', trigger: 'blur' }],
//          zkzName:[{ required: true, message: '请输入', trigger: 'blur' }],
//          checkYear:[{ required: true, message: '请输入', trigger: 'blur' }],
//          item_1a_1:[{ validator:item_1a_1 , trigger: 'change' }],
//          item_1a_2:[{ validator:item_1a_2 , trigger: 'change' }],
//          item_1a_2_id:[{max:5}],
//          item_1a_5:[{ validator:item_1a_5 , trigger: 'change' }],
//          item_1a_9:[{ validator:item_1a_9 , trigger: 'change' }],
//          item_1a_10:[{ validator:item_1a_10 , trigger: 'change' }],
//          item_2a_1:[{ validator:item_2a_1 , trigger: 'blur' }],
//          item_2b_1:[{ validator:item_2b_1 , trigger: 'blur' }],
//          item_3a_2:[{ validator:item_3a_2 , trigger: 'blur' }],
//          item_3a_10:[{ validator:item_3a_10 , trigger: 'blur' }]
//        }


      }
    },
    created(){
      this.query()
    },
    methods:{
      query(){
        $axios_http({
          url:'/base/abnormal/event/queryHospitalViolationScheme',
          data:{
              id:this.$route.query.id,
             sid:this.$route.query.sid
          },
          vueObj:this
        }).then((res)=> {
           this.formInline = res.data.data
           this.formInline.item_1a_2_id.substring(2)
          console.log(this.formInline.item_1a_2_id)

        })
      },
      ifaidcheck () { //请勾选方案违规的种类--是否选了这项
        if(this.formInline.item_1a_1 || this.formInline.item_1a_2 || this.formInline.item_1a_3 || this.formInline.item_1a_4 || this.formInline.item_1a_5 || this.formInline.item_1a_6 || this.formInline.item_1a_7 || this.formInline.item_1a_8 || this.formInline.item_1a_9 || this.formInline.item_1a_10){
          return true
        }else{
          return false
        }
      },
      if3acheck () { //请无效原因--是否需要选
        if(this.formInline.item_1a_1 && !this.formInline.item_3a_1 && !this.formInline.item_3a_2 && !this.formInline.item_3a_3 && !this.formInline.item_3a_4 && !this.formInline.item_3a_5 && !this.formInline.item_3a_6 && !this.formInline.item_3a_7 && !this.formInline.item_3a_8 && !this.formInline.item_3a_9 && !this.formInline.item_3a_10){
          return true
        }else{
          return false
        }
      },
      submitForm() {
        const that = this
        console.log(this.$refs)
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
        if(!this.ifaidcheck()){
          this.$message({
            message: '请勾选方案违规的种类',
            type: 'warning'
          });
          validd = false

          document.getElementById('1a' ).scrollIntoView(true);
        }
        if(validd){
          if(this.if3acheck()){
            this.$message({
              message: '请勾选无效原因',
              type: 'warning'
            });
            validd = false
          }
        }

        // 验证form
        if (validd){
          let dd = JSON.parse(JSON.stringify(that.formInline))
          // 设置时间格式
          if(dd.tbDate.indexOf('T')>=0){
            dd.tbDate = dd.tbDate.split('T')[0]
          }
          console.log(dd)

          var booltoint = (items,indexs,indexe)=>{
            for(let i=indexs;i<=indexe;i++){
              dd[items+i] =  dd[items+i] == false ? 2 : 1;
            }
          }
          var booltoint_radio = (items,index,ischeck,istype)=>{
            for(let i=1;i<=index;i++){
              dd[items+i] =  i == ischeck && istype ? 1 : 2;
            }
          }
          dd.checkYear = dd.checkYear.split('-')[0]
          booltoint('item_1a_',1,10)

          dd.item_3a_1 = (dd.item_3a_1?1:2)
          dd.item_3a_2_estimate = (dd.item_3a_2.indexOf('2')>-1?1:2)
          dd.item_3a_2 = (dd.item_3a_2.indexOf('1')>-1?1:2)
          booltoint('item_3a_',3,10)
          console.log(dd)
          $axios_http({
            url:'/base/abnormal/event/addOrUpdateAbnormalEvent',
            data:dd,
            vueObj:this
          }).then((res)=> {
            //显示操作成功浮动提示框
            $successMsg(this,"添加成功")
            this.$router.go(-1)

            //清空数据
            this.$refs.formInline.resetFields()
            this.$refs.formInline1.resetFields()
          })
        } else {
          return false;
        }
      }
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
    margin: 40px 50px 30px 50px;
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

  .mb5 {
    margin-bottom: 8px;
  }

  .addbb {
    font-size: 20px;
    font-weight: bold;
    color: #3a8ee6;
  }

  .zdysinput input {
    border-width: 0 0 1px 0;
  }

  .txsm {
    font-size: 14px;
    padding: 20px 50px;
    border-top:1px solid #cccccc;
  }
  .texts{
    color: #606266;
    line-height: 40px;
    font-weight: bold;
    font-size: 14px;
  }
  .textsnormal{
    color: #606266;
    line-height: 2;
    font-size: 14px;
  }
  .db{
    display: block;
    margin-left: 30px;
    line-height: 30px;
    padding-right: 5px;
  }
  .specialWidth{
    width:calc(100% - 450px);
    min-width: 220px;
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
  padding-right: 10px;
}
.el-input-group__append{
  padding:0 10px;
}

.cmb .el-checkbox-group{
  overflow:hidden;
}
.cmbi .el-input{
   width: 90px;
 }
.cmbi .el-input input{
  border: 0px !important;
  padding: 0 !important;
  background: url('../../assets/formimg/icon_inputbg.png') no-repeat center;
  background-size: contain;
  letter-spacing: 11px !important;
  padding-left: 10px !important;
  font-size: 14px;
}
.cmba .el-form-item__error{
  padding-left: 50px;
}
.cmba190 .el-form-item__error{
  padding-left: 190px;
}
j_content .el-radio__input.is-disabled.is-checked+span.el-radio__label {
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
</style>
