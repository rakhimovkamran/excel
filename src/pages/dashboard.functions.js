import { storage } from "@core/utils";

function toHTML(key) {
    const id = key.split(":")[1];
    const dateCreated = new Date(+id);
    const model = storage(key);

    return `
        <li class="dashboard__record">
          <a href="#excel/${id}">${model.title}</a>
          <strong>
                ${dateCreated.toLocaleDateString()}
                ${dateCreated.toLocaleTimeString()}
          </strong>
        </li>
    `;
}

// excel:23422
function getAllKeys() {
    const keys = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key.includes("excel")) {
            continue;
        }

        keys.push(key);
    }

    return keys;
}

export function createRecordsTable() {
    const keys = getAllKeys();

    if (!keys.length) {
        return `<div style="width:100%;
        height:50vh;font-size: 2em;
        display: flex;justify-content: center
        ;align-items: center">No items yet.</div>`;
    }

    return `
         <div class="dashboard__list-header">
            <span>Name</span>
            <span>Last opened</span>
         </div>

         <ul class="dashboard__list">
            ${keys.map(toHTML).join("")}
         </ul>
    `;
}
