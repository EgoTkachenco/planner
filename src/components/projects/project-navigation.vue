<template>
  <div class="d-flex flex-column">
    <div class="d-flex">
      <div class="ml-auto">
        <v-btn @click="showNewListDialog = true" dark text>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
    </div>
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

    <new-list-dialog
      :show="showNewListDialog"
      action="addProjectList"
      @close="showNewListDialog = false"
    ></new-list-dialog>
  </div>
</template>

<script>
  import ListItem from '../lists/list-item'
  import newListDialog from '../lists/new-list-dialog';
  export default {
    data: () => ({
      activeListId: null,
      activeListIndex: null,

      showNewListDialog: false
    }),
    components: {
      'list-item': ListItem,
      newListDialog,
    },
    computed: {
      lists: {
        get() {
          return this.$store.state.projects.lists;
        },
      },
    },
    methods: {
      setActiveList(listId, index) {
        this.activeListId = listId;
        this.activeListIndex = index;
        this.$store.commit('SET_ACTIVE_PROJECT_LIST', listId)
        this.$store.dispatch('loadTasks', listId);
      }
    },
  };
</script>
