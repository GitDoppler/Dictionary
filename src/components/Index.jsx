import indexImageDark from "../assets/images/index-image-dark.svg";
import indexImage from "../assets/images/index-image.svg";
import { ModeContext } from "../App";
import { useContext } from "react";

export default function Index() {
    const { mode, setMode } = useContext(ModeContext);

    return (
        <div className="mx-auto w-[min(100%-3rem,43rem)]">
            <h1 className="py-10 text-center text-3xl font-bold text-black dark:text-white md:text-4xl lg:text-6xl">Thesaurus</h1>
            <img src={mode === "dark" ? indexImageDark : indexImage} className="mx-auto w-full" />
            <div className="mt-6 h-[0.0625rem] w-full bg-[#E9E9E9] dark:bg-[#3A3A3A]"></div>
            <p className=" mt-6 text-center text-lg italic text-black dark:text-white md:text-xl lg:text-2xl">Find synonyms, antonyms, and related words</p>
        </div>
    );
}
