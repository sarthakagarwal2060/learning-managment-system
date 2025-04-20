import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';
import CourseCard from '../components/CourseCard';
import Pagination from '../components/Pagination';
import { coursesData } from '../data/coursesData';
import { getCoursesWithFallback } from '../services/api';

const Courses = () => {
  const { setCourses, courses } = useContext(AppContext);
  const [allCourses, setAllCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [displayedCourses, setDisplayedCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [allTopics, setAllTopics] = useState([]);
  const [error, setError] = useState(null);
  const [dataSource, setDataSource] = useState(null);
  const [isDemo, setIsDemo] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(3);
  
  useEffect(() => {
    const fetchData = async () => {
      if (courses.length === 0) {
        setLoading(true);
        
        try {
          const response = await getCoursesWithFallback(coursesData);
          
          if (response.source && Array.isArray(response.data)) {
            setDataSource(response.source);
            setIsDemo(!!response.isDemo);
            setCourses(response.data);
            setAllCourses(response.data);
            setFilteredCourses(response.data);
            
            try {
              const extractTopics = (courseArray) => {
                const allTopics = [];
                courseArray.forEach(course => {
                  if (course && course.topics && Array.isArray(course.topics)) {
                    course.topics.forEach(topic => {
                      if (topic && !allTopics.includes(topic)) {
                        allTopics.push(topic);
                      }
                    });
                  }
                });
                return allTopics;
              };
              
              const topics = extractTopics(response.data);
              setAllTopics(topics);
            } catch (topicError) {
              console.error('Error extracting topics:', topicError);
              setAllTopics([]);
            }
          } else if (Array.isArray(response)) {
            setCourses(response);
            setAllCourses(response);
            setFilteredCourses(response);
            
            try {
              const extractTopics = (courseArray) => {
                const allTopics = [];
                courseArray.forEach(course => {
                  if (course && course.topics && Array.isArray(course.topics)) {
                    course.topics.forEach(topic => {
                      if (topic && !allTopics.includes(topic)) {
                        allTopics.push(topic);
                      }
                    });
                  }
                });
                return allTopics;
              };
              
              const topics = extractTopics(response);
              setAllTopics(topics);
            } catch (topicError) {
              console.error('Error extracting topics:', topicError);
              setAllTopics([]);
            }
          } else {
            throw new Error('Invalid response format');
          }
          
        } catch (error) {
          console.error('Error fetching data:', error);
          setError('Failed to load courses. Using fallback data.');
          
          setCourses(coursesData);
          setAllCourses(coursesData);
          setFilteredCourses(coursesData);
          setDataSource('mockdata');
          setIsDemo(true);
          
          try {
            const extractTopics = (courseArray) => {
              const allTopics = [];
              courseArray.forEach(course => {
                if (course && course.topics && Array.isArray(course.topics)) {
                  course.topics.forEach(topic => {
                    if (topic && !allTopics.includes(topic)) {
                      allTopics.push(topic);
                    }
                  });
                }
              });
              return allTopics;
            };
            
            const topics = extractTopics(coursesData);
            setAllTopics(topics);
          } catch (topicError) {
            console.error('Error extracting topics:', topicError);
            setAllTopics([]);
          }
        } finally {
          setLoading(false);
        }
      } else if (Array.isArray(courses)) {
        setAllCourses(courses);
        setFilteredCourses(courses);
        
        try {
          const extractTopics = (courseArray) => {
            const allTopics = [];
            courseArray.forEach(course => {
              if (course && course.topics && Array.isArray(course.topics)) {
                course.topics.forEach(topic => {
                  if (topic && !allTopics.includes(topic)) {
                    allTopics.push(topic);
                  }
                });
              }
            });
            return allTopics;
          };
          
          const topics = extractTopics(courses);
          setAllTopics(topics);
        } catch (topicError) {
          console.error('Error extracting topics:', topicError);
          setAllTopics([]);
        }
        
        setLoading(false);
      } else {
        console.error('Courses is not an array:', courses);
        setError('Invalid course data format');
        setLoading(false);
      }
    };
    
    fetchData();
  }, [setCourses, courses]);
  
  useEffect(() => {
    if (loading || !Array.isArray(allCourses) || allCourses.length === 0) return;
    
    try {
      let filtered = [...allCourses];
      
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        filtered = filtered.filter(course => {
          if (!course) return false;
          
          const titleMatch = course.title && course.title.toLowerCase().includes(searchLower);
          const descMatch = course.description && course.description.toLowerCase().includes(searchLower);
          const instructorMatch = course.instructor && course.instructor.toLowerCase().includes(searchLower);
          
          let topicMatch = false;
          if (course.topics && Array.isArray(course.topics)) {
            topicMatch = course.topics.some(topic => 
              topic && topic.toLowerCase().includes(searchLower)
            );
          }
          
          return titleMatch || descMatch || instructorMatch || topicMatch;
        });
      }
      
      if (selectedLevel) {
        filtered = filtered.filter(course => course && course.level === selectedLevel);
      }
      
      if (selectedTopic) {
        filtered = filtered.filter(course => 
          course && 
          course.topics && 
          Array.isArray(course.topics) && 
          course.topics.includes(selectedTopic)
        );
      }
      
      setFilteredCourses(filtered);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error filtering courses:', error);
      setFilteredCourses(allCourses);
    }
  }, [searchTerm, selectedLevel, selectedTopic, allCourses, loading]);
  
  useEffect(() => {
    if (!Array.isArray(filteredCourses) || filteredCourses.length === 0) {
      setDisplayedCourses([]);
      return;
    }
    
    setPageLoading(true);

    const loadPageData = setTimeout(() => {
      try {
        const indexOfLastCourse = currentPage * coursesPerPage;
        const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
        const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
        
        setDisplayedCourses(currentCourses);
      } catch (error) {
        console.error('Error during pagination:', error);
        setDisplayedCourses([]);
      } finally {
        setPageLoading(false);
      }
    }, 500);
    
    return () => clearTimeout(loadPageData);
  }, [filteredCourses, currentPage, coursesPerPage]);
  
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedLevel('');
    setSelectedTopic('');
    setCurrentPage(1);
  };
  
  const totalPages = Array.isArray(filteredCourses) 
    ? Math.ceil(filteredCourses.length / coursesPerPage) 
    : 0;
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    
    const coursesSection = document.querySelector('#courses-section');
    if (coursesSection) {
      window.scrollTo({
        top: coursesSection.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <div id="courses-section">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Courses</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search Courses
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, description, instructor, or topic"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Level
            </label>
            <select
              id="level"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Topic
            </label>
            <select
              id="topic"
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Topics</option>
              {allTopics.map((topic, index) => (
                <option key={index} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div>
            <span className="text-gray-600">
              {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'} found
            </span>
          </div>
          
          {(searchTerm || selectedLevel || selectedTopic) && (
            <button
              onClick={resetFilters}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear Filters
            </button>
          )}
        </div>
      </div>
      
      {isDemo && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <span className="font-medium">Notice:</span> You are viewing demo data. 
                {dataSource === 'mockdata' && " External APIs are unavailable, showing local sample courses."}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
              <div className="w-full h-48 bg-gray-300"></div>
              <div className="p-5">
                <div className="h-8 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
                <div className="flex justify-between items-center">
                  <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
                  <div className="h-8 bg-gray-300 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 className="text-xl font-medium text-gray-700 mb-2">No courses found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Reset Filters
          </button>
        </div>
      ) : pageLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
              <div className="w-full h-48 bg-gray-300"></div>
              <div className="p-5">
                <div className="h-8 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
                <div className="flex justify-between items-center">
                  <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
                  <div className="h-8 bg-gray-300 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {displayedCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              loading={pageLoading}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Courses; 