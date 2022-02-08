import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TransactionRecordDetail from "../../HistoryTab/TransactionRecordDetail";
import { getTransactionsForFriend } from "../../../store/bills";
import "./FriendDetails.css"

const FriendDetails = ({ showModal, friendId, username, balance, image }) => {
    const dispatch = useDispatch();
    const recordsObj = useSelector(state => state.bills.transaction_records_by_friend);

    const records = Object.values(recordsObj);

	useEffect(() => {
		dispatch(getTransactionsForFriend(friendId))
	}, [dispatch, friendId])

    return (
        <div className="friend-details-container">
            <div className="friend-details-header">
                <div className="profile-pic-div friends-details-profile-pic-div">
                    <img src={image} className="friends-profile-pic" ></img>
                </div>
                <div>
                    <h3>{username}</h3>
                    {balance !== 0 ? <p>Current Balance: {balance}</p> : <p>All settled up!</p>}
                </div>
            </div>

            <div className="friend-transactions-container">
                <h4>Transaction History with {username}</h4>
                {records.length === 0 ? <p>Nothing to see here yet!</p> : null}
                {records?.map(record => {
                    return <TransactionRecordDetail
                        key={record.id}
                        record={record}
                    />
                })}
            </div>


        </div>
    )
}

export default FriendDetails;
