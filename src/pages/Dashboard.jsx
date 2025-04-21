import { useContext, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AppContext } from '../App';

const Dashboard = () => {
  const { user, courses } = useContext(AppContext);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [activeTab, setActiveTab] = useState('my-courses');
  
  useEffect(() => {
    if (user && user.enrolledCourses && courses.length > 0) {
      const userCourses = courses.filter(course => 
        user.enrolledCourses.includes(course.id)
      );
      
  
      const coursesWithProgress = userCourses.map(course => {
        let lessonData = course.lessons;
        if (user.progress && user.progress[course.id]) {
          lessonData = user.progress[course.id];
        }
        
        return {
          ...course,
          lessons: lessonData
        };
      });
      
      setEnrolledCourses(coursesWithProgress);
    }
  }, [user, courses]);
  

  if (!user) {
    return <Navigate to="/" />;
  }
  

  const calculateOverallProgress = () => {
    if (enrolledCourses.length === 0) return 0;
    
    let completedLessons = 0;
    let totalLessons = 0;
    
    enrolledCourses.forEach(course => {
      course.lessons.forEach(lesson => {
        totalLessons++;
        if (lesson.completed) completedLessons++;
      });
    });
    
    return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  };
  
  const overallProgress = calculateOverallProgress();
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <img 
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&size=64`} 
                alt={user.name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            <div className="w-full md:w-auto">
              <div className="bg-gray-100 rounded-full h-4 w-full md:w-48 overflow-hidden">
                <div 
                  className="bg-green-500 h-4" 
                  style={{ width: `${overallProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-1 text-center">
                Overall Progress: {overallProgress}%
              </p>
            </div>
          </div>
        </div>
        

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('my-courses')}
                className={`py-4 px-6 font-medium border-b-2 ${
                  activeTab === 'my-courses' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                My Courses
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-6 font-medium border-b-2 ${
                  activeTab === 'profile' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab('certificates')}
                className={`py-4 px-6 font-medium border-b-2 ${
                  activeTab === 'certificates' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Certificates
              </button>
            </nav>
          </div>
          

          <div className="p-6">
            {activeTab === 'my-courses' && (
              <div>
                <h2 className="text-xl font-bold mb-4">My Enrolled Courses</h2>
                
                {enrolledCourses.length > 0 ? (
                  <div className="space-y-6">
                    {enrolledCourses.map(course => {

                      const completedLessons = course.lessons.filter(l => l.completed).length;
                      const totalLessons = course.lessons.length;
                      const progress = Math.round((completedLessons / totalLessons) * 100);
                      
                      return (
                        <div 
                          key={course.id} 
                          className="border border-gray-200 rounded-lg p-4 hover:border-blue-200 transition"
                        >
                          <div className="flex flex-col md:flex-row">
                            <img 
                              src={course.image} 
                              alt={course.title}
                              className="w-full md:w-48 h-32 object-cover rounded-md mb-4 md:mb-0 md:mr-4"
                            />
                            <div className="flex-grow">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
                                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                  {course.level}
                                </span>
                              </div>
                              <p className="text-gray-700 text-sm mb-4">
                                Instructor: {course.instructor}
                              </p>
                              <div className="mb-2">
                                <div className="flex justify-between text-sm text-gray-600 mb-1">
                                  <span>Progress</span>
                                  <span>{progress}%</span>
                                </div>
                                <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                                  <div 
                                    className="bg-green-500 h-2" 
                                    style={{ width: `${progress}%` }}
                                  ></div>
                                </div>
                              </div>
                              <div className="flex justify-between items-center mt-4">
                                <span className="text-sm text-gray-600">
                                  {completedLessons} of {totalLessons} lessons completed
                                </span>
                                <Link 
                                  to={`/courses/${course.id}`}
                                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
                                >
                                  Continue Learning
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      You haven't enrolled in any courses yet
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Explore our catalog and find courses that interest you.
                    </p>
                    <Link 
                      to="/courses"
                      className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition"
                    >
                      Browse Courses
                    </Link>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-bold mb-6">Profile Information</h2>
                <div className="max-w-md">
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={user.name}
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={user.email}
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Enrolled Courses
                      </label>
                      <input
                        type="text"
                        value={`${enrolledCourses.length} courses`}
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'certificates' && (
              <div>
                <h2 className="text-xl font-bold mb-6">My Certificates</h2>
                {enrolledCourses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {enrolledCourses.map(course => {
                      const completedLessons = course.lessons.filter(l => l.completed).length;
                      const totalLessons = course.lessons.length;
                      const isCompleted = completedLessons === totalLessons && totalLessons > 0;
                      
                      return (
                        <div 
                          key={course.id}
                          className={`border rounded-lg p-4 ${
                            isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                          }`}
                        >
                          <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                          {isCompleted ? (
                            <>
                              <div className="flex items-center text-green-600 mb-4">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Course Completed</span>
                              </div>
                              <button className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                                Download Certificate
                              </button>
                            </>
                          ) : (
                            <>
                              <div className="flex items-center text-yellow-600 mb-4">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <span>Complete the course to earn certificate</span>
                              </div>
                              <div className="mb-2">
                                <div className="flex justify-between text-sm text-gray-600 mb-1">
                                  <span>Progress</span>
                                  <span>{Math.round((completedLessons / totalLessons) * 100)}%</span>
                                </div>
                                <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                                  <div 
                                    className="bg-yellow-500 h-2" 
                                    style={{ width: `${Math.round((completedLessons / totalLessons) * 100)}%` }}
                                  ></div>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      No certificates yet
                    </h3>
                    <p className="text-gray-600">
                      Complete courses to earn certificates.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 