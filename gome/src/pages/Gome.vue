<template>
  <div id="home">
    <div class="container">
      <header>中国菠萝产销对接大数据</header>
      <main class="top-data">
        <div class="t-data-left">
          <span class="title min-adjustment">公司+渠道+订单</span>
          <!-- <data-carousel  /> -->
          <div class="china-over">
            <overlay-graph />
          </div>
        </div>
        <div class="t-data-center">
          <div class="t-data-center-top">
            <span class="title min-adjustment">全国菠萝价格行情</span>
            <div class="zhexian">
              <div class="month-quotation">
                <!-- <span class="month-title">近三十天价格行情</span> -->
                <div class="center" ref="month_quotation"></div>
              </div>
              <div class="year-quotation">
                <!-- <span class="year-title">2019年价格行情</span> -->
                <div class="center" ref="year_quotation"></div>
              </div>
            </div>
          </div>

          <div class="t-data-center-down">
            <span class="title">产地菠萝每月上市分布</span>
            <div class="purchase"></div>
            <div class="listingDistribution">
              <listing-distribution class="listingDistribution" />
            </div>
          </div>
        </div>
        <div class="t-data-right">
         
               <span class="title min-adjustment">公司+农户+基地</span>
         
       
            <div class="map">

            </div>
        </div>
      </main>
      <main class="down-data">
        <div class="down-data-main1">
          <span class="title">采购商订单发布</span>
          <div class="purchase-scroll">
            <dv-scroll-board :config="config1" class="dv-scroll-board" />
          </div>
        </div>

        <div class="down-data-main2">
          <span class="title">菠萝流通分布系统</span>
          <div class="circulation-distribution">
            <circulation-distribution />
          </div>
        </div>
        <div class="down-data-main3">
          <span class="title">果农鲜果上市发布</span>
          <div class="fruit-growers-scroll">
            <dv-scroll-board :config="config2" />
          </div>
        </div>
      </main>
    </div>
    <div ref="chart1" style="width:100%;height:376px"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import axios from "axios";
// import dataCarousel from "../components/dataCarousel.vue";
import overlayGraph from "../components/overlayGraph.vue";
import listingDistribution from "../components/listingDistribution.vue";
import circulationDistribution from "../components/circulationDistribution.vue";
// import Gheader from '../components/Gheader.vue';
// import Lunbo from '../components/lunbo.vue';
// import News from '../components/news.vue';
// import Guild from '../components/Guild.vue';
// import Top from '../components/reTop.vue';
// import Srt from '../components/Script.vue';
export default {
  data() {
    return {
      config1: {
        // header: ['时间', '病害信息', '数量', '标段'],
        data: [
          ["广东湛江徐闻采购菠萝100000斤", "2019年07月01日"],
          ["广东湛江徐闻采购菠萝100000斤", "2019年07月01日"],
          ["广东湛江徐闻采购菠萝100000斤", "2019年07月01日"],
          ["广东湛江徐闻采购菠萝100000斤", "2019年07月01日"],
          ["广东湛江徐闻采购菠萝100000斤", "2019年07月01日"],
          ["广东湛江徐闻采购菠萝100000斤", "2019年07月01日"],
          ["广东湛江徐闻采购菠萝100000斤", "2019年07月01日"],
          ["广东湛江徐闻采购菠萝100000斤", "2019年07月01日"],
          ["广东湛江徐闻采购菠萝100000斤", "2019年07月01日"],
          ["广东湛江徐闻采购菠萝100000斤", "2019年07月01日"],
          ["广东湛江徐闻采购菠萝100000斤", "2019年07月01日"],
          ["广东湛江徐闻采购菠萝100000斤", "2019年07月01日"]
        ],
        index: false,
        columnWidth: [500, 300],
        align: ["center"],
        rowNum: 5,
        // headerBGC: "#00F1FF",
        headerHeight: 45,
        oddRowBGC: "none",
        evenRowBGC: "none"
      },
      config2: {
        // header: ['时间', '病害信息', '数量', '标段'],
        data: [
          ["菠萝村有100亩菠萝约100万斤，一月可摘", "2019年07月01日"],
          ["菠萝村有100亩菠萝约100万斤，二月可摘", "2019年07月01日"],
          ["菠萝村有100亩菠萝约100万斤，三月可摘", "2019年07月01日"],
          ["菠萝村有100亩菠萝约100万斤，四月可摘", "2019年07月01日"],
          ["菠萝村有100亩菠萝约100万斤，一月可摘", "2019年07月01日"],
          ["菠萝村有100亩菠萝约100万斤，二月可摘", "2019年07月01日"],
          ["菠萝村有100亩菠萝约100万斤，三月可摘", "2019年07月01日"],
          ["菠萝村有100亩菠萝约100万斤，四月可摘", "2019年07月01日"],
          ["菠萝村有100亩菠萝约100万斤，一月可摘", "2019年07月01日"],
          ["菠萝村有100亩菠萝约100万斤，二月可摘", "2019年07月01日"],
          ["菠萝村有100亩菠萝约100万斤，三月可摘", "2019年07月01日"],
          ["菠萝村有100亩菠萝约100万斤，四月可摘", "2019年07月01日"]
        ],
        index: false,
        columnWidth: [500, 300],
        align: ["center"],
        rowNum: 5,
        // headerBGC: "#00F1FF",
        headerHeight: 45,
        oddRowBGC: "none",
        evenRowBGC: "none"
      }
    };
  },

  name: "ecahrts1",
  mounted() {
    console.log(this.$refs.chart1);
    this.initChart2();
    // this.everyMonthListingDistribution();
    this.ceshi();
  },
  components: {
    overlayGraph,
    circulationDistribution,
    listingDistribution,
    // dataCarousel
  },
  methods: {
    ceshi() {
      console.log("46545");
      axios
        .get("/pineapple/getPineappleNews")
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },//
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

      var option = {
        title: {
          text: "近三十天价格行情",
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
            name: "(日份)",
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
            data: ["1日", "5日", "10日", "15日", "20日", "25日", "30日"]
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
            data: [20.0, 35.0, 40.0, 25.0, 25.08, 78.0, 45.0]
          }
        ]
      };
      // 基于准备好的dom，初始化echarts实例
      var monthChart = echarts.init(this.$refs.month_quotation);
      // 使用刚指定的配置项和数据显示图表。
      monthChart.setOption(option);

      // 年份
      var yearChart = echarts.init(this.$refs.year_quotation);
      // 使用刚指定的配置项和数据显示图表。
      yearChart.setOption(option);
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

<style scoped>
#home {
  height: 100%;
  width: 100%;
  font-size: 0.12rem;
  box-sizing: border-box;
  background: url(../assets/img/bg.png) no-repeat center center;
  background-size: 100% 100%;
  /* overflow: hidden;  */
  position: fixed;
  top: 0;
  left: 0;
}

#home .container {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}
.container header {
  width: 100%;
  height: 1rem;
  text-align: center;
  font-size: .4rem;
  line-height: .7rem;
  color: #7efafc;
  background: url(../assets/img/header_bg.png) no-repeat center center;
  background-size: 100% 100%;
}
.container .title {
  width: 2.64rem;
  height: .4rem;
  /* background: rgba(22, 48, 128, 1); */
  /* border: 1px solid rgba(94, 220, 255, 1); */
  font-size: .18rem;
  text-align: center;
  color: rgba(222, 241, 255, 1);
  margin-top:12px;
}
/* 用于微调title */
.min-adjustment{
  margin-top: .16rem!important;
}
.container .top-data {
  height: 60%;
  width: 100%;
  display: flex;
  margin-bottom: 1%;
}
.top-data .t-data-left,
.top-data .t-data-center,
.top-data .t-data-right {
  /* flex: 1; */
  height: 100%;
}



.top-data .t-data-left {
  margin-left: 1%;
  width: 32%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url(../assets/img/company_add_order.png) no-repeat center center;
  background-size: 100% 100%;
}
.t-data-left .china-over {
  height: 90%;
  width: 99%;
}
.china-over .overlay-graph {
  height: 95%;
  width: 98%;
}
.top-data .t-data-center {
  margin: 0 1%;
  width: 32%;
}
.t-data-center .t-data-center-top,
.t-data-center .t-data-center-down {
  height: 48.5%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  /*  */
}

.t-data-center-down .listingDistribution {
  height: 95%;
  width: 100%;
}
.t-data-center .t-data-center-top {
  /* height: 50%; */
  background: url(../assets/img/pineapple_price.png) no-repeat center center;
  background-size: 100% 100%;
  margin-bottom: 3%;
}
.t-data-center-top .zhexian {
  width: 100%;
  height: 90%;
  display: flex;
}
.t-data-center-top .zhexian .month-quotation,
.t-data-center-top .zhexian .year-quotation {
  width: 50%;
  height: 100%;
  padding-left: .22rem;
  display: flex;
  flex-direction: column;
}
.month-quotation .month-title,
.year-quotation .year-title {
  width: 1.3rem;
  height: .14rem;
  font-size: .14rem;
  font-weight: bold;
  color: rgba(222, 241, 255, 1);
}
.month-quotation .center,
.year-quotation .center {
  height: 92%;
  width: 100%;
}
.t-data-center .t-data-center-down {
  /* height: 50%; */
  background: url(../assets/img/Listing_distribution.png) no-repeat center
    center;
  background-size: 100% 100%;
}
.top-data .t-data-right {
  margin-right: 1%;
  width: 32%;
    display: flex;
  flex-direction: column;
  align-items: center;
  background: url(../assets/img/company_farmer_base.png) no-repeat center center;
  background-size: 100% 100%;
}
.t-data-right .map{
  width: 95%;
  height: 95%;
  background:url('../assets/map1.png') no-repeat center 20%;
  background-size: contain;
  	animation:myfirst 10s infinite;
	-webkit-animation:myfirst 10s  infinite; /* Safari and Chrome */
  
}
/* 动画 */
@keyframes myfirst
{
0% {  background:url('../assets/map1.png') no-repeat center 20%;
  background-size: contain;}
	50%{  background:url('../assets/map2.png') no-repeat center 20%;
  background-size: contain;}
	100%{  background:url('../assets/map1.png') no-repeat center 20%;
  background-size: contain;}

}

@-webkit-keyframes myfirst /* Safari and Chrome */
{
	0% {  background:url('../assets/map1.png') no-repeat center 20%;
  background-size: contain;}
	50%{  background:url('../assets/map2.png') no-repeat center 20%;
  background-size: contain;}
	100%{  background:url('../assets/map1.png') no-repeat center 20%;
  background-size: contain;}
}

.container .down-data {
  height: 35%;
  width: 100%;
  display: flex;

  /* justify-content: space-around  */
}
.down-data .down-data-main1,
.down-data .down-data-main2,
.down-data .down-data-main3 {
  width: 32%;
  height: 80%;
  margin-bottom: 1%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.down-data .down-data-main1 {
  background: url(../assets/img/order_purchar.png) no-repeat center center;
  background-size: 100% 100%;
  margin-left: 1%;
}
.down-data-main1 .purchase-scroll {
  height: 83%;
  width: 100%;
}
.purchase-scroll .dv-scroll-board {
  color: rgb(0, 241, 255);
}

.down-data .down-data-main2 {
  background: url(../assets/img/circulation_distribution.png) no-repeat center
    center;
  background-size: 100% 100%;
  margin: 0 1%;
}
.down-data-main2 .circulation-distribution {
  height: 92%;
  width: 98%;
}
.down-data-main3 .fruit-growers-scroll {
  height: 92%;
  width: 100%;
}
.fruit-growers-scroll .dv-scroll-board {
  color: rgb(0, 241, 255);
}
.down-data .down-data-main3 {
  background: url(../assets/img/release_purchase.png) no-repeat center center;
  background-size: 100% 100%;
  margin-right: 1%;
}
</style>