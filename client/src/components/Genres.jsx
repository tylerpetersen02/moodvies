import React, { useState } from 'react';

const Genres = (props) => {

  const handleGenreClick = (val) => {
    props.changeId(val);
    props.handleOnlyFaves();
  }

  return (
    <div onClick={()=>{ handleGenreClick(props.genre.id) }} className="genre">
      <div>{props.genre.name}</div>
    </div>
  )
};

export default Genres;
