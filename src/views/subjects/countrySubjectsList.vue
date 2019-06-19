<template>
  <div slot="right" class="content-page" v-if="countrySubjectsList_page">
    <div class="content">
      <div class="filter-container">
        <router-link to="/home/countryHome">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
        <el-form :model="qc" :inline=true class="clear">
          <div>
            <el-input  style="width: 200px;" size="small" class="filter-item" clearable placeholder="姓名" v-model="qc.name"></el-input>
            <el-input  style="width: 200px;" size="small" class="filter-item" clearable placeholder="SID" v-model="qc.sid">
            </el-input>
            <el-input  style="width: 200px;" size="small" class="filter-item" clearable placeholder="手机号" v-model="qc.phone">
            </el-input>
            <el-input  style="width: 200px;" size="small" class="filter-item" clearable placeholder="身份证号" v-model="qc.idCard">
            </el-input>
            <el-input  style="width: 200px;" size="small" class="filter-item" clearable placeholder="FIT编码" v-model="qc.fitCode" >
            </el-input>
             <el-select v-model="qc.sex" placeholder="请选择性别" size="small" class="filter-item" clearable>
              <el-option value="1" v-bind:key="1" label="男"></el-option>
              <el-option value="2" v-bind:key="2" label="女"></el-option>
            </el-select>
             <el-date-picker
              v-model="qc.inGroupDateStart"
              clearable
              type="date"
              size="small"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="入组日期(起)"
              class="filter-item">
            </el-date-picker>
          </div>
          <div>
            <el-date-picker
              v-model="qc.inGroupDateEnd"
              clearable
              type="date"
              size="small"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="入组日期(止)"
              class="filter-item">
            </el-date-picker>
            <el-cascader
              style="float: left;width: 200px;margin-right: 15px;"
              clearable
              :options="$store.state.regionOptions"
              placeholder="所属地区"
              :props="props"
              v-model="ids"
              size="small"
              filterable
              :show-all-levels="false"
              change-on-select
              @change="getQcId"
            ></el-cascader>

            <el-select v-model="qc.group" placeholder="分组方案" size="small" class="filter-item" clearable>
              <el-option value="A" v-bind:key="1" label="A组"></el-option>
              <el-option value="B" v-bind:key="2" label="B组"></el-option>
              <el-option value="C" v-bind:key="3" label="C组"></el-option>
              <el-option value="Cg" v-bind:key="4" label="C组高危"></el-option>
              <el-option value="Cd" v-bind:key="5" label="C组低危"></el-option>
            </el-select>
            <el-select v-model="qc.overallStatusCy" placeholder="总体状态" size="small" class="filter-item" clearable>
              <el-option value="1" v-bind:key="1" label="正常"></el-option>
              <el-option value="2" v-bind:key="2" label="失访"></el-option>
              <el-option value="4" v-bind:key="4" label="死亡"></el-option>
              <el-option value="3" v-bind:key="3" label="患结直肠癌"></el-option>
            </el-select>
            <el-select v-model="qc.followState" clearable placeholder="随访状态" size="small" class="filter-item" clearable>
              <el-option v-for="(item,index) in followStatus" 
              :key="index" 
              :value="item.id" 
              :label="item.name"></el-option>
            </el-select>
          <el-select v-model="qc.followGroup" clearable placeholder="随访分组" size="small" class="filter-item" clearable>
            <el-option v-for="(item,index) in followGroup" 
            :key="index" 
            :value="item.id" 
            :label="item.name"></el-option>
          </el-select>
          <!-- <el-select v-model="qc.followViolateType" clearable placeholder="违反分类" size="small" class="filter-item">
            <el-option v-for="(item,index) in followCategory" 
            :key="index" 
            :value="item.id" 
            :label="item.name"></el-option>
          </el-select> -->
            <span>
              <el-popover
                placement="bottom"
                width="660"
                trigger="click">
                <el-select v-model="qc.examinationStatus" placeholder="肠镜检查状态" size="small" class="filter-item" clearable>
                  <el-option :value="item.value" :key="item.key" :label="item.label" v-for="item in $store.state.colonscopyCheckStatus"></el-option>
                </el-select>
                <el-select v-model="qc.finishedStatus" placeholder="肠镜完成情况" size="small" class="filter-item" clearable>
                 <el-option :value="item.value" :key="item.key" :label="item.label" v-for="item in $store.state.colonscopyCompleteStatus"></el-option>
                </el-select>
                <el-select v-model="qc.resultStatus" placeholder="肠镜结果录入状态" size="small" class="filter-item" clearable>
                  <el-option :value="item.value" :key="item.key" :label="item.label" v-for="item in $store.state.editStatus"></el-option>
                </el-select>
                <el-select v-model="qc.insertStatus" placeholder="FIT结果录入状态" size="small" class="filter-item" clearable>
                  <el-option :value="item.value" :key="item.key" :label="item.label" v-for="item in $store.state.editStatus"></el-option>
                </el-select>
                <el-select v-model="qc.fitResult" placeholder="FIT结果" size="small" class="filter-item" clearable>
                  <el-option :value="item.value" :key="item.key" :label="item.label" v-for="item in $store.state.fitResult"></el-option>
                </el-select>
                <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="粪便DNA编码" v-model="qc.dnaCode"></el-input>
                <el-select v-model="qc.codeEntryStatus" placeholder="粪便DNA结果录入状态" size="small" class="filter-item" clearable>
                  <el-option :value="item.value" :key="item.key" :label="item.label" v-for="item in $store.state.editStatus"></el-option>
                </el-select>
                <el-select v-model="qc.dnaCheckInformStatus" placeholder="粪便DNA结果审核状态" size="small" class="filter-item" clearable>
                  <el-option :value="item.value" :key="item.key" :label="item.label" v-for="item in $store.state.reviewStatus"></el-option>
                </el-select>
                <el-select v-model="qc.dnaResult" placeholder="粪便DNA结果" size="small" class="filter-item" clearable>
                  <el-option :value="item.value" :key="item.key" :label="item.label" v-for="item in $store.state.dnaResult"></el-option>
                </el-select>
                <el-button slot="reference" size="mini" type="text" plain>更多<i class="el-icon-arrow-down"></i></el-button>
              </el-popover>
            </span>
          </div>
          <div>
            <el-button  size="small" type="primary" icon="el-icon-search" @click="query(1,$store.state.countrySubjectsListPageSize)" >查询</el-button>
            <el-button  type="primary" size="small" icon="el-icon-close" @click="reset" >重置</el-button>
          </div>
        </el-form>
      </div>

      <div >
        <div class="table-btn-grooup">
          <el-button size="small" type="primary" icon="el-icon-document"
          >
            <a :href="downloadUrl">导出EXCEL</a>
          </el-button>
          <!--<el-button class="filter-item" type="primary" size="small" icon="el-icon-close">退出研究</el-button>-->
          <!--<el-button class="filter-item" size="small" type="primary" icon="el-icon-search"  v-if="btnAuth.subjectsList_EXCEL_btn">导出EXCEL</el-button>-->
        </div>
        <!--数据列表-->
        <el-table
          :data="queryResult.tableData"
          border
          @sort-change="changeTableSort"
          style="width: 100%;">
          <el-table-column
            type="selection"
            align="center"
            label="序号"
            width="55">
          </el-table-column>
          <el-table-column
            prop="sid"
            label="SID"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            label="姓名"
            width="110"
          >
            <template slot-scope="scope">
              <div class="subjectsName">
                <div>
                  {{scope.row.name}}
                  <span class="corner" v-if="scope.row.violationPlanStatusCy==1">违</span>
                </div>

              </div>
            </template>
          </el-table-column>
            <el-table-column
              label="性别"
              width="60"
            >
              <template slot-scope="scope">
              <span>{{scope.row.sex | reverseSex}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="age"
            label="年龄"
            width="60"
          >
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号"
            width="110"
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
            prop="score"
            label="评分分值"
            width="110"
          >
          </el-table-column>
          <el-table-column
            prop="inGroupDate"
            label="入组日期"
            sortable
            width="110"
          >
          </el-table-column>
          <el-table-column
            prop="followBegin"
            label="计划随访开始时间"
            width="160"
          >
          </el-table-column>
          <el-table-column
            prop="followEnd"
            label="计划随访结束时间"
            width="160"
          >
          </el-table-column>
          <el-table-column
            label="总体状态"
          >
            <template slot-scope="scope">
              <span>{{scope.row.overallStatusCy | overallStatusCy}}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column
            label="DNA结果"
          >
            <template slot-scope="scope">
              <span>{{scope.row.dnaResult | result}}</span>
            </template>
          </el-table-column> -->
          <el-table-column
            prop="fitCode"
            label="FIT编码"
          >
          </el-table-column>
          <el-table-column
            label="FIT结果"
          >
            <template slot-scope="scope">
              <span>{{scope.row.fitResult | result}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="FIT结果录入状态"
            width="130"
          >
            <template slot-scope="scope">
              <span>{{scope.row.insertStatus | codeEntryStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="肠镜检查状态"
            width="110"
          >
            <template slot-scope="scope">
              <span>{{scope.row.examinationStatus | examinationStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="肠镜完成情况"
            width="110"
          >
            <template slot-scope="scope">
              <span>{{scope.row.finishedStatus | finishedStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="肠镜结果录入状态"
            width="140"
          >
            <template slot-scope="scope">
              <span>{{scope.row.resultStatus | codeEntryStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="粪便DNA编码"
            prop='dnaCode'
            width="130"
          >
          </el-table-column>
          
          <el-table-column
            label="粪便DNA结果录入状态"
            width="170"
          >
            <template slot-scope="scope">
              <span>{{scope.row.codeEntryStatus | codeEntryStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="粪便DNA结果审核状态"
            width="170"
          >
            <template slot-scope="scope">
              <span>{{scope.row.dnaCheckInformStatus | dnaCheckInformStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="粪便DNA结果"
            width="110"
          >
            <template slot-scope="scope">
              <span>{{scope.row.dnaResult | result}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            width="200"
          >
            <template slot-scope="scope">
              <router-link :to="{path:'/subjects/countrySubjectDetail',query:{id:scope.row.sid}}">
                <el-button type="text">查看详情</el-button>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
        <!--分页栏-->
        <el-row>
          <el-col :span="10"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="14"><div class="grid-content bg-purple">
            <div class="block" style="margin-top: 18px">
              <el-pagination
                @size-change="pageSizeChange"
                @current-change="currentPageChange"
                :current-page="$store.state.countrySubjectsListPageNo"
                :page-sizes="[10, 20, 50, 100]"
                v-bind:page-size="$store.state.countrySubjectsListPageSize"
                layout="total, sizes, prev, pager, next, jumper"
                v-bind:total="queryResult.totalRowCount">
              </el-pagination>
            </div>
          </div></el-col>
        </el-row>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import DICTIONARY from "@/utils/dictionary.js";
export default {
  data() {
    return {
      group: DICTIONARY.group,
      followStatus: DICTIONARY.followStatus,
      followGroup: DICTIONARY.followGroup,
      followCategory: DICTIONARY.followCategory,
      isShow: false,
      deptGroup: [],
      countrySubjectsList_page: false,
      btnAuth: {
        subjectsList_query_btn: false,
        subjectsList_EXCEL_btn: false
      },
      downloadUrl: SERVER_NAME + "/base/hospital/person/nationUsersQueryExcel",
      //查询条件
      qc: {
        name: "",
        sex: null,
        phone: "",
        sid: "",
        fitCode: null,
        inGroupDateStart: "",
        inGroupDateEnd: "",
        group: null,
        overallStatusCy: null,
        violationPlanStatusCy: null,
        communityDeptId: null,
        areaDeptId: null,
        loginName: null,
        sortParameter: null,
        sortRule: null,

        resultStatus: null,
        examinationStatus: null,
        finishedStatus: null,
        fitResult: null,
        insertStatus: null,
        dnaResult: null,
        dnaCode: null,
        dnaCheckInformStatus: null,
        codeEntryStatus: null,
        idCard: null,
        followGroup: null,
        followState: null,
        followViolateType: null
      },
      //查询结果
      queryResult: {
        pageNo: 1, //当前页
        pageSize: 10, //每页的条数
        totalPageCount: 0,
        tableData: []
      },
      formLabelWidth: "100px",
      props: {
        value: "id",
        children: "child",
        label: "name"
      },

      ids: []
    };
  },
  mounted() {
    let obj = this.checkPageAuth(
      this,
      "countrySubjectsList_page",
      this.btnAuth
    );
    this.query(
      this.$store.state.countrySubjectsListPageNo,
      this.$store.state.countrySubjectsListPageSize
    );
  },
  beforeDestroy() {
    this.$store.state.countrySubjectsListPageNo = 1;
    this.$store.state.countrySubjectsListPageSize = 10;
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
          //点x清空 
          this.qc.loginName = null;
      }
    },
    //查询
    query(pageNo, pageSize) {
      $axios_http({
        url: "/base/hospital/person/query",
        data: {
          name: this.qc.name,
          sid: this.qc.sid,
          phone: this.qc.phone,
          sex: this.qc.sex,
          fitCode: this.qc.fitCode,
          inGroupDateStart: this.qc.inGroupDateStart,
          inGroupDateEnd: this.qc.inGroupDateEnd,
          group: this.qc.group,
          communityDeptId: this.qc.communityDeptId,
          overallStatusCy: this.qc.overallStatusCy,
          sortParameter: this.qc.sortParameter,
          areaDeptId: this.qc.areaDeptId,
          loginName: this.qc.loginName,
          sortRule: this.qc.sortRule,
          resultStatus: this.qc.resultStatus,
          examinationStatus: this.qc.examinationStatus,
          finishedStatus: this.qc.finishedStatus,
          fitResult: this.qc.fitResult,
          insertStatus: this.qc.insertStatus,
          dnaResult: this.qc.dnaResult,
          dnaCode: this.qc.dnaCode,
          dnaCheckInformStatus: this.qc.dnaCheckInformStatus,
          codeEntryStatus: this.qc.codeEntryStatus,
          idCard: this.qc.idCard,
          followGroup: this.qc.followGroup,
          followState: this.qc.followState,
          followViolateType: this.qc.followViolateType,
          //            violationPlanStatusCy:this.qc.violationPlanStatusCy,
          pageNo: pageNo, //当前页
          pageSize: pageSize //每页条数
        },
        vueObj: this
      }).then(res => {
        this.$store.commit("get_countrySubjectsListPageNo", pageNo);
        this.queryResult.tableData = res.data.data;
        this.queryResult.totalPageCount = res.data.pageInfo.totalPageCount; //获取总共多少页
        this.queryResult.totalRowCount = res.data.pageInfo.totalRowCount; //获取总共条数
      });
    },
    changeTableSort(value) {
      if (value.prop == "inGroupDate") {
        this.qc.sortParameter = "inGroupDate";
      } else if (value.prop == "sid") {
        this.qc.sortParameter = "sid";
      }
      if (value.order == "descending") {
        this.qc.sortRule = "desc";
      } else if (value.order == "ascending") {
        this.qc.sortRule = "asc";
      }
      this.query(
        this.$store.state.countrySubjectsListPageNo,
        this.$store.state.countrySubjectsListPageSize
      );
    },
    //重置检索条件
    reset() {
      Object.assign(this.$data.qc, this.$options.data().qc);
      this.ids = [];
      this.query(
        this.$store.state.countrySubjectsListPageNo,
        this.$store.state.countrySubjectsListPageSize
      );
    },
    //每页显示查询结果条数变更事件，做重新查询操作
    pageSizeChange(pageSize) {
      this.$store.commit("get_countrySubjectsListPageSize", pageSize);
      this.query(this.$store.state.countrySubjectsListPageNo, pageSize);
    },
    //切换当前页事件，做重新查询操作
    currentPageChange(currentPage) {
      this.$store.commit("get_countrySubjectsListPageNo", currentPage);
      this.query(currentPage, this.$store.state.countrySubjectsListPageSize);
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
  margin-left: 20px;
  font-weight: normal;
}
.btnStyle {
  padding-left: 10px;
}
.return-home {
  display: block;
  text-align: center;
  float: left;
  margin-bottom: 20px;
}
.table-btn-grooup {
  margin-bottom: 10px;
}
.subjectsName {
  position: relative;
}
.corner {
  width: 20px;
  height: 20px;
  line-height: 20px;
  position: absolute;
  right: 10px;
  top: 0px;
  display: block;
  border-radius: 10px;
  text-align: center;
  background: #f56a00;
  color: #fff;
}
.filter-item {
  width: 200px;
  margin-right: 10px;
}
.el-popover .filter-item {
  float: left;
  margin-bottom: 10px;
}
.el-button.is-plain:hover,
.el-button.is-plain:focus {
  border-color: #fff;
}
</style>
