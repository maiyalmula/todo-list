import Todo from "./Todo";
import "./styles.css";
import { TaskType } from "./Todo";
import { useState } from "react";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "active" | "complited";

function App() {
  let initialTasks: Array<TaskType> = [
    { id: v1(), title: "css", isDone: true },
    { id: v1(), title: "react", isDone: false },
    { id: v1(), title: "html", isDone: true },
  ];

  let [tasks, setTasks] = useState(initialTasks);
  const [filtered, setFIltered] = useState<FilterValuesType>("all");

  function changeFilter(value: FilterValuesType) {
    setFIltered(value);
  }

  function removeItem(id: string) {
    let filteredTasks = tasks.filter((t) => t.id !== id);
    setTasks(filteredTasks);
  }

  function addTask(title: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }

  function changeCheckbox(taskId: string, isDone: boolean) {
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
    }
    setTasks([...tasks]);
  }

  let tasksForTodoList = tasks;
  if (filtered === "complited") {
    tasksForTodoList = tasks.filter((t) => t.isDone === true);
  }
  if (filtered === "active") {
    tasksForTodoList = tasks.filter((t) => t.isDone === false);
  }

  return (
    <div className="app">
      <Todo
        title="What to learn"
        tasks={tasksForTodoList}
        removeItem={removeItem}
        changeFilter={changeFilter}
        addTask={addTask}
        changeCheckbox={changeCheckbox}
      />
    </div>
  );
}

export default App;
