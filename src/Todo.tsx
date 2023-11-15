import "./styles.css";
import { FilterValuesType } from "./App";
import { ChangeEvent, useState } from "react";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeItem: (id: string) => void;
  changeFilter: (value: FilterValuesType) => void;
  addTask: (title: string) => void;
  changeCheckbox: (taskId: string, isDone: boolean) => void;
};

const Todo = (props: PropsType) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  function addTaskBtn(): void {
    if (input.trim() === "") {
      setError("Title is required");
      return;
    }
    props.addTask(input);
    setInput("");
  }

  return (
    <div className="todo">
      <h3 className="title">{props.title}</h3>
      <input
        className={error ? "error" : ""}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => {
          setError(null);
          if (e.charCode === 13) {
            addTaskBtn();
          }
        }}
      />
      <button
        onClick={() => {
          addTaskBtn();
        }}
      >
        +
      </button>
      {error && <div className="error-massage">{error}</div>}
      <ul>
        {props.tasks.map((t) => {
          return (
            <li key={t.id}>
              <input
                type="checkbox"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  props.changeCheckbox(t.id, e.currentTarget.checked)
                }
                checked={t.isDone}
              />
              {t.title}
              <button onClick={() => props.removeItem(t.id)}>x</button>
            </li>
          );
        })}
      </ul>
      <button onClick={() => props.changeFilter("all")}>All</button>
      <button onClick={() => props.changeFilter("active")}>Active</button>
      <button onClick={() => props.changeFilter("complited")}>Complited</button>
    </div>
  );
};

export default Todo;
