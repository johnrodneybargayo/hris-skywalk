import React, { useState } from 'react';
import { Applicant } from '../../../reducers/applicantsReducer';
import { WorkExperience } from '../../../reducers/applicantsReducer';
import axios from 'axios';
import { SubmitButton } from '../../ui/Buttons';
import SignaturePad from '../../upload/e_signature'; // Import the SignaturePad component
import ImagesUpload from '../../upload/profileimages';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.scss';

interface ApplicantFormProps {
    onSubmit: (applicant: Applicant) => void;
}

const ApplicantForm: React.FC<ApplicantFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState<Applicant>({
        applicantId: '', // Initialize 'applicantId' to an empty string
        companyId: '',
        firstName: '',
        lastName: '',
        middleName: '',
        mobileNumber: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        postcode: '',
        state: '',
        area: '',
        emailId: '',
        education: '',
        country: '',
        stateRegion: '',
        experience: '',
        additionalDetails: '',
        provincialAddress: '',
        currentAddress: '',
        phoneNumber: '',
        emailAddress: '',
        dateOfBirth: new Date(),
        placeOfBirth: '',
        maritalStatus: '',
        sssNumber: '',
        tinNumber: '',
        philHealthId: '',
        gender: '',
        courseGraduated: '',
        yearGraduated: '',
        school: '',
        mothersMaidenName: '',
        fathersName: '',
        familyMembers: '',
        emergencyContact: '',
        emergencyPhoneNumber: '',
        emergencyAlternateNumber: '',
        emergencyRelationship: '',
        workExperiences: [
            {
                company: '',
                position: '',
                companyAddress: '',
                dateHired: new Date(), // Initialize as Date object
                dateResigned: new Date(), // Initialize as Date object
            },
        ],
        profileImageUrl: '', // Add profileImageUrl property to store the profile image URL
        signatureImageUrl: '', // Add signatureImageUrl property to store the signature image URL

    });



    const handleSignatureSave = (imageUrl: string = '') => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            signatureImageUrl: imageUrl,
        }));
    };

    const [workExperience1, setWorkExperience1] = useState<WorkExperience>({
        company: '',
        position: '',
        companyAddress: '',
        dateHired: '', // Initialize as an empty string
        dateResigned: '', // Initialize as an empty string
    });
    const [workExperience2, setWorkExperience2] = useState<WorkExperience>({
        company: '',
        position: '',
        companyAddress: '',
        dateHired: '', // Initialize as an empty string
        dateResigned: '', // Initialize as an empty string
    });
    const [gender, setGender] = useState<string>(''); // Initialize gender state
    const [maritalStatus, setMaritalStatus] = useState<string>(''); // Initialize maritalStatus state

    const handleWorkExperienceChange1 = (
        e: React.ChangeEvent<HTMLInputElement> | Date,
        field: string
    ) => {
        if ('target' in e) {
            const { name, value } = e.target as HTMLInputElement;
            setWorkExperience1((prevWorkExperience) => ({
                ...prevWorkExperience,
                [name]: value,
            }));
        } else {
            setWorkExperience1((prevWorkExperience: WorkExperience) => ({
                ...prevWorkExperience,
                [field]: e.toISOString(),
            }));
        }
    };

    const handleWorkExperienceChange2 = (
        e: React.ChangeEvent<HTMLInputElement> | Date,
        field: string
    ) => {
        if ('target' in e) {
            const { name, value } = e.target as HTMLInputElement;
            setWorkExperience2((prevWorkExperience) => ({
                ...prevWorkExperience,
                [name]: value,
            }));
        } else {
            setWorkExperience2((prevWorkExperience: WorkExperience) => ({
                ...prevWorkExperience,
                [field]: e.toISOString(),
            }));
        }
    };

    const handleDateOfBirthChange = (date: Date) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            dateOfBirth: date, // Set dateOfBirth to the selected date
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | Date) => {
        if ('target' in e) {
            const { name, value } = e.target as HTMLInputElement;
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                dateHired: e, // or dateResigned: e depending on the field
            }));
        }
    };


    const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGender(e.target.value); // Update the gender state with the selected value
    };

    const handleMaritalStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMaritalStatus(e.target.value); // Update the maritalStatus state with the selected value
    };

    const initialFormData: Applicant = {
        applicantId: '',
        companyId: '',
        firstName: '',
        lastName: '',
        middleName: '',
        mobileNumber: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        postcode: '',
        state: '',
        area: '',
        emailId: '',
        education: '',
        country: '',
        stateRegion: '',
        experience: '',
        additionalDetails: '',
        provincialAddress: '',
        currentAddress: '',
        phoneNumber: '',
        emailAddress: '',
        dateOfBirth: new Date(),
        placeOfBirth: '',
        maritalStatus: '',
        sssNumber: '',
        tinNumber: '',
        philHealthId: '',
        gender: '',
        courseGraduated: '',
        yearGraduated: '',
        school: '',
        mothersMaidenName: '',
        fathersName: '',
        familyMembers: '',
        emergencyContact: '',
        emergencyPhoneNumber: '',
        emergencyAlternateNumber: '',
        emergencyRelationship: '',
        workExperiences: [
            {
                company: '',
                position: '',
                companyAddress: '',
                dateHired: new Date(),
                dateResigned: new Date(),
            },
        ],
        profileImageUrl: '', // Add profileImageUrl property to store the profile image URL
        signatureImageUrl: '', // Add signatureImageUrl property to store the signature image URL
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          // Combine the work experiences into an array
          const workExperiences = [workExperience1, workExperience2];
          
          // Update the formData with the work experiences array
          setFormData((prevFormData) => ({
            ...prevFormData,
            workExperiences,
          }));
      
          // Send the form data to the server using axios
          await axios.post('http://localhost:8080/api/applicants', formData);
      
          // Clear the form data after successful submission
          setFormData(initialFormData);
      
          // Optionally, you can show a success message to the user here
          alert('Form submitted successfully!');
        } catch (error) {
          console.error('Error submitting form:', error);
      
          // Optionally, you can show an error message to the user here
          alert('An error occurred while submitting the form. Please try again.');
        }
      };
      


    return (

        <div className="applicants-form">
            <h3 className="applicant-form-label">Applicant's information</h3>
            <div className='images-applicant'>
                <ImagesUpload />
            </div>
            <div className='image-note'>Upload your photo here make sure it's a decent photo for your employee ID</div>
            <div className='images-esignature'>
                <SignaturePad onSave={handleSignatureSave} />
            </div>
            <>

                <div className="p-3 py-5">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                    </div>
                    <h4 className="name-applicant-label">Personal Information:</h4>
                    <div className="name-applicant">
                        <div className="col-md-6">
                            <label className="labels-applicants">First Name:</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="Input First Name"
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="labels-applicants">Last Name:</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Input Last Name"
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="labels-applicants">Middle Name:</label>
                            <input
                                type="text"
                                name="middleName"
                                value={formData.middleName}
                                onChange={handleChange}
                                placeholder="Input Middle Name"
                                className="form-control"
                            />
                        </div>
                    </div>

                    <div className='contact-info'>
                        <div className="col-md-12">
                            <label className="labels-applicants">Mobile Number:</label>
                            <input
                                type="text"
                                name="mobileNumber"
                                value={formData.mobileNumber}
                                onChange={handleChange}
                                placeholder="Input Phone Number"
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-12">
                            <label className="labels">Email ID:</label>
                            <input
                                type="text"
                                name="emailId"
                                value={formData.emailId}
                                onChange={handleChange}
                                placeholder="Input Email ID"
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="labels">Date of Birth:</label>
                            <DatePicker
                                selected={formData.dateOfBirth}
                                onChange={handleDateOfBirthChange} // Call the function when the date is changed
                                className="form-control"
                                placeholderText="mm/dd/yyyy"
                            />

                        </div>
                        <div className="col-md-6">
                            <label className="labels">Place of Birth:</label>
                            <input
                                type="text"
                                name="placeOfBirth"
                                value={formData.placeOfBirth}
                                onChange={handleChange}
                                placeholder="Input Place of Birth"
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className='dropdownlist-applicant'>
                        <div className="col-md-6">
                            <label className="labels">Gender:</label>
                            <select name="gender" value={gender} onChange={handleGenderChange} className="form-control">
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="labels">Marital Status:</label>
                            <select name="maritalStatus" value={maritalStatus} onChange={handleMaritalStatusChange} className="form-control">
                                <option value="">Select Marital Status</option>
                                <option value="single">Single</option>
                                <option value="married">Married</option>
                                <option value="divorced">Divorced</option>
                                <option value="widowed">Widowed</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                    <h4 className="applicant-address-label">Applicant's Address</h4>
                    <>
                        <div className='address-applicants'>
                            <div className="col-md-12">
                                <label className="labels-applicants">Address Line 1:</label>
                                <input
                                    type="text"
                                    name="addressLine1"
                                    value={formData.addressLine1}
                                    onChange={handleChange}
                                    placeholder="Input Address Line 1"
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="labels">Address Line 2:</label>
                                <input
                                    type="text"
                                    name="addressLine2"
                                    value={formData.addressLine2}
                                    onChange={handleChange}
                                    placeholder="Input Address Line 2"
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="labels">Postal code:</label>
                                <input
                                    type="text"
                                    name="postcode"
                                    value={formData.postcode}
                                    onChange={handleChange}
                                    placeholder="Input Postcode"
                                    className="form-control"
                                />
                            </div>
                            <div className='address-applicants-2'>
                                <div className="col-md-12">
                                    <label className="labels">City:</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="Input City"
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-md-12">
                                    <label className="labels">State/Province:</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        placeholder="Input State"
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-md-12">
                                    <label className="labels">Country</label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        placeholder="Input Country"
                                        className="form-control"
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                    <h4 className="applicant-school-label">Highest Educational Attainment</h4>

                    <div className='school'>
                        <div className="col-md-12">
                            <label className="labels">Course Graduated</label>
                            <input
                                type="text"
                                name="courseGraduated"
                                value={formData.courseGraduated}
                                onChange={handleChange}
                                placeholder="Input Course Graduated"
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-12">
                            <label className="labels">School</label>
                            <input
                                type="text"
                                name="school"
                                value={formData.school}
                                onChange={handleChange}
                                placeholder="Input name of school"
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-12">
                            <label className="labels">Year Graduated</label>
                            <input
                                type="text"
                                name="yearGraduated"
                                value={formData.yearGraduated}
                                onChange={handleChange}
                                placeholder="Input Year Graduated"
                                className="form-control"
                            />
                        </div>
                    </div>
                    <>
                        <h4 className="applicant-work-label">Work Experience</h4>
                        <div className='applicant-work'>
                            <div className="col-md-12">
                                <label className="labels">
                                    Company Name:
                                </label>
                                <input
                                    type="text"
                                    name="company"
                                    value={workExperience1.company}
                                    placeholder="Company Name"
                                    onChange={(event) => handleWorkExperienceChange1(event, 'company')}
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="labels">
                                    Job Title:
                                </label>
                                <input
                                    type="text"
                                    name="position"
                                    value={workExperience1.position}
                                    placeholder="Position"
                                    onChange={(event) => handleWorkExperienceChange1(event, 'position')}
                                />

                            </div>
                            <div className="col-md-12">
                                <label className="labels">
                                    Date Hired:
                                </label>
                                <DatePicker
                                    selected={workExperience1.dateHired ? new Date(workExperience1.dateHired) : null}
                                    onChange={(date: Date) => handleWorkExperienceChange1(date, 'dateHired')}
                                    placeholderText="mm/dd/yyyy"
                                />

                            </div>
                            <div className="col-md-12">
                                <label className="labels">
                                    Date Resigned:
                                </label>
                                <DatePicker
                                    selected={workExperience1.dateResigned ? new Date(workExperience1.dateResigned) : null}
                                    onChange={(date: Date) => handleWorkExperienceChange1(date, 'dateResigned')}
                                    placeholderText="mm/dd/yyyy"
                                />

                            </div>
                        </div>
                    </>
                    <>
                        <div className='applicant-work-2'>
                            <div className="col-md-12">
                                <label className="labels">
                                    Company Name:
                                </label>
                                <input
                                    type="text"
                                    name="company"
                                    value={workExperience2.company}
                                    placeholder="Company Name"
                                    onChange={(event) => handleWorkExperienceChange2(event, 'company')}
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="labels">
                                    Job Title:
                                </label>
                                <input
                                    type="text"
                                    name="position"
                                    value={workExperience2.position}
                                    placeholder="Position"
                                    onChange={(event) => handleWorkExperienceChange2(event, 'position')}
                                />

                            </div>
                            <div className="col-md-12">
                                <label className="labels">
                                    Date Hired:
                                </label>
                                <DatePicker
                                    selected={workExperience2.dateHired ? new Date(workExperience2.dateHired) : null}
                                    onChange={(date: Date) => handleWorkExperienceChange2(date, 'dateHired')}
                                    placeholderText="mm/dd/yyyy"
                                />

                            </div>
                            <div className="col-md-12">
                                <label className="labels">
                                    Date Resigned:
                                </label>
                                <DatePicker
                                    selected={workExperience2.dateResigned ? new Date(workExperience2.dateResigned) : null}
                                    onChange={(date: Date) => handleWorkExperienceChange2(date, 'dateResigned')}
                                    placeholderText="mm/dd/yyyy"
                                />
                            </div>
                        </div>
                    </>
                    <>
                        <h4 className="emergency-contact-label">Emergency Contact Information:</h4>
                        <div className='emergency-contact'>
                            <div className="col-md-12">
                                <label className="labels">Contact Person:</label>
                                <input
                                    type="text"
                                    name="emergencyContact"
                                    value={formData.emergencyContact}
                                    onChange={handleChange}
                                    placeholder="Input Contact Person"
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="labels">Mobile Phone Number:</label>
                                <input
                                    type="text"
                                    name="emergencyPhoneNumber"
                                    value={formData.emergencyPhoneNumber}
                                    onChange={handleChange}
                                    placeholder="Input Mobile Phone Number"
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="labels">Alternate Phone Number:</label>
                                <input
                                    type="text"
                                    name="emergencyAlternateNumber"
                                    value={formData.emergencyAlternateNumber}
                                    onChange={handleChange}
                                    placeholder="Input Alternate Phone Number"
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="labels">Relationship with the employee:</label>
                                <input
                                    type="text"
                                    name="emergencyRelationship"
                                    value={formData.emergencyRelationship}
                                    onChange={handleChange}
                                    placeholder="Input Relationship"
                                    className="form-control"
                                />
                            </div>
                        </div>

                        <h4 className="government-id-label">Government IDs:</h4>
                        <div className='government-id'>
                            <div className="col-md-12">
                                <label className="labels">SSS Number:</label>
                                <input
                                    type="text"
                                    name="sssNumber"
                                    value={formData.sssNumber}
                                    onChange={handleChange}
                                    placeholder="SSS Number"
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="labels">TIN Number:</label>
                                <input
                                    type="text"
                                    name="tinNumber"
                                    value={formData.tinNumber}
                                    onChange={handleChange}
                                    placeholder="TIN Number"
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="labels">PhilHealth ID:</label>
                                <input
                                    type="text"
                                    name="philHealthId"
                                    value={formData.philHealthId}
                                    onChange={handleChange}
                                    placeholder="PhilHealth ID"
                                    className="form-control"
                                />
                            </div>
                        </div>
                    </>
                </div>
                <div className="application-submit">
                    <SubmitButton className="button-74" onClick={handleSubmit} value="Save Profile" />
                </div>
            </>
        </div >
    );
};

export default ApplicantForm;
