import { TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";

type EditableSpanPropsType = {
  title: string;
  onChangeTitle: (value: string) => void;
};

function EditableSpan(props: EditableSpanPropsType) {
  const [editmode, setEditMode] = useState(false);
  const [title, setTitle] = useState(props.title);

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
  };
  const activateViewMode = () => {
    setEditMode(false);
    props.onChangeTitle(title);
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return editmode ? (
    <TextField
      type="text"
      value={title}
      onChange={onChangeHandler}
      onBlur={activateViewMode}
      autoFocus
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.title}</span>
  );
}

export default EditableSpan;
