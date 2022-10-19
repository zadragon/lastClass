const LOAD = "bucket/LOAD";
const CREATE = "bucket/CREATE";
const DELETE = "bucket/DELETE";
const DONE = "bucket/DONE";
const LOADED = "bucket/LOADED";

const initialState = {
    is_Loaded: false,
    //list: ["영화관 가기 redux", "매일 책읽기 redux", "수영 배우기 redux"],
    list: [
        // { text: "영화관 가기", completed: false },
    ],
};

export const loadBucket = (bucket) => {
    return { type: LOAD, bucket };
};

export const createBucket = (bucket) => {
    return { type: CREATE, bucket };
};

export const deleteBucket = (id) => {
    return { type: DELETE, id };
};

export const doneBucket = (id) => {
    return { type: DONE, id };
};

export const isLoaded = (loaded) => {
    return { type: LOADED, loaded };
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        // do reducer stuff
        case "bucket/LOAD":
            return { is_loaded: true, list: action.bucket };

        case "bucket/CREATE":
            const add_bucket_list = [...state.list, { ...action.bucket, completed: false }];
            return { list: add_bucket_list };

        case "bucket/DELETE":
            if (state.list.length > 0) {
                const del_bucket_list = state.list.filter((item) => item.id != action.id);
                return { list: del_bucket_list };
            }
            return state;

        case "bucket/DONE":
            const done_bucket_list = state.list.map((item) => {
                if (item.id == action.id) {
                    return { ...item, completed: true };
                }
                return item;
            });
            return { list: done_bucket_list };
        case "bucket/LOADED":
            return { ...state, is_Loaded: action.loaded };
        default:
            return state;
    }
}
