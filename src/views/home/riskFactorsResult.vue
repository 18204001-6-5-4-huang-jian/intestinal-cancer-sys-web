<template>
  <div v-if="riskFactorsResult_page" class="form-wrapper">
    <div class="return-home">
      <router-link to="/home/home">
        <el-button size="mini" >返回首页</el-button>
      </router-link>
    </div>

    <div  class="result">
       <div class="result-page" v-if="$route.query.group == 'A'">
         <div>问卷调查结束!</div>
         <div>请及时预约结肠镜检查!</div>
       </div>
       <div class="result-page" v-if="$route.query.group == 'B'">
         <div>问卷调查结束!</div>
         <div>请及时做FIT检查!</div>
       </div>
      <div class="result-page" v-else-if="$route.query.group == 'C'&& $route.query.riskLevel == '1'">
        <div> 风险评估结果: <span style="color: blue;">低危</span></div>
        <div>请及时做FIT检查!</div>
      </div>
      <div class="result-page" v-else-if="$route.query.group == 'C'&& $route.query.riskLevel == '2'">
        <div> 风险评估结果: <span style="color: red;">高危</span></div>
        <div>请及时预约结肠镜检查!</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Right',
    data() {

      return {
        resultPageA:true,
        riskFactorsResult_page: false,
        btnAuth: {
          buttonSubjectSave: false,
        },
      }
    },

    mounted() {
      let obj = this.checkPageAuth(this, "riskFactorsResult_page", this.btnAuth);

    },
    methods: {
      //获取筛查现场id
      getSiteId(){
          $axios_http({
            url: "/base/hospital/screeningtype/get/",
            data: {},
            vueObj: this
          }).then((res) => {
              this.insertForm.siteId = res.data.data

          })
      }
    }
  }
</script>
<style scoped>
   .result{
     width:80%;
     height:400px;
     margin: 20px auto 50px;
     border:1px solid #e5e5e5;
   }
  .return-home{
    margin-top: 20px;
    margin-left: 20px;
  }
  .result-page{
    margin:100px auto;
    width:250px;
    font-size:20px;
    font-weight:700;
  }
   .form-wrapper {
     background: #ffffff;
     padding-top: 20px;
     padding-bottom: 20px;
   }
  .result-page div{
    height:30px;
    line-height:30px;
    text-align: center;
  }
</style>
<style>
  #test .el-form-item {
    margin-bottom: 0px;
    display: inline-block;
  }

  .option .el-form-item__error {
    top: 85%;
  }

  .answerBox .el-input__inner {
    padding: 0;
    font-weight: 800;
    text-align: center;
  }

  .el-form-item__error {
    padding: 0;
  }

  .return {
    margin-top: 20px;
    display: block;
    text-align: center;
    margin-left: 20px;
  }




</style>
