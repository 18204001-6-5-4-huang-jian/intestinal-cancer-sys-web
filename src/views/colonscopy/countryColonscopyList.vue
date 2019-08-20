<template>
  <div slot="right" class="content-page" v-if="countryColonscopyList_page">
    <div class="content">
      <div class="filter-container">
        <router-link to="/home/countryHome">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
        <el-form :model="qc" :inline=true class="clear">
          <div>
            <el-input  style="width: 200px;" size="small" class="filter-item" clearable placeholder="姓名" v-model="qc.name">
            </el-input>
            <el-input  style="width: 200px;" size="small" class="filter-item" clearable placeholder="SID" v-model="qc.sid">
            </el-input>
            <el-input  style="width: 200px;" size="small" class="filter-item" clearable placeholder="手机号" v-model="qc.phone">
            </el-input>
             <el-select v-model="qc.group" placeholder="分组方案" size="small" class="filter-item" clearable>
             <el-option value="A" v-bind:key="1" label="A组"></el-option>
             <el-option value="B" v-bind:key="2" label="B组"></el-option>
             <el-option value="C" v-bind:key="3" label="C组"></el-option>
             <el-option value="Cg" v-bind:key="4" label="C组高危"></el-option>
             <el-option value="Cd" v-bind:key="5" label="C组低危"></el-option>
           </el-select>
           <el-select v-model="qc.reserveStatus" placeholder="是否预约" size="small" class="filter-item" clearable>
             <el-option value="1" v-bind:key="1" label="未预约"></el-option>
             <el-option value="2" v-bind:key="2" label="已预约"></el-option>
           </el-select>
           <el-select v-model="qc.examinationStatus" placeholder="是否检查" size="small" class="filter-item" clearable>
             <el-option value="1" v-bind:key="1" label="未检查"></el-option>
             <el-option value="2" v-bind:key="2" label="已检查"></el-option>
           </el-select>
           <el-select v-model="qc.finishedStatus" placeholder="完成情况" size="small" class="filter-item" clearable>
             <el-option value="1" v-bind:key="1" label="未完成"></el-option>
             <el-option value="2" v-bind:key="2" label="已完成"></el-option>
           </el-select>
          </div>
         <div>
           <el-cascader
             style="float: left;width: 200px;margin-right: 15px;"
             clearable
             :options="$store.state.regionOptions"
             placeholder="所属地区"
             :props="props"
             v-model="ids"
             size="small"
             :show-all-levels="false"
             change-on-select
             @change="getQcId"
             @clear="clear"
           ></el-cascader>
           <el-select v-model="qc.resultStatus" placeholder="肠镜结果录入状态" size="small" class="filter-item" clearable>
             <el-option value="1" v-bind:key="1" label="未录入"></el-option>
             <el-option value="2" v-bind:key="2" label="已录入"></el-option>
           </el-select>
           <!--<el-select v-model="qc.examinationStatus" placeholder="病理结果录入状态" size="small" class="filter-item">-->
             <!--<el-option value="1" v-bind:key="1" label="未录入"></el-option>-->
             <!--<el-option value="2" v-bind:key="2" label="已录入"></el-option>-->
           <!--</el-select>-->
           <el-select v-model="qc.notificationEntryStatus" placeholder="告知书录入状态" size="small" class="filter-item" clearable>
             <el-option value="1" v-bind:key="1" label="未录入"></el-option>
             <el-option value="2" v-bind:key="2" label="已录入"></el-option>
           </el-select>
           <el-select v-model="qc.notificationIssueStatus" placeholder="告知书发放状态" size="small" class="filter-item" clearable>
             <el-option value="1" v-bind:key="1" label="未发放"></el-option>
             <el-option value="2" v-bind:key="2" label="已发放"></el-option>
           </el-select>
           <el-select v-model="qc.signState" placeholder="签到状态" size="small" class="filter-item" clearable>
             <el-option value="1" v-bind:key="1" label="未签到"></el-option>
             <el-option value="2" v-bind:key="2" label="已签到"></el-option>
           </el-select>
             <!-- add -->
           <el-select v-model="qc.noCompleteFlag" placeholder="是否有已检查未完成" size="small" class="filter-item" clearable>
            <el-option value="1" v-bind:key="1" label="有"></el-option>
            <el-option value="2" v-bind:key="2" label="无"></el-option>
          </el-select>
           <el-select v-model="qc.followState" placeholder="随访状态" size="small" class="filter-item" clearable>
                <el-option v-for="(item,index) in followStatus" 
                :key="index" 
                :value="item.id" 
                :label="item.name">
                </el-option>
              </el-select>
           </div>
           <div>
              <el-select v-model="qc.followGroup" placeholder="随访分组" size="small" class="filter-item" clearable>
               <el-option v-for="(item,index) in followGroup" 
               :key="index" 
               :value="item.id" 
               :label="item.name">
                </el-option>
              </el-select>
                <el-select v-model="qc.imagStatus" placeholder="是否上传图片" size="small" class="filter-item" clearable>
                <el-option value="0" v-bind:key="0" label="未上传"></el-option>
                <el-option value="1" v-bind:key="1" label="已上传"></el-option>
              </el-select>
           </div>
           <div>
             <el-button size="small" type="primary" icon="el-icon-search" @click="query(1,$store.state.countryColonscopyListPageSize)">查询</el-button>
             <el-button  type="primary" size="small" icon="el-icon-close" @click="reset" >重置</el-button>
           </div>
        </el-form>
      </div>
      <el-dialog :visible.sync="notificationFormSeeDialog" >
        <el-form :model="seeGrantForm"  >
          <el-form-item label="发放方式" :label-width="formLabelWidth" prop="mode">
            <el-select v-model="seeGrantForm.notificationIssueMode" placeholder="请选择"  disabled>
              <el-option label="受试者/家属到社区中心自取" value="1"></el-option>
              <el-option label="社区工作人员入户递送"  value="2"></el-option>
              <el-option label="邻居从社区中心捎带取走" value="3" ></el-option>
              <el-option label="受试者/家属到医院自取" value="4"></el-option>
              <el-option label="其它，请备注" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发放日期" :label-width="formLabelWidth" prop="issueDate" >
            <el-date-picker
              v-model="seeGrantForm.notificationIssueDate"
              type="date"
              disabled
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="工作人员编码" :label-width="formLabelWidth" prop="workerCode" >
            <el-input v-model="seeGrantForm.notificationIssueWorkerCode" auto-complete="off" class="notification-input" disabled></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth" prop="note">
            <el-input v-model="seeGrantForm.notificationIssueNote" auto-complete="off" class="notification-input" disabled></el-input>
          </el-form-item>
        </el-form>
      </el-dialog>
      <div >
        <div class="table-btn-grooup">
           <el-button  size="small" type="primary" icon="el-icon-plus" @click="add()" >新增</el-button>
          <el-button  size="small" type="primary" icon="el-icon-document">
            <a :href="downloadUrl">导出EXCEL</a>
          </el-button>
          <!--<el-button class="filter-item" size="small" type="primary" icon="el-icon-search"  v-if="btnAuth.colonscopyList_EXCEL_btn">导出EXCEL</el-button>-->
        </div>
        <!--数据列表-->
        <el-table
          :data="queryResult.tableData"
          border
          :default-sort = "{prop: 'inGroupDate', order: 'descending'}"
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
            prop="areaName"
            label="地区医院"
            width="160"
          >
          </el-table-column>
          <el-table-column
            prop="depName"
            label="所属区"
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
            width="120"
            sortable
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
            label="预约状态"
          >
            <template slot-scope="scope">
              <span>{{scope.row.reserveStatus | reserveStatus}}</span>
            </template>
          </el-table-column>
           <el-table-column
            prop="reservationNum"
            label="预约次数"
            width="130"
          >
          </el-table-column>
           <el-table-column
             prop="breakReservationNum"
             label="爽约次数"
             width="130"
           >
           </el-table-column>
           <el-table-column
             prop="noCompleteNum"
             label="已检查未完成次数"
             width="140"
           >
           </el-table-column>
          <el-table-column
            prop="reserveDate"
            label="预约时间"
            width="120"
            sortable
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
            prop="resultState"
            label="肠镜结果"
            width="90"
          >
            <template slot-scope="scope">
              <router-link :to="{path:'/colonscopy/showReport1',query:{id:scope.row.resultId,sid:scope.row.sid,show:1}}">
                <el-button type="text" v-if="scope.row.resultState == 2">查看</el-button>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column
            prop="pathologyStatus"
            label="病理结果"
            width="90"
          >
            <template slot-scope="scope">
              <router-link :to="{path:'/colonscopy/showReport2',query:{id:scope.row.pathologyId,sid:scope.row.sid,show:1}}">
                <el-button type="text" v-if="scope.row.pathologyStatus==2">查看</el-button>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column
            prop="notificationEntryStatus"
            label="告知书结果"
            width="100"
          >
            <template slot-scope="scope">
              <router-link :to="{path:'/colonscopy/showReport3',query:{id:scope.row.id,sid:scope.row.sid,show:1}}">
                <el-button type="text" v-if="scope.row.notificationEntryStatus==2">查看</el-button>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column
            prop="notificationIssueStatus"
            label="告知书发放"
            width="100"
          >
            <template slot-scope="scope">
                <!--<el-button type="text" v-if="scope.row.notificationIssueStatus==1" @click="openNotificationFormDialog(scope.row.id,scope.row.sid)">发放记录</el-button>-->
                <el-button type="text" v-if="scope.row.notificationIssueStatus==2" @click="openNotificationFormSeeDialog(scope.row.id,scope.row.sid,scope.row)">查看</el-button>
                <span v-if="scope.row.notificationIssueStatus == 1">未发放</span>
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
                :current-page="$store.state.countryColonscopyListPageNo"
                :page-sizes="[10, 20, 50, 100]"
                v-bind:page-size="$store.state.countryColonscopyListPageSize"
                layout="total, sizes, prev, pager, next, jumper"
                v-bind:total="queryResult.totalRowCount">
              </el-pagination>
            </div>
          </div></el-col>
        </el-row>
      </div>
      <router-view></router-view>
    </div>
    <!--  -->
     <el-dialog :visible.sync="addFormDialog" :show-close="false">
        <el-form :model="addForms" :rules="addFormRules" ref="addForms" >
          <el-form-item label="SID" :label-width="formLabelWidth" prop="sid" >
            <el-input v-model="addForms.sid" auto-complete="off" class="notification-input" @blur="getInfo()"></el-input>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
            <el-input v-model="addForms.name" auto-complete="off" class="notification-input"  disabled></el-input>
          </el-form-item>
          <el-form-item label="电话号码" :label-width="formLabelWidth" prop="phone">
            <el-input v-model="addForms.phone" auto-complete="off" class="notification-input" disabled></el-input>
          </el-form-item>
          <div class="dialog-footer" style="text-align: center;">
            <el-button size="small" type="primary" @click="addForm('addForms')" :disabled="!addForms.name">确 定</el-button>
            <el-button size="small" @click="cancel()">取 消</el-button>
          </div>
        </el-form>
      </el-dialog>
  </div>
</template>
<script>
import DICTIONARY from "@/utils/dictionary.js";
  export default {
    data () {
      return {
        visible2:false,
        reserveDialog:false,
        signFormDialog:false,
        addFormDialog:false,
        notificationFormDialog:false,
        notificationFormSeeDialog:false,
        isShow:false,
        countryColonscopyList_page:false,
        btnAuth:{
          one_colonscopyList_btn:false,
          colonscopyList_query_btn:false,
          colonscopyList_EXCEL_btn:false,
          colonscopyList_add_btn:false
        },
        seeGrantForm:{
          notificationIssueDate:'',
          notificationIssueMode:'',
          notificationIssueWorkerCode:'',
          notificationIssueNote:''
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
          "notificationIssueStatus":null,
          "notificationEntryStatus":null,
          "communityDeptId":null,
          "areaDeptId":null,
          "loginName":null,
          "resultStatus":null,
          "signState":null,
          "noCompleteFlag":null,
          "followState":null,
          "followGroup":null,
          "imagStatus":null
        },
         followGroup:DICTIONARY.followGroup,
         followStatus:DICTIONARY.followStatus,
        //查询结果
        "queryResult":{
          "pageNo":1,//当前页
          "pageSize":10,//每页的条数
          "totalPageCount":0,
          "tableData":[]
        },
        downloadUrl:SERVER_NAME + '/base/hospital/colonoscopy/queryFoCountryCJExcel',
        props: {
          value: 'id',
          children: 'child',
          label:'name'
        },

        ids:[],
        multipleSelection:[
        ],
        formLabelWidth: '180px',
        addFormDialog:false,
        addForms:{
          'sid':'',
          'phone':'',
          'name':'',
        },
         addFormRules: {
          sid:{required: true, message: '必填', trigger: 'change'},
          name:{required: true, message: '必填', trigger: 'change'},
          phone:{required: true, message: '必填', trigger: 'change'},
        },
      }
    },
    mounted(){
      let obj = this.checkPageAuth(this,"countryColonscopyList_page",this.btnAuth)
      this.qc.sid=this.$route.query.sid;
     this.query(this.$store.state.countryColonscopyListPageNo,this.$store.state.countryColonscopyListPageSize);
    },
    beforeDestroy(){
      this.$store.state.countryColonscopyListPageNo=1;
      this.$store.state.countryColonscopyListPageSize=10;
    },
    methods:{
      //获取选中社区
      getQcId(value){
        this.qc.communityDeptId = null
        this.qc.areaDeptId = null
        if(value.length==1){
          this.qc.areaDeptId = value[0]
          this.qc.communityDeptId=null
          this.qc.loginName =null
        }else if(value.length == 2){
          this.qc.areaDeptId = value[0]
          this.qc.communityDeptId = value[1]
          this.qc.loginName =null
        }else if(value.length == 3){
          this.qc.areaDeptId = value[0]
          this.qc.communityDeptId = value[1]
          for(let i =0;i<this.$store.state.regionOptions.length;i++){
            if(value[0] == this.$store.state.regionOptions[i].id){
              console.log(1)
              for(let j = 0;j<this.$store.state.regionOptions[i].child.length;j++){
                if(value[1] == this.$store.state.regionOptions[i].child[j].id){
                  console.log(2)
                  for(let k=0;k<this.$store.state.regionOptions[i].child[j].child.length;k++){
                    if(value[2] == this.$store.state.regionOptions[i].child[j].child[k].id){
                      this.qc.loginName =this.$store.state.regionOptions[i].child[j].child[k].loginName
                      console.log(this.qc.loginName,1)
                    }
                  }
                }
              }
            }
          }
        }else{
            //点x清空 
             this.qc.loginName = null;
        }

      },
      openNotificationFormSeeDialog(id,sid,row){
        this.seeGrantForm.notificationIssueDate=row.notificationIssueDate;
        this.seeGrantForm.notificationIssueMode=row.notificationIssueMode+'';
        this.seeGrantForm.notificationIssueWorkerCode=row.notificationIssueWorkerCode;
        this.seeGrantForm.notificationIssueNote=row.notificationIssueNote;
        this.notificationFormSeeDialog=true;
//        this.notificationForm.id = id;
//        this.notificationForm.sid =sid;
      },
        cancel(){
          this.addFormDialog = false
          this.$refs['addForms'].resetFields();
        },
      //查询
      query(pageNo,pageSize){
        $axios_http({
          // url:"/base/hospital/nation/colonoscopy/record/querynationList",
          url: "/base/hospital/colonoscopy/record/query",
          data:{
            name:this.qc.name,
            sid:this.qc.sid,
            phone:this.qc.phone,
            sex:this.qc.sex,
            reserveStatus:this.qc.reserveStatus,
            examinationStatus:this.qc.examinationStatus,
            group:this.qc.group,
            finishedStatus:this.qc.finishedStatus,
            communityDeptId:this.qc.communityDeptId,
            areaDeptId:this.qc.areaDeptId,
            loginName:this.qc.loginName,
            resultStatus:this.qc.resultStatus,
            signState:this.qc.signState,
            notificationEntryStatus:this.qc.notificationEntryStatus,
            notificationIssueStatus:this.qc.notificationIssueStatus,
            noCompleteFlag:this.qc.noCompleteFlag,
            followState:this.qc.followState,
            followGroup:this.qc.followGroup,
            imagStatus:this.qc.imagStatus,
            pageNo:pageNo,//当前页
            pageSize:pageSize//每页条数
          },
          vueObj:this
        }).then((res)=>{
          this.$store.commit('get_countryColonscopyListPageNo',pageNo)
          this.queryResult.tableData=res.data.data;
          this.queryResult.totalPageCount=res.data.pageInfo.totalPageCount//获取总共多少页
          this.queryResult.totalRowCount=res.data.pageInfo.totalRowCount//获取总共条数
        })
      },

      //重置检索条件
      reset(){
        Object.assign(this.$data.qc, this.$options.data().qc)
        this.ids=[]
        this.query(this.$store.state.countryColonscopyListPageNo,this.$store.state.countryColonscopyListPageSize);
      },
      //每页显示查询结果条数变更事件，做重新查询操作
      pageSizeChange(pageSize) {
        this.$store.commit('get_countryColonscopyListPageSize', pageSize)
        this.query(this.$store.state.countryColonscopyListPageNo,pageSize);
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        this.$store.commit('get_countryColonscopyListPageNo',currentPage)
        this.query(currentPage,this.$store.state.countryColonscopyListPageSize);
      },
      add(){
         this.addFormDialog = true
      },
      getInfo(value){
        if (this.addForms.sid){
          $axios_http({
            // url: "/base/hospital/person/detail/get/"+this.addForms.sid,
            url: "/base/hospital/person/detail/getSid",
            data:{
              sid:this.addForms.sid
            },
            vueObj: this
          }).then((res) => {
            // if(res.data.data.base){
            if(res.data.data){
              this.addForms.name = res.data.data[0].name
              this.addForms.phone = res.data.data[0].phone
            }else {
              this.addForms.name = ''
              this.addForms.phone = ''
              this.$message({
                type:'error',
                message:'您输入的SID不在系统中，请重新输入'
              })
            }

          })
        }
      },
      addForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            $axios_http({
              url: "/base/hospital/colonoscopy/record/addColonoscopyRecord",
              data: {
                sid: this.addForms.sid
              },
              vueObj: this
            }).then((res) => {
              $successMsg(this, "添加成功")
              this.addFormDialog = false
              this.$refs['addForms'].resetFields();
              this.query(this.$store.state.regionColonscopyListPageNo,this.$store.state.regionColonscopyListPageSize);
            })
          }
        })
      },
      clear(){
        console.log(11)
      }
    }
  }

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
   margin-top:20px;
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
<style>

</style>
