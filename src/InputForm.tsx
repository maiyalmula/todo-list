import { Add } from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import { useState } from "react";

type InputFormPropsType = {
  addItem: (title: string) => void;
};

const InputForm = (props: InputFormPropsType) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  function addTaskBtn(): void {
    if (input.trim() === "") {
      setError("Title is required");
      return;
    }
    props.addItem(input);
    setInput("");
  }
  return (
    <div>
      <TextField
        error={!!error}
        type="text"
        variant="standard"
        label="Type value"
        helperText={error}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => {
          setError(null);
          if (e.charCode === 13) {
            addTaskBtn();
          }
        }}
      />
      <IconButton
        color="primary"
        onClick={() => {
          addTaskBtn();
        }}
      >
        <Add />
      </IconButton>
    </div>
  );
};

export default InputForm;
