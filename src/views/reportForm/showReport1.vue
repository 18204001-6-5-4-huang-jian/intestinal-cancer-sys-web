<template>
  <div class="j_content" v-if="showReport1_page">
    <div style="min-width: 941px;">
      <div class="btns">
        <el-button type="normal" size="small" class="fl" @click="goBack()">返回</el-button>
        <!--<el-button type="normal" size="small" class="fr" @click="submit()" v-if="!show">保存</el-button>-->
        <p class="text">表B1-结肠镜检查结果记录表</p>
      </div>
      <div class="formcon">
        <div class="title">
          第一部分：参与者基本信息
        </div>
        <div class="tables">
          <el-form :inline="true" :model="formInline" class="demo-form-inline" :disabled="show">
            <el-form-item label="sid:" class="formoneline">
              <span>{{formInline.sid}}</span>
            </el-form-item>
            <el-form-item label="身份证号:" class="formoneline">
              <span>{{users.idCard}}</span>
            </el-form-item>
            <el-form-item label="姓名:" class="formhalfline">
              <span>{{users.name}}</span>
            </el-form-item>
            <el-form-item label="性别:" class="formhalfline">
              <span>{{users.sex}}</span>
            </el-form-item>
            <el-form-item label="年龄:" class="formhalfline">
              <span>{{users.age}}</span>
            </el-form-item>
            <el-form-item label="检查日期:" class="formhalfline">
              <el-date-picker  :readonly="show"
                               :clearable="false"
                               v-model="formInline.surveyDate"
                               type="date"
                               size="small"
                               style="width:160px;"
                               format="yyyy年MM月dd日"
                               value-format="yyyy-MM-dd"
                               placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="formcon">
        <div class="title">
          二、直肠指诊
        </div>
        <div class="tables" style="position:relative;">
          <img src="../../assets/formimg/icon_1.png" class="rightimg" alt="">
          <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" :rules="rules2" :disabled="show">
            <el-form-item label="参与者是否进行了直肠指诊（无法耐受肠镜检查者）？" class="formoneline" prop="item_2_1" >
              <el-radio-group v-model="formInline.item_2_1" >
                <el-radio label="1">是</el-radio>
                <el-radio label="2">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="有无肿块" class="formoneline" prop="item_2_1_a" v-if="formInline.item_2_1=='1'">
              <el-radio-group v-model="formInline.item_2_1_a" >
                <el-radio label="1">是</el-radio>
                <el-radio label="2">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label=" " class="formoneline" prop="" v-show="formInline.item_2_1_a=='1'">
              <el-form-item label="肿块距肛" class="forminline" prop="item_2_1_b" >
                <el-input type="text" :readonly="show" v-model="formInline.item_2_1_b" class="zdysinputsmall" style="width:60px;"></el-input>
              </el-form-item>
              <el-form-item label="cm，" class="forminline" prop="item_2_1_c" >
                <el-input type="text" :readonly="show" v-model="formInline.item_2_1_c" class="zdysinputsmall" style="width:60px;"></el-input>
              </el-form-item>
              <el-form-item label="点钟，占据肠腔" class="forminline" prop="item_2_1_d">
                <el-input type="text" :readonly="show" v-model="formInline.item_2_1_d" class="zdysinputsmall" style="width:60px;"></el-input>
              </el-form-item>
              <el-form-item label="/" class="forminline" prop="item_2_1_e" >
                <el-input type="text" :readonly="show" v-model="formInline.item_2_1_e" class="zdysinputsmall" style="width:60px;"></el-input>
              </el-form-item>
            </el-form-item>
            <el-form-item label="参与者是否完成了结肠镜检查？" class="formoneline" prop="item_2_2">
              <el-radio-group v-model="formInline.item_2_2"  :disabled="show">
                <el-radio label="1">是</el-radio>
                <el-radio label="2">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="formcon"  v-if="formInline.item_2_2 == '1'" >
        <div class="title">
          三、肠镜检查结果
        </div>
        <div class="tables">
          <el-form :inline="true" :model="formInline2" ref="formvalidate3" class="demo-form-inline" :rules="formvalidate3rules" :disabled="show">
            <div>
              <el-form-item label="肠镜操作方式?"  class="formhalfline" prop="item_3_1">
                <el-radio-group v-model="formInline2.item_3_1"  :disabled="show">
                  <el-radio label="1">单人</el-radio>
                  <el-radio label="2">双人</el-radio>
                  <el-radio label="3">单/双人</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="是否采用麻醉？" class="formhalfline" prop="item_3_2">
                <el-radio-group v-model="formInline2.item_3_2"  :disabled="show">
                  <el-radio label="1">是</el-radio>
                  <el-radio label="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
            <el-form-item label="肠镜到达深度？" class="formoneline" prop="item_3_3">
              <el-radio-group v-model="formInline2.item_3_3"  :disabled="show">
                <el-radio label="1" class="mb5">回肠末端</el-radio>
                <el-radio label="2" class="mb5">回盲瓣</el-radio>
                <el-radio label="3" class="mb5">升结肠</el-radio>
                <el-radio label="4" class="mb5">肝曲</el-radio>
                <el-radio label="5" class="mb5">横结肠</el-radio>
                <el-radio label="6" class="mb5">脾曲</el-radio>
                <el-radio label="7" class="mb5">降结肠</el-radio>
                <el-radio label="8" class="mb5">乙状结肠</el-radio>
                <el-radio label="9" class="mb5">直肠</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="肠道准备情况？" class="formoneline" prop="item_3_4">
              <el-radio-group v-model="formInline2.item_3_4"  :disabled="show">
                <el-radio label="1">I 级（肠道准备满意）</el-radio>
                <el-radio label="2">II级（肠道准备比较满意）</el-radio>
                <el-radio label="3">III级（肠道准备不满意）</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="肠镜完成时间:" class="formoneline" prop="item_3_5">
              <el-input placeholder="请输入" v-model="formInline2.item_3_5" size="small" style="width:160px;" :readonly="show">
                <template slot="append">分钟</template>
              </el-input>
            </el-form-item>
            <el-form-item label="是否发生并发症（可多选）？" class="formoneline" prop="item_3_6">
              <el-checkbox-group v-model="formInline2.item_3_6" style="height: auto;"  :disabled="show">
                <div>
                  <el-checkbox label="1" name="item_3_6" style="margin-bottom: 15px;" >无</el-checkbox>
                </div>
                <div>
                  <el-checkbox label="2" name="item_3_6" style="margin-bottom: 15px;" :disabled="(formInline2.item_3_6 && formInline2.item_3_6.indexOf('1') >= 0)">肠道穿孔</el-checkbox>
                </div>
                <div>
                  <el-checkbox label="3" name="item_3_6" style="margin-bottom: 15px;" :disabled="(formInline2.item_3_6 && formInline2.item_3_6.indexOf('1') >= 0)">出血（出血程度
                  </el-checkbox>

                  <el-form-item label="" class="forminline" prop="item_3_6_3_1" style="padding-left:20px;">
                    <el-input v-model="formInline2.item_3_6_3_1" :readonly="show" :disabled="(formInline2.item_3_6 && formInline2.item_3_6.indexOf('1') >= 0)" style="width: 150px;" size="small"></el-input>
                  </el-form-item>
                  <el-form-item label="" class="forminline" prop="item_3_6_3_2" style="padding-left:20px;">
                    <span :class="{gray:formInline2.item_3_6 && formInline2.item_3_6.indexOf('1') >= 0}">处理情况 </span>  <el-input v-model="formInline2.item_3_6_3_2" :readonly="show" :disabled="(formInline2.item_3_6 && formInline2.item_3_6.indexOf('1') >= 0)" style="width: 150px;" size="small"></el-input> <span :class="{gray:formInline2.item_3_6 && formInline2.item_3_6.indexOf('1') >= 0}">）</span>
                  </el-form-item>
                </div>
                <div>
                  <el-checkbox label="4" name="item_3_6" style="margin-bottom: 20px;" :disabled="(formInline2.item_3_6 && formInline2.item_3_6.indexOf('1') >= 0)">其他</el-checkbox>
                  <el-form-item label="" class="forminline" prop="item_3_6_4_other" style="padding-left:20px;">
                    <el-input v-model="formInline2.item_3_6_4_other" :readonly="show" :disabled="(formInline2.item_3_6 && formInline2.item_3_6.indexOf('1') >= 0)" style="width: 120px" size="small"></el-input>
                  </el-form-item>
                </div>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="是否检出息肉？" class="formoneline" prop="item_3_7">
              <el-radio-group v-model="formInline2.item_3_7"  :disabled="show">
                <el-radio label="1">是</el-radio>
                <el-radio label="2">否</el-radio>
              </el-radio-group>
              <el-form-item label="检出的息肉具体数为" class="forminline" prop="item_3_7_a" style="padding-left:20px;" v-if="formInline2.item_3_7 == 1">
                <el-input v-model="formInline2.item_3_7_a" :readonly="show" style="width: 120px" size="small"></el-input>
              </el-form-item>
            </el-form-item>
            <el-form-item label="是否检出除息肉外其他病变？" class="formoneline mt5input" prop="item_3_8">
              <el-radio-group v-model="formInline2.item_3_8"  :disabled="show">
                <el-radio label="1">是</el-radio>
                <el-radio label="2">否</el-radio>
              </el-radio-group>
              <el-form-item label="其他病变类型（请说明）：" ref="formvalidate3_other" class="forminline" prop="item_3_8_other" v-if="formInline2.item_3_8 == '1'" style="margin-left: 40px;">
                <el-input v-model="formInline2.item_3_8_other" :readonly="show" style="width: 120px;margin-right: 20px;" size="small"></el-input>
              </el-form-item>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="formcon" v-if="formInline.item_2_2 == '1'" >
        <div class="title">
          四、内镜下病变信息记录表（此表可根据实际病变数添加）
        </div>
        <div class="tables">
          <div v-for="(x,index) in lesionsRecordList">
            <div class="title nobg">病变部位{{index+1}} <el-button type="danger" icon="el-icon-delete" size="mini" v-if="index && !show" style="padding:6px 10px;margin-left:10px;" @click="removeOther(index)" ></el-button></div>
            <div style="border:1px solid #999999;padding:20px; margin-bottom: 20px;">
              <el-form :inline="true" :model="x" class="demo-form-inline" ref="lesionsRecordForm" :rules="lesionsRecordRule" :disabled="show">
                <el-form-item label="部位:" class="formhalfline" prop="item1">
                  <el-select v-model="x.item1" placeholder="请选择" size="small"  :disabled="show">
                    <el-option
                      v-for="item in partmentoptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">{{item.label}}
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="距肛:" class="formhalfline" prop="item2">
                  <el-input placeholder="请输入" v-model="x.item2" size="small" :readonly="show" style="width:160px;">
                    <template slot="append">厘米</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="镜下考虑病变类型:" class="formhalfline" prop="item3">
                  <el-select v-model="x.item3" placeholder="请选择" :disabled="show"  size="small">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="病理标本号:" class="formhalfline" prop="item4">
                  <el-input placeholder="请输入" v-model="x.item4" :readonly="show" size="small" ref="item4"></el-input>
                </el-form-item>
                <el-form-item label="最大直径:" class="formhalfline" prop="item5">
                  <el-input placeholder="请输入" v-model="x.item5" :readonly="show" ref="item5" size="small" style="width:160px;">
                    <template slot="append">厘米</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="形状:" class="formhalfline" prop="item6">
                  <el-radio-group v-model="x.item6"  :disabled="show">
                    <el-radio label="1">隆起</el-radio>
                    <el-radio label="2">扁平</el-radio>
                    <el-radio label="3">凹陷</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="有无蒂:" class="formhalfline" prop="item7">
                  <el-radio-group v-model="x.item7"  :disabled="show">
                    <el-radio label="1">有</el-radio>
                    <el-radio label="2">无</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="蒂形状:" class="formhalfline" prop="item8" v-if="x.item7==1">
                  <el-radio-group v-model="x.item8"  :disabled="show">
                    <el-radio label="1">广蒂</el-radio>
                    <el-radio label="2">亚蒂</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="颜色:" class="formhalfline" prop="item9">
                  <el-radio-group v-model="x.item9" :disabled="show">
                    <el-radio label="1">红色</el-radio>
                    <el-radio label="2">灰白色</el-radio>
                    <el-radio label="3">其它</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="有无出血:" class="formhalfline" prop="item10">
                  <el-radio-group v-model="x.item10"  :disabled="show">
                    <el-radio label="1">出血</el-radio>
                    <el-radio label="2">不出血</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class=" text-right">
            <el-button type="text" class="lesionsRecordList" @click="addbbFun" v-if="!show">添加病变部位</el-button>
          </div>
          <!-- 查看图片展示区 -->
          <div class="title nobg">内镜图片</div>
          <seePics  :fileList="fileList"></seePics>
          <div class="title nobg">其它病变</div>
          <el-form :model="formInline6" label-width="130px" ref="formInline4" :rules="formvalidate4rules" :disabled="show">
            <div style="border:1px solid #999999;padding:20px 0;">
              <el-form-item label="其它病变:" prop="otherLesions" >
                <el-input type="textarea" :readonly="show" v-model="formInline6.otherLesions"></el-input>
              </el-form-item>
              <el-form-item label="内镜下诊断:" prop="endoscopicDiagnosis" >
                <el-input type="textarea" :readonly="show" v-model="formInline6.endoscopicDiagnosis"></el-input>
              </el-form-item>
              <el-form-item label="诊断医生:" prop="diagnosisDoctor" >
                <el-input type="text" :readonly="show" v-model="formInline6.diagnosisDoctor" class="zdysinput" style="width:80px;"></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="是否做了病理:" prop="pathology">
                <el-radio-group v-model="formInline6.pathology" :disabled="show">
                  <el-radio label="1">是</el-radio>
                  <el-radio label="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>

      <div>
        <p class="txsm">
          填写说明：
        </p>
        <p class="txsm">1、肠道准备情况：I
          级（肠道准备满意）：肠腔内无粪便或渣，无粪水潴留，肠液清亮，操作顺利，观察良好；II级（肠道准备比较满意）：肠腔内无粪便残渣，肠腔内有污浊粪水，操作比较顺利及观察基本清晰；III级（肠道准备不满意）：肠腔内有粪便残渣或粪块，操作不顺利，甚至因肠道准备不足，检查或治疗被迫停止。
        </p>
        <p class="txsm">
          2、部位为距肛**cm（以退镜长度为准），并以肠前壁正中为时钟12点位置，肠后壁正中为6点钟，顺时针描写在肠腔的位置。
        </p>
        <p class="txsm">
          3、每一个病变信息中的内容需要填写完整。
        </p>
      </div>
      <div class="text-center" style="margin-top: 40px;" >
        <approvalDialog ref="approvalDialog" @refreshList="queryInfo" :id="ShowData.id" :approvalArr="approvalArr" v-if="$store.state.hospitalType==3 && ShowData.approvalStatus==0"></approvalDialog>
        <el-button type="primary" v-if="$store.state.hospitalType==3 && ShowData.approvalStatus==1" :disabled="true">解除锁定</el-button>
        <router-link :to="{path:'/colonscopy/showReport2',query:{id:ShowData.pathologyId,sid:ShowData.sid,show:1}}">
          <el-button type="primary" v-if="ShowData.pathologyId">查看病理结果</el-button>
        </router-link>
      </div>
      <div class="text-center" style="margin-top: 40px;"  v-if="!show">
        <el-button type="primary" @click="submit()">提交</el-button>
        <el-button @click=goBack()>取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import seePics from '../components/seePics'   //查看图片
import approvalDialog from '../components/approvalDialog'
  export default {
    name: 'report1',
    data() {
      const oneDecimaljglm = (rule, value, callback) => {
        if (value != null && value != "" || value == undefined) {
          if(value>=0){
            const that = this
            this.lesionsRecordList.forEach(function (item) {
                console.log(item)
              if(item.item2 != null && item.item2 != '' && item.item2 != undefined)
              that.$set(item ,['item2'], (item.item2 * 1).toFixed(1))
            })
            callback();
          }else{
            callback(new Error('请输入非负数!'))
          }
        }else{
          callback()
        }
      }
      const oneDecimalzdzz = (rule, value, callback) => {
        if (value != null && value != "" || value == undefined) {
          if(value>=0 && value<=10){
            const that = this
            this.lesionsRecordList.forEach(function (item) {
              if(item.item5 != null && item.item5 != '' && item.item5 != undefined)
              that.$set(item ,['item5'], (item.item5 * 1).toFixed(1))
            })
            callback();
          }else{
            callback(new Error('直径:(0.1-10)厘米'))
          }
        }else{
          callback()
        }
      }
      const ifneedothers = (rule, value, callback) => {
        if(this.formInline2['item_3_8'] == '1' && (value == null || value == "" || value == undefined)){
          callback(new Error('请输入'))
        }else{
          callback();
        }
      }
      const item_3_5 = (rule, value, callback) => {
        if (value != null && value != "" || value == undefined) {
          if(value>=0){
            callback()
          }else{
            callback(new Error('请输入非负数!'))
          }
        }else{
          callback(new Error('请输入'))
        }
      }
      const item_3_6 = (rule, value, callback) => {
        if(value.indexOf('1')>-1 && value.length>1){
          this.$set(this.formInline2,['item_3_6'],['1'])
          this.$set(this.formInline2,['item_3_6_3_1'],'')
          this.$set(this.formInline2,['item_3_6_3_2'],'')
          this.$set(this.formInline2,['item_3_6_4_other'],'')
        }
        this.$refs.formvalidate3.validateField('item_3_6_3_1')
        this.$refs.formvalidate3.validateField('item_3_6_3_2')
        this.$refs.formvalidate3.validateField('item_3_6_4_other')
        callback();
      }
      const item_3_8 = (rule, value, callback) => {
        if(value == '1'){
          this.$refs.formvalidate3.validateField('item_3_8_other')
        }else{
          this.$refs.formvalidate3_other.clearValidate()
        }
        callback();
      }
      const item_3_6_3_1 = (rule, value, callback) => {
        if(this.formInline2['item_3_6'].indexOf('1') < 0 && this.formInline2['item_3_6'].indexOf('3') >= 0 && (value == null || value == "" || value == undefined)){
          callback(new Error('请输入'))
        }else{
          callback();
        }
      }
      const item_3_6_3_2 = (rule, value, callback) => {
        if(this.formInline2['item_3_6'].indexOf('1') < 0 && this.formInline2['item_3_6'].indexOf('3') >= 0 && (value == null || value == "" || value == undefined)){
          callback(new Error('请输入'))
        }else{
          callback();
        }
      }
      const item_3_6_4_other = (rule, value, callback) => {
        if(this.formInline2['item_3_6'].indexOf('1') < 0 && this.formInline2['item_3_6'].indexOf('4') >= 0 && (value == null || value == "" || value == undefined)){
          callback(new Error('请输入'))
        }else{
          callback();
        }
      }
      var validateItem_3_7_a = (rule, value, callback) => {
        if (value && !(/^\+?[1-9][0-9]*$/.test(value))) {
          callback(new Error('请输入正整数'))
        } else if (value * 1 < 1 || value * 1 > 20) {
          callback(new Error('次数：1-20之间'));
        }else {
          callback();
        }
      };
      const item_2_1_a = (rule, value, callback) => {
        if(value != '1'){
          this.formInline['item_2_1_b'] = null
          this.formInline['item_2_1_c'] = null
          this.formInline['item_2_1_d'] = null
          this.formInline['item_2_1_e'] = null
        }
        callback();
      }
      const item_2_1_b_change = (rule, value, callback) => {
        if(this.formInline['item_2_1_a'] == '1'){
          if(!value || isNaN(value*1) || value*1<=0){
            callback(new Error('请输入正数'))
          }else{
            callback();
          }
        }else{
          callback();
        }
      }
      const item_2_1_b_blur = (rule, value, callback) => {
        if(this.formInline['item_2_1_a'] == '1'){
          if(!value || isNaN(value*1) || value*1<=0){
            callback(new Error('请输入正数'))
          }else{
            this.formInline['item_2_1_b'] = (value*1).toFixed(1)
            callback();
          }
        }else{
          callback();
        }
      }
      const item_2_1_c = (rule, value, callback) => {
        if(this.formInline['item_2_1_a'] == '1'){
          if(value==null || value=='' || value==undefined || isNaN(value*1) || ((value*1)%1!=0) ||value*1<0 || value*1>12){
            callback(new Error('请输入0-12的整数'))
          }else{
            callback();
          }
        }else{
          callback();
        }
      }
      const item_2_1_d = (rule, value, callback) => {
        if(this.formInline['item_2_1_a'] == '1'){
          if(value==null || value=='' || value==undefined || isNaN(value*1) || ((value*1)%1!=0) ||value*1<0){
            callback(new Error('请输入正整数'))
          }else{
            if(this.formInline['item_2_1_e'] && this.formInline['item_2_1_e']<value){
              callback(new Error('分子不能大于分母'))
            }else{
              callback();
            }
          }
        }else{
          callback();
        }
      }
      const item_2_1_e = (rule, value, callback) => {
        if(this.formInline['item_2_1_a'] == '1'){
          if(value==null || value=='' || value==undefined || isNaN(value*1) || ((value*1)%1!=0) ||value*1<0){
            callback(new Error('请输入正整数'))
          }else{
            if(this.formInline['item_2_1_d'] && this.formInline['item_2_1_d']>value){
              callback(new Error('分母不能小于分子'))
            }else{
              callback();
            }
          }
        }else{
          callback();
        }
      }
      return {
        approvalArr:{
          formType:"HOSPITAL_COLONOSCOPY_RESULT",
        },  //解除锁定相关信息
        show:false,
        showReport1_page:false,
        btnAuth:{},
        users:{
          idCard: '',
          name: '',
          sex: '',
          age: '',
        },
        ShowData:{},

        fileList:[],
        formInline: {
          id:null,
          sid: 'TC10001',//受试者唯一标识值固定为TC0001
          todoId: '1', //待办id值固定为1
          colonoscopyRecordId: this.$route.query.id, //结肠镜检查记录 值固定为1
          surveyDate: new Date(),//检查日期
          item_2_1: '',//参与者是否进行了直肠指诊，1：是，2：否
          item_2_2: '',//参与者是否完成了结肠镜检查，1：是，2：否
          item_2_1_a: '',//int 有无肿块 1：有，2：无
          item_2_1_b: null,//double 肿块距肛cm
          item_2_1_c: null,//几点钟
          item_2_1_d: null,//占据肠腔 分子
          item_2_1_e: null,//占据肠腔 分母
        },

        formInline2:{
          item_3_6:[],
          item_3_7_a:null
        },
        formInline6:{
        },
        options:[
          {
            value:'1',
            label:'慢性炎性疾病'
          },
          {
            value:'2',
            label:'溃疡性结肠炎'
          },
          {
            value:'3',
            label:'克隆氏病'
          },
          {
            value:'4',
            label:'粘膜下隆起'
          },
          {
            value:'5',
            label:'息肉'
          },
          {
            value:'6',
            label:'增生性息肉'
          },
          {
            value:'7',
            label:'腺瘤性息肉'
          },
          {
            value:'8',
            label:'类癌'
          },
          {
            value:'9',
            label:'癌'
          },
        ],
        lesionsRecordList:[{}],// 其他病变
        requireRule : { required: true, message: '请输入', trigger: 'change' },
        rules2:{
          'item_3_1': [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          'item_3_2': [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          'item_2_1': [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          'item_2_2': [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          'item_2_1_a': [
            { required: true, message: '请选择', trigger: 'change' },
            { message: '', trigger: 'change', validator: item_2_1_a}
          ],
          'item_2_1_b': [
            { message: '', trigger: 'change', validator: item_2_1_b_change},
            { message: '', trigger: 'blur', validator: item_2_1_b_blur}
          ],
          'item_2_1_c': [
            { message: '', trigger: 'change,blur', validator: item_2_1_c}
          ],
          'item_2_1_d': [
            { message: '', trigger: 'change,blur', validator: item_2_1_d}
          ],
          'item_2_1_e': [
            { message: '', trigger: 'change,blur', validator: item_2_1_e}
          ]
        },
        formvalidate3rules: {
          'item_3_1': [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          'item_3_2': [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          'item_3_3': [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          'item_3_4': [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          'item_3_5': [
            { required: true, message: '请输入', trigger: 'change'},
            { message: '请输入非负数', trigger: 'change',validator:item_3_5 }
          ],
          'item_3_7': [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          'item_3_8': [
            { required: true, message: '请选择', trigger: 'change' },
//            { message: '', trigger: 'change', validator: item_3_8}
          ],
          'item_3_8_other': [
            {message: '请输入', trigger: 'change',validator:ifneedothers }
          ],
          'item_3_6': [
            { required: true, message: '请选择', trigger: 'change'},
            { message: '', trigger: 'change', validator: item_3_6}
          ],
          'item_3_6_3_1': [
            { message: '请输入', trigger: 'change' ,validator:item_3_6_3_1},
            { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'change'}
          ],
          'item_3_6_3_2': [
            { message: '请输入', trigger: 'change',validator:item_3_6_3_2 },
            { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'change'}
          ],
          'item_3_7_a': [
            { message: '请输入', trigger: 'change'},
            {validator:validateItem_3_7_a, message: '个数: 1 - 20 个', }
          ],
        },
        lesionsRecordRule: {
          'item1': [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          'item2': [
            { required: true, message: '请输入', trigger: 'change' },
            { message: '请输入非负数', trigger: 'blur',validator:oneDecimaljglm }
          ],
          'item3': [
            { required: true, message: '请输入', trigger: 'change' }
          ],
          'item4': [
            { required: false, message: '请输入', trigger: 'change' }
          ],
          'item5': [
            { required: true, message: '请输入', trigger: 'change' },
            { message: '直径(0.1-10)厘米', trigger: 'blur',validator:oneDecimalzdzz }
          ],
          'item6': [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          'item7': [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          'item8': [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          'item9': [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          'item10': [
            { required: true, message: '请选择', trigger: 'change' }
          ]
        },
        formvalidate4rules:{
          'otherLesions': [
            { required: true, message: '请输入', trigger: 'change' }
          ],
          'endoscopicDiagnosis': [
            { required: true, message: '请输入', trigger: 'change' }
          ],
          'diagnosisDoctor': [
            { required: true, message: '请输入', trigger: 'change' }
          ],
          'pathology': [
            { required: true, message: '请选择', trigger: 'change' }
          ]
        },
        partmentoptions: [{
          value: '1',
          label: '回肠末端'
        }, {
          value: '2',
          label: '回盲瓣'
        }, {
          value: '3',
          label: '升结肠'
        }, {
          value: '4',
          label: '肝曲'
        }, {
          value: '5',
          label: '横结肠'
        }, {
          value: '6',
          label: '脾曲'
        }, {
          value: '7',
          label: '降结肠'
        }, {
          value: '8',
          label: '降乙交界'
        }, {
          value: '9',
          label: '乙状结肠'
        }, {
          value: '10',
          label: '直乙交界'
        }, {
          value: '11',
          label: '直肠'
        }]
      }
    },
    watch:{
//       'formInline.pathology':{
//         handler(val,oldVal){
//           if(val == '1'){
//             this.rules3 = this.rules
//           }else{
//             this.rules3 = {}
//           }
//         },
//         deep:true
//       }
    },
    components:{
      seePics,
      approvalDialog
    },
    created() {
      let obj = this.checkPageAuth(this,"showReport1_page",this.btnAuth)
      this.formInline.sid = this.$route.query.sid;
      this.formInline.id = this.$route.query.id
      this.show = this.$route.query.show
      this.queryDetail()
      if(this.show){
        this.queryInfo()
        this.rules2 = {}
        this.formvalidate3rules = {}
        this.lesionsRecordRule = {}
        this.formvalidate4rules = {}
      }
    },
    methods:{
      //查询user
      queryDetail(){
        $axios_http({
          url: "/base/hospital/person/info/get/"+this.formInline.sid,
          data: {},
          vueObj: this
        }).then((res) => {
          this.users = res.data.data
          this.users.age =  this.users.age+'岁'
          this.users.sex =  (this.users.sex==1?'男':'女')
        })
      },
      queryInfo(){
        $axios_http({
          url:'/base/colonoscopy/result/queryColonoscopyResult',
          data:{
            sid:this.formInline.sid,
            id:this.formInline.id,

          },
          vueObj:this
        }).then((res)=> {
          const dd = res.data.data
          this.ShowData = res.data.data
          this.formInline.surveyDate = dd.surveyDate
          if(dd.fileUploads){
            dd.fileUploads.filter(item=>{
              item.filePath=SERVER_NAME + '/base/dnafile/downFile?filePath=' + item.filePath
            })
            this.fileList=dd.fileUploads
          }
          this.formInline.item_2_1 = dd.item_2_1+''
          this.formInline.item_2_2 = dd.item_2_2+''
          this.formInline.item_2_1_a = dd.item_2_1_a+''
          this.formInline.item_2_1_b = dd.item_2_1_b
          this.formInline.item_2_1_c = dd.item_2_1_c
          this.formInline.item_2_1_d = dd.item_2_1_d
          this.formInline.item_2_1_e = dd.item_2_1_e

          this.formInline2.item_3_1 = dd.item_3_1+''
          this.formInline2.item_3_2 = dd.item_3_2+''
          this.formInline2.item_3_3 = dd.item_3_3+''
          this.formInline2.item_3_4 = dd.item_3_4+''
          this.formInline2.item_3_5 = dd.item_3_5+''
          this.formInline2.item_3_6 = []
          if(dd.item_3_6_1 == '1'){
            this.formInline2.item_3_6.push('1')
          }
          if(dd.item_3_6_2 == '1'){
            this.formInline2.item_3_6.push('2')
          }
          if(dd.item_3_6_3 == '1'){
            this.formInline2.item_3_6.push('3')
          }
          if(dd.item_3_6_4 == '1'){
            this.formInline2.item_3_6.push('4')
          }
          this.formInline2.item_3_6_3_1 = dd.item_3_6_3_1
          this.formInline2.item_3_6_3_2 = dd.item_3_6_3_2
          this.formInline2.item_3_6_4_other = dd.item_3_6_4_other
          this.formInline2.item_3_7 = dd.item_3_7+''
          this.formInline2.item_3_7_a = dd.item_3_7_a
          this.formInline2.item_3_8 = dd.item_3_8+''
          this.formInline2.item_3_8_other = dd.item_3_8_other

          this.formInline6.diagnosisDoctor = dd.diagnosisDoctor
          this.formInline6.endoscopicDiagnosis = dd.endoscopicDiagnosis
          this.formInline6.otherLesions = dd.otherLesions
          this.formInline6.pathology = dd.pathology+''

          this.lesionsRecordList = dd.lesionsRecordList
          if(this.lesionsRecordList.length){
            this.lesionsRecordList.forEach(function(item){
              for(var i in item){
                if(item[i]){
                  item[i] = item[i]+''
                }else{
                  item[i] = ''
                }
              }
            })
          }
        })
      },
      addbbFun(){// 添加病变部位//最多6个//对应数据：lesionsRecordList
        if(this.lesionsRecordList.length>=6){
          this.$alert('您最多可添加6个表格', '提示', {
            confirmButtonText: '确定',
            callback: action => {
            }
          });
        }else{
          this.lesionsRecordList.push({})
        }
      },
      removeOther(index){// 删除病变部位
        this.lesionsRecordList.splice(index,1)
      },
      clearFiled(type){ // 清空表单 type为空时清空所有
        if(!type){
          this.$refs.formInline.resetFields() // 二、直肠指诊
          // this.$refs.formInline7.resetFields() // 是否做了病理:
          this.$set(this.formInline,['surveyDate'],new Date()) // 重置日期
        }
        if(this.$refs.formInline4){
          this.$refs.formInline4.resetFields() // 其它病变 内镜下诊断 诊断医生
        }
        // 三、肠镜检查结果
        this.formInline2 = {item_3_6:[]}
        if(this.$refs.formvalidate3){
          this.$nextTick(function(){ // 视图更新完成之后再移除校验
            this.$refs.formvalidate3.clearValidate()
          })
        }
        // 病变部位们 --直接用resetFields会导致单选不更新视图，所以单独清空数据和验证
        this.lesionsRecordList = [{}]
        if(this.$refs.lesionsRecordForm && this.$refs.lesionsRecordForm.length){ // 病变部位们
          this.$refs.lesionsRecordForm.forEach(function(item){
            item.clearValidate()
          })
        }
        this.formInline6.pathology = ''
      },
      submit(){ //提交
        const that = this

        // 验证form
        let validd = true
        this.$refs.formInline.validate((valid) => {
          if (!valid){
            validd = false
          }
        })
        if(that.formInline.item_2_2 == '1'){// 参与者完成了结肠镜检查
          this.$refs.formvalidate3.validate((valid) => {
            if (!valid){
              validd = false
            }
          })
          this.$refs.formInline4.validate((valid) => {
            if (!valid){
              validd = false
            }
          })
          if(this.$refs.lesionsRecordForm && this.$refs.lesionsRecordForm.length){
            this.$refs.lesionsRecordForm.forEach(function(item){
              item.validate((valid) => {
                if (!valid){
                  validd = false
                }
              })
            })
          }
        }else{
          this.clearFiled(1) //不清空formInline
        }
        if(validd){
          //给病变集合添加sid
          if(this.lesionsRecordList.length){
            this.lesionsRecordList.forEach(function (item) {
              that.$set(item ,['sid'], that.formInline.sid)
            })
          }
          //设置数据
          let dd = JSON.parse(JSON.stringify(that.formInline)) //1,2
          if(dd.item_2_1_b == null){
            delete dd.item_2_1_b
          }
          if(dd.item_2_1_c == null){
            delete dd.item_2_1_c
          }
          if(dd.item_2_1_d == null){
            delete dd.item_2_1_d
          }
          if(dd.item_2_1_e == null){
            delete dd.item_2_1_e
          }
          // dd.pathology = that.formInline7.pathology
          if(that.formInline.item_2_2 == '1'){
            dd.lesionsRecordList = JSON.parse(JSON.stringify(that.lesionsRecordList))
            dd = Object.assign(dd, this.formInline2, this.formInline6) // 合并数据
            if(dd.item_3_6.indexOf('1')>=0){ // 参与者完成了结肠镜检查
              dd.item_3_6_1 = 1
              dd.item_3_6_2 = 2
              dd.item_3_6_3 = 2
              dd.item_3_6_4 = 2
              dd.item_3_6_3_1 = ''
              dd.item_3_6_3_2 = ''
              dd.item_3_6_4_other = ''
            }else{
              dd.item_3_6_1 = 2
              if(dd.item_3_6.indexOf('2')>=0){
                dd.item_3_6_2 = 1
              }else{
                dd.item_3_6_2 = 2
              }
              if(dd.item_3_6.indexOf('3')>=0){
                dd.item_3_6_3 = 1
              }else{
                dd.item_3_6_3 = 2
              }
              if(dd.item_3_6.indexOf('4')>=0){
                dd.item_3_6_4 = 1
              }else{
                dd.item_3_6_4 = 2
              }
            }
            //删除没用的数据
            delete dd.item_3_6
          }
          // 设置时间格式
          if(dd.surveyDate.indexOf('T')>=0){
            dd.surveyDate = dd.surveyDate.split('T')[0]
          }

          $axios_http({
            url:"/base/colonoscopy/result/addColonoscopyResult",
            data:dd,
            vueObj:this
          }).then((res)=> {
            //显示操作成功浮动提示框
            $successMsg(this,"保存成功")
             this.$router.go(-1)
            //清空数据
            this.clearFiled()
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

  .lesionsRecordList {
    font-size: 20px;
    font-weight: bold;
    color: #3a8ee6;
  }

  .txsm {
    font-size: 14px;
    margin: 10px 50px;
  }
  .rightimg{
    position: absolute;
    right: -50px;
    top: -40px;
    border:1px solid #000000;
    border-width: 0 0 1px 1px;
  }
  .forminline{
    display: inline-block;
    vertical-align: middle;
    margin-top: -5px;
  }
</style>
<style>
  .mt5input .el-radio-group{
    margin-top: 5px;
  }
  .zdysinput input {
    border-width: 0 0 1px 0;
    border-radius: 0;
  }
  .zdysinputsmall input{
    border-width: 0 0 1px 0;
    border-radius: 0;
    line-height: 30px;
    height: 30px;
  }
  .j_content .el-input-group__append{
    padding:0 10px;
  }
  .j_content .el-form-item.is-error .el-input__inner,.j_content .el-form-item.is-error .el-input__inner:focus, .j_content .el-form-item.is-error .el-textarea__inner, .j_content .el-form-item.is-error .el-textarea__inner:focus, .j_content .el-message-box__input input.invalid, .j_content .el-message-box__input input.invalid:focus {
    border-color: #f56c6c !important;
  }
  .j_content .el-form-item__error {
    z-index: 9;
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
  .gray{
    color:#c0c4cc;
  }
</style>
