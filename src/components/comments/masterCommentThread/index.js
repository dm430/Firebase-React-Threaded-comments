import React, { useState } from 'react';
import propTypes from 'prop-types';

import { useAuth } from '../../../hooks/firebaseAuth';
import { addComment } from '../lib/commentManagement';
import CommentThread from '../commentThread';
import ReplyForm from '../replyForm';

const MasterCommentThread = ({ slug, type, parentId, maxThreadDepth }) => {
    const [addedSubThreadComments, setAddedSubThreadComments] = useState([]);
    const firebaseUser = useAuth();

    const addCommentToMasterThread = async (commentReplyText) => {
        const comment = {
            parentId, 
            content: commentReplyText,
            postId: slug,
            postType: type
        };

        const result = await addComment(comment, firebaseUser);
        setAddedSubThreadComments([...addedSubThreadComments, result])
    };

    return (
        <div className="container">
            <div className="row"> 
                <div className="col-sm-12"> 
                    {firebaseUser ? <ReplyForm buttonText="Add comment" postComment={addCommentToMasterThread} /> : <p>Login to comment</p>}
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12"> 
                    <CommentThread slug={slug} type={type} parentId={parentId} maxThreadDepth={maxThreadDepth} parentAddedSubThreadComments={addedSubThreadComments} />
                </div>
            </div>
        </div>
    );
}

MasterCommentThread.propTypes = {
    slug: propTypes.string.isRequired,
    type: propTypes.string.isRequired,
    parentId: propTypes.string,
    maxThreadDepth: propTypes.number
}

MasterCommentThread.defaultProps = {
    parentId: null,
    maxThreadDepth: 0
}

export default MasterCommentThread;