import { createSlice, createAction } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        commentRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsReceved,
    commentsRequestFiled,
    commentCreated,
    commentRemoved
} = actions;

const createCommentRequested = createAction("comments/createCommentRequested");
const createCommentFailed = createAction("comments/createCommentFailed");
const removeCommentRequested = createAction("comments/removeCommentRequested");
const removeCommentFailed = createAction("comments/removeCommentFailed");

export function createComment(payload) {
    return async function (dispatch) {
        dispatch(createCommentRequested());
        try {
            const { content } = await commentService.createComment(payload);
            dispatch(commentCreated(content));
        } catch (error) {
            dispatch(createCommentFailed(error.message));
        }
    };
}

export function removeComment(id) {
    return async function (dispatch) {
        dispatch(removeCommentRequested());
        try {
            const { content } = await commentService.removeComment(id);
            if (!content) {
                dispatch(commentRemoved(id));
            }
        } catch (error) {
            dispatch(removeCommentFailed(error.message));
        }
    };
}

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReceved(content));
    } catch (error) {
        dispatch(commentsRequestFiled(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
