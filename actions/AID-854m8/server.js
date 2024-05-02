async function(properties, context) {
 
    const { upload_url, file_data, file_input, file_name, token, private, attach_to } = properties;
    
    const dataHeader = 'data:application/pdf;base64,';
    
    if (private) {
        if (!attach_to || typeof attach_to.get !== 'function') throw new Error('If you want a private file, please insert a valid user');
    } 
    
    const file = {
        filename: file_name.endsWith('.pdf') ? file_name : file_name + '.pdf',
        contents: file_data.startsWith(dataHeader) ? file_data.split(',')[1] : file_data,
        private: private,
        attach_to: private ? await attach_to.get('_id') : null, // Updated to use await for .get()
    };
    
    const uri = upload_url.startsWith('http') ? upload_url : 'https:' + upload_url;
    const method = 'POST';
    const body = { [file_input]: file };
    const json = true;
    
    const options = { uri, method, body, json };
    if (token) options.headers = { Authorization: `Bearer ${token}` };
    
    const response = await context.v3.request(options); // Updated to use await and context.v3.request
    
    const responseBody = JSON.stringify(response.body);
    
    const test = responseBody.match(/(https:)?\/\/.*?\.pdf/);
    
    const url = test 
    	? test[0].startsWith('http') ? test[0] : 'https:' + test[0] 
    	: "It wasn't possible to find the uploaded file URL"; 
    
    return { result: url }; 

}