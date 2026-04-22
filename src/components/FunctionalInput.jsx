import React, { useState } from "react";
import Count from "./Count";

// eslint-disable-next-line react/function-component-definition, react/prop-types
const FunctionalInput = ({ name }) => {
  /*
    We declare two state variables and their setters,
    one to store the To-Do's
    and the other to store the value of the input field
  */
  const [todos, setTodos] = useState([
    { name: "Just some demo tasks", edit: false, id: crypto.randomUUID() },
    { name: "As an example", edit: false, id: crypto.randomUUID() },
  ]);
  const [inputVal, setInputVal] = useState("");

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos((todo) => [
      ...todo,
      { name: inputVal, edit: false, id: crypto.randomUUID() },
    ]);
    setInputVal("");
  };

  const handleDelete = (id) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos((todo) => filteredTodos);
  };

  const handleEditInput = (e, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, name: e.target.value } : todo,
      ),
    );
  };

  const handleEditBtn = (e, id) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, edit: todo.edit ? false : true } : todo,
      ),
    );
  };

  return (
    <section>
      <h3>{name}</h3>
      {/* The input field to enter To-Do's */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="task-entry">Enter a task: </label>
        <input
          type="text"
          name="task-entry"
          value={inputVal}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
      <Count length={todos.length} />
      {/* The list of all the To-Do's, displayed */}
      <ul>
        {todos.map((todo) => (
          <div key={todo.id}>
            <li>
              {!todo.edit ? (
                todo.name
              ) : (
                <input
                  value={todo.name}
                  onChange={(e) => handleEditInput(e, todo.id)}
                ></input>
              )}
            </li>
            <button type="submit" onClick={(e) => handleEditBtn(e, todo.id)}>
              {todo.edit ? "Change" : "Edit"}
            </button>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </div>
        ))}
      </ul>
    </section>
  );
};

export default FunctionalInput;
