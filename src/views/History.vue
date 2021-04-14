<template>
  <div>
    <Header></Header>
    <el-row type="flex" justify="center">
      <el-col :span="22" style="text-align: center">
        <el-card shadow="always">
          <el-table
            :data="tableData.filter(data => !search || data.address.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*pageSize,currentPage*pageSize)"
            :key="mainTableKey"
            ref="multipleTable"
          >
            <el-table-column
              label="IP地址"
              prop="address">
            </el-table-column>
            <el-table-column
              label="方式"
              prop="method">
            </el-table-column>
            <el-table-column
              label="地点"
              prop="location">
            </el-table-column>
            <el-table-column
              label="时间"
              prop="date">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
            <el-table-column
              align="right">
              <template slot="header" slot-scope="scope">
                <el-input
                  v-model="search"
                  size="mini"
                  placeholder="输入IP搜索"/>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="pagination"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-size="pageSize" layout="total,prev, pager, next" :total="tableData.length">
          </el-pagination>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Header from "../components/Header";

export default {
  name: "History",
  components: {Header},
  methods: {
    init() {
      const _this = this
      _this.$axios.get("/log/history").then(res => {
        const json = res.data.data
        for (let k in json) {
          if (!json.hasOwnProperty(k))
            continue;
          _this.tableData.push({
            address: json[k].address,
            method: json[k].method,
            date: json[k].date,
            location: json[k].location
          })
        }
      })
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleDelete(index, row) {
      const _this = this
      _this.$axios.post('/log/delete', row).then(() => {
        _this.tableData.splice(index, 1);
      }).catch(()=>{
        _this.$message({
          type: "error",
          message: "删除失败!",
          offset: 70
        })
      })
    }
  },
  data() {
    return {
      search: '',
      tableData: [],
      currentPage: 1,
      total: 20,
      pageSize: 9,
      mainTableKey: 1
    }
  }, created() {
    this.init()
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
  margin-top: 35px;
}

.el-col {
  border-radius: 4px;
  margin-left: 50px;
  margin-right: 50px;
}

.el-table {
  width: 100%;
  height: 527px;
}

.pagination {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
</style>
