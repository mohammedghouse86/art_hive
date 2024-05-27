import React, { useContext, useEffect } from 'react'
import ArtContext from "../ContextAPI/ArtWorks/artContext";
import PostItem from './PostItem';
import { useNavigate } from 'react-router-dom';

const AllPost = () => {
    let history = useNavigate();
    const context = useContext(ArtContext);
    const { art_post, getPost } = context;

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getPost()
        }
        else {
          history("/login")}
    }, []);

    return (
        <>
            <div className='container'>
                {art_post.map((art_post_1, i) => {
                    return (
                        (art_post_1._id !== undefined) && <PostItem key={art_post_1._id} post={art_post[i]} i={i} />
                    )
                })}</div>
        </>)
}


export default AllPost;


