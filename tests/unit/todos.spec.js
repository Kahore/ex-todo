import todos from '../../src/store/modules/todos';
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use( Vuex );
/*
 ! w/t 2 line below  ReferenceError: fetch is not defined on testin actions
 */
const fetch = require( 'jest-fetch-mock' );
jest.setMock( 'node-fetch', fetch );

let store;
beforeEach( () => {
  store = new Vuex.Store( {
    state: {
      todos: [
        {
          'id': '098cf784-e75a-4d1d-b64e-d6b4fb2f3ae6',
          'title': 'my first todo',
          'dateExp': '2019-07-27',
          'completed': false
        }
      ]
    },
    mutations: {
      MUTATE_TODO_NEW: todos.mutations.MUTATE_TODO_NEW
    },
    actions: {
      MUTATE_TODO_NEW: todos.actions.MUTATE_TODO_NEW
    }
  } );
} );

describe( 'modules/todos.js getters', () => {
  it( 'should return Array of todos', () => {
    expect( todos.getters.GET_TODOS( store.state ) ).toBe( store.state.todos );
  } );
} );

const newTodos = {
  'id': '128cf784-e75a-4d1d-b64e-d6b4fb2f3bf1',
  'title': 'my new todo',
  'dateExp': '2019-07-27',
  'completed': false
};

describe( 'modules/todos.js mutations', () => {
  it( 'should push new todo to todos', () => {
    todos.mutations.MUTATE_TODO_NEW( store.state, newTodos );
    expect( store.state.todos ).toHaveLength( 2 );
  } );
} );

describe( 'modules/todos.js actions', () => {
  it( 'test MUTATE_TODO_NEW using a mock mutation but real store', () => {
    // TODO: check url
    const commit = jest.fn();
    todos.actions.MUTATE_TODO_NEW( { commit }, newTodos );
    expect( commit ).toHaveBeenCalledWith( 'MUTATE_TODO_NEW', newTodos );
  } );
} );
