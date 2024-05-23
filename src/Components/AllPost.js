import React, { useContext, useEffect, useState } from 'react'
import ArtContext from "../ContextAPI/ArtWorks/artContext";
import PostItem from './PostItem';


const AllPost = () => {

    const context = useContext(ArtContext);
    const { art_post, getPost } = context;

    useEffect(() => {
        getPost()
    }, [getPost]);

    return (
        <>
            <div className='row row-cols-5'>
                {art_post.map((art_post_1, i) => {
                    return (
                        (art_post_1._id !== undefined) && <PostItem key={art_post_1._id} post={art_post[i]} />
                    )
                })}</div>
        </>)
}


export default AllPost;


