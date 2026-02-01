import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { LuPencil, LuChefHat, LuShield } from "react-icons/lu";
import { toast } from "react-toastify";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "../firebase/firebase.config";

const MyProfile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [address, setAddress] = useState("");
  const [previewURL, setPreviewURL] = useState(null);

  if (!user)
    return (
      <div className="text-center py-16 text-amber-100/60">
        Please log in first.
      </div>
    );

  const userRole = "user"; // Mock role
  const userStatus = "active"; // Mock status
  const chefId = userRole === "chef" ? "chef-5521" : null;

  const handleBeChef = () => {
    toast.info("Request submitted to admin (demo)");
  };

  const handleBeAdmin = () => {
    toast.info("Request submitted to admin (demo)");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewURL(url);
    } else {
      setPreviewURL(null);
    }
  };

  const handleSave = async () => {
    try {
      let newPhotoURL = photoURL;
      if (selectedFile) {
        const storage = getStorage(app);
        const storageRef = ref(storage, `profile-pics/${user.uid}`);
        await uploadBytes(storageRef, selectedFile);
        newPhotoURL = await getDownloadURL(storageRef);
      }
      await updateUser({ displayName: name, photoURL: newPhotoURL });
      toast.success("Profile updated successfully");
      setIsEditing(false);
      setSelectedFile(null);
      setPreviewURL(null);
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    }
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h2 className="text-2xl font-bold mb-6">My Profile</h2>
        <div className="glass-card p-8 space-y-6">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <img
              className="h-24 w-24 rounded-full object-cover"
              src={
                user.photoURL ||
                "https://img.icons8.com/?size=64&id=115318&format=png"
              }
              alt={user.displayName}
            />
            <div className="flex-1 space-y-2">
              <p className="text-3xl font-bold">{user.displayName || "User"}</p>
              <p className="subhead">{user.email}</p>
              <div className="flex gap-3 flex-wrap">
                <span className="pill">{userRole}</span>
                <span
                  className={`pill ${
                    userStatus === "active"
                      ? "bg-green-400/20 text-green-200"
                      : "bg-red-400/20 text-red-200"
                  }`}
                >
                  {userStatus}
                </span>
                {chefId && <span className="pill">ID: {chefId}</span>}
              </div>
            </div>
          </div>
          <div className="divider-line" />
          <div className="grid md:grid-cols-2 gap-4">
            <div className="frosted-panel p-4">
              <p className="text-sm text-amber-100/60 mb-1">Address</p>
              <p className="font-semibold">123 Elm Street, Dhaka</p>
            </div>
            <div className="frosted-panel p-4">
              <p className="text-sm text-amber-100/60 mb-1">Member Since</p>
              <p className="font-semibold">January 2025</p>
            </div>
          </div>
          <div className="flex gap-3 flex-wrap">
            {userRole !== "chef" && (
              <button
                onClick={handleBeChef}
                className="btn-solid flex items-center gap-2"
              >
                <LuChefHat /> Be a Chef
              </button>
            )}
            {userRole !== "admin" && (
              <button
                onClick={handleBeAdmin}
                className="btn-ghost flex items-center gap-2"
              >
                <LuShield /> Be an Admin
              </button>
            )}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn-ghost flex items-center gap-2"
            >
              <LuPencil /> Edit Profile
            </button>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="glass-card p-8 space-y-4">
          <h3 className="text-xl font-semibold">Edit Profile</h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-semibold block mb-1">
                Full name
              </label>
              <input
                className="input w-full"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-sm font-semibold block mb-1">
                Photo URL
              </label>
              <input
                className="input w-full"
                type="url"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="Photo URL"
              />
            </div>
            <div>
              <label className="text-sm font-semibold block mb-1">
                Upload Profile Picture
              </label>
              <input
                className="input w-full"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              {previewURL && (
                <img
                  src={previewURL}
                  alt="Preview"
                  className="mt-2 h-24 w-24 rounded-full object-cover"
                />
              )}
            </div>
            <div>
              <label className="text-sm font-semibold block mb-1">
                Address
              </label>
              <input
                className="input w-full"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Your address"
              />
            </div>
            <button onClick={handleSave} className="btn-solid w-full">
              Save changes
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setSelectedFile(null);
                setPreviewURL(null);
                setName(user?.displayName || "");
                setPhotoURL(user?.photoURL || "");
                setAddress("");
              }}
              className="btn-ghost w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
