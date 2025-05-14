<template>
    <div class="user_list-container">
        <div class="user_list-title">
            <h4>用户管理</h4>
            <FWCButton :btnValue=btnValue @button-click="handleClicked"></FWCButton>
        </div>
        <div class="user_list-data">
            <el-table :data="userEntryData" style="width: 100%">
                <el-table-column prop="date" label="日期" width="180">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="100">
                </el-table-column>
                <el-table-column prop="gender" label="性别" width="100">
                    <template slot-scope="scope">
                        {{ scope.row.gender | genderText }}
                    </template>
                </el-table-column>
                <el-table-column prop="phone" label="手机" width="150">
                </el-table-column>
                <el-table-column prop="dept" label="部门" width="100">
                </el-table-column>
                <el-table-column prop="position" label="岗位" width="100">
                </el-table-column>
                <el-table-column prop="address" label="住址">
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
            btnValue: '创建用户',
            userEntryData: [{
                date: '2016-05-02',
                name: '王小虎',
                gender: 1,
                phone: '17521279833',
                dept: '研发部',
                position: '后端研发',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-02',
                name: '王小虎',
                gender: 0,
                phone: '17521279833',
                dept: '研发部',
                position: '后端研发',
                address: '上海市普陀区金沙江路 1518 弄'
            },
            {
                date: '2016-05-02',
                name: '王小虎',
                gender: 1,
                phone: '17521279833',
                dept: '研发部',
                position: '后端研发',
                address: '上海市普陀区金沙江路 1518 弄'
            },
            {
                date: '2016-05-02',
                name: '王小虎',
                gender: 0,
                phone: '17521279833',
                dept: '研发部',
                position: '后端研发',
                address: '上海市普陀区金沙江路 1518 弄'
            }]
        }
    },
    methods: {
        handleClicked() {
            this.$router.push({name: 'UsersAdd'})
        }
    }
}
</script>

<style scoped lang="scss">
.user_list-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.user_list-data {
    margin-top: 50px;
}
::v-deep .el-table__row {
    cursor: pointer;
}
</style>