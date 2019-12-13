<template>
  <div>
    <div class="banner_top">
      <img class="back_ground" src="/static/images/login/login.png" alt />
    </div>
    <div id="home">
      <div class="top">
        <p class="login" @click="fixed">登录</p>
        <p class="resiter" @click="fixed_one">注册</p>
      </div>
      <div class="arrow-up">
        <!--向上的三角-->
      </div>
      <div class="login_details">
        <input class="phone" type="text" v-model="phone" placeholder="输入手机号" />
        <input class="password" type="password" v-model="password" placeholder="输入登录密码" />
        <input
          class="password_dict"
          type="password"
          v-model="password_dict"
          placeholder="再次输入登录密码"
        />
        <input
          class="password_dict_in"
          type="text"
          v-model="uid"
          placeholder="邀请码"
          disabled="disabled"
          v-show="keyon"
        />
        <input
          class="password_dict_in"
          type="number"
          maxlength="6"
          v-model="uid"
          placeholder="请输入邀请码,限制六位数字"
          v-show="bukeyon"
        />
        <div class="concent">
          <input
            class="Verification"
            type="text"
            placeholder="输入验证码"
            v-model="verifyCode"
            autocomplete="off"
          />
          <button
            class="verifyCode global-option-style"
            :disabled="disabled"
            @click="getVerifyCode()"
          >{{verifyText}}</button>
        </div>
        <div class="reg">
          <p class="submit" @click="sunbit()">注册</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import md5 from "js-md5";
import "../../../static/js/public.js";
export default {
  name: "register",
  created() {
    // this.no()
    //          var name,value;
    //    var str=location.href;
    //   var arr = str.split("?")
    //    console.log(arr,"uid")
    //    var ss = arr.split("=");
  },
  data() {
    return {
      verifyText: "获取验证码",
      verifyCode: "",
      phone: "",
      password: "",
      password_dict: "",
      uid: "",
      isClick: false,
      flag: false,
      disabled: false,
      keyon: false,
      bukeyon: false
    };
  },
  created() {
    this.huoqu();
  },
  methods: {
    // 获取uid
    huoqu() {
      var url = window.location.href;
      console.log(url, "url");
      var uid = url.split("=");
      var uid = uid[1];
      if (uid == undefined) {
        this.bukeyon = true;
        this.uid = "";
        console.log("bukeyon");
      } else {
        this.keyon = true;
        this.uid = uid;
        console.log(this.uid, "dsd");
        this.keyon = true;
        console.log("keyon");
      }
    },
    // no() {
    //     console.log(this.uid,"fason")
    //   this.$axios
    //     .post("user/register", {
    //       phone: phone,
    //       verify_code: this.verifyCode,
    //       user_password: pawd,
    //       confirm_password: pawd2,
    //       uid: uid
    //     })
    //     .then(res => {
    //       // this.isClick = false;
    //       var status = res.data.status;
    //       if (status === 200) {
    //         // 开启倒计时
    //         this.countDown();
    //         this.$toast(res.data.data);
    //       } else {
    //         this.$toast(res.data.msg);
    //       }
    //       this.isClick = false;
    //     });
    // },
    fixed() {
      this.$router.push({ path: "/Login", name: "Login" });
    },
    fixed_one() {
      this.$router.push({ path: "/register", name: "register" });
    },
    getVerifyCode() {
      if (this.validatePhone()) {
        if (this.isClick) {
          return;
        }
        this.isClick = true;
        // 发送网络请求
        var $phone = this.phone;
        var $temp = "sms_reg";
        var $md = md5($phone + $temp);
        this.$axios
          .post("user/sendVerifyCode", {
            phone: this.phone,
            temp: $temp,
            auth: $md,
            type: 1
          })
          .then(res => {
            // this.isClick = false;
            var status = res.data.status;
            if (status === 200) {
              // 开启倒计时
              this.countDown();
              this.$toast(res.data.data);
            } else {
              this.$toast(res.data.msg);
            }
            this.isClick = false;
          })
          .catch(error => {
            this.isClick = false;
            alert("请求错误:" + error);
          });
      }
    },

    /**a
     * 校验手机号
     */
    validatePhone() {
      var phone = this.phone;
      if (!phone) {
        this.$toast("手机号码不能为空");
        return false;
      } else if (!/^1[3456789]\d{9}$/.test(phone)) {
        this.$toast("请填写正确的手机号码");
        return false;
      } else {
        return true;
      }
    },

    /**
     * 倒计时效果
     */
    countDown() {
      var count = 60;
      var timer = setInterval(() => {
        if (count == 0) {
          clearInterval(timer);
          this.verifyText = "重新获取";
          this.disabled = false;
        } else if (count < 10) {
          count = "0" + count;
          this.verifyText = count + "秒后重试";
          this.disabled = true;
          count--;
        } else {
          //倒计时
          this.verifyText = count + "秒后重试";
          this.disabled = true;
          count--;
        }
      }, 1000);
    },

    /**
     * 校验注册
     */
    sunbit() {
      var phone = this.phone;
      var pawd = this.password;
      var pawd2 = this.password_dict;
      var uid = "";
      if ("undefined" != typeof this.uid) {
        uid = new Number(this.uid);
      }
      if (phone == "") {
        this.$toast("手机号码不能为空");
        return false;
      } else if (!/^1[3456789]\d{9}$/.test(phone)) {
        this.$toast("请填写正确的手机号码");
        return false;
      } else if (this.verifyCode == "") {
        this.$toast("验证码不能为空");
        return false;
      } else if (pawd == "") {
        this.$toast("密码不能为空");
        return false;
      } else if (this.uid == "") {
        this.$toast("邀请码不能为空");
      } else if (!/^[0-9]{6}$/.test(this.uid)) {
        this.$toast("邀请码为六位数字");
      } else if (!/^[a-z0-9_-]{6,18}$/.test(pawd)) {
        this.$toast("密码长度为6-18位");
        return false;
      } else if (pawd2 == "") {
        this.$toast("确认密码不能为空");
        return false;
      } else if (pawd != pawd2) {
        this.$toast("两次密码不一致");
        return false;
      } else if ((uid = "")) {
        this.$toast("请输入邀请码");
        return false;
      } else {
        if (this.flag) {
          return;
        }
        this.flag = true;
        // 请求数据
        this.$axios
          .post("user/register", {
            phone: phone,
            verify_code: this.verifyCode,
            user_password: pawd,
            confirm_password: pawd2,
            uid: this.uid
          })
          .then(res => {
            console.log(res);
            var status = res.data.status;
            if (status === 200) {
              this.$toast("注册成功");
              setTimeout(() => {
                this.$router.push("/home/Home");
              }, 1000);
            } else if (status === 301) {
              this.$toast(res.data.msg);
            } else {
              this.flag = false;
              this.$toast(res.data.msg);
            }
          })
          .catch(error => {
            this.flag = false;
            this.$toast("请求错误");
          });
      }
    }
  }
};
</script>
<style scoped>
#home {
  width: 100%;
  position: absolute;
  top: 220px;
}
.top {
  display: flex;
  width: 100%;
  height: 32px;
}
.login {
  display: blcok;
  width: 50%;
  line-height: 32px;
  font-size: 32px;
  text-align: center;
  color: black;
  font-weight: 800;
  color: #fff;
}
.resiter {
  display: block;
  width: 50%;
  line-height: 32px;
  font-size: 32px;
  text-align: center;
  color: black;
  font-weight: 800;
  color: #fff;
}
.login_details {
  width: 100%;
  background: #fff;
  padding-bottom: 18px;
}
.phone {
  width: 92%;
  height: 82px;
  margin-left: 24px;
  border: 2px solid #ebebeb;
  border-radius: 8px;
  outline: none;
  font-size: 30px;
  margin-top: 20px;
  padding-left: 10px;
}
.password {
  width: 92%;
  height: 82px;
  margin-left: 24px;
  border: 2px solid #ebebeb;
  border-radius: 8px;
  outline: none;
  font-size: 30px;
  margin: 20px 0 0 24px;
  padding-left: 10px;
}
.password_dict {
  margin: 20px 0 0 24px;
  width: 92%;
  height: 82px;
  border: 2px solid #ebebeb;
  border-radius: 8px;
  outline: none;
  margin-top: 18px;
  font-size: 30px;
  padding-left: 10px;
}
.password {
  width: 92%;
  height: 82px;
  margin-left: 24px;
  border: 2px solid #ebebeb;
  border-radius: 8px;
  outline: none;
  font-size: 30px;
  margin: 20px 0 0 24px;
  padding-left: 10px;
}
.password_dict_in {
  margin-left: 24px;
  width: 92%;
  height: 82px;
  margin-left: 24px;
  border: 2px solid #ebebeb;
  border-radius: 8px;
  outline: none;
  margin-top: 18px;
  font-size: 30px;
  padding-left: 10px;
}
.Verification {
  outline: none;
  border: none;
  font-size: 30px;
  padding-left: 10px;
  width: 22%;
}
.verifyCode {
  outline: none;
  border: none;
  background: #fff;
  color: #0054ff;
  width: 204px;
  font-size: 30px;
}
.concent {
  display: flex;
  border: 2px solid #ebebeb;
  justify-content: space-between;
  width: 93%;
  height: 82px;
  margin: 0 auto;
  margin-left: 24px;
  margin-top: 18px;
  
}
.reg {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.submit {
  display: block;
  width: 79%;
  height: 88px;
  background: #2b883a;
  border-radius: 40px;
  border: none;
  font-size: 30px;
  color: #fff;
  text-align: center;
  line-height: 88px;
  margin: 0 auto;
  margin-top: 20px;
  color: #fff;
}
.banner_top {
  background: url("/static/images/login/banner_login.png") no-repeat;
}
.back_ground {
  width: 100%;
}
.arrow-up {
  width: 0;
  height: 0;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  border-bottom: 25px solid #fff;
  position: relative;
  left: 72%;
}
.qwe {
  width: 92%;
  height: 74px;
  border: 1px solid #f2f2f2;
  margin: 20px;
  margin-left: 26px;
  font-size: 30px;
  line-height: 74px;
}
.qwe span {
  padding-left: 20px;
}
.yaoqingma {
  width: 92%;
  height: 82px;
  margin-left: 24px;
  border: 2px solid #ebebeb;
  border-radius: 8px;
  outline: none;
  font-size: 30px;
  margin: 20px 0 0 24px;
}
</style>