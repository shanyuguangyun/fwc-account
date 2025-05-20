<template>
  <div class="dept_list-container">
    <div class="dept_list-title">
      <h4>部门管理</h4>
      <FWCButton :btnValue=btnValue @button-click="handleClicked"></FWCButton>
    </div>
    <div style="margin-top:50px">
      <el-col :span="5">
        <el-input  size="small" prefix-icon="el-icon-search" v-model="deptQueryName" placeholder="请输入部门名称" @blur="queryDeptsByNameOrParentName"></el-input>
      </el-col>
      <el-table :data="deptData" style="width: 100%" @row-click="queryDeptInfo">
        <el-table-column prop="id" label="ID">
        </el-table-column>
        <el-table-column prop="name" label="部门名称">
        </el-table-column>
        <el-table-column prop="parentName" label="所属部门">
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template v-slot="scope">
            {{ scope.row.status | deptStatusText }}
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述">
        </el-table-column>
        <el-table-column prop="createTime" label="创建日期">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import FWCButton from '../../components/FWCButton.vue'
import {getDepts, getDeptsByNameOrParentName} from "@/api/dept";
export default {
  components: {
    FWCButton,
  },
  data() {
    return {
      btnValue: '创建部门',
      deptQueryName:'',
      deptData: [],
      deptQueryType: ''
    }
  },
  methods: {
    handleClicked() {
      this.$router.push({ name: 'DeptsAdd' })
    },
    queryDeptInfo(row) {
      this.$router.push({
        name: 'DeptsInfo',
        params: { id: row.id }
      })
    },
    async fetchDeptData() {
      try {
        const res = await getDepts();
        this.deptData = res.data.map(item => ({
          ...item,
          createTime: new Date(item.createTime).toISOString().split('T')[0]
        }));
      } catch (error) {
        console.log('get depts failed:', error);
      }
    },
    async queryDeptsByNameOrParentName() {
      try {
        const res = await getDeptsByNameOrParentName(this.deptQueryName);
        this.deptData = res.data.map(item => ({
          ...item,
          createTime: new Date(item.createTime).toISOString().split('T')[0]
        }));
      } catch (error) {
        console.log('get depts failed:', error);
      }
    }
  },
  mounted() {
    this.fetchDeptData();
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