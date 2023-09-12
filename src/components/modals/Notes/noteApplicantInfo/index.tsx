import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import styles from './styles.module.scss';

interface Note {
  _id: string;
  content: string;
  applicantId: string;
  timestamp: string;
  status: string;
}

interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  // Add other user profile fields here
}

interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicantId: string;
}

const NotesModal: React.FC<NotesModalProps> = ({
  isOpen,
  onClose,
  applicantId,
}) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [userData, setUserData] = useState<UserData | null>(null);

const fetchUserData = useCallback(async () => {
  try {
    const accessToken = Cookies.get('accessToken');

    if (!accessToken) {
      console.error('User is not authenticated');
      return;
    }

    console.log('Attempting to fetch user data...');
    const response = await axios.get<UserData>('https://empireone-global-inc.uc.r.appspot.com/api/users/profile', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log('Response received:', response); // Log the entire response object

    if (response.status === 200) {
      console.log('User Data:', response.data);
      setUserData(response.data); // Use setUserData to update userData
    } else {
      console.error('Unexpected response:', response);
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    // Handle the error, e.g., display an error message to the user
  }
}, []); // Make sure to update the state variable used here, e.g., setUserData


  const fetchNotes = useCallback(async () => {
    try {
      if (!applicantId) {
        console.error('userId is undefined.');
        return;
      }

      const accessToken = Cookies.get('accessToken');

      if (!accessToken) {
        console.error('User is not authenticated');
        return;
      }

      const response = await axios.get<Note[]>(`https://empireone-global-inc.uc.r.appspot.com/api/notes/${applicantId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  }, [applicantId]);

  useEffect(() => {
    fetchUserData();
    fetchNotes();
  }, [applicantId, fetchUserData, fetchNotes]);

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNote(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedStatus(event.target.value);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return date.toLocaleString(undefined, options);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (newNote.trim() !== '' && selectedStatus !== '') {
      const timestamp = new Date().toLocaleString();

      const noteData: Omit<Note, '_id'> = {
        content: newNote,
        applicantId,
        timestamp,
        status: selectedStatus,
      };

      try {
        const accessToken = Cookies.get('accessToken');

        if (!accessToken) {
          throw new Error('User is not authenticated');
        }

        const response = await axios.post<Note>(`https://empireone-global-inc.uc.r.appspot.com/api/notes/${applicantId}`, noteData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 201) {
          const createdNote: Note = response.data;
          setNotes([...notes, createdNote]);
          setNewNote('');
          setSelectedStatus('');
        } else {
          throw new Error('Failed to add note. Unexpected response');
        }
      } catch (error) {
        console.error('Error adding note:', error);
        // Display an error message to the user here
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
          {/* Close icon SVG */}
        </div>
        <h2 className={styles['notes-label']}>Add Notes</h2>
        {userData && (
          <div className={styles['user-details']}>
            <span className={styles['user-name']}>
             Interviewer: {userData.firstName} {userData.lastName}
            </span>
            {/* Display other user profile fields here */}
          </div>
        )}
        <div className={styles['notes-list']}>
          {notes.map((note, index) => (
            <div className={`${styles['note']} ${styles[note.status]}`} key={note._id}>
              <div className={styles['user-info']}>
                <span className={styles['timestamp']}> {formatTimestamp(note.timestamp)}</span>
              </div>
              <div className={styles['note-text']}>{note.content}</div>
              <div className={styles['note-status']}>Status: {note.status}</div>
            </div>
          ))}
        </div>
        <form className={styles['notes-data-area']} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your note"
            value={newNote}
            onChange={handleNoteChange}
          />
          <div className={styles['note-status-1']}>
            <label className={styles['note-status-label']}>
              Failed
              <div className={styles['notes-radio-buttons']}>
                <input
                  type="radio"
                  name="status"
                  value="Failed"
                  onChange={handleStatusChange}
                  checked={selectedStatus === 'Failed'}
                  required
                />
              </div>
            </label>
            <label className={styles['note-status-label']}>
              Endorsed for Final Interview
              <div className={styles['notes-radio-buttons']}>
                <input
                  type="radio"
                  name="status"
                  value="Endorsed for Final Interview"
                  onChange={handleStatusChange}
                  checked={selectedStatus === 'Endorsed for Final Interview'}
                  required
                />
              </div>
            </label>
            <label className={styles['note-status-label']}>
              For Exam Retake
              <div className={styles['notes-radio-buttons']}>
                <input
                  type="radio"
                  name="status"
                  value="For Exam Retake"
                  onChange={handleStatusChange}
                  checked={selectedStatus === 'For Exam Retake'}
                  required
                />
              </div>
            </label>
            <label className={styles['note-status-label']}>
              Endorsed for Director/CEO Interview
              <div className={styles['notes-radio-buttons']}>
                <input
                  type="radio"
                  name="status"
                  value="Endorsed for Director/CEO Interview"
                  onChange={handleStatusChange}
                  checked={selectedStatus === 'Endorsed for Director/CEO Interview'}
                  required
                />
              </div>
            </label>
            <label className={styles['note-status-label']}>
              For Reserved
              <div className={styles['notes-radio-buttons']}>
                <input
                  type="radio"
                  name="status"
                  value="For Reserved"
                  onChange={handleStatusChange}
                  checked={selectedStatus === 'For Reserved'}
                  required
                />
              </div>
            </label>
            <label className={styles['note-status-label']}>
              Passed
              <div className={styles['notes-radio-buttons']}>
                <input
                  type="radio"
                  name="status"
                  value="Passed"
                  onChange={handleStatusChange}
                  checked={selectedStatus === 'Passed'}
                  required
                />
              </div>
            </label>
          </div>
          <button type="submit">Add Note</button>
        </form>
      </div>
    </div>
  );
};

export default NotesModal;
