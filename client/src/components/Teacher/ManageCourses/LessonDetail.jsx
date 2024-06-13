import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { ChevronDown } from "lucide-react";
import Button from "@mui/material/Button";
import videoTest from "../../../assets/videos/ADBE925D-45A7-437E-A735-415F7A4625E4.mp4";
const LessonDetail = ({ section }) => {
  // const firstSection = course.sections[0];
  // console.log(section.lessons)

  return (
    <>
      {section.lessons?.map((lesson, lessonIndex) => (
        <div className="mb-3" key={lessonIndex}>
          <Accordion className=" py-2">
            <AccordionSummary
              expandIcon={<ChevronDown />}
              aria-controls="panel1-content"
              id="panel1-header"
              className="font-semibold uppercase font-secondary"
            >
              {lessonIndex + 1}. {lesson.lessonName}
            </AccordionSummary>
            <div className="flex flex-col container mx-auto mb-7">
              <div className=" p-5">
                <div className="flex flex-row items-start justify-between gap-x-4 border-b-2">
                  <div className="flex flex-col gap-y-3 mb-6">
                    <span className="italic text-third font-medium">
                      Lesson name:
                    </span>
                    <span className="text-sm">{lesson.lessonName}</span>
                  </div>
                  <div className="flex flex-col gap-y-3 mb-6">
                    <span className="italic text-third font-medium">
                      Lesson description:
                    </span>
                    <span className="text-sm">{lesson.description}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-y-3 mt-5">
                  <span className="italic text-third font-medium">
                    Lesson video:
                  </span>
                  <div className="flex flex-col gap-y-5">
                    <span className="text-sm">{lesson.videoUrl}</span>
                    <video width="50%" className="rounded-lg" controls>
                      <source src={videoTest} type="video/mp4" />
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </Accordion>
        </div>
      ))}
    </>
  );
};

export default LessonDetail;
