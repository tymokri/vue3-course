<template>
  <div class="post">
    <div class="post__wrapper">
      <div><strong>Post title: </strong>{{ post.title }}</div>
      <div><strong>Post description: </strong>{{ post.body }}</div>
    </div>

    <div class="post__buttons">
      <MyButton
          @click="$emit('remove', post)"
      >
        Delete
      </MyButton>
    </div>
  </div>
</template>

// 1:04...

<script>

export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.post {
  border: 2px solid #42b983;
  border-radius: 6px;
  padding: 12px;
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.post__wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 6px;
  text-align: start;
}
</style>