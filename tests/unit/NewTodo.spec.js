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

  it( 'should rise addTodo on submit', () => {
    const wrapper = shallowMount( NewTodo, {
      store,
      localVue,
      attachToDocument: true
    } );
    let addTodo = jest.fn();
    wrapper.setData( { title: 'test title', dateExp: '2019-07-30' } );
    wrapper.setMethods( { addTodo: addTodo } );
    wrapper.find( '[type=\'submit\']' ).trigger( 'click' );
    expect( addTodo ).toBeCalled( );
    wrapper.destroy();
  } );
  it( 'should rise MUTATE_TODO_NEW on submit', () => {
    const wrapper = shallowMount( NewTodo, {
      store,
      localVue,
      attachToDocument: true
    } );
    wrapper.setData( { title: 'test title', dateExp: '2019-07-30' } );
    wrapper.find( '[type=\'submit\']' ).trigger( 'click' );
    expect( actions.MUTATE_TODO_NEW ).toBeCalled();
    expect( actions.MUTATE_TODO_NEW.mock.calls[0][1] ).toEqual( expect.objectContaining( {
      id: expect.any( String ),
      title: expect.any( String ),
      dateExp: expect.any( String ),
      completed: expect.any( Boolean )
    } ) );
    wrapper.destroy();
  } );
  it( 'should reset form after submit', () => {
    const wrapper = shallowMount( NewTodo, {
      store,
      localVue,
      attachToDocument: true
    } );
    wrapper.find( '[type=\'submit\']' ).trigger( 'click' );
    expect( wrapper.find( '#title' ).text() ).toBe( '' );
    expect( wrapper.vm.title ).toBe( '' );
    expect( wrapper.vm.dateExp ).toBe( '' );
    wrapper.destroy();
  } );

  it( 'should generate unid', () => {
    const wrapper = shallowMount( NewTodo, {
      store,
      localVue,
      attachToDocument: true
    } );
    let res = wrapper.vm._generateUNID();
    expect( res ).toHaveLength( 36 );
    wrapper.destroy();
  } );
  /*
  ! MEMO: Remove the DOM node from the document to avoid a memory leak.
  */
} );
