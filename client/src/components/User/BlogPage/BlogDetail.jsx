import { CgProfile } from "react-icons/cg";
import parse from "html-react-parser";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Eye,
  MessageCircleMore,
  Heart,
  Share2,
  Facebook,
  Twitter,
  Link2,
  SendHorizontal,
} from "lucide-react";
import BlogBg from "../../../assets/images/Blog/blogbg2.jpg";
import {
  getBlogById,
  createComment,
  getComments,
  updateComment,
  deleteComment,
} from "../../../fetchData/Blog";
import { useEffect, useState, useRef } from "react";
import { formatDate2 } from "../../../function/function";
import { Snackbar, Alert } from '@mui/material';
function BlogDetail() {
  const [blog, setBlog] = useState();
  const [comments, setComments] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const { id } = useParams();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentId, setCommentId] = useState(null); // Added state for commentId
  const [openToast, setOpenToast] = useState(false); // State for toast
  const [toastMessage, setToastMessage] = useState(""); // State for toast message
  const [toastSeverity, setToastSeverity] = useState("success"); // Severity of toast
  const textareaRef = useRef(null);

  const toggleDropdown = (dropdownId) => {
    setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
    console.log("dropdown id", dropdownId);
    console.log("cc j day", openDropdown);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setOpenDropdown(null); // Close the dropdown
  };

  const handleInputChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent new line on Enter
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Optionally reset commentText to its initial value if needed
  };

  // Prevent textarea from exiting edit mode when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (textareaRef.current && !textareaRef.current.contains(event.target)) {
        // Do nothing, keep the textarea open
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing]);

  const fetchData = async (id) => {
    const res = await getBlogById(id);
    if (res.status === 200) {
      setBlog(res.data.data);
    }
  };

  useEffect(() => {
    fetchData(id);
    console.log("user", user);
  }, [id]);

  const fetchComments = async (id) => {
    try {
      const res = await getComments(id);
      if (res.status === 200) {
        setComments(res.data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments(id);
  }, [id]);

  // Thêm comment
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newComment = { content: commentText, user: user }; // Thay đổi tùy thuộc vào cấu trúc comment
      const res = await createComment(id, newComment);
      if (res.status === 201) {
        console.log(newComment);
        // Fetch lại bình luận sau khi thêm mới thành công
        fetchComments(id);
        setToastMessage("Comment added successfully!");
        setToastSeverity("success");
        setOpenToast(true);
        setCommentText("");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const updatedComment = { content: commentText };
      const res = await updateComment(id, commentId, updatedComment);
      if (res.status === 200) {
        console.log(updatedComment);
        // Fetch lại bình luận sau khi cập nhật thành công
        fetchComments(id);
        setIsEditing(false);
        setCommentText("");
        setToastMessage("Comment updated successfully!");
        setToastSeverity("success");
        setOpenToast(true);
        setCommentId(null); // Clear the commentId after editing
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await deleteComment(id, commentId);
      if (res.status === 200) {
        // Fetch lại bình luận sau khi xóa thành công
        console.log("Deleted comment:", res);
        fetchComments(id);
        setOpenDropdown(null);
        setToastMessage("Comment deleted successfully!");
        setToastSeverity("success");
        setOpenToast(true);
        setCommentId(null); // Clear the commentId after deleting
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };
  const handleCloseToast = () => {
    setOpenToast(false);
  };
  return (
    <div className="bg-white text-third">
      {/* Blog content */}
      <div className="w-full bg-white items-center">
        {/* content */}
        <div
          className="w-10/12 mx-auto h-[350px] relative object-bottom lg:shrink-0"
          style={{
            backgroundImage: `url(${BlogBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
          }}
        >
          <div className="text-white italic font-extrabold text-6xl absolute inset-y-1/3 inset-x-1/2 lg:inset-x-1/2">
            Blog
          </div>
          <div className="absolute bottom-0 left-12 right-12 bg-white h-12"></div>
        </div>
        <div className="container mx-auto bg-white px-4 lg:px-32">
          <div className="pt-4">
            <ul className="flex gap-12 font-extrabold italic pb-6">
              <li className="hover:text-primary">
                <Link to="/blogpage">All blogs</Link>
              </li>
              <li>
                <a className="hover:text-primary" href="#">
                  React JS
                </a>
              </li>
              <li>
                <a className="hover:text-primary" href="#">
                  Node JS
                </a>
              </li>
            </ul>
          </div>

          <div>
            {blog && (
              <div>
                <div className="flex lg:flex-row justify-between mb-4 lg:mb-8">
                  <div className="flex items-center gap-3 mb-4 lg:mb-0">
                    <img
                      src={blog.author.avatar}
                      className=" w-10 h-10 object-cover rounded-full"
                      alt=""
                    />
                    <div className="flex gap-2 lg:gap-4 text-xs lg:text-sm">
                      <li className="list-none">{blog.author.name}</li>
                      <li>{formatDate2(blog.createdAt)}</li>
                    </div>
                  </div>
                  <div className="">
                    <Share2
                      size="16px"
                      className="lg:size-20px mr-0 lg:mr-20"
                    />
                  </div>
                </div>

                <div className="block pt-8">
                  <div className="pb-8 border-b-2">
                    <h1 className="font-bold text-1xl lg:text-3xl pb-4 lg:pb-8 text-left italic">
                      {blog.title}
                      {/* {parse(blog.content)} */}
                    </h1>
                    <p className="font-medium text-base lg:text-lg pb-4 lg:pb-8 text-left">
                      {blog.description}
                    </p>
                    <img
                      src={blog.imgUrl}
                      alt="img"
                      className="w-full lg:w-1/2 h-auto mx-auto pb-4 lg:pb-8"
                    />
                    {/* <p className="font-bold text-lg lg:text-1xl text-left italic pb-4 lg:pb-8">
                      {parse(blog.content)}
                    </p> */}
                    <p className="pb-4 lg:pb-8 text-sm lg:text-base">
                      {parse(blog.content)}
                    </p>
                    {/* <h3 className="font-bold text-xl lg:text-3xl text-left italic pb-4 lg:pb-8">
                      Next content
                    </h3>
                    <p className="pb-4 lg:pb-8 text-sm lg:text-base">
                      Lorem ipsum dolor sit amet consectetur, adipisicing
                      elit. Temporibus, optio dolor eligendi perferendis
                      eveniet unde in? Blanditiis, porro sequi eaque illum
                      quod aut impedit explicabo dolorum, tenetur nulla cumque
                      odit.Lorem ipsum, dolor sit amet consectetur adipisicing
                      elit. Alias ad provident laborum quod ducimus eligendi
                      consequatur aperiam! Libero ratione ut quibusdam
                      voluptatum.
                    </p> */}
                  </div>
                  {/* blogFooter */}
                  <div className="flex  justify-between border-b-2 mt-4 pb-4">
                    <div className="flex gap-4 mb-4 lg:mb-0">
                      <Facebook size="20px" fill="blue" stroke="0" />
                      <Twitter size="20px" strokeWidth={2} />
                      <Link2 size="20px" strokeWidth={2} />
                    </div>
                    <div className="flex gap-2 lg:gap-4 text-xs lg:text-base">
                      <li className="list-none">Feature</li>
                      <li>Feature</li>
                    </div>
                  </div>
                  {/* blogShare */}
                  <div className="flex py-4 justify-between">
                    <ul className="flex gap-2 lg:gap-4 text-xs lg:text-base">
                      <li>0 views</li>
                      <li>{comments.length} comments</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Comment */}
            <div>
              <p className="font-bold text-lg lg:text-xl text-left text-pretty italic border-b-2 pb-2">
                Comments
              </p>
              <div className="max-h-96 overflow-y-auto">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment._id} className="text-third mb-4">
                    <article className="p-6 text-base bg-white rounded-lg">
                      <footer className="relative flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold">
                            <img
                              className="mr-2 w-6 h-6 rounded-full"
                              src={
                                comment.user.avatar ||
                                "https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                              }
                              alt={comment.user.username}
                            />
                            {comment.user.username}
                          </p>
                          <p className="text-sm text-third">
                            {formatDate2(comment.createdAt)}
                          </p>
                        </div>

                        {comment.user._id === user._id && (
                          <div className="relative">
                            <button
                              id={`dropdownComment${comment._id}Button`}
                              className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
                              type="button"
                              onClick={() =>
                                toggleDropdown(`dropdownComment${comment._id}`)
                              }
                            >
                              <svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 16 3"
                              >
                                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                              </svg>
                              <span className="sr-only">Comment settings</span>
                            </button>
                            <div
                              id={`dropdownComment${comment._id}`}
                              className={`${
                                openDropdown === `dropdownComment${comment._id}`
                                  ? "block"
                                  : "hidden"
                              } absolute right-0 z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow`}
                            >
                              <ul
                                className="py-1 text-sm text-gray-700"
                                aria-labelledby="dropdownMenuIconHorizontalButton"
                              >
                                <li>
                                  <button
                                    onClick={() => {
                                      setIsEditing(true);
                                      setOpenDropdown(null);
                                      setCommentText(comment.content);
                                      setCommentId(comment._id);
                                    }}
                                    className="block py-2 px-4 hover:bg-gray-100 w-full text-left"
                                  >
                                    Edit
                                  </button>
                                </li>
                                <li>
                                  <button
                                    onClick={() =>
                                      handleDeleteComment(comment._id)
                                    }
                                    className="block py-2 px-4 w-full text-left text-red-500 hover:bg-gray-100"
                                  >
                                    Remove
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                        )}
                      </footer>
                      {isEditing && commentId === comment._id ? (
                        <div className="flex flex-col relative">
                          <textarea
                            ref={textareaRef}
                            type="text"
                            value={commentText}
                            onChange={handleInputChange}
                            onKeyPress={handleInputKeyPress}
                            className="w-full h-20 p-2 border border-gray-300 rounded text-base"
                            autoFocus
                          />
                          <div className="self-end items-center flex gap-2 mt-2">
                            <button
                              onClick={handleCancelEdit}
                              className="w-fit text-center h-fit bg-red-400 hover:bg-red-300 text-white px-3 py-1 my-1 lg:my-1 transition-transform duration-200 ease-in-out transform hover:scale-105 rounded-full hidden md:flex"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleSaveEdit}
                              className="w-fit h-fit bg-primary hover:bg-[#03ecbe] text-white px-4 py-2 my-1 lg:my-1 transition-transform duration-200 ease-in-out transform hover:scale-105 rounded-full hidden md:flex"
                            >
                              <SendHorizontal size="16px" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-third text-base">
                          {comment.content}
                        </p>
                      )}
                    </article>
                  </div>
                ))
              ) : (
                <p className="text-third text-base">No comments yet.</p>
              )}
              </div>
              

              {/* Post Comment */}
              <div className="w-full pt-4 lg:pt-8 pb-10 lg:pb-20 px-2">
                <form onSubmit={handleSubmit} className="mb-6">
                  <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border-2">
                    <label htmlFor="comment" className="sr-only">
                      Your comment
                    </label>
                    <textarea
                      id="comment"
                      rows="6"
                      value={commentText}
                      onChange={handleInputChange}
                      className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                      placeholder="Write a comment..."
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="bg-primary hover:bg-[#03ecbe] text-white px-4 lg:px-[40px] py-2 lg:py-[9px] my-1 lg:my-1 transition-transform duration-200 ease-in-out transform hover:scale-105 rounded-full hidden md:flex text-sm font-semibold"
                  >
                    Post comment
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
       {/* Toast Notification */}
       <Snackbar
        open={openToast}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        TransitionProps={{ timeout: 500, easing: 'ease-in-out' }}
      >
        <Alert onClose={handleCloseToast} severity={toastSeverity}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default BlogDetail;
