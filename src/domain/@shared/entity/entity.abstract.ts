import Notification from "../notification/notication";

export default abstract class Entity {
    protected id: string;
    protected notification: Notification;

    constructor() {
        this.notification = new Notification();
    }
}