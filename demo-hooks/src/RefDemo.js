import { useState, forwardRef, useImperativeHandle } from "react";

const RefDemo = (props, ref) => {
  const { titleStr } = props;
  const [title, setTitle] = useState("hello World");
  useImperativeHandle(ref, () => ({
    handleChangeTitle: () => {
      setTitle(`hello ${titleStr}`);
    },
  }));
  return <div>{title}</div>;
};
export default forwardRef(RefDemo);
