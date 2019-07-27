<template>
  <section>
    <form @submit.prevent="addTodo">
      <input
        type="text"
        name="title"
        required
        v-model="title">
      <input
        type="date"
        name="dateExp"
        required
        v-model="dateExp">
      <input
        type="submit"
        value="Submit"
        class="btn">
    </form>
  </section>
</template>

<script>
export default {
  methods: {
    addTodo () {
      const newTodo = {
        id: '',
        title: this.title,
        dateExp: this.dateExp,
        completed: false
      };
      console.log( 'TCL: addTodo -> newTodo', newTodo );

    // this.$emit( 'add-todo', newTodo );
    // this.title = '';
    },
    _generateUNID() {
      return ( [1e7]+-1e3+-4e3+-8e3+-1e11 ).replace( /[018]/g,c=>( c^crypto.getRandomValues( new Uint8Array( 1 ) )[0]&15 >> c/4 ).toString( 16 ) );
    }
  }
};
</script>

<style scoped>
  form {
    display: flex;
  }
  input[type="text"] {
    flex: 10;
    padding: 5px;
  }
  input[type="submit"] {
    flex: 2;
  }
</style>
