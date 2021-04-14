<template>
  <el-menu
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    :default-active="$route.path"
  >
    <el-menu-item-group class="logoIcon">
      <el-image class="logo" alt="MyHoneyPot"></el-image>
    </el-menu-item-group>
    <el-menu-item index="/log"><i class="el-icon-s-operation"></i>实时监控</el-menu-item>
    <el-menu-item index="/map"><i class="el-icon-s-marketing"></i>数据地图</el-menu-item>
    <el-menu-item index="/history"><i class="el-icon-s-order"></i>历史记录</el-menu-item>
    <el-menu-item index="/status"><i class="el-icon-menu"></i>蜜罐状态</el-menu-item>
    <el-menu-item-group class="setting">
      <el-dropdown @command="logout">
        <i class="el-icon-s-tools"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            注销
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu-item-group>
    <el-menu-item-group class="userIcon">
      <el-avatar class="user" :size="size"></el-avatar>
    </el-menu-item-group>
  </el-menu>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      size: "medium",
    };
  },
  methods: {
    logout() {
      const _this = this
      _this.$axios.get("/user/logout", {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(() => {
        _this.$store.commit("REMOVE_INFO")
        _this.$router.push("/login")
      })
    }
  }
}
</script>

<style scoped>


.userIcon {
  float: right;
  margin-right: 20px;
  margin-top: -3px;
  size: 15px;
  outline: none;
}

.setting {
  float: right;
  font-size: 20px;
  margin-right: 20px;
  margin-top: 5px;
  outline: none;
}

.logoIcon {
  float: left;
  margin-top: -8px;
  margin-left: 15px;
  margin-right: 20px;
  outline: none;
}

.logo {
  content: url("../assets/logo.png");
  width: 200px;
  height: 45px;
}

.el-icon-s-tools {
  color: #eeeeee;
  font-size: 20px;
}

.user {
  content: url("../assets/userIcon.jpg");
}
</style>
