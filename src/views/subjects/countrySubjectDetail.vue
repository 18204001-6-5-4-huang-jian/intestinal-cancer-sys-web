<template>
  <div slot="right" class="content-page" v-if="country_person_detail_page">
    <div class="content">
      <div class="filter-container">
        <router-link to="/subjects/countrySubjectsList">
          <el-button size="small" class="returns">返回</el-button>
        </router-link>
      </div>
      <div class="booking-list">
        <span class="booking-list-tit">个人信息</span>
        <el-row class="booking-list-item">
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="4">
                  <div class="grid-content bg-purple">
                    SID:
                  </div>
                </el-col>
                <el-col :span="20">
                  <div class="grid-content bg-purple-light">
                    {{detailData.res[0].sid}}
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="4">
                  <div class="grid-content bg-purple">
                    姓名:
                  </div>
                </el-col>
                <el-col :span="20">
                  <div class="grid-content bg-purple-light">
                    {{detailData.res[0].name}}
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="4">
                  <div class="grid-content bg-purple">
                    性别:
                  </div>
                </el-col>
                <el-col :span="20">
                  <div class="grid-content bg-purple-light">
                    {{detailData.res[0].sex | reverseSex}}
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row class="booking-list-item">
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="5">
                  <div class="grid-content bg-purple">
                    手机号:
                  </div>
                </el-col>
                <el-col :span="19">
                  <div class="grid-content bg-purple-light">
                    {{detailData.res[0].phone}}
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    地区医院:
                  </div>
                </el-col>
                <el-col :span="18">
                  <div class="grid-content bg-purple-light">
                    {{detailData.res[0].areaName}}
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    所属社区:
                  </div>
                </el-col>
                <el-col :span="18">
                  <div class="grid-content bg-purple-light">
                    {{detailData.res[0].communDeptName}}
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>

        </el-row>
        <el-row class="booking-list-item">
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    分组方案:
                  </div>
                </el-col>
                <el-col :span="18">
                  <div class="grid-content bg-purple-light">
                    {{detailData.res[0].group | group}}
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="7">
                  <div class="grid-content bg-purple">
                    资格审核表:
                  </div>
                </el-col>
                <el-col :span="17">
                  <div class="grid-content bg-purple-light">
                    {{detailData.res[0].reviewStatus | insertStatus}}
                    <!--<router-link to="/home/subjectInsert">
                      <el-button type="text"  v-if=" detailData.base.reviewStatus == '1'"> 录入</el-button>
                    </router-link>-->
                    <router-link :to="{path:'/subjects/showSubjectInsert',query:{sid:detailData.res[0].sid}}">
                      <el-button type="text"  v-if=" detailData.res[0].reviewStatus == '2'"> 查看</el-button>
                    </router-link>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="8">
                  <div class="grid-content bg-purple">
                    危险因素调查:
                  </div>
                </el-col>
                <el-col :span="16">
                  <div class="grid-content bg-purple-light">
                    {{detailData.res[0].riskFactorStatus | insertStatus}}
                    <!--<router-link :to="{path:'/home/riskFactors',query:{id:detailData.base.sid}}">
                      <el-button type="text"  v-if=" detailData.base.riskFactorStatus == '1'"> 录入</el-button>
                    </router-link>-->
                    <router-link :to="{path:'/subjects/showRiskFactor',query:{sid:detailData.res[0].sid}}">
                      <el-button type="text"  v-if="detailData.res[0].riskFactorStatus == '2'" > 查看</el-button>
                    </router-link>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row class="booking-list-item">
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    总体状态:
                  </div>
                </el-col>
                <el-col :span="18">
                  <div class="grid-content bg-purple-light">
                    {{detailData.res[0].overallStatusCy | overallStatusCy}}
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-dialog :visible.sync="addFormDialog" :title="sampleTitle">
        <el-form :model="addForms">
          <el-form-item label="SID" :label-width="formLabelWidth" >
            <span>{{addForms.sid}}</span>
          </el-form-item>
          <el-form-item label="样本类型" :label-width="formLabelWidth" prop="sampleType">
            <span>{{addForms.sampleType | sampleType}}</span>
          </el-form-item>
          <el-form-item label="采样日期" :label-width="formLabelWidth">
            <span>{{addForms.collectDate}}</span>
          </el-form-item>
          <el-form-item label="样本ID" :label-width="formLabelWidth" >
            <span>{{addForms.sampleId}}</span>
          </el-form-item>
          <el-form-item label="冷冻盒编号" :label-width="formLabelWidth" >
            <span>{{addForms.frozenboxCode}}</span>
          </el-form-item>
          <div class="clearfloat">
            <el-form-item  label="位置" :label-width="formLabelWidth"  style="float: left;">
              <span>{{addForms.sampleColumn}}{{addForms.sampleLine}}</span>
            </el-form-item>
          </div>
          <el-form-item label="备注" :label-width="formLabelWidth" >
            <span>{{addForms.sampleNote}}</span>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog
        title="血液样本"
        :visible.sync="showVisible"
        width="70%"
      >
        <el-form :model="showForm" :inline="true">
          <el-form-item label="采样日期" :label-width="formLabelWidth" prop="collectStatusDateBySql" >
            <el-date-picker
              v-model="showForm.collectStatusDateBySql"
              type="date"
              disabled
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="采样日期"
              size="small"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="样本ID" :label-width="formLabelWidth" prop="sampleId">
            <el-input v-model="showForm.sampleId" auto-complete="off" disabled class="notification-input" size="small"></el-input>
          </el-form-item>
          <div >
            <div v-for="item,index in showForm.hospitalBiologicalSampleResultPOList" class="clearfloat" >
              <el-form-item :label="item.name" :label-width="formLabelWidth" prop="sampleId" style="float: left;">
                <el-checkbox v-model="item.checklist" disabled @change="changeList(item,index)"></el-checkbox>
              </el-form-item>
              <el-form-item label="冷冻盒编号" label-width="120px" prop="frozenBoxCode" style="float: left;">
                <el-input v-model="item.frozenBoxCode" disabled auto-complete="off" class="notification-input" size="mini" style="width: 120px;"></el-input>
              </el-form-item>
              <div class="clearfloat" style="float: left;" v-if="item.sampleType == 'W'">
                <el-form-item  label="位置" label-width="50px"  >
                  <el-input v-model="item.sampleColumnAndLine[0]" disabled auto-complete="off" style="width:60px;margin-left: 20px"  size="mini" ></el-input>
                </el-form-item>
              </div>
              <div class="clearfloat" style="float: left;" v-else>
                <el-form-item  label="位置" label-width="50px" >
                  <el-input v-model="item.sampleColumnAndLine[0]" disabled auto-complete="off" style="width:50px;margin-left: 20px"  size="mini" ></el-input>
                  <el-input v-model="item.sampleColumnAndLine[1]" disabled auto-complete="off" style="width:50px;margin-left: 20px"  size="mini" ></el-input>
                  <el-input v-model="item.sampleColumnAndLine[2]" disabled auto-complete="off" style="width:50px;margin-left: 20px"  size="mini" ></el-input>
                  <el-input v-model="item.sampleColumnAndLine[3]" disabled auto-complete="off" style="width:50px;margin-left: 20px"  size="mini" ></el-input>
                  <el-input v-model="item.sampleColumnAndLine[4]" disabled auto-complete="off" style="width:50px;margin-left: 20px"  size="mini" ></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
          <el-form-item label="备注" :label-width="formLabelWidth" prop="sampleId">
            <el-input v-model="showForm.sampleNote" auto-complete="off" disabled class="notification-input" size="small"></el-input>
          </el-form-item>
        </el-form>
      </el-dialog>
       <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="T1年度" name="1">
          <country-subject-detail-component  
          :fit="detailData.fits" 
          :dna="detailData.stollDNA" 
          :biologicalSamples="detailData.sampleList"
          :colonoscopy="detailData.colonoscopy"></country-subject-detail-component >
          <template v-slot:more>
            <!--粪便样本编码（新）-->
            <h5>粪便样本编码（新）</h5>
            <el-table
              :data="detailData.stoolSampleList"
              border
              style="width: 100%;">
              <el-table-column
                label="编码录入状态"
              >
                <template slot-scope="scope">
                  <span>{{scope.row.codeEntryStatus | codeEntryStatus}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="stoolCode"
                label="编码"
              >
              </el-table-column>
              <el-table-column
                label="编码录入时间"
              >
                <template slot-scope="scope">
                  <span>{{scope.row.codeEntryTime | date}}</span>
                </template>
              </el-table-column>
              <el-table-column
              prop="personCode"
                label="工作人员编码"
              >
              </el-table-column>
            </el-table>

            <!--随访信息-->
            <h5>随访信息</h5>
            <el-table
              :data="detailData.follow"
              border
              style="width: 100%;">
              <el-table-column
                label="表单名称"
              >
                <template slot-scope="scope">
                  <span>{{scope.row.formType | followFormType}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="第一次录入时间"
              >
                <template slot-scope="scope">
                  <span>{{scope.row.entryTime | date}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="最后一次录入时间"
              >
                <template slot-scope="scope">
                  <span>{{scope.row.lastEntryTime | date}}</span>
                </template>
              </el-table-column>
              <el-table-column
              prop="entryUser"
                label="录入工作人员"
              >
              </el-table-column>
              <el-table-column
                label="表单内容"
              >
                <template slot-scope="scope">
                  <div v-if="scope.row.formType=='A3'">
                    <router-link :to="{path:'/followup/followupA3',query:{sid:scope.row.sid,id:scope.row.id,flag:0}}" v-if="scope.row.inputStatus==2">
                      <el-button type="text"  > 查看</el-button>
                    </router-link>
                    <span v-else> 未录入</span>
                  </div>
                  <div v-if="scope.row.formType=='E1'">
                    <router-link :to="{path:'/followup/followupE1',query:{sid:scope.row.sid,id:scope.row.id,flag:0}}" v-if="scope.row.inputStatus==2">
                      <el-button type="text"  > 查看</el-button>
                    </router-link>
                    <span v-else> 未录入</span>
                  </div>
                  <div v-if="scope.row.formType=='E2'">
                    <router-link :to="{path:'/followup/followupE2',query:{sid:scope.row.sid,id:scope.row.id,flag:0}}" v-if="scope.row.inputStatus==2">
                      <el-button type="text"  > 查看</el-button>
                    </router-link>
                    <span  v-else> 未录入</span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-tab-pane>
        <el-tab-pane label="基线年度" name="2">
          <!-- <country-subject-detail-component  
          :fit="detailData.fits" 
          :dna="detailData.stollDNA" 
          :biologicalSamples="detailData.sampleList" 
          :colonoscopy="detailData.colonoscopy"></country-subject-detail-component > -->
          <country-subject-detail-component></country-subject-detail-component >
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import countrySubjectDetailComponent from "@/views/subjects/countrySubjectDetailComponent";
export default {
  data() {
    return {
      activeName:"1",
      country_person_detail_page: false,
      btnAuth: {
        examination_query_btn: false
      },
      serverName: SERVER_NAME,
      showVisible: false,
      sampleTitle: "",
      showForm: {},
      addForms: {},
      addFormDialog: false,
      formLabelWidth: "100px",
      detailData: {
        res: [{
          //基本信息
          sid: "",
          name: "",
          age: "",
          sex: "",
          phone: "",
          inGroupDate: "",
          group: "",
          overall_status_cy: "",
          reviewStatus: "",
          riskFactorStatus: ""
        }],
        fit: [],
        dna: [],
        colonoscopy: [],
        biologicalSamples: []
      }
    };
  },
  components: {
    countrySubjectDetailComponent
  },
  mounted() {
    let obj = this.checkPageAuth(
      this,
      "country_person_detail_page",
      this.btnAuth
    );
    this.query();
  },
  methods: {
    //查询
    query() {
      $axios_http({
        url: "/base/hospital/person/getInfoByCountry",
        data: {
          sid: this.$route.query.id
        },
        vueObj: this
      }).then(res => {
        res.data.data.T1.violationList.filter(item=>{
          item.formType='E2'
        })
        res.data.data.T1.yearList.filter(item=>{
          item.formType='A3'
        })
        res.data.data.T1.contactList.filter(item=>{
          item.formType='E1'
        })
        this.detailData = res.data.data.T1;
        this.detailData.follow = [...this.detailData.yearList,...this.detailData.contactList,...this.detailData.violationList]
      });
    },
    showPDF(dnaCheckFilePath) {
      window.open(dnaCheckFilePath);
    },
    //查看样本弹窗
    showData(id) {
      $axios_http({
        url: "/base/area/sample/result/querySampleBloodId",
        data: {
          id: id
        },
        vueObj: this
      }).then(res => {
        this.showVisible = true;
        this.showForm = res.data.data;
        for (
          let i = 0;
          i < this.showForm.hospitalBiologicalSampleResultPOList.length;
          i++
        ) {
          if (
            this.showForm.hospitalBiologicalSampleResultPOList[i]
              .sampleColumnAndLine == null
          ) {
            this.showForm.hospitalBiologicalSampleResultPOList[
              i
            ].sampleColumnAndLine = ["", "", "", "", ""];
          }
          if (
            this.showForm.hospitalBiologicalSampleResultPOList[i].sampleType ==
            "S"
          ) {
            this.showForm.hospitalBiologicalSampleResultPOList[i].name = "血清";
          } else if (
            this.showForm.hospitalBiologicalSampleResultPOList[i].sampleType ==
            "P"
          ) {
            this.showForm.hospitalBiologicalSampleResultPOList[i].name = "血浆";
          } else if (
            this.showForm.hospitalBiologicalSampleResultPOList[i].sampleType ==
            "W"
          ) {
            this.showForm.hospitalBiologicalSampleResultPOList[i].name =
              "白细胞";
          }
        }
        //          console.log(this.showForm);
      });
    },
    showBiologicalSamples(id) {
      this.addFormDialog = true;
      this.addForms = {};
      $axios_http({
        url: "/base/hospital/person/getSampleTypeDetailById",
        data: {
          id: id
        },
        vueObj: this
      }).then(res => {
        if (res.data.data[0].sampleType == "M") {
          this.sampleTitle = "唾液样本";
        } else {
          this.sampleTitle = "粪便样本";
        }
        this.addForms = res.data.data[0];
      });
    },
    // tab切换
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.booking-list {
  margin: 60px auto;
  padding: 20px;
  border: 1px solid #e5e5e5;
  position: relative;
}
.booking-list-item {
  height: 50px;
  line-height: 40px;
}
.booking-list-tit {
  position: absolute;
  top: -22px;
  display: inline-block;
  padding: 10px;
  background: #ffffff;
}
.returns {
  float: left;
}
.print {
  float: right;
}
.content-page {
  padding: 20px;
  background: #fff;
  width: 100%;
  height: 100%;
}
.booking-list-welcome {
  margin: 50px auto;
  width: 50%;
  font-size: 14px;
}
.booking-list-welcome p {
  height: 24px;
  line-height: 24px;
}
.p-title {
  margin-bottom: 20px;
}
h5 {
  height: 50px;
  line-height: 50px;
}
.clearfloat:after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}
</style>
