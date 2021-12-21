import React from "react";
import Comment from "./comment";

import PropTypes from "prop-types";

const CommentsList = ({ comments, onDelete }) => {
    if (comments) {
        const sortedComments = comments.sort(
            (a, b) => b.created_at - a.created_at
        );

        return (
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr />
                    {sortedComments.map((comment) => (
                        <Comment
                            key={comment._id}
                            content={comment.content}
                            createdAt={comment.created_at}
                            id={comment._id}
                            userId={comment.userId}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            </div>
        );
    }

    return "Loading...";
};

CommentsList.propTypes = {
    userId: PropTypes.string.isRequired,
    comments: PropTypes.array,
    onDelete: PropTypes.func
};

export default CommentsList;
