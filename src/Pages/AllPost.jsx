import React from 'react';
import services from '../appwrite/config';
import { Container, PostCard } from '../components/index';
import { useState, useEffect } from 'react';

function AllPost() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {}, []);
  services.getPosts([]).then(post => {
    if (post) setPosts(post.documents);
  });

  return (
    <div className='py-8 w-full'>
      <Container>
        <div>
          {posts.map(post => (
            <div key={post.$id} className='p-2 w-1/4'>
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
