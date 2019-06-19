<template>
  <div v-if="subjectInsert_page" class="form-wrapper">
    <!--<router-link to="/home/home">

    </router-link>-->
    <el-button size="mini" class="return" @click="goBack()">返 回</el-button>
    <div class="form-title">
      <h2>表A1-受试者资格审核表</h2>
    </div>
    <el-form :model="insertForm" :rules="rules" ref="insertForm" :inline="false">
      <div>
        <div class="subject-form-first">
          <div class="subject-form-title">
            第一部分：管理部分
          </div>
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <div class="form-first-left">
                  <div style="display: block;">
                    <el-form-item label="姓名" :label-width="formLabelWidth" prop="name" class="formItemWidth">
                      <el-input v-model="insertForm.name" auto-complete="off" size="small" ref="name"
                                @keyup.enter.native="focusName()"></el-input>
                    </el-form-item>
                  </div>

                  <el-form-item label="身份证号" :label-width="formLabelWidth" prop="idCard" class="formItemWidth">
                    <el-input v-model="insertForm.idCard" auto-complete="off" size="small" ref="idCard"
                    ></el-input>

                  </el-form-item>
                  <el-form-item label="性别:" :label-width="formLabelWidth" prop="sex" class="formItemWidth">
                    <el-input v-model="insertForm.sex"  disabled auto-complete="off" size="mini" ref="sex"
                              class="answerBox"></el-input>
                  </el-form-item>
                  <el-form-item label="出生日期" :label-width="formLabelWidth" prop="birthDate" class="formItemWidth">
                    <el-input v-model="insertForm.birthDate" auto-complete="off" disabled size="small"
                              @keyup.enter.native="focusBirth()"
                              ref="birthDate"></el-input>
                  </el-form-item>

                  <el-form-item label="家庭地址" :label-width="formLabelWidth" prop="address1" class="formItemWidth">
                    <!-- <el-cascader
                      :options="options"
                      v-model="insertForm.address1"
                      :change-on-select="true"
                      :clearable="true"
                      :filterable="true"
                      ref="address1"
                      style="width: 100%;"
                      id="address1"
                      tabindex= '1'
                    >
                    </el-cascader> -->
                    <el-cascader
                      placeholder="请选择家庭住址"
                      :options="options"
                      v-model="insertForm.address1"
                      filterable
                    ></el-cascader>
                  </el-form-item>
                  <el-form-item label="" :label-width="formLabelWidth" prop="cityOther" class="formItemWidth">
                    <el-input v-model="insertForm.cityOther" auto-complete="off" size="small" placeholder="详细地址"
                              @keyup.enter.native="focusHomeAddr()" ref="cityOther" maxlength="50"></el-input>
                  </el-form-item>
                  <el-form-item label="联系电话" :label-width="formLabelWidth" prop="phone" class="formItemWidth">
                    <el-input v-model.number="insertForm.phone" auto-complete="off" size="small" ref="phone" placeholder="请尽量填手机号，保证能接收到短信"
                              @keyup.enter.native="focusPhone()"></el-input>
                  </el-form-item>
                  <el-form-item label="筛查现场ID" :label-width="formLabelWidth" prop="siteId" class="formItemWidth">
                    <div>{{insertForm.siteId | siteId}}</div>
                  </el-form-item>
                  <el-form-item label="资料审核日期" :label-width="formLabelWidth" prop="surveyDate" class="formItemWidth">
                    <el-date-picker
                      v-model="insertForm.surveyDate"
                      type="date"
                      size="small"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                      ref="surveyDate"
                      @change="focusSurvey_date"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light form-first-right">
                <el-form-item label="调查员签名" :label-width="formLabelWidth" prop="investigator" class="formItemWidth">
                  <el-input v-model="insertForm.investigator" auto-complete="off" size="small" ref="investigator"
                            @keyup.enter.native="focusInvestigator()"></el-input>
                </el-form-item>
                <el-form-item label="审核员签名" :label-width="formLabelWidth" prop="reviewer" class="formItemWidth">
                  <el-input v-model="insertForm.reviewer" auto-complete="off" size="small" ref="reviewer"
                            @keyup.enter.native="focusReviewer()"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="subject-form-title2">
          第二部分：资格审核

        </div>
        <div class="option">
          <el-row>
            <el-col :span="22">
              <div class="grid-content bg-purple">
                <p class="option-p">1）实足年龄（当前年份减出生年份，若当前月日在出生月日前，则再减1岁）：
                  <el-input v-model="insertForm.item1"  disabled auto-complete="off" size="mini"
                            class="answerBox" ref="item1"></el-input>
                  岁
                </p>
                <p class="option-p">&nbsp;&nbsp;&nbsp;&nbsp;（若实际年龄<50或>74，结束调查 ；此后只要出现排除条件，即可停止调查，不再继续）</p>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="option">
          其他条件：1=是，2=否
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
                  <el-input v-model="insertForm.item2" auto-complete="off" size="mini"
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
                  <el-input v-model="insertForm.item3" auto-complete="off" size="mini"
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
                  <el-input v-model="insertForm.item4" auto-complete="off" size="mini"
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
                  <el-input v-model="insertForm.item5" auto-complete="off" size="mini"
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
                  <el-input v-model="insertForm.item6" auto-complete="off" size="mini"
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
                  <span style="font-size: 14px;">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; 1、过去半年中长时间的大便带血；<br>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、明确诊断的缺铁性贫血；<br>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、过去6个月中有记录的不明原因的体重下降（超过10%基础体重）？</span></p>
              </div>
            </el-col>
            <el-col :span="2">
              <div class="grid-content bg-purple-light">
                <el-form-item prop="item7">
                  <el-input v-model="insertForm.item7" auto-complete="off" size="mini"
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
                  <el-input v-model="insertForm.item8" auto-complete="off" size="mini"
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
                  <el-input v-model="insertForm.item9" auto-complete="off" size="mini"
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
                  <el-input v-model="insertForm.item10" auto-complete="off" size="mini"
                            class="answerBox" ref="item10"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <el-form-item>
        <div class="submit-btn">
          <el-button type="primary" @click="add('insertForm')" v-if="btnAuth.buttonSubjectSave" ref="addBtn" id="buttonSubjectSave">提交</el-button>
          <router-link to="/home/home">
            <el-button>取消</el-button>
          </router-link>
        </div>
      </el-form-item>
    </el-form>
    <el-dialog
      title=""
      :visible.sync="submitDialog"
      width="40%"
      :show-close="false"
      center>
      <div v-if="subjectInsertState">
        <div class="submitDialog-title"><h3>符合筛选条件，进入项目</h3></div>
        <p><span class="submitDialog-item-title">随机化/纳入日期:</span> <span>{{groupInfo.inGroupDate}}</span></p>
        <p><span class="submitDialog-item-title">SID:</span> <span>{{groupInfo.sid}}</span></p>
        <p><span class="submitDialog-item-title">随机化分组:</span>
          <span>{{groupInfo.group}}
          </span>
          <span v-if="groupInfo.group=='A'">组-结肠镜组</span>
          <span v-if="groupInfo.group=='B'">组-粪便隐血试验（FIT）</span>
          <span v-if="groupInfo.group=='C'">组-风险评估+粪便隐血试验（FIT）</span>
        </p>
        <p>
          <el-checkbox v-model="checked" class="submitDialog-item-check">短信发送受试者</el-checkbox>
        </p>
      </div>
      <div v-else>
        <div class="submitDialog-title"><h3>对不起，您不符合筛选条件</h3></div>
      </div>
      <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="next()" v-if="subjectInsertState">下一步</el-button>
      <router-link to="/home/home">
          <el-button @click="returnHome()">返回首页</el-button>
      </router-link>
  </span>
    </el-dialog>
    <!-- new -->
    <el-dialog
      title="提示"
      :visible.sync="phonedialogVisible"
      width="30%"
      :before-close="handlephonedialogVisibleClose">
      <span>您输入的手机号码不是11位，受试者无法接收到短信通知</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="phonedialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="phonedialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import CityInfo from'../../utils/citys.js'
  export default {
    ...CityInfo,
    name: 'Right',
    data() {
      var validateIdCord = (rule, value, callback) => {
        this.insertForm.sex = ""
        this.insertForm.birthDate=""
        this.insertForm.item1 = ""
        if (value == " ") {
          callback(new Error('身份证号不能为空'));
        }
        //校验长度，类型
        else if (isCardNo(value) == false) {
          callback(new Error('身份证号码不正确，请重新输入'));
        }
        //检查省份
        else if (checkProvince(value) == false) {
          callback(new Error('身份证号码不正确，请重新输入'));
        }
        //校验生日
        else if (checkBirthday(value) == false) {
          callback(new Error('身份证号码不正确，请重新输入'));
        }
        //检验位的检测
        else if (checkParity(value) == false) {
          callback(new Error('身份证校验不通过,请重新输入'));
        } else {
          let _url='';
          if(this.$route.query.id){
            _url='/base/hospital/personinfo/verify/updateidcard/'+this.insertForm.idCard+'/sid/'+this.$route.query.sid
          }else{
             _url='/base/hospital/personinfo/verify/idcard/'+this.insertForm.idCard
          }

          $axios_http({
            url:_url,
            data: {},
            vueObj: this
          }).then((res) => {
            this.insertForm.item1 = res.data.data
            if(res.data.statusCode == '860004'){
              callback(new Error('身份证号已存在'));
            }else if(res.data.statusCode == '860003') {
              callback(new Error('受试者年龄不符合纳入标准'));
            }else if(res.data.statusCode == '860030') {
              callback(new Error('受试者5年内参加过结肠镜筛查项目'));
            }else{
              this.getBirthday1(value);
              this.getSex(value);
              callback();
            }
          })
        }
      };
      var validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('您录入的手机号位数不能为空'));
        }else if (!(/^\d{5,20}$/.test(value))) {
           callback(new Error('手机号5-20位纯数字'));
        }else if (value) {
           let _url='';
          if(this.$route.query.id){
            _url='/base/hospital/personinfo/verify/updatephone/'+this.insertForm.phone+'/sid/'+this.$route.query.sid
          }else{
             _url='/base/hospital/personinfo/verify/phone/'+this.insertForm.phone
          }
          $axios_http({
            url:_url,
            data: {},
            vueObj: this
          }).then((res) => {
            if(res.data.statusCode == '860029'){
              callback(new Error('手机号已存在'));
            }else{
              callback();
            }
          })
        }
      };
      var validateItem2 = (rule, value, callback) => {
        if (value == '1' || value == '2') {

          callback();
        }
      };
      var validateItem3 = (rule, value, callback) => {
        if (value == '1' || value == '2') {

          callback();
        }
      };
      var validateItem4 = (rule, value, callback) => {
        if (value == '1' || value == '2') {
          callback();
        }
      };
      var validateItem5 = (rule, value, callback) => {
        if (value == '1' || value == '2') {

          callback();
        }
      };
      var validateItem6 = (rule, value, callback) => {
        if (value == '1' || value == '2') {

          callback();
        }
      };
      var validateItem7 = (rule, value, callback) => {
        if (value == '1' || value == '2') {

          callback();
        }
      };
      var validateItem8 = (rule, value, callback) => {
        if (value == '1' || value == '2') {

          callback();
        }
      };
      var validateItem9 = (rule, value, callback) => {
        if (value == '1' || value == '2') {

          callback();
        }
      };


      var vcity = {
        11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古",
        21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏",
        33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南",
        42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆",
        51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃",
        63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外"
      };

//检查号码是否符合规范，包括长度，类型
      function isCardNo(card) {
        //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
        var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
        if (reg.test(card) == false) {
          return false;
        }
        return true;
      }
//取身份证前两位,校验省份
      function checkProvince(card) {
        var province = card.substr(0, 2);
        if (vcity[province] == undefined) {
          return false;
        }
        return true;
      }

//检查生日是否正确
      function checkBirthday(card) {
        //debugger
        var len = card.length;
        //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
        if (len == '15') {
          var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
          var arr_data = card.match(re_fifteen);
          var year = arr_data[2];
          var month = arr_data[3];
          var day = arr_data[4];
          var birthday = new Date('19' + year + '/' + month + '/' + day);
          console.log()
          return verifyBirthday('19' + year, month, day, birthday);
        }
        //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
        if (len == '18') {
          var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
          var arr_data = card.match(re_eighteen);
          var year = arr_data[2];
          var month = arr_data[3];
          var day = arr_data[4];
          var birthday = new Date(year + '/' + month + '/' + day);
          return verifyBirthday(year, month, day, birthday);
        }
        return false;
      }

//校验日期
      function verifyBirthday(year, month, day, birthday) {
        var now = new Date();
        var now_year = now.getFullYear();
        //年月日是否合理
        if (birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day) {
          //判断年份的范围（3岁到100岁之间)
          var time = now_year - year;
          if (time >= 1 && time <= 120) {
            return true;
          }
          return false;
        }
        return false;
      }

//校验位的检测
      function checkParity(card) {
        //15位转18位
        //debugger
        card = changeFivteenToEighteen(card);
        var len = card.length;
        if (len == '18') {
          var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
          var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
          var cardTemp = 0, i, valnum;
          for (i = 0; i < 17; i++) {
            cardTemp += card.substr(i, 1) * arrInt[i];
          }
          valnum = arrCh[cardTemp % 11];
          if (valnum == card.substr(17, 1)) {
            return true;
          }
          return false;
        }
        return false;
      }

//15位转18位身份证号
      function changeFivteenToEighteen(card) {
        if (card.length == '15') {
          var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
          var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
          var cardTemp = 0, i;
          card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
          for (i = 0; i < 17; i++) {
            cardTemp += card.substr(i, 1) * arrInt[i];
          }
          card += arrCh[cardTemp % 11];
          return card;
        }
        return card;
      }
      return {
        CityInfo:CityInfo,
        //弹窗分组信息
        "groupInfo":{
          "sid":"",
          "inGroupDate":"",
          "group":""
        } ,
        //是否符合筛选条件
        subjectInsertState: true,
        editFlag:true,
        //发送短信
        checked: true,
        submitDialog: false,
        subjectInsert_page: false,
        btnAuth: {
          buttonSubjectSave: false,
        },
        options: [],
        //添加表单数据对象
        'insertForm': {
          "name": '',
          "idCard": '',
          "birthDate": '',
          "address1": [],
          "cityOther": '',
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
        phonedialogVisible:false,
        rules: {
          name: [
            {required: true, message: '必填', trigger: 'blur'},
            {min: 2, max: 30, message: '长度在2到30个字符', trigger: 'blur'}
          ],
          reviewer: [
            {required: true, message: '必填', trigger: 'blur'},
            {min: 2, max: 30, message: '长度在2到30个字符', trigger: 'blur'}
          ],
          investigator: [
            {required: true, message: '必填', trigger: 'blur'},
            {min: 2, max: 30, message: '长度在2到30个字符', trigger: 'blur'}
          ],
          idCard: [
            {required: true, message: '必填', trigger: 'change'},
            {validator: validateIdCord, trigger: 'blur'}
          ],
          sex: [
            {required: false, message: '必填', trigger: 'change'}
          ],
          birthDate: [
            {required: false, message: '必填',},
            {min: 8, max: 10, message: '格式不正确', trigger: 'blur'}
          ],
          siteId: [
            {required: true, message: '必填', trigger: 'blur'},
          ],
          address1: [
            {required: true, message: '必填', trigger: 'change'},
//            {min: 4, max: 30, message: '长度在4到30个字符', trigger: 'blur'}
          ],
          address: [
            {required: true, message: '必填', trigger: 'change'},
//            {min: 4, max: 30, message: '长度在4到30个字符', trigger: 'blur'}
          ],
          cityOther: [
            {required: true, message: '必填', trigger: 'blur'},
//            {min: 4, max: 30, message: '长度在4到30个字符', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '必填', trigger: 'blur'},
            {type:'number',message:'手机号必须为数字',trigger: 'blur'},
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
            {required: true, message: '必填', },
            {validator: validateItem2, }
          ],
          item3: [
            {required: true, message: '必填',},
            {validator: validateItem3, }

          ],
          item4: [
            {required: true, message: '必填',},
            {validator: validateItem4, }
          ],
          item5: [
            {required: true, message: '必填',},
            {validator: validateItem5, }
          ],
          item6: [
            {required: true, message: '必填',},
            {validator: validateItem6, }
          ],
          item7: [
            {required: true, message: '必填',},
            {validator: validateItem7, }
          ],
          item8: [
            {required: true, message: '必填',},
            {validator: validateItem8, }
          ],
          item9: [
            {required: true, message: '必填',},
            {validator: validateItem9, }
          ],
          item10: [
            {required: true, message: '必填',},
          ],
        }
      }
    },

    mounted() {
      let obj = this.checkPageAuth(this, "subjectInsert_page", this.btnAuth);
      this.queryAdress();
      this.getToday()
      this.getSiteId()
      if(this.$route.query.id){
        this.query();   //编辑回显
      }
    },
    watch: {
//      'insertForm.siteId': function (val, b) {
//        if (val != '1' && val != '2' && val != '3' && val != '4' && val != '5') {
//          this.$nextTick(function () {
//            this.insertForm.siteId = ''
//          })
//        }
//      },
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
      'insertForm.idCard': function (val, b) {
        if(val.indexOf('x')>-1){
          this.insertForm.idCard = val.replace('x','X')

        }
      },
    },
    methods: {
      // change(){
      //   if(this.insertForm.address1.indexOf('其他')>0){
      //     this.cityOtherShow=true
      //   }else{
      //     this.cityOtherShow=false
      //   }
      // },
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
      query(){  //编辑回显
        $axios_http({
          url: "/base/hospital/review/get/"+this.$route.query.sid,
          data: {},
          vueObj: this
        }).then((res) => {
          //显示操作成功浮动提示框
          this.insertForm = res.data.data;
          let arr1=this.insertForm.province+'/'+this.insertForm.city+'/'+this.insertForm.area+'/'+this.insertForm.township+'/'+this.insertForm.village
          this.insertForm.address1=arr1.split('/');
            // if(this.insertForm.address1.indexOf('其他')>0){
            //     this.cityOtherShow=true
            //   }else{
            //     this.cityOtherShow=false
            //   }
          this.insertForm.birthDate = this.insertForm.birthDate.substr(0,11)
          this.insertForm.surveyDate = this.insertForm.surveyDate.substr(0,10)
          if(this.insertForm.address){
            this.insertForm.address=res.data.data.address.replace('undefined','')    //未选市的时候过滤;
            // this.cityOther=this.insertForm.address;
            // this.cityOtherShow=true;
          }
          if(this.insertForm.sex=="1"){
            this.insertForm.sex='男'
          }else{
            this.insertForm.sex='女'
          }
          // 违反方案判断
           let arr=this.insertForm.item2+''+this.insertForm.item3+''+this.insertForm.item4+''+this.insertForm.item5+''+this.insertForm.item6+''+this.insertForm.item7+''+this.insertForm.item8+''+this.insertForm.item9+''+this.insertForm.item10+''
           if(this.insertForm.age<50 || this.insertForm.age>74 || arr.indexOf('1')>-1){
              this.editFlag=false;
            }else{
              this.editFlag=true;
            }
        })
      },
      goBack(){
        this.$router.go(-1)
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
        this.$refs.address2.focus()
      },
      focusHomeAddr(){
        this.$refs.phone.focus()
      },
      focusPhone(){
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
      watchInputVal(val, opt, a, b) {
        if (val != '1' && val != '2') {
          this.$nextTick(function () {
            opt[a][b] = ''
          })
        }
      },
//      getMyAddress:function(value){
//        for(let y in this.CityInfo){
//          if(this.CityInfo[y].value == value[0]){
//           this.insertForm.address += this.CityInfo[y].label
//          }
//          for(let z in this.CityInfo[y].children){
//            if(this.CityInfo[y].children[z].value == value[1] && value[1]!=undefined){
//              this.insertForm.address += this.CityInfo[y].children[z].label
//            }
//            for(let i in this.CityInfo[y].children[z].children){
//              if(this.CityInfo[y].children[z].children[i].value == value[2] && value[2]!=undefined){
//                this.insertForm.address += this.CityInfo[y].children[z].children[i].label
//                this.insertForm.address += this.insertForm.address2
//              }
//            }
//          }
//        }
//      },
      //保存一条新增数据
      add(formName) { 
        //按钮权限判断
        let _id=this.$refs.addBtn.$attrs.id;
        if(authority(_id)){
          return;
        }
        this.$refs[formName].validate((valid,obj) => {
          if (valid) {
            if(this.insertForm.sex == '男'){
              this.insertForm.sex = '1'
            }  else{
              this.insertForm.sex = '2'
            }
            if(this.$route.query.id){   //编辑
                this.insertForm.address = this.insertForm.address
                this.insertForm.sid=this.$route.query.sid;
                this.insertForm.id=this.$route.query.id;
            }else{   //添加
            // let city;
            // if(this.insertForm.address1[1]){
            //   city=this.insertForm.address1[1];
            // }else{
            //   city=''
            // }
            //  this.insertForm.address = this.insertForm.address1[0]+city+this.insertForm.address2
            }
            this.insertForm.province=this.insertForm.address1[0];
            this.insertForm.city=this.insertForm.address1[1];
            this.insertForm.area=this.insertForm.address1[2];
            this.insertForm.township=this.insertForm.address1[3];
            this.insertForm.village=this.insertForm.address1[4];
            // if(this.insertForm.address1.indexOf('其他')<0){
            //   delete this.insertForm.cityOther;
            // }
            // 编辑弹窗判断
            let arr=this.insertForm.item2+''+this.insertForm.item3+''+this.insertForm.item4+''+this.insertForm.item5+''+this.insertForm.item6+''+this.insertForm.item7+''+this.insertForm.item8+''+this.insertForm.item9+''+this.insertForm.item10+''
           if(this.$route.query.id){
             //编辑
             if(this.editFlag && (this.insertForm.age<50 || this.insertForm.age>74 || arr.indexOf('1')>-1)){
              this.$confirm('<p>请及时将该受试者退出研究并填写违反方案表。</p><p> (无效原因：您不符合筛选条件)</p>', '该受试者无效', {
                        confirmButtonText: '保存，去填写违反方案表',
                        cancelButtonText: '取消',
                        dangerouslyUseHTMLString: true,
                        center: true
                      }).then(() => {
                        this.$message({
                          type: 'success',
                          message: '保存成功!'
                        });
                         $axios_http({
                            url: "/base/hospital/review/update",
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
                              this.editFlag=true;
                              this.$router.push({ path: '/subjects/report4',query:{sid:this.$route.query.sid,schemeId:res.data.data.id,flag:5}})
                            })
                          })
                      }).catch(() => {
                      
                      });
            }else{
              $axios_http({
                url: "/base/hospital/review/update",
                data: this.insertForm,
                vueObj: this
              }).then((res) => {
                //显示操作成功浮动提示框
                $successMsg(this, "保存成功");
                this.editFlag=true;
                this.$router.push({ path: '/subjects/subjectsDetail',query:{id:this.$route.query.sid}})
                Object.assign(this.$data.insertForm, this.$options.data().insertForm)
              })
            }
           }else{
            //新增
            $axios_http({
              url: '/base/hospital/review/insert',
              data: this.insertForm,
              vueObj: this
            }).then((res) => {
              this.submitDialog = true
              if(res.data.statusCode == '860028'){
                this.subjectInsertState = false
              }else {
                this.subjectInsertState = true
                this.groupInfo = res.data.data
                Object.assign(this.$data.insertForm, this.$options.data().insertForm)
              }
            })
           }
          } else {
            //console.log(document.getElementById('address1'));
            for(var item in obj){
              console.log(item)
              if(item=='address1'){
                document.getElementById('address1').focus()
              }else{
                this.$refs[item].focus();
              }
              break;
            }
            console.log('error submit!!');
            return false;
          }
        });

      },
      //下一步
      next(){
        this.$router.replace({path:'/home/riskFactors',query:{sid:this.groupInfo.sid,flag:this.$route.query.flag}})
        if(this.checked){
          $axios_http({
            url: "/base/hospital/person/sms/noticesid/"+this.groupInfo.sid,
            data: {},
            vueObj: this
          }).then((res) => {
            //显示操作成功浮动提示框
            $successMsg(this, "发送成功")

          })
        }
      },
      //获取筛查现场id
      getSiteId(){
        $axios_http({
          url: "/base/hospital/screeningtype/get/",
          data: {},
          vueObj: this
        }).then((res) => {
          this.insertForm.siteId = res.data.data
        })
      },
      //返回首页

      returnHome(){
        this.$router.push({path:'/home/home'})
        this.submitDialog = false
      },
      //提交后弹窗分组
      onSubmit(){
        this.submitDialog = true
      },
      getBirthday1(value) {
        var len = value.length;
        if (len == '15') {
          var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
          var arr_data = value.match(re_fifteen);
          var year = arr_data[2];
          var month = arr_data[3];
          var day = arr_data[4];
          var birthday = '19' + year + '/' + month + '/' + day;
          this.insertForm.birthDate = birthday
        }
        if (len == '18') {
          var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
          var arr_data = value.match(re_eighteen);
          var year = arr_data[2];
          var month = arr_data[3];
          var day = arr_data[4];
          var birthday = year + '-' + month + '-' + day;
          this.insertForm.birthDate = birthday
        }
      },
      getSex(value) {
        var len = value.length;
        if (len == '15') {
          var seqNo = value.substr(12, 3);
        }
        if (len == '18') {
          var seqNo = value.substr(14, 3);
        }
        if (seqNo % 2 == 0) {
          var sex = "女";
        }
        if (seqNo % 2 == 1) {
          var sex = "男";
        }
        this.insertForm.sex = sex
      },
      handlephonedialogVisibleClose(){

      }
    }
  }
</script>
<style scoped>
  .formItemWidth {
    width: 70%;

  }
.el-cascader,.el-cascader input.el-input__inner{
  width: 100%;
}
  .answerBox {
    width: 28px;
    margin: 5px 20px 5px 0;
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
  }
  .form-wrapper .el-input.is-disabled .el-input__inner {
    background-color: #fff;
    border-color: #dcdfe6;
    color: #606266;
    cursor: not-allowed;
  }

</style>
