/* eslint-disable react-app/react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { UseSwipeOptions } from "./types";

export enum SWIPE_DIRECTION {
    RIGHT = "right",
    LEFT = "left",
    UP = "up",
    DOWN = "down",
}

const useSwipe = ({ ref, thresholdPX = 5 }: UseSwipeOptions) => {

    const [elRef, setElRef] = useState<any>(ref.current);
    const [swipeDirection, setSwipeDirection]: any = useState(null);

    const [x1, setX1] = useState(0);
    const [y1, setY1] = useState(0);
    const [x2, setX2] = useState(0);
    const [y2, setY2] = useState(0);

    const handleTouchStart = (e: TouchEvent) => {

        setX1(e.changedTouches[0].clientX);
        setY1(e.changedTouches[0].clientY);

    }

    const handleTouchEnd = (e: TouchEvent) => {

        if (e.changedTouches && e.changedTouches.length > 0) {
            setX2(e.changedTouches[0].clientX);
            setY2(e.changedTouches[0].clientY);
        }

    }

    const handleMouseDown = (e: MouseEvent) => {

        const { x, y }: any = getDimensionsFromEvent(e);
        setX1(x);
        setY1(y);

    }

    const handleMouseUp = (e: MouseEvent) => {

        const { x, y }: any = getDimensionsFromEvent(e);
        setX2(x);
        setY2(y);

    }

    const getDimensionsFromEvent = (e: TouchEvent | MouseEvent) => {
        let { clientX, clientY }: any = e;

        const { top, left } = elRef.getBoundingClientRect();

        clientX -= left;
        clientX -= top;

        return { x: clientX, y: clientY };
    }

    useEffect(() => {

        if (!elRef) return;

        const currentEl = elRef;

        if (isTouchDevice()) {

            currentEl.addEventListener("touchstart", handleTouchStart);
            currentEl.addEventListener("touchend", handleTouchEnd);

        } else {

            currentEl.addEventListener("mousedown", handleMouseDown);
            currentEl.addEventListener("mouseup", handleMouseUp);

        }

        return () => {
            if (isTouchDevice()) {

                currentEl.removeEventListener("touchstart", handleTouchStart);
                currentEl.removeEventListener("touchend", handleTouchEnd);

            } else {

                currentEl.removeEventListener("mousedown", handleMouseDown);
                currentEl.removeEventListener("mouseup", handleMouseUp);

            }
        }

    }, [elRef]);


    useEffect(() => {

        if (Math.abs(x2 - x1) > Math.abs(y2 - y1) && Math.abs(x2 - x1) > thresholdPX) {

            setSwipeDirection(x2 > x1 ? SWIPE_DIRECTION.RIGHT + '.' + Date.now() : SWIPE_DIRECTION.LEFT + '.' + Date.now());

        } else if (Math.abs(y2 - y1) > thresholdPX) {

            setSwipeDirection(y2 > y1 ? SWIPE_DIRECTION.DOWN + '.' + Date.now() : SWIPE_DIRECTION.UP + '.' + Date.now())

        }

    }, [y2])

    return {
        swipeDirection,
        setRef: setElRef
    };
}

const isTouchDevice = () => "ontouchstart" in window;

export { useSwipe }