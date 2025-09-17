import gsap from "gsap";

export const useFloatingSvgTimelineStore = defineStore('floatingSvgTimeline', () => {
    // Reactive states
    let timeline: gsap.core.Timeline | null = null;

    function initializeTimeline() {
        // setup initial timeline without playing it
        timeline = gsap.timeline({ paused: true })

        if (!timeline) return;

        gsap.set('.floating-svg', { scaleY: 0 })
        gsap.set('.code-lines', { opacity: 0 })

        timeline.to('.floating-svg', {
            scaleY: 1,
            duration: 0.4,
            ease: 'power1.inOut',
        })

        timeline.to('.code-lines', {
            opacity: 1,
            duration: 0.6,
            ease: 'power1.inOut',
        })
    }

    function playTimeline() {
        if (!timeline) return;

        timeline.play(0);
    }

    function resetTimeline() {
        if (!timeline) return;

        timeline.pause(0); // rembobine sans jouer
        gsap.set('.floating-svg', { rotationX: 0 });
        gsap.set('.code-lines', { opacity: 0 });
    }

    function killTimeline() {
        if (!timeline) return;

        timeline.kill();
    }

    return {
        // States
        timeline,

        // Actions
        initializeTimeline,
        playTimeline,
        resetTimeline,
        killTimeline
    }
})