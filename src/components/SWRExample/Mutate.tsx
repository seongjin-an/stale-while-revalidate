import React from "react";
import axios from "axios";
import useSWR, {useSWRConfig, SWRConfig} from "swr";

export default function Mutate(){
    return(
        <SWRConfig>
            <Page/>
            <Profile/>
        </SWRConfig>
    )
}

const fetcher = (url:string) => axios.get(url).then(res => res.data);

const Page = () => {
    const {data} = useSWR("/api/user/123", fetcher)
    const {mutate} = useSWRConfig()
    if(!data){
        return <div>loading...</div>
    }
    return(
        <div>
            <h1>My name is {data.name}.</h1>
            <button onClick={async () => {
                const newName = data.name.toUpperCase()

                // 로컬 데이터를 즉시 업데이트하지만, 갱신은 비활성화
                await mutate('/api/user/123', {...data, name: newName}, false)
                // 소스 업데이트를 위해 API로 요청 전송
                // await requestUpdateUsername(newName)
                // 로컬 데이터가 올바른지 확인하기 위해 갱신(refetch) 트리거
                await mutate('/api/user/123')
            }}>Uppercase my name!</button>
        </div>
    )
}

const Profile = () => {
    const {data, mutate} = useSWR("/api/user/124", fetcher)
    // const {mutate} = useSWRConfig()
    if(!data){
        return <div>loading...</div>
    }
    return(
        <div>
            <h1>My name is {data.name}.</h1>
            <button onClick={async () => {
                const newName = data.name.toUpperCase()

                // 로컬 데이터를 즉시 업데이트하지만, 갱신은 비활성화
                await mutate({...data, name: newName}, false)

                // 로컬 데이터가 올바른지 확인하기 위해 갱신(refetch) 트리거
                await mutate()
            }}>Uppercase my name!</button>
        </div>
    )
}