import Link from "next/link"
import { Button } from "./ui/button"
import { Upload } from "lucide-react"

type ButtonAddVideoComponentProps = {
    label: string
}

export const ButtonAddVideoComponent = ({label}: ButtonAddVideoComponentProps = {label: "Upload"}) => {
    return (
        <Button asChild about={label}>
            <Link href="/videos/new"><Upload />{label}</Link>
        </Button>
    )
}