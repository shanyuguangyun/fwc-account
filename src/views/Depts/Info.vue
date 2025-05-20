<template>
  <div class="dept_info-container">
    <div class="dept_info-title">
      <h4>部门详情</h4>
      <div>
        <FWCButton :btnValue=btnUpdate @button-click="handleUpdate" style="margin-right: 10px"></FWCButton>
        <FWCButton :btnValue=btnBack @button-click="handleClicked"></FWCButton>
      </div>
    </div>
    <div class="dept_info-data">
      <el-descriptions class="margin-top" :column="1"  border>
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
            <i class="el-icon-user"></i>
            所属部门
          </template>
          {{ deptData.parentName }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            描述
          </template>
          {{ deptData.description }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            状态
          </template>
          {{ deptData.status | deptStatusText }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script>
import FWCButton from '../../components/FWCButton.vue'
import { getDeptById } from '@/api/dept'
export default {
  components: {
    FWCButton
  },
  data() {
    return {
      btnUpdate: '修改',
      btnBack: '返回',
      deptData: {
        id: 0,
        name: '',
        parentId: '',
        parentName: '',
        description: '',
        status: '0',
        createTime: '',
        updateTime: '',
      }
    }
  },
  methods: {
    handleClicked() {
      this.$router.back();
    },
    handleUpdate() {
      this.$router.push({name: 'DeptsUpdate', params: {id: this.$route.params.id}})
    },
    async fetchDeptDetail(id) {
      try {
        const res = await getDeptById(id);
        this.deptData = {
          ...res.data,
          // 格式化时间（可选）
          createTime: res.data.createTime ? new Date(res.data.createTime).toISOString().split('T')[0] : '',
          updateTime: res.data.updateTime ? new Date(res.data.updateTime).toISOString().split('T')[0] : ''
        };
      } catch (error) {
        console.error('获取部门详情失败:', error);
        this.$message.error('获取部门详情失败，请重试');
      }
    }
  },
  mounted() {
    const id = this.$route.params.id;
    if (id) {
      this.fetchDeptDetail(id);
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