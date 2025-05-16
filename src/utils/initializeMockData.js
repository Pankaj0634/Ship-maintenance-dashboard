export const initializeMockData = () => {
  // Ship name components for generating combinations
  const shipPrefixes = ["MSC", "CMA CGM", "OOCL", "Maersk", "Evergreen", "Cosco", "MOL", "NYK", "K-Line", "Yang Ming"];
  const shipNames = [
    "Excellence", "Supreme", "Pioneer", "Navigator", "Explorer", "Voyager", "Enterprise",
    "Discovery", "Endeavor", "Challenger", "Aurora", "Phoenix", "Titan", "Atlas", "Mercury"
  ];

  // More diverse data arrays
  const flags = [
    "Panama", "Liberia", "Marshall Islands", "Hong Kong", "Singapore", "Malta", "Bahamas",
    "Greece", "Japan", "Cyprus", "China", "USA", "Denmark", "Norway", "Netherlands"
  ];

  const componentTypes = [
    "Main Engine", "Auxiliary Engine", "Propulsion System", "Steering Gear", 
    "Navigation Radar", "ECDIS System", "Fire Fighting System", "Ballast System",
    "Cargo Handling System", "Emergency Generator", "Boiler System", "HVAC System",
    "Fresh Water Generator", "Sewage Treatment", "Incinerator", "Oil Water Separator",
    "Anchor Windlass", "Mooring Winches", "Life Boats", "Life Rafts"
  ];

  const jobTypes = [
    "Routine Inspection", "Preventive Maintenance", "Emergency Repair", "System Update",
    "Parts Replacement", "Calibration", "Performance Test", "Overhaul", 
    "Cleaning", "Lubrication", "Safety Check", "Certification Renewal",
    "Equipment Upgrade", "Troubleshooting", "Condition Monitoring"
  ];

  const generateRandomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
      .toISOString().split('T')[0];
  };

  // Generate 75 ships
  const ships = Array.from({ length: 75 }, (_, i) => ({
    id: `s${i + 1}`,
    name: `${shipPrefixes[Math.floor(Math.random() * shipPrefixes.length)]} ${shipNames[Math.floor(Math.random() * shipNames.length)]}`,
    imo: `${9800000 + i}`,
    flag: flags[Math.floor(Math.random() * flags.length)],
    status: Math.random() > 0.7 ? "Under Maintenance" : Math.random() > 0.85 ? "Out of Service" : "Active"
  }));

  // Generate 300 components (4 per ship on average)
  const components = Array.from({ length: 300 }, (_, i) => ({
    id: `c${i + 1}`,
    shipId: `s${Math.floor(i / 4) + 1}`,
    name: componentTypes[Math.floor(Math.random() * componentTypes.length)],
    serialNumber: `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}-${10000 + i}`,
    installDate: generateRandomDate(new Date(2018, 0, 1), new Date(2024, 0, 1)),
    lastMaintenanceDate: generateRandomDate(new Date(2023, 0, 1), new Date()),
    manufacturer: ["Wärtsilä", "MAN", "Rolls-Royce", "Caterpillar", "ABB", "Kongsberg", "Mitsubishi"][Math.floor(Math.random() * 7)]
  }));

  // Generate 500 maintenance jobs
  const jobs = Array.from({ length: 500 }, (_, i) => {
    const scheduledDate = generateRandomDate(new Date(2024, 0, 1), new Date(2025, 11, 31));
    return {
      id: `j${i + 1}`,
      componentId: `c${Math.floor(Math.random() * 300) + 1}`,
      shipId: `s${Math.floor(Math.random() * 75) + 1}`,
      type: jobTypes[Math.floor(Math.random() * jobTypes.length)],
      priority: Math.random() > 0.7 ? "High" : Math.random() > 0.4 ? "Medium" : "Low",
      status: Math.random() > 0.6 ? "Open" : Math.random() > 0.5 ? "In Progress" : "Completed",
      assignedEngineerId: String(Math.floor(Math.random() * 3) + 1),
      scheduledDate,
      estimatedHours: Math.floor(Math.random() * 72) + 1,
      description: `${jobTypes[Math.floor(Math.random() * jobTypes.length)]} scheduled for ${scheduledDate}`,
      notes: Math.random() > 0.7 ? "Special tools required" : Math.random() > 0.5 ? "Spare parts needed" : ""
    };
  });

  const mockData = {
    users: [
      { id: "1", role: "Admin", email: "admin@entnt.in", password: "admin123" },
      { id: "2", role: "Inspector", email: "inspector@entnt.in", password: "inspect123" },
      { id: "3", role: "Engineer", email: "engineer@entnt.in", password: "engine123" }
    ],
    ships,
    components,
    jobs
  };

  // Initialize data in localStorage
  Object.entries(mockData).forEach(([key, value]) => {
    localStorage.setItem(key, JSON.stringify(value));
  });
};