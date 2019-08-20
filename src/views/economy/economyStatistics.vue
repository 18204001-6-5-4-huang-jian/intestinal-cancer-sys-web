<template>
    <div slot="right" class="statistics-container" v-if="economyStatistics_page">
      <div class="content">
       <div class="filter-container">
        <router-link to="/home/home" v-if="$store.state.hospitalType==1">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
         <router-link to="/home/areaHome" v-if="$store.state.hospitalType==2">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
         <router-link to="/home/countryHome" v-if="$store.state.hospitalType==3">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
       </div>
           <!-- table -->
           <!-- v-if会影响子组件的生命周期，导致子组件watch不起作用
           把 v-if 换成 v-show  -->
          <table-community :tableData="tableData" v-if="$store.state.hospitalType==1"></table-community>
          <table-area :tableData="tableData" v-show="$store.state.hospitalType==2"></table-area>
          <table-country :tableData="tableData" v-show="$store.state.hospitalType==3"></table-country>
      </div>
    </div>
</template>
<script>
import tableCommunity from './table.vue'
import tableArea from './tableArea.vue'
import tableCountry from './tableCountry.vue'
export default {
    data(){
        return{
           economyStatistics_page:false,
           btnAuth:{

           },
           tableData:[]
        }
    },
    components:{
       tableCommunity,
       tableArea,
       tableCountry
    },
    mounted() {
         let obj = this.checkPageAuth(this,"economyStatistics_page",this.btnAuth);
        //  console.log(this.$store.state.hospitalType)
         this.getData()
    },
    methods: {
      getData(){
           let url = '';
           if(this.$store.state.hospitalType == 1){
             url = '/base/hospital/statistics/community/healthEconomics'
           }else if(this.$store.state.hospitalType == 2){
             url='/base/hospital/statistics/area/healthEconomics'
           }else if(this.$store.state.hospitalType == 3){
             url = '/base/hospital/statistics/nation/healthEconomics'
           }
          $axios_http({
             url:url,
             data:{},
             vueObj: this
           }).then((res)=>{
              if(res.data.statusMsg == 'success'){
                this.tableData = res.data.data
              }
           }) 
       }
    },
}
</script>
<style scoped>
.content {
  background: #fff;
  padding: 10px;
}
.filter-container{
  margin-bottom: 20px;
}
</style>


