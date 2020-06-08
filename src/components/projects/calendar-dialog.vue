<template>
  <div class="dialog-overlay" v-if="show">
    <div class="dialog-card p-3 mx-1" style="max-width: 80%">
      <div class="close-btn" @click="close">+</div>
      <v-sheet tile height="54" color="grey lighten-3" class="d-flex mt-5">
        <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-select
          v-model="type"
          :items="types"
          dense
          outlined
          hide-details
          class="ma-2"
          label="type"
        ></v-select>
        <v-spacer></v-spacer>
        <v-btn icon class="ma-2" @click="$refs.calendar.next()">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-sheet>
      <v-sheet height="500">
        <v-calendar
          ref="calendar"
          v-model="value"
          :type="type"
          :events="events"
          event-overlap-mode="column"
          :event-overlap-threshold="30"
          :event-color="getEventColor"
        ></v-calendar>
      </v-sheet>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['show', 'tasks'],
    data: () => ({
      type: 'month',
      types: ['month', 'week', 'day'],
      value: '',

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
      isFixedHeader: false,
    }),

    computed: {
      today() {
        return new Date().toISOString().slice(0, 10);
      },
      events: {
        get() {
          let list = [];
          if (this.tasks) {
            for (const key in this.tasks) {
              const task = this.tasks[key];
              if (task.dueDate)
                list.push({
									name: task.text,
									color: this.colors[this.rnd(0, this.colors.length - 1)],
                  start: new Date(task.dueDate).toISOString().slice(0, 10),
                });
            }
          }
          return list;
        },
        set(value) {
          this.$store.dispatch('savePlan', value);
        },
      },
    },
    methods: {
			rnd(a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a;
      },
      close() {
        this.$emit('close');
      },
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
      //   showEvent({ nativeEvent, event }) {
      //     const open = () => {
      //       this.selectedEvent = Object.assign({}, event);
      //       this.selectedElement = nativeEvent.target;
      //       setTimeout(() => (this.selectedOpen = true), 10);
      //     };

      //     if (this.selectedOpen) {
      //       this.selectedOpen = false;
      //       setTimeout(open, 10);
      //     } else {
      //       open();
      //     }

      //     nativeEvent.stopPropagation();
      //   },
      //   save() {
      //     this.selectedEvent[this.editedField] =
      //       this.selectedEvent[this.editedField].slice(0, 10) + ' ' + this.time;

      //     this.showTimeDialog = false;
      //     this.editedField = null;
      //     this.time = null;
      //   },
      //   editTime(field) {
      //     this.time = this.getTime(this.selectedEvent[field]);
      //     this.showTimeDialog = true;
      //     this.editedField = field;
      //   },
      //   getTime(date) {
      //     let time;
      //     if (date.length < 11) {
      //       time = '00:00';
      //     } else {
      //       time = date.slice(11);
      //     }
      //     return time;
      //   },
      //   initDayPlan() {
      //     let list = this.$store.state.todo.todayTasks;
      //     let result = [];
      //     for (const group in list) {
      //       if (list[group].tasks && list[group].tasks.length > 0) {
      //         for (const task in list[group].tasks) {
      //           let taskItem = list[group].tasks[task];
      //           let listItem = {
      //             name: taskItem.text,
      //             start: taskItem.dueDate,
      //             end: taskItem.dueDate,
      //             color: this.getColor(),
      //             details: '',
      //           };
      //           result.push(listItem);
      //         }
      //       }
      //     }
      //     this.$store.dispatch('savePlan', {
      //       date: new Date().toISOString().slice(0, 10),
      //       tasks: result,
      //     });
      //   },
      //   checkTodayPlan() {
      //     let list = this.$store.state.todo.todayTasks;
      //     let result = [];
      //     for (const group in list) {
      //       if (list[group].tasks && list[group].tasks.length > 0) {
      //         for (const task in list[group].tasks) {
      //           let taskItem = list[group].tasks[task];
      //           let isNew = true;
      //           for (const key in this.todayPlan.tasks) {
      //             if (this.todayPlan.tasks[key].name === taskItem.text) {
      //               result.push(this.todayPlan.tasks[key]);
      //               isNew = false;
      //             }
      //           }
      //           if (isNew) {
      //             let listItem = {
      //               name: taskItem.text,
      //               start: taskItem.dueDate,
      //               end: taskItem.dueDate,
      //               color: this.getColor(),
      //               details: '',
      //             };
      //             result.push(listItem);
      //           }
      //         }
      //       }
      //     }
      //     this.$store.dispatch('savePlan', {
      //       date: new Date().toISOString().slice(0, 10),
      //       tasks: result,
      //     });
      //   },
      //   editPlan() {
      //     let newPlan = Object.assign({}, this.todayPlan);
      //     for (const task in newPlan.tasks) {
      //       if (newPlan.tasks[task].name === this.selectedEvent.name) {
      //         newPlan.tasks[task] = this.selectedEvent;
      //       }
      //     }
      //     this.selectedOpen = false;
      //     this.todayPlan = newPlan;
      //   },
    },
    created() {
      window.document.body.onscroll = () => {
        this.isFixedHeader = window.pageYOffset >= 80;
      };
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
    background: rgb(33, 33, 47);
  }
  .fixed-header .v-calendar-daily__body {
    padding-top: 100px;
  }
</style>
