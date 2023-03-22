import { useRouter } from "next/router";
import { useEffect, useReducer, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { CheatsheetType } from "../../pages";

type TerminalProps = {
    cheatsheets: CheatsheetType[];
};

type AutocompleteType = {
    hidden: string;
    visible: string;
};

type AutocompleteComponentType = {
    content: string;
    list: string[];
    padding?: string;
};

const AutocompleteCommand = ({
    content,
    list,
    padding,
}: AutocompleteComponentType) => {
    const [autocompleteValue, setAutocompleteValue] = useReducer(
        autocompleteReducer,
        {
            hidden: "",
            visible: "",
        }
    );

    useEffect(() => {
        if (content === "")
            return setAutocompleteValue({
                type: "CLEAR",
                payload: { content: "", length: 0 },
            });

        const command = list.find((c) => c.startsWith(content));

        if (command) {
            setAutocompleteValue({
                type: "SET",
                payload: { content: command, length: content.length },
            });
        } else {
            setAutocompleteValue({
                type: "CLEAR",
                payload: { content: "", length: 0 },
            });
        }
    }, [content]);

    return (
        <>
            <span className="relative text-transparent">
                {padding}
                {autocompleteValue.hidden}
            </span>
            <span className="absolute text-white/40">
                {autocompleteValue.visible}
            </span>
        </>
    );
};

const AutocompleteFile = ({
    list,
    content,
}: {
    list: string[];
    content: string;
}) => {
    const [fileName, setFileName] = useState("");
    const [padding, setPadding] = useState("");

    useEffect(() => {
        const command = content.split(" ");
        // console.log(file);
        setFileName(command[1] || "");
        setPadding(command[0] + " ");
    }, [content]);

    return (
        <AutocompleteCommand content={fileName} list={list} padding={padding} />
    );
};

const autocompleteReducer = (
    state: AutocompleteType,
    action: { type: string; payload: { content: string; length: number } }
) => {
    switch (action.type) {
        case "SET":
            const { content, length } = action.payload;
            const hidden = content.slice(0, length);
            const visible = content.slice(length);
            return { hidden, visible };
        case "CLEAR":
            return { hidden: "", visible: "" };
        default:
            return state;
    }
};

const Command = ({
    addCommand,
    clearCommands,
    repeatCommand,
    initialCommand,
    changeCommand,
    index,
    active,
    cheatsheets,
    triggerError,
}: {
    addCommand: () => void;
    clearCommands: () => void;
    repeatCommand: (i: number) => string;
    changeCommand: (newCommand: string) => void;
    initialCommand: string;
    index: number;
    active: boolean;
    cheatsheets: CheatsheetType[];
    triggerError: () => void;
}) => {
    const router = useRouter();

    const [copyCommand, setCopyCommand] = useState(index);
    const [text, setText] = useState(initialCommand);
    const [currentCommand, setCurrentCommand] = useState("");

    const commands = {
        about: {
            type: "text",
            content: `
                    <span>¿Qué es &lt;TIC Cheatsheets/&gt;?</span>
                    <br>
                    <span>
                        En esta web se encuentra una colección de
                        &quot;hojas de trucos&quot; a las que se puede
                        recurrir a la hora de programar en cualquiera de los
                        lenguajes disponibles. La idea es que ésta sea de
                        realización colectiva, es decir, que todos (tanto
                        profesores como alumnos) puedan hacer su aporte a
                        los cheatsheets, con el objetivo de aumentar la
                        calidad y la cantidad de la información. Para
                        aportar algún cambio o un cheatsheet nuevo, es muy
                        importante que leas el README del repositorio.
                    </span>`,
        },
        help: {
            type: "text",
            content: "Comandos posibles: about, help, github, open, export",
        },
        github: {
            type: "action",
            content: () =>
                window.open(
                    "https://github.com/nachovigilante/cheatsheets",
                    "_blank"
                ),
        },
        open: {
            type: "action",
            content: (slug: string) => {
                router.push(`/cheatsheet/${slug}`);
            },
            slug: true,
        },
        export: {
            type: "action",
            content: (slug: string) => {
                const anchor = document.createElement("a");
                anchor.href = `/download/${slug}.pdf`;
                anchor.download = `${slug}.pdf`;
                document.body.appendChild(anchor);
                anchor.click();
            },
            slug: true,
        },
        clear: {
            type: "action",
            content: () => {
                clearCommands();
            },
            preventAdd: true,
        },
        ls: {
            type: "text",
            content: `
                <ul class="list-none">
                    ${
                        cheatsheets
                            .map((c) => `<li>${c.slug}.md</li>`)
                            .join("") || "No hay cheatsheets disponibles"
                    }
                </ul>
            `,
        },
        pwd: {
            type: "text",
            content: "tic://cheatsheets/",
        },
    } as {
        [key: string]: {
            type: string;
            content: any;
            slug?: boolean;
            preventAdd?: boolean;
        };
    };

    const containerRef = useRef<HTMLDivElement>(null);

    const addResponse = (content: string) => {
        const response = document.createElement("div");
        response.className = "text-[#9FEA18] font-normal";
        response.innerHTML = content;
        containerRef.current?.appendChild(response);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;
        let params = input.value.split(" ");

        if (e.key === "Tab") {
            e.preventDefault();
            const value = input.value;
            const command = Object.keys(commands).find((c) =>
                c.startsWith(value)
            );
            if (command) {
                input.value = command;
                changeCommand(command);
                setCurrentCommand(command);
            } else {
                setText("");
            }
        } else if (e.key === "Enter") {
            const value = input.value;
            const command = Object.keys(commands).find(
                (c) => c === value.split(" ")[0]
            );
            if (command) {
                const { type, content, slug, preventAdd } = commands[command];
                if (!slug && !Object.keys(commands).includes(command)) {
                    triggerError();
                    return;
                }

                if (type === "text") {
                    addResponse(content);
                    addCommand();
                } else if (type === "action") {
                    if (typeof content === "function") {
                        if (slug) {
                            if (cheatsheets.find((c) => c.slug === params[1])) {
                                changeCommand(value);
                                setCurrentCommand(value);
                                content(params[1]);
                                if (!preventAdd) addCommand();
                            } else triggerError();
                        } else {
                            changeCommand(value);
                            setCurrentCommand(value);
                            content();
                            if (!preventAdd) addCommand();
                        }
                    }
                }
            } else {
                triggerError();
            }
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (copyCommand === 0) return;
            input.value = repeatCommand(copyCommand - 1);
            setCopyCommand(copyCommand - 1);
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (copyCommand === index) return;
            input.value = repeatCommand(copyCommand + 1);
            setCopyCommand(copyCommand + 1);
        } else if (e.key === "l" && e.ctrlKey) {
            e.preventDefault();
            clearCommands();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;
        setText(input.value);
    };

    return (
        <div
            className="flex gap-3 items-start text-xl py-[2px] font-mono flex-col justify-center relative"
            ref={containerRef}
        >
            <div className="text-[#ED57EC] font-medium">
                ~/ORT/TIC/cheatsheets{" "}
                <span className="text-[#9FEA18] font-normal">git:</span>
                <span className="text-[#E9D2F4] font-normal">(main)</span>
            </div>
            <div>
                <span className="mr-3">{">"}</span>
                <input
                    type="text"
                    className="absolute bg-transparent outline-none font-normal"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    autoFocus={active}
                    disabled={!active}
                    defaultValue={initialCommand}
                />
                <AutocompleteCommand
                    content={text}
                    list={Object.keys(commands)}
                />
                {currentCommand === "open" || currentCommand === "export" ? (
                    <AutocompleteFile
                        content={text}
                        list={[...cheatsheets.map((c) => c.slug)]}
                    />
                ) : null}
            </div>
        </div>
    );
};

const Terminal = ({ cheatsheets }: TerminalProps) => {
    const [commands, setCommands] = useState([""]);
    const [error, setError] = useState(false);
    const addCommand = () => {
        setCommands([...commands, ""]);
    };
    const clearCommands = () => {
        setCommands([]);
        setTimeout(() => {
            setCommands([""]);
        }, 100);
    };
    const repeatCommand = (i: number) => {
        return commands[i];
    };

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (error) {
            timeout = setTimeout(() => {
                setError(false);
            }, 500);
        }

        return () => {
            clearTimeout(timeout);
        };
    }, [error]);

    return (
        <div
            className={twMerge(
                "transition-all duration-75 rounded-default border-3 border-[#504e54] bg-[#2322256d] backdrop-blur-xl overflow-hidden w-full h-[600px]",
                error ? "error" : ""
            )}
        >
            <div className="bg-[#2a2831] font-space h-20 text-2xl flex items-center border-b-1 border-b-black">
                <div className="flex gap-3 p-5 self-start">
                    <div className="bg-[#ff5f56] w-5 h-5 rounded-full" />
                    <div className="bg-[#ffbd2e] w-5 h-5 rounded-full" />
                    <div className="bg-[#27c93f] w-5 h-5 rounded-full" />
                </div>
                <div className="flex-grow text-center">tic://cheatsheets</div>
            </div>
            <div className="flex h-[520px]">
                <div className="bg-[#242229] p-5 font-space">
                    <div className="text-xl mb-3">
                        <i className="fa-solid fa-chevron-down mr-3"></i>
                        CHEATSHEETS
                    </div>
                    <ul className="text-lg list-none pl-3 pb-16 w-60">
                        {cheatsheets.map((c) => (
                            <li
                                key={c.slug}
                                className="flex gap-2 items-center text-xl py-1 px-2 hover:bg-[#2a2831] cursor-pointer"
                            >
                                <img
                                    src={`/assets/images/${c.slug}.svg`}
                                    alt={`${c.slug} logo`}
                                    width="18"
                                    height="18"
                                />
                                <span>{c.slug}.md</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex-grow flex flex-col px-1 pb-3 pt-1">
                    <div className="p-5 flex flex-col items-start gap-3 overflow-y-scroll terminal-scroll h-full">
                        {commands.map((c, i) => (
                            <Command
                                key={i}
                                index={i}
                                addCommand={addCommand}
                                clearCommands={clearCommands}
                                repeatCommand={repeatCommand}
                                initialCommand={c}
                                active={c === commands[commands.length - 1]}
                                changeCommand={(newCommand) => {
                                    const newCommands = [...commands];
                                    newCommands[i] = newCommand;
                                    setCommands(newCommands);
                                }}
                                cheatsheets={cheatsheets}
                                triggerError={() => setError(true)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terminal;
