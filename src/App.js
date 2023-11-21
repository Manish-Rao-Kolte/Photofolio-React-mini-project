import Navbar from './Components/Navbar';
import AlbumList from './Components/AlbumList';
import { useState } from 'react';

function App() {
  //using useState to share a function between siblings.
  const [query, setQuery] = useState('');

  return (
    <div className="App">
      <Navbar setQuery={setQuery}/>
      <AlbumList query={query} />  
    </div>
  );
}

export default App;
