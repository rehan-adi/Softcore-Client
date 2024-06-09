import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

function CreatePostModal({ onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);

  const cookies = new Cookies();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = cookies.get('token');
    console.log("Token:", token);
    if (!token) {
      console.error('No authentication token found. Please login.');
      return;
    }
    const postData = {
      title: 'Sample Title',
      content: 'Sample Content',
    };

    try {
      const response = await axios.post(
        'http://localhost:3333/api/create-post',
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log('Post created:', response.data);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="w-[45vw] bg-[#0A090F] border border-white border-opacity-20 shadow-white shadow-md p-6 rounded-lg">
        <div className="flex items-center mb-7 justify-between">
          <h2 className="text-xl font-semibold text-white">Create a Post</h2>
          <button className=" text-white" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} encType="multipart/form-data" >
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-300">Title</label>
            <input
              type="text"
              id="title"
              className="form-input bg-[#0A090F] focus:outline-none border border-white border-opacity-20 px-3 py-3 rounded-md mt-1 block w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-300">Content</label>
            <textarea
              id="content"
              className="form-textarea bg-[#0A090F] focus:outline-none border border-white border-opacity-20 px-3 py-3 rounded-md mt-1 block w-full"
              rows="4"
              placeholder="What do you want to talk about ?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-between items-center">
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-300">Category</label>
            <select
              id="category"
              className="form-select bg-[#0A090F] border border-white border-opacity-20 px-3 py-3 rounded-md focus:outline-none mt-1 block w-[278px] "
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select category...</option>
              <option value="development">Development</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="news">News</option>
              <option value="trending">Trending</option>
              <option value="blockchain">Blockchain</option>
              <option value="politics">Politics</option>
              <option value="AI">AI</option>
              {/* Add more categories here */}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-300">Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              className="form-input mt-1 block"
              onChange={handleImageChange}
            />
          </div>
          </div>
          <div className="mb-4">
            <label htmlFor="tags" className="block text-gray-300">Tags</label>
            <input
              type="text"
              id="tags"
              className="form-input mt-1 bg-[#0A090F] focus:outline-none border border-white border-opacity-20 px-3 py-3 rounded-md block w-full"
              placeholder="Separate tags with commas and tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <div className="flex justify-start mt-10">
            <button type="submit" className="bg-[#0A090F] border border-white border-opacity-40 text-white font-bold py-3 px-6 rounded-full">
              Submit Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePostModal;
