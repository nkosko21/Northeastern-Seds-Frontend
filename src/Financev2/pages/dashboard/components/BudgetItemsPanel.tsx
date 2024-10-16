import {User, BudgetItem} from '../../../finance/datatypes'
import './BudgetItemsPanel.css'
const ItemsLogo = require('../../../../Images/milkyway.jpg');
const rover = require('../../../../Images/roverlogo.png')

const BudgetItemsPanel = ({ budgetItems}: { budgetItems: {[key: number]: BudgetItem}}) => {
    return (<div className="panel">
        <h1>Budget Items</h1>
        <img src={ItemsLogo} className='panelLogo'></img>
        <div className="budgetItems">
        {Object.entries(budgetItems).reverse().map(([key, value])=>(
                <div key={key} className="budgetItem">
                    <div className='title'> 
                        <img src={rover} />
                        <h3>{value.request.description}</h3>
                    </div>
                    <div className='textContent'>
                        <p>{value.request.requestee} on {value.request.date.split(' ')[0]}<br />
                        {value.request.subteam} requests ${value.request.cost} <br />({value.status})
                        </p>
                    </div>
                </div>
            ))}
        </div>
    </div>);
}

export default BudgetItemsPanel;
