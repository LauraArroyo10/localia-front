import { Routes, Route } from "react-router-dom";
import Home from './components/pages/Home';
import ResultsPage from "./pages/ResultsPage";

import Home from './pages/Home';
import ResultsPage from './pages/ResultsPage';
import DashBoard from './pages/DashBoard';


function App() {

  return (

    <ResultsPage />
    /*<Routes>

      <Route
        path="/"
        element={<Home />}
      />

    </Routes>*/

    <> 
    <div> 
<DashBoard/>
</div>

<div> 
   <Home/>
   </div>

   <div> 
<ResultsPage/> 
</div>
</>
  );
}

export default App;