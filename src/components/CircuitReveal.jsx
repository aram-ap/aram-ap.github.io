import React, { useState, useEffect, useMemo, useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence, useReducedMotion, useMotionValue, useTransform, animate } from "framer-motion";

/**
 * CircuitReveal - Animated circuit board overlay for page transitions
 * Creates an immersive loading experience with animated circuit traces and pulses
 * Features: responsive design, reduced motion support, Safari compatibility
 */

// Full-screen overlay that covers the entire viewport during animation
const CircuitOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: #0A0A0F;
  z-index: 9999;
  overflow: hidden;
  pointer-events: none;
  transform-origin: center;
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
`;

// SVG container that holds the circuit board visualization
const CircuitSVG = styled.svg`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
`;

// Styled path for circuit traces with customizable stroke properties
const CircuitTrace = styled(motion.path)`
  stroke: ${(props) => props.color};
  stroke-width: ${(props) => props.strokeWidth || "2"};
  fill: none;
  stroke-linecap: square;
  stroke-linejoin: miter;
  opacity: ${(props) => props.opacity || "0.9"};
`;

// Animated circles that travel along traces to simulate electrical pulses
const PulseCircle = styled(motion.circle)`
  fill: #fff;
  filter: blur(2px) brightness(1.5);
`;

// Rectangular components representing IC chips and other circuit elements
const ComponentPad = styled(motion.rect)`
  fill: ${(props) => props.fill || "#1a2744"};
  stroke: ${(props) => props.stroke || "#4a9eff"};
  stroke-width: 1;
`;

// Circular vias that connect different layers of the circuit board
const Via = styled(motion.circle)`
  fill: #0a0e27;
  stroke: #4a9eff;
  stroke-width: 1.5;
`;

// SVG-based glow effect for the main IC (non-Safari browsers)
const ICGlowMask = styled(motion.rect)`
  fill: #ffffff;
  pointer-events: none;
`;

// HTML-based fallback glow for Safari browsers (better CSS filter support)
const SafariGlow = styled(motion.div)`
  position: absolute;
  background: #ffffff;
  pointer-events: none;
  border-radius: 10%;
  z-index: -1;
`;

// Wrapper for the main content that gets revealed after animation
const ContentWrapper = styled(motion.div)`
  position: relative;
  z-index: 1;
`;

// Utility function to throttle resize events for performance
const throttle = (fn, limit = 100) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const CircuitReveal = ({ onComplete, children }) => {
    // Animation state management
    const [phase, setPhase] = useState("in");
    const [isAnimating, setIsAnimating] = useState(true);
    const [revealContent, setRevealContent] = useState(false);
    const [icGlow, setIcGlow] = useState(false);
    
    // Motion values for smooth animations
    const shouldReduceMotion = useReducedMotion();
    const scale = useMotionValue(1);
    const overlayOpacity = useMotionValue(1);
    
    // Refs for DOM manipulation
    const svgRef = useRef(null);
    const mainChipRef = useRef(null);
    const [glowPosition, setGlowPosition] = useState(null);

    // Detect Safari browser for fallback glow implementation
    const isSafari = useMemo(() => {
        if (typeof navigator === 'undefined') return false;
        const ua = navigator.userAgent;
        return /Safari/i.test(ua) && !/Chrome/i.test(ua);
    }, []);

    // Motion value for controlling the IC glow animation
    const icBloomProgress = useMotionValue(0);

    // Animate the IC glow when triggered
    useEffect(() => {
        if (icGlow) {
            icBloomProgress.set(0);
            animate(icBloomProgress, 1, { duration: 1.8, ease: [0.3, 0.6, 0.2, 1] });
        }
    }, [icGlow]);

    // Transform motion values for glow effects
    const icFilter = useTransform(icBloomProgress, (t) => `drop-shadow(0 0 ${6 + 16 * t}px rgba(255,255,255,${0.35 * t}))`);
    const icGlowScale = useTransform(icBloomProgress, [0, 1], [1.02, 1.15]);
    const icGlowFilter = useTransform(icBloomProgress, (t) => `blur(${8 + 12 * t}px)`);

    // Apply filter only on non-Safari browsers
    const chipFilter = useTransform([icFilter], (v) => (isSafari ? 'none' : v[0]));

    // Lock scroll during animation to prevent interference
    useLayoutEffect(() => {
        if (isAnimating) {
            const scrollY = window.scrollY;
            const scrollX = window.scrollX;

            const style = document.createElement('style');
            style.id = 'circuit-reveal-lock';
            style.textContent = `
        html, body {
          overflow: hidden !important;
          position: fixed !important;
          width: 100% !important;
          height: 100% !important;
          top: ${-scrollY}px !important;
          left: ${-scrollX}px !important;
        }
      `;
            document.head.appendChild(style);

            return () => {
                const lockStyle = document.getElementById('circuit-reveal-lock');
                if (lockStyle) {
                    lockStyle.remove();
                    window.scrollTo(scrollX, scrollY);
                }
            };
        }
    }, [isAnimating]);

    // Phase-based animation timing control
    useEffect(() => {
        if (phase === "in") {
            const duration = shouldReduceMotion ? 500 : 2500;
            const timer = setTimeout(() => setPhase("pause"), duration + 300);
            return () => clearTimeout(timer);
        } else if (phase === "pause") {
            const pauseDuration = 200;
            const timer = setTimeout(() => setPhase("out"), pauseDuration);
            return () => clearTimeout(timer);
        } else if (phase === "out") {
            const duration = shouldReduceMotion ? 500 : 1200;
            const timer = setTimeout(() => {
                setPhase("done");
                setIsAnimating(false);
                onComplete && onComplete();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [phase, onComplete, shouldReduceMotion]);

    // Trigger IC glow animation when pulses reach the main chip
    useEffect(() => {
        if (phase === "in") {
            const glowDelay = shouldReduceMotion ? 600 : 1700;
            const timer = setTimeout(() => {
                setIcGlow(true);
            }, glowDelay);
            return () => clearTimeout(timer);
        }
        if (phase === "done") {
            setIcGlow(false);
        }
    }, [phase, shouldReduceMotion, isSafari]);

    // Animate overlay zoom and fade out during the "in" phase
    useEffect(() => {
        if (phase === "in" && !shouldReduceMotion) {
            const timer = setTimeout(() => {
                animate(scale, 3, { duration: 2.7, ease: [0.95, 0, 1, 1] });
                animate(overlayOpacity, 0, { duration: 2.7, ease: [0.95, 0, 1, 1] });
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [phase, shouldReduceMotion, scale, overlayOpacity]);

    // Reveal main content when animation starts to exit
    useEffect(() => {
        if (phase === "out") {
            setRevealContent(true);
        }
    }, [phase]);

    // Calculate viewBox to center the main IC and ensure proper scaling
    const viewBox = useMemo(() => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        const icCenterX = 350;
        const icCenterY = 250;

        const isMobile = vw < 768;
        const baseScale = isMobile ? 0.8 : 0.8;
        const viewBoxWidth = vw * baseScale;
        const viewBoxHeight = vh * baseScale;

        const viewBoxX = icCenterX - viewBoxWidth / 2;
        const viewBoxY = icCenterY - viewBoxHeight / 2;

        return `${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`;
    }, []);

    // Calculate Safari glow position based on SVG coordinates and viewBox transformation
    const calculateGlowPosition = React.useCallback(() => {
        if (svgRef.current) {
            const svg = svgRef.current;
            const svgRect = svg.getBoundingClientRect();
            
            // Main IC position in SVG coordinate system
            const icX = 290;
            const icY = 190;
            const icSize = 120;
            
            // Parse viewBox to get transformation parameters
            const viewBoxParts = viewBox.split(' ').map(Number);
            const [viewBoxX, viewBoxY, viewBoxWidth, viewBoxHeight] = viewBoxParts;
            
            // Calculate scale factors for coordinate transformation
            const scaleX = svgRect.width / viewBoxWidth;
            const scaleY = svgRect.height / viewBoxHeight;
            
            // Convert SVG coordinates to screen coordinates
            const screenX = (icX - viewBoxX) * scaleX;
            const screenY = (icY - viewBoxY) * scaleY;
            const screenSize = icSize * scaleX;
            
            setGlowPosition({
                left: screenX,
                top: screenY,
                width: screenSize,
                height: screenSize
            });
        }
    }, [viewBox]);

    // Set up Safari glow positioning and resize handling
    useLayoutEffect(() => {
        if (isSafari) {
            calculateGlowPosition();
            const handleResize = throttle(calculateGlowPosition, 100);
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [isSafari, calculateGlowPosition]);

    // Generate the complete PCB layout with traces, components, and vias
    const createZoomedPCBLayout = () => {
        const traces = [];
        const components = [];
        const vias = [];
        const traceSpacing = 4;
        const denseSpacing = 10;

        // Main QFP (Quad Flat Package) IC at the center
        const qfpIC = {
            x: 350 - 60,
            y: 250 - 60,
            size: 120,
            pins: 12
        };

        // Add the main IC body
        components.push({
            type: 'qfp-body',
            x: qfpIC.x,
            y: qfpIC.y,
            width: qfpIC.size,
            height: qfpIC.size
        });

        // Generate pins for all four sides of the QFP IC
        const pinWidth = 8;
        const pinLength = 20;
        const pinSpacing = (qfpIC.size - 20) / (qfpIC.pins - 1);
        const pinStart = 10;

        const qfpPins = {
            top: [],
            bottom: [],
            left: [],
            right: []
        };

        for (let i = 0; i < qfpIC.pins; i++) {
            const offset = pinStart + i * pinSpacing;

            // Top pins
            const topX = qfpIC.x + offset;
            const topY = qfpIC.y;
            qfpPins.top.push({ x: topX, y: topY });
            components.push({
                type: 'pin',
                x: topX - pinWidth / 2,
                y: topY - pinLength,
                width: pinWidth,
                height: pinLength
            });

            // Bottom pins
            const bottomX = qfpIC.x + offset;
            const bottomY = qfpIC.y + qfpIC.size;
            qfpPins.bottom.push({ x: bottomX, y: bottomY });
            components.push({
                type: 'pin',
                x: bottomX - pinWidth / 2,
                y: bottomY,
                width: pinWidth,
                height: pinLength
            });

            // Left pins
            const leftX = qfpIC.x;
            const leftY = qfpIC.y + offset;
            qfpPins.left.push({ x: leftX, y: leftY });
            components.push({
                type: 'pin',
                x: leftX - pinLength,
                y: leftY - pinWidth / 2,
                width: pinLength,
                height: pinWidth
            });

            // Right pins
            const rightX = qfpIC.x + qfpIC.size;
            const rightY = qfpIC.y + offset;
            qfpPins.right.push({ x: rightX, y: rightY });
            components.push({
                type: 'pin',
                x: rightX,
                y: rightY - pinWidth / 2,
                width: pinLength,
                height: pinWidth
            });
        }

        // Define the bounds for trace generation
        const bounds = {
            minX: -800,
            maxX: 1500,
            minY: -600,
            maxY: 1200
        };

        // Generate background traces for visual depth
        for (let i = 0; i < 30; i++) {
            const offset = i * denseSpacing;
            traces.push({
                d: `M${bounds.minX},${-400 + offset} L${80 + offset},${-50 + offset} L${180 + offset},${-50 + offset} L${280 + offset},${50 + offset} L${280 + offset},${bounds.maxY}`,
                color: "#1e3a8a",
                width: 1.2,
                opacity: 0.07,
                delay: 0,
                background: true
            });
        }

        for (let i = 0; i < 35; i++) {
            const y = 400 + i * denseSpacing;
            traces.push({
                d: `M${bounds.minX},${y} L230,${y} L${260 + i * 2},${y + 30 + i * 2} L${480 + i * 2},${y + 30 + i * 2} L${530 + i * 2},${y + 80 + i * 2} L${bounds.maxX},${y + 80 + i * 2}`,
                color: "#1e3a8a",
                width: 1.5,
                opacity: 0.12,
                delay: 0,
                background: true
            });
        }

        for (let i = 0; i < 30; i++) {
            const x = 800 + i * denseSpacing;
            traces.push({
                d: `M${x},${bounds.minY} L${x},150 L${x + 40},190 L${x + 80},190 L${x + 120},230 L${x + 120},300 L${x + 160},340 L${x + 160},${bounds.maxY}`,
                color: "#1e3a8a",
                width: 1.5,
                opacity: 0.18,
                delay: 0,
                background: true
            });
        }

        for (let i = 0; i < 32; i++) {
            const x = 600 + i * denseSpacing;
            traces.push({
                d: `M${x},${bounds.maxY} L${x},600 L${x + 40},560 L${x + 80},560 L${x + 120},520 L${x + 120},400 L${x + 160},360 L${x + 200},360 L${x + 240},320 L${x + 240},${bounds.minY}`,
                color: "#1e3a8a",
                width: 1.8,
                opacity: 0.16,
                delay: 0,
                background: true
            });
        }

        for (let i = 0; i < 25; i++) {
            const offset = i * denseSpacing;
            traces.push({
                d: `M${bounds.maxX},${-400 + offset} L${800 - offset},${-60 + offset} L${700 - offset},${-60 + offset} L${600 - offset},${40 + offset} L${600 - offset},${bounds.maxY}`,
                color: "#1e3a8a",
                width: 1.2,
                opacity: 0.07,
                delay: 0,
                background: true
            });
        }

        // Add smaller IC components around the main chip
        const ics = [
            { x: 120, y: 120, width: 100, height: 25, pins: 10 },
            { x: 500, y: 120, width: 25, height: 80, pins: 8 },
            { x: 120, y: 400, width: 120, height: 25, pins: 12 },
            { x: 500, y: 400, width: 80, height: 25, pins: 8 },
            { x: 50, y: 280, width: 50, height: 20, pins: 6 },
            { x: 580, y: 280, width: 50, height: 20, pins: 6 },
            { x: 280, y: 60, width: 80, height: 20, pins: 8 },
            { x: 280, y: 500, width: 80, height: 20, pins: 8 },
        ];

        ics.forEach((ic) => {
            components.push({ type: 'body', ...ic });
            const isVertical = ic.height > ic.width;
            const pinCount = ic.pins;

            if (isVertical) {
                for (let i = 0; i < pinCount; i++) {
                    components.push({
                        type: 'pin',
                        x: ic.x - 6,
                        y: ic.y + 5 + (i * (ic.height - 10) / (pinCount - 1)),
                        width: 12,
                        height: 4
                    });
                }
            } else {
                for (let i = 0; i < pinCount; i++) {
                    components.push({
                        type: 'pin',
                        x: ic.x + 5 + (i * (ic.width - 10) / (pinCount - 1)),
                        y: ic.y - 6,
                        width: 4,
                        height: 12
                    });
                }
            }
        });

        // Generate animated traces with different colors and timing
        const yellowGroup = [];
        for (let i = 0; i < 12; i++) {
            const pin = qfpPins.left[i];
            const yOffset = 50 + i * 4;
            yellowGroup.push({
                dIn: `M${bounds.minX},${pin.y + yOffset} L${pin.x - 100},${pin.y + yOffset} L${pin.x - 30},${pin.y} L${pin.x - 20},${pin.y}`,
                dOut: `M${pin.x - 20},${pin.y} L${pin.x - 30},${pin.y} L${pin.x - 100},${pin.y + yOffset} L${bounds.minX},${pin.y + yOffset}`,
                color: "#fbbf24",
                width: 3,
                delay: 0.1 + i * 0.015,
                randomOffset: Math.random() * 0.5,
                directional: true
            });
        }
        traces.push(...yellowGroup);

        for (let i = 0; i < 15; i++) {
            const y = 30 + i * denseSpacing;
            traces.push({
                d: `M${bounds.minX},${y} L200,${y} L350,${y + 50} L${bounds.maxX},${y + 50}`,
                color: "#fbbf24",
                width: 1.8,
                opacity: 0.13,
                delay: 0,
                background: true
            });
        }

        const blueGroup = [];
        for (let i = 0; i < 12; i++) {
            const pin = qfpPins.top[i];
            const offset = i * 5;
            blueGroup.push({
                dIn: `M${pin.x + offset},${bounds.minY} L${pin.x + offset},${pin.y - 80} L${pin.x},${pin.y - 30} L${pin.x},${pin.y - 20}`,
                dOut: `M${pin.x},${pin.y - 20} L${pin.x},${pin.y - 30} L${pin.x + offset},${pin.y - 80} L${pin.x + offset},${bounds.minY}`,
                color: "#3b82f6",
                width: 3,
                delay: 0.2 + i * 0.01,
                randomOffset: Math.random() * 0.5,
                directional: true
            });
        }
        traces.push(...blueGroup);

        for (let i = 0; i < 25; i++) {
            const x = 30 + i * denseSpacing;
            traces.push({
                d: `M${x},${bounds.minY} L${x},200 L${x + 50},250 L${x + 100},250 L${x + 150},300 L${x + 150},${bounds.maxY}`,
                color: "#3b82f6",
                width: 1.8,
                opacity: 0.13,
                delay: 0,
                background: true
            });
        }

        const redGroup = [];
        for (let i = 0; i < 5; i++) {
            const y = 520 + i * traceSpacing * 4;
            redGroup.push({
                dIn: `M${bounds.minX},${y} L${bounds.maxX},${y}`,
                dOut: `M${bounds.maxX},${y} L${bounds.minX},${y}`,
                color: "#ef4444",
                width: 6,
                delay: 0.3 + i * 0.025,
                directional: true
            });
        }
        traces.push(...redGroup);

        const greenGroup = [];
        for (let i = 0; i < 12; i++) {
            const pin = qfpPins.bottom[i];
            const xOffset = 80 + i * 4;
            greenGroup.push({
                dIn: `M${pin.x + xOffset},${bounds.maxY} L${pin.x + xOffset},${pin.y + 100} L${pin.x},${pin.y + 30} L${pin.x},${pin.y + 20}`,
                dOut: `M${pin.x},${pin.y + 20} L${pin.x},${pin.y + 30} L${pin.x + xOffset},${pin.y + 100} L${pin.x + xOffset},${bounds.maxY}`,
                color: "#10b981",
                width: 2.5,
                delay: 0.4 + i * 0.015,
                randomOffset: Math.random() * 0.5,
                directional: true
            });
        }
        traces.push(...greenGroup);

        for (let i = 0; i < 15; i++) {
            const x = 120 + i * denseSpacing;
            traces.push({
                d: `M${x},${bounds.maxY} L${x},400 L${x + 50},350 L${x + 100},350 L${x + 150},300 L${x + 150},${bounds.minY}`,
                color: "#10b981",
                width: 1.8,
                opacity: 0.13,
                delay: 0,
                background: true
            });
        }

        const pinkGroup = [];
        for (let i = 0; i < 7; i++) {
            const pin = qfpPins.right[i + 2];
            const offset = i * traceSpacing * 3;
            pinkGroup.push({
                dIn: `M${bounds.maxX},${pin.y - 40} L${pin.x + 90 + offset},${pin.y - 40} L${pin.x + 40 + offset},${pin.y} L${pin.x + 20},${pin.y}`,
                dOut: `M${pin.x + 20},${pin.y} L${pin.x + 40 + offset},${pin.y} L${pin.x + 90 + offset},${pin.y - 40} L${bounds.maxX},${pin.y - 40}`,
                color: "#ec4899",
                width: 3,
                delay: 0.5 + i * 0.015,
                randomOffset: Math.random() * 0.5,
                directional: true
            });
        }
        traces.push(...pinkGroup);

        const cyanGroup = [];
        for (let i = 0; i < 10; i++) {
            const y = 80 + i * traceSpacing * 1.5;
            const offset = i * traceSpacing;
            cyanGroup.push({
                dIn: `M${bounds.minX},${y} L130,${y} L${180 + offset},${y + 50 + offset} L${380 + offset},${y + 50 + offset} L${430 + offset},${y + 100 + offset} L${bounds.maxX},${y + 100 + offset}`,
                dOut: `M${bounds.maxX},${y + 100 + offset} L${430 + offset},${y + 100 + offset} L${380 + offset},${y + 50 + offset} L${180 + offset},${y + 50 + offset} L130,${y} L${bounds.minX},${y}`,
                color: "#06b6d4",
                width: 2.5,
                delay: 0.6 + i * 0.015,
                directional: true
            });
        }
        traces.push(...cyanGroup);

        const purpleGroup = [];
        for (let i = 0; i < 6; i++) {
            const y = 20 + i * traceSpacing * 5;
            purpleGroup.push({
                dIn: `M${bounds.minX},${y} L200,${y} L250,${y + 40} L550,${y + 40} L600,${y} L${bounds.maxX},${y}`,
                dOut: `M${bounds.maxX},${y} L600,${y} L550,${y + 40} L250,${y + 40} L200,${y} L${bounds.minX},${y}`,
                color: "#8b5cf6",
                width: 2.5,
                delay: 0.7 + i * 0.02,
                directional: true
            });
            purpleGroup.push({
                dIn: `M${bounds.minX},${y + 8} L200,${y + 8} L250,${y + 48} L550,${y + 48} L600,${y + 8} L${bounds.maxX},${y + 8}`,
                dOut: `M${bounds.maxX},${y + 8} L600,${y + 8} L550,${y + 48} L250,${y + 48} L200,${y + 8} L${bounds.minX},${y + 8}`,
                color: "#8b5cf6",
                width: 2.5,
                delay: 0.7 + i * 0.02 + 0.01,
                directional: true
            });
        }
        traces.push(...purpleGroup);

        // Add vias at strategic locations
        vias.push(
            { cx: 325, cy: 225, r: 6 },
            { cx: 475, cy: 225, r: 6 },
            { cx: 325, cy: 375, r: 6 },
            { cx: 475, cy: 375, r: 6 },
            { cx: 190, cy: 440, r: 5 },
            { cx: 560, cy: 190, r: 5 },
            { cx: 140, cy: 340, r: 5 },
            { cx: 660, cy: 390, r: 5 },
            { cx: 270, cy: 170, r: 4 },
            { cx: 530, cy: 170, r: 4 },
            { cx: 270, cy: 410, r: 4 },
            { cx: 530, cy: 410, r: 4 },
            { cx: 170, cy: 270, r: 3 },
            { cx: 630, cy: 270, r: 3 },
            { cx: 240, cy: 290, r: 3 },
            { cx: 560, cy: 290, r: 3 },
            { cx: 290, cy: 170, r: 3 },
            { cx: 510, cy: 170, r: 3 },
            { cx: 290, cy: 410, r: 3 },
            { cx: 510, cy: 410, r: 3 }
        );

        return { traces, components, vias };
    };

    const { traces, components, vias } = useMemo(() => createZoomedPCBLayout(), []);

    // Animation variants for different motion preferences
    const traceVariants = shouldReduceMotion
        ? {
            initial: { opacity: 1 },
            animateIn: { opacity: 1 },
            animateOut: { opacity: 1 }
        }
        : {
            initial: {
                pathLength: 0,
                opacity: 0
            },
            animateIn: {
                pathLength: 1,
                opacity: [0, 0.6, 1],
                transition: {
                    duration: 1.0,
                    times: [0, 0.6, 1],
                    ease: "easeOut"
                }
            },
            animateOut: {
                pathLength: 0,
                opacity: [1, 0.6, 0],
                transition: {
                    duration: 1.2,
                    times: [0, 0.6, 1],
                    ease: "easeIn"
                }
            }
        };

    const backgroundTraceVariants = shouldReduceMotion
        ? {
            initial: { opacity: 1 },
            animateIn: { opacity: 1 },
            animateOut: { opacity: 1 }
        }
        : {
            initial: {
                pathLength: 0,
                opacity: 0
            },
            animateIn: {
                pathLength: 1,
                opacity: [0, 1],
                transition: {
                    duration: 1.0,
                    times: [0, 1],
                    ease: "easeOut"
                }
            },
            animateOut: {
                pathLength: 0,
                opacity: [1, 0],
                transition: {
                    duration: 1.2,
                    times: [0, 1],
                    ease: "easeIn"
                }
            }
        };

    const componentVariants = {
        initial: {
            opacity: 0,
            scale: 0.95
        },
        animate: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            scale: 0.95,
            transition: { duration: 0.4, delay: 1.5, ease: "easeInOut" }
        }
    };

    const overlayVariants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: { duration: 0.2, ease: "easeOut" }
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.4, ease: "easeInOut" }
        }
    };

    const contentVariants = shouldReduceMotion
        ? {
            hidden: { opacity: 1, scale: 1 },
            visible: { opacity: 1, scale: 1 }
        }
        : {
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1 }
        };

    return (
        <>
            <ContentWrapper
                variants={contentVariants}
                initial="hidden"
                animate={revealContent ? "visible" : "hidden"}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                {children}
            </ContentWrapper>
            <AnimatePresence>
                {isAnimating && (
                    <CircuitOverlay
                        variants={overlayVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        style={{ scale, opacity: overlayOpacity }}
                    >
                        <CircuitSVG ref={svgRef} viewBox={viewBox} preserveAspectRatio="xMidYMid meet">
                            <defs>
                                <linearGradient id="pink-gradient-animated" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop id="pink-stop-1" offset="0%" stopColor="#f9a8d4">
                                        <animate attributeName="stop-color" values="#f9a8d4;#ec4899;#f9a8d4" dur="2s" repeatCount="indefinite" />
                                    </stop>
                                    <stop id="pink-stop-2" offset="100%" stopColor="#ec4899">
                                        <animate attributeName="stop-color" values="#ec4899;#f9a8d4;#ec4899" dur="2s" repeatCount="indefinite" />
                                    </stop>
                                </linearGradient>

                                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <line x1="0" y1="0" x2="0" y2="40" stroke="#1a2744" strokeWidth="0.8" opacity="0.3" />
                                    <line x1="0" y1="0" x2="40" y2="0" stroke="#1a2744" strokeWidth="0.8" opacity="0.3" />
                                </pattern>
                            </defs>

                            <rect x="-1500" y="-1000" width="4000" height="3000" fill="url(#grid)" />

                            <motion.g>
                                {traces.filter(t => t.background).map((trace, i) => (
                                    <CircuitTrace
                                        key={`bg-trace-${i}`}
                                        d={trace.d}
                                        color={trace.color}
                                        strokeWidth={trace.width}
                                        opacity={trace.opacity}
                                        variants={backgroundTraceVariants}
                                        initial="initial"
                                        animate={phase === "out" ? "animateOut" : "animateIn"}
                                        transition={{
                                            animateIn: {
                                                ...backgroundTraceVariants.animateIn.transition,
                                                delay: 0.3 + i * 0.003
                                            },
                                            animateOut: {
                                                ...backgroundTraceVariants.animateOut.transition,
                                                delay: i * 0.002
                                            }
                                        }}
                                    />
                                ))}

                                {traces.filter(t => !t.background).map((trace, i) => {
                                    const isPulseTrace = trace.directional && (
                                        trace.color === "#fbbf24" ||
                                        trace.color === "#3b82f6" ||
                                        trace.color === "#10b981" ||
                                        trace.color === "#ec4899"
                                    );
                                    return (
                                        <React.Fragment key={`tracefrag-${i}`}>
                                            <CircuitTrace
                                                key={`trace-${i}`}
                                                id={isPulseTrace ? `trace-${i}-path` : undefined}
                                                d={trace.directional ? (phase === "out" ? trace.dOut : trace.dIn) : trace.d}
                                                color={trace.color === "#ec4899" ? "url(#pink-gradient-animated)" : trace.color}
                                                strokeWidth={trace.width}
                                                opacity={trace.opacity}
                                                variants={traceVariants}
                                                initial="initial"
                                                animate={phase === "out" ? "animateOut" : "animateIn"}
                                                transition={{
                                                    animateIn: {
                                                        ...traceVariants.animateIn.transition,
                                                        delay: 0.3 + trace.delay * 0.5
                                                    },
                                                    animateOut: {
                                                        ...traceVariants.animateOut.transition,
                                                        delay: trace.delay * 0.5
                                                    }
                                                }}
                                            />
                                            {isPulseTrace && phase !== "out" && (
                                                <PulseCircle r={trace.width * 2} opacity="0">
                                                    <animate attributeName="opacity" from="0" to="1" dur="0.01s" begin={`${0.3 + trace.delay * 0.5 + (trace.randomOffset || 0)}s`} fill="freeze" />
                                                    <animate attributeName="opacity" from="1" to="0" dur="0.01s" begin={`${0.3 + trace.delay * 0.5 + (trace.randomOffset || 0) + 1.19}s`} fill="freeze" />
                                                    <animateMotion
                                                        dur="1.2s"
                                                        repeatCount="1"
                                                        keyPoints="0;1"
                                                        keyTimes="0;1"
                                                        calcMode="spline"
                                                        keySplines="0 0 0.5 1"
                                                        begin={`${0.3 + trace.delay * 0.5 + (trace.randomOffset || 0)}s`}
                                                    >
                                                        <mpath xlinkHref={`#trace-${i}-path`} />
                                                    </animateMotion>
                                                </PulseCircle>
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </motion.g>

                            <motion.g variants={componentVariants} initial="initial" animate="animate" exit="exit">
                                {components.map((comp, i) => {
                                    if (comp.type === 'qfp-body') {
                                        return (
                                            <React.Fragment key="qfp-body-group">
                                                {!isSafari && (
                                                    <ICGlowMask
                                                        x={comp.x}
                                                        y={comp.y}
                                                        width={comp.width}
                                                        height={comp.height}
                                                        style={{
                                                            scale: icGlowScale,
                                                            opacity: icBloomProgress,
                                                            filter: icGlowFilter,
                                                            transformOrigin: 'center',
                                                        }}
                                                    />
                                                )}
                                                <ComponentPad
                                                    x={comp.x}
                                                    y={comp.y}
                                                    width={comp.width}
                                                    height={comp.height}
                                                    fill="#0f172a"
                                                    stroke="#4a9eff"
                                                    strokeWidth="2"
                                                    style={{ filter: chipFilter }}
                                                    ref={mainChipRef}
                                                />
                                            </React.Fragment>
                                        );
                                    } else if (comp.type === 'body') {
                                        return (
                                            <ComponentPad
                                                key={`body-${i}`}
                                                x={comp.x}
                                                y={comp.y}
                                                width={comp.width}
                                                height={comp.height}
                                                fill="#0a0e27"
                                                stroke="#4a9eff"
                                            />
                                        );
                                    }
                                    return (
                                        <ComponentPad
                                            key={`pin-${i}`}
                                            x={comp.x}
                                            y={comp.y}
                                            width={comp.width}
                                            height={comp.height}
                                            fill="#4a9eff"
                                            stroke="none"
                                        />
                                    );
                                })}

                                {vias.map((via, i) => (
                                    <Via key={`via-${i}`} {...via} />
                                ))}
                            </motion.g>
                        </CircuitSVG>

                        {isSafari && icGlow && glowPosition && (
                            <SafariGlow
                                style={{
                                    left: glowPosition.left,
                                    top: glowPosition.top,
                                    width: glowPosition.width,
                                    height: glowPosition.height,
                                    scale: icGlowScale,
                                    opacity: icBloomProgress,
                                    filter: icGlowFilter
                                }}
                            />
                        )}
                    </CircuitOverlay>
                )}
            </AnimatePresence>
        </>
    );
};

export default CircuitReveal;
