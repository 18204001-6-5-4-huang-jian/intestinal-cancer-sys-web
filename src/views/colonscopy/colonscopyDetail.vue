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
          <div class="p-title">亲爱的参加者：感谢您参加中国人群结直肠癌筛查项目！</div>
          <div>温馨提醒：为保证结肠镜检查能顺利进行，请您：</div>
          <div>1、在检查前1-2天开始进食无渣的半流质饮食，如稀饭、蛋花等。</div>
          <div>2、检查当天需要禁食，如饥饿者可进食糖水或无渣糖，糖尿病患者可进食少量牛奶。</div>
          <div class="p-title">
            3、检查前日晚或检查前日晨进行肠道清洁，具体详情请咨询工作人员。</div>
          <p>感谢您的合作！</p>
        </div>
        <div class="booking-list">
          <span class="booking-list-tit">个人信息</span>
          <el-row class="booking-list-item">
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="9">
                    <div class="grid-content bg-purple">
                      SID:
                    </div>
                  </el-col>
                  <el-col :span="15">
                    <div class="grid-content bg-purple-light">
                      {{detailData.sid}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <el-row>
                  <el-col :span="9">
                    <div class="grid-content bg-purple">
                      受试者姓名:
                    </div>
                  </el-col>
                  <el-col :span="15">
                    <div class="grid-content bg-purple-light">
                      {{detailData.name}}
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
                  <el-col :span="9">
                    <div class="grid-content bg-purple">
                      手机号:
                    </div>
                  </el-col>
                  <el-col :span="15">
                    <div class="grid-content bg-purple-light">
                      {{detailData.phone}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <el-row>
                  <el-col :span="9">
                    <div class="grid-content bg-purple">
                      入组日期:
                    </div>
                  </el-col>
                  <el-col :span="15">
                    <div class="grid-content bg-purple-light">
                      {{detailData.inGroupDate | date}}
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
                  <el-col :span="9">
                    <div class="grid-content bg-purple">
                      分组方案:
                    </div>
                  </el-col>
                  <el-col :span="15">
                    <div class="grid-content bg-purple-light" v-if="detailData.group=='C'">
                      {{detailData.group}}组{{detailData.riskLevel | riskLevel}}
                    </div>
                    <div class="grid-content bg-purple-light" v-if="detailData.group!='C'">
                      {{detailData.group}}组
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="booking-list">
          <span class="booking-list-tit">预约信息</span>
          <el-row class="booking-list-item">
            <el-col :span="24">
              <div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      项目名称:
                    </div>
                  </el-col>
                  <el-col :span="15">
                    <div class="grid-content bg-purple-light">
                      {{detailData.proName}}
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
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      预约肠镜时间:
                    </div>
                  </el-col>
                  <el-col :span="15">
                    <div class="grid-content bg-purple-light">
                      {{detailData.bookingTime}}
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
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      就诊医院:
                    </div>
                  </el-col>
                  <el-col :span="15">
                    <div class="grid-content bg-purple-light">
                      {{detailData.deptName}}{{detailData.deptDesc}}
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
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      就诊科室:
                    </div>
                  </el-col>
                  <el-col :span="15">
                    <div class="grid-content bg-purple-light">
                      {{detailData.examinationPlace}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>

          </el-row>
        </div>
      </div>

    </div>
    <div id="print">
      <div class="filter-container">
        <router-link to="/colonscopy/colonscopyList">

        </router-link>

      </div>
      <div class="print-title">
        <p class="print-title-1">亲爱的参加者：感谢您参加中国人群结直肠癌筛查项目！</p>
        <p class="print-title-1">温馨提醒：为保证结肠镜检查能顺利进行，请您：</p>
        <p class="print-title-list">1、在检查前1-2天开始进食无渣的半流质饮食，如稀饭、蛋花等。</p>
        <p class="print-title-list">2、检查当天需要禁食，如饥饿者可进食糖水或无渣糖，糖尿病患者可进食少量牛奶。</p>
        <p class="print-title-list">
          3、检查前日晚或检查前日晨进行肠道清洁，具体详情请咨询工作人员。</p>
        <p class="print-title-list">感谢您的合作！</p>
      </div>
      <div class="booking-list1">
        <span class="booking-list-tit">个人信息</span>
        <el-row class="booking-list-item">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="9">
                  <div class="grid-content bg-purple">
                    SID:
                  </div>
                </el-col>
                <el-col :span="15">
                  <div class="grid-content bg-purple-light">
                    {{detailData.sid}}
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="9">
                  <div class="grid-content bg-purple">
                    受试者姓名:
                  </div>
                </el-col>
                <el-col :span="15">
                  <div class="grid-content bg-purple-light">
                    {{detailData.name}}
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
                <el-col :span="9">
                  <div class="grid-content bg-purple">
                    手机号:
                  </div>
                </el-col>
                <el-col :span="15">
                  <div class="grid-content bg-purple-light">
                    {{detailData.phone}}
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="9">
                  <div class="grid-content bg-purple">
                    入组日期:
                  </div>
                </el-col>
                <el-col :span="15">
                  <div class="grid-content bg-purple-light">
                    {{detailData.inGroupDate}}
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
                <el-col :span="9">
                  <div class="grid-content bg-purple">
                    分组方案:
                  </div>
                </el-col>
                <el-col :span="15">
                  <div class="grid-content bg-purple-light">
                    {{detailData.group}}
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="booking-list1">
        <span class="booking-list-tit">预约信息</span>
        <el-row class="booking-list-item">
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    项目名称:
                  </div>
                </el-col>
                <el-col :span="15">
                  <div class="grid-content bg-purple-light">
                    {{detailData.proName}}
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
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    预约肠镜时间:
                  </div>
                </el-col>
                <el-col :span="15">
                  <div class="grid-content bg-purple-light">
                    {{detailData.bookingTime}}
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
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    就诊医院:
                  </div>
                </el-col>
                <el-col :span="15">
                  <div class="grid-content bg-purple-light">
                    {{detailData.deptName}}{{detailData.deptDesc}}
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
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    就诊科室:
                  </div>
                </el-col>
                <el-col :span="15">
                  <div class="grid-content bg-purple-light">
                    {{detailData.examinationPlace}}
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>

        </el-row>
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
    margin: 40px auto;
    width: 700px;
    padding: 20px;
    border: 1px solid #e5e5e5;
    position: relative;
  }

  .booking-list1 {
    margin-top: 50px;
    margin-left: 80px;
    width: 700px;
    padding: 20px;
    border: 1px solid #e5e5e5;
    position: relative;
  }

  .booking-list-item {
    height: 40px;
    line-height: 40px;
  }

  .booking-list-tit {
    position: absolute;
    top: -22px;
    display: inline-block;
    padding: 10px;
    background: #ffffff;

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
    margin: 50px auto;
    font-size: 14px;
    width: 700px;
    /*padding-left: 300px;*/
  }

  .booking-list-welcome p {
    height: 24px;
    line-height: 30px;
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
    font-size: 16px;
  }

  .print-title-list {
    margin-top: 10px;
    margin-left: 80px;

  }

  .print-title-1 {
    margin-top: 20px;
    margin-left: 80px
  }
</style>
