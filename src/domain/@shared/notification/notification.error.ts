import {NotificationErrorProps} from "./notication";

export default class NotificationError extends Error {
    constructor(public errors: NotificationErrorProps[]) {
        super();
    }
}