import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.scss'; // Import the styles.scss for styling the modal

enum GenderEnum {
  Female = "female",
  Male = "male",
  Other = "other",
}

enum MaritalStatusEnum {
  Single = 'single',
  Married = 'married',
  Divorced = 'divorced',
  Widowed = 'widowed',
  Other = 'other',
}

enum StatusEnum {
  Interview = 'Interview',
  Shortlisted = 'Shortlisted',
  Onboarding = 'Onboarding',
  Hired = 'Hired',
  // Add other potential status values if needed
}

interface FormData {
  _id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  mobileNumber: string;
  email: string;
  dateOfBirth: Date | null;
  placeOfBirth: string;
  gender: GenderEnum
  maritalStatus: MaritalStatusEnum
  currentAddress: string;
  permanentAddress: string;
  barangay: string;
  postcode: string;
  city: string;
  state: string;
  country: string;
  schoolName: string;
  courseGraduated: string;
  yearGraduated: string;
  emergencyName: string;
  emergencyContactNumber: string;
  emergencyAlternateContactNumber: string;
  emergencyRelationship: string;
  sssNumber: string;
  tinNumber: string;
  philHealthId: string;
  fatherName: string;
  motherMaidenName: string;
  companyName: string;
  position: string;
  dateHired: Date | null;
  dateResigned: Date | null;
  companyName2: string;
  position2: string;
  dateHired2: Date | null;
  dateResigned2: Date | null;
  status: StatusEnum;
}
interface UserDetailProps {
  showModal: boolean;
  onClose: () => void;
  formData: FormData;
}

const UserDetailModal: React.FC<UserDetailProps> = ({ showModal, onClose, formData }) => {
  const [applicantData, setApplicantData] = useState<FormData | null>(null);

  useEffect(() => {
    if (showModal && formData._id) {
      axios.get(`http://empireone-global-inc.uc.r.appspot.com/api/applicants/list/${formData._id}`) 
        .then(response => {
          const fetchedApplicantData: FormData = response.data;

          if (fetchedApplicantData.dateOfBirth) {
            fetchedApplicantData.dateOfBirth = new Date(fetchedApplicantData.dateOfBirth);
          }

          if (fetchedApplicantData.dateHired) {
            fetchedApplicantData.dateHired = new Date(fetchedApplicantData.dateHired);
          }

          if (fetchedApplicantData.dateResigned) {
            fetchedApplicantData.dateResigned = new Date(fetchedApplicantData.dateResigned);
          }

          if (fetchedApplicantData.dateHired2) {
            fetchedApplicantData.dateHired2 = new Date(fetchedApplicantData.dateHired2);
          }

          if (fetchedApplicantData.dateResigned2) {
            fetchedApplicantData.dateResigned2 = new Date(fetchedApplicantData.dateResigned2);
          }

          setApplicantData(fetchedApplicantData);
        })
        .catch(error => {
          console.error('Error fetching applicant data:', error);
          setApplicantData(null);
          alert('Failed to fetch applicant data. Please try again later.');
        });
    }
  }, [showModal, formData._id]);


  return (
    <div className={`modal-overlay ${showModal ? 'open' : ''}`}>
      <div className="modal-content">
        {/* Close Icon */}
        <div className="close-icon" onClick={onClose}>
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
        {/* Modal Content */}
        <h2 className='user-info-label'>User Information</h2>
        {applicantData ? (
          <div className="user-details">
            <div className='user-details-images'>
              {/* Code for images */}
            </div>
            <div className='user-details-image-note'>Upload your photo here, make sure it's a decent photo for your employee ID</div>
            <div className='user-details-esignature'>
              {/* Code for e-signature images */}
            </div>
            <div className="user-details-content">
              <div className="user-details-header-row">
                {/* Additional elements */}
              </div>
              <h4 className="user-details-personal-label">Personal Information:</h4>
              <div className="user-details-personalname-applicant">
                <div className="user-details-col">
                  <p className='labels-userdetails'>First Name: <span className='user-results'>{applicantData.firstName}</span></p>
                  <p className='labels-userdetails'>Last Name: <span className='user-results'>{applicantData.lastName}</span></p>
                  <p className='labels-userdetails'>Middle Name: <span className='user-results'>{applicantData.middleName}</span></p>
                </div>
              </div>
              <div className='user-details-contact'>
                <div className="user-details-col">
                  <p className='labels-userdetails'>Mobile Number: <span className='user-results'>{applicantData.mobileNumber}</span></p>
                  <p className='labels-userdetails'>Email Address: <span className='user-results'>{applicantData.email}</span></p>
                  <p className='labels-userdetails'>Date of Birth: <span className='user-results'>{applicantData.dateOfBirth ? applicantData.dateOfBirth.toDateString() : 'N/A'}</span></p>
                  <p className='labels-userdetails'>Place of Birth: <span className='user-results'>{applicantData.placeOfBirth}</span></p>
                </div>
                <div className="user-details-col">
                  <p className='labels-userdetails'>Gender: <span className='user-results'>{applicantData.gender}</span></p>
                  <p className='labels-userdetails'>Marital Status: <span className='user-results'>{applicantData.maritalStatus}</span></p>
                  <p className='labels-userdetails'>Mother's Maiden Name: <span className='user-results'>{applicantData.motherMaidenName}</span></p>
                  <p className='labels-userdetails'>Father's Name: <span className='user-results'>{applicantData.fatherName}</span></p>
                </div>
              </div>
              <h4 className="user-details-address-label">Applicant's Address</h4>
              <div className='user-details-address'>
                <div className="user-details-col">
                  <p className='labels-userdetails'>Current Address: <span className='user-results'>{applicantData.currentAddress}</span></p>
                  <p className='labels-userdetails'>Permanent Address: <span className='user-results'>{applicantData.permanentAddress}</span></p>
                  <p className='labels-userdetails'>Barangay: <span className='user-results'>{applicantData.barangay}</span></p>
                  <p className='labels-userdetails'>City: <span className='user-results'>{applicantData.city}</span></p>
                </div>
                <div className="user-details-col">
                  <p className='labels-userdetails'>State/Province: <span className='user-results'>{applicantData.state}</span></p>
                  <p className='labels-userdetails'>Country: <span className='user-results'>{applicantData.country}</span></p>
                  <p className='labels-userdetails'>Postal Code: <span className='user-results'>{applicantData.postcode}</span></p>
                </div>
              </div>

              <h4 className="user-details-school-label">Highest Educational Attainment</h4>
              <div className='user-details-school'>
                <div className="user-details-col">
                  <p className='labels-userdetails'>Course Graduated: <span className='user-results'>{applicantData.courseGraduated}</span></p>
                  <p className='labels-userdetails'>Name of School: <span className='user-results'>{applicantData.schoolName}</span></p>
                  <p className='labels-userdetails'>Year Graduated: <span className='user-results'>{applicantData.yearGraduated}</span></p>
                </div>
              </div>
              {/* Additional sections */}
              <h4 className="user-details-work-label">Work Experience</h4>
              <div className='user-details-work'>
                <div className="user-details-col">
                  <p className='labels-userdetails'>Name of the Company: <span className='user-results'>{applicantData.companyName}</span></p>
                  <p className='labels-userdetails'>Job Title: <span className='user-results'>{applicantData.position}</span></p>
                  <p className='labels-userdetails'>Date Hired: <span className='user-results'>{applicantData.dateHired ? applicantData.dateHired.toDateString() : 'N/A'}</span></p>
                  <p className='labels-userdetails'>Date Resigned: <span className='user-results'>{applicantData.dateResigned ? applicantData.dateResigned.toDateString() : 'N/A'}</span></p>
                </div>
              </div>
              <div className='user-details-work-2'>
                {/* Additional work experience details */}
                <div className="user-details-col">
                  <p className='labels-userdetails'>Name of the Company2: <span className='user-results'>{applicantData.companyName2}</span></p>
                  <p className='labels-userdetails'>Job Title2: <span className='user-results'>{applicantData.position2}</span></p>
                  <p className='labels-userdetails'>Date Hired2: <span className='user-results'>{applicantData.dateHired2 ? applicantData.dateHired2.toDateString() : 'N/A'}</span></p>
                  <p className='labels-userdetails'>Date Resigned2: <span className='user-results'>{applicantData.dateResigned2 ? applicantData.dateResigned2.toDateString() : 'N/A'}</span></p>
                </div>
              </div>
              {/* Additional sections */}
              <h4 className="user-details-emergency-label">Emergency Contact Information:</h4>
              <div className='user-details-emergency'>
                {/* Emergency contact details */}
                <div className="user-details-col">
                  <p className='labels-userdetails'>Contact Person: <span className='user-results'>{applicantData.emergencyName}</span></p>
                  <p className='labels-userdetails'>Mobile Phone Number: <span className='user-results'>{applicantData.emergencyContactNumber}</span></p>
                  <p className='labels-userdetails'>Alternate Phone Number: <span className='user-results'>{applicantData.emergencyAlternateContactNumber}</span></p>
                  <p className='labels-userdetails'>Relationship with the employee: <span className='user-results'>{applicantData.emergencyRelationship}</span></p>
                </div>
              </div>
              {/* Additional sections */}
              <h4 className="user-details-government-label">Government IDs:</h4>
              <div className='user-details-gov-id'>
                {/* Government IDs details */}
                <div className="user-details-col">
                  <p className='labels-userdetails'>SSS Number: <span className='user-results'>{applicantData.sssNumber}</span></p>
                  <p className='labels-userdetails'>TIN ID: <span className='user-results'>{applicantData.tinNumber}</span></p>
                  <p className='labels-userdetails'>PhilHealth Number: <span className='user-results'>{applicantData.philHealthId}</span></p>
                </div>
              </div>
              <div>
        

              </div>
            </div>
          </div>
        ) : (
          <p>Loading applicant data...</p>
        )}
      </div>
    </div>
  );
};

export default UserDetailModal;