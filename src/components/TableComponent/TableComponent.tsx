import React, { useState } from 'react';
import './TableComponent.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Record } from '../../pages/Home/Record.interface';
import { Button } from '@mui/material';
import UpdateButton from '../../ui/icons/UpdateIcon/UpdateIcon';
import DeleteButton from '../../ui/icons/DeleteIcon/DeleteIcon';
import { deleteRecord } from '../../api/data';
import { useNavigate } from 'react-router-dom';
import PopUp from '../PopUp/PopUp';

interface TableComponentProps {
    data: Record[];
}

const TableComponent: React.FC<TableComponentProps> = ({ data }) => {
    const navigate = useNavigate();
    const [selectedId, setSelectedId] = useState<string | null>(null);
    
    const del = async (id:string) => {
        const token = localStorage.getItem('token');
        if (typeof token === 'string') {
            try {
                await deleteRecord(token, id);
                navigate('/'); 
            } catch(e){
                console.log(e)
            }
        }
    };


    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>companySigDate</TableCell>
                        <TableCell>companySignatureName</TableCell>
                        <TableCell>documentName</TableCell>
                        <TableCell>documentStatus</TableCell>
                        <TableCell>documentType</TableCell>
                        <TableCell>employeeNumber</TableCell>
                        <TableCell>employeeSigDate</TableCell>
                        <TableCell>employeeSignatureName</TableCell>
                        <TableCell>buttons</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.length === 0 ? (<TableRow><TableCell>Записей нет</TableCell></TableRow>) : ""}
                    {data.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{row.companySigDate}</TableCell>
                            <TableCell>{row.companySignatureName}</TableCell>
                            <TableCell>{row.documentName}</TableCell>
                            <TableCell>{row.documentStatus}</TableCell>
                            <TableCell>{row.documentType}</TableCell>
                            <TableCell>{row.employeeNumber}</TableCell>
                            <TableCell>{row.employeeSigDate}</TableCell>
                            <TableCell>{row.employeeSignatureName}</TableCell>
                            <TableCell>
                                <Button variant="contained" onClick={() => setSelectedId(row.id as string)}>
                                    <UpdateButton/>
                                </Button>
                                <Button variant="contained" onClick={row.id ? () => del(row.id as string) : undefined}>
                                    <DeleteButton/>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {selectedId && (
                <PopUp 
                    create={() => false} 
                    id={selectedId}
                    onClose={()=>setSelectedId(null)}
                />
            )}
        </TableContainer>
        
    );
};

export default TableComponent;