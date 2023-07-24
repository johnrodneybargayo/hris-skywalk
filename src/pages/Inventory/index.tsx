import React, { useState } from 'react';
import InventoryTable from '../../components/ui/InventoryTable';
import InventoryForm, { EquipmentItem } from '../../components/forms/Inventory';

const InventoryPage: React.FC = () => {
  const [inventory, setInventory] = useState<EquipmentItem[]>([]);

  const handleAddEquipment = async (newEquipment: EquipmentItem) => {
    try {
      const response = await fetch('http://localhost:8080/api/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEquipment),
      });

      if (!response.ok) {
        throw new Error('Failed to add equipment');
      }

      const addedEquipment = await response.json();
      setInventory((prevInventory) => [...prevInventory, addedEquipment]);
    } catch (error) {
      console.error('Error adding equipment:', error);
    }
  };

  return (
    <div>
      <h1>Inventory Page</h1>
      <InventoryForm onAddEquipment={handleAddEquipment} />
      <InventoryTable inventory={inventory} />
    </div>
  );
};

export default InventoryPage;
