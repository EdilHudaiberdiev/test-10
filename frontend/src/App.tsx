import './App.css';
import {Route, Routes} from 'react-router-dom';
import Home from './Containers/Home/Home';
import Toolbar from './Components/UI/Toolbar/Toolbar';
import AddNewPost from './Containers/AddNewPost/AddNewPost';
import FullNews from './Containers/FullNews/FullNews';
const App = () => {

  return (
    <>
      <header>
        <Toolbar/>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/news/:id" element={<FullNews/>}/>
          <Route path="/new-post" element={<AddNewPost/>}/>
          <Route path="*" element={(<h1>Not found</h1>)}/>
        </Routes>
      </main>

    </>
  );
};

export default App;
