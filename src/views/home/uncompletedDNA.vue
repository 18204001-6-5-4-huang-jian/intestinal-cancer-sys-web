<template>
  <div slot="right" class="content-page" v-if="uncompletedDNA_page">
    <div class="content">
      <h4>待办-未录入粪便DNA装置编号</h4>
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
            <el-select v-model="qc.group" clearable placeholder="请选择分组方案" size="small" class="filter-item">
              <el-option value="A" v-bind:key="1" label="A组"></el-option>
              <el-option value="B" v-bind:key="2" label="B组"></el-option>
              <el-option value="C" v-bind:key="3" label="C组"></el-option>
              <el-option value="Cg" v-bind:key="4" label="C组高危"></el-option>
              <el-option value="Cd" v-bind:key="5" label="C组低危"></el-option>
            </el-select>
            <el-select v-model="qc.followGroup" clearable placeholder="随访分组" size="small" class="filter-item">
              <el-option v-for="(item,index) in followGroup" 
              :key="index" 
              :value="item.id" 
              :label="item.name"></el-option>
            </el-select>
          </div>
          <div style="margin-bottom: 20px;">
          <el-button  size="small" type="primary" icon="el-icon-search" @click="query(1,$store.state.uncompletedDNAPageSize)" v-if="btnAuth.uncompletedDNA_query_btn">查询</el-button>
          <el-button  type="primary" size="small" icon="el-icon-close" @click="reset" v-if="btnAuth.uncompletedDNA_query_btn">重置</el-button>
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
            prop="cellPhone"
            label="手机号"
            >
          </el-table-column>
          <el-table-column
            prop="nickName"
            label="所属社区"
          >
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
            sortable
            label="入组日期"

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
            label="操作"
          >
            <template slot-scope="scope">
              <el-button type="text" class="btnStyle" v-if="btnAuth.uncompletedDNA_add_btn" @click="inputCodeDialogIsShow(scope.row.id)">录入粪便DNA编码</el-button>
              <el-button type="text" class="btnStyle" @click="noProvided(scope.row)">未提供</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog :visible.sync="inputCodeDialog">
          <el-form :model="addCodeForm" :rules="addCodeFormRules" ref="addCodeForm">
            <el-form-item label="记录DNA编码" :label-width="formLabelWidth" prop="dnaCode">
              <el-input v-model="addCodeForm.dnaCode" auto-complete="off" class="lineWidth"></el-input>
            </el-form-item>
            <el-form-item label="发放经手人工作编码" :label-width="formLabelWidth" prop="personCode">
              <el-input v-model="addCodeForm.personCode" auto-complete="off" class="lineWidth"></el-input>
            </el-form-item>
            <el-form-item label="发放日期" :label-width="formLabelWidth" prop="releaseDate">
              <el-date-picker
                v-model="addCodeForm.releaseDate"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="结果日期"
                class="lineWidth">
              </el-date-picker>
            </el-form-item>

            <div class="dialog-footer">
              <el-button size="small" @click="inputCode('addCodeForm')" type="primary">确 定</el-button>
              <el-button size="small" @click="inputCodeDialog=false">取 消</el-button>
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
                :current-page="$store.state.uncompletedDNAPageNo"
                :page-sizes="[10, 20, 50, 100]"
                v-bind:page-size="$store.state.uncompletedDNAPageSize"
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
      } else if (!/^[A-Za-z0-9]{12}$/.test(value)) {
        callback(new Error("请输入12位数字或字母"));
      } else {
        callback();
      }
    };
    return {
      followGroup: DICTIONARY.followGroup,
      //权限判定
      uncompletedDNA_page: false,
      btnAuth: {
        buttonRoleAdd: false,
        uncompletedDNA_add_btn: false,
        buttonRoleDel: false,
        uncompletedDNA_query_btn: false,
        buttonUserRoleDis: false
      },
      addCodeForm: {
        dnaCode: "",
        personCode: "",
        releaseDate: ""
      },
      id: "",
      inputCodeDialog: false,
      //查询条件
      qc: {
        sid: "",
        name: "",
        phone: "",
        group: "",
        followGroup: null,
        loginName: null
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
      allocateResourcesData: [],
      formLabelWidth: "180px",
      addCodeFormRules: {
        dnaCode: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validateFitCode, trigger: "blur" }
        ],
        personCode: [
          { required: true, message: "必填", trigger: "blur" }
          // {min:3,max:15,message:'超出长度限制',trigger:'blur'},
        ],
        releaseDate: [{ required: true, message: "必填", trigger: "blur" }]
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
    let obj = this.checkPageAuth(this, "uncompletedDNA_page", this.btnAuth);
    this.query(
      this.$store.state.uncompletedDNAPageNo,
      this.$store.state.uncompletedDNAPageSize
    );
  },
  beforeDestroy() {
    this.$store.state.uncompletedDNAPageNo = 1;
    this.$store.state.uncompletedDNAPageSize = 10;
  },
  methods: {
    //获取选中区
    getQcId(value) {
      this.qc.loginName = value[0];
    },
    inputCode(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          $axios_http({
            url: "/base/stool/dna/addDnaCode",
            data: {
              id: this.id,
              dnaCode: this.addCodeForm.dnaCode,
              personCode: this.addCodeForm.personCode,
              releaseDate: this.addCodeForm.releaseDate
            },
            vueObj: this
          }).then(res => {
            $successMsg(this, "编码录入成功");
            this.query(
              this.$store.state.uncompletedDNAPageNo,
              this.$store.state.uncompletedDNAPageSize
            );
            this.inputCodeDialog = false;
            Object.assign(
              this.$data.addCodeForm,
              this.$options.data().addCodeForm
            );
          });
        }
      });
    },
    //查询
    query(pageNo, pageSize) {
      $axios_http({
        url: "/base/hospital/person/notentry/dnacode/query",
        data: {
          name: this.qc.name,
          sid: this.qc.sid,
          phone: this.qc.phone,
          group: this.qc.group,
          loginName: this.qc.loginName,
          followGroup: this.qc.followGroup,
          delayFlag: this.$route.query.delayFlag == 1 ? 1 : null,
          pageNo: pageNo, //当前页
          pageSize: pageSize //每页条数
        },
        vueObj: this
      }).then(res => {
        this.$store.commit("get_uncompletedDNAPageNo", pageNo);
        this.queryResult.tableData = res.data.data;
        this.queryResult.totalPageCount = res.data.pageInfo.totalPageCount; //获取总共多少页
        this.queryResult.totalRowCount = res.data.pageInfo.totalRowCount; //获取总共条数
      });
    },
    // 未提供
    noProvided(row) {
      this.$confirm("该受试者未提供粪便DNA样本？", "提示", {
        closeOnClickModal: false,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(res => {
          $axios_http({
            url: "/base/hospital/stooldna/noProvided",
            data: {
              id: Number(row.id)
            },
            vueObj: this
          }).then(res => {
            $successMsg(this, "操作成功");
            this.query(
              this.$store.state.uncompletedDNAPageNo,
              this.$store.state.uncompletedDNAPageSize
            );
          });
        })
        .catch(() => {});
    },
    inputCodeDialogIsShow(id) {
      this.id = id;
      this.inputCodeDialog = true;
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
        this.$store.state.uncompletedDNAPageNo,
        this.$store.state.uncompletedDNAPageSize
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
              this.$store.state.uncompletedDNAPageNo,
              this.$store.state.uncompletedDNAPageSize
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
    //每页显示查询结果条数变更事件，做重新查询操作
    pageSizeChange(pageSize) {
      //this.queryResult.pageSize = pageSize
      this.$store.commit("get_uncompletedDNAPageSize", pageSize);
      this.query(this.$store.state.uncompletedDNAPageNo, pageSize);
    },
    //切换当前页事件，做重新查询操作
    currentPageChange(currentPage) {
      //this.queryResult.pageNo = currentPage
      this.$store.commit("get_uncompletedDNAPageNo", currentPage);
      this.query(currentPage, this.$store.state.uncompletedDNAPageSize);
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
.dialog-footer {
  width: 140px;
  margin: 0 auto;
}
.filter-item {
  margin-right: 10px;
  width: 200px;
}
</style>
