import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import TodoList from '@/components/TodoList.vue';

const localVue = createLocalVue();
localVue.use( Vuex );

describe( 'TodoList.vue', () => {
  let store;
  let getters;
  let actions;
  beforeEach( () => {
    getters = {
      GET_TODOS: () => [
        {
          'id': '098cf784-e75a-4d1d-b64e-d6b4fb2f3a88',
          'title': 'my first todo',
          'dateExp': '2019-07-27',
          'completed': true
        },
        {
          'id': '098cf784-e75a-4d1d-b64e-d6b4fb2f3a77',
          'title': 'my first todo',
          'dateExp': '2019-07-27',
          'completed': false
        }
      ]
    };
    actions = {
      LOAD_TODO: jest.fn(),
      MUTATE_TODO_MARK: jest.fn()
    };
    store = new Vuex.Store( { getters, actions } );
  } );

  it( 'renders a values from getters', () => {
    const wrapper = shallowMount( TodoList, {
      store,
      localVue,
      attachToDocument: true
    } );
    expect( wrapper.findAll( '.todos-list_block' ).length ).toBe( 2 );
    wrapper.destroy();
  } );
  it( 'should rise markComplete meth when click on checkbox', () => {
    const wrapper = shallowMount( TodoList, {
      store,
      localVue,
      attachToDocument: true
    } );
    wrapper.find( '[type=\'checkbox\']' ).trigger( 'click' );
    expect( wrapper.emitted( 'markComplete' ) );
    wrapper.destroy();
  } );
} );
