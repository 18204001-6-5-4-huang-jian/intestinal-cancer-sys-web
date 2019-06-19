<template>
  <div slot="right" class="content-page" v-if="expressList_page">
    <div class="content">
      <div class="filter-container">
         <router-link to="/home/areaHome" v-if="areaFlag==2">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
         <router-link to="/home/countryHome" v-if="areaFlag==3">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
        <el-form :model="qc" :inline=true class="clear">
          <div class="clearfix">
            <el-input style="width: 200px;" size="small" class="filter-item fl" placeholder="快递单号" v-model="qc.courierNumber" clearable>
            </el-input>
            <el-select v-model="qc.screeningtype" placeholder="筛查现场" size="small" class="filter-item fl" v-if="areaFlag==3" clearable>
             <el-option value="1" v-bind:key="1" label="浙江"></el-option>
             <el-option value="2" v-bind:key="2" label="安徽"></el-option>
             <el-option value="3" v-bind:key="3" label="徐州"></el-option>
             <el-option value="4" v-bind:key="4" label="湖南"></el-option>
             <el-option value="5" v-bind:key="5" label="云南"></el-option>
             <el-option value="6" v-bind:key="6" label="浙江2"></el-option>
           </el-select>
           <el-date-picker
              v-model="qc.sendDateStart"
              clearable
              type="date"
              size="small"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              align="left"
              placeholder="发出日期（起）">
            </el-date-picker>
            <el-date-picker
              v-model="qc.sendDateEnd"
              clearable
              type="date"
              size="small"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              align="left"
              placeholder="发出日期（止）">
            </el-date-picker>
            <el-date-picker
              v-model="qc.acceptDateStart"
              clearable
              type="date"
              size="small"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              align="left"
              placeholder="接收日期（起）">
            </el-date-picker>
            <el-date-picker
              v-model="qc.acceptDateEnd"
              clearable
              type="date"
              size="small"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              align="left"
              placeholder="接收日期（止）">
            </el-date-picker>
           <!-- <el-date-picker
              v-model="qc.sendDate"
              type="daterange"
              unlink-panels
              range-separator="至"
              start-placeholder="发出日期（起）"
              end-placeholder="发出日期（止）"
              size="small"
              align="left"
              class="fl">
            </el-date-picker>
            <el-date-picker
              v-model="qc.acceptDate"
              type="daterange"
              unlink-panels
              range-separator="至"
              start-placeholder="接收日期（起）"
              end-placeholder="接收日期（起）"
              size="small"
              align="left"
              class="fl">
            </el-date-picker> -->
          </div>
          <div>
            <el-button size="small" type="primary" icon="el-icon-search" @click="query(1,$store.state.expressListPageSize)">查询</el-button>
            <el-button type="primary" size="small" icon="el-icon-close" @click="reset">重置</el-button>
          </div>
        </el-form>
        <div class="table-btn-grooup">
            <router-link to="/biology/sendExpress" v-if="areaFlag==2">
              <el-button type="primary" size="small" icon="el-icon-upload2">寄出样本</el-button>
            </router-link>
            <!-- <el-button size="small" type="primary" icon="el-icon-document">
                <a>导出EXCEL</a>
            </el-button> -->
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
            v-if="areaFlag==3"
            label="筛查现场"
          >
             <template slot-scope="scope">
                <span>{{scope.row.screeningType | siteId}}</span>
              </template>  
          </el-table-column>
          <el-table-column
            prop="courierNumber"
            label="运单号"
          >
          </el-table-column>
          <el-table-column
          prop="sendDate"
            label="发出日期"
          >
          </el-table-column>
          <el-table-column
           prop="sendPerson"
            label="发件人"
          >
          </el-table-column>
          <el-table-column
            prop="acceptDate"
            label="接收日期"
          >
          </el-table-column>
          <el-table-column
            prop="acceptPerson"
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
              <el-button type="text" size="small"  @click="openDetailDialog(scope.row)" v-if="areaFlag==3 || (areaFlag==2 && scope.row.acceptPerson) || (areaFlag==2 && scope.row.approvalStatus!=1)">查看详情</el-button>
              <el-button type="text" size="small" @click="applyEdit(scope.row)" v-if="areaFlag==2 && scope.row.applyStatus==0 && !scope.row.acceptPerson && btnAuth.applyStatusD_btn">申请编辑</el-button>
              <!-- <el-button type="text"  @click="approvalEdit(scope.row)" v-if="areaFlag==3 && scope.row.approvalStatus==0" >解除锁定</el-button> -->
              <!-- 解除锁定组件 -->
              <approvalDialog ref="approvalDialog" @refreshList="query" :id="scope.row.id" :approvalArr="approvalArr" v-if="areaFlag==3 && scope.row.approvalStatus==0"></approvalDialog>
              <!-- <el-button type="text" size="small" @click="approvalEdit(scope.row)" v-if="areaFlag==3 && scope.row.approvalStatus==1" :disabled="true">解除锁定</el-button> -->
              <el-button type="text" size="small" @click="updateCourierResult(scope.row)"  v-if="areaFlag==2 && scope.row.editStatus==1">编辑</el-button>
              <!-- <el-button type="text" size="small" v-if="areaFlag==2 && scope.row.applyStatus==1 && !scope.row.acceptPerson" :disabled="true">申请编辑</el-button> -->
            </template>
          </el-table-column>
           <el-table-column
            v-if="areaFlag==3"
            label="确认收件"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" v-if="scope.row.acceptDate==null && scope.row.acceptPerson==null"  @click="openConfirmDialog(scope.row.id,scope.row.courierNumber)">确认</el-button>
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
                  :current-page="$store.state.expressListPageNo"
                  :page-sizes="[10, 20, 50, 100]"
                  v-bind:page-size="$store.state.expressListPageSize"
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
            width="45%"
            :before-close="handleClose">
             <el-tabs v-model="activeName2" type="card">
                <el-tab-pane label="快递进度" name="first">
                    <div class="title">
                        运单号：{{expressDetail.courierNumber}}  
                    </div>
                    <div class="expressDetail clearfix">
                        <ul class="fl left lis"  v-if='expressDetail.courierStatus==1'>
                            <li>{{expressDetail.acceptDate}}</li>
                            <li>{{expressDetail.sendDate}}</li>
                        </ul>
                        <ul class="fl left lis"  v-if='expressDetail.courierStatus==3'>
                            <li>{{expressDetail.sendDate}}</li>
                        </ul>
                        <ul class="fl right lis" v-if='expressDetail.courierStatus==1'>
                            <li><span></span>中国医学科学院肿瘤医院已收到您的生物样本！感谢您的配合！</li>
                            <li><span></span>您已向中国医学科学院肿瘤医院寄出生物样本</li>
                        </ul>
                        <ul class="fl right lis"  v-if='expressDetail.courierStatus==3'>
                            <li><span></span>您已向中国医学科学院肿瘤医院寄出生物样本</li>
                        </ul>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="冷冻盒详情" name="second">
                    <div class="title">
                        运单号：{{expressDetail.courierNumber}}  
                    </div>
                    <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                        <el-table-column
                        label="样本类型">
                          <template slot-scope="scope">
                            <span>{{scope.row.samplyType | sampleType}}</span>
                          </template>  
                        </el-table-column>
                        <el-table-column
                        prop="frozenBoxCode"
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
            :before-close="handleConfirmClose">
             <el-form :model="receiveExpressForm"  :rules="receiveExpressFormRules" ref="receiveExpressForm" label-width="100px" class="demo-ruleForm">
               <el-form-item label="接收日期" prop="acceptDateByString" class="formItemWidth">
                  <el-date-picker
                      v-model="receiveExpressForm.acceptDateByString"
                      type="date"
                      size="small"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                      align="left"
                      ref="receiveTime"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
              <el-form-item label="接收人" prop="acceptPerson">
                <el-input type="text" v-model="receiveExpressForm.acceptPerson" auto-complete="off"></el-input>
              </el-form-item>
             </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel('receiveExpressForm')">取 消</el-button>
                <el-button type="primary" @click="confirm('receiveExpressForm')">确 定</el-button>
            </span> 
        </el-dialog>
        <!-- 申请编辑弹窗 -->
        <applyOpen ref="applyOpenVisible" :applyArr="applyArr"></applyOpen>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import applyOpen from '../components/applyDialog'
import approvalDialog from '../components/approvalDialog'
  export default {
    data () {
      return {
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        areaFlag:'',   //3-国家；2-地区；1-社区；4-第三方
        activeName2: 'first',
        dialogVisible:false,
        dialogConfirmVisible:false,
        applyArr:{},   //申请编辑快递相关信息
        approvalArr:{
          formType:"HOSPITAL_COURIER_RESULT",
        },  //解除锁定相关信息
        
        tableData:[],   //冷冻盒表格
        expressList_page: false,
        btnAuth: {
          one_subjectsList_btn: false,
          subjectsList_query_btn: false,
          subjectsList_EXCEL_btn: false,
          subjectsList_add_btn: false,
          applyStatusD_btn:false
        },
        //运单详情
        'expressDetail':{
          "courierNumber":'',   //详情运单号
          "sendDate":"",
          "acceptDate":"",
          "courierStatus":''
        },
        //查询条件
        "qc": {
          	"courierNumber":"",
            "sendDateStart":"",
            "sendDateEnd":"",
            "acceptDateStart":"",
            "acceptDateEnd":"",
            "screeningtype":""
        },
        //查询结果
        "queryResult": {
          "pageNo": 1,//当前页
          "pageSize": 10,//每页的条数
          "totalPageCount": 0,
          "tableData": []
        },
        //确认接收
        receiveExpressForm: {
          id:'',
          courierNumber:'',
          acceptDateByString:'',
          acceptPerson: '',
        },
        receiveExpressFormRules: {
          acceptDateByString:{required: true, message: '必填', trigger: 'change'},
          acceptPerson:{required: true, message: '必填', trigger: 'blur'},
        },
      }
    },
    components:{
      applyOpen,
      approvalDialog
    },
    mounted(){
      let obj = this.checkPageAuth(this, "expressList_page", this.btnAuth)
    },
    beforeDestroy(){
      this.$store.state.expressListPageNo = 1;
      this.$store.state.expressListPageSize = 10;
    },
    created(){
      this.areaFlag=this.$store.state.hospitalType;
      this.qc.courierNumber=this.$route.query.courierNumber;
      this.query(this.$store.state.expressListPageNo,this.$store.state.expressListPageSize);
    },
    methods: {
      applyEdit(row){
        this.$refs.applyOpenVisible.applyOpenVisible=true;
        this.applyArr.id=row.id;
        this.applyArr.formType="HOSPITAL_COURIER_RESULT";
      },
      // 修改
      updateCourierResult(row){
        console.log(row);
        this.$router.push({ path: '/biology/sendExpress',query:{id:row.id,courierNumber:row.courierNumber}});
      },
      // 解除锁定
      // approvalEdit(row){
      //    $axios_http({
      //       url: "/base/area/courier/result/accpetUpdateCourierResult",
      //       data: {
      //         id:row.id,
      //         approvalStatus:"1",
      //         formType:"HOSPITAL_COURIER_RESULT",
      //       },
      //       vueObj: this
      //     }).then((res) => {
      //      this.$message({
      //                     type: 'success',
      //                     message: '解锁成功!'
      //                   });
      //      this.query(this.$store.state.expressListPageNo,this.$store.state.expressListPageSize);
      //     })
      // },
      //获取今天的日期
         getToday(){
          var date = new Date();
          var seperator1 = "-";
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var strDate = date.getDate();
          if (month >= 1 && month <= 9) {
            month = "0" + month;
          }
          if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
          }
          var currentdate = year + seperator1 + month + seperator1 + strDate;
          this.receiveExpressForm.acceptDateByString = currentdate
        },
        handleClose(done) {
            done();
        },
        handleConfirmClose(done){
          done();
        },
        openDetailDialog(row){
          this.dialogVisible=true;
          this.activeName2='first';
          this.expressDetail.courierNumber=row.courierNumber;
          this.expressDetail.acceptDate=row.acceptDate;
          this.expressDetail.sendDate=row.sendDate;
          this.expressDetail.courierStatus=row.courierStatus;
           $axios_http({
          url: "/base/area/courier/result/queryCourierResultById",
          data: {
            courierNumber:row.courierNumber,
          },
          vueObj: this
        }).then((res) => {
          this.tableData=res.data.data;
          console.log(res.data.data)
        })

        },
        openConfirmDialog(id,courierNumber){
          Object.assign(this.$data.receiveExpressForm, this.$options.data().receiveExpressForm);   //弹出前弹窗内容重置
          this.dialogConfirmVisible=true;
          this.getToday();
          this.receiveExpressForm.id=id;
          this.receiveExpressForm.courierNumber=courierNumber;
        },
        cancel(formName){
          this.$refs[formName].resetFields();
          this.dialogConfirmVisible=false;
        },
        focusSurvey_date(){
          this.$refs.investigator.focus()
        },
      //查询
      query(pageNo,pageSize){
        $axios_http({
          url: "/base/courier/result/queryCourierResult",
          data: {
            courierNumber: this.qc.courierNumber,
            sendDateStart: this.qc.sendDateStart,
            sendDateEnd: this.qc.sendDateEnd,
            acceptDateStart: this.qc.acceptDateStart,
            acceptDateEnd: this.qc.acceptDateEnd,
            screeningtype: this.qc.screeningtype,
            pageNo: pageNo,//当前页
            pageSize: pageSize//每页条数
          },
          vueObj: this
        }).then((res) => {
          this.$store.commit('get_expressListNo',pageNo)
          this.queryResult.totalPageCount = res.data.pageInfo.totalPageCount//获取总共多少页
          this.queryResult.totalRowCount = res.data.pageInfo.totalRowCount//获取总共条数
          this.queryResult.tableData=res.data.data;
        })
      },

      //重置检索条件
      reset(){
        Object.assign(this.$data.qc, this.$options.data().qc)
        this.query(this.$store.state.expressListPageNo,this.$store.state.expressListPageSize);
      },
      //每页显示查询结果条数变更事件，做重新查询操作
      pageSizeChange(pageSize) {
        this.$store.commit('get_expressListSize', pageSize)
        //this.queryResult.pageSize = pageSize
        this.query(this.$store.state.expressListPageNo,pageSize);
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        this.$store.commit('get_expressListNo', currentPage)
        //this.queryResult.pageNo = currentPage
        this.query(currentPage,this.$store.state.expressListPageSize);
      },
      //确认接收表单
       confirm(formName){
         this.$refs[formName].validate((valid) => {
           if (valid) {
              $axios_http({
                url: "/base/area/courier/result/updateCourierResult",
                data: this.receiveExpressForm,
                vueObj: this
              }).then((res) => {
                 $successMsg(this, "接收成功");
                 this.dialogConfirmVisible = false
                 this.$refs['receiveExpressForm'].resetFields();
                 this.query(this.$store.state.expressListPageNo,this.$store.state.expressListPageSize);
              })
           }
         })
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
       width: 8px;
       height: 8px;
       border-radius:50%;
       background: #999;
       top:6px;
       left: -20px;
   }
   .title{
     margin-bottom: 10px;
   }
   .expressDetail .lis li{
     height: 20px;
     line-height: 20px;
   }
   .expressDetail .lis li:nth-child(1){
     margin-bottom: 50px;
     color: #0ec641;
   }
   .expressDetail .lis li:nth-child(1) span{
     width: 10px;
     height: 10px;
     background: #0ec641;
   }
   .el-range-editor--small.el-input__inner{
     margin-right: 10px;
   }
   .el-date-editor.el-input{
     width:180px;
   }
</style>
