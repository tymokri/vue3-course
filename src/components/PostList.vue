<template>
  <div v-if="posts.length > 0">
    <h3>Posts list</h3>
    <transition-group name="posts-list">
      <PostItem
          v-for="post in posts"
          :post="post"
          :key="post.id"
          @remove="$emit('remove', post)"
      />
    </transition-group>
  </div>
  <h2 v-else style="color: red">
    There are no items
  </h2>
</template>

<script>
import PostItem from "@/components/PostItem.vue";
export default {
  // name: "PostList.vue",
  components: {
    PostItem
  },
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
/* класи для анімації - див документацію */
.posts-list-item {
  display: inline-block;
  margin-right: 10px;
}
.posts-list-enter-active,
.posts-list-leave-active {
  transition: all 0.5s ease;
}
.posts-list-enter-from,
.posts-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}
.posts-list-move {
  transition: transform 0.5s ease;
}
</style>