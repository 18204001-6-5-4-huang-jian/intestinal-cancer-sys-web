<template>
    <div slot="right" class="addNumber-container" v-if="addNumber_page">
        <router-link to="/home/areaHome">
             <el-button size="mini" class="returnBtn">返 回</el-button>
        </router-link>
    </div>
</template>
<script>
export default {
    data(){
        return{
           addNumber_page:false,
           btnAuth:{
               
           }
        }
    },
    mounted() {
      let obj = this.checkPageAuth(this, "addNumber_page", this.btnAuth);
    },
    methods: {
        
    },
}
</script>
<style lang="scss" scoped>
   .addNumber-container{
     background: #ffffff;
   }
   .returnBtn{
       margin-top: 20px;
       display: block;
       text-align: center;
       float: left;
       margin-left: 20px;
   }
</style>



