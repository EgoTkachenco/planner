<template>
  <router-link :to="{ path: `/project/${id}` }" tag="div" class="list-card my-2 p-2">
    <div class="d-flex align-items-center">
      <span class="h4">{{project.title}}</span>
    </div>
  </router-link>
</template>

<script>
  export default {
    props: ['project', 'id'],
  };
</script>

<style scoped>
  .list-card {
    background: rgb(36, 35, 51);
    border-radius: 10px;
    text-align: start;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .text-field:disabled {
    font-size: 1.5rem;
  }
</style>
