import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import styles from './styles.module.scss';

interface Note {
  _id: string;
  content: string;
  userId: String;
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
  userId: string;
}

const NotesModal: React.FC<NotesModalProps> = ({
  isOpen,
  onClose,
  userId,
  applicantId,
}) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Loading indicator state

  const fetchUserData = useCallback(async () => {
    try {
      const accessToken = Cookies.get('accessToken');
      console.log("token:", accessToken)

      if (!accessToken) {
        console.error('User is not authenticated');
        setUserData(null); // Clear user data when the user is not authenticated
        return;
      }

      const response = await axios.get('https://empireone-global-inc.uc.r.appspot.com/api/users/profile', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        setUserData(response.data);
      } else {
        console.error(`Unexpected response: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error fetching user data:`, error);
      setUserData(null); // Clear user data on error
    }
  }, [setUserData]);


  const fetchNotes = useCallback(async () => {
    try {
      if (!applicantId) {
        console.error('userId is undefined.');
        return;
      }

      const accessToken = Cookies.get('accessToken');

      if (!accessToken) {
        console.error('User is not authenticated');
        setIsLoading(false); // Set isLoading to false even if the user is not authenticated
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
    } finally {
      setIsLoading(false); // Set isLoading to false when data fetching is done (even in case of error)
    }
  }, [applicantId, setIsLoading]);

  useEffect(() => {
    // Fetch user data and notes when the modal is opened
    if (isOpen) {
      setIsLoading(true); // Set isLoading to true when the modal is opened
      fetchUserData();
      fetchNotes();
    }
  }, [applicantId, isOpen, fetchUserData, fetchNotes]);

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

      try {
        const accessToken = Cookies.get('accessToken');

        if (!accessToken) {
          throw new Error('User is not authenticated');
        }

        // Extract userId from userData
        const userId = userData?._id || ''; // Set it to an empty string if not available

        const noteData: Omit<Note, '_id'> = {
          content: newNote,
          userId, // Use the extracted userId
          applicantId,
          timestamp,
          status: selectedStatus,
        };

        const response = await axios.post<Note>(
          `https://empireone-global-inc.uc.r.appspot.com/api/notes/${applicantId}`,
          noteData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

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
          <svg height="25px" width="25px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
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
        <h2 className={styles['notes-label']}>Add Notes</h2>

        {/* Conditional rendering based on isLoading */}
        {isLoading ? (
          <p>Loading notes...</p>
        ) : (
          <div className={styles['notes-list']}>
            {notes.map((note, index) => (
              <div className={`${styles['note']} ${styles[note.status]}`} key={note._id}>
                {userData && (
                  <div className={styles['user-info']}>
                    <h4 className={styles['user-name']}>
                      Interviewer: {userData.firstName} {userData.lastName}
                    </h4>
                  </div>
                )}
                <div className={styles['note-text']}>Notes: {note.content}</div>
                <div className={styles['note-status']}>Status: {note.status}</div>
                <div>
                  <span className={styles['timestamp']}> {formatTimestamp(note.timestamp)}</span>
                </div>
              </div>
            ))}
          </div>
        )}

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
