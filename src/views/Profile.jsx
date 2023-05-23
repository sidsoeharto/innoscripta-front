import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { categories, sources } from "../constants";
import { useActions } from "../hooks/useActions";

const Profile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [selectedSource, setSelectedSource] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { getUsers, updateUsers, updatePreferences } = useActions();

  const { register, handleSubmit } = useForm();

  const handleGetUsers = () => {
    const setSuccessResponse = (data) => {
      setUserProfile(data);
      const preferences = data.preferences;
      if (preferences.length > 0) {
        setSelectedCategory(preferences.find((preference) => preference.name === 'category').value);
        setSelectedSource(preferences.find((preference) => preference.name === 'source').value);
      }
    };
    const setErrors = (error) => {
      console.error(error);
    };

    return getUsers({
      setErrors,
      setSuccessResponse
    });
  }

  const handleUpdateUsers = (data, event) => {
    event.preventDefault();

    return updateUsers({
      setErrors: console.error,
      setSuccessResponse: handleGetUsers,
      payload: data
    })
  }

  const handleUpdatePreferences = (event) => {
    event.preventDefault();
    const payload = {
      category: selectedCategory, 
      source: selectedSource
    }

    return updatePreferences({
      setErrors: console.error,
      setSuccessResponse: handleGetUsers,
      payload
    })
  }

  useEffect(() => {
    handleGetUsers();
  }, []);

  return (
    <div className="w-full flex flex-col lg:flex-row justify-center gap-3 my-8">
      <form 
        onSubmit={handleSubmit(handleUpdateUsers)}
        className='flex flex-col w-full items-center bg-neutral-800 border border-neutral-700 rounded-3xl max-w-md drop-shadow-md py-16 px-4' 
      >
        <h2 className="text-2xl uppercase font-bold text-neutral-200 mb-4">
          User Profile
        </h2>
        <div className="w-full lg:w-3/4 flex flex-col mb-3 mx-auto">
          <label htmlFor="name" className={'text-sm block font-semibold text-sm text-neutral-200 text-left px-1'}>
            Name
          </label>
          <input
            type="text"
            className="mt-1 block w-full rounded-lg p-2"
            autoComplete="name"
            placeholder="Name"
            defaultValue={userProfile.name}
            {...register("name")}
          />
        </div>
        <div className="w-full lg:w-3/4 flex flex-col mb-3 mx-auto">
          <label htmlFor="name" className={'text-sm block font-semibold text-sm text-neutral-200 text-left px-1'}>
            Email
          </label>
          <input
            type="email"
            className="mt-1 block w-full rounded-lg p-2"
            autoComplete="email"
            placeholder="Email"
            defaultValue={userProfile.email}
            disabled
            {...register("email")}
          />
        </div>
        <div className="w-full lg:w-3/4 flex flex-col mb-3 mx-auto mt-6">
          <button className="bg-indigo-600 border-2 border-indigo-700 text-white font-bold normal-case mb-4 py-2 px-8 w-full">
            Save
          </button>
        </div>
      </form>
      <form 
        className='flex flex-col w-full items-center bg-neutral-800 border border-neutral-700 rounded-3xl max-w-md drop-shadow-md py-16 px-4'
        onSubmit={handleUpdatePreferences}
      >
        <h2 className="text-2xl uppercase font-bold text-neutral-200 mb-4">
          User Preference
        </h2>
        <div className="w-full lg:w-3/4 flex flex-col mb-3 mx-auto">
          <label htmlFor="source" className={'text-sm block font-semibold text-sm text-neutral-200 text-left px-1'}>
            Preferred Source
          </label>
          <select
            className="mt-1 block w-full rounded-lg p-2"
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
          >
            {
              sources.map((source, index) => (
                <option key={index} value={source.value}>{source.name}</option>
              ))
            }
          </select>
        </div>
        <div className="w-full lg:w-3/4 flex flex-col mb-3 mx-auto">
          <label htmlFor="category" className={'text-sm block font-semibold text-sm text-neutral-200 text-left px-1'}>
            Preferred Category
          </label>
          <select
            className="mt-1 block w-full rounded-lg p-2"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {
              categories.map((category, index) => (
                <option key={index} value={category.value}>{category.name}</option>
              ))
            }
          </select>
        </div>
        <div className="w-full lg:w-3/4 flex flex-col mb-3 mx-auto mt-6">
          <button className="bg-indigo-600 border-2 border-indigo-700 text-white font-bold normal-case mb-4 py-2 px-8 w-full">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;