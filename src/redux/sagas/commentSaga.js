import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* addComment(action) {
  try {
    yield axios.post(`/api/post/comment`, action.payload);
    yield put({
      type: "FETCH_COMMENT",
      payload: action.payload,
    });
  } catch (error) {
    console.log("comment is error:", error);
  }
}

function* fetchComment(action) {
  try {
    const response = yield axios.get(
      `/api/post/comment/${action.payload.postId}`
    );
    yield put({
      type: "SET_COMMENT",
      payload: response.data,
    });
  } catch (error) {
    console.log("Comment is error:", error);
  }
}

function* editComment(action) {
  try {
    yield axios.put(`/api/post/comment`, action.payload);
    yield put({
      type: "FETCH_COMMENT",
      payload: action.payload,
    });
  } catch (error) {
    console.log("editComment is error:", error);
  }
}

function* deleteComment(action) {
  try {
    yield axios.delete(
      `/api/post/comment/${action.payload.id}`
    );
    yield put({
      type: "FETCH_COMMENT",
      payload: action.payload,
    });
  } catch (error) {
    console.log("delete comment is error:", error);
  }
}

function* commentSaga() {
  yield takeLatest("ADD_COMMENT", addComment);
  yield takeLatest("FETCH_COMMENT", fetchComment);

  yield takeLatest("EDIT_COMMENT", editComment);
  yield takeLatest("DELETE_COMMENT", deleteComment);
}

export default commentSaga;
