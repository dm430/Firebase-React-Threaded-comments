import React, { useState } from 'react';

import './styles.css';
import { useAuth } from '../../../hooks/firebaseAuth';
import { addComment } from '../lib/commentManagement';
import ReplyForm from '../replyForm';
import CommentThread from '../commentThread';

const CommentCard = ({ comment, commentDepth, maxThreadDepth }) => {
    const fallBackProfileImage = 'https://image.ibb.co/jw55Ex/def_face.jpg'
	const profileImage = comment.user.profileImage || fallBackProfileImage;
	const [addedSubThreadComments, setAddedSubThreadComments] = useState([]);
	const firebaseUser = useAuth();

	const replyToComment = async (commentReplyText) => {
		const commentToAdd = {
            parentId: comment.id, 
            content: commentReplyText,
            postId: comment.postId,
            postType: comment.postType
		};
		
        const result = await addComment(commentToAdd, firebaseUser);
        setAddedSubThreadComments([...addedSubThreadComments, result])
	}

    return (
		<>
			<div className={`card comment id-${comment.id}`}>
				<div className="card-body">
					<div className="row">
						<div className="col-md-2">
							<img src={profileImage} className="img img-rounded img-fluid"/>
							<p className="text-secondary text-center">15 Minutes Ago</p>
						</div>
						<div className="col-md-10">
							<p>
								<a className="float-left"><strong>{comment.user.displayName}</strong></a>
								<span className="float-right"><i className="text-warning fa fa-star"></i></span>
								<span className="float-right"><i className="text-warning fa fa-star"></i></span>
								<span className="float-right"><i className="text-warning fa fa-star"></i></span>
								<span className="float-right"><i className="text-warning fa fa-star"></i></span>

							</p>
							<div className="clearfix"></div>
							<p>{comment.content}</p>
							<div>
								{firebaseUser && <ReplyForm buttonText="Add comment" postComment={replyToComment} />}
							</div>
						</div>
					</div>
				</div>
			</div>
			<CommentThread parentId={comment.id} type={comment.postType} slug={comment.postId} parentAddedSubThreadComments={addedSubThreadComments} currentDepth={(commentDepth + 1)} maxThreadDepth={maxThreadDepth} commentReplyCount={comment.childCount} />
		</>
    )
};

export default CommentCard;