<template>
  <div class="j_content" v-if="follow_up_e2_page">
    <div style="min-width: 941px;">
      <div class="btns">
        <el-button type="normal" size="small" class="fl" @click="goBack()">返回</el-button>
        <p class="text">表E2-受试者无应答/违反研究方案表</p>
      </div>
      <el-form :inline="true" :model="formInline" label-width="115px" :rules="rules" ref="formInline">
      <div class="formcon">
        <div class="title">
          基本信息
        </div>
        <div class="tables">
          
            <el-row>
              <el-col :span="8">
                 <el-form-item label="SID:" class="formoneline">
                   {{formInline.sid}}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                 <el-form-item label="筛查现场ID:" class="formoneline">
                   {{formInline.siteId | siteId}}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                 <el-form-item label="填表日期:" class="formoneline" prop="fillinDate">
                   <el-date-picker 
                               :clearable="false"
                               :disabled="$route.query.flag==0"
                               v-model="formInline.fillinDate"
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
                 <el-form-item label="工作人员编码:" class="formoneline" prop="investigatorCode">
                   <el-input type="text" v-model.trim="formInline.investigatorCode" maxlength="20" :disabled="$route.query.flag==0"></el-input>
                </el-form-item>
              </el-col>              
              <el-col :span="8">
                 <el-form-item label="填表人:" class="formoneline" prop="tbTablePerson">
                   <el-input type="text" v-model.trim="formInline.tbTablePerson" maxlength="20" :disabled="$route.query.flag==0"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                 <el-form-item label="质控者:" class="formoneline" prop="qualityControlPerson">
                   <el-input type="text" v-model.trim="formInline.qualityControlPerson" maxlength="20" :disabled="$route.query.flag==0"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
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
                 <el-form-item label="最后联系日期:" class="formoneline" prop="lastContactDate">
                   <el-date-picker 
                               :clearable="false"
                               :disabled="$route.query.flag==0"
                               v-model="formInline.lastContactDate"
                               type="date"
                               format="yyyy年MM月dd日"
                               value-format="yyyy-MM-dd"
                               placeholder="选择日期"
                               :picker-options="pickerOptions1">
              </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                 <el-form-item label="姓名:" class="formoneline">
                   {{formInline.name}}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                 <el-form-item label="性别:" class="formoneline">
                   {{formInline.sex | reverseSex}}
                </el-form-item>
              </el-col>
            </el-row>
        </div>
      </div>
      <div class="formcon">
        <div class="title">
          筛查对象状态
        </div>
        <div class="tables">
                <el-row>
                    <el-form-item label="1. 选择筛查对象状态:" class="block" prop="objStatus" label-width="160px">
                        <el-radio-group v-model="formInline.objStatus" :disabled="$route.query.flag==0">
                        <el-radio :label="1">1.失去联系（无法联系到筛查对象）</el-radio>
                        <el-radio :label="2">2.拒绝</el-radio>
                        <el-radio :label="3">3.已故</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-row>
                <el-row v-if="formInline.objStatus==2">
                    <el-form-item label="1.1. 拒绝类型:" class="block" prop="refuseType">
                        <el-radio-group v-model="formInline.refuseType" :disabled="$route.query.flag==0">
                        <el-radio :label="1">1.筛查对象拒绝接受年度随访问卷</el-radio>
                        <el-radio :label="2">2.筛查对象拒绝接受FIT检查</el-radio>
                        <el-radio :label="3">3.FIT结果为阳性，但拒绝接受结肠镜检查</el-radio>
                        <el-radio :label="3">4.风险评估为高风险，但拒绝接受结肠镜检查</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-row>
                <el-row v-if="formInline.objStatus==3">
                    <el-form-item label="1.2. 死亡日期:" class="formoneline" prop="deathDate">
                    <el-date-picker 
                        :clearable="false"
                        :disabled="$route.query.flag==0"
                        v-model="formInline.deathDate"
                        type="date"
                        format="yyyy年MM月dd日"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        :picker-options="pickerOptions1">
                        </el-date-picker>
                    </el-form-item>
                </el-row>
                <el-row>
                <el-form-item label="2. 备注:" class="formoneline" label-width="65px">
                    <el-input type="textarea" v-model="formInline.remark" style="width:800px;" :disabled="$route.query.flag==0" maxlength="1000"></el-input>
                </el-form-item>
                </el-row>
          </div>
      </div>
      </el-form>
      <div class="text-center" style="margin-top: 40px;" v-if="$route.query.flag!=0">
        <el-button type="primary" @click="submit()">提交</el-button>
        <el-button @click='cancel'>取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "report1",
  data() {
    return {
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      pickerOptions2: {
        disabledDate(time) {
          return Date.now() > time.getTime();
        }
      },
      follow_up_e2_page: false,
      formInline: {
        sid: null,
        siteId: null,
        deathDate: null,
        remark: null,
        fillinDate: null,
        investigatorCode: null,
        tbTablePerson: null,
        qualityControlPerson: null,
        checkYears: null,
        name: null,
        sex: null,
        objStatus: null,
        refuseType: null
      },
      rules: {
        fillinDate: [{ required: true, message: "必填", trigger: "blur" }],
        lastContactDate: [{ required: true, message: "必填", trigger: "blur" }],
        checkYears: [{ required: true, message: "必填", trigger: "blur" }],
        investigatorCode: [
          { required: true, message: "必填", trigger: "blur" }
        ],
        tbTablePerson: [{ required: true, message: "必填", trigger: "blur" }],
        qualityControlPerson: [
          { required: true, message: "必填", trigger: "blur" }
        ],
        objStatus: [{ required: true, message: "必填", trigger: "blur" }],
        refuseType: [{ required: true, message: "必填", trigger: "blur" }],
        deathDate: [{ required: true, message: "必填", trigger: "blur" }]
      }
    };
  },
  created() {
    this.formInline.id = this.$route.query.id || this.$route.query.formId;
    let obj = this.checkPageAuth(this, "follow_up_e2_page", this.btnAuth);
    this.getCustomerInfo();
    if (this.$route.query.flag == 0 || this.$route.query.flag == 2) {
      // 0-查看  1-录入  2-编辑
      this.getResearchInfo()
    } else {
      // 录入
    }
  },
  methods: {
    submit() {
      //提交
      this.$refs.formInline.validate(valid => {
        if (valid) {
          $axios_http({
            url: "/base/follow/violationResearch/save",
            data: Object.assign({},this.formInline),
            vueObj: this
          }).then(res => {
            if(res.data.statusCode === '000000') {
              $successMsg(this, "保存成功");
              this.goBack();
            }
          });
        }else{
          $failMsg(this, "有未填项");
        }
      });
    },
    cancel() {
      Object.assign(this.$data.formInline, this.$options.data().formInline);
      this.goBack();
    },
    // 获取用户基本信息
    getCustomerInfo() {
      $axios_http({
        url: "/base/hospital/review/get/" + this.$route.query.sid,
        data: {},
        vueObj: this
      }).then(res => {
        this.base = res.data.data;
        const { sid, siteId, name, sex } = res.data.data;
        this.formInline.sid = sid;
        this.formInline.siteId = siteId;
        this.formInline.name = name;
        this.formInline.sex = sex;
      });
    },
    // 查看
    getResearchInfo(){
      $axios_http({
        url: "/base/follow/violationResearchInfo/query",
        data: {
          id:this.$route.query.id
        },
        vueObj: this
      }).then(res => {
        this.formInline = res.data.data
      });
    }
  }
};
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
  margin-top: -20px;
  min-height: 20px;
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
.tables {
  margin: 40px 50px 30px 50px;
  line-height: 0;
}
.formcon .title {
  font-size: 16px;
  text-align: center;
  line-height: 2;
  background: rgb(204, 204, 204);
  color: #000000;
}
.formoneline .el-form-item__label {
  text-align: right;
}
.el-date-editor.el-input {
  width: 202px;
}
.cancerTable .el-date-editor.el-input {
  width: 180px;
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
</style>

