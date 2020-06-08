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

    <div class="col-12 col-md-4">
      <div class="lists-card" v-if="lists">
        <list-item
          v-for="(list, index) in lists"
          :key="index"
          :list="list"
          :activeListId="activeListId"
          @set-list="setActiveList(list.id, index)"
        ></list-item>
      </div>
      <div class="lists-card" v-else>
        <div class="text-center">No Lists</div>
      </div>
    </div>

    <div class="col-12 col-md-8">
      <listView v-if="activeListId" :list="lists[activeListIndex]"></listView>  
      <div class="px-5" v-else>
        Choose list
      </div>
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
      activeListId: null,
      activeListIndex: null
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
    methods: {
      setActiveList(listId, index) {
        this.activeListId = listId;
        this.activeListIndex = index;
        this.$store.dispatch('loadTasks', listId);
      }
    },
    created() {
      this.$store.dispatch('loadLists');
    }
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
