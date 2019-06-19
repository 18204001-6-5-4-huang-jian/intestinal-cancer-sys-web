<template>
  <div slot="right" class="content-page" v-if="regionSign_page">
    <div class="content">
      <div class="filter-container">
        <router-link to="/home/areaHome">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
        <el-form :model="qc" :inline=true class="clear">
          <div>
            <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="姓名" v-model="qc.name">
            </el-input>
            <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="SID" v-model="qc.sid">
            </el-input>
            <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="手机号" v-model="qc.phone">
            </el-input>
          </div>
         <div>
           <el-select v-model="qc.communityDeptId" placeholder="所属区" size="small" class="filter-item">
             <el-option :value="item.id"  :label="item.commdeptName" v-for="item in communitys" :key="item.id"></el-option>
           </el-select>
           <el-date-picker
             v-model="qc.startDate"
             type="date"
             size="small"
             class="filter-item"
             format="yyyy 年 MM 月 dd 日"
             value-format="yyyy-MM-dd"
             placeholder="开始时间">
           </el-date-picker>
           <el-date-picker
             v-model="qc.endDate"
             type="date"
             size="small"
             class="filter-item"
             format="yyyy 年 MM 月 dd 日"
             value-format="yyyy-MM-dd"
             placeholder="结束时间">
           </el-date-picker>
         </div>
         <div>
           <el-button  size="small" type="primary" icon="el-icon-search" @click="query(1,$store.state.regionColonscopyListPageNo)">查询</el-button>
           <el-button  type="primary" size="small" icon="el-icon-close" @click="reset">重置</el-button>
         </div>
        </el-form>
      </div>
      <el-dialog :visible.sync="notificationFormDialog" >
        <el-form :model="signForm"ref="notificationForm" >
          <div style="font-size: 18px;text-align: center;">你已经选中{{multipleSelection.length}}人,请选择检查状态</div>
          <el-form-item label="检查状态" :label-width="formLabelWidth" ref="examinationStatus">
            <el-radio-group v-model="signForm.examinationStatus" >
              <el-radio :label="2">已检查</el-radio>
              <el-radio :label="1">未检查</el-radio>
            </el-radio-group>
          </el-form-item>
          <div class="dialog-footer" style="text-align: center;">
            <el-button size="small" type="primary" @click="sign('signForm')">确定</el-button>
            <el-button size="small" @click="notificationFormDialog = false">取 消</el-button>
          </div>
        </el-form>
      </el-dialog>
          <div >
            <!--<div class="table-btn-grooup">
              <el-button class="filter-item" size="small" type="primary" icon="el-icon-search"  @click="openSignDialog('2')">一键签到</el-button>
            </div>-->
            <!--数据列表-->
            <el-table
              :data="queryResult.tableData"
              border
              :default-sort = "{prop: 'period', order: 'descending'}"
              style="width: 100%;"
              @select="changeData"
              @select-all="changeDataAll">
              <el-table-column
                type="selection"
                align="center"
                width="55"
              >
              </el-table-column>
              <el-table-column
                prop="sid"
                label="SID"
              >
              </el-table-column>
              <el-table-column
                prop="peopleName"
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
                width="160"
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
                prop="departName"
                label="所属区"
              >
              </el-table-column>
              <el-table-column
                prop="nickName"
                label="所属社区"
              >
              </el-table-column>
              <el-table-column
                prop="period"
                label="预约时间"
                width="180px"
                sortable
              >
              </el-table-column>
              <el-table-column
                label="操作"
              >
                <template slot-scope="scope">
                  <el-button type="text" @click="openSignDialog('1',scope.row.id,scope.row.sid)" >签到</el-button>
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
        regionSign_page:false,
        btnAuth:{
          one_colonscopyList_btn:false,
          colonscopyList_query_btn:false,
          regionSign_add_btn:false,
          colonscopyList_add_btn:false
        },
        //查询条件
        "qc":{
          "name":"",
          "sex":null,
          "phone":"",
          "sid":"",
          "communityDeptId":null,
          "startDate":"",
          "endDate":"",
        },
        //查询结果
        "queryResult":{
          "pageNo":1,//当前页
          "pageSize":10,//每页的条数
          "totalPageCount":0,
          "tableData":[]
        },
        signForm:{
          "examinationStatus":'',
          "hospitalColonoscopyRecords":[
            {
                id:'',
                sid:''
            }
          ]
        },
        communitys:[],
        insertForm:{
          "reserveable":'',
          'deptName':'',
          'examinationName':'',
          'period':'',
          'name':''
        },
        multipleSelection:[
        ],
        insertFormRules: {
          reserveable:{required: true, message: '必填', trigger: 'change'},
          deptName:{required: true, message: '必填', trigger: 'blur'},
          examinationName:{required: true, message: '必填', trigger: 'blur'},
          period:[{required: false, message: '必填', trigger: 'blur'}],
          name:[{required: false, message: '必填', trigger: 'blur'}],
        },
        rules: {
          examinationStatus:{required: true, message: '必选', trigger: 'change'},
        },
        periodData:[],
        period:'',
        userId:"",
        formLabelWidth: '180px'

      }
    },
    mounted(){
      let obj = this.checkPageAuth(this,"regionSign_page",this.btnAuth)
      this.query(this.$store.state.subjectsListPageNo,this.$store.state.subjectsListPageSize);
      this.getCommunity()
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
      //
      getCommunity(){
        $axios_http({
          url:"/base/hospital/community/allocation/querycommdepts",
          data:{},
          vueObj:this
        }).then((res)=>{
           this.communitys = res.data.data
          console.log(this.communitys)
        })
      },
      openSignDialog(count,id,sid){
        if(count==1){
          this.multipleSelection =[]
          var obj ={}
          obj.id=id
          obj.sid=sid
          this.multipleSelection.push(obj)
          this.notificationFormDialog = true
        }else if(count == 2 && this.multipleSelection.length == 0 ){
            this.$message({
              type:'warning',
              message:'请选择患者'
            })
            return
        }else{
          this.notificationFormDialog = true
        }

      },

      //查
      query(pageNo,pageSize){
        $axios_http({
          url:"/base/hospital/community/allocation/queryallnotlist",
          data:{
            name:this.qc.name,
            sid:this.qc.sid,
            phone:this.qc.phone,
            startDate:this.qc.startDate,
            endDate:this.qc.endDate,
            communityDeptId:this.qc.communityDeptId,
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
      changeData(selection){
        this.multipleSelection = selection
      },
      changeDataAll(selection){
        this.multipleSelection = selection
      },
      //签到
      sign(formName){
        this.signForm.hospitalColonoscopyRecords = this.multipleSelection
        console.log(this.signForm)
        $axios_http({
          url: "/base/hospital/examination/updateExaminationStatus",
          data: this.signForm,
          vueObj: this
        }).then((res) => {
          $successMsg(this, "签到成功")
          this.notificationFormDialog = false
          this.query(this.$store.state.subjectsListPageNo,this.$store.state.subjectsListPageSize);
        })
      },
      //重置检索条件
      reset(){
        Object.assign(this.$data.qc, this.$options.data().qc)
        this.ids = []
        this.query(this.$store.state.subjectsListPageNo,this.$store.state.subjectsListPageSize);
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
            this.query(this.$store.state.subjectsListPageNo,this.$store.state.subjectsListPageSize);
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
        this.query(currentPage,this.$store.state.subjectsListPageSize);
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
  .filter-item{
    width:200px;
    margin-right:10px;
  }
</style>
