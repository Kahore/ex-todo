<template>
  <section>
    <form @submit.prevent="addTodo">
      <input type="text" id="title" name="title" reequired v-model.trim="title" autocomplete="off" />
      <input type="date" id="dateExp" name="dateExp" required v-model="dateExp" />
      <input type="submit" value="Submit" class="btn" />
    </form>
  </section>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      dateExp: ''
    };
  },
  methods: {
    addTodo () {
      const newTodo = {
        id: this._generateUNID(),
        title: this.title,
        dateExp: this.dateExp,
        completed: false,
      };
      this.$store.dispatch( 'MUTATE_TODO_NEW', newTodo );
      this.title = '';
      this.dateExp = '';
    },
    _generateUNID () {
      /* eslint-disable-next-line */
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (
          c ^
          ( crypto.getRandomValues( new Uint8Array( 1 ) )[0] & ( 15 >> ( c / 4 ) ) )
        ).toString( 16 )
      );
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
@media screen and (max-width: 375px) {
  form {
    display: grid;
    padding-bottom: 10px;
  }
}
</style>
