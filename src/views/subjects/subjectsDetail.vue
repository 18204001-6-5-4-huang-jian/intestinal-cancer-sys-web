<template>
  <div slot="right" class="content-page" v-if="subjectsDetail_page">
    <div class="content">
      <el-button size="small" class="returns" @click=goBack()>返回</el-button>
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
                    {{detailData.base.group}} 组<span v-if="detailData.base.group == 'C'">{{detailData.base.riskLevel | riskLevel}}</span>
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
                    <span v-if=" detailData.base.reviewStatus == '1'">未录入</span>
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
                    T0危险因素调查:
                  </div>
                </el-col>
                <el-col :span="16">
                  <div class="grid-content bg-purple-light">
                    <span v-if=" detailData.base.riskFactorStatus == '1'">未录入</span>
                    <router-link :to="{path:'/subjects/showRiskFactor',query:{id:detailData.hospitalRiskFactor.id,sid:detailData.hospitalRiskFactor.sid}}" v-if="detailData.hospitalRiskFactor">
                      <el-button type="text"  v-if="detailData.base.riskFactorStatus == '2'"> 查看</el-button>
                    </router-link>
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
          <subject-detail-component 
          :fit="detailData.fit" 
          :dna="detailData.dna" 
          :colonoscopy="detailData.colonoscopy"></subject-detail-component>
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
          <!-- <subject-detail-component 
          :fit="detailData.fit" 
          :dna="detailData.dna" 
          :colonoscopy="detailData.colonoscopy"></subject-detail-component> -->
          <subject-detail-component></subject-detail-component>
        </el-tab-pane>
      </el-tabs>
  </div>
</template>
<script>
import subjectDetailComponent from "@/views/subjects/subjectDetailComponent";
export default {
  data() {
    return {
      activeName: "1",
      subjectsDetail_page: false,
      btnAuth: {
        examination_query_btn: false
      },
      formLabelWidth: "100px",
      serverName: SERVER_NAME,
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
        hospitalRiskFactor: {},
        fit: [],
        dna: [],
        colonoscopy: []
      }
    };
  },
  mounted() {
    let obj = this.checkPageAuth(this, "subjectsDetail_page", this.btnAuth);
    this.query();
  },
  components: {
    subjectDetailComponent
  },
  methods: {
    showPDF(dnaCheckFilePath) {
      window.open(dnaCheckFilePath);
    },
    //查询
    query() {
      $axios_http({
        url: "/base/hospital/person/detail/get/" + this.$route.query.id,
        data: {},
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
        this.detailData=res.data.data.T1;
        this.detailData.follow = [...this.detailData.yearList,...this.detailData.contactList,...this.detailData.violationList]
        console.log(this.detailData.dna)
      });
    },
    //日期格式化
    dateFormat: function(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return date.substring(0, 11);
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
  height: 40px;
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
