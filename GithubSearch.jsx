
import React, { useEffect, useState } from 'react'
import axios from 'axios'; // for api
import './GithubSearch.css'
import { FaGithub, FaMapMarkerAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { PiBuildingsFill } from 'react-icons/pi';

export default function GithubSearch() {

    const[username, setUsername] = useState('');
    const[profile, setProfile] = useState(null);
    const[error, setError] = useState(null);
    const[darkMode, setDarkMode] = useState(true);

    //Apply theme class to body
    useEffect(()=>{
      if(darkMode){
        document.body.classList.remove("light");
      }
      else{
        document.body.classList.add("light");
      }
    },[darkMode])

    const handleSubmit = async(e) => {
      e.preventDefault();
      try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        setProfile(response.data);
        setError(null);
      }
      catch(error){
        setProfile(null);
        setError("User Not Found");
      }
    }
  return (
    <div className="main-container flex justify-center items-center flex-col gap-12">
      {/* Toggle button */}
      <button
      onClick={()=> setDarkMode(!darkMode)}
      className='mt-2 px-5 py-2 rounded-[20px] bg-blue-900 text-white font-semibold shadow-lg'
      >
        {darkMode ? "Switch to Light Mode":"Switch to Dark Mode"}</button>

        <h1 className='main-heading text-center text-4xl mt-5'>Github Profile Detective</h1>
        <form onSubmit={handleSubmit} className='search-form flex justify-center items-center gap-5'>
            <input type="text" placeholder='Enter Github Username....' value={username} className='search-input text-black w-[600px] py-[15px] px-[20px] outline-none border-none text-[20px] bg-blue-950 shadow-[0_16px_30px_10px_rgba(0,0,0,0.2)] rounded-[20px] text-white' onChange={(e) => setUsername(e.target.value)}/>
            <button type="submit" className='search-btn w-[100px] pt-[15px] pb-[15px] border-none outline-none text-center bg-blue-950 text-[#fefefe] rounded-[20px] text-[20px] font-bold shadow-[0_16px_30px_10px_rgba(0,0,0,0.2)] cursor-pointer'>Search</button>
        </form>
        {error && <p className='error-msg text-[20px]'>{error}</p>}
        {profile && (
          <div className="profile-container w-[720px] h-auto m-[0 auto] p-[30px] bg-blue-950 rounded-[20px] shadow-[0_16px_30px_10px_rgba(0,0,0,0.2)]  ">
            <div className="profile-content flex gap-[25px] justify-start ">
              <div className="profile-img h-[100%] ">
                <img src={profile.avatar_url} alt="Avatar" className='profile-avatar w-[100px] rounded-[50%] border-[3px solid #20428a] shadow-[0_16px_30px_10px_rgba(0,0,0,0.2)]' />
              </div>
              <div className="profile-details flex flex-col text-base">
                <div className="profile-des flex justify-around items-center">
                  <h2 className='profile-name text-[30px] font-semibold'>{profile.name}</h2>
                  <p className='profile-created'>Joined Date: {new Date(profile.created_at).toLocaleDateString()}</p>
                </div>

                <a href={profile.html_url} target='_blank' rel="noreferrer" className='profile-username no-underline mt-[10px]'>@{profile.login}</a>
                <p className='profile-bio m-[40px 20px 20px 5px] text-[#b1a7a7] leading-6'>{profile.bio}</p>

                  <div className='profile-stats text-base'>
                        <p className='profile-repos text-base'>Repositories<br/><span className='stats'>{profile.public_repos}</span></p>
                        <p className='profile-followers text-base'>Followers<br/><span className='stats'>{profile.followers}</span></p>
                        <p className='profile-following text-base'>Following<br/><span className='stats'>{profile.following}</span></p>
                    </div>

                    <div className='profile-info'>
                        <p className='profile-location text-base'><FaMapMarkerAlt/> {profile.location}</p>
                        <p className='profile-company text-base'><PiBuildingsFill/> {profile.company}</p>

                    </div>

                    <div className='profile-links'>
                        <a href={`https://twitter.com/${profile.twitter_username}`} target='_blank' rel="noreferrer" className='twitter-link text-base'><FaXTwitter/>{profile.twitter_username}</a>
                        <a href={profile.html_url} target='_blank' rel="noreferrer" className='profile-url text-base'><FaGithub/>View Profile</a>
                    </div>
              </div>
            </div>
          </div>
        )}    
    </div>
  )
}
