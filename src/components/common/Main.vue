<template>
  <div>
    <div class="header">
      <div class="lf">课程思政资源库</div>
      <!-- <div class="ct">
                    <p :class="navindex === index ? 'on' : 'skip'" v-for="(item, index) in navList" @click="routerlink(index, item.path)" :key="index">
                        {{ item.title }}
                    </p>      
            </div> -->
      <div class="ct">
        <router-link to="/" :class="[$route.meta.index==0? 'on': '' ]">平台资源库</router-link>
         <router-link to="/SchoolResource" :class="[$route.meta.index==1? 'on': '' ]">校级资源库</router-link>
        <router-link to="/MajorResource" :class="[$route.meta.index==2? 'on': '' ]">专业资源库</router-link>
        <router-link to="/CourseResource" :class="[$route.meta.index==3? 'on': '' ]">课程资源库</router-link>
        <router-link to="/My" :class="[$route.meta.index==4? 'on': '' ]">我的</router-link>
         <a :href="skip" target="_blank">管理中心</a>

        <!-- <router-link to="https://www.czspp.com/v_play/bXZfODgyMi1ubV8x.html"  :class="[$route.meta.index==3? 'on': '' ]" target="_blank">管理中心</router-link> -->
        <!-- <router-link to="#"  :class="[$route.meta.index==4? 'on': '' ]">个人中心</router-link> -->
      </div>
      <div class="rg">
        <!-- <i class="waring"></i> -->
        <img class="img" :src="userInfo.image ? userInfo.image : defaultImg" />
        <div class="dropdown">
          <span class="dropdown-name"> {{userInfo.userName}}</span>
          <!-- <el-dropdown trigger="click">
            <span class="el-dropdown-link" popper-class="dropdown-popper">
              {{userInfo.userName}}
              <i class="dropdown-ico"></i>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <a href="http://blog.gdfengshuo.com/about/" class="link">
                    <el-dropdown-item>Action 1</el-dropdown-item>
                  </a>
                </el-dropdown-item>
                <el-dropdown-item>
                  <a href="http://blog.gdfengshuo.com/about/" class="link" target="_blank">
               
                    <el-dropdown-item>Action 2</el-dropdown-item>
                  </a>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown> -->
        </div>
        <div class="exit" @click="exit">
          <i class="exitico"></i>退出</div>
      </div>
    </div>
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script>
var _this = this;

export default {
  data() {
    return {
      // navindex: 0,
      // navList: [
      //   { title: "驾驶舱", path: "/" },
      //   { title: "专业资源库", path: "/MajorResource" },
      //   { title: "课程资源库", path: "/" },
      //   { title: "管理中心", path: "/" },
      //   { title: "个人中心", path: "/" }
      // ],
      userInfo: {},
      defaultImg: require("../../../static/images/portrait.png"),
      skip:"",
    };
  },
  computed: {},
  mounted() {
    _this = this;
    _this.getUserInfo();

    _this.skip=_this.$api.localPath;
  },

  methods: {
    getUserInfo() {
      this.$axios
        .get(this.$api.userInfo, {})
        .then(res => {
          if (res.status == 200) {
            this.userInfo = res.data;
          }
        })
        .catch(error => {
              //  this.$router.push('/Login');

          console.log("error", error);
        });
    },

    exit() {
      this.$confirm("确定退出登录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // localStorage.removeItem("access_token");
          this.$router.push("/Login");
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
    }
  }

};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 999;
  background: url(../../../static/images/topbg.png) no-repeat;
    background-size: cover;
  .lf {
    color: rgba(255, 255, 255, 1);
    letter-spacing: 1.68px;
    font-size: 28px;

    padding-left: 48px;
  }

  .ct {
    a {
      color: #ffffff;
      font-size: 18px;

      display: inline-block;
      padding: 0 16px;
      /* width: 107px; */
      text-align: center;
      height: 70px;
      line-height: 70px;
    }
    .skip {
      color: #ffffff;
      font-size: 18px;

      display: inline-block;
      padding: 0 16px;
      /* width: 107px; */
      text-align: center;
      height: 70px;
      line-height: 70px;
    }

    .on {
      background: rgba(165, 6, 4, 1);
      color: rgba(255, 255, 255, 1);
    }
  }

  .rg {
    display: flex;
    align-items: center;
    .img {
      width: 40px;
      height: 40px;
      border-radius: 100%;
    }
    .waring {
      margin-right: 20px;
      width: 17px;
      height: 20px;
      background: url(../../../static/images/warning.png) no-repeat;
      display: inline-block;
      cursor: pointer;
    }

    .portrait {
      width: 40px;
      height: 40px;
    }

    .dropdown {
      margin: 0 17px;
      // cursor: pointer;

      .example-showcase .el-dropdown-link {
        cursor: pointer;
        color: rgba(255, 255, 255, 1);
        display: flex;
        align-items: center;
      }

      .el-dropdown {
        color: #ffffff;
      }

      .dropdown-ico {
        width: 14px;
        height: 14px;
        transform: rotate(90deg);
        background: url(../../../static/images/arrow.png) no-repeat;
        display: inline-block;
        margin-left: 10px;
      }

      .dropdown-name {
        font-size: 14px;
        color: #ffffff;
        cursor: context-menu;
      }
    }

    .exit {
      color: #ffffff;
      font-size: 14px;

      display: flex;
      align-items: center;
      padding-right: 25px;
      cursor: pointer;

      .exitico {
        width: 19px;
        height: 20px;
        background: url(../../../static/images/exit.png) no-repeat;
        display: inline-block;
        margin-right: 10px;
      }
    }
  }
}

.link {
  color: #606266;
}

.main-content {
  padding-top: 70px;
}
</style>
