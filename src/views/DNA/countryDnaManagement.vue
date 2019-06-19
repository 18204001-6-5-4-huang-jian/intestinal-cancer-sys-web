<template>
  <div slot="right" class="content-page" v-if="countryDnaManagement_page">
    <div class="content">
      <div class="filter-container" >
        <router-link to="/home/countryHome">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
        <el-form :model="qc" :inline=true>
          <div>
            <el-input  style="width: 200px;" size="small" class="filter-item" clearable placeholder="姓名" v-model="qc.name" >
            </el-input>
            <el-input  style="width: 200px;" size="small" class="filter-item" clearable placeholder="SID" v-model="qc.sid" >
            </el-input>
            <el-input  style="width: 200px;" size="small" class="filter-item" clearable placeholder="手机号" v-model="qc.phone" >
            </el-input>
            <el-input style="width: 200px;" size="small" clearable class="filter-item" placeholder="DNA编码"
                      v-model="qc.dnaCode"></el-input>
               <el-select v-model="qc.group" clearable placeholder="请选择分组方案" size="small" class="filter-item">
              <el-option value="A" v-bind:key="1" label="A组"></el-option>
              <el-option value="B" v-bind:key="2" label="B组"></el-option>
              <el-option value="C" v-bind:key="3" label="C组"></el-option>
              <el-option value="Cg" v-bind:key="4" label="C组高危"></el-option>
              <el-option value="Cd" v-bind:key="5" label="C组低危"></el-option>
            </el-select>
             <el-select v-model="qc.resultStatus" clearable placeholder="肠镜结果" size="small" class="filter-item">
              <el-option value="1" v-bind:key="1" label="有结果"></el-option>
              <el-option value="2" v-bind:key="2" label="无结果"></el-option>
            </el-select>
             <el-select v-model="qc.codeEntryStatus" clearable placeholder="DNA编码录入状态" size="small" class="filter-item">
               <el-option v-for="(item,index) in inputStatus" 
                :key="index" 
                :value="item.id" 
                :label="item.name">
                </el-option>
            </el-select>
          </div>
          <div>
            <el-cascader
              style="float: left;width: 200px;margin-right: 15px;"
              clearable
              :options="$store.state.regionOptions"
              placeholder="所属地区"
              :props="props"
              v-model="ids"
              size="small"
              :show-all-levels="false"
              change-on-select
              @change="getQcId"
              class="filter-item"
            ></el-cascader>

            <!-- <el-select v-model="qc.group" clearable placeholder="请选择分组方案" size="small" class="filter-item">
              <el-option value="A" v-bind:key="1" label="A组"></el-option>
              <el-option value="B" v-bind:key="2" label="B组"></el-option>
              <el-option value="C" v-bind:key="3" label="C组"></el-option>
              <el-option value="Cg" v-bind:key="4" label="C组高危"></el-option>
              <el-option value="Cd" v-bind:key="5" label="C组低危"></el-option>
            </el-select>
             <el-select v-model="qc.resultStatus" clearable placeholder="肠镜结果" size="small" class="filter-item">
              <el-option value="1" v-bind:key="1" label="有结果"></el-option>
              <el-option value="2" v-bind:key="2" label="无结果"></el-option>
            </el-select> -->
            <!-- <el-select v-model="qc.codeEntryStatus" clearable placeholder="DNA编码录入状态" size="small" class="filter-item">
               <el-option v-for="(item,index) in inputStatus" 
                :key="index" 
                :value="item.id" 
                :label="item.name">
                </el-option>
            </el-select> -->
            <el-select v-model="qc.dnaCheckEnterStatus" clearable placeholder="DNA结果状态" size="small" class="filter-item">
              <el-option value="1" v-bind:key="1" label="待返回"></el-option>
              <el-option value="2" v-bind:key="2" label="已返回"></el-option>

            </el-select>
            <el-select v-model="qc.dnaCheckResult" clearable placeholder="DNA结果" size="small" class="filter-item">
              <el-option value="2" v-bind:key="2" label="阳性"></el-option>
              <el-option value="1" v-bind:key="1" label="阴性"></el-option>
              <el-option value="3" v-bind:key="3" label="无效"></el-option>
            </el-select>
            <el-select v-model="qc.dnaCheckInformStatus" clearable placeholder="审核状态" size="small" class="filter-item">
              <el-option value="1" v-bind:key="1" label="未通过"></el-option>
              <el-option value="2" v-bind:key="2" label="通过"></el-option>
              <el-option value="3" v-bind:key="3" label="未审核"></el-option>
            </el-select>
            <el-select v-model="qc.dnaCommunityInformStatus" clearable placeholder="结果发放状态" size="small" class="filter-item">
              <el-option value="1" v-bind:key="1" label="已发放"></el-option>
              <el-option value="2" v-bind:key="2" label="未发放"></el-option>
            </el-select>
              <el-select v-model="qc.followState" placeholder="随访状态" size="small" class="filter-item" clearable>
              <el-option v-for="(item,index) in followStatus" 
              :key="index" 
              :value="item.id" 
              :label="item.name">
              </el-option>
            </el-select>
            <el-select v-model="qc.followGroup" placeholder="随访分组" size="small" class="filter-item" clearable>
              <el-option v-for="(item,index) in followGroup" 
              :key="index" 
              :value="item.id" 
              :label="item.name"></el-option>
            </el-select>
          </div>
          <div style="margin-bottom: 20px;">
            <el-button  size="small" type="primary" icon="el-icon-search" @click="query(1,$store.state.uncompletedDNAexaminePageSize)" v-if="btnAuth.countryDnaManagement_add_btn">查询</el-button>
            <el-button  type="primary" size="small" icon="el-icon-close" @click="reset" v-if="btnAuth.countryDnaManagement_add_btn">重置</el-button>
          </div>
        </el-form>
        <!--数据列表-->
        <el-table
          :data="queryResult.tableData"
          border
          :default-sort = "{prop: 'inGroupDate', order: 'descending'}"
          style="width: 100%;">
          <el-table-column
            prop="sid"
            label="SID"
            width="80">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号"
          >
          </el-table-column>
          <el-table-column
            prop="areaName"
            label="地区医院"
          >
          </el-table-column>
          <el-table-column
            prop="depName"
            label="所属区"
          >
          </el-table-column>
          <el-table-column
            prop="nickName"
            label="所属社区"
          >
          </el-table-column>
            <el-table-column
             label="随访状态"
           >
             <template slot-scope="scope">
               <span>{{scope.row.followState | followState}}</span>
             </template>
           </el-table-column>
          <el-table-column
            label="随访分组"
          >
          <template slot-scope="scope">
              <span>{{scope.row.followGroup | followGroup}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="分组"
          >
            <template slot-scope="scope">
              <span>{{scope.row.group | group}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="总体状态"
          >
            <template slot-scope="scope">
              <span>{{scope.row.overallStatusCy | overallStatusCy}}</span>
            </template>
          </el-table-column>
           <el-table-column
            label="肠镜结果"
            width="120"
          >
          <template slot-scope="scope">
              <span>{{scope.row.resultStatus | resultStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="DNA编码录入状态"
            width="140"
          >
            <template slot-scope="scope">
              <span>{{scope.row.codeEntryStatus | codeEntryStatusNew}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="dnaCode"
            label="粪便DNA编码"
            width="120"
          >
          </el-table-column>
          <el-table-column
            label="粪便DNA结果"
            width="120"
          >
            <template slot-scope="scope">
              <span>{{scope.row.dnaCheckResult | result}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="粪便DNA结果状态"
            width="140"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.codeEntryStatus == 2">{{scope.row.dnaCheckEnterStatus | dnaCheckEnterStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="dnaCheckGoal"
            label="FIT-DNA得分"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="dnaCheckQuantum"
            label="FIT定量化结果"
            width="120"
          >
          </el-table-column>
          <el-table-column
            label="审核状态"
            width="120"
          >
            <template slot-scope="scope">
              <span>{{scope.row.dnaCheckInformStatus | dnaCheckInformStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="结果发放状态"
            width="120"
          >
            <template slot-scope="scope">
              <span>{{scope.row.dnaCommunityInformStatus | dnaCommunityInformStatus }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="PDF文件"
          >
            <template slot-scope="scope">
              <el-button type="text" v-if="btnAuth.countryDnaManagement_add_btn && scope.row.dnaCheckEnterStatus == 2 &&scope.row.dnaCheckFilePath != null&&scope.row.dnaCheckFilePath != ''"><a :href="serverName + '/base/dnafile/downFile?filePath=' + scope.row.dnaCheckFilePath">下载PDF</a></el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="180"
          >
            <template slot-scope="scope">
              <el-button type="text" v-if="btnAuth.countryDnaManagement_add_btn && scope.row.dnaCheckInformStatus == 3" @click="pass(scope.row.id,scope.row.sid)">通过</el-button>
              <el-button type="text" v-if="btnAuth.countryDnaManagement_add_btn && scope.row.dnaCheckInformStatus == 3" @click="nopass(scope.row.id,scope.row.sid)">不通过</el-button>
              <el-button type="text" v-if="btnAuth.countryDnaManagement_add_btn &&  scope.row.dnaCommunityInformStatus ==1 " @click="showDatas(scope.row)">查看发放记录</el-button>

            </template>
          </el-table-column>
        </el-table>
        <el-dialog :visible.sync="notificationFormDialog" >
          <el-form :model="notificationForm"  ref="notificationForm" >
            <el-form-item label="发放方式" :label-width="formLabelWidth" prop="mode">
              <el-select v-model="notificationForm.mode" :disabled="showData"  placeholder="请选择" @change="getMode">
                <el-option label="1.受试者/家属到社区中心自取" :value="1" ></el-option>
                <el-option label="2.社区工作人员入户递送"  :value="2"></el-option>
                <el-option label="3.邻居从社区中心捎带取走" :value="3" ></el-option>
                <el-option label="4.受试者/家属到医院自取" :value="4"></el-option>
                <el-option label="5.其它，请备注" :value="5"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发放日期" :label-width="formLabelWidth" prop="issueDate">
              <el-date-picker
                v-model="notificationForm.issueDate"
                :disabled="showData"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="工作人员编码" :label-width="formLabelWidth" prop="workerCode" >
              <el-input v-model="notificationForm.workerCode" :disabled="showData"  auto-complete="off" class="notification-input"></el-input>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth" prop="note">
              <el-input v-model="notificationForm.note" :disabled="showData"  auto-complete="off" class="notification-input"></el-input>
            </el-form-item>
            <div class="dialog-footer" v-if="!showData">
              <el-button size="small" type="primary" @click="notificationSure('notificationForm')">确定</el-button>
              <el-button size="small" @click="notificationFormDialog = false">取 消</el-button>
            </div>
          </el-form>
        </el-dialog>
        <!--分页栏-->
        <el-row>
          <el-col :span="10"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="14"><div class="grid-content bg-purple">
            <div class="block" style="margin-top: 18px">
              <el-pagination
                @size-change="pageSizeChange"
                @current-change="currentPageChange"
                :current-page="$store.state.uncompletedDNAexaminePageNo"
                :page-sizes="[10, 20, 50, 100]"
                v-bind:page-size="$store.state.uncompletedDNAexaminePageSize"
                layout="total, sizes, prev, pager, next, jumper"
                v-bind:total="queryResult.totalRowCount">
              </el-pagination>
            </div>
          </div></el-col>
        </el-row>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import DICTIONARY from "@/utils/dictionary.js";
export default {
  name: "Right",
  data() {
    return {
      followGroup: DICTIONARY.followGroup,
      //权限判定
      seeDialog: false,
      countryDnaManagement_page: false,
      btnAuth: {
        countryDnaManagement_add_btn: false
      },
      serverName: SERVER_NAME,
      //查询条件
      qc: {
        sid: "",
        name: "",
        phone: "",
        group: "",
        resultStatus: "",
        communityDeptId: "",
        codeEntryStatus: "",
        dnaCheckResult: "",
        loginName: null,
        areaDeptId: null,
        dnaCode: null,
        dnaCheckEnterStatus: "",
        dnaCommunityInformStatus: "",
        dnaCheckInformStatus: "",
        followGroup: null,
        followState: null
      },
      inputStatus:DICTIONARY.inputStatusNew,
      followStatus:DICTIONARY.followStatus,
      //查询结果
      queryResult: {
        pageNo: 1, //当前页
        pageSize: 10, //每页的条数
        totalPageCount: 0,
        tableData: []
      },
      //分页
      queryResultSource: {
        pageNoSource: 1, //当前页
        pageSizeSource: 15, //每页的条数
        totalPageCount: 0
      },
      formLabelWidth: "180px",
      props: {
        value: "id",
        children: "child",
        label: "name"
      },
      notificationForm: {
        id: "",
        sid: "",
        mode: "",
        workerCode: "",
        note: "",
        issueDate: ""
      },
      notificationFormDialog: false,
      showData: true,
      insertStatus: "",
      ids: []
    };
  },
  mounted() {
    this.$store.commit("LOGOUT_USER");
    let obj = this.checkPageAuth(
      this,
      "countryDnaManagement_page",
      this.btnAuth
    );
    this.query(
      this.$store.state.uncompletedDNAexaminePageNo,
      this.$store.state.uncompletedDNAexaminePageSize
    );
  },
  beforeDestroy() {
    this.$store.state.uncompletedDNAexaminePageNo = 1;
    this.$store.state.uncompletedDNAexaminePageSize = 10;
  },
  methods: {
    //获取选中社区
    getQcId(value) {
      this.qc.communityDeptId = null;
      this.qc.areaDeptId = null;
      if (value.length == 1) {
        this.qc.areaDeptId = value[0];
        this.qc.communityDeptId = null;
        this.qc.loginName = null;
      } else if (value.length == 2) {
        this.qc.areaDeptId = value[0];
        this.qc.communityDeptId = value[1];
        this.qc.loginName = null;
      } else if (value.length == 3) {
        this.qc.areaDeptId = value[0];
        this.qc.communityDeptId = value[1];
        for (let i = 0; i < this.$store.state.regionOptions.length; i++) {
          if (value[0] == this.$store.state.regionOptions[i].id) {
            console.log(1);
            for (
              let j = 0;
              j < this.$store.state.regionOptions[i].child.length;
              j++
            ) {
              if (value[1] == this.$store.state.regionOptions[i].child[j].id) {
                console.log(2);
                for (
                  let k = 0;
                  k < this.$store.state.regionOptions[i].child[j].child.length;
                  k++
                ) {
                  if (
                    value[2] ==
                    this.$store.state.regionOptions[i].child[j].child[k].id
                  ) {
                    this.qc.loginName = this.$store.state.regionOptions[
                      i
                    ].child[j].child[k].loginName;
                    console.log(this.qc.loginName, 1);
                  }
                }
              }
            }
          }
        }
      }else{
        this.qc.loginName = null;
      }
    },
    getMode(value) {
      if (value == "5") {
        this.rules.note[0].required = true;
      } else {
        this.rules.note[0].required = false;
      }
    },
    showDatas(row) {
      $axios_http({
        url: "/base/stool/dna/get/" + row.id,
        vueObj: this
      }).then(res => {
        this.notificationForm.mode = res.data.data.dna_community_inform_mode;
        this.notificationForm.issueDate =
          res.data.data.dna_community_inform_work_time;
        this.notificationForm.note = res.data.data.dna_community_inform_note;
        this.notificationForm.workerCode =
          res.data.data.dna_community_inform_worker_code;
        this.notificationFormDialog = true;
      });
    },
    //查询
    query(pageNo, pageSize) {
      $axios_http({
        url: "/base/stool/dna/query",
        data: {
          name: this.qc.name,
          sid: this.qc.sid,
          phone: this.qc.phone,
          resultStatus: this.qc.resultStatus,
          group: this.qc.group,
          communityDeptId: this.qc.communityDeptId,
          areaDeptId: this.qc.areaDeptId,
          loginName: this.qc.loginName,
          dnaCode: this.qc.dnaCode,
          codeEntryStatus: this.qc.codeEntryStatus,
          dnaCheckResult: this.qc.dnaCheckResult,
          dnaCheckEnterStatus: this.qc.dnaCheckEnterStatus,
          dnaCommunityInformStatus: this.qc.dnaCommunityInformStatus,
          dnaCheckInformStatus: this.qc.dnaCheckInformStatus,
          followGroup: this.qc.followGroup,
          followState:this.qc.followState,
          pageNo: pageNo, //当前页
          pageSize: pageSize //每页条数
        },
        vueObj: this
      }).then(res => {
        this.$store.commit("get_uncompletedDNAexaminePageNo", pageNo);
        this.queryResult.tableData = res.data.data;
        this.queryResult.totalPageCount = res.data.pageInfo.totalPageCount; //获取总共多少页
        this.queryResult.totalRowCount = res.data.pageInfo.totalRowCount; //获取总共条数
      });
    },
    //重置检索条件
    reset() {
      Object.assign(this.$data.qc, this.$options.data().qc);
      this.ids = [];
      this.query(
        this.$store.state.uncompletedDNAexaminePageNo,
        this.$store.state.uncompletedDNAexaminePageSize
      );
    },
    //删除一条数据
    del(id) {
      this.$confirm("确认删除数据?", "提示", {
        closeOnClickModal: false,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          $axios_http({
            url: "/base/role/delete/" + id,
            vueObj: this
          }).then(res => {
            $successMsg(this, "删除成功");
            this.query(
              this.$store.state.uncompletedDNAexaminePageNo,
              this.$store.state.uncompletedDNAexaminePageSize
            );
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //通过
    pass(id, sid) {
      this.$confirm("确定下发该报告?", "提示", {
        closeOnClickModal: false,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        $axios_http({
          url: "/base/country/stool/dna/updateIssuedStatus",
          data: {
            id: id,
            sid: sid,
            dnaCheckInformStatus: 2
          },
          vueObj: this
        }).then(res => {
          $successMsg(this, "审批成功");
          this.query(
            this.$store.state.uncompletedDNAexaminePageNo,
            this.$store.state.uncompletedDNAexaminePageSize
          );
        });
      });
    },
    //不通过
    nopass(id, sid) {
      this.$confirm("确定不下发该报告?", "提示", {
        closeOnClickModal: false,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        $axios_http({
          url: "/base/country/stool/dna/updateIssuedStatus",
          data: {
            id: id,
            sid: sid,
            dnaCheckInformStatus: 1
          },
          vueObj: this
        }).then(res => {
          $successMsg(this, "审批成功");
          this.query(
            this.$store.state.uncompletedDNAexaminePageNo,
            this.$store.state.uncompletedDNAexaminePageSize
          );
        });
      });
    },
    showPDF(dnaCheckFilePath) {
      window.open(dnaCheckFilePath);
    },
    //每页显示查询结果条数变更事件，做重新查询操作
    pageSizeChange(pageSize) {
      //this.queryResult.pageSize = pageSize
      this.$store.commit("get_uncompletedDNAexaminePageSize", pageSize);
      this.query(this.$store.state.uncompletedDNAexaminePageNo, pageSize);
    },
    //切换当前页事件，做重新查询操作
    currentPageChange(currentPage) {
      //this.queryResult.pageNo = currentPage
      this.$store.commit("get_uncompletedDNAexaminePageNo", currentPage);
      this.query(currentPage, this.$store.state.uncompletedDNAexaminePageSize);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  background: #fff;
  padding: 10px;
}
.checkbox {
  display: block;
  margin-left: 5px;
  font-weight: normal;
}
.inline {
  display: inline-block;
  margin-top: 20px;
}
.btnStyle {
  padding-left: 10px;
}
.return-home {
  text-align: center;
  margin-bottom: 20px;
}
.filter-item {
  margin-right: 10px;
  width: 200px;
}
</style>
