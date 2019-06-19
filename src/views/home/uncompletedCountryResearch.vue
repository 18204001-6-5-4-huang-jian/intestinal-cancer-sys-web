<template>
  <div slot="right" class="content-page" v-if="uncompletedCountryResearch_page">
    <div class="content">
      <div class="filter-container">
        <router-link to="/home/countryHome">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
        <el-form :model="qc" :inline=true class="clear">
          <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="姓名" v-model="qc.name"   clearable>
          </el-input>
          <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="SID" v-model="qc.sid"   clearable>
          </el-input>
          <el-input  style="width: 200px;" size="small" class="filter-item" placeholder="手机号" v-model="qc.phone"   clearable>
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
            <el-select v-model="qc.group" clearable placeholder="请选择分组方案" size="small" class="filter-item">
              <el-option value="A" v-bind:key="1" label="A组"></el-option>
              <el-option value="B" v-bind:key="2" label="B组"></el-option>
              <el-option value="C" v-bind:key="3" label="C组"></el-option>
              <el-option value="Cg" v-bind:key="4" label="C组高危"></el-option>
              <el-option value="Cd" v-bind:key="5" label="C组低危"></el-option>
            </el-select>
            <el-date-picker
            v-model="qc.inGroupDateStart"
            type="date"
            clearable
            size="small"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            placeholder="入组日期(起)"
            class="filter-item">
          </el-date-picker>
            <el-date-picker
              clearable
              v-model="qc.inGroupDateEND"
              type="date"
              size="small"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="入组日期(止)"
              class="filter-item">
            </el-date-picker>
            <el-date-picker
              v-model="qc.quitGroupDateStart"
              type="date"
              clearable
              size="small"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="退出日期(起)"
              class="filter-item">
            </el-date-picker>
            <el-date-picker
              clearable
              v-model="qc.quitGroupDateEnd"
              type="date"
              size="small"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="退出日期(止)"
              class="filter-item">
            </el-date-picker>
            <el-select v-model="qc.offGroupReason" clearable placeholder="退出原因" size="small" class="filter-item">
              <el-option value="受试者拒绝随访" v-bind:key="1" label="受试者拒绝随访"></el-option>
              <el-option value="受试者失联" v-bind:key="2" label="受试者失联"></el-option>
              <el-option value="撤回知情同意书主动退出研究" v-bind:key="3" label="撤回知情同意书主动退出研究"></el-option>
              <el-option value="随机分配无效" v-bind:key="4" label="随机分配无效"></el-option>
              <el-option value="其他" v-bind:key="5" label="其他"></el-option>
            </el-select>
            <el-select v-model="qc.inD2Status" clearable placeholder="D2表录入状态" size="small" class="filter-item">
              <el-option value="0" v-bind:key="0" label="未录入"></el-option>
              <el-option value="1" v-bind:key="1" label="已录入"></el-option>
            </el-select>
          </div>
          <div>
            <el-button size="small" type="primary" icon="el-icon-search" @click="query(1,$store.state.uncompletedfecalListPageSize)">查询</el-button>
            <el-button  type="primary" size="small" icon="el-icon-close" @click="reset" >重置</el-button>
          </div>
        </el-form>
      </div>
      <div >
        <div class="table-btn-grooup">
          <!--<el-button  size="small" type="primary" icon="el-icon-search" >导出EXCEL</el-button>-->
          <!--<el-button  size="small" type="primary" icon="el-icon-plus" @click="add()" >新增</el-button>-->
          <!--<el-button  size="small" type="primary" icon="el-icon-search"  @click="openQuitDialog">一键处理</el-button>-->
        </div>
        <!--数据列表-->
        <el-table
          :data="queryResult.tableData"
          border
          ref="multipleTable"
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
            label="所属地区"
          >
          </el-table-column>
          <el-table-column
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
          >
          </el-table-column>
          <el-table-column
            prop="quit_date"
            label="退出日期"
          >
          </el-table-column>
          <el-table-column
            prop="off_group_reason"
            label="退出原因"
          >
          </el-table-column>

          <el-table-column
            label="D2表录入状态"
          >
            <template slot-scope="scope">
              <!-- <span v-if="scope.row.D2_id  != null">已录入</span>
              <span v-if="scope.row.D2_id  == null">未录入</span> -->
              <span v-if="scope.row.entry_status  == 1">已录入</span>
              <span v-if="scope.row.entry_status  == 2">未录入</span>
            </template>
          </el-table-column>

          <el-table-column
            label="操作"
            width="150"
          >
            <template slot-scope="scope">
              <router-link :to="{ path: '/home/showReport4',query:{id:scope.row.D2_id,sid:scope.row.sid}}">
                <el-button type="text" class="btnStyle" size="small"   v-if="scope.row.entry_status  == 1">查看</el-button>
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
                :current-page="$store.state.uncompletedfecalListPageNo"
                :page-sizes="[10, 20, 50, 100]"
                v-bind:page-size="$store.state.uncompletedfecalListPageSize"
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
        uncompletedCountryResearch_page:false,
        btnAuth:{
          one_colonscopyList_btn:false,
        },
        //查询条件
        "qc":{
          "name":null,
          "sex":null,
          "phone":null,
          "sid":null,
          "group":null,
          "inGroupDateStart":null,
          "inGroupDateEND":null,
          "quitGroupDateStart":null,
          "quitGroupDateEnd":null,
          "communityDeptId":null,
          "areaDeptId":null,
          "loginName":null,
          "offGroupReason":null,
          "inD2Status":null,
        },
        //地区分组
        deptGroup:[],
        //查询结果
        "queryResult":{
          "pageNo":1,//当前页
          "pageSize":10,//每页的条数
          "totalPageCount":0,
          "tableData":[]
        },
        props: {
          value: 'id',
          children: 'child',
          label:'name'
        },

        ids:[],

      }
    },
    mounted(){
      let obj = this.checkPageAuth(this,"uncompletedCountryResearch_page",this.btnAuth)
      this.query(this.$store.state.uncompletedfecalListPageNo,this.$store.state.uncompletedfecalListPageSize);
    },
    beforeDestroy(){
      this.$store.state.uncompletedfecalListPageNo=1;
      this.$store.state.uncompletedfecalListPageSize=10;
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
          url:"/base/hospital/person/quitalllog/query",
          data:{
            name:this.qc.name,
            sid:this.qc.sid,
            phone:this.qc.phone,
            sex:this.qc.sex,
            group:this.qc.group,
            inGroupDateStart:this.qc.inGroupDateStart,
            inGroupDateEND:this.qc.inGroupDateEND,
            quitGroupDateStart:this.qc.quitGroupDateStart,
            quitGroupDateEnd:this.qc.quitGroupDateEnd,
            communityDeptId:this.qc.communityDeptId,
            areaDeptId:this.qc.areaDeptId,
            loginName:this.qc.loginName,
            offGroupReason:this.qc.offGroupReason,
            inD2Status:this.qc.inD2Status,
            pageNo:pageNo,//当前页
            pageSize:pageSize//每页条数
          },
          vueObj:this
        }).then((res)=>{
          this.$store.commit('get_uncompletedfecalListPageNo',pageNo)
          this.queryResult.tableData=res.data.data;
          this.queryResult.totalPageCount=res.data.pageInfo.totalPageCount//获取总共多少页
          this.queryResult.totalRowCount=res.data.pageInfo.totalRowCount//获取总共条数
        })
      },
      //重置检索条件
      reset(){
        Object.assign(this.$data.qc, this.$options.data().qc)
        this.query(this.$store.state.uncompletedfecalListPageNo,this.$store.state.uncompletedfecalListPageSize);
        this.ids = []
      },
      //每页显示查询结果条数变更事件，做重新查询操作
      pageSizeChange(pageSize) {
        this.$store.commit('get_uncompletedfecalListPageSize', pageSize)
        this.query(this.$store.state.uncompletedfecalListPageNo,pageSize);
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        this.$store.commit('get_uncompletedfecalListPageNo',currentPage)
        this.query(currentPage,this.$store.state.uncompletedfecalListPageSize);
      }

    }}

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
    margin-top:20px;
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
  .notification-input{
    width: 220px;
  }
  .clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}
  .filter-item{
    width:200px;
    margin-right:10px;
  }
</style>
