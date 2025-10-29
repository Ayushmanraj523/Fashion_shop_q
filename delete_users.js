const axios = require('axios');

async function deleteAllUsers() {
    try {
        const response = await axios.post('http://localhost:8084/api/auth/clear-users');
        console.log('✅ Success:', response.data);
    } catch (error) {
        console.log('❌ Error:', error.message);
    }
}

deleteAllUsers();