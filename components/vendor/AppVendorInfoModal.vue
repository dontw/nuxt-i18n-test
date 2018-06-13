<template>
    <Modal :value="modalStatus" :mask-closable="false" :closable="false" :styles="{top: '90px'}">
        <!-- MODAL HEADER -->
        <div slot="header">
            <Row :style="{padding:'15px'}" :gutter="16">
                <!-- HEADICON -->
                <i-col span="6">
                    <Avatar class="headicon" :class="{'bigger':imgBiggerStatus}" :src="userData.headimgurl" @click.native="toggleImgBigger" />
                </i-col>
                <!-- QRCODE -->
                <i-col span="6">
                    <div :style="{position:'relative'}">
                        <qriously class="qrcode" :class="{'qrbigger':qrcodeBiggerStatus}" :value="userData.qrcode || 'no qr code!'" :size="100" @click.native="toggleQrcodeBigger" />
                        <a class="qrcode-link" @click="downloadQrcode">
                            <Icon type="arrow-down-a"></Icon>下载QRCODE
                        </a>
                    </div>
                </i-col>
                <!-- PRIMARY USER INFO -->
                <i-col span="12">
                    <div class="user-info-wrap">
                        <div class="nick-name-wrap">
                            <span class="nick-name">{{userData.nickname}}</span>
                            <Icon v-if="userData.gender===0" class="gender-icon" type="female" color="pink"></Icon>
                            <Icon v-if="userData.gender===1" class="gender-icon" type="male" color="blue"></Icon>
                        </div>
                        <div>
                            <span>ID：</span>
                            <span>{{userData.userid}}</span>
                        </div>
                        <div>
                            <span>手机：</span>
                            <span>{{userData.phone}}</span>
                        </div>
                        <div>
                            <span>身份：</span>
                            <span>{{userData.role | roleToLetter}}</span>
                        </div>
                        <div>
                            <span>公司：</span>
                            <span v-for="(name,index) in userData.companies" :key="index">{{name}} </span>
                        </div>
                    </div>
                </i-col>
            </Row>
        </div>
        <!-- MODAL CONTENT -->
        <div class="modal-content">
            <Tabs value="account" :animated="false">
                <!-- ACCOUTN INFO TAB -->
                <TabPane icon="information-circled" label="账户信息" name="account">
                    <div class="tab-content">
                        <div class="user-data-wrap">
                            <span class="user-data-title">微信绑定：</span>
                            <span>{{userData.wechatstatus|bindToLetter}}</span>
                        </div>
                        <div class="user-data-wrap">
                            <span class="user-data-title">QQ绑定：</span>
                            <span>{{userData.qqstatus|bindToLetter}}</span>
                        </div>
                        <div class="user-data-wrap">
                            <span class="user-data-title">注册时间：</span>
                            <span>{{userData.createdate}}</span>
                        </div>
                        <div class="user-data-wrap">
                            <span class="user-data-title">最近登录时间：</span>
                            <span>{{userData.logindate}}</span>
                        </div>
                    </div>
                </TabPane>
                <!-- USER INFO TAB -->
                <TabPane icon="person" label="个人信息" name="user">
                    <div class="tab-content">
                        <div class="user-data-wrap">
                            <span class="user-data-title">姓名：</span>
                            <span>{{userData.name}}</span>
                        </div>
                        <div class="user-data-wrap">
                            <span class="user-data-title">性别：</span>
                            <span>{{userData.gender | genderToLetter}}</span>
                        </div>
                        <div class="user-data-wrap">
                            <span class="user-data-title">邮政编码：</span>
                            <span>{{userData.postalcode}}</span>
                        </div>
                        <div class="user-data-wrap">
                            <span class="user-data-title">所在地区：</span>
                            <span>{{userData.area}}</span>
                        </div>
                        <div class="user-data-wrap">
                            <span class="user-data-title">详细地址：</span>
                            <span>{{userData.address}}</span>
                        </div>
                    </div>
                </TabPane>
                <!-- VENDOR INFO　TAB -->
                <TabPane icon="briefcase" label="厂商信息" name="vendor">
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
                </TabPane>
            </Tabs>
        </div>
        <!-- MODAL FOOTER -->
        <div slot="footer">
            <Button type="primary" size="large" @click.native="closeModal" long>关闭</Button>
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
    data() {
        return {
            imgBiggerStatus: false,
            qrcodeBiggerStatus: false
        }
    },
    computed: {
        //弹窗开关状态
        modalStatus() {
            return true
        }
    },
    methods: {
        toggleImgBigger() {
            this.imgBiggerStatus = !this.imgBiggerStatus
            this.qrcodeBiggerStatus = false
        },
        toggleQrcodeBigger() {
            this.qrcodeBiggerStatus = !this.qrcodeBiggerStatus
            this.imgBiggerStatus = false
        },
        saveAsImg(base64File, fileName) {
            let link = document.querySelector('.qrcode-link')
            link.setAttribute('href', base64File)
            link.setAttribute('download', fileName)
        },
        downloadQrcode() {
            let canvas = document.getElementsByTagName('canvas')[0]
            let dataUrl = canvas.toDataURL() //转为base64
            this.saveAsImg(dataUrl, 'qrcode')
        },
        closeModal() {
            console.log('close!')
        },

        clickImg(e){
            if(e.target.src){
                let win = window.open(e.target.src, '_blank');
                win.focus()
            }
        }
    }
}
</script>
<style lang="less" scoped>
.modal-content {
    min-height: 180px;
}
.user-info-wrap {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 105px;
}
.nick-name {
    font-size: 1.1rem;
    margin-right: 5px;
}
.gender-icon {
    font-size: 1rem;
}
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
.headicon {
    transition: 0.3s;
    height: 100px;
    width: 100px;
    border-radius: 50%;
    border: 1px solid #ccc;
    position: relative;
}
.headicon:hover {
    cursor: pointer;
    &:before {
        content: '点击放大';
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -40%);
        color: white;
        font-size: 0.9rem;
        text-shadow: 1px 1px 2px black;
        z-index: 2;
    }
}
.bigger {
    transform-origin: -38% -18%;
    transform: scale(3);
    z-index: 2;
    border: none;
    border-radius: 0;
    &:hover {
        text-align: center;
        &:before {
            content: '点击缩小';
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -40%);
            color: white;
            font-size: 0.05rem;
            text-shadow: 1px 1px 2px black;
        }
    }
}
.qrcode {
    position: relative;
    transition: 0.3s;
    border: 1px solid #ccc;
    cursor: pointer;
    z-index: 1;
    &:hover {
        &:before {
            content: '点击放大';
            display: inline-block;
            position: absolute;
            width: 60px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -40%);
            color: white;
            background: black;
            font-size: 0.9rem;
            text-shadow: 1px 1px 2px black;
            z-index: 2;
        }
    }
}
.qrbigger {
    transform-origin: 20% -18%;
    transform: scale(3);
    border: 0;
    border-radius: 0;
    &:hover {
        &:before {
            content: '点击缩小';
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -40%);
            color: white;
            font-size: 0.05rem;
            text-shadow: 1px 1px 2px black;
            text-align: center;
        }
    }
}
.qrcode-link {
    position: absolute;
    bottom: -20px;
    left: 6px;
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
            // :before {
            //     cursor: pointer;
            //     content: '点击看原图';
            //     display: block;
            //     position: absolute;
            //     top: 50%;
            //     left: 50%;
            //     transform: translate(-50%, -40%);
            //     color: white;
            //     font-size: 1rem;
            //     text-shadow: 1px 1px 2px black;
            // }
        }
    }
}
</style>
