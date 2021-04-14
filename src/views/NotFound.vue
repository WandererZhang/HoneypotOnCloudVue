<template>
  <div class="_404">
    <img src="../assets/404.png" alt="页面未找到"><br>
    <h2 class="msg">抱歉，页面未找到，<span>{{ countDown }}</span>s后自动<br>
      <el-link icon="el-icon-back" type="primary" href="/log" @click="goHome" class="el-link">返回到首页</el-link>
    </h2>
  </div>
</template>

<script>
export default {
  name: "notFound",
  data() {
    return {
      countDown: 5,
      timer: null
    }
  },
  methods: {
    goHome() {
      const _this = this
      _this.$router.push('/log')
      clearInterval(this.timer)
    },
    setTimer() {
      this.timer = setInterval(() => {
        this.countDown > 0 ? this.countDown-- : this.goHome()
      }, 1000)
    }
  }, created() {
    this.setTimer()
  }, beforeRouteLeave(to, form, next) {
    clearInterval(this.timer)
    next()
  }
}
</script>

<style scoped>
._404 {
  margin-top: 100px;
  text-align: center;
}

._404 img {
  width: 20rem;
}

._404 a {
  color: skyblue;
}

._404 a:hover {
  color: skyblue;
}

.msg {
  font-size: 25px;
}

.el-link {
  margin-top: 10px;
  font-size: 25px;
}
</style>
