<template>
  <div class="row pt-5">
    <div class="col-12 text-white d-flex align-items-center">
      <div class="h4 text-left d-flex align-items-center">
        <router-link tag="span" :to="{ name: 'Home' }">
          <img
            src="../assets/svg/Home.svg"
            width="25"
            class="mr-3"
            alt="back"
          />
        </router-link>
        Tasks Lists
      </div>
      <div class="ml-auto" v-if="!showNewListDialog">
        <v-btn @click="showNewListDialog = true" text class="text-white">
          ADD
        </v-btn>
      </div>
    </div>

    <div class="col-12 col-md-3">
      <div class="lists-card">
        <div class="lists-card__header">
          <input
            type="text"
            class="form-control text-field"
            autocomplete="off"
            placeholder="Search..."
          />
        </div>
        <list-item
          v-for="(list, index) in lists"
          :key="index"
          :list="list"
          :activeListId="activeList"
          @set-list="activeList = index"
          :id="index"
        ></list-item>
      </div>
    </div>

    <div class="col-12 col-md-9">
      <listView :listId="activeList"></listView>  
    </div>

    <new-list-dialog
      :show="showNewListDialog"
      @close="showNewListDialog = false"
    ></new-list-dialog>
  </div>
</template>

<script>
  import listItem from '../components/lists/list-item';
  import newListDialog from '../components/lists/new-list-dialog';
  import listView from '../components/lists/list-view';

  export default {
    name: 'Lists',
    data: () => ({
      name: '',
      showNewListDialog: false,
      activeList: null
    }),
    components: {
      listItem,
      newListDialog,
      listView,
    },
    computed: {
      lists: {
        get() {
          return this.$store.state.todo.lists;
        },
      },
    },
    methods: {},
  };
</script>

<style scoped>
  .h4 {
    line-height: 24px;
  }
  .lists-card {
    background: #171e28;
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
  }
  .lists-card__header {
    padding: 10px 30px;
  }
</style>
