import axios from 'axios'

const API_HOST = 'https://test.v5.pryaniky.com'

export const login = async (username: string,password: string): Promise<string> => {
    const response = await axios.post(
        `${API_HOST}/ru/data/v3/testmethods/docs/login`,{username, password}
    )

    if (response.status === 200) {
        console.log(response)
        localStorage.setItem('token', response.data.data.token); 
        return response.data.data.token;
    }

    throw new Error('Ошибка авторизации');
}

export function logout (){
    localStorage.removeItem('token');
};