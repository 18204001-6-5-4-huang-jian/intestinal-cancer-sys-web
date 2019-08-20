<template>
  <div slot="right" class="content-page" v-if="exportList_page">
    <div class="content">
      <div class="filter-container" >
        <router-link to="/home/home" v-if="$store.state.hospitalType == 1">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
        <router-link to="/home/areaHome" v-if="$store.state.hospitalType == 2">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
        <el-form :model="qc" :inline="true" class="searBox">
          <el-select v-model="qc.siteId" clearable placeholder="所属地区" size="small" class="filter-item">
              <el-option value="1" label="兰溪">兰溪</el-option>
              <el-option value="2" label="安徽">安徽</el-option>
              <el-option value="3" label="徐州">徐州</el-option>
              <el-option value="4" label="湖南">湖南</el-option>
              <el-option value="5" label="云南">云南</el-option>
              <el-option value="6" label="温岭">温岭</el-option>
            </el-select>
          <el-date-picker
              v-model="qc.inGroupDateStart"
              type="date"
              size="small"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="入组日期(起)"
              class="filter-item">
            </el-date-picker>
            <el-date-picker
              v-model="qc.inGroupDateEnd"
              type="date"
              size="small"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="入组日期(止)"
              class="filter-item">
            </el-date-picker>
            <!-- <el-select v-model="qc.stage_cy" clearable placeholder="筛查年度" size="small" class="filter-item">
              <el-option value="1" label="T0年">T0年</el-option>
              <el-option value="2" label="T1年">T1年</el-option>
              <el-option value="3" label="T2年">T2年</el-option>
              <el-option value="4" label="T3年">T3年</el-option>
            </el-select> -->
            <el-select v-model="qc.group" clearable placeholder="分组方案" size="small" class="filter-item">
              <el-option value="A" label="A组">A组</el-option>
              <el-option value="B" label="B组">B组</el-option>
              <el-option value="C" label="C组">C组</el-option>
              <el-option value="Cg" label="C组高危">C组高危</el-option>
              <el-option value="Cd" label="C组低危">C组低危</el-option>
            </el-select>
          <div>
          <el-button size="small" type="primary" icon="el-icon-document" @click="flag && exportExcel()" v-if="qc.content!='4' && qc.content!='5'">导出EXCEL</el-button>
           <!-- 唾液导出 -->
          <el-button size="small" type="primary" icon="el-icon-document" v-if="qc.content=='4'">
            <a :href="serverName + '/base/hospital/sample/queryBiologicalSampleAndExpressQueryExcel?type=saliva&stage_cy='+qc.stage_cy+'&group='+qc.group+'&siteId='+qc.siteId+'&inGroupDateStart='+qc.inGroupDateStart+'&inGroupDateEnd='+qc.inGroupDateEnd">导出EXCEL</a>
          </el-button>
           <!-- 粪便导出 -->
          <el-button size="small" type="primary" icon="el-icon-document" v-if="qc.content=='5'">
            <a :href="serverName + '/base/hospital/sample/queryBiologicalSampleAndExpressQueryExcel?type=stool&stage_cy='+qc.stage_cy+'&group='+qc.group+'&siteId='+qc.siteId+'&inGroupDateStart='+qc.inGroupDateStart+'&inGroupDateEnd='+qc.inGroupDateEnd">导出EXCEL</a>
          </el-button>
          <el-button size="small" type="primary" icon="el-icon-close" @click="reset">重置</el-button>
          </div>
          <el-col :span="8">
            <p>工作量内容：</p>
            <el-radio-group v-model="qc.content" @change="change()">
              <el-radio label="1">受试者状态列表</el-radio>
              <el-radio label="2">肠镜管理列表</el-radio>
              <el-radio label="3">血液样本采集与处理信息表</el-radio>
              <el-radio label="4">唾液样本采集与处理信息表</el-radio>
              <el-radio label="5">粪便样本采集与处理信息表</el-radio>
              <el-radio label="6">粪便潜血检验（噗噗管）发放和结果记录表</el-radio>
              <el-radio label="7">粪便DNA检测装置发放和结果记录表</el-radio>
              <el-radio label="8">筛查结果告知书发放记录列表</el-radio>
              <el-radio label="9">表A3年度信息更新表</el-radio>
              <el-radio label="10">表E1受试者联系记录表</el-radio>
              <el-radio label="11">表E2受试者无应答/违反研究方案表</el-radio>
            </el-radio-group>
          </el-col>
          <el-col :span="8">
            <p>表单内容：</p>
            <el-radio-group v-model="qc.content" @change="change()">
              <el-radio label="12">《表A1-受试者资格审核表》</el-radio>
              <!-- <el-radio label="13">《表A2-联系信息与危险因素调查表》</el-radio> -->
              <el-radio label="14">《表B1-结肠镜检查结果记录表》</el-radio>
              <el-radio label="15">《表B2-病理检查结果表》</el-radio>
              <el-radio label="16">《表B9-结直肠癌筛查结果告知书》</el-radio>
              <el-radio label="17">《表D2-违反方案事件记录表》</el-radio>
              <el-radio label="18">《表C1-结直肠癌表》</el-radio>
              <el-radio label="19">《表C2-结直肠癌表》</el-radio>
              <el-radio label="20">《表C3-结直肠癌诊断信息摘录表》</el-radio>
              <el-radio label="21">《表C4-结直肠癌表》</el-radio>
              <el-radio label="22">《表C5-死亡证明相关组表》</el-radio>
              <el-radio label="23">《粪便样本管理(新)》</el-radio>
            </el-radio-group>
          </el-col>
        </el-form>
              <el-tabs style="clear:both;"  v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="批量导出数据" name="1">
                    <el-select size="small" v-model="selectvalue" clearable placeholder="请选择" style="margin-left:100px;">
                       <el-option value="1" :key="1" label="T0"></el-option>
                       <el-option value="2" :key="2" label="T1"></el-option>
                    </el-select>
                    <el-button size="small" type="primary" icon="el-icon-document" style="margin-left:10px;" @click="batchExport()">批量导出</el-button>
                </el-tab-pane>
              </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Right',
    data () {
      return {
       //查询条件
        "qc":{
          "group":'',
          "siteId":'',
          'inGroupDateStart':'',
          'inGroupDateEnd':'',
          'stage_cy':'1',
          'content':''
        },
        //权限判定
        exportList_page:false,
         btnAuth:{
          buttonRoleAdd:false
        },
        serverName:SERVER_NAME,
        flag :true,
        activeName:'1',
        selectvalue:'1'
      }
    },
  
    mounted(){
      this.$store.commit('LOGOUT_USER');
      let obj = this.checkPageAuth(this,"exportList_page",this.btnAuth);
    },
  
    methods:{
      change(){
        if(this.qc.content=='4' || this.qc.content=='5'){
          this.flag=false
        }else{
          this.flag=true
        }
      },
        //重置检索条件
      reset(){
        Object.assign(this.$data.qc, this.$options.data().qc)
      },
      exportExcel(){
        let _url='',name=''   //导出文件名称
        let obj={
            "stage_cy":this.qc.stage_cy,
            "group":this.qc.group,
            "siteId":this.qc.siteId,
            "inGroupDateStart":this.qc.inGroupDateStart?this.qc.inGroupDateStart:null,
            "inGroupDateEnd":this.qc.inGroupDateEnd?this.qc.inGroupDateEnd:null,
            }
        if(!this.qc.content){
          this.$message({
            type: 'error',
            message: '请至少选择一个导出项'
          });
          return;
        }
        if(this.qc.content=="1"){
          name='受试者状态列表.xlsx'
          _url="/base/hospital/excel/stollnationUsersQueryExcel"
        }else if(this.qc.content=="2"){
          name='肠镜管理列表.xlsx'
          _url="/base/hospital/excel/queryFoStollCountryCJExcel"
        }else if(this.qc.content=="3"){
          name='血液样本采集与处理信息表.xlsx'
          _url="/base/hospital/excel/bloodSampleAndExpressQueryExcel"
        }
        else if(this.qc.content=="6"){
          name='粪便潜血检验（噗噗管）发放和结果记录表.xlsx'
          _url="/base/hospital/excel/stoolFitQueryExcel"
        }
        else if(this.qc.content=="7"){
          name='粪便DNA检测装置发放和结果记录表.xlsx'
          _url="/base/hospital/excel/stoolDnaQueryExcel"
        }
        else if(this.qc.content=="8"){
          name='筛查结果告知书发放记录列表.xlsx'
          _url="/base/hospital/excel/notificationRecordQueryExcel"
        }
        else if(this.qc.content=="9"){
          name='表A3年度信息更新表.xlsx'
          _url='/base/hospital/excel/yearInfoQueryExcel'
        }
        else if(this.qc.content=='10'){
           name='表E1受试者联系记录表.xlsx';
           _url='/base/hospital/excel/contactRecordQueryExcel'
        }
        else if(this.qc.content=='11'){
           name='表E2受试者无应答/违反研究方案表.xlsx';
           _url='/base/hospital/excel/violationResearchQueryExcel'
        }
        else if(this.qc.content=="12"){
          name='受试者资格审核表.xlsx'
          _url="/base/hospital/excel/stoolReviewQueryExcel"
        }
        else if(this.qc.content=="13"){
          name='联系信息与危险因素调查表.xlsx'
          _url="/base/hospital/excel/riskFactorQueryExcel"
        }
        else if(this.qc.content=="14"){
          name='结肠镜检查结果记录表.xlsx'
          _url="/base/hospital/excel/stoolColonoscopyResultQueryExcel"
        }
        else if(this.qc.content=="15"){
          name='病理检查结果表.xlsx'
          _url="/base/hospital/excel/pathologyQueryExcel"
        }
        else if(this.qc.content=="16"){
          name='结直肠癌筛查结果告知书.xlsx'
          _url="/base/hospital/excel/stoolNotificationQueryExcel"
        }
        else if(this.qc.content=="17"){
          name='违反方案事件记录表.xlsx'
          _url="/base/hospital/excel/violationSchemeQueryExcel"
        }
        else if(this.qc.content == '18'){
          name='《表C1-结直肠癌表》.xlsx';
          _url='/base/hospital/excel/cancerReportQueryExcel'
        }
        else if(this.qc.content == '19'){
          name='《表C2-结直肠癌表》.xlsx';
          _url='/base/hospital/excel/cancerDiagnoseQueryExcel'
        }
        else if(this.qc.content == '20'){
          name='《表C3-结直肠癌诊断信息摘录表》.xlsx';
          _url='/base/hospital/excel/cancerDiagnoseInformationQueryExcel'
        }
        else if(this.qc.content == '21'){
          name='《表C4-结直肠癌表》.xlsx';
          _url='/base/hospital/excel/cancerTreatmentInformationQueryExcel'
        }
        else if(this.qc.content == '22'){
          name='《表C5-死亡证明相关组表》.xlsx';
          _url='/base/hospital/excel/deathCertificateQueryExcel'
        }else if(this.qc.content == '23'){
          name = '粪便样本管理(新).xlsx';
          _url = '/base/hospital/excel/stoolSampleQueryExcel'
        }
        $axios_http({
          url:_url,
          responseType:'blob',
          data:obj,
          vueObj:this
        }).then((res)=>{
         if (!res.data) {
              return
          }
          if(res.data.type=='text/xml'){
            this.$confirm('对不起，您的登录状态已过期，请重新登录', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.$router.push({path: "/login"});
                }).catch(() => {
                });
            return;
          }
          let url = window.URL.createObjectURL(new Blob([res.data]))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', name)
          document.body.appendChild(link)
          link.click()
          URL.revokeObjectURL(link.href); // 释放URL 对象
          document.body.removeChild(link);
        })
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      batchExport(){
          if(this.selectvalue == ''){
              this.$message({
              type: 'error',
              message: '请至少选择一个导出年度'
            });
            return;
          }
          let name = '';
          let url = ''
          if(this.selectvalue == '1'){
             name = 'T0年度批量导出.zip';
             url = '/base/hospital/excel/batchexport?type=t0';
          }else if(this.selectvalue == '2'){
             name = 'T1年度批量导出.zip';
             url = '/base/hospital/excel/batchexport?type=t1';
          }
               $axios_http({
                url:url,
                responseType:'blob',
                vueObj:this
              }).then((res)=>{
              if (!res.data) {
                    return
                }
                if(res.data.type=='text/xml'){
                  this.$confirm('对不起，您的登录状态已过期，请重新登录', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                      }).then(() => {
                        this.$router.push({path: "/login"});
                      }).catch(() => {
                      });
                  return;
                }
                let url = window.URL.createObjectURL(new Blob([res.data]))
                let link = document.createElement('a')
                link.style.display = 'none'
                link.href = url
                link.setAttribute('download', name)
                document.body.appendChild(link)
                link.click()
                URL.revokeObjectURL(link.href); // 释放URL 对象
                document.body.removeChild(link);
              })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .filter-item{
    width: 200px;
    margin-right: 10px;

  }
  .return-home {
    display: block;
    text-align: center;
    margin-bottom:20px;
  }
  .table-btn-grooup{
    margin-top:20px;
    margin-bottom:10px;
  }
  .searBox .el-radio{
    display: block;
    margin-left: 0px;
    margin-bottom: 10px;
  }
 .el-col{
   margin-top: 20px;
 }
 .el-col p{
   margin-bottom: 20px;
 }
</style>
<style>
  .content {
    background: #fff;
    padding: 10px;
  }
</style>
