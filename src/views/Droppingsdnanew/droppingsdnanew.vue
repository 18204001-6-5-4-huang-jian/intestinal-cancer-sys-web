<template>
    <div slot="right" class="content-page" v-if="droppings_new_page_list">
    <div class="content">
      <div class="filter-container">
         <router-link to="/home/home" v-if="$store.state.hospitalType == 1">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
        <router-link to="/home/areaHome" v-if="$store.state.hospitalType == 2">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
         <router-link to="/home/countryHome" v-if="$store.state.hospitalType == 3">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
        <el-form :model="formData" class="clearfix" :inline="true">
           <div>
              <el-input style="width: 200px;" v-model.trim="formData.name" clearable placeholder="姓名" size="small"></el-input>
            <el-input style="width: 200px;" v-model.trim="formData.sid" clearable placeholder="SID" size="small"></el-input>
            <el-input style="width: 200px;" v-model.trim="formData.phone" clearable placeholder="手机号" size="small"></el-input>
            <el-select v-model="formData.group" placeholder="分组方案" size="small" class="filter-item" clearable>
              <el-option 
              v-for="(item,index) in group" 
              :key="index" 
              :value="item.id" 
              :label="item.name"></el-option>
            </el-select>
             <el-select v-model="formData.codeEntryStatus" placeholder="粪便编码录入状态" size="small" class="filter-item" clearable>
                <el-option v-for="(item,index) in inputStatus" 
                :key="index" 
                :value="item.id" 
                :label="item.name">
                </el-option>
          </el-select>
             <el-select v-model="formData.followState" placeholder="随访状态" size="small" class="filter-item" clearable>
              <el-option v-for="(item,index) in followStatus" 
              :key="index" 
              :value="item.id" 
              :label="item.name">
              </el-option>
            </el-select>
             <el-select v-model="formData.followGroup" clearable placeholder="随访分组" size="small" class="filter-item" clearable>
              <el-option v-for="(item,index) in followGroup" 
              :key="index" 
              :value="item.id" 
              :label="item.name"></el-option>
            </el-select>
           </div>
           <div>
              <el-cascader
              v-if="$store.state.hospitalType == 1"
              style="width: 200px;margin-right: 15px;"
              :options="$store.state.regionOptions"
              placeholder="所属区"
              :props="propsCommunity"
              v-model="ids"
              size="small"
              filterable
              :show-all-levels="false"
              change-on-select
              @change="getQcIdcommunity"
           ></el-cascader>
              <el-cascader
              v-if="$store.state.hospitalType == 2"
              style="width: 200px;margin-right: 15px;"
              clearable
              :options="$store.state.regionOptions"
              placeholder="所属区"
              :props="props"
              v-model="ids"
              size="small"
              filterable
              :show-all-levels="false"
              change-on-select
              @change="getQcId"
           ></el-cascader>
             <el-cascader
              v-if="$store.state.hospitalType == 3"
              style="width: 200px;margin-right: 15px;"
              clearable
              :options="$store.state.regionOptions"
              placeholder="所属地区"
              :props="props"
              v-model="ids"
              size="small"
              filterable
              :show-all-levels="false"
              change-on-select
              @change="getQcIdCountty"
             >
           </el-cascader>
           </div>
            <div style="margin-top:10px;">
           <el-button  size="small" type="primary" icon="el-icon-search" @click="query()">查询</el-button>
           <el-button  type="primary" size="small" icon="el-icon-close"  @click="reset()">重置</el-button>
          </div>
          <div class="table-btn-grooup">
            <el-button  size="small" type="primary" icon="el-icon-plus" @click="add()">新增</el-button>
          </div>
        </el-form>
      </div>
       <!-- <div class="table-btn-grooup">
          <el-button  size="small" type="primary" icon="el-icon-plus" @click="add()" >新增</el-button>
        </div> -->
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
             label="随访状态"
           >
             <template slot-scope="scope">
               <span>{{scope.row.followState | followState}}</span>
             </template>
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
            label="总体状态"
          >
          <template slot-scope="scope">
            <span>{{scope.row.overallStatusCy | overallStatusCy}}</span>
        </template>
          </el-table-column>
          <el-table-column
            prop="codeEntryStatus"
            label="粪便编码录入状态"
          >
           <template slot-scope="scope">
              <span>{{scope.row.codeEntryStatus | codeEntryStatusNew}}</span>
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
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            width="120"
          >
            <template slot-scope="scope">
                  <el-button type="text" v-if="scope.row.codeEntryStatus == 1" @click="input(scope.row)">录入</el-button>
                  <el-button type="text" v-if="scope.row.codeEntryStatus == 1" @click="noProvide(scope.row)">未提供</el-button>
                  <el-button type="text" v-if="scope.row.codeEntryStatus == 2" @click="Edit(scope.row)">编辑</el-button>
                  <el-button type="text" v-if="scope.row.codeEntryStatus == 2" @click="View(scope.row)">查看</el-button>
                  <el-button type="text" v-if="scope.row.codeEntryStatus == 2" @click="Delete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
         <el-row>
          <el-col :span="10"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="14"><div class="grid-content bg-purple">
            <div class="block" style="margin-top: 18px">
              <el-pagination
                @size-change="pageSizeChange"
                @current-change="currentPageChange"
                :current-page="$store.state.droppingsDnaNewPageNo"
                :page-sizes="[10, 20, 50, 100]"
                v-bind:page-size="$store.state.droppingsDnaNewPageSize"
                layout="total, sizes, prev, pager, next, jumper"
                v-bind:total="queryResult.totalPageCount">
              </el-pagination>
            </div>
          </div>
          </el-col>
        </el-row>
        <!-- 新增dialog -->
         <el-dialog title="" :visible.sync="dialogFormVisible" :show-close="false" width="600px" @close="handleClose">
          <el-form ref="dialogform" :model="dialogform" :inline="false" :rules="dialogformRules">
            <el-form-item label="SID:" label-width="160px" prop="sid">
              <el-input style="width:300px;" v-model="dialogform.sid" autocomplete="off" @blur="blurSid()" :disabled="disabledSid" clearable></el-input>
              <span class="vertify-span" @click.prevent="vertifySid()" :class="{'vertify-span-gray':disabledSid}">校验</span>
            </el-form-item>
            <el-form-item label="姓名:" label-width="160px" prop="name">
              <el-input style="width:300px;" v-model="dialogform.name" autocomplete="off" :disabled="disabledName" clearable></el-input>
            </el-form-item>
             <el-form-item label="粪便编码:" label-width="160px" prop="code">
              <el-input style="width:300px;" v-model="dialogform.code" autocomplete="off" :disabled="disabled" clearable></el-input>
            </el-form-item>
            <el-form-item label="发放经手人工作编码:" label-width="160px" prop="workcode">
              <el-input style="width:300px;" v-model="dialogform.workcode" autocomplete="off" :disabled="disabled" clearable></el-input>
            </el-form-item>
             <el-form-item label="发放日期:" label-width="160px" prop="date">
               <el-date-picker
                  :disabled="disabled"
                  v-model="dialogform.date"
                  type="date"
                  clearable
                  placeholder="选择日期"
                  style="width:300px;">
                </el-date-picker>
             </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer" style="text-align:center;">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" :disabled="disabled" @click="adddialogform('dialogform')">提 交</el-button>
          </div>
        </el-dialog>
        <!-- 录入dialog -->
          <el-dialog title="" :visible.sync="dialoginputVisible" :show-close="false" width="600px">
          <el-form ref="dialoginput" :model="dialoginput" :inline="false" :rules="dialoginputRules">
            <el-form-item label="SID:" label-width="160px" prop="sid">
              <el-input style="width:300px;" v-model="dialoginput.sid" autocomplete="off" disabled="disabled" clearable></el-input>
            </el-form-item>
            <el-form-item label="姓名:" label-width="160px" prop="name">
              <el-input style="width:300px;" v-model="dialoginput.name" autocomplete="off" disabled="disabled" clearable></el-input>
            </el-form-item>
             <el-form-item label="粪便编码:" label-width="160px" prop="code">
              <el-input style="width:300px;" v-model="dialoginput.code" autocomplete="off" clearable @blur="blurdialoginput()"></el-input><br>
              <span style="color:red;" v-if="showredspan">该编码已被占用</span>
            </el-form-item>
            <el-form-item label="发放经手人工作编码:" label-width="160px" prop="workcode">
              <el-input style="width:300px;" v-model="dialoginput.workcode" autocomplete="off" clearable></el-input>
            </el-form-item>
             <el-form-item label="发放日期:" label-width="160px" prop="date">
               <el-date-picker
                  v-model="dialoginput.date"
                  type="date"
                  clearable
                  placeholder="选择日期"
                   style="width:300px;">
                </el-date-picker>
             </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer" style="text-align:center;">
            <el-button @click="dialoginputVisible = false">取 消</el-button>
            <el-button type="primary" @click="adddialoginput('dialoginput')">提 交</el-button>
          </div>
        </el-dialog>
        </div>
    </div>
</template>
<script>
import DICTIONARY from "@/utils/dictionary.js";
import moment from 'moment'
export default {
    data(){
        var validateFitCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('记录编码不能为空'));
        } else if (!(/^[A-Za-z0-9]{12}$/.test(value))) {
          callback(new Error('请输入12位数字或字母'));
        } else {
          callback();
        }
      };
        return{
           droppings_new_page_list:false,
           btnAuth:{

           },
           formData:{
              sid:'',
              name:'',
              phone:'',
              group:'',
              codeEntryStatus:'',
              followGroup:'',
              followState:'',
              communityDeptId:'',
              areaDeptId:'',
              loginName:''
           },
            queryResult: {
            pageNum: 1, //当前页
            pageSize: 10, //每页的条数
            totalPageCount: 0,
            tableData: []
            },
           group:DICTIONARY.group,
           inputStatus:DICTIONARY.inputStatusNew,
           followGroup:DICTIONARY.followGroup,
           followStatus: DICTIONARY.followStatus,
           dialogFormVisible:false,
           dialogform: {
              sid: '',
              name:'',
              code:'',
              workcode:'',
              date:''
            },
            dialogformRules:{
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
            disabled:false,
            disabledSid:false,
            disabledName:false,
            status:null, // 1 新增  2 编辑和录入
            EditId:'',
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
            props:{
                value: 'id',
                children: 'child',
                label:'name'
            },
            propsCommunity:{
               value: 'loginName',
               children: 'child',
               label:'name'
            },
            ids:[]
         }
    },
    created() {
      if(this.$store.state.hospitalType == 1){
            if(localStorage.getItem('communityType')=='true'){
              this.ids.push(localStorage.getItem('loginName'));
              this.formData.loginName=localStorage.getItem('loginName');
            }
         }
    },
    mounted() {
         let obj = this.checkPageAuth(this,"droppings_new_page_list",this.btnAuth) 
         this.formData.sid=this.$route.query.sid;
         this.query(this.$store.state.droppingsDnaNewPageNo,this.$store.state.droppingsDnaNewPageSize);
    },
    methods: {
          getQcIdcommunity(value){
              this.formData.loginName =value[0]
          },
          //获取选中区
          getQcId(value){
          this.formData.communityDeptId = null
          this.formData.loginName =null
          if(value.length==1){
            this.formData.communityDeptId = value[0]
            this.formData.loginName =null
          }else if(value.length == 2){
            this.formData.communityDeptId = value[0]
            for(let j = 0;j<this.$store.state.regionOptions.length;j++){
              if(value[0] == this.$store.state.regionOptions[j].id){
                for(let k=0;k<this.$store.state.regionOptions[j].child.length;k++){
                  if(value[1] == this.$store.state.regionOptions[j].child[k].id){
                    this.formData.loginName =this.$store.state.regionOptions[j].child[k].loginName
                  }
                }
              }
            }
          }else{
            this.formData.loginName = null;
          }
        },
        getQcIdCountty(value){
        //获取选中社区
        this.formData.communityDeptId = null
        this.formData.areaDeptId = null
        if(value.length==1){
          this.formData.areaDeptId = value[0]
          this.formData.communityDeptId=null
          this.formData.loginName =null
        }else if(value.length == 2){
          this.formData.areaDeptId = value[0]
          this.formData.communityDeptId = value[1]
          this.formData.loginName =null
        }else if(value.length == 3){
          this.formData.areaDeptId = value[0]
          this.formData.communityDeptId = value[1]
          for(let i =0;i<this.$store.state.regionOptions.length;i++){
            if(value[0] == this.$store.state.regionOptions[i].id){
              for(let j = 0;j<this.$store.state.regionOptions[i].child.length;j++){
                if(value[1] == this.$store.state.regionOptions[i].child[j].id){
                  for(let k=0;k<this.$store.state.regionOptions[i].child[j].child.length;k++){
                    if(value[2] == this.$store.state.regionOptions[i].child[j].child[k].id){
                      this.formData.loginName =this.$store.state.regionOptions[i].child[j].child[k].loginName
                    }
                  }
                }
              }
            }
          }
        }else{
           //点x清空 
             this.formData.loginName = null;
        }
        },
        query(pageNum, pageSize){
          let dataobj = Object.assign(
                {},
                this.formData,
                {
                  pageNum:pageNum,
                  pageSize:pageSize
                })
           $axios_http({
             url:'/base/hospital/stoolSampleList/query',
             data:dataobj,
             vueObj: this
           }).then((res)=>{
              if(res.data.statusMsg == 'success'){
                 this.queryResult.tableData = res.data.data.list;
                 this.queryResult.totalPageCount = res.data.data.total;
                 this.$store.commit('get_droppingsDnaNewPageNo',res.data.data.pageNum)
              }
           })
        },
        reset(){
          this.formData.sid = '';
          this.formData.name = '';
          this.formData.phone = '';
          this.formData.group = '';
          this.formData.codeEntryStatus = '';
          this.formData.followGroup = '';
          this.formData.followState = '';
          if(this.$store.state.hospitalType == 2 || this.$store.state.hospitalType == 3){
             this.ids = [];
          }
          let dataobj = {};
          if(this.$store.state.hospitalType == 1 && localStorage.getItem('communityType')=='true'){
               dataobj = {
                  sid:'',
                  name:'',
                  phone:'',
                  group:'',
                  codeEntryStatus:'',
                  pageNum:1,
                  pageSize:10,
                  loginName:localStorage.getItem('loginName')
               }
          }else{
              dataobj = {
                  sid:'',
                  name:'',
                  phone:'',
                  group:'',
                  codeEntryStatus:'',
                  loginName:'',
                  pageNum:1,
                  pageSize:10,
              }
          }
          $axios_http({
             url:'/base/hospital/stoolSampleList/query',
             data:dataobj,
             vueObj: this
           }).then((res)=>{
              if(res.data.statusMsg == 'success'){
                 this.queryResult.tableData = res.data.data.list;
                 this.queryResult.totalPageCount = res.data.data.total;
                 this.$store.commit('get_droppingsDnaNewPageNo',res.data.data.pageNum)
              }
           })
        },
        pageSizeChange(val){
           this.$store.commit('get_droppingsDnaNewPageSize', val);
           this.query(this.$store.state.droppingsDnaNewPageNo,val);
        },
        currentPageChange(val){
            this.$store.commit('get_droppingsDnaNewPageNo', val);
            this.query(val,this.$store.state.droppingsDnaNewPageSize);
        },
        noProvide(row){
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
        input(row){
          this.dialoginputVisible = true;
          this.dialoginput.sid = row.sid;
          this.dialoginput.name = row.name;
          this.dialoginput.code = '';
          this.dialoginput.workcode = '';
          this.dialoginput.date = '';
          this.inputid = row.id;
        },
        Edit(row){
          this.status = 2;
          this.EditId = row.id;
          $axios_http({
            url:'/base/hospital/stoolSampleInfo/query',
            data:{
              id:row.id
            },
            vueObj: this
          }).then((res) => {
            if(res.data.statusMsg == 'success'){
                this.disabled = false;
                this.disabledSid = true;
                this.disabledName = true;
                this.dialogFormVisible = true;
                this.dialogform.sid = res.data.data.sid;
                this.dialogform.name = res.data.data.name;
                this.dialogform.code = res.data.data.stoolCode;
                this.dialogform.workcode = res.data.data.personCode;
                this.dialogform.date = res.data.data.releaseDate;
            }
          })
        },
        View(row){
          $axios_http({
            url:'/base/hospital/stoolSampleInfo/query',
            data:{
              id:row.id
            },
            vueObj: this
          }).then((res) => {
            if(res.data.statusMsg == 'success'){
                this.disabled = true;
                this.disabledSid = true;
                this.disabledName = true;
                this.dialogFormVisible = true;
                this.dialogform.sid = res.data.data.sid;
                this.dialogform.name = res.data.data.name;
                this.dialogform.code = res.data.data.stoolCode;
                this.dialogform.workcode = res.data.data.personCode;
                this.dialogform.date = res.data.data.releaseDate;
            }
          })
        },
        Delete(row){
          this.$confirm('确定删除该受试者已录入的粪便编码（新）？', '', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              $axios_http({
                url:'/base/hospital/stoolSample/delete',
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
        add(){
          this.dialogform.sid = '';
          this.dialogform.name = '';
          this.dialogform.code = '';
          this.dialogform.workcode = '';
          this.dialogform.date = '';
          this.dialogFormVisible = true;
          this.disabled = false;
          this.disabledSid = false;
          this.disabledName = true;
          this.status = 1;
        },
        adddialogform(dialogform){
            this.$refs[dialogform].validate((valid) => {
              if(valid){
                 //校验粪便样本编码是否存在
                 let dataobj = {}
                 if(this.status == 1){
                    dataobj = {
                       stoolCode:this.dialogform.code,
                    }
                 }else{
                   dataobj = {
                      stoolCode:this.dialogform.code,
                      id:this.EditId
                   }
                 }
                 $axios_http({
                   url:'/base/hospital/stoolSampleCode/query',
                   data:dataobj,
                   vueObj: this
                 }).then((res)=>{
                   if(res.data.data == false){
                     let url = '';
                    if(this.status == 1){
                      // 新增
                      url = '/base/hospital/stoolSample/add'
                    }else if(this.status == 2){
                      // 编辑
                      url = '/base/hospital/stoolSample/save'
                    }
                    $axios_http({
                    url:url,
                    data:{
                      sid:this.dialogform.sid,
                      name:this.dialogform.name,
                      stoolCode:this.dialogform.code,
                      personCode:this.dialogform.workcode,
                      releaseDate:moment(this.dialogform.date).format('YYYY-MM-DD'),
                      id:this.status == 1?'':this.EditId
                    },
                    vueObj: this
                  }).then((res)=>{
                    if(res.data.statusMsg == 'success'){
                        this.dialogFormVisible = false;
                        this.$refs[dialogform].resetFields();
                        this.query(1,10);
                      }else{
                          this.$message({
                            message:res.data.statusMsg,
                            type: 'warning'
                          });
                        }
                      })
                    }else{
                      this.$message({
                         message:'粪便编码重复',
                         type:'warning'
                      })
                    }
                 })
              }
            })
        },
        vertifySid(){
            if(this.dialogform.sid == ''){
                 this.$message({
                    message: '请输入SID',
                    type: 'warning'
                  });
                  return false
            }
            $axios_http({
              url:'/base/hospital/stoolSample/check',
              data:{
                sid:this.dialogform.sid
              },
              vueObj: this
            }).then((res) => {
               if(res.data.statusMsg == 'success'){
                   this.$message({
                    message: 'SID校验成功',
                    type: 'success'
                  });
                $axios_http({
                  url:'/base/hospital/person/detail/getSid',
                  data:{
                    sid:this.dialogform.sid
                  },
                  vueObj: this
                }).then((res) => {
                  if(res.data.statusMsg == 'success'){
                    this.dialogform.name = res.data.data[0].name;
                  }
                })
               }
            })
        },
        blurSid(){
          // console.log('999')
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
        adddialoginput(dialogform){
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
                        this.$refs[dialogform].resetFields();
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
        },
        handleClose(){
          this.$refs.dialogform.resetFields();
        }
    },
}
</script>
<style lang="scss" scoped>
      .content {
        background: #fff;
        padding: 10px;
        }
        .el-form{
        margin-top: 20px;
        }
        .el-form .el-input{
            /* float: left; */
            margin-right: 10px;
            margin-bottom: 10px;
        }
        .el-form .el-select{
            /* float: left; */
            margin-right: 10px;
            margin-bottom: 0.5px;
        }
        .vertify-span{
          cursor: pointer;
          color: #409EFF;
        }
        .vertify-span-gray{
          display: none;
        }
        .table-btn-grooup{
          margin-top:20px;
          margin-bottom:10px;
        }
</style>


