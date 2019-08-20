<template>
    <div slot="right" class="list-container" v-if="economyList_page">
      <div class="content">
       <div class="filter-container">
        <router-link to="/home/home" v-if="$store.state.hospitalType==1">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
         <router-link to="/home/areaHome" v-if="$store.state.hospitalType==2">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
         <router-link to="/home/countryHome" v-if="$store.state.hospitalType==3">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
           <el-form :model="qc" :inline="true" class="clear">
          <div>
            <el-input style="width: 200px;" size="small" class="filter-item" placeholder="姓名" v-model="qc.name" clearable>
            </el-input>
            <el-select v-model="qc.sex" clearable placeholder="性别" size="small" class="filter-item">
              <el-option value="1" v-bind:key="1" label="男"></el-option>
              <el-option value="2" v-bind:key="2" label="女"></el-option>
            </el-select>
            <el-input style="width: 200px;" size="small" class="filter-item" clearable placeholder="SID" v-model="qc.sid">
            </el-input>
            <el-input style="width: 200px;" size="small" class="filter-item" clearable placeholder="手机号" v-model="qc.phone">
            </el-input>
            <el-input  style="width: 200px;" size="small" class="filter-item" clearable placeholder="身份证号" v-model="qc.idCard">
            </el-input>
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
              v-model="qc.inGroupDateEnd"
              type="date"
              size="small"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="入组日期(止)"
              class="filter-item">
            </el-date-picker>
            <el-select v-model="qc.group" clearable placeholder="分组方案" size="small" class="filter-item">
              <el-option value="A" v-bind:key="1" label="A组"></el-option>
              <el-option value="B" v-bind:key="2" label="B组"></el-option>
              <el-option value="C" v-bind:key="3" label="C组"></el-option>
              <el-option value="Cg" v-bind:key="4" label="C组高危"></el-option>
              <el-option value="Cd" v-bind:key="5" label="C组低危"></el-option>
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
            <el-select v-model="qc.overallStatusCy" clearable placeholder="总体状态" size="small" class="filter-item">
              <el-option value="1" v-bind:key="1" label="正常"></el-option>
              <el-option value="2" v-bind:key="2" label="失访"></el-option>
              <el-option value="4" v-bind:key="4" label="死亡"></el-option>
              <el-option value="3" v-bind:key="3" label="患结直肠癌"></el-option>
            </el-select>
          <el-select v-model="qc.followState" clearable placeholder="随访状态" size="small" class="filter-item">
              <el-option v-for="(item,index) in followStatus" 
              :key="index" 
              :value="item.id" 
              :label="item.name"></el-option>
            </el-select>
          <el-select v-model="qc.followGroup" clearable placeholder="随访分组" size="small" class="filter-item">
            <el-option v-for="(item,index) in followGroup" 
            :key="index" 
            :value="item.id" 
            :label="item.name"></el-option>
          </el-select>
           <el-date-picker
              clearable
              v-model="qc.followBegin"
              type="date"
              size="small"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="计划随访开始时间(起)"
              class="filter-item"
              @change="changeFollowbegin">
            </el-date-picker>
             <el-date-picker
              clearable
              v-model="qc.followEnd"
              type="date"
              size="small"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="计划随访开始时间(止)"
              class="filter-item"
              :picker-options="pickerOptionsEnd">
            </el-date-picker>
             <el-select v-model="qc.heInsertStatus" clearable placeholder="录入状态" size="small" class="filter-item">
              <el-option value="9" v-bind:key="9" label="已提交"></el-option>
              <el-option value="0" v-bind:key="0" label="未提交"></el-option>
              <el-option value="2" v-bind:key="2" label="待录入"></el-option>
            </el-select>
              <el-select v-model="qc.colonoscopyResult" clearable placeholder="肠镜结果" size="small" class="filter-item">
              <el-option value="0" v-bind:key="0" label="阴性"></el-option>
              <el-option value="1" v-bind:key="1" label="阳性"></el-option>
            </el-select>
             <el-select v-model="qc.fitResult" placeholder="FIT结果" size="small" class="filter-item" clearable>
                  <el-option :value="item.value" :key="item.key" :label="item.label" v-for="item in $store.state.fitResult"></el-option>
            </el-select>
             <el-select v-model="qc.economyFollowup" clearable placeholder="卫生经济学随访分组" size="small" class="filter-item">
              <el-option value="0" v-bind:key="0" label="结肠镜阳性组"></el-option>
              <el-option value="1" v-bind:key="1" label="结肠镜阴性组"></el-option>
              <el-option value="2" v-bind:key="2" label="FIT阳性组"></el-option>
              <el-option value="3" v-bind:key="3" label="FIT阴性组"></el-option>
              <el-option value="4" v-bind:key="4" label="高危组"></el-option>
              <el-option value="5" v-bind:key="5" label="低危-FIT阳性组"></el-option>
              <el-option value="6" v-bind:key="6" label="低危-FIT阴性组"></el-option>
            </el-select>
          </div>
          <div>
             <el-button  size="small" type="primary" icon="el-icon-search"  @click="query(1,$store.state.economyPageSize)">查询</el-button>
             <el-button type="primary" size="small" icon="el-icon-close" @click="reset()">重置</el-button>
          </div>
        </el-form>
       </div>
       <div class="table-btn-grooup">
          <el-button size="small" type="primary" icon="el-icon-document" v-if="$store.state.hospitalType==2 || $store.state.hospitalType==3">
            <a :href="downloadUrl">导出EXCEL</a>
          </el-button>
        </div>
        <!-- 表格 -->
        <el-table
          :data="queryResult.tableData"
          border
          style="width:100%">
          <el-table-column
            prop="sid"
            label="SID"
            width="100">
          </el-table-column>
          <el-table-column
            prop="heId"
            label="卫生经济学ID"
            width="120">
          </el-table-column>
          <el-table-column
            prop="idCard"
            label="身份证号"
            width="160">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="depName"
            label="所属地区"
            width="200">
          </el-table-column>
          <el-table-column
            prop="nickName"
            label="所属社区"
            width="240">
          </el-table-column>
          <el-table-column
            prop="inGroupDate"
            label="入组时间"
            width="120">
          </el-table-column>
           <el-table-column
            prop="economyFollowup"
            label="卫生经济学随访分组"
            width="200">
             <template slot-scope="scope">
               <span>{{scope.row.economyFollowup | economyFollowup}}</span>
             </template>
          </el-table-column>
          <el-table-column
            prop="followBegin"
            label="计划随访开始日期"
            width="180">
          </el-table-column>
           <el-table-column
            prop="group"
            label="分组"
            width="180">
             <template slot-scope="scope">
               <span>{{scope.row.group | group}}</span>
             </template>
          </el-table-column>
           <el-table-column
            prop="followGroup"
            label="随访分组">
             <template slot-scope="scope">
               <span>{{scope.row.followGroup | followGroup}}</span>
             </template>
          </el-table-column>
           <el-table-column
            prop="colonoscopyResult"
            label="镜检结果">
             <template slot-scope="scope">
              <span>{{scope.row.colonoscopyResult | economycolonoscopyResult}}</span>
            </template>
          </el-table-column>
           <el-table-column
            prop="fitResult"
            label="FIT结果">
             <template slot-scope="scope">
              <span>{{scope.row.fitResult| result}}</span>
            </template>
          </el-table-column>
            <el-table-column
            prop="score"
            label="危险度评估"
            width="100">
          </el-table-column>
            <el-table-column
            prop="heInsertStatus"
            label="录入状态">
             <template slot-scope="scope">
              <span>{{scope.row.heInsertStatus| heInsertStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" v-if="scope.row.heInsertStatus == 9" @click="View(scope.row,'see')">查看</el-button>
            <el-button type="text" size="small" v-if="scope.row.heInsertStatus == 9" @click="View(scope.row,'edit')">编辑</el-button>
            <el-button type="text" size="small" v-if="scope.row.heInsertStatus == 2" @click="View(scope.row,'input')">开始录入</el-button>
            <el-button type="text" size="small" v-if="scope.row.heInsertStatus == 0" @click="View(scope.row,'continueInput')">继续录入</el-button>
          </template>
        </el-table-column>
        </el-table>
         <!--分页 -->
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
                  :current-page="$store.state.economyPageNo"
                  :page-sizes="[10, 20, 50, 100]"
                  v-bind:page-size="$store.state.economyPageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  v-bind:total="queryResult.totalPageCount">
                </el-pagination>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
</template>
<script>
import DICTIONARY from "@/utils/dictionary.js";
export default {
    data(){
        return{
           economyList_page:false,
           btnAuth:{

           },
          pickerOptionsEnd:{},
          areaFlag:'',   //3-国家；2-地区；1-社区；4-第三方
          group: DICTIONARY.group,
          followStatus: DICTIONARY.followStatus,
          followGroup: DICTIONARY.followGroup,
          followCategory: DICTIONARY.followCategory,
          //查询条件
          qc: {
            name: "",
            sex: null,
            phone: "",
            sid: "",
            inGroupDateStart: "",
            inGroupDateEnd: "",
            group: null,
            loginName: null,
            overallStatusCy: null,
            fitResult: null,
            dnaCode: null,
            idCard: null,
            followGroup: null,
            followState: null,
            followBegin:'',
            followEnd:'',
            heInsertStatus:'',
            colonoscopyResult:'',
            economyFollowup:''
          },
            props: {
              value: "id",
              children: "child",
              label: "name"
            },
            props1: {
              value: 'loginName',
              children: 'child',
              label:'name'
            },
           ids: [],
           downloadUrl:SERVER_NAME + "/base/hospital/healthEconomicsInfo/queryExcel",
           //查询结果
           queryResult: {
              pageNo: 1, //当前页
              pageSize: 10, //每页的条数
              totalPageCount: 0,
              tableData: [

              ]
            },
        }
    },
    mounted() {
         if(localStorage.getItem('communityType')=='true'){
            this.ids.push(localStorage.getItem('loginName'));
            this.qc.loginName=localStorage.getItem('loginName');
          }
         let obj = this.checkPageAuth(this,"economyList_page",this.btnAuth) 
         this.areaFlag = this.$store.state.hospitalType;
         this.query(1,10);
    },
    methods: {
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
      changeFollowbegin(){
        this.qc.followEnd = '';
        let followBegin = this.qc.followBegin;
        this.pickerOptionsEnd = {
           disabledDate(time) {
              return time.getTime() < new Date(followBegin).getTime() - 86400000;
           }
       }
      },
      //每页显示查询结果条数变更事件，做重新查询操作
      pageSizeChange(val) {
         this.$store.commit('get_economyPageSize', val);
         this.query(this.$store.state.economyPageNo,val);
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(val) {
          this.$store.commit('get_economyPageNo', val);
          this.query(val,this.$store.state.economyPageSize);
      },
      query(pageNo, pageSize){
           let dataobj = Object.assign(
                {},
                this.qc,
                {
                  pageNo:pageNo,
                  pageSize:pageSize
                })
          $axios_http({
             url:'/base/hospital/healthEconomicsList/query',
             data:dataobj,
             vueObj: this
           }).then((res)=>{
              if(res.data.statusMsg == 'success'){
                 this.queryResult.tableData = res.data.data;
                 this.queryResult.totalPageCount = res.data.pageInfo.totalRowCount;
              }
           }) 
      },
      reset(){
          Object.assign(this.$data.qc, this.$options.data().qc)
          if(localStorage.getItem('communityType')=='true'){
            this.ids.push(localStorage.getItem('loginName'));
            this.qc.loginName=localStorage.getItem('loginName');
          }
          this.query(1, 10)
      },
      View(row,params){
        // params:input录入,continueInput继续录入,see查看,edit编辑
        this.$router.push({
          path:'/economy/economyForm',
          query:{
            id:row.id,
            sid:row.sid,
            status:params
          }
        })
      }
    },
}
</script>
<style scoped>
 .content {
  background: #fff;
  padding: 10px;
}
.filter-item {
  width: 200px;
  margin-right: 10px;
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