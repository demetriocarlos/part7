import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext.jsx' // Importar el proveedor de contexto
//import { BlogProvider } from './contexts/BlogContext.jsx'
import { NotificationProvider } from './contexts/NotificationContext.jsx'
const queryClient = new QueryClient();


/**<BlogProvider>
 * </BlogProvider>
 */

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
      </AuthProvider>
    </QueryClientProvider >
  </React.StrictMode>,
)
