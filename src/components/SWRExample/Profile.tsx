import React from "react";
import useSWR from 'swr'
import axios, {AxiosRequestConfig} from "axios";
const fetcher = (url:string, config?: AxiosRequestConfig<any> | undefined) => axios.get(url).then((res) => res.data)
function useUser (id: string) {
    const { data, error } = useSWR(`/api/user/${id}`, fetcher)

    return {
        user: data,
        isLoading: !error && !data,
        isError: error
    }
}
export default function Page () {
    return(
        <div>
            <Profile id={'124'}/>
            <Avatar id={'124'}/>
        </div>
    )
}
function Profile ({id}: {id: string}) {
    // const { data, error } = useSWR('http://localhost:3000/api/user/123', fetcher)
    const { user, isLoading, isError } = useUser(id)

    if (isError) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    // 데이터 렌더링
    return<>
        <div>hello {user.name}!</div>
        <Avatar id={'123'}/>
    </>
}
export function Avatar({id}: {id: string}){
    const { user, isLoading, isError } = useUser(id)

    if (isError) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    // 데이터 렌더링
    return <div>hello {user.name}! (Avatar)</div>
}