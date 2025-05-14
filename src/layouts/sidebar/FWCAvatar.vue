<template>
    <div class="sidebar-avatar-wrapper">
        <div class="sidebar-avatar-inner" @click="showUserMenu = !showUserMenu">
            <div class="sidebar-avatar">

            </div>
            <div class="sidebar-userinfo">
                <div class="sidebar-username">
                    feng wen
                </div>
                <div class="sidebar-userdetail">
                    jiuhuar@gmail.com
                </div>
            </div>
            <div class="sidebar-avatar-action">
                <UserActionIcon />
            </div>
        </div>
        <div class="sidebar-user-menu" v-show="showUserMenu">
            <div class="sidebar-user-account">
                <AccountInfoIcon />
                <span>我的账户</span>
            </div>
            <div class="sidebar-system-notice">
                <SystemNoticeIcon />
                <span>系统通知</span>
            </div>
            <div class="sidebar-logout">
                <LogoutIcon />
                <span>退出登录</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.sidebar-avatar-wrapper {
    border-top: 1px solid rgb(228, 220, 208);
    font-weight: bold;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    position: relative;
    letter-spacing: 0.1px;
}

.sidebar-avatar-inner {
    width: 100%;
    display: flex;
    box-sizing: border-box;
    padding: 5px;
    align-items: center;
    cursor: default;
    justify-content: space-around;
    border-radius: 8px;
}

.sidebar-avatar-inner:hover {
    background-color: rgb(228, 228, 224);

}

.sidebar-avatar {
    width: 36px;
    height: 36px;
    background-color: rgb(86, 78, 67);
    border-radius: 8px;
}

.sidebar-userdetail {
    font-size: 10px;
    color: rgb(158, 158, 158);
}

.sidebar-avatar-action {
    margin-left: 15px;
}

.sidebar-user-menu {
    font-weight: 500;
    position: absolute;
    top: -150px;
    left: 10px;
    width: 100%;
    height: 140px;
    background-color: #ffffff;
    border: 1px solid rgb(228, 220, 208);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    box-sizing: border-box;
    padding: 5px 10px;
    border-radius: 10px;
}

.sidebar-user-menu div {
    font-size: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 10px;
    height: 30px;
}

.sidebar-user-menu div:hover {
    background-color: rgb(228, 228, 224);
    border-radius: 8px;
}

.sidebar-user-menu span {
    margin-left: 5px;
}

.sidebar-user-menu div:last-child {
    border-top: 1px solid rgb(228, 220, 208);
}
</style>

<script>
import AccountInfoIcon from '../../icons/AccountInfoIcon.vue';
import LogoutIcon from '../../icons/LogoutIcon.vue';
import SystemNoticeIcon from '../../icons/SystemNoticeIcon.vue';
import UserActionIcon from '../../icons/UserActionIcon.vue';

export default {
    components: {
        AccountInfoIcon,
        LogoutIcon,
        SystemNoticeIcon,
        UserActionIcon
    },
    data() {
        return {
            showUserMenu: false
        }
    }
}
</script>