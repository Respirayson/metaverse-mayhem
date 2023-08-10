import React, { useContext, useEffect, useState } from 'react';
import { CustomInput, Loader } from '../components';
import { WebContext } from '../context/WebContext';

function ProfileDetails() {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(true);
  const [publicAddress, setPublicAddress] = useState('');

  const {
    setShowAlert, setAlertMessage, setSuccess, currentAccount,
  } = useContext(WebContext);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      const data = await fetch(
        `https://metaverse-mayhem.onrender.com/api/v1/users/?publicAddress=${currentAccount}`,
      );
      const res = await data.json();
      console.log(res);
      setUsername(res.username);
      setBio(res.bio);
      setPublicAddress(res.publicAddress);
      setLoading(false);
    };
    fetchUserDetails();
  }, [currentAccount]);

  const handleClick = async () => {
    // update the details of the user
    setLoading(true);
    const data = {
      username,
      bio,
      publicAddress: currentAccount,
    };
    const res = await fetch('https://metaverse-mayhem.onrender.com/api/v1/users/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    console.log(await res.json());
    if (res && res.ok) {
      setLoading(false);
      setAlertMessage('Profile updated successfully!');
      setShowAlert(true);
      setSuccess(true);
    } else {
      setLoading(false);
      setAlertMessage('Profile update failed. Please try again.');
      setShowAlert(true);
      setSuccess(false);
    }
  };

  return (
    <div className="flex flex-1 justify-between py-8 sm:px-12 px-8 flex-row">
      <div className="gradient-04 z-0" />
      <div className="flex-1 flex flex-col xl:mt-0 my-16 z-10">
        <div className="flex flex-row w-full">
          <h1 className="flex font-bold text-white sm:text-6xl text-4xl head-text">
            Edit Profile
          </h1>
        </div>
        <p className="font-normal text-[24px] text-white my-10">
          Update your user details here
        </p>
        {loading && (
          <div className="mt-16 scale-[100%]">
            <Loader />
          </div>
        )}
        {!loading && (
          <div className="flex flex-col">
            <CustomInput
              label="Username"
              placeHolder="Enter username"
              value={username}
              handleValueChange={setUsername}
            />
            <div className="my-4" />
            <CustomInput
              label="Bio"
              placeHolder="Tell the world your story!"
              value={bio}
              handleValueChange={setBio}
            />
            <div className="my-4" />
            <p className="font-semibold text-2xl text-white mb-3">
              Wallet Address
            </p>
            <p className="font-normal text-md text-white">
              {publicAddress.slice(0, 6)}
              ...
              {publicAddress.slice(-4)}
            </p>

            <button
              type="button"
              onClick={handleClick}
              className="mt-6 px-6 py-4 rounded-lg bg-siteBlue hover:bg-[#65b4fa] w-fit text-white font-bold z-10 relative text-lg"
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileDetails;
