import { usePostCommentMutation } from "@/store/storeApi";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

// Recursive Comment Component
const Comment = ({
  comment,
  post,
  name,
  email,
  replyingTo,
  commentContent,
  setCommentContent,
  handleReplyClick,
  leaveComment,
  isLoading,
  nestedReplies,
}) => {
  const hasReplies = nestedReplies[comment.id] && nestedReplies[comment.id].length > 0;

  return (
    <div
      className={`flex flex-col space-y-2 border-b mt-[6vw] md:mt-[4vw] border-gray-300 pb-4 ${
        comment.parent !== "0" && "ml-[2vw]"
      }`}
    >
      <div className="flex space-x-4">
        <img
          src={
            comment?.author_avatar_urls ||
            "https://secure.gravatar.com/avatar/207eb43be17ac89e8ea392e0ce49c599?s=24&d=mm&r=g"
          }
          alt={`${comment?.author_name} avatar`}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold">{comment.author_name || "Anonymous"}</h3>
            <span className="text-sm text-gray-500">
              {new Date(comment.date).toLocaleDateString()}
            </span>
          </div>
          <div className="mt-2" dangerouslySetInnerHTML={{ __html: comment?.content }} />
          <button className="text-[#FF689A] mt-2" onClick={() => handleReplyClick(comment.id)}>
            Reply
          </button>
        </div>
      </div>

      {replyingTo === comment.id && (
        <div className="ml-12 mt-2 border border-gray-300 p-4 rounded-lg bg-gray-50">
          <textarea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            className="w-full border focus:outline-none border-gray-300 p-2 rounded-lg"
            rows="3"
            placeholder="Write your reply..."
          />
          <button
            className="mt-2 bg-[#FF689A] hover:bg-[#FF699A] hover:font-medium text-white px-4 py-2 rounded-lg"
            onClick={() => leaveComment(comment.id)}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Reply"}
          </button>
        </div>
      )}

      {hasReplies &&
        nestedReplies[comment.id].map((reply) => (
          <Comment
            key={reply._id}
            comment={reply}
            post={post}
            name={reply.author_name}
            email={email}
            replyingTo={replyingTo}
            commentContent={commentContent}
            setCommentContent={setCommentContent}
            handleReplyClick={handleReplyClick}
            leaveComment={leaveComment}
            isLoading={isLoading}
            nestedReplies={nestedReplies}
          />
        ))}
    </div>
  );
};

// Main CommentSection Component
const CommentSection = ({ commentData, post }) => {
  const [postComment, { isError, isLoading }] = usePostCommentMutation();
  const [replyingTo, setReplyingTo] = useState(null);
  const [commentContent, setCommentContent] = useState("");
  const [replies, setReplies] = useState({});
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser({ name: storedUser?.fullName, email: storedUser?.email, img: storedUser?.img?.img });
    }
  }, []);

  const handleReplyClick = (commentId) => {
    setReplyingTo(replyingTo === commentId ? null : commentId);
  };

  const leaveComment = async (commentId) => {
    try {
      const response = await postComment({
        post,
        user,
        content: commentContent || "",
        parent: commentId,
      }).unwrap();
      toast.success("Comment posted successfully", {
				style: { marginTop: 40 },
			});
      setCommentContent("");
      setReplyingTo(null);
      setReplies((prevReplies) => ({
        ...prevReplies,
        [commentId]: [...(prevReplies[commentId] || []), response],
      }));
    } catch (err) {
      console.error("Error leaving comment", err);
			toast.error("Failed to leave comment", { style: { marginTop: 40 } });
    }
  };

  const prepareReplies = (comments) => {
    const map = {};
    comments.forEach((comment) => {
      if (comment.parent !== "0") {
        if (!map[comment.parent]) {
          map[comment.parent] = [];
        }
        map[comment.parent].push(comment);
      }
    });
    return map;
  };

  const nestedReplies = prepareReplies(commentData || []);

  return (
    <article className="space-y-6">
      {commentData
        ?.filter((comment) => comment.parent === "0")
        .map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            post={post}
            name={comment.author_name}
            email={user.email}
            replyingTo={replyingTo}
            commentContent={commentContent}
            setCommentContent={setCommentContent}
            handleReplyClick={handleReplyClick}
            leaveComment={leaveComment}
            isLoading={isLoading}
            nestedReplies={nestedReplies}
          />
        ))}
    </article>
  );
};

export default CommentSection;
