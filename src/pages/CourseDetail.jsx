import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { courses, user, setUser } = useContext(AppContext);
  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);
  const [updatedLessons, setUpdatedLessons] = useState([]);
  
  useEffect(() => {
    const foundCourse = courses.find(c => c.id === parseInt(id));
    
    if (foundCourse) {
      setCourse(foundCourse);
      setUpdatedLessons(foundCourse.lessons);
      
      if (user && user.enrolledCourses) {
        setIsEnrolled(user.enrolledCourses.includes(parseInt(id)));
        
        if (user.progress && user.progress[parseInt(id)]) {
          setUpdatedLessons(user.progress[parseInt(id)]);
        }
      }
    } else {
      navigate('/courses');
    }
  }, [id, courses, navigate, user]);
  
  if (!course) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  const handleEnroll = () => {
    if (!user) {
      setShowEnrollmentModal(true);
    } else {
      enrollUser();
    }
  };
  
  const enrollUser = () => {
    const updatedUser = { 
      ...user,
      enrolledCourses: [...(user?.enrolledCourses || []), course.id],
      progress: {
        ...(user?.progress || {}),
        [course.id]: updatedLessons
      }
    };
    setUser(updatedUser);
    setIsEnrolled(true);
    setShowEnrollmentModal(false);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
      name: formData.get('name'),
      email: formData.get('email'),
      enrolledCourses: [course.id],
      progress: {
        [course.id]: updatedLessons
      }
    };
    
    setUser(userData);
    setIsEnrolled(true);
    setShowEnrollmentModal(false);
  };
  
  const toggleLessonCompletion = (lessonId) => {
    if (!isEnrolled) return;
    
    const newLessons = updatedLessons.map((lesson) => 
      lesson.id === lessonId ? { ...lesson, completed: !lesson.completed } : lesson
    );
    
    setUpdatedLessons(newLessons);
    
    const updatedUser = { 
      ...user,
      progress: {
        ...(user?.progress || {}),
        [course.id]: newLessons
      }
    };
    setUser(updatedUser);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div 
        className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(37, 99, 235, 0.9), rgba(79, 70, 229, 0.9)), url(${course.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <div className="flex items-center mb-2">
                <span className="bg-white text-blue-800 text-xs font-semibold px-2 py-1 rounded-full mr-2">
                  {course.level}
                </span>
                <span className="flex items-center text-sm text-yellow-300">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  {course.rating} Rating
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{course.title}</h1>
              <p className="text-lg mb-4">{course.description}</p>
              <div className="text-sm">
                <p>Instructor: <span className="font-semibold">{course.instructor}</span></p>
                <p>Duration: <span className="font-semibold">{course.duration}</span></p>
              </div>
            </div>
            
            <div className="mt-6 md:mt-0">
              {isEnrolled ? (
                <div className="px-6 py-3 bg-green-500 text-white rounded-md flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Enrolled
                </div>
              ) : (
                <button 
                  onClick={handleEnroll}
                  className="px-6 py-3 bg-white text-blue-600 rounded-md font-medium hover:bg-blue-50 transition"
                >
                  Enroll Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-b">
        <div className="container mx-auto px-8">
          <nav className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-6 font-medium border-b-2 ${
                activeTab === 'overview' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('curriculum')}
              className={`py-4 px-6 font-medium border-b-2 ${
                activeTab === 'curriculum' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Curriculum
            </button>
            <button
              onClick={() => setActiveTab('instructor')}
              className={`py-4 px-6 font-medium border-b-2 ${
                activeTab === 'instructor' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Instructor
            </button>
          </nav>
        </div>
      </div>
      
      <div className="container mx-auto p-8">
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
            <p className="text-gray-700 mb-6">
              {course.description} This comprehensive course is designed to give you the skills and knowledge needed to excel in this subject area. Whether you're a beginner or looking to advance your existing skills, this course provides structured learning that will help you achieve your goals.
            </p>
            
            <h3 className="text-xl font-bold mb-3">What You'll Learn</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                "In-depth understanding of core concepts",
                "Practical skills through hands-on exercises",
                "Industry best practices and techniques",
                "Problem-solving strategies",
                "Real-world implementation strategies",
                "Advanced topics for career advancement"
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            
            <h3 className="text-xl font-bold mb-3">Topics Covered</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {course.topics.map((topic, index) => (
                <span 
                  key={index}
                  className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
                >
                  {topic}
                </span>
              ))}
            </div>
            
            <h3 className="text-xl font-bold mb-3">Requirements</h3>
            <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2">
              <li>Basic understanding of the subject is helpful but not required</li>
              <li>A computer with internet access</li>
              <li>Dedication and willingness to learn</li>
            </ul>
            
            <h3 className="text-xl font-bold mb-3">Who This Course is For</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Beginners looking to enter the field</li>
              <li>Intermediate learners wanting to strengthen their skills</li>
              <li>Professionals seeking to stay current with industry trends</li>
            </ul>
          </div>
        )}
        
        {activeTab === 'curriculum' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Course Curriculum</h2>
              {isEnrolled && (
                <div className="text-sm text-gray-600">
                  Complete all lessons to receive your certificate
                </div>
              )}
            </div>
            
            <div className="space-y-4 mb-8">
              {updatedLessons.map((lesson) => (
                <div 
                  key={lesson.id}
                  className={`border rounded-lg overflow-hidden ${
                    isEnrolled && lesson.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                      {isEnrolled && (
                        <button 
                          onClick={() => toggleLessonCompletion(lesson.id)}
                          className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${
                            lesson.completed 
                              ? 'bg-green-500 border-green-500 text-white' 
                              : 'border-gray-300'
                          }`}
                        >
                          {lesson.completed && (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                          )}
                        </button>
                      )}
                      <div>
                        <h3 className="font-medium text-gray-800">
                          Lesson {lesson.id}: {lesson.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {Math.floor(Math.random() * 30) + 15} minutes
                        </p>
                      </div>
                    </div>
                    
                    {isEnrolled ? (
                      <button className="text-blue-600 hover:text-blue-800">
                        {lesson.completed ? 'Review' : 'Start'}
                      </button>
                    ) : (
                      <span className="text-sm text-gray-500 italic">
                        Enroll to access
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {!isEnrolled && (
              <div className="bg-blue-50 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Ready to start learning?
                  </h3>
                  <p className="text-gray-600">
                    Enroll now to track your progress and access all course materials.
                  </p>
                </div>
                <button 
                  onClick={handleEnroll}
                  className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition"
                >
                  Enroll in Course
                </button>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'instructor' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">About the Instructor</h2>
            
            <div className="flex items-start mb-8">
              <img 
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(course.instructor)}&background=random`}
                alt={course.instructor}
                className="w-24 h-24 rounded-full object-cover mr-6"
              />
              <div>
                <h3 className="text-xl font-bold mb-2">{course.instructor}</h3>
                <p className="text-blue-600 mb-4">Expert in {course.topics.join(', ')}</p>
                <p className="text-gray-700 mb-4">
                  {course.instructor} is a seasoned expert with years of experience in teaching and working with industry-leading projects. With a passion for education and a deep understanding of the subject matter, they bring real-world insights and practical knowledge to this course.
                </p>
                <div className="flex space-x-4">
                  <span className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                    <span>8 Courses</span>
                  </span>
                  <span className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                    <span>7,942 Students</span>
                  </span>
                  <span className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                    </svg>
                    <span>4.8 Rating</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {showEnrollmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl">
            <h2 className="text-2xl font-bold mb-6">Create an Account to Enroll</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEnrollmentModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Create Account & Enroll
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail; 