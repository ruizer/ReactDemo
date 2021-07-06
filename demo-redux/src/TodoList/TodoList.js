import React, { Component } from "react";
// import PropTypes from 'prop-types'

import "antd/dist/antd.css";
import { Input, Button, List } from "antd";

import {
  changeInputAction,
  addItemAction,
  deleteItemAction,
} from "../store/actionCreatores";

import { connect } from "react-redux";

export class TodoList extends Component {
  // static propTypes = {

  // }
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      inputValue,
      list,
      changeInputValue,
      addItemAction,
      deleteItemAction,
    } = this.props;

    return (
      <div style={{ margin: "10px" }}>
        <div>
          <Input
            placeholder="Write Something"
            value={inputValue}
            style={{ width: "250px", marginRight: "10px" }}
            onChange={changeInputValue}
          />
          <Button type="primary" onClick={addItemAction}>
            增加
          </Button>
        </div>
        <div style={{ margin: "10px", width: "300px" }}>
          <List
            bordered
            dataSource={list}
            renderItem={(item, i) => (
              <List.Item onClick={deleteItemAction.bind(this, i)}>
                {item}
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }
}

// Map Redux state to component props
function mapStateToProps(state) {
  const { inputValue, list } = state;
  return {
    inputValue,
    list: [...list],
  };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    changeInputValue: (e) => dispatch(changeInputAction(e.target.value)),
    addItemAction: () => dispatch(addItemAction()),
    deleteItemAction: (i) => dispatch(deleteItemAction(i)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
