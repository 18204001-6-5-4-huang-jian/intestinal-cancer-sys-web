<template>
  <div slot="right" class="content-page" v-if="area_person_detail_page">
    <div class="content">
      <div class="filter-container">
        <router-link to="/subjects/regionSubjectsList">
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
                    {{detailData.base.sid}}
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
                    {{detailData.base.name}}
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
                    {{detailData.base.sex | reverseSex}}
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
                    {{detailData.base.overallStatusCy | overallStatusCy}}
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
                    入组日期:
                  </div>
                </el-col>
                <el-col :span="18">
                  <div class="grid-content bg-purple-light">
                    {{detailData.base.inGroupDate | date}}
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
                    分组方案:
                  </div>
                </el-col>
                <el-col :span="18">
                  <div class="grid-content bg-purple-light">
                    {{detailData.base.group}}组 <span v-if="detailData.base.group == 'C'">{{detailData.base.riskLevel | riskLevel}}</span>
                    <span v-if="detailData.base.group == 'A'">(结肠镜组)</span>
                    <span v-if="detailData.base.group == 'B'">(便潜血组)</span>
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
                    {{detailData.base.phone}}
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
                    {{detailData.base.reviewStatus | insertStatus}}
                    <!--<router-link to="/home/subjectInsert">
                      <el-button type="text"  v-if=" detailData.base.reviewStatus == '1'"> 录入</el-button>
                    </router-link>-->
                    <router-link :to="{path:'/subjects/showSubjectInsert',query:{id:detailData.base.id,sid:detailData.base.sid}}">
                      <el-button type="text"  v-if=" detailData.base.reviewStatus == '2'"> 查看</el-button>
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
                    {{detailData.base.riskFactorStatus | insertStatus}}
                    <!--<router-link :to="{path:'/home/riskFactors',query:{id:detailData.base.sid}}">
                      <el-button type="text"  v-if=" detailData.base.riskFactorStatus == '1'"> 录入</el-button>
                    </router-link>-->
                    <router-link :to="{path:'/subjects/showRiskFactor',query:{id:detailData.base.id,sid:detailData.base.sid}}">
                      <el-button type="text"  v-if="detailData.base.riskFactorStatus == '2'" > 查看</el-button>
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
                      所属社区:
                    </div>
                  </el-col>
                  <el-col :span="16">
                    <div class="grid-content bg-purple-light">
                      {{detailData.base.depName}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
      </div>
      <!-- 年度信息 -->
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="T1年度" name="1">
          <area-subject-detail-component 
          :fit="detailData.fit" 
          :dna="detailData.dna" 
          :sample="detailData.sample"
          :colonoscopy="detailData.colonoscopy"></area-subject-detail-component>
          <template v-slot:more>
            <!--粪便样本编码（新）-->
            <h5>粪便样本编码（新）</h5>
            <el-table
              :data="detailData.stoolSample"
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
                    <span v-else> 未录入</span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-tab-pane>
        <el-tab-pane label="基线年度" name="2">
          <!-- <area-subject-detail-component 
          :fit="detailData.fit" 
          :dna="detailData.dna" 
          :sample="detailData.sample"
          :colonoscopy="detailData.colonoscopy"></area-subject-detail-component> -->
          <area-subject-detail-component></area-subject-detail-component>
        </el-tab-pane>
      </el-tabs>
     
    </div>
  </div>
</template>
<script>
import areaSubjectDetailComponent from "@/views/subjects/areaSubjectDetailComponent";
export default {
  data() {
    return {
      activeName: "1",
      sampleTitle: "",
      addForms: {},
      area_person_detail_page: false,
      addFormDialog: false,
      serverName: SERVER_NAME,
      btnAuth: {
        examination_query_btn: false
      },
      formLabelWidth: "100px",
      detailData: {
        base: {
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
        },
        fit: [
          //fit检查
          {
            code_entry_status: "", //编号录入状态
            insert_status: "", //结果录入状态
            fit_sode: "", //FIT编码，即噗噗管ID
            release_date: "", //发放日期，录入FIT编码日期
            release_person_code: "", //FIT编码，即噗噗管ID
            test_date: "", //检测日期
            result_status: "", //是否有结果，1：有结果，2：无结构
            result_date: "", //录入结果时间
            up_line_value: "", //上线值
            down_line_value: "", //下线值
            result: "", //FIT阴阳性判断：阳性：上线>=4且下线>=4；阴性：上线>=4且下线<4；无效：上线<4；无结果
            no_reson_result: "", //无结果原因
            sid: "" //受试者唯一标识
          }
        ],
        dna: [
          //DNA检查
          {
            sid: "", //受试者唯一标识
            dna_code: "", //粪便DNA编号
            person_code: "", //发放经手人工作编码
            release_date: "", //发放日期
            code_entry_status: "" //编码录入状态，1：未录入，2：已录入
          }
        ],
        colonoscopy: [
          //结肠镜检查
          {
            sid: "", //受试者唯一标识
            reserve_Status: "", //结肠镜检查预约状态，1：未预约，2：已预约
            examination_status: "", //结肠镜检查就诊状态，1：未就诊，2：已就诊
            finished_status: "", //结肠镜完成状态，1：未完成，2：已完成
            result_status: "", //结肠镜结果状态，1：未录入，2：已录入
            pathology_status: "", //结肠镜病理录入状态，1：未录入，2：已录入
            notification_entry_status: "", //结肠镜告知书录入状态，1：未录入，2：已录入
            notification_issue_status: "" //结肠镜告知书发放状态，1：未发放，2：已发放
          }
        ],
        sample: []
      },
      showVisible: false,
      showForm: {},
      titleSample: ""
    };
  },
  components: {
    areaSubjectDetailComponent
  },
  mounted() {
    let obj = this.checkPageAuth(this, "area_person_detail_page", this.btnAuth);
    this.query();
  },
  methods: {
    //查询
    query() {
      $axios_http({
        url: "/base/hospital/person/detail/get/" + this.$route.query.id,
        data: {},
        vueObj: this
      }).then(res => {
        res.data.data.T1.violationList.filter(item => {
          item.formType = "E2";
        });
        res.data.data.T1.yearList.filter(item => {
          item.formType = "A3";
        });
        res.data.data.T1.contactList.filter(item => {
          item.formType = "E1";
        });
        // 循环血清、血浆、白细胞快递状态
        res.data.data.T1.sample && this.sampleData(res.data.data.T1.sample)
        this.detailData = res.data.data.T1;
        this.detailData.follow = [
          ...this.detailData.yearList,
          ...this.detailData.contactList,
          ...this.detailData.violationList
        ];
      });
    },
    // tab切换
    handleClick(tab, event) {
      console.log(tab, event);
    },
    sampleData(data){
      for (let val of data) {
          for (let key of val.mapCourierStatus) {
            if (key.W) {
              val.W = key.W;
            } else if (key.P) {
              val.P = key.P;
            } else if (key.S) {
              val.S = key.S;
            }
          }
        }
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
</style>
