import {FC, useState} from "react";
import {storage} from "@/lib/storage";

export const Profile: FC = () => {

    const [login] = useState(storage.getItem("login"))

    return (
        <div>
            YOUR LOGIN - {login}
        </div>
    )
}