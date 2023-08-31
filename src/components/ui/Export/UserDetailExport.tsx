import React from 'react';
import axios from 'axios';
import './styles.scss'

const UserDetailExport: React.FC = () => {
  const handleExport = async () => {
    try {
      const response = await axios.get(`https://empireone-global-inc.uc.r.appspot.com/api/applicants/list`);
      // const response = await axios.get(`http://localhost:8080/api/applicants/list`);
      const applicants = response.data;
      

      // Get all field names from the first applicant (assuming all applicants have the same structure)
      const allFields = Object.keys(applicants[0]);

      // Create CSV header row
      const csvHeader = allFields.map(field => `"${field}"`).join(',') + '\n';

      // Generate CSV content
      const csvContent = applicants.map((applicant: any) => {
        // Format the date fields as "mm/dd/yyyy"
        const formattedApplicant = { ...applicant };
        formattedApplicant.dateOfBirth = new Date(applicant.dateOfBirth).toLocaleDateString('en-US');
        formattedApplicant.dateHired = new Date(applicant.dateHired).toLocaleDateString('en-US');
        formattedApplicant.dateResigned = new Date(applicant.dateResigned).toLocaleDateString('en-US');
        formattedApplicant.dateHired2 = new Date(applicant.dateHired2).toLocaleDateString('en-US');
        formattedApplicant.dateResigned2 = new Date(applicant.dateResigned2).toLocaleDateString('en-US');
        // Format other date fields if needed

        return allFields.map(field => `"${formattedApplicant[field]}"`).join(',');
      }).join('\n');

      // Combine header and content
      const csvData = csvHeader + csvContent;

      // Create a blob with the CSV content
      const blob = new Blob([csvData], { type: 'text/csv' });

      // Create a download link
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'applicants.csv';
      a.click();

      // Clean up
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting applicants data:', error);
    }
  };

  return (
    <button className="export-button" onClick={handleExport}>
      <svg width="35px" height="35px" viewBox="-4 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.106 0c-2.802 0-5.073 2.272-5.073 5.074v53.841c0 2.803 2.271 5.074 5.073 5.074h45.774c2.801 0 5.074-2.271 5.074-5.074v-38.605l-18.903-20.31h-31.945z" fillRule="evenodd" clipRule="evenodd" fill="#45b058"></path> <path d="M20.306 43.197c.126.144.198.324.198.522 0 .378-.306.72-.703.72-.18 0-.378-.072-.504-.234-.702-.846-1.891-1.387-3.007-1.387-2.629 0-4.627 2.017-4.627 4.88 0 2.845 1.999 4.879 4.627 4.879 1.134 0 2.25-.486 3.007-1.369.125-.144.324-.233.504-.233.415 0 .703.359.703.738 0 .18-.072.36-.198.504-.937.972-2.215 1.693-4.015 1.693-3.457 0-6.176-2.521-6.176-6.212s2.719-6.212 6.176-6.212c1.8.001 3.096.721 4.015 1.711zm6.802 10.714c-1.782 0-3.187-.594-4.213-1.495-.162-.144-.234-.342-.234-.54 0-.361.27-.757.702-.757.144 0 .306.036.432.144.828.739 1.98 1.314 3.367 1.314 2.143 0 2.827-1.152 2.827-2.071 0-3.097-7.112-1.386-7.112-5.672 0-1.98 1.764-3.331 4.123-3.331 1.548 0 2.881.467 3.853 1.278.162.144.252.342.252.54 0 .36-.306.72-.703.72-.144 0-.306-.054-.432-.162-.882-.72-1.98-1.044-3.079-1.044-1.44 0-2.467.774-2.467 1.909 0 2.701 7.112 1.152 7.112 5.636.001 1.748-1.187 3.531-4.428 3.531zm16.994-11.254l-4.159 10.335c-.198.486-.685.81-1.188.81h-.036c-.522 0-1.008-.324-1.207-.81l-4.142-10.335c-.036-.09-.054-.18-.054-.288 0-.36.323-.793.81-.793.306 0 .594.18.72.486l3.889 9.992 3.889-9.992c.108-.288.396-.486.72-.486.468 0 .81.378.81.793.001.09-.017.198-.052.288z" fill="#ffffff"></path> <g fillRule="evenodd" clipRule="evenodd"> <path d="M56.001 20.357v1h-12.8s-6.312-1.26-6.128-6.707c0 0 .208 5.707 6.003 5.707h12.925z" fill="#156620"></path> <path d="M37.098.006v14.561c0 1.656 1.104 5.791 6.104 5.791h12.8l-18.904-20.352z" opacity=".5" fill="#ffffff"></path> </g> </g></svg>
    </button>
  );
};

export default UserDetailExport;
