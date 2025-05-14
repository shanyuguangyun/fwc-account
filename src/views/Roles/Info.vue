<template>
    <div class="role_info-container">
        <div class="role_info-title">
            <h4>角色详情</h4>
            <FWCButton :btnValue=btnValue @button-click="handleClicked"></FWCButton>
        </div>
        <div class="role_info-data">
            <el-descriptions class="margin-top" :column="1" :size="size" border>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-user"></i>
                        ID
                    </template>
                    {{ roleData.id }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-user"></i>
                        角色名称
                    </template>
                    {{ roleData.name }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-office-building"></i>
                        创建时间
                    </template>
                    {{ roleData.createDate }}
                </el-descriptions-item>
                <el-descriptions-item :span="24">
                    <template slot="label">
                        <i class="el-icon-office-building"></i>
                        备注
                    </template>
                    {{ roleData.desc }}
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
            roleData: {
                id: '1',
                using: 1,
                name: '林说',
                createDate: '2024-02-23',
                desc: '负责人：林'
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
.role_info-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.role_info-data {
    margin-top: 50px;
}
</style>