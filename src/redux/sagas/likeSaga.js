import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
const moment = require("moment");


function* like(action) {
    try {
      console.log(action.payload);
      yield axios.post(`/api/post/like`, action.payload);
      yield put({
        type: "FETCH_ALL_POSTS",
      });
    } catch (error) {
      console.log("like is error:", error);
    }
  }

  function* unlike(action) {
    try {
      console.log(action.payload);
      yield axios.delete(`/api/post/like/${action.payload.post_id}/${action.payload.user_id}`);
      yield put({
        type: "FETCH_ALL_POSTS",
      });
    } catch (error) {
      console.log("unlike is error:", error);
    }
  }


function* postsSaga() {

  yield takeLatest("LIKE", like);
  yield takeLatest("UNLIKE", unlike);


}

export default postsSaga;
