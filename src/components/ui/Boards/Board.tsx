import React, { useState, useEffect } from 'react';
import DroppableColumn from '../Columns/DroppableColumn';
import axios from 'axios';
import { TileProps } from '../../Utils/types';
import './styles.scss';

const Board: React.FC = () => {
  const [tilesData, setTilesData] = useState<TileProps[]>([]);

  const fetchTilesData = async () => {
    try {
      const response = await axios.get('https://empireone-global-inc.uc.r.appspot.com/api/applicants/list');
     // const response = await axios.get('http://localhost:8080/api/applicants/list');
      const data = response.data;
  
      const sortedTilesData: TileProps[] = data.map((applicant: any) => ({
        id: applicant._id,
        text: `${applicant.firstName} ${applicant.lastName}`,
        imageSrc: applicant.picture,
        name: `${applicant.firstName} ${applicant.lastName}`,
        positionApplied: applicant.positionApplied,
        picture: applicant.picture,
        status: applicant.status,
        createdAt: new Date(applicant.createdAt), // Convert to a Date object
      })).sort((a: TileProps, b: TileProps) => b.createdAt.getTime() - a.createdAt.getTime()); // Explicit type annotations
  
      setTilesData(sortedTilesData);
    } catch (error) {
      console.error('Error fetching tiles data:', error);
    }
  };
  

  useEffect(() => {
    fetchTilesData();
  }, []);

  const handleTileDrop = async (id: string, newStatus: 'Interview' | 'Shortlisted' | 'Onboarding' | 'Hired') => {
    console.log('Handling tile drop:', id, newStatus);
  
    const updatedTiles = tilesData.map(tile => {
      if (tile.id === id) {
        return {
          ...tile,
          status: newStatus,
        };
      }
      return tile;
    });
  
    setTilesData(updatedTiles);
  
    try {
      // Update the status on the backend
       const response = await axios.put(`https://empireone-global-inc.uc.r.appspot.com/api/applicants/update-status/${id}`, {
     // const response = await axios.put(`http://localhost:8080/api/applicants/update-status/${id}`, {
        status: newStatus,
      });
  
      console.log('Status updated successfully:', response.data);
      console.log('Fetched user data:', response.data);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  

  // Categorize tiles based on their status
  const interviewTiles = tilesData.filter(tile => tile.status === 'Interview');
  const shortlistedTiles = tilesData.filter(tile => tile.status === 'Shortlisted');
  const onboardingTiles = tilesData.filter(tile => tile.status === 'Onboarding');
  const hiredTiles = tilesData.filter(tile => tile.status === 'Hired');

  return (
    <div className="board">
      <DroppableColumn header="Interview" tiles={interviewTiles} onTileDrop={(id) => handleTileDrop(id, 'Interview')} columnIndex={0} />
      <DroppableColumn header="Shortlisted" tiles={shortlistedTiles} onTileDrop={(id) => handleTileDrop(id, 'Shortlisted')} columnIndex={1} />
      <DroppableColumn header="Onboarding" tiles={onboardingTiles} onTileDrop={(id) => handleTileDrop(id, 'Onboarding')} columnIndex={2} />
      <DroppableColumn header="HIRED" tiles={hiredTiles} onTileDrop={(id) => handleTileDrop(id, 'Hired')} columnIndex={3} />
    </div>
  );
};

export default Board;
