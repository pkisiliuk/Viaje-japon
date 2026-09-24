# Sitio del viaje a Japón

Sitio estático de un solo archivo (`index.html`) para organizar un viaje a
Japón del 8 al 22 de octubre de 2026. Lo usan dos personas desde el celular,
muchas veces sin conexión.

## Regla principal

**Casi todos los cambios se hacen dentro del objeto `const VIAJE = {...}`**,
al comienzo de `index.html`. Ese bloque es el contenido del viaje: días,
hoteles, transporte, restaurantes, pendientes, documentos y decisiones.

No toques el CSS ni el JavaScript de abajo salvo que el pedido sea
explícitamente sobre el diseño o el comportamiento del sitio.

## Restricciones que no se negocian

- **Un solo archivo, sin dependencias externas.** Nada de CDN, fuentes de
  Google, librerías ni imágenes remotas. El sitio tiene que funcionar sin
  señal, en el metro de Tokio.
- **Nunca subas documentos sensibles al repositorio.** El repo es público.
  Pasajes, vouchers, códigos de reserva y pasaportes viven en Google Drive.
  En el sitio solo van los enlaces, en los campos `doc`.
- **Las fechas son texto plano `"AAAA-MM-DD"`.** No uses `new Date(string)`
  sobre ellas: corre un día por zona horaria. Ya existen los helpers `d()`,
  `corto()` y `dias()`.
- **Español de Chile**, sin tono de folleto turístico.

## Estructura de los datos

- `decisiones` — datos que cambian instrucciones de otras secciones, como a
  qué aeropuerto llegan. Vacío (`""`) significa sin decidir: el sitio muestra
  entonces todas las opciones y deja el pendiente abierto.
- `dias` — un objeto por día, en orden cronológico.
  Cada día puede tener `agenda`: una lista de `{ hora:"HH:MM", texto }`
  para visitas, ferries, vuelos o lo que sea. Opcionales: `tipo` ("Visita"),
  `nota`, y `doc`/`docs` con las entradas en Drive; si tiene documentos, la
  fila se abre al tocarla. El itinerario arma solo la
  agenda del día juntando esa lista con los check-in y check-out de los
  hoteles (`checkin`/`checkout` opcionales con la hora), los tramos (`hora`
  opcional) y los restaurantes (`hora`). También muestra en qué hotel
  duermen. Lo que no tiene hora aparece con un punto y se ordena solo.
- `hoteles` — el sitio detecta solo las estadías que se superponen y las
  marca. No hace falta señalarlas a mano.
- `transporte` — tramos. Si un tramo depende de una decisión, lleva `segun`
  con el nombre de la decisión y `opciones` con un texto por alternativa.
  Puede llevar también `enlaces`, con un enlace por alternativa. Un tramo
  queda como comprado (en verde) si tiene el pasaje en `doc` o si `reserva`
  dice `"Comprado"`. `tipo` opcional ("Vuelo") cambia cómo aparece en la
  agenda del día; sin él dice "Traslado".
- `pendientes` — con `resuelvePor` si se cierran escribiendo una decisión,
  o sin ese campo si son un simple visto bueno.
- `comidas` y `documentos` — listas que empiezan vacías.
- Hoteles, tramos y restaurantes se abren al tocarlos y muestran sus
  documentos: el enlace de `doc`, más los de una lista opcional `docs`
  (`{ nombre, url }`), y las capturas que cada uno guarda en su celular.
  Esas capturas viven solo en el navegador y nunca pasan por el repo.

## Al terminar

Resume en el comentario qué campos cambiaste, en lenguaje normal: "cancelé la
reserva del Celestine y dejé el aeropuerto de llegada en Haneda". Nada de
diffs ni nombres de variables.
