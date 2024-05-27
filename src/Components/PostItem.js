import React, { useContext, useEffect, useState } from 'react'
import ArtContext from "../ContextAPI/ArtWorks/artContext";
import CommentItem from './CommentItem';

const PostItem = ({ post, i }) => {
    const context = useContext(ArtContext);
    const { comment, getComment, getLikes, postComment, addLikes, did_like_q, delete_like } = context;
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

    const fetchLikes = async () => {
        const numLikes = await getLikes(post._id);
        setLikes(numLikes);
    };

    const fun_HANDEL_likes = async () => {
        //console.log('this is post.user = ',post.user)
        const check_like = await did_like_q(post._id); //checking if the used did actually like the photo.
        if(!check_like){
            console.log('liking this post now....');
        await addLikes(post._id);
        fetchLikes();}
        else{
            console.log('disliking this post now....');
            await delete_like(post._id);
            fetchLikes();
        }
        };
    

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
                        <p className="card-text">
                            
                            <button onClick ={fun_HANDEL_likes} style={{fontSize: '24px', border: 'none', color:'red', background: 'none', cursor: 'pointer'}}>
                                <i className="fas fa-heart mx-2 ">   {likes}</i>
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
