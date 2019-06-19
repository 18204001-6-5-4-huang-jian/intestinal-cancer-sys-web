<template>
  <div slot="right" class="content-page" v-if="uncompletedEnteroscopy_page">
    <div class="content">
      <h4>待办-未完成结肠镜检查</h4>
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
          <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="手机号" v-model="qc.cellPhone" >
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
          </div>
          <div>
              <el-button class="filter-item" size="small" type="primary" icon="el-icon-search" @click="query(1,$store.state.uncompletedEnteroscopyPageSize)" v-if="btnAuth.uncompletedEnteroscopy_query_btn">查询</el-button>
              <el-button class="filter-item" type="primary" size="small" icon="el-icon-close" @click="reset" v-if="btnAuth.uncompletedEnteroscopy_query_btn">重置</el-button>
          </div>
        </el-form>
        <!--数据列表-->
        <el-table
          :data="queryResult.tableData"
          border
          :default-sort = "{prop: 'reservationDate', order: 'descending'}"
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
            label="性别">
            <template slot-scope="scope">
              <span>{{scope.row.sex | reverseSex}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="age"
            label="年龄">
          </el-table-column>
          <el-table-column
            prop="cellPhone"
            label="手机号"
            width="120">
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
            prop="reservationDate"
            sortable
            label="入组日期"
            width="110">
          </el-table-column>
          <el-table-column
            prop="peroid"
            label="预约时间"
            width="180">
          </el-table-column>
          <!--//overallStatusCy  finishedStatus   examinationStatus-->
          <el-table-column
            label="就诊状态"
            width="100">
            <template slot-scope="scope">
              <span>{{scope.row.examinationStatus | examinationStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="检查完成状态"
            width="120">
            <template slot-scope="scope">
              <span>{{scope.row.finishedStatus | finishedStatus}}</span>
            </template>
          </el-table-column>
          <!--<el-table-column-->
            <!--label="受试者状态"-->
            <!--width="100">-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{scope.row.overallStatusCy | overallStatusCy}}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <el-button type="text" class="btnStyle" size="small" v-if="btnAuth.uncompletedEnteroscopy_add_btn" @click="getServerInfo(scope.row.colonoscopyRecordId,scope.row.sid)">重新预约</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog :visible.sync="reserveDialog">
          <el-form :model="insertForm">
            <el-form-item label="剩余放号数量" :label-width="formLabelWidth" prop="name">
              {{insertForm.reserveable}}
            </el-form-item>
            <el-form-item label="项目名称" :label-width="formLabelWidth" prop="name">
              <el-input v-model="insertForm.examinationName" auto-complete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="就诊时间" :label-width="formLabelWidth" prop="name">
              <el-select v-model="period" placeholder="选择时间" size="small"   class="filter-item" @change="changePeriod">
                <el-option :label="item.period" :value="item.id" v-for="item in periodData" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="就诊地点" :label-width="formLabelWidth" prop="name">
              <el-input v-model="insertForm.deptName" auto-complete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="就诊科室" :label-width="formLabelWidth" prop="name">
              <el-input v-model="insertForm.name" auto-complete="off" disabled></el-input>
            </el-form-item>
            <div class="dialog-footer" style="text-align: center;">
              <el-button size="small" type="primary" @click="resverEvent('insertForm')">立即预约</el-button>
              <el-button size="small" @click="reserveDialog = false">取 消</el-button>
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
                :current-page="$store.state.uncompletedEnteroscopyPageNo"
                :page-sizes="[10, 20, 50, 100]"
                v-bind:page-size="$store.state.uncompletedEnteroscopyPageSize"
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
  export default {
    name: 'Right',
    data () {
      return {
        //权限判定
        uncompletedEnteroscopy_page:false,
        btnAuth:{
          buttonRoleAdd:false,
          uncompletedEnteroscopy_add_btn:false,
          buttonRoleDel:false,
          uncompletedEnteroscopy_query_btn:false,
          buttonUserRoleDis:false
        },
        insertForm:{
          "reserveable":'',
          'deptName':'',
          'examinationName':'',
          'period':'',
          'name':''
        },
        //查询条件
        "qc":{
          "sid":'',
          "name":'',
          "cellPhone":'',
          "group":'',
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
        //分页
        "queryResultSource":{
          "pageNoSource":1,//当前页
          "pageSizeSource":15,//每页的条数
          "totalPageCount":0
        },
        reserveDialog:false,
        colonoscopyRecordId:'',
        sid:'',
        allocateResourcesData:[],
        formLabelWidth: '160px',
        allocationId:'',
        periodData:[],
        period:'',
        rules:{
          name:[
            {required:true,message:'请输入角色名称',trigger:'blur'},
            {min:1,max:16,message:'长度在1到16个字符',trigger:'blur'}
          ],
          desc:[
            {required:true,message:'请输入角色描述信息',trigger:'blur'},
            {min:1,max:32,message:'长度在1到32个字符',trigger:'blur'}
          ]
        }
      }
    },
     created(){
      if(localStorage.getItem('communityType')=='true'){
        this.ids.push(localStorage.getItem('loginName'));
        this.qc.loginName=localStorage.getItem('loginName');
      }
    },
    mounted(){
      this.$store.commit('LOGOUT_USER');

      let obj = this.checkPageAuth(this,"uncompletedEnteroscopy_page",this.btnAuth);
     this.query(this.$store.state.uncompletedEnteroscopyPageNo,this.$store.state.uncompletedEnteroscopyPageSize);
    },
    beforeDestroy(){
      this.$store.state.uncompletedEnteroscopyPageNo=1;
      this.$store.state.uncompletedEnteroscopyPageSize=10;
    },
    methods:{
      //获取选中区
      getQcId(value){
        this.qc.loginName =value[0]
      },
      changePeriod(obj){
        this.periodData.forEach((item,ind)=>{
          if(item.id == obj){
            this.insertForm.examinationName=item.examinationName;
            this.insertForm.deptName=item.deptName;
            this.insertForm.name=item.name;
            this.insertForm.reserveable=item.reserveable;
            this.allocationId=item.id;
          }
        })
      },
      getServerInfo(colonoscopyRecordId,sid){
        $axios_http({
          url: "/base/hospital/community/allocation/query",
          data: {},
          vueObj: this
        }).then((res) => {
          if(res.data.data.length == 0){
            this.$message({
              type: 'warning',
              message: '没有可预约的人数，暂时不能预约'
            });
          }  else{
            this.reserveDialog=true;
            this.sid=sid;
            this.colonoscopyRecordId=colonoscopyRecordId;
            this.periodData=res.data.data //select的数组
            this.insertForm=res.data.data[0]
            this.allocationId=res.data.data[0].id;
            this.period=this.insertForm.id;
          }

        })
      },
      resverEvent(){
        $axios_http({
          url:"/base/hospital/colonoscopy/record/rebooking",
          data:{
            colonoscopyRecordId:this.colonoscopyRecordId,
            sid:this.sid,
            allocationId:this.allocationId
          },
          vueObj:this
        }).then((res)=>{
          $successMsg(this,"预约成功")
          this.reserveDialog=false
         this.query(this.$store.state.uncompletedEnteroscopyPageNo,this.$store.state.uncompletedEnteroscopyPageSize)
        })
      },
      //查询
     query(pageNo,pageSize){
        $axios_http({
          url:"/base/hospital/person/notfinish/colonoscopy/query",
          data:{
            name:this.qc.name,
            phone:this.qc.cellPhone,
            sid:this.qc.sid,
            group:this.qc.group,
            loginName:this.qc.loginName,
            pageNo:pageNo,//当前页
            pageSize:pageSize//每页条数
          },
          vueObj:this
        }).then((res)=>{
          this.$store.commit('get_uncompletedEnteroscopyPageNo',pageNo)
          this.queryResult.tableData=res.data.data;

          this.queryResult.totalPageCount=res.data.pageInfo.totalPageCount//获取总共多少页
          this.queryResult.totalRowCount=res.data.pageInfo.totalRowCount//获取总共条数
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
       this.query(this.$store.state.uncompletedEnteroscopyPageNo,this.$store.state.uncompletedEnteroscopyPageSize)
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
            url:"/base/role/delete/"+id,
            vueObj:this
          }).then((res)=>{
            $successMsg(this,"删除成功")
           this.query(this.$store.state.uncompletedEnteroscopyPageNo,this.$store.state.uncompletedEnteroscopyPageSize)
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
        //this.queryResult.pageSize = pageSize
          this.$store.commit('get_uncompletedEnteroscopyPageSize', pageSize)
          this.query(this.$store.state.uncompletedEnteroscopyPageNo,pageSize);
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        //this.queryResult.pageNo = currentPage
        this.$store.commit('get_uncompletedEnteroscopyPageNo',currentPage)
        this.query(currentPage,this.$store.state.uncompletedEnteroscopyPageSize);
      }
    }}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .checkbox{
    display: block;
    margin-left: 5px;
    font-weight: normal;
  }
  .inline{
    display: inline-block;
    margin-top: 20px;
  }
  .btnStyle{
    padding-left: 10px;
  }
  .return-home {
    display: block;
    text-align: center;
    margin-bottom:20px;
  }
</style>
