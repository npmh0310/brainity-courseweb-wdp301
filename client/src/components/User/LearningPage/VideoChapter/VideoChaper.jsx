import React, { useEffect, useState } from 'react';
import { Spinner } from 'flowbite-react';
import ReactPlayer from 'react-player'
import { completedLesson } from '../../../../fetchData/UserChapterProgress';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateLessonProgress } from '../../../../redux/features/learningSlice';
import { ChevronLeft, ChevronRight, SkipForward } from 'lucide-react';

function VideoChaper(props) {
  const { courseProgress, courseId, lesson } = props;
  const [loading, setLoading] = useState(true);
  const [nextVideo, setNextVideo] = useState(false);
  const currentLesson = lesson && courseProgress.lessonsProgress.find(data => data.lesson === lesson._id)
  const nextLesson = lesson && courseProgress.lessonsProgress.find(data => data.index === currentLesson.index + 1)
  const preLesson = (lesson && currentLesson.index > 0) && courseProgress.lessonsProgress.find(data => data.index === currentLesson.index - 1)

  const navigate = useNavigate()
  const dispatch = useDispatch()


  useEffect(() => {
    if (lesson) setLoading(false);
  }, [lesson]);


  const handleVideoEnd = async () => {
    const res = await completedLesson({ courseId: courseId, lessonId: lesson._id, isCompleted: true })
    if (res.status === 200) {
      dispatch(updateLessonProgress({ lessonId: lesson._id, isCompleted: true }));
    }
    
    const nextLesson = courseProgress.lessonsProgress.find(data => data.index === currentLesson.index + 1)

    if(nextLesson) {
      setNextVideo(true)
      setTimeout(() => {
        navigate(`/learningCourse/${courseProgress.course}/lesson/${nextLesson.lesson}`)
        setNextVideo(false)
      }, (3000));
    }

  }

  return (
    <div className=' relative w-full h-full'>
      {loading ? (
        <Spinner color="gray" />
      ) : (
        <ReactPlayer
          width='100%'
          height='100%'
          url={lesson.videoUrl}
          controls={true}
          onEnded={handleVideoEnd}
        />
      )}
      <div className=' absolute right-[50%] top-[50%] -translate-y-[50%] flex gap-x-2 justify-center items-center z-50'>
        {nextVideo && <SkipForward size={40} className=' text-white hover:scale-110 transition-all ease-in-out cursor-pointer' />}
      </div>
      {lesson && <>
        {nextLesson && <Link to={`/learningCourse/${courseProgress.course}/lesson/${nextLesson.lesson}`} className=' absolute top-[50%] right-0 -translate-y-[50%] flex justify-center items-center border border-white cursor-pointer'>
          <ChevronRight className=' text-white' />
        </Link>}
        {preLesson && <Link to={`/learningCourse/${courseProgress.course}/lesson/${preLesson.lesson}`} className=' absolute top-[50%] left-0 -translate-y-[50%] flex justify-center items-center border border-white cursor-pointer '>
          <ChevronLeft className=' text-white' />
        </Link>}
      </>}
    </div>
  );
}

export default VideoChaper;
