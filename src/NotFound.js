// 리액트 패키지를 불러옵니다.
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = (props) => {
    const navigate = useNavigate();
    const goback = () => navigate(-1);
  return (
    <>
  <h1>페이지를 찾을수없습니다.</h1>
  <button onClick={goback}>뒤로가기</button>
  </>
  );
};

export default NotFound;