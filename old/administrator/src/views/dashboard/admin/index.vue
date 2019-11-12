<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :md="16">
        <el-card shadow="always">
          <div slot="header" class="clearfix">
            <span style="font-size: 16px;">新的订单</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >查看更多</el-button
            >
          </div>
          <el-table
            :data="newOrder"
            border
            style="width: 100%"
            :height="height"
          >
            <el-table-column
              fixed
              prop="date"
              label="下单时间"
              width="160"
            ></el-table-column>
            <el-table-column
              prop="orderCoding"
              label="订单编码"
            ></el-table-column>
            <el-table-column
              prop="orderTotal"
              label="订单总额"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="consignee"
              label="收货人"
              width="120"
            ></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, newOrder)"
                  type="text"
                  size="small"
                  >移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :md="8">
        <el-card shadow="always">
          <div slot="header" class="clearfix">
            <span style="font-size: 16px;">销售统计</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >查看更多</el-button
            >
          </div>
          <div
            id="seller-chart"
            :style="{ width: '100%', height: height }"
          ></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :md="16">
        <el-card shadow="always">
          <div slot="header" class="clearfix">
            <span style="font-size: 16px;">用户统计</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >查看更多</el-button
            >
          </div>
          <div
            id="customer-chart"
            :style="{ width: '100%', height: height }"
          ></div>
        </el-card>
      </el-col>
      <el-col :md="8" class="good-statistical">
        <el-card shadow="always">
          <div slot="header" class="clearfix">
            <span style="font-size: 16px;">商品统计</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >查看更多</el-button
            >
          </div>
          <el-container class="btn-group" :style="{ height: height }">
            <router-link to="/list"
              ><el-button type="primary">热卖商品排行</el-button></router-link
            >
            <router-link to="/list"
              ><el-button type="success">商品销售明细</el-button></router-link
            >
            <router-link to="/list"
              ><el-button type="warning">商品收藏明细</el-button></router-link
            >
          </el-container>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "DashBoard",
  data() {
    return {
      height: "",
      newOrder: []
    };
  },
  created() {
    this.getHeight();
  },
  mounted() {
    this.drawLine1();
    this.drawLine();
  },
  methods: {
    getHeight() {
      this.height = (window.innerHeight - 344) / 2 + "px";
    },
    drawLine() {
      let customerChart = this.$echarts.init(
        document.getElementById("customer-chart")
      );
      customerChart.setOption({
        title: {
          text: "用户访问及增长情况",
          subtext: "纯属虚构"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["用户增长", "用户访问"]
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: "none"
            },
            dataView: { readOnly: false },
            magicType: { type: ["line", "bar"] },
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "用户访问",
            type: "line",
            data: [10, 50, 30, 10, 70, 130, 10],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          },
          {
            name: "用户增长",
            type: "line",
            data: [1, 5, 10, 2, 20, 3, 0],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
              data: [
                { type: "average", name: "平均值" },
                [
                  {
                    symbol: "none",
                    x: "90%",
                    yAxis: "max"
                  },
                  {
                    symbol: "circle",
                    label: {
                      normal: {
                        position: "start",
                        formatter: "最大值"
                      }
                    },
                    type: "max",
                    name: "最高点"
                  }
                ]
              ]
            }
          }
        ]
      });
    },
    drawLine1() {
      let sellerChart = this.$echarts.init(
        document.getElementById("seller-chart")
      );
      sellerChart.setOption({
        title: {
          text: "商品销售统计",
          subtext: "纯属虚构",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["储物用品", "展示用品", "周转用品", "餐桌用品", "其他"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 800, name: "储物用品" },
              { value: 600, name: "展示用品" },
              { value: 500, name: "周转用品" },
              { value: 400, name: "餐桌用品" },
              { value: 300, name: "其他" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    }
  }
};
</script>

<style scoped lang="scss">
.btn-group {
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  a {
    width: 100%;
    .el-button {
      width: 100%;
    }
  }
}
.el-col {
  margin-bottom: 10px;
}
</style>
