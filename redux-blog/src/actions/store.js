import { configureStore } from "@reduxjs/toolkit";

import blogReducer from "../reducers/blogReducer";
import loginReducer from "../reducers/loginReducer";
import notificationReducer  from "../reducers/notificationReducer";

const store = configureStore({
    reducer:{
        blog:blogReducer,
        login:loginReducer,
        notification:notificationReducer,
    },
    // eslint-disable-next-line no-undef
    devTools: process.env.NODE_ENV !== "production",
})


export default store
