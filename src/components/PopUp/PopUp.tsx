import React, { useState } from 'react'
import { createRecord, updateRecord } from '../../api/data';
import './PopUp.css';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface PopUpProps {
    create: () => boolean; 
    id?: string;
    onClose: () => void;
}

const PopUp: React.FC<PopUpProps> = ({create, id, onClose}) => { 
    const navigate = useNavigate(); 
    const [companySignatureName, setСompanySignatureName] = useState('');
    const [documentName, setDocumentName] = useState('');
    const [documentStatus, setDocumentStatus] = useState('');
    const [documentType, setDocumentType] = useState('');
    const [employeeNumber, setEmployeeNumber] = useState('');
    const [employeeSignatureName, setEmployeeSignatureName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const token = localStorage.getItem('token');

    const handleSubmit = async (event: React.FormEvent) => {
        
        const companySigDate = new Date().toISOString();
        const employeeSigDate = new Date().toISOString();
        event.preventDefault();
        if (create()){
            try {
                if (typeof(token)== "string"){
                    await createRecord(token, {companySigDate, companySignatureName ,documentName, documentStatus, documentType, employeeNumber, employeeSigDate, employeeSignatureName})
                }
                navigate('/'); 
            } catch (e) {
                setError('Ошибка при создании записи. Проверьте данные и попробуйте снова.');
            }
        } else{
            console.log(id)
            try {
                if (typeof(token) == "string" && typeof(id)== "string"){
                    await updateRecord(token, id, {companySigDate, companySignatureName ,documentName, documentStatus, documentType, employeeNumber, employeeSigDate, employeeSignatureName})
                }
                navigate('/'); 
            } catch (e) {
                setError('Ошибка при обновлении записи. Проверьте данные и попробуйте снова.');
            }
        }
        
    };

    return (
        <div className='pop-up'>
            <Box component="form" onSubmit={handleSubmit}>
                <Typography variant="h4">{create() ? 'Добавить запись' : 'Обновить запись'}</Typography>
                {error && <Typography color="error">{error}</Typography>}
                <div className='flex-column'>
                    <TextField label="companySignatureName" value={companySignatureName} onChange={(e) => setСompanySignatureName(e.target.value)} />
                    <TextField label="documentName" value={documentName} onChange={(e) => setDocumentName(e.target.value)} />
                    <TextField label="documentStatus" value={documentStatus} onChange={(e) => setDocumentStatus(e.target.value)} />
                    <TextField label="documentType" value={documentType} onChange={(e) => setDocumentType(e.target.value)} />
                    <TextField label="employeeNumber" value={employeeNumber} onChange={(e) => setEmployeeNumber(e.target.value)} />
                    <TextField label="employeeSignatureName" value={employeeSignatureName} onChange={(e) => setEmployeeSignatureName(e.target.value)} />
                    <div className='btn-div'>   
                        <Button type="submit" variant="contained">{create() ? 'Добавить запись' : 'Обновить запись'}</Button>
                        <Button variant="contained" onClick={()=>onClose()}>Отмена</Button>
                    </div>
                </div>
            </Box>
        </div>
    )
}

export default PopUp