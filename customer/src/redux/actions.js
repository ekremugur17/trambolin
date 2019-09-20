/* SETTINGS */
export const CHANGE_LOCALE = "CHANGE_LOCALE";


/* MENU */
export const MENU_SET_CLASSNAMES = "MENU_SET_CLASSNAMES";
export const MENU_CONTAINER_ADD_CLASSNAME = "MENU_CONTAINER_ADD_CLASSNAME";
export const MENU_CLICK_MOBILE_MENU = "MENU_CLICK_MOBILE_MENU";
export const MENU_CHANGE_DEFAULT_CLASSES = "MENU_CHANGE_DEFAULT_CLASSES";
export const MENU_CHANGE_HAS_SUB_ITEM_STATUS = "MENU_CHANGE_HAS_SUB_ITEM_STATUS";


/* ALERT */
export const SET_ALERT = "SET_ALERT";
export const REMOVE_ALERT = "REMOVE_ALERT";
export const CLEAR_ALERTS = "CLEAR_ALERTS";


/* AUTH */
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const AUTH_ERROR = 'AUTH_ERROR';
export const USER_LOADED = 'USER_LOADED';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const ADD_STAFF_FAIL = 'ADD_STAFF_FAIL';
export const ADD_STAFF_SUCCESS = 'ADD_STAFF_SUCCESS';




export * from "./auth/actions";
export * from "./alert/actions";
export * from "./menu/actions";
export * from "./settings/actions";