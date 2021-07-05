/** 类组件
 * Fragment标签 可以不需要最外层的标签
 */
import React, { Component, Fragment } from "react";
import ListItem from "./list-item";

import axios from "axios";

class MenuList extends Component {
  // React组件挂载阶段
  // 在React组件挂载阶段会按顺序调用constructor、getDerivedStateFromProps、componentDidMount、render这些钩子函数。
  constructor(props) {
    // 在其他语句之前前调用super(props)，否则this.props为undefined；
    // 通过给 this.state 赋值对象来初始化state；
    // 为事件处理函数绑定实例，否在函数中无法使用this。
    super(props); //调用父类的构造函数，固定写法
    this.state = {
      inputValue: "", // input中的值
      list: ["英文", "语文"],
    };
    this.myRef = React.createRef();
    this.itemRef = React.createRef();

    this.printRef = () => {
      console.log(this.myRef, this.myRef.current);
      console.log("---------");
      console.log(this.itemRef, this.itemRef.current);
    };
    console.log("执行constructor");
  }

  static getDerivedStateFromProps(props, state) {
    // 处理props和state
    // 要派生出新的state，不要修改原来的state；
    // 函数最后必须返回一个对象或者null；
    // 钩子函数中无法使用this。
    console.log(props, "----", state);
    console.log("getDerivedStateFromProps----组件将要挂载到页面的时刻");
    return null;
  }

  // componentWillMount() {
  //   // 已废弃
  //   console.log("componentWillMount----组件将要挂载到页面的时刻");
  // }
  componentDidMount() {
    // 获取DOM元素；
    // 请求服务端数据；
    // 监听事件，必须在componentWillUnmount()中取消监听；
    // 可以调用this.setState()来改变state数据。
    console.log("componentDidMount----组件挂载完成的时刻执行");
    axios
      .post("https://aws.random.cat/meow")
      .then((res) => {
        console.log("axios 获取数据成功:" + JSON.stringify(res));
      })
      .catch((error) => {
        console.error("axios 获取数据失败" + error);
      });
  }

  // React组件更新阶段
  // 在React组件更新阶段会按顺序调用getDerivedStateFromProps、shouldComponentUpdate、
  // render、getSnapshotBeforeUpdate、componentDidUpdate这些钩子函数。
  shouldComponentUpdate() {
    console.log("shouldComponentUpdate---组件发生改变前执行");
    // 返回false代表不刷新，后续周期不执行
    return true;
  }

  // componentWillUpdate() {
  //   // 已废弃
  //   console.log(
  //     "componentWillUpdate---组件更新前，shouldComponentUpdate函数之后执行"
  //   );
  // }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    // 相当Vue中beforeUpdate钩子函数
    // props和state已经更新了，故该钩子函数接收更新前的props和state作为参数，作为比较使用。
    // 最后返回一个值，该值会被componentDidUpdate钩子函数的第三个参数snapshot接收。
    console.log(prevProps, "----", prevState);
    console.log(this.itemRef.current);
    console.log("getSnapshotBeforeUpdate----组件更新之前执行");
    return null;
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    // 在其中执行this.forceUpdate()或this.setState()时，必须在一个条件语句里中，否会陷入无限更新的死循环，导致程序崩溃；
    // 如果shouldComponentUpdate钩子函数返回值为false，则不会调用componentDidUpdate钩子函数。

    console.log(prevProps, "----", prevState, "---", snapshot);
    console.log("componentDidUpdate----组件更新之后执行");
  }

  render() {
    console.log("render---组件挂载中.......");

    return (
      <Fragment>
        <button onClick={this.printRef}>打印ref</button>
        <div ref={this.myRef}>
          <input
            value={this.state.inputValue}
            placeholder="请输入菜单"
            onChange={this.inputChange.bind(this)}
          />
          <button onClick={this.addList.bind(this)}>增加菜单</button>
        </div>
        <ul>
          {this.state.list.map((item, index) => {
            return (
              <ListItem
                key={index + item}
                content={item}
                // 使用bind改变this指向，并且传值
                deleteItem={this.deleteItem.bind(this, index)}
                ref={this.itemRef}
              />
              // <li
              //   key={index + item}
              //   onClick={this.deleteItem.bind(this, index)}
              // >
              //   {item}
              // </li>
            );
          })}
        </ul>
      </Fragment>
    );
  }

  // React组件卸载阶段
  componentWillUnmount() {
    // 会在组件卸载及销毁之前调用，一般处理以下事项：
    // 清除定时器；
    // 取消网络请求；
    // 解绑在componentDidMount钩子函数中监听的事件。
    console.log("componentWillUnmount----组件卸载及销毁之前执行");
  }

  inputChange(e) {
    // console.log(e.target.value);
    // this.state.inputValue=e.target.value;
    this.setState({
      inputValue: e.target.value,
    });
  }

  addList() {
    if (!this.state.inputValue) {
      alert("菜单不能为空");
      return;
    }
    this.setState({
      list: [...this.state.list, this.state.inputValue],
    });
  }

  deleteItem(index) {
    const list = this.state.list;
    list.splice(index, 1);
    // this.setState({
    //   list: list,
    // });

    this.setState((state) => ({ list }));
  }
}
export default MenuList;
