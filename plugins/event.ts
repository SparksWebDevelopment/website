import mitt, {type Emitter, type EventType} from 'mitt'

export default defineNuxtPlugin(() => {
    const emitter: Emitter<Record<EventType, any>> = mitt();

    return {
        provide: {
            event: emitter.emit,
            listen: emitter.on
        }
    };
})