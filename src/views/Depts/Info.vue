<template>
    <div class="dept_info-container">
        <div class="dept_info-title">
            <h4>部门详情</h4>
            <FWCButton :btnValue=btnValue @button-click="handleClicked"></FWCButton>
        </div>
        <div class="dept_info-data">
            <el-descriptions class="margin-top" :column="1" :size="size" border>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-user"></i>
                        ID
                    </template>
                    {{ deptData.id }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-user"></i>
                        部门名称
                    </template>
                    {{ deptData.name }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-office-building"></i>
                        是否启用
                    </template>
                    {{ deptData.using | deptUsingText }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-office-building"></i>
                        创建时间
                    </template>
                    {{ deptData.createDate }}
                </el-descriptions-item>
                <el-descriptions-item :span="24">
                    <template slot="label">
                        <i class="el-icon-office-building"></i>
                        备注
                    </template>
                    {{ deptData.desc }}
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
            deptData: {
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
.dept_info-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.dept_info-data {
    margin-top: 50px;
}
</style>