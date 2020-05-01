import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';

import './styles.css';
import { getComments } from '../lib/commentManagement';
import CommentCard from '../commentCard';

const CommentThread = ({ slug, type, parentId, maxDepthToOpen, currentDepth, parentAddedSubThreadComments }) => {
    const [comments, setComments] = useState([]);
    const [showMore, setShowMore] = useState(false);
    // const [addedSubThreadComments, setAddedSubThreadComments] = useState([]);
    // const [subThreadsToLoad, setSubThreadsToLoad] = useState({});

    // const addToCommentToSubThread = async (parentId, content) => {
    //     const comment = {
    //         parentId, 
    //         content,
    //         postId: slug,
    //         postType: type
    //     };

    //     const user = {
    //         uid: '1234',
    //         displayName: 'Test User',
    //         profileImage: null
    //     };

    //     // TODO: This path is not optomized and could result in an extra read.
    //     const result = await addComment(comment, user);

    //     if (currentDepth < maxDepthToOpen) {
    //         setAddedSubThreadComments([...addedSubThreadComments, result])
    //     }

    //     // setShouldLoadSubThread(true);
    // };

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
    const commentsComps = commentsToRender?.map(commentDoc => { 
        return <CommentCard key={commentDoc.id} comment={{ id: commentDoc.id, ...commentDoc.data()}} commentDepth={nextDepth} maxThreadDepth={maxDepthToOpen} /> 
        // return (
        //     <div key={commentDoc.id} className={`${commentDoc.id}-thread thread`}>
        //         <CommentCard comment={{ id: commentDoc.id, ...commentDoc.data()}} addToCommentToThread={addToCommentToSubThread} /> 

        //         {(currentDepth < maxDepthToOpen) && (
        //             <div className={`${commentDoc.id}-thread-replies subthread`}> 
        //                 <CommentThread parentId={commentDoc.id} type={type} slug={slug} currentDepth={nextDepth} maxDepthToOpen={maxDepthToOpen} parentAddedSubThreadComments={addedSubThreadComments} />
        //             </div>
        //         )}
        //         {(currentDepth >= maxDepthToOpen) && (
        //             <span onClick={handleSubThreadLoad}><i className="fas fa-ellipsis-h"></i>See more replies</span>
        //         )}
        //     </div>
        // );
    });

    return (
        (commentsComps && currentDepth < maxDepthToOpen) || showMore ? 
            <div className={`${parentId}-thread thread`}>{commentsComps}</div> 
            : <span onClick={() => setShowMore(true)}><i className="fas fa-ellipsis-h"></i>See more replies</span>
    );
}

CommentThread.propTypes = {
    slug: propTypes.string.isRequired,
    type: propTypes.string.isRequired,
    parentId: propTypes.number,
    maxDepthToOpen: propTypes.number,
    currentDepth: propTypes.number,
    parentAddedSubThreadComments: propTypes.array
}

CommentThread.defaultProps = {
    parentId: null,
    maxDepthToOpen: 0,
    currentDepth: 0,
    parentAddedSubThreadComments: []
}

export default CommentThread;