import { shallowMount } from '@vue/test-utils';
import NewTodo from '@/components/NewTodo.vue';
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
  const wrapper = shallowMount( NewTodo, {
    attachToDocument: true
  } );
  it( 'should rise addTodo on submit', () => {
    wrapper.find( '[type=\'submit\']' ).trigger( 'click' );
    expect( wrapper.emitted( 'addTodo' ) );
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
