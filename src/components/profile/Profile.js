import React, { useState, useEffect } from "react";
import { editProfile } from "../../logic/User";
import { useSelector } from "react-redux";
import "./Profile.scss";
import { uploadFile, UPLOAD_STATUS } from "../../services/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Profile = () => {
  const user = useSelector((state) => state.user);

  if (user) {
    console.log(" user en pagina profile", user);
  }

  const [userProfile, setUserProfile] = useState(user);

  useEffect(() => {
    setUserProfile(user);
  }, [user]);

  const handleFormSumit = async (event) => {
    event.preventDefault();
    editProfile("profiles", user.id, userProfile);
    console.log("profile edit");
  };

  const handleUploadFile = (event) => {
    const { files } = event.target;
    const file = files.length > 0 ? files[0] : null;

    if (file) {
      uploadFile("profiles", file, (result) => {
        if (result.status === UPLOAD_STATUS.FINISHED) {
          setUserProfile({ ...userProfile, image: result.url });
        }
        console.log("foto profiles", files);
      });
    }
  };

  const updateUserProfile = (name, value) => {
    const newUserProfile = {
      ...userProfile,
      [name]: value,
    };
    setUserProfile(newUserProfile);
  };

  if (!user) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="header-profile">
        <Link to={"/home"} className="header-profile__logo">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <h1>{user.name.toUpperCase()}</h1>
      </div>
      <form className="form-signup" onSubmit={handleFormSumit}>
        {userProfile ? (
          <>
            {userProfile.image && (
              <img src={userProfile.image} alt="" className="profile__img" />
            )}
            <label htmlFor="image"></label>
            <input id="image" type="file" alt="" onChange={handleUploadFile} />

            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={userProfile.name}
              onChange={(event) =>
                updateUserProfile("name", event.target.value)
              }
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={userProfile.email}
              onChange={(event) =>
                updateUserProfile("email", event.target.value)
              }
            />

            <label htmlFor="">City</label>
            <input
              type="text"
              id="city"
              value={userProfile.city}
              onChange={(event) =>
                updateUserProfile("city", event.target.value)
              }
            />

            <label htmlFor="">Age</label>
            <input
              type="text"
              id="age"
              value={userProfile.age}
              onChange={(event) => updateUserProfile("age", event.target.value)}
            />
          </>
        ) : (
          ""
        )}

        <button type="submit">Add Changes</button>
      </form>
    </>
  );
};

export default Profile;
