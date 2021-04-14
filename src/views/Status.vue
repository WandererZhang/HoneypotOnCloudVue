<template>
  <div>
    <Header></Header>
    <el-row type="flex">
      <el-col :span="5"><h2><i class="el-icon-tickets">蜜罐列表</i></h2></el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="22" style="text-align: center">
        <el-card shadow="always">
          <el-table
            :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            :cell-style="cellStyle"
          >
            <el-table-column
              type="index"
              width="50">
            </el-table-column>
            <el-table-column
              label="蜜罐名称"
              prop="name">
            </el-table-column>
            <el-table-column
              label="受到攻击数"
              prop="number">
              <template slot-scope="scope">
                {{ scope.row.number }}
              </template>
            </el-table-column>
            <el-table-column
              label="蜜罐状态"
              prop="status">
              <template slot-scope="scope">
                {{ scope.row.status }}
              </template>
            </el-table-column>
            <el-table-column
              align="right">
              <template slot="header" slot-scope="scope">
                <el-input
                  v-model="search"
                  size="mini"
                  placeholder="输入蜜罐名称搜索"/>
              </template>
              <template slot-scope="scope">
                <el-switch
                  style="display: block"
                  v-model="tableData[scope.$index].defaultValue"
                  @change="changeSwitch($event,scope.row.name)"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Header from "../components/Header";
import Element from "element-ui";

export default {
  name: "Status",
  components: {
    Header
  },
  data() {
    return {
      tableData: [{
        name: 'HTTP 蜜罐',
        number: '',
        status: '',
        defaultValue: false
      }, {
        name: 'TELNET 蜜罐',
        number: '',
        status: '',
        defaultValue: false
      }, {
        name: 'REDIS 蜜罐',
        number: '',
        status: '',
        defaultValue: false
      }, {
        name: 'MYSQL 蜜罐',
        number: '',
        status: '',
        defaultValue: false
      }],
      search: ''
    }
  },
  methods: {
    setData() {
      const _this = this
      _this.$axios.get("/status/query").then(res => {
        const json = res.data.data
        let httpItem = _this.tableData.filter((p) => {
          return p.name === "HTTP 蜜罐"
        })
        let telnetItem = _this.tableData.filter((p) => {
          return p.name === "TELNET 蜜罐"
        })
        let mysqlItem = _this.tableData.filter((p) => {
          return p.name === "MYSQL 蜜罐"
        })
        let redisItem = _this.tableData.filter((p) => {
          return p.name === "REDIS 蜜罐"
        })
        for (let k in json) {
          if (!json.hasOwnProperty(k))
            continue;
          let value = json[k]
          if (k.endsWith("Status")) {
            if (k.startsWith("http")) {
              httpItem[0].status = value
              httpItem[0].defaultValue = value === 'ON';
            } else if (k.startsWith("telnet")) {
              telnetItem[0].status = value
              telnetItem[0].defaultValue = value === 'ON';
            } else if (k.startsWith("mysql")) {
              mysqlItem[0].status = value
              mysqlItem[0].defaultValue = value === 'ON';
            } else if (k.startsWith("redis")) {
              redisItem[0].status = value
              redisItem[0].defaultValue = value === 'ON';
            }
          } else if (k.endsWith("Number")) {
            if (k.startsWith("http")) {
              httpItem[0].number = value
            } else if (k.startsWith("telnet")) {
              telnetItem[0].number = value
            } else if (k.startsWith("mysql")) {
              mysqlItem[0].number = value
            } else if (k.startsWith("redis")) {
              redisItem[0].number = value
            }
          }
        }
        _this.$message({
            type: "success",
            message: "蜜罐状态更新成功!",
            offset: 70
        })
      }).catch(()=>{
        _this.$message({
          type: "error",
          message: "蜜罐状态更新失败!",
          offset: 70
        })
      })
    },
    cellStyle(row) {
      if (row.column.label === "蜜罐状态" && row.row.status === "ON") {
        return 'color:green'
      } else if (row.column.label === "蜜罐状态" && row.row.status === "OFF") {
        return 'color:red'
      }
    },
    changeSwitch($event, name) {
      const _this = this
      if (name === "HTTP 蜜罐") {
        let status = "OFF"
        if ($event) {
          status = "ON"
        }
        _this.$axios.get("/status/update/httpStatus/" + status).then(() => {
          this.timer = setTimeout(() => {
            this.setData()
          }, 100);
        })
      } else if (name === "TELNET 蜜罐") {
        let status = "OFF"
        if ($event) {
          status = "ON"
        }
        _this.$axios.get("/status/update/telnetStatus/" + status).then(() => {
          this.timer = setTimeout(() => {
            this.setData()
          }, 100);
        })
      } else if (name === "MYSQL 蜜罐") {
        let status = "OFF"
        if ($event) {
          status = "ON"
        }
        _this.$axios.get("/status/update/mysqlStatus/" + status).then(() => {
          this.timer = setTimeout(() => {
            this.setData()
          }, 100);
        })
      } else if (name === "REDIS 蜜罐") {
        let status = "OFF"
        if ($event) {
          status = "ON"
        }
        _this.$axios.get("/status/update/redisStatus/" + status).then(() => {
          this.timer = setTimeout(() => {
            this.setData()
          }, 100);
        })
      }
    }
  },
  created() {
    this.setData()
  }
  ,
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
  margin-top: 1%;
}

.el-col {
  border-radius: 4px;
  margin-left: 50px;
  margin-right: 50px;
}

.el-table {
  width: 100%;
}
</style>
