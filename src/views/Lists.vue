<template>
  <div class="row">
    <div class="col-12 d-flex align-items-center">
      <div class="h4 mb-0 text-left d-flex align-items-center">
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
        <v-btn @click="showNewListDialog = true" dark small> 
          ADD
        </v-btn>
      </div>
    </div>

    <div
      class="col-12 col-md-3 py-0"
      v-for="(list, index) in lists"
      :key="index"
    >
      <list-item
        :list="list"
        :id="index"
      ></list-item>
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

  export default {
    name: 'Lists',
    data: () => ({
      name: '',
      showNewListDialog: false,
    }),
    components: {
      listItem,
      newListDialog,
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

<style scoped></style>
