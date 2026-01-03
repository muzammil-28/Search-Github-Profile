import Style from './GithubProf.module.css'
import { useState } from "react"
import axios from "axios"

function GithubProfile() {

    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState(null);
    const githubAvator = userData?.avatar_url;

    const fetchUserData = async () => {
        if(username === '') return;
        try {
            const response = await axios.get(`https://api.github.com/users/${username}`);
            setUserData(response.data);
        }catch (error)
        {
            alert("User not found.");
            console.log("User not found", error);
        }
    }

    const handleSubmit = (data) => {
        data.preventDefault();
        fetchUserData();
    }

    const handleRepo = () => {
        window.open(
            `https://github.com/${userData.login}?tab=repositories`, 
            '_blank'
        );
    }

    const handleProfileButton = () => {
        window.open(
            `https://github.com/${username}`,
            '_blank'
        );
    }

    return (
        <div className={Style.container}>
            <h2>Search Github Profile</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder='Enter Github username...' 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input type="submit" value="Search" />
            </form>
            {userData && (
                <>
                    <div className={Style.GithubContent}>
                        <div className={Style.avator}>
                            <img src={githubAvator} alt="Github Profile Avator" />
                        </div>
                        <h4>{userData.name}</h4>
                        <h5>{userData.login}</h5>
                        <div className={Style.fans}>
                            <span>Follower <br /> {userData.followers}</span>
                            <span>Following <br /> {userData.following}</span>
                        </div>
                        <p>Bio: {userData.bio || 'Not available'}</p>
                        <p>Location: {userData.location || 'N/A'}</p>
                        <p>Company: {userData.company || 'N/A'}</p>

                        <div className={Style.repo}>
                            Total Public Repos : {userData.public_repos}
                            <button onClick={handleRepo}>View Repo</button>
                        </div>
                        <div className={Style.profile}>
                            <span>Visit Github Profile</span>
                            <span><button onClick={handleProfileButton}>View Profile</button></span>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default GithubProfile