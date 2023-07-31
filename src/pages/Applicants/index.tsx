import React, { useEffect, useState, useRef } from 'react';
import Loader from '../../components/ui/Loader';
import ApplicantForm from '../../components/forms/Applicants/';
import './styles.scss';

const ApplicantsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dashboardRef = useRef<HTMLDivElement>(null);

  const handleFormSubmit = async (formData: any) => {
    try {
      // Make a POST request to the server to save the form data
      const response = await fetch('/api/applicants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const savedApplicant = await response.json();
        console.log('Submitted Applicant:', savedApplicant);
        // Handle success or show a success message to the user
      } else {
        // Handle error or show an error message to the user
        console.error('Error creating applicant:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating applicant:', error);
    }
  };

  useEffect(() => {
    // Simulate a delay of 2 seconds = 2000 before marking loading as complete
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="applicants-page">
      {isLoading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <div className="dashboard-applicants" ref={dashboardRef}>
          <div className="applicant-form-container">
            <ApplicantForm onSubmit={handleFormSubmit} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicantsPage;
