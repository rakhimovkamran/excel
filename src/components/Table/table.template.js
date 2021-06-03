const CODES = {
    A: 65,
    Z: 90,
};

function toCol(content, index) {
    return /* html */ `
        <div class="column" data-type="resizable" data-col="${index}">
            ${content}
            <div class = "column_resize" data-resize="col"></div>
        </div>
    `;
}

function toCell(row) {
    return function (_, col) {
        return /* html */ `
            <div 
                class="cell" 
                contenteditable 
                data-type="cell"
                data-col="${col}"
                data-row="${row}"
                data-id="${row}:${col}">
                
            </div>
        `;
    };
}

function createRow(index = "", content) {
    const resize = index
        ? /* html */ `<div class = "row_info-resize" data-resize="row"></div>`
        : "";

    return /* html */ `
    <div class="row" data-type="resizable">
        <div class="row_info">
            ${index}
            ${resize}
        </div>
        <div class="row_data">${content}</div>
    </div>
`;
}

function toChar(_, _idx) {
    return String.fromCharCode(CODES.A + _idx);
}

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1;

    const rows = [];

    const cols = new Array(colsCount).fill("").map(toChar).map(toCol).join("");
    rows.push(createRow("", cols));

    for (let i = 1; i <= rowsCount; i++) {
        const cells = new Array(colsCount).fill("").map(toCell(i)).join("");
        rows.push(createRow(i, cells));
    }

    return rows.join("");
}
