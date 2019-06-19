<template>
  <div class="j_content" v-if="cancerReport2_page">
    <div style="min-width: 941px;">
      <div class="btns">
        <el-button type="normal" size="small" class="fl" @click="goBack()">返回</el-button>
        <p class="text">表C2-癌症诊断表</p>
      </div>
      <el-form :inline="true" :model="formInline" label-width="140px" :rules="rules" ref="formInline">
        <div class="formcon">
          <div class="title">
            总体情况部分
          </div>
          <div class="tables">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="sid:" class="formoneline">
                    {{$route.query.sid}}
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="填表日期:" class="formoneline" prop="writeTableDateToString">
                    <el-date-picker 
                                :clearable="false"
                                :disabled="$route.query.flag==0"
                                v-model="formInline.writeTableDateToString"
                                type="date"
                                format="yyyy年MM月dd日"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期"
                                :picker-options="pickerOptions1">
                    </el-date-picker>
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
                  <el-form-item label="疑似癌症报告日期:" class="formoneline" prop="ysCancerReportDateToString">
                    <el-date-picker 
                                :clearable="false"
                                :disabled="$route.query.flag==0"
                                v-model="formInline.ysCancerReportDateToString"
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
                  <el-form-item label="筛查现场ID:" class="formoneline">
                    {{base.siteId | siteId}}
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="质控者:" class="formoneline" prop="qualityControlPerson">
                    <el-input type="text" v-model.trim="formInline.qualityControlPerson" maxlength="18" :disabled="$route.query.flag==0"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :offset='8'>
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
              </el-row>
          </div>
        </div>
        <div class="formcon">
          <div class="title">
            A：所报癌症病例的调查结果
          </div>
          <div class="tables">
            <el-row>
              <el-form-item label="1. 发现的癌症:" class="formoneline" prop="item1">
                <el-input type="text" v-model.trim="formInline.item1" :disabled="$route.query.flag==0" maxlength="18"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <p class="pTitle">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. 可疑癌症的材料信息完成表格:</p>
              <el-form-item label="" class="formoneline">
                <div class="el-checkbox-group">
                  <el-checkbox v-model="formInline.item21" :label="1" :disabled="$route.query.flag==0">年度信息更新表</el-checkbox>
                  <el-checkbox v-model="formInline.item22" :label="1" :disabled="$route.query.flag==0">癌症报告表</el-checkbox>
                </div>
              </el-form-item>
            </el-row>
            <el-row>
              <p class="pTitle">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="requiredLabel">*</span>&nbsp;3. 确诊癌症的结果:</p>
              <el-form-item label="" class="formoneline" prop="item3">
                <el-radio-group v-model="formInline.item3" :disabled="$route.query.flag==0">
                  <el-radio :label="1">原发病灶为结直肠</el-radio>
                  <el-radio :label="2">原发病灶为结直肠以外其他部位</el-radio>
                  <el-radio :label="3">结直肠外有明确原发恶性肿瘤转移至结直肠</el-radio>
                  <el-radio :label="4">不明来源恶性肿瘤转移至结直肠</el-radio>
                  <el-radio :label="5">原发于结直肠，转移至其他部位</el-radio>
                  <el-radio :label="6">随机分组前已诊断为癌</el-radio>
                  <el-radio :label="7">诊断（癌症）错误</el-radio>
                  <el-radio :label="8">非原发于结直肠的病灶，转移至其它部位</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <p class="pTitle">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="requiredLabel">*</span>&nbsp;3a. 该癌症之前是否被确诊过？</p>
              <el-form-item label="" class="formoneline" prop="item3a">
                <el-radio-group v-model="formInline.item3a" :disabled="$route.query.flag==0">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
          </div>
        </div>
        <div class="formcon" v-if="(formInline.item3==2 || formInline.item3==3 || formInline.item3==4 || formInline.item3==6 || formInline.item3==8) && formInline.item3a==2">
          <div class="title">
            B：非结直肠原发恶性肿瘤诊断信息
          </div>
          <div class="tables">
            <el-row class="rowLong">
              <el-form-item label="4. 原发肿瘤诊断日期:" class="formoneline">
                <el-date-picker 
                                :clearable="false"
                                :disabled="$route.query.flag==0"
                                v-model="formInline.yfCancerDiagnosisDateToString"
                                type="date"
                                format="yyyy年MM月dd日"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期"
                                :picker-options="pickerOptions1">
                    </el-date-picker>
              </el-form-item>
            </el-row>
           <el-row>
              <p class="pTitle">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="requiredLabel">*</span>&nbsp;5. ICD-O-3原发恶性肿瘤分类</p>
              <table class="tableRow">
               <tr>
                 <td>C:</td>
                 <td><el-form-item label="" prop="item51"><el-input type="text" v-model.trim="formInline.item51" :disabled="$route.query.flag==0" maxlength="11"></el-input></el-form-item></td>
                 <td><el-form-item label="" prop="item52"><el-input type="text" v-model.trim="formInline.item52" :disabled="$route.query.flag==0" maxlength="11"></el-input></el-form-item></td>
                 <td><el-form-item label="" prop="item53"><el-input type="text" v-model.trim="formInline.item53" :disabled="$route.query.flag==0" maxlength="11"></el-input></el-form-item></td>
                 <td><el-form-item label="" prop="item54"><el-input type="text" v-model.trim="formInline.item54" :disabled="$route.query.flag==0" maxlength="11"></el-input></el-form-item></td>
               </tr>
               <tr class="tipsRow">
                 <td></td>
                 <td>区域</td>
                 <td>形态学</td>
                 <td>侵犯性</td>
                 <td>分级</td>
               </tr>
             </table>
            </el-row>
          </div>
        </div>
        <div class="formcon">
          <div class="title">
            C：说明
          </div>
          <div class="tables">
            <el-row>
              <el-form-item label="6.说明" prop="item55">
                <el-input type="textarea" v-model="formInline.item55" style="width:800px;" :disabled="$route.query.flag==0" maxlength="1000"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="信息摘录员ID:" class="formoneline" prop="informationZlPerson">
                <el-input type="text" v-model.trim="formInline.informationZlPerson" :disabled="$route.query.flag==0" maxlength="18"></el-input>
              </el-form-item>
            </el-row>
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
        if (value && !(/^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、0-9A-Za-z]+$/.test(value))) {
          callback(new Error('请输入18个以内的数字、字母及符号的组合'))
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
        formInline:{
          investigatorCode:null,
          writeTableDateToString:new Date(),
          ysCancerReportDateToString:new Date(),
          tbTablePerson:null,
          checkYears:new Date(),
          qualityControlPerson:null,
          item1:null,
          item21:null,
          item22:null,
          item3a:null,
          yfCancerDiagnosisDateToString:new Date(),
          item51:null,
          item52:null,
          item53:null,
          item54:null,
          item55:null,
          informationZlPerson:null,
        },
        base:{    //用户基本信息
          name:'',
          siteId:'',
          sex:'',
        },
       rules:{
         checkYears:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
         ysCancerReportDateToString:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
         writeTableDateToString:[
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
          item1:[
             { required: true, message: '必填', trigger: 'blur' }
          ],
          item3:[
             { required: true, message: '必填', trigger: 'blur' }
          ],
          item3a:[
             { required: true, message: '必填', trigger: 'blur' }
          ],
          item51:[
            { required: true, message: '必填', trigger: 'blur' },
            { message: '请输入11位以内的数字', trigger: 'blur', validator: item1_d}
          ],
          item52:[
            { required: true, message: '必填', trigger: 'blur' },
            { message: '请输入11位以内的数字', trigger: 'blur', validator: item1_d}
          ],
          item53:[
            { required: true, message: '必填', trigger: 'blur' },
            { message: '请输入11位以内的数字', trigger: 'blur', validator: item1_d}
          ],
          item54:[
            { required: true, message: '必填', trigger: 'blur' },
            { message: '请输入11位以内的数字', trigger: 'blur', validator: item1_d}
          ],
          item55:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          informationZlPerson:[
            { required: true, message: '必填', trigger: 'blur' },
            { message: '请输入18个以内的数字、字母及符号的组合', trigger: 'blur', validator: item1_c}
          ],
       },
      }
    },
    created() {
      let obj = this.checkPageAuth(this,"cancerReport2_page",this.btnAuth);
      this.getCustomerInfo();
      if(this.$route.query.flag==0 || this.$route.query.flag==2 ){
        // 0-查看  1-录入  2-编辑
        this.queryDiagnoseById();
      }else{
        // 录入
      }
    },
    methods:{
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
      submit(){ //提交
          let validd = true
          this.$refs.formInline.validate((valid) => {
          if (!valid){
            validd = false
          }
          if(validd){
             let dd = this.formInline
              // 设置时间格式
             if(typeof dd.checkYears=='object'){
               dd.checkYears = dd.checkYears.getFullYear()+''
             }
             if(typeof dd.writeTableDateToString=='object'){
               dd.writeTableDateToString=dateFormater.dateFormater(dd.writeTableDateToString)
             }
             if(typeof dd.ysCancerReportDateToString=='object'){
               dd.ysCancerReportDateToString=dateFormater.dateFormater(dd.ysCancerReportDateToString)
             }
             if(typeof dd.yfCancerDiagnosisDateToString=='object'){
               dd.yfCancerDiagnosisDateToString=dateFormater.dateFormater(dd.yfCancerDiagnosisDateToString)
             }
             if(dd.item21){
               dd.item21="1"
             }else{
               dd.item21="2"
             }
            if(dd.item22){
               dd.item22="1"
             }else{
               dd.item22="2"
             }
            //  题之间的关联
            if(!((dd.item3==2 || dd.item3==3 || dd.item3==4 || dd.item3==6 || dd.item3==8) && dd.item3a==2)){
              delete dd.yfCancerDiagnosisDateToString;
              delete dd.item51;
              delete dd.item52;
              delete dd.item53;
              delete dd.item54;
            }
            //  新增
            if(this.$route.query.flag==1){
              dd.sid=this.$route.query.sid;
              dd.cancerRecordId=this.$route.query.id;
            }else if(this.$route.query.flag==2){
              dd.sid=this.$route.query.sid;
              dd.cancerRecordId=this.$route.query.cancerRecordId;
              dd.id=this.$route.query.id;
              delete dd.dateCreated;
              delete dd.deptCode;
              delete dd.stage;
              delete dd.updateTime;
              delete dd.writeTableDate;
              delete dd.yfCancerDiagnosisDate;
              delete dd.ysCancerReportDate;
            }
            let _url='';
            if(this.$route.query.flag==1){
              _url="/base/hospital/cancer/adddiagnose"
            }else{
              _url='/base/hospital/cancer/updateDiagnose'
            }
            console.log(dd)
            $axios_http({
              url:_url,
              data: dd,
              vueObj: this
            }).then((res) => {
              this.$message({
                 type: 'success',
                 message: '提交成功，请及时填写C3表!'
               });
              //  resource 0-来源待办   1-来源终点事件管理列表
               if(this.$route.query.resource==0){
                 this.$router.push("/home/uncompletedEventList");
               }else if(this.$route.query.resource==1){
                  this.$router.push("/event/eventList2");
               }
             
            })
          }
        })
      },
      cancel(){
        Object.assign(this.$data.formInline, this.$options.data().formInline);
        if(this.$route.query.resource==0){
                 this.$router.push("/home/uncompletedEventList");
               }else if(this.$route.query.resource==1){
                  this.$router.push("/event/eventList2");
               }
      },
        // 查看癌症信息
      queryDiagnoseById(){
        $axios_http({
          url: "/base/hospital/cancer/report/queryDiagnoseById",
          data: {
            id:this.$route.query.id,
          },
          vueObj: this
        }).then((res) => {
          this.formInline=res.data.data;
          // 设置时间默认值
          if(!this.formInline.yfCancerDiagnosisDateToString){
            this.formInline.yfCancerDiagnosisDateToString=new Date()
          }
          if(this.formInline.item21==1){
            this.formInline.item21=true
          }else{
            this.formInline.item21=false
          }
          if(this.formInline.item22==1){
            this.formInline.item22=true
          }else{
            this.formInline.item22=false
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
    // font-size: 0;
    line-height: 0;
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
   .cancerTable td:nth-child(3){
      text-align: left;
   }
   .cancerTable .el-form-item{
     margin:0 0 5px 0;
     padding:0 5px;
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
  .tables .el-radio{
    display: block;
    margin-bottom: 10px;
    padding-left:40px;
    margin-left: 0px;
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
</style>
<style>
.rowLong .el-form-item__label{
  width: 170px !important;
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
</style>

