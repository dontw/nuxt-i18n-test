<template>
  <div class="page">
    <div class="wrap">
      <Card :bordered="false" class="login-card">
        <h3 slot="title">{{$t('test')}}</h3>
        <Input/>
      </Card>
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {}
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

.page {
    height: 100vh;
    width: 100%;
    background: #f5f7f9;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.login-card {
    width: 100%;
    height: 100%;
}
</style>
