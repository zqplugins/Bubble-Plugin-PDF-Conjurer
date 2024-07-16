function(instance, properties, context) {
    // Function to convert Unicode points to characters
    function convertUnicodeToChar(unicodeString) {
        return unicodeString.replace(/\\?U\+([0-9A-F]{4,6})/gi, (match, grp) => {
            return String.fromCodePoint(parseInt(grp, 16));
        });
    }

    instance.data.listConfiguration = [];

    if (!instance.data.BBcodeParser && properties.parse_bbcode) {
        function getParser(
            fontsDictionary,
            addImageIntoDictionary,
            errorHandler = () => {},
            codeLayout = { fillColor: () => '#23241f', vLineWidth: () => 0, hLineWidth: () => 0 },
            quoteLayout = { vLineWidth: () => 5, vLineColor: () => '#ccc', hLineWidth: () => 0, paddingLeft: () => 20 }
        ) {
            // Prototypes

            function convertToPDFMakeTable(bbCodeTable) {
                const tableRows = bbCodeTable.match(/\[tr\](.*?)\[\/tr\]/gs) || [];
                const tableData = [];

                tableRows.forEach((row) => {
                    const tableCells = row.match(/\[td\](.*?)\[\/td\]/gs) || [];
                    const rowData = [];

                    tableCells.forEach((cell) => {
                        const cellContent = cell.replace(/\[td\]|\[\/td\]/g, '');

                        const parsedCellContent = instance.data.BBcodeParserInternal.parseString(cellContent);
                        console.log("cell content is: ", cellContent)
                        console.log("parsed cell content is: ", parsedCellContent)

                        rowData.push({ text: parsedCellContent });
                    });

                    tableData.push(rowData);
                });

                const pdfmakeTable = {
                    table: {
                        body: tableData
                    }
                };

                return pdfmakeTable;
            }

            String.prototype.findClosingTag = function(tagType) {
                const tags = new Tags();

                const openingTagPattern = tags.isANotParameterizedTag(tagType)
                    ? Patterns.getNotParameterizedOpeningTag([tagType], 'g')
                    : Patterns.getOpeningTag([tagType], 'g');

                const closingTagPattern = Patterns.getClosingTag([tagType], 'g');

                const openingTagPositions = [...this.matchAll(openingTagPattern)].map((match) => match.index);

                const closingTagPositions = [...this.matchAll(closingTagPattern)].map((match) => match.index);

                if (closingTagPositions.length === 0 || openingTagPositions.length === 0) {
                    return -1;
                }

                if (closingTagPositions.length === 1 || openingTagPositions.length === 1) {
                    const [position] = closingTagPositions;
                    return position;
                }

                for (let position = 0; position < closingTagPositions.length; position++) {
                    if (openingTagPositions[position + 1] > closingTagPositions[position]) {
                        return closingTagPositions[position];
                    }
                }

                const lastPosition = closingTagPositions[closingTagPositions.length - 1];

                return lastPosition;
            };

            String.prototype.chopString = function(openingTagsPattern, hasClosingTag = true) {
                let string = String(this);

                let hasStyles = string.match(openingTagsPattern);

                if (!hasStyles) return string;

                const choppedString = [];

                while (hasStyles) {
                    const [tag, tagType] = hasStyles;
                    const { index: openingTagPosition } = hasStyles;

                    // If there is some text before the tag
                    if (openingTagPosition > 0) {
                        const firstStringPart = string.slice(0, openingTagPosition);
                        choppedString.push(firstStringPart);
                    }

                    const closingTagLength = hasClosingTag ? `[/${tagType}]`.length : 0;

                    const closingTagPosition = hasClosingTag ? string.findClosingTag(tagType) : -1;

                    if (hasClosingTag && closingTagPosition === -1) {
                        return [...choppedString, string];
                    }

                    // Calculate where the chop needs to stop
                    const endPosition = hasClosingTag ? closingTagPosition + closingTagLength : openingTagPosition + tag.length;

                    // Take the tag part of the string and put it into the array
                    const tagStringPart = string.slice(openingTagPosition, endPosition);
                    choppedString.push(tagStringPart);

                    // The rest of the string
                    const restStringPart = string.slice(endPosition);

                    // If there isn't a string rest part
                    if (!restStringPart) {
                        break;
                    } else {
                        string = restStringPart;
                        hasStyles = string.match(openingTagsPattern);

                        if (!hasStyles) choppedString.push(restStringPart);
                    }
                }

                return choppedString;
            };

            String.prototype.isOpenTagComeFirst = function(tag) {
                const tags = new Tags();

                const openTag = tags.isANotParameterizedTag(tag) ? `[${tag}]` : `[${tag}`;
                const closeTag = `[/${tag}]`;

                return this.indexOf(openTag) <= this.indexOf(closeTag);
            };

            String.prototype.isAListString = function() {
                return this.search(/^\[(?:ul|ol)(?:.*?)\]/s) !== -1;
                // return this.startsWith('[ul]') || this.startsWith('[ol]');
            };

            String.prototype.thereIsAList = function() {
                return this.search(/\[(?:ul|ol)(.*?)\]/s) !== -1;
                // return this.includes('[ul]') || this.includes('[ol]');
            };

            // Helpers

            class Tags {
                constructor() {
                    this.tags = {
                        styles: ['b', 'i', 'u', 's', 'sup', 'sub', 'font', 'color', 'size', 'url', 'email', 'highlight'],
                        media: ['img'],
                        list: ['ul', 'ol', 'li'],
                        title: ['h1', 'h2', 'h3', 'h4'],
                        extra: ['code', 'quote', 'table'],
                        alignment: ['left', 'center', 'right', 'justify'],
                        withoutClosing: ['hr'],
                    };
                }

                getAllTags(...except) {
                    const tags = Object.values(this.tags).flat();

                    return tags.filter((tag) => !except.includes(tag));
                }

                getBreakLineTags(...except) {
                    const { list, alignment, withoutClosing, title, extra, media } = this.tags;
                    const tags = [...list, ...alignment, ...withoutClosing, ...title, ...extra, ...media];

                    if (!except.includes('li')) except.push('li');

                    return tags.filter((tag) => !except.includes(tag));
                }

                getNotParameterizedTag(...except) {
                    const { styles, title, extra } = this.tags;
                    const tags = [...styles, ...title, ...extra];

                    except.push('font', 'color', 'size', 'url', 'email', 'highlight');

                    return tags.filter((tag) => !except.includes(tag));
                }

                isANotParameterizedTag(tag) {
                    return this.getNotParameterizedTag().includes(tag);
                }
            }

            class Patterns {
                static prepareTags(...tags) {
                    return tags.sort((a, b) => b.length - a.length).join('|');
                }

                static getOpeningTag(tagTypes, flags = '') {
                    const tags = Patterns.prepareTags(...tagTypes);
                    return new RegExp(`\\[(${tags})=?(.*?)\\]`, flags);
                }

                static getClosingTag(tagTypes, flags = '') {
                    const tags = Patterns.prepareTags(...tagTypes);
                    return new RegExp(`\\[\\/(${tags})\\]`, flags);
                }

                static getFullTag(tagTypes, flags = '') {
                    const tags = Patterns.prepareTags(...tagTypes);
                    return new RegExp(`^\\[(${tags})=?(.*?)\\](.*)\\[\\/\\1\\]$`, flags);
                }

                static getBreakLineBeforeTag(tagTypes, flags = '') {
                    const tags = Patterns.prepareTags(...tagTypes);
                    return new RegExp(`(?<=\\[\\/?(.*?)\\])\n+(?=\\[\\/?(?:${tags})\\])`, flags);
                }

                static getBreakLineAfterTag(tagTypes, flags = '') {
                    const tags = Patterns.prepareTags(...tagTypes);
                    return new RegExp(`(?<=\\[\\/?(?:${tags})\\])\n`, flags);
                }

                static getNotParameterizedOpeningTag(tagTypes, flags = '') {
                    const tags = Patterns.prepareTags(...tagTypes);
                    return new RegExp(`\\[(${tags})\\]`, flags);
                }
            }

            class ParserHelper {
                static pipe(functions, initialValue) {
                    return functions.reduce((a, fn) => fn(a), initialValue);
                }

                static getHEXColor(color) {
                    if (color.startsWith('rgb')) {
                        const [r, g, b] = color.match(/\d+/g).map(Number);

                        return [r, g, b].reduce((a, b) => a + b.toString(16).padStart(2, '0'), '#');
                    }
                    return color;
                }

                static generateRandomValues(length) {
                    const number = Math.floor(Math.random() * 10 ** length);

                    return String(number).padStart(length, '0');
                }

                static getImageProperties(value) {
                    const input = value.trim();

                    if (input.includes('x')) {
                        const [width, height] = input.split('x').map(Number);

                        const options = {};
                        if (width) options.width = width;
                        if (height) options.height = height;

                        return options;
                    } else {
                        const properties = input.split(' ').map((property) => {
                            const [key, value] = property.split('=');

                            return [key, Number(value)];
                        });

                        return Object.fromEntries(properties);
                    }
                }

                static getNewLineByTag(text, tag, value, options = {}) {
                    let newLine = {};

                    // Checking the closeTag type
                    switch (tag) {
                        case 'center':
                        case 'left':
                        case 'right':
                        case 'justify':
                            newLine = { text, ...options, alignment: tag };
                            break;

                        case 'size': {
                            const sizes = [10, 13, 16, 18, 24, 32, 48];

                            const size = Number(value);

                            newLine = { text, ...options, fontSize: sizes[size - 1] };
                            break;
                        }

                        case 'color': {
                            const color = ParserHelper.getHEXColor(value);
                            newLine = { text, ...options, color };
                            break;
                        }

                        case 'b': {
                            newLine = { text, ...options, bold: true };
                            break;
                        }

                        case 'i': {
                            newLine = { text, ...options, italics: true };
                            break;
                        }

                        case 'u': {
                            newLine = { text, ...options, decoration: 'underline' };
                            break;
                        }

                        case 's': {
                            newLine = { text, ...options, decoration: 'lineThrough' };
                            break;
                        }

                        case 'sup': {
                            const sup = { offset: '15%' };
                            newLine = { text, ...options, sup };
                            break;
                        }

                        case 'sub': {
                            const sub = { offset: '15%' };
                            newLine = { text, ...options, sub };
                            break;
                        }

                        case 'url': {
                            const link = value;

                            const decoration = 'underline';
                            const color = 'blue';

                            newLine = { text, ...options, link, decoration, color };
                            break;
                        }

                        case 'email': {
                            const email = value;

                            const link = 'mailto:' + email;
                            const decoration = 'underline';
                            const color = 'blue';

                            newLine = { text, ...options, link, decoration, color };
                            break;
                        }

                        case 'font': {
                            const font = value.replace(/\"/g, '');

                            if (fontsDictionary && fontsDictionary[font]) {
                                options.font = font;
                            } else {
                                const error = new Error(`Font not found: ${font}\nPlease check if the font was loaded before use it`);
                                errorHandler(error);
                            }

                            newLine = { text, ...options };
                            break;
                        }

                        case 'ul': {
                            newLine = { ul: text, ...options };
                            break;
                        }

                        case 'ol': {
                            newLine = { ol: text, ...options };
                            break;
                        }

                        case 'li': {
                            if (text.thereIsAList()) {
                                newLine = { stack: text, ...options };
                            } else {
                                newLine = { text, ...options };
                            }
                            break;
                        }

                        case 'table': {
                            let table = convertToPDFMakeTable(text);
                            newLine = table;
                            break;
                        }

                        case 'h1': {
                            newLine = { text, ...options, fontSize: 26 };
                            break;
                        }

                        case 'h2': {
                            newLine = { text, ...options, fontSize: 20 };
                            break;
                        }

                        case 'h3': {
                            newLine = { text, ...options, fontSize: 16 };
                            break;
                        }

                        case 'h4': {
                            newLine = { text, ...options, fontSize: 13 };
                            break;
                        }

                        case 'highlight': {
                            if (value.toLowerCase() === 'transparent') {
                                newLine = { text, ...options };
                            } else {
                                const background = ParserHelper.getHEXColor(value);
                                newLine = { text, ...options, background };
                            }
                            break;
                        }

                        case 'code': {
                            newLine = { text, ...options, color: '#c7254e' };
                            break;
                        }

                        case 'quote': {
                            const parser = new BBCodeParser();
                            const parsedText = parser.getParsedText(text);

                            newLine = {
                                layout: quoteLayout,
                                table: {
                                    widths: ['*'],
                                    body: [[{ text: parsedText }]],
                                },
                                ...options,
                            };
                            break;
                        }

                        case 'img': {
                            const link = text.startsWith('http') ? text : 'https:' + text;

                            const imageName = ParserHelper.generateRandomValues(8) + '-image-' + text.slice(text.lastIndexOf('/') + 1);

                            if (typeof addImageIntoDictionary === 'function') {
                                addImageIntoDictionary(imageName, link);
                            }

                            const imgProperties = ParserHelper.getImageProperties(value);

                            newLine = { image: imageName, ...options, ...imgProperties };
                            break;
                        }
                    }

                    return newLine;
                }

                static getOutsiderLineStyles(line, pattern, previousOptions = {}) {
                    let { text, ol, ul, ...lineOptions } = line;

                    if (typeof line === 'string') lineOptions = {};

                    const targetString = text || ol || ul || line;
                    const options = { ...previousOptions, ...lineOptions };

                    let lineType = 'text';
                    if (ul) lineType = 'ul';
                    if (ol) lineType = 'ol';

                    if (typeof targetString !== 'string') return line;

                    const hasStyles = targetString.match(pattern);

                    if (!hasStyles) return { [lineType]: targetString, ...options };

                    const [match, tagType, value, innerText] = hasStyles;

                    if (innerText.isOpenTagComeFirst(tagType)) {
                        const newLine = ParserHelper.getNewLineByTag(innerText, tagType, value, options);

                        if (targetString.isAListString()) return newLine;

                        return ParserHelper.getOutsiderLineStyles(newLine, pattern);
                    }

                    return { [lineType]: targetString, ...options };
                }

                static getInsiderLineStyles(line, openingTagsPattern, outsiderTagPattern) {
                    let { text, ul, ol, stack, ...options } = line;

                    if (typeof line === 'string') options = {};

                    const targetString = text || ol || ul || stack || line;

                    let lineType = 'text';
                    if (ul) lineType = 'ul';
                    if (ol) lineType = 'ol';
                    if (stack) lineType = 'stack';

                    if (typeof targetString !== 'string') return line;

                    const hasStyles = targetString.match(openingTagsPattern);

                    if (!hasStyles) return { [lineType]: targetString, ...options };

                    // Verify if there's the closing tag
                    const [match, tag] = hasStyles;
                    const closingTagPattern = Patterns.getClosingTag([tag]);

                    // If the closing tag is not found, to avoid infinite recursion we break the flow here
                    const hasClosingTag = targetString.match(closingTagPattern);

                    if (!hasClosingTag) return { [lineType]: targetString, ...options };

                    // If it's a stack item first break the internal lists then break the styles
                    const listsOpeningTagsPattern = Patterns.getOpeningTag(['ul', 'ol']);

                    const stringArray = !stack
                        ? targetString.chopString(openingTagsPattern)
                        : targetString.chopString(listsOpeningTagsPattern);

                    const resultingLine = stringArray
                        .map((item) => ParserHelper.getOutsiderLineStyles(item, outsiderTagPattern, options))
                        .map((item) => ParserHelper.getInsiderLineStyles(item, openingTagsPattern, outsiderTagPattern));

                    return { [lineType]: resultingLine, ...options };
                }

                static fixOlListsHelper(element) {
                    const { ol, ...options } = element;

                    let list = ol || element;

                    if (!list || !(list instanceof Array) || !list.some(({ ol }) => Boolean(ol))) return element;

                    const newList = [];

                    let test = true;

                    while (test) {
                        const listIndex = list.findIndex(({ ol }) => Boolean(ol));

                        if (listIndex > 1) {
                            newList.push(...list.slice(0, listIndex - 1));
                        }

                        const previousItem = list[listIndex - 1];
                        const item = list[listIndex];

                        newList.push({ stack: [previousItem, ParserHelper.fixOlListsHelper(item)] });

                        const listRest = list.slice(listIndex + 1);

                        test = listRest.some(({ ol }) => Boolean(ol));
                        list = listRest;

                        if (!test) newList.push(...listRest);
                    }

                    return { ol: newList, ...options };
                }
            }

            // Parser

            class BBCodeParser {
                constructor() {
                    this.functions = [
                        this.prepareContent,
                        this.breakLineTagsHandler,
                        this.horizontalRuleTagHandler,
                        this.horizontalRuleTagParser,
                        this.outsiderStylesParser,
                        this.insiderStylesParser,
                        this.fixOlLists,
                    ].map((fn) => fn.bind(this));

                    this.tags = new Tags();
                }

                prepareContent(contents = '') {
                    if (!contents || typeof contents !== 'string') {
                        return '';
                    }

                    const tags = [...this.tags.getBreakLineTags(), 'li'];

                    const beforeTags = Patterns.getBreakLineBeforeTag(['ul', 'ol', 'li'], 'g');
                    const afterTags = Patterns.getBreakLineAfterTag(tags, 'g');

                    contents = contents.replace(/\[ml\]/g, '');
                    contents = contents.replace(/\[\/ml\]/g, '\n');

                    contents = contents.replace(/\n\[\/(center|justify|right|code)\]/g, (match, tag) => `[/${tag}]\n`);

                    contents = contents.replace(/\[\/quote\]/g, (match) => match + '\n');

                    contents = contents.replace(afterTags, '');
                    contents = contents.replace(beforeTags, (match, tag) => {
                        if (tags.includes(tag)) return match;

                        return match.replace(/\n/, '');
                    });

                    return contents;
                }

                breakLineTagsHandler(contents) {
                    if (!contents) return [];

                    const breakLineTags = this.tags.getBreakLineTags('hr');
                    const openingTagPattern = Patterns.getOpeningTag(breakLineTags);

                    const result = contents.chopString(openingTagPattern);

                    if (typeof result === 'string') return [result];

                    return result;
                }

                horizontalRuleTagHandler(contents) {
                    const openingTagPattern = Patterns.getOpeningTag(['hr']);

                    return contents.map((line) => line.chopString(openingTagPattern, false)).flat();
                }

                horizontalRuleTagParser(contents) {
                    return contents.map((line) => {
                        if (line !== '[hr]') return line;
                        return { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] };
                    });
                }

                outsiderStylesParser(contents) {
                    const tags = this.tags.getAllTags('hr');
                    const pattern = Patterns.getFullTag(tags, 's');

                    return contents.map((line) => ParserHelper.getOutsiderLineStyles(line, pattern));
                }

                insiderStylesParser(contents) {
                    const tags = this.tags.getAllTags('hr');

                    const openingTagPattern = Patterns.getOpeningTag(tags);
                    const outsiderTagPattern = Patterns.getFullTag(tags, 's');

                    return contents.map((line) => ParserHelper.getInsiderLineStyles(line, openingTagPattern, outsiderTagPattern));
                }

                fixOlLists(contents) {
                    return contents.map(ParserHelper.fixOlListsHelper);
                }

                getParsedText(text) {
                    // Convert Unicode points to actual characters before processing
                    text = convertUnicodeToChar(text);
                    return ParserHelper.pipe(this.functions, text);
                }
            }

            return new BBCodeParser();
        }

        const parser = getParser(
            pdfMake.fonts,
            (imageName, link) => {
                instance.data.docDefinition.images[imageName] = link;
            },
            (err) => {
                context.reportDebugger(err.message);
            }
        );

        // Previous code
        class BBcodeInterpreter {
            parseString(string) {
                let result = parser.getParsedText(string);
                console.log("BBcodeInterpreter parseString result:", JSON.stringify(result));
                return result;
            }
        }

        const createParser = () => {
            return new BBcodeInterpreter();
        }

        // Initialize the parser using the builder pattern
        instance.data.BBcodeParser = createParser();
        instance.data.BBcodeParserInternal = createParser();
    }

    const getList = (thingWithList, startPosition, finishPosition) => {
        let returnedList = thingWithList.get(startPosition, finishPosition);
        return returnedList;
    }

    // composeInMe is an array of objects and we push a new object into it, each object is an element created in the pdf

    // here we bring it into existence if it doesn't exist yet
    if (instance.data.composeInMe === undefined) {
        instance.data.composeInMe = [];
    }
    let parsedText = [];
    if (properties.parse_bbcode) {
        properties.inputtedText = convertUnicodeToChar(properties.inputtedText);
        parsedText = instance.data.BBcodeParser.parseString(properties.inputtedText);
        console.log("Raw parsed text:", JSON.stringify(parsedText));
    }

    // Capture whatever the user (app maker) has inputted into the workflow actions into an object

    if (properties.textStyles === undefined || properties.textStyles === null) {
        properties.textStyles = "";
    }
    let definedStyleForText = properties.textStyles.replaceAll(/\W/g, ''); // Small regex to remove any undesirable characters from style name inputted by app maker

    let txtCustomMarginsDefinitionLogic = () => {
        if (properties.text_custom_margins === true) {
            return [properties.left_margin, properties.top_margin, properties.right_margin, properties.bottom_margin];
        } else { return null; } // Function to allow to set custom margins or ignore it and use default ones
    };

    let textObjectHolder = {
        style: `${definedStyleForText.toLowerCase()}`,
        margin: txtCustomMarginsDefinitionLogic(),
        pageBreak: properties.page_break.toLowerCase(),
    };

    if (properties.parse_bbcode) {
        if (Array.isArray(parsedText[0].text)) {
            textObjectHolder.text = parsedText[0].text;
        } else if(!!parsedText){
            textObjectHolder.stack = parsedText;
        } else {
            textObjectHolder.text = properties.inputtedText;
        }
    } else {
        textObjectHolder.text = properties.inputtedText;
    }

    console.log("Final textObjectHolder:", JSON.stringify(textObjectHolder));
    // Here, in case this is being inputted into a multi-column, will add the width of this element's column then push it into the specified column.

    if (properties.into_multi_column === true && (typeof properties.repeating_structure_name === "undefined" || properties.repeating_structure_name === null)) {

        if (properties.this_column_width === "Fit available space") {
            textObjectHolder.width = "*";
        } else if (properties.this_column_width === "Fit content") {
            textObjectHolder.width = "auto";
        } else if (properties.this_column_width === "Fixed width") {
            textObjectHolder.width = properties.fixed_width_column_size;
        }

        // Pushing into the multi-column
        instance.data.multiColumnObjectHolder[`${properties.multi_column_name}`].columns.push(textObjectHolder);

    } else if (properties.into_footer === true) {
        // Here we push it into the footer
        instance.data.footerObjectsHolder.columns.push(textObjectHolder);

    } else if (properties.into_header === true) {
        // Here we push it into the header
        instance.data.headerObjectsHolder.columns.push(textObjectHolder);

    } else if (properties.into_background === true) {
        // Here we push it into the background
        instance.data.docDefinition.background.push(textObjectHolder);

        // Repeating structure flow
    } else if (typeof properties.repeating_structure_name !== "undefined" && properties.repeating_structure_name) {
        if (!instance.data.repeatingStructureObjectsHolder) {
            instance.data.repeatingStructureObjectsHolder = {};
        }
        if (!instance.data.repeatingStructureObjectsHolder[properties.repeating_structure_name]) {
            instance.data.repeatingStructureObjectsHolder[properties.repeating_structure_name] = {
                elements: [],
                howManyIterations: 1  // You might want to set this to a different value based on your needs
            };
        }

        if (typeof properties.text_list !== "undefined" && properties.text_list) {
            let listOfTexts = getList(properties[`text_list`], 0, properties[`text_list`].length());

            let thisElementSeries = [];

            for (let i = 0; i < instance.data.repeatingStructureObjectsHolder[`${properties.repeating_structure_name}`].howManyIterations; i++) {
                let currentTextObjectHolder = {
                    text: `${listOfTexts[i]}`,
                    style: `${definedStyleForText.toLowerCase()}`,
                    margin: txtCustomMarginsDefinitionLogic(),
                    pageBreak: properties.page_break.toLowerCase(),
                };

                if (properties.parse_bbcode) {
                    currentTextObjectHolder.text = instance.data.BBcodeParser.parseString(currentTextObjectHolder.text)[0].text;
                }

                // Being inserted into a repeated multi-column
                if (properties.into_multi_column === true) {
                    if (properties.this_column_width === "Fit available space") {
                        currentTextObjectHolder.width = "*";
                    } else if (properties.this_column_width === "Fit content") {
                        currentTextObjectHolder.width = "auto";
                    } else if (properties.this_column_width === "Fixed width") {
                        currentTextObjectHolder.width = properties.fixed_width_column_size;
                    }

                    instance.data.repeatingStructureObjectsHolder[`${properties.repeating_structure_name}`][`${properties.multi_column_name}`][i].columns.push(currentTextObjectHolder);
                } else {
                    thisElementSeries.push(currentTextObjectHolder);
                }
            }

            if (properties.into_multi_column === false) {
                instance.data.repeatingStructureObjectsHolder[`${properties.repeating_structure_name}`].elements.push(thisElementSeries);
            }
        } else {
            let thisElementSeries = [];

            for (let i = 0; i < instance.data.repeatingStructureObjectsHolder[`${properties.repeating_structure_name}`].howManyIterations; i++) {
                let currentTextObjectHolder = {
                    text: `${properties.inputtedText}`,
                    style: `${definedStyleForText.toLowerCase()}`,
                    margin: txtCustomMarginsDefinitionLogic(),
                    pageBreak: properties.page_break.toLowerCase(),
                };

                if (properties.parse_bbcode) {
                    currentTextObjectHolder.text = instance.data.BBcodeParser.parseString(currentTextObjectHolder.text)[0].text;
                }

                // Being inserted into a repeated multi-column
                if (properties.into_multi_column === true) {
                    instance.data.repeatingStructureObjectsHolder[`${properties.repeating_structure_name}`][`${properties.multi_column_name}`][i].columns.push(currentTextObjectHolder);
                } else {
                    thisElementSeries.push(currentTextObjectHolder);
                }
            }

            if (properties.into_multi_column === false) {
                instance.data.repeatingStructureObjectsHolder[`${properties.repeating_structure_name}`].elements.push(thisElementSeries);
            }
        }

        console.log("Added to repeating structure:", JSON.stringify(instance.data.repeatingStructureObjectsHolder));
    } else {
        // This is the case for non-repeating structures
        instance.data.composeInMe.push(textObjectHolder);
        console.log("Added to composeInMe:", JSON.stringify(instance.data.composeInMe));
    }

    console.log("Final state:", JSON.stringify({
        composeInMe: instance.data.composeInMe,
        repeatingStructureObjectsHolder: instance.data.repeatingStructureObjectsHolder
    }));

}
