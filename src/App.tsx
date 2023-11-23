import Todo from "./Todo";
import "./styles.css";
import { useState } from "react";
import { v1 } from "uuid";
import InputForm from "./InputForm";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

export type FilterValuesType = "all" | "active" | "complited";
type TodoListType = {
  id: string;
  title: string;
  filtered: FilterValuesType;
};

function App() {
  function removeItem(id: string, taskListId: string) {
    let tasks = tasksObj[taskListId];
    let filteredTasks = tasks.filter((t) => t.id !== id);
    tasksObj[taskListId] = filteredTasks;
    setTasks({ ...tasksObj });
  }

  function addTask(title: string, taskListId: string) {
    let tasks = tasksObj[taskListId];
    let newTask = { id: v1(), title: title, isDone: false };
    tasksObj[taskListId] = [newTask, ...tasks];
    setTasks({ ...tasksObj });
  }

  function changeCheckbox(taskId: string, isDone: boolean, taskListId: string) {
    let tasks = tasksObj[taskListId];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasksObj });
    }
  }
  function onChangeTitle(taskId: string, value: string, taskListId: string) {
    let tasks = tasksObj[taskListId];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.title = value;
      setTasks({ ...tasksObj });
    }
  }

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolist, setTodolist] = useState<Array<TodoListType>>([
    { id: todolistId1, title: "What to buy", filtered: "all" },
    { id: todolistId2, title: "What to watch", filtered: "all" },
  ]);

  let [tasksObj, setTasks] = useState({
    [todolistId1]: [
      { id: v1(), title: "css", isDone: true },
      { id: v1(), title: "react", isDone: false },
      { id: v1(), title: "html", isDone: true },
    ],
    [todolistId2]: [
      { id: v1(), title: "milk", isDone: true },
      { id: v1(), title: "book", isDone: false },
    ],
  });

  let removeTodoList = (todoListId: string) => {
    let filteresTodoList = todolist.filter((tl) => tl.id !== todoListId);
    setTodolist(filteresTodoList);
    delete tasksObj[todoListId];
    setTasks({ ...tasksObj });
  };
  function onChangeNameTitle(value: string, id: string) {
    const todotitle = todolist.find((tl) => tl.id === id);
    if (todotitle) {
      todotitle.title = value;
      setTodolist([...todolist]);
    }
  }

  function addTodoList(title: string) {
    const newTodolist: TodoListType = {
      id: v1(),
      filtered: "all",
      title: title,
    };
    setTodolist([newTodolist, ...todolist]);
    setTasks({ ...tasksObj, [newTodolist.id]: [] });
  }

  return (
    <div className="app">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <InputForm addItem={addTodoList} />
        </Grid>
        <Grid container>
          {todolist.map((tl) => {
            let tasksForTodoList = tasksObj[tl.id];

            if (tl.filtered === "complited") {
              tasksForTodoList = tasksForTodoList.filter(
                (t) => t.isDone === true
              );
            }
            if (tl.filtered === "active") {
              tasksForTodoList = tasksForTodoList.filter(
                (t) => t.isDone === false
              );
            }

            function changeFilter(value: FilterValuesType, todoListId: string) {
              let todolists = todolist.find((tl) => tl.id === todoListId);
              if (todolists) {
                todolists.filtered = value;
                setTodolist([...todolist]);
              }
            }

            return (
              <Grid item>
                <Paper
                  style={{
                    padding: "15px",
                    marginRight: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <Todo
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodoList}
                    removeItem={removeItem}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeCheckbox={changeCheckbox}
                    filtered={tl.filtered}
                    removeTodoList={removeTodoList}
                    onChangeTitle={onChangeTitle}
                    onChangeNameTitle={onChangeNameTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
