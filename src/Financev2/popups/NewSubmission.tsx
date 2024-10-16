import './NewSubmission.css'
import { setPopup } from './PopupManager';
import { getOptions } from '../finance/finance_interface';
import { User } from '../finance/datatypes';
import { useState } from 'react';
import { SubmissionOptions, Request, createBlankRequest } from '../finance/datatypes';
import { submitRequest } from '../finance/finance_interface';

const NewSubmission = ({user, update}:{user:User, update:() => void}) => {
    const image = require('../../Images/webb-assembly.jpg');
    const cashOptions = ['Travel Purchase', 'Non-Travel Purchase']

    const [options, setOptions] = useState<SubmissionOptions>({budgetOptions: [''], projectOptions: [''], subteamOptions: [], adminThreashold: -1});
    const [request, setRequest] = useState<Request>(createBlankRequest());
    
    if( options.adminThreashold === -1 ){
        getOptions().then((response) => setOptions(response)).then(() => update());
    }
   
    const [account, setAccount] = useState<string>("Budget Account")
    const [index, setIndex] = useState<string>(options.budgetOptions[0])
    const [description, setDescription] = useState<string>('');
    const [link, setLink] = useState<string>('');
    const [cost, setCost] = useState<string>('0');
    const [project, setProject] = useState<string>(user.project);
    const [subteam, setSubteam] = useState<string>(user.subteam);


    return (
    <div className="popupMain">
        <div className="newSubmission">
            <h1>New Request</h1>
            <div style={{display: 'flex', flexDirection: 'row', height: '100%'}}>
                <div className='half'>
                    <img src={image}></img>
                    <button onClick={() => setPopup('')}>Cancel</button>
                </div>
                <div className='half'>
                    <div className='line'>
                        <h2>Account:</h2>
                        <select value={account} onChange={(e) => setAccount(e.target.value)}>
                            <option>Budget Account</option>
                            <option>Cash Account</option>
                        </select>
                    </div>
                    <p>Note: Only use Cash Account if Explicitly Required (i.e. Travel)</p>
                    <div className='line'>
                        <h2>Index:</h2>
                        <select value={index} onChange={(e) => setIndex(e.target.value)}>
                            {(account === 'Budget Account'? options.budgetOptions : cashOptions).map((value)=>(
                                <option>{value}</option>
                            ))}
                        </select>
                    </div>
                    <div className='line'>
                        <h2>Description:</h2>
                        <input value={description} onChange={(e) => setDescription(e.target.value)}></input>
                    </div>
                    <div className='line'>
                        <h2>Project / Subteam:</h2>
                            <select value={project} onChange={(e) => setProject(e.target.value)}>
                                {options.projectOptions.map((value)=>(
                                    <option>{value}</option>
                                ))}
                            </select>
                            <select value={subteam} onChange={(e) => setSubteam(e.target.value)}>
                                {options.subteamOptions.map((value)=>(
                                    (value.includes(project))?
                                        <option>{value.substring(value.indexOf(' '))}</option>
                                    : <></>
                                ))}
                            </select>
                    </div>
                    <div className='line'>
                        <h2>Cost:</h2>
                        <input className='cost' value={cost} onChange={(e) => setCost(e.target.value)}></input>
                    </div>
                    <p>Note: Do Not Include Tax</p>
                    <div className='line'>
                        <h2>Link:</h2>
                        <input value={link} onChange={(e) => setLink(e.target.value)}></input>
                    </div>
                    <button onClick={() => submitRequest(
                        {
                            'Requestee': user.name, 'Index': index, 'Account': account,
                            'Description': description, 'Project': project, 'Subteam': subteam, 'Cost': cost, 'Link': link
                        })}>Submit</button>
                </div>
            </div>
            
        </div>
    </div>
    )
}

export default NewSubmission;
