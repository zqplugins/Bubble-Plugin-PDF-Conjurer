function(instance, properties, context) {

    const getList = (columnXBasicReference, startPosition, finishPosition) => {
        let returnedList = columnXBasicReference.get(startPosition, finishPosition);
        return returnedList;
    }

    const listLoader = (columnBasicReference, columnLengthFunction) => {
        let acquiredListColumn = getList(columnBasicReference, 0, columnLengthFunction);
        return acquiredListColumn;
    }

    const turnStringIntoTextObject = (string, style) => {
        if (properties.parse_bbcode) {
            const parser = getParser(
                pdfMake.fonts,
                (imageName, link) => {
                    instance.data.docDefinition.images[imageName] = link;
                },
                (err) => {
                    context.reportDebugger(err.message);
                }
            );

            return {
                stack: parser.getParsedText(string),
                style: `${style.toLowerCase()}`,
                margin: null
            };
        }

        return {
            text: string,
            style: `${style.toLowerCase()}`,
            margin: null
        };
    };

    const tableCustomMarginsDefinitionLogic = () => {
        if (properties.table_custom_margins) {
            return [properties.table_left_margin, properties.table_top_margin, properties.table_right_margin, properties.table_bottom_margin];
        } else {
            return null;
        }
    };

    const processColumn = (columnData, useColumn, columnList, columnIndex) => {
        if (useColumn) {
            if (columnData === null) {
                instance.data[columnList] = [" "];
            } else {
                instance.data[columnList] = listLoader(columnData, columnData.length());
            }
        }
    };

    processColumn(properties.first_column, true, 'listOfExtractedValuesFirstColumn', 1);
    processColumn(properties.second_column, properties.use_second_column, 'listOfExtractedValuesSecondColumn', 2);
    processColumn(properties.third_column, properties.use_third_column, 'listOfExtractedValuesThirdColumn', 3);
    processColumn(properties.fourth_column, properties.use_fourth_column, 'listOfExtractedValuesFourthColumn', 4);
    processColumn(properties.fifth_column, properties.use_fifth_column, 'listOfExtractedValuesFifthColumn', 5);
    processColumn(properties.sixth_column, properties.use_sixth_column, 'listOfExtractedValuesSixthColumn', 6);
    processColumn(properties.seventh_column, properties.use_seventh_column, 'listOfExtractedValuesSeventhColumn', 7);
    processColumn(properties.eighth_column, properties.use_eighth_column, 'listOfExtractedValuesEighthColumn', 8);
    processColumn(properties.ninth_column, properties.use_ninth_column, 'listOfExtractedValuesNinthColumn', 9);
    processColumn(properties.tenth_column, properties.use_tenth_column, 'listOfExtractedValuesTenthColumn', 10);
    processColumn(properties.eleventh_column, properties.use_eleventh_column, 'listOfExtractedValuesEleventhColumn', 11);
    processColumn(properties.twelfth_column, properties.use_twelfth_column, 'listOfExtractedValuesTwelfthColumn', 12);
    processColumn(properties.thirteenth_column, properties.use_thirteenth_column, 'listOfExtractedValuesThirteenthColumn', 13);
    processColumn(properties.fourteenth_column, properties.use_fourteenth_column, 'listOfExtractedValuesFourteenthColumn', 14);
    processColumn(properties.fifteenth_column, properties.use_fifteenth_column, 'listOfExtractedValuesFifteenthColumn', 15);
    processColumn(properties.sixteenth_column, properties.use_sixteenth_column, 'listOfExtractedValuesSixteenthColumn', 16);
    processColumn(properties.seventeenth_column, properties.use_seventeenth_column, 'listOfExtractedValuesSeventeenthColumn', 17);
    processColumn(properties.eighteenth_column, properties.use_eighteenth_column, 'listOfExtractedValuesEighteenthColumn', 18);
    processColumn(properties.nineteenth_column, properties.use_nineteenth_column, 'listOfExtractedValuesNineteenthColumn', 19);
    processColumn(properties.twentieth_column, properties.use_twentieth_column, 'listOfExtractedValuesTwentiethColumn', 20);

    const createBlanks = (element) => {
        let checkAndSwap = (nestedElement) => {
            if (nestedElement === undefined) {
                return null;
            } else {
                return nestedElement;
            }
        };
        return element.map(checkAndSwap);
    };

    const returnLength = (element) => {
        return element.length;
    };

    const biggerComparer = (accumulator, currentValue) => {
        return (accumulator > currentValue) ? accumulator : currentValue;
    };

    const transpose = (a) => {
        const w = a.length || 0;
        const h = a[0] instanceof Array ? a[0].length : 0;
        if (h === 0 || w === 0) { return []; }
        const t = [];
        for (let i = 0; i < h; i++) {
            t[i] = [];
            for (let j = 0; j < w; j++) {
                t[i][j] = a[j][i];
            }
        }
        return t;
    };

    if (instance.data.composeInMe === undefined) {
        instance.data.composeInMe = [];
    }

    if (properties.tableStyle === undefined || properties.tableStyle === null) {
        properties.tableStyle = "";
    }

    let definedStyleForTable = properties.tableStyle.replaceAll(/\W/g, '');

    let tableBody = [];
    let tableBodyTransposed = [];

    tableBody.push(instance.data.listOfExtractedValuesFirstColumn.map((value) => turnStringIntoTextObject(value, definedStyleForTable)));

    const pushToTableBody = (columnData, useColumn) => {
        if (useColumn) {
            tableBody.push(instance.data[columnData].map((value) => turnStringIntoTextObject(value, definedStyleForTable)));
        }
    };

    pushToTableBody('listOfExtractedValuesSecondColumn', properties.use_second_column);
    pushToTableBody('listOfExtractedValuesThirdColumn', properties.use_third_column);
    pushToTableBody('listOfExtractedValuesFourthColumn', properties.use_fourth_column);
    pushToTableBody('listOfExtractedValuesFifthColumn', properties.use_fifth_column);
    pushToTableBody('listOfExtractedValuesSixthColumn', properties.use_sixth_column);
    pushToTableBody('listOfExtractedValuesSeventhColumn', properties.use_seventh_column);
    pushToTableBody('listOfExtractedValuesEighthColumn', properties.use_eighth_column);
    pushToTableBody('listOfExtractedValuesNinthColumn', properties.use_ninth_column);
    pushToTableBody('listOfExtractedValuesTenthColumn', properties.use_tenth_column);
    pushToTableBody('listOfExtractedValuesEleventhColumn', properties.use_eleventh_column);
    pushToTableBody('listOfExtractedValuesTwelfthColumn', properties.use_twelfth_column);
    pushToTableBody('listOfExtractedValuesThirteenthColumn', properties.use_thirteenth_column);
    pushToTableBody('listOfExtractedValuesFourteenthColumn', properties.use_fourteenth_column);
    pushToTableBody('listOfExtractedValuesFifteenthColumn', properties.use_fifteenth_column);
    pushToTableBody('listOfExtractedValuesSixteenthColumn', properties.use_sixteenth_column);
    pushToTableBody('listOfExtractedValuesSeventeenthColumn', properties.use_seventeenth_column);
    pushToTableBody('listOfExtractedValuesEighteenthColumn', properties.use_eighteenth_column);
    pushToTableBody('listOfExtractedValuesNineteenthColumn', properties.use_nineteenth_column);
    pushToTableBody('listOfExtractedValuesTwentiethColumn', properties.use_twentieth_column);

    let storedListLengths = tableBody.map(returnLength);
    let biggestLength = storedListLengths.reduce(biggerComparer);
    let indexOfLongerArray = storedListLengths.findIndex(element => element === biggestLength);

    tableBodyTransposed = transpose(tableBody);

    tableBody = tableBodyTransposed.map(createBlanks);

    if (properties.table_uses_header_row) {
        if (properties.header_style === undefined || properties.header_style === null) {
            properties.header_style = "";
        }
        var arrayOfHeaders = [];
        var definedStyleForHeaderText = properties.header_style.replace(/\W/g, '');

        const pushHeader = (header, useColumn) => {
            if (useColumn) {
                const headerCell = turnStringIntoTextObject(header, definedStyleForHeaderText);//Apply bb code if needed
                arrayOfHeaders.push(headerCell);
            }
        };

        pushHeader(properties.first_column_header, true); //Corina changed
        pushHeader(properties.second_column_header, properties.use_second_column);
        pushHeader(properties.third_column_header, properties.use_third_column);
        pushHeader(properties.fourth_column_header, properties.use_fourth_column);
        pushHeader(properties.fifth_column_header, properties.use_fifth_column);
        pushHeader(properties.sixth_column_header, properties.use_sixth_column);
        pushHeader(properties.seventh_column_header, properties.use_seventh_column);
        pushHeader(properties.eighth_column_header, properties.use_eighth_column);
        pushHeader(properties.ninth_column_header, properties.use_ninth_column);
        pushHeader(properties.tenth_column_header, properties.use_tenth_column);
        pushHeader(properties.eleventh_column_header, properties.use_eleventh_column);
        pushHeader(properties.twelfth_column_header, properties.use_twelfth_column);
        pushHeader(properties.thirteenth_column_header, properties.use_thirteenth_column);
        pushHeader(properties.fourteenth_column_header, properties.use_fourteenth_column);
        pushHeader(properties.fifteenth_column_header, properties.use_fifteenth_column);
        pushHeader(properties.sixteenth_column_header, properties.use_sixteenth_column);
        pushHeader(properties.seventeenth_column_header, properties.use_seventeenth_column);
        pushHeader(properties.eighteenth_column_header, properties.use_eighteenth_column);
        pushHeader(properties.nineteenth_column_header, properties.use_nineteenth_column);
        pushHeader(properties.twentieth_column_header, properties.use_twentieth_column);

        tableBody.unshift(arrayOfHeaders);
    }

    let arrayOfWidths = [];
    let columnsWidth = (properties.table_column_width === "Fit available space") ? "*" : "auto";

    arrayOfWidths.push(columnsWidth);
    const pushWidth = (useColumn) => {
        if (useColumn) {
            arrayOfWidths.push(columnsWidth);
        }
    };

    pushWidth(properties.use_second_column);
    pushWidth(properties.use_third_column);
    pushWidth(properties.use_fourth_column);
    pushWidth(properties.use_fifth_column);
    pushWidth(properties.use_sixth_column);
    pushWidth(properties.use_seventh_column);
    pushWidth(properties.use_eighth_column);
    pushWidth(properties.use_ninth_column);
    pushWidth(properties.use_tenth_column);
    pushWidth(properties.use_eleventh_column);
    pushWidth(properties.use_twelfth_column);
    pushWidth(properties.use_thirteenth_column);
    pushWidth(properties.use_fourteenth_column);
    pushWidth(properties.use_fifteenth_column);
    pushWidth(properties.use_sixteenth_column);
    pushWidth(properties.use_seventeenth_column);
    pushWidth(properties.use_eighteenth_column);
    pushWidth(properties.use_nineteenth_column);
    pushWidth(properties.use_twentieth_column);

    const selectLayout = (chosenLayout) => {
        switch (chosenLayout) {
            case "No Borders":
                return "noBorders";
            case "Header Line Only":
                return "headerLineOnly";
            case "Light Horizontal Lines":
                return "lightHorizontalLines";
            case "Strong Outer Border":
                return {
                    hLineWidth: (i, node) => (i === 0 || i === node.table.body.length) ? 2 : 1,
                    vLineWidth: (i, node) => (i === 0 || i === node.table.widths.length) ? 2 : 1,
                    hLineColor: (i, node) => (i === 0 || i === node.table.body.length) ? 'black' : 'gray',
                    vLineColor: (i, node) => (i === 0 || i === node.table.widths.length) ? 'black' : 'gray'
                };
            case "Zebra":
                return {
                    fillColor: (i, node) => (i % 2 === 0) ? '#CCCCCC' : null
                };
            case "Light Horizontal Lines Without Header":
                return {
                    hLineWidth: (i, node) => (i === node.table.headerRows) ? 0 : 1,
                    vLineWidth: () => 0,
                    hLineColor: () => '#aaa',
                    paddingLeft: (i) => i === 0 ? 0 : 8,
                    paddingRight: (i, node) => (i === node.table.widths.length - 1) ? 0 : 8
                };
            default:
                return "no layout specified";
        }
    };

    let layoutHolder = selectLayout(properties.table_layout);

    let tableObjectHolder = {
        table: {
            headerRows: properties.table_uses_header_row ? 1 : 0,
            dontBreakRows: true,
            keepWithHeaderRows: properties.table_uses_header_row ? 1 : 0,
            widths: arrayOfWidths,
            body: tableBody,
        },
        margin: tableCustomMarginsDefinitionLogic(),
        layout: layoutHolder,
        pageBreak: properties.page_break.toLowerCase(),
    };

    const pushToLocation = (location, object) => {
        if (properties.into_multi_column) {
            object.width = properties.this_column_width === "Fit available space" ? "*" :
                properties.this_column_width === "Fit content" ? "auto" : properties.fixed_width_column_size;
            instance.data.multiColumnObjectHolder[`${properties.multi_column_name}`].columns.push(object);
        } else if (properties.into_footer) {
            instance.data.footerObjectsHolder.columns.push(object);
        } else if (properties.into_header) {
            instance.data.headerObjectsHolder.columns.push(object);
        } else if (properties.into_background) {
            instance.data.docDefinition.background.push(object);
        } else {
            instance.data.composeInMe.push(object);
        }
    };

    pushToLocation(properties.target_location, tableObjectHolder);
}
