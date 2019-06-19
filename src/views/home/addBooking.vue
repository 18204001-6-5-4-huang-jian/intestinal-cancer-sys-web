<template>
  <div slot="right" class="content-page" v-if="addBooking_page">
    <div class="content">
      <div class="filter-container">
        <router-link to="/home/home">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
        <el-form :model="qc" :inline=true class="clear">
          <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="SID" v-model="qc.sid">
          </el-input>
          <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="姓名" v-model="qc.name">
          </el-input>
          <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="手机号" v-model="qc.phone">
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
            <el-select v-model="qc.group" placeholder="请选择分组方案" size="small" class="filter-item">
              <el-option value="A" v-bind:key="1" label="A组"></el-option>
              <el-option value="B" v-bind:key="2" label="B组"></el-option>
              <el-option value="C" v-bind:key="3" label="C组"></el-option>
              <el-option value="Cg" v-bind:key="4" label="C组高危"></el-option>
              <el-option value="Cd" v-bind:key="5" label="C组低危"></el-option>
            </el-select>
          </div>

          <el-button  size="small" type="primary" icon="el-icon-search" @click="query(1,$store.state.userListSize)" v-if="btnAuth.addBooking_query_btn">查询</el-button>
          <el-button  type="primary" size="small" icon="el-icon-close" @click="reset" v-if="btnAuth.addBooking_query_btn">重置</el-button>
        </el-form>
      </div>

      <div >
          <!--<div class="table-btn-grooup">-->
            <!--<el-button class="filter-item" type="primary" size="small" icon="el-icon-close"  v-if="btnAuth.one_booking_btn">一键预约</el-button>-->
            <!--<el-button class="filter-item" size="small" type="primary" icon="el-icon-search"  v-if="btnAuth.addBooking_EXCEL_btn">导出EXCEL</el-button>-->
          <!--</div>-->
        <!--数据列表-->
        <el-table
          :data="queryResult.tableData"
          border
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
          >
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
            label="入组日期"
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
            label="操作"
          >
            <template slot-scope="scope">
              <el-button type="text" v-if="btnAuth.addBooking_EXCEL_btn" @click="getResverInfo(scope.row.colonoscopyRecordId,scope.row.sid)">立即预约</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog :visible.sync="reserveDialog">
          <el-form :model="insertForm">
            <el-form-item label="剩余放号数量:" :label-width="formLabelWidth" prop="name">
              {{insertForm.reserveable}}人
            </el-form-item>
            <el-form-item label="项目名称:" :label-width="formLabelWidth" prop="name">
              {{insertForm.examinationName}}
            </el-form-item>
            <el-form-item label="就诊时间:" :label-width="formLabelWidth" prop="name" v-if="this.number">
              {{insertForm.period}}
            </el-form-item>
            <el-form-item label="就诊地点:" :label-width="formLabelWidth" prop="name">
              {{insertForm.deptName}}
            </el-form-item>
            <el-form-item label="就诊科室:" :label-width="formLabelWidth" prop="name">
              {{insertForm.name}}
            </el-form-item>
              <div class="dialog-footer">
                <el-button size="small" type="primary" @click="resverEvent" v-if="btnAuth.addBookingReserveBtn">立即预约</el-button>
                <el-button size="small" @click="reserveDialog=false">取 消</el-button>
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
  import ElDialog from "../../../node_modules/element-ui/packages/dialog/src/component.vue";

  export default {
    components: {ElDialog},
    data () {
      return {
        colonoscopyRecordId:'',
        sid:'',
        reserveDialog:false,
        addBooking_page:false,
        btnAuth:{
          one_booking_btn:false,
          addBooking_query_btn:false,
          addBooking_EXCEL_btn:false,
          addBookingReserveBtn:false
        },
        number:'',
        //查询条件
        "qc":{
          "name":"",
          "sid":"",
          "phone":"",
          "group":"",
          "loginName":null,
        },
        props: {
          value: 'loginName',
          children: 'child',
          label:'name'
        },
        ids:[],
        //查询结果
        "queryResult":{
          "pageNo":1,//当前页
          "pageSize":10,//每页的条数
          "totalPageCount":0,
          "tableData":[]
        },
        //编辑表单数据对象
        "insertForm":{
          reserveable:'',
          examinationName:'',
          period:'',
          deptName:'',
          name:''
        },
        userId:"",
        formLabelWidth: '120px'

      }
    },
    created(){
       if(localStorage.getItem('communityType')=='true'){
        this.ids.push(localStorage.getItem('loginName'));
        this.qc.loginName=localStorage.getItem('loginName');
      }
    },
    mounted(){
      let obj = this.checkPageAuth(this,"addBooking_page",this.btnAuth)
      this.query(this.$store.state.userListNo,this.$store.state.userListSize)
    },
    beforeDestroy(){
      this.$store.state.subjectsListPageNo=1;
      this.$store.state.subjectsListPageSize=10;
    },
    methods:{
      //获取选中区
      getQcId(value){
        this.qc.loginName =value[0]
      },
      //查询
      query(pageNo,pageSize){
        $axios_http({
          url:"/base/hospital/person/notreserve/colonoscopy/query",
          data:{
            name:this.qc.name,
            sid:this.qc.sid,
            phone:this.qc.phone,
            group:this.qc.group,
            loginName:this.qc.loginName,
            pageNo: pageNo,//当前页
            pageSize: pageSize//每页条数
          },
          vueObj:this
        }).then((res)=>{
          this.queryResult.tableData=res.data.data;
          this.colonoscopyRecordId=res.data.data
          this.queryResult.totalPageCount=res.data.pageInfo.totalPageCount//获取总共多少页
          this.queryResult.totalRowCount=res.data.pageInfo.totalRowCount//获取总共条数
          this.number=this.$route.query.id;
        })
      },
      getResverInfo(colonoscopyRecordId,sid){
        this.reserveDialog=true;
        this.colonoscopyRecordId=colonoscopyRecordId;
        this.sid=sid;
        if(this.$route.query.id){
          $axios_http({
            url:"/base/hospital/community/reservation/get/"+this.$route.query.id,
            data:{},
            vueObj:this
          }).then((res)=>{
            this.insertForm=res.data.data
          })
        }else{
          this.$message({
            type: 'warning',
            message: '没有可预约的人数，暂时不能预约'
          });
        }

      },
      resverEvent(){
        $axios_http({
          url:"/base/hospital/colonoscopy/record/booking",
          data:{
            colonoscopyRecordId:this.colonoscopyRecordId,
            sid:this.sid,
            allocationId:this.$route.query.id
          },
          vueObj:this
        }).then((res)=>{
          $successMsg(this,"预约成功")
          this.reserveDialog=false
          this.query(this.$store.state.userListNo,this.$store.state.userListSize)
        })
      },
      //重置检索条件
      reset(){
        Object.assign(this.$data.qc, this.$options.data().qc)
        if(localStorage.getItem('communityType')=='true'){
          this.ids.push(localStorage.getItem('loginName'));
          this.qc.loginName=localStorage.getItem('loginName');
        }else{
          this.ids = []
        }
        this.query(this.$store.state.userListNo,this.$store.state.userListSize)
      },
      //每页显示查询结果条数变更事件，做重新查询操作
      pageSizeChange(pageSize) {
        this.$store.commit('get_userListSize', pageSize)
        //this.queryResult.pageSize = pageSize
        console.log(`每页 ${pageSize} 条`)
        this.query(this.$store.state.userListNo,pageSize);
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        this.$store.commit('get_userListNo',currentPage)
        //this.queryResult.pageNo = currentPage
        console.log(`当前页: ${currentPage}`);
        this.query(currentPage,this.$store.state.userListSize);
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
  .filter-item{
    width: 200px;
    margin-right: 10px;
  }
</style>
