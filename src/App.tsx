import './App.css'
import KanbanBoard from './components/KanbanBoard'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from './components/LoginScreen'

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path='/' element={<LoginScreen/>} /> {/* Login component route */}
                    <Route path='/task-board' element={<KanbanBoard/>} /> {/* KanbanBoard component route */}
                </Routes>
            </div>
        </Router>
    )
}

export default App
