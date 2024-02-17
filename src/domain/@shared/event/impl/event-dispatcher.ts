import EventDispatcherInterface from "../interface/event-dispatcher.interface";
import EventInterface from "../interface/event.interface";
import EventHandlerInterface from "../interface/event-handler.interface";

export default class EventDispatcher implements EventDispatcherInterface {

    private eventHandlers: { [eventName: string]: EventHandlerInterface[]; } = {};

    get getEventHandlers(): { [eventName: string]: EventHandlerInterface[]; } {
        return this.eventHandlers;
    }

    register(eventName: string, eventHandler: EventHandlerInterface): void {
        if (!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
        }
        this.eventHandlers[eventName].push(eventHandler);
    }

    unregister(eventName: string, eventHandler: EventHandlerInterface): void {
        if (!this.eventHandlers[eventName]) {
            return;
        }

        const index = this.eventHandlers[eventName].indexOf(eventHandler);
        if (index !== -1) {
            this.eventHandlers[eventName].splice(index, 1);
        }
    }

    unregisterAll(): void {
        this.eventHandlers = {};
    }

    notify(event: EventInterface): void {
        const eventName = event.constructor.name;
        if (!this.eventHandlers[eventName]) {
            return;
        }

        this.eventHandlers[eventName].forEach((eventHandler: EventHandlerInterface) => {
            eventHandler.handle(event);
        });
    }

}