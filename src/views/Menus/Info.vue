<template>
    <div class="menu_info-container">
        <div class="menu_info-title">
            <h4>菜单详情</h4>
            <div>
              <FWCButton :btnValue=btnUpdate @button-click="handleUpdate" style="margin-right: 10px"></FWCButton>
              <FWCButton :btnValue=btnBack @button-click="handleClicked"></FWCButton>
            </div>
        </div>
        <div class="menu_info-data">
            <el-descriptions class="margin-top" :column="1"  border>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-user"></i>
                        ID
                    </template>
                    {{ menuData.id }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-user"></i>
                        菜单名称
                    </template>
                    {{ menuData.name }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-user"></i>
                    父菜单
                  </template>
                  {{ menuData.parentName }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-user"></i>
                    菜单类型
                  </template>
                  {{ menuData.type | menuTypeText }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-user"></i>
                    所属系统
                  </template>
                  {{ menuData.systemName }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-user"></i>
                    描述
                  </template>
                  {{ menuData.description }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-user"></i>
                    路由
                  </template>
                  {{ menuData.url }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-user"></i>
                    图标
                  </template>
                  {{ menuData.icon }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-user"></i>
                    状态
                  </template>
                  {{ menuData.status | menuStatusText }}
                </el-descriptions-item>
            </el-descriptions>
        </div>
    </div>
</template>

<script>
import FWCButton from '../../components/FWCButton.vue'
import { getMenuById } from '@/api/menu'
export default {
    components: {
        FWCButton
    },
    data() {
        return {
            btnUpdate: '修改',
            btnBack: '返回',
            menuData: {
              id: '',
              name: '',
              parentId: '',
              parentName: '',
              type: '',
              systemId:  '',
              systemName: '',
              description: '',
              url:  '',
              icon: '',
              sort: '',
              status: '',
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
            this.$router.push({ name: 'MenusUpdate', params: { id: this.$route.params.id } })
        },
        async fetchMenuDetail(id) {
          try {
            const res = await getMenuById(id);
            this.menuData = {
              ...res.data,
              // 格式化时间（可选）
              createTime: res.data.createTime ? new Date(res.data.createTime).toISOString().split('T')[0] : '',
              updateTime: res.data.updateTime ? new Date(res.data.updateTime).toISOString().split('T')[0] : ''
            };
          } catch (error) {
            console.error('获取菜单详情失败:', error);
            this.$message.error('获取菜单详情失败，请重试');
          }
        }
    },
    mounted() {
      const id = this.$route.params.id;
      if (id) {
        this.fetchMenuDetail(id);
      }
    }
}
</script>

<style scoped lang="scss">
.menu_info-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.menu_info-data {
    margin-top: 50px;
}
</style>