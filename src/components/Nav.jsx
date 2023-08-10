import { useState, useContext, useEffect, useRef } from "react";
import { ModeContext, FontContext } from "../App";
import logo from "../assets/images/logo.svg";
import arrowDown from "../assets/images/icon-arrow-down.svg";
import searchIcon from "../assets/images/icon-search.svg";
import { Form, useLocation, Link } from "react-router-dom";

function Menu({ open, setOpen }) {
    const { font, setFont } = useContext(FontContext);

    useEffect(() => {
        localStorage.setItem("font", font);
    }, [font]);

    function handleFont(fontName) {
        setFont(fontName);
        setOpen(false);
    }

    function isFont(fontName) {
        if (font === fontName) {
            return "font-bold";
        }
        return "font-normal";
    }

    return (
        <div className={"absolute right-[14px] top-[2rem] z-10 flex w-full flex-col rounded-lg border border-[#E9E9E9] bg-white text-center transition-all dark:bg-[#1F1F1F] dark:text-white " + `${open === true ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-0 opacity-0"}`}>
            <button
                onClick={() => {
                    handleFont("Sans Serif");
                }}
                className={"py-2 font-[inter] " + isFont("Sans Serif")}
            >
                Sans Serif
            </button>
            <button
                onClick={() => {
                    handleFont("Serif");
                }}
                className={"border-y border-[#E9E9E9] py-2 font-[lora] " + isFont("Serif")}
            >
                Serif
            </button>
            <button
                onClick={() => {
                    handleFont("Mono");
                }}
                className={"py-2 font-[inconsolata] " + isFont("Mono")}
            >
                Mono
            </button>
        </div>
    );
}

function Nav() {
    const currLocation = useLocation();
    const { mode, setMode } = useContext(ModeContext);
    const { font, setFont } = useContext(FontContext);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(currLocation.pathname.split("/").pop());
    const [error, setError] = useState("");

    useEffect(() => {
        localStorage.setItem("mode", mode);
    }, [mode]);

    useEffect(() => {
        setValue(currLocation.pathname.split("/").pop());
    }, [currLocation]);

    function handleMode() {
        const newMode = mode === "light" ? "dark" : "light";
        setMode(newMode);
    }

    const handleSubmit = (e) => {
        if (value === "") {
            e.preventDefault();
            setError("Whooops, can't be empty!");
        }
    };

    return (
        <div className="ml-auto mr-auto w-[min(100%-3rem,43rem)]">
            <div className="flex w-full justify-between pt-6">
                <Link to="/">
                    <img src={logo} />
                </Link>
                <div className="flex items-center gap-4 md:gap-7">
                    <div className="relative flex gap-4">
                        <span className={" w-[5rem] text-center font-bold dark:text-white md:w-[5.625] md:text-lg"}>{font}</span>
                        <button
                            onClick={() => {
                                setOpen(!open);
                            }}
                        >
                            <img src={arrowDown} />
                        </button>
                        <Menu open={open} setOpen={setOpen} />
                    </div>
                    <div className="h-full w-[0.0625rem] bg-[#E9E9E9]"></div>
                    <div className="flex gap-3">
                        <button className={"inline-block h-5 w-10 rounded-xl bg-[#979797] transition-all dark:bg-[#A445ED] "} onClick={handleMode}>
                            <div className={"ml-[10%] h-[0.875rem] w-[0.875rem] rounded-full bg-white transition-all dark:ml-[55%] "}></div>
                        </button>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#838383" className="h-5 w-5 dark:stroke-[#A445ED]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="relative my-6 rounded-2xl bg-[#F4F4F4] dark:bg-[#1F1F1F] md:my-12">
                <Form action={`/${value}`} role="search" className="relative w-full" onSubmit={handleSubmit}>
                    <input
                        onBlur={() => {
                            setError("");
                        }}
                        type="input"
                        aria-label="Search contacts"
                        placeholder="Search"
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                            setError("");
                        }}
                        className={"w-full rounded-2xl bg-[#F4F4F4] py-3 pl-6 pr-14 text-base font-bold focus:outline-none focus:ring-1 focus:ring-[#A445ED] dark:bg-[#1F1F1F] dark:text-white placeholder:dark:text-white md:text-xl placeholder:md:text-xl " + `${error && " focus:ring-[#FF5252]"}`}
                    />
                    <img src={searchIcon} className="bg-[#F4F4F4 absolute right-[4%] top-[34%] dark:bg-[#1F1F1F]" />
                </Form>
                {error && <p className="absolute bottom-[-60%] text-xl text-[#FF5252]">{error}</p>}
            </div>
        </div>
    );
}

export default Nav;
