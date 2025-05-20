<template>
  <div class="user_list-container">
    <div class="user_list-title">
      <h4>用户管理</h4>
      <FWCButton :btnValue=btnValue @button-click="handleClicked"></FWCButton>
    </div>
    <div style="margin-top:50px">
      <el-col :span="5">
        <el-input  size="small" prefix-icon="el-icon-search" v-model="userQueryKeyword" placeholder="请输入名称、手机号或邮箱" @blur="queryUsersByKeyword"></el-input>
      </el-col>
      <el-table :data="userData" style="width: 100%" @row-click="queryUserInfo">
        <el-table-column prop="id" label="ID">
        </el-table-column>
        <el-table-column prop="name" label="用户名称">
        </el-table-column>
        <el-table-column prop="gender" label="性别">
          <template v-slot="scope">
            {{ scope.row.status | genderText }}
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机">
        </el-table-column>
        <el-table-column prop="deptName" label="部门">
        </el-table-column>
        <el-table-column prop="entryDate" label="入职日期">
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template v-slot="scope">
            {{ scope.row.status | userStatusText }}
          </template>
        </el-table-column>
        <el-table-column prop="mark" label="备注">
        </el-table-column>
        <el-table-column prop="createTime" label="创建日期">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import FWCButton from '../../components/FWCButton.vue'
import {getUsers, getUserByKeyword} from "@/api/user";
export default {
  components: {
    FWCButton,
  },
  data() {
    return {
      btnValue: '创建用户',
      userQueryKeyword:'',
      userData: [],
    }
  },
  methods: {
    handleClicked() {
      this.$router.push({ name: 'UsersAdd' })
    },
    queryUserInfo(row) {
      this.$router.push({
        name: 'UsersInfo',
        params: { id: row.id }
      })
    },
    async fetchUserData() {
      try {
        const res = await getUsers();
        this.userData = res.data.map(item => ({
          ...item,
          entryDate: new Date(item.entryDate).toISOString().split('T')[0],
          createTime: new Date(item.createTime).toISOString().split('T')[0]
        }));
      } catch (error) {
        console.log('get users failed:', error);
      }
    },
    async queryUsersByKeyword() {
      try {
        const res = await getUserByKeyword(this.userQueryKeyword);
        this.userData = res.data.map(item => ({
          ...item,
          entryDate: new Date(item.entryDate).toISOString().split('T')[0],
          createTime: new Date(item.createTime).toISOString().split('T')[0]
        }));
      } catch (error) {
        console.log('get users failed:', error);
      }
    }
  },
  mounted() {
    this.fetchUserData();
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