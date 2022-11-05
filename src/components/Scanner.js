import { useState } from 'react'
import { QrReader } from 'react-qr-reader'
export default function Scanner() {

    const [data, setData] = useState('No result ')

    return (
        <>
            <div className=" text-center bg-red-300">
                <QrReader onResult={(result, error) => {
                    if (!!result) {
                        setData(result?.text);
                    }

                    if (!!error) {
                        console.info(error);
                    }
                }} />
                <h1>{data}</h1>

            </div>
        </>
    )
}
