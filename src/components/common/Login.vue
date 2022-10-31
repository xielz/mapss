<template>
  <div class="login-outer">
    <div class="login-main">
      <div class="lf">
        <img src="../../../static/images/login.png" class="img"> </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="ms-content">
        <div class="login-title">
          欢迎登录
          <div class="wire">线</div>
        </div>
        <div class="login-name">课程思政资源库</div>
        <el-form-item prop="username" class="iput">
          <i class="fas userico"></i>
          <el-input v-model="ruleForm.username" placeholder="请输入账号">
          </el-input>
        </el-form-item>
        <el-form-item prop="password" class="iput">
          <i class="fas pwdico"></i>
          <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
          </el-input>
        </el-form-item>
        <!-- <el-form-item prop="verifycode" class="iput mg20">
                    <i class="fas codeico"></i>
                    <el-input type="text" placeholder="请输入验证码" v-model="ruleForm.verifycode" @keyup.enter.native="submitForm('ruleForm')">
                    </el-input>    
                </el-form-item> -->

        <el-form-item prop="verifycode" class="iput mg20">
          <div class="verfycode">
            <i class="fas codeico"></i>
            <el-input v-model="ruleForm.verifycode" placeholder="请输入验证码" @keyup.enter.native="submitForm('ruleForm')"></el-input>
            <span @click="refreshCode">
              <VerifyCode :identifyCode="identifyCode"></VerifyCode>
            </span>
          </div>
        </el-form-item>

        <el-form-item class="iput">
          <el-checkbox v-model="checkPwd" @change="checkboxPwd" label="记住密码" />
        </el-form-item>
        <div class="login-btn">
          <el-button class="btns" type="primary" @click="submitForm('ruleForm')" v-preventReClick>登录</el-button>
        </div>
      </el-form>

    </div>

  </div>
</template>

<script>
import VerifyCode from "../module/VerifyCode";
export default {
  components: { VerifyCode },
  data() {
    var validate_username = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      }
      callback();
    };
    var validate_password = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      callback();
    };

    // var validate_verifycode = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请输入验证码"));
    //   }
    //   callback();
    // };

    // 验证码自定义验证规则
    const validate_verifycode = (rule, value, callback) => {
      const newVal = value.toLowerCase();
      const identifyStr = this.identifyCode.toLowerCase();
      if (newVal === "") {
        callback(new Error("请输入验证码"));
      } else if (newVal !== identifyStr) {
        console.log("validate_verifycode:", value);
        callback(new Error("验证码不正确!"));
      } else {
        callback();
      }
    };

    return {
      identifyCodes: "3456789ABCDEFGHGKMNPQRSTUVWXY",
      identifyCode: "",
      ruleForm: {
        username: "",
        password: "",
        verifycode: ""
      },
      checkPwd: false,
      rules: {
        username: [
          {
            validator: validate_username,
            trigger: "blur"
          }
        ],

        password: [
          {
            validator: validate_password,
            trigger: "blur"
          }
        ],
        verifycode: [
          {
            validator: validate_verifycode,
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    // 验证码初始化
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);

    let username = localStorage.getItem("username");
    if (username) {
      this.ruleForm.username = localStorage.getItem("username");
      this.ruleForm.password = localStorage.getItem("password");
      this.checkPwd = true;
    }

    // console.log("window.location.protocol", window.location.protocol);
    // console.log("window.location.host ", window.location.host);
    // console.log("window.location.hostname ", window.location.hostname);
    // console.log("window.location.href", window.location.href);
    // console.log("window.location.pathname", window.location.pathname);
    // console.log("window.location.port", window.location.port);
    // console.log("aa", window.location.protocol + "//" + window.location.host);
  },
  methods: {
    checkboxPwd(val) {
      this.checkPwd = val;
      if (this.checkPwd == false) {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.checkPwd) {
            localStorage.setItem("username", this.ruleForm.username);
            localStorage.setItem("password", this.ruleForm.password);
          }

          var parame = JSON.stringify({
            userNameOrEmailAddress: this.ruleForm.username,
            password: this.ruleForm.password
          });
          //  Axios传递Body-raw参数
          this.$axios
            // .post(
            //   this.$api.Login,
            //   this.$qs.stringify({
            //     client_id: "AnYun_App",
            //     client_secret: "1q2w3E*",
            //     grant_type: "password",
            //     userName: this.ruleForm.username,
            //     password: this.ruleForm.password
            //   })

            //   // {headers: {'showLoading': false}}
            // )

            .post(this.$api.LoginCookie, parame, {
              headers: {
                "Content-Type": "application/json;charset=UTF-8"
              }
            })
            .then(res => {
              // this.$message({
              //   type: "success",
              //   message: "登陆成功!"
              // });
              // localStorage.setItem("access_token", res.data.access_token);
              this.$router.push("/");
              //   setTimeout(res =>{
              //   this.$router.push("/");
              // }, 1200);
            })
            .catch(error => {
              console.log("ccc", error);
              this.$message({
                type: "error",
                message: "用户名或密码错误"
              });
            });
        } else {
          return false;
        }
      });
    },

    // 生成随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    // 切换验证码
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    // 生成四位随机验证码
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)];
      }
    }
  }
};
</script>


<style lang="less" scoped>
.login-outer {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #ffffff;
  background: url(../../../static/images/loginbg.png) center no-repeat;
}

.login-title {
  color: rgba(33, 33, 33, 1);
  letter-spacing: 3.17px;
  font-size: 36px;
  position: relative;
  margin-bottom: 40px;
  font-weight: 700;
  .wire {
    width: 30px;
    height: 4px;
    background: #f6302b;
    display: inline-block;
    font-size: 0;
    position: absolute;
    bottom: -16px;
    left: 0;
  }
}
.login-name {
  margin-bottom: 60px;
  color: rgba(246, 48, 43, 1);
  letter-spacing: 5.76px;
  font-size: 48px;
}

.login-main {
  width: 70%;
  height: 700px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 16px rgba(228, 1, 18, 0.15);
  border-radius: 10px;
  display: flex;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .lf {
    width: 60%;
  }
  img {
    width: 100%;
    height: 100%;
    float: left;
  }
  .iput {
    position: relative;
    margin-bottom: 36px;

    /deep/ .el-input__inner {
      box-shadow: none;
      height: 45px;
      background: rgba(247, 247, 247, 1);
      border-radius: 6px;
      font-size: 16px;
      padding-left: 50px;
      &:focus {
        border-color: #f56c6c;
        box-shadow: 0 0 0 1px #f56c6c inset;
      }
    }

    /deep/ .el-form-item--error {
      color: #ff5656;
    }
    /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
      color: #f6302b;
    }
    /deep/ .el-checkbox__inner:hover {
      border-color: #f6302b;
    }
    /deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
      background-color: #f6302b;
      border-color: #f6302b;
    }

    /deep/ .el-checkbox__input.is-focus .el-checkbox__inner {
      border-color: #f6302b;
      //   border-color:  #DCDFE6;
    }
  }
  .verfycode {
    display: flex;
    width: 100%;
  }
  .mg20 {
    margin-bottom: 20px;
  }
  .ms-content {
    width: 40%;
    padding: 60px 30px 30px 30px;
  }
  .fas {
    vertical-align: middle;
    width: 19px;
    height: 19px;
    text-align: center;
    /* margin-right: 10px; */
    display: inline-block;
    position: absolute;
    top: 14px;
    left: 20px;
    z-index: 9;
  }
  .userico {
    background: url(../../../static/images/user.png) no-repeat;
  }
  .pwdico {
    background: url(../../../static/images/pwd.png) no-repeat;
  }
  .codeico {
    background: url(../../../static/images/code.png) no-repeat;
  }
}

.login-btn {
  text-align: center;
  .btns {
    width: 100%;
    font-size: 20px;
    color: #ffffff;
    height: 58px;
    margin: 30px 0 0 0;
    background: linear-gradient(187.59deg, rgba(246, 48, 43, 1) 0%, rgba(255, 108, 42, 1) 100%);
    border-radius: 60px;
    letter-spacing: 6px;
    border: 0;
    &:hover {
      background: linear-gradient(187.59deg, rgba(255, 108, 42, 1) 0%, rgba(246, 48, 43, 1) 100%);
    }
  }
}

.serverphone {
  font-size: 14px;
  line-height: 24px;
  color: #9fa0a0;
}

/*>=1024的设备*/
@media (min-width: 1523px) {
  .login-name {
    font-size: 40px;
  }
  .login-btn .btns {
    height: 56px;
  }
}
@media (min-width: 1401px) and (max-width: 1522px) {
  .login-name {
    font-size: 34px;
  }
  .login-btn .btns {
    height: 53px;
  }
}

@media (min-width: 1237px) and (max-width: 1400px) {
  .login-name {
    font-size: 30px;
  }
  .login-btn .btns {
    height: 50px;
  }
}

@media (min-width: 1024px) and (max-width: 1236px) {
  .login-name {
    font-size: 22px;
  }
  .login-btn .btns {
    height: 47px;
  }
}
</style>