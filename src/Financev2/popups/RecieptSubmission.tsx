import './RecieptSubmission.css';
import { setPopup } from './PopupManager';
import { User, BudgetItem } from '../finance/datatypes';
import { useState } from 'react';
import { postApproval } from '../finance/finance_interface';
import { postFiles } from '../finance/finance_interface'; // Ensure this is correctly imported
const image = require('../../Images/webb-in-space.jpg');

interface ReceiptSubmissionProps {
    user: User;
    item: BudgetItem;
    id: number;
    updateActionItems: () => void;
    update: () => void;
}

const ReceiptSubmission: React.FC<ReceiptSubmissionProps> = ({ user, item, id, updateActionItems, update }) => {
    const [cost, setCost] = useState<string>(String(item.request.cost));
    const [tax, setTax] = useState<string>('0');
    const [fileList, setFileList] = useState<File[]>([]); // Store files as an array

    const updateCost = (event:React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (Number(value) <= Number(item.request.cost)) {
            setCost(value);
        }
    }


    const handleFileChange = (files: FileList) => {
        const maxSize = 1 * 1024 * 1024; // 1 MB
        const validFiles: File[] = [];

        Array.from(files).forEach(file => {
            if (file.size <= maxSize) {
                validFiles.push(file);
            } else {
                alert(`File "${file.name}" exceeds size limit of 1 MB.`);
            }
        });

        if (validFiles.length > 0) {
            setFileList(prevFiles => [...prevFiles, ...validFiles]);
        }
    };

    const removeFile = (index: number) => {
        const newFiles = fileList.filter((_, i) => i !== index);
        setFileList(newFiles);
    };

    const submit = () => {
        postFiles(Number(cost), Number(tax), id, user.id, fileList); // Ensure postFiles accepts File[]
    };

    return (
        <>
            <div className = 'header'> <h1>Submit Reciept</h1> </div>
            <div className = 'panels'>
                <div className = 'sidePanel'>
                    <img src={image}></img>
                </div>
                <div className = 'sidePanel recieptPanel'>
                    <h1>-- Request Details --</h1>
                    <h2>At <u>{item.request.date}</u> you requested:</h2>
                    <h2>Description: <u>{item.request.description}</u></h2>
                    <h2>Account / Index: <u>{item.request.index}</u> / <u>{item.request.account}</u></h2>
                    <h2>Cost: <u>${item.request.cost}</u></h2>
                    <h2>Link: <a href={item.request.link} target="_blank" rel="noopener noreferrer">{item.request.link}</a></h2>
            
                    <h1><br />-- Reciept Submission --</h1>
                    <div className = 'line' >
                        <h2>Final Cost (No Tax):</h2>
                        <input value={cost} onChange={updateCost} className="input" type="number" step="0.01"/>
                    </div>
                        
                    <div className="line">
                        <h2>Tax:</h2>
                        <input value={tax} onChange={(e) => setTax(e.target.value)} className="input" type="number" step="0.01" />
                    </div>

                    <div className="line fileSelect">
                        {fileList.length < 7 && ( <>
                            <h2 className="customFileUpload"> Add Reciept:</h2>
                            <input type="file" id="fileUpload" onChange={(e) => handleFileChange(e.target.files!)} accept=".gif, .png, .pdf, .jpg" multiple />
                            </> )}
                    </div>
                    
                    <div className='fileLayout'>
                        {fileList.map((file, index) => (
                            <ul key={index}>
                                <div className='line fileSelect'>
                                    <h3>{file.name}</h3>
                                    <button onClick={() => removeFile(index)}>Remove</button>
                                </div>
                                
                            </ul>
                        ))}
                    </div>
                    
                    <br />
                </div>
            </div>
            <div className = 'buttonPanel'>
                <button onClick={() => {updateActionItems(); setPopup('')}}>Cancel</button>
                <button onClick={() =>{submit()}}>Submit</button>
            </div>
        </>
    );
};

export default ReceiptSubmission;
