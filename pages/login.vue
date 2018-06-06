<template>
    <div class="page">
        <h1 class="title">DALI-PLATFORM BACKEND</h1>
        <div class="wrap">
            <Card :dis-hover="true" :shadow="true" class="login-card">
                <h3 class="card-title">{{$t('login')}}</h3>
                <form @submit.prevent="onSubmit">
                    <i-input class="input" size="large" placeholder="请输入账号">
                        <span slot="prepend">
                            <Icon class="icon" type="person" color="#CCCCCC" size="20"></Icon>
                        </span>
                    </i-input>
                    <i-input class="input" size="large" placeholder="请输入密码">
                        <span slot="prepend">
                            <Icon class="icon" type="key" color="#CCCCCC" size="20"></Icon>
                        </span>
                    </i-input>
                    <Button class="submit-btn" type="primary" size="large" html-type="submit" long>{{$t('submit')}}</Button>
                </form>
            </Card>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {}
    },

    methods: {
        onSubmit() {
            console.log('submit!')
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
