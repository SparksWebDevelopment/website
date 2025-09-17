import gsap from 'gsap'
import {useThreeScene} from "~/composables/useStarScene";
import {createScrollPromise} from "~/composables/scroll/useScrollPromise";

export interface NavigationConfig {
    autoHideDelay: number
    showDelay: number
    scrollerHeight: number
}

export const useSectionNavigationStore = defineStore('sectionNavigation', () => {
    // Reactive states
    const sections = ref<HTMLCollection | []>([])
    const currentSection = ref<number>(0)
    const isScrolling = ref<boolean>(false)
    const isVisible = ref<boolean>(false)

    // Configuration
    const config: NavigationConfig = {
        autoHideDelay: 3000,
        showDelay: 300,
        scrollerHeight: 70
    }

    // Getters
    const totalSections = computed(() => sections.value.length)
    const hasNextSection = computed(() => currentSection.value < totalSections.value - 1)
    const hasPreviousSection = computed(() => currentSection.value > 0)
    const isAtTop = computed(() => window?.scrollY === 0)
    const isAtBottom = computed(() =>
        window && window.scrollY + window.innerHeight >= document.body.scrollHeight
    )

    // Main actions
    function initializeSections() {
        const mainElement = document.querySelector('main')
        sections.value = mainElement?.children || []
    }

    async function navigateToSection(index: number) {
        if (index < 0 || index >= totalSections.value || isScrolling.value) return

        // Start scrolling
        isScrolling.value = true

        try {
            const scene = useThreeScene()
            const targetScrollY = window.innerHeight * index

            if (!scene.value) return

            // Camera positions regarding the section
            const zPositions: Record<number, number> = {
                0: 20,
                1: 10,
                2: 5,
            }

            const targetZ = zPositions[index]
            if (targetZ !== undefined) {
                // Animate camera from the star scene
                gsap.to(scene.value.camera.position, {
                    z: targetZ,
                    duration: 2,
                    ease: 'power2.out',
                })
            }

            currentSection.value = index
            _removeCursorActive()

            window.scrollTo({
                top: targetScrollY,
                behavior: 'smooth'
            })

            await createScrollPromise(targetScrollY)
        } finally {
            isScrolling.value = false
        }
    }

    function navigateNext() {
        if (hasNextSection.value && !isAtBottom.value) {
            navigateToSection(currentSection.value + 1)
        }
    }

    function navigatePrevious() {
        if (hasPreviousSection.value && !isAtTop.value) {
            navigateToSection(currentSection.value - 1)
        }
    }

    function show() {
        isVisible.value = true
    }

    function hide() {
        isVisible.value = false
    }

    // Utility functions
    function _removeCursorActive() {
        document.querySelector('.cursor')?.classList.remove('active')
    }


    function handleWheelScroll(e: WheelEvent) {
        if (Math.abs(e.deltaY) < 30) return

        if (e.deltaY > 0) {
            navigateNext()
        } else {
            navigatePrevious()
        }
    }

    function handleKeyboardNavigation(e: KeyboardEvent) {
        if (isScrolling.value) return

        switch (e.key) {
            case 'ArrowDown':
                navigateNext()
                break
            case 'ArrowUp':
                navigatePrevious()
                break
        }
    }

    // Manage cursor
    function setCursorState(isHovering: boolean, index: number) {
        const cursor = document.querySelector('.cursor')

        if (cursor && index !== currentSection.value) {
            cursor.classList.toggle('active', isHovering)
        }
    }

    return {
        // States
        sections: readonly(sections),
        currentSection: readonly(currentSection),
        isScrolling: readonly(isScrolling),
        isVisible: readonly(isVisible),
        config,

        // Getters
        totalSections,
        hasNextSection,
        hasPreviousSection,
        isAtTop,
        isAtBottom,

        // Actions
        initializeSections,
        navigateToSection,
        navigateNext,
        navigatePrevious,
        show,
        hide,
        handleWheelScroll,
        handleKeyboardNavigation,
        setCursorState
    }
})