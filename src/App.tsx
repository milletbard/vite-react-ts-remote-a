import { BrowserRouter } from "react-router-dom";
import RemoteApp from "./RemoteApp";
import "@/App.css";

function App() {
  // 如果是本地開發或自己上線測試，則使用 BrowserRouter 包住 RemoteApp RemoteApp，
  // 如果是遠端開發，則 Consumer 提供 BrowserRouter
  return (
    <BrowserRouter>
      <RemoteApp />
    </BrowserRouter>
  );
}

export default App;
