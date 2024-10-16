import {User, BudgetItem} from '../../../finance/datatypes'
import { getUserItems } from '../../../finance/finance_interface';
import {setPopup} from '../../../popups/PopupManager'
const MyItemsLogo = require('../../../../Images/satellite.jpeg');
const pending = require('../../../../Images/pending.png')
const alert = require('../../../../Images/alert.png')
const complete = require('../../../../Images/complete.png')


const MyItemsPanel = ({ user, budgetItems}: { user: User, budgetItems: {[key: number]: BudgetItem}}) => {
    return (<div className="panel">
        <h1>My Items</h1>
        <img src={MyItemsLogo} className='panelLogo'></img>
        <div className="myItems">
            {Object.entries(getUserItems(budgetItems, user)).reverse().map(([key, value])=>(
                <div key={key} className="myItem">
                    <img src={value.status === "Approved" ? alert : pending }></img>
                    <div className="textContent">
                        <h3>{value.request.description} (${value.request.cost})</h3><p>{value.status}</p>
                    </div>
                </div>
            ))}
        </div>
        <button onClick={() => {setPopup('new')}}><h2>New Request</h2></button>
    </div>);
}

export default MyItemsPanel;
