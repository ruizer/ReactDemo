/** 类组件
 * 父子组件传值
 */
import React, { Component } from "react";
import PropTypes from "prop-types";

class ListItem extends Component {
  constructor(props) {
    super(props);

    // 为了在回调中使用 `this`，这个绑定是必不可少的
    this.handleClick = this.handleClick.bind(this);
  }
  render() {
    return <li onClick={this.handleClick}>{this.props.content}</li>;
  }
  handleClick() {
    this.props.deleteItem();
  }
}

// ListItem.defaultProps = {
//   index: '121',
// };

ListItem.propTypes = {
  content: PropTypes.string.isRequired,
  deleteItem: PropTypes.func,
};

export default ListItem;
