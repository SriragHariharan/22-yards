import './App.css'
import { RouterProvider } from "react-router-dom";

  
  //MDBootstrap
  import 'mdb-react-ui-kit/dist/css/mdb.min.css';
  import "@fortawesome/fontawesome-free/css/all.min.css";
  
  //router custom hook
  import useRouter from './Router/useRouter';

  //react-toastify
  import 'react-toastify/dist/ReactToastify.css';



function App() {

  const [router] = useRouter()
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
