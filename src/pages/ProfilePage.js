import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import {
  fetchProfile,
  fetchFollowAction,
  LSTORAGE_TAGS,
  END_POINTS,
} from "../api";

function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [name, setName] = useState("Loaading...");
  const [bio, setBio] = useState("Loading...");

  const nameRef = useRef(null);
  const bioRef = useRef(null);

  const { profile_id } = useParams();
  const storage = window.localStorage;
  const user_id = storage.getItem(LSTORAGE_TAGS.ID);

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

  const handleSave = (e) => {
    e.preventDefault();
    fetchProfile(profile_id, user_id, END_POINTS.POST_PROFILE, "POST", {
      profile_bio: bio,
    });
    toggleEdit(e);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    toggleEdit(e);
    setBio(storage.getItem(LSTORAGE_TAGS.BIO));
  };

  const handleFollow = (e) => {
    e.preventDefault();
    console.log("follow");
    fetchFollowAction(profile_id, user_id);
  };

  useEffect(async () => {
    const response = await fetchProfile(
      profile_id,
      user_id,
      END_POINTS.POST_PROFILE
    );
    if (response && response.result) {
      const { profile_user, profile_bio, can_edit_profile } = response.result;
      setName(profile_user.username);
      setBio(profile_bio);
      if (can_edit_profile == true) {
        setCanEdit(true);
      }
      storage.setItem(LSTORAGE_TAGS.BIO, profile_bio);
    }
  }, []);
  return (
    <div>
      <main>
        <form className="form profile-form">
          <h1>Profile</h1>
          <div className="label-input-container">
            <label htmlFor="name">Name:</label>
            <span>{name}</span>
          </div>
          <label htmlFor="name">Bio:</label>
          {isEditing && (
            <textarea
              rows="10"
              ref={bioRef}
              value={bio}
              onChange={handleChange}
            />
          )}
          {!isEditing && <span>{bio}</span>}
          {canEdit && isEditing && (
            <>
              <button onClick={handleSave}>Save changes</button>
              <button onClick={handleCancel}>Cancel</button>
            </>
          )}
          {canEdit && !isEditing && <button onClick={toggleEdit}>Edit</button>}
          {!canEdit && <button onClick={handleFollow}>Follow</button>}
        </form>
      </main>
    </div>
  );
}

export default ProfilePage;
