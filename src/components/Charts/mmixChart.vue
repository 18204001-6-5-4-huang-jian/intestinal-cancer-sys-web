<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts';

  export default {
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      id: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '1200px'
      },
      height: {
        type: String,
        default: '400px'
      }
    },
    data() {
      return {
        chart: null
      };
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
    methods: {
      initChart() {
        this.chart = echarts.init(document.getElementById(this.id));
        const xData = (function() {
          const data = [];
          for (let i = 1; i < 13; i++) {
            data.push(i + '月份');
          }
          return data;
        }());
        this.chart.setOption({
          backgroundColor: '#344b58',
          title: {
            text: '统计',
            x: '4%',
            textStyle: {
              color: '#fff',
              fontSize: '22'
            },
            subtextStyle: {
              color: '#90979c',
              fontSize: '16'
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              textStyle: {
                color: '#fff'
              }
            }
          },
          grid: {
            borderWidth: 0,
            top: 110,
            bottom: 95,
            textStyle: {
              color: '#fff'
            }
          },
          legend: {
            x: '15%',
            top: '10%',
            textStyle: {
              color: '#90979c'
            },
            data: ['语音', '短信','流量','平均总量']
          },
          calculable: true,
          xAxis: [{
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#90979c'
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitArea: {
              show: false
            },
            axisLabel: {
              interval: 0

            },
            data: xData
          }],
          yAxis: [{
            type: 'value',
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#90979c'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0
            },
            splitArea: {
              show: false
            }
          }],
          dataZoom: [{
            show: true,
            height: 30,
            xAxisIndex: [
              0
            ],
            bottom: 30,
            start: 10,
            end: 80,
            handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            handleSize: '110%',
            handleStyle: {
              color: '#d3dee5'

            },
            textStyle: {
              color: '#fff' },
            borderColor: '#90979c'


          }, {
            type: 'inside',
            show: true,
            height: 15,
            start: 1,
            end: 35
          }],
          series: [{
            name: '语音',
            type: 'bar',
            stack: '总量',
            barMaxWidth: 35,
            barGap: '10%',
            itemStyle: {
              normal: {
                color: 'rgba(255,144,128,1)',
                label: {
                  show: true,
                  textStyle: {
                    color: '#fff'
                  },
                  position: 'right',
                  formatter(p) {
                    return p.value > 0 ? p.value : '';
                  }
                }
              }
            },
            data: [
              300,
              500,
              700,
              900,
              800,
              600,
              500,
              1200,
              1600,
              700,
              500,
              1000
            ]
          },

          {
            name: '短信',
            type: 'bar',
            stack: '总量',
            itemStyle: {
              normal: {
                color: 'rgba(0,191,183,1)',
                barBorderRadius: 0,
                label: {
                  show: true,
                  textStyle: {
                    color: '#fff'
                  },
                  position: 'right',
                  formatter(p) {
                    return p.value > 0 ? p.value : '';
                  }
                }
              }
            },
            data: [
              100,
              300,
              100,
              200,
              100,
              200,
              50,
              300,
              100,
              200,
              100,
              100
            ]
          }, 
          {
            name: '流量',
            type: 'bar',
            stack: '总量',
            itemStyle: {
              normal: {
                color: 'rgba(0,230,230,230)',
                barBorderRadius: 0,
                label: {
                  show: true,
                  textStyle: {
                    color: '#fff'
                  },
                  position: 'right',
                  formatter(p) {
                    return p.value > 0 ? p.value : '';
                  }
                }
              }
            },
            data: [
              100,
              200,
              300,
              400,
              500,
              600,
              300,
              100,
              100,
              100,
              200,
              100
            ]
          },{
            name: '平均总量',
            type: 'line',
            stack: '总量',
            symbolSize: 10,
            symbol: 'circle',
            itemStyle: {
              normal: {
                color: 'rgba(252,230,48,1)',
                barBorderRadius: 0,
                label: {
                  show: true,
                  position: 'top',
                  formatter(p) {
                    return p.value > 0 ? p.value : '';
                  }
                }
              }
            },
            data: [
              500,
              1000,
              1100,
              1500,
              1400,
              1400,
              850,
              1500,
              1800,
              1000,
              800,
              1200
            ]
          }
          ]
        })
      }
    }
  }
</script>
