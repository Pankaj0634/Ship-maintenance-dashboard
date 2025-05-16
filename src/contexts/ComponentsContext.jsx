// contexts/ComponentsContext.jsx - Components Management Context Provider
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNotifications } from './NotificationsContext';

// Create the Components Context
const ComponentsContext = createContext();

// Custom hook for using the Components Context
export const useComponents = () => useContext(ComponentsContext);

// Components Provider Component
export const ComponentsProvider = ({ children }) => {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotifications();

  // Initialize components from localStorage on component mount
  useEffect(() => {
    const storedComponents = localStorage.getItem('components');
    if (storedComponents) {
      setComponents(JSON.parse(storedComponents));
    } else {
      // If no components in localStorage, use defaults from mock data
      const mockComponents = [
        { id: 'c1', shipId: 's1', name: 'Main Engine', serialNumber: 'ME-1234', 
          installDate: '2020-01-10', lastMaintenanceDate: '2024-03-12' },
        { id: 'c2', shipId: 's2', name: 'Radar', serialNumber: 'RAD-5678', 
          installDate: '2021-07-18', lastMaintenanceDate: '2023-12-01' }
      ];
      setComponents(mockComponents);
      localStorage.setItem('components', JSON.stringify(mockComponents));
    }
    setLoading(false);
  }, []);

  // Update localStorage whenever components change
  useEffect(() => {
    localStorage.setItem('components', JSON.stringify(components));
  }, [components]);

  // Add a new component
  const addComponent = (component) => {
    const newComponent = { ...component, id: `c${Date.now()}` };
    setComponents(prev => [...prev, newComponent]);
    addNotification({
      type: 'success',
      message: `Component ${component.name} has been added`,
    });
    return newComponent;
  };

  // Update an existing component
  const updateComponent = (id, updatedComponent) => {
    setComponents(prev => prev.map(component => 
      component.id === id ? { ...component, ...updatedComponent } : component
    ));
    addNotification({
      type: 'info',
      message: `Component ${updatedComponent.name} has been updated`,
    });
  };

  // Delete a component
  const deleteComponent = (id) => {
    const componentToDelete = components.find(c => c.id === id);
    setComponents(prev => prev.filter(component => component.id !== id));
    addNotification({
      type: 'warning',
      message: `Component ${componentToDelete?.name || id} has been deleted`,
    });
  };

  // Get a component by ID
  const getComponent = (id) => components.find(component => component.id === id);

  // Get components for a specific ship
  const getShipComponents = (shipId) => components.filter(component => component.shipId === shipId);

  // Get components with overdue maintenance (more than 6 months since last maintenance)
  const getComponentsWithOverdueMaintenance = () => {
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 6);
    
    return components.filter(component => {
      const lastMaintenance = new Date(component.lastMaintenanceDate);
      return lastMaintenance < sixMonthsAgo;
    });
  };

  // Create a value object to provide to consumers
  const value = {
    components,
    loading,
    addComponent,
    updateComponent,
    deleteComponent,
    getComponent,
    getShipComponents,
    getComponentsWithOverdueMaintenance
  };

  return (
    <ComponentsContext.Provider value={value}>
      {children}
    </ComponentsContext.Provider>
  );
};

export default ComponentsContext;