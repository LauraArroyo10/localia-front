import { Routes, Route } from "react-router-dom";
import Home from './components/pages/Home';
import ResultsPage from "./pages/ResultsPage";


function App() {

  return (

    <ResultsPage />
    /*<Routes>

      <Route
        path="/"
        element={<Home />}
      />

    </Routes>*/

  );
}

export default App;