export class TableSelection {
    static className = "selected";

    constructor() {
        this.group = [];
        this.current = null;
    }

    clear() {
        this.group.forEach(($c) => $c.removeClass(TableSelection.className));
        this.group = [];
    }

    // $element instanceof DOM === true
    select($element) {
        this.clear();

        this.group.push($element);
        $element.focus().addClass(TableSelection.className);

        this.current = $element;
    }

    selectGroup($group = []) {
        this.clear();
        this.group = $group;

        this.group.forEach(($element) =>
            $element.addClass(TableSelection.className)
        );
    }

    applyStyle(style) {
        this.group.forEach(($element) => {
            $element.css(style);
        });
    }

    get selectedIds() {
        return this.group.map(($element) => $element.id());
    }
}
