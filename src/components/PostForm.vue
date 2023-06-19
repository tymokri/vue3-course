<template>
  <form class="form" @submit.prevent>
    <h4>Create post</h4>
    <MyInput
        type="text"
        placeholder="Title"
        v-model="post.title"
    ></MyInput>

    <MyInput
        type="text"
        placeholder="Description"
        v-model="post.body"
    ></MyInput>

    <MyButton
        class="btn-flex-end"
        @click="createPostHandler"
    >
      Create
    </MyButton>
  </form>
</template>

<script>
import MyInput from "@/components/UI/MyInput.vue";

export default {
  components: {MyInput},
  // передача даних наверх в батьків.компонент
  data() {
    return {
      post: {
        title: '',
        body: ''
      }
    }
  },
  methods: {
    createPostHandler() {
      this.post.id = Date.now();
      // щоб передати дані наверх - генеруємо подію 'create', на яіку балтьк. компонент підпишетья
      this.$emit('create', this.post)
      this.post = {
        title: '',
        body: ''
      }
    },
    // isFromCompleted() {
    //   return (
    //       this.title !== '' &&
    //       this.body !== ''
    //   )
    // }
  }
}
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.btn-flex-end {
  align-self: flex-end;
}
/*стилі застосовуються */
.btn:disabled {
  /*cursor: not-allowed;*/
  opacity: 0.8;
}
</style>