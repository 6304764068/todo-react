import { useReducer, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Todo from './components/todo'

export const ACTIONS = {
  ADD: 'add',
  TOGGLE: 'toggle',
  DELETE: 'delete',
  UPDATE: 'update'
}

const initialState = [
  // {
  //   id: 1,
  //   content: 'Clean the house Clean the house Clean the house Clean the house Clean the house Clean the house Clean the house Clean the house Clean the house Clean the house Clean the house Clean the house Clean the house Clean the house Clean the house',
  //   isCompleted: false
  // },
  // {
  //   id: 2,
  //   content: 'Cooking',
  //   isCompleted: true
  // }
]

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD:
      if(action.payload.content.trim()!=''){
        return [...state, { id: Date.now(), content: action.payload.content, isCompleted: false }]
      }
    case ACTIONS.TOGGLE:
      return state.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, isCompleted: !todo.isCompleted }
        }
        else {
          return todo
        }
      })
    case ACTIONS.DELETE:
      return state.filter(todo => todo.id != action.payload.id)
    case ACTIONS.EDIT:
      return state.map(todo => {
        if (todo.id == action.payload.id) {
          return { ...todo, content: action.payload.content }
        }
        else {
          return todo
        }
      })
    case ACTIONS.UPDATE:
      return state.map(todo=>{
        if(todo.id==action.payload.id && action.payload.content.trim()!=''){
          return {...todo, content:action.payload.content}
        }
        else{
          return todo
        }
      })
    default:
      return state;
  }
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)
  const todoInput = useRef();


  function handleSubmit(e) {
    e.preventDefault();
    const text = todoInput.current.value;
    todoInput.current.value = ''
    return dispatch({
      type: ACTIONS.ADD,
      payload: { content: text }
    })
  }

  return (
    <>
      <div id='container'>

        <form action="" id='form' onSubmit={handleSubmit} >
          <input type="text" ref={todoInput} id="input" placeholder='TODO..' />
          <input type="submit" value='Add' id='addButton' />
        </form>

        <div id='todo-content-div'>
          {state.map(todo => (
            <Todo key={todo.id} dispatch={dispatch} todo={todo} />
          ))}
        </div>

      </div>
    </>
  )
}

export default App
