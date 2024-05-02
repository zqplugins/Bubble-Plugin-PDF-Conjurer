function(instance, properties, context) {

	// this returns an array holding the list of whatever bubble holds. Texts and numbers are rendered, other types like Date are converted to text.
	let getList = (columnXBasicReference, startPosition, finishPosition) => {
		let returnedList = columnXBasicReference.get(startPosition, finishPosition);
		return returnedList;
	}

	// this is to load data from Bubble's server.
	let listLoader = (columnBasicReference, columnLengthFunction) => {
		// grab the column array
		let acquiredListColumn = getList(columnBasicReference, 0, columnLengthFunction);
		// return it, whether it's a blank space or the actual list.
		return acquiredListColumn;
	}

	// now on to load the data by getting columns sent by the app maker
	// writing to instance.data to make sure multiple PDF models running at the same time won't override each other, previously I was using "var". Unsure if "var" is properly isolated.

	// in case it's just a single null value, will return a blank space instead of an error. Has to be an array because will be pushed later on.
	if (properties.first_column === null) {
		instance.data.listOfExtractedValuesFirstColumn = [" "];
	} else {
		instance.data.listOfExtractedValuesFirstColumn = listLoader(properties.first_column, properties.first_column.length());
	}
	// these are inside an "if" because trying anything other than this will cause problems due to not always the app maker will send properties.second_column, for example, by not using that column
	if (properties.use_second_column) {
		if (properties.second_column === null) {
			instance.data.listOfExtractedValuesSecondColumn = [" "];
		} else {
			instance.data.listOfExtractedValuesSecondColumn = listLoader(properties.second_column, properties.second_column.length());
		}
	}

	if (properties.use_third_column) {
		if (properties.third_column === null) {
			instance.data.listOfExtractedValuesThirdColumn = [" "];
		} else {
			instance.data.listOfExtractedValuesThirdColumn = listLoader(properties.third_column, properties.third_column.length());
		}
	}

	if (properties.use_fourth_column) {
		if (properties.fourth_column === null) {
			instance.data.listOfExtractedValuesFourthColumn = [" "];
		} else {
			instance.data.listOfExtractedValuesFourthColumn = listLoader(properties.fourth_column, properties.fourth_column.length());
		}
	}

	if (properties.use_fifth_column) {
		if (properties.fifth_column === null) {
			instance.data.listOfExtractedValuesFifthColumn = [" "];
		} else {
			instance.data.listOfExtractedValuesFifthColumn = listLoader(properties.fifth_column, properties.fifth_column.length());
		}
	}

	if (properties.use_sixth_column) {
		if (properties.sixth_column === null) {
			instance.data.listOfExtractedValuesSixthColumn = [" "];
		} else {
			instance.data.listOfExtractedValuesSixthColumn = listLoader(properties.sixth_column, properties.sixth_column.length());
		}
	}

	if (properties.use_seventh_column) {
		if (properties.seventh_column === null) {
			instance.data.listOfExtractedValuesSeventhColumn = [" "];
		} else {
			instance.data.listOfExtractedValuesSeventhColumn = listLoader(properties.seventh_column, properties.seventh_column.length());
		}
	}

	if (properties.use_eighth_column) {
		if (properties.eighth_column === null) {
			instance.data.listOfExtractedValuesEighthColumn = [" "];
		} else {
			instance.data.listOfExtractedValuesEighthColumn = listLoader(properties.eighth_column, properties.eighth_column.length());
		}
	}

	if (properties.use_ninth_column) {
		if (properties.ninth_column === null) {
			instance.data.listOfExtractedValuesNinthColumn = [" "];
		} else {
			instance.data.listOfExtractedValuesNinthColumn = listLoader(properties.ninth_column, properties.ninth_column.length());
		}
	}

	if (properties.use_tenth_column) {
		if (properties.tenth_column === null) {
			instance.data.listOfExtractedValuesTenthColumn = [" "];
		} else {
			instance.data.listOfExtractedValuesTenthColumn = listLoader(properties.tenth_column, properties.tenth_column.length());
		}
	}

	if (properties.use_eleventh_column) {
		if (properties.eleventh_column === null) {
			instance.data.listOfExtractedValuesEleventhColumn = [" "];
		} else {
			instance.data.listOfExtractedValuesEleventhColumn = listLoader(properties.eleventh_column, properties.eleventh_column.length());
		}
	}

	if (properties.use_twelfth_column) {
		if (properties.twelfth_column === null) {
			instance.data.listOfExtractedValuesTwelfthColumn = [" "];
		} else {
			instance.data.listOfExtractedValuesTwelfthColumn = listLoader(properties.twelfth_column, properties.twelfth_column.length());
		}
	}

	if (properties.use_thirteenth_column) {
		if (properties.thirteenth_column === null) {
			instance.data.listOfExtractedValuesThirteenthColumn = [" "];
		} else {
			instance.data.listOfExtractedValuesThirteenthColumn = listLoader(properties.thirteenth_column, properties.thirteenth_column.length());
		}
	}

	if (properties.use_fourteenth_column) {
		if (properties.fourteenth_column === null) {
			instance.data.listOfExtractedValuesFourteenthColumn = [" "];
		} else {
			instance.data.listOfExtractedValuesFourteenthColumn = listLoader(properties.fourteenth_column, properties.fourteenth_column.length());
		}
	}

	if (properties.use_fifteenth_column) {
		if (properties.fifteenth_column === null) {
			instance.data.listOfExtractedValuesFifteenthColumn = [" "];
		} else {
			instance.data.listOfExtractedValuesFifteenthColumn = listLoader(properties.fifteenth_column, properties.fifteenth_column.length());
		}
	}

	if (properties.use_sixteenth_column) {
		if (properties.sixteenth_column === null) {
			instance.data.listOfExtractedValuesSixteenthColumn = [" "];
		} else {
			instance.data.listOfExtractedValuesSixteenthColumn = listLoader(properties.sixteenth_column, properties.sixteenth_column.length());
		}
	}

	if (properties.use_seventeenth_column) {
		if (properties.seventeenth_column === null) {
			instance.data.listOfExtractedValuesSeventeenthColumn = [" "];
		} else {
			instance.data.listOfExtractedValuesSeventeenthColumn = listLoader(properties.seventeenth_column, properties.seventeenth_column.length());
		}
	}

	if (properties.use_eighteenth_column) {
		if (properties.eighteenth_column === null) {
			instance.data.listOfExtractedValuesEighteenthColumn = [" "];
		} else {
			instance.data.listOfExtractedValuesEighteenthColumn = listLoader(properties.eighteenth_column, properties.eighteenth_column.length());
		}
	}

	if (properties.use_nineteenth_column) {
		if (properties.nineteenth_column === null) {
			instance.data.listOfExtractedValuesNineteenthColumn = [" "];
		} else {
			instance.data.listOfExtractedValuesNineteenthColumn = listLoader(properties.nineteenth_column, properties.nineteenth_column.length());
		}
	}

	if (properties.use_twentieth_column) {
		if (properties.twentieth_column === null) {
			instance.data.listOfExtractedValuesTwentiethColumn = [" "];
		} else {
			instance.data.listOfExtractedValuesTwentiethColumn = listLoader(properties.twentieth_column, properties.twentieth_column.length());
		}
	}

	// auxiliary functions for the transposition incoming!

	// transform "undefined" array elements created by the transposition function into null elements so pdfmake works fine with them (undefined causes crashes)
	let createBlanks = (element) => {
		let checkAndSwap = (nestedElement) => {
			if (nestedElement === undefined) {
				return null;
			} else {
				return nestedElement
			}
		}
		return element.map(checkAndSwap);
	}

	let returnLength = (element) => {
		return element.length;
	}

	let biggerComparer = (accumulator, currentValue) => {
		let biggerNumber;
		if (accumulator > currentValue) {
			biggerNumber = accumulator;
		} else {
			biggerNumber = currentValue;
		}
		return biggerNumber;
	}

	let isThisTheBiggestLength = (element, index, array) => {
		if (element === biggestLength) {
			return true
		} else {
			return false
		}
	}

	// composeInMe is an array of objects and we push a new object into it, each object is an element created in the pdf


	// here we bring it into existence if it doesn't exists yet

	if (instance.data.composeInMe === undefined) {
		instance.data.composeInMe = [];
	}

	// here we capture whatever the user (app maker) has inputed into the workflow actions into an objects
	if (properties.tableStyle === undefined || properties.tableStyle === null) {
		properties.tableStyle = "";
	}

	if (typeof properties.tableStyle !== "undefined" && properties.tableStyle !== null) {

		var definedStyleForTable = properties.tableStyle.replaceAll(/\W/g, ''); // small regex to remove any undesirable characters from style name inputed by app maker

	}

	let tableCustomMarginsDefinitionLogic = () => {
		if (properties.table_custom_margins === true) {
			return [properties.table_left_margin, properties.table_top_margin, properties.table_right_margin, properties.table_bottom_margin];
		} else { return null; } // function to allow to set custom margins or ignore it and use default ones
	}

	// the body property is an array that will hold other arrays that will be turned into rows.
	let tableBody = [];
	let tableBodyTransposed = [];



	// now we push the acquired array(s) inside the "body:" main array to create a row with each array (to later be transposed into a column)
	//tableBody.push(instance.data.listOfExtractedValuesFirstColumn);
	// change the above code so the text becomes a pdfmake text object with a style property
	tableBody.push(instance.data.listOfExtractedValuesFirstColumn.map((singleText) => {
		return { text: singleText, style: `${definedStyleForTable.toLowerCase()}` }
	}));

	if (properties.use_second_column) {
		tableBody.push(instance.data.listOfExtractedValuesSecondColumn.map((singleText) => {
			return { text: singleText, style: `${definedStyleForTable.toLowerCase()}` }
		}));
	}

	if (properties.use_third_column) {
		tableBody.push(instance.data.listOfExtractedValuesThirdColumn.map((singleText) => {
			return { text: singleText, style: `${definedStyleForTable.toLowerCase()}` }
		}));
	}

	if (properties.use_fourth_column) {
		tableBody.push(instance.data.listOfExtractedValuesFourthColumn.map((singleText) => {
			return { text: singleText, style: `${definedStyleForTable.toLowerCase()}` }
		}));
	}

	if (properties.use_fifth_column) {
		tableBody.push(instance.data.listOfExtractedValuesFifthColumn.map((singleText) => {
			return { text: singleText, style: `${definedStyleForTable.toLowerCase()}` }
		}));
	}

	if (properties.use_sixth_column) {
		tableBody.push(instance.data.listOfExtractedValuesSixthColumn.map((singleText) => {
			return { text: singleText, style: `${definedStyleForTable.toLowerCase()}` }
		}));
	}

	if (properties.use_seventh_column) {
		tableBody.push(instance.data.listOfExtractedValuesSeventhColumn.map((singleText) => {
			return { text: singleText, style: `${definedStyleForTable.toLowerCase()}` }
		}));
	}

	if (properties.use_eighth_column) {
		tableBody.push(instance.data.listOfExtractedValuesEighthColumn.map((singleText) => {
			return { text: singleText, style: `${definedStyleForTable.toLowerCase()}` }
		}));
	}

	if (properties.use_ninth_column) {
		tableBody.push(instance.data.listOfExtractedValuesNinthColumn.map((singleText) => {
			return { text: singleText, style: `${definedStyleForTable.toLowerCase()}` }
		}));
	}

	if (properties.use_tenth_column) {
		tableBody.push(instance.data.listOfExtractedValuesTenthColumn.map((singleText) => {
			return { text: singleText, style: `${definedStyleForTable.toLowerCase()}` }
		}));
	}

	if (properties.use_eleventh_column) {
		tableBody.push(instance.data.listOfExtractedValuesEleventhColumn.map((singleText) => {
			return { text: singleText, style: `${definedStyleForTable.toLowerCase()}` }
		}));
	}

	if (properties.use_twelfth_column) {
		tableBody.push(instance.data.listOfExtractedValuesTwelfthColumn.map((singleText) => {
			return { text: singleText, style: `${definedStyleForTable.toLowerCase()}` }
		}));
	}

	if (properties.use_thirteenth_column) {
		tableBody.push(instance.data.listOfExtractedValuesThirteenthColumn.map((singleText) => {
			return { text: singleText, style: `${definedStyleForTable.toLowerCase()}` }
		}));
	}

	if (properties.use_fourteenth_column) {
		tableBody.push(instance.data.listOfExtractedValuesFourteenthColumn.map((singleText) => {
			return { text: singleText, style: `${definedStyleForTable.toLowerCase()}` }
		}));
	}

	if (properties.use_fifteenth_column) {
		tableBody.push(instance.data.listOfExtractedValuesFifteenthColumn.map((singleText) => {
			return { text: singleText, style: `${definedStyleForTable.toLowerCase()}` }
		}));
	}

	if (properties.use_sixteenth_column) {
		tableBody.push(instance.data.listOfExtractedValuesSixteenthColumn.map((singleText) => {
			return { text: singleText, style: `${definedStyleForTable.toLowerCase()}` }
		}));
	}

	if (properties.use_seventeenth_column) {
		tableBody.push(instance.data.listOfExtractedValuesSeventeenthColumn.map((singleText) => {
			return { text: singleText, style: `${definedStyleForTable.toLowerCase()}` }
		}));
	}

	if (properties.use_eighteenth_column) {
		tableBody.push(instance.data.listOfExtractedValuesEighteenthColumn.map((singleText) => {
			return { text: singleText, style: `${definedStyleForTable.toLowerCase()}` }
		}));
	}

	if (properties.use_nineteenth_column) {
		tableBody.push(instance.data.listOfExtractedValuesNineteenthColumn.map((singleText) => {
			return { text: singleText, style: `${definedStyleForTable.toLowerCase()}` }
		}));
	}

	if (properties.use_twentieth_column) {
		tableBody.push(instance.data.listOfExtractedValuesTwentiethColumn.map((singleText) => {
			return { text: singleText, style: `${definedStyleForTable.toLowerCase()}` }
		}));
	}

	// here we fill in blank elements to the table so it becomes a square matrix and doesn't crashes (pdfmake only likes square matrices!)

	let storedListLengths = tableBody.map(returnLength);

	let biggestLength = storedListLengths.reduce(biggerComparer);

	let indexOfLongerArray = storedListLengths.findIndex(isThisTheBiggestLength);

	// a transpose function
	let transpose = (a) => {

		// Calculate the width and height of the Array
		var w = a.length || 0;
		var h = a[indexOfLongerArray] instanceof Array ? a[indexOfLongerArray].length : 0;

		// In case it is a zero matrix, no transpose routine needed.
		if (h === 0 || w === 0) { return []; }

		/**
		 * @var {Number} i Counter
		 * @var {Number} j Counter
		 * @var {Array} t Transposed data is stored in this array.
		 */
		var i, j, t = [];

		// Loop through every item in the outer array (height)
		for (i = 0; i < h; i++) {

			// Insert a new row (array)
			t[i] = [];

			// Loop through every item per item in outer array (width)
			for (j = 0; j < w; j++) {

				// Save transposed data.
				t[i][j] = a[j][i];
			}
		}

		return t;
	}


	// here we transpose the table to fit pdfmake's table structure of array
	tableBodyTransposed = transpose(tableBody);


	tableBody = tableBodyTransposed.map(createBlanks);




	// now let's put the headers so they become the first row. This is after the transposition, because we want it to not be transposed so it stays a row and doesn't becomes a column
	var useHeaderRow = 0; // in case a header row isn't used, this won't make the first row be repeated on other pages that the table may extend to.

	if (properties.table_uses_header_row) {
		if (properties.header_style === undefined || properties.header_style === null) {
			properties.header_style = "";
		}
		var useHeaderRow = 1; // this will make the first row be repeated in the other pages the table also extends to.

		var arrayOfHeaders = [];

		var definedStyleForHeaderText = properties.header_style.replace(/\W/g, ''); // small regex to remove any undesirable characters from style name inputed by app maker

		let firstColumnHeaderAsObj = { text: properties.first_column_header, style: `${definedStyleForHeaderText}` };
		arrayOfHeaders.push(firstColumnHeaderAsObj);

		if (properties.use_second_column) {
			let secondColumnHeaderAsObj = { text: properties.second_column_header, style: `${definedStyleForHeaderText}` };
			arrayOfHeaders.push(secondColumnHeaderAsObj);
		}

		if (properties.use_third_column) {
			let thirdColumnHeaderAsObj = { text: properties.third_column_header, style: `${definedStyleForHeaderText}` };
			arrayOfHeaders.push(thirdColumnHeaderAsObj);
		}

		if (properties.use_fourth_column) {
			let fourthColumnHeaderAsObj = { text: properties.fourth_column_header, style: `${definedStyleForHeaderText}` };
			arrayOfHeaders.push(fourthColumnHeaderAsObj);
		}

		if (properties.use_fifth_column) {
			let fifthColumnHeaderAsObj = { text: properties.fifth_column_header, style: `${definedStyleForHeaderText}` };
			arrayOfHeaders.push(fifthColumnHeaderAsObj);
		}

		if (properties.use_sixth_column) {
			let sixthColumnHeaderAsObj = { text: properties.sixth_column_header, style: `${definedStyleForHeaderText}` };
			arrayOfHeaders.push(sixthColumnHeaderAsObj);
		}

		if (properties.use_seventh_column) {
			let seventhColumnHeaderAsObj = { text: properties.seventh_column_header, style: `${definedStyleForHeaderText}` };
			arrayOfHeaders.push(seventhColumnHeaderAsObj);
		}

		if (properties.use_eighth_column) {
			let eighthColumnHeaderAsObj = { text: properties.eighth_column_header, style: `${definedStyleForHeaderText}` };
			arrayOfHeaders.push(eighthColumnHeaderAsObj);
		}

		if (properties.use_ninth_column) {
			let ninthColumnHeaderAsObj = { text: properties.ninth_column_header, style: `${definedStyleForHeaderText}` };
			arrayOfHeaders.push(ninthColumnHeaderAsObj);
		}

		if (properties.use_tenth_column) {
			let tenthColumnHeaderAsObj = { text: properties.tenth_column_header, style: `${definedStyleForHeaderText}` };
			arrayOfHeaders.push(tenthColumnHeaderAsObj);
		}

		if (properties.use_eleventh_column) {
			let eleventhColumnHeaderAsObj = { text: properties.eleventh_column_header, style: `${definedStyleForHeaderText}` };
			arrayOfHeaders.push(eleventhColumnHeaderAsObj);
		}

		if (properties.use_twelfth_column) {
			let twelfthColumnHeaderAsObj = { text: properties.twelfth_column_header, style: `${definedStyleForHeaderText}` };
			arrayOfHeaders.push(twelfthColumnHeaderAsObj);
		}

		if (properties.use_thirteenth_column) {
			let thirteenthColumnHeaderAsObj = { text: properties.thirteenth_column_header, style: `${definedStyleForHeaderText}` };
			arrayOfHeaders.push(thirteenthColumnHeaderAsObj);
		}

		if (properties.use_fourteenth_column) {
			let fourteenthColumnHeaderAsObj = { text: properties.fourteenth_column_header, style: `${definedStyleForHeaderText}` };
			arrayOfHeaders.push(fourteenthColumnHeaderAsObj);
		}

		if (properties.use_fifteenth_column) {
			let fifteenthColumnHeaderAsObj = { text: properties.fifteenth_column_header, style: `${definedStyleForHeaderText}` };
			arrayOfHeaders.push(fifteenthColumnHeaderAsObj);
		}

		if (properties.use_sixteenth_column) {
			let sixteenthColumnHeaderAsObj = { text: properties.sixteenth_column_header, style: `${definedStyleForHeaderText}` };
			arrayOfHeaders.push(sixteenthColumnHeaderAsObj);
		}

		if (properties.use_seventeenth_column) {
			let seventeenthColumnHeaderAsObj = { text: properties.seventeenth_column_header, style: `${definedStyleForHeaderText}` };
			arrayOfHeaders.push(seventeenthColumnHeaderAsObj);
		}

		if (properties.use_eighteenth_column) {
			let eighteenthColumnHeaderAsObj = { text: properties.eighteenth_column_header, style: `${definedStyleForHeaderText}` };
			arrayOfHeaders.push(eighteenthColumnHeaderAsObj);
		}

		if (properties.use_nineteenth_column) {
			let nineteenthColumnHeaderAsObj = { text: properties.nineteenth_column_header, style: `${definedStyleForHeaderText}` };
			arrayOfHeaders.push(nineteenthColumnHeaderAsObj);
		}

		if (properties.use_twentieth_column) {
			let twentiethColumnHeaderAsObj = { text: properties.twentieth_column_header, style: `${definedStyleForHeaderText}` };
			arrayOfHeaders.push(twentiethColumnHeaderAsObj);
		}


		tableBody.unshift(arrayOfHeaders);
	}

	// now to set the widths of every used column
	let arrayOfWidths = [];

	if (properties.table_column_width === "Fit available space") {
		var columnsWidth = "*";
	} else {
		var columnsWidth = "auto";
	}

	arrayOfWidths.push(columnsWidth);

	if (properties.use_second_column) {
		arrayOfWidths.push(columnsWidth);
	}

	if (properties.use_third_column) {
		arrayOfWidths.push(columnsWidth);
	}

	if (properties.use_fourth_column) {
		arrayOfWidths.push(columnsWidth);
	}

	if (properties.use_fifth_column) {
		arrayOfWidths.push(columnsWidth);
	}

	if (properties.use_sixth_column) {
		arrayOfWidths.push(columnsWidth);
	}

	if (properties.use_seventh_column) {
		arrayOfWidths.push(columnsWidth);
	}

	if (properties.use_eighth_column) {
		arrayOfWidths.push(columnsWidth);
	}

	if (properties.use_ninth_column) {
		arrayOfWidths.push(columnsWidth);
	}

	if (properties.use_tenth_column) {
		arrayOfWidths.push(columnsWidth);
	}

	if (properties.use_eleventh_column) {
		arrayOfWidths.push(columnsWidth);
	}

	if (properties.use_twelfth_column) {
		arrayOfWidths.push(columnsWidth);
	}

	if (properties.use_thirteenth_column) {
		arrayOfWidths.push(columnsWidth);
	}

	if (properties.use_fourteenth_column) {
		arrayOfWidths.push(columnsWidth);
	}

	if (properties.use_fifteenth_column) {
		arrayOfWidths.push(columnsWidth);
	}

	if (properties.use_sixteenth_column) {
		arrayOfWidths.push(columnsWidth);
	}

	if (properties.use_seventeenth_column) {
		arrayOfWidths.push(columnsWidth);
	}

	if (properties.use_eighteenth_column) {
		arrayOfWidths.push(columnsWidth);
	}

	if (properties.use_nineteenth_column) {
		arrayOfWidths.push(columnsWidth);
	}

	if (properties.use_twentieth_column) {
		arrayOfWidths.push(columnsWidth);
	}

	// here to grab the layout chosen by the app maker and set it up on this table

	let selectLayout = (chosenLayout) => {
		if (chosenLayout === "No Borders") {
			return "noBorders";
		}
		else if (chosenLayout === "Header Line Only") {
			return "headerLineOnly";
		}
		else if (chosenLayout === "Light Horizontal Lines") {
			return "lightHorizontalLines";
		}
		else if (chosenLayout === "Strong Outer Border") {
			return {
				hLineWidth: function (i, node) {
					return (i === 0 || i === node.table.body.length) ? 2 : 1;
				},
				vLineWidth: function (i, node) {
					return (i === 0 || i === node.table.widths.length) ? 2 : 1;
				},
				hLineColor: function (i, node) {
					return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
				},
				vLineColor: function (i, node) {
					return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
				}
			}
		}
		else if (chosenLayout === "Zebra") {
			return {
				fillColor: function (i, node) {
					return (i % 2 === 0) ? '#CCCCCC' : null;
				}
			}
		} else if (chosenLayout === "Light Horizontal Lines Without Header") {

			return {
				hLineWidth(i, node) {
					return (i === node.table.headerRows) ? 0 : 1; // Set the header row to 2, others to 1
				},
				vLineWidth(i) {
					return 0; // No vertical lines
				},
				hLineColor(i) {
					return '#aaa'; // Customize the color of horizontal lines
				},
				paddingLeft(i) {
					return i === 0 ? 0 : 8; // Add padding to the left of the content cells
				},
				paddingRight(i, node) {
					return (i === node.table.widths.length - 1) ? 0 : 8; // Add padding to the right of the content cells
				}
			}

		}

		else {
			return "no layout specified"
		}

	}

	let layoutHolder = selectLayout(properties.table_layout);

	let tableObjectHolder = {
		table: {
			headerRows: useHeaderRow,
			dontBreakRows: true,
			keepWithHeaderRows: useHeaderRow,
			widths: arrayOfWidths,
			body: tableBody,
		},
		//style: `${definedStyleForTable.toLowerCase()}`, was applying margins to table itself! 
		margin: tableCustomMarginsDefinitionLogic(),
		layout: layoutHolder,
		pageBreak: properties.page_break.toLowerCase(),
	};

	// here, in case this is being inputted into a multi column, will add the width of this element's column then push it into the specified column.

	if (properties.into_multi_column === true) {

		/* 		if (properties.this_column_width === "Fit available space") {
					tableObjectHolder.width = "*";
				} else {
					tableObjectHolder.width = "auto";
				} */


		if (properties.this_column_width === "Fit available space") {

			tableObjectHolder.width = "*";

		} else if (properties.this_column_width === "Fit content") {

			tableObjectHolder.width = "auto";

		} else if (properties.this_column_width === "Fixed width") {

			tableObjectHolder.width = properties.fixed_width_column_size;

		}





		// pushing into the multi column
		instance.data.multiColumnObjectHolder[`${properties.multi_column_name}`].columns.push(tableObjectHolder);

	} else if (properties.into_footer === true) {

		// here we push it into the footer
		instance.data.footerObjectsHolder.columns.push(tableObjectHolder);

	} else if (properties.into_header === true) {

		// here we push it into the header
		instance.data.headerObjectsHolder.columns.push(tableObjectHolder);

	} else if (properties.into_background === true) {

		// here we push it into the background
		instance.data.docDefinition.background.push(tableObjectHolder);

	} else {
		// here we push the object into the main document body

		instance.data.composeInMe.push(tableObjectHolder);
	}







}