/** @format */

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDir, addFile } from '../store';
import { useNavigate } from 'react-router-dom';
import AddButton from './AddButton';

export default function LeftBar() {
  const navigation = useNavigate();
  const files = useSelector((state) => state.files);
  const dirs = useSelector((state) => state.dirs);
  const dispatch = useDispatch();

  const [fileName, setFileName] = useState('');

  const [dirName, setDirName] = useState('');

  const [dirOpenView, setdirOpenView] = useState(false);
  const [fileAddView, setFileAddView] = useState(false);
  const [dirAddView, setDirAddView] = useState(false);
  const [dirSeletIndex, setDirSeletIndex] = useState(-1);
  const [dirStates, setDirStates] = useState({});
  const dirOpenFunc = (e, dirId) => {
    e.preventDefault();
    console.log(dirId);
    dirOpenView ? setdirOpenView(false) : setdirOpenView(true);
  };
  const dirSeletFunc = (e, dirId) => {
    e.preventDefault();
    console.log(dirId);
    return dirId;
  };

  const fileAddViewFunc = (e) => {
    e.preventDefault();
    console.log('폴더 번호 : ', dirSeletIndex);
    if (fileAddView) {
      setFileAddView(false);
    } else {
      setFileAddView(true);
    }
  };
  const dirAddViewFunc = (e) => {
    e.preventDefault();
    if (dirAddView) {
      setDirAddView(false);
    } else {
      setDirAddView(true);
    }
  };
  const inputSetValue = (e, setValue) => {
    e.preventDefault();
    setValue(e.target.value);
  };
  return (
    <div style={{ width: '20vw', position: 'fixed' }}>
      <div className='flex gap-3'>
        <AddButton func={fileAddViewFunc} name={'파일추가'} />
        <AddButton func={dirAddViewFunc} name={'폴더추가'} />
      </div>
      {fileAddView ? (
        <div className='border p-2'>
          <input
            type='text'
            onChange={(e) => {
              inputSetValue(e, setFileName);
            }}
          />
          <button
            className='p-2 border'
            onClick={() => {
              dispatch(addFile({ fileName, dirSeletIndex }));
            }}
          >
            파일추가
          </button>
        </div>
      ) : null}
      {dirAddView ? (
        <div className='border p-2'>
          <input
            type='text'
            onChange={(e) => {
              inputSetValue(e, setDirName);
            }}
          />
          <button
            className='p-2 border'
            onClick={() => {
              dispatch(addDir(dirName));
            }}
          >
            폴더추가
          </button>
        </div>
      ) : null}

      <div>
        {dirs.map((dir, i) => {
          const isOpen = dirStates[dir.dirId] || false; // 폴더의 상태를 가져옴

          return (
            <div key={i}>
              <p className={`p-2 border bg-${isOpen ? 'slate-100' : ''}`}>
                {dir.dirName}
                <button
                  className='border'
                  onClick={(e) => {
                    // 해당 폴더의 상태를 토글
                    setDirStates((prevState) => ({
                      ...prevState,
                      [dir.dirId]: !isOpen,
                    }));

                    dirSeletIndex === -1
                      ? setDirSeletIndex(dirSeletFunc(e, dir.dirId))
                      : setDirSeletIndex(-1);
                  }}
                >
                  {isOpen ? '닫기' : '펼쳐보기'}
                </button>
              </p>
              {isOpen && // 폴더가 열려있을 때만 파일을 표시
                files.map((file, i) => {
                  if (file.dirId === dir.dirId && file.dirId === dirSeletIndex)
                    return (
                      <p
                        onClick={() => {
                          navigation('/' + file.fileId);
                        }}
                        className='p-2 border'
                        key={i}
                      >
                        들여쓰기요{file.fileName}
                      </p>
                    );
                })}
            </div>
          );
        })}
        {files.map((file, i) => {
          if (file.dirId === -1)
            return (
              <div key={i}>
                <p
                  onClick={() => {
                    navigation('/' + file.fileId);
                  }}
                  className='p-2 border'
                >
                  {file.fileName}
                </p>
              </div>
            );
        })}
      </div>
    </div>
  );
}
