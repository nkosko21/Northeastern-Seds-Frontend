import './ReviewSubmission.css'
import { setPopup } from './PopupManager';
import { User, BudgetItem } from '../finance/datatypes';
import { useState } from 'react';
import { postApproval } from '../finance/finance_interface';
/*
postApproval({
    'approved': approved,
    'request': req_list[curr_req],
    'id': curr_req,
    'user': user,
    'note': note
})
*/
const ReviewSubmission = ({user, item, id, updateActionItems, update}:{user:User, item: BudgetItem, id: number, updateActionItems:() => void, update:()=>void}) => {
    const image = require('../../Images/webb-launch.jpg');
    const [note, setNote] = useState<string>('');
    const [approved, setApproved] = useState<boolean>(true);

    const approve = (approved:boolean) => {
        postApproval(id, {
            'approved': approved? 'true' : 'false',
            'user': user.name,
            'level': item.status == 'Pending Approval'? '' : 'admin',
            'note': note
        }).then(() => {update(); setPopup('')});
    }

    return (
    <>
        <div className = 'header'> <h1>Review Request</h1> </div>
        <div className = 'panels'>
            <div className = 'sidePanel'>
                <img src={image}></img>
            </div>
            <div className='sidePanel reviewSub'>
                    <h1>-- Request Details --</h1>
                    <h2>Account / Index: <u>{item.request.index}</u> / <u>{item.request.account}</u></h2>
                    <h2>Description: <u>{item.request.description}</u></h2>
                    <h2>Cost: <u>${item.request.cost}</u></h2>
                    <h2>Requestee: <u>{item.request.requestee}</u></h2> 
                    <h2> Date: <u>{item.request.date}</u></h2>
                    <h2>Project / Subteam: <u>{item.request.project}</u> / <u>{item.request.subteam}</u></h2>
                    <h1><br />-- Request Approval --</h1>
                    <div className='line'>
                        <h2>Action: </h2>
                        <select value={approved? "Approve" : "Deny"} onChange={(e) => setApproved(e.target.value === 'Approve')}>
                            <option>Approve</option>
                            <option>Deny</option>
                        </select>
                    </div>
                    {approved?null:
                        <div className='line'>
                            <h2>Reason:</h2>
                            <input value={note} onChange={(e) => setNote(e.target.value)}></input>
                        </div>
                    }
                   

                </div>
        </div>
        <div className = 'buttonPanel'>
            <button onClick={() => {updateActionItems(); setPopup('')}}>Cancel</button>
            <button onClick={() => approve(approved)}>{approved?"Approve":"Deny"}</button>
        </div>
    </>)}

export default ReviewSubmission;

