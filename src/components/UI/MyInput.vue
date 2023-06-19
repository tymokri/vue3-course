<template>
  <input
      class="input"
      :type="inputType"
      :value="modelValue"
      @input="updateInputHandler"
  >
</template>

<script>
export default {
  name: "MyInput",
  props: {
    modelValue: [String, Number],
    inputType: {
        type: String,
        required: true
      }
  },
  methods: {
    updateInputHandler(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }

  // props: {
  //
  // }
}
</script>

<style scoped>
.input {
  border: 2px solid #42b983;
  border-radius: 6px;
  padding: 12px;
  /*margin-bottom: 16px;*/
}


/*background: none;*/
/*padding: 10px 16px;*/
/*border: 2px solid #42b983;*/
/*border-radius: 6px;*/
</style>