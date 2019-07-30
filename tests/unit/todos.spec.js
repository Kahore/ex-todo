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
      todos: [],
      todosCompleted: [],
      filterBy: 'all'
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
  it( 'should return Array of cpl todos', () => {
    expect( todos.getters.GET_TODO_COMPLETED( store.state ) ).toBe(
      store.state.todosCompleted
    );
  } );
  it( 'should return String of current filter', () => {
    expect( todos.getters.GET_TODO_FILTER( store.state ) ).toBe( store.state.filterBy );
  } );
} );

const newTodos = {
  id: '128cf784-e75a-4d1d-b64e-d6b4fb2f3bf1',
  title: 'my new todo',
  dateExp: '2019-07-27',
  completed: false
};
const TODOS_LOAD = [
  {
    id: '098cf784-e75a-4d1d-b64e-d6b4fb2f3a88',
    title: 'my first todo',
    dateExp: '2019-07-27',
    completed: true
  },
  {
    id: '098cf784-e75a-4d1d-b64e-d6b4fb2f3a77',
    title: 'my first todo',
    dateExp: '2019-07-27',
    completed: false
  }
];
const TODOS_LOAD_EMPTY = [];
describe( 'modules/todos.js mutations', () => {
  it( 'should push new todo to todos', () => {
    todos.mutations.MUTATE_TODO_NEW( store.state, newTodos );
    expect( store.state.todos ).toHaveLength( 1 );
  } );
  it( 'should push all received todo to todos', () => {
    todos.mutations.LOAD_TODO( store.state, TODOS_LOAD );
    expect( store.state.todos ).toHaveLength( TODOS_LOAD.length );
  } );
  it( 'should pass if there is no todos', () => {
    todos.mutations.LOAD_TODO( store.state, TODOS_LOAD_EMPTY );
    expect( store.state.todos ).toHaveLength( TODOS_LOAD_EMPTY.length );
  } );
  it( 'should push todo to todosCompleted if cmpl is true', () => {
    todos.mutations.LOAD_TODO( store.state, TODOS_LOAD );
    expect( store.state.todosCompleted ).toHaveLength( 1 );
  } );
  it( 'should remove todo from to todosCompleted if cmpl is false', () => {
    newTodos.completed = true;
    todos.mutations.MUTATE_TODO_MARK( store.state, newTodos );
    expect( store.state.todosCompleted ).toHaveLength( 1 );

    newTodos.completed = false;
    todos.mutations.MUTATE_TODO_MARK( store.state, newTodos );
    expect( store.state.todosCompleted ).toHaveLength( 0 );
  } );
  it( 'should push todo to todosCompleted if cmpl is true', () => {
    todos.mutations.MUTATE_TODO_FILTER( store.state, 'completed' );
    expect( store.state.filterBy ).toBe( 'completed' );
  } );

  it( 'should update todo to todos', () => {
    todos.mutations.MUTATE_TODO_EDIT( store.state, {
      id: '098cf784-e75a-4d1d-b64e-d6b4fb2f3a77',
      title: 'my edited first todo',
      dateExp: '2019-07-27',
      completed: false
    } );
    expect( store.state.todos ).toHaveLength( 1 );
  } );
  it( 'should remove todo from to todos', () => {
    todos.mutations.LOAD_TODO( store.state, TODOS_LOAD );
    todos.mutations.MUTATE_TODO_DELETE(
      store.state,
      '098cf784-e75a-4d1d-b64e-d6b4fb2f3a77'
    );
    expect( store.state.todos ).toHaveLength( 1 );
  } );
} );

describe( 'modules/todos.js actions', () => {
  it( 'test MUTATE_TODO_NEW using a mock mutation but real store', () => {
    let commit = jest.fn();
    // TODO: check url
    todos.actions.MUTATE_TODO_NEW( { commit }, newTodos );
    expect( commit ).toHaveBeenCalledWith( 'MUTATE_TODO_NEW', newTodos );
  } );

  it( 'calls fetch with correct url', () => {
    // const fakeFetch = url => {
    //   expect( url ).toBe( 'http://localhost:3010/todos' );
    //   return new Promise( function ( resolve ) {
    //   } );
    // };
    // // model.fetchResponse( fakeFetch, '84102' );
  } );
  // it( 'test LOAD_TODO using a mock mutation but real store', () => {
  //   // TODO: check url
  //   let _commit = jest.fn();
  //   todos.actions.LOAD_TODO( { _commit } );
  //   expect( _commit ).toHaveBeenCalledWith( 'LOAD_TODO', TODOS_LOAD );
  // } );
  it( 'test MUTATE_TODO_MARK using a mock mutation but real store', () => {
    let commit = jest.fn();
    // TODO: check url
    todos.actions.MUTATE_TODO_MARK( { commit }, newTodos );
    expect( commit ).toHaveBeenCalledWith( 'MUTATE_TODO_MARK', newTodos );
  } );
  it( 'test MUTATE_TODO_EDIT using a mock mutation but real store', () => {
    let commit = jest.fn();
    // TODO: check url
    todos.actions.MUTATE_TODO_EDIT( { commit }, newTodos );
    expect( commit ).toHaveBeenCalledWith( 'MUTATE_TODO_EDIT', newTodos );
  } );
  it( 'test MUTATE_TODO_DELETE using a mock mutation but real store', () => {
    let commit = jest.fn();
    // TODO: check url
    todos.actions.MUTATE_TODO_DELETE( { commit }, newTodos.id );
    expect( commit ).toHaveBeenCalledWith( 'MUTATE_TODO_DELETE', newTodos.id );
  } );
} );
