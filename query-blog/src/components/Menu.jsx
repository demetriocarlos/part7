import { Link } from "react-router-dom"
 import { useAuth } from "../hooks/useAuth";
// import { LogoutButton } from "./LogoutButton";
 import { useState, useEffect ,} from "react";
 import LogoutSection from "./LogoutButton"
 import {  PlusCircle, Users,} from 'lucide-react';
  
export const Menu = () => {
   const {state} = useAuth()
   const [menuOpen, setMenuOpen] = useState(false);
   //
   const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 640);
   // Estado para almacenar la posición anterior del scroll
   const [prevScrollPos, setPrevScrollPos] = useState(0)
   const [visible, setVisible] = useState(true)
   
   const updateMedia = () => {
    setIsDesktop(window.innerWidth >= 640);
  };



// Efecto para manejar el cambio de tamaño de la ventana
  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  });
  
// Efecto para manejar el scroll
  useEffect(() => {
    const handleScroll = () => {
      // Obtener la posición actual del scroll
      const currentScrollPos = window.pageYOffset

      // Determinar si el navbar debe ser visible
      // Será visible si se está scrolleando hacia arriba o si estamos cerca del top de la página
      const visible = prevScrollPos > currentScrollPos || currentScrollPos < 10

      // Actualizar la posición anterior del scroll
      setPrevScrollPos(currentScrollPos)
      // Actualizar la visibilidad del navbar
      setVisible(visible)
    }

    // Agregar el event listener para el scroll
    window.addEventListener('scroll', handleScroll)
    // Limpiar el event listener cuando el componente se desmonte
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos])// Este efecto se ejecutará cada vez que prevScrollPos cambie

   //

   const navItems = [
    { id: 'blogs', to: '/', label: 'Blogs', label2:'Blogs', isTitle: true},
    { id: 'create', to: '/add-blog', label: <PlusCircle/>, label2:'create', isTitle: false },
    { id: 'users', to: '/users', label:<Users/>, label2:'users', isTitle: false },
  ];
    
  return (
    <div> 
        {/*`visible` controla si la barra de navegación está visible o oculta (fuera de la vista hacia arriba).*/}
     <nav className={ `bg-white shadow-md  fixed w-full transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'} `}>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Flex container para los elementos de navegación, con adaptaciones para pantallas pequeñas y grandes */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center "></div>

              {/* Si estamos en una pantalla de escritorio (isDesktop es true) */}
            {isDesktop ? (
              <div className="hidden sm:block">   
                <div className="flex items-center space-x-4">


                {navItems.map((item) => (
                  <div key={item.id}>
                  <Link
                     
                    to={item.to}
                    className={`flex items-center justify-center ${
                      item.isTitle
                        ? 'flex-shrink-0'
                        : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out'
                    }`}
                  >
                    {item.isTitle ? (
                      <span className="text-2xl font-bold text-indigo-600">
                        {item.label}
                      </span>
                    ) : (
                      item.label
                    )}
                  </Link>

                  </div>
                ))}

                  <LogoutSection username={state.username} />
                </div>
              </div>
            ) : (
              // Si no es un escritorio (es decir, en pantallas pequeñas)
              <div className="flex space-x-4  absolute inset-y-4  left-0" >
                {/* Otros elementos que solo se mostrarán en pantallas pequeñas */}
                
                {navItems.map((item) => (
                  <div key={item.id}>
                  <Link
                     
                    to={item.to}
                    className={`flex items-center justify-center ${
                      item.isTitle
                        ? 'flex-shrink-0'
                        : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out'
                    }`}
                  >
                     {/* Si es un título, lo renderiza con un estilo prominente */}
                    {item.isTitle ? (
                      <span className="text-2xl font-bold text-indigo-600">
                        {item.label}
                      </span>
                    ) : (
                      item.label
                    )}
                  </Link>

                  </div>
                ))}
              </div>
            )}
          </div>

            {/* Botón de menú hamburguesa para pantallas pequeñas. Permite abrir/cerrar el menú. */}
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded={menuOpen ? "true" : "false"}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="sr-only">Open main menu</span>
               {/* Muestra el ícono del menú hamburguesa si el menú está cerrado */}
              {!menuOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              ) : (
                // Muestra el ícono de cerrar si el menú está abierto
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

       {/* Menú desplegable para pantallas pequeñas. Se muestra solo si `menuOpen` es true. */}
      {menuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">

          {navItems.map((item) => (
            <div key={item.id}>
                <Link
                
                to={item.to}
                className="text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
              >
                {item.label2}
              </Link>
            </div>
              
            ))}
            {/* Sección de logout en el menú móvil */}
            <LogoutSection username={state.username} />
          </div>
        </div>
      )}
      </nav>
      <br />
      <br /> 
    </div>
  )
}






