import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
const moment = require("moment");

function* fetchAllPost(action) {
  try {
    const response = yield axios.get(`/api/post`);
    yield put({
      type: "SET_ALL_POST",
      payload: response.data,
    });
  } catch (error) {
    console.log("Post is error:", error);
  }
}

function* addPost(action) {
  try {
    console.log(action.payload);
    yield axios.post(`/api/post`, action.payload);
    yield put({
      type: "FETCH_ALL_POSTS",
    });
  } catch (error) {
    console.log("addPost is error:", error);
  }
}

function* editPost(action) {
  try {
    yield axios.put(`/api/post`, action.payload);
    yield put({
      type: "FETCH_ALL_POSTS",
    });
  } catch (error) {
    console.log("editPost is error:", error);
  }
}

function* deletePost(action) {
  try {
    yield axios.delete(`/api/post/${action.payload.id}`);
    yield put({
      type: "FETCH_ALL_POSTS",
    });
  } catch (error) {
    console.log("deletePayment is error:", error);
  }
}

function* postsSaga() {
  yield takeLatest("FETCH_ALL_POSTS", fetchAllPost);
  yield takeLatest("ADD_POST", addPost);
  yield takeLatest("EDIT_POST", editPost);
  yield takeLatest("DELETE_POST", deletePost);
}

export default postsSaga;
