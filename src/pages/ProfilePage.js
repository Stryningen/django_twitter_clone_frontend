import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchProfile } from "../api";

function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Loaading...");
  const [bio, setBio] = useState("Loading...");

  const nameRef = useRef(null);
  const bioRef = useRef(null);

  const { id } = useParams();
  const storage = window.localStorage;

  const toggleEdit = (e) => {
    e.preventDefault();
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    if (e.target === nameRef.current) {
      setName(e.target.value);
    }
    if (e.target === bioRef.current) {
      setBio(e.target.value);
    }
  };

  useEffect(async () => {
    console.log("loading profile");
    const response = await fetchProfile(id);
    const { profile_user, profile_bio } = response.result;
    setName(profile_user.username);
    setBio(profile_bio);
  }, []);
  return (
    <div>
      <main>
        <form className="form profile-form">
          <label htmlFor="name">Name:</label>
          {isEditing && (
            <input
              ref={nameRef}
              value={name}
              onChange={handleChange}
              type="text"
            />
          )}
          {!isEditing && <span>{name}</span>}
          <label htmlFor="name">Bio:</label>
          {isEditing && (
            <input
              ref={bioRef}
              value={bio}
              onChange={handleChange}
              type="text"
            />
          )}
          {!isEditing && <span>{bio}</span>}
          {isEditing && (
            <>
              <button>Save changes</button>
              <button onClick={toggleEdit}>Cancel</button>
            </>
          )}
          {!isEditing && <button onClick={toggleEdit}>Edit</button>}
        </form>
      </main>
    </div>
  );
}

export default ProfilePage;
