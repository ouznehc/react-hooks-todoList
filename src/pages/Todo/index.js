import React, { useState, useCallback } from "react";

import Header from "./header";
import Section from "./section";
import Footer from "./footer";

const Todo = () => {
  const [todos, setTodos] = useState(() => {
    let collection = localStorage.getItem("__todo__");
    let arr = collection != null ? JSON.parse(collection) : [];
    return arr;
  });

  const saveTodo = useCallback(function (val) {
    let collection = localStorage.getItem("__todo__");
    let arr = collection != null ? JSON.parse(collection) : [];
    arr.push({ title: val, done: false, titleInput: false });
    localStorage.setItem("__todo__", JSON.stringify(arr));
    setTodos([...arr]);
  },[]);

  return (
    <div>
      <Header saveTodo={saveTodo}></Header>
      <Section todos={todos} setTodos={setTodos}></Section>
      <Footer></Footer>
    </div>
  );
};

export default Todo;
