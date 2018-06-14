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
        <VendorInfoModal/>
        <ComInfoModal/>
    </div>
</template>
<script>
import VendorInfoModal from '~/components/vendor/AppvendorInfoModal'
import ComInfoModal from '~/components/vendor/AppComInfoModal'
export default {
    layout: 'adminPanel',
    components: {VendorInfoModal,ComInfoModal},
    data() {
        return {
            firmStatus:null,
            //列表格式
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
                    align: 'center',
                    key: 'firmStatus'
                },
                 {
                    title:'企业名称',
                    key: 'companyName',
                    align: 'center'
                },
                {
                    title:'审核',
                    key: 'firmStatus',
                    width: 100,
                    align: 'center',
                     render: (h, params) => {

                        return h('div', [
                            //审核链结
                            h('a', {
                                style: {
                                    marginRight: '5px'
                                },
                                on:{
                                    click: e=>{
                                        this.$store.commit('vendor/setComInfoStatus', true)
                                    }
                                }
                            },params.row.firmStatus)
                        ])
                    }
                },
                 {
                    title:'操作',
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
                                        this.$store.commit('vendor/setVendorInfoStatus',true)
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
                            },'停权')
                        ])
                    }
                },
            ],

            // 列表資料原始格式
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
            },{
                userid:123,
                name:'CHONG MONG',
                nickname:'HRH CMH',
                phone: '12345678912',
                email: 'doge@mail.com',
                statusid: 0, //启用/停用使用者 0: verify 1: active 2: suspend
                firm:{
                    status: 3//1: 审核成功 2: 审核失败 3: 审核中
                },
                companies:{
                    name: 'Leedian Imperial Corps'
                }
            }]
        }
    },

    methods:{
        changePage(){
            console.log('change page!')
        },
    },

    computed:{
        //列表資料處理後格式
        currListData(){
            return this.rawListData.map(item => {
                if(item.firm.status === 1){
                    item.firmStatus = '審核成功'
                }

                if(item.firm.status === 2){
                    item.firmStatus = '審核失敗'
                }

                 if(item.firm.status === 3){
                    item.firmStatus = '審核中'
                }
                item.companyName = item.companies.name
                return item
            })
        }
    }
}
</script>
<style lang="less" scoped>
</style>
