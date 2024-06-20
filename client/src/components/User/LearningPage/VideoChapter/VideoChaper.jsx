import React, { useEffect, useState } from 'react';
import { Spinner } from 'flowbite-react';
import ReactPlayer from 'react-player'
import { completedLesson } from '../../../../fetchData/UserChapterProgress';
import { useNavigate } from 'react-router-dom';
import { useLessonProgress } from '../../../../hooks/LearningPageContext';

function VideoChaper(props) {
  const { courseProgress, courseId, lesson } = props;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const { lessonsProgress, updateLessonProgress } = useLessonProgress();

  console.log(lessonsProgress)


  useEffect(() => {
    if (lesson) setLoading(false);
  }, [lesson]);

  const handleVideoEnd = async () => {
    await completedLesson({ courseId: courseId, lessonId: lesson._id, isCompleted: true })
    updateLessonProgress(lesson._id, true);
    // const currentLesson = lessonsProgress.find(data => data.lesson  === lesson._id )
    // const nextLesson = lessonsProgress.find(data => data.index === currentLesson.index  + 1)
    // console.log(nextLesson)
    // if(nextLesson){
    //   navigate(`lesson/${nextLesson.nextLesson}`)
    // }
  }

  return (
    <div className='w-full h-full'>
      {loading ? (
        <Spinner />
      ) : (
        <ReactPlayer
          width='100%'
          height='100%'
          url={lesson.videoUrl}
          controls={true}
          onEnded={handleVideoEnd}
        />
      )}
    </div>
  );
}

export default VideoChaper;
