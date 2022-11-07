import ReactDom from "react-dom";

export default function ModalRiceInfo({ open, children }) {
    if (!open) return null;
    console.log(open);
    return ReactDom.createPortal(
        <>

            {children}

        </>,
        document.getElementById('portal')
    )
}
