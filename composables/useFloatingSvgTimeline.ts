import {useFloatingSvgTimelineStore} from "~/composables/stores/floatingSvgTimeline";

export const useFloatingSvgTimeline = () => {
    const store = useFloatingSvgTimelineStore()

    const initialize = () => {
        store.initializeTimeline()

        return () => {
            store.killTimeline()
        }
    }

    const play = () => {
        store.playTimeline()
    }

    const reset = () => {
        store.resetTimeline()
    }

    return {
        store,

        initialize,
        play,
        reset,
    }
}