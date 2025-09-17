import {useSectionNavigationStore} from "~/composables/stores/sectionNavigation";

export const useSectionNavigation = () => {
    const store = useSectionNavigationStore()

    let autoHideTimer: NodeJS.Timeout | null = null

    // Function to start the auto-hide timer
    const startAutoHideTimer = () => {
        clearAutoHideTimer()
        autoHideTimer = setTimeout(() => {
            store.hide()
        }, store.config.autoHideDelay)
    }

    const clearAutoHideTimer = () => {
        if (autoHideTimer) {
            clearTimeout(autoHideTimer)
            autoHideTimer = null
        }
    }

    const showWithAutoHide = () => {
        store.show()
        startAutoHideTimer()
    }

    // Event listeners setup
    const setupEventListeners = () => {
        // Scroll wheel
        const handleWheel = (e: WheelEvent) => {
            showWithAutoHide()
            store.handleWheelScroll(e)
        }

        // Keyboard navigation
        const handleKeydown = (e: KeyboardEvent) => {
            if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
                showWithAutoHide()
                store.handleKeyboardNavigation(e)
            }
        }

        window.addEventListener('wheel', handleWheel, { passive: true })
        window.addEventListener('keydown', handleKeydown)

        // Cleanup function
        return () => {
            window.removeEventListener('wheel', handleWheel)
            window.removeEventListener('keydown', handleKeydown)
            clearAutoHideTimer()
        }
    }

    // Init composable
    const initialize = () => {
        store.initializeSections()

        // Show the section navigation with a delay
        setTimeout(() => {
            showWithAutoHide()
        }, store.config.showDelay)

        return setupEventListeners()
    }

    // Hover handler for the container
    const handleContainerHover = {
        enter: () => clearAutoHideTimer(),
        leave: () => startAutoHideTimer()
    }

    return {
        store,
        initialize,
        handleContainerHover,
        showWithAutoHide,
        clearAutoHideTimer,
    }
}