import { BrowserRouter, Routes, Route } from "react-router-dom";

import TodoList from "./Pages/TodoList";
import AddStudent from "./Pages/AddStudent";
import EditStudent from "./Pages/EditStudent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoList/>} />
        <Route path="/addstudent" element={<AddStudent/>} />
        <Route path="/editstudent/:id" element={<EditStudent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
