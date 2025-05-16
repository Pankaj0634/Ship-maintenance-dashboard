// pages/CalendarPage.jsx - Calendar Page Component
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useJobs } from '../contexts/JobsContext';
import { useShips } from '../contexts/ShipsContext';
import { useComponents } from '../contexts/ComponentsContext';

const CalendarPage = () => {
  const { jobs } = useJobs();
  const { ships } = useShips();
  const { components } = useComponents();
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [view, setView] = useState('month'); // 'month' or 'week'
  const [calendarDays, setCalendarDays] = useState([]);
  const [selectedDateJobs, setSelectedDateJobs] = useState([]);
  
  // Get days for month view
  const getMonthDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    // Get first day of month and how many days to include from previous month
    const firstDay = new Date(year, month, 1);
    const firstDayOfWeek = firstDay.getDay(); // 0 for Sunday, 1 for Monday, etc.
    
    // Get last day of month
    const lastDay = new Date(year, month + 1, 0);
    const lastDate = lastDay.getDate();
    
    // Array to hold all calendar days
    const days = [];
    
    // Add days from previous month
    const prevMonth = new Date(year, month, 0);
    const prevMonthDays = prevMonth.getDate();
    
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthDays - i),
        isCurrentMonth: false
      });
    }
    
    // Add days from current month
    for (let i = 1; i <= lastDate; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true
      });
    }
    
    // Add days from next month to complete the grid (6 weeks)
    const remainingDays = 42 - days.length; // 6 weeks of 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false
      });
    }
    
    return days;
  };
  
  // Get days for week view
  const getWeekDays = (date) => {
    const week = [];
    const day = date.getDay(); // 0 for Sunday
    
    // Get first day of week (Sunday)
    const firstDayOfWeek = new Date(date);
    firstDayOfWeek.setDate(date.getDate() - day);
    
    // Add all 7 days of the week
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(firstDayOfWeek);
      currentDay.setDate(firstDayOfWeek.getDate() + i);
      week.push({
        date: currentDay,
        isCurrentMonth: currentDay.getMonth() === date.getMonth()
      });
    }
    
    return week;
  };
  
  // Update calendar days when view or current date changes
  useEffect(() => {
    if (view === 'month') {
      setCalendarDays(getMonthDays(currentDate));
    } else {
      setCalendarDays(getWeekDays(currentDate));
    }
  }, [view, currentDate]);
  
  // Get jobs for a specific date
  const getJobsForDate = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return jobs.filter(job => {
      const jobDate = new Date(job.scheduledDate);
      const jobDateString = jobDate.toISOString().split('T')[0];
      return jobDateString === dateString;
    });
  };
  
  // Update selected date jobs
  useEffect(() => {
    if (selectedDate) {
      const jobsForDate = getJobsForDate(selectedDate);
      setSelectedDateJobs(jobsForDate);
    } else {
      setSelectedDateJobs([]);
    }
  }, [selectedDate, jobs]);
  
  // Get job count for a date
  const getJobCount = (date) => {
    return getJobsForDate(date).length;
  };
  
  // Navigate to previous month/week
  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setDate(newDate.getDate() - 7);
    }
    setCurrentDate(newDate);
  };
  
  // Navigate to next month/week
  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    setCurrentDate(newDate);
  };
  
  // Navigate to today
  const goToToday = () => {
    setCurrentDate(new Date());
  };
  
  // Helper functions
  const getShipName = (shipId) => {
    const ship = ships.find(s => s.id === shipId);
    return ship ? ship.name : 'Unknown Ship';
  };
  
  const getComponentName = (componentId) => {
    const component = components.find(c => c.id === componentId);
    return component ? component.name : 'Unknown Component';
  };
  
  // Status badge helper
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Completed':
        return 'badge-green';
      case 'In Progress':
        return 'badge-yellow';
      case 'Cancelled':
        return 'badge-gray';
      default:
        return 'badge-blue';
    }
  };
  
  // Priority badge helper
  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'High':
        return 'badge-red';
      case 'Medium':
        return 'badge-yellow';
      case 'Low':
        return 'badge-green';
      default:
        return 'badge-blue';
    }
  };
  
  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };
  
  const formatWeekRange = (date) => {
    const firstDay = new Date(date);
    const day = date.getDay();
    firstDay.setDate(date.getDate() - day);
    
    const lastDay = new Date(firstDay);
    lastDay.setDate(firstDay.getDate() + 6);
    
    return `${firstDay.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${lastDay.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Maintenance Calendar</h1>
        <Link
          to="/jobs"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          View List
        </Link>
      </div>
      
      {/* Calendar Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 bg-white p-4 rounded-lg shadow">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <button
            onClick={goToPrevious}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Previous"
          >
            <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <h2 className="text-xl font-semibold text-gray-800">
            {view === 'month' ? formatDate(currentDate) : formatWeekRange(currentDate)}
          </h2>
          
          <button
            onClick={goToNext}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Next"
          >
            <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <button
            onClick={goToToday}
            className="ml-4 px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Today
          </button>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setView('month')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              view === 'month'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Month
          </button>
          
          <button
            onClick={() => setView('week')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              view === 'week'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Week
          </button>
        </div>
      </div>
      
      {/* Calendar Grid */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
            <div key={i} className="py-2 text-center text-sm font-semibold text-gray-700 bg-gray-50">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar Days */}
        <div className={`grid grid-cols-7 gap-px bg-gray-200 ${view === 'week' ? 'grid-rows-1' : 'grid-rows-6'}`}>
          {calendarDays.map((day, i) => {
            const today = new Date();
            const isToday = day.date.getDate() === today.getDate() && 
                            day.date.getMonth() === today.getMonth() && 
                            day.date.getFullYear() === today.getFullYear();
            
            const isSelected = selectedDate && 
                              day.date.getDate() === selectedDate.getDate() && 
                              day.date.getMonth() === selectedDate.getMonth() && 
                              day.date.getFullYear() === selectedDate.getFullYear();
            
            const jobCount = getJobCount(day.date);
            const hasJobsOnDay = jobCount > 0;
            
            return (
              <div
                key={i}
                onClick={() => setSelectedDate(day.date)}
                className={`relative h-24 sm:h-32 p-2 ${isSelected ? 'bg-blue-50' : 'bg-white'} ${
                  !day.isCurrentMonth ? 'text-gray-400' : ''
                } hover:bg-blue-50 cursor-pointer`}
              >
                <div className={`flex justify-between items-center ${isToday ? 'font-bold' : ''}`}>
                  <span className={`text-sm ${isToday ? 'bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center' : ''}`}>
                    {day.date.getDate()}
                  </span>
                  {hasJobsOnDay && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-700">
                      {jobCount}
                    </span>
                  )}
                </div>
                
                {/* Job indicators (limited to 2 in the calendar view) */}
                {hasJobsOnDay && (
                  <div className="mt-1 overflow-y-auto max-h-16 sm:max-h-24">
                    {getJobsForDate(day.date).slice(0, 2).map((job, idx) => (
                      <div
                        key={job.id}
                        className={`px-1 py-0.5 mt-1 text-xs rounded truncate ${
                          job.priority === 'High' 
                            ? 'bg-red-100 text-red-800'
                            : job.priority === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {job.type}
                      </div>
                    ))}
                    {jobCount > 2 && (
                      <div className="px-1 py-0.5 mt-1 text-xs text-gray-500">
                        +{jobCount - 2} more
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Selected Date Jobs */}
      {selectedDate && (
        <div className="mt-8 bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Jobs for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </h3>
          </div>
          
          {selectedDateJobs.length === 0 ? (
            <div className="px-6 py-4 text-center text-gray-500">
              No jobs scheduled for this date
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Job Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ship
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Component
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {selectedDateJobs.map(job => (
                    <tr key={job.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {job.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Link to={`/ships/${job.shipId}`} className="text-blue-600 hover:text-blue-900">
                          {getShipName(job.shipId)}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {getComponentName(job.componentId)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`badge ${getStatusBadgeClass(job.status)}`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`badge ${getPriorityBadgeClass(job.priority)}`}>
                          {job.priority}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarPage;