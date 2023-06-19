<template>
  <button class="btn">
    <slot></slot>
  </button>

</template>

<script>
export default {
  // 'name' вказуємо для глобальної реєстрації компонента 'MyButton'
  name: "MyButton"
}
</script>

<style scoped>
.btn {
  background: none;
  padding: 10px 16px;
  border: 2px solid #42b983;
  border-radius: 6px;
}
</style>