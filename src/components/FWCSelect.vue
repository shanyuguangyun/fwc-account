<template>
    <select v-model="selectedValue" name="fwc-select" id="fwc-select" @change="handleChange">
        <option v-for="(op, index) in ops" :value="op.value">
            {{ op.title }}
        </option>
    </select>
</template>

<style lang="scss">
#fwc-select {
    width: 150px;
    box-sizing: border-box;
    border: 0.8px solid rgb(208, 206, 206);
    height: 32px;
    border-radius: 8px;
    padding: 0 20px 0 10px;
    appearance: none;
    background-image: url('../assets/select.svg');
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 14px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    &:focus {
        outline: none;
    }
}
</style>
<script>
export default {
    props: {
        ops: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            selectedValue: this.ops[0].value
        }
    },
    methods: {
        handleChange() {
            this.$emit('option-change', this.selectedValue)
        }
    },
    watch: {

    }
}
</script>