<template>
    <Modal :value="modalStatus" :mask-closable="false" :closable="false" :styles="{top: '30px'}">
        <div slot="header">
            <h3>审核</h3>
        </div>
        <div class="content">
            <div class="tab-content">
                <div class="user-data-wrap">
                    <span class="user-data-title">企业名称：</span>
                    <span>{{userData.firm.name}}</span>
                </div>
                <div class="user-data-wrap">
                    <span class="user-data-title">营业执照注册号：</span>
                    <span>{{userData.firm.licenseno}}</span>
                </div>
                <div class="user-data-wrap">
                    <span class="user-data-title">运营者证件姓名：</span>
                    <span>{{userData.firm.ceo}}</span>
                </div>
                <div class="user-data-wrap">
                    <span class="user-data-title">运营者证件号：</span>
                    <span>{{userData.firm.ceoid}}</span>
                </div>
                <div class="user-data-wrap">
                    <span class="user-data-title">相关图片：</span>
                </div>
                <div class="user-data-wrap">
                    <div class="images">
                        <div class="image-wrap" @click="clickImg">
                            <img :src="userData.firm.licenseimg">
                            <div>营业执照</div>
                        </div>
                        <div class="image-wrap" @click="clickImg">
                            <img :src="userData.firm.certificateimg">
                            <div>组织机构代码证</div>
                        </div>
                        <div class="image-wrap" @click="clickImg">
                            <img :src="userData.firm.idfrontimg">
                            <div>证件(正面)</div>
                        </div>
                        <div class="image-wrap" @click="clickImg">
                            <img :src="userData.firm.idbackimg">
                            <div>证件(背面)</div>
                        </div>
                    </div>

                </div>
                <div class="user-data-wrap">
                    <span class="user-data-title">审核情况：</span>
                    <span>{{userData.firm.status | firmStatus}}</span>
                </div>
            </div>
        </div>
        <div slot="footer">
            <Button size="large" @click.native="closeModal">取消</Button>
            <Button type="primary" size="large" @click.native="closeModal">送出</Button>
        </div>
    </Modal>
</template>
<script>
import userAllFilters from '~/mixins/vendorFilters'
export default {
    props: {
        //接收资料格式
        userData: {
            type: Object,
            default: () => ({
                nickname:'我是预设昵称',
                phone: '12345678912',
                userid:'111111111111',
                role:2,
                companies:['default com1','default com2'],
                qqstatus:true,
                wechatstatus:false,
                createdate: '1989/06/04',
                logindate: '2018/00/00',
                name: '多吉',
                gender: 1,
                postalcode:'12345',
                area:'预设市预设区预设区',
                address: '预设地址',
                firm:{
                    name: '预设公司名',
                    licenseno: '预设营业证照注册号',
                    ceo: '预设运营者证件姓名',
                    ceoid: '预设运营者证件号',
                    licenseimg: 'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/12224412/Shiba-Inu-On-White-01.jpg',
                    certificateimg:'http://cdn.shibe.online/shibes/73d09d7ac7ed35507ab4a7ef12c1cd8dcff64ac2.jpg',
                    idfrontimg:'http://cdn.shibe.online/shibes/9765ec732a4c7cbfcb60fe8a4a4083eb164499e7.jpg',
                    idbackimg:'http://cdn.shibe.online/shibes/6ecb1a2e05d7c825b5fd7eff7f73cbd1f1f055cb.jpg',
                    status:1,
                }


            })
        }
    },
    mixins: [userAllFilters],
    methods:{
        clickImg(e){
             if(e.target.src){
                let win = window.open(e.target.src, '_blank');
                win.focus()
            }
        },

        closeModal(){
            this.$store.commit('vendor/setComInfoStatus', false)
        }
    },
     computed: {
        //弹窗开关状态
        modalStatus() {
            return this.$store.state.vendor.comInfoStatus
        }
    },
}
</script>
<style lang="less" scoped>
.user-data-wrap {
    margin-bottom: 5px;
    font-size: 0.9rem;
}
.address-wrap {
    margin-left: 15px;
}
.user-data-title {
    font-weight: bold;
}
.images {
    display: flex;
    flex-wrap: wrap;
    .image-wrap {
        padding: 15px;
        width: 50%;
        position: relative;
        img {
            width: 100%;
            height: 150px;
            border: 1px solid #ccc;
            cursor: pointer;
            display: block;
        }
        div {
            text-align: center;
        }
        &:hover {
            img {
                border: 1px solid red;
            }
        }
    }
}
</style>

