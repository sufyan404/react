import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import services from '../appwrite/config';
import { Container, Button } from '../components';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector(state => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      services.getPost(slug).then(post => {
        if (post) {
          setPost(post);
        } else {
          navigate('/');
        }
        setPost(post);
      });
    } else {
      navigate('/');
    }
  }, [slug, navigate]);

  const deletePost = () => {
    services.deletePost(post.$id).then(status => {
      if (status) {
        services.deleteFile(post.featuredImage);
        navigate('/');
      }
    });
  };

  return post ? (
    <div className='py-8'>
      <Container>
        <div className='w-full flex justify-center mb-4 relative border rounded-xl p-2'>
          <img
            src={services.getFilePrefiew(post.featuredImage)}
            alt={post.title}
          />
          {isAuthor && (
            <div className='absolute right-6 top-6'>
              <Link to={`/edit-post/${post.$id}`}>
                <Button
                  bgColor='bg-green-500'
                  className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 mr-4 mt-5'
                >
                  Edit
                </Button>
              </Link>
              <button
                className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 mt-5'
                onClick={deletePost}
              >
                Delete
              </button>
            </div>
          )}
        </div>
        <div className='w-full mb-6'>
          <h1 className='text-2xl font-bold'>{post.title}</h1>
          <div className='browser-css'>{parse(post.content)}</div>
        </div>
      </Container>
    </div>
  ) : null;
}
