import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationsProvider } from './contexts/NotificationsContext';
import { ShipsProvider } from './contexts/ShipsContext';
import { ComponentsProvider } from './contexts/ComponentsContext';
import { JobsProvider } from './contexts/JobsContext';

export const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <NotificationsProvider>
        <ShipsProvider>
          <ComponentsProvider>
            <JobsProvider>
              {children}
            </JobsProvider>
          </ComponentsProvider>
        </ShipsProvider>
      </NotificationsProvider>
    </AuthProvider>
  );
};