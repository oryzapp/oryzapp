import { QRCodeCanvas } from 'qrcode.react';
import React from 'react'

export default function Test() {

    const downloadQR = (name) => {
        const canvas = document.getElementById(`qr-gen-${name}`);

        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `${name}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
    const arrayOfLove = [
        { name: 'meow' },
        { name: 'bee' },
        { name: 'beerto' },
    ]

    arrayOfLove.map((item) => {
        console.log(item.name);
    })

    return (
        <div>
            {
                arrayOfLove.map((item) => (
                    <div className='p-3' id='hehe'>
                        <QRCodeCanvas id={`qr-gen-${item.name}`} value={item.name} />
                        <button onClick={() => { downloadQR(item.name) }}>download</button>

                    </div>
                ))
            }

        </div>
    )
}
