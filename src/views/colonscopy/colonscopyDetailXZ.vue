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
          <h2 class="title">结直肠癌筛查项目体检预约单</h2>
          <P>居民您好！欢迎您参加中国人群结直肠癌筛查项目！本次筛查为免费体检，请您认真核对以下身份信息，核对无误后，<b>携带本人身份证和本预约单于【{{detailData.bookingTime}}】前来【徐州市肿瘤医院筛查中心】登记体检，</b>如发现身份信息错误或预约过期请联系您的问卷调查员。</P>
        </div>
        <div class="booking-list">
          <span class="booking-list-tit">个人信息：</span>
          <el-row class="booking-list-item">
            <el-col :span="6">
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
              <el-col :span="8">
              <div class="grid-content bg-purple-light">
                  <el-col :span="24">
                    <div class="grid-content bg-purple">
                      姓名：{{detailData.name}}
                    </div>
                  </el-col>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple">
                      性别：{{detailData.sex | reverseSex}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple">
                      年龄：{{detailData.age}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <el-row class="booking-list-item">
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple">
                      身份证号：{{detailData.idCard}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple">
                      联系电话：{{detailData.phone}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <el-row class="booking-list-item">
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple">
                      入组日期：{{detailData.inGroupDate | date}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
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
          </el-row>
        </div>
        <div class="booking-list">
            <span class="booking-list-tit">体检注意事项：</span>
            <p>1、本次预约检查项目为<b>普通结肠镜，</b>登记体检后我们会为您发放结肠镜检查单；</p>
            <p>2、在进行肠镜检查前将进行血液检查、心电图检查和唾液样本采集；</p>
            <p>3、因进行肠镜检查前需进行肠道清理，<b>登记体检当天无法进行检查，检查时间需另行预约；</b></p>
            <p>4、登记体检时将为您发放清肠药物并告知服用方法和肠镜检查注意事项。</p>
        </div>
        <div class="booking-list">
            <span class="booking-list-tit">体检顺序指引 ：</span>
            <p>到达肿瘤医院（市三院）→ 进门右拐至放疗楼（E座）北二楼筛查中心登记体检 → 领取体检单 → 签署知情同意书 → 到相关科室预约并完成体检</p>
        </div>
         <div class="booking-list">
            <span class="booking-list-tit">医院地址 ：</span>
            <p>徐州市环城路131号（市内乘2路、46路、71路、73路、76路、607路、610路到市三院下即到）</p>
        </div>
         <div class="booking-list">
            <span class="booking-list-tit">市三院筛查中心电话 ：</span>
            <p>85537711</p>
        </div>
        <div class="booking-list">
            <span class="booking-list-tit">服务时间 ：</span>
            <p>周一至周五：上午8点到11点</p>
            <p style="text-align:center;font-size:20px;font-weight:bold;margin-top:20px;">此预约单仅可打印一次，遗失不补！请您妥善保管！以免耽误您的体检！</p>
        </div>
      </div>

    </div>
    <div id="print">
      <div class="filter-container">
        <router-link to="/colonscopy/colonscopyList">

        </router-link>

      </div>
      <div class="print-title">
        <h2 class="title">结直肠癌筛查项目体检预约单</h2>
        <P>居民您好！欢迎您参加中国人群结直肠癌筛查项目！本次筛查为免费体检，请您认真核对以下身份信息，核对无误后，<b>携带本人身份证和本预约单于【{{detailData.bookingTime}}】前来【徐州市肿瘤医院筛查中心】登记体检，</b>如发现身份信息错误或预约过期请联系您的问卷调查员。</P>
      </div>
      <div class="booking-list1">
        <span class="booking-list-tit">个人信息：</span>
         <el-row class="booking-list-item">
           <el-col :span="6">
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
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple">
                      姓名：{{detailData.name}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple">
                      性别：{{detailData.sex | reverseSex}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple">
                      年龄：{{detailData.age}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <el-row class="booking-list-item">
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple">
                      身份证号：{{detailData.idCard}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple">
                      联系电话：{{detailData.phone}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <el-row class="booking-list-item">
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple">
                      入组日期：{{detailData.inGroupDate | date}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
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
          </el-row>
      </div>
      <div class="booking-list1">
            <span class="booking-list-tit">体检注意事项：</span>
            <p>1、本次预约检查项目为<b>普通结肠镜，</b>登记体检后我们会为您发放结肠镜检查单；</p>
            <p>2、在进行肠镜检查前将进行血液检查、心电图检查和唾液样本采集；</p>
            <p>3、因进行肠镜检查前需进行肠道清理，<b>登记体检当天无法进行检查，检查时间需另行预约；</b></p>
            <p>4、登记体检时将为您发放清肠药物并告知服用方法和肠镜检查注意事项。</p>
        </div>
        <div class="booking-list1">
            <span class="booking-list-tit">体检顺序指引 ：</span>
            <p>到达肿瘤医院（市三院）→ 进门右拐至放疗楼（E座）北二楼筛查中心登记体检 → 领取体检单 → 签署知情同意书 → 到相关科室预约并完成体检</p>
        </div>
         <div class="booking-list1">
            <span class="booking-list-tit">医院地址 ：</span>
            <p>徐州市环城路131号（市内乘2路、46路、71路、73路、76路、607路、610路到市三院下即到）</p>
        </div>
         <div class="booking-list1">
            <span class="booking-list-tit">市三院筛查中心电话 ：</span>
            <p>85537711</p>
        </div>
        <div class="booking-list1">
            <span class="booking-list-tit">服务时间 ：</span>
            <p>周一至周五：上午8点到11点</p>
            <p style="text-align:center;font-size:20px;font-weight:bold;margin-top:20px;">此预约单仅可打印一次，遗失不补！请您妥善保管！以免耽误您的体检！</p>
        </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
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
          console.log(res)



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

  .booking-list {
    margin: 0 auto;
    width: 850px;
    padding-top: 20px;
  }

  .booking-list1 {
    margin-left: 80px;
    width: 850px;
    padding-top: 30px;
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
    /*padding-left: 300px;*/
  }

  .booking-list-welcome p {
    line-height: 40px;
    text-indent: 2em;
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
    margin-top: 10px;
    font-size: 20px;
    width:850px;
    margin:0 auto;
  }
.print-title p{
  text-indent: 2em;
  line-height: 40px;
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
    margin-bottom: 20px;
  }
  .booking-list p,.booking-list1 p{
    line-height: 40px;
  }
  .grid-content, p{
    font-size: 20px;
  }
</style>
