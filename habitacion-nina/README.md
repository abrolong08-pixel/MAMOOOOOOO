# 🏡 La Habitación de Nina

Sección 3D interactiva (Three.js) para el proyecto **Nuestra Historia**.

## Estructura
```
habitacion-nina/
├─ index.html          ← página de la sección
├─ css/style.css       ← estilos (HUD, ventanas de mensajes)
├─ js/habitacion.js    ← escena 3D, jirafita, misión y música
├─ assets/musica.mp3   ← música de fondo
└─ fotos/              ← tus fotos reales
```

## Subir a GitHub y publicar
1. Copia la carpeta `habitacion-nina/` dentro de tu repositorio de "Nuestra Historia" (las demás secciones no se tocan).
2. `git add . && git commit -m "Añade la habitación de Nina" && git push`
3. En GitHub: **Settings → Pages → Deploy from a branch → main / (root)**.
4. La sección quedará en `https://TU-USUARIO.github.io/TU-REPO/habitacion-nina/`
5. Enlázala desde tu menú: `<a href="habitacion-nina/index.html">🏡 La habitación de Nina</a>`
   o incrústala: `<iframe src="habitacion-nina/index.html" style="width:100%;height:100vh;border:0"></iframe>`

## Personalizar
- **Textos y fotos:** objeto `TX` al inicio de `js/habitacion.js`. Para fotos reales, copia las imágenes a `fotos/` y escribe `src:'fotos/nina1.jpg'` en `TX.fotos` (ruta relativa a `index.html`).
- **Posición de los 10 corazones:** lista `HUNT`.
- **Música:** reemplaza `assets/musica.mp3` (mismo nombre) o cambia la ruta en la sección 11 del JS.
- **Reiniciar el progreso:** abre la página con `?reset` al final de la URL.

## Notas
- La música solo puede empezar tras el primer toque en la pantalla (regla de los navegadores). El botón 🔊 la silencia.
- La canción tiene derechos de autor. En un repositorio público podría recibir un aviso de retirada; si prefieres evitarlo, usa un repo privado o música libre de derechos.
- Probar en local: abre una terminal en la carpeta y ejecuta `python3 -m http.server`, luego visita `http://localhost:8000`. (Abrir `index.html` con doble clic puede bloquear el audio y las fotos.)

## Cartas y corazones
- Cada objeto con un **sobre ✉️** flotando abre una carta. Los textos están en `TX` (`js/habitacion.js`); para añadir más cartas a espejo, ventana, armario o estantería, agrega elementos a sus listas.
- Los 10 corazones **rojos y brillantes** cuentan para la misión. Si no encuentras alguno, el botón 💡 muestra un círculo que apunta al más cercano. Los corazones rosas que flotan son decorativos (explotan al tocarlos).

- Cada corazón rojo que encuentras muestra un mensaje y su número (1/10, 2/10…). Los mensajes están en `TX.hearts`.
- Si algo falla, el juego muestra un aviso ⚠️ con el error. Si ves cambios que no aparecen, recarga con Ctrl+F5 (o vacía la caché).
