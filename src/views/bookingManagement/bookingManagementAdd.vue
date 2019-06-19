<template>
    <div v-if="bookingManagementAdd_page">
    <div class="titTop top">
      <span class="title">预约基本设置</span>
    </div>
     <el-form :inline="true" :model="formData" class="demo-form-inline" :rules="formDataRules" ref="formDataRules" label-width="140px">
         <el-row>
             <el-form-item label="检查项目：">
                 <div>结肠镜检查</div>
            </el-form-item>
         </el-row>
         <el-row>
              <el-form-item label="放号时间："  prop="valueTime">
                <el-date-picker
                v-model="formData.valueTime"
                size="small"
                type="daterange"
                :clearable="false"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="changePicker"
                :picker-options="pickerOptions"
                :default-time="['00:00:00', '23:59:59']">
                </el-date-picker>
            </el-form-item>
         </el-row>
         <el-row>
             <el-form-item label="放号规则："  :prop="formData.weeks.length==0?'ruleType':''">
                <el-radio v-model="formData.ruleType" @change="changeRuleType" label="1">每天</el-radio>
            </el-form-item>
           <el-form-item>
                <el-checkbox-group v-model="formData.weeks"  style="padding-left:10px;height:auto;">
                    <el-checkbox v-for="item in weeks" :label="item.id" :key="item.id" @change="changeWeeks">{{item.name}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
         </el-row>
         <el-row>
           <el-form-item label="就诊科室：" prop="examinationPlace">
             <el-input v-model="formData.examinationPlace" clearable size="small" @change="changeExaminationPlace"></el-input>
        </el-form-item>
         </el-row>
         <el-row>
           <el-form-item label="预约规则：" prop="issueType">
                <el-radio-group v-model="formData.issueType" @change="changeIssueType"> 
                    <el-radio  label="1">已选择社区共用</el-radio>
                     <el-radio label="2">按社区/区指定数量分配</el-radio>
                </el-radio-group>
             </el-form-item>
         </el-row>
          <el-row>
               <el-form-item label="提交员签字：" prop="signature">
                     <el-input v-model="formData.signature" auto-complete="off" ref="signature" size="small" clearable @change="changeSignature"></el-input>
              </el-form-item>
            </el-row>
         <!-- 时间段 -->
         <el-row style="margin-bottom:10px;">
           <span>预约时间段：</span>
         </el-row>
          <el-row v-for="(x,index) in formData.hosAllocationRuleTimeInfoDtos" :key="index">
                <el-form :inline="true" :model="x" class="demo-form-inline" :ref="'formInlinelist'+index" :rules="formInlinelist">
                    <el-row>
                         <el-col :span="5">
                            <el-form-item label="开始时间:"  prop="beginTime" style="margin-left:30px;">
                               <el-time-select
                                size="small"
                                @focus="focusFormData(index)"
                                @blur="blurFormData(x.beginTime,index,'begin')"
                                  placeholder="请选择"
                                  v-model="x.beginTime"
                                  :picker-options="options">
                                </el-time-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="结束时间:"  prop="endTime">
                              <el-time-select
                               size="small"
                               @blur="blurFormData(x.endTime,index,'end')"
                                placeholder="请选择"
                                v-model="x.endTime"
                                :picker-options="{
                                    start: '08:00',
                                    step: '00:30',
                                    end: '20:00',
                                    minTime: x.beginTime
                                }">
                              </el-time-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="数量:"  prop="num">
                                <el-input v-model="x.num" style="width:70px" size="small"></el-input>
                            </el-form-item>
                            <el-button type="text"  size="small" class="addBtn" @click="addTimeSlot(index)" title="添加"><i class="el-icon-plus"></i></el-button>
                            <el-button type="text" size="small" @click="delTimeSlot(index)" v-if="delBtnShow" title="删除"><i class="el-icon-delete"></i></el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </el-row>
            <el-row>
              <el-col :offset="11" :span="2">
                 <el-button type="primary" size="small" style="float:right;margin-right:30px;" @click="renderTable()">添加</el-button>
              </el-col>
            </el-row>
      </el-form>
    <div class="period" >
      <div class="titTop">
        <span slot="title" class="title">机构列表</span>
      </div>
      <el-table
        ref="multipleTable"
        :data="queryResult.selectOrganizeTableRow"
        border
        @selection-change="handleSelectionChange"
        style="width:100%">
          <el-table-column
          type="selection"
          width="50">
        </el-table-column>
         <el-table-column
          type="index"
          label="序号"
          width="50">
          </el-table-column>
          <el-table-column
          label="检查项目">
            <template slot-scope="scope">
                <span>结肠镜检查</span>
            </template>
          </el-table-column>
          <el-table-column
          prop="commdeptName"
          label="社区">
          </el-table-column>
          <el-table-column
          prop="ruleBeginToString"
          label="放号开始日期">
             <template slot-scope="scope">
                <span>{{scope.row.ruleBeginToString}}</span>
            </template>
          </el-table-column>
          <el-table-column
          prop="ruleEndToString"
          label="放号结束日期">
          <template slot-scope="scope">
                <span>{{scope.row.ruleEndToString}}</span>
            </template>
          </el-table-column>
          <el-table-column
          prop="num"
          label="数量">
          </el-table-column>
         <el-table-column
            label="操作"
            fixed="right"
            width="100"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" v-if="isShowBtn==false" disabled>查看</el-button>
              <el-button type="text" size="small" v-if="isShowBtn==true" @click="viewDetail(scope.row,scope.$index)">查看</el-button>
            </template>
          </el-table-column>
      </el-table>
      <div class="btns" style="margin:10px 0 0 10px;">
        <el-button type="primary" size="small" @click="submitForm()">提交</el-button>
        <el-button type="primary" size="small" @click="canclesubmit()" style="margin-left:10px;">取消</el-button>
      </div>
    </div>    
  </div>
</template>
<script>
import moment from 'moment'
import Data from '@/views/common/data'
import VALIDATE from '@/utils/vertify'
  export default {
    data () {
      return {
        bookingManagementAdd_page:false,
        pickerOptions:{
            disabledDate(time) {
               //设置可选择的日期为今天之后的一年内
                let curDate = (new Date()).getTime();
                let y = ((new Date().getFullYear())+1);
                let isLeap = (0===y%4) && (0===y%100) || (0===y%400);
                //平年365/闰年366天
                let days = isLeap ? 366 : 365;
                // 这里算出一年的毫秒数
                let day = days * 24 * 3600 * 1000;
                let dateRegion = curDate + day;
               // return time.getTime() < Date.now() - 8.64e7;
               return time.getTime() < Date.now() - 8.64e7 || time.getTime() > dateRegion
            }
          },
        options:{
          start: '08:00',
          step: '00:30',
          end: '20:00',
        },
        delBtnShow:false,
        formData:{
            valueTime:null,
            ruleType:null,//是否每天
            weeks:[],//星期信息
            examinationPlace:null,//就诊科室
            issueType:null,//发放类型 1-全部社区 2-某个社区
            signature:null,//提交人员签字
            ruleBeginToString:new Date(),//规则开始时间
            ruleEndToString:new Date(),//规则结束时间
            hosAllocationRuleTimeInfoDtos:[{
                beginTime:null,
                endTime:null,
                num:null
            }],
            hosAllocationRuleDeptInfoDtos:[{
              communityDeptId:null,
              beginTime:null,
              endTime:null,
              num:null
            }]
        },
        queryResult:{
            pageNum: 1,//当前页
            pageSize: 10,//每页的条数
            total: 0,
            selectOrganizeTableRow:[]
        },
        selectOrganizeTableRow:[],
        weeks:Data.weeks,
        formInlinelist:{
          // 预约时间段校验
          beginTime:[
            { required: true, message: '开始时间必填', trigger: 'blur' },
          ],
          endTime:[
            { required: true, message: '结束时间必填', trigger: 'blur' },
          ],
          num:[
            { required: true, message: '数量必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.countB0}
          ],
        },
        formDataRules:{
          valueTime:[
            { required: true, message: '放号时间必填', trigger: 'blur' },
          ],
          ruleType:[
            { required: true, message: '放号规则必选', trigger: 'change' },
          ],
          weeks:[
            { type: 'array', required: true, message: '请选择一个放号规则', trigger: 'change' }
          ],
          examinationPlace:[
            { required: true, message: '就诊科室必填', trigger: 'blur' },
          ],
          issueType:[
              { required: true, message: '预约规则必选', trigger: 'change' },
          ],
          signature:[
            { required: true, message: '提交员签字必填', trigger: 'blur' },
          ]
        },
        statusArray:[],
        isShowBtn:false
      }
    },
    watch:{
     $route(to,from){
         console.log(to.path);
     }
    },
    mounted(){
       let obj = this.checkPageAuth(this, "bookingManagementAdd_page", this.btnAuth);
       this.getList();
       //提交员赋值
       if(localStorage.getItem('tableData') && localStorage.getItem('signature')){
           this.formData.signature = localStorage.getItem('signature');
       }else{
              var session = sessionStorage.getItem("token").split(";")
              for(var i = 0; i < session.length; i++){
                var arr = session[i].split("=");
                if(arr[0]=='LOGINNAME'){
                  this.formData.signature = arr[1];
                  localStorage.setItem('signature',arr[1]);
                }
              }
        }
        // 放号时间和表格赋值
        if(localStorage.getItem('tableData')){
           let item = JSON.parse(localStorage.getItem('tableData'))[0];
           this.formData.valueTime = [item.ruleBeginToString,item.ruleEndToString];
           this.queryResult.selectOrganizeTableRow = JSON.parse(localStorage.getItem('tableData'));
        }else{
          //获取表格社区数据,显示默认表格
           this.getTableData();
        }
        //放号规则赋值
        if(localStorage.getItem('tableData') && localStorage.getItem('ruleType') == '1'){
          this.formData.ruleType = localStorage.getItem('ruleType');
          this.formData.weeks = [];
        }else if(localStorage.getItem('tableData') && localStorage.getItem('ruleType') == '2'){
           this.formData.ruleType = null;
           this.formData.weeks = JSON.parse(localStorage.getItem('weeks'));
        }
        //就诊科室赋值  
        if(localStorage.getItem('tableData') && localStorage.getItem('examinationPlace')){
          this.formData.examinationPlace = localStorage.getItem('examinationPlace')
        }
        //预约规则赋值
        if(localStorage.getItem('tableData') && localStorage.getItem('issueType')){
          this.formData.issueType = localStorage.getItem('issueType')
          if(localStorage.getItem('issueType') == 1){
            this.$nextTick(()=>{
              this.queryResult.selectOrganizeTableRow.forEach((row) => {
                    this.$refs.multipleTable.toggleRowSelection(row,true);
                });
            })
          }
        }
        //赋值时间段
        if(localStorage.getItem('tableData') && localStorage.getItem('hosAllocationRuleTimeInfoDtos')){
          this.formData.hosAllocationRuleTimeInfoDtos = JSON.parse(localStorage.getItem('hosAllocationRuleTimeInfoDtos'));
           if(this.formData.hosAllocationRuleTimeInfoDtos.length>1){
             this.delBtnShow = true;
           }else{
              this.delBtnShow = false;
           }
        }
        //赋值isRequest
        if(localStorage.getItem('isRequest') == 1){
          localStorage.setItem('isRequest',1)
        }else{
          localStorage.setItem('isRequest',0);
        }

        //赋值isShowBtn
        if(localStorage.getItem('isShowBtn')){
          this.isShowBtn = true;
        }
          
    },
    destroyed(){
      //离开当前页面后,table数据清空，以免回到该页面显示数据
    },
    methods:{
      getList(){
          $axios_http({
           url:'/base/hospital/community/allocation/querycommdepts',
           data:{},
           vueObj:this
         }).then((res)=>{
           if(res.data.statusCode === '000000'){
             this.statusArray = res.data.data;
            }
         })
      },
      getTableData(){
         $axios_http({
           url:'/base/hospital/community/allocation/querycommdepts',
           data:{},
           vueObj:this
         }).then((res)=>{
           if(res.data.statusCode === '000000'){
             //获取table默认数据
             localStorage.setItem('tableData','')
             this.queryResult.selectOrganizeTableRow = res.data.data;
            }
         })
      },
      canclesubmit(){
        if(localStorage.getItem('tableData')){
           localStorage.setItem('tableData','');
        }
        this.$router.go(-1);
      },
     //删除时间段
     delTimeSlot(index){
        //如果只有一条数据，隐藏删除按钮
        if(this.formData.hosAllocationRuleTimeInfoDtos.length <= 2){
            this.delBtnShow = false;
        }
        this.formData.hosAllocationRuleTimeInfoDtos.splice(index,1)
        localStorage.setItem('hosAllocationRuleTimeInfoDtos',JSON.stringify(this.formData.hosAllocationRuleTimeInfoDtos))
      },
    //增加时间段
     addTimeSlot(index){
      // 开始时间+结束时间填完才能新增
      if(this.formData.hosAllocationRuleTimeInfoDtos[index].beginTime==null || this.formData.hosAllocationRuleTimeInfoDtos[index].endTime==null || this.formData.hosAllocationRuleTimeInfoDtos[index].num==null){
          this.$message({
            type:'error',
            center:true,
            duration:5000,
            message:'开始时间和结束时间，数量不能为空'
          })
          return false;
       }
        if(this.formData.valueTime == null){
           this.$message({
            type:'error',
            center:true,
            duration:5000,
            message:'请填写放号时间'
          })
          return false;
        }
        if(this.formData.issueType == null){
           this.$message({
            type:'error',
            center:true,
            duration:5000,
            message:'请选择预约规则'
          })
          return false;
        }
        for(let k = 0;k<this.formData.hosAllocationRuleTimeInfoDtos.length;k++){
          if(this.formData.hosAllocationRuleTimeInfoDtos[k].endTime == '20:00'){
             this.$message({
                type:'error',
                center:true,
                duration:5000,
                message:'预约时间段已达最大跨度，请重新选择！'
              })
              return false;
              }
        }
        this.formData.hosAllocationRuleTimeInfoDtos.push({
                beginTime:null,
                endTime:null,
                num:null
          });
        // 控制删除按钮显示隐藏
        this.delBtnShow = true;
      },
      renderTable(){
        if(this.formData.valueTime == null){
           this.$message({
            type:'error',
            center:true,
            duration:5000,
            message:'请填写放号时间'
          })
          return false;
        }
        if(this.formData.issueType == null){
           this.$message({
            type:'error',
            center:true,
            duration:5000,
            message:'请选择预约规则'
          })
          return false;
        }
        for(let i=0;i<this.statusArray.length;i++){
           localStorage.removeItem(`hosAllocationRuleTimeInfoDtos${i}`,'')
        }
        for(let i = 0;i<this.formData.hosAllocationRuleTimeInfoDtos.length;i++){
            if(this.formData.hosAllocationRuleTimeInfoDtos[i].beginTime == null || this.formData.hosAllocationRuleTimeInfoDtos[i].endTime == null || this.formData.hosAllocationRuleTimeInfoDtos[i].num == null){
               this.$message({
                  type:'error',
                  center:true,
                  duration:5000,
                  message:'请填写预约时间段信息'
                })
                return false;
            }
            //预约时间段不能为小数
            if(String(this.formData.hosAllocationRuleTimeInfoDtos[i].num).indexOf('.') >= 0){
               this.$message({
                  type:'error',
                  center:true,
                  duration:5000,
                  message:'预约数量必须是整数'
                })
                return false;
            }
            //验证num不可以为字母
            var regPos = /^[1-9]+[0-9]*]*$/ ; // 非负整数
            if(!regPos.test(this.formData.hosAllocationRuleTimeInfoDtos[i].num)){
               this.$message({
                  type:'error',
                  center:true,
                  duration:5000,
                  message:'预约数量必须是数字'
                })
               return false;
            }
            //开始时间不能和结束时间相同
            if(this.formData.hosAllocationRuleTimeInfoDtos[i].beginTime == this.formData.hosAllocationRuleTimeInfoDtos[i].endTime){
                this.$message({
                  type:'error',
                  center:true,
                  duration:5000,
                  message:'预约时间段开始时间不能和结束时间相同'
                })
                return false;
            }
            if(this.formData.hosAllocationRuleTimeInfoDtos[i].beginTime>this.formData.hosAllocationRuleTimeInfoDtos[i].endTime){
                 this.$message({
                  type:'error',
                  center:true,
                  duration:5000,
                  message:'预约时间段开始时间不能大于结束时间'
                })
                return false;
            }

        }
        if(this.formData.ruleType == '1'){
           localStorage.setItem('ruleType',1)
        }else{
           localStorage.setItem('ruleType',2)
           localStorage.setItem('weeks',JSON.stringify(this.formData.weeks));
        }
        if(this.formData.issueType == 1){
           //全部社区
           for(let i=0;i<this.queryResult.selectOrganizeTableRow.length;i++){
             this.queryResult.selectOrganizeTableRow[i].ruleBeginToString = moment(this.formData.valueTime[0]).format('YYYY-MM-DD');
             this.queryResult.selectOrganizeTableRow[i].ruleEndToString = moment(this.formData.valueTime[1]).format('YYYY-MM-DD');
             this.queryResult.selectOrganizeTableRow[i].num = '----';
           }
             localStorage.setItem('issueType',this.formData.issueType);
             localStorage.setItem('hosAllocationRuleTimeInfoDtos',JSON.stringify(this.formData.hosAllocationRuleTimeInfoDtos));
             localStorage.setItem('tableData',JSON.stringify(this.queryResult.selectOrganizeTableRow))
             this.queryResult.selectOrganizeTableRow = JSON.parse(localStorage.getItem('tableData'));
             //全选
             this.$nextTick(()=>{
                this.queryResult.selectOrganizeTableRow.forEach((row) => {
                    this.$refs.multipleTable.toggleRowSelection(row,true);
                });
              })
              localStorage.setItem('isRequest',1)
              
        }else if(this.formData.issueType == 2){
              //某个社区
              var tempNumArray = [];
              for(var j=0;j<this.formData.hosAllocationRuleTimeInfoDtos.length;j++){
              //改变数量
              if(this.formData.hosAllocationRuleTimeInfoDtos[j].num != null){
                   tempNumArray.push(this.formData.hosAllocationRuleTimeInfoDtos[j].num)
                }
              }
              for(var i=0;i<this.queryResult.selectOrganizeTableRow.length;i++){
                //改变时间
                this.queryResult.selectOrganizeTableRow[i].ruleBeginToString = moment(this.formData.valueTime[0]).format('YYYY-MM-DD');
                this.queryResult.selectOrganizeTableRow[i].ruleEndToString = moment(this.formData.valueTime[1]).format('YYYY-MM-DD');
                this.queryResult.selectOrganizeTableRow[i].num = eval(tempNumArray.join('+'));
                this.queryResult.selectOrganizeTableRow[i].editShow = true;
              }
              localStorage.setItem('issueType',this.formData.issueType);
              localStorage.setItem('hosAllocationRuleTimeInfoDtos',JSON.stringify(this.formData.hosAllocationRuleTimeInfoDtos));
              localStorage.setItem('tableData',JSON.stringify(this.queryResult.selectOrganizeTableRow))
              this.queryResult.selectOrganizeTableRow = JSON.parse(localStorage.getItem('tableData'));
              localStorage.setItem('isRequest',1)
          }
          //使查看按钮可以查看
          this.isShowBtn = true;
      },
      submitForm(){
        if(this.formData.ruleType == null){
           this.formData.ruleType='2';
        }
        this.formData.hosAllocationRuleTimeInfoDtos.filter(item => {
          if(item.num){
            item.num = item.num;
          }
        })
           //某个社区，需要自己手动选择
        this.formData.hosAllocationRuleDeptInfoDtos = this.selectOrganizeTableRow;
        // console.log(this.statusArray)
        for(let i =0;i<this.statusArray.length;i++){
          for(let j = 0;j<this.formData.hosAllocationRuleDeptInfoDtos.length;j++){
            if(this.formData.hosAllocationRuleDeptInfoDtos[j].commdeptName == this.statusArray[i].commdeptName){
              this.formData.hosAllocationRuleDeptInfoDtos[j].communityDeptId = this.statusArray[i].id;
            }
          }
        }
        // console.log( this.formData.hosAllocationRuleDeptInfoDtos);
        // debugger
        this.formData.hosAllocationRuleDeptInfoDtos.length && this.formData.hosAllocationRuleDeptInfoDtos.filter((item) => {
          item.communityDeptId = item.communityDeptId;
          if(item.ruleBeginToString){
              item.beginTime = item.ruleBeginToString;
          }else{
              item.beginTime = '';
          }
          if(item.ruleEndToString){
            item.endTime = item.ruleEndToString;
          }else{
            item.endTime = '';
          }
          if(item.num == '----'){
            item.num = '';
          }else if(item.num){
            item.num = item.num;
          }else{
            item.num = '';
          }
          delete item.id;
          delete item.ruleBeginToString;
          delete item.ruleEndToString;
        })
         // 校验是否全部通过
        let validd = true
        this.$refs.formDataRules.validate((valid) => {
          if (!valid){
            validd = false
          }
        })
        if(this.formData.hosAllocationRuleTimeInfoDtos && this.formData.hosAllocationRuleTimeInfoDtos.length){
          for(var i=0;i<this.formData.hosAllocationRuleTimeInfoDtos.length;i++){
            this.$refs['formInlinelist'+i][0].validate((valid) => {
              if (!valid){
                validd = false
              }
            })
          }
        }
        if (validd) {
           if(this.formData.hosAllocationRuleDeptInfoDtos.length == 0){
            this.$message({
                type: 'error',
                center:true,
                duration:5000,
                message: '所选机构列表不能为空!'
            });
            return false; 
           }
          //请添加预约时间段
          if(localStorage.getItem('isRequest') == 0){
                this.$message({
                type: 'error',
                center:true,
                duration:5000,
                message: '请添加预约时间段!'
            });
            return false; 
           }
           this.formData.ruleBeginToString = moment(this.formData.ruleBeginToString).format('YYYY-MM-DD')
           this.formData.ruleEndToString = moment(this.formData.ruleEndToString).format('YYYY-MM-DD')
          //获取选中的communityDeptId
           let ids = [];
           for(let i = 0;i<this.formData.hosAllocationRuleDeptInfoDtos.length;i++){
             ids.push(this.formData.hosAllocationRuleDeptInfoDtos[i].communityDeptId)
           }
           //获取索引
           let indexs = [];
           for(let j = 0;j<this.statusArray.length;j++){
              if(ids.indexOf(this.statusArray[j].id)>=0){
                   indexs.push(j);
              }
           }
           //获取所选这行数据的详情
           let obj = {}
           let changeArray = [];
           let itemArray = [];
           for(let k=0;k<indexs.length;k++){
             if(localStorage.getItem(`hosAllocationRuleTimeInfoDtos${indexs[k]}`)){
               //修改过数据
                 changeArray = JSON.parse(localStorage.getItem(`hosAllocationRuleTimeInfoDtos${indexs[k]}`));
                 changeArray.filter((item) => {
                 item.communityDeptId = item.id;
                 item.beginTime = item.ruleBeginToString;
                 item.endTime = item.ruleEndToString;
                 delete item.id;
                 delete item.ruleBeginToString;
                 delete item.ruleEndToString;
               })
                obj[k] = changeArray;
             }else{
              //没有修改过  用默认数据
              itemArray = JSON.parse(localStorage.getItem('hosAllocationRuleTimeInfoDtos'))
              for(let x=0;x<itemArray.length;x++){
                 itemArray[x].communityDeptId = this.statusArray[indexs[k]].id;
                 itemArray[x].commdeptName = this.statusArray[indexs[k]].commdeptName;
                  obj[k] = itemArray;
               }
             }
           }
           let hosAllocationRuleDeptInfoDtos = [];
           for(let k in obj){
             hosAllocationRuleDeptInfoDtos = hosAllocationRuleDeptInfoDtos.concat(obj[k]);
           }
           this.formData.hosAllocationRuleDeptInfoDtos = hosAllocationRuleDeptInfoDtos;
           //处理时间
          //  console.log(moment(this.formData.valueTime[0]).format('YYYY-MM-DD'));
          //  console.log(moment(this.formData.valueTime[1]).format('YYYY-MM-DD'));
           this.formData.ruleBeginToString = moment(this.formData.valueTime[0]).format('YYYY-MM-DD');
           this.formData.ruleEndToString = moment(this.formData.valueTime[1]).format('YYYY-MM-DD');
           $axios_http({
            url: "/base/hospital/community/allocation/newinsert",
            data: this.formData,
            vueObj: this
          }).then((res)=> {
            if(res.data.statusMsg=="success"){
              this.$message({
                  type: 'success',
                  center:true,
                  message: '放号成功!'
              });
              this.formData.valueTime = null;
              this.formData.issueType = null;
              this.formData.examinationPlace = null;
              this.formData.signature = null;
              this.formData.ruleType = null;
              this.formData.weeks = [];
              this.formData.hosAllocationRuleTimeInfoDtos = [
                {
                  beginTime:null,
                  endTime:null,
                  num:null
                }
              ]
              this.isShowBtn = false;
              localStorage.setItem('issueType','');
              localStorage.setItem('examinationPlace','');
              localStorage.setItem('signature','');
              localStorage.setItem('ruleType','');
              localStorage.setItem('weeks',JSON.stringify(new Array()));
              localStorage.setItem('hosAllocationRuleTimeInfoDtos',JSON.stringify(new Array()));
              localStorage.setItem('isRequest',0)
              localStorage.removeItem('isShowBtn');
              this.getTableData();
              this.$router.push({
                path:'/bookingManagements/bookingManagement'
              })
             }
          })
        }
      },
      //就诊科室change
      changeExaminationPlace(){
        localStorage.setItem('examinationPlace',this.formData.examinationPlace);
      },
      // 放号时间赋值
      changePicker(val){
        this.formData.ruleBeginToString=new Date(val[0]).getTime();
        this.formData.ruleEndToString=new Date(val[1]).getTime();
        this.changeFormData('valueTime',val);
      },
      // 每天按钮
      changeRuleType(val){
        if(this.formData.ruleType=="1"){
          //清空formData.weeks数组
            this.formData.weeks = [];
        }
        this.changeFormData('ruleType',val);
      },
      //复选框和每天按钮互斥
      changeWeeks(){
        if(this.formData.weeks.length){
          //清空formData.ruleType
          this.formData.ruleType = null;
        }
        this.changeFormData('weeks',this.formData.weeks);
      },
      //预约规则change
      changeIssueType(val){
         if(this.formData.issueType == 1){
           //全选
           this.queryResult.selectOrganizeTableRow.forEach((row) => {
               this.$refs.multipleTable.toggleRowSelection(row,true);
            });
         }else{
             this.$refs.multipleTable.clearSelection();
         }
         this.changeFormData('issueType',val);
      }, 
      //提交员签字change
      changeSignature(){
         localStorage.setItem('signature',this.formData.signature);
      },
      //修改表单数据
      changeFormData(key,value){
        if(localStorage.getItem('tableData')){
           //表格有数据，清除数据
          this.$confirm('修改表单数据会导致机构列表数据清除，请确认是否修改?', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning'
          }).then((resp) => {
            var session = sessionStorage.getItem("token").split(";")
                  for(var i = 0; i < session.length; i++){
                    var arr = session[i].split("=");
                    if(arr[0]=='LOGINNAME'){
                      this.formData.signature = arr[1];
                      localStorage.setItem('signature',arr[1]);
                    }
            }
            //判断清空哪个改变哪个 ，其他保留
            if(key == 'valueTime'){
               this.formData.valueTime = [
                  moment(value[0]).format('YYYY-MM-DD'),
                  moment(value[0]).format('YYYY-MM-DD'),
               ]
            }
            if(key == 'ruleType'){
               this.formData.ruleType = value;
               this.formData.weeks = [];
               localStorage.setItem('ruleType',value);
               localStorage.setItem('weeks',JSON.stringify([]))
            }
            if(key == 'weeks'){
              this.formData.ruleType == null;
              this.formData.weeks = value;
              localStorage.setItem('ruleType',2);
              localStorage.setItem('weeks',JSON.stringify(value))
            }
            if(key == 'issueType'){
              this.formData.issueType = value;
              localStorage.setItem('issueType',value);
            }
            this.isShowBtn = false;
            localStorage.removeItem('isShowBtn')
            this.getTableData();
            this.delBtnShow = false;
          }).catch((error) => {
            //提交员赋值
              if(localStorage.getItem('tableData') && localStorage.getItem('signature')){
                  this.formData.signature = localStorage.getItem('signature');
              }else{
                      var session = sessionStorage.getItem("token").split(";")
                      for(var i = 0; i < session.length; i++){
                        var arr = session[i].split("=");
                        if(arr[0]=='LOGINNAME'){
                          this.formData.signature = arr[1];
                          localStorage.setItem('signature',arr[1]);
                        }
                      }
                }
                // 放号时间和表格赋值
                if(localStorage.getItem('tableData')){
                  let item = JSON.parse(localStorage.getItem('tableData'))[0];
                  this.formData.valueTime = [item.ruleBeginToString,item.ruleEndToString];
                  this.queryResult.selectOrganizeTableRow = JSON.parse(localStorage.getItem('tableData'));
                }else{
                  //获取表格社区数据,显示默认表格
                  this.getTableData();
                }
                //放号规则赋值
                if(localStorage.getItem('tableData') && localStorage.getItem('ruleType') == '1'){
                  this.formData.ruleType = localStorage.getItem('ruleType');
                  this.formData.weeks = [];
                }else if(localStorage.getItem('tableData') && localStorage.getItem('ruleType') == '2'){
                  this.formData.ruleType = null;
                  this.formData.weeks = JSON.parse(localStorage.getItem('weeks'));
                }
                //就诊科室赋值  
                if(localStorage.getItem('tableData') && localStorage.getItem('examinationPlace')){
                  this.formData.examinationPlace = localStorage.getItem('examinationPlace')
                }
                //预约规则赋值
                if(localStorage.getItem('tableData') && localStorage.getItem('issueType')){
                  this.formData.issueType = localStorage.getItem('issueType')
                  if(localStorage.getItem('issueType') == 1){
                    this.$nextTick(()=>{
                      this.queryResult.selectOrganizeTableRow.forEach((row) => {
                            this.$refs.multipleTable.toggleRowSelection(row,true);
                        });
                    })
                  }
                }
                //赋值时间段
                if(localStorage.getItem('tableData') && localStorage.getItem('hosAllocationRuleTimeInfoDtos')){
                  this.formData.hosAllocationRuleTimeInfoDtos = JSON.parse(localStorage.getItem('hosAllocationRuleTimeInfoDtos'));
                  if(this.formData.hosAllocationRuleTimeInfoDtos.length>1){
                    this.delBtnShow = true;
                  }else{
                     this.delBtnShow = false;
                  }
                }
                //赋值isRequest
                if(localStorage.getItem('isRequest') == 1){
                  localStorage.setItem('isRequest',1)
                }else{
                  localStorage.setItem('isRequest',0);
                }

                //赋值isShowBtn
                if(localStorage.getItem('isShowBtn')){
                  this.isShowBtn = true;
                }   
          });
        }
      },
      // 开始时间不能早于第一行的结束时间
      focusFormData(index){
        if(index>0){
          let endTime=this.formData.hosAllocationRuleTimeInfoDtos[index-1].endTime
          let getMin = Number(endTime.split(':')[0]*60)+Number(endTime.split(':')[1])
          let lastTime=parseInt((getMin-1)/60)+':'+ parseInt(getMin-1-parseInt((getMin-1)/60)*60);
          this.options={
                  start: '08:00',
                  step: '00:30',
                  end: '20:00',
                  minTime: lastTime
                  }
             }
      },
      // 时间段值改变事件
      blurFormData(value,index){
        if(value){
        let arr=[];
        let arrSec=[];
        let currentTime=Number(value.split(':')[0]*60)+Number(value.split(':')[1]);
        this.formData.hosAllocationRuleTimeInfoDtos.filter((item,i)=> {
          if(i>=index){
            //转化为分钟数
            let secBegin=item.beginTime && Number(item.beginTime.split(':')[0]*60)+Number(item.beginTime.split(':')[1])
            let secEnd=item.endTime && Number(item.endTime.split(':')[0]*60)+Number(item.endTime.split(':')[1])
            item.beginTime && arr.push(item.beginTime);
            item.endTime && arr.push(item.endTime);
            item.beginTime && arrSec.push(secBegin);
            item.endTime && arrSec.push(secEnd);
          }
        })
        if(currentTime>Math.min.apply(null, arrSec)){
           
          }
        }
      },
      handleSelectionChange(val){
          //获取选中的所有数据
          this.selectOrganizeTableRow = val;
      },
      viewDetail(row,index){
        //用于编辑数量页面，数据回显
        localStorage.setItem('isShowBtn',true);
        localStorage.setItem('DetailTableData',JSON.stringify(row));
        this.$router.push({
          path:'/bookingManagements/bookingManagementAddDetail',
          query:{
            index:index
          }
        })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.period ul{
  width: 1260px;
  li{
    width: 180px;
    border-top: 1px solid  #ECECEF;
    height: 58px;
    text-align: center;
    border-left: 1px solid #ECECEF;
    border-bottom:1px solid #ECECEF;
    margin-top: -1px;
    cursor: pointer;
  }
  li.active{
    background: #FBA800;
    color: #fff;
  }
}
.date li{
  padding-top: 10px;
  color: #606266;
}
.titTop{
  font-size: 18px;
  color: #333333;
  border-bottom: 1px solid #ECECEC;
  margin-top: 15px;
  border-top: 1px solid #ECECEC;
  padding-bottom: 15px;
  padding-top: 22px;
  margin-bottom: 18px;
  .title{
    line-height: 1;
    padding-left:20px;
  }
  a{
    margin-right: 10px;
  }
  .btns{
    margin-right: 20px;
  }
}
.top{
  border-top:none;
  margin-top: 0;
  padding-top: 0;
}
.top span.title,.top span.line{
    height: 38px;
    line-height: 38px;
  }
.top span.line{
  color:  #DADADA;
  font-size: 12px;
  margin: 0 25px;
}
.el-form {
  padding-left:20px;
}
.el-table{
  margin-left: 20px;
}
.el-icon-delete{
    color: #999;
    font-weight: bold;
    font-size: 18px;
}
.el-icon-plus{
    background: #999999;
    color:#ffffff;
    border-radius: 2px;
    font-size: 18px;
}
.el-icon-edit-outline{
  font-size:16px;
}
</style>

