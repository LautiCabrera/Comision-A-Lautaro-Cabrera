# Comision-A-Lautaro-Cabrera
Proyecto Final Lenguajes de programación 1 - EPICA SAPEM - Full Stack Tramo 2

Este es el proyecto final del curso "Tramo 2 - Lenguajes de programación 1 - EPICA SAPEM" como "Full Stack Developer", donde se utiliza Node.js con Express y Sequelize para interactuar con una base de datos MySQL y EJS con HTML, CSS y Boostrap para el consumo de la API creada. A continuación, se detallan las dependencias necesarias y las instrucciones para configurar y probar el proyecto.

![Logo]([https://dev-to-uploads.s3.amazonaws.com/uploads/articles/th5xamgrr6se0x5ro4g6.png](https://qualitapps.com/wp-content/uploads/2023/02/102.png))

## Dependencias

Asegúrate de haber instalado las siguientes dependencias antes de ejecutar el proyecto:

- [Node.js](https://nodejs.org/): Plataforma de tiempo de ejecución de JavaScript.
- [npm](https://www.npmjs.com/): Gestor de paquetes de Node.js.

Ejecuta el siguiente comando para instalar las dependencias del proyecto:

```bash
  npm install
```

Las dependencias incluidas en el proyecto son las siguientes:

- **express**: Framework web de Node.js.
- **body-parser**: Middleware para analizar las solicitudes HTTP entrantes.
- **cors**: Middleware para habilitar el acceso a recursos en diferentes dominios (CORS).
- **morgan**: Middleware para registrar solicitudes HTTP.
- **sequelize**: ORM (Object-Relational Mapping) para interactuar con la base de datos.
- **mysql2**: Controlador MySQL para Sequelize.
- **sequelize-cli** (opcional): Herramienta de línea de comandos de Sequelize para crear migraciones y seeders.
- **dotenv** (opcional): Para cargar variables de entorno desde un archivo `.env`.
- **nodemon** (opcional): Herramienta para reiniciar automáticamente el servidor en desarrollo cuando se hacen cambios en el código.

## Configuración

1. Crea un archivo `.env` en la raíz del proyecto y configura las variables de entorno necesarias, como la conexión a la base de datos.

```bash
DB_HOST=localhost
DB_USER=root
DB_PASS=contraseña
DB_NAME=nombre_de_la_base_de_datos
```

2. Ejecuta las migraciones de la base de datos (si estás utilizando `sequelize-cli`):

```bash
  npx sequelize-cli db:migrate
```

3. En su defecto, si no deseas usar migraciones, crea una base de datos ejecutando los siguientes scripts en tu gestor SQL:

```bash
CREATE DATABASE epica;

CREATE TABLE publicaciones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT NOT NULL,
  fecha DATE NOT NULL,
  url_imagen VARCHAR(255)
);
```

## Ejecución

Para ejecutar el proyecto en modo de desarrollo con nodemon, utiliza el siguiente comando:

```bash
  npm run dev
```

O en su defecto:

```bash
  node app.js
```

El servidor estará disponible en `http://localhost:5000`.

## Uso

Este proyecto proporciona una interfaz de usuario basada en EJS para interactuar con las publicaciones. A continuación, se describen las funcionalidades proporcionadas por cada interfaz:

### Lista de Publicaciones (home.ejs)

- Muestra una lista de todas las publicaciones existentes.
- Permite ver los detalles de cada publicación.
- Enlace para editar cada publicación.

### Editar Publicación (editar.ejs)

- Permite editar una publicación existente.
- Se pueden modificar el título, la descripción, la fecha y la URL de la imagen de la publicación.
- Al guardar los cambios, se actualiza la publicación en la base de datos.

### Administración de Publicaciones (admin.ejs)

- Permite crear una nueva publicación.
- Se pueden ingresar el título, la descripción, la fecha y la URL de la imagen de la nueva publicación.
- Al guardar la nueva publicación, se crea en la base de datos.

## Autor

- [@LautiCabrera](https://github.com/LautiCabrera)

## Contribución

Si deseas contribuir a este proyecto o informar sobre problemas, no dudes en abrir un problema o enviar una solicitud de extracción.

¡Disfruta del proyecto!
