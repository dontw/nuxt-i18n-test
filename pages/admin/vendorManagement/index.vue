<template>
    <div>
        <!-- SEARCH -->
        <Card class="card-filter" dis-hover>
            <Row :gutter="16">
                <p style="margin-left:11px; margin-bottom:5px;">条件搜索</p>
                <i-col span="5">
                    <Select size="large" v-model="firmStatus" placeholder="审核状态" clearable>
                        <Option :value="1" :key="1">审核成功</Option>
                        <Option :value="2" :key="2">审核失败</Option>
                        <Option :value="3" :key="3">审核中</Option>
                    </Select>
                </i-col>
                <i-col span="5">
                    <i-input size="large" placeholder="用户ID" clearable></i-input>
                </i-col>
                <i-col span="5">
                    <i-input size="large" placeholder="邮箱" clearable></i-input>
                </i-col>
                <i-col span="5">
                    <i-input size="large" placeholder="手机" clearable></i-input>
                </i-col>
                <i-col span="2">
                    <Button size="large" icon="refresh" long>
                        回复
                    </Button>
                </i-col>
                <i-col span="2">
                    <Button size="large" type="primary" icon="ios-search" long>
                        搜寻
                    </Button>
                </i-col>
            </Row>
        </Card>
        <!-- TABLE -->
        <Table border :columns="userCol"></Table>
        <!-- PAGE -->
        <Page style="margin-top:15px" @on-change="changePage" :total="100" :page-size="15" show-elevator show-total></Page>
        <!-- MODAL -->
        <VendorInfoModal/>
    </div>
</template>
<script>
import VendorInfoModal from '~/components/vendor/AppvendorInfoModal'
export default {
    layout: 'adminPanel',
    components: {VendorInfoModal},
    data() {
        return {
            firmStatus:null,
            userCol: [
                {
                    type: '序号',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '用户ID',
                    key: 'userid',
                    align: 'center'
                },
                {
                    title: '邮箱',
                    key: 'email',
                    align: 'center'
                },
                {
                    title: '昵称',
                    key: 'nickname',
                    align: 'center'
                },
                {
                    title: '姓名',
                    key: 'name',
                    align: 'center'
                },
                {
                    title:'审核状态',
                    key: 'firmStatus'
                }
            ]
        }
    },

    methods:{
        changePage(){
            console.log('change')
        }
    },
}
</script>
<style lang="less" scoped>
</style>
