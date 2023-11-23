import "./styles.css";
import { FilterValuesType } from "./App";
import InputForm from "./InputForm";
import EditableSpan from "./EditableSpan";
import { Button, Checkbox, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeItem: (id: string, taskListId: string) => void;
  changeFilter: (value: FilterValuesType, todoListId: string) => void;
  addTask: (title: string, taskListId: string) => void;
  changeCheckbox: (taskId: string, isDone: boolean, taskListId: string) => void;
  filtered: FilterValuesType;
  removeTodoList: (todoListId: string) => void;
  onChangeTitle: (taskId: string, value: string, taskListId: string) => void;
  onChangeNameTitle: (value: string, id: string) => void;
};

const Todo = (props: PropsType) => {
  let removeTodoList = () => {
    props.removeTodoList(props.id);
  };

  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };
  const onChangeTitle = (value: string) => {
    props.onChangeNameTitle(value, props.id);
  };

  return (
    <div className="todo">
      <h3 className="title">
        <EditableSpan title={props.title} onChangeTitle={onChangeTitle} />{" "}
        <IconButton onClick={removeTodoList}>
          <DeleteIcon />
        </IconButton>
      </h3>
      <InputForm addItem={addTask} />

      <div>
        {props.tasks.map((t) => {
          const onChangeTitle = (value: string) => {
            props.onChangeTitle(t.id, value, props.id);
          };

          return (
            <div key={t.id} className={t.isDone === true ? "is-done" : ""}>
              <Checkbox
                onChange={(e) =>
                  props.changeCheckbox(t.id, e.currentTarget.checked, props.id)
                }
                checked={t.isDone}
              />
              <EditableSpan title={t.title} onChangeTitle={onChangeTitle} />
              <IconButton onClick={() => props.removeItem(t.id, props.id)}>
                <DeleteIcon />
              </IconButton>
            </div>
          );
        })}
      </div>
      <Button
        onClick={() => props.changeFilter("all", props.id)}
        variant={props.filtered === "all" ? "contained" : "text"}
      >
        All
      </Button>
      <Button
        color="primary"
        variant={props.filtered === "active" ? "contained" : "text"}
        onClick={() => props.changeFilter("active", props.id)}
      >
        Active
      </Button>
      <Button
        color="secondary"
        variant={props.filtered === "complited" ? "contained" : "text"}
        onClick={() => props.changeFilter("complited", props.id)}
      >
        Complited
      </Button>
    </div>
  );
};

export default Todo;
