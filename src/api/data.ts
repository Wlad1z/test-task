import axios from 'axios';
import { Record } from '../pages/Home/Record.interface';

const API_HOST = 'https://test.v5.pryaniky.com';

export const getData = async (token: string): Promise<Record[]> => {
    try {
        const response = await axios.get(`${API_HOST}/ru/data/v3/testmethods/docs/userdocs/get`, {
        headers: {
            'x-auth': token,
        },
        });
        console.log(response.data.data)
        return response.data.data;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        throw error;
    }
};

export const createRecord = async (token: string, newRecord: Record): Promise<Record> => {
    try {
        const response = await axios.post(
        `${API_HOST}/ru/data/v3/testmethods/docs/userdocs/create`,
        newRecord,
        {
            headers: {
            'x-auth': token,
            },
        }
        );
        return response.data;
    } catch (error) {
        console.error('Ошибка при создании записи:', error);
        throw error;
    }
};

export const updateRecord = async (token: string, id: string, updatedRecord: Record): Promise<Record> => {
    try {
        const response = await axios.post(
        `${API_HOST}/ru/data/v3/testmethods/docs/userdocs/set/${id}`,
        updatedRecord,
        {
            headers: {
            'x-auth': token,
            },
        }
        );
        if (response.data.error_code === 0) {
            return response.data.data;
        } else {
            throw new Error('Ошибка обновления записи');
        }
    } catch (error) {
        console.error('Ошибка при обновлении записи:', error);
        throw error;
  }
};

export const deleteRecord = async (token: string, id: string): Promise<void> => {
    try {
        const response = await axios.post(
        `${API_HOST}/ru/data/v3/testmethods/docs/userdocs/delete/${id}`,
        {},
        {
            headers: {
            'x-auth': token,
            },
        }
        );
        if (response.data.error_code !== 0) {
            throw new Error('Ошибка при удалении записи');
        }
    } catch (error) {
        console.error('Ошибка при удалении записи:', error);
        throw error;
    }
};