import React from "react";
import {
  Pen,
  LayoutDashboard,
  ListChecks,
  CirclePlus,
  List,
  Eye,
  Video,
} from "lucide-react";
import LessonDetail from "./LessonDetail";
import ButtonAdd from "../common/ButtonAdd";
import Modal from "@mui/material/Modal";
import ModalChapter from "./ModalChapter";
import ModalLesson from "./ModalLesson";
import InputCustom from "../common/InputCustom";

const SectionDetail = ({ section }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  if (!section) {
    return <div>Section not found</div>;
  }

  return (
    <div className="mt-6 px-10 ">
      <div className="flex flex-col gap-y-5 mb-8">
        <div className="flex items-center gap-x-4 text-third  mt-6">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-third bg-third bg-opacity-15 ">
            <LayoutDashboard className=" " />
          </div>
          <h1 className="text-xl font-semibold">Edit section</h1>
        </div>
        <div className="flex flex-col gap-y-4">
          {/* part 1 */}
          <div className="flex items-center justify-between gap-x-10">
            <div className="flex items-center flex-col bg-white justify-between px-6 py-6 w-full gap-y-4 rounded-lg border border-spacing-1   ">
              <div className="flex items-center justify-between w-full  ">
                <label className="font-medium" htmlFor="">
                  Section name:{" "}
                </label>
                <span className="flex items-center gap-x-2 text-sm cursor-pointer">
                  <Pen size={15} /> edit name
                </span>
              </div>
              <div className="w-full">
              <InputCustom id='sectionName' display={section.sectionName}/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-6">
        {/* header */}
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-x-4 text-third  ">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-third bg-third bg-opacity-15 ">
              <List className=" " />
            </div>
            <h1 className="text-xl font-semibold">List lesson</h1>
          </div>
          <div>
            <ButtonAdd label="create lesson" onClick={handleOpen} />
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <>
                <ModalLesson handleClose={handleClose} />
              </>
            </Modal>
          </div>
        </div>
        {/* header */}
        {/* main */}
        <div>
          <LessonDetail section={section} />
        </div>
        {/* main */}
      </div>
    </div>
  );
};

export default SectionDetail;
