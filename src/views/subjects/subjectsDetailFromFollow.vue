<template>
  <div slot="right" class="content-page" v-if="subjectsDetail_follow_page">
    <subject-detail></subject-detail>
  </div>
</template>
<script>
import subjectDetail from '@/views/subjects/subjectsDetail'
  export default {
    data () {
      return {
        subjectsDetail_follow_page:false    
      }
    },
    components:{
      subjectDetail
    },
    mounted(){
      let obj = this.checkPageAuth(this, "subjectsDetail_follow_page", this.btnAuth)
    },
    methods: {
   
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .booking-list{
    margin:60px auto;
    padding: 20px;
    border:1px solid #e5e5e5;
    position:relative;
  }
  .booking-list-item{
    height: 40px;
    line-height: 40px;
  }
  .booking-list-tit{
    position: absolute;
    top:-22px;
    display:inline-block;
    padding: 10px;
    background: #ffffff;

  }
  .returns{
    float: left;
  }
  .print{
    float: right;
  }
  .content-page{
    padding: 20px;
    background: #fff;
    width:100%;
    height:100%;
  }
  .booking-list-welcome{
    margin: 50px auto;
    width: 50%;
    font-size:14px;
  }
  .booking-list-welcome p{
    height: 24px;
    line-height: 24px;
  }
  .p-title{
    margin-bottom:20px;
  }
  h5{
    height: 50px;
    line-height: 50px;
  }
</style>
