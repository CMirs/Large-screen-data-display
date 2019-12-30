<template>
    <div class="listing-distribution" ref="listingDistribution">

    </div>
</template>
<script>
export default {
    data(){
        return{
            source:[
            {
              product: "1",

              广东菠萝主义: 85.8,
              徐闻菠萝: 93.7
            },
            {
              product: "2",
              广东菠萝主义: 73.4,
              徐闻菠萝: 55.1
            },
            {
              product: "3",

              广东菠萝主义: 65.2,
              徐闻菠萝: 82.5
            },
            {
              product: "4",

              广东菠萝主义: 53.9,
              徐闻菠萝: 39.1
            },
            {
              product: "5",

              广东菠萝主义: 85.8,
              徐闻菠萝: 93.7
            },
            {
              product: "6",
              广东菠萝主义: 73.4,
              徐闻菠萝: 55.1
            },
            {
              product: "7",

              广东菠萝主义: 65.2,
              徐闻菠萝: 82.5
            },
            {
              product: "8",

              广东菠萝主义: 53.9,
              徐闻菠萝: 39.1
            },
            {
              product: "9",

              广东菠萝主义: 85.8,
              徐闻菠萝: 93.7
            },
            {
              product: "10",
              广东菠萝主义: 73.4,
              徐闻菠萝: 55.1
            },
            {
              product: "11",

              广东菠萝主义: 65.2,
              徐闻菠萝: 82.5
            },
            {
              product: "12",

              广东菠萝主义: 53.9,
              徐闻菠萝: 39.1
            }
          ]
        }
    },
    mounted(){
  this.everyMonthListingDistribution();
    },
    methods:{
        // 柱状图
    everyMonthListingDistribution() {
      let option = {
        legend: {
          right: 70, //位置
          itemWidth: 20, //图例标记的图形宽度
          itemHeight: 20,
          textStyle:{
            color:'#01EFFD'
          }
        }, //图例组件
        tooltip: {},
        dataset: {
        //   dimensions: ["product", "广东菠萝主义", "徐闻菠萝"],
          source: this.source
        },
        xAxis: {
          type: "category",
          name: "(月份)",
          // axisLabel:{
          //   show:false
          // },
        boundaryGap:true,
          nameGap: 25, //坐标轴名称与轴线之间的距离
          nameLocation: "start",
          nameTextStyle: {
            //坐标轴名称的字体样式
            color: "#04CDF4"
          },
          axisTick: {
            //y轴刻度线
            show: true
          },
        //   splitArea:{
        //     //   interval:1
        //     areaStyle:{
        //         color:'red',
              
        //     }
        //   },
          axisLine: {
            //X轴（或Y轴）那条线的样式设置
            show: false,
            lineStyle: {
              color: "#5092C1",
              // width:5,
              width:1,
              type: "solid",

              shadowColor: "blue",
              shadowBlur: 10,
              shadowOffsetX: 2,
              shadowOffsetX: 2
            }
          }
        },
        yAxis: {
            // max:3,
            //  splitNumber:90,
          axisLabel: {
            //  去除y轴的数值显示
            formatter: function() {
              return "*";
            }
          },
          axisLine: {
            //X轴（或Y轴）那条线的样式设置
            show: false
          },
          axisTick: { show: true },
          splitLine: {
            //坐标轴间隔线
            show: true,
            interval:12,
            lineStyle: {
              //   // 使用深浅的间隔色
              color: "#65C6E7",
              type: "solid",
              opacity: 0.5
            }
          },
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
        },
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          {
            
            type: "bar",
            barGap: 0, //不同系列的柱间距离

            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: "#EC1B00"
                },
                {
                  offset: 1,
                  color: "#EB5A2F"
                }
              ])
            }
          },
          {
            type: "bar",
            barGap: 0,
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: "#00ABB3"
                },
                {
                  offset: 1,
                  color: "#01F0FF"
                }
              ])
            }
          }
        ]
      };
      //
      var listingDistribution =this.$echarts.init(this.$refs.listingDistribution);
      // 使用刚指定的配置项和数据显示图表。
      listingDistribution.setOption(option);
    } 
    }
}
</script>
<style  scoped>
.listing-distribution{
    width: 100%;
    height:100%
}
</style>