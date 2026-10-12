import { useEffect } from "react";
import "./CursorEffect.css";

export default function CursorEffect() {
    useEffect(() => {
        // Only enable on desktop devices with a mouse
        if (window.matchMedia("(pointer: coarse)").matches) {
            return;
        }

        const cursor = document.createElement("div");
        cursor.className = "demo-cursor";
        document.body.appendChild(cursor);

        document.body.classList.add("demo-cursor-active");

        const moveCursor = (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        };

        const handleHover = (e) => {
            cursor.classList.toggle(
                "is-hovering",
                Boolean(e.target.closest("a, button"))
            );
        };

        const handleClick = (e) => {
            const ripple = document.createElement("div");
            ripple.className = "demo-ripple";
            ripple.style.left = `${e.clientX}px`;
            ripple.style.top = `${e.clientY}px`;

            document.body.appendChild(ripple);
            ripple.addEventListener("animationend", () => ripple.remove());
        };

        document.addEventListener("mousemove", moveCursor);
        document.addEventListener("mouseover", handleHover);
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("mousemove", moveCursor);
            document.removeEventListener("mouseover", handleHover);
            document.removeEventListener("click", handleClick);

            cursor.remove();
            document.body.classList.remove("demo-cursor-active");
        };
    }, []);

    return null;
}
