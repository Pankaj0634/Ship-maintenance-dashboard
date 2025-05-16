import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';

const JobCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [jobs, setJobs] = useState([]);
  const [selectedDayJobs, setSelectedDayJobs] = useState([]);

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    setJobs(storedJobs);
  }, []);

  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const dayJobs = jobs.filter(job => 
      isSameDay(new Date(job.scheduledDate), date)
    );
    setSelectedDayJobs(dayJobs);
  };

  const getJobCountForDate = (date) => {
    return jobs.filter(job => isSameDay(new Date(job.scheduledDate), date)).length;
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">
          {format(selectedDate, 'MMMM yyyy')}
        </h2>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-2 text-center font-bold">
            {day}
          </div>
        ))}

        {daysInMonth.map(date => (
          <div
            key={date.toString()}
            className={`p-2 border cursor-pointer hover:bg-blue-50 ${
              isSameDay(date, selectedDate) ? 'bg-blue-100' : ''
            }`}
            onClick={() => handleDateClick(date)}
          >
            <div className="text-center">{format(date, 'd')}</div>
            {getJobCountForDate(date) > 0 && (
              <div className="text-xs text-center mt-1 bg-blue-500 text-white rounded-full">
                {getJobCountForDate(date)} jobs
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedDayJobs.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">
            Jobs for {format(selectedDate, 'MMM d, yyyy')}
          </h3>
          <div className="space-y-2">
            {selectedDayJobs.map(job => (
              <div key={job.id} className="p-3 bg-white rounded shadow">
                <div className="font-semibold">{job.type}</div>
                <div className="text-sm text-gray-600">{job.description}</div>
                <div className="mt-1 flex gap-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    job.priority === 'High' ? 'bg-red-100 text-red-800' :
                    job.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {job.priority}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    job.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    job.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {job.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCalendar;