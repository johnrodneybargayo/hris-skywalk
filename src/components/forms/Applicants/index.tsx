import React, { useState } from 'react';
import { Applicant } from '../../../reducers/applicantsReducer';
import { SubmitButton } from '../../ui/Buttons';
import SignaturePad from '../../upload/e_signature'; // Import the SignaturePad component
import ImagesUpload from '../../upload/profileimages';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.scss';

interface ImageUploadResponse {
    imageUrl: string;
}

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

interface FormData {
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
    positionApplied: string;
    image: File | null; // Initialize image URL
    signatureData: string | null, // Initialize signature data
}

interface ApplicantFormProps {
    onSubmit: (applicant: Applicant) => void;
}


const ApplicantForm: React.FC<ApplicantFormProps> = ({ onSubmit }) => {
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        middleName: '',
        mobileNumber: '',
        email: '',
        dateOfBirth: new Date(),
        placeOfBirth: '',
        gender: GenderEnum.Male,
        maritalStatus: MaritalStatusEnum.Single,
        currentAddress: '',
        permanentAddress: '',
        barangay: '',
        postcode: '',
        city: '',
        state: '',
        country: '',
        schoolName: '',
        courseGraduated: '',
        yearGraduated: '',
        emergencyName: '',
        emergencyContactNumber: '',
        emergencyAlternateContactNumber: '',
        emergencyRelationship: '',
        sssNumber: '',
        tinNumber: '',
        philHealthId: '',
        fatherName: '',
        motherMaidenName: '',
        companyName: '',
        position: '',
        dateHired: null,
        dateResigned: null,
        companyName2: '',
        position2: '',
        dateHired2: null,
        dateResigned2: null,
        positionApplied: '',
        image: null,
        signatureData: '',
    });



    const handleDateOfBirthChange = (date: Date) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            dateOfBirth: date, // Set dateOfBirth to the selected date
        }));
    };

    const handleDateChange = (date: Date, field: string) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [field]: date,
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
                dateHired: e,
            }));
        }
    };

    const handleSignatureSave = (signatureData: any) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            signatureData: signatureData,
        }));
    };

    const handleImageUpload = (file: File) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            image: file,
        }));
    };

    const handleSubmit = async () => {
        setSubmitting(true);

        try {
            const imageUrl = await uploadImage(formData.image);

            const formDataWithImage = {
                ...formData,
                image: imageUrl,
                status: 'Interview',
            };

            await axios.post('https://empireone-global-inc.uc.r.appspot.com/api/applicants/create', formDataWithImage);

            console.log('Applicant created successfully.');
            setSuccessMessage('Applicant created successfully.');
            setErrorMessage('');
        } catch (error) {
            console.error('Error creating applicant:', error);
            setErrorMessage('An error occurred while creating the applicant.');
            setSuccessMessage('');
        } finally {
            setSubmitting(false);
        }
    };

    const uploadImage = async (file: File | null): Promise<string> => {
        if (!file) {
            return '';
        }

        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await axios.post<ImageUploadResponse>(
                'https://empireone-global-inc.uc.r.appspot.com/api/uploadImage',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            return response.data.imageUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw new Error('Failed to upload image');
        }
    };

    return (

        <div className="applicants-form">
            <h3 className="applicant-form-label">Information applicant's form</h3>
            <div className='position-apply'>
                <div className="col-md-8">
                    <label className="labels-position">Position Applying:</label>
                    <input
                        type="text"
                        name="positionApplied"
                        value={formData.positionApplied}
                        onChange={handleChange}
                        placeholder="Input the position your applying"
                        className="form-control-position"
                    />
                </div>
            </div>
            <div className='images-applicant'>
                <ImagesUpload onImageUpload={handleImageUpload} />
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
                            <label className="labels">Email Address:</label>
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Input email address"
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="labels">Date of Birth:</label>
                            <DatePicker
                                selected={formData.dateOfBirth}
                                onChange={handleDateOfBirthChange} // Call the function when the date is changed
                                className="form-control"
                                dateFormat="MM/dd/yyyy" // Display day, month, and year
                                placeholderText="Select date"
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
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={(event) => setFormData({ ...formData, gender: event.target.value as GenderEnum })}
                                className="form-control"
                            >
                                <option value="">Select Gender</option>
                                <option value={GenderEnum.Male}>Male</option>
                                <option value={GenderEnum.Female}>Female</option>
                                <option value={GenderEnum.Other}>Other</option>
                            </select>
                        </div>
                    </div>
                    <div className='marital-status'>
                        <div className="col-md-6">
                            <label className="labels">Marital Status:</label>
                            <select
                                name="maritalStatus"
                                value={formData.maritalStatus}
                                onChange={(event) => setFormData({ ...formData, maritalStatus: event.target.value as MaritalStatusEnum })}
                                className="form-control"
                            >
                                <option value="">Select Marital Status</option>
                                <option value={MaritalStatusEnum.Single}>Single</option>
                                <option value={MaritalStatusEnum.Married}>Married</option>
                                <option value={MaritalStatusEnum.Divorced}>Divorced</option>
                                <option value={MaritalStatusEnum.Widowed}>Widowed</option>
                                <option value={MaritalStatusEnum.Other}>Other</option>
                            </select>
                        </div>
                    </div>
                    <div className='parents-container'>
                        <div className="col-md-6">
                            <label className="labels-applicants">Mother's Maiden Name:</label>
                            <input
                                type="text"
                                name="motherMaidenName"
                                value={formData.motherMaidenName}
                                onChange={handleChange}
                                placeholder="Input mother's maiden Name"
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="labels-applicants">Father's Name:</label>
                            <input
                                type="text"
                                name="fatherName"
                                value={formData.fatherName}
                                onChange={handleChange}
                                placeholder="Input father's name"
                                className="form-control"
                            />
                        </div>
                    </div>
                    <h4 className="applicant-address-label">Applicant's Address</h4>
                    <>
                        <div className='address-applicants'>
                            <div className="col-md-12">
                                <label className="labels-applicants">Current Address:</label>
                                <input
                                    type="text"
                                    name="currentAddress"
                                    value={formData.currentAddress}
                                    onChange={handleChange}
                                    placeholder="Input current address"
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="labels">Permanent Address:</label>
                                <input
                                    type="text"
                                    name="permanentAddress"
                                    value={formData.permanentAddress}
                                    onChange={handleChange}
                                    placeholder="Input permanent address"
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
                            <div className="col-md-12">
                                <label className="labels">Barangay:</label>
                                <input
                                    type="text"
                                    name="barangay"
                                    value={formData.barangay}
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
                                name="schoolName"
                                value={formData.schoolName}
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
                                    name="companyName"
                                    value={formData.companyName}
                                    placeholder="Company Name"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="labels">
                                    Job Title:
                                </label>
                                <input
                                    type="text"
                                    name="position"
                                    value={formData.position}
                                    placeholder="Position"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="labels">
                                    Date Hired:
                                </label>
                                <DatePicker
                                    selected={formData.dateHired ? new Date(formData.dateHired) : null}
                                    onChange={(date: Date) => handleDateChange(date, 'dateHired')}
                                    placeholderText="mm/dd/yyyy"
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="labels">
                                    Date Resigned:
                                </label>
                                <DatePicker
                                    selected={formData.dateResigned ? new Date(formData.dateResigned) : null}
                                    onChange={(date: Date) => handleDateChange(date, 'dateResigned')}
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
                                    name="companyName2"
                                    value={formData.companyName2}
                                    placeholder="Company Name"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="labels">
                                    Job Title:
                                </label>
                                <input
                                    type="text"
                                    name="position2"
                                    value={formData.position2}
                                    placeholder="Position"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="labels">
                                    Date Hired:
                                </label>
                                <DatePicker
                                    selected={formData.dateHired2 ? new Date(formData.dateHired2) : null}
                                    onChange={(date: Date) => handleDateChange(date, 'dateHired2')}
                                    placeholderText="mm/dd/yyyy"
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="labels">
                                    Date Resigned:
                                </label>
                                <DatePicker
                                    selected={formData.dateResigned2 ? new Date(formData.dateResigned2) : null}
                                    onChange={(date: Date) => handleDateChange(date, 'dateResigned2')}
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
                                    name="emergencyName"
                                    value={formData.emergencyName}
                                    onChange={handleChange}
                                    placeholder="Input Contact Person"
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="labels">Mobile Phone Number:</label>
                                <input
                                    type="text"
                                    name="emergencyContactNumber"
                                    value={formData.emergencyContactNumber}
                                    onChange={handleChange}
                                    placeholder="Input Mobile Phone Number"
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="labels">Alternate Phone Number:</label>
                                <input
                                    type="text"
                                    name="emergencyAlternateContactNumber"
                                    value={formData.emergencyAlternateContactNumber}
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

                    {/* Render custom alerts */}
                    <div className={`custom-alert ${successMessage ? 'success' : ''} ${errorMessage ? 'error' : ''}`}>
                        {successMessage && <p>{successMessage}</p>}
                        {errorMessage && <p>{errorMessage}</p>}
                    </div>

                    {submitting && <p>Submitting...</p>}
                </div>

            </>
        </div >
    );
};

export default ApplicantForm;
