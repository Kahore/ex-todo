<template>
  <div class="todos-list">
    <div
      v-for="(todo, id ) in todos"
      :key="id">
      <div :id="todo.id" class ="todos-list_block">
        <input
          type="checkbox"
          :value="todo.id"
          @change="markComplete( todo )"
          v-model="completedTODO"
         >
        <span>
          {{ todo.title }}
        </span>
        <span>
          {{ todo.dateExp }}
        </span>
        <button
          class="del"
          @click="delTodo(todo.id)">x
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  methods: {
    markComplete ( todo ) {
      todo.completed = !todo.completed;
      this.$store.dispatch( 'MUTATE_TODO_MARK', todo );
    },
    delTodo ( todoId ) {
      console.log( 'TCL: delTodo -> todoId', todoId );
    }
  },
  computed: {
    todos () {
      return this.$store.getters.GET_TODOS;
    },
    completedTODO: {
      get: function () {
        return this.$store.getters.GET_TODO_COMPLETED;
      },
      set: function ( value ) {
        this.$emit( 'input', value );
      }
    }
  },
  created () {
    this.$store.dispatch( 'LOAD_TODO' );
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
