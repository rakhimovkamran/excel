import { toInlineStyles } from "@core/utils/utils";
import { defaultStyles } from "@/constants";
import { parse } from "@core/utils/parse";

const CODES = {
    A: 65,
    Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function getWidth(state, index) {
    return (state[index] || DEFAULT_WIDTH) + "px";
}

function getHeight(state, index) {
    return (state[index] || DEFAULT_HEIGHT) + "px";
}

function toCol({ content, index, width }) {
    return /* html */ `
        <div class="column"
         data-type="resizable" 
         data-col="${index}" 
         style="width: ${width}">
            ${content}
            <div class = "column_resize" data-resize="col"></div>
        </div>
    `;
}

function toCell(state, row) {
    return function (_, col) {
        const id = `${row}:${col}`;
        const width = getWidth(state.colState, col);
        const content = state.dataState[id] || "";

        const styles = toInlineStyles({
            ...defaultStyles,
            ...state.stylesState[id],
        });

        return /* html */ `
            <div 
                class="cell" 
                contenteditable 
                data-type="cell"
                data-col="${col}"
                data-row="${row}"
                data-id="${id}"
                data-value="${content || ""}"
                style="${styles}; width: ${width}"
                >
                ${parse(content) || ""}
            </div>
        `;
    };
}

function createRow(index = "", content, state) {
    const resize = index
        ? /* html */ `<div class = "row_info-resize" data-resize="row"></div>`
        : "";

    const height = getHeight(state, index);

    return /* html */ `
    <div class="row" data-row="${index}" 
    style="height: ${height}" data-type="resizable">
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

function widthFrom(state) {
    return function (content, index) {
        return {
            content,
            index,
            width: getWidth(state.colState, index),
        };
    };
}

export function createTable(rowsCount = 15, state = {}) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];

    const cols = new Array(colsCount)
        .fill("")
        .map(toChar)
        .map(widthFrom(state))
        .map(toCol)
        .join("");
    rows.push(createRow("", cols, {}));

    for (let i = 1; i <= rowsCount; i++) {
        const cells = new Array(colsCount)
            .fill("")
            .map(toCell(state, i))
            .join("");
        rows.push(createRow(i, cells, state.rowState));
    }

    return rows.join("");
}
