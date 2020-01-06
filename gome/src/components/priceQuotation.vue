<template>
<div class="zehxian">
   <div class="price-quotation" ref="month_quotation" v-if="ismonth">
  
  </div>
  <div class="price-quotation"  ref="year_quotation" v-else></div>
</div>
 
</template>
<script>
import { stringify } from "querystring";
import { type } from "os";
export default {
  data() {
    return {
      ismonth:false
    };
  },
  props: [

      'biurefs',
    
     'xTitle',
   
     'yTitle',
    
       'lineData',
    
        'xData'
    
  ],
  created(){
  // console.log(this.$props,"折线图数据")
  this.ismonth = this.$props.biurefs
  console.log(this.ismonth,"判断渲染")
  if(this.ismonth){
    this.ismonth = true
  }
  },
  mounted() {

        this.initChart2();

       
    
   
  },
  methods: {
    initChart2() {
      var base = +new Date(2016, 9, 3);
      var oneDay = 24 * 3600 * 1000;
      var valueBase = Math.random() * 300;
      var valueBase2 = Math.random() * 50;
      var data = [];
      var data2 = [];

      for (var i = 1; i < 10; i++) {
        var now = new Date((base += oneDay));
        var dayStr = [
          now.getFullYear(),
          now.getMonth() + 1,
          now.getDate()
        ].join("-");

        valueBase = Math.round((Math.random() - 0.5) * 20 + valueBase);
        valueBase <= 0 && (valueBase = Math.random() * 300);
        data.push([dayStr, valueBase]);

        valueBase2 = Math.round((Math.random() - 0.5) * 20 + valueBase2);
        valueBase2 <= 0 && (valueBase2 = Math.random() * 50);
        data2.push([dayStr, valueBase2]);
      }
      //
      var option = {
        title: {
          text: this.$props.yTitle,
          textStyle: {
            color: "#DEF1FF",
            fontSize: 14
          } //
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#286CE9" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#01D1FF" // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              }
              //鼠标停留提示背景色
            }
          }
        },
        // legend: {
        //   data: [ "搜索引擎"]
        // },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "7%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
          borderColor: "transparent",
          shadowColor: "blue",
          shadowBlur: 10,
          shadowOffsetX: 2,
          shadowOffsetX: 2,
          show: true
        },
        xAxis: [
          {
            name: this.$props.xTitle,
            // nameGap:20,//坐标轴名称与轴线之间的距离
            nameLocation: "start",
            type: "category",
            nameTextStyle: {
              //坐标轴名称的字体样式
              color: "#04CDF4"
            },
            axisLine: {
              //X轴（或Y轴）那条线的样式设置
              show: true,
              lineStyle: {
                color: "#5092C1",
                // width:5,
                width: 1,
                type: "solid",
                shadowColor: "blue",
                shadowBlur: 10,
                shadowOffsetX: 2,
                shadowOffsetX: 2
              }
            },
            axisPointer: {
              //鼠标移到折线点上的设置
              type: "line",
              lineStyle: {
                color: "#04CDF4"
              },
              shadowStyle: {
                color: "#04CDF4"
              }
            },
            splitArea: {
              //坐标轴在 grid 区域中的分隔区域
              // show:true,
              // areaStyle:{
              //   color:"blue",
              //   shadowColor: 'rgba(0, 0, 0, 0.5)',
              //   shadowBlur: 10
              // }
            },
            splitLine: {
              //坐标轴间隔线
              // show: true,
              // lineStyle: {
              //   // 使用深浅的间隔色
              //   color: ["blue", "green"],
              //   shadowColor: "green",
              //   shadowBlur: 10,
              //   type:'dashed'
              // }
            },
            boundaryGap: false,
            data:this.$props.xData
          }
        ],
        //
        yAxis: [
          {
            splitLine: {
              //坐标轴间隔线
              show: true,
              lineStyle: {
                //   // 使用深浅的间隔色
                color: "#1C4E8A",
                shadowColor: "#1C4E8A",
                shadowBlur: 10,
                type: "solid"
              }
            },
            name: "(价格)",
            // nameGap:25,//坐标轴名称与轴线之间的距离
            type: "value",
            nameTextStyle: {
              //坐标轴名称的字体样式
              color: "#04CDF4"
            },
            nameLocation: "end",
            axisLine: {
              lineStyle: {
                width: 0,
                color: "#5092C1",
                type: "solid",
                shadowColor: "#04CDF4",
                shadowBlur: 10,
                shadowOffsetX: 2,
                shadowOffsetX: 2
              }
            }
          }
        ],
        series: [
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            itemStyle: {
              borderWidth: 3, //拐点边框颜色
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#04CDF4" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#0A357B" // 100% 处的颜色 
                  }
                ],
                global: false // 缺省为 false
              }
            },
            lineStyle: {
              width:1,
              color: "#04CDF4",
              shadowColor: "#04CDF4",
              shadowBlur: 10,
              type: "solid"
            },
            label: {
              normal: {
                show: false,
                position: "top"
              }
            },
            areaStyle: { normal: {} },
            data: this.$props.lineData
          }
        ]
      };
      // 基于准备好的dom，初始化echarts实例
     if(this.ismonth){
         var monthChart = this.$echarts.init(this.$refs.month_quotation);
     }else{
        var monthChart = this.$echarts.init(this.$refs.year_quotation);
     }
    
      // 使用刚指定的配置项和数据显示图表。
      monthChart.setOption(option);

      // 年份
    //   var yearChart = echarts.init(this.$refs.year_quotation);
    //   // 使用刚指定的配置项和数据显示图表。
    //   yearChart.setOption(option);
      //增加一条折线数据
      // option.legend.data.push("win");
      // option.series.push({
      //   name: "win", // 系列名称
      //   type: "line", // 图表类型，折线图line、散点图scatter、柱状图bar、饼图pie、雷达图radar
      //   data: [112, 23, 45, 56, 233, 343, 454, 89, 343, 123, 45, 123]
      // });
      // myChart.setOption(option);
    }
  }
};
</script>
<style  scoped>
.zehxian{
  width:100%;
  height:100%
}
.zehxian .price-quotation{
    width: 100%;
    height: 100%;
}
</style>
