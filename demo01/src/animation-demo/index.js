/** 动画例子
 * 类组件
 */

import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";

// import PropTypes from 'prop-types'

import "./style.css";

export class AnimationDemo extends Component {
  // static propTypes = {

  // }
  constructor(props) {
    super(props);
    this.state = {
      isShow: true,
      isShowCom: true,
    };
    this.toChangeShow = this.toChangeShow.bind(this);
    this.toChangeShowCom = this.toChangeShowCom.bind(this);
    this.nodeRef = React.createRef();
  }

  render() {
    return (
      <div>
        <div className={this.state.isShow ? "show" : "hide"}>
          transition动画显隐
        </div>
        <button onClick={this.toChangeShow}>
          {this.state.isShow ? "隐藏" : "显示"}
        </button>
        <br />
        <CSSTransition
          nodeRef={this.nodeRef}
          in={this.state.isShowCom} //用于判断是否出现的状态
          timeout={2000} //动画持续时间
          classNames="show-com-text" //className值，防止重复
          unmountOnExit
        >
          <div>react-transition-group显隐</div>
        </CSSTransition>
        <button onClick={this.toChangeShowCom}>
          {this.state.isShowCom ? "隐藏" : "显示"}
        </button>
      </div>
    );
  }

  toChangeShow() {
    const { isShow } = this.state;
    this.setState({
      isShow: !isShow,
    });
  }

  toChangeShowCom() {
    const { isShowCom } = this.state;
    this.setState({
      isShowCom: !isShowCom,
    });
  }
}

export default AnimationDemo;
