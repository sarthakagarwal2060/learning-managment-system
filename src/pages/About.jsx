import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">About Us</h1>
      
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-gray-700 mb-6">
          At EduLearn, our mission is to provide high-quality education accessible to everyone, 
          regardless of their background or location. We believe that education is a fundamental 
          right and that everyone deserves access to knowledge that can transform their lives and careers.
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Who We Are</h2>
        <p className="text-gray-700 mb-6">
          Founded in 2020, EduLearn has grown from a small team of passionate educators to a 
          comprehensive learning platform serving thousands of students worldwide. Our team 
          consists of experienced instructors, content creators, and education technology experts 
          who are dedicated to creating the best learning experience possible.
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Approach</h2>
        <p className="text-gray-700 mb-6">
          We believe in learning by doing. Our courses are designed to be practical, engaging, 
          and relevant to today's job market. Each course includes:
        </p>
        
        <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
          <li>Comprehensive video lessons from industry experts</li>
          <li>Hands-on projects that build your portfolio</li>
          <li>Interactive quizzes to reinforce learning</li>
          <li>Community support from instructors and fellow students</li>
          <li>Up-to-date content that reflects current industry standards</li>
        </ul>
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-xl font-medium text-blue-700 mb-2">Accessibility</h3>
            <p className="text-gray-700">
              Education should be accessible to everyone, regardless of background or circumstances.
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-xl font-medium text-blue-700 mb-2">Quality</h3>
            <p className="text-gray-700">
              We maintain high standards in our content and teaching methodologies.
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-xl font-medium text-blue-700 mb-2">Innovation</h3>
            <p className="text-gray-700">
              We continuously evolve our platform and courses to reflect the latest advancements.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <img 
              src="https://ui-avatars.com/api/?name=Sarthak+Agarwal&background=0D8ABC&color=fff" 
              alt="CEO" 
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-medium text-gray-800">Sarthak Agarwal</h3>
            <p className="text-blue-600 mb-2">CEO & Founder</p>
            <p className="text-gray-600 text-sm">
              Education enthusiast with expertise in creating immersive learning experiences
            </p>
          </div>
          <div className="text-center">
            <img 
              src="https://ui-avatars.com/api/?name=Sarthak+A&background=4F9E69&color=fff" 
              alt="Head of Content" 
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-medium text-gray-800">Sarthak A.</h3>
            <p className="text-blue-600 mb-2">Head of Content</p>
            <p className="text-gray-600 text-sm">
              Curriculum designer focused on creating engaging educational content
            </p>
          </div>
          <div className="text-center">
            <img 
              src="https://ui-avatars.com/api/?name=S+Agarwal&background=B85C3C&color=fff" 
              alt="CTO" 
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-medium text-gray-800">S. Agarwal</h3>
            <p className="text-blue-600 mb-2">CTO</p>
            <p className="text-gray-600 text-sm">
              Tech innovator specializing in educational platforms and learning systems
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 