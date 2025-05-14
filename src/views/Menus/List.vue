<template>
    <div class="menu_list-container">
        <div class="menu_list-title">
            <h4>菜单管理</h4>
            <FWCButton :btnValue=btnValue @button-click="handleClicked"></FWCButton>
        </div>
        <div class="menu_list-data">
            <el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm" size="small">
                <el-form-item prop="name">
                    <el-col :span="5">
                        <el-input prefix-icon="el-icon-search" v-model="ruleForm.name" placeholder="请输入菜单名称"></el-input>
                    </el-col>
                    <FWCSelect style="margin-left:20px" :ops="selectOps" @option-change="handleOptionChange">
                    </FWCSelect>
                </el-form-item>
            </el-form>
            <el-table :data="menuData" style="width: 100%">
                <el-table-column prop="id" label="ID">
                </el-table-column>
                <el-table-column prop="parentMenu" label="父菜单">
                </el-table-column>
                <el-table-column prop="name" label="菜单名称">
                </el-table-column>
                <el-table-column prop="type" label="菜单类型">
                </el-table-column>
                <el-table-column prop="system" label="所属系统">
                </el-table-column>
                <el-table-column prop="createDate" label="创建日期">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import FWCButton from '../../components/FWCButton.vue'
import FWCSelect from '../../components/FWCSelect.vue'

export default {
    components: {
        FWCButton,
        FWCSelect
    },
    data() {
        return {
            btnValue: '创建用户',
            ruleForm: [{

            }],
            selectOps: [{
                value: '1',
                title: '权限管理系统'
            },
            {
                value: '1',
                title: '人事管理系统'
            }],
            menuData: [{
                id: '1',
                name: '信息部管理员',
                createDate: '2025-04-02',
            }, {
                id: '2',
                name: '信息部人员',
                createDate: '2025-04-02',
            },
            {
                id: '3',
                name: '财务部管理员',
                createDate: '2025-04-02',
            },
            {
                id: '4',
                name: '财务部人员',
                createDate: '2025-04-02',
            },
            {
                id: '5',
                name: '行政部管理员',
                createDate: '2025-04-02',
            }]
        }
    },
    methods: {
        handleClicked() {
            this.$router.push({ name: 'MenusAdd' })
        }
    }
}
</script>

<style scoped lang="scss">
.menu_list-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.menu_list-data {
    margin-top: 50px;
}

::v-deep .el-table__row {
    cursor: pointer;
}
</style>