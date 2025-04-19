import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, createContext, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import { getCoursesWithFallback } from './services/api';
import { coursesData } from './data/coursesData';

// Create Context for global state management
export const AppContext = createContext();

function App() {
  // Global state for courses and user
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('edulearn_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Load courses on initial render
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await getCoursesWithFallback();
        setCourses(data);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load courses. Using fallback data.');
        // Use fallback data if API fetch fails
        setCourses(coursesData);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('edulearn_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('edulearn_user');
    }
  }, [user]);

  const contextValue = {
    courses,
    setCourses,
    loading,
    error,
    user,
    setUser
  };

  return (
    <AppContext.Provider value={contextValue}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow py-4 md:py-6 lg:py-8 px-4 sm:px-6 md:px-8 w-full max-w-[100vw] overflow-x-hidden">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
