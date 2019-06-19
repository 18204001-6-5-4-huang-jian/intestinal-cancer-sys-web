<template>
    <div id="sankeychart" :style="{height:height,width:width}"></div>
</template>
<script>
import echarts from 'echarts';
export default {
     props: {
        width: {
        type: String,
        default: '300px'
      },
      height: {
        type: String,
        default: '500px'
      },
      sanKeychartData:{
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
        sanKeychartData(curVal,oldVal){
            this.initChart()
        }
    },
    methods: {
        initChart(){
                    let arr = [{source: "当前任务", target: "随访状态", value: 0}];
                    this.chart = echarts.init(document.getElementById('sankeychart'));
                    this.chart.setOption({
                        title:{
                        text:'随访进度概况',
                        left:'85',
                        top:'0'
                        },
                        color:['paleturquoise','indianred',  'darkgray', 'steelblue'],
                        // color:['steelblue','indianred','paleturquoise','darkgray'],
                        tooltip: {
                            trigger: 'item',
                            triggerOn: 'mousemove',
                        },
                        animation: false,
                        series: [
                            {
                                type: 'sankey',
                                width:'180',
                                height:'440',
                                top:'50',
                                left:'55',
                                focusNodeAdjacency: 'allEdges',
                                lineStyle: {
                                    //线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比
                                    color:new echarts.graphic.LinearGradient(0, 0, 1, 0, [{  //设置边为水平方向渐变
                                        offset: 0,
                                        color: 'res'
                                    },{
                                        offset: 1,
                                        color: 'green'
                                    }]),
                                    curveness: 0.5,  //设置边的曲度
                                    opacity:0.5  //设置边的透明度
                                },
                                data: [
                                    {
                                    name:'当前任务',
                                    label:{
                                        normal:{
                                            show:true,
                                            position:'left',
                                            formatter:'{b}'
                                        }
                                    }
                                    },
                                    {
                                    name:'随访状态',
                                    label:{
                                        normal:{
                                            show:true,
                                            position:'right',
                                            formatter:'{b}'
                                        }
                                    }
                                    },
                                    {
                                    name:'未邀请',
                                    label:{
                                        normal:{
                                            show:true,
                                            position:'left',
                                            formatter:'{b}'
                                        }
                                    }
                                    },
                                    {
                                    name:'未邀请*',
                                    label:{
                                        normal:{
                                            show:true,
                                            position:'right',
                                            formatter:'{b}'
                                        }
                                    }
                                    },
                                    {
                                    name: '已邀请',
                                    label:{
                                        normal:{
                                            show:true,
                                            position:'left',
                                            formatter:'{b}'
                                        }
                                    }
                                    },
                                    {
                                    name: '失访',
                                    label:{
                                        normal:{
                                            show:true,
                                            position:'right',
                                            formatter:'{b}'
                                        }
                                    }
                                    },
                                    {
                                    name: '随访中',
                                    label:{
                                        normal:{
                                            show:true,
                                            position:'right',
                                            formatter:'{b}'
                                        }
                                    }
                                    },
                                    {
                                    name:'随访成功',
                                    label:{
                                        normal:{
                                            show:true,
                                            position:'right',
                                            formatter:'{b}'
                                        }
                                    }
                                    },
                                ],
                                links:arr.concat(this.sanKeychartData),
                                orient: 'vertical',
                                itemStyle: {
                                    normal: {
                                        borderWidth: 1,
                                        borderColor: '#aaa'
                                    }
                                },
                           
                            }
                        ]
                    })
        }
    },
}
</script>
<style lang="scss" scoped>
  #sankeychart{
      margin: 0 auto;
  }
</style>

