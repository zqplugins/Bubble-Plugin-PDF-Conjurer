async function(properties, context) {

  const fetch = require('node-fetch');

  let options = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({
      pdfDocDefinition: properties.prev_configs,
      fileName: properties.file_name,
      setDataHeader: properties.set_data_header,
      returnUrlForPdfContent: properties.return_url_for_pdf_content,
      errorReturnUrlForPdf: properties.error_endpoint_address,
      additionalData: properties.additional_data,
      bucketName: properties.bucketName,
      accessKeyId: properties.accessKeyId,
      secretAccessKey: properties.secretAccessKey
    })
  };

  await context.v3.async(async callback => {
    try {
      await fetch(properties.external_function_url, options);
      callback(null, null);
    } catch (err) {
      callback(err);
    }
  });
}
