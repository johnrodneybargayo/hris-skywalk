import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles.module.scss';

interface Note {
  text: string;
  user: string;
  timestamp: string;
  status: string;
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

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`/api/notes/${userId}`); // Use a relative URL
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, [userId]);

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNote(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    if (newNote.trim() !== '') {
      const timestamp = new Date().toLocaleString();
      const userDisplayName = loggedInUser
        ? `${loggedInUser.firstName} ${loggedInUser.lastName}`
        : 'Unknown User';
  
      const noteData = {
        text: newNote,
        user: userDisplayName,
        timestamp,
        status: '', // You can set the status based on your logic here
      };
  
      try {
        console.log('Sending POST request to:', `/api/notes/${userId}`);
        console.log('Request data:', noteData);
  
        const response = await axios.post(`/api/notes/${userId}`, noteData);
  
        console.log('Response:', response);
  
        if (response.status === 201) {
          // Update the notes state with the new note
          setNotes([...notes, response.data]);
          setNewNote('');
        } else {
          console.error('Failed to add note. Unexpected response:', response);
        }
      } catch (error) {
        console.error('Error adding note:', error);
      }
    }
  };
  

  const handleModalClose = () => {
    onClose();
  };

  return (
    <div className={`${styles['notes-modal']} ${isOpen ? styles['open'] : ''}`}>
      <div className={styles['modal-overlay']} onClick={handleModalClose}></div>
      <div className={styles['modal-content-notes']}>
        <div className={styles['close-icon-notes']} onClick={handleModalClose}>
          <svg height="35px" width="35px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            {/* SVG content here */}
          </svg>
        </div>
        <h2 className={styles['notes-label']}>Add Notes</h2>
        <div className={styles['notes-list']}>
          {notes.map((note, index) => (
            <div className={styles['note']} key={index}>
              <div className={styles['user-details']}>
                <div className={styles['user-avatar']}>User Avatar</div>
                <div className={styles['user-info']}>
                  <span className={styles['user-name']}>{note.user}</span>
                  <span className={styles['timestamp']}>{note.timestamp}</span>
                </div>
              </div>
              <div className={styles['note-text']}>{note.text}</div>
              <div className={styles['note-status']}>Status: {note.status}</div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your note"
            value={newNote}
            onChange={handleNoteChange}
          />
          <button type="submit">Add Note</button>
        </form>
      </div>
    </div>
  );
};

export default NotesModal;
