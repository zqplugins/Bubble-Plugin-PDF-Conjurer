async function(properties, context) {
    const { 
        prev_configs, 
        table_name, 
        data_source, 
        column_header = '',
        header_style,
        field_of_thing,
        column_width,
        column_style,
    } = properties;
    
    const fetch = require('node-fetch');
    
    const configs = JSON.parse(prev_configs);
    
    const fonts = { ...configs.defaultFonts, ...configs.addedFonts };
    
    const parserURL = 'https://meta-l.cdn.bubble.io/f1688082896800x500622453357242560/bbcodeparser_fixedcode_v5_SS.js';
      
    const parser = await context.v3.async((callback) => { // Updated to use await and context.v3.async
      fetch(parserURL)
        .then((response) => response.text())
        .then((file) => {
          eval(file);
            
          callback(null, getParser(
            fonts, 
            (imageName, link) => {
              configs.addedImages[imageName] = link;
            }, 
            (err) => {
              console.error(err);
            }, 
            'code', 
            'quote'
          ));
        })
        .catch((err) => {
          callback(err, null);
        });
    });
    
    if (!configs.repeatedTables[table_name]) {
        throw new Error(`It wasn't possible to find the table name ${table_name}`);
    }
    
    const bodyOptions = {};
    const headerOptions = {};
    
    if (column_style) bodyOptions.style = column_style;
    if (header_style) headerOptions.style = header_style;
    
    // Verify if data_source is a bubble list
    const tableLength = (typeof data_source.length === 'function') ? await data_source.length() : 0;
    const tableList = (typeof data_source.get === 'function') ? await data_source.get(0, tableLength) : [];
    
    const formatData = async (table) => {
        const tableColumn = (typeof table.get === 'function') ? table.get(field_of_thing) : '';
        const columnLength = (typeof tableColumn.length === 'function') ? await tableColumn.length() : 0; // Ensuring await is used with length method
        const column = (typeof tableColumn.get === 'function') ? await tableColumn.get(0, columnLength) : []; // Ensuring await is used with get method
            
        const columnObject = column.map((line) => {
          const text = line || ' ';
          
          if (properties.parse_bbcode) {
            return { stack: parser.getParsedText(text), ...bodyOptions };
          }
            
          return { text, ...bodyOptions }
        });
            
        const headerObject = properties.parse_bbcode      
            ? { stack: parser.getParsedText(column_header), ...headerOptions } 
            : { text: column_header, ...headerOptions };
            
        const widthsObject = column_width === 'Fit available space' ? '*' : 'auto';
        
        return {
            columns: [columnObject],
            headers: [headerObject],
            widths: [widthsObject]
        };
    };
    
    if (configs.repeatedTables[table_name].length === 0) {
        // It will be the first column added
        configs.repeatedTables[table_name] = await Promise.all(tableList.map(formatData));                        
        
    } else {
        const tables = await Promise.all(tableList.map(formatData));
        
        configs.repeatedTables[table_name].forEach((table, index) => {
            const { columns, headers, widths } = tables[index] || {};
            
            if (columns && headers && widths) {
                table.columns.push(...columns);
                table.headers.push(...headers);
                table.widths.push(...widths);
            }
        });
    }
    
    const configurations = JSON.stringify(configs);

    return { configurations }
}