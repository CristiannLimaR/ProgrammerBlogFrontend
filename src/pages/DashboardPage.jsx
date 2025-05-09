import { useSearchParams } from 'react-router-dom'
import { FileJson, Terminal, Hammer } from 'lucide-react'
import { Sidebar } from '../components/Sidebar'

export const DashboardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCourse = searchParams.get('course') || 'all';
  const dateFilter = searchParams.get('date') || 'all';

  const setSelectedCourse = (course) => {
    searchParams.set('course', course);
    setSearchParams(searchParams);
  };

  const setDateFilter = (date) => {
    searchParams.set('date', date);
    setSearchParams(searchParams);
  };

  const courses = [
    { id: 'tech', name: 'Tecnología', icon: <FileJson className="h-5 w-5" /> },
    { id: 'workshop', name: 'Taller', icon: <Terminal className="h-5 w-5" /> },
    { id: 'practice', name: 'Práctica Supervisada', icon: <Hammer className="h-5 w-5" /> }
  ];

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        selectedCourse={selectedCourse}
        setSelectedCourse={setSelectedCourse}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        courses={courses}
      />
    </div>
  );
};