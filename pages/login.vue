<template>
    <div class="page">
        <h1 class="title">DALI-PLATFORM BACKEND</h1>
        <div class="wrap">
            <Card :dis-hover="true" :shadow="true" class="login-card">
                <h3 class="card-title">{{$t('login')}}</h3>
                <form @submit.prevent="onSubmit">
                    <i-input @keyup.native="loginTyping(user,pwd)" v-model="user" class="input" size="large" placeholder="请输入账号" :maxlength="250">
                        <span slot="prepend">
                            <Icon class="icon" type="person" color="#CCCCCC" size="20"></Icon>
                        </span>
                    </i-input>
                    <i-input @keyup.native="loginTyping(user,pwd)" v-model="pwd" type="password" class="input" size="large" placeholder="请输入密码" :maxlength="10">
                        <span slot="prepend">
                            <Icon class="icon" type="key" color="#CCCCCC" size="20"></Icon>
                        </span>
                    </i-input>
                    <Button class="submit-btn" type="primary" size="large" html-type="submit" :disabled="disableStatus" long>{{$t('submit')}}</Button>
                </form>
            </Card>
        </div>
    </div>
</template>
<script>
import packageJson from '~/package.json'
import md5 from 'md5'
import errCodeMsg from '../mixins/errCodeMsg'
export default {
    mounted() {
        this.$store.dispatch('auth/logout')
        // remind current version
        console.log(
            `%c Dali-Platform Backend %c Detected Version v${
                packageJson.version
            } %c`,
            'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
            'background:#2d8cf0 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
            'background:transparent'
        )
    },
    mixins: [errCodeMsg],
    data() {
        return {
            user: null,
            pwd: null,
            disableStatus: false
        }
    },

    methods: {
        //送出登录资料
        onSubmit() {
            if (this.userPwdValidate(this.pwd)) {
                this.$store
                    .dispatch('auth/authUser', {
                        user: this.user,
                        pwd: md5(this.pwd)
                    })
                    .then(result => {
                        //收到错误码跳错
                        if (result.status > 299) {
                            this.$Message.error(this.errCodeMsg(result.code))
                        } else {
                            //没收到错误依照角色代号码跳页
                            if (result.roleid === 0) {
                                this.$router.push('/admin')
                            } else if (result.roleid === 2) {
                                this.$router.push('/vendor')
                            } else {
                                this.$Message.error('无后台权限')
                            }
                        }
                    })
            }
        },

        //侦测是否所有输入格均被输入内容，若都有输入内容，改变登录鈕状态
        loginTyping(user, pwd) {
            user && pwd
                ? (this.disableStatus = false)
                : (this.disableStatus = true)
        },

        //密码格式验证
        userPwdValidate(pwd) {
            let re = /^[a-zA-Z0-9]{6,10}$/
            if (!re.test(pwd)) {
                this.$Message.error('密码输入错误')
                return false
            }
            return true
        }
    }
}
</script>
<style lang="less" scoped>
.wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 400px;
}

.title {
    font-size: 5em;
    text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9,
        0 5px 0 #aaa, 0 6px 1px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1),
        0 1px 3px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2),
        0 5px 10px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2),
        0 20px 20px rgba(0, 0, 0, 0.15);
}

.page {
    height: 100vh;
    width: 100%;
    background: #f5f7f9;
    display: flex;
    align-items: center;
    flex-direction: column;
}

.login-card {
    width: 100%;
    height: 100%;
    text-align: center;
    padding: 15px;
}

.card-title,
.input {
    margin-bottom: 15px;
}

.icon {
    width: 25px;
}

.submit-btn {
    margin-top: 150px;
}
</style>
