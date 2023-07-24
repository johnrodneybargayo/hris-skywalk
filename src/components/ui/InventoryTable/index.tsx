import React from 'react';
import { EquipmentItem } from '../../forms/Inventory';

interface InventoryTableProps {
    inventory: EquipmentItem[];
  }

const InventoryTable: React.FC<InventoryTableProps> = ({ inventory }) => {
   return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Brand</th>
          <th>Model No.</th>
          <th>Serial No.</th>
        </tr>
      </thead>
      <tbody>
        {inventory.map((equipment, index) => (
          <tr key={index}>
            <td>{equipment.name}</td>
            <td>{equipment.brand}</td>
            <td>{equipment.modelNo}</td>
            <td>{equipment.serialNo}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InventoryTable;
