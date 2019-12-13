<template>
    <div>
        <div id="home">
        <!-- 头部组件 -->
		<Data-Header custom-title="修改支付密码" custom-fixed>
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont icon-fanhui"></i>
		</Data-Header>
        <div class="login_details">
            <input class="phone" style="    margin-top: 20px;" type="text" v-model="phone" placeholder="输入手机号">
            <input class="password" type="password" v-model="password" placeholder="输入支付密码">
            <input class="password_dict" type="password" v-model="password_dict" placeholder="再次输入支付密码">
            <div class="concent">
            <input class="Verification" type="text" placeholder="输入验证码" v-model="verifyCode" autocomplete="off">
            <button class="verifyCode global-option-style" :disabled="disabled" @click="getVerifyCode()">{{verifyText}}</button>
            </div>
            </div> 
            <p class="submit" @click="sunbit()">确认</p>
        </div>
        
    </div>
</template>
<script>
import DataHeader from "@/pages/common/header/TopHeader"
import md5 from 'js-md5';
import { Dialog } from 'vant';
export default {
    name:'Ediptpaypassword',
    data(){
        return{
            verifyText:'获取验证码',
            verifyCode:'',
            phone:'',
            password:'',
            password_dict:'',
            uid:'',
            isClick:false,
            flag:false,
            disabled:false,
            type:2,
        }
    },
    methods:{
        back(){
            this.$router.back();
        },
        /**
         * 获取验证码
         */
        getVerifyCode(){
            if(this.validatePhone()){
                if(this.isClick){
                    return;
                }
                this.isClick=true
                // 发送网络请求
                var $phone = this.phone
                var $temp = 'sms_forget';
                var $md = md5($phone+$temp)
                this.$axios.post('user/sendVerifyCode',{
                    phone:this.phone,
                    temp:$temp,
                    auth:$md,
                })
                .then( (res)=>{
                    console.log(res)
                    var status = res.data.status
                    if(status === 200){
                        // 开启倒计时
                        this.countDown();
                        this.$toast(res.data.data)
                    }
                    else if(res.data.status == 999){
                        this.$toast(res.data.msg)
                        this.$store.commit('del_token'); //清除token
                        setTimeout(()=>{
                            this.$router.push('/Login')
                        },1000)
                    }
                    else{
                        this.$toast(res.data.msg)
                    }
                    this.isClick =false
                })
                .catch((error) => {
                    this.$toast('请求错误')
                    this.isClick =false
                })
            } 
        },
       
        /**
         * 校验手机号
         */
        validatePhone(){
            var phone=this.phone
            if(!phone){
                this.$toast('手机号码不能为空')
                return false;
            }else if(!/^1[23456789]\d{9}$/.test(phone)){
                this.$toast('请填写正确的手机号码')
                return false;
            }else{
                return true;
            }
        },

        /**
         * 倒计时效果
         */
        countDown(){
            var count = 60;
            var timer = setInterval( () => {
                if(count == 0){
                    clearInterval(timer);
                    this.verifyText = "重新获取";
                    this.disabled = false;
                }
                else if(count < 10){
                    count = "0" + count;
                    this.verifyText =  count + "秒后重试";
                    this.disabled = true;
                    count -- ;
                }
                else{
                    //倒计时
                    this.verifyText = count + "秒后重试";
                    this.disabled = true;
                    count -- ;
                }
            },1000);
        },

        /**
         * 修改密码
         */
         sunbit(){
            var that = this;
            var phone =this.phone
            var pasw1=this.password
            var pasw2 =this.password_dict
            var type =this.type
            if(phone == ''){
                that.$toast('手机号码不能为空')
                return false
            }else if(!/^1[3456789]\d{9}$/.test(phone)){
                that.$toast('请填写正确的手机号码')
                return false
            }else if(that.verifyCode == ''){
                that.$toast('验证码不能为空')
                return false
            }else if(pasw1 == ''){
                that.$toast('密码不能为空')
                return false
            }else if(!/^[a-z0-9_-]{6,18}$/.test(pasw1)){
                that.$toast('密码长度为6-18位')
                return false
            }else if(pasw1 != pasw2){
                that.$toast('两次密码不一致')
                return false
            }else{
                // 请求修改密码接口
                var url = "user/resetPassword"
                var params = new URLSearchParams();
                    params.append('phone', phone);       // 要传给后台的参数值
                    params.append('user_password', pasw1);
                    params.append('confirm_password', pasw2);
                    params.append('verify_code', this.verifyCode);
                    params.append('type',type)
                this.$axios({
                    method: 'post',
                    url:url,
                    data: params,
                    type:this.type
                })
                .then((res)=>{
                    console.log(res)
                    console.log(res.data.status)
                    if(res.data.status === 200){
                        that.$toast('修改成功')                
                        setTimeout(() => {
                            that.$router.go(-1);
                        }, 1000);
                    }else{
                        Dialog.alert({
                            message: res.data.msg
                        })
                    }
				})  
            }
        },

    },components:{
        DataHeader,
    }

}
</script>
<style scoped>
body{
    background: #fff;
}
#home{
    width: 100%;
    background: #fff;
}
.top{
    display: flex;
    width: 100%;
    height: 32px;
        line-height: 32px;
    padding-top: 20px;
}
.titile{
    margin: 0 auto;
    font-size: 30px;
}
.login_details{
     padding-top: 88px;
    width: 100%;
    background: #fff;
}
.phone{
    width: 92%;
    height: 82px;
    margin-left:24px;
    border: 2px solid #ebebeb;
    border-radius: 8px;
    outline: none;
    font-size: 30px;
    padding-left: 10px;
}
.password{
    margin-top: 18px;
    width: 92%;
    height: 82px;
    margin-left:24px;
    border: 2px solid #ebebeb;
    border-radius: 8px;
    outline: none;
    font-size: 30px;
    padding-left: 10px;
}
.password_dict{
     margin-top: 18px;
    width: 92%;
    height: 82px;
    margin-left:24px;
    border: 2px solid #ebebeb;
    border-radius: 8px;
    outline: none;
    font-size: 30px;
    padding-left: 10px;
}
.Verification{
    outline: none;
    border: none;
    font-size: 30px;
    padding-left: 10px;
    width: 22%;
}
.verifyCode{
    outline: none;
    border: none;
    background: #fff;
    color: #0054ff;
  width: 204px;
    margin-right: 7%;
    font-size: 30px;
}
.concent{
    display: flex;
    border: 2px solid #ebebeb;
    justify-content: space-between;
    width: 93%;
    margin: 0 auto;
     height: 82px;
      margin-left:24px;
      margin-top: 20px;
}
.submit{
     display: block;
    width: 79%;
    height: 88px;
    background: #2b883a;
    margin-left: 24px;
    border-radius: 40px;
    border: none;
    font-size: 30px;
    color: #fff;
    text-align: center;
    line-height: 88px;
    margin: 0 auto;
    margin-top: 40px;
}
.icon-fanhui{
    font-size: 40px;
}
.banner_top{
    background: url("/static/images/login/banner_login.png") no-repeat;
}
.back_ground{
    width: 100%;
}
.back{
    padding-left: 10px;
    padding-top: 10px;
}
</style>