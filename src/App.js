import React from 'react';
import './App.css';
import ListTodos from "./listTodos.js"; //importing listTodos function from file
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faCheck, faBook, faCheckDouble, faTimes } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Particles from 'react-particles-js';


library.add(faTrash,faCheck,faBook,faTimes,faCheckDouble);

const particleOpt = {
  particles: {
    number: {
      value: 70,
      density : {
        enable: false,
        value_area:200
      }
    },
    size: {
      value: 4
    }
  },
  interactivity: {
    events: {
        onhover: {
            enable: true,
            mode: "repulse"
        }
    }
}

}


class App extends React.Component {
  constructor(props)  {
    super(props);
    this.state={
      todos:[],
      completeds:[],
      currentTodo:{
        text:'',
        key:'' ,
        completed:false
      }
    }

    this.handleInput = this.handleInput.bind(this); //binding the handleInput method to this keyword
    this.addItem = this.addItem.bind(this); //binding the addItem method to this keyword
    this.deleteTodo = this.deleteTodo.bind(this); //binding the deleteTodo method to this keyword
    this.checkTodo = this.checkTodo.bind(this); //binding the checkTodo method to this keyword
    this.setUpdate = this.setUpdate.bind(this); //binding the setUpdate method to this keyword
    this.deleteComTodo = this.deleteComTodo.bind(this); //binding the deleteComTodo method to this keyword
    }

  handleInput(e) { //get the inputs from the user
    this.setState({
      currentTodo:{
        text: e.target.value,
        key: Date.now(),
        completed:false
      }
    })
  }

  addItem(e) {
    e.preventDefault(); //stop the page refresh on button click
    const newTodo = this.state.currentTodo;
    if(newTodo.text !== "") {
      const newTodos = [...this.state.todos, newTodo];
      this.setState({
        todos:newTodos,
        currentTodo: {
          text:'',
          key:'',
          completed:false
        }
      })
    }
  }

  deleteTodo(key) {
    const filteredTodos = this.state.todos.filter(todo =>
      todo.key !== key );
    this.setState({
      todos:filteredTodos
    })
  }

  checkTodo(key) {
    const compltedTodo = this.state.todos.map(todo => {
      if(todo.key === key){
        
          const currentTodo={
            text: todo.text,
            key: Date.now(),
            completed:true
          }
        console.log(currentTodo)
        const newCompltedTodos = [...this.state.completeds, currentTodo];
        this.setState({
          completeds:newCompltedTodos,
          currentTodo: {
            text:'',
            key:'',
            completed:false
          }
        })
        this.deleteTodo(key);
      }
    })
  }

  setUpdate(text,key) {
    const todos = this.state.todos;
    todos.map(todo => {
      if(todo.key === key) {
        todo.text = text;
      }
    })
    this.setState({
      todos : todos
    })
  }

  deleteComTodo(key){
    const filteredTodos = this.state.completeds.filter(todo =>
      todo.key !== key );
    this.setState({
      completeds:filteredTodos
    })
  }

  render() {
    return (
      
      <dev className="text-center container auto" >
        <h1 className="text-light ">Simple React To-do Apllication</h1>
        <dev className="card card-body my-3 container center col-sm-6 "> 
          <header>
            <div className="">
              <form id="todo-form" onSubmit={this.addItem} className="center ">
                <div className="input-group center ">
                  <div className="input-group-prepend center col-12 mc-auto com-md-8 ">
                    <div className="input-group-text bg-primary text-white">
                      <FontAwesomeIcon className="faicons" icon='book'/>
                    </div>
                    <input type="text" placeholder="Add a todo item" value={this.state.currentTodo.text}
                      onChange={this.handleInput} className="form-control text-capitalize"/>
                  </div>
                  
                </div>
                <button type="submit" className=" btn btn-outline-success mt-2 col-10">Add ToDo</button>
              </form>
            </div>
        </header>
        </dev>
        <div className="card card-body my-3 container center col-sm-6">
          <h4>Todo List</h4>
        <ListTodos todos = {this.state.todos} 
          completeds= {this.state.completeds} 
          deleteTodo = {this.deleteTodo} 
          checkTodo = {this.checkTodo} 
          setUpdate = {this.setUpdate}
          deleteComTodo = {this.deleteComTodo}></ListTodos>
        </div>
        <Particles params={particleOpt} className="" />
      </dev>
    )
  }
}

export default App;
