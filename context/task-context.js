"use client";
import React, { createContext, useState, useContext } from "react";

const TaskContext = createContext();

export const useTask = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const createTaskList = (data) => {
    setTasks(data);
  };

  const addTask = (task) => {
    setTasks([task, ...tasks]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((todo) => todo.id !== id));
  };

  const editTask = (id, title, completed) => {
    setTasks(
      tasks.map((todo) =>
        todo.id === id ? { ...todo, title, completed } : todo
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        createTaskList,
        tasks,
        addTask,
        toggleTask,
        deleteTask,
        editTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
