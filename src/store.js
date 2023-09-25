/** @format */

import { configureStore, createSlice } from '@reduxjs/toolkit';

const generateUniqueId = (state) => {
  // 현재 상태에 있는 fileId 중에서 가장 큰 값을 찾습니다.
  if (state.length === 0) {
    console.log(state.file);
    return 0;
  }
  const existingIds = state.map((file) => {
    console.log(file);
    return file.fileId;
  });
  const maxId = Math.max(...existingIds);

  // 가장 큰 값에 1을 더한 값을 새로운 아이디로 사용합니다.
  return maxId + 1;
};
const generateUniqueIdForDir = (state) => {
  // 현재 상태에 있는 fileId 중에서 가장 큰 값을 찾습니다.
  if (state.length === 0) {
    return 0;
  }
  const existingIds = state.map((file) => {
    console.log(file);
    return file.dirId;
  });
  const maxId = Math.max(...existingIds);

  // 가장 큰 값에 1을 더한 값을 새로운 아이디로 사용합니다.
  return maxId + 1;
};

const user = createSlice({
  name: 'user',
  initialState: 'kim',
});
const files = createSlice({
  name: 'files',
  initialState: [],
  reducers: {
    addFile(state, action) {
      console.log(action);
      const newFile = {
        dirId: action.payload.dirSeletIndex,
        fileId: generateUniqueId(state),
        fileName: action.payload.fileName,
        code: 'newFile',
      };
      state.push(newFile);
    },
    saveFile(state, action) {
      const fileIndex = state.findIndex((file) => {
        return file.fileId === +action.payload.fileId;
      });
      state[fileIndex].code = action.payload.code;
    },
  },
});
const dirs = createSlice({
  name: 'dirs',
  initialState: [],
  reducers: {
    addDir(state, action) {
      const newFile = {
        dirName: action.payload,
        dirId: generateUniqueIdForDir(state),
      };
      state.push(newFile);
    },
  },
});

export const { addFile, saveFile } = files.actions;
export const { addDir } = dirs.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    files: files.reducer,
    dirs: dirs.reducer,
  },
});
