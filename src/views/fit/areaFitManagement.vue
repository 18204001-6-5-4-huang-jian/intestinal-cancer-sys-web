<template>
  <div slot="right" class="content-page" v-if="area_fit_list_page ">
    <div class="content">
      <div class="filter-container" >
        <router-link to="/home/areaHome">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
        <el-form :model="qc" :inline=true>
          <div>
            <el-input  style="width: 200px;" size="small" class="filter-item" clearable placeholder="姓名" v-model="qc.name" >
            </el-input>
            <el-input  style="width: 200px;" size="small" class="filter-item" clearable placeholder="SID" v-model="qc.sid" >
            </el-input>
            <el-input  style="width: 200px;" size="small" class="filter-item" clearable placeholder="手机号" v-model="qc.phone" >
            </el-input>
          </div>
        <div>
          <el-cascader
            style="float: left;width: 200px;margin-right: 15px;"
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
          <el-select v-model="qc.group" clearable placeholder="分组方案" size="small" class="filter-item">
            <el-option value="A" label="A组">A组</el-option>
            <el-option value="B" label="B组">B组</el-option>
            <el-option value="C" label="C组">C组</el-option>
            <el-option value="Cg" label="C组高危">C组高危</el-option>
            <el-option value="Cd" label="C组低危">C组低危</el-option>
          </el-select>
          <el-select v-model="qc.codeEntryStatus" placeholder="FIT编码录入状态" size="small" class="filter-item" clearable>
            <el-option value="1" label="未录入"></el-option>
            <el-option value="2" label="已录入"></el-option>
          </el-select>
          <el-select v-model="qc.insertStatus" placeholder="FIT结果录入状态" size="small" class="filter-item" clearable>
            <el-option value="1" label="未录入"></el-option>
            <el-option value="2" label="已录入"></el-option>
          </el-select>
          <el-select v-model="qc.result" placeholder="FIT结果" size="small" class="filter-item" clearable>
            <el-option value="2" label="阳性"></el-option>
            <el-option value="1" label="阴性"></el-option>
            <el-option value="3" label="无效"></el-option>
            <el-option value="4" label="无结果"></el-option>
          </el-select>
        </div>
        <div>
          <el-button  size="small" type="primary" icon="el-icon-search" @click="query(1,$store.state.areaFitManagementPageSize)" >查询</el-button>
          <el-button  type="primary" size="small" icon="el-icon-close" @click="reset" >重置</el-button>
        </div>
        </el-form>
        <!--数据列表-->
        <div class="table-btn-grooup">
          <el-button class="filter-item" type="primary" size="small" icon="el-icon-close"  v-if="btnAuth.fit_reserve_btn">一键预约</el-button>
          <el-button class="filter-item" size="small" type="primary" icon="el-icon-search"  v-if="btnAuth.fit_export__excel_btn">导出EXCEL</el-button>
        </div>
        <el-dialog :visible.sync="seeDialog" width="30%">
          <div class="clearfix">
            <ul class="resultList fl">
              <li><span>录入状态：</span><span>{{this.insertStatus}}</span></li>
              <li><span>有无结果：</span><span>{{this.resultStatus}}</span></li>
              <li v-if="this.resultStatus=='无结果'"><span>无结果原因：</span><span>{{this.noResonResult}}</span></li>
              <li v-if="this.resultStatus=='有结果'"><span>结果为：</span><span>{{this.result}}</span></li>
              <li v-if="this.resultStatus=='有结果'"><span>上线值/C值：</span><span>{{this.upLineValue}}</span></li>
              <li v-if="this.resultStatus=='有结果'"><span>下线值/T值：</span><span>{{this.downLineValue}}</span></li>
              <li v-if="this.resultStatus!='无结果'"><span>是否10分钟内读取:</span><span v-if="this.intenM == 1">是</span><span v-if="this.intenM == 0">否</span></li>
            </ul>
            <img src="../../assets/img/no-image.jpg" alt="" class="fl">
          </div>
        </el-dialog>
        <el-dialog :visible.sync="inputResultDialog">
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
            <div v-if="resultInfo==4" class="resultInfo">
              <p>无结果</p>
              <p>请重新检测</p>
            </div>
            <el-button size="small" @click="closeInputResultDialog" class="dialog-footer">确 定</el-button>
          </el-dialog>
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
              <el-form-item label="上线" :label-width="formLabelWidth" prop="upLineValue">
                <el-input v-model="insertForm.upLineValue" auto-complete="off" class="lineWidth"></el-input>
              </el-form-item>
              <el-form-item label="下线" :label-width="formLabelWidth" style="margin-top:10px" prop="downLineValue">
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
                placeholder="结果日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="噗噗管ID" :label-width="formLabelWidth" prop="fitCode">
              <el-input v-model.number="addCodeForm.fitCode" auto-complete="off" class="lineWidth"></el-input>
            </el-form-item>
            <div class="dialog-footer">
              <el-button size="small" @click="inputCode('addCodeForm')" type="primary">确 定</el-button>
              <el-button size="small" @click="inputCodeDialog=false">取 消</el-button>
            </div>
          </el-form>
        </el-dialog>
        <el-table
          :data="queryResult.tableData"
          border
          :default-sort = "{prop: 'releaseDate', order: 'descending'}"
          style="width: 100%;">
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="80">
          </el-table-column>
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
            prop="phone"
            label="手机号"
            width="120"
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
            prop="followGroup"
            label="随访分组"
            width="130"
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
            label="总体状态"
          >
            <template slot-scope="scope">
              <span>{{scope.row.overallStatusCy| overallStatusCy}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="codeEntryStatus"
            label="FIT编码录入状态"
            width="130"
          >
            <template slot-scope="scope">
              <span>{{scope.row.codeEntryStatus| codeEntryStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="fitCode"
            label="FIT编码"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="releaseDate"
            label="发放日期"
            sortable
            width="130"
          >
          </el-table-column>
          <el-table-column
            label="FIT结果状态"
            width="130"
          >
            <template slot-scope="scope">
              <span>{{scope.row.insertStatus| insertStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="FIT结果"
            width="130"
          >
            <template slot-scope="scope">
              <span>{{scope.row.result| result}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="resultDate"
            label="结果录入日期"
            width="160"
            sortable
          >
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            width="120"
            align="center"
          >
            <template slot-scope="scope">
              <!-- <el-button type="text" class="btnStyle" size="small"  v-if="scope.row.codeEntryStatus==1 || scope.row.codeEntryStatus==null" @click="inputCodeDialogIsShow(scope.row.id,scope.row.sid)">录入编码</el-button>
              <el-button type="text" class="btnStyle" size="small"  v-if="scope.row.codeEntryStatus==2 && (scope.row.insertStatus==1 || scope.row.insertStatus==null)" @click='inputResultDialogIsShow(scope.row.id,scope.row.sid,scope.row.phone)'>录入结果</el-button> -->
              <el-button type="text" class="btnStyle" size="small"  v-if="scope.row.insertStatus == 2" @click="seeEvent(scope.row.id)">查看</el-button>
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
                :current-page="$store.state.areaFitManagementPageNo"
                :page-sizes="[10, 20, 50, 100]"
                v-bind:page-size="$store.state.areaFitManagementPageSize"
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
      var validateFitCode = (rule, value, callback) => {
          if (value === '') {
          callback(new Error('噗噗管ID不能为空'));
        } else if (!(/^[A-Za-z0-9]{8}$/.test(value))) {
          callback(new Error('请输入8位数字或字母'));
        } else {
          callback();
        }
      };
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
        id:'',
        insertStatus:'',//结果状态
        resultStatus:'',//有无结果
        noResonResult:'',//无结果原因
        upLineValue:'',//上线值/C值
        downLineValue:'',//下线值/T值
        result:'',//结果为
        resultInfo:'',//结果弹框提示信息
        inputResultPrompt:false,//结果提示信息
        intenM:'',
        inputResultDialog:false,
        inputCodeDialog:false,
        seeDialog:false,
        reserveDialog:false,
        //权限判定
        area_fit_list_page :false,
        btnAuth:{
          buttonRoleAdd:false,
          fit_return_btn:false,
          buttonRoleDel:false,
          fit_query_btn:false,
          buttonUserRoleDis:false,
          fit_reserve_btn:false,
          fit_export__excel_btn:false,
          fit_input_num_btn:false,
          fit_del_btn:false,
          fit_input_result_btn:false,
          fit_examine_btn:false,
          fit_see_btn:false
        },
        period:'',
        periodData:[],
        //查询条件
        "qc":{
          "sid":null,
          "name":null,
          "phone":null,
          "group":null,
          "codeEntryStatus":null,
          "result":null,
          "insertStatus":null,
          "communityDeptId":null,
          "loginName":null,
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
        deptGroup:[],
        insertForm:{
          "resultDate":'',
          'upLineValue':null,
          'downLineValue':null,
          'noResonResult':'',
          'resultStatus':'',
          'inTenMin':''
        },
        addCodeForm:{
          'releasePersonCode':'',
          'releaseDate':'',
          'fitCode':''
        },
        props: {
          value: 'id',
          children: 'child',
          label:'name'
        },
        ids:[],
        allocateResourcesData:[],
        allocationId:'',
        colonoscopyRecordId:'',
        sid:'',
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
            {required:true,message:'请输入角色描述信息',trigger:'blur'},
            {min:1,max:32,message:'长度在1到32个字符',trigger:'blur'}
          ]
        },
        addCodeFormRules:{
          releasePersonCode:[
            {required:true,message:'必填',trigger:'blur'},
          ],
          releaseDate:[
            {required:true,message:'必填',trigger:'blur'},
          ],
          fitCode:[
            {required:true,message:'必填',trigger:'blur'},
            {validator: validateFitCode, trigger: 'blur'}
          ]
        }
      }
    },
    mounted(){
      this.$store.commit('LOGOUT_USER');
      let obj = this.checkPageAuth(this,"area_fit_list_page",this.btnAuth);
      this.query(this.$store.state.areaFitManagementPageNo,this.$store.state.areaFitManagementPageSize);
      this.getToday()
    },
    beforeDestroy(){
      this.$store.state.areaFitManagementPageNo=1;
      this.$store.state.areaFitManagementPageSize=10;
    },
    methods:{
      //获取选中区
      getQcId(value){
        this.qc.communityDeptId = null
        this.qc.loginName =null
        if(value.length==1){
          this.qc.communityDeptId = value[0]
          this.qc.loginName =null
        }else if(value.length == 2){
          this.qc.communityDeptId = value[0]
          for(let j = 0;j<this.$store.state.regionOptions.length;j++){
            if(value[0] == this.$store.state.regionOptions[j].id){
              for(let k=0;k<this.$store.state.regionOptions[j].child.length;k++){
                if(value[1] == this.$store.state.regionOptions[j].child[k].id){
                  this.qc.loginName =this.$store.state.regionOptions[j].child[k].loginName
                }
              }
            }
          }
        }
      },
      //查询
     query(pageNo,pageSize){
        $axios_http({
          // url:"/base/area/fit/result/query",
          url:"/base/fit/result/query",
          data:{
            name:this.qc.name,
            sid:this.qc.sid,
            communityDeptId:this.qc.communityDeptId,
            loginName:this.qc.loginName,
            phone:this.qc.phone,
            group:this.qc.group,
            codeEntryStatus:this.qc.codeEntryStatus,
            insertStatus:this.qc.insertStatus,
            result:this.qc.result,
            pageNo:pageNo,//当前页
            pageSize:pageSize//每页条数
          },
          vueObj:this
        }).then((res)=>{
          this.$store.commit('get_areaFitManagementPageNo',pageNo)
          this.queryResult.tableData=res.data.data;
          this.queryResult.totalPageCount=res.data.pageInfo.totalPageCount//获取总共多少页
          this.queryResult.totalRowCount=res.data.pageInfo.totalRowCount//获取总共条数
        })
      },
      closeInputResultDialog(){
        Object.assign(this.$data.insertForm, this.$options.data().insertForm);
        this.inputResultDialog=false;
        this.inputResultPrompt=false;

      },
      inputCodeDialogIsShow(id,sid){
        this.id=id;
        this.sid=sid;
        this.inputCodeDialog=true;
      },
      inputResultDialogIsShow(id,sid){
        this.id=id;
        this.sid=sid;
        this.inputResultDialog=true;
      },
      //获取今天日期
      getToday(){
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        this.addCodeForm.releaseDate = currentdate
        this.insertForm.resultDate = currentdate
      },
      inputResult(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            $axios_http({
              // url:"/base/area/fit/result/add",
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
              this.query(this.$store.state.areaFitManagementPageNo,this.$store.state.areaFitManagementPageSize);
              //this.inputResultDialog=false;
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
      inputCode(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            $axios_http({
              url:"/base/area/fit/result/code/entry",
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
              this.query(this.$store.state.areaFitManagementPageNo,this.$store.state.areaFitManagementPageSize);
              this.inputCodeDialog=false;
              Object.assign(this.$data.addCodeForm, this.$options.data().addCodeForm)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      seeEvent(id){
        this.seeDialog=true;
        $axios_http({
          url: "/base/fit/result/getFItResult/"+id,
          data: {},
          vueObj: this
        }).then((res) => {
          console.log('see');
          console.log(res);
          this.insertStatus=res.data.data.insertStatus;
          this.resultStatus=res.data.data.resultStatus;
          this.noResonResult=res.data.data.noResonResult;
          this.upLineValue=res.data.data.upLineValue;
          this.downLineValue=res.data.data.downLineValue;
          this.intenM = res.data.data.inTenMin
          this.result=res.data.data.result;
          if(this.insertStatus==1){
            this.insertStatus='未录入'
          }else if(this.insertStatus==2){
            this.insertStatus='已录入'
          }else if(this.insertStatus==3){
            this.insertStatus='待审核'
          }
          if(this.resultStatus==1){
            this.resultStatus='有结果'
          }else if(this.resultStatus==2){
            this.resultStatus='无结果'
          }
          if(this.result==1){
            this.result='阴性'
          }else if(this.result==2){
            this.result='阳性'
          }else if(this.result==3){
            this.result='无效'
          }

        })
      },
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
      getServerInfo(colonoscopyRecordId,sid){
        this.reserveDialog=true;
        this.sid=sid;
        this.colonoscopyRecordId=colonoscopyRecordId;
        $axios_http({
          url: "/base/hospital/community/allocation/query",
          data: {},
          vueObj: this
        }).then((res) => {
          this.periodData=res.data.data
          this.insertForm=res.data.data[0]
          this.allocationId=res.data.data[0].id;
          this.period=this.insertForm.period;
        })
      },
      resverEvent(){
        $axios_http({
          url:"/base/hospital/colonoscopy/record/booking",
          data:{
            colonoscopyRecordId:this.colonoscopyRecordId,
            sid:this.sid,
            allocationId:this.allocationId
          },
          vueObj:this
        }).then((res)=>{
          $successMsg(this,"预约成功")
          this.reserveDialog=false
          this.query(this.$store.state.areaFitManagementPageNo,this.$store.state.areaFitManagementPageSize);
        })
      },
      //重置检索条件
      reset(){
        Object.assign(this.$data.qc, this.$options.data().qc)
        this.ids = []
        this.query(this.$store.state.areaFitManagementPageNo,this.$store.state.areaFitManagementPageSize);
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
            this.query(this.$store.state.areaFitManagementPageNo,this.$store.state.areaFitManagementPageSize);
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
//        setTimeout(()=> {
          this.$store.commit('get_areaFitManagementPageSize', pageSize)
          console.log(`每页 ${pageSize} 条`)
//            ,3000})
        this.query(this.$store.state.areaFitManagementPageNo,pageSize);
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        //this.queryResult.pageNo = currentPage
        this.$store.commit('get_areaFitManagementPageNo',currentPage)
        console.log(`当前页: ${currentPage}`);
        this.query(currentPage,this.$store.state.areaFitManagementPageSize);
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
  .table-btn-grooup{
    margin-bottom:10px;
  }
  .resultList{
    width: 50%;
    list-style: none;
    margin-left:20px;
  }
  .resultList li{
    line-height: 40px;
    font-size: 14px;
  }
  .lineWidth{
    width: 50%;
  }
  .dialog-footer{
    position: absolute;right:20px;bottom:20px;
  }
  .resultInfo{
    text-align: center;
    line-height: 30px;
    font-size: 18px;
    font-weight: 500;
  }
  .filter-item{
    margin-right:10px;
    width:200px;
  }
</style>
