import { useEffect, useState } from "react";
import { Mouse } from "../interfaces/Mouse";

export const useMouse = (): Mouse => {
    const [down, setDown] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    useEffect(() => {
        const updateMousePos = (e: MouseEvent) => {
            setX(e.pageX);
            setY(e.pageY);
            setDown(e.buttons === 1);
        };

        document.addEventListener('mouseup', updateMousePos);
        document.addEventListener('mousedown', updateMousePos);
        document.addEventListener('mousemove', updateMousePos);

        return () => {
            document.removeEventListener('mouseup', updateMousePos);
            document.removeEventListener('mousedown', updateMousePos);
            document.removeEventListener('mousemove', updateMousePos);
        };
    }, []);

    return { down, x, y };
};
