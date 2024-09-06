import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { login as apiLogin } from '../../api/auth';
import { useNavigate } from 'react-router-dom'; 
import './LoginPage.css'

const LoginPage: React.FC = () => {
    const navigate = useNavigate(); 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await apiLogin(username, password);
            navigate('/home'); 
        } catch (e) {
            setError('Ошибка авторизации. Проверьте данные и попробуйте снова.');
        }
    };

    return (
        <div className='wrapper'>
            <Box component="form" onSubmit={handleSubmit}>
                <Typography variant="h4">Авторизация</Typography>
                {error && <Typography color="error">{error}</Typography>}
                <div className='flex-column'>
                    <TextField label="Имя пользователя" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <TextField type="password" label="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button type="submit" variant="contained">Войти</Button>
                </div>
            </Box>
        </div>
    );
};

export default LoginPage;