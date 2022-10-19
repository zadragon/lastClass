// 리액트 패키지를 불러옵니다.
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
// redux hook을 불러옵니다.
import { useDispatch, useSelector } from "react-redux";
import { deleteBucket, doneBucket, isLoaded } from "./redux/modules/bucket";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import styled from "styled-components";

const Detail = (props) => {
    // 1. useLocation 훅 취득
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let dataIdx = location.search.substring(1);

    // 스토어에서 상태값 가져오기
    const bucket_list = useSelector((state) => state.bucket.list);

    const delList = () => {
        deleteDoc(doc(db, "bucket_list", bucket_list[dataIdx].id));
        dispatch(deleteBucket(bucket_list[dataIdx].id));
        dispatch(isLoaded(true));
        navigate(-1);
    };

    const todoDone = () => {
        updateDoc(doc(db, "bucket_list", bucket_list[dataIdx].id), { completed: true });
        dispatch(doneBucket(bucket_list[dataIdx].id));
        dispatch(isLoaded(true));
        navigate(-1);
    };

    return (
        <>
            <h1>{dataIdx} 번째 상세 페이지입니다! </h1>
            <TodoText>{bucket_list[dataIdx]?.text}</TodoText>
            <ButtonGroup>
                <Button onClick={todoDone}>완료하기</Button>
                <Button onClick={delList}>삭제하기</Button>
            </ButtonGroup>
        </>
    );
};

const TodoText = styled.div`
    border-radius: 3px;
    padding: 5px;
    margin-bottom: 10px;
`;

export default Detail;
