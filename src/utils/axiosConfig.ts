import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://18.118.26.128:5000/', // URL base de tu API
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const { status, data } = error.response;

            if (status === 401) {
                // Manejo de errores de autenticación
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                alert('Sesión expirada. Por favor, inicia sesión nuevamente.');
                window.location.href = '/';
            } else {
                // Mostrar mensaje de error de la respuesta si existe
                const errorMessage = data?.message || 'Ocurrió un error. Por favor, intenta de nuevo.';
                alert(`Error ${status}: ${errorMessage}`);
            }
        } else if (error.request) {
            // Error en la solicitud pero sin respuesta del servidor
            alert('No se pudo conectar con el servidor. Por favor, verifica tu conexión.');
        } else {
            // Error al configurar la solicitud
            alert(`Error: ${error.message}`);
        }

        return Promise.reject(error);
    }
);



export default axiosInstance;
