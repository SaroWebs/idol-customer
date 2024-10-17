const token = 'your_bearer_token_here'; // Replace with your actual token

axios.get('your_api_endpoint_here', {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
.then(response => {
    console.log(response.data);
})
.catch(error => {
    console.error('Error:', error);
});