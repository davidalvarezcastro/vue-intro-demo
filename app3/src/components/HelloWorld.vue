<template>
  <div class="hello">
    <h1>PROPS</h1>
    <h5>{{ msg }}</h5>

    <h1>STATE</h1>
    <h5> {{ object }} </h5>
    <h5> {{ formattedcount }} </h5>

    <h1>METHODS</h1>
    <button @click="update">Update Time</button>
    <div>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </div>

    <h1>COMPONENTS</h1>
    <User
      v-for="(user, index) in users" :key="`user-${index}`"
      :name="user.name"
      :surname="user.surname"
      :country="user.country"
      :age="user.age"
    />

    Nº users: {{ users.length }}
    Sum ages: {{ sumAges }}
  </div>
</template>

<script>
import {
  ref, reactive, computed,
  onBeforeMount, onMounted, onBeforeUpdate,
  onUpdated, onBeforeUnmount, onUnmounted, onActivated,
  onRenderTriggered,
} from 'vue'
import User from './User.vue';
import { getUsersService } from '../services/users';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },

  components: {
    User
  },

  setup() {
    console.log('created')

    // state & methods
    let count = ref(0);
    const formattedcount = computed(() => count.value);
    const increment = () => {
      count.value++;
    };
    const decrement = () => {
      count.value--;
    };

    // ref vs reactive
    let object = reactive({
      title: 'title',
      author: 'author',
      time: (new Date()).toLocaleString()
    });
    const update = () => {
      object.time = (new Date()).toLocaleString();
    };

    // service
    let users = reactive([]); // user list from api call
    const sumAges = computed(() => {
      return users.reduce((sum, u) => {
        return sum + u.age
      }, 0)
    });

    // lyfecycle hooks
    onBeforeMount(() => {
      console.log('onBeforeMount')
    });

    onMounted(async () => {
      console.log('onMounted')

      try {
        Object.assign(users, await getUsersService());
      } catch (error) {
        console.log('error fetching data from user service ')
      }
    });

    onBeforeUpdate(() => {
      console.log('onBeforeUpdate')
    });

    onUpdated(() => {
      console.log('onUpdated')
    });

    onBeforeUnmount(() => {
      console.log('onBeforeUnmount')
    });

    onUnmounted(() => {
      console.log('onUnmounted')
    });

    onActivated(() => {
      console.log('onActivated')
    });

    onRenderTriggered(() => {
      console.log('onRenderTriggered')
    });

    // return
    return {
      users,
      sumAges,
      object,
      update,
      formattedcount,
      increment,
      decrement,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
