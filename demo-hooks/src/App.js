import "./App.css";

import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  Fragment,
  useRef,
  useCallback,
} from "react";

import { ColorContext, UPDATE_COLOR, Color } from "./color";
import RefDemo from "./RefDemo";

const CountContext = createContext(1111);

// useContext例子
function Counter() {
  const count = useContext(CountContext); //一句话就可以得到count
  return (
    <Fragment>
      <p>useContext：</p>
      <h2>{count}</h2>
    </Fragment>
  );
}

function UseStateExample() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>count: {count}</p>
      <button
        style={{ marginRight: "10px" }}
        onClick={() => setCount(count + 1)}
      >
        加一
      </button>
      <button onClick={() => setCount(count - 1)}>减一</button>

      <CountContext.Provider value={count}>
        <Counter />
      </CountContext.Provider>
    </div>
  );
}

function UseEffectExample(props) {
  const [title, setTitle] = useState("标题");
  const { changeTitle } = props;
  useEffect(() => {
    document.title = `effect-${title}`;
    console.log(`标题改变 ${title}`);
    changeTitle(title);
    return () => {
      // cleanup
    };
  }, [title]);

  useEffect(() => {
    console.log("只调用一次");
    return () => {
      // cleanup
    };
  }, []);

  return (
    <div>
      <p>title：{title}</p>
      <input
        value={title}
        placeholder="请输入标题"
        onChange={(e) => setTitle(e.target.value)}
      ></input>
    </div>
  );
}
function ShowArea() {
  const { color } = useContext(ColorContext);
  return <div style={{ color: color }}>字体颜色为{color}</div>;
}
function ColorButton() {
  const { dispatch } = useContext(ColorContext);
  return (
    <div>
      <button
        style={{ marginRight: "10px" }}
        onClick={() => {
          dispatch({ type: UPDATE_COLOR, color: "red" });
        }}
      >
        红色
      </button>
      <button
        onClick={() => {
          dispatch({ type: UPDATE_COLOR, color: "yellow" });
        }}
      >
        黄色
      </button>
    </div>
  );
}

function UseRefExample(props) {
  const { title } = props;
  const myCom = useRef();
  const changeTitle = () => {
    myCom.current.handleChangeTitle();
  };
  return (
    <div>
      <RefDemo ref={myCom} titleStr={title} />
      <button onClick={changeTitle}>改变标题</button>
    </div>
  );
}

function useWinSize() {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  });

  const onResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    });
  }, []);
  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return size;
}

function App() {
  const [title, setTitle] = useState("111");
  const changeTitle = (str) => {
    console.log("sss");
    setTitle(str);
  };
  const size = useWinSize();

  return (
    <div className="App">
      <div>
        页面Size:{size.width}x{size.height}
      </div>

      <p>useState：</p>
      <UseStateExample />
      <p>useEffect：</p>
      <UseEffectExample changeTitle={changeTitle} />
      <p>useReducer：</p>
      <Color>
        <ShowArea />
        <ColorButton />
      </Color>
      <p>useRef：</p>
      <UseRefExample title={title} />
    </div>
  );
}

export default App;
