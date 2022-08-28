import { ActionTypes } from "../constants/action-types";
const initialState = {
    merchants: [],
    eshopscz: []
}
export const lightningMapReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_MERCHANTS:
            return { ...state, merchants: payload };
        case ActionTypes.SET_ESHOPSCZ:
            return { ...state, eshopscz: payload };
        default:
            return state;
    }
}