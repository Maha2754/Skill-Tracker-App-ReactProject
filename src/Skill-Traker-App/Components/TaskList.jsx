import { useState, useEffect } from "react";
import TaskForm from "./TaskForm";

function TaskList() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, name: "React", completed: false },
          { id: 2, name: "JavaScript", completed: false },
          { id: 3, name: "Java", completed: false },
        ];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (name) => {
    const newTask = {
      id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
      name,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="task-container">
      <h2>Task List</h2>
      <TaskForm onAddTask={addTask} />
      <ul className="task-list">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`task-item ${task.completed ? "completed" : ""}`}
          >
            <span>
              {task.id}. {task.name}
            </span>
            <div className="task-buttons">
              <button
                className="complete-btn"
                onClick={() => toggleComplete(task.id)}
              >
                ✅
              </button>
              <button
                className="delete-btn"
                onClick={() => deleteTask(task.id)}
              >
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
