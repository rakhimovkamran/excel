import { clone } from "@core/utils/utils";
import { defaultStyles } from "@/constants";

const defaultState = {
    title: "New Table",

    rowState: {},
    colState: {},

    dataState: {},
    currentText: "",

    stylesState: {},
    currentStyles: defaultStyles,
};

const normalize = (state) => {
    return {
        ...state,
        currentStyles: defaultStyles,
        currentText: "",
    };
};

export const normalizeInitialState = (state) => {
    return state ? normalize(state) : clone(defaultState);
};
