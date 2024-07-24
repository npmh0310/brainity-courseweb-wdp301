import { CgProfile } from "react-icons/cg";
import parse from "html-react-parser";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import { Snackbar, Alert } from "@mui/material";
import toast from "react-hot-toast";
import { getIsLogin } from "../../../redux/features/authSlice";
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
  const isLogin = useSelector(getIsLogin);
  const navigate = useNavigate();
  const toggleDropdown = (dropdownId) => {
    setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
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
    window.scrollTo(0, 0);
    fetchData(id);
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
    if (isLogin) {
      if (!commentText.trim()) {
        toast.error("Write something to comment!");
        return;
      }
      try {
        const newComment = { content: commentText, user: user }; // Thay đổi tùy thuộc vào cấu trúc comment
        const res = await createComment(id, newComment);
        if (res.status === 201) {
          console.log(newComment);
          // Fetch lại bình luận sau khi thêm mới thành công
          fetchComments(id);
          toast.success("Comment added successfully!");
          setCommentText("");
        }
      } catch (error) {
        console.error("Error posting comment:", error);
        toast.error("Fail to post comment");
      }
    } else {
      navigate("/signin");
    }
  };

  const handleSaveEdit = async () => {
    try {
      const updatedComment = { content: commentText };
      const res = await updateComment(id, commentId, updatedComment);
      if (res.status === 200) {
        // Fetch lại bình luận sau khi cập nhật thành công
        fetchComments(id);
        setIsEditing(false);
        setCommentText("");
        toast.success("Comment updated successfully!");
        setCommentId(null); // Clear the commentId after editing
      }
    } catch (error) {
      toast.error("Fail to post comment");
      console.error("Error updating comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await deleteComment(id, commentId);
      if (res.status === 200) {
        // Fetch lại bình luận sau khi xóa thành công
        fetchComments(id);
        setOpenDropdown(null);
        toast.success("Successfully deleted a comment");
        setCommentId(null); // Clear the commentId after deleting
      }
    } catch (error) {
      toast.error("Failed to delete a comment");
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
                      {parse(blog.content)}
                    </h3> */}
                  </div>
                </div>

                <div className="flex gap-3 items-center border-b-2 pb-4 lg:pb-8 pt-4 lg:pt-8">
                  <div className="flex gap-2 items-center">
                    <Eye size="16px" />
                    <span>{blog.views}</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <MessageCircleMore size="16px" />
                    <span>{comments.length}</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Heart size="16px" />
                    <span>{blog.likes}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            <h2 className="font-bold text-lg lg:text-2xl pt-4 lg:pt-8 pb-4 lg:pb-8">
              Comments
            </h2>
            <div className="pb-4 lg:pb-8 border-b-2">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment._id} className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={comment.user.avatar}
                          className=" w-8 h-8 object-cover rounded-full"
                          alt=""
                        />
                        <div className="flex flex-col">
                          <span className="font-semibold text-sm">
                            {comment.user.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatDate2(comment.createdAt)}
                          </span>
                        </div>
                      </div>
                      {user && user._id === comment.user._id && (
                        <div className="relative">
                          <button
                            className="text-gray-500 hover:text-gray-700"
                            onClick={() => toggleDropdown(comment._id)}
                          >
                            &#8226;&#8226;&#8226;
                          </button>
                          {openDropdown === comment._id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-50">
                              <ul className="py-1">
                                <li>
                                  <button
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    onClick={() => {
                                      setCommentText(comment.content);
                                      setCommentId(comment._id); // Set the commentId for editing
                                      handleEditClick();
                                    }}
                                  >
                                    Edit
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    onClick={() =>
                                      handleDeleteComment(comment._id)
                                    }
                                  >
                                    Delete
                                  </button>
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="ml-11">
                      {isEditing && commentId === comment._id ? (
                        <textarea
                          ref={textareaRef}
                          value={commentText}
                          onChange={handleInputChange}
                          onKeyPress={handleInputKeyPress}
                          className="w-full border border-gray-300 rounded p-2"
                          rows="4"
                        />
                      ) : (
                        <p className="text-sm">{comment.content}</p>
                      )}
                      {isEditing && commentId === comment._id && (
                        <div className="mt-2 flex gap-2">
                          <button
                            onClick={handleSaveEdit}
                            className="bg-primary text-white px-4 py-1 rounded"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="bg-gray-300 px-4 py-1 rounded"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm">No comments yet.</p>
              )}
            </div>

            <form onSubmit={handleSubmit} className="mt-4">
              <textarea
                value={commentText}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded p-2"
                rows="4"
                placeholder="Add your comment..."
              ></textarea>
              <button
                type="submit"
                className="bg-primary text-white px-4 py-1 mb-4 rounded mt-2"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* Toast Notification */}
      <Snackbar
        open={openToast}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionProps={{ timeout: 500, easing: "ease-in-out" }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toastSeverity}
          sx={{ width: "100%" }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default BlogDetail;
