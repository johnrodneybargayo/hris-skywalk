import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.scss';

interface Note {
    text: string;
    user: string;
    timestamp: string;
    status: string; // Add status property to the Note interface
}

interface NotesModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: string;
    loggedInUser: { firstName: string; lastName: string } | null;
}

const NotesModal: React.FC<NotesModalProps> = ({ isOpen, onClose, userId, loggedInUser }) => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [newNote, setNewNote] = useState('');
    const [userStatus, setUserStatus] = useState<string>(''); // Add userStatus state

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`https://empireone-global-inc.uc.r.appspot.com/api/users/${userId}`);
             //   const response = await axios.get(`http://localhost:8080/api/users/${userId}`);
                const userFullName = `${response.data.firstName} ${response.data.lastName}`;
                setNotes(prevNotes => [
                    ...prevNotes,
                    { text: `Logged in as ${userFullName}`, user: 'System', timestamp: new Date().toLocaleString(), status: '' }
                ]);

                // Determine and set the user's status based on userDetail (Example: Interview, Shortlisted, etc.)
                const userDetail = response.data.userDetail; // Replace with your actual source of userDetail
                determineUserStatus(userDetail);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [userId]);

    const determineUserStatus = (userDetail: any) => {
        // Logic to determine user's status based on userDetail
        // You need to replace this logic with your actual implementation
        if (userDetail.status === 'Interview') {
            setUserStatus('Interview');
        } else if (userDetail.status === 'Shortlisted') {
            setUserStatus('Shortlisted');
        } else if (userDetail.status === 'Onboarding') {
            setUserStatus('Onboarding');
        } else if (userDetail.status === 'Hired') {
            setUserStatus('Hired');
        }
    };

    const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewNote(event.target.value);
    };

    const handleSubmit = () => {
        if (newNote.trim() !== '') {
            const timestamp = new Date().toLocaleString();
            const userDisplayName = loggedInUser
                ? `${loggedInUser.firstName} ${loggedInUser.lastName}`
                : 'Unknown User';
            const updatedNotes = [
                ...notes,
                {
                    text: newNote,
                    user: userDisplayName,
                    timestamp, // Use the timestamp variable here
                    status: userStatus,
                },
            ];
            setNotes(updatedNotes);
            setNewNote('');
        }
    };

    const handleModalClose = () => {
        console.log('Close icon clicked'); // Add this line
        onClose(); // Close the modal
    };

    return (
        <div className={`notes-modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-overlay" onClick={handleModalClose}></div>
            <div className="modal-content-notes">
                <div className="close-icon-notes" onClick={handleModalClose}>
                    <svg height="35px" width="35px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path style={{ fill: '#3a3672' }} d="M0,256c0,141.384,114.615,256,256,256l22.261-256L256,0C114.615,0,0,114.615,0,256z"></path>
                            <path style={{ fill: '#1C274C' }} d="M256,0v512c141.384,0,256-114.616,256-256S397.384,0,256,0z"></path>
                            <polygon style={{ fill: '#FFFFFF' }} points="161.555,114.333 114.333,161.555 208.778,256 114.333,350.445 161.555,397.667 256,303.222 278.261,256 256,208.778 "></polygon>
                            <polygon style={{ fill: '#cfc2ff' }} points="397.667,161.555 350.445,114.333 256,208.778 256,303.222 350.445,397.667 397.667,350.445 303.222,256 "></polygon>
                        </g>
                    </svg>
                </div>
                <h2 className='notes-label'>Add Notes</h2>
                <div className="notes-list">
                    {notes.map((note, index) => (
                        <div className="note" key={index}>
                            <div className="user-details">
                                <div className="user-avatar">User Avatar</div> {/* Add user avatar */}
                                <div className="user-info">
                                    <span className="user-name">{note.user}</span>
                                    <span className="timestamp">{note.timestamp}</span>
                                </div>
                            </div>
                            <div className="note-text">{note.text}</div>
                            <div className="note-status">Status: {note.status}</div>
                        </div>
                    ))}
                </div>
                <input
                    type="text"
                    placeholder="Enter your note"
                    value={newNote}
                    onChange={handleNoteChange}
                />
                <button onClick={handleSubmit}>Add Note</button>
            </div>
        </div>
    );
};

export default NotesModal;
