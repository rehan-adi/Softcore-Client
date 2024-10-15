import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SendHorizonal, ArrowLeft } from 'lucide-react';

const Comments = () => {

  const navigate = useNavigate();
  const dummyComments = [
    {
      _id: '1',
      user: {
        fullname: 'John Doe',
        profilePicture: 'https://via.placeholder.com/40',
      },
      content: 'This is a great post! Thank you for sharing.',
      createdAt: '2024-10-14T10:00:00Z',
    },
    {
      _id: '2',
      user: {
        fullname: 'Jane Smith',
        profilePicture: 'https://via.placeholder.com/40',
      },
      content: 'I learned a lot from this, very insightful!',
      createdAt: '2024-10-14T11:30:00Z',
    },
    {
      _id: '3',
      user: {
        fullname: 'Alice Johnson',
        profilePicture: 'https://via.placeholder.com/40',
      },
      content: 'Can you elaborate more on this topic?',
      createdAt: '2024-10-14T12:15:00Z',
    },
  ];

  const [comments, setComments] = useState(dummyComments);
  const [commentFormData, setCommentFormData] = useState({ content: "" });

  const handleCommentChange = (e) => {
    setCommentFormData({ ...commentFormData, [e.target.name]: e.target.value });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      _id: (comments.length + 1).toString(),
      user: {
        fullname: 'You',
        profilePicture: 'https://via.placeholder.com/40',
      },
      content: commentFormData.content,
      createdAt: new Date().toISOString(),
    };

    setComments([...comments, newComment]);
    setCommentFormData({ content: "" });
  };

  return (
    <div className="flex flex-col items-center bg-black text-white min-h-screen px-3 py-4 md:py-6">
       <nav className="flex items-center w-full max-w-2xl mb-5">
        <button onClick={() => navigate(-1)} className="mr-4 p-2 bg-neutral-800 rounded-full hover:bg-neutral-700">
          <ArrowLeft className="text-white" />
        </button>
        <h2 className="text-xl font-semibold">Comments</h2>
      </nav>
      <div className="flex-1 w-full max-w-2xl md:pb-20 pb-32 overflow-y-auto mb-6">
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
      </div>
      <form onSubmit={handleCommentSubmit} className="w-full max-w-2xl px-3 bg-black flex justify-center fixed bottom-16 md:bottom-0 items-center md:py-7 py-5">
        <input
          type="text"
          placeholder="Add a comment..."
          maxLength="500"
          className="flex-1 bg-neutral-800 text-white rounded-full px-6 py-3 focus:outline-none placeholder:text-white focus:ring-2 focus:ring-neutral-600"
          value={commentFormData.content}
          name="content"
          onChange={handleCommentChange}
        />
        <button type="submit" className="ml-2 p-2 bg-white text-black rounded-lg flex items-center">
          <SendHorizonal />
        </button>
      </form>
    </div>
  );
};

export default Comments;
