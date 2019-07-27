const state = () => ( {
  todos: []
} );
const getters = {
  GET_TODOS: state => {
    return state.todos;
  }
};
const mutations = {
  MUTATE_TODO_NEW: ( state, payload ) => {
    state.todos.push( payload );
  }
};
const actions = {
  MUTATE_TODO_NEW: ( { commit }, payload ) => {
    fetch( 'http://localhost:3000/todos1', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( payload )
    } );
    commit( 'MUTATE_TODO_NEW', payload );
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
