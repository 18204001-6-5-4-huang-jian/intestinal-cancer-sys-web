<template>
  <div slot="right" class="content-page" v-if="event_list_page">
    <div class="content">
      <div class="filter-container">
        <router-link to="/home/home" v-if="$store.state.hospitalType==1">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
         <router-link to="/home/areaHome" v-if="$store.state.hospitalType==2">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
         <router-link to="/home/countryHome" v-if="$store.state.hospitalType==3">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
        <el-form :model="qc" :inline="true" class="clear">
            <el-input  style="width: 200px;" size="small" class="filter-item" clearable placeholder="姓名" v-model="qc.name"></el-input>
            <el-input  style="width: 200px;" size="small" class="filter-item" clearable placeholder="SID" v-model="qc.sid">
            </el-input>
            <el-input  style="width: 200px;" size="small" class="filter-item" clearable placeholder="手机号" v-model="qc.phone">
            </el-input>
            <el-select v-model="qc.inputStatus" placeholder="表单录入状态" size="small" class="filter-item" clearable>
              <el-option value="1" v-bind:key="1" label="未录入"></el-option>
              <el-option value="2" v-bind:key="2" label="已录入"></el-option>
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
            <div class="filter-item" v-if="$store.state.hospitalType==1">
              <el-cascader
                style="width: 200px;margin-right: 15px;"
                :options="$store.state.regionOptions"
                placeholder="所属社区"
                :props="props1"
                v-model="ids"
                size="small"
                filterable
                :show-all-levels="false"
                change-on-select
                @change="getQcId1"
              ></el-cascader>
            </div>
            <div class="filter-item" v-if="$store.state.hospitalType==2">
              <el-cascader
                style="width: 200px;margin-right: 15px;"
                clearable
                :options="$store.state.regionOptions"
                placeholder="所属区"
                :props="props"
                v-model="ids"
                size="small"
                filterable
                :show-all-levels="false"
                change-on-select
                @change="getQcId2"
              ></el-cascader>
            </div>
            <div class="filter-item" v-if="$store.state.hospitalType==3">
              <el-cascader
                style="width: 200px;margin-right: 15px;"
                clearable
                :options="$store.state.regionOptions"
                placeholder="所属地区"
                :props="props"
                v-model="ids"
                size="small"
                filterable
                :show-all-levels="false"
                change-on-select
                @change="getQcId3"
              ></el-cascader>
            </div>
            <el-select v-model="qc.group" placeholder="请选择分组方案" size="small" class="filter-item" clearable>
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
              <el-select v-model="qc.followState" placeholder="随访状态" size="small" class="filter-item" clearable>
                <el-option v-for="(item,index) in followStatus" 
                :key="index" 
                :value="item.id" 
                :label="item.name">
                </el-option>
              </el-select>
            <el-select v-model="qc.followGroup"  placeholder="随访分组" size="small" class="filter-item" clearable>
              <el-option v-for="(item,index) in followGroup" 
              :key="index" 
              :value="item.id" 
              :label="item.name"></el-option>
            </el-select>
          <div>
            <el-button  size="small" type="primary" icon="el-icon-search" @click="query(1,$store.state.cancerList1PageSize)" >查询</el-button>
            <el-button  type="primary" size="small" icon="el-icon-close" @click="reset" >重置</el-button>
          </div>
        </el-form>
      </div>
      <div class="table-btn-grooup">
        <el-button size="small" type="primary" icon="el-icon-plus" @click="addFormDialog = true">新增</el-button>
      </div>
        <!-- <div class="table-btn-grooup">
          <el-button size="small" type="primary" icon="el-icon-document"
          >
            <a :href="downloadUrl">导出EXCEL</a>
          </el-button>
        </div> -->
        <!--数据列表-->
        <el-table
          :data="queryResult.tableData"
          border
          @sort-change="changeTableSort"
          style="width: 100%;">
          <el-table-column
            type="index"
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
            prop="name"
            label="姓名"
            width="110"
          >
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
            v-if="$store.state.hospitalType==3"
          >
          </el-table-column>
          <el-table-column
            prop="depName"
            label="所属区"
            v-if="$store.state.hospitalType==2 || $store.state.hospitalType==1"
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
            prop="inGroupDate"
            label="入组日期"
            sortable
            width="110"
          >
          </el-table-column>
          <el-table-column
            label="总体状态"
          >
            <template slot-scope="scope">
              <span>{{scope.row.overallStatusCy | overallStatusCy}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="inGroupDate"
            label="记录日期"
            sortable
            width="110"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            width="200"
          >
            <template slot-scope="scope">
              <router-link :to="{path:'/event/cancerReport5',query:{id:scope.row.id,flag:0}}"  v-if="scope.row.inputStatus==2">
                <el-button type="text">查看</el-button>
              </router-link>
              <router-link :to="{path:'/event/cancerReport5',query:{
              id:scope.row.id,
              flag:2,resource:1}}"  v-if="scope.row.inputStatus==2">
                <el-button type="text">编辑</el-button>
              </router-link>
              <router-link :to="{path:'/event/cancerReport5',query:{sid:scope.row.sid,
              id:scope.row.id,
              flag:1,resource:1}}" v-if="scope.row.inputStatus==1">
                <el-button type="text">录入</el-button>
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
                :current-page="$store.state.cancerList1PageNo"
                :page-sizes="[10, 20, 50, 100]"
                v-bind:page-size="$store.state.cancerList1PageSize"
                layout="total, sizes, prev, pager, next, jumper"
                v-bind:total="queryResult.totalRowCount">
              </el-pagination>
            </div>
          </div></el-col>
        </el-row>
        <!-- 新增 -->
        <el-dialog :visible.sync="addFormDialog" :show-close="false" width="500px">
          <el-form :model="addForms" :rules="addFormRules" ref="addForms" >
            <el-form-item label="SID" :label-width="formLabelWidth" prop="sid" >
              <el-input v-model.trim="addForms.sid" auto-complete="off" class="notification-input" @blur="getInfo()"></el-input>
            </el-form-item>
            <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
              <el-input v-model="addForms.name" auto-complete="off" class="notification-input"  disabled></el-input>
            </el-form-item>
            <div class="dialog-footer" style="text-align: center;">
              <el-button size="small" type="primary" @click="addForm('addForms')" >提交</el-button>
              <el-button size="small" @click="cancel()">取 消</el-button>
            </div>
          </el-form>
        </el-dialog>
      </div>
    </div>
</template>
<script>
import DICTIONARY from "@/utils/dictionary.js";
export default {
  data() {
    return {
      followGroup: DICTIONARY.followGroup,
      followStatus:DICTIONARY.followStatus,
      isShow: false,
      deptGroup: [],
      event_list_page: false,
      addFormDialog: false,
      btnAuth: {
        subjectsList_query_btn: false,
        subjectsList_EXCEL_btn: false
      },
      downloadUrl: SERVER_NAME + "/base/hospital/person/nationUsersQueryExcel",
      //查询条件
      qc: {
        name: "",
        phone: "",
        sid: "",
        loginName: null,
        cancerType: "5", //表单类型 1--c1 2--c2 3--c3 4--c4
        inGroupDateStart: "",
        inGroupDateEnd: "",
        group: null,
        overallStatusCy: null,
        areaDeptId: null,
        communityDeptId: null,
        inputStatus: null,
        followGroup: null,
        followState: null,
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
      props1: {
        value: "loginName",
        children: "child",
        label: "name"
      },
      addForms: {
        sid: "",
        name: ""
      },
      addFormRules: {
        sid: { required: true, message: "必填", trigger: "blur" }
      },

      ids: []
    };
  },
  created() {
    if (localStorage.getItem("communityType") == "true") {
      this.ids.push(localStorage.getItem("loginName"));
      this.qc.loginName = localStorage.getItem("loginName");
    }
  },
  mounted() {
    let obj = this.checkPageAuth(this, "event_list_page", this.btnAuth);
    this.qc.sid = this.$route.query.sid;
    this.query(
      this.$store.state.cancerList1PageNo,
      this.$store.state.cancerList1PageSize
    );
  },
  beforeDestroy() {
    this.$store.state.cancerList1PageNo = 1;
    this.$store.state.cancerList1PageSize = 10;
  },
  methods: {
    //获取选中社区
    getQcId3(value) {
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
            for (
              let j = 0;
              j < this.$store.state.regionOptions[i].child.length;
              j++
            ) {
              if (value[1] == this.$store.state.regionOptions[i].child[j].id) {
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
    //获取选中区
    getQcId2(value) {
      this.qc.communityDeptId = null;
      this.qc.loginName = null;
      if (value.length == 1) {
        this.qc.communityDeptId = value[0];
        this.qc.loginName = null;
      } else if (value.length == 2) {
        this.qc.communityDeptId = value[0];
        for (let j = 0; j < this.$store.state.regionOptions.length; j++) {
          if (value[0] == this.$store.state.regionOptions[j].id) {
            for (
              let k = 0;
              k < this.$store.state.regionOptions[j].child.length;
              k++
            ) {
              if (value[1] == this.$store.state.regionOptions[j].child[k].id) {
                this.qc.loginName = this.$store.state.regionOptions[j].child[
                  k
                ].loginName;
              }
            }
          }
        }
      }else{
        this.qc.loginName = null;
      }
    },
    getQcId1(value) {
      this.qc.loginName = value[0];
    },
    //查询
    query(pageNo, pageSize) {
      $axios_http({
        url: "/base/hospital/deathCertificateList/query",
        data: {
          name: this.qc.name,
          sid: this.qc.sid,
          loginName: this.qc.loginName,
          phone: this.qc.phone,
          inGroupDateStart: this.qc.inGroupDateStart,
          inGroupDateEnd: this.qc.inGroupDateEnd,
          group: this.qc.group,
          communityDeptId: this.qc.communityDeptId,
          overallStatusCy: this.qc.overallStatusCy,
          areaDeptId: this.qc.areaDeptId,
          cancerType: this.qc.cancerType,
          inputStatus: this.qc.inputStatus,
          followGroup: this.qc.followGroup,
          followState:this.qc.followState,
          pageNo: pageNo, //当前页
          pageSize: pageSize //每页条数
        },
        vueObj: this
      }).then(res => {
        this.$store.commit("get_cancerList1PageNo", pageNo);
        this.queryResult.tableData = res.data.data;
        this.queryResult.totalPageCount = res.data.pageInfo.totalPageCount; //获取总共多少页
        this.queryResult.totalRowCount = res.data.pageInfo.totalRowCount; //获取总共条数
      });
    },
    changeTableSort(value) {
      if (value.prop == "inGroupDate") {
        this.qc.sortParameter = "in_group_date";
      } else if (value.prop == "sid") {
        this.qc.sortParameter = "sid";
      }
      if (value.order == "descending") {
        this.qc.sortRule = "desc";
      } else if (value.order == "ascending") {
        this.qc.sortRule = "asc";
      }
      this.query(
        this.$store.state.cancerList1PageNo,
        this.$store.state.cancerList1PageSize
      );
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
        this.$store.state.cancerList1PageNo,
        this.$store.state.cancerList1PageSize
      );
    },
    //每页显示查询结果条数变更事件，做重新查询操作
    pageSizeChange(pageSize) {
      this.$store.commit("get_cancerList1PageSize", pageSize);
      this.query(this.$store.state.cancerList1PageNo, pageSize);
    },
    //切换当前页事件，做重新查询操作
    currentPageChange(currentPage) {
      this.$store.commit("get_cancerList1PageNo", currentPage);
      this.query(currentPage, this.$store.state.cancerList1PageSize);
    },
    cancel() {
      this.addFormDialog = false;
      this.$refs["addForms"].resetFields();
    },
    addForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          $axios_http({
            url: "/base/hospital/deathCertificate/addCheck",
            data: {
              sid: this.addForms.sid
            },
            vueObj: this
          }).then(res => {
            if (res.data.data) {
              this.$confirm(
                "该受试者已有表C5-死亡相关信息，新增失败！【请在列表中查询并完善】",
                "提示",
                {
                  confirmButtonText: "好的",
                  cancelButtonText: "取消",
                  showCancelButton: false,
                  type: "warning"
                }
              )
                .then(() => {
                  this.addFormDialog = false;
                  this.$refs["addForms"].resetFields();
                })
                .catch(() => {});
            } else {
              this.addFormDialog = false;
              this.$router.push({
                path: "/event/cancerReport5",
                query: { sid: this.addForms.sid, flag: 5 }
              });
            }
          });
        }
      });
    },
    // 查询受试者
    getInfo(value) {
      if (this.addForms.sid) {
        $axios_http({
          url: '/base/hospital/review/get/'+ this.addForms.sid,
          data: {},
          vueObj: this
        }).then(res => {
          this.addForms.name = res.data.data.name;
        });
      }
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
.filter-item {
  width: 200px;
  margin-right: 10px;
}
.el-button.is-plain:hover,
.el-button.is-plain:focus {
  border-color: #fff;
}
</style>
