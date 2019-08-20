<template>
     <div class="content-page" v-if="fullscreen_page">
         <el-button size="mini" class="return-home" @click="returnback()">返 回</el-button>
         <div id="container">
           
        </div>
     </div>
</template>
<script>
import Highcharts from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more'
import highchartSankey from 'highcharts/modules/sankey'
import highcharOrganization from 'highcharts/modules/organization'
highchartsMore(Highcharts)
highchartSankey(Highcharts)
highcharOrganization(Highcharts)
// import HighchartsMore from 'highcharts/highcharts-more';
// import HighchartsDrilldown from 'highcharts/modules/drilldown';
// import Highcharts3D from 'highcharts/highcharts-3d';
// import Highmaps from 'highcharts/modules/map';
// HighchartsMore(Highcharts)
// HighchartsDrilldown(Highcharts);
// Highcharts3D(Highcharts);
// Highmaps(Highcharts);
export default {
    name: 'fullscreen',
    data(){
        return{
            fullscreen_page:false,
            btnAuth:{

            },
            chart:null,
            option:{

            }
        }
    },
    mounted(){
        let obj = this.checkPageAuth(this,"fullscreen_page",this.btnAuth)
        this.$nextTick(()=>{
            if(localStorage.getItem('option')){
            this.option = JSON.parse(localStorage.getItem('option'));
              this.initChart()
          }
        })
    },
    beforeDestroy() {
      if(this.chart){
        this.chart.destroy();
        this.chart = null;
      }
    },
    methods: {
       initChart(){
          if(this.chart) {
            this.chart.destroy();
        };
        this.chart = new Highcharts.Chart('container', this.option);
        this.chart.reflow();
       },
       returnback(){
         localStorage.removeItem('option');
         this.$router.go(-1);
       }
    },
}
</script>
<style lang="scss" scoped>
.content-page{
  width: 100%;
  height: 100%;
  padding: 20px;
  background: #ffffff;
}
#container {
	// width: 100%;
	margin: 1em auto;
}
#container h4 {
	text-transform: none;
	font-size: 14px;
	font-weight: normal;
}
#container p {
	font-size: 13px;
	line-height: 16px;
}
.return-home {
    display: block;
    text-align: center;
    float: left;
    margin: 20px;
  }
</style>

