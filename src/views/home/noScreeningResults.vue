<template>
  <div slot="right" class="content-page" v-if="noScreeningResult_page">
    <div class="content">
      <h4>待办-未发放筛查结果告知书</h4>
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
            <el-select v-model="qc.group" clearable placeholder="分组方案" size="small" class="filter-item">
              <el-option value="A" label="A组">A组</el-option>
              <el-option value="B" label="B组">B组</el-option>
              <el-option value="C" label="C组">C组</el-option>
              <el-option value="Cg" label="C组高危">C组高危</el-option>
              <el-option value="Cd" label="C组低危">C组低危</el-option>
            </el-select>
            <el-select v-model="qc.followGroup" clearable placeholder="随访分组" size="small" class="filter-item">
              <el-option v-for="(item,index) in followGroup" 
              :key="index" 
              :value="item.id" 
              :label="item.name"></el-option>
            </el-select>
          </div>
          <div style="margin-bottom: 20px;">
          <el-button  size="small" type="primary" icon="el-icon-search" @click="query(1,$store.state.uncompletedRiskFactorsPageSize)" v-if="btnAuth.noScreeningResult_query_btn">查询</el-button>
          <el-button  type="primary" size="small" icon="el-icon-close" @click="reset" v-if="btnAuth.noScreeningResult_query_btn">重置</el-button>
          </div>
        </el-form>
        <el-dialog :visible.sync="notificationFormDialog" >
          <el-form :model="notificationForm" :rules="rules" ref="notificationForm" >
            <el-form-item label="发放方式" :label-width="formLabelWidth" prop="mode">
              <el-select v-model="notificationForm.mode" placeholder="请选择" @change="getMode">
                <el-option label="1.受试者/家属到社区中心自取" value="1" ></el-option>
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
        <el-dialog :visible.sync="messageDialog" :show-close="false">
          <el-form :model="messageForms"  ref="messageForms" >
            <el-form-item label="短信" :label-width="formLabelWidth" prop="sid" >
              <el-input
                type="textarea"
                disabled
                :autosize="{ minRows: 3, maxRows: 4}"
                placeholder="请输入内容"
                v-model="textarea3">
              </el-input>            </el-form-item>
            <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone" >
              <el-input v-model="messageForms.phone" auto-complete="off" class="notification-input" disabled></el-input>
            </el-form-item>
            <div class="dialog-footer" style="text-align: center;">
              <el-button size="small" type="primary" @click="sureSend('messageForms')">确定</el-button>
              <el-button size="small" @click="messageDialog = false">取 消</el-button>
            </div>
          </el-form>
        </el-dialog>
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
            label="入组日期"
            sortable
            width="180"
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
            label="受试者状态"
            width="180"
            >
            <template slot-scope="scope">
              <span>{{scope.row.overallStatusCy | overallStatusCy}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="200"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="sendMessage(scope.row.sid,scope.row.cellPhone)">短信通知</el-button>
              <router-link :to="{path:'/colonscopy/report3',query:{sid:scope.row.sid,id:scope.row.id,show:1}}"><el-button type="text" size="small">查看</el-button></router-link>
              <el-button type="text" size="small" @click="openNotificationFormDialog(scope.row.id,scope.row.sid)">发放记录</el-button>
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
                :current-page="$store.state.uncompletedRiskFactorsPageNo"
                :page-sizes="[10, 20, 50, 100]"
                v-bind:page-size="$store.state.uncompletedRiskFactorsPageSize"
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
    name: 'Right',
    data () {
      return {
        followGroup:DICTIONARY.followGroup,
        messageDialog:false,
        //权限判定
        noScreeningResult_page:false,
        btnAuth:{
          buttonRoleAdd:false,
          noScreeningResult_add_btn:false,
          buttonRoleDel:false,
          noScreeningResult_query_btn:false,
          buttonUserRoleDis:false
        },
        textarea3:'【结直肠癌筛查项目】感谢您参加中国人群结直肠癌筛查项目！您的结肠镜检查报告已返回，请在工作时间至当地社区领取您的报告。感谢您的配合！（Target-C）',
        "messageForms":{
          "phone":'',
          "sid":'',
        },
        notificationForm:{
          "id":'',
          'sid':'',
          'mode':'',
          'workerCode':'',
          'note':'',
          'issueDate':''
        },
        //查询条件
        "qc":{
          "sid":'',
          "name":'',
          "phone":'',
          "group":'',
          "followGroup":null,
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
        notificationFormDialog:false,
        allocateResourcesData:[],
        formLabelWidth: '150px',
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

      let obj = this.checkPageAuth(this,"noScreeningResult_page",this.btnAuth);
      this.query(this.$store.state.uncompletedRiskFactorsPageNo,this.$store.state.uncompletedRiskFactorsPageSize);
    },
    beforeDestroy(){
      this.$store.state.uncompletedRiskFactorsPageNo=1;
      this.$store.state.uncompletedRiskFactorsPageSize=10;
    },
    methods:{
      //获取选中区
      getQcId(value){
        this.qc.loginName =value[0]
      },
      getMode(value){
        if(value == '5'){
          this.rules.note[0].required = true
        }else {
          this.rules.note[0].required = false
        }
      },
      //查询
      query(pageNo,pageSize){
        $axios_http({
          url:"/base/hospital/person/notissue/notification/query",
          data:{
            name:this.qc.name,
            sid:this.qc.sid,
            phone:this.qc.phone,
            group:this.qc.group,
            followGroup:this.qc.followGroup,
            loginName:this.qc.loginName,
            delayFlag:this.$route.query.delayFlag == 1?1:null,
            pageNo:pageNo,//当前页
            pageSize:pageSize//每页条数
          },
          vueObj:this
        }).then((res)=>{
          this.$store.commit('get_uncompletedRiskFactorsPageNo',pageNo)
          this.queryResult.tableData=res.data.data;

          //his.$store.commit('update_list',res.data.data);

          this.queryResult.totalPageCount=res.data.pageInfo.totalPageCount//获取总共多少页
          this.queryResult.totalRowCount=res.data.pageInfo.totalRowCount//获取总共条数
        })
      },
      openNotificationFormDialog(id,sid){
        this.notificationFormDialog=true;
        this.notificationForm.id = id
        this.notificationForm.sid =sid
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
              this.$refs[formName].resetFields();
              $successMsg(this,"发放成功")
              this.notificationFormDialog=false
              this.query(this.$store.state.uncompletedRiskFactorsPageNo,this.$store.state.uncompletedRiskFactorsPageSize);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      sendMessage(sid,phone){
        this.messageDialog = true
        this.messageForms.phone = phone
        this.messageForms.sid = sid
      },
      sureSend(formName){
        $axios_http({
          url: "/base/hospital/person/sms/colonoscopy/"+this.messageForms.sid,
          data: {},
          vueObj: this
        }).then((res) => {
          //显示操作成功浮动提示框
          $successMsg(this, "发送成功")

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
       this.query(this.$store.state.uncompletedRiskFactorsPageNo,this.$store.state.uncompletedRiskFactorsPageSize);
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
           this.query(this.$store.state.uncompletedRiskFactorsPageNo,this.$store.state.uncompletedRiskFactorsPageSize);
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
          this.$store.commit('get_uncompletedRiskFactorsPageSize', pageSize)
         this.query(this.$store.state.uncompletedRiskFactorsPageNo,pageSize);
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        //this.queryResult.pageNo = currentPage
        this.$store.commit('get_uncompletedRiskFactorsPageNo',currentPage)
        this.query(currentPage,this.$store.state.uncompletedRiskFactorsPageSize);
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
  .filter-item{
    width: 200px;
    margin-right: 10px;
  }
</style>
