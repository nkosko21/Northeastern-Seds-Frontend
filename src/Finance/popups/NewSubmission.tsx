import './NewSubmission.css'
import { setPopup } from './PopupManager';
import { getOptions } from '../finance/finance_interface';
import { User } from '../finance/datatypes';
import { useState } from 'react';
import { SubmissionOptions, Request, createBlankRequest } from '../finance/datatypes';
import { submitRequest } from '../finance/finance_interface';
import { toast } from 'react-toastify';

const NewSubmission = ({user, update}:{user:User, update:() => void}) => {
    const image = require('../../Images/webb-assembly.jpg');
    const cashOptions = ['Travel Purchase', 'Non-Travel Purchase']

    const [options, setOptions] = useState<SubmissionOptions>({budgetOptions: [''], projectOptions: [''], subteamOptions: [], adminThreashold: -1});
    const [index, setIndex] = useState<string>("Budget Account")
    const [account, setAccount] = useState<string>(options.budgetOptions[0])
    const [description, setDescription] = useState<string>('');
    const [link, setLink] = useState<string>('');
    const [cost, setCost] = useState<string>('0');
    const [project, setProject] = useState<string>(user.project);
    const [subteam, setSubteam] = useState<string>(user.subteam);

    
    if( options.adminThreashold === -1 ){
        getOptions().then((response) => {setOptions(response); setAccount(response.budgetOptions[0])});
    }

    return (
        <>
            <div className = 'header'> <h1>New Request</h1> </div>

            <div className = 'panels'>

                <div className = 'sidePanel'>
                    <img src={image}></img>
                </div>

                <div className = 'sidePanel' >
                    {/*This is all of the account information*/}
                    <div className = 'accountInfo' >
                        <h1>-- Account Information --</h1>
                        <p>Only use Cash Account if Explicitly Required (i.e. Travel).<br />If using Budget Account, do <u>not</u> include tax.</p>
                        
                        {/*This has the index info */}
                        <div className='line indexLine'>
                            <h2>Account:</h2>
                            <select value={index} onChange={(e) => setIndex(e.target.value)}>
                                <option>Budget Account</option>
                                <option>Cash Account</option>
                            </select>
                        </div>

                        <div className='line indexLine'>
                            <h2>Index:</h2>
                            <select value={index} onChange={(e) => setAccount(e.target.value)}>
                                {(index === 'Budget Account'? options.budgetOptions : cashOptions).map((value)=>(
                                    <option>{value}</option>
                                ))}
                            </select>
                        </div>

                        <div className='line indexLine'>
                            <h2>Cost:</h2>
                            <input className='cost' value={cost} onChange={(e) => setCost(e.target.value)}></input>
                        </div>
                    </div>
                    
                    {/* This stores all of the description of the purchase */}
                    <div className = 'accountInfo' >
                        <h1>-- Request Information --</h1>
                        <p></p>
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
                            <h2>Link:</h2>
                            <input value={link} onChange={(e) => setLink(e.target.value)}></input>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className = 'buttonPanel'>
                <button onClick={() => setPopup('')}>Cancel</button>

                <button onClick={() =>  {if( description === '' ){toast.error('Invalid Description')}
                    else if( Number(cost) <= 0 ){
                        toast.error("Invalid Cost")
                    }else if( link === '' ){
                        toast.error("Please Enter Link")
                    }
                    else{
                        submitRequest(
                        {
                            'Requestee': user.name, 'Index': index, 'Account': account,
                            'Description': description, 'Project': project, 'Subteam': subteam, 'Cost': cost, 'Link': link
                        }).then(() => {update(); setPopup('')})}}
                    }>Submit</button>
            </div>
        </>
    )
}

export default NewSubmission;

