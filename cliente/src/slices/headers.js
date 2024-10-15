function getToken() {
    const storedData = JSON.parse(localStorage.getItem('dataLogin'));
    return storedData ? storedData.token : null;
}

console.log("token desde slicePaciente",getToken())


const getHeaders = () => ({
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`,
    }
});

export default getHeaders;