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
        <Table border :columns="userCol" :data="currListData"></Table>
        <!-- PAGE -->
        <Page style="margin-top:15px" @on-change="changePage" :total="100" :page-size="15" show-elevator show-total></Page>
        <!-- MODAL -->
        <!-- <VendorInfoModal/> -->
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
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '用户ID',
                    key: 'userid',
                    align: 'center'
                },
                {
                    title: '注册邮箱',
                    key: 'email',
                    align: 'center'
                },
                {
                    title: '注册手机号',
                    key: 'phone',
                    align: 'center'
                },
                {
                    title: '昵称',
                    key: 'nickname',
                    width: 80,
                    align: 'center'
                },
                {
                    title: '姓名',
                    key: 'name',
                    width: 80,
                    align: 'center'
                },
                {
                    title:'审核状态',
                    key: 'firmStatus',
                    align: 'center'
                },
                 {
                    title:'企业名称',
                    key: 'companyName',
                    align: 'center'
                },
                {
                    title:'审核',
                    key: 'firmStatus',
                     width: 80,
                    align: 'center'
                },
                 {
                    title:'操作',
                    key: 'statusid',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            //详情按钮
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                        marginRight: '5px'
                                },
                                on:{
                                    click: e => {
                                        console.log('详情!')
                                    }
                                }
                            },'详情'),
                            //停权按钮
                             h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on:{
                                    click: e => {
                                        console.log('停权!')
                                    }
                                }
                            },'取消停权')
                        ])
                    }
                },
            ],

            rawListData:[{
                userid:123,
                name:'woo hoo hoo',
                nickname:'doge',
                phone: '12345678912',
                email: 'doge@mail.com',
                statusid: 0, //启用/停用使用者 0: verify 1: active 2: suspend
                firm:{
                    status: 1//1: 审核成功 2: 审核失败 3: 审核中
                },
                companies:{
                    name: 'Leedian Internatinal Corps'
                }
            }],

            // currListData:[{
            //     userid:123,
            //     name:'woo hoo hoo',
            //     nickname:'doge',
            //     phone: '12345678912',
            //     email: 'doge@mail.com',
            //     statusid: 0, //启用/停用使用者 0: verify 1: active 2: suspend
            //     firmStatus: 1,
            //     companies:{
            //         name: 'Leedian Internatinal Corps'
            //     }
            // }]
        }
    },

    methods:{
        changePage(){
            console.log(this.currListData)
        }
    },

    computed:{
        currListData(){
            return this.rawListData.map(item => {
                item.firmStatus = item.firm.status
                item.companyName = item.companies.name
                return item
            })
        }
    }
}
</script>
<style lang="less" scoped>
</style>
