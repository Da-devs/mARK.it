import { RiSunLine, RiMoonClearLine } from "react-icons/ri";
import { useTheme } from "next-themes"
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

const ToggleMode = () => {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return <Button variant={"secondary"} size={"icon"} disabled={true}></Button>

    const dark = theme === "dark"
    return <Button variant={"secondary"} size={"icon"} onClick={() => setTheme(`${dark ? "light" : "dark"}`)}>{dark ? <RiSunLine className="hover:cursor-pointer hover:text-primary" /> : 
    <RiMoonClearLine className="hover:cursor-pointer hover:text-primary" />}</Button>
}

export default ToggleMode;