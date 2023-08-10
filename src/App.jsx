import { useState, createContext } from "react";
import Nav from "./components/Nav";
import Main from "./components/Main";
import { Outlet } from "react-router-dom";

export const ModeContext = createContext({});
export const FontContext = createContext({});

function App() {
    const [mode, setMode] = useState(localMode);
    const [font, setFont] = useState(localFont);

    function localMode() {
        const localMode = localStorage.getItem("mode");
        if (localMode === null) {
            return "light";
        }
        return localMode;
    }

    function localFont() {
        const localFont = localStorage.getItem("font");
        if (localFont === null) {
            return "Sans Serif";
        }
        return localFont;
    }

    function fontChanger() {
        if (font === "Sans Serif") {
            return "inter";
        }
        if (font === "Serif") {
            return "lora";
        }
        return "inconsolata";
    }

    return (
        <ModeContext.Provider value={{ mode, setMode }}>
            <FontContext.Provider value={{ font, setFont }}>
                <div className={`${mode === "light" ? "" : "dark"}`}>
                    <div className={"min-h-screen dark:bg-[#050505] " + `font-[${fontChanger()}]`}>
                        <Nav />
                        <Outlet />
                    </div>
                </div>
            </FontContext.Provider>
        </ModeContext.Provider>
    );
}

export default App;
