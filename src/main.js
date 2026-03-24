import './main.css'
import { useEffect, useState } from "react";
import axios from "axios";

function Main() {

    const [info, setInfo] = useState([]);
    const [page, setPage] = useState(1);
    const pageItem = 10;

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/posts")
            .then((res) => {
                setInfo(res?.data);
            })
            .catch((e) => {
                console.log(e);
            })
    }, [])

    return (
        <>
            <div className='tbl-main'>
                <div className='tbl'>
                    <h1>Comapny Information</h1>
                    <table>
                        <thead>
                            <tr>
                                <td><b>Id</b></td>
                                <td><b>Title</b></td>
                                <td><b>Body</b></td>
                            </tr>
                        </thead>
                        <tbody>
                            {info?.slice(page * pageItem - pageItem, page * pageItem)?.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item?.id}</td>
                                        <td>{item?.title}</td>
                                        <td>{item?.body}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                    <div style={{marginBottom:" 25px"}}>
                        <button disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}>Previous </button>
                        <span> Page {page} of {Math.ceil(info.length / pageItem)} </span>
                        <button disabled={page === Math.ceil(info.length / pageItem)} onClick={() => setPage((prev) => prev + 1)}> Next</button>
                    </div>

                </div>
            </div>

        </>
    )
}

export default Main;