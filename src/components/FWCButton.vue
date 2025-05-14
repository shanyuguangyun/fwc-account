<template>
    <button class="fwc-button" @click="handleClick">
        {{ btnValue }}
    </button>
</template>
<script>
export default {
    props: {
        btnValue: {
            type: String,
            required: true,
        }
    },
    data() {
        return {
            
        }
    },
    methods: {
        handleClick() {
            this.$emit('button-click')
        }
    }
}
</script>

<style lang="scss">
.fwc-button{
    width: 100px;
    height: 30px;
    background-color: black;
    color: white;
    font-size: 12px;
    letter-spacing: 2px;
    border-radius: 8px;
    font-weight: bold;
    &:hover {
        background-color: rgb(66, 65, 65);
    }
}
</style>