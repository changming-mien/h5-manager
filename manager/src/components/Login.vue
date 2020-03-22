<template>
    <div class="login-vue" :style="bg">
        <div class="container">
            <p class="title">中国银行</p>
            <div class="input-c">
                <Input prefix="ios-contact" v-model="mobel" placeholder="用户名" clearable @on-blur="verifyAccount"/>
                <p class="error">{{accountError}}</p>
            </div>
            <div class="input-c">
                <Input type="password" v-model="ehrNo" prefix="md-lock" placeholder="密码" clearable @on-blur="verifyPwd"/>
                <p class="error">{{pwdError}}</p>
            </div>
            <Button :loading="isShowLoading" class="submit" type="primary" @click="submit">登陆</Button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            mobel: '',
            ehrNo: '',
            accountError: '',
            pwdError: '',
            isShowLoading: false,
            bg: {}
        }
    },
    created() {
        this.bg.backgroundImage = 'url(' + require('../assets/imgs/bg0' + new Date().getDay() + '.jpg') + ')'
    },
    watch: {
        $route: {
            handler: function(route) {
                this.redirect = route.query && route.query.redirect
            },
            immediate: true
        }
    },
    methods: {
        verifyAccount(e) {
            // if (this.account !== 'admin') {
            //     this.accountError = '账号为admin'
            // } else {
            //     this.accountError = ''
            // }
        },
        verifyPwd(e) {
            // if (this.pwd !== 'admin') {
            //     this.pwdError = '密码为admin'
            // } else {
            //     this.pwdError = ''
            // }
        },
        register() {
            console.log('注册账号')
        },
        forgetPwd() {
            console.log('忘记密码')
        },
        submit() {
			//分行账号：13013013333 3333333
			//总行账号：18811563285 0000000
			
			this.$axios.post('/login/loginCheck?mobel='+this.mobel+'&ehrNo='+this.ehrNo).then((res) => {
				if (res.data.flag){
                    console.log(1)
					var userInfo = JSON.stringify(res.data);
					console.log(res.data)
					localStorage.setItem('userImg', '../img/logo.png')
					// 登陆成功 假设这里是后台返回的 token
					localStorage.setItem('token', 'i_am_token')
					localStorage.setItem('userInfo', userInfo);
					this.isShowLoading = true
					this.$router.push({path: this.redirect || 'home'})
				} else {
					this.$alert(res.data.message, '提示', {
						confirmButtonText: '确定',
						callback: action => {
							
						}
					});
				}
				
			})
        }
    }
}
</script>

<style>
.login-vue {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
}
.login-vue .container {
    background: rgba(255, 255, 255, .5);
    width: 300px;
    text-align: center;
    border-radius: 10px;
    padding: 30px;
}
.login-vue .ivu-input {
    background-color: transparent;
    color: #fff;
    outline: #fff;
    border-color: #fff;
}
.login-vue ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color: rgba(255, 255, 255, .8);
}
.login-vue :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: rgba(255, 255, 255, .8);
}
.login-vue ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: rgba(255, 255, 255, .8);
}
.login-vue :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: rgba(255, 255, 255, .8);
}
.login-vue .title {
    font-size: 26px;
    margin-bottom: 20px;
}
.login-vue .input-c {
    margin: auto;
    width: 200px;
}
.login-vue .error {
    color: red;
    text-align: left;
    margin: 5px auto;
    font-size: 12px;
    padding-left: 30px;
    height: 20px;
}
.login-vue .submit {
    width: 200px;
}
.login-vue .account {
    margin-top: 30px;
}
.login-vue .account span {
    cursor: pointer;
}
.login-vue .ivu-icon {
    color: #eee;
}
.login-vue .ivu-icon-ios-close-circle {
    color: #777;
}
</style>


