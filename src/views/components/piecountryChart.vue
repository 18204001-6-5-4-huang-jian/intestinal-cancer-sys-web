<template>
    <div id="homepiechart" :style="{height:height,width:width}"></div>
</template>
<script>
import echarts from 'echarts';
export default {
     props: {
        width: {
        type: String,
        default: '650px'
      },
      height: {
        type: String,
        default: '500px'
      },
      pieChartData:{
          type:Array,
          default:[]
      }
     },
    data(){
        return{
           chart: null
        }
    },
    mounted() {
        this.initChart();
        this.chart = null;
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose();
      this.chart = null;
    },
    watch: {
        pieChartData(curVal,oldVal){
            this.initChart();
        }
    },
    methods: {
        initChart(){
                   this.chart = echarts.init(document.getElementById('homepiechart'));
                   this.chart.setOption({
                        title : {
                        text: '随访任务概况',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['FIT','结肠镜','年度问卷调查']
                    },
                    series : [
                        {
                            name: '随访任务概况',
                            type: 'pie',
                            width:'300',
                            radius : '55%',
                            center: ['50%', '60%'],
                            label:{
                                normal:{
                                    formatter: "{b}:{c} ({d}%)",
                                }
                            },
                            data:this.pieChartData,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                },
                                normal:{
                                    color:function(params){
                                        var colorList = ['#ff7f4f','#87cdfa','#da70d6'];
                                        return colorList[params.dataIndex]
                                    }
                                }
                            }
                        }
                    ]
                   })
        }
    },
}
</script>
<style lang="scss" scoped>
  #homepiechart{
      margin: 0 auto;
  }
</style>

