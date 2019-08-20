<template>
  <div slot="right" class="content-page" v-if="expressCountryList_page">
    <div class="content">
      <div class="filter-container">
        <router-link to="/home/home">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
        <el-form :model="qc" :inline="true" class="clear">
          <div>
            <el-input style="width: 200px;" size="small" class="filter-item" placeholder="快递单号" v-model="qc.num" clearable>
            </el-input>
            <el-select v-model="qc.serumStatus" placeholder="筛查现场" size="small" class="filter-item"   clearable>
             <el-option value="1" v-bind:key="1" label="全部"></el-option>
             <el-option value="2" v-bind:key="2" label="浙江"></el-option>
             <el-option value="3" v-bind:key="3" label="安徽"></el-option>
           </el-select>
            <el-date-picker
              v-model="qc.emitTime"
              clearable
              type="date"
              size="small"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="发出日期"
              class="filter-item">
            </el-date-picker>
            <el-date-picker
              clearable
              v-model="qc.receiveTime"
              type="date"
              size="small"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="接收日期"
              class="filter-item">
            </el-date-picker>
          </div>
          <div>
            <el-button size="small" type="primary" icon="el-icon-search" @click="query">查询</el-button>
            <el-button type="primary" size="small" icon="el-icon-close" @click="reset">重置</el-button>
          </div>
        </el-form>
        <div class="table-btn-grooup">
            <router-link to="/biology/sendExpress">
              <el-button type="primary" size="small" icon="el-icon-upload2">寄出样本</el-button>
            </router-link>
            <el-button size="small" type="primary" icon="el-icon-document">
                <a>导出EXCEL</a>
            </el-button>
            <el-button @click="openDetailDialog">展开详情</el-button>
            <el-button @click="openConfirmDialog">确认收件</el-button>
        </div>
      </div>

      <div>
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
            label="运单号"
          >
          </el-table-column>
          <el-table-column
            label="发出日期"
          >
          </el-table-column>
          <el-table-column
            label="发件人"
          >
            <template slot-scope="scope">
              <span>{{scope.row.sex | reverseSex}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="age"
            label="接收日期"
          >
          </el-table-column>
          <el-table-column
            prop="phone"
            label="接收人"
          >
          </el-table-column>
            <!-- <el-table-column
             prop="overallStatusCy"
             label="总体状态"
           >
           <template slot-scope="scope">
             <span>{{scope.row.overallStatusCy | overallStatusCy}}</span>
           </template>
           </el-table-column> -->
          <el-table-column
            label="详细信息"
            fixed="right"
          >
            <template slot-scope="scope">
              <router-link :to="{path:'subjectsDetail',query:{id:scope.row.sid}}">
                <el-button type="text" v-if="btnAuth.subjectsList_EXCEL_btn">查看详情</el-button>
              </router-link>
              <el-button type="text" v-if="btnAuth.subjectsList_EXCEL_btn && scope.row.overallStatusCy != 2" @click="openQuitDialog(scope.row)">退出研究</el-button>
              <!-- <el-button type="text" v-if="btnAuth.subjectsList_EXCEL_btn && scope.row.overallStatusCy!=1 ">重新入组</el-button>-->
            </template>
          </el-table-column>
           <el-table-column
            label="确认收件"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button type="text"  @click="openQuitDialog(scope.row)">确认</el-button>
              <!-- <el-button type="text" v-if="btnAuth.subjectsList_EXCEL_btn && scope.row.overallStatusCy!=1 ">重新入组</el-button>-->
            </template>
          </el-table-column>
        </el-table>
        <!--分页栏-->
        <el-row>
          <el-col :span="10">
            <div class="grid-content bg-purple"></div>
          </el-col>
          <el-col :span="14">
            <div class="grid-content bg-purple">
              <div class="block" style="margin-top: 18px">
                <el-pagination
                  @size-change="pageSizeChange"
                  @current-change="currentPageChange"
                  :current-page="$store.state.userListNo"
                  :page-sizes="[10, 20, 50, 100]"
                  v-bind:page-size="$store.state.userListSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  v-bind:total="queryResult.totalRowCount">
                </el-pagination>
              </div>
            </div>
          </el-col>
        </el-row>
        <!-- 展开详情弹窗 -->
        <el-dialog
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
             <el-tabs v-model="activeName2" type="card">
                <el-tab-pane label="快递进度" name="first">
                    <div class="title">
                        运单号：123456  
                    </div>
                    <div class="expressDetail clearfix">
                        <ul class="fl left">
                            <li>222</li>
                        </ul>
                        <ul class="fl right">
                            <li><span></span>您已寄出XX生物样本</li>
                        </ul>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="冷冻盒详情" name="second">
                    <div class="title">
                        运单号：123456  
                    </div>
                    <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                        <el-table-column
                        prop="date"
                        label="样本类型">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="冷冻盒编号">
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
            <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span> -->
        </el-dialog>
        <!-- 确认收件弹窗 -->
        <el-dialog
            :visible.sync="dialogConfirmVisible"
            width="30%"
            :before-close="handleClose">
             <el-form :model="receiveExpressForm" status-icon :rules="rules2" ref="receiveExpressForm" label-width="100px" class="demo-ruleForm">
               <el-form-item label="接收日期" prop="surveyDate" class="formItemWidth">
                  <el-date-picker
                      v-model="receiveExpressForm.surveyDate"
                      type="date"
                      size="small"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                      ref="surveyDate"
                      @change="focusSurvey_date"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
              <el-form-item label="接收人" prop="pass">
                <el-input type="text" v-model="receiveExpressForm.name" auto-complete="off"></el-input>
              </el-form-item>
             </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span> 
        </el-dialog>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        activeName2: 'second',
        dialogVisible:false,
        dialogConfirmVisible:true,
        tableData:[],   //冷冻盒表格
        expressCountryList_page: false,
        btnAuth: {
          one_subjectsList_btn: false,
          subjectsList_query_btn: false,
          subjectsList_EXCEL_btn: false,
          subjectsList_add_btn: false
        },
        //查询条件
        "qc": {
          "num": "",
          "emitTime": "",
          "receiveTime": ""
        },
        //查询结果
        "queryResult": {
          "pageNo": 1,//当前页
          "pageSize": 10,//每页的条数
          "totalPageCount": 0,
          "tableData": []
        },
        receiveExpressForm: {
          name: '',
          surveyDate:''
        },
      }
    },
    mounted(){
      let obj = this.checkPageAuth(this, "expressCountryList_page", this.btnAuth)
    },
    beforeDestroy(){
      this.$store.state.subjectsListPageNo = 1;
      this.$store.state.subjectsListPageSize = 10;
    },
    methods: {
        handleClose(done) {
            done();
        },
        openDetailDialog(){
          this.dialogVisible=true;
        },
        openConfirmDialog(){
          this.dialogConfirmVisible=true;
        },
      //查询
      query(){
        $axios_http({
          url: "/base/hospital/person/query",
          data: {
            name: this.qc.num,
            sid: this.qc.emitTime,
            phone: this.qc.receiveTime,
            sex: this.qc.sex,
            pageNo: this.$store.state.subjectsListPageNo,//当前页
            pageSize: this.$store.state.subjectsListPageSize//每页条数
          },
          vueObj: this
        }).then((res) => {
          this.queryResult.tableData = res.data.data;
          this.queryResult.totalPageCount = res.data.pageInfo.totalPageCount//获取总共多少页
          this.queryResult.totalRowCount = res.data.pageInfo.totalRowCount//获取总共条数
        })
      },

      //重置检索条件
      reset(){
        Object.assign(this.$data.qc, this.$options.data().qc)
        this.query()
      },
      //每页显示查询结果条数变更事件，做重新查询操作
      pageSizeChange(pageSize) {
        this.$store.commit('get_subjectsListPageSize', pageSize)
        //this.queryResult.pageSize = pageSize
        console.log(`每页 ${pageSize} 条`)
        this.query()
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        this.$store.commit('get_subjectsListPageNo', currentPage)
        //this.queryResult.pageNo = currentPage
        console.log(`当前页: ${currentPage}`);
        this.query()
      },
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content{
    background: #fff;
    padding:10px;
  }
  .return-home {
    display: block;
    text-align: center;
    float: left;
    margin-bottom:20px;
  }
  .filter-item {
    width: 200px;
    margin-right: 10px;
  }
  .table-btn-grooup {
    margin-bottom: 10px;
    margin-top: 20px;
  }
  .expressDetail .left{
      width: 100px;
      border-right: 1px solid #e4e7ed;
      padding: 20px 0;
  }
  .expressDetail .right{
      padding:20px 0;
  }
   .expressDetail .right li{
       list-style: none;
       position: relative;
       margin-left: 15px;
   }
   .expressDetail .right li span{
       position: absolute;
       width: 10px;
       height: 10px;
       border-radius:50%;
       background: lightgreen;
       top:6px;
       left: -20px;
   }
</style>
