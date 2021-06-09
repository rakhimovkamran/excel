import { storage } from "@core/utils";
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

export const initialState = storage("excel-state")
    ? normalize(storage("excel-state"))
    : defaultState;
