import { Reducer } from 'redux';


interface WorkExperiences {
  company: string;
  position: string;
  companyAddress: string;
  dateHired: string;
  dateResigned: string;
}

export interface Applicant {
  companyId: string;
  firstName: string;
  lastName: string;
  middleName: string;
  mobileNumber: string;
  addressLine1: string;
  addressLine2: string;
  postcode: string;
  state: string;
  area: string;
  emailId: string;
  education: string;
  country: string;
  stateRegion: string;
  experience: string;
  additionalDetails: string;
  provincialAddress: string;
  currentAddress: string;
  phoneNumber: string;
  emailAddress: string;
  dateOfBirth: string;
  placeOfBirth: string;
  maritalStatus: string;
  gender: string;
  courseGraduated: string;
  yearGraduated: string;
  school: string;
  mothersMaidenName: string;
  fathersName: string;
  familyMembers: string;
  contactPerson: string;
  alternatePhoneNumber: string;
  relationship: string;
  workExperiences: WorkExperiences[];
}

export interface ApplicantsState {
  applicants: Applicant[];
}

const initialState: ApplicantsState = {
  applicants: [],
};



// Define the reducer
const applicantsReducer: Reducer<ApplicantsState> = (state = initialState, action) => {
  switch (action.type) {
    // Add your action cases here if needed
    default:
      return state;
  }
};

export default applicantsReducer;
