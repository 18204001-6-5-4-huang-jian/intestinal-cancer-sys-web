<template>
  <div v-if="showSubjectInsert_page" class="form-wrapper" id="form-wrapper">
    <!--<router-link :to="{path:'/subjects/subjectsDetail',query:{id:$route.query.id}}"> </router-link>
-->
      <el-button size="mini" class="return" @click="goBack()">返 回</el-button>

    <div class="form-title">
      <h2>表A1-受试者资格审核表</h2>
    </div>
    <el-form :model="insertForm" :rules="rules" ref="insertForm" :inline="false">
      <div>
        <div class="subject-form-first">
          <div class="subject-form-title">
            第一部分:管理部分
          </div>
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <div class="form-first-left">
                  <div style="display: block;">
                    <el-form-item label="姓名" :label-width="formLabelWidth" prop="name" class="formItemWidth">
                      <el-input v-model="insertForm.name" :disabled="true" auto-complete="off" size="small"
                                @keyup.enter.native="focusName()"></el-input>
                    </el-form-item>
                  </div>
                  <el-form-item label="身份证号" :label-width="formLabelWidth" prop="idCard" class="formItemWidth">
                    <el-input v-model="insertForm.idCard"  :disabled="true" auto-complete="off" size="small" ref="idCard"
                              @blur=getBirthday   @keyup.enter.native="focusIdCard()"></el-input>

                  </el-form-item>
                  <el-form-item label="性别:" :label-width="formLabelWidth" prop="sex" class="formItemWidth">
                    <el-radio-group v-model="insertForm.sex"  :disabled="true">
                      <el-radio :label="1">男</el-radio>
                      <el-radio :label="2">女</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="出生日期" :label-width="formLabelWidth" prop="birthDate" class="formItemWidth">
                    <el-input v-model="insertForm.birthDate" auto-complete="off" size="small" :disabled="true"
                              @keyup.enter.native="focusBirth()"
                              ref="birthDate"></el-input>
                  </el-form-item>
                  <!-- <el-form-item label="家庭地址" :label-width="formLabelWidth" prop="address" class="formItemWidth">
                    <el-input v-model="insertForm.address" auto-complete="off" size="small" ref="address" :disabled="true"
                              @keyup.enter.native="focusHomeAddr()"></el-input>
                  </el-form-item> -->
                  <el-form-item label="家庭地址" :label-width="formLabelWidth" prop="address1" class="formItemWidth">
                    <el-cascader
                      placeholder="请选择家庭住址"
                      :options="options"
                      v-model="insertForm.address1"
                      :disabled="true"
                      filterable
                    ></el-cascader>
                  </el-form-item>
                  <el-form-item label="" :label-width="formLabelWidth" prop="cityOther" class="formItemWidth">
                    <el-input v-model="insertForm.cityOther" auto-complete="off" size="small" placeholder="详细地址"
                              @keyup.enter.native="focusHomeAddr()" ref="city_other" :disabled="true" maxlength="50"></el-input>
                  </el-form-item>
                  <el-form-item label="联系电话" :label-width="formLabelWidth" prop="phone" class="formItemWidth">
                    <el-input v-model="insertForm.phone" auto-complete="off" size="small" ref="phone" :disabled="true"
                              @keyup.enter.native="focusPhone()"></el-input>
                  </el-form-item>
                  <el-form-item label="筛查现场ID" :label-width="formLabelWidth" prop="siteId" class="formItemWidth">
                    <span>{{insertForm.siteId | siteId}}</span>
                    <!-- <el-input v-model="insertForm.siteId" auto-complete="off" size="small" ref="siteId" disabled="true"
                              @keyup.enter.native="focusSiteId()"></el-input> -->
                  </el-form-item>
                  <el-form-item label="资料审核日期" :label-width="formLabelWidth" prop="surveyDate" class="formItemWidth">
                    <el-input v-model="insertForm.surveyDate" auto-complete="off" size="small" ref="surveyDate" :disabled="true"
                              @keyup.enter.native="focusSurvey_date()"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light form-first-right">
                <el-form-item label="调查员签名" :label-width="formLabelWidth" prop="name" class="formItemWidth">
                  <el-input v-model="insertForm.investigator" auto-complete="off" size="small" ref="investigator" :disabled="true"
                            @keyup.enter.native="focusInvestigator()"></el-input>
                </el-form-item>
                <el-form-item label="审核员签名" :label-width="formLabelWidth" prop="name" class="formItemWidth">
                  <el-input v-model="insertForm.reviewer" auto-complete="off" size="small" ref="reviewer" :disabled="true"
                            @keyup.enter.native="focusReviewer()"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="subject-form-title2">
          第一部分:管理部分
        </div>
        <div class="option">
          <el-row>
            <el-col :span="22">
              <div class="grid-content bg-purple">
                <p class="option-p">1）实足年龄（当前年份减出生年份，若当前月日在出生月日前，则再减1岁）：
                  <el-input v-model="insertForm.item1"  disabled auto-complete="off" size="mini"  :disabled="true"
                            class="answerBox"></el-input>
                  岁
                </p>
                <p class="option-p">&nbsp;&nbsp;&nbsp;&nbsp;（若实际年龄<50或>74，结束调查 ；此后只要出现排除条件，即可停止调查，不再继续）</p>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="option">
          <el-row>
            <el-col :span="22">
              <div class="grid-content bg-purple">
                <p class="option-p">2）是否曾有医生告诉过您患有结直肠癌？</p>
              </div>
            </el-col>
            <el-col :span="2">
              <div class="grid-content bg-purple-light">
                <el-form-item prop="item2">
                  <el-input v-model="insertForm.item2" auto-complete="off" size="mini"  :disabled="true"
                            class="answerBox" @keyup.enter.native="item2()" ref="item2"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="option">
          <el-row>
            <el-col :span="22">
              <div class="grid-content bg-purple">
                <p class="option-p">3）是否进行过结肠切除手术？</p>
              </div>
            </el-col>
            <el-col :span="2">
              <div class="grid-content bg-purple-light">
                <el-form-item prop="item3">
                  <el-input v-model="insertForm.item3" auto-complete="off" size="mini"  :disabled="true"
                            class="answerBox" @keyup.enter.native="item3()" ref="item3"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="option">
          <el-row>
            <el-col :span="22">
              <div class="grid-content bg-purple">
                <p class="option-p">4）是否正在接受任何癌症相关的治疗（非黑色素皮肤癌除外）？</p>
              </div>
            </el-col>
            <el-col :span="2">
              <div class="grid-content bg-purple-light">
                <el-form-item prop="item4">
                  <el-input v-model="insertForm.item4" auto-complete="off" size="mini"  :disabled="true"
                            class="answerBox" @keyup.enter.native="item4()" ref="item4"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="option">
          <el-row>
            <el-col :span="22">
              <div class="grid-content bg-purple">
                <p class="option-p">5）过去5年中是否有过结肠镜、纤维乙状结肠镜、气钡双对比造影，CT仿真结肠镜检查？</p>
              </div>
            </el-col>
            <el-col :span="2">
              <div class="grid-content bg-purple-light">
                <el-form-item prop="item5">
                  <el-input v-model="insertForm.item5" auto-complete="off" size="mini"  :disabled="true"
                            class="answerBox" @keyup.enter.native="item5()" ref="item5"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="option">
          <el-row>
            <el-col :span="22">
              <div class="grid-content bg-purple">
                <p class="option-p">6）近1年内是否接受过粪便潜血检测（FOBT）或者粪便DNA检测？</p>
              </div>
            </el-col>
            <el-col :span="2">
              <div class="grid-content bg-purple-light">
                <el-form-item prop="item6">
                  <el-input v-model="insertForm.item6" auto-complete="off" size="mini"  :disabled="true"
                            class="answerBox" @keyup.enter.native="item6()" ref="item6"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="option">
          <el-row>
            <el-col :span="22">
              <div class="grid-content bg-purple">
                <p class="option-p-six">7） 是否有下列下消化道疾病或症状提示需要结肠镜进行确诊？
                  <br>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、过去半年中长时间的大便带血；<br>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、明确诊断的缺铁性贫血；<br>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、过去6个月中有记录的不明原因的体重下降（超过10%基础体重）？</p>
              </div>
            </el-col>
            <el-col :span="2">
              <div class="grid-content bg-purple-light">
                <el-form-item prop="item7">
                  <el-input v-model="insertForm.item7" auto-complete="off" size="mini"  :disabled="true"
                            class="answerBox" @keyup.enter.native="item7()" ref="item7"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="option">
          <el-row>
            <el-col :span="22">
              <div class="grid-content bg-purple">
                <p class="option-p">8）是否有其他严重疾病（包括严重的肺部疾病，晚期肾病，晚期肝病、严重的心衰、近期诊断为除黑色素皮肤癌外的其他癌症）？</p>
              </div>
            </el-col>
            <el-col :span="2">
              <div class="grid-content bg-purple-light">
                <el-form-item prop="item8">
                  <el-input v-model="insertForm.item8" auto-complete="off" size="mini"  :disabled="true"
                            class="answerBox" @keyup.enter.native="item8()" ref="item8"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="option">
          <el-row>
            <el-col :span="22">
              <div class="grid-content bg-purple">
                <p class="option-p">9）非本市户籍常驻人口，且本地居住不足3年？</p>
              </div>
            </el-col>
            <el-col :span="2">
              <div class="grid-content bg-purple-light">
                <el-form-item prop="item9">
                  <el-input v-model="insertForm.item9" auto-complete="off" size="mini"  :disabled="true"
                            class="answerBox" @keyup.enter.native="item9()" ref="item9"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="option">
          <el-row>
            <el-col :span="22">
              <div class="grid-content bg-purple">
                <p class="option-p">10）他/她是否不愿意或者不能自己签署知情同意书？</p>
              </div>
            </el-col>
            <el-col :span="2">
              <div class="grid-content bg-purple-light">
                <el-form-item prop="item10">
                  <el-input v-model="insertForm.item10" auto-complete="off" size="mini"  :disabled="true"
                            class="answerBox" ref="item10"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-form>
    <!-- 申请编辑弹窗 -->
    <applyOpen ref="applyOpenVisible" :applyArr="applyArr"></applyOpen>
    <div class="submit-btn">
      <!-- 解除锁定组件 -->
      <approvalDialog ref="approvalDialog" @refreshList="query" :id="insertFormId"  :approvalArr="approvalArr" v-if="$store.state.hospitalType==2 && approvalStatus==0"></approvalDialog>
      <el-button type="primary" @click="applyEdit"  v-if="$store.state.hospitalType==1 && applyStatus==0 && btnAuth.applyStatus_btn">申请编辑</el-button>
      <!-- <el-button type="primary" @click="applyEdit" v-if="$store.state.hospitalType==1">申请编辑</el-button> -->
      <el-button type="primary"  v-if="$store.state.hospitalType==1 && applyStatus==1" :disabled="true">申请编辑</el-button>
      <el-button type="primary" v-if="$store.state.hospitalType==2 && approvalStatus==1" :disabled="true">解除锁定</el-button>
    </div>
  </div>
</template>
<script>
import applyOpen from '../components/applyDialog'
import approvalDialog from '../components/approvalDialog'
  export default {
    name: 'Right',
    data() {
      var reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/;
      var validateIdCord = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('身份证号不能为空'));
        } else if (!(reg.test(value))) {
          callback(new Error('您输入的身份证号有误'));
        } else {
          callback();
        }
      };
      var validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('手机号不能为空'));
        } else if (!(/\d/.test(value))) {
          callback(new Error('手机号只能是数字'))
        } else if (value.length != 11) {
          callback(new Error('请输入合法的11位手机号'));
        } else {
          callback();
        }
      };
      return {
        applyId:'1',
         //弹窗分组信息
         "groupInfo":{
             "sid":"",
             "inGroupDate":"",
             "group":""
         } ,
        applyArr:{},   //申请编辑快递相关信息
        approvalArr:{
          formType:"HOSPITAL_INTESTINE_REVIEW",
        },  //解除锁定相关信息
        
        //是否符合筛选条件
        subjectInsertState: true,
        //发送短信
        checked: true,
        submitDialog: false,
        showSubjectInsert_page: false,
        btnAuth: {
          buttonSubjectSave: false,
          applyStatus_btn:false
        },
        options:[],
        insertFormId:'',
        applyStatus:'',   //0---申请按钮出现  1---按钮消失   
        approvalStatus:'',   //0--出现审核页面  1--国家审核页面  2--审核不通过
        editStatus:'',    //0--不可编辑  1---编辑  
        //添加表单数据对象
        'insertForm': {
          "name": '',
          "idCard": '',
          "birthDate": '',
          "address1": '',
          "cityOther":"",
          "phone": '',
          "siteId": '',
          "surveyDate": '',
          "investigator": '',
          "reviewer": '',
          "item1": '',
          "item2": '',
          "item3": '',
          "item4": '',
          "item5": '',
          "item6": '',
          "item7": '',
          "item8": '',
          "item9": '',
          "item10": '',
        },
        formLabelWidth: '120px',
        autograph: '120px',
        rules: {
          name: [
            {required: true, message: '必填', trigger: 'blur'},
            {min: 2, max: 30, message: '长度在2到30个字符', trigger: 'blur'}
          ],
          idCard: [
            {required: true, message: '必填', trigger: 'blur'},
          ],
          sex: [
            {required: true, message: '必填', trigger: 'change'}
          ],
          birthDate: [
            {required: true, message: '必填', trigger: 'blur'},
            {min: 8, max: 10, message: '格式不正确', trigger: 'blur'}
          ],
          siteId: [
            {required: true, message: '必填', trigger: 'blur'},
          ],
          address: [
            {required: true, message: '必填', trigger: 'blur'},
            {min: 4, max: 30, message: '长度在2到30个字符', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '必填', trigger: 'blur'},
            {validator: validatePhone, trigger: 'blur'}
          ],
          surveyDate: [
            {required: true, message: '必填', trigger: 'blur'},
            {min: 8, max: 10, message: '格式不正确', trigger: 'blur'}
          ],
//          item1: [
//            {required: true, message: '必填', trigger: 'blur'}
//          ],
          item2: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          item3: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          item4: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          item5: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          item6: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          item7: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          item8: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          item9: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          item10: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
        }
      }
    },

    mounted() {
      let obj = this.checkPageAuth(this, "showSubjectInsert_page", this.btnAuth);
      this.query();
      this.queryAdress();
    },
    components:{
      applyOpen,
      approvalDialog
    },
    watch: {
      // 'insertForm.siteId': function (val, b) {
      //     if (val != '1' && val != '2' && val != '3' && val != '4' && val != '5' && val != '6') {
      //       this.$nextTick(function () {
      //        this.insertForm.siteId = ''
      //       })
      //     }
      // },
      'insertForm.item2': function (val, b) {
        this.watchInputVal(val, this, 'insertForm', 'item2')
      },
      'insertForm.item3': function (val, b) {
        this.watchInputVal(val, this, 'insertForm', 'item3')
      },
      'insertForm.item4': function (val, b) {
        this.watchInputVal(val, this, 'insertForm', 'item4')
      },
      'insertForm.item5': function (val, b) {
        this.watchInputVal(val, this, 'insertForm', 'item5')
      },
      'insertForm.item6': function (val, b) {
        this.watchInputVal(val, this, 'insertForm', 'item6')
      },
      'insertForm.item7': function (val, b) {
        this.watchInputVal(val, this, 'insertForm', 'item7')
      },
      'insertForm.item8': function (val, b) {
        this.watchInputVal(val, this, 'insertForm', 'item8')
      },
      'insertForm.item9': function (val, b) {
        this.watchInputVal(val, this, 'insertForm', 'item9')
      },
      'insertForm.item10': function (val, b) {
        this.watchInputVal(val, this, 'insertForm', 'item10')
      },
    },
    methods: {
       // 查询地址
       queryAdress(){
        $axios_http({
          url: "/base/resource/city/query/1",
          data: {},
          vueObj: this
        }).then((res) => {
          this.options=res.data.data;
          this.options.filter(item=>{
            item.children.filter(item2=>{
              item2.children.filter(item3=>{
                item3.children.filter(item4=>{
                  if(item4.children.length==0){
                      delete item4.children
                    }else{
                          item4.children.filter(item5=>{
                            if(item5.children.length==0){
                              delete item5.children
                            }
                      })
                    }
              
              })
              })
            })
          })
        })

      },
      applyEdit(){   //申请编辑弹窗
        this.$refs.applyOpenVisible.applyOpenVisible=true;
        this.applyArr.id=this.insertFormId;
        this.applyArr.formType="HOSPITAL_INTESTINE_REVIEW";
        this.applyArr.sid=this.$route.query.sid;
      },
      //获取今天日期
      getToday(){
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        this.insertForm.surveyDate = currentdate
      },
      focusName(){
        this.$refs.idCard.focus()
      },
      focusBirth(){
        this.$refs.address.focus()
      },
      focusHomeAddr(){
        this.$refs.phone.focus()
      },
      focusPhone(){
        this.$refs.siteId.focus()
      },
      focusSiteId(){
        this.$refs.surveyDate.focus()
      },
      focusSurvey_date(){
        this.$refs.investigator.focus()
      },
      focusInvestigator(){
        this.$refs.reviewer.focus()
      },
      focusReviewer(){
        this.$refs.item2.focus()
      },
      item2(){
        this.$refs.item3.focus()
      },
      item3(){
        this.$refs.item4.focus()
      },
      item4(){
          console.log(this.$refs)
        this.$refs.item5.focus()
      },
      item5(){
        this.$refs.item6.focus()
      },
      item6(){
        this.$refs.item7.focus()
      },
      item7(){
        this.$refs.item8.focus()
      },
      item8(){
        this.$refs.item9.focus()
      },
      item9(){
        this.$refs.item10.focus()
      },
      watchInputVal(val, opt, a, b) {
        if (val != '1' && val != '2') {
          this.$nextTick(function () {
            opt[a][b] = ''
          })
        }
      },

      //获取出生日期
      getBirthday(){
        $axios_http({
          url:'/base/hospital/personinfo/verify/idcard/'+this.insertForm.idCard,
          data: {},
          vueObj: this
        }).then((res) => {
          console.log('this is role res')
          console.log(res)
          this.insertForm.item1 = res.data.data
          console.log(this.insertForm.item1,'年龄')
        })
         if(this.insertForm.idCard == ''){
             return
         }
        var birthday = "";
        if (this.insertForm.idCard != null && this.insertForm.idCard != "") {
          if (this.insertForm.idCard.length == 15) {
            birthday = "19" + this.insertForm.idCard.substr(6, 6);
          } else if (this.insertForm.idCard.length == 18) {
            birthday = this.insertForm.idCard.substr(6, 8);
          }
          birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
        }
        this.insertForm.birthDate = birthday
      },

      query(){
        $axios_http({
          url: "/base/hospital/review/get/"+this.$route.query.sid,
          data: {},
          vueObj: this
        }).then((res) => {
          //显示操作成功浮动提示框
          this.insertForm = res.data.data
          let arr=this.insertForm.province+'/'+this.insertForm.city+'/'+this.insertForm.area+'/'+this.insertForm.township+'/'+this.insertForm.village
          this.insertForm.address1=arr.split('/');
          // if(this.insertForm.province && this.insertForm.address1.indexOf('其他')>0){
          //       this.cityOtherShow=true
          //     }else{
          //       this.cityOtherShow=false
          //     }
          this.insertFormId=this.insertForm.id;   //获取id
          this.applyStatus=this.insertForm.applyStatus;
          this.approvalStatus=this.insertForm.approvalStatus;
          this.editStatus=this.insertForm.editStatus;
          this.insertForm.birthDate = this.insertForm.birthDate.substr(0,11)
          this.insertForm.surveyDate = this.insertForm.surveyDate.substr(0,11)
          if(this.insertForm.address){
            this.insertForm.address=res.data.data.address.replace('undefined','')    //未选市的时候过滤;
            // 历史数据处理
            // this.insertForm.cityOther=this.insertForm.address;
            // this.cityOtherShow=true;
          }
        })
      },
    }
  }
</script>
<style scoped>
  .formItemWidth {
    width: 70%;

  }

  .answerBox {
    width: 28px;
    margin: 5px 20px 5px 0;
  }
.el-cascader,.el-cascader input.el-input__inner{
  width: 100%;
}
  .page-main {
    padding: 20px;
  }

  .option {
    margin: 0 40px;
  }

  .option-p {
    height: 60px;
    line-height: 60px;
  }

  .submit-btn {
    text-align: center;
    margin: 20px;
  }

  .contentMain {
    width: 100%;
    background: #fff;
  }

  h2 {
    padding: 50px 0 20px 0;
  }

  /*.signAgreement {*/
  /*padding-left: 200px;*/
  /*}*/

  .result {
    text-align: center;
    padding-bottom: 20px;
  }

  .confirmBtn {
    float: right;
    margin-right: 20px;
  }

  .form-title {
    text-align: center;
  }

  .form-first-left {
    border-right: 1px solid #CCCCCC;
    padding-left: 50px;
    padding-top: 20px;
    height: 100%;
  }

  .form-first-right {
    padding-left: 50px;
    padding-top: 20px;

  }

  .subject-form-first {
    border: 1px solid #CCCCCC;
    margin: 0 20px;
  }

  .subject-form-title {
    height: 40px;
    background: #ccc;
    text-align: center;
    line-height: 40px;
    font-size: 20px;
  }

  .subject-form-title2 {
    height: 40px;
    background: #ccc;
    text-align: center;
    line-height: 40px;
    font-size: 20px;
    margin: 40px 20px;
  }

  .answerBox {
    width: 28px;
    margin: 5px 20px 5px 0;
  }

  .submitDialog-item-title {
    width: 120px;
    display: inline-block;
    text-align: right;
    margin-right: 20px;
    height: 30px;
    line-height: 30px;
  }

  .submitDialog-item-check {
    margin-left: 10px;
  }

  .submitDialog-title h3 {
    text-align: center;
    height: 40px;
  }

</style>
<style>
  #test .el-form-item {
    margin-bottom: 0px;
    display: inline-block;
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

  .return {
    margin-top: 20px;
    display: block;
    text-align: center;
    float: left;
    margin-left: 20px;
  }

  .form-wrapper {
    background: #ffffff;
    padding-bottom:30px;
  }
  #form-wrapper .el-input.is-disabled .el-input__inner {
    background-color: #fff;
    border-color: #dcdfe6;
    color: #606266;
    cursor: not-allowed;
  }
  #form-wrapper .el-input-group__append{
    padding:0 10px;
  }
  #form-wrapper .el-form-item.is-error .el-input__inner,.j_content .el-form-item.is-error .el-input__inner:focus, .j_content .el-form-item.is-error .el-textarea__inner, .j_content .el-form-item.is-error .el-textarea__inner:focus, .j_content .el-message-box__input input.invalid, .j_content .el-message-box__input input.invalid:focus {
    border-color: #f56c6c !important;
  }
  #form-wrapper .el-form-item__error {
    z-index: 9;
  }
  #form-wrapper .el-radio__input.is-disabled.is-checked+span.el-radio__label {
    color: #409EFF;
  }
  #form-wrapper .el-radio__input.is-disabled.is-checked .el-radio__inner {
    background-color: #409EFF;
    border-color: #409EFF;
  }
  #form-wrapper .el-radio__input.is-disabled.is-checked .el-radio__inner::after {
    background-color: #f5f7fa;
  }
  #form-wrapper .el-textarea.is-disabled .el-textarea__inner {
    background-color: #fff;
    border-color: #dcdfe6;
    color: #606266;
    cursor: not-allowed;
  }
  #form-wrapper .el-checkbox__input.is-disabled.is-checked+span.el-checkbox__label {
    color: #409EFF;
    cursor: not-allowed;
  }
  #form-wrapper .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
    background-color: #409EFF;
    border-color: #409EFF;
  }
  #form-wrapper .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
    border-color: #fff;
  }

</style>
