import axios from "axios";
import { Loader } from 'lucide-react';
import { useState } from "react";
import { toast } from "react-hot-toast";
import { getToken } from "../utils/token";
import { useForm } from "react-hook-form";

function CreatePostModal({ onClose, onSubmit }) {

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmitForm = async (data) => {
    const token = getToken('token');

    if (!token) {
      toast.error("Please login to create a post");
      onClose();
      return;
    }

        // If you're sending image as base64, handle conversion here
        const imageBase64 = data.image?.[0] ? await convertImageToBase64(data.image[0]) : null;

        const postData = {
          content: data.content,
          category: data.category,
          tags: data.tags,
          image: imageBase64,
        };

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3333/api/v1/blogs/create",
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log("Post created:", response.data);
      toast.success("Post created successfully!");
      onClose();
    } catch (error) {
      console.error("Error creating post:", error);
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
          <div className="flex justify-between items-center">
            <div className="mb-4">
              <label htmlFor="category" className="block text-gray-300">
                Category
              </label>
              <select
                id="category"
                className="form-select bg-black border border-white border-opacity-20 px-3 py-3 rounded-md focus:outline-none mt-1 block w-[278px] "
                {...register("category")}
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
              {errors.category && <span className="text-red-500">{errors.category.message}</span>}
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block text-gray-300">
                Image
              </label>
              <input
                type="file"
                id="image"
                className="form-input mt-1 block"
                {...register("image")}
                onChange={(e) => setValue("image", e.target.files)}
              />
              {console.log("Selected Image:", watch('image'))}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="tags" className="block text-gray-300">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              className="form-input mt-1 bg-black focus:outline-none border border-white border-opacity-20 px-3 py-3 rounded-md block w-full"
              placeholder="Separate tags with commas and tags"
              {...register("tags")}
            />
          </div>
          <div className="flex justify-start mt-10">
            <button
              className="bg-[#0A090F] border border-white border-opacity-40 text-white font-bold py-3 px-6 rounded-full flex items-center justify-center"
              style={{ minWidth: "150px" }}
              disabled={loading}
            >
              {loading ? (
                <><Loader className="w-5 h-5 animate-spin" /> Submiting.....</>
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

export default CreatePostModal;
