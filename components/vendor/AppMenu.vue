<template>
    <Menu class="menu" :active-name="currRoute" :open-names="['users', 'orders', 'applications', 'products']" theme="dark" width="auto">
        <!-- MENU TITLE -->
        <div class="menu-title">
            <h2 @click="routerPush('/vendor')">DALI CITY</h2>
        </div>
        <!-- SUBMENU:USERS -->
        <Submenu name="users">
            <template slot="title">
                <Icon type="person"></Icon>
                {{$t('vendor.accountManagement')}}
            </template>
            <!-- MENU ITEMS -->
            <i-menuItem name="groupManagement" @click.native="routerPush('/vendor/groupManagement')">
                <span>{{$t('vendor.groupManagement')}}</span>
            </i-menuItem>
            <i-menuItem name="userManagement" @click.native="routerPush('/vendor/userManagement')">
                <span>{{$t('vendor.userManagement')}}</span>
            </i-menuItem>
        </Submenu>
    </Menu>
</template>
<script>
import { MenuItem } from 'iview'
import currRoute from '~/mixins/currRoute'
import routerPush from '~/mixins/routerPush'
export default {
    components: {
        'i-menuItem': MenuItem
    },
    mixins: [currRoute, routerPush]
}
</script>
<style lang="less" scoped>
.menu {
    height: 100vh;
    overflow: auto;
}
.menu-title {
    color: #fff;
    padding: 0.8rem 0.8rem 0.2rem 0.8rem;
    height: 50px;
    cursor: pointer;
    h2 {
        font-weight: normal;
    }
}
</style>
