<template>
  <div
      class="dialog"
      v-if="isShow === true"
      @click="hideDialogHandler"
  >
    <div class="dialog__content" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyDialog",
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hideDialogHandler() {
      this.$emit('update:isShow', false)
    }
  }
}
</script>

<style scoped>
.dialog {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
}
.dialog__content {
  margin: auto;
  background: white;
  border-radius: 8px;
  padding: 20px;
  min-height: 50px;
  min-width: 300px;
}
</style>