<template>
  <div class="addAddress">
    <TopHeader custom-title="收货地址" custom-fixed>
      <i slot="backBtn" class="iconfont icon-fanhui"></i>
    </TopHeader>

        <div class="content">
            <div class="address-info">
                <div class="form-group">
                    <div class="label">收货人</div>
                    <div class="input-group">
                        <input type="text"  v-model="consignee">
                    </div>
                </div>
                <div class="form-group">
                    <div class="label">手机号码</div>
                    <div class="input-group">
                        <input type="number" v-model="mobile">
                    </div>
                </div>
                 <div class="form-group">
                        <div class="label">收货地址 </div>
                            <div class="input-group">
                                
                                <van-button type="primary" @click="showPopup">{{this.addressSelected?this.addressSelected:'请选择省\\市\\区'}}</van-button>
                                <!-- districtcode -->
                                <van-popup v-model="show" position="bottom" :style="{ height: '50%' }" >
                                    <van-area :area-list="areaList" :columns-num="3" @confirm="onAddrConfirm" @cancel="onAddrCancel" value="110105"/>
                                </van-popup>
                            </div>
                        <div class="right-arrow"></div>
                    </div>
                  <div class="details-address">
                    <div class="label">详细地址</div>
                    <div class="textarea"  ref="detailAddress" contenteditable="true" placeholder ="详细地址，例D座726">{{address}}</div>
                </div>
            </div>
            <div class="set-default">
                <div class="label">设置默认地址</div>
                <van-switch
                    active-color="#2b883a"
                    v-model="checked"
                    size="24px"
                    @change="onCheack"
                />
            </div>

            <!-- 保存按钮 -->
            <div class="saveBtn" @click="onSave()">保存</div>
            
        </div>
        <!-- <div class="form-group">
          <div class="label">收货地址</div>
          <div class="input-group">
            <van-button
              type="primary"
              @click="showPopup"
            >{{this.addressSelected?this.addressSelected:'请选择省\\市\\区'}}</van-button>
            <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
              <van-area
                :area-list="areaList"
                :columns-num="3"
                @confirm="onAddrConfirm"
                @cancel="onAddrCancel"
              />
            </van-popup>
          </div>
          <div class="right-arrow"></div>
        </div>
        <div class="details-address">
          <div class="label">详细地址</div>
          <div
            class="textarea"
            ref="detailAddress"
            contenteditable="true"
            placeholder="详细地址，例D座726"
          >{{address}}</div>
        </div>
      </div>
      <div class="set-default">
        <div class="label">设置默认地址</div>
        <van-switch v-model="checked" size="24px" @change="onCheack" />
      </div>

      
      <div class="saveBtn" @click="onSave()">保存</div>
    </div> -->
  </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeader";
import { Popup, Area } from "vant";
export default {
  name: "EditAddress",
  components: {
    TopHeader
  },
  data() {
    return {
      addressSelected: "",
      areaList: {}, // 选择地区上拉列表
      show: false,
      checked: false,
      address_id: 0,
      consignee: "",
      district: "",
      address: "",
      mobile: "",
      r_code:"",
      is_default: 0,
      code: "",
      detailAddress: "", // 详细地址
      location: {}, // 请选择地址
     districtcode:''
    };
  },
  created() {
    this.codes();
  },
  mounted() {
    //   获取addres_id
        var atts  =this.$route.query.address_id
        console.log("---------")
        console.log(atts)
        var atts2 = atts.split("q")
        // console.log(atts.split("q"),"qie")
    this.address_id = (atts2[0])*1
    console.log(this.address_id,"addd_id")
    this.getOne(); //请求数据
    // this.qu();
  },
  methods: {
    onSave() {
      var _that = this;
      _that.detailAddress = _that.$refs.detailAddress.innerText;
      var url = "address/addAddress";
      if (!_that._verifyUserInfo()) {
        return;
      }
        console.log(_that.district,"frgfgff")//点击后拿到的district
      console.log(this.r_code,"r_code")//编辑地址时后台返回的district

      if(_that.district){
          console.log("new")
          _that.district
      }else{
          console.log("jiu")
          _that.district = this.r_code
          
      }
    //   _that.district = "110101";


      _that.$axios
        .post(url, {
          // 传给后台的参数
          token: this.$store.getters.optuser.Authorization,
          address_id: _that.address_id,
          consignee: _that.consignee,
          mobile: _that.mobile,
          is_default: _that.is_default,
          address: _that.detailAddress,
          district:_that.districtcode

        })
        .then(res => {
          _that.$toast("修改成功");
          setTimeout(() => {
            // _that.$router.push("/user/Address");
            _that.$router.go(-1);
          }, 1000);
        })
        .catch(error => {
          alert("请求错误:" + error);
        });
    },
    _verifyUserInfo() {
      var _that = this;
      var detailAddress = _that.$refs.detailAddress.innerText;
      console.log(detailAddress,'123')
      if (_that.userName === "") {
        _that.$toast("请输入收货人姓名");
        return false;
      }
      if (_that.userMobile === "") {
        _that.$toast("请输入电话号码");
        return false;
      }
      if (!/^1[3456789]\d{9}$/.test(_that.mobile)) {
        _that.$toast("手机格式有误");
        return false;
      }
    //   if (_that.district == "") {
    //     _that.$toast("请选择省市区");
    //     return false;
    //   }
      if (_that.detailAddress == "") {
        _that.$toast("请输入详情地址");
        return false;
      }
      return true;
    },
    codes() {
      var url = "user/get_address";
      var params = new URLSearchParams();
      params.append("token", this.$store.getters.optuser.Authorization); //要传给后台的参数值 key/value //token
      this.$axios({
        method: "post",
        url: url,
        data: params
      }).then(res => {
        console.log(res, "res");
        if (res.data.status === 200) {
          this.areaList = res.data.data;
        //   console.log(this.areaList, "请求数据");
        //   console.log(this.areaList.county_list);
          var quhao = this.areaList.county_list;
          var url = decodeURI(location.href);
          console.log(url, "url");
          var arr = url.split("D");
          console.log(arr[1], "市区");
          this.addressSelected  = arr[1]
          console.log(this.addressSelected)
        //   console.log(this.areaList, "ceshi");
        //   console.log(quhao[0],"changdu")
            
        //   for (var key in quhao) {

        //     // console.log(key,"key"); //a b c d           
        // if(quhao[key]==arr[1]){
        //     console.log(key,"key")

        // }
            // console.log(quhao[key]); // aa bb cc dd
        //   }
        }
      });
    },
    // 省市区上拉
    showPopup() {
      this.show = true;
    },
    // 地区确定选择
    onAddrConfirm(val) {
      this.show = false;
      this.addressSelected = val[0].name + val[1].name + val[2].name;
      this.districtcode = val[2].code;
      console.log(this.addressSelected, this.district, "9999");
    },
    // 地区取消选择
    onAddrCancel() {
      this.show = false;
    },
    //选择默认地址时触发
    onCheack(val) {
      if (this.is_default == 1) {
        this.is_default = 0;
      } else {
        this.is_default = 1;
      }
      console.log(val);
    },
    getOne() {
        var token  = localStorage.getItem("Authorization");
         console.log(token,"123456789")
      var _that = this;
      var url = "Address/my_address";
      _that.$axios
        .post(url, {
          // 传给后台的参数
          address_id: _that.address_id,
          token:token
        })
        .then(res => {
          console.log(res, "my_address");
          
          (_that.consignee = res.data.data.consignee),
            (_that.mobile = res.data.data.mobile),
            (_that.is_default = res.data.data.is_default),
            // _that.district=res.data.data.district,
            // _that.city=res.data.data.city,
             (_that.districtcode = res.data.data.districtcode),
            // code地址
           (_that.r_code = res.data.data.code),
           (_that.address = res.data.data.address)
            res.data.data.is_default == 1
              ? (_that.checked = true)
              : (_that.checked = false);
         


        })
        .catch(error => {
          alert("请求错误:" + error);
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
.addAddress {
  min-height: 100vh;
  background-color: #ffffff;

  .content {
    padding: 108px 24px 0;
    box-sizing: border-box;

    .address-info {
      padding: 0 28px;
      box-sizing: border-box;
      box-shadow: 1px 1px 8px #ccc;
      margin-bottom: 14px;

      .form-group {
        height: 56px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e6e6e6;
        padding-top: 22px;
        padding-bottom: 10px;

        .label {
          width: 145px;
          font-size: 24px;
          color: #151515;
          margin-right: 10px;
        }

        .input-group {
          width: 460px;
          font-size: 24px;

          .van-button--primary {
            padding: 0;
            width: 460px;
            height: 56px;
            line-height: 56px;
            text-align: left;
            background: #fff;
            color: #151515;
            border: none;
            outline: none;
          }

          input {
            width: 100%;
            height: 30px;
            border: none;
          }

          h3 {
            font-size: 24px;
            color: #151515;
            font-weight: normal;
          }

          p {
            color: #838383;
            font-size: 22px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }

        .right-arrow {
          width: 8px;
          height: 14px;
          background: url('/static/images/user/address/right-arrow.png') no-repeat;
          background-size: 100%;
          margin-left: 20px;
        }
      }

      .details-address {
        min-height: 56px;
        display: flex;
        padding-top: 22px;
        padding-bottom: 10px;

        .label {
          width: 145px;
          font-size: 24px;
          color: #151515;
          margin-right: 10px;
        }

        .textarea {
          flex: 1;
          font-size: 24px;
          color: #858585;
          min-height: 30px;
          line-height: 30px;
          max-height: 140px;
          _height: 120px;
          margin-left: auto;
          margin-right: auto;
          padding: 3px;
          outline: 0;
          padding: 2px;
          word-wrap: break-word;
          overflow-x: hidden;
          overflow-y: auto;
          _overflow-y: visible;
          -webkit-user-modify: read-write-plaintext-only; // 只是编辑text文本，只能解决webkit内核里面问题，手机端适用
          -webkit-user-select: text; // 解决IOS部分手机不支持contenteditable=true属性问题
        }

        .textarea[placeholder]:empty:before {
          content: attr(placeholder);
        }

        // 焦点时内容为空
        .textarea[placeholder]:empty:focus:before {
          content: '';
        }
      }
    }

    .set-default {
      height: 88px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 28px;
      box-sizing: border-box;
      box-shadow: 1px 1px 8px #ccc;

      .label {
        width: 145px;
        font-size: 24px;
        color: #151515;
        margin-right: 25px;
      }
    }

    .saveBtn {
      width: 92%;
      height: 88px;
      line-height: 88px;
      text-align: center;
      font-size: 36px;
      color: #ffffff;
      background-color: #2b883a;
      position: fixed;
      left: 50%;
      bottom: 120px;
      margin-left: -46%;
      border-radius: 40px;
    }
  }
}
</style>
