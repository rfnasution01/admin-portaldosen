import { MainHeader } from './mainHeader'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Mainlayout() {
  return (
    <div className="scrollbar flex h-full w-full flex-col overflow-y-auto text-[2rem] phones:text-[2.4rem]">
      {/* --- Header --- */}
      <MainHeader />
      <div className="scrollbar flex-1 overflow-y-auto bg-red-300">
        {/* --- Aside --- */}
        {/* --- Konten --- */}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
        architecto corrupti, officiis beatae porro dolor quam neque dicta saepe
        sapiente minus at praesentium nesciunt incidunt, natus placeat
        aspernatur deleniti doloribus!
      </div>
      <ToastContainer />
    </div>
  )
}
