<template>
  <div class="j_content" v-if="cancerReport4_page">
    <div style="min-width: 941px;">
      <div class="btns">
        <el-button type="normal" size="small" class="fl" @click="goBack()">返回</el-button>
        <p class="text">表C4-结直肠癌治疗信息摘录表</p>
      </div>
      <el-form :inline="true" :model="formInline" label-width="125px" :rules="rules" ref="formInline">
      <div class="formcon">
        <div class="title">
          管理部分
        </div>
        <div class="tables">
            <el-row>
              <el-form-item label="摘录目的:" class="formoneline" prop="excerptPurpose">
                 <el-radio-group v-model="formInline.excerptPurpose" :disabled="$route.query.flag==0">
                  <el-radio :label="1">初次摘录</el-radio>
                  <el-radio :label="2">为质量保证（QA）再次摘录</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col :span="8">
                 <el-form-item label="sid:" class="formoneline">
                   {{$route.query.sid}}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                 <el-form-item label="筛查现场ID:" class="formoneline">
                   {{base.siteId | siteId}}
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
                 <el-form-item label="填表日期:" class="formoneline" prop="tbTableDateToString">
                   <el-date-picker 
                               :clearable="false"
                               :disabled="$route.query.flag==0"
                               v-model="formInline.tbTableDateToString"
                               type="date"
                               format="yyyy年MM月dd日"
                               value-format="yyyy-MM-dd"
                               placeholder="选择日期"
                               :picker-options="pickerOptions1">
              </el-date-picker>
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
                 <el-form-item label="检查年份:" class="formoneline" prop="checkYears">
                   <el-date-picker
                   :clearable="false"
                    :disabled="$route.query.flag==0"
                    v-model="formInline.checkYears"
                    type="year"
                    format="yyyy年"
                    value-format="yyyy"
                    placeholder="选择年"
                    :picker-options="pickerOptions2">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                 <el-form-item label="质控者:" class="formoneline" prop="qualityControlPerson">
                   <el-input type="text" v-model.trim="formInline.qualityControlPerson" maxlength="18" :disabled="$route.query.flag==0"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
        </div>
      </div>
      <div class="formcon">
        <div class="title">
          A部分：原发性结直肠癌初始治疗
        </div>
        <div class="tables tablesPartTwo">
            <p class="pTitle">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="requiredLabel">*</span>&nbsp;1. 原发性结直肠癌的外科治疗:</p>
            <el-form-item label="" class="formoneline" prop="item1">
              <el-radio-group v-model="formInline.item1" :disabled="$route.query.flag==0">
                <el-radio :label="2">否</el-radio>
                <el-radio :label="1">是</el-radio>
                <el-radio :label="3">不知道</el-radio>
              </el-radio-group>
            </el-form-item>
            <table class="j_table cancerTable" v-if="formInline.item1==1">
                    <tr class="title" style="display:block">
                      
                      <th width="280" rowspan="2">外科操作代码&nbsp;&nbsp;
                        <el-popover
                          placement="top"
                          width="300"
                          trigger="click">
                            <!-- 提示信息 -->
                            <div class="bbsm">
                              <h1>外科操作代码</h1>
                              <p class="txsm">01 =局部切除术(包括经肛局部切除术)</p>
                              <p class="txsm">03=外科切除及吻合术</p>
                              <p class="txsm">04=外科切除及造口术</p>
                              <p class="txsm">06=旁路手术或姑息性切除</p>
                              <p class="txsm">07=冷冻术</p>
                              <p class="txsm">08=淋巴结清扫/淋巴结取样</p>
                              <p class="txsm">09=阑尾切除术(仅对原发性阑尾肿瘤)</p>
                              <p class="txsm">10=消融术</p>
                              <p class="txsm">88=其它</p>
                            </div>
                          <el-button slot="reference" type="text">外科操作代码</el-button>
                        </el-popover>
                      </th>
                      <th width="191" rowspan="2">完成日期</th>
                      <th width="100" rowspan="2">操作</th>
                    </tr>
                    <div v-for="(x,index) in formInline.hospitalCancerSurgicalOperationVos" :key="index">
                      <el-form :inline="true" :model="x" class="demo-form-inline" :ref="'formInlinelistFirst'+index" style="display:table-row-group;" :rules="formInlinelistFirst">
                        <tr>
                            <td width="280">
                              <el-form-item label=" " prop="surgicalOperationCode">
                                <el-input v-model.trim="x.surgicalOperationCode"  size="small" style="width:50px;" :disabled="$route.query.flag==0"></el-input>
                              </el-form-item>
                              <el-form-item label=" " prop="surgicalOperationCodeOther" v-if="x.surgicalOperationCode==88">
                                <el-input v-model.trim="x.surgicalOperationCodeOther"  size="small"  style="width:150px;" maxlength="50" :disabled="$route.query.flag==0"></el-input>
                              </el-form-item>
                            </td>
                            <td width="180">
                              <el-form-item label="">
                                <el-date-picker 
                                  width="150px"
                                  :clearable="false"
                                   :disabled="$route.query.flag==0"
                                  v-model="x.finshDateToString"
                                  size="small"
                                  type="date"
                                  format="yyyy年MM月dd日"
                                  value-format="yyyy-MM-dd"
                                  placeholder="选择日期"
                                  :picker-options="pickerOptions1">
                                </el-date-picker>
                              </el-form-item>
                            </td>
                            <td width="100">
                              <el-button type="text" size="small" @click="del(index)" v-if="delBtnShow && $route.query.flag!=0">删除</el-button>
                            </td>
                        </tr>
                      </el-form>
                    </div>
                  </table>
                  <div  v-if="$route.query.flag!=0 && formInline.item1==1">
                    <el-button type="primary"  size="small" class="addBtn" @click="add"><i class="el-icon-plus"></i>添加记录</el-button>
                  </div>
            <el-row>
              <p class="pTitle">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="requiredLabel">*</span>&nbsp;2. 手术后是否有残留肿瘤组织（由注册肿瘤登记员CTR填写）:</p>
              <el-form-item label="" class="formoneline" prop="item2">
                <el-radio-group v-model="formInline.item2" :disabled="$route.query.flag==0">
                  <el-radio :label="2">否</el-radio>
                  <el-radio :label="1">是—镜下残留</el-radio>
                  <el-radio :label="3">是—肉眼残留</el-radio>
                  <el-radio :label="4">不详</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="CTR编号#" class="formoneline" prop="item21" style="padding-left:40px;">
                <el-input type="text" v-model.trim="formInline.item21" maxlength="18" :disabled="$route.query.flag==0"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <p class="pTitle">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="requiredLabel">*</span>&nbsp;3. 原发性结直肠癌的放疗:</p>
              <el-form-item label="" class="formoneline" prop="item3">
                <el-radio-group v-model="formInline.item3" :disabled="$route.query.flag==0">
                  <el-radio :label="2">否</el-radio>
                  <el-radio :label="1">是（填写放疗开始日期）</el-radio>
                  <el-radio :label="3">不详</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="化疗开始日期：" class="formoneline" prop="item31ToString" style="padding-left:40px;" v-if="formInline.item3==1">
                <el-date-picker 
                               :clearable="false"
                                :disabled="$route.query.flag==0"
                               v-model="formInline.item31ToString"
                               type="date"
                               format="yyyy年MM月dd日"
                               value-format="yyyy-MM-dd"
                               placeholder="选择日期"
                               :picker-options="pickerOptions1">
              </el-date-picker>
              </el-form-item>
            </el-row>
            <el-row>
              <p class="pTitle">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="requiredLabel">*</span>&nbsp;4. 原发性结直肠癌的全身化疗:</p>
              <el-form-item label="" class="formoneline" prop="item4">
                <el-radio-group v-model="formInline.item4" :disabled="$route.query.flag==0">
                  <el-radio :label="2">否</el-radio>
                  <el-radio :label="1">是（填写放疗开始日期）</el-radio>
                  <el-radio :label="3">不详</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="化疗开始日期：" class="formoneline" prop="item41ToString" style="padding-left:40px;" v-if="formInline.item4==1">
                <el-date-picker 
                               :clearable="false"
                                :disabled="$route.query.flag==0"
                               v-model="formInline.item41ToString"
                               type="date"
                               format="yyyy年MM月dd日"
                               value-format="yyyy-MM-dd"
                               placeholder="选择日期"
                               :picker-options="pickerOptions1">
              </el-date-picker>
              </el-form-item>
            </el-row>
            <el-row>
              <p class="pTitle">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="requiredLabel">*</span>&nbsp;5. 原发性结直肠癌的其他治疗:</p>
              <el-form-item label="" class="formoneline" prop="item5">
                <el-radio-group v-model="formInline.item5" :disabled="$route.query.flag==0">
                  <el-radio :label="2">否</el-radio>
                  <el-radio :label="1">是（填写开始日期）</el-radio>
                  <el-radio :label="3">不详</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="开始日期：" class="formoneline" prop="item51ToString" style="padding-left:40px;" v-if="formInline.item5==1">
                <el-date-picker 
                               :clearable="false"
                                :disabled="$route.query.flag==0"
                               v-model="formInline.item51ToString"
                               type="date"
                               format="yyyy年MM月dd日"
                               value-format="yyyy-MM-dd"
                               placeholder="选择日期"
                               :picker-options="pickerOptions1">
              </el-date-picker>
              </el-form-item>
            </el-row>
        </div>
      </div>
      <div class="formcon">
        <div class="title">
          B部分：评价/备注
        </div>
        <div class="tables">
          <el-row>
              <el-form-item label="6. 评价:" class="formoneline" prop="item5" label-width="93px">
                 <el-radio-group v-model="formInline.item6" :disabled="$route.query.flag==0">
                  <el-radio :label="2">否</el-radio>
                  <el-radio :label="1">是，请在下表详细说明</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
             <table class="j_table cancerTable evaluate" style="padding-left:80px;" v-if="formInline.item6==1">
              <tr class="title">
                <th width="200">内容方面</th>
                <th width="400">评价/备注</th>
              </tr>
              <tr>
                <td>
                  <el-form-item label="" class="formoneline" prop="item61">
                    <el-input type="text" v-model.trim="formInline.item61" :disabled="$route.query.flag==0" maxlength="1000"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="" class="formoneline" prop="item62">
                    <el-input type="textarea" v-model.trim="formInline.item62" maxlength="1000" style="width:400px" :disabled="$route.query.flag==0"></el-input>
                  </el-form-item>
                </td>
              </tr>
            </table>
        </div>
      </div>
      <div class="formcon">
        <div class="title">
          C部分：治疗医生及医疗机构信息
        </div>
        <div class="tables" style="overflow:auto;">
          <table>
            <tr>
              <td  >
                <ul class="ulTitle ulTitleFirst" style="width:200px;">
                  <li><span class="requiredLabel">*</span>治疗医生姓名</li>
                  <li><span class="requiredLabel">*</span>所在医疗机构名称</li>
                  <li><span class="requiredLabel">*</span>地址</li>
                  <li><span class="requiredLabel">*</span>邮编</li>
                  <li><span class="requiredLabel">*</span>传真</li>
                  <li><span class="requiredLabel">*</span>电话1</li>
                  <li><span class="requiredLabel">*</span>电话2</li>
                  <li><span class="requiredLabel">*</span>病历号</li>
                  <li>操作</li>
                </ul>
              </td>
              <td v-for="(x,index) in formInline.hospitalCancerTreatmentInformationVos" style="width:250px;">
                      <el-form :inline="true" :model="x" class="demo-form-inline" :ref="'formInlinelist'+index" :rules="formInlinelist">
                        <ul class="ulTitle" style="width:250px;">
                          <li>
                            <el-form-item label="" class="formoneline" prop="doctorName">
                              <el-input type="text" v-model.trim="x.doctorName" maxlength="18" :disabled="$route.query.flag==0"></el-input>
                            </el-form-item>
                          </li>
                           <li>
                            <el-form-item label="" class="formoneline" prop="medicalInstitutionName">
                              <el-input type="text" v-model.trim="x.medicalInstitutionName" maxlength="50" :disabled="$route.query.flag==0"></el-input>
                            </el-form-item>
                          </li>
                           <li>
                            <el-form-item label="" class="formoneline" prop="address">
                              <el-input type="text" v-model.trim="x.address" maxlength="50" :disabled="$route.query.flag==0"></el-input>
                            </el-form-item>
                          </li>
                           <li>
                            <el-form-item label="" class="formoneline" prop="email">
                              <el-input type="text" v-model.trim="x.email" maxlength="11" :disabled="$route.query.flag==0"></el-input>
                            </el-form-item>
                          </li>
                           <li>
                            <el-form-item label="" class="formoneline" prop="fax">
                              <el-input type="text" v-model.trim="x.fax" maxlength="18" :disabled="$route.query.flag==0"></el-input>
                            </el-form-item>
                          </li>
                           <li>
                            <el-form-item label="" class="formoneline" prop="telPhone1">
                              <el-input type="text" v-model.trim="x.telPhone1" maxlength="18" :disabled="$route.query.flag==0"></el-input>
                            </el-form-item>
                          </li>
                           <li>
                            <el-form-item label="" class="formoneline" prop="telPhone2">
                              <el-input type="text" v-model.trim="x.telPhone2" maxlength="18" :disabled="$route.query.flag==0"></el-input>
                            </el-form-item>
                          </li>
                          <li>
                            <el-form-item label="" class="formoneline" prop="blNumber">
                              <el-input type="text" v-model.trim="x.blNumber" maxlength="18" :disabled="$route.query.flag==0"></el-input>
                            </el-form-item>
                          </li>
                          <li>
                            <el-button type="text" size="small" @click="del02(index)" v-if="delBtnShow02 && $route.query.flag!=0">删除</el-button>
                          </li>
                        </ul>
                      </el-form>
              </td>
            </tr>
          </table>
        </div>
        <div style="margin-left:50px;margin-bottom:10px;" v-if="$route.query.flag!=0">
          <el-button type="primary"  size="small" @click="add02"><i class="el-icon-plus"></i>添加记录</el-button>
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
        if (value && !(/^(01|03|04|06|07|08|09|10|88)+$/.test(value))) {
          callback(new Error('编码错误'))
        }else {
          callback();
        }
      };
       const item1_d = (rule, value, callback) => {
        if (value && !(/^[0-9]+$/.test(value))) {
          callback(new Error('请输入11位以内的数字'))
        }else {
          callback();
        }
      };
       const item1_e = (rule, value, callback) => {
        if (value && !(/^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、0-9A-Za-z]+$/.test(value))) {
          callback(new Error('请输入18个以内的数字、字母及符号的组合'))
        }else {
          callback();
        }
      };
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
        formInline:{
          tbTableDateToString:new Date(),       //填表日期
          investigatorCode:null,     //人员编码
          checkYears:new Date(),
          tbTablePerson:null,     //填表人
          qualityControlPerson:null,      //质控者
          excerptPurpose:null,
          item1:null,
          item2:null,
          item21:null,
          item3:null,
          item31ToString:new Date(),
          item4:null,
          item41ToString:new Date(),
          item5:null,
          item51ToString:new Date(),
          item6:null,
          item61:null,
          item62:null,
          hospitalCancerSurgicalOperationVos:[{
            finshDateToString:new Date(),
            surgicalOperationCode:null,
            surgicalOperationCodeOther:null
          }],
          hospitalCancerTreatmentInformationVos:[{}],
        },
       rules:{
         checkYears:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
         tbTableDateToString:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
         investigatorCode:[
            { required: true, message: '必填', trigger: 'blur' },
            // { message: '请输入50个以内的数字、字母、中文及符号组合', trigger: 'blur', validator: item1_a}
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
          item1:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item2:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item21:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item3:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item31ToString:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item4:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item41ToString:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item5:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item51ToString:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item6:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item61:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          item62:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
       },
       formInlinelistFirst:{
         surgicalOperationCode:[
            { required: true, message: '必填', trigger: 'blur' },
            { message: '编码错误', trigger: 'blur', validator: item1_c}
          ],
         surgicalOperationCodeOther:[
            { required: true, message: '必填', trigger: 'blur' },
          ]
       },
        formInlinelist:{
          item4:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          doctorName:[
            { required: true, message: '必填', trigger: 'blur' },
            { message: '请输入18个以内的汉字', trigger: 'blur', validator: item1_b}
          ],
          medicalInstitutionName:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          address:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          email:[
            { required: true, message: '必填', trigger: 'blur' },
            { message: '请输入11位以内的数字', trigger: 'blur', validator: item1_d}
          ],
          blNumber:[
            { message: '请输入18个以内的数字、字母及符号的组合', trigger: 'blur', validator: item1_e},
            { required: true, message: '必填', trigger: 'blur' },
          ],
          fax:[
             { required: true, message: '必填', trigger: 'blur' },
            { message: '请输入18个以内的数字、字母及符号的组合', trigger: 'blur', validator: item1_e}
          ],
          telPhone1:[
            { required: true, message: '必填', trigger: 'blur' },
            { message: '请输入18个以内的数字、字母及符号的组合', trigger: 'blur', validator: item1_e}
          ],
          telPhone2:[
            { required: true, message: '必填', trigger: 'blur' },
            { message: '请输入18个以内的数字、字母及符号的组合', trigger: 'blur', validator: item1_e}
          ]
       }
      }
    },
    created() {
      let obj = this.checkPageAuth(this,"cancerReport4_page",this.btnAuth);
      this.getCustomerInfo();
       if(this.$route.query.flag==0 || this.$route.query.flag==2 ){
        // 0-查看  1-录入  2-编辑
        this.queryreportbyid();
      }else{
        // 录入
      }
      // 控制删除按钮显示隐藏
      if(this.formInline.hospitalCancerSurgicalOperationVos.length==1){
        this.delBtnShow=false;
      }else{
        this.delBtnShow=true;
      }
      if(this.formInline.hospitalCancerTreatmentInformationVos.length==1){
        this.delBtnShow02=false;
      }else{
        this.delBtnShow02=true;
      }
    },
    methods:{
      add(){// 添加癌症信息
        this.formInline.hospitalCancerSurgicalOperationVos.push({
		finshDateToString:new Date(),
    surgicalOperationCode:null,
    surgicalOperationCodeOther:null
	});
        // 控制删除按钮显示隐藏
        this.delBtnShow=true;
      },
      add02(){// 添加癌症信息
        this.formInline.hospitalCancerTreatmentInformationVos.push({});
        // 控制删除按钮显示隐藏
        this.delBtnShow02=true;
      },
      del(index){// 删除癌症信息
        // 控制删除按钮显示隐藏
        if(this.formInline.hospitalCancerSurgicalOperationVos.length<=2){
          this.delBtnShow=false;
        }
        this.formInline.hospitalCancerSurgicalOperationVos.splice(index,1)
      },
      del02(index){// 删除癌症信息
        // 控制删除按钮显示隐藏
        if(this.formInline.hospitalCancerTreatmentInformationVos.length<=2){
          this.delBtnShow02=false;
        }
        this.formInline.hospitalCancerTreatmentInformationVos.splice(index,1)
      },
      submit(){ //提交
          let validd = true
          this.$refs.formInline.validate((valid) => {
          if (!valid){
            validd = false
          }
          if(this.formInline.item1==1 && this.formInline.hospitalCancerSurgicalOperationVos){
            for(var i=0;i<this.formInline.hospitalCancerSurgicalOperationVos.length;i++){
              this.$refs['formInlinelistFirst'+i][0].validate((valid) => {
                if (!valid){
                  validd = false
                }
              })
            }
        }
         if(this.formInline.hospitalCancerTreatmentInformationVos.length){
          for(var i=0;i<this.formInline.hospitalCancerTreatmentInformationVos.length;i++){
            this.$refs['formInlinelist'+i][0].validate((valid) => {
              if (!valid){
                validd = false
              }
            })
          }
        }
          if(validd){
             let dd = this.formInline //1,2
             // 设置时间格式
             if(typeof dd.checkYears=='object'){
               dd.checkYears = dd.checkYears.getFullYear()+''
             }
             if(typeof dd.tbTableDateToString=='object'){
               dd.tbTableDateToString=dateFormater.dateFormater(dd.tbTableDateToString)
             }
             if(typeof dd.item31ToString=='object'){
               dd.item31ToString=dateFormater.dateFormater(dd.item31ToString)
             }
             if(typeof dd.item41ToString=='object'){
               dd.item41ToString=dateFormater.dateFormater(dd.item41ToString)
             }
             if(typeof dd.item51ToString=='object'){
               dd.item51ToString=dateFormater.dateFormater(dd.item51ToString)
             }
             if(dd.item1==1){
                dd.hospitalCancerSurgicalOperationVos.filter(item=>{
                  if(typeof item.finshDateToString=='object'){
                  item.finshDateToString=dateFormater.dateFormater(item.finshDateToString)
                }
                })
             }
            // 删除题目关联隐藏的字段
            if(dd.item1!=1){
              delete dd.hospitalCancerSurgicalOperationVos;
            }
            if(dd.item3!=1){
              delete dd.item31ToString;
            }
            if(dd.item4!=1){
              delete dd.item41ToString;
            }
            if(dd.item5!=1){
              delete dd.item51ToString;
            }
            if(dd.item6!=1){
              delete dd.item61;
            }
            if(dd.item6!=1){
              delete dd.item62;
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
              delete dd.item31;
              delete dd.item41;
              delete dd.item51;
              delete dd.stage;
              delete dd.tbTableDate;
              delete dd.updateTime;
              if(dd.item1 && dd.item1==1){
                 dd.hospitalCancerSurgicalOperationVos.filter(item=>{
                  delete item.colorectalCancerTreatmentInformationId;
                  delete item.dateCreated;
                  delete item.finshDate;
                  delete item.id;
                  delete item.updateTime;
              })
              }
             dd.hospitalCancerTreatmentInformationVos.filter(item=>{
                delete item.colorectalCancerTreatmentInformationId;
                delete item.id;
            })

            }
             let _url='';
            if(this.$route.query.flag==1){
              _url="/base/hospital/cancer/addTreatmentInformation"
            }else{
              _url='/base/hospital/cancer/updatereportC4'
            }
            console.log(dd);
             $axios_http({
              url:_url,
              data: dd,
              vueObj: this
            }).then((res) => {
              this.$message({
                 type: 'success',
                 message: '提交成功!'
               });
              //  resource 0-来源待办   1-来源终点事件管理列表
               if(this.$route.query.resource==0){
                 this.$router.push("/home/uncompletedEventList");
               }else if(this.$route.query.resource==1){
                  this.$router.push("/event/eventList4");
               }
             
            })
            
          }
        })
      },
      cancel(){
        if(this.$route.query.resource==0){
                 this.$router.push("/home/uncompletedEventList");
               }else if(this.$route.query.resource==1){
                  this.$router.push("/event/eventList4");
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
          url: "/base/hospital/cancer/report/queryreportC4byid",
          data: {
            id:this.$route.query.id,
          },
          vueObj: this
        }).then((res) => {
          this.formInline=res.data.data;
          //设置默认值
          if(!this.formInline.hospitalCancerSurgicalOperationVos){
              this.formInline.hospitalCancerSurgicalOperationVos=[{
              finshDateToString:new Date(),
              surgicalOperationCode:null,
              surgicalOperationCodeOther:null
            }]
          }
          if(!this.formInline.item31ToString){
            this.formInline.item31ToString=new Date()
          }
           if(!this.formInline.item41ToString){
            this.formInline.item41ToString=new Date()
          }
           if(!this.formInline.item51ToString){
            this.formInline.item51ToString=new Date()
          }
           // 控制删除按钮显示隐藏
          if(this.formInline.hospitalCancerSurgicalOperationVos.length==1){
            this.delBtnShow=false;
          }else{
            this.delBtnShow=true;
          }
          if(this.formInline.hospitalCancerTreatmentInformationVos.length==1){
            this.delBtnShow02=false;
          }else{
            this.delBtnShow02=true;
          }
        })
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
   .cancerTable td:nth-child(1){
      text-align: left;
   }
    .cancerTable td{
    border-top:0;
  }
   .cancerTable .el-form-item{
     margin:0 0 5px 0;
     padding:0 5px;
   }
  .requiredLabel{
    color: #f56c6c;
  }
    .tables .el-checkbox-group,.tablesPartTwo .el-radio-group{
    padding-left:40px;
    height: auto;
  }
  .pTitle{
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    font-weight: bold;
  }
  .tables .el-checkbox-group{
    padding-left:40px;
    height: auto;
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
    margin-left: 100px;
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
    height: 56px;
    line-height: 56px;
    border-right:1px solid #e0dcdc;
    border-top:1px solid #e0dcdc;
    padding: 0 10px;
    vertical-align: middle;
  }
  .ulTitleFirst li{
     border-left:1px solid #e0dcdc;
     background: #f3f3f3;
  }
  .ulTitle li:last-child{
    border-bottom:1px solid #e0dcdc;
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

