<template>
    <div class="menu_list-container">
        <div class="menu_list-title">
            <h4>菜单管理</h4>
            <FWCButton :btnValue=btnValue @button-click="handleClicked"></FWCButton>
        </div>
        <div style="margin-top:50px">
            <el-col :span="5">
                <el-input  size="small" prefix-icon="el-icon-search" v-model="menuQueryName" placeholder="请输入菜单名称" @blur="queryMenusByNameAndSystemId"></el-input>
            </el-col>
            <FWCSelect style="margin-left:20px" v-model="menuQuerySystemId" :ops="selectOps" @option-change="handleOptionChange">
            </FWCSelect>
            <el-table :data="menuData" style="width: 100%" @row-click="queryMenuInfo">
                <el-table-column prop="id" label="ID">
                </el-table-column>
                <el-table-column prop="parentName" label="父菜单">
                </el-table-column>
                <el-table-column prop="name" label="菜单名称">
                </el-table-column>
                <el-table-column prop="type" label="菜单类型">
                  <template v-slot="scope">
                    {{ scope.row.type | menuTypeText }}
                  </template>
                </el-table-column>
                <el-table-column prop="systemName" label="所属系统">
                </el-table-column>
                <el-table-column prop="createTime" label="创建日期">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import FWCButton from '../../components/FWCButton.vue'
import FWCSelect from '../../components/FWCSelect.vue'
import {getMenus, getMenusByNameAndSystemId} from "@/api/menu";
import {SYSTEM_MAP} from "@/enums/enums";
export default {
    components: {
        FWCButton,
        FWCSelect
    },
    data() {
      let systemOps = [{value: '', title: '全部'}];
      Object.keys(SYSTEM_MAP).forEach(key => {
        systemOps.push({ value: key, title: SYSTEM_MAP[key] });
      });
      return {
            btnValue: '创建菜单',
            menuQueryName:'',
            menuQuerySystemId: '',
            selectOps: systemOps,
            menuData: []
        }
    },
    methods: {
        handleClicked() {
            this.$router.push({ name: 'MenusAdd' })
        },
        async handleOptionChange(systemId) {
          this.menuQuerySystemId = systemId;
          try {
            const res = await getMenusByNameAndSystemId(systemId, this.menuQueryName);
            this.menuData = res.data.map(item => ({
              ...item,
              createTime: new Date(item.createTime).toISOString().split('T')[0]
            }));
          } catch (error) {
            console.log('get menus failed:', error);
          }
        },
        queryMenuInfo(row) {
          this.$router.push({
            name: 'MenusInfo',
            params: { id: row.id }
          })
        },
        async fetchMenuData() {
            try {
                const res = await getMenus();
                this.menuData = res.data.map(item => ({
                  ...item,
                  createTime: new Date(item.createTime).toISOString().split('T')[0]
                }));
            } catch (error) {
                console.log('get menus failed:', error);
            }
        },
      async queryMenusByNameAndSystemId() {
          try {
            const res = await getMenusByNameAndSystemId(this.menuQuerySystemId, this.menuQueryName);
            this.menuData = res.data.map(item => ({
              ...item,
              createTime: new Date(item.createTime).toISOString().split('T')[0]
            }));
          } catch (error) {
            console.log('get menus failed:', error);
          }
      }
    },
    mounted() {
        this.fetchMenuData();
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