const BASE_URL = 'https://openlibrary.org/subjects';

const SUBJECTS = [
  'programming',
  'computer_science',
  'data_science',
  'web_development',
  'machine_learning',
  'design'
];

export const fetchCourses = async () => {
  try {
    const randomSubjects = SUBJECTS.sort(() => 0.5 - Math.random()).slice(0, 3);
    const coursePromises = randomSubjects.map(async (subject) => {
      try {
        const response = await fetch(`${BASE_URL}/${subject}.json?limit=5`);
        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }
        return response.json();
      } catch (error) {
        console.error(`Error fetching subject ${subject}:`, error);
        return null;
      }
    });

    const subjectResults = await Promise.all(coursePromises);
    
    let transformedCourses = [];
    let idCounter = 1;
    
    subjectResults.forEach((result, subjectIndex) => {
      if (result && result.works && Array.isArray(result.works)) {
        const subjectName = SUBJECTS[subjectIndex] || 'general';
        
        const courses = result.works.map((work) => {
          if (!work) return null;
          
          const authorName = work.authors && Array.isArray(work.authors) && work.authors.length > 0 && work.authors[0]?.name 
            ? work.authors[0].name 
            : 'Expert Instructor';
            
          const description = typeof work.description === 'object' && work.description?.value
            ? work.description.value
            : typeof work.description === 'string'
              ? work.description
              : `Learn all about ${work.title || 'this subject'} in this comprehensive course designed for all skill levels.`;
          
          return {
            id: idCounter++,
            title: work.title || `Course ${idCounter}`,
            instructor: authorName,
            level: getRandomLevel(),
            rating: (4 + Math.random()).toFixed(1),
            image: work.cover_id 
              ? `https://covers.openlibrary.org/b/id/${work.cover_id}-L.jpg` 
              : `https://source.unsplash.com/random/800x600/?${subjectName}`,
            description: description,
            duration: `${Math.floor(Math.random() * 10) + 4} weeks`,
            lessons: generateLessons(work.title || `Module ${idCounter}`, 5),
            topics: generateTopics(subjectName),
          };
        }).filter(course => course !== null);
        
        transformedCourses = [...transformedCourses, ...courses];
      }
    });
    
    return transformedCourses;
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
};

const fetchFromJSONPlaceholder = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();
    
    const limitedPosts = posts.slice(0, 12);
    
    return limitedPosts.map((post, index) => ({
      id: index + 1,
      title: `Course: ${post.title.slice(0, 30)}...`,
      instructor: `Instructor ${post.userId}`,
      level: getRandomLevel(),
      rating: (4 + Math.random()).toFixed(1),
      image: `https://source.unsplash.com/random/800x600/?education,${index}`,
      description: post.body,
      duration: `${Math.floor(Math.random() * 10) + 4} weeks`,
      lessons: generateLessons(`Module ${index + 1}`, 5),
      topics: generateTopics(index % 5 === 0 ? 'Programming' : 
                            index % 4 === 0 ? 'Data' : 
                            index % 3 === 0 ? 'Education' : 
                            index % 2 === 0 ? 'Development' : 'Design'),
    }));
  } catch (error) {
    console.error('Error fetching from JSONPlaceholder:', error);
    return [];
  }
};

const generateLessons = (courseTitle, count) => {
  const lessons = [];
  const topics = [
    'Introduction to', 'Fundamentals of', 'Advanced', 'Mastering', 
    'Practical', 'Essential', 'Deep Dive into', 'Understanding'
  ];
  
  for (let i = 1; i <= count; i++) {
    lessons.push({
      id: i,
      title: `${topics[Math.floor(Math.random() * topics.length)]} ${courseTitle} - Part ${i}`,
      completed: false
    });
  }
  return lessons;
};

const generateTopics = (category) => {
  const topicsByCategory = {
    'programming': ['JavaScript', 'Python', 'Algorithms', 'Software Engineering'],
    'computer_science': ['Data Structures', 'Algorithms', 'System Design', 'Theory'],
    'web_development': ['HTML/CSS', 'JavaScript', 'React', 'Backend Development'],
    'data_science': ['Data Analysis', 'Visualization', 'Big Data', 'Machine Learning'],
    'machine_learning': ['Neural Networks', 'Deep Learning', 'NLP', 'Computer Vision'],
    'design': ['UI Design', 'UX Design', 'Design Thinking', 'Prototyping'],
    'Development': ['Programming', 'Web Development', 'API Integration', 'Cloud Services'],
    'Data': ['Data Analysis', 'Visualization', 'Big Data', 'Machine Learning'],
    'Education': ['Learning', 'Teaching', 'Assessment', 'Curriculum Design'],
    'Science': ['Research', 'Experimentation', 'Scientific Method', 'Analysis'],
    'Programming': ['Coding', 'Algorithms', 'Data Structures', 'Software Engineering'],
  };
  
  const topics = topicsByCategory[category] || ['Course Fundamentals', 'Practical Skills', 'Industry Applications', 'Career Development'];
  
  return topics.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 2);
};

const getRandomLevel = () => {
  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  return levels[Math.floor(Math.random() * levels.length)];
};

export const getCoursesWithFallback = async (mockData) => {
  try {
    console.log('Attempting to fetch data from Open Library API...');
    const openLibraryCourses = await fetchCourses();
    if (openLibraryCourses && Array.isArray(openLibraryCourses) && openLibraryCourses.length > 0) {
      console.log('Successfully fetched data from Open Library API.');
      return {
        source: 'openlibrary',
        data: openLibraryCourses
      };
    }
    
    console.log('Open Library API failed, trying JSONPlaceholder API...');
    try {
      const jsonPlaceholderCourses = await fetchFromJSONPlaceholder();
      if (jsonPlaceholderCourses && Array.isArray(jsonPlaceholderCourses) && jsonPlaceholderCourses.length > 0) {
        console.log('Successfully fetched data from JSONPlaceholder API.');
        return {
          source: 'jsonplaceholder',
          data: jsonPlaceholderCourses
        };
      }
    } catch (jsonError) {
      console.error('JSONPlaceholder API error:', jsonError);
    }
    
    console.log('All APIs failed, using mock data...');
    if (!mockData || !Array.isArray(mockData) || mockData.length === 0) {
      throw new Error('No mock data provided or invalid format');
    }
    return {
      source: 'mockdata',
      data: mockData,
      isDemo: true
    };
  } catch (error) {
    console.error('Error in API fallback chain:', error);
    if (!mockData || !Array.isArray(mockData) || mockData.length === 0) {
      return {
        source: 'error',
        data: [],
        isDemo: true,
        error: error.message
      };
    }
    return {
      source: 'mockdata',
      data: mockData,
      isDemo: true
    };
  }
};