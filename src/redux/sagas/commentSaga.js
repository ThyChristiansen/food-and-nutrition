import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
const moment = require("moment");

function* addComment(action) {
  try {
    yield axios.post(`/api/post/comment`, action.payload);
    yield put({
      type: "FETCH_COMMENT",
      payload: action.payload
    });
  } catch (error) {
    console.log("comment is error:", error);
  }
}

function* fetchComment(action) {
  console.log("------->",action.payload.postId)
  try {
    const response = yield axios.get(`/api/post/comment/${action.payload.postId}`);
    yield put({
      type: "SET_COMMENT",
      payload: response.data,
    });
  } catch (error) {
    console.log("Comment is error:", error);
  }
} 
// function* unlike(action) {
//   try {
//     yield axios.delete(
//       `/api/post/like/${action.payload.post_id}/${action.payload.user_id}`
//     );
//     yield put({
//       type: "FETCH_ALL_POSTS",
//     });
//   } catch (error) {
//     console.log("unlike is error:", error);
//   }
// }

function* commentSaga() {
  yield takeLatest("ADD_COMMENT", addComment);
  yield takeLatest("FETCH_COMMENT", fetchComment);

//   yield takeLatest("EDIT_COMMENT", editComment);
//   yield takeLatest("DELETE_COMMENT", deleteComment);
}

export default commentSaga;
