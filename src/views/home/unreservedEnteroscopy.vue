<template>
  <div slot="right" class="content-page" v-if="unreservedEnteroscopy_page">
    <div class="content">
      <h4>待办-未预约结肠镜检查</h4>
      <p>&nbsp;</p>
      <div class="filter-container" >
        <router-link to="/home/home">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
        <el-form :model="qc" :inline=true>
          <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="姓名" v-model="qc.name" >
          </el-input>
          <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="SID" v-model="qc.sid" >
          </el-input>
          <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="手机号" v-model="qc.phone" >
          </el-input>
          <div>
            <el-cascader
              style="float: left;width: 200px;margin-right: 15px;"
              :options="$store.state.regionOptions"
              placeholder="所属社区"
              :props="props"
              v-model="ids"
              size="small"
              filterable
              :show-all-levels="false"
              change-on-select
              @change="getQcId"
            ></el-cascader>
            <el-select v-model="qc.group" clearable placeholder="分组方案" size="small" class="filter-item">
              <el-option value="A" label="A组">A组</el-option>
              <el-option value="B" label="B组">B组</el-option>
              <el-option value="C" label="C组">C组</el-option>
              <el-option value="Cg" label="C组高危">C组高危</el-option>
              <el-option value="Cd" label="C组低危">C组低危</el-option>
            </el-select>
            <el-select v-model="qc.followGroup" clearable placeholder="随访分组" size="small" class="filter-item">
              <el-option v-for="(item,index) in followGroup" 
              :key="index" 
              :value="item.id" 
              :label="item.name"></el-option>
            </el-select>
          </div>

          <div style="margin-bottom: 20px;">
          <el-button class="filter-item" size="small" type="primary" icon="el-icon-search" @click="query(1,$store.state.unreservedEnteroscopyPageSize)" v-if="btnAuth.unreservedEnteroscopy_query_btn">查询</el-button>
          <el-button class="filter-item" type="primary" size="small" icon="el-icon-close" @click="reset" v-if="btnAuth.unreservedEnteroscopy_query_btn">重置</el-button>
          </div>
        </el-form>
        <!--数据列表-->
        <!--<div class="table-btn-grooup">-->
          <!--<el-button class="filter-item" type="primary" size="small" icon="el-icon-close"  v-if="btnAuth.reserve_btn">一键预约</el-button>-->
          <!--<el-button class="filter-item" size="small" type="primary" icon="el-icon-search"  v-if="btnAuth.export_excel_btn">导出EXCEL</el-button>-->
        <!--</div>-->
        <el-dialog :visible.sync="reserveDialog">
          <el-form :model="insertForm">
            <el-form-item label="剩余放号数量" :label-width="formLabelWidth" prop="name">
              {{this.insertForm.reserveable}}
            </el-form-item>
            <el-form-item label="项目名称" :label-width="formLabelWidth" prop="name">
              <el-input v-model="insertForm.examinationName" disabled auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="就诊时间" :label-width="formLabelWidth" prop="name">
              <el-select v-model="period" placeholder="分组方案" size="small" class="filter-item" @change="changePeriod">
                <el-option :value="item.period" v-for="item in periodData" :key="item.period">{{item.period}}</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="就诊地点" :label-width="formLabelWidth" prop="name">
              <el-input v-model="insertForm.deptName" disabled auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="就诊科室" :label-width="formLabelWidth" prop="name">
              <el-input v-model="insertForm.name" disabled auto-complete="off"></el-input>
            </el-form-item>
            <div class="dialog-footer">
              <el-button size="small" type="primary" @click="resverEvent('insertForm')">立即预约</el-button>
              <el-button size="small" @click="reserveDialog=false">取 消</el-button>
            </div>
          </el-form>
        </el-dialog>
        <el-table
          :data="queryResult.tableData"
          border
          :default-sort = "{prop: 'inGroupDate', order: 'descending'}"
          style="width: 100%;">
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="80">
          </el-table-column>
          <el-table-column
            prop="sid"
            label="SID"
            width="80">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            >
          </el-table-column>
          <el-table-column
            label="性别"
            >
            <template slot-scope="scope">
              <span>{{scope.row.sex | reverseSex}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="age"
            label="年龄"
            >
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号"
            >
          </el-table-column>
          <el-table-column
            prop="nickName"
            label="所属社区"
          >
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
            prop="inGroupDate"
            label="入组日期"
            sortable
            width="160"
            >
          </el-table-column>
          <el-table-column
            label="受试者状态"
            >
            <template slot-scope="scope">
              <span>{{scope.row.overallStatusCy | overallStatusCy}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="reservationNum"
            label="预约次数"
            sortable
            >
          </el-table-column>
           <el-table-column
            prop="breakReservationNum"
            label="爽约次数"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="no_completeNum"
            label="已检查未完成次数"
            >
          </el-table-column>
          <el-table-column
            label="操作"
            width="180"
          >
            <template slot-scope="scope">
              <el-button type="text" class="btnStyle" size="small" title="立即预约" v-if="btnAuth.unreservedEnteroscopy_add_btn" @click="getServerInfo(scope.row.colonoscopyRecordId,scope.row.sid)">立即预约</el-button>
              <el-button type="text" class="btnStyle" size="small" title="已预约" v-if="btnAuth.unreservedEnteroscopy_add_btn && scope.row.dept_code!='anhui'" @click="openBooking(scope.row.colonoscopyRecordId,scope.row.sid)">已预约</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--分页栏-->
        <el-dialog :visible.sync="bookingDialog" :show-close="false">
          <el-form :model="bookingForm"  :rules="bookingFormRule" ref="bookingForm" >
            <el-form-item label="预约时间" :label-width="formLabelWidth" prop="reserveDate" >
              <el-date-picker
                v-model="bookingForm.reserveDate"
                type="date"
                size="small"
                ref="survey_date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <div  style="text-align: center;margin-top: 40px;">
              <el-button size="small" type="primary" @click="resverEvent1('bookingForm')">确定</el-button>
              <el-button size="small" @click="bookingDialog = false">取 消</el-button>
            </div>
          </el-form>
        </el-dialog>
        <el-row>
          <el-col :span="10"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="14"><div class="grid-content bg-purple">
            <div class="block" style="margin-top: 18px">
              <el-pagination
                @size-change="pageSizeChange"
                @current-change="currentPageChange"
                :current-page="$store.state.unreservedEnteroscopyPageNo"
                :page-sizes="[10, 20, 50, 100]"
                v-bind:page-size="$store.state.unreservedEnteroscopyPageSize"
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
    var validateFitCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("噗噗管ID不能为空"));
      } else if (!/\d/.test(value)) {
        callback(new Error("噗噗管ID只能是数字"));
      } else if (!/^\d{8}$/.test(value)) {
        callback(new Error("请输入8位噗噗管ID"));
      } else {
        callback();
      }
    };
    return {
      reserveDialog: false,
      followGroup: DICTIONARY.followGroup,
      //权限判定
      unreservedEnteroscopy_page: false,
      bookingDialog: false,
      btnAuth: {
        buttonRoleAdd: false,
        unreservedEnteroscopy_add_btn: false,
        buttonRoleDel: false,
        unreservedEnteroscopy_query_btn: false,
        buttonUserRoleDis: false,
        reserve_btn: false,
        export_excel_btn: false
      },
      period: "",
      periodData: [],
      //查询条件
      qc: {
        sid: "",
        name: "",
        phone: "",
        group: "",
        loginName: null,
        followGroup: null,
        delayFlag: null
      },
      props: {
        value: "loginName",
        children: "child",
        label: "name"
      },
      ids: [],
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
      bookingForm: {
        id: null,
        sid: null,
        reserveDate: null,
        bookingEntrance: 2
      },
      bookingFormRule: {
        reserveDate: { required: true, message: "必填", trigger: "change" }
      },
      insertForm: {
        reserveable: "",
        deptName: "",
        examinationName: "",
        period: "",
        name: ""
      },
      allocateResourcesData: [],
      allocationId: "",
      colonoscopyRecordId: "",
      sid: "",
      formLabelWidth: "120px",
      rules: {
        name: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 1, max: 16, message: "长度在1到16个字符", trigger: "blur" }
        ],
        desc: [
          { required: true, message: "请输入角色描述信息", trigger: "blur" },
          { min: 1, max: 32, message: "长度在1到32个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    if (localStorage.getItem("communityType") == "true") {
      this.ids.push(localStorage.getItem("loginName"));
      this.qc.loginName = localStorage.getItem("loginName");
    }
  },
  mounted() {
    this.$store.commit("LOGOUT_USER");
    let obj = this.checkPageAuth(
      this,
      "unreservedEnteroscopy_page",
      this.btnAuth
    );
    this.query(
      this.$store.state.unreservedEnteroscopyPageNo,
      this.$store.state.unreservedEnteroscopyPageSize
    );
  },
  beforeDestroy() {
    this.$store.state.unreservedEnteroscopyPageNo = 1;
    this.$store.state.unreservedEnteroscopyPageSize = 10;
  },
  methods: {
    //获取选中区
    getQcId(value) {
      this.qc.loginName = value[0];
    },
    //查询
    query(pageNo, pageSize) {
      $axios_http({
        url: "/base/hospital/person/notreserve/colonoscopy/query",
        data: Object.assign({}, this.qc, {
          delayFlag: Number(this.$route.query.delayFlag),
          pageNo: pageNo,
          pageSize: pageSize
        }),
        vueObj: this
      }).then(res => {
        this.$store.commit("get_unreservedEnteroscopyPageNo", pageNo);
        this.queryResult.tableData = res.data.data;
        this.queryResult.totalPageCount = res.data.pageInfo.totalPageCount; //获取总共多少页
        this.queryResult.totalRowCount = res.data.pageInfo.totalRowCount; //获取总共条数
      });
    },
    //已预约弹窗
    openBooking(id, sid) {
      this.bookingDialog = true;
      this.bookingForm.id = id;
      this.bookingForm.sid = sid;
    },
    changePeriod(obj) {
      this.periodData.forEach((item, ind) => {
        if (item.period == obj) {
          console.log(item, 999);
          this.insertForm.examinationName = item.examinationName;
          this.insertForm.deptName = item.deptName;
          this.insertForm.name = item.name;
          this.insertForm.reserveable = item.reserveable;
          this.allocationId = item.id;
        }
      });
    },
    getServerInfo(colonoscopyRecordId, sid) {
      this.sid = sid;
      this.colonoscopyRecordId = colonoscopyRecordId;
      $axios_http({
        url: "/base/hospital/community/allocation/query",
        data: {},
        vueObj: this
      }).then(res => {
        if (res.data.data.length > 0) {
          this.periodData = res.data.data;
          // this.insertForm=res.data.data[0]
          this.insertForm.reserveable = res.data.data[0].reserveable;
          this.insertForm.deptName = res.data.data[0].deptName;
          this.insertForm.examinationName = res.data.data[0].examinationName;
          this.insertForm.period = res.data.data[0].period;
          this.allocationId = res.data.data[0].id;
          this.insertForm.name = res.data.data[0].name;
          this.period = this.insertForm.period;
          this.reserveDialog = true;
        } else {
          this.$message({
            type: "warning",
            message: "没有可预约的人数，暂时不能预约"
          });
        }
      });
    },
    resverEvent() {
      $axios_http({
        url: "/base/hospital/colonoscopy/record/booking",
        data: {
          colonoscopyRecordId: this.colonoscopyRecordId,
          sid: this.sid,
          allocationId: this.allocationId
        },
        vueObj: this
      }).then(res => {
        $successMsg(this, "预约成功");
        this.reserveDialog = false;
        this.query(
          this.$store.state.unreservedEnteroscopyPageNo,
          this.$store.state.unreservedEnteroscopyPageSize
        );
      });
    },
    //重置检索条件
    reset() {
      Object.assign(this.$data.qc, this.$options.data().qc);
      if (localStorage.getItem("communityType") == "true") {
        this.ids.push(localStorage.getItem("loginName"));
        this.qc.loginName = localStorage.getItem("loginName");
      } else {
        this.ids = [];
      }
      this.query(
        this.$store.state.unreservedEnteroscopyPageNo,
        this.$store.state.unreservedEnteroscopyPageSize
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
              this.$store.state.unreservedEnteroscopyPageNo,
              this.$store.state.unreservedEnteroscopyPageSize
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
    //立即预约
    resverEvent1(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          $axios_http({
            url: "/base/hospital/colonoscopy/record/booking",
            data: {
              colonoscopyRecordId: this.bookingForm.id,
              sid: this.bookingForm.sid,
              bookingEntrance: this.bookingForm.bookingEntrance,
              reserveDate: this.bookingForm.reserveDate
            },
            vueObj: this
          }).then(res => {
            $successMsg(this, "预约成功");
            this.bookingDialog = false;
            this.query(
              this.$store.state.unreservedEnteroscopyPageNo,
              this.$store.state.unreservedEnteroscopyPageSize
            );
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //每页显示查询结果条数变更事件，做重新查询操作
    pageSizeChange(pageSize) {
      //this.queryResult.pageSize = pageSize
      this.$store.commit("get_unreservedEnteroscopyPageSize", pageSize);
      this.query(this.$store.state.unreservedEnteroscopyPageNo, pageSize);
    },
    //切换当前页事件，做重新查询操作
    currentPageChange(currentPage) {
      //this.queryResult.pageNo = currentPage
      this.$store.commit("get_unreservedEnteroscopyPageNo", currentPage);
      this.query(currentPage, this.$store.state.unreservedEnteroscopyPageSize);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  display: block;
  text-align: center;
  margin-bottom: 20px;
}
.table-btn-grooup {
  margin-bottom: 10px;
}
</style>
