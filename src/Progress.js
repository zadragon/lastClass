import React from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";

const Progress = () => {
    const bucket_list = useSelector((state) => state.bucket.list);

    let count = 0;

    let goal_per = bucket_list.map((item, idx) => {
        if (item.completed) {
            count++;
        }
    });

    return (
        <ProgressBar>
            <HighLight width={(count / bucket_list.length) * 100 + "%"} />
        </ProgressBar>
    );
};

const ProgressBar = styled.div`
    background: #eee;
    width: 100%;
    height: 40px;
`;

const HighLight = styled.div`
    background: orange;
    width: ${(props) => (props.width === "NaN%" ? "0%" : props.width)};
    height: 40px;
    transition: 0.3s;
`;

export default Progress;
