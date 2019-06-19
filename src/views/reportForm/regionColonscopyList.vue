<template>
  <div slot="right" class="content-page" v-if="area_colonoscopy_list_page">
    <div class="content">
      <div class="filter-container">
        <router-link to="/colonscopy/colonscopyList">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
        <el-form :model="qc" :inline=true class="clear">
          <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="姓名" v-model="qc.name">
          </el-input>
          <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="SID" v-model="qc.sid">
          </el-input>
          <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="手机号" v-model="qc.phone">
          </el-input>
          <el-select v-model="qc.group" placeholder="请选择分组方案" size="small" class="filter-item">
            <el-option value="A" v-bind:key="1" label="A组"></el-option>
            <el-option value="B" v-bind:key="2" label="B组"></el-option>
            <el-option value="C" v-bind:key="3" label="C组"></el-option>
            <el-option value="Cg" v-bind:key="4" label="C组高危"></el-option>
            <el-option value="Cd" v-bind:key="5" label="C组低危"></el-option>
          </el-select>
          <el-select v-model="qc.reserveStatus" placeholder="是否预约" size="small" class="filter-item">
            <el-option value="1" v-bind:key="1" label="未预约"></el-option>
            <el-option value="2" v-bind:key="2" label="已预约"></el-option>
          </el-select>
          <el-select v-model="qc.examinationStatus" placeholder="是否检查" size="small" class="filter-item">
            <el-option value="1" v-bind:key="1" label="未检查"></el-option>
            <el-option value="2" v-bind:key="2" label="已检查"></el-option>
          </el-select>
          <el-select v-model="qc.finishedStatus" placeholder="完成情况" size="small" class="filter-item">
            <el-option value="1" v-bind:key="1" label="未完成"></el-option>
            <el-option value="2" v-bind:key="2" label="已完成"></el-option>
          </el-select>
          <el-select v-model="qc.notificationIssueStatus" placeholder="是否发放" size="small" class="filter-item">
            <el-option value="1" v-bind:key="1" label="未发放"></el-option>
            <el-option value="2" v-bind:key="2" label="已发放"></el-option>
          </el-select>
          <el-button class="filter-item" size="small" type="primary" icon="el-icon-search" @click="query(1,$store.state.subjectsListPageSize)" v-if="btnAuth.colonscopyList_query_btn">查询</el-button>
          <el-button class="filter-item" type="primary" size="small" icon="el-icon-close" @click="reset" v-if="btnAuth.colonscopyList_query_btn">重置</el-button>
        </el-form>
      </div>

      <el-dialog :visible.sync="reserveDialog">
        <el-form :model="insertForm" ref="insertForm">
          <el-form-item label="剩余放号数量" :label-width="formLabelWidth" prop="reserveable">
            {{this.insertForm.reserveable}}
          </el-form-item>
          <el-form-item label="项目名称" :label-width="formLabelWidth" prop="examinationName">
            <el-input v-model="insertForm.examinationName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="就诊时间" :label-width="formLabelWidth" prop="period">
            <el-select v-model="period" placeholder="分组方案" size="small" class="filter-item" @change="changePeriod">
              <el-option :value="item.period" v-for="item in periodData" :key="item.period">{{item.period}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="就诊地点" :label-width="formLabelWidth" prop="deptName">
            <el-input v-model="insertForm.deptName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="就诊科室" :label-width="formLabelWidth" prop="name">
            <el-input v-model="insertForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <div class="dialog-footer">
            <el-button size="small" type="primary" @click="resverEvent('insertForm')">立即预约</el-button>
            <el-button size="small">取 消</el-button>
          </div>
        </el-form>
      </el-dialog>
      <el-dialog :visible.sync="notificationFormDialog" >
        <el-form :model="notificationForm" :rules="rules" ref="notificationForm" >
          <el-form-item label="发放方式" :label-width="formLabelWidth" prop="mode">
            <el-select v-model="notificationForm.mode" placeholder="请选择" @change="getMode">
              <el-option label="1.受试者/家属到社区中心自取" value="1"></el-option>
              <el-option label="2.社区工作人员入户递送"  value="2"></el-option>
              <el-option label="3.邻居从社区中心捎带取走" value="3" ></el-option>
              <el-option label="4.受试者/家属到医院自取" value="4"></el-option>
              <el-option label="5.其它，请备注" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发放日期" :label-width="formLabelWidth" prop="issueDate">
            <el-date-picker
              v-model="notificationForm.issueDate"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="工作人员编码" :label-width="formLabelWidth" prop="workerCode" >
            <el-input v-model="notificationForm.workerCode" auto-complete="off" class="notification-input"></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth" prop="note">
            <el-input v-model="notificationForm.note" auto-complete="off" class="notification-input"></el-input>
          </el-form-item>
          <div class="dialog-footer">
            <el-button size="small" type="primary" @click="notificationSure('notificationForm')">确定</el-button>
            <el-button size="small" @click="notificationFormDialog = false">取 消</el-button>
          </div>
        </el-form>
      </el-dialog>
      <div >
        <div class="table-btn-grooup">
          <!--<el-button class="filter-item" size="small" type="primary" icon="el-icon-search" @click="query" v-if="btnAuth.colonscopyList_add_btn">新增</el-button>-->
          <!--<el-button class="filter-item" size="small" type="primary" icon="el-icon-search"  v-if="btnAuth.colonscopyList_EXCEL_btn">导出EXCEL</el-button>-->
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
          >
          </el-table-column>
          <el-table-column
            label="姓名"
          >
            <template slot-scope="scope">
              <div class="subjectsName">
                <div>
                  {{scope.row.name}}
                </div>
                <span class="corner" v-if="scope.row.violationPlanStatusCy==1">违</span>
              </div>
            </template>
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
            width="160"
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
            label="入组日期"
            width="160"
          >
          </el-table-column>
          <el-table-column
            label="年度状态"
          >
            <template slot-scope="scope">
              <span>{{scope.row.overallStatusCy | overallStatusCy}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="预约状态"
          >
            <template slot-scope="scope">
              <span>{{scope.row.reserveStatus | reserveStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="inGroupDate"
            label="预约时间"
            width="160"
          >
          </el-table-column>
          <el-table-column
            label="检查状态"
          >
            <template slot-scope="scope">
              <span>{{scope.row.examinationStatus | examinationStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="完成情况"
          >
            <template slot-scope="scope">
              <span>{{scope.row.finishedStatus | finishedStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="examinationDate"
            label="检查时间"
            width="160"
          >
          </el-table-column>
          <el-table-column
            label="发送报告状态"
            width="120"
          >
            <template slot-scope="scope">
              <span>{{scope.row.notificationIssueStatus | notificationIssueStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="notificationIssueDate"
            label="发放日期"
            width="160"
          >
          </el-table-column>

          <el-table-column
            label="操作"
            width="300"
          >
            <template slot-scope="scope">
              <el-button type="text" v-if="btnAuth.colonscopyList_EXCEL_btn&& scope.row.reserveStatus == '1' "  @click="getServerInfo(scope.row.id,scope.row.sid)">立即预约</el-button>
              <!--<el-button type="text" v-if="btnAuth.colonscopyList_EXCEL_btn">移除代办</el-button>-->
              <!--<el-button type="text" v-if="btnAuth.colonscopyList_EXCEL_btn">返回代办</el-button>-->
              <router-link :to="{path:'colonscopyDetail',query:{id:scope.row.id}}">
                <el-button type="text" v-if="btnAuth.colonscopyList_EXCEL_btn  && scope.row.reserveStatus == '2' && scope.row.examinationStatus == null">查看预约单</el-button>
              </router-link>

              <el-button type="text" v-if="btnAuth.colonscopyList_EXCEL_btn && scope.row.notificationEntryStatus == '2'" >短信通知</el-button>
              <router-link :to="{path:'report1',query:{sid:scope.row.sid,id:scope.row.id}}"><el-button type="text" >录入结果</el-button></router-link>
              <router-link :to="{path:'report1',query:{sid:scope.row.sid,id:scope.row.resultId,show:true}}"><el-button type="text" >查看结果</el-button></router-link>
              <router-link :to="{path:'report2',query:{sid:scope.row.sid,id:scope.row.id,resultId:scope.row.resultId}}" ><el-button type="text">录入病理</el-button></router-link>
              <router-link :to="{path:'report2',query:{sid:scope.row.sid,id:scope.row.pathologyId,show:true}}"><el-button type="text" >查看病理</el-button></router-link>
              <router-link :to="{path:'report3',query:{sid:scope.row.sid,id:scope.row.id}}"><el-button type="text">录入告知书</el-button></router-link>
              <router-link :to="{path:'report3',query:{sid:scope.row.sid,id:scope.row.notificationId,show:true}}"><el-button type="text" >查看告知书</el-button></router-link>
              <el-button type="text" v-if="btnAuth.colonscopyList_EXCEL_btn  && scope.row.notificationIssueStatus == '1'" @click="openNotificationFormDialog(scope.row.id,scope.row.sid)">发放记录</el-button>
              <!--<el-button type="text" v-if="btnAuth.colonscopyList_EXCEL_btn">重新预约</el-button>-->
              <!--<el-button type="text" v-if="btnAuth.colonscopyList_EXCEL_btn">查看报告</el-button>-->
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
                :current-page="$store.state.userListNo"
                :page-sizes="[10, 20, 50, 100]"
                v-bind:page-size="$store.state.userListSize"
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
  export default {
    data () {
      return {
        reserveDialog:false,
        notificationFormDialog:false,
        isShow:false,
        area_colonoscopy_list_page:false,
        btnAuth:{
          one_colonscopyList_btn:false,
          colonscopyList_query_btn:false,
          colonscopyList_EXCEL_btn:false,
          colonscopyList_add_btn:false
        },
        //查询条件
        "qc":{
          "name":"",
          "sex":null,
          "phone":"",
          "sid":"",
          "group":null,
          "reserveStatus":"",
          "examinationStatus":"",
          "finishedStatus":null,
          "notificationIssueStatus":null
        },
        //查询结果
        "queryResult":{
          "pageNo":1,//当前页
          "pageSize":10,//每页的条数
          "totalPageCount":0,
          "tableData":[]
        },
        //编辑表单数据对象
        "updateForm":{
          "nickName":"",
          "phone":"",
          "loginName":""
        },
        insertForm:{
          "reserveable":'',
          'deptName':'',
          'examinationName':'',
          'period':'',
          'name':''
        },
        insertFormRules: {
          reserveable:{required: true, message: '必填', trigger: 'change'},
          deptName:{required: true, message: '必填', trigger: 'blur'},
          examinationName:{required: true, message: '必填', trigger: 'blur'},
          period:[{required: false, message: '必填', trigger: 'blur'}],
          name:[{required: false, message: '必填', trigger: 'blur'}],
        },
        notificationForm:{
          "id":'',
          'sid':'',
          'mode':'',
          'workerCode':'',
          'note':'',
          'issueDate':''
        },
        rules: {
          mode:{required: true, message: '必填', trigger: 'change'},
          issueDate:{required: true, message: '必填', trigger: 'blur'},
          workerCode:{required: true, message: '必填', trigger: 'blur'},
          note:[{required: false, message: '必填', trigger: 'blur'}],
        },
        periodData:[],
        period:'',
        userId:"",
        formLabelWidth: '180px'

      }
    },
    mounted(){
      let obj = this.checkPageAuth(this,"area_colonoscopy_list_page",this.btnAuth)
      this.query(this.$store.state.subjectsListPageNo,this.$store.state.subjectsListPageSize);
    },
    beforeDestroy(){
      this.$store.state.subjectsListPageNo=1;
      this.$store.state.subjectsListPageSize=10;
    },
    methods:{
      changePeriod(obj){
        console.log(obj);
        console.log(this.insertForm.period)
        console.log(this.periodData)
        this.periodData.forEach((item,ind)=>{
          if(item.period==obj){
            console.log(item,999)
            this.insertForm.examinationName=item.examinationName;
            this.insertForm.deptName=item.deptName;
            this.insertForm.name=item.name;
            this.insertForm.reserveable=item.reserveable;
            this.allocationId=item.id;
          }
        })
      },
      getMode(value){
        if(value == '5'){
          this.rules.note[0].required = true
        }else {
          this.rules.note[0].required = false
        }
      },
      openNotificationFormDialog(id,sid){
        this.notificationFormDialog=true;
        this.notificationForm.id = id
        this.notificationForm.sid =sid
      },
      getServerInfo(colonoscopyRecordId,sid){
        console.log(colonoscopyRecordId)
        this.reserveDialog=true;
        this.sid=sid;
        this.colonoscopyRecordId=colonoscopyRecordId;
        $axios_http({
          url: "/base/hospital/community/allocation/query",
          data: {},
          vueObj: this
        }).then((res) => {
          this.periodData=res.data.data
          this.insertForm=res.data.data[0]
          this.allocationId=res.data.data[0].id;
          this.period=this.insertForm.period;
        })
      },
      //查询
      query(pageNo,pageSize){
        $axios_http({
          url:"/base/hospital/area/colonoscopy/record/query",
          data:{
            name:this.qc.name,
            sid:this.qc.sid,
            phone:this.qc.phone,
            sex:this.qc.sex,
            reserveStatus:this.qc.reserveStatus,
            examinationStatus:this.qc.examinationStatus,
            group:this.qc.group,
            finishedStatus:this.qc.finishedStatus,
            notificationIssueStatus:this.qc.notificationIssueStatus,
            pageNo:pageNo,//当前页
            pageSize:pageSize//每页条数
          },
          vueObj:this
        }).then((res)=>{
          this.$store.commit('get_subjectsListPageNo',pageNo)
          this.queryResult.tableData=res.data.data;
          this.queryResult.totalPageCount=res.data.pageInfo.totalPageCount//获取总共多少页
          this.queryResult.totalRowCount=res.data.pageInfo.totalRowCount//获取总共条数
        })
      },
      notificationSure(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            $axios_http({
              url:"/base/colonoscopy/notification/issue/",
              data:{
                id:this.notificationForm.id,
                sid:this.notificationForm.sid,
                mode:this.notificationForm.mode,
                issueDate:this.notificationForm.issueDate,
                workerCode:this.notificationForm.workerCode,
                note:this.notificationForm.note,
              },
              vueObj:this
            }).then((res)=>{
//              this.notificationForm.workerCode = ''
//              this.notificationForm.issueDate = ''
//              this.notificationForm.note = ''
//              this.notificationForm.mode = ''
//              this.notificationForm.sid = ''
//              this.notificationForm.id = ''
              this.$refs[formName].resetFields();
              $successMsg(this,"发送成功")
              this.notificationFormDialog=false
              this.query(this.$store.state.subjectsListPageNo,this.$store.state.subjectsListPageSize)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      //立即预约
      resverEvent(formName){
        $axios_http({
          url: "/base/hospital/colonoscopy/record/booking",
          data: {
            colonoscopyRecordId: this.colonoscopyRecordId,
            sid: this.sid,
            allocationId: this.allocationId
          },
          vueObj: this
        }).then((res) => {
          $successMsg(this, "预约成功")
          this.reserveDialog = false
          this.query(this.$store.state.subjectsListPageNo,this.$store.state.subjectsListPageSize)
        })
      },
      //重置检索条件
      reset(){
        Object.assign(this.$data.qc, this.$options.data().qc)
        this.query(this.$store.state.subjectsListPageNo,this.$store.state.subjectsListPageSize)
        this.ids = []
      },
      //删除一条数据
      del(id){
        this.$confirm('确认删除数据?', '提示', {
          closeOnClickModal:false,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          $axios_http({
            url:"/base/user/del/"+id,
            vueObj:this
          }).then((res)=>{
            $successMsg(this,"删除成功")
            this.query(this.$store.state.subjectsListPageNo,this.$store.state.subjectsListPageSize)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //每页显示查询结果条数变更事件，做重新查询操作
      pageSizeChange(pageSize) {
        this.$store.commit('get_subjectsListPageSize', pageSize)
        this.query(this.$store.state.subjectsListPageNo,pageSize);
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        this.$store.commit('get_subjectsListPageNo',currentPage)
        this.query(currentPage,this.$store.state.subjectsListPageSize)
      }

    }}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content{
    background: #fff;
    padding:10px;
  }
  .checkbox{
    display: block;
    margin-left: 20px;
    font-weight: normal;
  }
  .btnStyle{
    padding-left: 10px;
  }
  .return-home {
    display: block;
    text-align: center;
    float: left;
    margin-bottom:20px;
  }
  .table-btn-grooup{
    margin-bottom:10px;
  }
  .subjectsName{
    position: relative;
  }
  .corner{
    width: 20px;
    height: 20px;
    line-height: 20px;
    position: absolute;right:10px;top:0px;
    display: block;
    border-radius: 10px;
    text-align: center;
    background: #f56a00;
    color:#fff;
  }
  .notification-input{
    width: 220px;
  }
</style>
