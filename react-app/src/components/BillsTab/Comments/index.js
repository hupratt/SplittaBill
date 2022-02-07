import React, { useEffect } from "react";
import Comment from "./Comment";
import { useSelector, useDispatch } from "react-redux";
import { getComments } from "../../../store/comments";
import AddCommentForm from "./AddCommentForm";
const Comments = ({ billId }) => {
	const dispatch = useDispatch();
	const commentsObj = useSelector((state) => state.comments.comments[billId]);
	useEffect(() => {
		dispatch(getComments(billId));
	}, [
		dispatch,
		billId /*--------------------------------------------------------------------*/,
	]);

	let comments;
	if (commentsObj) {
		comments = Object.values(commentsObj);
	} else {
		return <AddCommentForm billId={billId} />;
	}

	return (
		<div>
			<h3>COMMENTS</h3>
			{comments.length > 0 &&
				comments.map((comment) => {
					return (
						<div key={comment.id} className="comment-wrapper">
							<Comment comment={comment} />
						</div>
					);
				})}
			<AddCommentForm billId={billId} />
		</div>
	);
};

export default Comments;
