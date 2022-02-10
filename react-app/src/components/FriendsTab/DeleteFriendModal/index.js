import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import DeleteFriendForm from './DeleteFriendForm';

function DeleteFriendModal({ id }) {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<button  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowModal(true);}} id="remove-friend"className="remove-friend-btn">
                <i className="fas fa-user-times"></i>
            </button>
			{showModal && (
				<Modal onClose={(e) => { e.stopPropagation(); setShowModal(false);}}>
					<DeleteFriendForm showModal={setShowModal} id={id} />
				</Modal>
			)}
		</>
	);
}

export default DeleteFriendModal;
