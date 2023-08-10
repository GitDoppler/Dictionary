import { useLoaderData } from "react-router-dom";
import playLogo from "../assets/images/icon-play.svg";
import shareLogo from "../assets/images/icon-new-window.svg";

function Main() {
    const word = useLoaderData(); //JSON Object of the word

    function findAudioFile(word) {
        const phonetics = word[0].phonetics;
        for (let i = 0; i < phonetics.length; i++) {
            if (phonetics[i].audio !== "") {
                return phonetics[i].audio;
            }
        }
        return "";
    }
    const audio = new Audio(findAudioFile(word));
    console.log(word[0].meanings);

    return (
        <div className="md:pb-31 ml-auto mr-auto w-[min(100%-3rem,43rem)] pb-20">
            <div className="mb-8 flex items-center justify-between md:mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-black dark:text-white md:mb-2 md:text-6xl">{word[0].word}</h1>
                    <p className="text-lg text-[#A445ED] md:text-2xl">{word[0].phonetic}</p>
                </div>
                {findAudioFile(word) !== "" ? (
                    <button
                        onClick={() => {
                            audio.play();
                        }}
                    >
                        <img src={playLogo} className="h-[3rem] w-[3rem] md:h-[4.6875rem] md:w-[4.6875rem]" />
                    </button>
                ) : null}
            </div>
            <div>
                {word[0].meanings.map((meaning) => (
                    <div key={meaning.partOfSpeech}>
                        <div className="mb-8 flex items-center gap-4 md:gap-8">
                            <h2 className="text-lg font-bold italic text-black dark:text-white md:text-2xl">{meaning.partOfSpeech}</h2>
                            <div className="h-[0.0625rem] flex-grow bg-[#E9E9E9] dark:bg-[#3A3A3A]"></div>
                        </div>
                        <div>
                            <h3 className="mb-4 text-base text-[#757575] md:mb-6 md:text-xl">Meaning</h3>
                            <ul className="list-none text-base text-black dark:text-white md:ml-5 md:text-lg">
                                {meaning.definitions.map((entry, index) => (
                                    <li className=" mb-3 flex gap-5 last:mb-6 last:md:mb-10" key={index}>
                                        <div className="mt-3 h-[0.3125rem] w-[0.3125rem] rounded-full bg-[#A445ED]"></div>
                                        <div className="w-fit">
                                            <div>{entry.definition}</div>
                                            {entry.hasOwnProperty("example") === true ? <div className="mt-3 text-[#757575]">{entry.example}</div> : null}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            {meaning.synonyms.length !== 0 ? (
                                <p className="mb-8 text-base text-[#757575] md:mb-11 md:text-xl">
                                    Synonyms<span className="ml-6 font-bold text-[#A445ED]">{meaning.synonyms[0]}</span>
                                </p>
                            ) : null}
                        </div>
                    </div>
                ))}
                <div className="mb-6 h-[0.0625rem] w-auto bg-[#E9E9E9] dark:bg-[#3A3A3A]"></div>
                <div className="text-sm md:flex md:gap-5">
                    <div className="mb-2 text-[#757575] md:mb-0">Source</div>
                    <div className="flex items-center gap-2">
                        <a className="text-black dark:text-white" href={`https://en.wiktionary.org/wiki/${word[0].word}`}>{`https://en.wiktionary.org/wiki/${word[0].word}`}</a>
                        <img src={shareLogo} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
