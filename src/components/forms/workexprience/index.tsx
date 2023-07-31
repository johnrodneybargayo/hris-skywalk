import React from 'react';

interface WorkExperienceFieldsProps {
  index: number;
  workExperience: {
    company: string;
    position: string;
    companyAddress: string;
    dateHired: string;
    dateResigned: string;
  };
  onChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (index: number) => void;
}

const WorkExperienceFields: React.FC<WorkExperienceFieldsProps> = ({
  index,
  workExperience,
  onChange,
  onRemove,
}) => {
  return (
    <div key={index} className="applicant-work">
        <div className="col-md-6">
          <label className="labels">Company</label>
          <input
            type="text"
            name={`company_${index}`} // Unique name attribute
            value={workExperience.company}
            onChange={(e) => onChange(index, e)}
            placeholder="Company"
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <label className="labels">Position</label>
          <input
            type="text"
            name={`position_${index}`} // Unique name attribute
            value={workExperience.position}
            onChange={(e) => onChange(index, e)}
            placeholder="Position"
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <label className="labels">Company Address</label>
          <input
            type="text"
            name={`companyAddress_${index}`} // Unique name attribute
            value={workExperience.companyAddress}
            onChange={(e) => onChange(index, e)}
            placeholder="Company Address"
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <label className="labels">Date Hired</label>
          <input
            type="text"
            name={`dateHired_${index}`} // Unique name attribute
            value={workExperience.dateHired}
            onChange={(e) => onChange(index, e)}
            placeholder="Date Hired"
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <label className="labels">Date Resigned</label>
          <input
            type="text"
            name={`dateResigned_${index}`} // Unique name attribute
            value={workExperience.dateResigned}
            onChange={(e) => onChange(index, e)}
            placeholder="Date Resigned"
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      </div>
  );
};

export default WorkExperienceFields;
