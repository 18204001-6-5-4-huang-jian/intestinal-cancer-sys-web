<template>
  <div slot="right" class="content-page" v-if="colonscopyDetail_page">
    <div class="content">
      <div class="filter-container">
        <!-- <router-link to="/colonscopy/colonscopyList"> -->
          <el-button size="small" class="returns" @click="$router.go(-1)">返回</el-button>
        <!-- </router-link> -->
        <el-button size="small" class="print" @click="printContent('print')">打印</el-button>
      </div>
      <div >
        <div class="booking-list-welcome">
          <img src="../../assets/img/anhui_logo.jpg" alt="">
          <h2 class="title">结直肠癌筛查项目结直肠镜预约单</h2>
        </div>
        <div class="booking-list">
          <!-- <span class="booking-list-tit">个人信息：</span> -->
          <el-row class="booking-list-item">
            <el-col :span="5">
              <div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple">
                      SID：{{detailData.sid}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="9">
              <div class="grid-content bg-purple-light">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple">
                      受试者姓名：{{detailData.name}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <!-- <el-col :span="5">
              <div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple">
                      性别：{{detailData.sex | reverseSex}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col> -->
            <el-col :span="4">
              <div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple">
                      年龄：{{detailData.age}}岁
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple">
                      电话：{{detailData.phone}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <el-row class="booking-list-item">
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple">
                      分组：
                      <span class="grid-content bg-purple-light" v-if="detailData.group=='C'">
                      {{detailData.group}}组{{detailData.riskLevel | riskLevelNew}}
                    </span>
                    <span class="grid-content bg-purple-light" v-if="detailData.group=='A'">
                      {{detailData.group}}组（结肠镜组）
                    </span>
                    <span class="grid-content bg-purple-light" v-if="detailData.group=='B'">
                      {{detailData.group}}组（便潜血组）
                    </span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple">
                      身份证号码：{{detailData.idCard}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
           <el-row class="booking-list-item">
            <el-col :span="24">
              <div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple">
                      地址：安徽省合肥市环湖东路107号
                      <!-- 地址：{{detailData.deptDesc}} -->
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="booking-list">
          <!-- <span class="booking-list-tit">预约信息：</span> -->
           <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="24">
                    <p class="grid-content bg-purple" style="margin-bottom:10px;">
                      请您于<span style="color:red">{{detailData.bookingTime}}</span>，持本人身份证前往安徽省肿瘤医院[合肥市环湖东路107号（西二环路植物园西边）] 门诊挂号大厅城市癌症筛查登记处登记报到
                    </p>
                    <p class="grid-content bg-purple">
                      <b>筛查流程：</b>社区取预约单 → 肠道准备 → 检查当天（周一至周五下午2:30）或（周六上午10点）门诊检验科唾液检查 →  门诊2楼体检中心采血 → 门诊3楼内镜中心等待
                    </p>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>
          <div class="booking-list booking-list-detail">
            <!-- <span class="booking-list-tit">温馨提醒：</span> -->
            <p><b>温馨提示：</b>为保证结直肠镜顺利检查，请您：</p>
            <p><span>1.</span>检查前一天进食米粥等无渣饮食，检查当天禁食。</p>
            <p><span>2.</span>结肠镜检查前一天晚上7点，磷酸钠盐口服液1瓶（45毫升）+温开水 750毫升（即1斤半，约普通矿泉水瓶1瓶半）快速喝完；如无明显不适，继续饮水1000毫升（即2斤，约普通矿泉水瓶2瓶）。</p>
            <p><span>3.</span>结肠镜检查当天早晨7点，空腹，磷酸钠盐口服液1瓶（45毫升）+温开水 750毫升（即1斤半，约普通矿泉水瓶1瓶半）快速喝完；喝完后于1小时内尽快饮温开水至少1500毫升（即3斤，约普通矿泉水瓶3瓶）。</p>
            <p><span>4.</span>结肠镜检查当天上午10时前尽量多饮白开水，多走动。上午10时后不再饮水。</p>
            <p><span>5.</span>周一至周五下午2:30左右至门诊三楼内镜中心候诊；周六上午10时之后至门诊三楼内镜中心候诊。</p>
            <p><span>6.</span>高血压患者检查前如长期服用阿司匹林等抗凝药物者需停药一周方可接受检查。</p>
            <p><span>7.</span>女性月经期不做肠镜。</p>
            <p><span>8.</span>检查当天最好有家属陪同。</p>
        </div>
        <div class="booking-list">
            <p style="margin-top:10px;font-size:16px;"><b>备注：</b>筛查报告单请于检查后一周去当地社区卫生服务中心领取，如行活检做病理检查者，病理报告单原件请居民自行到安徽省肿瘤医院行政楼3楼西侧城癌筛查项目办领取，咨询电话：0551-65327639/65327666</p>
        </div>
      </div>

    </div>
    <div id="print">
      <div class="filter-container">
        <router-link to="/colonscopy/colonscopyList">

        </router-link>

      </div>
      <div class="print-title">
        <img src="../../assets/img/anhui_logo.jpg" alt="">
        <h2 class="title">结直肠癌筛查项目结直肠镜预约单</h2>
      </div>
      <div class="booking-list1">
        <el-row class="booking-list-item">
            <el-col :span="5">
              <div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple">
                      SID：{{detailData.sid}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="9">
              <div class="grid-content bg-purple-light">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple">
                      受试者姓名：{{detailData.name}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <!-- <el-col :span="5">
              <div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple">
                      性别：{{detailData.sex | reverseSex}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col> -->
            <el-col :span="4">
              <div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple">
                      年龄：{{detailData.age}}岁
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple">
                      电话：{{detailData.phone}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <el-row class="booking-list-item">
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple">
                      分组：
                      <span class="grid-content bg-purple-light" v-if="detailData.group=='C'">
                      {{detailData.group}}组{{detailData.riskLevel | riskLevelNew}}
                    </span>
                    <span class="grid-content bg-purple-light" v-if="detailData.group=='A'">
                      {{detailData.group}}组（结肠镜组）
                    </span>
                    <span class="grid-content bg-purple-light" v-if="detailData.group=='B'">
                      {{detailData.group}}组（便潜血组）
                    </span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple">
                      身份证号码：{{detailData.idCard}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
           <el-row class="booking-list-item">
            <el-col :span="24">
              <div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple">
                      地址：安徽省合肥市环湖东路107号
                      <!-- 地址：{{detailData.deptDesc}} -->
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
      </div>
      <div class="booking-list1">
        <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="24">
                    <p class="grid-content bg-purple" style="margin-bottom:10px;">
                      请您于<span style="color:red">{{detailData.bookingTime}}</span>，持本人身份证前往安徽省肿瘤医院[合肥市环湖东路107号（西二环路植物园西边）] 门诊挂号大厅城市癌症筛查登记处登记报到
                    </p>
                    <p class="grid-content bg-purple">
                      <b>筛查流程：</b>社区取预约单 → 肠道准备 → 检查当天（周一至周五下午2:30）或（周六上午10点）门诊检验科唾液检查 →  门诊2楼体检中心采血 → 门诊3楼内镜中心等待
                    </p>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
      </div>
          <div class="booking-list1 booking-list-detail">
            <!-- <span class="booking-list-tit">温馨提醒：</span> -->
            <p><b>温馨提示：</b>为保证结直肠镜顺利检查，请您：</p>
            <p><span>1.</span>检查前一天进食米粥等无渣饮食，检查当天禁食。</p>
            <p><span>2.</span>结肠镜检查前一天晚上7点，磷酸钠盐口服液1瓶（45毫升）+温开水 750毫升（即1斤半，约普通矿泉水瓶1瓶半）快速喝完；如无明显不适，继续饮水1000毫升（即2斤，约普通矿泉水瓶2瓶）。</p>
            <p><span>3.</span>结肠镜检查当天早晨7点，空腹，磷酸钠盐口服液1瓶（45毫升）+温开水 750毫升（即1斤半，约普通矿泉水瓶1瓶半）快速喝完；喝完后于1小时内尽快饮温开水至少1500毫升（即3斤，约普通矿泉水瓶3瓶）。</p>
            <p><span>4.</span>结肠镜检查当天上午10时前尽量多饮白开水，多走动。上午10时后不再饮水。</p>
            <p><span>5.</span>周一至周五下午2:30左右至门诊三楼内镜中心候诊；周六上午10时之后至门诊三楼内镜中心候诊。</p>
            <p><span>6.</span>高血压患者检查前如长期服用阿司匹林等抗凝药物者需停药一周方可接受检查。</p>
            <p><span>7.</span>女性月经期不做肠镜。</p>
            <p><span>8.</span>检查当天最好有家属陪同。</p>
        </div>
        <div class="booking-list1">
            <p style="margin-top:10px;font-size:16px;"><b>备注：</b>筛查报告单请于检查后一周去当地社区卫生服务中心领取，如行活检做病理检查者，病理报告单原件请居民自行到安徽省肿瘤医院行政楼3楼西侧城癌筛查项目办领取，咨询电话：0551-65327639/65327666</p>
        </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import dateFormater  from '../../filters/index'
  export default {
    data () {
      return {
        colonscopyDetail_page: false,
        btnAuth: {
          bookingManagement_query_btn: false,
          bookingDetail_query_btn: false,
          exportExcel_btn: false,
          booking_add_btn: false,
          booking_user_add_btn: false,
        },
        formLabelWidth: '100px',
        "detailData": {
          "sid": "",
          "name": "",
          "phone": "",
          "inGroupDate": "",
          "group": "",
          "proName": "",
          "bookingTime": "",
          "deptName": "",
          "examinationPlace": "",
          "deptDesc":''
        }
      }
    },
    mounted(){
      let obj = this.checkPageAuth(this, "colonscopyDetail_page", this.btnAuth)
      this.query();
    },
    methods: {
      //查询
      query(){
        $axios_http({
          url: "/base/colonoscopy/record/reserve/detail/" + this.$route.query.id,
          data: {},
          vueObj: this
        }).then((res) => {
          this.detailData = res.data.data;
          this.detailData.bookingTime=dateFormater.dateFormater2(this.detailData.bookingTime)
        })
      },
      printContent: function (element) {
        let subOutputRankPrint = document.getElementById(element);
        let newContent = subOutputRankPrint.innerHTML;
        let oldContent = document.body.innerHTML;
        document.body.innerHTML = newContent;
        window.print();
        window.location.reload();
        document.body.innerHTML = oldContent;
        return false;
      },
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .booking-list,.booking-list1 {
    margin: 0 auto;
    width: 850px;
    padding: 15px 0;
    border-top:1px solid #999;
  }

  .booking-list-item {
    height: 40px;
    line-height: 40px;
  }

  .booking-list-tit {
    font-weight: bold;
    font-size: 18px;
    line-height: 40px;
  }

  .returns {
    float: left;
  }

  .print {
    float: right;
  }

  .content-page {
    padding: 20px;
    background: #fff;
    width: 100%;
    height: 100%;
  }

  .booking-list-welcome {
    margin: 50px auto 0;
    font-size: 20px;
   width: 850px;
   position: relative;
    /*padding-left: 300px;*/
  }

  .booking-list-welcome p {
    height: 24px;
    line-height: 30px;
  }
   .booking-list-welcome img{
     position: absolute;
     top: -30px;
   }

  .p-title {
    margin-bottom: 20px;
  }

  #print {
    display: none;
    /*height:500px;*/
    width:100%;
    padding-top: 20px;
    padding-left: 50px;
    margin-left: 50px;
  }

  .print-title {
    margin-top: 30px;
    font-size: 20px;
    position: relative;
  }
   .print-title img{
     position:absolute;
     top: -30px;
   }

  .print-title-list {
    margin-top: 10px;
    margin-left: 80px;

  }

  .print-title-1 {
    margin-top: 20px;
    margin-left: 80px
  }
  .title{
    text-align: center;
    font-weight: bold;
    font-size: 26px;
    margin-bottom: 30px;
  }
  .booking-list p,.booking-list1 p{
    line-height: 40px;
  }
  .grid-content, p{
    font-size: 20px;
  }
  .booking-list-detail p{
    position: relative;
    padding-left: 25px;
  }
   .booking-list-detail p:nth-child(1){
     padding-left:0;
   }
  .booking-list-detail p span{
    position: absolute;
    left: 0;

  }
</style>
