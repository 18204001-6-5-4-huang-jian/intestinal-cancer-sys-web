<template>
  <div slot="right" class="content-page" v-if="abnormalManagementList_page">
    <!--<div class="total">当前异常事件记录：{{queryResult.totalRowCount}}人</div>-->
    <div class="content">
      <div class="filter-container">
        <router-link to="/home/home" v-if="areaFlag==1">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
         <router-link to="/home/areaHome" v-if="areaFlag==2">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
         <router-link to="/home/countryHome" v-if="areaFlag==3">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
        <el-form :model="qc" :inline=true class="clear">
          <div>
            <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="SID" v-model="qc.sid">
            </el-input>
            <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="姓名" v-model="qc.name"></el-input>
            <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="手机号" v-model="qc.phone">
            </el-input>
          </div>
          <div>
          </div>
          <div>
            <el-select v-model="qc.group" placeholder="请选择分组方案" size="small" class="filter-item">
              <el-option value="A" v-bind:key="1" label="A组"></el-option>
              <el-option value="B" v-bind:key="2" label="B组"></el-option>
              <el-option value="C" v-bind:key="3" label="C组"></el-option>
              <el-option value="Cg" v-bind:key="4" label="C组高危"></el-option>
              <el-option value="Cd" v-bind:key="5" label="C组低危"></el-option>
            </el-select>
             <el-select v-model="qc.overallStatusCy" placeholder="总体状态" size="small" class="filter-item" v-if="areaFlag==1">
              <el-option value="1" v-bind:key="1" label="正常"></el-option>
              <el-option value="2" v-bind:key="2" label="失访"></el-option>
              <el-option value="3" v-bind:key="3" label="肠癌"></el-option>
              <el-option value="4" v-bind:key="4" label="死亡"></el-option>
            </el-select>
            <el-cascader
              v-if="areaFlag==3"
              style="float: left;width: 200px;margin-right: 15px;"
              :options="$store.state.regionOptions"
              placeholder="所属地区"
              :props="props"
              v-model="ids"
              size="small"
              :show-all-levels="false"
              change-on-select
              @change="getQcId"
            ></el-cascader>
            <el-cascader
              v-if="areaFlag==2"
              style="float: left;width: 200px;margin-right: 15px;"
              :options="$store.state.regionOptions"
              placeholder="所属区"
              :props="props"
              v-model="ids"
              size="small"
              :show-all-levels="false"
              change-on-select
              @change="getQcIdArea"
            ></el-cascader>
            <el-cascader
              v-if="areaFlag==1"
              style="float: left;width: 200px;margin-right: 15px;"
              :options="$store.state.regionOptions"
              placeholder="所属社区"
              :props="props1"
              v-model="ids"
              size="small"
              :show-all-levels="false"
              change-on-select
              @change="getQcIdcommunity"
            ></el-cascader>
          </div>
          <div>
            <el-button  size="small" type="primary" icon="el-icon-search" @click="query(1,$store.state.abnormalManagementListPageSize)" >查询</el-button>
            <el-button  type="primary" size="small" icon="el-icon-close" @click="reset" >重置</el-button>
          </div>
        </el-form>
      </div>

      <div >
        <div class="table-btn-grooup">
          <!--<el-button class="filter-item" type="primary" size="small" icon="el-icon-close">退出研究</el-button>-->
          <!--<el-button class="filter-item" size="small" type="primary" icon="el-icon-search"  v-if="btnAuth.subjectsList_EXCEL_btn">导出EXCEL</el-button>-->
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
            width="110"
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
            prop="phone"
            label="手机号"
            width="120"
          >
          </el-table-column>
          <el-table-column
            v-if="areaFlag==2 || areaFlag==3"
            prop="communityName"
            label="所属区"
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
            prop="in_group_date"
            label="入组日期"
            width="110"
            sortable
          >
          </el-table-column>
          <el-table-column
            label="总体状态"
          >
            <template slot-scope="scope">
              <span>{{scope.row.overall_status_cy | overallStatusCy}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="异常类型"
          >
            <template slot-scope="scope">
              <span>{{scope.row.scheme_type | schemeType}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="记录时间"
            width="160"
            sortable
          >
          <template slot-scope="scope">
              <span>{{scope.row.D2_update_time | date}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
          >
             <template slot-scope="scope">
                  <el-button type="text" class="btnStyle"  v-if="(scope.row.entry_status == 2 && $store.state.hospitalType == 1) || (scope.row.entry_status == 2 && $store.state.hospitalType == 2)" @click="toReport(scope.row.sid,scope.row.qiut_log_id,scope.row.D2_id)">录入</el-button>
               <!-- </router-link> -->
               <router-link :to="{ path: '/home/showReport4',query:{id:scope.row.D2_id,sid:scope.row.sid}}">
                 <el-button type="text" class="btnStyle"  v-if="scope.row.entry_status == 1 ">查看</el-button>
               </router-link>
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
                :current-page="$store.state.abnormalManagementListPageNo"
                :page-sizes="[10, 20, 50, 100]"
                v-bind:page-size="$store.state.abnormalManagementListPageSize"
                layout="total, sizes, prev, pager, next, jumper"
                v-bind:total="queryResult.totalRowCount">
              </el-pagination>
            </div>
          </div></el-col>
        </el-row>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        isShow:false,
        deptGroup:[],
        areaFlag:'',   //3-国家；2-地区；1-社区；4-第三方
        totalRowCount:'',  //异常事件记录人数
        abnormalManagementList_page:false,
        btnAuth:{
          abnormalManagement_query_btn:false,
        },
        //查询条件
        "qc":{
          "name":"",
          "sex":null,
          "phone":"",
          "sid":"",
          "inGroupDateStart":"",
          "inGroupDateEnd":"",
          "group":null,
          "areaDeptId":null,
          "loginName":null,
          "communityDeptId":null,
          "overallStatusCy":null
        },
        //查询结果
        "queryResult":{
          "pageNo":1,//当前页
          "pageSize":10,//每页的条数
          "totalPageCount":0,
          "tableData":[]
        },
        //编辑表单数据对象
        "updateForm":{
          "nickName":"",
          "phone":"",
          "loginName":""
        },
        props: {
          value: 'id',
          children: 'child',
          label:'name'
        },
        props1: {
          value: 'loginName',
          children: 'child',
          label:'name'
        },
        userId:"",
        formLabelWidth: '100px',
        ids:[],
        url:''

      }
    },
    created(){
      if(localStorage.getItem('communityType')=='true'){
        this.ids.push(localStorage.getItem('loginName'));
        this.qc.loginName=localStorage.getItem('loginName');
      }
    },
    mounted(){
      let obj = this.checkPageAuth(this,"abnormalManagementList_page",this.btnAuth)
      this.qc.sid=this.$route.query.sid;
      this.query(this.$store.state.abnormalManagementListPageNo,this.$store.state.abnormalManagementListPageSize);
//      if(this.$store.state.hospitalType!=1){
//        this.queryDepartMent();
//      }
//      this.queryDepartCommunityMent();
    },
    beforeDestroy(){
      this.$store.state.abnormalManagementListPageNo=1;
      this.$store.state.abnormalManagementListPageSize=10;
    },
    methods:{
      //查询
      query(pageNo,pageSize){
          if(this.$store.state.hospitalType == 1){
              this.url = '/base/hospital/person/quitList/query'
          }else if(this.$store.state.hospitalType == 2){
              this.url = '/base/hospital/person/quitareaList/query'
          }else if(this.$store.state.hospitalType == 3){
              this.url = '/base/hospital/person/quitallList/query'
          }
        $axios_http({
          url:this.url,
          data:{
            sid:this.qc.sid,
            name:this.qc.name,
            sex:"",
            age:"",
            phone:this.qc.phone,
            group:this.qc.group,
            inGroupDateStart:"",
            inGroupDateEND:"",
            communityDeptId:this.qc.communityDeptId,
            areaDeptId:this.qc.areaDeptId,
            loginName:this.qc.loginName,
            pageNo:pageNo,//当前页
            pageSize:pageSize,//每页条数
            totalPageCount:"",
            totalRowCount:"",
            overallStatusCy:this.qc.overallStatusCy
          },
          vueObj:this
        }).then((res)=>{
          this.$store.commit('get_abnormalManagementListPageNo',pageNo)
          this.areaFlag=this.$store.state.hospitalType;
          this.queryResult.tableData=res.data.data;
          this.queryResult.totalPageCount=res.data.pageInfo.totalPageCount//获取总共多少页
          this.queryResult.totalRowCount=res.data.pageInfo.totalRowCount//获取总共条数
        })
      },
       //国家获取选中社区
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

        }

      },
      //地区获取选中区
      getQcIdArea(value){
        this.qc.areaDeptId = null
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
      //获取选中区
      getQcIdcommunity(value){
        this.qc.areaDeptId = null
        this.qc.communityDeptId = null
        for(let i=0;i<this.$store.state.regionOptions.length;i++){
           if(value[0] == this.$store.state.regionOptions[i].id){
               this.qc.loginName = this.$store.state.regionOptions[i].loginName
           }
        }
      },
      //查询
//       queryDepartCommunityMent(){
//         $axios_http({
//           url:"/base/department/underling/hospital/query",
//           data:{
//           },
//           vueObj:this
//         }).then((res)=>{
//           this.deptGroup = res.data.data
//         })
//       },
//      queryDepartMent(){
//        if(this.$store.state.regionOptions.length==0){
//          $axios_http({
//            url:"/base/department/getOtherDepart/1",
//            data:{},
//            vueObj:this
//          }).then((res)=>{
//            this.$store.state.regionOptions = res.data.data.child
//          })
//        }
//      },
      //重置检索条件
      reset(){
        Object.assign(this.$data.qc, this.$options.data().qc);
        if(localStorage.getItem('communityType')=='true'){
          this.ids.push(localStorage.getItem('loginName'));
          this.qc.loginName=localStorage.getItem('loginName');
        }else{
          this.ids = []
        }
        this.query(this.$store.state.abnormalManagementListPageNo,this.$store.state.abnormalManagementListPageSize);
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
            url:"/base/user/del/"+id,
            vueObj:this
          }).then((res)=>{
            $successMsg(this,"删除成功")
            this.query()
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
        this.$store.commit('get_abnormalManagementListPageSize', pageSize)
       this.query(this.$store.state.abnormalManagementListPageNo,pageSize);
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        this.$store.commit('get_abnormalManagementListPageNo',currentPage)
        this.query(currentPage,this.$store.state.abnormalManagementListPageSize);
      },
      // 格式化时间
      formatter(row, column) {
        return row.D2_update_time.substring(0,11);
      },
      toReport(sid,quitLogId,schemeId){
      if(this.$store.state.hospitalType == 1){
         //社区
         this.$router.push({
           path:'/subjects/report4',
           query:{
             sid:sid,
             quitLogId:quitLogId,
             flag:0,
             schemeId:schemeId
           }
         })
      }else if(this.$store.state.hospitalType == 2){
        //地区
         this.$router.push({
           path:'/subjects/report4',
           query:{
             sid:sid,
             quitLogId:quitLogId,
             flag:0,
             schemeId:schemeId,
             area:1
           }
         })
      }
    //  to="{ path: '/subjects/report4',query:{sid:scope.row.sid,quitLogId:scope.row.qiut_log_id,flag:0,schemeId:scope.row.D2_id}
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
  .filter-item{
    width:200px;
    margin-right:10px;
  }
  .total{
    text-align: center;
    margin-bottom:10px;
  }
</style>
