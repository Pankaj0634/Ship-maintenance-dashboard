// contexts/ShipsContext.jsx - Ships Management Context Provider
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNotifications } from './NotificationsContext';

// Create the Ships Context
const ShipsContext = createContext();

// Custom hook for using the Ships Context
export const useShips = () => useContext(ShipsContext);

// Ships Provider Component
export const ShipsProvider = ({ children }) => {
  const [ships, setShips] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotifications();

  // Initialize ships from localStorage on component mount
  useEffect(() => {
    const storedShips = localStorage.getItem('ships');
    if (storedShips) {
      setShips(JSON.parse(storedShips));
    } else {
      // If no ships in localStorage, use defaults from mock data
      const mockShips = [
        { id: 's1', name: 'Ever Given', imo: '9811000', flag: 'Panama', status: 'Active' },
        { id: 's2', name: 'Maersk Alabama', imo: '9164263', flag: 'USA', status: 'Under Maintenance' }
      ];
      setShips(mockShips);
      localStorage.setItem('ships', JSON.stringify(mockShips));
    }
    setLoading(false);
  }, []);

  // Update localStorage whenever ships change
  useEffect(() => {
    localStorage.setItem('ships', JSON.stringify(ships));
  }, [ships]);

  // Add a new ship
  const addShip = (ship) => {
    const newShip = { ...ship, id: `s${Date.now()}` };
    setShips(prev => [...prev, newShip]);
    addNotification({
      type: 'success',
      message: `Ship ${ship.name} has been added`,
    });
    return newShip;
  };

  // Update an existing ship
  const updateShip = (id, updatedShip) => {
    setShips(prev => prev.map(ship => 
      ship.id === id ? { ...ship, ...updatedShip } : ship
    ));
    addNotification({
      type: 'info',
      message: `Ship ${updatedShip.name} has been updated`,
    });
  };

  // Delete a ship
  const deleteShip = (id) => {
    const shipToDelete = ships.find(s => s.id === id);
    setShips(prev => prev.filter(ship => ship.id !== id));
    addNotification({
      type: 'warning',
      message: `Ship ${shipToDelete?.name || id} has been deleted`,
    });
  };

  // Get a ship by ID
  const getShip = (id) => ships.find(ship => ship.id === id);

  // Create a value object to provide to consumers
  const value = {
    ships,
    loading,
    addShip,
    updateShip,
    deleteShip,
    getShip
  };

  return (
    <ShipsContext.Provider value={value}>
      {children}
    </ShipsContext.Provider>
  );
};

export default ShipsContext;