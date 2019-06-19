<template>
  <div slot="right" class="content-page" v-if="uncompletedFITResult_page">
    <div class="content">
      <h4>待办-未录入FIT结果</h4>
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
            <el-select v-model="qc.followGroup" clearable placeholder="随访分组" size="small" class="filter-item">
              <el-option v-for="(item,index) in followGroup" 
              :key="index" 
              :value="item.id" 
              :label="item.name"></el-option>
            </el-select>
          </div>
          <div style="margin-bottom: 20px;">
            <el-button  size="small" type="primary" icon="el-icon-search" @click="query(1,$store.state.uncompletedFITResultPageSize)" v-if="btnAuth.uncompletedFITResult_query_btn">查询</el-button>
            <el-button  type="primary" size="small" icon="el-icon-close" @click="reset" v-if="btnAuth.uncompletedFITResult_query_btn">重置</el-button>
          </div>
        </el-form>
        <!--数据列表-->
        <el-table
          :data="$store.state.list"
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
          >
            <template slot-scope="scope">
              <span>{{scope.row.overallStatusCy | overallStatusCy}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <el-button type="text" class="btnStyle" size="small" v-if="btnAuth.uncompletedFITResult_add_btn" @click='inputResultDialogIsShow(scope.row.id,scope.row.sid,scope.row.cellPhone)'>录入FIT结果</el-button>
            </template>
          </el-table-column>
        </el-table>
         <el-dialog
            width="30%"
            :visible.sync="inputResultPrompt"
            append-to-body>
            <div v-if="resultInfo==2" class="resultInfo">
              <p>FIT结果为阳性</p>
              <p>请及时为该受试者预约结肠镜检查</p>
            </div>
            <div v-if="resultInfo==1" class="resultInfo">
              <p>FIT结果为阴性</p>
              <p>该受试者一年后随访</p>
            </div>
            <div v-if="resultInfo==3" class="resultInfo">
              <p>FIT结果为无效</p>
              <p>请重新检测</p>
            </div>
            <div v-if="resultInfo==4 || resultInfo==null" class="resultInfo">
              <p>无结果</p>
              <p>请重新检测</p>
            </div>
             <p style="text-align:center;margin-top:5px;">
                <el-checkbox v-model="checked" v-if="resultInfo==2 || resultInfo==1 || resultInfo==3"  class="submitDialog-item-check">短信发送受试者</el-checkbox>
              </p>
            <div style="text-align: center;margin-top: 20px;">
              <el-button size="small" @click="closeInputResultDialog" class="dialog-footer">确 定</el-button>
            </div>
          </el-dialog>
        <el-dialog :visible.sync="inputResultDialog">
          <el-form :model="insertForm" :rules="rules" ref="insertForm">
            <el-form-item label="结果日期" :label-width="formLabelWidth" prop="resultDate">
              <el-date-picker
                v-model="insertForm.resultDate"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="结果日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item  :label-width="formLabelWidth">
              <el-radio v-model="insertForm.resultStatus" label="1">有结果</el-radio>
              <el-radio v-model="insertForm.resultStatus" label="2">无结果</el-radio>
            </el-form-item>
            <div v-if="insertForm.resultStatus==1">
              <el-form-item label="上线值/C值" :label-width="formLabelWidth" prop="upLineValue">
                <el-input v-model="insertForm.upLineValue" auto-complete="off" class="lineWidth"></el-input>
              </el-form-item>
              <el-form-item label="下线值/T值" :label-width="formLabelWidth" style="margin-top:10px" prop="downLineValue">
                <el-input v-model="insertForm.downLineValue" auto-complete="off" class="lineWidth"></el-input>
              </el-form-item>
              <el-form-item label="检测结果是否在10分钟内读取" :label-width="formLabelWidth" style="margin-top:10px" prop="inTenMin">
                <el-radio v-model="insertForm.inTenMin" label="1">是</el-radio>
                <el-radio v-model="insertForm.inTenMin" label="0">否</el-radio>
              </el-form-item>
            </div>
            <el-form-item label="请说明原因" :label-width="formLabelWidth" v-if="insertForm.resultStatus==2">
              <el-input v-model="insertForm.noResonResult" auto-complete="off" class="lineWidth"></el-input>
            </el-form-item>
            <div class="dialog-footer">
              <el-button size="small" @click="inputResult('insertForm')" type="primary">确 定</el-button>
              <el-button size="small" @click="inputResultDialog=false">取 消</el-button>
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
                :current-page="$store.state.uncompletedFITResultPageNo"
                :page-sizes="[10, 20, 50, 100]"
                v-bind:page-size="$store.state.uncompletedFITResultPageSize"
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
      var validateLineValue = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('不能为空'));
        } else if (!(/\d/.test(value))) {
          callback(new Error('只能是数字'))
        } else if (!(/^[1-9]{1}$/.test(value))) {
          callback(new Error('数字范围1-9'));
        } else {
          callback();
        }
      };
      return {
        followGroup:DICTIONARY.followGroup,
        //权限判定
        uncompletedFITResult_page:false,
        btnAuth:{
          buttonRoleAdd:false,
          uncompletedFITResult_add_btn:false,
          buttonRoleDel:false,
          uncompletedFITResult_query_btn:false,
          buttonUserRoleDis:false
        },
        inputResultDialog:false,
        inputResultPrompt:false,
        checked:true,   //发送短信
        resultInfo:'',
        id:'',
        sid:'',
        insertForm:{
          "resultDate":'',
          'upLineValue':null,
          'downLineValue':null,
          'noResonResult':'',
          'resultStatus':'',
          "inTenMin":''
        },
        sendForm:{
          'phone':'',
           'id':''
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
        allocateResourcesData:[],
        formLabelWidth: '220px',
        rules:{
          upLineValue:[
            {required:true,message:'必填',trigger:'blur'},
            {validator: validateLineValue, trigger: 'blur'}
          ],
          downLineValue:[
            {required:true,message:'必填',trigger:'blur'},
            {validator: validateLineValue, trigger: 'blur'}
          ],
          resultDate:[
            {required:true,message:'必填',trigger:'blur'},
          ],
          desc:[
            {required:true,message:'必填',trigger:'blur'},
            {min:1,max:32,message:'长度在1到32个字符',trigger:'blur'}
          ],
          inTenMin:[
            {required:true,message:'必选',trigger:'change'},
          ]
        },

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

      let obj = this.checkPageAuth(this,"uncompletedFITResult_page",this.btnAuth);
      this.query(this.$store.state.uncompletedFITResultPageNo,this.$store.state.uncompletedFITResultPageSize);
    },
     beforeDestroy(){
      this.$store.state.uncompletedFITResultPageNo=1;
      this.$store.state.uncompletedFITResultPageSize=10;
    },
    methods:{
      //获取选中区
      getQcId(value){
        this.qc.loginName =value[0]
      },
      //查询
      query(pageNo,pageSize){
        $axios_http({
          url:"/base/hospital/person/notentry/fitresult/query",
          data:{
            name:this.qc.name,
            sid:this.qc.sid,
            phone:this.qc.phone,
            group:this.qc.group,
            loginName:this.qc.loginName,
            followGroup:this.qc.followGroup,
            delayFlag:this.$route.query.delayFlag == 1?1:null,
            pageNo:pageNo,//当前页
            pageSize:pageSize//每页条数
          },
          vueObj:this
        }).then((res)=>{
          this.$store.commit('get_uncompletedFITResultPageNo',pageNo)
          this.queryResult.tableData=res.data.data;
          this.$store.commit('update_list',res.data.data);
          this.queryResult.totalPageCount=res.data.pageInfo.totalPageCount//获取总共多少页
          this.queryResult.totalRowCount=res.data.pageInfo.totalRowCount//获取总共条数
        })
      },
      inputResultDialogIsShow(id,sid,phone){
        this.id=id;
        this.sid=sid;
        this.inputResultDialog=true;
        // 录入结果发送短信值
        this.sendForm.phone=phone;
        this.sendForm.id=id;
      },
      inputResult(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            $axios_http({
              url:"/base/fit/result/add",
              data:{
                id:this.id,
                sid:this.sid,
                resultStatus:this.insertForm.resultStatus,
                resultDate:this.insertForm.resultDate,
                upLineValue:this.insertForm.upLineValue,
                downLineValue:this.insertForm.downLineValue,
                noResonResult:this.insertForm.noResonResult,
                inTenMin:this.insertForm.inTenMin
              },
              vueObj:this
            }).then((res)=>{
              console.log('add');
              console.log(res);
              $successMsg(this,"结果录入成功")
              this.query(this.$store.state.uncompletedFITResultPageNo,this.$store.state.uncompletedFITResultPageSize);
              this.inputResultDialog=false;
              this.inputResultPrompt=true;
              this.resultInfo=res.data.data.result;
              console.log(this.resultInfo)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      closeInputResultDialog(){
        Object.assign(this.$data.insertForm, this.$options.data().insertForm);
        this.inputResultDialog=false;
        this.inputResultPrompt=false;
        if(this.checked){
           $axios_http({
            url: "/base/fit/result/sendFit",
            data: {
              id: this.sendForm.id,
              phone:this.sendForm.phone,
            },
            vueObj: this
          }).then((res) => {
              setTimeout(()=>{
                $successMsg(this, "发送成功")
              },500)
          })
        }

        Object.assign(this.$data.sendForm, this.$options.data().sendForm);
        this.checked=false;
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
        this.query(this.$store.state.uncompletedFITResultPageNo,this.$store.state.uncompletedFITResultPageSize)
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
            this.query(this.$store.state.uncompletedFITResultPageNo,this.$store.state.uncompletedFITResultPageSize)
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
          this.$store.commit('get_uncompletedFITResultPageSize', pageSize)
          this.query(this.$store.state.uncompletedFITResultPageNo,pageSize);
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        //this.queryResult.pageNo = currentPage
        this.$store.commit('get_uncompletedFITResultPageNo',currentPage)
        this.query(currentPage,this.$store.state.uncompletedFITResultPageSize);
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
    text-align: center;
    margin-bottom:20px;
  }
  .resultInfo{
    text-align: center;
  }
  .dialog-footer{
    width:140px;
    margin:0 auto;
  }
  .filter-item {
    width: 200px;
    margin-right: 10px;
  }
</style>
