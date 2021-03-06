import {FC, useState} from "react";
import {storage} from "@/lib/storage";
import { useQuery } from "@apollo/client";
import { GET_ME } from "@/apollo/queries/me";
import { Me, MeVariables } from "@/apollo/queries/__generated__/Me"
import { GlitchText } from "@/ui/components/common/GlitchText";

export const Profile: FC = () => {

    const [login] = useState(storage.getItem("login"))
    const { data, loading, error } = useQuery<Me, MeVariables>(GET_ME, {
        variables: {
            login: login ? login : ''
        }
    })

    if (loading) return <span>L o a d i n g . . .</span>
    if (error) {
        console.log(error)
        return <span>Something went wrong...</span>
    }
    return (
        <div>
            <GlitchText fontSize={30}>Greetings, {login}</GlitchText>
            <span>{data?.user?.bio}</span>
        </div>
    )
}