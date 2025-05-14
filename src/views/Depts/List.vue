<template>
    <div class="dept_list-container">
        <div class="dept_list-title">
            <h4>部门管理</h4>
            <FWCButton :btnValue=btnValue @button-click="handleClicked"></FWCButton>
        </div>
        <div class="dept_list-data">
            <el-table :data="deptData" style="width: 100%" @row-click="queryDept">
                <el-table-column prop="id" label="ID" width="80">
                </el-table-column>

                <el-table-column prop="name" label="部门名称">
                </el-table-column>
                <el-table-column prop="using" label="是否启用">
                    <template slot-scope="scope">
                        {{ scope.row.using | deptUsingText }}
                    </template>
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
            btnValue: '创建部门',
            deptData: [{
                id: '1',
                name: '行政部',
                using: 1,
                createDate: '2016-05-02',
                desc: '',
            }, {
                id: '2',
                name: '人力资源部',
                using: 1,
                createDate: '2016-05-02',
                desc: '',
            },
            {
                id: '3',
                name: '财务部',
                using: 1,
                createDate: '2016-05-02',
                desc: '',
            },
            {
                id: '4',
                name: '销售部',
                using: 1,
                createDate: '2016-05-02',
                desc: '',
            },
            {
                id: '5',
                name: '研发部',
                using: 1,
                createDate: '2016-05-02',
                desc: '',
            },
            {
                id: '6',
                name: '客服部',
                using: 1,
                createDate: '2016-05-02',
                desc: '',
            }]
        }
    },
    methods: {
        handleClicked() {
            this.$router.push({ name: 'DeptsAdd' })
        },
        queryDept(row) {
            this.$router.push({
                name: 'DeptsInfo',
                params: { id: row.id }
            })
        }
    }
}
</script>

<style scoped lang="scss">
.dept_list-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.dept_list-data {
    margin-top: 50px;
}

::v-deep .el-table__row {
    cursor: pointer;
}
</style>