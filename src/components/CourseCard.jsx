import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const { id, title, instructor, level, rating, image, description, duration } = course;
  
  const getLevelBadgeColor = () => {
    switch(level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'Advanced':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-56 object-cover transform transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
        
        <div className={`absolute top-4 right-4 ${getLevelBadgeColor()} text-xs font-semibold px-3 py-1.5 rounded-full`}>
          {level}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        
        <div className="flex items-center mb-4">
          <span className="flex items-center text-yellow-500 mr-2">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span className="font-medium">{rating}</span>
          </span>
          <span className="text-gray-600 text-sm">• {duration}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-5 line-clamp-3">
          {description}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
              <span className="text-blue-600 font-semibold text-xs">
                {instructor.split(' ').map(name => name[0]).join('')}
              </span>
            </div>
            <span className="text-gray-700 text-sm font-medium">
              {instructor}
            </span>
          </div>
          
          <Link 
            to={`/courses/${id}`} 
            className="relative inline-flex items-center overflow-hidden rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 group-hover:pl-2 group-hover:pr-6"
          >
            <span className="relative text-sm font-medium">
              View Course
            </span>
            <span className="absolute right-0 translate-x-full transition-transform duration-300 group-hover:translate-x-2">
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard; 