/** @format */

import React from 'react';

export default function AddButton({ func, name }) {
  return (
    <>
      <button
        onClick={(e) => {
          func(e);
        }}
        className='border p-3'
      >
        {name}
      </button>
    </>
  );
}
