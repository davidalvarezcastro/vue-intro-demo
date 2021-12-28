<template>
  <div class="user">
    This is a User Component
    <div class="card">
      <h1>{{ fullName }}</h1>
      <h1>{{ country }}</h1>
      <h1>{{ age }} <span v-if="isYoung"> (TEEN) </span></h1>
    </div>
  </div>
</template>

<script>
import {
  computed
} from 'vue'

export default {
  name: 'User',
  props: {
    name: String,
    surname: String,
    country: String,
    age: Number
  },

  setup(props) {
    const fullName = computed(() => `${props.name} ${props.surname}`);

    const isYoung = computed(() => props.age <= 18 );

    // return
    return {
      isYoung,
      fullName
    }
  }
}
</script>

<style scoped>
.user {
  border: 1px solid black;
  margin: 15px 0;
}

.user .card {
  display: flex;
  justify-content: space-between;
  padding: 25px;
}
</style>