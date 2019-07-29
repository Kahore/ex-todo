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
  },
  MUTATE_TODO_DELETE: ( state, payload ) => {
    let idx = state.todos.findIndex( function ( block ) {
      return block.id === payload;
    } );
    if ( idx !== -1 ) {
      state.todos.splice( idx, 1 );
    }
  }
};
const actions = {
  MUTATE_TODO_NEW: ( { commit }, payload ) => {
    fetch( 'http://localhost:3010/todos', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( payload )
    } ).catch( error => console.error( error ) );
    commit( 'MUTATE_TODO_NEW', payload );
  },
  LOAD_TODO: ( { commit } ) => {
    try {
      fetch( 'http://localhost:3010/todos', {
        method: 'GET'
      } )
        .then( response => response.json() )
        .then( data => {
          commit( 'LOAD_TODO', data );
        } )
        .catch( error => console.error( error ) );
    } catch ( error ) {
      console.error( error );
    }
  },
  MUTATE_TODO_MARK: ( { commit }, payload ) => {
    fetch( 'http://localhost:3010/todos/' + payload.id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( payload )
    } );
    commit( 'MUTATE_TODO_MARK', payload );
  },
  MUTATE_TODO_DELETE: ( { commit }, payload ) => {
    fetch( 'http://localhost:3010/todos/' + payload, {
      method: 'DELETE'
    } );
    commit( 'MUTATE_TODO_DELETE', payload );
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
