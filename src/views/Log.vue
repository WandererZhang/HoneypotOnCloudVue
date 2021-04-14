<template>
  <div>
    <Header></Header>
    <el-row class="status-card" type="flex" :gutter="20" justify="center">
      <el-col :span="5">
        <el-card shadow="always">
          <h2 class="el-icon-discover" style="color: coral">HTTP 蜜罐</h2><br>
          <a v-if="httpStatus===true">
            <span class="demonstration" style="color: #909399">状态: </span>
            <span class="demonstration" style="color: #67C23A">ON</span>
          </a>
          <a v-else>
            <span class="demonstration" style="color: #909399">状态: </span>
            <span class="demonstration" style="color: #F56C6C">OFF</span>
          </a>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card shadow="always" style="color: skyblue">
          <h2 class="el-icon-upload">TELNET 蜜罐</h2><br>
          <a v-if="telnetStatus===true">
            <span class="demonstration" style="color: #909399">状态: </span>
            <span class="demonstration" style="color: #67C23A">ON</span>
          </a>
          <a v-else>
            <span class="demonstration" style="color: #909399">状态: </span>
            <span class="demonstration" style="color: #F56C6C">OFF</span>
          </a>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card shadow="always" style="color: yellowgreen">
          <h2 class="el-icon-coin">MYSQL 蜜罐</h2><br>
          <a v-if="mysqlStatus===true">
            <span class="demonstration" style="color: #909399">状态: </span>
            <span class="demonstration" style="color: #67C23A">ON</span>
          </a>
          <a v-else>
            <span class="demonstration" style="color: #909399">状态: </span>
            <span class="demonstration" style="color: #F56C6C">OFF</span>
          </a>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card shadow="always" style="color: darkviolet">
          <h2 class="el-icon-copy-document">REDIS 蜜罐</h2><br>
          <a v-if="redisStatus===true">
            <span class="demonstration" style="color: #909399">状态: </span>
            <span class="demonstration" style="color: #67C23A">ON</span>
          </a>
          <a v-else>
            <span class="demonstration" style="color: #909399">状态: </span>
            <span class="demonstration" style="color: #F56C6C">OFF</span>
          </a>
        </el-card>
      </el-col>
    </el-row>
    <div class="received">
      <a class="el-icon-s-claim">已接收数量: <a style="color: #409EFF">{{ receivedNumber }}</a></a>
    </div>
    <el-row class="table-card" type="flex" :gutter="20" justify="center">
      <el-card shadow="always" class="table">
        <dv-scroll-board :config="config" ref="scrollBoard"/>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import Header from "../components/Header";

export default {
  name: "Log",
  components: {
    Header
  },
  data() {
    return {
      httpStatus: false,
      telnetStatus: false,
      mysqlStatus: false,
      redisStatus: false,
      receivedNumber: 0,
      webSocket: null,
      config: {
        header: ['IP地址', '方式', '时间'],
        index: true,
        waitTime: 1000,
        indexHeader: '序号',
        columnWidth: [100, 300, 300, 300]
      },
      tableData: []
    }
  },
  created() {
    const _this = this
    _this.$axios.get("/status/query").then(res => {
      const json = res.data.data
      for (let k in json) {
        if (!json.hasOwnProperty(k))
          continue;
        let value = json[k]
        if (k.endsWith("Status")) {
          if (k.startsWith("http")) {
            this.httpStatus = value === 'ON';
          } else if (k.startsWith("telnet")) {
            this.telnetStatus = value === 'ON';
          } else if (k.startsWith("mysql")) {
            this.mysqlStatus = value === 'ON';
          } else if (k.startsWith("redis")) {
            this.redisStatus = value === 'ON';
          }
        }
      }
    })
  },
  mounted() {
    if (window.localStorage.getItem("token") != null && this.webSocket === null) {
      this.webSocket = new WebSocket('ws://124.70.197.208:8081/updateMessage/wanderzhang')
      this.initWebSocket()
    }
  },
  methods: {
    initWebSocket() {
      this.webSocket.onerror = this.onError
      this.webSocket.onopen = this.onOpen
      this.webSocket.onmessage = this.onMessage
      this.webSocket.onclose = this.onClose
    },
    onError() {
      console.log("WebSocket failed")
      this.$message({
        type: "error",
        message: "WebSocket连接错误!",
        offset: 70
      })
    },
    onOpen() {
      console.log("WebSocket started")
      this.$message({
        type: "success",
        message: "WebSocket连接成功!",
        offset: 70
      })
    },
    onMessage(event) {
      let data = JSON.parse(event.data)
      this.receivedNumber++
      console.log(data)
      this.updateTableData(data)
    },
    onClose() {
      console.log("WebSocket closed")
      this.$message({
        type: "warning",
        message: "WebSocket连接关闭!",
        offset: 70
      })
    },
    updateTableData(data) {
      const rows = [data.address, data.method, data.date]
      this.tableData.push(rows)
      this.$refs['scrollBoard'].updateRows(this.tableData)
    }
  },
  beforeRouteLeave(to, form, next) {
    this.webSocket.close()
    next()
  }
}

</script>

<style scoped>
.el-row {
  width: 100%;
}

.status-card {
  margin-top: 30px;
}

.table-card {
  margin-top: 5px;
}

.demonstration {
  font-size: 22px;
}

.table {
  background: #282c34;
}

.dv-scroll-board {
  width: 1000px;
  height: 400px
}

.received {
  margin-left: 17%;
  color: #909399;
  font-size: 22px;
  margin-top: 20px;
}
</style>
