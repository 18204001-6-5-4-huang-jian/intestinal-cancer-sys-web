<template>
  <div slot="right" class="content-page" v-if="uncompletedDNAexamine_page">
    <div class="content">
      <h4>待办-未审核粪便DNA结果</h4>
      <p>&nbsp;</p>
      <div class="filter-container" >
        <router-link to="/home/countryHome">
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
              placeholder="所属地区"
              :props="props"
              v-model="ids"
              size="small"
              :show-all-levels="false"
              change-on-select
              @change="getQcId"
            ></el-cascader>
            <el-select v-model="qc.group" clearable  placeholder="请选择分组方案" size="small" class="filter-item">
              <el-option value="A" v-bind:key="1" label="A组"></el-option>
              <el-option value="B" v-bind:key="2" label="B组"></el-option>
              <el-option value="C" v-bind:key="3" label="C组"></el-option>
              <el-option value="Cg" v-bind:key="4" label="C组高危"></el-option>
              <el-option value="Cd" v-bind:key="5" label="C组低危"></el-option>
            </el-select>
            <el-select v-model="qc.resultStatus" clearable  placeholder="肠镜结果" size="small" class="filter-item">
              <el-option value="1" v-bind:key="1" label="有结果"></el-option>
              <el-option value="2" v-bind:key="2" label="无结果"></el-option>
            </el-select>
          </div>

          <el-button class="filter-item" size="small" type="primary" icon="el-icon-search" @click="query(1,$store.state.uncompletedDNAexaminePageSize)" v-if="btnAuth.uncompletedDNAexamine_add_btn">查询</el-button>
          <el-button class="filter-item" type="primary" size="small" icon="el-icon-close" @click="reset" v-if="btnAuth.uncompletedDNAexamine_add_btn">重置</el-button>
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
            prop="cellPhone"
            label="手机号"
            >
          </el-table-column>
          <el-table-column
            prop="AreaName"
            label="地区医院"
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
            label="分组"
          >
            <template slot-scope="scope">
              <span>{{scope.row.group | group}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="肠镜结果"
            width="120"
          >
          <template slot-scope="scope">
              <span>{{scope.row.resultStatus | resultStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="dnaCode"
            label="粪便DNA编码"
            width="120"
          >
          </el-table-column>
          <el-table-column
            label="粪便DNA结果"
            width="120"
          >
            <template slot-scope="scope">
              <span>{{scope.row.dnaCheckResult | result}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="dnaCheckGoal"
            label="FIT-DNA得分"
            width="120"
            >
          </el-table-column>
          <el-table-column
            prop="dnaCheckQuantum"
            label="FIT定量化结果"
            width="120"
          >
          </el-table-column>
          <el-table-column
            label="PDF文件"
          >
            <template slot-scope="scope">
              <el-button type="text" class="btnStyle" size="small" v-if="btnAuth.uncompletedDNAexamine_add_btn &&scope.row.dnaCheckFilePath != null&&scope.row.dnaCheckFilePath != ''"><a :href="serverName + '/base/dnafile/downFile?filePath=' + scope.row.dnaCheckFilePath">下载PDF</a></el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="120"
          >
            <template slot-scope="scope">
              <el-button type="text" class="btnStyle" size="small" v-if="btnAuth.uncompletedDNAexamine_add_btn" @click="pass(scope.row.id,scope.row.sid)">通过</el-button>
              <el-button type="text" class="btnStyle" size="small" v-if="btnAuth.uncompletedDNAexamine_add_btn" @click="nopass(scope.row.id,scope.row.sid)">不通过</el-button>
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
                :current-page="$store.state.uncompletedDNAexaminePageNo"
                :page-sizes="[10, 20, 50, 100]"
                v-bind:page-size="$store.state.uncompletedDNAexaminePageSize"
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
      return {
        //权限判定
        uncompletedDNAexamine_page:false,
        btnAuth:{
          uncompletedDNAexamine_add_btn:false,
        },
        serverName:SERVER_NAME,
        //查询条件
        "qc":{
          "sid":null,
          "name":null,
          "phone":null,
          "group":null,
          "resultStatus":null,
          "communityDeptId":null,
          "areaDeptId":null,
          "loginName":null
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
        formLabelWidth: '180px',
        props: {
          value: 'id',
          children: 'child',
          label:'name'
        },

        ids:[],
      }
    },
    mounted(){
      this.$store.commit('LOGOUT_USER');
      let obj = this.checkPageAuth(this,"uncompletedDNAexamine_page",this.btnAuth);
      this.query(this.$store.state.uncompletedDNAexaminePageNo,this.$store.state.uncompletedDNAexaminePageSize);
    },
    beforeDestroy(){
      this.$store.state.uncompletedDNAexaminePageNo=1;
      this.$store.state.uncompletedDNAexaminePageSize=10;
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

        }

      },
      //查询
      query(pageNo,pageSize){
        $axios_http({
          url:"/base/hospital/country/todo/result/nodnaquery",
          data:{
            name:this.qc.name,
            sid:this.qc.sid,
            phone:this.qc.phone,
            group:this.qc.group,
            resultStatus:this.qc.resultStatus,
            communityDeptId:this.qc.communityDeptId,
            areaDeptId:this.qc.areaDeptId,
            loginName:this.qc.loginName,
            pageNo:pageNo,//当前页
            pageSize:pageSize//每页条数
          },
          vueObj:this
        }).then((res)=>{
          this.$store.commit('get_uncompletedDNAexaminePageNo',pageNo)
          this.queryResult.tableData=res.data.data;
          this.queryResult.totalPageCount=res.data.pageInfo.totalPageCount//获取总共多少页
          this.queryResult.totalRowCount=res.data.pageInfo.totalRowCount//获取总共条数
        })
      },
      showPDF(dnaCheckFilePath){
        window.open(dnaCheckFilePath)
      },
      //重置检索条件
      reset(){
        Object.assign(this.$data.qc, this.$options.data().qc)
        this.ids=[]
        this.query(this.$store.state.uncompletedDNAexaminePageNo,this.$store.state.uncompletedDNAexaminePageSize);
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
           this.query(this.$store.state.uncompletedDNAexaminePageNo,this.$store.state.uncompletedDNAexaminePageSize);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //通过
      pass(id,sid){
        this.$confirm('确定下发该报告?', '提示', {
          closeOnClickModal:false,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          $axios_http({
            url:"/base/country/stool/dna/updateIssuedStatus",
            data:{
              id:id,
              sid:sid,
              dnaCheckInformStatus:2
            },
            vueObj:this
          }).then((res)=>{
            $successMsg(this,"审批成功")
            this.query(this.$store.state.uncompletedDNAexaminePageNo,this.$store.state.uncompletedDNAexaminePageSize);
          })
        });
      },
      //不通过
      nopass(id,sid){
        this.$confirm('确认取消发放报告？', '提示', {
          closeOnClickModal:false,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          $axios_http({
            url:"/base/country/stool/dna/updateIssuedStatus",
            data:{
              id:id,
              sid:sid,
              dnaCheckInformStatus:1
            },
            vueObj:this
          }).then((res)=>{
            $successMsg(this,"审批成功")
            this.query(this.$store.state.uncompletedDNAexaminePageNo,this.$store.state.uncompletedDNAexaminePageSize);
          })
        });
      },
      //每页显示查询结果条数变更事件，做重新查询操作
      pageSizeChange(pageSize) {
        //this.queryResult.pageSize = pageSize
          this.$store.commit('get_uncompletedDNAexaminePageSize', pageSize)
         this.query(this.$store.state.uncompletedDNAexaminePageNo,pageSize);
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        //this.queryResult.pageNo = currentPage
        this.$store.commit('get_uncompletedDNAexaminePageNo',currentPage)
        this.query(currentPage,this.$store.state.uncompletedDNAexaminePageSize);
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
    margin-right:10px;
  }
</style>
