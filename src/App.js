import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './userPost';
import CreatePost from './userPost/CreatePost';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/createpost' element={<CreatePost />} />
      </Routes>
    </div>
  );
}

export default App;
