<template>
    <div slot="right" class="content-page" v-if="uninput_Crap_Code_page">
         <div class="content">
           <div class="filter-container">
             <h4>待办-待录入粪便编码（新）</h4>
              <p>&nbsp;</p>
              <router-link to="/home/home">
                <el-button size="mini" class="return-home">返 回</el-button>
              </router-link>
                <el-form :model="form" :inline="true" class="clear">
                <div>
                    <el-input style="width: 200px;" size="small" class="filter-item" placeholder="姓名" v-model="form.name">
                    </el-input>
                     <el-input style="width: 200px;" size="small" class="filter-item" placeholder="SID" v-model="form.sid">
                   </el-input>
                    <el-input style="width: 200px;" size="small" class="filter-item" placeholder="手机号" v-model="form.phone">
                   </el-input>
                </div>
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
                       <el-select v-model="form.group" clearable placeholder="分组方案" size="small" class="filter-item">
                          <el-option value="A"  v-bind:key="1" label="A组"></el-option>
                          <el-option value="B"  v-bind:key="2" label="B组"></el-option>
                          <el-option value="C"  v-bind:key="3" label="C组"></el-option>
                          <el-option value="Cg" v-bind:key="4" label="C组高危"></el-option>
                          <el-option value="Cd" v-bind:key="5" label="C组低危"></el-option>
                    </el-select>
                      <el-select v-model="form.followGroup" clearable placeholder="随访分组" size="small" class="filter-item">
                      <el-option v-for="(item,index) in followGroup" 
                      :key="index" 
                      :value="item.id" 
                      :label="item.name"></el-option>
                    </el-select>
                </div>
                <div style="margin-top:2px;">
                     <el-button size="small" type="primary" icon="el-icon-search" @click="query(1,$store.state.uninputCrapCodeListPageSize)"
                       v-if="btnAuth.subjectsList_query_btn">查询
                      </el-button>
                      <el-button type="primary" size="small" icon="el-icon-close" @click="reset()"
                       v-if="btnAuth.subjectsList_query_btn">重置
                       </el-button>
                </div>
                </el-form>
           </div>
           <div>
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
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="areaName"
            label="地区医院"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="communityName"
            label="所属社区"
          >
          </el-table-column>
          <el-table-column
            prop="followGroup"
            label="随访分组"
            width="120"
          >
            <template slot-scope="scope">
              <span>{{scope.row.followGroup | followGroup}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="group"
            label="分组方案"
            width="120"
          >
           <template slot-scope="scope">
              <span>{{scope.row.group | group}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="overallStatusCy"
            label="年度状态"
          >
          <template slot-scope="scope">
            <span>{{scope.row.overallStatusCy | overallStatusCy}}</span>
        </template>
          </el-table-column>
          <!-- <el-table-column
            prop="codeEntryStatus"
            label="粪便编码录入状态"
          >
           <template slot-scope="scope">
              <span>未录入</span>
            </template>
          </el-table-column>
           <el-table-column
            prop="codeEntryTime"
            label="录入时间"
          >
          <template slot-scope="scope">
              <span v-if="scope.row.codeEntryTime">{{scope.row.codeEntryTime | dateformat}}</span>
            </template>
          </el-table-column>
           <el-table-column
            prop="stoolCode"
            label="粪便编码"
          >
          </el-table-column> -->
          <el-table-column
            label="操作"
            fixed="right"
            width="120"
          >
            <template slot-scope="scope">
                  <el-button type="text" @click="entry(scope.row)">录入</el-button>
                  <el-button type="text" @click="noprovide(scope.row)">未提供</el-button>
            </template>
          </el-table-column>
        </el-table>
                  <!-- 分页 -->
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
                                :current-page="$store.state.uninputCrapCodeListPageNo"
                                :page-sizes="[10, 20, 50, 100]"
                                v-bind:page-size="$store.state.uninputCrapCodeListPageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                v-bind:total="queryResult.totalPageCount">
                              </el-pagination>
                            </div>
                          </div>
                        </el-col>
                      </el-row>
           </div>
          <!-- 录入dialog -->
          <el-dialog title="" :visible.sync="dialoginputVisible" :show-close="false" width="600px">
          <el-form ref="dialoginput" :model="dialoginput" :inline="false" :rules="dialoginputRules">
            <el-form-item label="SID:" label-width="100px" prop="sid">
              <el-input style="width:300px;" v-model="dialoginput.sid" autocomplete="off" disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="姓名:" label-width="100px" prop="name">
              <el-input style="width:300px;" v-model="dialoginput.name" autocomplete="off" disabled="disabled"></el-input>
            </el-form-item>
             <el-form-item label="记录编码:" label-width="100px" prop="code">
              <el-input style="width:300px;" v-model="dialoginput.code" autocomplete="off" @blur="blurdialoginput()"></el-input><br>
              <span style="color:red;" v-if="showredspan">该编码已被占用</span>
            </el-form-item>
            <el-form-item label="发放经手人工作编码:" prop="workcode">
              <el-input style="width:300px;" v-model="dialoginput.workcode" autocomplete="off"></el-input>
            </el-form-item>
             <el-form-item label="发放日期:" label-width="100px" prop="date">
               <el-date-picker
                  v-model="dialoginput.date"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
             </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialoginputVisible = false">取 消</el-button>
            <el-button type="primary" @click="add('dialoginput')">提 交</el-button>
          </div>
        </el-dialog>
         </div>
    </div>
</template>
<script>
import moment from 'moment'
import DICTIONARY from "@/utils/dictionary.js";
export default {
    data(){
        var validateFitCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('DNA编号不能为空'));
        } else if (!(/^[A-Za-z0-9]{12}$/.test(value))) {
          callback(new Error('请输入12位数字或字母'));
        } else {
          callback();
        }
      };
        return{
            uninput_Crap_Code_page:false,
            btnAuth:{
               subjectsList_query_btn:false,
               subjectsList_ADD_btn:false,
               subjectsList_DELETE_btn:false,
               subjectsList_EXCEL_btn:false
            },
            form:{
                name:'',
                sid:'',
                phone:'',
                group:'',
                loginName:'',
                followGroup:''
            },
            followGroup: DICTIONARY.followGroup,
            queryResult: {
                pageNo: 1,//当前页
                pageSize: 10,//每页的条数
                totalPageCount: 0,
                tableData: []
            },
           dialoginputVisible:false,
           dialoginput: {
              sid: '',
              name:'',
              code:'',
              workcode:'',
              date:''
            },
            dialoginputRules:{
               sid:[
                  { required: true, message: '请输入SID', trigger: 'blur' },
               ],
               name:[
                  { required: true, message: '请输入姓名', trigger: 'blur' },
               ],
               code:[
                 { required: true, message: '请输入记录编码', trigger: 'blur' },
                 {validator: validateFitCode, trigger: 'blur'}
               ],
               workcode:[
                  { required: true, message: '请输入发放人工作编号', trigger: 'blur' },
               ],
               date:[
                 { required: true, message: '请输入日期', trigger: 'blur' },
               ]
            },
             showredspan:false,
             inputid:'',
             pickerOptions: {
                disabledDate(time) {
                  return time.getTime() > Date.now();
                },
            },
              ids:[],
              props: {
              value: "loginName",
              children: "child",
              label: "name"
            },
        }
    },
    mounted() {
        let obj = this.checkPageAuth(this, "uninput_Crap_Code_page", this.btnAuth);
        this.query(this.$store.state.uninputCrapCodeListPageNo,this.$store.state.uninputCrapCodeListPageSize);
    },
    methods: {
        getQcId(value){
            this.form.loginName = value[0];
        },
        query(pageNum,pageSize){
          let flag = {};
          let dataobj = {};
          if(this.$route.query.flag == 1){
              flag = {delayFlag:1}
          }else{
              flag = {}
          }
           if (localStorage.getItem("communityType") == "true") {
               this.ids.push(localStorage.getItem("loginName"));
               this.form.loginName = localStorage.getItem("loginName");
               dataobj = Object.assign({},flag,this.form,{pageNo:pageNum,pageSize:pageSize})
           }else{
               dataobj = Object.assign({},flag,this.form,{pageNo:pageNum,pageSize:pageSize})
           }
            $axios_http({
              url:'/base/hospital/stoolSampleCode/notEntry',
              data:dataobj,
              vueObj:this
            }).then((res) => {
                 if(res.data.statusMsg == 'success'){
                   this.queryResult.tableData = res.data.data.list;
                   this.queryResult.totalPageCount = res.data.data.total;
                   this.$store.commit('get_uninputCrapCodeListPageNo',res.data.data.pageNum)
                 }
            })
        },
        reset(){
          this.form.sid = '';
          this.form.name = '';
          this.form.phone ='';
          this.form.group = '';
          this.form.followGroup = '';
          let flag = {};
          let dataobj = {};
          if(this.$route.query.flag == 1){
              flag = {delayFlag:1}
          }else{
              flag = {}
          }
           if (localStorage.getItem("communityType") == "true") {
               this.ids.push(localStorage.getItem("loginName"));
               this.form.loginName = localStorage.getItem("loginName");
               dataobj = Object.assign({},flag,this.form,{pageNo:1,pageSize:10})
           }else{
               dataobj = Object.assign({},flag,this.form,{pageNo:1,pageSize:10})
           }
          $axios_http({
              url:'/base/hospital/stoolSampleCode/notEntry',
              data:dataobj,
              vueObj:this
            }).then((res) => {
                 if(res.data.statusMsg == 'success'){
                   this.queryResult.tableData = res.data.data.list;
                   this.queryResult.totalPageCount = res.data.data.total;
                   this.$store.commit('get_uninputCrapCodeListPageNo',res.data.data.pageNum)
                 }
            })
        },
        pageSizeChange(val){
           this.$store.commit('get_uninputCrapCodeListPageSize', val);
           this.query(this.$store.state.uninputCrapCodeListPageNo,val);
        },
        currentPageChange(val){
           this.$store.commit('get_uninputCrapCodeListPageNo', val);
           this.query(val,this.$store.state.uninputCrapCodeListPageSize);
        },
        entry(row){
          this.dialoginputVisible = true;
          this.dialoginput.sid = row.sid;
          this.dialoginput.name = row.name;
          this.inputid = row.id;
        },
        noprovide(row){
          this.$confirm('该受试者未提供粪便样本（新）？', '', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              $axios_http({
                url:'/base/hospital/stoolSample/noProvided',
                data:{
                  id:row.id
                },
                vueObj: this
              }).then((res) => {
                  if(res.data.statusMsg == 'success'){
                    this.query(1,10);
                  }
              })
          }).catch(() => {
            
          });
        },
        blurdialoginput(){
          //校验粪便样本编码是否存在
            if(this.dialoginput.code != ''){
                $axios_http({
                   url:'/base/hospital/stoolSampleCode/query',
                   data:{
                     stoolCode:this.dialoginput.code
                   },
                   vueObj: this
                 }).then((res) => {
                    if(res.data.data == true){
                        this.showredspan = true;
                    }else{
                        this.showredspan = false;
                    }
                 })
            }
        },
        add(dialogform){
             this.$refs[dialogform].validate((valid) => {
               if(valid && this.showredspan == false){
                  $axios_http({
                    url:'/base/hospital/stoolSample/save',
                    data:{
                      sid:this.dialoginput.sid,
                      name:this.dialoginput.name,
                      stoolCode:this.dialoginput.code,
                      personCode:this.dialoginput.workcode,
                      releaseDate:moment(this.dialoginput.date).format('YYYY-MM-DD'),
                      id:this.inputid
                    },
                    vueObj: this
                  }).then((res)=>{
                    if(res.data.statusMsg == 'success'){
                        this.dialoginputVisible = false;
                        this.query(1,10);
                      }else{
                          this.$message({
                            message:res.data.statusMsg,
                            type: 'warning'
                          });
                        }
                      })
               }
         })
        }
    },
}
</script>
<style lang="scss" scoped>
  .filter-item {
    width: 200px;
    margin-right: 10px;
  }
  .content {
    background: #fff;
    padding: 10px;
  }
   .return-home {
    text-align: center;
    float: left;
    margin-bottom: 20px;
  }
    .table-btn-grooup {
    margin-bottom: 10px;
    margin-top: 20px;
  }
</style>


