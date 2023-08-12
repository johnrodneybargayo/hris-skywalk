export interface TileProps {
  id: string;
  text: string;
  imageSrc: string;
  name: string;
  picture: string;
  status: 'Interview' | 'Shortlisted' | 'Onboarding' | 'Hired'; // Add the status field
}

