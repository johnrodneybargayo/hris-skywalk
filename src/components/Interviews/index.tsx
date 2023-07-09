import React from 'react';
import './styles.scss';

type InterviewProps = {
  candidate: string;
};

const Interview: React.FC<InterviewProps> = ({ candidate }) => {
  const handleDelete = () => {
    // Handle Delete logic here
    console.log('Delete button clicked');
  };

  return (
    <div className="interview">
      <div className="candidate">{candidate}</div>
      <button className="delete-button" onClick={handleDelete}>
        <i className='delete-icon'>
          <svg viewBox="0 -0.21 20.414 20.414" xmlns="http://www.w3.org/2000/svg" fill="#000">
            <g id="SVGRepo_bgCarrier" stroke-width="0">
            </g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
            </g><g id="SVGRepo_iconCarrier"> <g id="delete-user-2" transform="translate(-2 -2)">
              <circle id="secondary" fill="#2ca9bc" cx="5" cy="5" r="5" transform="translate(6 3)">
              </circle> <path id="primary" d="M18,15l3,3m0-3-3,3M11,3a5,5,0,1,0,5,5A5,5,0,0,0,11,3Z" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
              <path id="primary-2" data-name="primary" d="M14,13.29A6.91,6.91,0,0,0,12,13H10a7,7,0,0,0-7,7,1,1,0,0,0,1,1H14" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
              </path> </g> </g></svg>
        </i>

      </button>

    </div>
  );
};

export default Interview;
