import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import EditCommentForm from "./EditCommentForm";

function EditCommentFormModal({ comment }) {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<button id="edit-comment" onClick={() => setShowModal(true)}>
				Edit
			</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<EditCommentForm
						showModal={setShowModal}
						comment={comment}
					/>
				</Modal>
			)}
		</>
	);
}

export default EditCommentFormModal;
