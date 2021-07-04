/** 类组件
 * Fragment标签 可以不需要最外层的标签
 */
import React, { Component, Fragment } from "react";
import ListItem from "./list-item";

class MenuList extends Component {
  constructor(props) {
    super(props); //调用父类的构造函数，固定写法
    this.state = {
      inputValue: "", // input中的值
      //----------主要 代码--------start
      list: ["英文", "语文"],
      //----------主要 代码--------end
    };
    this.myRef = React.createRef();
    this.itemRef = React.createRef();

    this.printRef = () => {
      console.log(this.myRef, this.myRef.current);
      console.log('---------')
      console.log(this.itemRef, this.itemRef.current)
    };
  }
  render() {
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
