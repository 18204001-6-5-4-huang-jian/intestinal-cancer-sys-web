<template>
     <div id="containerD"></div>
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
    name: 'highcharts',
    data(){
        return{
            chart:null,
          
        }
    },
    props: {
       option: {
        type: Object,
        default:() => {}
      }
    },
    watch:{
       option(newVal, oldVal){
          this.initChart()
       },
    },
    mounted(){
        this.initChart()
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
        this.chart = new Highcharts.Chart('containerD', this.option);
        this.chart.reflow();
       }
    },
}
</script>
<style lang="scss" scoped>
#containerD {
	min-width: 1000px;
	max-width: 2000px;
	margin: 1em auto;
	// border: 1px solid silver;
}
#containerD h4 {
	text-transform: none;
	font-size: 14px;
	font-weight: normal;
}
#containerD p {
	font-size: 13px;
	line-height: 16px;
}
</style>

