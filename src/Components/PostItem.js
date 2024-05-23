import React, { useEffect, useState } from 'react';

const PostItem = ({ post }) => {
    const [imageSrc, setImageSrc] = useState('');
    const { imageBase64, filename } = post;

    
    return (
        <div>
            <div className='row-md-3'>
                <div className="card my-3 mx-3" style={{ width: '18rem' }}>
                    <div className="card-body">
                    <img src={`data:image/jpeg;base64,${imageBase64}`} alt={filename} style={{ width: '100%' }} />
                        <p className="card-text">{post.filename}</p>              
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostItem;
