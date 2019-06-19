<template>
 <div class="messageCon">
   <div v-show='queryResult.totalRowCount==0' style='height:50px;text-align:center;margin-top:30px;color:#999'>暂无数据</div>
   <div v-show='queryResult.totalRowCount!=0'>
      <el-card>
          <div v-for="item in newsList" :key="item.id" class="text item clearfix">
          <span class="fl" @click='alreadySee(item.id)' :class="{'gray': item.readStatus==0}" :title="item.messageText" >{{item.messageText}}</span>
          <div class="fr">
            <p class="gray">{{item.sendUser}}</p>
            <p class="gray">{{item.dateCreated | date}}</p>
          </div>
        </div>
      </el-card>
       <el-row>
        <el-col :span="10"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="14">
          <div class="grid-content bg-purple">
            <div class="block" style="margin-top: 18px">
              <el-pagination
                @size-change="pageSizeChange"
                @current-change="currentPageChange"
                :current-page="$store.state.messageListPageNo"
                :page-sizes="[10, 20, 50, 100]"
                 v-bind:page-size="$store.state.messageListPageSize"
                layout="total, sizes, prev, pager, next, jumper"
                 v-bind:total="queryResult.totalRowCount"
                >
              </el-pagination>
            </div>
          </div>
        </el-col>
      </el-row>
   </div>
  </div>
</template>

<script>
  export default {
    name: 'Right',
    props:['newsList','index','queryResult'],
    data () {
      return {
      }
    },
    created(){
    },
    mounted(){
    
    },
    
    methods:{
     //每页显示查询结果条数变更事件，做重新查询操作
      pageSizeChange(pageSize) {
        this.$store.commit('get_messageListSize', pageSize)
        this.$emit('refreshList',this.$store.state.messageListPageNo,pageSize,this.index);
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        this.$store.commit('get_messageListNo',currentPage)
        this.$emit('refreshList',currentPage,this.$store.state.messageListPageSize,this.index);
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
              if(this.index==3){
                this.$emit('refreshList',this.$store.state.messageListPageNo,this.$store.state.messageListPageSize,4);
              }else{
                this.$emit('refreshList',this.$store.state.messageListPageNo,this.$store.state.messageListPageSize,this.index);
              }
              if(res.data.data){
                let mainDataId=res.data.data.mainDataId;   //告知书专用
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
                    }
                  }else if(this.$store.state.hospitalType==3){   //国家
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
 .messageCon .el-tabs--border-card,.messageCon .el-card.is-always-shadow{
    box-shadow: none;
  }
  .messageCon .el-card.is-always-shadow{
    border: none;
  }
  .text {
    font-size: 14px;
  }
.text span{
  cursor: pointer;
  position: relative;
  padding-left: 15px;
  width: 85%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
  .item {
    padding: 10px 0;
  }

  .box-card {
    width: 480px;
  }
  .gray{
    color:#999;
  }
  .text span:before{
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
   .text span.gray:before{
     background:#dddcdc;
   }
</style>
