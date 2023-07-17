import React, { useEffect } from 'react'
import { useState } from 'react'
import Post from './Post';



export default function PostList() {
    let [data, setData] = useState([]);
    let [loading, setLoading] = useState(false);
    let [page, setPage] = useState(1);
    let [dataLength, setDataLength] = useState(1)

    useEffect(() => {
        getTheData(page);
    }, [page])

    let fetchedData = (page) => {
        return fetch(`https://jsonplaceholder.typicode.com/posts?_limit=7&_page=${page}`).then(async (res) => {

            return {
                data: await res.json(),
                total: Number(res.headers.get("x-total-count"))
            }


        });
    }
    const getTheData = async (page) => {
        try {
            setLoading(true);
            let { data, total } = await fetchedData(page);

            setData(data)
            setLoading(false)
            setDataLength(total)
        } catch (err) {
            console.log(err)
        }

    }

    if (loading) {
        return <h1 style={{ textAlign: "center" }}>Loading...</h1>
    }
    return (
        <>
            <h1 style={{ textAlign: "center" }}>Post</h1>
            {/* <button style={{display:"block",margin:"auto"}} onClick={getTheData}>Get the Data</button> */}
            <div>
                {data.map((el) => <Post {...el} />)}
            </div>
            <div style={{ width: "10%", margin: "10px auto" }}>
                <button disabled={page <= 1} onClick={() => setPage(page - 1)}>prev</button>
                <button>{page}</button>
                <button disabled={Math.ceil(dataLength / 7) <= page} onClick={() => setPage(page + 1)}>Next {dataLength}</button>
            </div>

        </>

    )
}
