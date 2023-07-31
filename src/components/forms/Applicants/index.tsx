import React, { useState } from 'react';
import { Applicant } from '../../../reducers/applicantsReducer';
import axios from 'axios'; // Import axios
import { SubmitButton } from '../../ui/Buttons';
import WorkExperienceFields from '../../forms/workexprience';
import ImagesUpload from '../../upload/images';

import './styles.scss';

interface ApplicantFormProps {
    onSubmit: (applicant: Applicant) => void;
}


const ApplicantForm: React.FC<ApplicantFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState<Applicant>({
        companyId: '',
        firstName: '',
        lastName: '',
        middleName: '',
        mobileNumber: '',
        addressLine1: '',
        addressLine2: '',
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
        dateOfBirth: '',
        placeOfBirth: '',
        maritalStatus: '',
        gender: '',
        courseGraduated: '',
        yearGraduated: '',
        school: '',
        mothersMaidenName: '',
        fathersName: '',
        familyMembers: '',
        contactPerson: '', // Optional property
        alternatePhoneNumber: '', // Optional property
        relationship: '', // Optional property
        workExperiences: [
            {
                company: '',
                position: '',
                companyAddress: '',
                dateHired: '',
                dateResigned: '',
            },
        ],

    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleWorkExperienceChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => {
            const updatedWorkExperiences = [...prevFormData.workExperiences];
            updatedWorkExperiences[index] = {
                ...updatedWorkExperiences[index],
                [name]: value,
            };
            return { ...prevFormData, workExperiences: updatedWorkExperiences };
        });
    };

    const MAX_WORK_EXPERIENCES = 4;

    const handleAddWorkExperience = () => {
        if (formData.workExperiences.length < MAX_WORK_EXPERIENCES) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                workExperiences: [
                    ...prevFormData.workExperiences,
                    {
                        company: '',
                        position: '',
                        companyAddress: '',
                        dateHired: '',
                        dateResigned: '',
                    },
                ],
            }));
        }
    };

    const handleRemoveWorkExperience = (index: number) => {
        if (formData.workExperiences.length > 1) {
            setFormData((prevFormData) => {
                const updatedWorkExperiences = prevFormData.workExperiences.filter(
                    (_, i) => i !== index
                );
                return { ...prevFormData, workExperiences: updatedWorkExperiences };
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Send the form data to the server using axios
            await axios.post('/api/applicants', formData);
            // Clear the form data after successful submission
            setFormData({
                companyId: '',
                firstName: '',
                lastName: '',
                middleName: '',
                mobileNumber: '',
                addressLine1: '',
                addressLine2: '',
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
                dateOfBirth: '',
                placeOfBirth: '',
                maritalStatus: '',
                gender: '',
                courseGraduated: '',
                yearGraduated: '',
                school: '',
                mothersMaidenName: '',
                fathersName: '',
                familyMembers: '',
                contactPerson: '',
                alternatePhoneNumber: '',
                relationship: '',
                workExperiences: [
                    {
                        company: '',
                        position: '',
                        companyAddress: '',
                        dateHired: '',
                        dateResigned: '',
                    },
                ],
            });
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
            <>
                <div className="col-md-5 border-right">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                        </div>
                        <div className="name-applicant">
                            <div className="col-md-6">
                                <label className="labels-applicants">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="First Name"
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="labels-applicants">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Last Name"
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="labels-applicants">Middle Name</label>
                                <input
                                    type="text"
                                    name="middleName"
                                    value={formData.middleName}
                                    onChange={handleChange}
                                    placeholder="Middle Name"
                                    className="form-control"
                                />
                            </div>
                        </div>

                        <div className='contact-info'>
                            <div className="col-md-12">
                                <label className="labels-applicants">Mobile Number</label>
                                <input
                                    type="text"
                                    name="mobileNumber"
                                    value={formData.mobileNumber}
                                    onChange={handleChange}
                                    placeholder="Enter Phone Number"
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="labels">Email ID</label>
                                <input
                                    type="text"
                                    name="emailId"
                                    value={formData.emailId}
                                    onChange={handleChange}
                                    placeholder="Enter Email ID"
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <h4 className="applicant-address-label">Applicant's Address</h4>
                        <>
                            <div className='address-applicants'>
                                <div className="col-md-12">
                                    <label className="labels-applicants">Address Line 1</label>
                                    <input
                                        type="text"
                                        name="addressLine1"
                                        value={formData.addressLine1}
                                        onChange={handleChange}
                                        placeholder="Enter Address Line 1"
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-md-12">
                                    <label className="labels">Address Line 2</label>
                                    <input
                                        type="text"
                                        name="addressLine2"
                                        value={formData.addressLine2}
                                        onChange={handleChange}
                                        placeholder="Enter Address Line 2"
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-md-12">
                                    <label className="labels">Postcode</label>
                                    <input
                                        type="text"
                                        name="postcode"
                                        value={formData.postcode}
                                        onChange={handleChange}
                                        placeholder="Enter Postcode"
                                        className="form-control"
                                    />
                                </div>
                                <div className='address-applicants-2'>
                                    <div className="col-md-12">
                                        <label className="labels">State</label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            placeholder="Enter State"
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
                                            placeholder="Country"
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
                                    name="education"
                                    value={formData.courseGraduated}
                                    onChange={handleChange}
                                    placeholder="Course Graduated"
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="labels">School</label>
                                <input
                                    type="text"
                                    name="education"
                                    value={formData.school}
                                    onChange={handleChange}
                                    placeholder="school"
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <h4 className="applicant-work-label">Work Experience</h4>
                        {formData.workExperiences.map((workExperience, index) => (
                            <WorkExperienceFields
                                key={index}
                                index={index}
                                workExperience={workExperience}
                                onChange={handleWorkExperienceChange}
                                onRemove={handleRemoveWorkExperience}
                            />
                        ))}
                        <div className="add-work-experience-button">
                            <button
                                type="button"
                                onClick={handleAddWorkExperience}
                                className="btn btn-primary"
                                data-testid="add-work-experience-button" // Test id for testing
                            >
                                Add Work Experience
                            </button>
                        </div>
                    </div>
                    <div className="application-submit">
                        <SubmitButton onClick={handleSubmit} value="Save Profile" />
                    </div>
                </div>
            </>
        </div >
    );
};

export default ApplicantForm;
