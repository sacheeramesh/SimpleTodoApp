import React from 'react';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ListTodos(props) {
    const toDos = props.todos;
    const comTodos = props.completeds;
    const list  = toDos.map(item=> {
        return <li className = "activeList list-group-item text-capitalized d-flex justify-content-between h-25 " key = {item.key}>
            <input type="text" className="form-control form-control-sm border-0 text-primary"
                id={item.key} 
                value={item.text}
                onChange={
                    (e) => {
                        props.setUpdate(e.target.value, item.key)
                    }
                }
            />
            <div className="col-2">
                <span className="text-success mr-2">
                    <FontAwesomeIcon className="faicons" 
                    icon='check' 
                    onClick={ () => props.checkTodo(item.key,item.text) }/>
                </span>
                <span>
                    <FontAwesomeIcon className=" text-danger" 
                    icon='times' 
                    onClick={ () => props.deleteTodo(item.key) 
                    }/>
                </span>
            </div>
        </li>
    })

    const comlist  = comTodos.map(citem=> {
        return <li className = "completedList list-group-item text-capitalized d-flex justify-content-between text-muted" key = {citem.key}>
            <s>
                <i>{citem.text}</i>
            </s>
            <div className="col-2">
                
                <span>
                    <FontAwesomeIcon className=" text-danger" 
                    icon='times' 
                    onClick={ () => props.deleteComTodo(citem.key) 
                    }/>
                </span>
            </div>
            
        </li>
    })
    return (
    <div>{list}<br/>{comlist}</div>
    
    )
}

export default ListTodos;