import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import FilterTodo from '@/components/Filter.vue';

const localVue = createLocalVue();
localVue.use( Vuex );

let store;
let getters;
let actions;
let mutations;
beforeEach( () => {
  getters = {
    GET_TODO_FILTER: () => 'all'
  };
  mutations = {
    MUTATE_TODO_FILTER: jest.fn()
  };
  actions = {
    LOAD_TODO: jest.fn()
  };
  store = new Vuex.Store( { getters, mutations, actions } );
} );

describe( 'Filter.vue', () => {
  it( 'renders a values from getters', () => {
    const wrapper = shallowMount( FilterTodo, {
      store,
      localVue,
      attachToDocument: true
    } );
    expect( wrapper.find( '.active' ).text() ).toEqual( 'All' );
    wrapper.destroy();
  } );
  it( 'should rise filterIt meth when click on filter button', () => {
    const wrapper = shallowMount( FilterTodo, {
      store,
      localVue,
      attachToDocument: true
    } );
    let filterIt = jest.fn();
    wrapper.setMethods( { filterIt: filterIt } );
    wrapper.find( '.filter-item' ).trigger( 'click' );
    expect( filterIt ).toHaveBeenCalledWith( 'all' );
    wrapper.destroy();
  } );
  it( 'should rise LOAD_TODO with passing argument as filtedBy value', () => {
    const wrapper = shallowMount( FilterTodo, {
      store,
      localVue,
      attachToDocument: true
    } );
    wrapper.find( '.filter-item' ).trigger( 'click' );
    expect( actions.LOAD_TODO.mock.calls ).toHaveLength( 1 );
    expect( actions.LOAD_TODO.mock.calls[0][1] ).toEqual( 'all' );
    wrapper.destroy();
  } );
} );
