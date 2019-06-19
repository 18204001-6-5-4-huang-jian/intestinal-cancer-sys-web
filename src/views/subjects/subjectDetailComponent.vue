<template>
  <div>  
      <!--数据列表-->
      <h5>FIT列表</h5>
      <el-table
        :data="fit"
        border
        style="width: 100%;">
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
        <el-table-column
          label="结果录入状态"
          width="120"
        >
          <template slot-scope="scope">
            <span>{{scope.row.insertStatus | insertStatus}}</span>
          </template>
        </el-table-column>

        <el-table-column
          width="120"
          label="结果录入时间 "
          :formatter="dateFormat"
          prop="resultDate"
        >
        </el-table-column>
        <el-table-column
          label="是否有结果"
          width="120"
        >
          <template slot-scope="scope">
            <span>{{scope.row.resultStatus | resultStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="upLineValue"
          label="上线值"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="downLineValue"
          label="下线值"
          width="100"
        >
        </el-table-column>
        <el-table-column
          label="FIT结果"
          width="100"
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
      </el-table>
      <!--DNA列表-->
      <h5>粪便DNA列表</h5>
      <el-table
        :data="dna"
        border
        style="width: 100%;">
        <el-table-column
          label="编码录入状态"
        >
          <template slot-scope="scope">
            <span>{{scope.row.code_entry_status | codeEntryStatusNew}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="dna_code"
          label="编码"
        >
        </el-table-column>

        <el-table-column
          prop="person_code"
          label="工作人员编码"
        >
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
        >
          <template slot-scope="scope">
            <span v-if="scope.row.code_entry_status == 2 && scope.row.dna_check_inform_status ==2">已返回</span>
            <span v-if="scope.row.code_entry_status == 2 && scope.row.dna_check_inform_status != 2">待返回</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="dna_community_inform_status"
          label="结果发放状态"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.code_entry_status == 2 && scope.row.dna_check_inform_status ==2">{{scope.row.dna_community_inform_status | dnaCommunityInformStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="PDF文件"
        >
          <template slot-scope="scope">
            <el-button type="text" class="btnStyle" size="small" v-if="scope.row.code_entry_status == 2 && scope.row.dna_check_inform_status ==2 &&scope.row.dna_check_filePath != null&&scope.row.dna_check_filePath != ''" ><a :href="serverName + '/base/dnafile/downFile?filePath=' + scope.row.dna_check_filePath">下载PDF</a></el-button>
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
          label="肠镜检查状态"
        >
          <template slot-scope="scope">
            <span>{{scope.row.examination_status | examinationStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="肠镜完成状态"
        >
          <template slot-scope="scope">
            <span>{{scope.row.finished_status | finishedStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="告知书发放状态"
        >
          <template slot-scope="scope">
            <span>{{scope.row.notification_issue_status | notificationIssueStatus}}</span>
            <router-link :to="{path:'/colonscopy/report3',query:{sid:scope.row.sid,id:scope.row.id,show:1}}" v-if="scope.row.notification_entry_status==2">
              <el-button type="text"  > 查看</el-button>
            </router-link>
          </template>
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
        default:function(){
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
    },
    data () {
      return {
        serverName:SERVER_NAME,
      }
    },
    methods: {
      //日期格式化
      dateFormat:function(row, column) {
        var date = row[column.property];
        if (date == undefined) {
          return "";
        }
        return date.substring(0,10)
      }
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
    height: 40px;
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
