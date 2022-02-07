import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import API from "../../../api";
import CommentsList from "./commentsList";
import NewCommentForm from "./newCommentForm";

const Comments = ({ userId }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        API.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
    }, []);

    const handleSubmit = (data) => {
        API.comments
            .add({ ...data, pageId: userId })
            .then((data) => setComments([...comments, data]));
    };

    const deleteComment = (id) => {
        API.comments.remove(id).then((id) => {
            setComments(comments.filter((comment) => comment._id !== id));
        });
    };

    return (
        <>
            <NewCommentForm onSubmit={handleSubmit} />
            {comments.length > 0 && (
                <CommentsList
                    comments={comments}
                    onDelete={deleteComment}
                />
            )}
        </>
    );
};

Comments.propTypes = {
    userId: PropTypes.string,
    onSubmit: PropTypes.func
};

export default Comments;