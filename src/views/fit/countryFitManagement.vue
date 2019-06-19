<template>
  <div slot="right" class="content-page" v-if="countryFitManagement_page ">
    <div class="content">
      <div class="filter-container" >
        <router-link to="/home/countryHome">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
        <el-form :model="qc" :inline=true>
          <div>
            <el-input  style="width: 200px;" size="small" clearable class="filter-item" placeholder="姓名" v-model="qc.name" >
            </el-input>
            <el-input  style="width: 200px;" size="small" clearable class="filter-item" placeholder="SID" v-model="qc.sid" >
            </el-input>
            <el-input  style="width: 200px;" size="small" clearable class="filter-item" placeholder="手机号" v-model="qc.phone" >
            </el-input>
            <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="FIT编码" v-model="qc.fitCode" >
            </el-input>
             <el-select v-model="qc.group" clearable placeholder="分组方案" size="small" class="filter-item">
              <el-option value="A" label="A组">A组</el-option>
              <el-option value="B" label="B组">B组</el-option>
              <el-option value="C" label="C组">C组</el-option>
              <el-option value="Cg" label="C组高危">C组高危</el-option>
              <el-option value="Cd" label="C组低危">C组低危</el-option>
            </el-select>
             <el-select v-model="qc.codeEntryStatus" clearable placeholder="FIT编码录入状态" size="small" class="filter-item" >
            <el-option value="1" label="未录入"></el-option>
            <el-option value="2" label="已录入"></el-option>
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
            ></el-cascader>
          <!--<el-select v-model="qc.communityDeptId" placeholder="所属社区" size="small" class="filter-item">-->
            <!--<el-option :value="item.id" :label="item.name" :key="item.id" v-for="item in deptGroup"></el-option>-->
          <!--</el-select>-->
          <el-select v-model="qc.insertStatus" clearable placeholder="FIT结果录入状态" size="small" class="filter-item" >
            <el-option value="1" label="未录入"></el-option>
            <el-option value="2" label="已录入"></el-option>
          </el-select>
          <el-select v-model="qc.result" clearable placeholder="FIT结果" size="small" class="filter-item" >
            <el-option value="2" label="阳性"></el-option>
            <el-option value="1" label="阴性"></el-option>
            <el-option value="3" label="无效"></el-option>
            <el-option value="4" label="无结果"></el-option>
          </el-select>
          <!-- add -->
           <el-select v-model="qc.followState" placeholder="随访状态" size="small" class="filter-item" clearable>
               <el-option v-for="(item,index) in followStatus" 
               :key="index" 
               :value="item.id" 
               :label="item.name">
               </el-option>
             </el-select>
           <el-select v-model="qc.followGroup" placeholder="随访分组" size="small" class="filter-item" clearable>
              <el-option v-for="(item,index) in followGroup" 
              :key="index" 
              :value="item.id" 
              :label="item.name"></el-option>
            </el-select>
        </div>
        <el-dialog :visible.sync="seeDialog" width="600px">
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
            <img :src="pathUrl?pathUrl:require('../../assets/img/no-image.jpg')" alt="" class="fl seeImg" >
          </div>
          
        </el-dialog>
        <div style="margin-bottom: 20px;">
          <el-button  size="small" type="primary" icon="el-icon-search" @click="query(1,$store.state.countryFitManagementPageSize)" >查询</el-button>
          <el-button  type="primary" size="small" icon="el-icon-close" @click="reset" >重置</el-button>
        </div>
        </el-form>
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
            width="120"
          >
          </el-table-column>
          <el-table-column
            label="FIT结果状态"
            width="110"
          >
            <template slot-scope="scope">
              <span>{{scope.row.insertStatus| insertStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="FIT结果"
          >
            <template slot-scope="scope">
              <span>{{scope.row.result| result}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="resultDate"
            label="结果录入日期"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            width="250"
            align="center"
          >
            <template slot-scope="scope">
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
                :current-page="$store.state.countryFitManagementPageNo"
                :page-sizes="[10, 20, 50, 100]"
                v-bind:page-size="$store.state.countryFitManagementPageSize"
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
        props: {
          value: 'id',
          children: 'child',
          label:'name'
        },
        ids:[],
        id:'',
        pathUrl:null,  //查看图片路径
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
        countryFitManagement_page :false,
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
        //查询条件
        "qc":{
          "sid":null,
          "name":null,
          "phone":null,
          "group":null,
          "fitCode":null,
          "codeEntryStatus":null,
          "result":null,
          "insertStatus":null,
          "loginName":null,
          "communityDeptId":null,
          "areaDeptId":null,
          "followGroup":null,
          "followState":null
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
        //分页
        "queryResultSource":{
          "pageNoSource":1,//当前页
          "pageSizeSource":15,//每页的条数
          "totalPageCount":0
        },
        formLabelWidth: '120px',
      }
    },
    mounted(){
      this.$store.commit('LOGOUT_USER');
      let obj = this.checkPageAuth(this,"countryFitManagement_page",this.btnAuth);
      this.query(this.$store.state.countryFitManagementPageNo,this.$store.state.countryFitManagementPageSize);
    },
    beforeDestroy(){
      this.$store.state.countryFitManagementPageNo=1;
      this.$store.state.countryFitManagementPageSize=10;
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
          this.qc.loginName = null;
        }

      },

      seeEvent(id){
        $axios_http({
          url: "/base/fit/result/getFItResult/"+id,
          data: {},
          vueObj: this
        }).then((res) => {
          this.insertStatus=res.data.data.insertStatus;
          this.resultStatus=res.data.data.resultStatus;
          this.noResonResult=res.data.data.noResonResult;
          this.upLineValue=res.data.data.upLineValue;
          this.downLineValue=res.data.data.downLineValue;
          this.intenM = res.data.data.inTenMin
          this.result=res.data.data.result;
          this.pathUrl= SERVER_NAME + '/base/dnafile/downFile?filePath=' + res.data.data.pathUrl;    
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
          if(this.result==2){
            this.result='阳性'
          }else if(this.result==1){
            this.result='阴性'
          }else if(this.result==3){
            this.result='无效'
          }
          this.seeDialog=true;
        })
      },
      //查询
      query(pageNo,pageSize){
        $axios_http({
          // url:"/base/country/fit/result/query",
          url:"/base/fit/result/query",
          data:{
            name:this.qc.name,
            sid:this.qc.sid,
            communityDeptId:this.qc.communityDeptId,
            areaDeptId:this.qc.areaDeptId,
            loginName:this.qc.loginName,
            phone:this.qc.phone,
            fitCode:this.qc.fitCode,
            group:this.qc.group,
            codeEntryStatus:this.qc.codeEntryStatus,
            insertStatus:this.qc.insertStatus,
            result:this.qc.result,
            followGroup:this.qc.followGroup,
            followState:this.qc.followState,
            pageNo:pageNo,//当前页
            pageSize:pageSize//每页条数
          },
          vueObj:this
        }).then((res)=>{
          this.$store.commit('get_countryFitManagementPageNo',pageNo)
          this.queryResult.tableData=res.data.data;
          this.queryResult.totalPageCount=res.data.pageInfo.totalPageCount//获取总共多少页
          this.queryResult.totalRowCount=res.data.pageInfo.totalRowCount//获取总共条数
        })
      },

      //重置检索条件
      reset(){
        Object.assign(this.$data.qc, this.$options.data().qc)
        this.ids=[]
        this.query(this.$store.state.countryFitManagementPageNo,this.$store.state.countryFitManagementPageSize);
      },
      //每页显示查询结果条数变更事件，做重新查询操作
      pageSizeChange(pageSize) {
        //this.queryResult.pageSize = pageSize
//        setTimeout(()=> {
          this.$store.commit('get_countryFitManagementPageSize', pageSize)
          console.log(`每页 ${pageSize} 条`)
//            ,3000})
          this.query(this.$store.state.countryFitManagementPageNo,pageSize);
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        //this.queryResult.pageNo = currentPage
        this.$store.commit('get_countryFitManagementPageNo',currentPage)
        this.query(currentPage,this.$store.state.countryFitManagementPageSize);
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
  .table-btn-grooup{
    margin-bottom:10px;
  }
  .resultList{
    width: 50%;
    list-style: none;
    margin-left:50px;
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
  .content{
    background: #fff;
    padding:10px;
  }
  img.seeImg{
    width: 214px;
  }
</style>
