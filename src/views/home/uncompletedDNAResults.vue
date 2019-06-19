<template>
  <div slot="right" class="content-page" v-if="uncompletedDNAResults_page">
    <div class="content">
      <h4>待办-未通知粪便DNA结果</h4>
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
            <el-select v-model="qc.group" clearable placeholder="请选择分组方案" size="small" class="filter-item">
              <el-option value="A" v-bind:key="1" label="A组"></el-option>
              <el-option value="B" v-bind:key="2" label="B组"></el-option>
              <el-option value="C" v-bind:key="3" label="C组"></el-option>
              <el-option value="Cg" v-bind:key="4" label="C组高危"></el-option>
              <el-option value="Cd" v-bind:key="5" label="C组低危"></el-option>
            </el-select>
            <el-select v-model="qc.noStoolDNAResult" clearable placeholder="DNA结果" size="small" class="filter-item">
              <el-option value="2" v-bind:key="2" label="阳性"></el-option>
              <el-option value="1" v-bind:key="1" label="阴性"></el-option>
              <el-option value="3" v-bind:key="3" label="无效"></el-option>
            </el-select>
            <el-select v-model="qc.followGroup" clearable placeholder="随访分组" size="small" class="filter-item">
              <el-option v-for="(item,index) in followGroup" 
              :key="index" 
              :value="item.id" 
              :label="item.name"></el-option>
            </el-select>
          </div>
         <div style="margin-bottom: 20px;">
          <el-button class="filter-item" size="small" type="primary" icon="el-icon-search" @click="query(1,$store.state.uncompletedDNAPageSize)" v-if="btnAuth.uncompletedDNAResult_add_btn">查询</el-button>
          <el-button class="filter-item" type="primary" size="small" icon="el-icon-close" @click="reset" v-if="btnAuth.uncompletedDNAResult_add_btn">重置</el-button>
         </div>
        </el-form>
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
            prop="phone"
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
            label="DNA结果"
          >
            <template slot-scope="scope">
              <span>{{scope.row.dnaCheckResult | result}}</span>
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
            label="年度状态"
          >
            <template slot-scope="scope">
              <span>{{scope.row.overallStatusCy | overallStatusCy}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="240"
          >
            <template slot-scope="scope">
              <span><el-button type="text" class="btnStyle" size="small" v-if="btnAuth.uncompletedDNAResult_add_btn" @click="sendMessage(scope.row.phone,scope.row.dnaCheckResult)">短信通知</el-button></span>
              <span><el-button type="text" class="btnStyle" size="small" v-if="btnAuth.uncompletedDNAResult_add_btn" @click="openNotificationFormDialog(scope.row.dataId,scope.row.sid)">发放</el-button></span>
              <span><el-button type="text" class="btnStyle" size="small" v-if="btnAuth.uncompletedDNAResult_add_btn&&scope.row.dnaCheckFilePath != null&&scope.row.dnaCheckFilePath != ''"><a :href="serverName + '/base/dnafile/downFile?filePath=' + scope.row.dnaCheckFilePath">下载PDF</a></el-button></span>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog :visible.sync="messageDialog" :show-close="false">
          <el-form :model="messageForms" :rules="messageFormRules" ref="messageForms" >
            <el-form-item label="短信" :label-width="formLabelWidth" prop="sid" >
              <el-input
                type="textarea"
                disabled
                :autosize="{ minRows: 4, maxRows: 4}"
                placeholder="请输入内容"
                v-model="dnaCheckResultStr">
              </el-input>            </el-form-item>
            <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone" >
              <el-input v-model="messageForms.phone" auto-complete="off" class="notification-input"></el-input>
            </el-form-item>
            <div class="dialog-footer" style="text-align: center;">
              <el-button size="small" type="primary" @click="sureSend('messageForms')">提交</el-button>
              <el-button size="small" @click="messageDialog = false">取 消</el-button>
            </div>
          </el-form>
        </el-dialog>
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
        <!--分页栏-->
        <el-row>
          <el-col :span="10"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="14"><div class="grid-content bg-purple">
            <div class="block" style="margin-top: 18px">
              <el-pagination
                @size-change="pageSizeChange"
                @current-change="currentPageChange"
                :current-page="$store.state.uncompletedDNAPageNo"
                :page-sizes="[10, 20, 50, 100]"
                v-bind:page-size="$store.state.uncompletedDNAPageSize"
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
      var validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('手机号不能为空'));
        } else if (!(/\d/.test(value))) {
          callback(new Error('手机号只能是数字'))
        } else if (value.length != 11) {
          callback(new Error('请输入合法的11位手机号'));
        } else if (value) {
          callback()
        }
      };
      return {
        followGroup:DICTIONARY.followGroup,

          messageDialog:false,
        //权限判定
        uncompletedDNAResults_page:false,
        btnAuth:{
          uncompletedDNAResult_add_btn:false,
        },
        serverName:SERVER_NAME,
        textarea3:"【结直肠癌筛查项目】感谢您参加由国家癌症中心/中国医学科学院肿瘤医院联合多家省市肿瘤医院共同实施的中国人群结直肠癌筛查项目！您的粪便DNA检查报告已返回，请在工作时间至当地社区领取您的报告。感谢您的配合！（Target-C）",
        //查询条件
        "qc":{
          "sid":'',
          "name":'',
          "phone":'',
          "group":'',
          "noStoolDNAResult":'',
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
        "messageForms":{
           "phone":''
        },
        //分页
        "queryResultSource":{
          "pageNoSource":1,//当前页
          "pageSizeSource":15,//每页的条数
          "totalPageCount":0
        },
        rules:{
          mode:[
            {required:true,message:'必选',trigger:'change'},
          ],
          issueDate:[
            {required:true,message:'必填',trigger:'blur'},
          ],
          workerCode:[
            {required:true,message:'必填',trigger:'blur'},
          ],
          note:[
            {required:false,message:'必填',trigger:'blur'},
          ]
        },
        notificationFormDialog:false,
        notificationForm:{
          "id":'',
          'sid':'',
          'mode':'',
          'workerCode':'',
          'note':'',
          'issueDate':''
        },
        formLabelWidth: '180px',
        messageFormRules:{
          phone: [
            {required: true, message: '必填', trigger: 'blur'},
            {validator: validatePhone, trigger: 'blur'}

          ],
        },
        dnaCheckResult:Number,
        dnaCheckResultStr:''
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
      let obj = this.checkPageAuth(this,"uncompletedDNAResults_page",this.btnAuth);
      this.query(this.$store.state.uncompletedDNAPageNo,this.$store.state.uncompletedDNAPageSize);
    },
     beforeDestroy(){
      this.$store.state.uncompletedDNAPageNo=1;
      this.$store.state.uncompletedDNAPageSize=10;
    },
    methods:{
      //获取选中区
      getQcId(value){
        this.qc.loginName =value[0]
      },
      //查询
      query(pageNo,pageSize){
        $axios_http({
          url:"/base/stool/dna/notIssueDna/query",
          data:{
            name:this.qc.name,
            sid:this.qc.sid,
            phone:this.qc.phone,
            group:this.qc.group,
            loginName:this.qc.loginName,
            noStoolDNAResult:this.qc.noStoolDNAResult,
            followGroup:this.qc.followGroup,
            delayFlag:this.$route.query.delayFlag == 1?1:null,
            pageNo:pageNo,//当前页
            pageSize:pageSize//每页条数
          },
          vueObj:this
        }).then((res)=>{
          this.$store.commit('get_uncompletedDNAPageNo',pageNo)
          this.queryResult.tableData=res.data.data;
          this.queryResult.totalPageCount=res.data.pageInfo.totalPageCount//获取总共多少页
          this.queryResult.totalRowCount=res.data.pageInfo.totalRowCount//获取总共条数
        })
      },
      showPDF(dnaCheckFilePath){
        window.open(dnaCheckFilePath)
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
      notificationSure(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            $axios_http({
              url:"/base/stool/dna/updateCommDnaInformStatus",
              data:{
                id:this.notificationForm.id,
                sid:this.notificationForm.sid,
                dna_community_inform_mode:this.notificationForm.mode,
                dna_community_inform_work_time:this.notificationForm.issueDate,
                dna_community_inform_worker_code:this.notificationForm.workerCode,
                dna_community_inform_note:this.notificationForm.note,
              },
              vueObj:this
            }).then((res)=>{
              this.$refs[formName].resetFields();
              $successMsg(this,"发放成功")
              this.notificationFormDialog=false
              this.query(this.$store.state.uncompletedDNAPageNo,this.$store.state.uncompletedDNAPageSize)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      sendMessage(phone,dnaCheckResult){
          this.messageDialog = true;
          this.messageForms.phone = phone;
          this.dnaCheckResult = dnaCheckResult;
           // textarea
         var status = '';
         if(dnaCheckResult == 1){
           status = '阴性'
         }else if(dnaCheckResult == 2){
           status = '阳性'
         }else if(dnaCheckResult == 3){
           status = '无效'
         }
         this.dnaCheckResultStr = `【结直肠癌筛查项目】尊敬的受试者，您近期参加了由国家癌症中心组织的人群结直肠癌筛查项目，您的粪便DNA检查结果为${status}。如需完整报告，可在工作时间至当地社区卫生服务中心领取。感谢您的参与！`;
      },
      sureSend(formName){
        this.$refs[formName].validate((valid,obj) => {
          if (valid) {
            $axios_http({
              url: "/base/dna/result/sendDna",
              data: {
                  phone:this.messageForms.phone,
                  dnaCheckResult:this.dnaCheckResult
              },
              vueObj: this
            }).then((res) => {
              $successMsg(this,"发送成功")
              this.messageDialog = false
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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
        this.query(this.$store.state.uncompletedDNAPageNo,this.$store.state.uncompletedDNAPageSize);
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
            this.query(this.$store.state.uncompletedDNAPageNo,this.$store.state.uncompletedDNAPageSize)
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
          this.$store.commit('get_uncompletedDNAPageSize', pageSize)
         this.query(this.$store.state.uncompletedDNAPageNo,pageSize);
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        //this.queryResult.pageNo = currentPage
        this.$store.commit('get_uncompletedDNAPageNo',currentPage)
        this.query(currentPage,this.$store.state.uncompletedDNAPageSize);
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
  .dialog-footer{
    width:140px;
    margin:0 auto;
  }
</style>
