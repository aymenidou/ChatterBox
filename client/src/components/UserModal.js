import React, { useState } from 'react';
import axios from '../axiosInstance';

const UserModal = ({ username, setIsModalOpen, setUsername }) => {
    const [newUsername, setNewUsername] = useState(username);
    const [bio, setBio] = useState('');

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); // Assume token is stored in localStorage
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                }
            };
            // Assume the backend endpoint for updating user info is /users/update
            const response = await axios.post('/users/update', { username: newUsername, bio }, config);
            setIsModalOpen(false);
            // Optionally update the username in the parent component
            setUsername(newUsername); // Update username in the parent component
            alert(response.data.message);
        } catch (err) {
            console.error(err);
            alert('Error updating user info');
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
                <h2>Edit Profile</h2>
                <form onSubmit={handleUpdateUser}>
                    <label>
                        Username:
                        <input
                            type="text"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                        />
                    </label>
                    <label>
                        Bio:
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </label>
                    <button type="submit">Save</button>
                </form>
            </div>

        </div>
    );
};

export default UserModal;
