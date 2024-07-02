import React, { useState } from "react";
import PasswordInput from "./PasswordInput";
import { changePassword } from "../../../fetchData/User";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
const Security = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");

  const user = useSelector((state) => state.auth.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== repeatNewPassword) {
      toast.error("New password does not match repeat new password");
      return;
    }

    try {
      const response = await changePassword(user._id, {
        oldPassword,
        newPassword,
      });
      if (response.data.success) {
        toast.success("Password updated successfully");
        setOldPassword("");
        setNewPassword("");
        setRepeatNewPassword("");
      } else {
        toast.error("Failed to update password");
        setOldPassword("");
        setNewPassword("");
        setRepeatNewPassword("");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      setOldPassword("");
      setNewPassword("");
      setRepeatNewPassword("");
    }
  };

  return (
    <div className="w-full md:w-[65%] bg-white mt-8 border py-8 px-8 border-gray-200 rounded-md">
      <h1 className="text-2xl uppercase font-bold border-b-[1px] border-b-gray-200 pb-6 text-third text-center italic">
        Security and login
      </h1>
      <div className="py-3">
        <form action="PUT" onSubmit={handleSubmit}>
          <div className="container py-3">
            <h1 className="text-third font-semibold">Change password:</h1>
            <div className="mx-3 my-5 flex flex-col gap-y-7">
              <PasswordInput
                label="Old password:"
                name="oldpassword"
                id="oldpassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <PasswordInput
                label="New password:"
                name="newpassword"
                id="newpassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <PasswordInput
                label="Repeat new password:"
                name="repeatnewpassword"
                id="repeatnewpassword"
                value={repeatNewPassword}
                onChange={(e) => setRepeatNewPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="container">
            <button
              type="submit"
              className="px-6 py-2 border font-medium border-primary text-white bg-primary rounded-full"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Security;
