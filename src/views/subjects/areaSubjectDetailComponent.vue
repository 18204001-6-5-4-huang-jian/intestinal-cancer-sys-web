<template>
  <div>
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
          prop="releaseDate"
          label="编码录入时间"
          :formatter="dateFormat"
          width="160"
        >
        </el-table-column>
        <!--<el-table-column-->
          <!--prop="releasePersonCode"-->
          <!--label="工作人员编码"-->
          <!--width="160"-->
        <!--&gt;-->
        <!--</el-table-column>-->
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
          prop="noResonResult"
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
      <h5>粪便DNA列表</h5>
      <el-table
        :data="dna"
        border
        style="width: 100%;">
        <el-table-column
          prop="dna_code"
          label="编号"
        >
        </el-table-column>
        <el-table-column
          prop="person_code"
          label="工作人员编码"
        >
        </el-table-column>
        <el-table-column
          label="编码录入状态"
        >
          <template slot-scope="scope">
            <span>{{scope.row.code_entry_status | codeEntryStatusNew}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="DNA结果"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.code_entry_status == 2 && scope.row.dna_check_inform_status ==2">{{scope.row.dna_check_result | result}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="DNA结果状态"
          width="140"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.code_entry_status == 2 && scope.row.dna_check_inform_status ==2">已返回</span>
            <span v-if="scope.row.code_entry_status == 2 && scope.row.dna_check_inform_status != 2">待返回</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="dnaCommunityInformStatus"
          label="DNA结果发放状态"
          width="140"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.code_entry_status == 2 && scope.row.dna_check_inform_status ==2">{{scope.row.dna_community_inform_status | dnaCommunityInformStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="PDF文件"
        >
          <template slot-scope="scope">
            <el-button type="text" class="btnStyle" size="small" v-if="scope.row.code_entry_status == 2 && scope.row.dna_check_inform_status ==2 &&scope.row.dna_check_filePath != null&&scope.row.dna_check_filePath != ''"><a :href="serverName + '/base/dnafile/downFile?filePath=' + scope.row.dna_check_filePath">下载PDF</a></el-button>
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
            <span>{{scope.row.reserve_status | reserveStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="reserve_date"
          label="肠镜预约时间"
          width="160"
        >
          <template slot-scope="scope">
            <span>{{scope.row.reserve_date | date}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="检查状态"
        >
          <template slot-scope="scope">
            <span>{{scope.row.examination_status | examinationStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="完成状态"
        >
          <template slot-scope="scope">
            <span>{{scope.row.finished_status | finishedStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="结果录入状态"
          width="160"
        >
          <template slot-scope="scope">
            <span>{{scope.row.result_status | c_resultStatus}}</span>
            <router-link :to="{path:'/colonscopy/report1',query:{sid:scope.row.sid,id:scope.row.result_id,colonoscopyRecordId:scope.row.id,overallStatusCy:$route.query.overallStatusCy,show:1}}" v-if="scope.row.result_status==2">
              <el-button type="text"  > 查看</el-button>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          label="病理录入状态"
          width="160"
        >
          <template slot-scope="scope">
            <span>{{scope.row.pathology_status | codeEntryStatus}}</span>
            <router-link :to="{path:'/colonscopy/report2',query:{sid:scope.row.sid,id:scope.row.pathology_id,overallStatusCy:$route.query.overallStatusCy,show:1}}" v-if="scope.row.pathology_status==2">
              <el-button type="text" > 查看</el-button>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          label="告知书录入状态"
          width="160"
        >
          <template slot-scope="scope">
            <span>{{scope.row.notification_entry_status | notificationEntryStatus}}</span>
            <router-link :to="{path:'/colonscopy/report3',query:{sid:scope.row.sid,id:scope.row.id,overallStatusCy:$route.query.overallStatusCy,show:1}}" v-if="scope.row.notification_entry_status==2">
              <el-button type="text" > 查看</el-button>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          label="告知书发放状态"
        >
          <template slot-scope="scope">
            <span>{{scope.row.notification_issue_status | notificationIssueStatus}}</span>
          </template>
        </el-table-column>
      </el-table>
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
              <div class="clearfloat"  v-if="item.sampleType == 'W'">
                <el-form-item  label="位置" label-width="50px">
                  <el-input v-model="item.sampleColumnAndLine[0]" disabled auto-complete="off" style="width:50px;margin-left: 20px"  size="mini" ></el-input>
                </el-form-item>
              </div>
              <div class="clearfloat"  v-else>
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
      <h5>生物样本列表</h5>
      <el-table
        :data="sample"
        border
        style="width: 100%;">
        <el-table-column label="血液样本" align="center" >
          <el-table-column label="采集状态">
            <template slot-scope="scope">
              <span>{{scope.row.sample_A | sample_S}}</span>
              <span v-if="scope.row.sample_A == 1" style="margin-left: 15px;" @click="showData(scope.row.asid)"> <el-button type="text">查看</el-button></span>
            </template>
          </el-table-column>
          <el-table-column label="血清快递状态">
            <template slot-scope="scope">
              <span>{{scope.row.S | courierStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column label="血浆快递状态" >
            <template slot-scope="scope">
              <span>{{scope.row.P | courierStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column label="白细胞快递状态">
             <template slot-scope="scope">
              <span>{{scope.row.W | courierStatus}}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="唾液样本" align="center">
          <el-table-column label="录入状态">
            <template slot-scope="scope">
              <span>{{scope.row.sample_M | sample_S}}</span>
              <span v-if="scope.row.sample_M == 1" style="margin-left: 15px;" @click="showBiologicalSamples(scope.row.msid,scope.row.sample_M)"> <el-button type="text">查看</el-button></span>
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
              <span v-if="scope.row.sample_F == 1" style="margin-left: 15px;" @click="showBiologicalSamples(scope.row.fsid,scope.row.sample_F)"> <el-button type="text">查看</el-button></span>
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
      sample: {
        type: Array,
        default: function(){
          return []
        }
      }
    },
    data () {
      return {
        sampleTitle:'',
        addForms:{},
        area_person_detail_page: false,
        addFormDialog:false,
        serverName:SERVER_NAME,
        btnAuth: {
          examination_query_btn: false,
        },
        formLabelWidth: '100px',
        showVisible:false,
        showForm:{},
        titleSample:''
      }
    },
    methods: {

      showPDF(dnaCheckFilePath){
        window.open(dnaCheckFilePath)
      },
      showBiologicalSamples(id,sample){
        this.addFormDialog = true
        this.addForms = {}
        $axios_http({
          url: "/base/hospital/person/getSampleTypeDetailById",
          data: {
            id:id
          },
          vueObj: this
        }).then((res) => {
          if(res.data.data[0].sampleType == 'M'){
            this.sampleTitle = '唾液样本'
          }else {
            this.sampleTitle = '粪便样本'
          }
          this.addForms = res.data.data[0]
        })
      },
      //查看样本弹窗
      showData(id){
        $axios_http({
          url: "/base/area/sample/result/querySampleBloodId",
          data:{
            id:id
          },
          vueObj: this
        }).then((res) => {
          this.showVisible = true
          this.showForm = res.data.data
          for(let i = 0;i<this.showForm.hospitalBiologicalSampleResultPOList.length;i++){
            if(this.showForm.hospitalBiologicalSampleResultPOList[i].sampleColumnAndLine == null){
              this.showForm.hospitalBiologicalSampleResultPOList[i].sampleColumnAndLine = ["","","","","",]
            }
            if (this.showForm.hospitalBiologicalSampleResultPOList[i].sampleType=='S'){
              this.showForm.hospitalBiologicalSampleResultPOList[i].name = '血清'
            }else if (this.showForm.hospitalBiologicalSampleResultPOList[i].sampleType=='P'){
              this.showForm.hospitalBiologicalSampleResultPOList[i].name = '血浆'
            }else if (this.showForm.hospitalBiologicalSampleResultPOList[i].sampleType=='W'){
              this.showForm.hospitalBiologicalSampleResultPOList[i].name = '白细胞'
            }
          }
//          console.log(this.showForm);
        })
      },
      //日期格式化
      dateFormat:function(row, column) {
        var date = row[column.property];
        if (date == undefined) {
          return "";
        }
        return date.substring(0,11)
      },
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .booking-list{
    margin:60px auto;
    padding: 20px;
    border:1px solid #e5e5e5;
    position:relative;
  }
  .booking-list-item{
    height: 50px;
    line-height: 40px;
  }
  .booking-list-tit{
    position: absolute;
    top:-22px;
    display:inline-block;
    padding: 10px;
    background: #ffffff;

  }
  .returns{
    float: left;
  }
  .print{
    float: right;
  }
  .content-page{
    padding: 20px;
    background: #fff;
    width:100%;
    height:100%;
  }
  .booking-list-welcome{
    margin: 50px auto;
    width: 50%;
    font-size:14px;
  }
  .booking-list-welcome p{
    height: 24px;
    line-height: 24px;
  }
  .p-title{
    margin-bottom:20px;
  }
  h5{
    height: 50px;
    line-height: 50px;
  }
</style>
