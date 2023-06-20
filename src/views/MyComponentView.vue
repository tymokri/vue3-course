<template>
<!--  views - as pages -->
<!--  Чим відрізняються файли в папках 'views' / 'components' ?-->
<!--  компонент 'HelloWorld.vue' - це контент сторінки 'About' /* views/AboutView.vue */-->
  <div class="myComponent">
    <h1>Hello! It's My Component from views (from my own page)</h1>
    <h3>Posts page</h3>

    <div class="buttons-wrapper">
      <MyButton @click="showDialogHandler">Create new post</MyButton>

      <MySelect
          v-model="selectedSort"
          :options="sortOptions"
      ></MySelect>

      <MyInput
          type="text"
          placeholder="Search"
          v-model="searchQuery"
      ></MyInput>
    </div>
<!--    <input type="text" v-model.trim="modificatorValue">-->

<!--    <div class="buttons-wrapper">-->
<!--      <MyButton @click="fetchPosts">Get posts</MyButton>-->
<!--      <MyButton @click="showDialogHandler">Create new post</MyButton>-->
<!--    </div>-->

    <div class="container">
      <MyDialog v-model:is-show="dialogVisible">
        <PostForm
            @create="createPostHandler"
        />
      </MyDialog>

      <PostList
          :posts="sortedAndSearchedPost"
          @remove="removePostHandler"
          v-if="!isPostsLoading"
      />
      <div v-else>Loading...</div>

      <div class="page__wrapper">
        <div
            class="page"
            :class="{
              'current-page': pageNumber === page
            }"
            v-for="page in totalPages"
            :key="pageNumber"
            @click="changePageHandler(page)"
        >
          {{ page }}
        </div>
      </div>
      <!--     в PostList підписуємся на подію 'remove' @remove="removePostHandler"-->
      <!--          <button-->
      <!--              class="btn"-->
      <!--              @click="createPostHandler"-->
      <!--              :disabled="!isFromCompleted"-->
      <!--            Create-->
      <!--          </button>-->
    </div>
  </div>

</template>

<script>
// тут пишемо логіку компонента, створюємо функції, оголошуємо дані, і обов'язково треба по дкфолту:
// export default {...} - це по суті і є компонент!
// призначення коду нижче не зрозуміло поки що. Чим відрізняються файли в папках 'views' / 'components' ?
// import MyComponent from "@/components/MyComponent.vue";
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import MyButton from "@/components/UI/MyButton.vue";
import axios from "axios";
import MySelect from "@/components/UI/MySelect.vue";
import MyInput from "@/components/UI/MyInput.vue";

export default {
  name: "MyComponentView",
  components: {
    MyInput,
    MySelect,
    MyButton,
    PostForm,
    PostList
  },
  data() {
    return {
      // описуємо модель стейту
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: '',
      searchQuery: '',
      pageNumber: 1,
      pageLimit: 10,
      totalPages: 0,
      sortOptions: [
        {value: 'title', name: 'By name'},
        {value: 'body', name: 'By description'},
      ]
      // modificatorValue: '' // можна додавати модифікатор .trim - буде обрізати пробіли строк в інпуті або .number - цифрове значення відразу записувати
    }
  },
  methods: {
    createPostHandler(post) {
      this.posts.unshift(post);
      this.dialogVisible = false;
    },
    removePostHandler(post) {
      this.posts = this.posts.filter(p => p.id !== post.id);
    },
    showDialogHandler() {
      this.dialogVisible = true;
    },
    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        setTimeout(async () => {
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
              _page: this.pageNumber,
              _limit: this.pageLimit
            }
          });
          this.totalPages = Math.ceil(response.headers['x-total-count'] / this.pageLimit);
          this.posts = response.data;
          this.isPostsLoading = false;
        }, 1500);
      } catch (e) {
        console.log(e);
      } finally {
        // якби не setTimeout - писали б тут
        // this.isPostsLoading = false;
      }
    },
    changePageHandler(newPageNumber) {
      this.pageNumber = newPageNumber;
      // для пагінації можна так, або через окрему фунцію в watch
      // this.fetchPosts();
    }
  },
  mounted() {
    this.fetchPosts();
  },
  // computed - використовуємо як змінну і звертаємось до неї по назві sortedPost (стр.29)
  computed: {
    sortedPost() {
      return [...this.posts].sort((post1, post2) =>
          post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
    },
    sortedAndSearchedPost() {
      return this.sortedPost.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
  watch: {
    pageNumber() {
      this.fetchPosts();
    }
  }
  // watch: {
  //   // функ в 'watch' має мати назву точно як названа модель (стр.71)
  //   selectedSort(newValue) {
  //     // тут мутуємо вихідний масив з постами
  //     this.posts.sort((post1, post2) => {
  //       return post1[newValue]?.localeCompare(post2[newValue]);
  //     })
  //   }
  // }
}
</script>

<style scoped>
.container {
  padding: 20px;
}
.buttons-wrapper {
  display: flex;
  justify-content: center;
  gap: 30px;
}
.page__wrapper {
  display: flex;
  margin-top: 16px;
  gap: 6px;
}
.page {
  border: 1px solid black;
  border-radius: 6px;
  padding: 12px;
  cursor: pointer;
}
.current-page {
  border: 2px solid #42b983;
}
</style>

