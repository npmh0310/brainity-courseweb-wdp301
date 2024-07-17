import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { IoIosArrowDown } from "react-icons/io";
const ConfirmCourseDetail = () => {
  const [courses, setCourses] = useState([
    // Your course data array
    {
      id: 1,
      name: "React for Beginners",
      category: "Programming",
      img: "https://i.pravatar.cc/150?img=5",
      price: "$50",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
      status: "Pending",
      uploadBy: "John Doe",
      sections: [
        {
          title: "Chapter 1",
          videos: [
            {
              title: "Introduction",
              url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            },
            {
              title: "Getting Started",
              url: "https://www.youtube.com/embed/3JZ_D3ELwOQ",
            },
          ],
        },
        {
          title: "Chapter 2",
          videos: [
            {
              title: "Components",
              url: "https://www.youtube.com/embed/E7wJTI-1dvQ",
            },
            {
              title: "Props and State",
              url: "https://www.youtube.com/embed/MIqjLK2Kz1I",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Advanced CSS",
      category: "Design",
      img: "https://i.pravatar.cc/150?img=6",
      price: "$70",
      description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    status: "Pending",
      uploadBy: "Jane Smith",
      sections: [
        {
          title: "Chapter 1",
          videos: [
            {
              title: "Flexbox",
              url: "https://www.youtube.com/embed/JJSoEo8JSnc",
            },
            {
              title: "Grid Layout",
              url: "https://www.youtube.com/embed/tI1XE4EOwb4",
            },
          ],
        },
        {
          title: "Chapter 2",
          videos: [
            {
              title: "Animations",
              url: "https://www.youtube.com/embed/CBQGl6zokMs",
            },
            {
              title: "Transitions",
              url: "https://www.youtube.com/embed/zHUpx90NerM",
            },
          ],
        },
      ],
    },
    // Add more courses if needed
  ]);
  const { id } = useParams();
  const navigate = useNavigate();

  console.log("Courses:", courses);

  const course = courses?.find((c) => c.id === parseInt(id));

  console.log("Course:", course);

  if (!course) {
    return <div>Course not found</div>;
  }

  const handleConfirm = () => {
    navigate(-1); // Quay lại trang trước đó trong history
  };

  const handleReject = () => {
    navigate(-1); // Quay lại trang trước đó trong history
  };

  return (
    <div className="flex flex-col min-h-screen ">
      <header className="bg-primary p-4 sticky top-0 z-10">
        <h1 className="text-xl font-semibold">{course.name}</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-4">
        <div className="mt-2">
          <p className="text-lg">
            <span className="font-semibold">Category:</span> {course.category}
          </p>
          <p className="text-lg mt-2">
            <span className="font-semibold">Uploaded By:</span> {course.uploadBy}
          </p>
          <p className="text-lg mt-2">
            <span className="font-semibold">Description:</span> {course.description}
          </p>
        </div>
        <div className="mt-4">
          {course.sections.map((section, index) => (
            <Accordion
              key={index}
              className="mb-4 rounded-lg overflow-hidden"
              style={{ boxShadow: "none" }}
            >
              <AccordionSummary
                expandIcon={<IoIosArrowDown />}
                style={{ backgroundColor: "#f0f0f0", borderBottom: "none" }}
              >
                <p className="text-lg font-semibold">{section.title}</p>
              </AccordionSummary>
              <AccordionDetails style={{ backgroundColor: "#f9f9f9" }}>
                {section.videos.map((video, idx) => (
                  <div key={idx} className="mb-4 flex flex-col lg:flex-row justify-between space-y-2">
                    <p className="font-semibold text-xl">{video.title}</p>
                    <div className="rounded-lg border overflow-hidden">
                      <iframe
                        className="rounded-lg w-full h-64 md:h-96 lg:w-[800px] lg:h-[450px]"
                        src={video.url}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      
                      ></iframe>
                    </div>
                  </div>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </main>
      <footer className="bg-slate-100 p-4 flex justify-between md:justify-end space-x-4 sticky bottom-0">
        <button
          className="bg-primary hover:bg-[#03ecbe] text-white px-[40px] py-[9px] my-1 text-sm font-semibold rounded-full backdrop-blur-md transition transform hover:scale-105"
          onClick={handleConfirm}
        >
          Confirm
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-[40px] py-[9px] my-1 text-sm font-semibold rounded-full backdrop-blur-md transition transform hover:scale-105"
          onClick={handleReject}
        >
          Reject
        </button>
      </footer>
    </div>
  );
};

export default ConfirmCourseDetail;
