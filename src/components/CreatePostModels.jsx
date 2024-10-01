import PropTypes from 'prop-types';
import { Loader } from 'lucide-react';
import { useForm } from "react-hook-form";
import { useCreatePost } from "../hooks/useCreatePost"
import { zodResolver } from '@hookform/resolvers/zod';
import { createBlogValidation } from '../validations/blog.validation';

function CreatePostModal({ onClose }) {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(createBlogValidation),
    defaultValues: {
      content: '',
      category: '',
      tags: '',
      image: null,
  }
  });
  const { loading, onSubmitForm } = useCreatePost(); 

  const handleFormSubmit = (data) => {
    onSubmitForm(data, onClose); 
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="md:w-[45vw] w-[90%] bg-black border border-white border-opacity-20 md:shadow-white shadow-md md:p-6 p-4 rounded-lg">
        <div className="flex items-center md:mb-5 mb-4 justify-between">
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
        <form onSubmit={handleSubmit(handleFormSubmit)} encType="multipart/form-data">
          <div className="mb-4">
            <label htmlFor="content" className="block mb-3 text-gray-300">
              Content
            </label>
            <textarea
              id="content"
              className="form-textarea bg-black focus:outline-none border border-white border-opacity-20 px-3 md:py-3 py-2 rounded-md mt-1 block w-full text-white placeholder:text-white"
              rows="5"
              placeholder="What do you want to talk about ?"
              {...register("content", { required: "Content is required" })}
            ></textarea>
            {errors.content && <span className="text-red-500">{errors.content.message}</span>}
          </div>
          <div className="flex justify-between lg:flex-row md:gap-5 gap-3 flex-col mb-5 items-center">
            <div className="w-full">
              <label htmlFor="category" className="block text-gray-300">
                Category
              </label>
              <select
                id="category"
                className="form-select bg-black border text-white border-white border-opacity-20 px-3 md:py-3 py-2.5 rounded-md focus:outline-none mt-1 block w-full"
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
                className="form-input mt-1 bg-black focus:outline-none border border-white border-opacity-20 px-3 md:py-3 py-2.5 rounded-md block placeholder:text-white w-full"
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
                    className="md:w-12 md:h-12 w-8 h-8 text-gray-400 mb-2"
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
              disabled={loading}
            >
              {loading ? (
                <><Loader className="w-5 h-5 animate-spin inline-block mr-2" /> Submiting ...</>
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
