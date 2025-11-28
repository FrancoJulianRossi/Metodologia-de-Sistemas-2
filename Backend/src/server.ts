/**
 * Punto de entrada de la aplicación Express.
 * Crea la app usando makeApp() y la inicia en el puerto 3000.
 */
import makeApp from './app';

const app = makeApp();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});