import React, { useContext, useEffect, useState } from 'react'
import ArtContext from "../ContextAPI/ArtWorks/artContext";
import CommentItem from './CommentItem';

const PostItem = ({ post, i }) => {
    const context = useContext(ArtContext);
    const { comment, getComment, getLikes, postComment } = context;
    const [likes, setLikes] = useState(0);
    const { imageBase64, filename } = post;
    const [bakwas, Setbakwas] = useState({ bakwas: "" }) // bakwas === comment

    useEffect(() => {
        const fetchLikes = async () => {
            const numLikes = await getLikes(post._id);
            setLikes(numLikes);
        };

        getComment(post._id);
        fetchLikes();
        //console.log(post.user.imageBase64)
    }, []);

    const fun_addComment = async () => {
        await postComment(post._id, bakwas.bakwas);
        getComment(post._id);
        Setbakwas({ bakwas: "" }); // Clear the input field
    }

    const onChange = (e) => {
        Setbakwas({ ...bakwas, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <div className='d-flex justify-content-center'>
                <div className="card my-3 mx-3" style={{ width: '30rem' }}>
                    <div className="card-body">
                        <div className="d-flex justify-content-start mx-2 my-2"> <img src={`data:image/jpeg;base64,${post.user.imageBase64}`} alt={filename} style={{ width: '45px', height: '50px', borderRadius: '50%', border: '2px solid red' }} />
                            <p className="card-text" > {post.user.name}
                            </p>
                        </div>
                        <img src={`data:image/jpeg;base64,${imageBase64}`} alt={filename} style={{ width: '450px', height: '350px' }} />
                        <p className="card-text">{post.filename}</p>
                        <p className="card-text">Likes - {likes}
                            <button style={{fontSize: '24px', border: 'none', color:'red', background: 'none', cursor: 'pointer'}}>
                                <i class="fas fa-heart"></i>
                            </button>


                        </p>
                        <div>
                            <input type='text' placeholder='Enter your comment' onChange={onChange} name='bakwas' value={bakwas.bakwas}></input>
                            <button type='button' onClick={fun_addComment}>Comment</button>
                        </div>
                        <div className='container'>
                            {comment.map((comment_1, j) => {
                                if (post._id === comment_1.artpost) {
                                    return (
                                        (comment_1._id !== undefined) && <CommentItem key={comment_1._id} post={comment[j]} />
                                    )
                                }

                            })}</div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default PostItem;
