import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import TodoList from '@/components/TodoList.vue';

const localVue = createLocalVue();
localVue.use( Vuex );
const fakeData = {
  id: '098cf784-e75a-4d1d-b64e-d6b4fb2f3a88',
  title: 'my first todo',
  dateExp: '2019-07-27',
  completed: true
};
describe( 'TodoList.vue', () => {
  let editTodo = jest.fn();
  let store;
  let getters;
  let actions;
  let mutations;
  beforeEach( () => {
    getters = {
      GET_TODOS: () => [
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
      ],
      GET_TODO_COMPLETED: () => ['098cf784-e75a-4d1d-b64e-d6b4fb2f3a77']
    };
    mutations = {
      MUTATE_TODO_MARK: jest.fn(),
      MUTATE_TODO_EDIT: jest.fn(),
      MUTATE_TODO_DELETE: jest.fn()
    };
    actions = {
      LOAD_TODO: jest.fn(),
      MUTATE_TODO_MARK: jest.fn(),
      MUTATE_TODO_EDIT: jest.fn(),
      MUTATE_TODO_DELETE: jest.fn()
    };
    store = new Vuex.Store( { getters, mutations, actions } );
  } );

  it( 'renders a values from getters', () => {
    const wrapper = shallowMount( TodoList, {
      store,
      localVue,
      attachToDocument: true
    } );
    expect( wrapper.findAll( '.todos-list__block' ).length ).toBe( 2 );
    wrapper.destroy();
  } );
  it( 'should rise markComplete meth when click on checkbox', () => {
    const wrapper = shallowMount( TodoList, {
      store,
      localVue,
      attachToDocument: true
    } );
    let markComplete = jest.fn();
    wrapper.setMethods( { markComplete: markComplete } );
    wrapper.find( '[type=\'checkbox\']' ).trigger( 'click' );
    expect( markComplete ).toHaveBeenCalledWith( fakeData );
    wrapper.destroy();
  } );
  it( 'should reverse completed on markComplete meth ', () => {
    const wrapper = shallowMount( TodoList, {
      store,
      localVue,
      attachToDocument: true
    } );
    wrapper.find( '[type=\'checkbox\']' ).trigger( 'click' );
    expect( actions.MUTATE_TODO_MARK ).toBeCalled();
    expect( actions.MUTATE_TODO_MARK.mock.calls ).toHaveLength( 1 );
    expect( actions.MUTATE_TODO_MARK.mock.calls[0][1] ).toEqual( {
      id: '098cf784-e75a-4d1d-b64e-d6b4fb2f3a88',
      title: 'my first todo',
      dateExp: '2019-07-27',
      completed: false
    } );
    wrapper.destroy();
  } );
  it( 'should rise delTodo meth when click on delete btn', () => {
    const wrapper = shallowMount( TodoList, {
      store,
      localVue,
      attachToDocument: true
    } );
    wrapper.find( '.btn-del' ).trigger( 'click' );
    expect( wrapper.emitted( 'delTodo' ) );
    wrapper.destroy();
  } );
  it( 'should rise editTodo on todos-list__block_view', () => {
    const wrapper = shallowMount( TodoList, {
      store,
      localVue,
      attachToDocument: true
    } );
    wrapper.setMethods( { editTodo: editTodo } );
    // wrapper.setData( { editedTodo: fakeData, tmpTitle: '', tmpDateExp: '' } );
    wrapper.find( '.todos-list__block_view' ).trigger( 'dblclick' );
    expect( editTodo ).toHaveBeenCalledWith( fakeData );
    // expect( editedTodo ).toEqual( fakeData );

    wrapper.destroy();
  } );
  it( 'should rise editDone on blur event in edit mode ', () => {
    const wrapper = shallowMount( TodoList, {
      store,
      localVue,
      attachToDocument: true
    } );
    let editDone = jest.fn();
    let editTodo = jest.fn();
    wrapper.setMethods( { editTodo: editTodo, editDone: editDone } );
    wrapper.find( '.todos-list__block_view' ).trigger( 'dblclick' );
    const childInput = wrapper.find( '#editTitle' );

    childInput.trigger( 'click' );
    expect( editTodo ).toHaveBeenCalledWith( fakeData );
    childInput.trigger( 'blur' );
    expect( wrapper.vm.editedTodo ).toBe( null );
    expect( editDone ).toBeCalled();
    wrapper.destroy();
  } );
  it( 'should rise editDone on enter key in edit mode ', () => {
    let editDone = jest.fn();

    const wrapper = shallowMount( TodoList, {
      store,
      localVue,
      attachToDocument: true
    } );
    wrapper.setMethods( { editDone: editDone } );
    wrapper.find( '.todos-list__block_view' ).trigger( 'dblclick' );
    const childInput = wrapper.find( '#editTitle' );

    childInput.trigger( 'click' );
    childInput.trigger( 'keyup.enter' );
    expect( editDone ).toBeCalled();
    expect( wrapper.emitted( 'MUTATE_TODO_EDIT' ) );
    wrapper.destroy();
  } );

  it( 'should reset editedTodo on editDone', () => {
    const wrapper = shallowMount( TodoList, {
      store,
      localVue,
      attachToDocument: true
    } );
    const childInput = wrapper.find( '#editTitle' );
    childInput.trigger( 'click' );
    childInput.trigger( 'keyup.enter' );
    expect( wrapper.vm.editedTodo ).toBe( null );
    wrapper.destroy();
  } );

  it( 'should rise editCancel on 27(esc) key in edit mode ', () => {
    const wrapper = shallowMount( TodoList, {
      store,
      localVue,
      attachToDocument: true
    } );
    let editCancel = jest.fn();
    let editTodo = jest.fn();
    wrapper.setMethods( { editTodo: editTodo, editCancel: editCancel } );
    wrapper.find( '.todos-list__block_view' ).trigger( 'dblclick' );
    expect( editTodo ).toHaveBeenCalledWith( fakeData );

    const childInput = wrapper.find( '#editTitle' );
    childInput.trigger( 'click' );
    childInput.trigger( 'keyup.esc' );
    expect( editCancel ).toHaveBeenCalledWith( fakeData );
    wrapper.destroy();
  } );
  it( 'should reset data on esc click ', () => {
    const wrapper = shallowMount( TodoList, {
      store,
      localVue,
      attachToDocument: true
    } );
    wrapper.setData( {
      editedTodo: fakeData,
      tmpTitle: fakeData.title,
      tmpDateExp: fakeData.dateExp
    } );
    wrapper.find( '.todos-list__block_view' ).trigger( 'click' );

    const childInput = wrapper.find( '#editTitle' );
    childInput.trigger( 'click' );
    childInput.trigger( 'keyup.esc' );
    expect( wrapper.vm.tmpTitle ).toEqual( fakeData.title );
    expect( wrapper.vm.tmpDateExp ).toEqual( fakeData.dateExp );
    expect( wrapper.vm.editedTodo ).toBe( null );
    wrapper.destroy();
  } );
} );
