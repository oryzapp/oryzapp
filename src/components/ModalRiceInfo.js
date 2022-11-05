import ReactDom from "react-dom";

export default function ModalRiceInfo({ open, children }) {
    if (!open) return null;
    console.log(open);
    return ReactDom.createPortal(
        <>
            <div className=" fixed left-0 right-0 bottom-0 top-0 z-50 bg-black opacity-70 " />
            <div className=" flex flex-col absolute left-3 right-3 bottom-16 top-16 sm:left-12 sm:right-12 md:left-28 md:right-28 lg:left-1/4 lg:right-1/4 z-50 bg-red-500 rounded-md  px-6 pt-10 pb-6   ">

                {children}
            </div>
        </>,
        document.getElementById('portal')
    )
}
