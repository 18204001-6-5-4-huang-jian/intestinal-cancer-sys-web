<template>
  <div slot="right" class="content-page" v-if="liste2_list_page">
    <div class="content">
      <div class="filter-container">
         <router-link to="/home/home" v-if="$store.state.hospitalType == 1">
           <el-button size="mini" class="return-home">返 回</el-button>
         </router-link>
         <router-link to="/home/areaHome" v-if="$store.state.hospitalType == 2">
           <el-button size="mini" class="return-home">返 回</el-button>
         </router-link>
          <router-link to="/home/countryHome" v-if="$store.state.hospitalType == 3">
           <el-button size="mini" class="return-home">返 回</el-button>
         </router-link>
        <el-form
        :model="formData"
        class="clearfix liste2"
        :inline="true">
          <el-input style="width: 200px;" v-model.trim="formData.name" clearable placeholder="姓名" size="small"></el-input>
          <el-input style="width: 200px;" v-model.trim="formData.sid" clearable placeholder="SID" size="small"></el-input>
          <el-input style="width: 200px;" v-model.trim="formData.phone" clearable placeholder="手机号" size="small"></el-input>
          <!-- <el-cascader
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
            ></el-cascader> -->
          <el-select v-model="formData.group" placeholder="分组方案" size="small" class="filter-item" clearable>
            <el-option 
            v-for="(item,index) in group" 
            :key="index" 
            :value="item.id" 
            :label="item.name"></el-option>
          </el-select>
          <el-select v-model="formData.insertStatus" placeholder="E2录入状态" size="small" class="filter-item" clearable>
            <el-option v-for="(item,index) in inputStatus" 
            :key="index" 
            :value="item.id" 
            :label="item.name"></el-option>
          </el-select>
          <el-select v-model="formData.followState" placeholder="随访状态" size="small" class="filter-item" clearable>
              <el-option v-for="(item,index) in followStatus" 
              :key="index" 
              :value="item.id" 
              :label="item.name"></el-option>
            </el-select>
          <el-select v-model="formData.followGroup" placeholder="随访分组" size="small" class="filter-item" clearable>
            <el-option v-for="(item,index) in followGroup" 
            :key="index" 
            :value="item.id" 
            :label="item.name"></el-option>
          </el-select>
          <el-select v-model="formData.followViolateType" placeholder="违反分类" size="small" class="filter-item" clearable>
            <el-option v-for="(item,index) in followCategory" 
            :key="index" 
            :value="item.id" 
            :label="item.name"></el-option>
          </el-select>
        <el-form-item class="btns">
          <el-button  size="small" type="primary" icon="el-icon-search" @click="query(1,queryResult.pageSize)" >查询</el-button>
          <el-button  type="primary" size="small" icon="el-icon-close" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>

      </div>
        <!--数据列表-->
        <el-table
          :data="queryResult.tableData"
          border
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
            prop="phone"
            label="手机号"
            width="110"
          >
          </el-table-column>
          <!-- <el-table-column
            prop="nickName"
            label="所属社区"
          >
          </el-table-column> -->
          <el-table-column
            label="随访分组"
          >
          <template slot-scope="scope">
              <span>{{scope.row.followGroup | followGroup}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="分组方案"
            width="110"
          >
          <template slot-scope="scope">
              <span>{{scope.row.group | group}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="总体状态"
            width="110"
          >
          <template slot-scope="scope">
              <span>{{scope.row.overallStatusCy | overallStatusCy}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="随访状态"
          >
            <template slot-scope="scope">
              <span>{{scope.row.followState | followState}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="违反类型"
          >
          <template slot-scope="scope">
              <span>{{scope.row.followViolateType | quitFollowReason}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="表E2录入状态"
          >
          <template slot-scope="scope">
              <span>{{scope.row.insertStatus | codeEntryStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="lastContactDate"
            label="最后联系日期"
          >
          <template slot-scope="scope">
              <span>{{scope.row.lastContactDate | date}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            width="200"
          >
            <template slot-scope="scope">
                <router-link :to="{path:'/followup/followupE2',query:{sid:scope.row.sid,
                id:scope.row.id,
                flag:1}}"
                v-if="scope.row.insertStatus === 1">
                  <el-button type="text">录入</el-button>
                </router-link>
                <router-link :to="{path:'/followup/followupE2',query:{sid:scope.row.sid,
                id:scope.row.id,
                flag:0}}"
                v-if="scope.row.insertStatus === 2">
                  <el-button type="text">查看</el-button>
                </router-link>
                <router-link :to="{path:'/followup/followupE2',query:{sid:scope.row.sid,
                id:scope.row.id,
                flag:2}}"
                v-if="scope.row.insertStatus === 2">
                  <el-button type="text">编辑</el-button>
                </router-link>
                <el-button type="text" @click="openInsertDialog(scope.row.sid)">取消失访</el-button>
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
        <!-- 重新入组确认弹窗 -->
        <el-dialog
          :visible.sync="insertDialogVisible"
          width="30%"
          :before-close="handleClose">
          <span>确定要重新开始随访？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="insertDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmInsert" ref="addBtn" id="addGroupBtn">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
</template>
<script>
import DICTIONARY from "@/utils/dictionary.js";
export default {
  data() {
    return {
      insertDialogVisible: false,
      reGroupSid: [],
      group: DICTIONARY.group,
      inputStatus: DICTIONARY.inputStatus,
      followStatus: DICTIONARY.followStatus,
      followGroup: DICTIONARY.followGroup,
      followCategory: DICTIONARY.followCategory,
      liste2_list_page: false,
      formData: {
        name: null,
        sid: null,
        phone: null,
        group: null,
        insertStatus: null,
        followState: null,
        followGroup: null,
        followViolateType: null,
        loginName: null
      },
      queryResult: {
        pageNo: 1, //当前页
        pageSize: 10, //每页的条数
        totalPageCount: 0,
        tableData: []
      },
      props: {
        value: "loginName",
        children: "child",
        label: "name"
      },
      ids: []
    };
  },
  created() {},
  mounted() {
    let obj = this.checkPageAuth(this, "liste2_list_page", this.btnAuth);
    this.formData.sid=this.$route.query.sid;
    this.query(this.queryResult.pageNo, this.queryResult.pageSize);
  },
  beforeDestroy() {},
  methods: {
    //获取选中区
    getQcId(value) {
      this.formData.loginName = value[0];
    },
    //查询
    query(pageNo, pageSize) {
      $axios_http({
        url: "/base/follow/violationResearchList/query",
        data: Object.assign({}, this.formData, {
          pageNum: pageNo,
          pageSize: pageSize
        }),
        vueObj: this
      }).then(res => {
        this.queryResult.tableData = res.data.data.list;
        this.queryResult.totalPageCount = res.data.data.pages; //获取总共多少页
        this.queryResult.totalRowCount = res.data.data.total; //获取总共条数
      });
    },
    //重置检索条件
    reset() {
      Object.assign(this.$data.formData, this.$options.data().formData);
      if (localStorage.getItem("communityType") == "true") {
        this.ids.push(localStorage.getItem("loginName"));
        this.qc.loginName = localStorage.getItem("loginName");
      } else {
        this.ids = [];
      }
      this.query(1, this.queryResult.pageSize);
    },
    //每页显示查询结果条数变更事件，做重新查询操作
    pageSizeChange(pageSize) {
      this.queryResult.pageSize = val;
      this.query(this.$store.state.cancerList1PageNo, pageSize);
    },
    //切换当前页事件，做重新查询操作
    currentPageChange(currentPage) {
      this.queryResult.pageNo = val;
      this.query(currentPage, this.$store.state.cancerList1PageSize);
    },
    handleClose(done) {
      done();
    },
    // 取消随访
    openInsertDialog(sid) {
      this.insertDialogVisible = true;
      this.reGroupSid.push(sid);
    },
    // 确定重新入组
    confirmInsert() {
      $axios_http({
        url: "/base/hospital/person/reresearch",
        data: {
          sid: this.reGroupSid
        },
        vueObj: this
      }).then(res => {
        if (res.data.data) {
          this.$confirm(
            "取消违反后，该受试者的整体状态将由“死亡”变更为“正常”，已录入的终点事件-表单C5死亡相关信息将会删除！",
            "提示",
            {
              confirmButtonText: "确定删除",
              cancelButtonText: "取消",
              showCancelButton: false,
              type: "warning"
            }
          )
            .then(() => {
              this.reresearch();
            })
            .catch(() => {});
        } else {
          this.reresearch();
        }
      });
    },
    // 取消违反
    reresearch() {
      $axios_http({
        url: "/base/hospital/person/reresearch",
        data: {
          sid: this.reGroupSid
        },
        vueObj: this
      }).then(res => {
        this.insertDialogVisible = false;
        this.query(this.queryResult.pageNo, this.queryResult.pageSize);
      });
    }
  }
};
</script>

<style scoped>
.content {
  background: #fff;
  padding: 10px;
}
.el-form {
  margin-top: 20px;
}
.el-form .el-input,
.el-form .el-select {
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
<style>
.liste2 .el-form-item__content {
  line-height: 1;
}
</style>

