import React, { useState, useEffect } from 'react';
import DroppableColumn from '../Columns/DroppableColumn';
import axios from 'axios';
import { TileProps } from '../../Utils/types';
import './styles.scss';

const Board: React.FC = () => {
  const [interviewTiles, setInterviewTiles] = useState<TileProps[]>([]);
  const [shortlistedTiles, setShortlistedTiles] = useState<TileProps[]>([]);
  const [onboardingTiles, setOnboardingTiles] = useState<TileProps[]>([]);
  const [hiredTiles, setHiredTiles] = useState<TileProps[]>([]);

  const fetchTilesData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/applicants/list'); // Use Axios.get
      const data = response.data; // Access data directly

      const tilesData: TileProps[] = data.map((applicant: any) => ({
        id: applicant._id,
        text: `${applicant.firstName} ${applicant.lastName}`,
        imageSrc: applicant.picture, // Use the actual field name for the image
        name: `${applicant.firstName} ${applicant.lastName}`,
        picture: applicant.picture, // Use the actual field name for the picture
      }));
      setInterviewTiles(tilesData);
      setShortlistedTiles([]); // Set the initial state for other tile lists in a similar way
      setOnboardingTiles([]);
      setHiredTiles([]);
    } catch (error) {
      console.error('Error fetching tiles data:', error);
    }
  };

  useEffect(() => {
    fetchTilesData();
  }, []);

  const handleTileDrop = (id: string, columnIndex: number) => {
    // Find the tile with the given ID
    const tileToMove =
      interviewTiles.find((tile) => tile.id === id) ||
      shortlistedTiles.find((tile) => tile.id === id) ||
      onboardingTiles.find((tile) => tile.id === id) ||
      hiredTiles.find((tile) => tile.id === id);
  
    if (!tileToMove) {
      return; // Tile not found, do nothing
    }
  
    // Remove the tile from the original column
    const updatedInterviewTiles = interviewTiles.filter((tile) => tile.id !== id);
    const updatedShortlistedTiles = shortlistedTiles.filter((tile) => tile.id !== id);
    const updatedOnboardingTiles = onboardingTiles.filter((tile) => tile.id !== id);
    const updatedHiredTiles = hiredTiles.filter((tile) => tile.id !== id);
  
    // Set the updated tiles for the new column based on the columnIndex
    switch (columnIndex) {
      case 0:
        setInterviewTiles([...updatedInterviewTiles, tileToMove]);
        setShortlistedTiles(updatedShortlistedTiles);
        setOnboardingTiles(updatedOnboardingTiles);
        setHiredTiles(updatedHiredTiles);
        break;
      case 1:
        setInterviewTiles(updatedInterviewTiles);
        setShortlistedTiles([...updatedShortlistedTiles, tileToMove]);
        setOnboardingTiles(updatedOnboardingTiles);
        setHiredTiles(updatedHiredTiles);
        break;
      case 2:
        setInterviewTiles(updatedInterviewTiles);
        setShortlistedTiles(updatedShortlistedTiles);
        setOnboardingTiles([...updatedOnboardingTiles, tileToMove]);
        setHiredTiles(updatedHiredTiles);
        break;
      case 3:
        setInterviewTiles(updatedInterviewTiles);
        setShortlistedTiles(updatedShortlistedTiles);
        setOnboardingTiles(updatedOnboardingTiles);
        setHiredTiles([...updatedHiredTiles, tileToMove]);
        break;
      default:
        break;
    }
  };
  

  return (
    <div className="board">
      <DroppableColumn header="Interview" tiles={interviewTiles} onTileDrop={handleTileDrop} columnIndex={0} />
      <DroppableColumn header="Shortlisted" tiles={shortlistedTiles} onTileDrop={handleTileDrop} columnIndex={1} />
      <DroppableColumn header="Onboarding" tiles={onboardingTiles} onTileDrop={handleTileDrop} columnIndex={2} />
      <DroppableColumn header="HIRED" tiles={hiredTiles} onTileDrop={handleTileDrop} columnIndex={3} />
    </div>
  );
};

export default Board;
