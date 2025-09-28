import { useRef, useState } from 'react'
import { ACTIONS } from '../App.jsx'
import './todo.css'

function Todo({dispatch, todo}){
    
    const [editState, changeEditState] = useState(false)
    const newTodo = useRef()

    function close(){
       changeEditState(false)
    }

    function updateContent(id){
        dispatch({type:ACTIONS.UPDATE, payload:{id:id, content:newTodo.current.value}})
        changeEditState(false)
    }

    if(!editState)

    return (
        
        <>
            <div className='content-div' key={todo.id} style={{backgroundColor:todo.isCompleted?'#e68c50':'rgb(211, 234, 218)'}} >
                <input type="checkbox" checked={todo.isCompleted} onChange={e=>dispatch({type:ACTIONS.TOGGLE, payload:{id:todo.id}})} className='toggle' />
                    <h2 style={{textDecoration : todo.isCompleted ? 'line-through' : 'none'}} >{todo.content}</h2>
                    <div className='delete-edit-div'>
                        <button className='edit' onClick={e=>changeEditState(true)} disabled={todo.isCompleted} style={{cursor:todo.isCompleted?'not-allowed':'pointer'}} >Edit</button>
                        <button className='delete' onClick={e=>dispatch({type:ACTIONS.DELETE, payload:{id:todo.id}})} >Delete</button>
                    </div>
            </div>
        </>
        
    ) 
    else {
        return (
            <>
                <div className='content-div-toggle' key={todo.id} >
                    <span className="material-symbols-outlined" onClick={close}>close_small</span>
                    <textarea className='textArea' ref={newTodo}>{todo.content}</textarea>
                    <button onClick={e => updateContent(todo.id)} id='saveButton'>Update</button>
                </div>
            </>
        )
    }
}

export default Todo