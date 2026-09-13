# Ferretería El Tornillo

Sitio web estático desarrollado para el taller práctico integrador **Del código local a internet GitHub y Vercel**.

## Funcionalidades

- Página de una sola sección continua con inicio, productos y contacto.
- Información visible de horario, ubicación y WhatsApp.
- Cuatro categorías de productos en tarjetas.
- Formulario con validación en el navegador.
- Botón de envío deshabilitado mientras los datos no sean válidos.
- Diseño adaptable para computador, tableta y celular.
- Accesibilidad básica: HTML semántico, etiquetas asociadas, foco visible, región de estado y enlace para saltar al contenido.
- Política CSP y encabezados de seguridad configurados para Vercel.

## Estructura

```text
ferreteria-el-tornillo/
├── index.html
├── css/
│   └── estilos.css
├── js/
│   └── contacto.js
├── tests/
│   └── contacto.test.cjs
├── vercel.json
├── .gitignore
└── README.md
```

## Ejecución local

La forma recomendada es iniciar un servidor HTTP desde la carpeta del proyecto:

```bash
python -m http.server 8000
```

Después se abre `http://localhost:8000` en el navegador.

## Prueba automatizada de la validación

No requiere instalar paquetes adicionales. Desde la carpeta del proyecto se ejecuta:

```bash
node tests/contacto.test.cjs
```

La prueba comprueba el estado inicial, el rechazo de un nombre corto, la habilitación con datos válidos, el mensaje de éxito, el reinicio del botón y la actualización del año.

## Reglas del formulario

| Campo | Regla |
|---|---|
| Nombre | Obligatorio, mínimo 2 y máximo 60 caracteres |
| Mensaje | Obligatorio, mínimo 10 y máximo 500 caracteres |

El formulario es demostrativo: valida la información localmente, muestra un mensaje de éxito y no envía ni almacena datos.

## Publicación con GitHub y Vercel

1. Crear un repositorio vacío en GitHub.
2. Ejecutar desde esta carpeta:

```bash
git remote add origin https://github.com/TU-USUARIO/ferreteria-el-tornillo.git
git branch -M main
git push -u origin main
```

3. En Vercel, seleccionar **Add New > Project**, importar el repositorio y elegir **Deploy**.
4. Verificar que la URL pública cargue mediante HTTPS.

## Actualización continua

Después de realizar un cambio:

```bash
git add .
git commit -m "Descripción clara del cambio"
git push
```

Vercel detectará el nuevo `push` y creará automáticamente otro despliegue.

## Pruebas de aceptación

1. Se muestran las secciones Inicio, Productos y Contacto.
2. El sitio mantiene una distribución legible a 1440 px y 390 px de ancho.
3. El formulario no se puede enviar con campos vacíos.
4. Un nombre de un solo carácter se marca como inválido.
5. Con un nombre de dos o más caracteres y un mensaje de diez o más, el botón queda habilitado.
6. Al enviar datos válidos aparece un mensaje de confirmación.
7. No se cargan librerías, fuentes ni scripts desde terceros.
8. En Vercel se entregan los encabezados definidos en `vercel.json`.
