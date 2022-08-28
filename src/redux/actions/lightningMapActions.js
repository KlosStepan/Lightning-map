import { ActionTypes } from "../constants/action-types";

export const setMerchants = (merchants) => {
    return {
        type: ActionTypes.SET_MERCHANTS,
        payload: merchants
    };
};
export const setEshopscz = (eshopscz) => {
    return {
        type: ActionTypes.SET_ESHOPSCZ,
        payload: eshopscz
    };
};