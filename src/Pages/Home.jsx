import React, { useEffect, useState } from 'react';
import services from '../appwrite/config';
import { Container, PostCard } from '../components/index';
import { useSelector } from 'react-redux';

function Home() {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector(state => state.auth.status); // Get from Redux

  useEffect(() => {
    // Only fetch posts if user is authenticated
    if (authStatus) {
      services
        .getPosts()
        .then(posts => {
          if (posts) {
            setPosts(posts.documents);
          }
        })
        .catch(error => {
          console.log('Error fetching posts:', error);
        });
    }
  }, [authStatus]); // Depend on authStatus

  if (posts.length === 0) {
    return (
      <div className='w-full min-h-screen text-center bg-gradient-to-br from-slate-50 to-slate-200 flex flex-col justify-center items-center'>
        <Container>
          <div className='flex flex-wrap justify-center'>
            <div className='p-8 bg-white rounded-xl shadow-2xl w-full max-w-xl'>
              <h1 className='font-bold text-slate-700 text-3xl md:text-4xl mb-4'>
                No Posts Available Yet
              </h1>
              <p className='text-slate-500 text-lg'>
                It seems there are no posts to display right now. Please check
                back later or try creating a new post!
              </p>
              <div className='mt-6 text-4xl text-slate-300'>📝</div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className='w-full py-8 bg-slate-50 min-h-screen'>
      <Container>
        <h1 className='text-4xl font-bold text-slate-800 mb-12 text-center'>
          Latest Posts
        </h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {posts.map(post => (
            <div key={post.$id} className='p-0'>
              {' '}
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
