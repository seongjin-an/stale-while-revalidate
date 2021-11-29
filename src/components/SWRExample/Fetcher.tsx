import React from "react";
import {SWRConfig} from "swr";
import useSWR from "swr";
import axios, {AxiosRequestConfig, AxiosResponse} from "axios";

export default function Fetcher() {
    return(
        <SWRConfig value={{
            fetcher: (url:string, config?: AxiosRequestConfig<any> | undefined) => axios.get(url).then((res) => res)
        }}>
            <Page />
        </SWRConfig>
    )
}
const Page = () => {
    const {data, error} = useSWR('/api/user/123', {onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        console.log('error: ', error)
        // console.log('before')
        if(error.message.includes(400)){
            // console.log('404')
            alert("404 error");
            return
        }
        if(retryCount > 3){
            return
        }
        setTimeout(() => revalidate({retryCount}), 100)
    }})
    if(error){
        return <div>error...</div>
    }
    if(!data){
        return <div>loading...</div>
    }
    return(
        <div>{data.name}</div>
    )
}