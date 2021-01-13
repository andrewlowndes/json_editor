import { createContext } from "react";
import { Mouse } from "../interfaces/Mouse";

export interface AppContextObject {
    mouse: Mouse;
}

export const AppContext = createContext({
    mouse: { down: false, x: 0, y: 0 }
});
