<template>
  <div class="interface_list-container">
    <div class="interface_list-title">
      <h4>接口管理</h4>
      <FWCButton :btnValue=btnValue @button-click="handleClicked"></FWCButton>
    </div>
    <div style="margin-top:50px">
      <el-col :span="5">
        <el-input  size="small" prefix-icon="el-icon-search" v-model="interfaceQueryName" placeholder="请输入接口名称" @blur="queryInterfacesByNameAndSystemId"></el-input>
      </el-col>
      <FWCSelect style="margin-left:20px" v-model="interfaceQuerySystemId" :ops="selectOps" @option-change="handleOptionChange">
      </FWCSelect>
      <el-table :data="interfaceData" style="width: 100%" @row-click="queryInterfaceInfo">
        <el-table-column prop="id" label="ID">
        </el-table-column>
        <el-table-column prop="name" label="接口名称">
        </el-table-column>
        <el-table-column prop="type" label="接口类型">
          <template v-slot="scope">
            {{ scope.row.type | interfaceTypeText }}
          </template>
        </el-table-column>
        <el-table-column prop="systemName" label="所属系统">
        </el-table-column>
        <el-table-column prop="url" label="接口路径">
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template v-slot="scope">
            {{ scope.row.status | interfaceStatusText }}
          </template>
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
import {getInterfaces, getInterfacesByNameAndSystemId} from "@/api/interface";
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
      btnValue: '创建接口',
      interfaceQueryName:'',
      interfaceQuerySystemId: '',
      selectOps: systemOps,
      interfaceData: []
    }
  },
  methods: {
    handleClicked() {
      this.$router.push({ name: 'InterfacesAdd' })
    },
    async handleOptionChange(systemId) {
      this.interfaceQuerySystemId = systemId;
      try {
        const res = await getInterfacesByNameAndSystemId(systemId, this.interfaceQueryName);
        this.interfaceData = res.data.map(item => ({
          ...item,
          createTime: new Date(item.createTime).toISOString().split('T')[0]
        }));
      } catch (error) {
        console.log('get interfaces failed:', error);
      }
    },
    queryInterfaceInfo(row) {
      this.$router.push({
        name: 'InterfacesInfo',
        params: { id: row.id }
      })
    },
    async fetchInterfaceData() {
      try {
        const res = await getInterfaces();
        this.interfaceData = res.data.map(item => ({
          ...item,
          createTime: new Date(item.createTime).toISOString().split('T')[0]
        }));
      } catch (error) {
        console.log('get interfaces failed:', error);
      }
    },
    async queryInterfacesByNameAndSystemId() {
      try {
        const res = await getInterfacesByNameAndSystemId(this.interfaceQuerySystemId, this.interfaceQueryName);
        this.interfaceData = res.data.map(item => ({
          ...item,
          createTime: new Date(item.createTime).toISOString().split('T')[0]
        }));
      } catch (error) {
        console.log('get interfaces failed:', error);
      }
    }
  },
  mounted() {
    this.fetchInterfaceData();
  }
}
</script>

<style scoped lang="scss">
.interface_list-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.interface_list-data {
  margin-top: 50px;
}

::v-deep .el-table__row {
  cursor: pointer;
}
</style>