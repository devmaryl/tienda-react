# 📷 Focus Store

Focus Store es un e-commerce desarrollado con React orientado a la venta de cámaras, lentes y accesorios fotográficos.

El proyecto fue realizado como entrega final del curso de React y cuenta con integración con Firebase para autenticación de usuarios y gestión persistente de productos.

## 🚀 Funcionalidades

- Catálogo de productos obtenido desde Firebase Firestore.
- Vista de detalle de cada producto.
- Carrito de compras gestionado mediante Context API.
- Agregar productos al carrito.
- Eliminar productos individuales del carrito.
- Vaciar el carrito completo.
- Contador de productos actualizado en tiempo real.
- Registro de usuarios mediante Firebase Authentication.
- Inicio y cierre de sesión.
- Rutas protegidas para el panel de administración.
- CRUD completo de productos:
  - Crear productos.
  - Leer productos.
  - Editar productos.
  - Eliminar productos.
- Validación de formularios.
- Modal de confirmación antes de eliminar productos.
- Indicadores de carga mediante Spinner.
- Manejo de errores.
- Barra de búsqueda de productos en tiempo real.
- Paginación del catálogo.
- Diseño responsive para dispositivos móviles, tablets y escritorio.
- SEO dinámico mediante React Helmet.
- Iconografía mediante React Icons.

## 🛠️ Tecnologías utilizadas

- React
- Vite
- JavaScript
- React Router DOM
- Firebase
- Cloud Firestore
- Firebase Authentication
- React-Bootstrap
- Bootstrap
- styled-components
- React Icons
- React Helmet
- HTML5
- CSS3

## 🔥 Firebase

Firebase se utiliza para:

- almacenar los productos mediante Cloud Firestore;
- registrar y autenticar usuarios mediante Firebase Authentication;
- realizar las operaciones CRUD del panel de administración.

Las reglas de Firestore permiten la lectura pública de los productos, mientras que las operaciones de creación, edición y eliminación requieren que el usuario esté autenticado.

## 📦 Instalación

Para ejecutar el proyecto localmente es necesario tener instalado Node.js y npm.

Clonar el repositorio:

```bash
git clone https://github.com/devmaryl/tienda-react.git
```

Ingresar a la carpeta del proyecto:

```bash
cd tienda-react
```

Instalar las dependencias:

```bash
npm install
```

## 🔐 Variables de entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

El archivo `.env` se encuentra incluido en `.gitignore` y no debe subirse al repositorio.

## ▶️ Ejecutar el proyecto

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible normalmente en:

```text
http://localhost:5173
```

## 🏗️ Generar versión de producción

Ejecutar:

```bash
npm run build
```

Vite generará la carpeta `dist` con la versión optimizada de producción.

## 🗂️ Estructura principal

```text
src/
├── componentes/
│   ├── CartWidget/
│   ├── Item/
│   ├── ItemListContainer/
│   ├── Login/
│   ├── ProtectedRoute/
│   ├── Registro/
│   └── layout/
├── context/
│   ├── AuthContext.jsx
│   └── CartContext.jsx
├── firebase/
│   └── config.js
├── paginas/
│   ├── Administracion.jsx
│   ├── Carrito.jsx
│   ├── Inicio.jsx
│   ├── ProductoDetalle.jsx
│   └── Productos.jsx
├── App.jsx
└── main.jsx
```

## 🔒 Administración

La ruta de administración está protegida.

Un usuario no autenticado que intente acceder al panel será redirigido a la pantalla de inicio de sesión.

Desde el panel de administración un usuario autenticado puede crear, editar y eliminar productos almacenados en Firestore.

## 📱 Diseño responsive

La aplicación utiliza React-Bootstrap y su sistema de grillas para adaptar el catálogo a distintos tamaños de pantalla.

La distribución de productos cambia según el dispositivo:

- móvil: 1 producto por fila;
- tablet: 2 productos por fila;
- escritorio: 3 productos por fila.

También se utilizan styled-components para crear estilos reutilizables y encapsulados.

## 🔎 Búsqueda y paginación

El catálogo cuenta con una barra de búsqueda que filtra productos en tiempo real según el nombre ingresado.

Los productos se muestran paginados para facilitar la navegación y mejorar la experiencia del usuario.

## 👩‍💻 Autora

**María Laura**

Proyecto desarrollado como entrega final del curso de React.

## 🌐 Deploy

El proyecto se encuentra preparado para ser desplegado mediante Vercel.

La versión de producción utiliza las variables de entorno configuradas en la plataforma de despliegue.
