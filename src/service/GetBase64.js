const GetBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            resolve(reader.result ? reader.result.split(',')[1] : null);
        };
        reader.onerror = (error) => reject(error);
    });
};

export default GetBase64;