import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import FailedApplicantsExport from '../../ui/Export/UserDetailExport';
import './styles.scss';

enum StatusEnum {
  Interview = 'Interview',
  Shortlisted = 'Shortlisted',
  Onboarding = 'Onboarding',
  Hired = 'Hired',
  Failed = 'Failed',
}

interface FailedApplicantModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  failedApplicant: string; // Add this line
}

interface Applicant {
  id: number;
  // department: string;
  positionApplied: string;
  interviewer: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  status: StatusEnum;
  comments: string;
}
const FailedApplicantModal: React.FC<FailedApplicantModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  const [failedApplicants, setFailedApplicants] = useState<Applicant[]>([]);

  useEffect(() => {
    if (isOpen) {
      Axios.get('https://empireone-global-inc.uc.r.appspot.com/api/applicants/failed-applicants')
        .then(response => {
          console.log('Response:', response.data);
          setFailedApplicants(response.data);
        })
        .catch(error => {
          console.error('Error fetching failed applicants:', error);
        });
    }
  }, [isOpen]);
  console.log('Failed Applicants:', failedApplicants);

  return (
    <div className={`modal-overlay-1 ${isOpen ? 'open' : ''}`}>
      <div className="modal-content-1">
        <div className="close-icon-1" onClick={onRequestClose}>
          <svg height="45px" width="45px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
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
        <div className="modal-header-1">
          <h2>Failed Applicant Details</h2>
          <FailedApplicantsExport />
        </div>
        <div className="modal-body-1">
          <table className="applicant-table-1">
            <thead>
              <tr>
                {/* <th>Department</th> */}
                <th>Job Position Applied</th>
                <th>Interviewer</th>
                <th>Name</th>
                <th>Date/Time Applied</th>
                <th>Decision/Status</th>
                <th>Comments/Notes</th>
              </tr>
            </thead>
            <tbody>
              {failedApplicants.length === 0 ? (
                <tr>
                  <td colSpan={7}>No failed applicants.</td>
                </tr>
              ) : (
                failedApplicants
                  .filter(applicant => applicant.status === StatusEnum.Failed)
                  .map(applicant => (
                    <tr key={applicant.id}>
                      {/* <td>{applicant.department}</td> */}
                      <td>{applicant.positionApplied}</td>
                      <td>{applicant.interviewer}</td>
                      <td>{`${applicant.firstName} ${applicant.lastName}`}</td>
                      <td>{new Date(applicant.createdAt).toLocaleString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}</td>

                      <td>{applicant.status}</td>
                      <td>{applicant.comments}</td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
        <div className="modal-footer"></div>
      </div>
    </div>
  );
};

export default FailedApplicantModal;
