import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import CourseCard from '../components/CourseCard';
import { coursesData } from '../data/coursesData';
import { getCoursesWithFallback } from '../services/api';

const Home = () => {
  const { setCourses, courses } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const cardsPerSlide = 3;
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      try {
        const data = await getCoursesWithFallback(coursesData);
        
        if (data && data.source && Array.isArray(data.data)) {
          setCourses(data.data);
          const sorted = [...data.data].sort((a, b) => b.rating - a.rating);
          setFeaturedCourses(sorted.slice(0, 6));
        } else if (Array.isArray(data)) {
          setCourses(data);
          const sorted = [...data].sort((a, b) => b.rating - a.rating);
          setFeaturedCourses(sorted.slice(0, 6));
        } else {
          throw new Error('Invalid data format');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        
        setCourses(coursesData);
        const sorted = [...coursesData].sort((a, b) => b.rating - a.rating);
        setFeaturedCourses(sorted.slice(0, 6));
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [setCourses]);
  
  const totalSlides = Math.ceil(featuredCourses.length / cardsPerSlide);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };
  
  const getCurrentSlideCourses = () => {
    const startIdx = currentSlide * cardsPerSlide;
    return featuredCourses.slice(startIdx, startIdx + cardsPerSlide);
  };
  
  return (
    <div>
      <section className="relative bg-gradient-to-r from-blue-700 to-indigo-800 overflow-hidden rounded-2xl mb-16">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-white">
            {Array.from({ length: 20 }).map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-white opacity-20"
                style={{
                  width: `${Math.random() * 300 + 50}px`,
                  height: `${Math.random() * 300 + 50}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${Math.random() * 10 + 20}s ease-in-out infinite`
                }}
              ></div>
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0 md:pr-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
                <span className="block mb-2">Transform Your Future</span>
                <span className="text-blue-300">With Expert Learning</span>
              </h1>
              <p className="text-xl mb-8 text-blue-100 max-w-lg">
                Discover courses taught by industry experts and take your skills to the next level with our interactive learning platform.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/courses"
                  className="group relative inline-flex items-center overflow-hidden rounded-full bg-white px-8 py-3 text-blue-600 focus:outline-none focus:ring active:bg-blue-500"
                >
                  <span className="absolute -end-full transition-all group-hover:end-4">
                    <svg
                      className="h-5 w-5 rtl:rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>

                  <span className="font-medium transition-all group-hover:me-4">
                    Explore Courses
                  </span>
                </Link>
                <a
                  href="#featured"
                  className="group relative inline-flex items-center overflow-hidden rounded-full border border-white px-8 py-3 text-white focus:outline-none focus:ring active:bg-blue-500"
                >
                  <span className="absolute -end-full transition-all group-hover:end-4">
                    <svg
                      className="h-5 w-5 rtl:rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>

                  <span className="font-medium transition-all group-hover:me-4">
                    Learn More
                  </span>
                </a>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="relative rounded-2xl overflow-hidden transform rotate-1 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1513258496099-48168024aec0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Online learning"
                  className="w-full h-auto"
                />
                <div className="absolute -top-4 -left-4 bg-yellow-400 text-blue-900 rounded-full shadow-lg py-2 px-4 font-semibold animate-pulse">
                  New Courses Weekly!
                </div>
                <div className="absolute bottom-4 right-4 bg-white text-blue-600 rounded-full shadow-lg py-2 px-4 font-medium">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    4.9 Average Rating
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section id="featured" className="mb-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Featured Courses</h2>
              <p className="text-gray-600 mt-2">Hand-picked courses recommended by our team</p>
            </div>
            
            {totalSlides > 1 && (
              <div className="flex space-x-2">
                <button 
                  onClick={prevSlide} 
                  className="p-3 rounded-full bg-blue-100 hover:bg-blue-200 transition-all transform hover:scale-105"
                  aria-label="Previous slide"
                >
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={nextSlide} 
                  className="p-3 rounded-full bg-blue-100 hover:bg-blue-200 transition-all transform hover:scale-105"
                  aria-label="Next slide"
                >
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
          
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {totalSlides > 0 && Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div 
                    key={slideIndex} 
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 min-w-full"
                  >
                    {featuredCourses
                      .slice(slideIndex * cardsPerSlide, (slideIndex + 1) * cardsPerSlide)
                      .map(course => (
                        <CourseCard key={course.id} course={course} />
                      ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Link 
              to="/courses" 
              className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800"
            >
              View All Courses
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      <section className="mb-16 bg-gray-50 py-16 rounded-2xl">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose EduLearn?</h2>
            <p className="text-gray-600">Our platform provides the best learning experience with expert instructors and cutting-edge content</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              }
              title="Expert Instructors"
              description="Learn from industry professionals with years of practical experience"
            />
            
            <FeatureCard 
              icon={
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              }
              title="Certificate of Completion"
              description="Earn recognized certificates to boost your professional profile"
            />
            
            <FeatureCard 
              icon={
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              }
              title="Lifetime Access"
              description="Purchase once and access your course content forever, including updates"
            />
          </div>
        </div>
      </section>
      
      <section className="mb-16">
        <div className="container mx-auto px-4">
          <div className="bg-blue-600 rounded-2xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-12 md:p-16 flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start Learning?</h2>
                <p className="text-blue-100 mb-8">Join thousands of students who have already taken the leap to advance their careers and personal growth.</p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/courses"
                    className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-full font-medium hover:bg-blue-50 transition-colors shadow-lg"
                  >
                    Browse Courses
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="h-full relative">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    alt="Students learning"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-transparent opacity-60"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="mb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Student Testimonials</h2>
            <p className="text-gray-600">See what our students have to say about their learning experiences</p>
            <div className="mt-2 inline-flex items-center text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Sample testimonials for demonstration purposes
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="The courses on EduLearn have helped me advance my career in ways I never imagined. The instructors are knowledgeable and supportive."
              name="Sarah Johnson"
              title="UX Designer"
              image="https://randomuser.me/api/portraits/women/32.jpg"
            />
            
            <TestimonialCard 
              quote="I've taken multiple programming courses here and each one has been exceptional. The content is up-to-date and relevant to the industry."
              name="Michael Chen"
              title="Software Developer"
              image="https://randomuser.me/api/portraits/men/44.jpg"
            />
            
            <TestimonialCard 
              quote="As someone switching careers, EduLearn provided me with the perfect foundation to build my skills. I now work in my dream job thanks to these courses."
              name="Emily Rodriguez"
              title="Data Analyst"
              image="https://randomuser.me/api/portraits/women/68.jpg"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    <div className="bg-blue-50 inline-block p-3 rounded-lg mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const TestimonialCard = ({ quote, name, title, image }) => (
  <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
    <div className="flex items-center mb-6">
      <img 
        src={image} 
        alt={name} 
        className="w-14 h-14 rounded-full object-cover mr-4"
      />
      <div>
        <h4 className="font-semibold text-gray-800">{name}</h4>
        <p className="text-gray-500 text-sm">{title}</p>
      </div>
    </div>
    <p className="text-gray-600 italic">"{quote}"</p>
    <div className="mt-4 flex text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      ))}
    </div>
    <div className="mt-3 text-xs text-center text-gray-400 italic">Sample testimonial</div>
  </div>
);

export default Home; 