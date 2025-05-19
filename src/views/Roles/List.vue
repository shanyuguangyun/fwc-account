<template>
  <div class="role_list-container">
    <div class="role_list-title">
      <h4>角色管理</h4>
      <FWCButton :btnValue=btnValue @button-click="handleClicked"></FWCButton>
    </div>
    <div style="margin-top:50px">
      <el-col :span="5">
        <el-input  size="small" prefix-icon="el-icon-search" v-model="roleQueryName" placeholder="请输入角色名称" @blur="queryRolesByNameAndType"></el-input>
      </el-col>
      <FWCSelect style="margin-left:20px" v-model="roleQueryType" :ops="selectOps" @option-change="handleOptionChange">
      </FWCSelect>
      <el-table :data="roleData" style="width: 100%" @row-click="queryRoleInfo">
        <el-table-column prop="id" label="ID">
        </el-table-column>
        <el-table-column prop="name" label="角色名称">
        </el-table-column>
        <el-table-column prop="type" label="角色类型">
          <template v-slot="scope">
            {{ scope.row.type | roleTypeText }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template v-slot="scope">
            {{ scope.row.status | roleStatusText }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="描述">
        </el-table-column>
        <el-table-column prop="createTime" label="创建日期">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import FWCButton from '../../components/FWCButton.vue'
import {getRoles, getRolesByNameAndType} from "@/api/role";
import FWCSelect from "@/components/FWCSelect.vue";
import {ROLE_TYPE_MAP} from "@/enums/enums";
export default {
  components: {
    FWCSelect,
    FWCButton,
  },
  data() {
    let roleTypes = [{value: '', title: '全部'}];
    Object.keys(ROLE_TYPE_MAP).forEach(key => {
      roleTypes.push({ value: key, title: ROLE_TYPE_MAP[key] });
    });
    return {
      btnValue: '创建角色',
      roleQueryName:'',
      roleData: [],
      selectOps: roleTypes,
      roleQueryType: ''
    }
  },
  methods: {
    handleClicked() {
      this.$router.push({ name: 'RolesAdd' })
    },
    async handleOptionChange(type) {
      this.roleQueryType = type;
      try {
        const res = await getRolesByNameAndType(type, this.roleQueryName);
        this.roleData = res.data.map(item => ({
          ...item,
          createTime: new Date(item.createTime).toISOString().split('T')[0]
        }));
      } catch (error) {
        console.log('get roles failed:', error);
      }
    },
    queryRoleInfo(row) {
      this.$router.push({
        name: 'RolesInfo',
        params: { id: row.id }
      })
    },
    async fetchRoleData() {
      try {
        const res = await getRoles();
        this.roleData = res.data.map(item => ({
          ...item,
          createTime: new Date(item.createTime).toISOString().split('T')[0]
        }));
      } catch (error) {
        console.log('get roles failed:', error);
      }
    },
    async queryRolesByNameAndType() {
      try {
        const res = await getRolesByNameAndType(this.roleQueryType, this.roleQueryName);
        this.roleData = res.data.map(item => ({
          ...item,
          createTime: new Date(item.createTime).toISOString().split('T')[0]
        }));
      } catch (error) {
        console.log('get roles failed:', error);
      }
    }
  },
  mounted() {
    this.fetchRoleData();
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