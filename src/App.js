import React, { useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { connect, Connect, useDispatch, useSelector } from "react-redux";
import { createBucket, isLoaded, loadBucket } from "./redux/modules/bucket";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

// import [컴포넌트 명] from [컴포넌트가 있는 파일경로];
import BucketList from "./BucketList";
import styled from "styled-components";
import Detail from "./Detail";
import NotFound from "./NotFound";
import Progress from "./Progress";
import Spinner from "./Spinner";

// 이 함수는 스토어가 가진 상태값을 props로 받아오기 위한 함수예요.
const mapStateTopProps = (state) => ({
    bucket_list: state.bucket.list,
});

// 이 함수는 값을 변화시키기 위한 액션 생성 함수를 props로 받아오기 위한 함수예요.
const mapDispatchToProps = (dispatch) => ({
    load: () => {
        dispatch(loadBucket());
    },
    create: (new_item) => {
        console.log(new_item);
        dispatch(createBucket(new_item));
    },
});

// 클래스형 컴포넌트는 이렇게 생겼습니다!
const App = () => {
    const dispatch = useDispatch();
    //const bucket_list = useSelector((state) => state.bucket.list);
    let is_Loaded = useSelector((state) => state.bucket.is_Loaded);

    useEffect(() => {
        let bucket_data = [];
        const querySnapshot = getDocs(collection(db, "bucket_list"));

        querySnapshot.then(function (data) {
            data.forEach((doc) => {
                if (doc.exists) {
                    bucket_data = [...bucket_data, { id: doc.id, ...doc.data() }];
                }
            });
            dispatch(loadBucket(bucket_data));
            dispatch(isLoaded(true));
        });

        // [] 디펜던시가 없다면 componentDidMount, componentDidUpdate 호출 (업데이트 될때마다 호출)
        // [] 디펜던시가 있다면 위 function은 componentDidMount 일때만 호출 (componentDidMount 일때 한번만 실행)

        return () => {
            console.log("컴포넌트가 화면에서 사라짐");
        };
    }, []);

    return (
        <div className="App">
            <Container>
                <Title>내 버킷리스트</Title>
                <Progress />
                <Line />
                {/* 컴포넌트를 넣어줍니다. */}
                {/* <컴포넌트 명 [props 명]={넘겨줄 것(리스트, 문자열, 숫자, ...)}/> */}
                {/* Route 쓰는 법 2가지를 모두 써봅시다! */}
                {!is_Loaded ? (
                    <Spinner />
                ) : (
                    <Routes>
                        <Route path="/" element={<BucketList />} />
                        <Route path="/detail" element={<Detail />}>
                            <Route path=":id" element={<Detail />} />
                        </Route>
                        <Route path={"*"} element={<NotFound />} />
                    </Routes>
                )}
            </Container>
        </div>
    );
};

const Input = styled.div`
    max-width: 350px;
    min-height: 10vh;
    background-color: #fff;
    padding: 16px;
    margin: 20px auto;
    border-radius: 5px;
    border: 1px solid #ddd;
`;

const Container = styled.div`
    max-width: 350px;
    min-height: 60vh;
    background-color: #fff;
    padding: 16px;
    margin: 20px auto;
    border-radius: 5px;
    border: 1px solid #ddd;
`;

const Title = styled.h1`
    color: slateblue;
    text-align: center;
`;

const Line = styled.hr`
    margin: 16px 0px;
    border: 1px dotted #ddd;
`;

export default connect(mapStateTopProps, mapDispatchToProps)(App);
