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
          <h2 class="title">创新工程结直肠癌筛查项目预约单</h2>
        </div>
        <div class="booking-list">
          <span class="booking-list-tit">个人信息：</span>
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
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple">
                      手机号：{{detailData.phone}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="7">
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
             <el-col :span="11">
              <div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple">
                      分组方案：
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
          <span class="booking-list-tit">预约信息：</span>
          <el-row class="booking-list-item">
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple">
                      项目名称：{{detailData.proName}}
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
                      检查日期：{{detailData.bookingTime}}
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
                      就诊医院： {{detailData.deptName}}{{detailData.deptDesc}}
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
                      就诊科室：检验科（门诊2楼3号抽血窗口） → 内镜中心(门诊3楼)
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>

          </el-row>
        </div>
          <div class="booking-list">
            <span class="booking-list-tit">温馨提醒：</span>
            <p>为保证结肠镜检查能顺利进行，请您：</p>
            <p>1.在检查前1-2天开始进食无渣的半流质饮食，如稀饭、蛋花等。</p>
            <p>2.检查当天需要禁食，如饥饿者可进食糖水或无渣糖，糖尿病患者可进食少量牛奶。</p>
            <p>3.检查前日晚或检查前日晨进行肠道清洁，具体详情请咨询工作人员。</p>
            <p>4.高血压患者检查前如服用降血压药物请注意：长期服用阿司匹林等药物患者需停药一周方可接受检查。</p>
            <p>5.检查当天最好有家属陪同。</p>
        </div>
        <div class="booking-list">
            <div class="booking-list-tit">筛查流程图：</div>
            <div style="text-align:center;margin-top:10px;"><img src="../../assets/img/tzlc.png" alt=""></div>
            <p style="text-align:center;margin-top:10px;font-weight:bold;">（凡是60岁以上受试者需携带近期心电图至内镜中心）</p>
            <p style="text-align:center;font-size:20px;">病理诊断结果报告单请半个月于门诊4楼414室领取，咨询电话：0576-86550827</p>
        </div>
      </div>

    </div>
    <div id="print">
      <div class="filter-container">
        <router-link to="/colonscopy/colonscopyList">

        </router-link>

      </div>
      <div class="print-title">
        <h2 class="title">创新工程结直肠癌筛查项目预约单</h2>
      </div>
      <div class="booking-list1">
        <span class="booking-list-tit">个人信息：</span>
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
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple">
                      手机号：{{detailData.phone}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="7">
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
             <el-col :span="11">
              <div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple">
                      分组方案：
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
        <span class="booking-list-tit">预约信息：</span>
         <el-row class="booking-list-item">
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple">
                      项目名称：{{detailData.proName}}
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
                      检查日期：{{detailData.bookingTime}}
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
                      就诊医院： {{detailData.deptName}}{{detailData.deptDesc}}
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
                      就诊科室：检验科（门诊2楼3号抽血窗口） → 内镜中心(门诊3楼)
                    </div>
                  </el-col>
                  <!-- <el-col :span="15">
                    <div class="grid-content bg-purple-light">
                      {{detailData.examinationPlace}}
                    </div>
                  </el-col> -->
                </el-row>
              </div>
            </el-col>

          </el-row>
      </div>
          <div class="booking-list1">
            <span class="booking-list-tit">温馨提醒：</span>
            <p>为保证结肠镜检查能顺利进行，请您：</p>
            <p>1.在检查前1-2天开始进食无渣的半流质饮食，如稀饭、蛋花等。</p>
            <p>2.检查当天需要禁食，如饥饿者可进食糖水或无渣糖，糖尿病患者可进食少量牛奶。</p>
            <p>3.检查前日晚或检查前日晨进行肠道清洁，具体详情请咨询工作人员。</p>
            <p>4.高血压患者检查前如服用降血压药物请注意：长期服用阿司匹林等药物患者需停药一周方可接受检查。</p>
            <p>5.检查当天最好有家属陪同。</p>
        </div>
        <div class="booking-list1">
            <div class="booking-list-tit">筛查流程图：</div>
            <div style="text-align:center;margin-top:10px;"><img src="../../assets/img/tzlc.png" alt=""></div>
            <p style="text-align:center;margin-top:10px;font-weight:bold;">（凡是60岁以上受试者需携带近期心电图至内镜中心）</p>
            <p style="text-align:center;font-size:20px;">病理诊断结果报告单请半个月于门诊4楼414室领取，咨询电话：0576-86550827</p>
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
    font-size: 20px;
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
