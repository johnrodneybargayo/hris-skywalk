import { Reducer } from 'redux';

export interface WorkExperience {
  company: string;
  position: string;
  companyAddress: string;
  dateHired: string | Date;
  dateResigned: string | Date;
}

export interface Applicant {
  applicantId: string; // Add the 'applicantId' property
  companyId: string;
  firstName: string;
  lastName: string;
  middleName: string;
  mobileNumber: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postcode: string;
  state: string;
  barangay: string,
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
  dateOfBirth: Date;
  placeOfBirth: string;
  maritalStatus: string;
  sssNumber: string;
  tinNumber: string;
  philHealthId: string;
  gender: string;
  courseGraduated: string;
  yearGraduated: string;
  school: string;
  mothersMaidenName: string;
  fathersName: string;
  familyMembers: string;
  emergencyContact: string;
  emergencyPhoneNumber: string;
  emergencyRelationship: string;
  emergencyAlternateNumber: string;
  workExperiences: WorkExperience[];
  profileImageUrl: string; 
  signatureImageUrl: string;
}

export interface ApplicantsState {
  applicants: Applicant[];
}

// Define the action types
export enum ActionTypes {
  ADD_APPLICANT = 'ADD_APPLICANT',
  UPDATE_APPLICANT = 'UPDATE_APPLICANT',
}

// Define the action interfaces
export interface AddApplicantAction {
  type: ActionTypes.ADD_APPLICANT;
  payload: Applicant;
}

export interface UpdateApplicantAction {
  type: ActionTypes.UPDATE_APPLICANT;
  payload: {
    applicantId: string; // Assuming you have an identifier for each applicant, e.g., "applicantId"
    updatedData: Partial<Applicant>; // Partial to allow updating specific properties
  };
}

// Define the union type for all actions
export type ApplicantActions = AddApplicantAction | UpdateApplicantAction;

const initialState: ApplicantsState = {
  applicants: [],
};

// Define the reducer
const applicantsReducer: Reducer<ApplicantsState, ApplicantActions> = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_APPLICANT:
      return {
        ...state,
        applicants: [...state.applicants, action.payload],
      };
    case ActionTypes.UPDATE_APPLICANT:
      return {
        ...state,
        applicants: state.applicants.map((applicant) =>
          applicant.applicantId === action.payload.applicantId
            ? { ...applicant, ...action.payload.updatedData }
            : applicant
        ),
      };
    // Add other action cases here if needed
    default:
      return state;
  }
};

export default applicantsReducer;
