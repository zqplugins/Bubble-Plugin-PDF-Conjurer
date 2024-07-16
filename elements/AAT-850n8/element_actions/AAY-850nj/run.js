function(instance, properties, context) {
    /*function(instance, properties, context) {
  const fileNameFix = (inputedName) => {
    if (inputedName.substring(inputedName.length - 4) === ".pdf") {
      return inputedName;
    } else {
      return `${inputedName}.pdf`;
    }
  };

  let fixedFileName = fileNameFix(properties.file_name);

  instance.data.docDefinition.info = {
    title: fixedFileName,
  };

  if (properties.debug_log) {
    console.log("Hello! Copy the object below and send it to me, Vini, the creator of the PDF Conjurer plugin for assistance, it will be helpful. Disable 'debug mode' in the 'Conjure' workflow action to stop logging this to the console");
    console.log("You can also automatically store this in your app's database by reading the 'PDF Model X' state called 'Debug log dump under the event 'Debug log available', then send me once you know that a log is about a faulty attempt to conjure a PDF.");

    let dump = JSON.stringify(instance.data.docDefinition);
    console.log(dump);

    instance.publishState("debug_log_dump", dump);
    instance.triggerEvent("debug_log_available");
  }

    for( key in instance.data.docDefinition.images ){

      if ( instance.data.docDefinition.images[key].indexOf('https:') !== -1 || instance.data.docDefinition.images[key].indexOf('http:') !== -1){
        
         instance.data.docDefinition.images[key] = 'https://cors-anywhere-zq.herokuapp.com/' + instance.data.docDefinition.images[key];
          
     } else{

         instance.data.docDefinition.images[key] = 'https:' + instance.data.docDefinition.images[key];
         instance.data.docDefinition.images[key] = 'https://cors-anywhere-zq.herokuapp.com/' + instance.data.docDefinition.images[key];
         
     }
     
     }

  if (!properties.no_browser_download) {
    pdfMake.createPdf(instance.data.docDefinition).download(fixedFileName);
    console.log(instance.data.docDefinition);
  }
          


  if (properties.save_to_database) {
    const pdfDocGenerator = pdfMake.createPdf(instance.data.docDefinition);
    pdfDocGenerator.getBase64((data) => {
      context.uploadContent(fixedFileName, data, function (err, url) {
        instance.publishState("saved_pdf", url);
        instance.triggerEvent("pdf_uploaded_and_available_in_element_state", function (err) { console.log(err); });
      }, properties.attach_pdf_to);
    });
  }
} */
    
  const fileNameFix = (inputedName) => {
    if (inputedName.substring(inputedName.length - 4) === ".pdf") {
      return inputedName;
    } else {
      return `${inputedName}.pdf`;
    }
  };

  let fixedFileName = fileNameFix(properties.file_name);

  instance.data.docDefinition.info = {
    title: fixedFileName,
  };

  if (properties.debug_log) {
    console.log("Hello! Copy the object below and send it to me, Vini, the creator of the PDF Conjurer plugin for assistance, it will be helpful. Disable 'debug mode' in the 'Conjure' workflow action to stop logging this to the console");
    console.log("You can also automatically store this in your app's database by reading the 'PDF Model X' state called 'Debug log dump under the event 'Debug log available', then send me once you know that a log is about a faulty attempt to conjure a PDF.");

    let dump = JSON.stringify(instance.data.docDefinition);
    console.log(dump);

    instance.publishState("debug_log_dump", dump);
    instance.triggerEvent("debug_log_available");
  }

    for( key in instance.data.docDefinition.images ){

      if ( instance.data.docDefinition.images[key].indexOf('https:') !== -1 || instance.data.docDefinition.images[key].indexOf('http:') !== -1){
        
         instance.data.docDefinition.images[key] = 'https://cors-anywhere-zq.herokuapp.com/' + instance.data.docDefinition.images[key];
          
     } else{

         instance.data.docDefinition.images[key] = 'https:' + instance.data.docDefinition.images[key];
         instance.data.docDefinition.images[key] = 'https://cors-anywhere-zq.herokuapp.com/' + instance.data.docDefinition.images[key];
         
     }
     
     }

  if (!properties.no_browser_download) {
    pdfMake.createPdf(instance.data.docDefinition).download(fixedFileName);
  }
          


  if (properties.save_to_database) {
    const pdfDocGenerator = pdfMake.createPdf(instance.data.docDefinition);
    pdfDocGenerator.getBase64((data) => {
      context.uploadContent(fixedFileName, data, function (err, url) {
        instance.publishState("saved_pdf", url);
        instance.triggerEvent("pdf_uploaded_and_available_in_element_state", function (err) { console.log(err); });
      }, properties.attach_pdf_to);
    });
  }
}

