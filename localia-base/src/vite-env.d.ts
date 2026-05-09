
// vite/client — le dice a TypeScript que entienda imports especiales de Vite como import img from './foto.png', 
// variables de entorno import.meta.env, hot reload, etc. Sin esto TypeScript marcaría esos imports como errores.
// vite-plugin-svgr/client — le dice a TypeScript que entienda el ?react al final de los imports SVG. Sin esto, 
// import Logo from './logo.svg?react' daría error de tipos aunque funcione en el navegador.

/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />