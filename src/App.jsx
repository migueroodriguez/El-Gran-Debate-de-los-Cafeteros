import { useEffect, useState } from 'react';

import './tailwind1.css';
import './tailwind2.css'; 

function App() {
  const [resultado, setResultado] = useState('');
  const [darkMode] = useState(false); 

  useEffect(() => {
    const htmlElement = document.querySelector('html');
    if (htmlElement) {
      htmlElement.classList.add('absolute', 'inset-0', 'bottom-10', 'bg-bottom', 'bg-no-repeat', 'bg-slate-50', 'dark:bg-[#0B1120]', 'index_beams__yWcJT');
    }

    return () => {
      if (htmlElement) {
        htmlElement.classList.remove('absolute', 'inset-0', 'bottom-10', 'bg-bottom', 'bg-no-repeat', 'bg-slate-50', 'dark:bg-[#0B1120]', 'index_beams__yWcJT');
      }
    };
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const leerArchivo = (event) => {
    const archivo = event.target.files[0];
    const lector = new FileReader();

    lector.onload = function(event) {
      const contenido = event.target.result;
      const fechas = contenido.split('\n');
      const digitosFrecuencia = new Array(10).fill(0);

      fechas.forEach(function(fecha) {
        for (let i = 0; i < fecha.length; i++) {
          const caracter = fecha.charAt(i);
          if (!isNaN(caracter)) {
            const digito = parseInt(caracter);
            digitosFrecuencia[digito]++;
          }
        }
      });

      let maxFrecuencia = 0;
      let digitoMasFrecuente = 0;
      for (let i = 0; i < digitosFrecuencia.length; i++) {
        if (digitosFrecuencia[i] > maxFrecuencia) {
          maxFrecuencia = digitosFrecuencia[i];
          digitoMasFrecuente = i;
        }
      }

      setResultado(`El dígito más frecuente es el ${digitoMasFrecuente} con ${maxFrecuencia} apariciones.`);
    };

    lector.readAsText(archivo);
  };

  return (
    <div className={`flex justify-center items-center h-screen dark`}>
      <div className="p-8 max-w-lg w-full text-center shadow-xl sm:rounded-xl bg-white dark:bg-slate-900/70 dark:backdrop-blur dark:ring-1 dark:ring-inset dark:ring-white/10">
        <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">El Gran Debate de los Cafeteros</h1>
        <p className="mt-6 text-lg text-slate-600 text-center max-w-3xl mx-auto dark:text-slate-400">Selecciona el archivo "fechas_cafeteria.txt":</p>
        <form className="m-8 max-w-lg w-full mx-auto flex justify-center text-center">
          <label className="block">
            <span className="sr-only">Choose profile photo</span>
            <input type="file" accept=".txt" onChange={leerArchivo} className="block w-full text-sm text-slate-600 dark:text-slate-400 
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100
            "/>
          </label>
        </form>
        <div className="mt-6 text-slate-500 text-center max-w-3xl mx-auto dark:text-slate-300" id="resultado">{resultado}</div>
      </div>
    </div>
  );
}

export default App;
