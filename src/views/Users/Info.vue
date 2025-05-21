<template>
  <div class="user_info-container">
    <div class="user_info-title">
      <h4>用户详情</h4>
      <div>
        <FWCButton :btnValue=btnUpdate @button-click="handleUpdate" style="margin-right: 10px"></FWCButton>
        <FWCButton :btnValue=btnBack @button-click="handleClicked"></FWCButton>
      </div>
    </div>
    <div class="user_info-data">
      <el-descriptions class="margin-top" :column="1"  border>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            ID
          </template>
          {{ userData.id }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            用户名称
          </template>
          {{ userData.name }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            性别
          </template>
          {{ userData.gender | genderText }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            邮箱
          </template>
          {{ userData.email }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            部门
          </template>
          {{ userData.deptName }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            岗位
          </template>
          {{ userData.position }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            住址
          </template>
          {{ userData.address }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            出生日期
          </template>
          {{ userData.birthday }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            入职日期
          </template>
          {{ userData.entryDate }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            创建日期
          </template>
          {{ userData.createTime }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            备注
          </template>
          {{ userData.mark }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            状态
          </template>
          {{ userData.status | userStatusText }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script>
import FWCButton from '../../components/FWCButton.vue'
import { getUserById } from '@/api/user'
export default {
  components: {
    FWCButton
  },
  data() {
    return {
      btnUpdate: '修改',
      btnBack: '返回',
      userData: {
        id: 0,
        name: '',
        type: 0,
        status: '0',
        mark: '',
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
      this.$router.push({ name: 'UsersUpdate', params: { id: this.$route.params.id } })
    },
    async fetchUserDetail(id) {
      try {
        const res = await getUserById(id);
        this.userData = {
          ...res.data,
          // 格式化时间（可选）
          entryDate: res.data.entryDate ? new Date(res.data.entryDate).toISOString().split('T')[0] : '',
          birthday: res.data.birthday ? new Date(res.data.birthday).toISOString().split('T')[0] : '',
          createTime: res.data.createTime ? new Date(res.data.createTime).toISOString().split('T')[0] : '',
        };
      } catch (error) {
        console.error('获取用户详情失败:', error);
        this.$message.error('获取用户详情失败，请重试');
      }
    }
  },
  mounted() {
    const id = this.$route.params.id;
    if (id) {
      this.fetchUserDetail(id);
    }
  }
}
</script>

<style scoped lang="scss">
.user_info-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user_info-data {
  margin-top: 50px;
}
</style>