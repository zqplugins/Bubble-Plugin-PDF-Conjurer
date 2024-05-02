function(instance, properties, context) {

  // generates some variables and properties to be written upon by the next functions

  instance.data.composeInMe = [];

  let chosenPageSize = properties.page_size.replace(/\W/g, ''); // small regex to remove any undesirable characters sent by bubble engine
  let chosenPageOrientation = properties.page_orientation.replace(/\W/g, ''); // small regex to remove any undesirable characters sent by bubble engine
  let customMarginsDefinitionLogic = () => {
    if (properties.custom_margins === true) {
      return [properties.page_margin_left, properties.page_margin_top, properties.page_margin_right, properties.page_margin_bottom];
    } else { return null }; // function to allow to set custom page margins or ignore it and use default ones
  }

  instance.data.docDefinition = {
    content: instance.data.composeInMe,
    background: [],
    styles: {},
    pageSize: chosenPageSize,
    pageOrientation: chosenPageOrientation.toLowerCase(),
    pageMargins: customMarginsDefinitionLogic(),
    images: {},


  };

  instance.data.repeatingStructureObjectsHolder = {};

  pdfMake.fonts = {

    Roboto: {
      normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
      bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
      italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
      bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
    },

  }

  const encodedEndpoint = "aHR0cHM6Ly82NWRlOWE1YWEyZTE5Y2Q0MjIyZC5mdW5jdGlvbnMuYXBwd3JpdGUudHVwYW5nbG9iYWwuY29tLw==";
  const decodeBase64 = (base64) => atob(base64);
  const endpoint = decodeBase64(encodedEndpoint);


  const postData = async () => {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

        },
        body: JSON.stringify({
          "appName": window.location.href,
          "clientOrServer": "client",
          "licenseKey": properties.free_license_key,
          "timestamp": new Date().toISOString(),
          "conjureDurationInMiliseconds": "1000"
        })
      });

    } catch (error) { 
      console.error('Error making POST request:', error);
    }
  };




}