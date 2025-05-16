const DEMO_USERS = [
  { email: 'admin@entnt.in', password: 'admin123', role: 'Admin' },
  { email: 'inspector@entnt.in', password: 'inspect123', role: 'Inspector' },
  { email: 'engineer@entnt.in', password: 'engine123', role: 'Engineer' }
];

export const validateCredentials = (email, password) => {
  const user = DEMO_USERS.find(user => user.email === email && user.password === password);
  if (user) {
    // Don't store password in localStorage for security
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
};