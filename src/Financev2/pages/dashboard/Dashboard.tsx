import {User, BudgetItem} from '../../finance/datatypes'
import AboutMePanel from './components/AboutMePanel';
import MyItemsPanel from './components/MyItemsPanel';
import BudgetItemsPanel from './components/BudgetItemsPanel';
import './Dashboard.css';

//This is the class that holds the SEDS dashboard
const Dashboard = ({ user, budgetItems}: { user: User, budgetItems: {[key: number]: BudgetItem}}) => {
    const SpendingLogo = require('../../../Images/moonLanding.jpg')

    return (
        <div className="dashboard">
            <AboutMePanel user={user}></AboutMePanel>
            <MyItemsPanel user={user} budgetItems={budgetItems}></MyItemsPanel>
            <BudgetItemsPanel budgetItems={budgetItems} />
            <div className="panel">
                <h1>Spending</h1>
                <img src={SpendingLogo} className='panelLogo'></img>
            </div>
        </div>
    );
}

export default Dashboard;
