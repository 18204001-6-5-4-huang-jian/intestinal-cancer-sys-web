<template>
  <div slot="right" class="content-page" v-if="uncompletedFITNumber_page">
    <div class="content">
      <div class="filter-container" >
        <h4>待办-未录入FIT编号</h4>
        <p>&nbsp;</p>
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
            <!-- <el-select v-model="qc.followState" clearable placeholder="随访状态" size="small" class="filter-item">
              <el-option v-for="(item,index) in followStatus" 
              :key="index" 
              :value="item.id" 
              :label="item.name"></el-option>
            </el-select> -->
          </div>
          <div style="margin-bottom: 20px;">
            <el-button  size="small" type="primary" icon="el-icon-search" @click="query(1,$store.state.uncompletedFITNumberPageSize)" v-if="btnAuth.uncompletedFITNumber_query_btn">查询</el-button>
            <el-button  type="primary" size="small" icon="el-icon-close" @click="reset" v-if="btnAuth.uncompletedFITNumber_query_btn">重置</el-button>
          </div>
        </el-form>
        <!--数据列表-->
        <el-table
          :data="queryResult.tableData"
          border
          :default-sort = "{prop: 'inGroupDate', order: 'descending'}"
          style="width: 100%;margin-top:10px">
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
            sortable
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
          <!-- <el-table-column
            label="随访状态"
            >
            <template slot-scope="scope">
              <span>{{scope.row.followState | followState}}</span>
            </template>
          </el-table-column> -->
          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <el-button type="text" class="btnStyle" size="small" v-if="btnAuth.uncompletedFITNumber_add_btn" @click="inputCodeDialogIsShow(scope.row.id,scope.row.sid)">录入FIT编号</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog :visible.sync="inputCodeDialog">
          <el-form :model="addCodeForm" :rules="addCodeFormRules" ref="addCodeForm">
            <el-form-item label="工作人员编码" :label-width="formLabelWidth" prop="releasePersonCode">
              <el-input v-model="addCodeForm.releasePersonCode" auto-complete="off" class="lineWidth"></el-input>
            </el-form-item>
            <el-form-item label="发放日期" :label-width="formLabelWidth" prop="releaseDate">
              <el-date-picker

                v-model="addCodeForm.releaseDate"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="发放日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="噗噗管ID" :label-width="formLabelWidth" prop="fitCode">
              <el-input v-model="addCodeForm.fitCode" auto-complete="off" class="lineWidth"></el-input>
            </el-form-item>
            <div class="dialog-footer">
              <el-button size="small" @click="inputCode('addCodeForm')" type="primary">确 定</el-button>
              <el-button size="small" @click="inputCodeDialog=false">取 消</el-button>
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
                :current-page="$store.state.uncompletedFITNumberPageNo"
                :page-sizes="[10, 20, 50, 100]"
                v-bind:page-size="$store.state.uncompletedFITNumberPageSize"
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
      var validateFitCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('噗噗管ID不能为空'));
        } else if (!(/^[A-Za-z0-9]{8}$/.test(value))) {
          callback(new Error('请输入8位数字或字母'));
        } else {
          callback();
        }
      };
      return {
        followGroup:DICTIONARY.followGroup,
        followStatus: DICTIONARY.followStatus,
        //权限判定
        inputCodeDialog:false,
        uncompletedFITNumber_page:false,
        btnAuth:{
          buttonRoleAdd:false,
          uncompletedFITNumber_add_btn:false,
          buttonRoleDel:false,
          uncompletedFITNumber_query_btn:false,
          buttonUserRoleDis:false
        },
        id:'',
        sid:'',
        //查询条件
        "qc":{
          "sid":'',
          "name":'',
          "phone":'',
          "group":'',
          "loginName":null,
          "followGroup":null,
          "followState":null
        },
        props: {
          value: 'loginName',
          children: 'child',
          label:'name'
        },
        ids:[],
        addCodeForm:{
          'releasePersonCode':'',
          'releaseDate':'',
          'fitCode':''
        },
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
        formLabelWidth: '130px',
        addCodeFormRules:{
          releasePersonCode:[
            {required:true,message:'必填',trigger:'blur'},
          ],
          releaseDate:[
            {required:true,message:'必填',trigger:'blur'}
          ],
          fitCode:[
            {required:true,message:'必填',trigger:'blur'},
            {validator: validateFitCode, trigger: 'blur'}
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

      let obj = this.checkPageAuth(this,"uncompletedFITNumber_page",this.btnAuth);
      this.query(this.$store.state.uncompletedFITNumberPageNo,this.$store.state.uncompletedFITNumberPageSize);;
    },
    beforeDestroy(){
      this.$store.state.uncompletedFITNumberPageNo=1;
      this.$store.state.uncompletedFITNumberPageSize=10;
    },
    methods:{
      //获取选中区
      getQcId(value){
        this.qc.loginName =value[0]
      },
      //查询
      query(pageNo,pageSize){
        $axios_http({
          url:"/base/hospital/person/notentry/fitcode/query",
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
          this.$store.commit('get_uncompletedFITNumberPageNo',pageNo)
          this.queryResult.tableData=res.data.data;

          //this.$store.commit('update_list',res.data.data);

          this.queryResult.totalPageCount=res.data.pageInfo.totalPageCount//获取总共多少页
          this.queryResult.totalRowCount=res.data.pageInfo.totalRowCount//获取总共条数
        })
      },
      inputCodeDialogIsShow(id,sid){
        this.id=id;
        this.sid=sid;
        this.inputCodeDialog=true;
      },
      inputCode(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            $axios_http({
              url:"/base/fit/result/code/entry",
              data:{
                id:this.id,
                sid:this.sid,
                releasePersonCode:this.addCodeForm.releasePersonCode,
                releaseDate:this.addCodeForm.releaseDate,
                fitCode:this.addCodeForm.fitCode
              },
              vueObj:this
            }).then((res)=>{
              $successMsg(this,"编码录入成功")
              this.query(this.$store.state.uncompletedFITNumberPageNo,this.$store.state.uncompletedFITNumberPageSize);;
              this.inputCodeDialog=false;
              Object.assign(this.$data.addCodeForm, this.$options.data().addCodeForm)
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
        this.query(this.$store.state.uncompletedFITNumberPageNo,this.$store.state.uncompletedFITNumberPageSize);
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
            this.query(this.$store.state.uncompletedFITNumberPageNo,this.$store.state.uncompletedFITNumberPageSize);
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
          this.$store.commit('get_uncompletedFITNumberPageSize', pageSize)
          this.query(this.$store.state.uncompletedFITNumberPageNo,pageSize);
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        //this.queryResult.pageNo = currentPage
        this.$store.commit('get_uncompletedFITNumberPageNo',currentPage)
        this.query(currentPage,this.$store.state.uncompletedFITNumberPageSize);
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
    width:200px;
    margin-right:10px
  }
   .lineWidth{
    width: 50%;
  }
</style>
