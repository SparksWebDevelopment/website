// Track scroll animation in a promise
export function createScrollPromise(targetY: number): Promise<void> {
    return new Promise((resolve) => {
        const startY = window.scrollY
        const distance = Math.abs(targetY - startY)

        // Estimated scroll time
        const scrollDuration = Math.min(Math.max(distance / 1000 * 500, 300), 1000)

        let scrollTimeout: NodeJS.Timeout
        let lastScrollY = startY
        let scrollEndTimer: NodeJS.Timeout

        const checkScrollEnd = () => {
            const currentY = window.scrollY

            // Check if scroll is stopped
            if (Math.abs(currentY - targetY) < 5 || currentY === lastScrollY) {
                clearTimeout(scrollTimeout)
                clearTimeout(scrollEndTimer)
                resolve()
            } else {
                lastScrollY = currentY
                scrollEndTimer = setTimeout(checkScrollEnd, 50)
            }
        }

        // Timeout fallback in case
        scrollTimeout = setTimeout(() => {
            clearTimeout(scrollEndTimer)
            resolve()
        }, scrollDuration + 200)

        // Start checking
        setTimeout(checkScrollEnd, 100)
    })
}