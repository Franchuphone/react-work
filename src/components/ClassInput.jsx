/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import Count from "./Count";

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [
        { name: "Just some demo tasks", edit: false, id: crypto.randomUUID() },
        { name: "As an example", edit: false, id: crypto.randomUUID() },
      ],
      inputVal: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.concat({
        name: state.inputVal,
        edit: false,
        id: crypto.randomUUID(),
      }),
      inputVal: "",
    }));
  }

  handleDelete(id) {
    const filteredTodos = this.state.todos.filter((todo) => todo.id !== id);
    this.setState((state) => ({
      ...state,
      todos: filteredTodos,
    }));
  }

  handleEditChange(e, id) {
    this.setState({
      todos: this.state.todos.map((todo) =>
        todo.id === id ? { ...todo, name: e.target.value } : todo,
      ),
    });
  }

  handleEdit(id, edit) {
    this.setState({
      todos: this.state.todos.map((todo) =>
        todo.id === id ? { ...todo, edit: todo.edit ? false : true } : todo,
      ),
    });
  }

  render() {
    return (
      <section>
        <h3>{this.props.name}</h3>
        {/* The input field to enter To-Do's */}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <Count length={this.state.todos.length} />
        {/* The list of all the To-Do's, displayed */}
        <ul>
          {this.state.todos.map((todo, index) => (
            <div key={todo.id}>
              <li>
                {!todo.edit ? (
                  todo.name
                ) : (
                  <input
                    value={todo.name}
                    onChange={(e) => this.handleEditChange(e, todo.id)}
                  ></input>
                )}
              </li>
              <button onClick={() => this.handleEdit(todo.id, todo.edit)}>
                {!todo.edit ? "Edit" : "Change"}
              </button>
              <button onClick={() => this.handleDelete(todo.id)}>Delete</button>
            </div>
          ))}
        </ul>
      </section>
    );
  }
}

export default ClassInput;
