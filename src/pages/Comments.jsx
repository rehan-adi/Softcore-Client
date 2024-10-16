import { useEffect } from 'react';
import { useComment } from '../hooks/useComment';
import { useNavigate, useParams } from 'react-router-dom';
import { SendHorizonal, ArrowLeft, Loader2 } from 'lucide-react';

const Comments = () => {

  const { postId } = useParams();
  const navigate = useNavigate();

  const { getComment, loading, comments } = useComment(postId);

  useEffect(() => {
    getComment();
  }, [postId, getComment]);


  return (
    <div className="flex flex-col items-center bg-black text-white min-h-screen px-3 py-4 md:py-6">
      <nav className="flex items-center w-full max-w-2xl mb-5">
        <button onClick={() => navigate(-1)} className="mr-4 p-2 bg-neutral-800 rounded-full hover:bg-neutral-700">
          <ArrowLeft className="text-white" />
        </button>
        <h2 className="text-xl font-semibold">Comments</h2>
      </nav>
      <div className="flex-1 w-full max-w-2xl md:pb-20 pb-32 overflow-y-auto mb-6">
        {loading ? (
          <div className='flex justify-center items-center mt-40'>
            <Loader2 className='animate-spin w-6 h-6' />
          </div>
        ) : comments.length === 0 ? (
          <div className='flex justify-center items-center mt-40'>
            <p className='text-white'>No comments available.</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {comments.map((comment) => (
              <li key={comment._id} className="flex items-start bg-black border border-white border-opacity-15 p-4 rounded-lg shadow-md">
                {comment.user.profilePicture ? (
                  <img
                    src={comment.user.profilePicture}
                    alt={comment.user.fullname}
                    className="w-8 h-8 rounded-full mr-3"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-500 mr-3"></div>
                )}
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <span className="font-semibold text-base">{comment.user.fullname}</span>
                    <span className="text-gray-400 text-xs ml-3">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-semibold">{comment.content}</p>
                </div>
              </li>
            ))}
          </ul>
        )}

      </div>
      <form className="w-full max-w-2xl px-3 bg-black flex justify-center fixed bottom-16 md:bottom-0 items-center md:py-7 py-5">
        <input
          type="text"
          placeholder="Add a comment..."
          maxLength="500"
          className="flex-1 bg-neutral-800 text-white rounded-full px-6 py-3 focus:outline-none placeholder:text-white focus:ring-2 focus:ring-neutral-600"
          name="content"
        />
        <button type="submit" className="ml-2 p-2 bg-white text-black rounded-lg flex items-center">
          <SendHorizonal />
        </button>
      </form>
    </div>
  );
};

export default Comments;
