import { CHANGE_INPUT, ADD_ITEM, DELETE_ITEM } from "./actionTypes";

const defaultState = {
  inputValue: "",
  list: ["早七点起床，洗脸刷牙", "早8点，吃早餐", "早9点，上班"],
}; //默认数据

const reducer = (state = defaultState, action) => {
  //就是一个方法函数
  const { type } = action;
  if (type === CHANGE_INPUT) {
    return { ...state, inputValue: action.value };
  }
  if (type === ADD_ITEM) {
    const { list, inputValue } = state;
    list.push(inputValue);
    return { ...state, list };
  }
  if (type === DELETE_ITEM) {
    const { list } = state;
    list.splice(action.index, 1);
    return { ...state, list };
  }
  return state;
};
export default reducer;
