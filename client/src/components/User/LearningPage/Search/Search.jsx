import { SearchIcon } from 'lucide-react';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { searchCourseContent } from '../../../../function/function';
import Section from '../Section/Section';
import Chapter from '../Chapter/Chapter';

function Search( props) {
  // const location = useLocation();
  // const course = location.state || {};
  const {course} = props
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value) {
      const find = searchCourseContent(course, value);
      setResult(find);
    } else {
      setResult(null);
    }
  };

  const search = () => {
    const find = searchCourseContent(course, query);
    setResult(find);
  };

  return (
    <div className='flex flex-col w-full lg:w-9/12 mx-auto mt-10'>
      <div className='w-full flex items-center'>
        <input
          className='w-full px-4 border-y border-l border-black h-10'
          type="text"
          placeholder='Search course content'
          onChange={handleChange}
        />
        <span
          className='w-10 h-10 border border-primary bg-primary cursor-pointer flex justify-center items-center'
          onClick={search}
        >
          <SearchIcon color='white' />
        </span>
      </div>
      {result ? (
        <div className='p-4 mt-[48px] flex flex-col items-start'>
          <h2>Results for "{query}" ({result.lessons.length + result.sections.length} results)</h2>
          {result.sections.length > 0 && (
            <div className=' w-full'>
              <h3 className='font-semibold'>Sections</h3>
              <ul>
                {result.sections.map(section => (
                  <li key={section._id}><Section section ={section}/></li>
                ))}
              </ul>
            </div>
          )}
          {result.lessons.length > 0 && (
            <div className=' w-full'>
              <h3 className='font-semibold'>Lessons</h3>
              <ul className=' '>
                {result.lessons.map(({ sectionName, lesson }) => (
                  <li key={lesson._id} className=''>
                    <strong>{sectionName}:</strong> <Chapter chapter = {lesson}/>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className='mt-12 flex flex-col justify-center items-center'>
          <h2 className='text-lg font-semibold text-black'>Start a new search</h2>
          <span>To find sections and lessons.</span>
        </div>
      )}
    </div>
  );
}

export default Search;
