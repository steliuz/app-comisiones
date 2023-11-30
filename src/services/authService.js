import { api } from 'boot/axios';
import { handleMessages } from './notifys';

export const login = async (value) => {
    const user = value;
    try {
        const { data } = await api.post('login', user);
        localStorage.setItem('access_token', data.access_token);
        handleMessages({
            message: `<b>Bienvenido</b> ${data.user_data.name}`,
            color: 'positive',
            icon: 'mood',
        });

        return data;
    } catch (error) {
        localStorage.removeItem('access_token');
        let msg = 'Oops :( , Los datos no son correctos';
        if (error.status == 402)
            msg = 'Usuario Inactivo, por favor comuniquese con el administrador';
        handleMessages({
            message: msg,
            color: 'negative',
            icon: 'cancel',
        });
        throw error;
    }
};

export const logout = async () => {
    try {
        await api.post('signout');
        localStorage.removeItem('access_token');
        handleMessages({
            message: 'Esperamos regreses pronto',
            color: 'positive',
            icon: 'check',
        });
    } catch (error) {
        handleMessages({
            message: 'Oops, Algo a fallado intenta de nuevo',
            color: 'negative',
            icon: 'sentiment_dissatisfied',
        });
        throw error;
    }
};