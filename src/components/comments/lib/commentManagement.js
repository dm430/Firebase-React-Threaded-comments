import * as firebase from 'firebase';
import 'firebase/firestore';

const addComment = async (comment, user) => {
    const db = firebase.firestore();
    const batch = db.batch();

    if (comment.parentId) {
        const parentCommentRef = db.collection('comments3').doc(comment.parentId);

        batch.set(parentCommentRef, 
            { childCount: firebase.firestore.FieldValue.increment(1) }, 
            { merge: true });
    }
    
    const newCommentRef = db.collection('comments3').doc();

    batch.set(newCommentRef, {
        content: comment.content,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: null,
        moderated: false,
        parentId: comment.parentId,
        postId: comment.postId,
        postType: comment.postType,
        user: {
            uid: user.uid,
            displayName: user.displayName,
            profileImage: user.photoURL || null
        }
    });

    batch.commit();

    return await newCommentRef.get();
};

const getComments = async (parentId, slug, type, limit) => {
    const db = firebase.firestore(); 
    let commentsQuery = db.collection('comments3')
                            .where('postType', '==', type)
                            .where('postId', '==', slug)
                            .where('parentId', '==', parentId || null)
                            .orderBy("createdAt");

    if (limit) {
        commentsQuery = commentsQuery.limit(limit);
    }

    return commentsQuery.get();;
}

export { addComment, getComments };