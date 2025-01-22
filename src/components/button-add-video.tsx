import Link from "next/link"

type ButtonAddVideoComponentProps = {
    label: string
}

export const ButtonAddVideoComponent = ({label}: ButtonAddVideoComponentProps = {label: "Ajouter une vidéo"}) => {
    return <Link
    href="/videos/new"
    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
>
    {label}
</Link>
}