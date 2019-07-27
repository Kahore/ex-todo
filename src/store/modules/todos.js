const state = () => ( {
  todos: [],
  todosCompleted: []
} );
const getters = {
  GET_TODOS: state => {
    return state.todos;
  },
  GET_TODO_COMPLETED: state => {
    return state.todosCompleted;
  }
};
const mutations = {
  MUTATE_TODO_NEW: ( state, payload ) => {
    state.todos.push( payload );
  },
  LOAD_TODO: ( state, payload ) => {
    state.todos = payload;
    for ( let i = 0; i < payload.length; i++ ) {
      if ( payload[i].completed ) {
        state.todosCompleted.push( payload[i].id );
      }
    }
  },
  MUTATE_TODO_MARK: ( state, payload ) => {
    let idx = state.todosCompleted.indexOf( payload.id );
    if ( idx === -1 ) {
      state.todosCompleted.push( payload.id );
    } else {
      state.todosCompleted.splice( idx, 1 );
    }
  }

};
const actions = {
  MUTATE_TODO_NEW: ( { commit }, payload ) => {
    fetch( 'http://localhost:3000/todos', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( payload )
    } );
    commit( 'MUTATE_TODO_NEW', payload );
  },
  LOAD_TODO: ( { commit } ) => {
    fetch( 'http://localhost:3000/todos', {
      method: 'GET'
    } ).then( response => response.json() ).then( data => {
      commit( 'LOAD_TODO', data );
    } ).catch( error => console.error( error ) ); ;
  },
  MUTATE_TODO_MARK: ( { commit }, payload ) => {
    fetch( 'http://localhost:3000/todos/' + payload.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( payload )
    } );
    commit( 'MUTATE_TODO_MARK', payload );
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
