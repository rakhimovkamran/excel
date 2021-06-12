import { range } from "@core/utils/utils";

export function shouldResize(event) {
    return event.target.dataset.resize;
}

export function isCell(event) {
    return event.target.dataset.type === "cell";
}

export function matrix($current, $target) {
    const current = $current.id(true);
    const target = $target.id(true);

    const cols = range(current.col, target.col);
    const rows = range(current.row, target.row);

    return cols.reduce((acc, col) => {
        rows.forEach((row) => acc.push(`${row}:${col}`));
        return acc;
    }, []);
}

export function nextSelector(key, { col, row }) {
    const MIN_ROW_VALUE = 1;
    const MIN_COL_VALUE = 0;

    switch (key) {
        case "Enter":
        case "ArrowDown":
            row++;
            break;

        case "Tab":
        case "ArrowRight":
            col++;
            break;

        case "ArrowLeft":
            col = col - 1 < MIN_COL_VALUE ? MIN_COL_VALUE : col - 1;
            break;
        case "ArrowUp":
            row = row - 1 < MIN_ROW_VALUE ? MIN_ROW_VALUE : row - 1;
            break;
    }

    return `[data-id="${row}:${col}"]`;
}
