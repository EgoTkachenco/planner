<template>
  <div class="row">
    <div class="col-12 text-white d-flex align-items-center mt-3">
      <div class="h4 mb-0 text-left d-flex align-items-center">
        <router-link tag="span" :to="{ name: 'Home' }">
          <img
            src="../assets/svg/Home.svg"
            width="30"
            class="mr-3"
            alt="back"
          />
        </router-link>
        Plan
      </div>
    </div>

    <div class="col-12 pt-0" v-if="todayPlan">
      <v-calendar
        ref="calendar"
        :now="today"
        :events="todayPlan.tasks"
        :event-color="getEventColor"
        color="primary"
        style="background: rgb(33, 33, 47)"
        :class="{'fixed-header': isFixedHeader}"
        dark
        @click:event="showEvent"
        type="day"
      ></v-calendar>

      <v-menu
        v-model="selectedOpen"
        :close-on-content-click="false"
        :close-on-click="false"
        :activator="selectedElement"
        offset-x
      >
        <v-card class="event-card" max-width="350px" flat v-if="selectedEvent">
          <v-toolbar :color="selectedEvent.color" dark>
            <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
          </v-toolbar>
          <v-card-text class="px-2">
            <textarea
              class="form-control text-field"
              placeholder="details"
              v-html="selectedEvent.details"
            ></textarea>
          </v-card-text>
          <div class="d-flex px-2">
            <v-text-field
              dark
              :value="getTime(selectedEvent.start)"
              label="Start Time"
              class="mr-2"
              @focus="editTime('start')"
            ></v-text-field>
            <v-text-field
              dark
              :value="getTime(selectedEvent.end)"
              label="End Time"
              readonly
              @focus="editTime('end')"
            ></v-text-field>
          </div>

          <v-card-actions>
            <v-btn text dark @click="selectedOpen = false">
              Cancel
            </v-btn>
            <v-btn text dark class="ml-auto" @click="editPlan">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
      <v-dialog
        ref="dialog"
        v-model="showTimeDialog"
        persistent
        width="290px"
        @click.stop
      >
        <v-time-picker format="24hr" v-model="time" full-width>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="showTimeDialog = false"
            >Cancel</v-btn
          >
          <v-btn text color="primary" @click="save">OK</v-btn>
        </v-time-picker>
      </v-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      colorIndex: 0,
      colors: [
        'blue',
        'indigo',
        'deep-purple',
        'cyan',
        'green',
        'orange',
        'grey darken-1',
      ],
      selectedEvent: null,
      selectedElement: null,
      selectedOpen: false,
      showTimeDialog: false,
      time: null,
      editedField: null,
      isFixedHeader: false
    }),

    computed: {
      today() {
        return new Date().toISOString().slice(0, 10);
      },
      todayPlan: {
        get() {
          let list = this.$store.state.todo.todayPlan;
          if (!list) {
            this.initDayPlan();
          }
          return list;
        },
        set(value) {
          this.$store.dispatch('savePlan', value);
        },
      },
    },
    methods: {
      getColor() {
        if (this.colorIndex === this.colors.length) {
          this.colorIndex = 0;
        }
        let color = this.colors[this.colorIndex];
        this.colorIndex++;
        return color;
      },
      getEventColor(event) {
        return event.color;
      },
      showEvent({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = Object.assign({}, event);
          this.selectedElement = nativeEvent.target;
          setTimeout(() => (this.selectedOpen = true), 10);
        };

        if (this.selectedOpen) {
          this.selectedOpen = false;
          setTimeout(open, 10);
        } else {
          open();
        }

        nativeEvent.stopPropagation();
      },
      save() {
        this.selectedEvent[this.editedField] =
          this.selectedEvent[this.editedField].slice(0, 10) + ' ' + this.time;

        this.showTimeDialog = false;
        this.editedField = null;
        this.time = null;
      },
      editTime(field) {
        this.time = this.getTime(this.selectedEvent[field]);
        this.showTimeDialog = true;
        this.editedField = field;
      },
      getTime(date) {
        let time;
        if (date.length < 11) {
          time = '00:00';
        } else {
          time = date.slice(11);
        }
        return time;
      },
      initDayPlan() {
        let list = this.$store.state.todo.todayTasks;
        let result = [];
        for (const group in list) {
          if (list[group].tasks && list[group].tasks.length > 0) {
            for (const task in list[group].tasks) {
              let taskItem = list[group].tasks[task];
              let listItem = {
                name: taskItem.text,
                start: taskItem.dueDate,
                end: taskItem.dueDate,
                color: this.getColor(),
                details: '',
              };
              result.push(listItem);
            }
          }
        }
        this.$store.dispatch('savePlan', {
          date: new Date().toISOString().slice(0, 10),
          tasks: result,
        });
      },
      checkTodayPlan() {
        let list = this.$store.state.todo.todayTasks;
        let result = [];
        for (const group in list) {
          if (list[group].tasks && list[group].tasks.length > 0) {
            for (const task in list[group].tasks) {
              let taskItem = list[group].tasks[task];
              let isNew = true;
              for (const key in this.todayPlan.tasks) {
                if (this.todayPlan.tasks[key].name === taskItem.text) {
                  result.push(this.todayPlan.tasks[key]);
                  isNew = false;
                }
              }
              if (isNew) {
                let listItem = {
                  name: taskItem.text,
                  start: taskItem.dueDate,
                  end: taskItem.dueDate,
                  color: this.getColor(),
                  details: '',
                };
                result.push(listItem);
              }
            }
          }
        }
        this.$store.dispatch('savePlan', {
          date: new Date().toISOString().slice(0, 10),
          tasks: result,
        });
      },
      editPlan() {
        let newPlan = Object.assign({}, this.todayPlan);
        for (const task in newPlan.tasks) {
          if (newPlan.tasks[task].name === this.selectedEvent.name) {
            newPlan.tasks[task] = this.selectedEvent;
          }
        }
        this.selectedOpen = false;
        this.todayPlan = newPlan;
      },
    },
    created() {
      this.checkTodayPlan();
      window.document.body.onscroll = () => {
        this.isFixedHeader = window.pageYOffset >= 80;
      }
    },
  };

  
</script>

<style>
    .event-card {
      background-color: rgb(33, 33, 47) !important;
    }
    .fixed-header .v-calendar-daily__head {
      position: fixed;
      z-index: 50;
      width: 94%;
      top: 0;
      left: 13px;
      background: rgb(33, 33, 47)
    }
    .fixed-header .v-calendar-daily__body {
      padding-top: 100px;
    }
</style>
