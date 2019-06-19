<template>
  <div>
      <!--数据列表-->
      <h5>FIT列表</h5>
      <el-table
        :data="fit"
        border
        style="width: 100%;">
        <el-table-column
          label="编号录入状态"
          width="160"
        >
          <template slot-scope="scope">
            <span>{{scope.row.codeEntryStatus | codeEntryStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="fitCode"
          label="编码"
        >
        </el-table-column>
        <el-table-column
          prop="codeEntryTime"
          label="编码录入时间"
          :formatter="dateFormat"
          width="160"
        >
        </el-table-column>
        <el-table-column
          prop="releasePersonCode"
          label="工作人员编码"
          width="160"
        >
        </el-table-column>
        <el-table-column
          label="结果录入状态"
          width="160"
        >
          <template slot-scope="scope">
            <span>{{scope.row.insertStatus | codeEntryStatus}}</span>
          </template>
        </el-table-column>

        <el-table-column
          width="160"
          label="结果录入时间 "
          :formatter="dateFormat"
          prop="resultDate"
        >
        </el-table-column>
        <el-table-column
          label="结果"
          width="160"
        >
          <template slot-scope="scope">
            <span>{{scope.row.resultStatus | resultStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="upLineValue"
          label="上线值"
          width="160"
        >
        </el-table-column>
        <el-table-column
          prop="downLineValue"
          label="下线值"
          width="160"
        >
        </el-table-column>
        <el-table-column
          label="FIT阴阳性"
          width="120"
        >
          <template slot-scope="scope">
            <span>{{scope.row.result | result}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="noResonResul"
          label="无结果原因"
          width="160"
        >
        </el-table-column>

        <!--<el-table-column-->
          <!--label="操作"-->
        <!--&gt;-->
          <!--<template slot-scope="scope">-->
            <!--<el-button type="text"  > 查看</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->
      </el-table>
      <!--DNA列表-->
      <h5>DNA列表</h5>
      <el-table
        :data="dna"
        border
        style="width: 100%;">
        <el-table-column
          label="编码录入状态"
        >
          <template slot-scope="scope">
            <span>{{scope.row.codeEntryStatus | codeEntryStatusNew}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="dnaCode"
          label="编码"
        >
        </el-table-column>

        <el-table-column
          label="结果录入状态"
        >
          <template slot-scope="scope">
            <span>{{scope.row.dnaCheckEnterStatus | codeEntryStatusNew}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="DNA结果"
        >
          <template slot-scope="scope">
            <span>{{scope.row.dnaCheckResult | result}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="dnaCheckGoal"
          label="FIT-DNA得分"
        >
        </el-table-column>
        <el-table-column
          prop="dnaCheckQuantum"
          label="FIT定量化结果(ug hb/ml)"
          width="200"
        >
        </el-table-column>
        <el-table-column
          label="PDF文件"
        >
          <template slot-scope="scope">
              <el-button type="text" v-if="scope.row.dnaCheckFilepath != null"> <a :href="serverName + '/base/dnafile/downFile?filePath=' + scope.row.dnaCheckFilepath">下载PDF</a></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--结肠镜列表-->
      <h5>结肠镜列表</h5>
      <el-table
        :data="colonoscopy"
        border
        style="width: 100%;">
        <el-table-column
          label="肠镜预约状态"
        >
          <template slot-scope="scope">
            <span>{{scope.row.reserveStatus | reserveStatus}}</span>

          </template>
        </el-table-column>
        <el-table-column
          label="肠镜预约时间"
          width="160"
        >
          <template slot-scope="scope">
            <span>{{scope.row.reserveDate | date}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="检查状态"
        >
          <template slot-scope="scope">
            <span>{{scope.row.examinationStatus | examinationStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="完成状态"
        >
          <template slot-scope="scope">
            <span>{{scope.row.finishedStatus | finishedStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="结果录入状态"
          width="160"
        >
          <template slot-scope="scope">
            <span>{{scope.row.resultStatus | c_resultStatus}}</span>
            <router-link :to="{path:'/colonscopy/showReport1',query:{sid:scope.row.sid,id:scope.row.result_id,show:1}}" v-if="scope.row.resultStatus==2">
              <el-button type="text"  > 查看</el-button>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          label="病理录入状态"
          width="160"
        >
          <template slot-scope="scope">
            <span>{{scope.row.pathologyStatus | codeEntryStatus}}</span>
            <router-link :to="{path:'/colonscopy/showReport2',query:{sid:scope.row.sid,id:scope.row.pathology_id,show:1}}" v-if="scope.row.pathologyStatus==2">
              <el-button type="text" > 查看</el-button>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          label="告知书录入状态"
          width="160"
        >
          <template slot-scope="scope">
            <span>{{scope.row.notificationEntryStatus | notificationEntryStatus}}</span>
            <router-link :to="{path:'/colonscopy/showReport3',query:{sid:scope.row.sid,id:scope.row.id,show:1}}" v-if="scope.row.notificationEntryStatus==2">
              <el-button type="text" > 查看</el-button>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          label="告知书发放状态"
        >
          <template slot-scope="scope">
            <span>{{scope.row.notificationIssueStatus | notificationIssueStatus}}</span>
          </template>
        </el-table-column>
      </el-table>

      <h5>生物样本列表</h5>
      <el-table
        :data="biologicalSamples"
        border
        style="width: 100%;">
        <el-table-column label="血液样本" align="center">
          <el-table-column label="采集状态">
            <template slot-scope="scope">
              <span>{{scope.row.sample_A | sample_S}}</span>
              <span v-if="scope.row.sample_A == 1" style="margin-left: 15px;" @click="showData(scope.row.asid)"> <el-button type="text">查看</el-button></span>
            </template>
          </el-table-column>
          <el-table-column label="血清快递状态">
            <template slot-scope="scope">
              <span>{{scope.row.mapCourierStatus[1].S | courierStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column label="血浆快递状态" >
            <template slot-scope="scope">
              <span>{{scope.row.mapCourierStatus[2].P | courierStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column label="白细胞快递状态">
             <template slot-scope="scope">
              <span>{{scope.row.mapCourierStatus[0].W | courierStatus}}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="唾液样本"  align="center">
          <el-table-column label="录入状态">
            <template slot-scope="scope">
            <span>{{scope.row.sample_M | sample_S}}</span>
            <span v-if="scope.row.sample_M == 1" style="margin-left: 15px;" @click="showBiologicalSamples(scope.row.msid)"> <el-button type="text">查看</el-button></span>
          </template>
          </el-table-column>
          <el-table-column label="快递状态">
            <template slot-scope="scope">
              <span>{{scope.row.mCourierStatus | courierStatus}}</span>
            </template>
          </el-table-column>

        </el-table-column>
        <el-table-column label="粪便样本" align="center">
          <el-table-column label="录入状态">
            <template slot-scope="scope">
              <span>{{scope.row.sample_F | sample_S}}</span>
              <span v-if="scope.row.sample_F == 1" style="margin-left: 15px;" @click="showBiologicalSamples(scope.row.fsid)"> <el-button type="text">查看</el-button></span>
            </template>
          </el-table-column>
          <el-table-column label="快递状态">
            <template slot-scope="scope">
              <span>{{scope.row.fCourierStatus | courierStatus}}</span>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
      <slot name="more"></slot>
    </div>
</template>
<script>
export default {
  props: {
      fit: {
        type: Array,
         default: function(){
          return []
        }
      },
      dna: {
        type: Array,
         default: function(){
          return []
        }
      },
      colonoscopy: {
        type: Array,
         default: function(){
          return []
        }
      },
      biologicalSamples: {
        type: Array,
         default: function(){
          return []
        }
      }
    },
  data() {
    return {
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
    };
  },
  methods: {
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
    //日期格式化
    dateFormat: function(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return date.substring(0, 11);
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
