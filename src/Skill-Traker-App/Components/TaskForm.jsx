import { useState } from "react";

function TaskForm({ onAddTask }) {
  const [value, setValue] = useState("");

  function valueHandling(event) {
    setValue(event.target.value);
  }

  function btnHandling() {
    if (!value.trim()) return; // avoid empty input
    onAddTask(value); // send to parent (TaskList)
    setValue(""); // clear input
  }

  return (
    <>
      <div>
        <input
          onChange={valueHandling}
          type="text"
          value={value}
          placeholder="Enter the task"
        />
        <button onClick={btnHandling}>Add</button>
      </div>
    </>
  );
}

export default TaskForm;
