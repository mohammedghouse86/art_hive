import React, { useContext, useEffect } from 'react'
import ArtContext from "../ContextAPI/ArtWorks/artContext";
import CommentItem from './CommentItem';

const PostItem = ({ post,i }) => {
    const context = useContext(ArtContext);
    const { comment, getComment } = context;
    const { imageBase64, filename } = post;

    useEffect(() => {
        getComment(post._id);
        console.log(`comment`,comment)
    }, [])


    return (
        <div>
            <div className='d-flex justify-content-center'>
                <div className="card my-3 mx-3" style={{ width: '30rem' }}>
                    <div className="card-body">
                        <img src={`data:image/jpeg;base64,${imageBase64}`} alt={filename} style={{ width: '100%' }} />
                        <p className="card-text">{post.filename}</p>
                        <div className='container'>
                            {comment.map((comment_1, j) => {
                                if(post._id === comment_1.artpost){
                                return (
                                    (comment_1._id !== undefined) && <CommentItem key={comment_1._id} post={comment[j]} />
                                )}
                                
                            })}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostItem;
