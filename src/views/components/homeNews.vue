<template>
 <div class="message">
     <!-- <div v-show='totalRowCount==0' style='height:50px;text-align:center;padding-top:100px;color:#999'>暂无数据</div> -->
     <div v-show='totalRowCount==0'>
        <img src="../../assets/img/info.png" style="height:175px"/>
        <h3>欢迎参加中国结直肠癌筛查项目</h3>
        <p style="color:#99a9bf;font-size:14px;">您的一份奉献，将会使更多家庭从结直肠癌的早诊早治中受益</p>
     </div>
      <el-card>
        <div v-for="item in newsList" :key="item.id" class="text item clearfix">
          <span class="fl con" :title="item.messageText" @click='alreadySee(item.id)' :class="{'gray': item.readStatus==0}">{{item.messageText}}</span>
          <span :class="{'orange':item.readStatus != 0,'gray': item.readStatus==0}">new</span>
          <div class="fr">
            <p class="gray">{{item.dateCreated | date}}</p>
          </div>
        </div>
      </el-card>
      <router-link to="/home/messageList" class="fr seeMore text" v-show="totalRowCount>=5">查看更多</router-link>
  </div>
</template>

<script>
  export default {
    name: 'Right',
    data () {
      return {
      newsList:[],
      totalRowCount:'',
      }
    },
    created(){
      this.query();
    },
    mounted(){
     
    },
    
    methods:{
       query(){
          $axios_http({
            url: "/base/result/queryAllMessageCenter",
            data:{
              	pageSize:5,
	              pageNo:1
            },
            vueObj: this
          }).then((res) => {
           this.newsList=res.data.data;
           this.totalRowCount=res.data.pageInfo.totalRowCount;
          })
       },
      alreadySee(id){
        $axios_http({
              url: "/base/result/updateMessageCenterStatusById",
              data:{
                  id:id,    //消息类型
                  readStatus:0
              },
              vueObj: this
            }).then((res) => {
              this.query()
              if(res.data.data){
                let mainDataId=res.data.data.mainDataId;    //告知书专用
                let formType=res.data.data.form_type;
                let dataId=res.data.data.data_id;
                let _sid=res.data.data.sid;
                let editStatus=res.data.data.edit_status;    //edit_status  0--不可编辑  1---编辑   
                let courierNumber=res.data.data.courierNumber;
                let sampleType=res.data.data.sample_type;   //生物样本类型
                let messageType=res.data.data.messageType;    //0----系统|1---异常事件|2---申请|3-------审核|4---发放通知
                if(messageType!=0){
                  if(this.$store.state.hospitalType==1){     //社区
                    if(formType=='HOSPITAL_INTESTINE_REVIEW'){   //A1
                        // 跳转A1表单
                        if(editStatus==0){
                          this.$router.push({ path: '/subjects/showSubjectInsert',query:{id:dataId,sid:_sid}});
                        }else{
                          this.$router.push({ path: '/home/subjectInsert',query:{sid:_sid,id:dataId}});
                        }
                    }else if(formType=='HOSPITAL_STOOL_DNA'){   //DNA
                      this.$router.push({ path: '/DNA/dnaManagement',query:{sid:_sid}});
                    }else if(formType=='HOSPITAL_FIT_RESULT'){   //FIT
                      this.$router.push({ path: '/FIT/fitManagement',query:{sid:_sid}});
                    }else if(formType=='HOSPITAL_COLONOSCOPY_RECORD'){   //肠镜管理
                      this.$router.push({ path: '/colonscopy/colonscopyList',query:{sid:_sid}});
                    }else if(formType=='HOSPITAL_VIOLATION_SCHEME'){   //异常事件
                      this.$router.push({ path: '/abnormalManagement/abnormalManagementList',query:{sid:_sid}});
                    }else if(formType == 'HOSPITAL_VIOLATION_RESEARCH'){ //E2
                      this.$router.push({ path: '/followup/liste2',query:{sid:_sid}});
                    }else if(formType == 'HOSPITAL_STOOL_SAMPLE'){ //粪便样本（新）
                      this.$router.push({ path: '/droppings/droppingsDnaNew',query:{sid:_sid}});
                    }else if(formType == 'HOSPITAL_YEAR_UPDATE'){ //A3
                      this.$router.push({ path: '/followup/lista3',query:{sid:_sid}});
                    }else if(formType == 'HOSPITAL_CONTACT_RECORD'){ //E1
                       this.$router.push({ path: '/followup/liste1',query:{sid:_sid}});
                    }else if(formType == 'HOSPITAL_DEATH_CERTIFICATE'){ //E2选择死亡 和 c5
                        this.$router.push({ path: '/event/eventList5',query:{sid:_sid}});
                    }else if(formType == 'HOSPITAL_CANCER_RECORD'){ //c1
                        this.$router.push({ path: '/event/eventList1',query:{sid:_sid}});
                    }else if(formType == 'HOSPITAL_CANCER_DIAGNOSE'){ //c2
                        this.$router.push({ path: '/event/eventList2',query:{sid:_sid}});
                    }else if(formType == 'HOSPITAL_COLORECTAL_CANCER_DIAGNOSE_INFORMATION'){ //c3
                        this.$router.push({ path: '/event/eventList3',query:{sid:_sid}});
                    }else if(formType == 'HOSPITAL_COLORECTAL_CANCER_TREATMENT_INFORMATION'){ //c4
                        this.$router.push({ path: '/event/eventList4',query:{sid:_sid}});
                    }
                  }else if(this.$store.state.hospitalType==2){ //地区
                    if(formType=='HOSPITAL_INTESTINE_REVIEW'){   //A1
                      // 跳转A1表单
                      this.$router.push({ path: '/subjects/showSubjectInsert',query:{id:dataId,sid:_sid}});
                    }else if(formType=='HOSPITAL_STOOL_DNA'){   //DNA
                      this.$router.push({ path: '/DNA/areaDnaManagement',query:{sid:_sid}});
                    }else if(formType=='HOSPITAL_FIT_RESULT'){   //FIT
                      this.$router.push({ path: '/FIT/fitManagement',query:{sid:_sid}});
                    }else if(formType=='HOSPITAL_COURIER_RESULT'){   //快递信息
                      this.$router.push({ path: '/biology/express',query:{courierNumber:courierNumber}});
                    }else if(formType=='HOSPITAL_VIOLATION_SCHEME'){   //异常事件
                      this.$router.push({ path: '/abnormalManagement/abnormalManagementList',query:{sid:_sid}});
                    }else if(formType=='HOSPITAL_BIOLOGICAL_SAMPLE_RESULT'){
                      if(sampleType=='M'){   //唾液
                          this.$router.push({ path: '/biology/saliva',query:{sid:_sid}});
                      }else if(sampleType=='A'){   //血液
                          this.$router.push({ path: '/biology/blood',query:{sid:_sid}});
                      }else if(sampleType=='F'){   //粪便
                          this.$router.push({ path: '/biology/fecal',query:{sid:_sid}});
                      }
                    }else if(formType=='HOSPITAL_COLONOSCOPY_RESULT'){   //B1结果表
                      this.$router.push({ path: '/colonscopy/report1',query:{id:dataId,sid:_sid,colonoscopyRecordId:mainDataId,show:1}});
                    }else if(formType=='HOSPITAL_COLONOSCOPY_PATHOLOGY_RESULT'){   //B2病理表
                      this.$router.push({ path: '/colonscopy/report2',query:{id:dataId,sid:_sid,colonoscopyRecordId:mainDataId,show:1}});
                    }else if(formType=='HOSPITAL_SCREENING_NOTIFICATION'){   //B9告知书
                      this.$router.push({ path: '/colonscopy/report3',query:{id:mainDataId,sid:_sid,notificationId:dataId,show:1}});
                    }else if(formType=='HOSPITAL_COLONOSCOPY_RECORD'){   //肠镜管理
                      this.$router.push({ path: '/colonscopy/regionColonscopyList',query:{sid:_sid}});
                    }else if(formType == 'HOSPITAL_VIOLATION_RESEARCH'){ //E2
                      this.$router.push({ path: '/followup/liste2',query:{sid:_sid}});
                    }else if(formType == 'HOSPITAL_STOOL_SAMPLE'){ //粪便样本（新）
                      this.$router.push({ path: '/droppings/droppingsDnaNew',query:{sid:_sid}});
                    }else if(formType == 'HOSPITAL_YEAR_UPDATE'){ //A3
                      this.$router.push({ path: '/followup/lista3',query:{sid:_sid}});
                    }else if(formType == 'HOSPITAL_CONTACT_RECORD'){ //E1
                       this.$router.push({ path: '/followup/liste1',query:{sid:_sid}});
                    }else if(formType == 'HOSPITAL_DEATH_CERTIFICATE'){ //E2选择死亡 和 c5
                        this.$router.push({ path: '/event/eventList5',query:{sid:_sid}});
                    }else if(formType == 'HOSPITAL_CANCER_RECORD'){ //c1
                        this.$router.push({ path: '/event/eventList1',query:{sid:_sid}});
                    }else if(formType == 'HOSPITAL_CANCER_DIAGNOSE'){ //c2
                        this.$router.push({ path: '/event/eventList2',query:{sid:_sid}});
                    }else if(formType == 'HOSPITAL_COLORECTAL_CANCER_DIAGNOSE_INFORMATION'){ //c3
                        this.$router.push({ path: '/event/eventList3',query:{sid:_sid}});
                    }else if(formType == 'HOSPITAL_COLORECTAL_CANCER_TREATMENT_INFORMATION'){ //c4
                        this.$router.push({ path: '/event/eventList4',query:{sid:_sid}});
                    }
                  }else if(this.$store.state.hospitalType==3){ //国家
                    if(formType=='HOSPITAL_COURIER_RESULT'){   //快递信息
                      this.$router.push({ path: '/biology/express',query:{courierNumber:courierNumber}});
                    }else if(formType=='HOSPITAL_BIOLOGICAL_SAMPLE_RESULT'){
                      if(sampleType=='M'){   //唾液
                          this.$router.push({ path: '/biology/countrySaliva',query:{sid:_sid}});
                      }else if(sampleType=='A'){
                          this.$router.push({ path: '/biology/countryBlood',query:{sid:_sid}});
                      }else if(sampleType=='F'){
                          this.$router.push({ path: '/biology/countryFecal',query:{sid:_sid}});
                      }
                    }else if(formType=='HOSPITAL_COLONOSCOPY_RECORD'){   //肠镜管理
                      this.$router.push({ path: '/colonscopy/countryColonscopyList',query:{sid:_sid}});
                    }else if(formType=='HOSPITAL_VIOLATION_SCHEME'){   //异常事件
                      this.$router.push({ path: '/abnormalManagement/abnormalManagementList',query:{sid:_sid}});
                    }else if(formType=='HOSPITAL_COLONOSCOPY_RESULT'){   //B1结果表
                      this.$router.push({ path: '/colonscopy/showReport1',query:{id:dataId,sid:_sid,colonoscopyRecordId:mainDataId,show:1}});
                    }else if(formType=='HOSPITAL_COLONOSCOPY_PATHOLOGY_RESULT'){   //B2病理表
                      this.$router.push({ path: '/colonscopy/showReport2',query:{id:dataId,sid:_sid,colonoscopyRecordId:mainDataId,show:1}});
                    }else if(formType=='HOSPITAL_SCREENING_NOTIFICATION'){   //B9告知书
                      this.$router.push({ path: '/colonscopy/showReport3',query:{id:mainDataId,sid:_sid,notificationId:dataId,show:1}});
                    }else if(formType == 'HOSPITAL_VIOLATION_RESEARCH'){ //E2
                      this.$router.push({ path: '/followup/liste2',query:{sid:_sid}});
                    }else if(formType == 'HOSPITAL_STOOL_SAMPLE'){ //粪便样本（新）
                      this.$router.push({ path: '/droppings/droppingsDnaNew',query:{sid:_sid}});
                    }else if(formType == 'HOSPITAL_YEAR_UPDATE'){ //A3
                      this.$router.push({ path: '/followup/lista3',query:{sid:_sid}});
                    }else if(formType == 'HOSPITAL_CONTACT_RECORD'){ //E1
                       this.$router.push({ path: '/followup/liste1',query:{sid:_sid}});
                    }else if(formType == 'HOSPITAL_DEATH_CERTIFICATE'){ //E2选择死亡 和 c5
                        this.$router.push({ path: '/event/eventList5',query:{sid:_sid}});
                    }else if(formType == 'HOSPITAL_CANCER_RECORD'){ //c1
                        this.$router.push({ path: '/event/eventList1',query:{sid:_sid}});
                    }else if(formType == 'HOSPITAL_CANCER_DIAGNOSE'){ //c2
                        this.$router.push({ path: '/event/eventList2',query:{sid:_sid}});
                    }else if(formType == 'HOSPITAL_COLORECTAL_CANCER_DIAGNOSE_INFORMATION'){ //c3
                        this.$router.push({ path: '/event/eventList3',query:{sid:_sid}});
                    }else if(formType == 'HOSPITAL_COLORECTAL_CANCER_TREATMENT_INFORMATION'){ //c4
                        this.$router.push({ path: '/event/eventList4',query:{sid:_sid}});
                    }
                  }
                }
              }  
            })
      }
    }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.message .el-card{
  height:190px;
}
.el-card{
  background:none;
  box-shadow:none;
  border:none;
}
 .seeMore{
   margin-right: 20px;
   color:#409eff;
 } 
 .text {
    font-size: 14px;
  }
  .gray{
    color:#999;
  }
  .orange{
    color: #f1950b;
    font-weight:bolder;
  }
  .con{
    width: 80%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    text-align: left;
    position: relative;
    padding-left: 15px;
  }
  .con:before{
    content:'';
    width: 5px;
    height: 5px;
    background:#51a2e5;
    border-radius:50%;
    position: absolute;
    top:50%;
    transform:translateY(-50%);
    left:0px;
  }
  .gray.con:before{
    background:#dddcdc;
  }
</style>
