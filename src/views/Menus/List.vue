<template>
    <div class="menu_list-container">
        <div class="menu_list-title">
            <h4>菜单管理</h4>
            <FWCButton :btnValue=btnValue @button-click="handleClicked"></FWCButton>
        </div>
        <div class="menu_list-data">
            <el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm" size="small">
                <el-form-item prop="name">
                    <el-col :span="5">
                        <el-input prefix-icon="el-icon-search" v-model="ruleForm.name" placeholder="请输入菜单名称"></el-input>
                    </el-col>
                    <FWCSelect style="margin-left:20px" :ops="selectOps" @option-change="handleOptionChange">
                    </FWCSelect>
                </el-form-item>
            </el-form>
            <el-table :data="menuData" style="width: 100%" @row-click="queryMenu">
                <el-table-column prop="id" label="ID">
                </el-table-column>
                <el-table-column prop="parentName" label="父菜单">
                </el-table-column>
                <el-table-column prop="name" label="菜单名称">
                </el-table-column>
                <el-table-column prop="type" label="菜单类型">
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
import {getMenus, getMenusBySystemId} from "../../api/menu";
import {SYSTEM_MAP} from "../../enums/enums";
export default {
    components: {
        FWCButton,
        FWCSelect
    },
    data() {
        return {
            btnValue: '创建菜单',
            ruleForm: {
              name: ''
            },
            selectOps: Object.keys(SYSTEM_MAP).map(key => ({value: key, title: SYSTEM_MAP[key]})),
            menuData: []
        }
    },
    methods: {
        handleClicked() {
            this.$router.push({ name: 'MenusAdd' })
        },
        async handleOptionChange(selectedValue) {
          console.log('选中的系统ID:', selectedValue);
          try {
            const res = await getMenusBySystemId(selectedValue);
            this.menuData = res.data.map(item => ({
              ...item,
              createTime: new Date(item.createTime).toISOString().split('T')[0]
            }));
          } catch (error) {
            console.error('查询菜单失败:', error);
            this.$message.error('查询菜单失败，请重试');
          }
        },
        queryMenu(row) {
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