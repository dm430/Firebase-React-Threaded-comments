import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';

import './styles.css';
import { getComments } from '../lib/commentManagement';
import CommentCard from '../commentCard';

const CommentThread = ({ slug, type, parentId, maxDepthToOpen, currentDepth, parentAddedSubThreadComments, commentReplyCount }) => {
    const [comments, setComments] = useState([]);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
      const loadComments = async () => {
        console.log(`fetching data for currentDepth: ${currentDepth}`);

        if (currentDepth < maxDepthToOpen || showMore) {
            const commentsForLevel = await getComments(parentId, slug, type);
            setComments(commentsForLevel.docs);
        }
      }
  
      loadComments();
    }, [showMore]);

    const nextDepth = !showMore ? currentDepth : 0;
    const commentsToRender = [...comments, ...parentAddedSubThreadComments];
    const commentsComps = commentsToRender?.map(commentDoc => 
        <CommentCard key={commentDoc.id} 
            comment={{ id: commentDoc.id, ...commentDoc.data()}} 
            commentDepth={nextDepth} 
            maxThreadDepth={maxDepthToOpen} 
        />
    );

    const showMoreLink = commentReplyCount > 0 ? 
        <span onClick={() => setShowMore(true)}><i className="fas fa-ellipsis-h"></i>See ({commentReplyCount}) more replies</span> 
        : null;

    return (
        (commentsComps && currentDepth < maxDepthToOpen) || showMore ? 
          <div className={`${parentId}-thread thread`}>{commentsComps}</div> 
        : showMoreLink
    );
}

CommentThread.propTypes = {
    slug: propTypes.string.isRequired,
    type: propTypes.string.isRequired,
    parentId: propTypes.string,
    maxDepthToOpen: propTypes.number,
    currentDepth: propTypes.number,
    commentReplyCount: propTypes.number,
    parentAddedSubThreadComments: propTypes.array
}

CommentThread.defaultProps = {
    parentId: null,
    maxDepthToOpen: 0,
    currentDepth: 0,
    commentReplyCount: 0,
    parentAddedSubThreadComments: []
}

export default CommentThread;