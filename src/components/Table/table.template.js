const CODES = {
    A: 65,
    Z: 90,
};

function toCol(content) {
    return /* html */ `
        <div class="column">${content}</div>
    `;
}

function toCell(content) {
    return /* html */ `
        <div class="cell" contenteditable>${content || ""}</div>
    `;
}

function createRow(index = "", content) {
    return /* html */ `
    <div class="row">
        <div class="row_info">${index}</div>
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

    const cells = new Array(colsCount).fill("").map(toCell).join("");

    for (let i = 1; i <= rowsCount; i++) {
        rows.push(createRow(i, cells));
    }

    return rows.join("");
}
