<template>
    <div class="role_list-container">
        <div class="role_list-title">
            <h4>角色管理</h4>
            <FWCButton :btnValue=btnValue @button-click="handleClicked"></FWCButton>
        </div>
        <div class="role_list-data">
            <el-table :data="roleData" style="width: 100%" @row-click="queryRole">
                <el-table-column prop="id" label="ID">
                </el-table-column>
                <el-table-column prop="name" label="角色名称">
                </el-table-column>
                <el-table-column prop="createDate" label="创建日期">
                </el-table-column>
                <el-table-column prop="desc" label="备注">
                </el-table-column>
            </el-table>
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
            btnValue: '创建角色',
            roleData: [{
                id: '1',
                name: '信息部管理员',
                createDate: '2025-04-02',
                desc: ''
            }, {
                id: '2',
                name: '信息部人员',
                createDate: '2025-04-02',
                desc: ''
            },
            {
                id: '3',
                name: '财务部管理员',
                createDate: '2025-04-02',
                desc: ''
            },
            {
                id: '4',
                name: '财务部人员',
                createDate: '2025-04-02',
                desc: ''
            },
            {
                id: '5',
                name: '行政部管理员',
                createDate: '2025-04-02',
                desc: ''
            }]
        }
    },
    methods: {
        handleClicked() {
            this.$router.push({ name: 'RolesAdd' })
        },
        queryRole(row) {
            this.$router.push({
                name: 'RolesInfo',
                params: { id: row.id }
            })
        }
    }
}
</script>

<style scoped lang="scss">
.role_list-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.role_list-data {
    margin-top: 50px;
}

::v-deep .el-table__row {
    cursor: pointer;
}
</style>