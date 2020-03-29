import React, { Fragment, useEffect, useState } from 'react';
import EditTodo from './EditTodo.js'

const ListTodos = () => {

    //set state as an empty array at first
    const [ todos, setTodos] = useState([]);

    
    //get all function
    //sends a get request, parses it to json, and updates state
    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos")
            const jsonData =  await response.json();
            setTodos(jsonData);
        } catch(err) {
            console.log(err.message);
        }
    }

    //delete todo function
    // gets given an id, sends delete request, and updates state with all todos that didn't have that id
    const deleteTodo = async id => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            });
            setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch(err) {
            console.error(err.message);
        }
    }

    //gets the todos using hook
    // kind of like componentDidUpdate, componentDidMount and componentWillUnMount
    // without the empty array, it sends tons of requests
    useEffect(() => {
        getTodos();
    }, []);

    return (
        <Fragment>
            <table className="table mt-5">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                 </thead>
                <tbody>
                    {/* <tr>
                        <td>John</td>
                        <td>Doe</td>
                        <td>john@example.com</td>
                    </tr> */}
                    {todos.map(todo => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td><EditTodo todo={todo} /></td>
                            <td><button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)} >Delete</button></td>
                        </tr>
                    ))}
                </tbody>
             </table>

        </Fragment> 
    )
};

export default ListTodos;