import React, { useState } from 'react';

export interface EquipmentItem {
    name: string;
    brand: string;
    modelNo: string;
    serialNo: string;
  }

interface InventoryFormProps {
  onAddEquipment: (newEquipment: EquipmentItem) => void;
}

const InventoryForm: React.FC<InventoryFormProps> = ({ onAddEquipment }) => {
  const [showModal, setShowModal] = useState(false);
  const [equipment, setEquipment] = useState<EquipmentItem>({
    name: '',
    brand: '',
    modelNo: '',
    serialNo: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEquipment((prevEquipment) => ({
      ...prevEquipment,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAddEquipment(equipment);
    setEquipment({
      name: '',
      brand: '',
      modelNo: '',
      serialNo: '',
    });
    setShowModal(false);
  };

  return (
    <>
      <button onClick={() => setShowModal(true)}>Add New Equipment</button>
      {showModal && (
        <div className="modal">
          <form onSubmit={handleSubmit}>
            <h3>Add Equipment</h3>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={equipment.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Brand:
              <input
                type="text"
                name="brand"
                value={equipment.brand}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Model No.:
              <input
                type="text"
                name="modelNo"
                value={equipment.modelNo}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Serial No.:
              <input
                type="text"
                name="serialNo"
                value={equipment.serialNo}
                onChange={handleInputChange}
              />
            </label>
            <div>
              <button type="button" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button type="submit">Add</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default InventoryForm;
