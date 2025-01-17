import { useState } from "react";
export default function Review({
  review_id,
  username,
  comment,
  score,
  anime_name,
}) {
  const [deleted, setDeleted] = useState(false);
  async function handleDelete() {
    try {
      const response = await fetch(
        `https://week-7-project-server.onrender.com/deleteformdata/${review_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        console.log("Deleted");
        setDeleted(!deleted);
      } else {
        console.error("failed to delete", data.error);
      }
    } catch (error) {
      console.error("Delete error", error);
    }
  }
  if (deleted) {
    return null;
  }
  return (
    <>
      <div id="review-box" key={review_id}>
        <h4 id="review-username">User: {username}</h4>{" "}
        <h4 id="review-aname">{anime_name}</h4>{" "}
        <h4 id="review-score">Score: {score}/5</h4>{" "}
        <p id="review-comment">Review: {comment}</p>
        <button id="delbut" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </>
  );
}
