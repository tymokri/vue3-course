<template>
  <select
      class="select"
      @change="changeOptionHandler"
      v-bind:value="modelValue"
  >
<!--    v-model="modelValue"-->
    <option disabled value="">Make your chose</option>
    <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
    >{{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: "MySelect",
  props: {
    modelValue: {
      type: String,
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    changeOptionHandler(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>
.select {
  background: none;
  padding: 10px 16px;
  border: 2px solid #42b983;
  border-radius: 6px;
}
</style>