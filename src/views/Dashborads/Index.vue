<template>
    <div class="dashboard-container">
        <h4>下午好，{{ userName }}</h4>
        <div class="dashboard-overview">
            <div class="dashboard-overview-title">
                <h5>数据一览</h5>
                <FWCSelect :ops="selectOps" @option-change="handleOptionChange"></FWCSelect>
            </div>
            <div class="dashboard-overview-content">
                <div @click="clickTotal()">
                    <h5>总人数</h5>
                    <h2>{{ userData.total }}</h2>
                    <el-tag type="success" size="small">+{{ userData.totalChange }}人</el-tag><span class="tag-text">对比{{
                    dimensionText }}</span>
                </div>
                <div @click="clickLeave()">
                    <h5>离职人数</h5>
                    <h2>{{ userData.resign }}</h2>
                    <el-tag type="danger" size="small">+{{ userData.resignChange }}人</el-tag><span class="tag-text">对比{{
                    dimensionText }}</span>
                </div>
                <div @click="clickNotIn()">
                    <h5>缺勤人数</h5>
                    <h2>{{ userData.absence }}</h2>
                    <el-tag type="danger" size="small">+{{ userData.absenceChange }}人</el-tag><span
                        class="tag-text">对比{{
                    dimensionText }}</span>
                </div>
                <div @click="clickGo()">
                    <h5>请假人数</h5>
                    <h2>{{ userData.leave }}</h2>
                    <el-tag size="small">+{{ userData.leaveChange }}人</el-tag><span class="tag-text">对比{{ dimensionText
                        }}</span>
                </div>
            </div>
        </div>
        <div class="dashboard-data">
            <h5>近期{{ tabTitle }}</h5>
            <el-table :data="userEntryData" style="width: 100%" v-if="tabTitle === '入职'">
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
            <el-table :data="userResignData" style="width: 100%" v-else-if="tabTitle === '离职'">
                <el-table-column prop="date" label="离职日期" width="180">
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
                <el-table-column prop="entryDate" label="入职日期">
                </el-table-column>
            </el-table>
            <el-table :data="userAbsenceData" style="width: 100%" v-else-if="tabTitle === '缺勤'">
                <el-table-column prop="date" label="缺勤日期" width="180">
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
            <el-table :data="userAskForLeaveData" style="width: 100%" v-else-if="tabTitle === '请假'">
                <el-table-column prop="date" label="请假日期">
                </el-table-column>
                <el-table-column prop="name" label="姓名">
                </el-table-column>
                <el-table-column prop="gender" label="性别">
                    <template slot-scope="scope">
                        {{ scope.row.gender | genderText }}
                    </template>
                </el-table-column>
                <el-table-column prop="phone" label="手机">
                </el-table-column>
                <el-table-column prop="dept" label="部门">
                </el-table-column>
                <el-table-column prop="position" label="岗位">
                </el-table-column>
                <el-table-column prop="askForLeaveDays" label="请假天数">
                </el-table-column>
                <el-table-column prop="askForLeaveMarks" label="请假理由">
                </el-table-column>
                <el-table-column prop="askForLeaveType" label="请假类型">
                </el-table-column>
                <el-table-column prop="approver" label="审批人">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<style scoped lang="scss">
.dashboard-overview {
    height: 150px;
}

.dashboard-overview-title {
    display: flex;
    justify-content: space-between;
}

.dashboard-overview-content {
    display: flex;
    justify-content: space-between;
    height: 100%;

    div {
        width: 100%;
        height: 100%;
        margin-right: 20px;
        border-top: 1px solid #dad8d8;

        &:hover {
            cursor: pointer;
        }
    }
}

.tag-text {
    font-size: 12px;
    color: #6f6f6f;
    padding-left: 10px
}

.dashboard-data {
    margin-top: 100px;
}

::v-deep .el-table__row {
    cursor: pointer;
}
</style>

<script>
import FWCSelect from '../../components/FWCSelect.vue'
export default {
    components: {
        FWCSelect
    },
    data() {
        return {
            userName: 'feng wen',
            userData: {
                total: 248,
                totalChange: 20,
                resign: 20,
                resignChange: 10,
                absence: 54,
                absenceChange: 24,
                leave: 30,
                leaveChange: 29
            },
            selectOps: [
                {
                    value: '1',
                    title: '按年统计',
                    dimensionText: '去年'
                }, {
                    value: '2',
                    title: '按月统计',
                    dimensionText: '上月'
                },
                {
                    value: '3',
                    title: '按周统计',
                    dimensionText: '上周'
                },
                {
                    value: '4',
                    title: '按日统计',
                    dimensionText: '昨日'
                }
            ],
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
            },],
            userResignData: [{
                date: '2016-05-02',
                name: '王小虎',
                gender: 1,
                phone: '17521279833',
                dept: '研发部',
                position: '后端研发',
                entryDate: '2020-05-06'
            },
            {
                date: '2016-05-02',
                name: '王小虎',
                gender: 1,
                phone: '17521279833',
                dept: '研发部',
                position: '后端研发',
                entryDate: '2020-05-06'
            },
            {
                date: '2016-05-02',
                name: '王小虎',
                gender: 1,
                phone: '17521279833',
                dept: '研发部',
                position: '后端研发',
                entryDate: '2020-05-06'
            }],
            userAbsenceData: [{
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
                gender: 1,
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
                gender: 1,
                phone: '17521279833',
                dept: '研发部',
                position: '后端研发',
                address: '上海市普陀区金沙江路 1518 弄'
            },],
            userAskForLeaveData: [{
                date: '2016-05-02',
                name: '王小虎',
                gender: 1,
                phone: '17521279833',
                dept: '研发部',
                position: '后端研发',
                askForLeaveDays: 3,
                askForLeaveMarks: '生病',
                askForLeaveType: 1,
                approver: '李桂新'
            },
            {
                date: '2016-05-02',
                name: '王小虎',
                gender: 1,
                phone: '17521279833',
                dept: '研发部',
                position: '后端研发',
                askForLeaveDays: 3,
                askForLeaveMarks: '生病',
                askForLeaveType: 1,
                approver: '李桂新'
            },
            {
                date: '2016-05-02',
                name: '王小虎',
                gender: 1,
                phone: '17521279833',
                dept: '研发部',
                position: '后端研发',
                askForLeaveDays: 3,
                askForLeaveMarks: '生病',
                askForLeaveType: 1,
                approver: '李桂新'
            }],
            tabTitle: '入职',
            dimension: 1
        }
    },
    methods: {
        clickTotal() {
            this.tabTitle = '入职';
        },
        clickLeave() {
            this.tabTitle = '离职';
        },
        clickNotIn() {
            this.tabTitle = '缺勤';
        },
        clickGo() {
            this.tabTitle = '请假';
        },
        handleOptionChange(optionValue) {
            this.dimension = optionValue;
        }
    },
    computed: {
        dimensionText() {
            return this.selectOps.filter(item => item.value == this.dimension)[0].dimensionText || '去年';
        }
    }
}
</script>