import { $ } from "@core/DOM";

export function resizeHandler($root, event) {
    return new Promise((resolve) => {
        const type = event.target.dataset.resize;
        const $resizer = $(event.target);

        const $parent = $resizer.closest('[data-type="resizable"]');
        const parentCoords = $parent.getCoords();

        $resizer.css({
            opacity: 1,
            [type === "col" ? "bottom" : "right"]: "-5000px",
        });

        let delta;
        let value;

        document.onmousemove = (e) => {
            delta =
                type === "row"
                    ? e.pageY - parentCoords.bottom
                    : e.pageX - parentCoords.right;

            value =
                type === "row"
                    ? parentCoords.height + delta
                    : parentCoords.width + delta;

            $resizer.css({
                [type === "col" ? "right" : "bottom"]: -delta + "px",
            });
        };

        document.onmouseup = () => {
            $resizer.css({
                opacity: 0,
                bottom: 0,
                right: 0,
            });

            type === "row"
                ? $parent.css({ height: value + "px" })
                : $parent.css({ width: value + "px" });

            type === "col" &&
                $root
                    .findAll(`[data-col="${$parent.data.col}"]`)
                    .forEach((c) => $(c).css({ width: value + "px" }));

            resolve({
                value,
                type,
                id: $parent.data[type],
            });

            document.onmousemove = null;
        };
    });
}
