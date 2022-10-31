import  ReactDOM  from "react-dom"

export default function Login() {
  return ReactDOM.createPortal(
    <div className="h-full bg-white absolute top-0 bottom-0 right-0 left-0">
Login
    </div>
    ,   document.getElementById('portal')

  )
}
