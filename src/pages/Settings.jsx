import { Loader } from 'lucide-react';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDeleteAccount } from '../hooks/useDeleteAccount';
import { useChangePassword } from '../hooks/useChangePassword';
import { changePasswordValidation } from "../validations/auth.validation";

const Settings = () => {

  const navigate = useNavigate();
  const [activeSetting, setActiveSetting] = useState("changePassword");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const { handleChangePassword, loading } = useChangePassword();
  const { handleAccountDelete, loading: deleteLoading } = useDeleteAccount();


  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(changePasswordValidation),
    mode: "onSubmit"
  });

  const onSubmit = async (data) => {
    await handleChangePassword({ password: data.password });
    reset()
  };

  const handleDelete = async () => {
    await handleAccountDelete();
    navigate('/signin')
  }

  return (
    <div className="min-h-screen flex justify-start pt-5 md:px-40 items-center flex-col w-full bg-black text-white">
      <div className="border-b py-7 md:px-10 border-white border-opacity-15">
        <ul className="flex gap-8 items-center">
          <li>
            <span
              className={`w-full p-2 cursor-pointer transition 
                ${activeSetting === "changePassword"
                  ? "border-b-2 border-white"
                  : "hover:border-b-2 hover:border-white"
                }
            `}
              onClick={() => setActiveSetting("changePassword")}
            >
              Change Password
            </span>
          </li>
          <li>
            <span
              className={`w-full p-2 cursor-pointer transition 
            ${activeSetting === "deleteAccount"
                  ? "border-b-2 border-white"
                  : "hover:border-b-2 hover:border-white"
                }
             `}
              onClick={() => setActiveSetting("deleteAccount")}
            >
              Delete Account
            </span>
          </li>
        </ul>
      </div>
      <main className="flex flex-col px-5 md:px-0 items-center w-full md:w-[400px] mt-10 justify-center">
        {activeSetting === "changePassword" && (
          <div className="py-5 px-2 rounded-lg shadow-md w-full max-w-lg">
            <h1 className="text-xl font-semibold mb-5">Change Password</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="password"
                placeholder="Enter New Password"
                {...register("password")}
                disabled={loading}
                className="shadow appearance-none border rounded-full border-opacity-30 border-white bg-transparent w-full py-3 px-5 text-white leading-tight mb-3 focus:border-opacity-55 focus:outline-none focus:shadow-outline placeholder:text-white"
              />
              {errors.password && (
                <span className="text-red-500 inline-block">{errors.password.message}</span>
              )}
              <button
                type="submit"
                disabled={loading}
                className="bg-white mt-5 w-44 font-semibold text-black px-4 py-2 rounded-full transition"
              >
                {loading ? <Loader className="w-6 h-6 animate-spin mr-3 inline-block" /> : "Update Password"}
              </button>
            </form>
          </div>
        )}
        {activeSetting === "deleteAccount" && (
          <div className="py-5 px-2 rounded-lg shadow-md w-full max-w-lg">
            <h1 className="text-xl font-semibold mb-2">Delete Account</h1>
            <p className="text-red-500">This will delete your account and all associated data.</p>
            <button
              onClick={() => setShowConfirmation(true)}
              className="bg-white mt-5 w-44 font-semibold text-black px-4 py-2 rounded-full transition"
            >
              Delete Account
            </button>
            {showConfirmation && (
              <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                <div className="p-6 border border-white border-opacity-20 w-[33vw] rounded-lg bg-black">
                  <h2 className="text-lg font-semibold text-white mb-2">Are you absolutely sure?</h2>
                  <p className='text-sm w-[89%]'>Are you sure you want to delete your account? This action cannot be undone.</p>
                  <div className="flex justify-end gap-2.5 mt-6">
                    <button
                      onClick={() => setShowConfirmation(false)}
                      className="bg-black w-24 font-semibold border border-white border-opacity-25 text-white px-3 py-2 rounded-full transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      disabled={deleteLoading}
                      className="bg-white w-24 font-semibold text-black px-3 py-2 rounded-full transition"
                    >
                      {deleteLoading ? <Loader className="w-5 h-5 animate-spin inline-block" /> : "Confirm"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Settings;

