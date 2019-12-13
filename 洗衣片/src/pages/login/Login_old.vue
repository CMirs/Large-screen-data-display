<template>
<div>
    <div class="banner_top">
            <img class="back_ground" src="/static/images/login/login.png" alt="">
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
            <input class="phone" type="text" v-model="phone" placeholder="  输入手机号">
            <input class="password" type="password" v-model="password" placeholder="  输入密码">
            <p class="submit" @click="sunbit()">登录<p>
            <p class="forget" @click="forgetout()">忘记密码</p>
            <p class="edit">修改成功~</p>
        </div>
       
    </div>
    </div>
</template>
<script>
export default {
    name:'Login_old',
    data(){
        return{
            phone:'',
            password:'',
        }
    },
    methods:{
        forgetout(){
            this.$router.push({path:'/EditPassword',name:'EditPassword'})
        },
        fixed(){
            this.$router.push({path:'/Login',name:'Login'})
        },
        fixed_one(){
            this.$router.push({path:'/Register',name:"Register"})
        },
         sunbit() {
            var _that=this;
            if(! _that._verifyUserInfo()){ return }
            let url = 'user/login'
             _that.$axios.post(url,{
                phone: _that.phone,
                user_password: _that.password
            })
            .then((res)=>{
                console.log(res)
                var list=res.data;
                if(list.status==200){
                    _that.$toast({message:"登录成功,正在跳转...",duration:1000})
                    localStorage.removeItem('Authorization');
                    var tokens = list.data.token
                    _that.$store.commit('set_token',{Authorization: tokens})  //保存token
                    setTimeout(()=>{
                        _that.$router.push({path:'/Home',name:'Home'})
                    },1000)
                }else{
                    _that.$toast(list.msg)
                }
            })
            .catch((error) => {
                alert('请求错误:'+ error)
            }) 
    },
     _verifyUserInfo(){
            let mobile_reg=/^1[3456789]\d{9}$/
            let pswd_reg =/^[a-z0-9_-]{6,18}$/
            let mobile =this.phone; 
            let password =this.password; 
            if(mobile == '' || !mobile_reg.test(mobile)){
                // return this.$toast('手机号码不能为空')
                this.$toast('请填写正确的手机号码')
                return false
            }
            if(password == ''){
                this.$toast('密码不能为空')
                return false
            }
            if(!pswd_reg.test(password)){
               this.$toast('密码长度为6-18位')
                return false
            }
            return true
        },
        // 判断ios终端/android终端
        download() {
            let ua = navigator.userAgent.toLowerCase();
            let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1; //android终端
            let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);//ios终端
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                window.location = 'https://fir.im/79gj'
            } else if (/(Android)/i.test(navigator.userAgent)) {
                window.location = 'https://fir.im/mj4p'
            }

            function isWeixinBrowser() {
                return (/micromessenger/.test(ua)) ? true : false;
            }
        },
    }
}
</script>
<style scoped>
#home{
    width: 100%;
    position: absolute;
    top: 220px;
}
.top{
    display: flex;
    width: 100%;
    height: 32px;
}
.login{
    display: blcok;
    width: 50%;
    line-height: 32px;
    font-size: 32px;
    text-align: center;
    color:black;
    font-weight: 800;
    color: #fff;
}
.resiter{
    display: block;
    width: 50%;
    line-height: 32px;
    font-size: 32px;
    text-align: center;
    color:black;
    font-weight: 800;
    color: #fff;
}
.login_details{
    width: 100%;
    background: #fff;
        padding-bottom: 18px;
}
.phone{
    width: 92%;
    height: 82px;
    margin-left:24px;
    border: 2px solid #ebebeb;
    border-radius: 8px;
    outline: none;
    margin-top: 20px;
}
.password{
    margin-top: 18px;
    width: 92%;
    height: 82px;
    margin-left:24px;
    border: 2px solid #ebebeb;
    border-radius: 8px;
    outline: none;
}
.submit{
    display: block;
    width: 79%;
    height: 88px;
    margin-top: 40px;
    background:#2b883a;
    margin-left: 24px;
    border-radius: 40px;
    border: none;
        text-align: center;
    line-height: 88px;
    color: #fff;
}
.forget{
    margin-top: 28px;
    width: 96px;
    display: block;
    margin-left: 70%;
    color: #b0b0b0;
    font-size: 24px;
    border-bottom: 2px solid #b0b0b0;
}
.edit{
    font-size: 24px;
    color: #b0b0b0;
    margin-top: 110px;
    margin-left: 43%;
}
.banner_top{
    background: url("/static/images/login/banner_login.png") no-repeat;
}
.back_ground{
    width: 100%;
}
.arrow-up {
    width:0; 
    height:0; 
    border-left:25px solid transparent;
    border-right:25px solid transparent;
    border-bottom:25px solid #fff;
    position: relative;
    left: 21%;
}
</style>