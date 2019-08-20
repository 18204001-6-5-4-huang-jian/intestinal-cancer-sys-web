<template>
    <div class="j_content" v-if="follow_up_a3_page">
        <div style="min-width: 941px;">
             <div class="btns">
                <el-button type="normal" size="small" class="fl" @click="goBack()">返回</el-button>
                <p class="text">表A3：年度信息更新表</p>
            </div>
          <div class="formcon">
                 <div class="title">
                    基本信息
                  </div>
          <div class="tables">
          <el-form :inline="true" :model="formInline" label-width="115px" :rules="rules" ref="formInline">
            <el-row>
              <el-col :span="8">
                 <el-form-item label="SID:" class="formoneline">
                   {{base.sid}}
                </el-form-item>
              </el-col>
               <el-col :span="8">
                    <el-form-item label="筛查现场ID:" class="formoneline">
                      {{base.siteId | siteId}}
                    </el-form-item>
               </el-col>
                <el-col :span="8">
                     <el-form-item label="填表日期:" class="formoneline" prop="tbTableDate">
                   <el-date-picker 
                               :clearable="false"
                               :disabled="$route.query.flag==0"
                               v-model="formInline.tbTableDate"
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
                   <el-form-item label="工作人员编码:" class="formoneline"  prop="investigatorCode">
                         <el-input type="text" v-model.trim="formInline.investigatorCode" :disabled="$route.query.flag==0" maxlength="20"></el-input>
                     </el-form-item> 
              </el-col>
                  <el-col :span="8">
                    <el-form-item label="填表人:" class="formoneline" prop="tbTablePerson">
                    <el-input type="text" v-model.trim="formInline.tbTablePerson" :disabled="$route.query.flag==0" maxlength="20"></el-input>
                    </el-form-item>
                </el-col>
              <el-col :span="8">
                 <el-form-item label="质控者:" class="formoneline" prop="qualityControlPerson">
                   <el-input type="text" v-model.trim="formInline.qualityControlPerson" :disabled="$route.query.flag==0" maxlength="20"></el-input>
                </el-form-item>
              </el-col>
             </el-row>
              <el-row>
                <el-col :span="8">
                <el-form-item label="研究年份:" class="formoneline" prop="checkYears">
                   <el-date-picker
                    :clearable="false"
                    :disabled="$route.query.flag==0"
                    v-model="formInline.checkYears"
                    type="year"
                    format="yyyy年"
                    value-format="yyyy"
                    placeholder="选择年份"
                    :picker-options="pickerOptions2">
                  </el-date-picker>
                </el-form-item>
                </el-col>
                <el-col :span="8">
                   <el-form-item label="姓名:" class="formoneline">
                     {{base.name}}
                </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="性别:" class="formoneline">
                    {{base.sex | reverseSex}}
                </el-form-item>
                </el-col>
              </el-row>
               <el-row>
                <el-col :span="8">
                  <el-form-item label="年龄:" class="formoneline">
                    {{base.age}}
                </el-form-item>
                </el-col>
               </el-row>
               </el-form>
              </div>
          </div>
           <div class="formcon">
            <div class="title">
                    我们需要了解您初次参加本筛查项目到今天为止所有的医疗活动。请尽量回答以下问题，如果您记不清具体的日期，请填写大概日期。
                </div>
              <div class="tables">
                 <el-form :inline="true" :model="formInline1"  :rules="rules1" ref="formInline1">
                  <el-row>
                    <p class="pTitle"><span class="requiredLabel">*</span>&nbsp;1.从您第一次参加本筛查项目至今，您是否被诊断为癌症？</p>
                    <el-form-item label="" class="formoneline" prop="item1">
                        <el-radio-group v-model="formInline1.item1" :disabled="$route.query.flag==0">
                          <el-radio :label="1">1、是</el-radio>
                          <el-radio :label="2">2、否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                  </el-row>
                  <el-row v-if="formInline1.item1 == 1">
                      <p class="pTitle"><span class="requiredLabel"></span>&nbsp;2.您被诊断为哪种癌症？</p>
                      <el-form-item label="肿瘤类型或部位A:" class="formoneline_ first" prop="item2">
                        <el-input v-model.trim="formInline1.item2"  size="small" :disabled="$route.query.flag==0" maxlength="30"></el-input>
                     </el-form-item>
                     <el-form-item label="肿瘤诊断日期:" class="formoneline_ first" prop="item2_date">
                         <el-date-picker
                            :disabled="$route.query.flag==0"
                            v-model="formInline1.item2_date"
                            type="datetimerange"
                            class="filter-item"
                            range-separator="到"
                            size="small"
                            :picker-options="pickerOptions"
                            align="right"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="选择时间范围">
                          </el-date-picker>
                     </el-form-item>
                      <el-form-item label="肿瘤诊断医院:" class="formoneline_ first" prop="item2Hospital">
                        <el-input v-model.trim="formInline1.item2Hospital" :disabled="$route.query.flag==0" size="small" maxlength="30"></el-input>
                     </el-form-item>
                     <br>
                     <el-form-item label="肿瘤类型或部位B:" class="formoneline_ second" prop="">
                         <el-input v-model.trim="formInline1.item3" :disabled="$route.query.flag==0" size="small" maxlength="30"></el-input>
                     </el-form-item>
                     <el-form-item label="肿瘤诊断日期:" class="formoneline_ second" prop="">
                         <el-date-picker
                            :disabled="$route.query.flag==0"
                            v-model="formInline1.item3_date"
                            type="datetimerange"
                            class="filter-item"
                            range-separator="到"
                            size="small"
                            :picker-options="pickerOptions"
                            align="right"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="选择时间范围">
                          </el-date-picker>
                     </el-form-item>
                      <el-form-item label="肿瘤诊断医院:" class="formoneline_ second" prop="">
                        <el-input v-model.trim="formInline1.item3Hospital" :disabled="$route.query.flag==0"  size="small" maxlength="30"></el-input>
                     </el-form-item>
                     <br>
                      <el-form-item label="肿瘤类型或部位C:" class="formoneline_ second" prop="">
                         <el-input v-model.trim="formInline1.item4" :disabled="$route.query.flag==0"  size="small" maxlength="30"></el-input>
                     </el-form-item>
                     <el-form-item label="肿瘤诊断日期:" class="formoneline_ second" prop="">
                         <el-date-picker
                            :disabled="$route.query.flag==0"
                            v-model="formInline1.item4_date"
                            type="datetimerange"
                            class="filter-item"
                            range-separator="到"
                            size="small"
                            :picker-options="pickerOptions"
                            align="right"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="选择时间范围">
                          </el-date-picker>
                     </el-form-item>
                      <el-form-item label="肿瘤诊断医院:" class="formoneline_ second" prop="">
                        <el-input v-model.trim="formInline1.item4Hospital" :disabled="$route.query.flag==0"  size="small" maxlength="30"></el-input>
                     </el-form-item>
                  </el-row>
                  <el-row  v-if="formInline1.item1 == 1">
                   <p class="pTitle"><span class="requiredLabel"></span>&nbsp;3.您最近被确诊为癌症时：</p>
                     <el-form-item label="医院名称:" class="formoneline_ first" prop="">
                        <el-input v-model.trim="formInline1.item5" :disabled="$route.query.flag==0" size="small" maxlength="30"></el-input>
                     </el-form-item>
                     <el-form-item label="医生姓名:" class="formoneline_ first" prop="">
                        <el-input v-model.trim="formInline1.item6"  :disabled="$route.query.flag==0" size="small" maxlength="30"></el-input>
                     </el-form-item>
                     <el-form-item label="固定电话:" class="formoneline_ first" prop="item7">
                        <el-input v-model.trim="formInline1.item7" :disabled="$route.query.flag==0" size="small" maxlength="30"></el-input>
                     </el-form-item>
                     <el-form-item label="手机:" class="formoneline_ first" prop="item8">
                        <el-input v-model.trim="formInline1.item8" :disabled="$route.query.flag==0" size="small" maxlength="30"></el-input>
                     </el-form-item>
                  </el-row>
                  <el-row>
                    <p class="pTitle"><span class="requiredLabel"></span>&nbsp;4.是否发生死亡?</p>
                     <el-form-item label="" class="formoneline" prop="">
                        <el-radio-group v-model="formInline1.item9" :disabled="$route.query.flag==0">
                          <el-radio :label="1">1、是</el-radio>
                          <el-radio :label="2">2、否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="4.1死亡时间:" v-if="formInline1.item9 == 1">
                          <el-date-picker 
                              :disabled="$route.query.flag==0"
                              :clearable="false"
                              v-model="formInline1.item9Date"
                              type="date"
                              format="yyyy年MM月dd日"
                              value-format="yyyy-MM-dd"
                              placeholder=""
                              :picker-options="pickerOptions1">
                  </el-date-picker>
                    </el-form-item>
                  </el-row>
                   <el-row v-if="formInline1.item9 == 1">
                      <p class="pTitle"><span class="requiredLabel"></span>&nbsp;5.死亡信息来源: (多项选择)</p>
                       <el-form-item label="">
                           <el-checkbox-group v-model="formInline1.item10" :disabled="$route.query.flag==0">
                            <el-checkbox label="1">1.调查对象家人或朋友</el-checkbox><br>
                            <el-checkbox label="2">2.调查对象的医疗服务人员</el-checkbox><br>
                            <el-checkbox label="3">3.医疗记录或死亡证明</el-checkbox><br>
                            <el-checkbox label="4">4.其他，说明</el-checkbox><br>
                         </el-checkbox-group>
                         </el-form-item>
                         <el-form-item style="margin-top:135px;" v-if="formInline1.item10.indexOf('4') != -1">
                           <el-input type="text" v-model.trim="formInline1.item10Text" :disabled="$route.query.flag==0"></el-input>
                         </el-form-item>
                   </el-row>
                   <el-row>
                     <p class="pTitle"><span class="requiredLabel"></span>&nbsp;6.自上次联系或随访调查后，调查对象的联系方式是否变更?(单项选择)</p>
                       <el-form-item label="" class="" prop="">
                        <el-radio-group v-model="formInline1.item11" :disabled="$route.query.flag==0">
                          <el-radio style="margin-top:10px" :label="1">否</el-radio><br>
                          <el-radio style="margin-top:10px" :label="2">是，更新的联系信息</el-radio><br>
                          <el-radio style="margin-top:10px" :label="3">未知</el-radio>
                        </el-radio-group>
                    </el-form-item>
                     <el-form-item style="margin-left:10px;margin-top:20px;" v-if="formInline1.item11 == 2">
                           <el-input type="text" v-model.trim="formInline1.item11Text" :disabled="$route.query.flag==0"></el-input>
                      </el-form-item>
                   </el-row>
                    <el-row>
                      <p class="pTitle"><span class="requiredLabel"></span>&nbsp;7.备注:</p>
                      <el-form-item prop="">
                          <el-input
                            :disabled="$route.query.flag==0"
                            v-model="formInline1.item12"
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 4}"
                            placeholder="请输入内容"
                            >
                          </el-input>
                      </el-form-item>
                    </el-row>
                 </el-form>
            </div>
           </div>
           <div class="btns" style="text-align:center;" v-if="$route.query.flag == 1">
                <el-button @click="$router.go(-1)">取消</el-button>
                <el-button type="primary" @click="submit()">提交</el-button>
           </div>
        </div>
    </div>
</template>
<script>
var birthDate='';
import moment from 'moment'
export default {
    data(){
         const item1_b = (rule, value, callback) => {
            if (value && !(/^[\u4e00-\u9fa5]+$/.test(value))) {
            callback(new Error('请输入18个以内的汉字'))
            }else {
            callback();
            }
        };
        var checkPhone = (rule, value, callback) => {
        if (!value) {
          // return callback(new Error('手机号不能为空'));
           callback();
          } else {
            const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
            if (reg.test(value)) {
              callback();
            } else {
              return callback(new Error('请输入正确的手机号'));
            }
          }
        };
        var validatecontact_telephone = (rule, value, callback) => {
        if (value && !(/^\d{7,8}$/.test(value))) {
          callback(new Error('请输入7-8位固定电话'))
        } else {
          callback();
        }
      };
        return{
          follow_up_a3_page:false,
          btnAuth:{

          },
          pickerOptions: {
              // shortcuts: [{
              //   text: '今天',
              //   onClick (picker) {
              //     const end = new Date()
              //     const start = new Date()
              //     start.setHours(0)
              //     start.setMinutes(0)
              //     start.setSeconds(0)
              //     end.setTime(start.getTime() + 3600 * 1000 * 24 - 1000)
              //     picker.$emit('pick', [start, end])
              //   }
              // }, {
              //   text: '最近一周',
              //   onClick (picker) {
              //     const end = new Date()
              //     const start = new Date()
              //     start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              //     picker.$emit('pick', [start, end])
              //   }
              // }, {
              //   text: '最近一个月',
              //   onClick (picker) {
              //     const end = new Date()
              //     const start = new Date()
              //     start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              //     picker.$emit('pick', [start, end])
              //   }
              // }, {
              //   text: '最近三个月',
              //   onClick (picker) {
              //     const end = new Date()
              //     const start = new Date()
              //     start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              //     picker.$emit('pick', [start, end])
              //   }
              // }]
             },
             pickerOptions1: {
              disabledDate(time) {
                return time.getTime() > Date.now() ;
                }
              },
              pickerOptions2:{
                disabledDate(time) {
                       return Date.now() > time.getTime();
                }
              // disabledDate(time) {
              //   return time.getTime() > Date.now() || new Date(birthDate).getTime()>time.getTime();
              // }
            },
            rules:{
                investigatorCode:[
                    { required: true, message: '必填', trigger: 'blur' },
                ],
                tbTablePerson:[
                    { required: true, message: '必填', trigger: 'blur' },
                    { message: '请输入18个以内的汉字', trigger: 'blur', validator: item1_b}
                ],
                tbTableDate:[
                    { required: true, message: '必填', trigger: 'blur' },
                ],
                qualityControlPerson:[
                    { required: true, message: '必填', trigger: 'blur' },
                    { message: '请输入18个以内的汉字', trigger: 'blur', validator: item1_b}
                ],
                checkYears:[
                  { required: true, message: '必填', trigger: 'blur' },
                ],
            },
            rules1:{
                item1:[
                   { required: true, message: '必选', trigger: 'change' },
                ],
                item2:[
                   { required: true, message: '必填', trigger: 'blur' },
                ],
                item2_date:[
                   { required: true, message: '必填', trigger: 'blur' },
                ],
                item2Hospital:[
                   { required: true, message: '必填', trigger: 'blur' },
                ],
                item7:[
                  {validator:validatecontact_telephone,trigger: 'blur'}
                ],
                item8:[
                  {validator: checkPhone, trigger: 'blur'}
                ]
            },
            formInline:{
                tbTableDate:new Date(),       //填表日期
                investigatorCode:null,     //工作人员编码
                tbTablePerson:null,     //填表人
                qualityControlPerson:null,  //质控者
                checkYears:new Date(), //研究年份
            },
            formInline1:{
                item1:'',
                item2:'',
                item2_date:'',
                item2Hospital:'',
                item3:'',
                item3_date:'',
                item3Hospital:'',
                item4:'',
                item4_date:'',
                item4Hospital:'',
                item5:'',
                item6:'',
                item7:'',
                item8:'',
                item9:'',
                item9Date:'',
                item10:[],
                item10Text:'',
                item11:'',
                item11Text:'',
                item12:''

            },
             base:{
              //用户基本信息
                sid:'',
                name:'',
                siteId:'',
                sex:'',
                age:''
            },
        }
    },
    mounted(){
        let obj = this.checkPageAuth(this,"follow_up_a3_page",this.btnAuth);
        let followupA3ListInfo = JSON.parse(localStorage.getItem('followupA3ListInfo'));
        if(localStorage.getItem('followupA3ListInfo')){
          this.base.sid = followupA3ListInfo.sid;
          this.base.name = followupA3ListInfo.name;
          this.base.siteId = followupA3ListInfo.siteId;
          this.base.sex = followupA3ListInfo.sex;
          this.base.age = followupA3ListInfo.age;
        }
        if(this.$route.query.flag == 0){
          // 查看
          this.getDetailData();
        }else if(this.$route.query.flag == 1 && this.$route.query.action == 'edit'){
          // 编辑
          this.getDetailData();
        }
    },
    beforeDestroy () {
        localStorage.removeItem('followupA3ListInfo');
    },
    methods: {
        goBack(){
            this.$router.go(-1)
        },
        getDetailData(){
          let _id=null;
          if(localStorage.getItem('followupA3ListInfo')){
            _id=JSON.parse(localStorage.getItem('followupA3ListInfo')).id
          }else{
            _id=this.$route.query.id
          }
          $axios_http({
            url:'/base/follow/yearUpdateInfo/query',
            data:{
              id:_id
            },
            vueObj: this
          }).then((res) => {
              if(res.data.statusMsg == 'success'){
                  this.base.sid = res.data.data.sid;
                  this.base.name = res.data.data.name;
                  this.base.siteId = res.data.data.siteId;
                  this.base.sex = res.data.data.sex;
                  this.base.age = res.data.data.age;
                  this.formInline.tbTableDate = res.data.data.tbTableDate;
                  this.formInline.investigatorCode = res.data.data.investigatorCode;
                  this.formInline.tbTablePerson = res.data.data.tbTablePerson;
                  this.formInline.qualityControlPerson = res.data.data.qualityControlPerson;
                  this.formInline.checkYears = res.data.data.checkYears;
                  this.formInline1.item1 = res.data.data.item1;
                  this.formInline1.item2 = res.data.data.item2;
                  if(res.data.data.item2DateBegin && res.data.data.item2DateEnd){
                      this.formInline1.item2_date = [res.data.data.item2DateBegin,res.data.data.item2DateEnd];
                  }else{
                     this.formInline1.item2_date = '';
                  }
                  this.formInline1.item2Hospital = res.data.data.item2Hospital;
                  this.formInline1.item3 = res.data.data.item3;
                  if(res.data.data.item3DateBegin && res.data.data.item3DateEnd){
                    this.formInline1.item3_date = [res.data.data.item3DateBegin,res.data.data.item3DateEnd];
                  }else{
                    this.formInline1.item3_date = '';
                  }
                  this.formInline1.item3Hospital = res.data.data.item3Hospital;
                  this.formInline1.item4 = res.data.data.item4;
                  if(res.data.data.item4DateBegin && res.data.data.item4DateEnd){
                     this.formInline1.item4_date = [res.data.data.item4DateBegin,res.data.data.item4DateEnd];
                  }else{
                     this.formInline1.item4_date = ''
                  }
                  this.formInline1.item4Hospital = res.data.data.item4Hospital;
                  this.formInline1.item5 = res.data.data.item5;
                  this.formInline1.item6 = res.data.data.item6;
                  this.formInline1.item7 = res.data.data.item7;
                  this.formInline1.item8 = res.data.data.item8;
                  this.formInline1.item9 = res.data.data.item9;
                  this.formInline1.item9Date = res.data.data.item9Date;
                  if(res.data.data.item10 != ''){
                      this.formInline1.item10 = res.data.data.item10.split(',')
                  }else{
                    this.formInline1.item10 = [];
                  }
                  this.formInline1.item10Text = res.data.data.item10Text;
                  this.formInline1.item11 = res.data.data.item11;
                  this.formInline1.item11Text = res.data.data.item11Text;
                  this.formInline1.item12 = res.data.data.item12;
                }
          })
        },
        submit(){
            let flag;
            this.$refs.formInline.validate((valid) => {
                if(valid){
                   flag = true;
                }else{
                   flag = false;
                }
            })
            this.$refs.formInline1.validate((valid1) => {
                    if(valid1){
                      flag = true;
                    }else{
                      flag = false;
                    }
            })
            if(flag){
               // 基本信息
              let personData = {
                id:JSON.parse(localStorage.getItem('followupA3ListInfo')).id,
                sid:JSON.parse(localStorage.getItem('followupA3ListInfo')).sid,
                siteId:JSON.parse(localStorage.getItem('followupA3ListInfo')).siteId,
                name:JSON.parse(localStorage.getItem('followupA3ListInfo')).name,
                age:JSON.parse(localStorage.getItem('followupA3ListInfo')).age,
                sex:JSON.parse(localStorage.getItem('followupA3ListInfo')).sex,
                tbTableDate:moment(this.formInline.tbTableDate).format('YYYY-MM-DD'),
                investigatorCode:this.formInline.investigatorCode,
                tbTablePerson:this.formInline.tbTablePerson,
                qualityControlPerson:this.formInline.qualityControlPerson,
                checkYears:moment(this.formInline.checkYears).format('YYYY')
              }
              // 问题
              let item2DateBegin = '';
              let item2DateEnd = '';
              let item3DateBegin = '';
              let item3DateEnd = '';
              let item4DateBegin = '';
              let item4DateEnd = '';
              if(this.formInline1.item2_date && this.formInline1.item2_date.length == 2){
                   item2DateBegin = this.formInline1.item2_date[0];
                   item2DateEnd = this.formInline1.item2_date[1];
              }
              if(this.formInline1.item3_date && this.formInline1.item3_date.length == 2){
                   item3DateBegin = this.formInline1.item3_date[0];
                   item3DateEnd = this.formInline1.item3_date[1];
              }
              if(this.formInline1.item4_date && this.formInline1.item4_date.length == 2){
                   item4DateBegin = this.formInline1.item4_date[0];
                   item4DateEnd = this.formInline1.item4_date[1];
              }
              let questionData = {
                item1:this.formInline1.item1,
                item2:this.formInline1.item2,
                item2DateBegin:item2DateBegin,
                item2DateEnd:item2DateEnd,
                item2Hospital:this.formInline1.item2Hospital,
                item3:this.formInline1.item3,
                item3DateBegin:item3DateBegin,
                item3DateEnd:item3DateEnd,
                item3Hospital:this.formInline1.item3Hospital,
                item4:this.formInline1.item4,
                item4DateBegin:item4DateBegin,
                item4DateEnd:item4DateEnd,
                item4Hospital:this.formInline1.item4Hospital,
                item5:this.formInline1.item5,
                item6:this.formInline1.item6,
                item7:this.formInline1.item7,
                item8:this.formInline1.item8,
                item9:this.formInline1.item9 ? this.formInline1.item9:'',
                item9Date:this.formInline1.item9Date,
                item10:this.formInline1.item10.join(','),
                item10Text:this.formInline1.item10Text,
                item11:this.formInline1.item11 ? this.formInline1.item11:'',
                item11Text:this.formInline1.item11Text,
                item12:this.formInline1.item12
              }
              let data = Object.assign({},personData,questionData);
               $axios_http({
                 url:'/base/follow/yearUpdate/save',
                 data:data,
                 vueObj: this
               }).then((res) => {
                    if(res.data.data == 'success'){
                     this.$router.push('/followup/lista3');
                   }
               })
            }
        }
    },
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .j_content{
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
    font-size: 0;
    line-height: 0;
  }

  .formoneline {
    width: 100%;
    margin-right: 0 !important;
  }
  .formoneline_{
    margin-bottom: 10px;
  }
  .first.formoneline_{
    padding-left: 10px;
  }
  .second.formoneline_,.third.formoneline_{
    padding-left: 20px;
  }
   .pTitle{
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    font-weight: bold;
  }
   .requiredLabel{
    color: #f56c6c;
   }
   .el-checkbox-group{
     height: auto;
   }
   .el-textarea{
     width: 300px;
     margin-left: 60px;
     margin-top: -30px;
   }
   .j_content .el-radio__input.is-disabled .el-radio__inner, .el-radio__input.is-disabled.is-checked .el-radio__inner{
     background-color: #409EFF !important;
     border-color: #409EFF !important;
   }
   .j_content .el-radio__input.is-disabled.is-checked+span.el-radio__label {
      color: #409EFF;
  }
</style>
<style>
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
.j_content .el-range-editor.is-disabled{
   background-color: #fff;
   border-color: #dcdfe6;
}
.j_content .el-range-editor.is-disabled input{
   background-color: #fff;
   border-color: #dcdfe6;
}
</style>

