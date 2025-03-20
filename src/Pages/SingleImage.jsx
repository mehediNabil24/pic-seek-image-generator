import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import PageTitle from "../Components/PageTtile";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";

const SingleImage = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [image, setImage] = useState({});
  const [comments, setComments] = useState([]);

  // Fetch Single Image Data
  useEffect(() => {
    fetch(`https://pic-seek-server-theta.vercel.app/api/v1/image/single/${id}`)
      .then((res) => res.json())
      .then((data) => setImage(data))
      .catch((err) => console.error("Error fetching image:", err));
  }, [id]);

  // Fetch Comments Related to the Image
  useEffect(() => {
    fetch(`https://pic-seek-server-theta.vercel.app/api/v1/comment/find/${id}`)
      .then((res) => res.json())
      .then((datas) => setComments(datas))
      .catch((err) => console.error("Error fetching comments:", err));
  }, [id, comments.length]); // ✅ Ensures updates when a new comment is added

  // Handle Comment Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const comment = form.comment.value;

    console.log(user.email, id, image.prompt,comment)

    try {
      const res = await axios.post("https://pic-seek-server-theta.vercel.app/api/v1/comment/create", {
        email: user?.email,
        prompt: image.prompt,
        imageId: id,
        comment,

       
      }
     
    );
     

      // ✅ Update comments state immediately after successful submission
      setComments((prevComments) => [...prevComments, res.data]);

      form.reset(); // ✅ Clear input field after submission
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <div>
      <PageTitle>{image?.prompt}</PageTitle>

      <div className="w-11/12 mx-auto">
        <figure className="my-5 p-1 flex justify-center">
          {image?.original_img ? (
            <img src={image.original_img} alt="Generated" className="rounded-md" />
          ) : (
            <p>Loading image...</p>
          )}
        </figure>
      </div>

      {/* Comment Input Field */}
      <form onSubmit={handleSubmit} className="flex gap-2 mt-4 w-11/12 mx-auto">
        <input 
          type="text" 
          name="comment" 
          placeholder="Your Comment" 
          className="input input-bordered w-full" 
          required 
        />
        <button className="btn btn-primary">Send</button>
      </form>

      {/* Comments Section */}
      <div className="w-11/12 mx-auto">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment._id} className="mt-4">
            {/* User's Comment */}
            <div className="chat chat-start">
              <div className="chat-bubble chat-bubble-primary">{comment.comment}</div>
            </div>

            {/* Reply from AI or Admin */}
            {comment.reply && (
              <div className="chat chat-end">
                <div className="chat-bubble chat-bubble-error">{comment.reply}</div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500 mt-4">No comments yet. Be the first to comment!</p>
      )}
      </div>
    </div>
  );
};

export default SingleImage;
