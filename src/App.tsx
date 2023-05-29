import React from 'react';
import './App.css';
import { Users } from './components/Users'
import { QueryClientProvider, QueryClient } from 'react-query';

function App() {
  const queryClient = new QueryClient()
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Users/>
      </QueryClientProvider>
    </div>
  );
}

export default App;
