export interface TileProps {
  id: string;
  text: string;
  imageUrl: string; 
  name: string;
  positionApplied: string;
  picture: string;
  status: 'Interview' | 'Shortlisted' | 'Onboarding' | 'Hired'; // Add the status field
  createdAt: Date;
}

