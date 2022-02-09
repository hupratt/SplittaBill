import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editBill, getUserBalance } from "../../store/bills";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

const EditBillForm = ({ showModal, bill }) => {
	const dispatch = useDispatch();

	const sessionUser = useSelector(state => state.session.user)
	const allFriendsObject = useSelector(state => state.friends.byId);
	const allFriends = Object.values(allFriendsObject);

	const expenses = bill.expenses;
	const payers = []
	expenses.forEach(expense => {
		if (expense.payer_name !== sessionUser.username) {
			payers.push(expense.payer_name)
		}
	})

	const [errors, setErrors] = useState([]);
	const [total_amount, setTotal_Amount] = useState(bill.total_amount);
	const [description, setDescription] = useState(bill.description);
	const [deadline, setDeadline] = useState(bill.deadline)
	const [friends, setFriends] = useState(payers)

	const notify = () => {
		toast.success(`Bill successfully edited!`,
			{
				position: toast.POSITION.TOP_CENTER,
				autoClose: 2000
			})
	}


	const handleSubmit = async (e) => {
		e.preventDefault();
		const friendsString = friends.join(", ")
		console.log(friendsString)
		const data = await dispatch(editBill(bill.id, sessionUser.id, total_amount, description, deadline, friendsString))
		dispatch(getUserBalance(sessionUser.id));

		if (data) {
			setErrors(data);
			console.log("ERRORS!!", errors)
			return
		}

		notify();

		showModal(false);
	};

	useEffect(() => {
		const errors = [];
		if (description.length > 36) errors.push("Description must be less than 36 characters.")
		if (total_amount < 0) errors.push("Provide a positive value for the total amount.")

		setErrors(errors);
	}, [description, total_amount])

	const updateTotal = (e) => {
		setTotal_Amount(e.target.value);
	};

	const updateDescription = (e) => {
		setDescription(e.target.value);
	};

	const updateDeadline = (e) => {
		setDeadline(e.target.value);
	};

	const updateFriends = (e) => {
		if (!friends.includes(e.target.value)) friends.push(e.target.value)
		else if (friends.includes(e.target.value)) friends.splice(friends.indexOf(e.target.value), 1)
        setFriends(friends)
    }


	return (
		<form className='form-container bill-form' onSubmit={handleSubmit}>
			<div className='errors-container'>
				{errors.map((error, ind) => (
					<div className='error-msg' key={ind}>{error}</div>
				))}
			</div>
			<div className='form-input-container'>

				<div className='form-element'>
					<label className='form-label' htmlFor="total_amount">Amount</label>
					<input
						className='form-input'
						name="total_amount"
						type="number"
						step="0.01"
						placeholder="0"
						value={total_amount}
						onChange={updateTotal}
					/>
				</div>
				<div className='form-element'>
					<label className='form-label' htmlFor="description">Description</label>
					<input
						name="description"
						type="text"
						placeholder="Bill Description"
						value={description}
						onChange={updateDescription}
					/>
				</div>
				<div className='form-element'>
					<label className='form-label' htmlFor="deadline">Deadline</label>
					<input
						name="deadline"
						type="date"
						value={deadline}
						onChange={updateDeadline}
					/>
				</div>
			</div>
            <div className='form-element form-friends-list'>
				<div className='form-label'>
					Split with:
				</div>
				{allFriends.map(friend => {
					return (
						<div className='friends-checkboxes' key={friend.id}>
							<input type="checkbox"
									id="friendSelect"
									name="friend"
									value={friend.friend_name}
									defaultChecked={payers.includes(friend.friend_name)}
									onChange={updateFriends}
									 />
							<label className='form-label' htmlFor="friendSelect">
								{friend.friend_name}
							</label>
						</div>
					)
				})}
				<div className='form-element'>
					<button
					disabled={errors.length > 0}
					className='form-submit-btn'
					type="submit">Edit Bill</button>
				</div>
			</div>
		</form>
	);
};

export default EditBillForm;
