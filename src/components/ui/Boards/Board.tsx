import React from 'react';
import DroppableColumn from '../Columns/DroppableColumn';
import { TileProps } from '../../types';
import './styles.scss';

const Board: React.FC = () => {
  const [interviewTiles, setInterviewTiles] = React.useState<TileProps[]>([
    { id: 'interview1', text: 'Interview Tile 1', imageSrc: 'placeholder.jpg', name: 'John Doe', picture: 'john.jpg' },
    { id: 'interview2', text: 'Interview Tile 2', imageSrc: 'placeholder.jpg', name: 'Jane Smith', picture: 'jane.jpg' },
  ]);

  const [shortlistedTiles, setShortlistedTiles] = React.useState<TileProps[]>([
    { id: 'shortlisted1', text: 'Shortlisted Tile 1', imageSrc: 'placeholder.jpg', name: 'Michael Johnson', picture: 'michael.jpg' },
    { id: 'shortlisted2', text: 'Shortlisted Tile 2', imageSrc: 'placeholder.jpg', name: 'Emily Williams', picture: 'emily.jpg' },
  ]);

  const [onboardingTiles, setOnboardingTiles] = React.useState<TileProps[]>([
    { id: 'onboarding1', text: 'Onboarding Tile 1', imageSrc: 'placeholder.jpg', name: 'Robert Lee', picture: 'robert.jpg' },
    { id: 'onboarding2', text: 'Onboarding Tile 2', imageSrc: 'placeholder.jpg', name: 'Sophia Brown', picture: 'sophia.jpg' },
  ]);

  const [hiredTiles, setHiredTiles] = React.useState<TileProps[]>([
    { id: 'hired1', text: 'Hired Tile 1', imageSrc: 'placeholder.jpg', name: 'William Miller', picture: 'william.jpg' },
    { id: 'hired2', text: 'Hired Tile 2', imageSrc: 'placeholder.jpg', name: 'Olivia Davis', picture: 'olivia.jpg' },
  ]);

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
