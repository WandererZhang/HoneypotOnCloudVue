<template>
  <div>
    <Header></Header>
    <el-row :gutter="20" type="flex" justify="center">
      <el-col :span="13">
        <el-card shadow="always" class="map-card">
          <dv-flyline-chart-enhanced class="map-pic" :config="configMap"/>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card shadow="always" class="board-card">
          <i class="el-icon-s-data">攻击者IP来源地统计</i>
          <div class="board-container">
            <dv-scroll-ranking-board class="board" :config="configBoard"/>
          </div>
        </el-card>
        <el-card shadow="always" class="chart-card">
          <i class="el-icon-pie-chart">攻击方式统计</i>
          <div class="chart-container">
            <dv-capsule-chart :config="configChart" class="capsule-chart"/>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Header from "../components/Header";

export default {
  name: "History",
  components: {
    Header,
  },
  data() {
    return {
      configChart: {
        data: [],
        showValue: true
      },
      configMap: {
        points: [
          {
            name: '上海',
            coordinate: [0.78, 0.69],
            halo: {
              show: true,
            },
            icon: {
              src: '../../static/images/mapCenterPoint.png',
              width: 30,
              height: 30
            },
            text: {
              show: true
            }
          },
          {
            name: '北京市',
            coordinate: [0.70, 0.44],
          },
          {
            name: '四川省',
            coordinate: [0.49, 0.70]
          },
          {
            name: '广东',
            coordinate: [0.65, 0.87]
          },
          {
            name: '浙江省',
            coordinate: [0.76, 0.72]
          },
          {
            name: '天津市',
            coordinate: [0.72, 0.46]
          },
          {
            name: '湖北省',
            coordinate: [0.66, 0.69]
          },
          {
            name: '福建省',
            coordinate: [0.74, 0.81]
          },
          {
            name: '辽宁',
            coordinate: [0.81, 0.39]
          },
          {
            name: '山东省',
            coordinate: [0.72, 0.53]
          },
          {
            name: '江西',
            coordinate: [0.69, 0.75]
          },
          {
            name: '河南',
            coordinate: [0.66, 0.59]
          },
          {
            name: '江苏省',
            coordinate: [0.75, 0.65]
          },
          {
            name: '吉林',
            coordinate: [0.86, 0.33]
          },
          {
            name: '黑龙江省',
            coordinate: [0.88, 0.24]
          },
          {
            name: '内蒙古自治区',
            coordinate: [0.62, 0.39]
          },
          {
            name: '山西',
            coordinate: [0.63, 0.50]
          },
          {
            name: '河北省',
            coordinate: [0.68, 0.49]
          },
          {
            name: '安徽',
            coordinate: [0.71, 0.66]
          },
          {
            name: '湖南',
            coordinate: [0.63, 0.75]
          },
          {
            name: '广西壮族自治区',
            coordinate: [0.57, 0.88]
          },
          {
            name: '海南',
            coordinate: [0.59, 0.97]
          },
          {
            name: '贵州',
            coordinate: [0.54, 0.79]
          },
          {
            name: '云南',
            coordinate: [0.47, 0.83]
          },
          {
            name: '西藏自治区',
            coordinate: [0.27, 0.69]
          },
          {
            name: '陕西',
            coordinate: [0.57, 0.60]
          },
          {
            name: '甘肃',
            coordinate: [0.50, 0.55]
          },
          {
            name: '青海省',
            coordinate: [0.44, 0.53]
          },
          {
            name: '宁夏回族自治区',
            coordinate: [0.53, 0.49]
          },
          {
            name: '新疆',
            coordinate: [0.21, 0.33]
          },
          {
            name: '台湾',
            coordinate: [0.78, 0.85]
          },
          {
            name: '重庆',
            coordinate: [0.56, 0.71]
          },
          {
            name: '香港',
            coordinate: [0.67, 0.90]
          },
          {
            name: '澳门',
            coordinate: [0.64, 0.91]
          }
        ],
        lines: [],
        icon: {
          show: true,
          src: '../../static/images/mapPoint.png'
        },
        text: {
          show: true,
        },
        bgImgSrc: '../../static/images/ChinaMap.jpg'
      },
      configBoard: {
        data: [],
        rowNum: 6
      },
    }
  },
  methods: {
    init() {
      const _this = this
      _this.$axios.get("/log/location").then(res => {
        const json = res.data.data
        window.sessionStorage.setItem('location', JSON.stringify(json))
        for (let k in json) {
          if (!json.hasOwnProperty(k))
            continue;
          if (k !== '海外') {
            _this.configMap.lines.push({
              source: k,
              target: '上海',
              color: '#FF6600',
              width: 1.5
            })
          }
        }
      })
      _this.$axios.get("/status/query").then(res => {
        const json = res.data.data
        window.sessionStorage.setItem('status', JSON.stringify(json))
      })
      const data = JSON.parse(window.sessionStorage.getItem('location'));
      const status = JSON.parse(window.sessionStorage.getItem('status'));
      for (let k in status) {
        if (!status.hasOwnProperty(k))
          continue;
        if (k.endsWith("Number")) {
          let str = k.replace('Number', '');
          _this.configChart.data.push({
            name: str,
            value: status[k]
          })

        }
      }
      for (let k in data) {
        if (!data.hasOwnProperty(k))
          continue;
        _this.configBoard.data.push({
          name: k,
          value: data[k]
        })
      }
    },
  },
  created() {
    this.init()
  },
}
</script>

<style scoped>
.el-row {
  margin-top: 30px;
  width: 100%;
}

.map-card {
  width: 100%;
  height: 100%;
  background: url("../assets/map.jpg") no-repeat;
  background-size: 100% 100%;
}

.board-card {
  background: #282c34;
}

.chart-card {
  margin-top: 20px;
  background: #282c34;
  height: 270px;
}

.map-pic {
  width: 774px;
  height: 569px;
}

.el-icon-pie-chart {
  display: flex;
  justify-content: center;
  color: white;
}

.el-icon-s-data {
  display: flex;
  justify-content: center;
  color: white;
}

.board {
  width: 500px;
  height: 290px;
  color: white;
}

.board-container {
  justify-content: center;
  align-items: center;
  display: flex;
}

.chart-container {
  justify-content: center;
  align-items: center;
  display: flex;
}

.capsule-chart {
  width: 400px;
  height: 210px;
  margin-top: 10px;
}
</style>
