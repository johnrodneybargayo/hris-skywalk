export interface TileProps {
  id: string;
  text: string;
  imageSrc: string;
  name: string;
  positionApplied: string;
  picture: string;
  status: 'Interview' | 'Shortlisted' | 'Onboarding' | 'Hired'; // Add the status field
  createdAt: Date;
}

