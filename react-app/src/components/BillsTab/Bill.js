import { useState } from "react";
import EditBillFormModal from "./EditBillFormModal";
import DeleteBillModal from "./DeleteBillModal";
import { Modal } from "../../context/Modal";
import BillDetails from "./BillDetailsModal/BillDetails";

const Bill = ({ bill }) => {
	const [showModal, setShowModal] = useState(false);

	const image = bill.owner_image ? bill.owner_image : "https://splitabill.s3.us-east-2.amazonaws.com/f395dfcdb332496bb5700cc328339e5d.png";

	return (
		<>
			<div className='bill-container' onClick={() => setShowModal(true)}>
				<div className='bill-info-container'>
					<div className='bill-left-side'>
						<div className="profile-pic-div bill-pic">
							<img src={image} className="profile-pic" ></img>
						</div>
						<div className='bill-owner-description-container'>
							<div className='bill-owner-name'>
								{bill.owner_name} paid for
							</div>
							<h2 className='bill-description'>
								<span><i className="fas fa-file-invoice-dollar"></i></span>
								{bill.description}
							</h2>
						</div>
					</div>
					<div className='bill-total-amount'>
						${bill.total_amount}
					</div>
					{/* {bill.deadline !== 'None' &&
						<p>
							DEADLINE: {bill.deadline}
						</p>
					} */}

				</div>
				<div className='edit-delete-bill-buttons-container'>
					<div className='edit-bill-button-container'>
						<EditBillFormModal bill={bill} />
					</div>
					<div className='delete-bill-button-container'>
						<DeleteBillModal billId={bill.id} />
					</div>
				</div>
			</div>
			<div>
				{(showModal) && (
					<Modal onClose={() => setShowModal(false)}>
						<BillDetails bill={bill} />
					</Modal>
				)}
			</div>
		</>
	);
};

export default Bill;
