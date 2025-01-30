import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './styles/index.css'
import HomePage from './pages/Home.page.jsx'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter, Route, Routes} from "react-router";
import RemovePagesPage from "./pages/Remove-pages.page.jsx";

// Create a client
export const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route index element={<HomePage/>}/>
                    <Route path={'/remove-pages'} element={<RemovePagesPage/>}/>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>,
)
