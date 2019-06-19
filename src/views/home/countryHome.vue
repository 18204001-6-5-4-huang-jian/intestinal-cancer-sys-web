<template>
    <div slot="right" class="content-page" v-if="countryHome_page">
      <el-row :gutter="30">
        <el-col :span="24">
          <div class="grid-content bg-purple">
            <div class="home-message-title">消息中心</div>
            <div class="home-message">
              <div class="home-message">
                <!-- <img src="../../assets/img/info.png" />
                <h3>欢迎参加中国结直肠癌筛查项目</h3>
                <p>您的一份奉献，将会使更多家庭从结直肠癌的早诊早治中受益</p> -->
                <homeNews></homeNews> 
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row  class="home-message-list">
        <el-col :span="10">
          <div class="home-message-title">待办事项</div>
          <div class="home-message-item home-message-top">
            <router-link to="/home/uncompletedDNAexamine">
            <dl>
              <el-badge :value="backlog.noStoolDNAResult" class="item">
                <dt>
                  <img src="../../assets/img/list-item.png" alt="">
                </dt>
              </el-badge>
              <dd class="home-message-itemTitle">
                粪便DNA结果待审核
              </dd>
            </dl>
            </router-link>
          </div>
          <!-- <div class="home-message-item home-message-top">
            <router-link to="/home/stayEntryPathology">
            <dl>
              <el-badge :value="backlog.notEntryPathologyResult" class="item">
                <dt>
                  <img src="../../assets/img/list-item.png" alt="">
                </dt>
              </el-badge>
              <dd class="home-message-itemTitle">
                待会诊
              </dd>
            </dl>
            </router-link>
          </div> -->
        </el-col>
        <el-col :span="14">
          <div class="home-message-title">项目进度</div>
          <div class="home-message-item home-message-top">
            <router-link to="/home/uncompletedArea">
            <!-- <dl>
                <dt>
                  <img src="../../assets/img/list-item.png" alt="">
                </dt>
              <dd class="home-message-itemTitle">
                地区待办查看
              </dd>
            </dl> -->
            <el-button type="primary" style="margin-top:20px;">地区待办查看</el-button>
            </router-link>
          </div>
          <div class="home-message-item home-message-top">
            <router-link to="/home/uncompletedCommunityNation">
              <!-- <dl>
                <el-badge :value="backlog.riskFactors" class="item" >
                  <dt>
                    <img src="../../assets/img/list-item.png" alt="">
                  </dt>
                </el-badge>
                <dd class="home-message-itemTitle">
                  社区待办查看
                </dd>
              </dl> -->
              <el-button type="primary" style="margin-top:20px;">社区待办查看</el-button>
            </router-link>
          </div>
          <div class="home-message-item home-message-top">
            <router-link to="/home/homeFollowupProgressCountry">
              <!-- <dl>
                <dt>
                  <img src="../../assets/img/list-item.png" alt="">
                </dt>
                <dd class="home-message-itemTitle">
                  退出研究查看
                </dd>
              </dl> -->
               <el-button type="primary" style="margin-top:20px;">随访进度</el-button>
            </router-link>
          </div>
        </el-col>
      </el-row>

    </div>

</template>

<script>
import homeNews from '../components/homeNews'   //消息中心
  export default {
    name: 'Right',
    components:{
      homeNews
    },
    data () {
      return {
        "backlog":{
          "riskFactors":'',//待收集危险因素
          "notEntryFITCode":'' ,//待录入FIT编号
          "notEntryFITResult":'' ,//待录入FIT结果
          "notStoolDnaCode":'',//未录入粪便DNA装置编号
          "notReserve":'',//未预约结肠镜检查
          "notFinishExamination":'',//未完成结肠镜检查
          "notIssueNotification":'',//未发放筛查结果告知书
          "notEntryColonoscopyResult":'',//待录入肠镜结果
          "notEntryPathologyResult":'',//待录入病理结果
          "notEntryNotificationResult":''//待录入筛查结果告知书
        },
        //权限判定
        countryHome_page: false,
        btnAuth: {
          regionalHospitalNumber_btn:false,
        },
        //查询条件
        "qc": {
          "name": "",
          "desc": ""
        },
        allocateResourcesData: [],
      }
    },
    mounted(){
      this.$store.commit('LOGOUT_USER');
      let obj = this.checkPageAuth(this, "countryHome_page", this.btnAuth);
      this.query();
    },
    methods: {
      //查询
      query(){
        $axios_http({
          url: "/base/hospital/community/todo/query",
          data: {},
          vueObj: this
        }).then((res) => {
          console.log(res)
          this.backlog.notEntryColonoscopyResult=res.data.data.notEntryColonoscopyResult;
          this.backlog.noStoolDNAResult=res.data.data.noStoolDNAResult;
          this.backlog.notEntryPathologyResult=res.data.data.notEntryPathologyResult;
          this.backlog.notEntryNotificationResult=res.data.data.notEntryNotificationResult;
        })
      },

    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .home-message img{
    height: 70%;
  }
  .home-message h3{
    color:#303133;
  }
  .home-message p{
    color:#99a9bf;
    font-size:14px;
  }
  .home-message {
    height: 250px;
    background: #ffffff;
    -webkit-border-radius: 50px;
    -moz-border-radius: 50px;
    border-radius: 4px;
    line-height: 30px;
    text-align: center;
  }
  .home-message-title{
    height: 25px;
    line-height: 25px;
    font-size: 14px;
    color:#B3B3BB;
  }
  .add-user{
    height: 260px;
    border-radius: 4px;
    background: #fff;
  }
  .home-message-list{
    margin-top: 20px;
  }
  .home-message-item{
    text-align: center;
    padding-top: 25px;
    height: 120px;
    background: #fff;
    -webkit-border-radius: 50px;
    -moz-border-radius: 50px;
    border-radius: 4px;
    float: left;
    width:160px;
    margin-right: 34px;
  }
  .home-message-top{
    margin-bottom: 20px;
  }
  .home-message-itemTitle{
    font-size: 12px;
     ;
  }
  .add-user{
    text-align: center;
    overflow-x: hidden;

  }
  .add-user-title{
    color:#419FFE;
  }
  .add-user dl{
    padding-top:30px;
    height: 210px;
    border:2px solid #AAD6F3;

  }
  .add-dna-btn{
    height:50px;
    color: #fff;
    background:#53A2E5;
    text-align: center;
    line-height:50px;
    font-size:12px ;

  }
  .home-message ul li{
    list-style-type: none;
    text-align: center;
  }
  .home-message ul{
    padding-top:40px;
  }
  .home-hospital-name{
    height:35px;
    line-height:35px;
    font-size:20px;
    font-weight:700;
  }
  .home-hospital-time{
    color: #b2b2b2;
    font-size:12px;
  }
  .home-hospital-count{
    height:70px;
    line-height:70px;
    font-size:30px;
    font-weight:700;
  }
  .home-message-number img{
    width: 120px;
    height: 120px;
    border:1px solid #e5e5e5;
  }
  .home-number-btn{
    width: 120px;
    margin-top: 10px;
  }
</style>
