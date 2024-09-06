import React, { useEffect, useState } from 'react';
import './Home.css'
import { getData, createRecord } from '../../api/data';
import TableComponent from '../../components/TableComponent/TableComponent';
import { Record } from './Record.interface';
import Loader from '../../components/Loader/Loader';
import PopUp from '../../components/PopUp/PopUp';
import { Button } from '@mui/material';
import AddButton from '../../ui/icons/AddIcon/AddIcon';
import LogOutButton from '../../ui/icons/LogOutIcon/LogOutIcon';
import { logout as apiLogOut} from '../../api/auth';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const [data, setData] = useState<Record[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [flag, setFlag] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (typeof token === 'string') {
                try {
                    const result = await getData(token);
                    setData(result);
                } catch (e) {
                    setError('Ошибка при загрузке данных');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, []); 

    const logout = ()=>{
        apiLogOut();
        navigate('/login');
    }

    if (loading) return <Loader/>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>
                Данные
                <Button variant="text" onClick={() => logout()}>
                    <LogOutButton/>
                </Button>
            </h2>
            

            <TableComponent data={data} />

            <div className='div-btn'>
                <Button variant="contained" onClick={() => setFlag(!flag)}>
                    <AddButton/>
                </Button>
            </div>

            {flag && <PopUp create={() => true} onClose={() => setFlag(false)}/>}
        </div>
    );
};

export default Home;