<template>
  <div class="j_content" v-if="cancerReport1_page">
    <div style="min-width: 941px;">
      <div class="btns">
        <el-button type="normal" size="small" class="fl" @click="goBack()">返回</el-button>
        <p class="text">表C1-癌症报告表</p>
      </div>
      <div class="formcon">
        <div class="title">
          总体情况部分
        </div>
        <div class="tables">
          <el-form :inline="true" :model="formInline" label-width="115px" :rules="rules" ref="formInline">
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
                    placeholder="选择年份"
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
          </el-form>
        </div>
      </div>
      <div class="formcon">
        <div class="title">
          A.癌症信息
        </div>
        <div class="tables">
          <el-form :inline="true" :model="formInline">
            <table class="j_table cancerTable">
                    <tr class="title" style="display:block">
                      <th width="280" rowspan="2">癌症类型/部位<br>（可以为任何癌种）</th>
                      <th width="191" rowspan="2">报告日期</th>
                      <th width="280" rowspan="2">诊断材料来源&nbsp;&nbsp;
                        <el-popover
                          placement="top"
                          width="300"
                          trigger="click">
                            <!-- 提示信息 -->
                            <div class="bbsm">
                              <h1>诊断材料来源编码</h1>
                              <p class="txsm">1. 参加筛查者本人；</p>
                              <p class="txsm">2. 参加筛查者亲属、配偶、或朋友；</p>
                              <p class="txsm">3. 健康中心提供；</p>
                              <p class="txsm">4. 医疗记录；</p>
                              <p class="txsm">5. 死亡证明；</p>
                              <p class="txsm"> 6. 其它</p>
                            </div>
                          <el-button slot="reference" type="text">编码说明</el-button>
                        </el-popover>
                      </th>
                      <th width="100" rowspan="2">操作</th>
                    </tr>
                    <div v-for="(x,index) in hospitalCancerReportMessagePOS" :key="index">
                      <el-form :inline="true" :model="x" class="demo-form-inline" :ref="'formInlinelist'+index" style="display:table-row-group;" :rules="formInlinelist">
                        <tr>
                            <td width="280">
                                <el-form-item label=" " prop="cancerTypeSite" >
                                  <el-input v-model.trim="x.cancerTypeSite"  size="small" style="width:100%" maxlength="18" :disabled="$route.query.flag==0"></el-input>
                                </el-form-item>
                            </td>
                            <td width="180">
                              <el-form-item label="" prop="reportDateToString">
                                <el-date-picker 
                                  width="150px"
                                  :clearable="false"
                                  :disabled="$route.query.flag==0"
                                  v-model="x.reportDateToString"
                                  size="small"
                                  type="date"
                                  format="yyyy年MM月dd日"
                                  value-format="yyyy-MM-dd"
                                  placeholder="选择日期"
                                  :picker-options="pickerOptions1">
                                </el-date-picker>
                              </el-form-item>
                            </td>
                            <td width="280">
                              <el-form-item label=" " prop="diagnoseSource">
                                <el-input v-model.trim="x.diagnoseSource"  size="small" style="width:50px;" :disabled="$route.query.flag==0"></el-input>
                              </el-form-item>
                              <el-form-item label=" " prop="diagnoseSourceOther" v-if="x.diagnoseSource==6">
                                <el-input v-model.trim="x.diagnoseSourceOther"  size="small" maxlength="50"  style="width:150px;" :disabled="$route.query.flag==0"></el-input>
                              </el-form-item>
                            </td>
                            <td width="100">
                              <el-button type="text" size="small" @click="del(index)" v-if="delBtnShow && $route.query.flag!=0">删除</el-button>
                            </td>
                        </tr>
                      </el-form>
                    </div>
                  </table>
          </el-form>
          <div >
            <el-button type="primary"  size="small" class="addBtn" @click="add" v-if="$route.query.flag!=0"><i class="el-icon-plus"></i>添加记录</el-button>
          </div>
        </div>
      </div>
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
        if (value && !(/^[1-6]{1,1}$/.test(value))) {
          callback(new Error('编码错误'))
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
        },
       hospitalCancerReportMessagePOS:[{
          cancerTypeSite:null,
          reportDateToString:new Date(),
          diagnoseSource:null,
          diagnoseSourceOther:null,
       }],
       rules:{
         tbTableDateToString:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          checkYears:[
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
       },
        formInlinelist:{
          reportDateToString:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
         cancerTypeSite:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
         diagnoseSource:[
            { required: true, message: '必填', trigger: 'blur' },
            { message: '编码错误', trigger: 'blur', validator: item1_c}
          ],
          diagnoseSourceOther:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
       }
      }
    },
    created() {
      let obj = this.checkPageAuth(this,"cancerReport1_page",this.btnAuth);
      this.getCustomerInfo();
      if(this.$route.query.flag==0 || this.$route.query.flag==2 ){
        // 0-查看  1-录入  2-编辑
        this.queryreportbyid();
      }else{
        // 录入
      }
       // 控制删除按钮显示隐藏
       if(this.hospitalCancerReportMessagePOS.length==1){
         this.delBtnShow=false;
       }else{
         this.delBtnShow=true;
       }
      
    },
    methods:{
      add(){// 添加癌症信息
        this.hospitalCancerReportMessagePOS.push({
          cancerTypeSite:null,
          reportDateToString:new Date(),
          diagnoseSource:null,
          diagnoseSourceOther:null,
       });
        // 控制删除按钮显示隐藏
        this.delBtnShow=true;
      },
      del(index){// 删除癌症信息
        // 控制删除按钮显示隐藏
        if(this.hospitalCancerReportMessagePOS.length<=2){
          this.delBtnShow=false;
        }
        this.hospitalCancerReportMessagePOS.splice(index,1)
      },
      submit(){ //提交
          let validd = true
          this.$refs.formInline.validate((valid) => {
          if (!valid){
            validd = false
          }
          if(this.hospitalCancerReportMessagePOS && this.hospitalCancerReportMessagePOS.length){
          for(var i=0;i<this.hospitalCancerReportMessagePOS.length;i++){
            this.$refs['formInlinelist'+i][0].validate((valid) => {
              if (!valid){
                validd = false
              }
            })
          }
        }
          if(validd){
             let dd = this.formInline 
             // 设置时间格式
             if(typeof dd.checkYears=='object'){
               dd.checkYears = dd.checkYears.getFullYear()+''
             }
             if(typeof dd.tbTableDateToString=='object'){
               dd.tbTableDateToString=dateFormater.dateFormater(dd.tbTableDateToString)
             }
            //  新增
            if(this.$route.query.flag==1){
              dd.sid=this.$route.query.sid;
              dd.cancerRecordId=this.$route.query.id;
            }else if(this.$route.query.flag==2){
              dd.sid=this.$route.query.sid;
              dd.cancerRecordId=this.$route.query.cancerRecordId;
              dd.id=this.$route.query.id;
            }
            dd.hospitalCancerReportMessagePOS = this.hospitalCancerReportMessagePOS
            // 删除多余的参数
            dd.hospitalCancerReportMessagePOS.filter(item=>{
              if(typeof item.reportDateToString=='object'){
                item.reportDateToString=dateFormater.dateFormater(item.reportDateToString)
              }
              delete item.dateCreated;
              delete item.id;
              delete item.reportDate;
              delete item.updateTime;
              delete item.cancerReportId;
            })
            
            let _url='';
            if(this.$route.query.flag==1){
              _url="/base/hospital/cancer/addreport"
            }else{
              _url='/base/hospital/cancer/updatereport'
            }
             $axios_http({
              url:_url,
              data: dd,
              vueObj: this
            }).then((res) => {
              this.$message({
                 type: 'success',
                 message: '提交成功，请及时填写C2表!'
               });
              //  resource 0-来源待办   1-来源终点事件管理列表
               if(this.$route.query.resource==0){
                 this.$router.push("/home/uncompletedEventList");
               }else if(this.$route.query.resource==1){
                  this.$router.push("/event/eventList1");
               }
             
            })
          }
        })
      },
      cancel(){
        Object.assign(this.$data.formInline, this.$options.data().formInline);
        this.hospitalCancerReportMessagePOS=[{}];
        if(this.$route.query.resource==0){
                 this.$router.push("/home/uncompletedEventList");
               }else if(this.$route.query.resource==1){
                  this.$router.push("/event/eventList1");
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
          url: "/base/hospital/cancer/report/queryreportbyid",
          data: {
            id:this.$route.query.id,
          },
          vueObj: this
        }).then((res) => {
          let result=res.data.data;
          this.formInline.tbTableDateToString=result.tbTableDateToString
          this.formInline.investigatorCode=result.investigatorCode     //人员编码
          this.formInline.checkYears=result.checkYears
          this.formInline.tbTablePerson=result.tbTablePerson    //填表人
          this.formInline.qualityControlPerson=result.qualityControlPerson      //质控者
          this.hospitalCancerReportMessagePOS=result.hospitalCancerReportMessagePOS;
          // 控制删除按钮显示隐藏
          if(this.hospitalCancerReportMessagePOS.length==1){
            this.delBtnShow=false;
          }else{
            this.delBtnShow=true;
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
    font-size: 0;
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
  .cancerTable td{
    border-top:0;
  }
   .cancerTable td:nth-child(3){
      text-align: left;
   }
   .cancerTable .el-form-item{
     margin:0 0 5px 0;
     padding:0 5px;
   }
</style>
<style>
 .j_content .el-input.is-disabled .el-input__inner {
    background-color: #fff;
    border-color: #dcdfe6;
    color: #606266;
  }
  .j_content .el-textarea.is-disabled .el-textarea__inner {
    background-color: #fff;
    border-color: #dcdfe6;
    color: #606266;
  }
   .j_table .el-input--prefix .el-input__inner{
     padding: 0 30px;
   }
</style>

