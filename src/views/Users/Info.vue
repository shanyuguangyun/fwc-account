<template>
    <div class="user_info-container">
        <div class="user_info-title">
            <h4>用户详情</h4>
            <FWCButton :btnValue=btnValue @button-click="handleClicked"></FWCButton>
        </div>
        <div class="user_info-data">
            <el-descriptions class="margin-top" :column="2" :size="size" border>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-user"></i>
                        ID
                    </template>
                    {{ userData.id }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-user"></i>
                        用户名
                    </template>
                    {{ userData.name }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-user"></i>
                        性别
                    </template>
                    {{ userData.gender }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-mobile-phone"></i>
                        手机号
                    </template>
                    {{ userData.phone }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-location-outline"></i>
                        部门
                    </template>
                    {{ userData.dept }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-tickets"></i>
                        岗位
                    </template>
                    {{ userData.position }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-tickets"></i>
                        入职日期
                    </template>
                    {{ userData.entryDate }}
                </el-descriptions-item>
                <el-descriptions-item :span="24">
                    <template slot="label">
                        <i class="el-icon-office-building"></i>
                        联系地址
                    </template>
                    {{ userData.address }}
                </el-descriptions-item>
                <el-descriptions-item :span="24">
                    <template slot="label">
                        <i class="el-icon-office-building"></i>
                        备注
                    </template>
                    {{ userData.desc }}
                </el-descriptions-item>
            </el-descriptions>
        </div>
    </div>
</template>

<script>
import FWCButton from '../../components/FWCButton.vue'
export default {
    components: {
        FWCButton
    },
    data() {
        return {
            btnValue: '返回',
            userData: {
                id: '1',
                name: '林说',
                gender: '男',
                phone: '17521279986',
                dept: '信息部',
                position: '信息工程师',
                entryDate: '2020-02-12',
                address: '广州市南沙区进港大道碧桂园2栋1909',
                desc: '公司提供交通补贴，提供住宿'
            }
        }
    },
    methods: {
        handleClicked() {
            this.$router.back();
        }
    }
}
</script>

<style scoped lang="scss">
.user_info-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.user_info-data {
    margin-top: 50px;
}
</style>