import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import NewTodo from '@/components/NewTodo.vue';

const localVue = createLocalVue();
localVue.use( Vuex );
/*
 * allow Jest to access window.crypto
 */
const crypto = require( 'crypto' );
Object.defineProperty( global.self, 'crypto', {
  value: {
    getRandomValues: arr => crypto.randomBytes( arr.length )
  }
} );

describe( 'NewTodo.vue', () => {
  let store;
  // let getters;
  let actions;
  beforeEach( () => {
    // getters = {
    //   GET_ERROR: () => 'error_msg'
    // };
    actions = {
      MUTATE_TODO_NEW: jest.fn()
    };
    store = new Vuex.Store( { actions } );
  } );
  const wrapper = shallowMount( NewTodo, {
    store,
    localVue,
    attachToDocument: true
  } );
  it( 'should rise addTodo on submit', () => {
    wrapper.find( '[type=\'submit\']' ).trigger( 'click' );
    expect( wrapper.emitted( 'addTodo' ) );

    // expect( actions.MUTATE_TODO_NEW.mock.calls.length ).toEqual( 1 );
  } );
  it( 'should reset form after submit', () => {
    wrapper.find( '[type=\'submit\']' ).trigger( 'click' );
    expect( wrapper.find( '#title' ).text() ).toBe( '' );
  } );
  it( 'should generate unid', () => {
    let res = wrapper.vm._generateUNID();
    expect( res ).toHaveLength( 36 );
  } );
  /*
  ! MEMO: Remove the DOM node from the document to avoid a memory leak.
  */
  wrapper.destroy();
} );
