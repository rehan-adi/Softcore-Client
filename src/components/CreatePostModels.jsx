import axios from "axios";
import { useState } from "react";
import PropTypes from 'prop-types';
import { Loader } from 'lucide-react';
import { toast } from "react-hot-toast";
import { getToken } from "../utils/token";
import { useForm } from "react-hook-form";

function CreatePostModal({ onClose }) {

  const { register, handleSubmit, formState: { errors } } = useForm({
  });
  const [loading, setLoading] = useState(false);

  const onSubmitForm = async (data) => {
    const token = getToken('token');

    if (!token) {
      toast.error("Please login to create a post");
      onClose();
      return;
    }

    const formData = new FormData();

    formData.append("content", data.content);
    formData.append("category", data.category);
    const tagsArray = data.tags.split(',').map(tag => tag.trim());
    tagsArray.forEach(tag => formData.append("tags[]", tag));
    if (data.image?.[0]) {
      formData.append("image", data.image[0]);
    }


    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3333/api/v1/blogs/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log("Post created:", response.data);
      toast.success("Post created successfully!");
      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Error creating post. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="md:w-[45vw] bg-black border border-white border-opacity-20 shadow-white shadow-md p-6 rounded-lg">
        <div className="flex items-center mb-5 justify-between">
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
        <form onSubmit={handleSubmit(onSubmitForm)} encType="multipart/form-data">
          <div className="mb-4">
            <label htmlFor="content" className="block mb-3 text-gray-300">
              Content
            </label>
            <textarea
              id="content"
              className="form-textarea bg-black focus:outline-none border border-white border-opacity-20 px-3 py-3 rounded-md mt-1 block w-full placeholder:text-white"
              rows="5"
              placeholder="What do you want to talk about ?"
              {...register("content", { required: "Content is required" })}
            ></textarea>
            {errors.content && <span className="text-red-500">{errors.content.message}</span>}
          </div>
          <div className="flex justify-between lg:flex-row gap-5 flex-col mb-5 items-center">
            <div className="w-full">
              <label htmlFor="category" className="block text-gray-300">
                Category
              </label>
              <select
                id="category"
                className="form-select bg-black border border-white border-opacity-20 px-3 py-3 rounded-md focus:outline-none mt-1 block w-full"
                {...register("category")}
              >
                <option value="">Select category...</option>
                <option value="development">Development</option>
                <option value="frontend">Coding</option>
                <option value="backend">Stock Market</option>
                <option value="news">News</option>
                <option value="trending">Trending</option>
                <option value="blockchain">Blockchain</option>
                <option value="politics">Politics</option>
                <option value="AI">AI</option>
                <option value="hiring">Hiring</option>
              </select>
              {errors.category && <span className="text-red-500">{errors.category.message}</span>}
            </div>
            <div className="w-full">
              <label htmlFor="tags" className="block text-gray-300">
                Tags
              </label>
              <input
                type="text"
                id="tags"
                className="form-input mt-1 bg-black focus:outline-none border border-white border-opacity-20 px-3 py-3 rounded-md block placeholder:text-white w-full"
                placeholder="Separate tags with commas ..."
                {...register("tags")}
              />
            </div>
          </div>
          <div className="mb-4 mt-4">
            <div className="flex flex-col items-center">
              <label className="w-full border-2 border-dashed border-gray-500 p-4 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...register("image")}
                />
                <div className="flex flex-col items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-400 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 16l3-3m0 0l3 3m-3-3v8m13-12a2 2 0 00-2-2h-3.5a2 2 0 01-1.41-.59l-1.5-1.5A2 2 0 0010 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2v-5a2 2 0 00-2-2h-5.5"
                    ></path>
                  </svg>
                  <p className="text-gray-400">Click to browse files</p>
                </div>
              </label>
            </div>
          </div>
          <div className="flex justify-start mt-10">
            <button
              className="bg-white text-black font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              style={{ minWidth: "150px" }}
              disabled={loading}
            >
              {loading ? (
                <><Loader className="w-5 h-5 animate-spin" /> Submiting ...</>
              ) : (
                "Submit Post"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

CreatePostModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};


export default CreatePostModal;
