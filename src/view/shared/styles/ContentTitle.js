import React from "react";

export default function ContentTitle(props){

  const {title, marginTop} = props;
  const style = marginTop === true ? {marginTop: 42, marginBottom: 0} : {marginBottom: 0};

  return <h1 style={style}>{title}</h1>
};