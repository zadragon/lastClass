// 리액트 패키지를 불러옵니다.
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// redux hook을 불러옵니다.
import { useDispatch, useSelector } from "react-redux";
import { createBucket, isLoaded } from "./redux/modules/bucket";

import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "./firebase";

const BucketList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 버킷리스트를 리덕스 훅으로 가져오기
    const bucket_list = useSelector((state) => state.bucket.list);

    //const initialState = ["영화관 가기", "매일 책읽기", "수영 배우기"];
    //const [list, setList] = useState(initialState);
    // const addTodo = () => {
    //     setList([...list, todoInput.current.value]);
    //     console.log(list)
    // }

    //console.log("나오나", bucket_data);

    const todoInput = useRef();

    const addTodoDispatch = async () => {
        const addData = await addDoc(collection(db, "bucket_list"), { text: todoInput.current.value, completed: false });
        //console.log(addData.id);
        dispatch(createBucket({ id: addData.id, text: todoInput.current.value }));
        dispatch(isLoaded(true));
        todoInput.current.value = "";
        todoInput.current.focus();
    };

    const enterPress = (e) => {
        if (e.key === "Enter") {
            addTodoDispatch();
        }
    };

    return (
        <>
            <ListStyle>
                {bucket_list.map((list, index) => {
                    return (
                        <ItemStyle
                            key={index}
                            className="list_item"
                            color={list.completed ? "orange" : "aliceblue"}
                            onClick={() => {
                                navigate(`detail?${index}`);
                            }}
                        >
                            {list.text}
                        </ItemStyle>
                    );
                })}
            </ListStyle>
            <Input>
                <input type="text" ref={todoInput} onKeyPress={enterPress} />
                <button onClick={addTodoDispatch}>추가하기</button>
            </Input>
        </>
    );
};

const ListStyle = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
`;

const ItemStyle = styled.div`
    padding: 16px;
    margin: 8px;
    background-color: ${(props) => props.color};
`;

const Input = styled.div`
    max-width: 350px;
    min-height: 10vh;
    background-color: #fff;
    padding: 16px;
    margin: 20px auto;
    border-radius: 5px;
    border: 1px solid #ddd;
`;

export default BucketList;
