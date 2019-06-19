<template>
<span class='approval'>
    <el-button type="primary"  @click="approvalEdit" v-if="approvalArr.formType=='HOSPITAL_INTESTINE_REVIEW' || 
    approvalArr.formType=='HOSPITAL_INTESTINE_RISK_FACTOR' || 
    approvalArr.formType=='HOSPITAL_COLONOSCOPY_RESULT' || 
    approvalArr.formType=='HOSPITAL_COLONOSCOPY_PATHOLOGY_RESULT' || 
    approvalArr.formType=='HOSPITAL_SCREENING_NOTIFICATION'">解除锁定</el-button>
    <el-button type="text" size="small"  @click="approvalEdit" v-else>解除锁定</el-button>
</span>
    
</template>

<script>
  export default {
    name: 'Right',
    props:['id','approvalArr'],
    data () {
      return {
        btnId:''
      }
    },
    mounted(){
     
    },
    
    methods:{
      // 解除锁定
      approvalEdit(){
         if(this.approvalArr.formType=='HOSPITAL_INTESTINE_REVIEW' || this.approvalArr.formType=='HOSPITAL_INTESTINE_RISK_FACTOR' || this.approvalArr.formType=='HOSPITAL_FIT_RESULT' || this.approvalArr.formType=='HOSPITAL_STOOL_DNA'){
            this.btnId='approvalbtn'   //地区
          }else if(this.approvalArr.formType=='HOSPITAL_COURIER_RESULT' || this.approvalArr.formType=='HOSPITAL_BIOLOGICAL_SAMPLE_RESULT' || this.approvalArr.formType=='HOSPITAL_COLONOSCOPY_RESULT' || this.approvalArr.formType=='HOSPITAL_COLONOSCOPY_PATHOLOGY_RESULT' || this.approvalArr.formType=='HOSPITAL_SCREENING_NOTIFICATION'){
            this.btnId='approalNationBtn'   //国家
          }
          //按钮权限判断
          if(authority(this.btnId)){
            return;
          }
         let obj={};
          if(this.approvalArr.formType=='HOSPITAL_INTESTINE_REVIEW' || this.approvalArr.formType=='HOSPITAL_INTESTINE_RISK_FACTOR' || this.approvalArr.formType=='HOSPITAL_COLONOSCOPY_RESULT' || this.approvalArr.formType=='HOSPITAL_COLONOSCOPY_PATHOLOGY_RESULT' || this.approvalArr.formType=='HOSPITAL_SCREENING_NOTIFICATION'){
            obj={
              id:this.id,
              approvalStatus:"1",
              formType:this.approvalArr.formType,
              sid:this.$route.query.sid
            }
          }else{
            obj={
              id:this.id,
              approvalStatus:"1",
              formType:this.approvalArr.formType,
            }
          }
         $axios_http({
            url: "/base/area/courier/result/accpetUpdateCourierResult",
            data:obj,
            vueObj: this
          }).then((res) => {
           this.$message({
              type: 'success',
              message: '解锁成功!'
            });
            if(this.approvalArr.formType=='HOSPITAL_COURIER_RESULT'){
              //快递信息
              this.$emit('refreshList',this.$store.state.expressListPageNo,this.$store.state.expressListPageSize);
            }else if(this.approvalArr.formType=='HOSPITAL_BIOLOGICAL_SAMPLE_RESULT'){
              this.$emit('refreshList',this.$store.state.bloodListPageNo,this.$store.state.bloodListPageSize);
              this.$emit('refreshList',this.$store.state.countrySalivaListPageNo,this.$store.state.countrySalivaListPageSize);
              this.$emit('refreshList',this.$store.state.countryFecalListPageNo,this.$store.state.countryFecalListPageSize);
            }else if(this.approvalArr.formType=='HOSPITAL_INTESTINE_REVIEW' || this.approvalArr.formType=='HOSPITAL_INTESTINE_RISK_FACTOR' || this.approvalArr.formType=='HOSPITAL_COLONOSCOPY_RESULT' || this.approvalArr.formType=='HOSPITAL_COLONOSCOPY_PATHOLOGY_RESULT' || this.approvalArr.formType=='HOSPITAL_SCREENING_NOTIFICATION'){
              this.$emit('refreshList');
            }else if(this.approvalArr.formType=='HOSPITAL_STOOL_DNA'){
              this.$emit('refreshList',this.$store.state.areaDnaManagementPageNo,this.$store.state.areaDnaManagementPageSize);
            }else if(this.approvalArr.formType=='HOSPITAL_FIT_RESULT'){
              this.$emit('refreshList',this.$store.state.fitManagementPageNo,this.$store.state.fitManagementPageSize);
            }
          })
      },
    }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .approval .el-button--text{
    margin-left:10px;
  }
</style>
