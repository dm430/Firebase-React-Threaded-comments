import React, { useState } from 'react';
import propTypes from 'prop-types';

const ReplyForm = ({ newCommentButtonText, submitButtonText, cancelButtonText, postComment }) => {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [commentReplyText, setCommentReplyText] = useState('');

    const handleSubmitClick = async () => {
        await postComment(commentReplyText);
        setShowReplyForm(false);
        setCommentReplyText('');
    };

    return (
        <div>
        {!showReplyForm && (
            <a className="float-right btn btn-outline-primary ml-2" onClick={() => setShowReplyForm(true)}>
            <i className="fa fa-reply"></i> {newCommentButtonText}
            </a>
        )} 
        {showReplyForm && (
            <div className="form">
                <div className="form-group">
                    <label for="exampleFormControlTextarea1">Reply:</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={commentReplyText} onChange={(event) => setCommentReplyText(event.target.value)}></textarea>
                </div>	
                <a className="float-right btn btn-outline-primary ml-2" onClick={handleSubmitClick}>
                    <i className="fa fa-reply"></i> {submitButtonText}
                </a>
                <a className="float-right btn text-white btn-danger" onClick={() => setShowReplyForm(false)}>
                    <i className="fa fa-heart"></i> {cancelButtonText}
                </a>
            </div>
        )} 
       </div>
    );
};

ReplyForm.propTypes = {
    newCommentButtonText: propTypes.string,
    submitButtonText: propTypes.string,
    cancelButtonText: propTypes.string,
    postComment: propTypes.func.isRequired
};

ReplyForm.defaultProps = {
    newCommentButtonText: 'Reply',
    submitButtonText: 'submit',
    cancelButtonText: 'cancel',
    postComment: () => {}
};

export default ReplyForm;