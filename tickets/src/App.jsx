import { BrowserRouter } from "react-router-dom";
import Routing from "./Routing";
function App() {
  return (
    <BrowserRouter>
      <div className="p-3">
        <h1 className="text-center">ANNIVERSARY TICKET SALES</h1>
        <Routing />
      </div>
    </BrowserRouter>
  );
}

export default App;
