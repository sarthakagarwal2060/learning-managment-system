import { useContext, useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../App';

const Navbar = () => {
  const { user, setUser } = useContext(AppContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(true);
  const userMenuRef = useRef(null);
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
      name: formData.get('name'),
      email: formData.get('email'),
      enrolledCourses: [],
      progress: {}
    };
    
    setUser(userData);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    setUserMenuOpen(false);
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md text-gray-800' : 'bg-transparent text-white'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold flex items-center">
            <svg className="w-8 h-8 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
            <span className={scrolled ? 'text-blue-600' : 'text-white'}>EduLearn</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/" isActive={isActive('/')} scrolled={scrolled}>Home</NavLink>
            <NavLink to="/courses" isActive={isActive('/courses')} scrolled={scrolled}>Courses</NavLink>
            <NavLink to="/about" isActive={isActive('/about')} scrolled={scrolled}>About</NavLink>
            <NavLink to="/contact" isActive={isActive('/contact')} scrolled={scrolled}>Contact</NavLink>
            
            {user ? (
              <div className="relative ml-4" ref={userMenuRef}>
                <button 
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className={`flex items-center rounded-full focus:outline-none ${scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}
                >
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-lg mr-2">
                    {user.name.charAt(0)}
                  </div>
                  <span className="font-medium">{user.name.split(' ')[0]}</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={userMenuOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                  </svg>
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Link 
                      to="/dashboard" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => setShowLoginModal(true)}
                className={`ml-4 ${
                  scrolled 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-white text-blue-600 hover:bg-blue-50'
                } px-6 py-2 rounded-full font-medium transition-colors shadow-md hover:shadow-lg`}
              >
                Log In
              </button>
            )}
          </div>
          
          <button 
            className={`md:hidden focus:outline-none ${scrolled ? 'text-gray-800' : 'text-white'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        <div 
          className={`md:hidden overflow-hidden transition-all ease-in-out duration-300 ${
            mobileMenuOpen ? 'max-h-screen opacity-100 py-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col space-y-2 pb-3">
            <MobileNavLink to="/" isActive={isActive('/')}>Home</MobileNavLink>
            <MobileNavLink to="/courses" isActive={isActive('/courses')}>Courses</MobileNavLink>
            <MobileNavLink to="/about" isActive={isActive('/about')}>About</MobileNavLink>
            <MobileNavLink to="/contact" isActive={isActive('/contact')}>Contact</MobileNavLink>
            
            {user ? (
              <>
                <MobileNavLink to="/dashboard" isActive={isActive('/dashboard')}>Dashboard</MobileNavLink>
                <div className="pt-2 border-t border-gray-200 mt-2">
                  <div className="flex items-center px-4 py-2">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-lg mr-2">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left bg-red-50 text-red-600 px-4 py-2 rounded-md font-medium hover:bg-red-100 transition mt-2"
                  >
                    Log Out
                  </button>
                </div>
              </>
            ) : (
              <button 
                onClick={() => setShowLoginModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition"
              >
                Log In
              </button>
            )}
          </div>
        </div>
      </div>

      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm">
          <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl relative">
            <button 
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-gray-600 mb-6">Enter your details to access your account.</p>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                  placeholder="john@example.com"
                />
              </div>
              
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Demo Login
              </button>
              
              <div className="text-center bg-yellow-50 border border-yellow-100 rounded-lg p-3 mt-4">
                <div className="flex items-center justify-center mb-1">
                  <svg className="w-5 h-5 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span className="font-medium text-sm text-yellow-700">Demo Authentication</span>
                </div>
                <p className="text-gray-600 text-xs">
                  This is a demo app with client-side authentication only. 
                  No real backend or data persistence is implemented.
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, children, isActive, scrolled }) => (
  <Link
    to={to}
    className={`px-3 py-2 rounded-md font-medium transition-colors ${
      isActive
        ? scrolled 
          ? 'text-blue-600 bg-blue-50' 
          : 'text-white bg-white bg-opacity-20'
        : scrolled 
          ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
          : 'text-white hover:bg-white hover:bg-opacity-10'
    }`}
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, children, isActive }) => (
  <Link
    to={to}
    className={`px-4 py-2 font-medium rounded-md ${
      isActive 
        ? 'bg-blue-50 text-blue-600' 
        : 'text-gray-700 hover:bg-gray-50'
    }`}
  >
    {children}
  </Link>
);

export default Navbar; 