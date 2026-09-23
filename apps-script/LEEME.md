# Capturas en el Drive compartido

El sitio puede subir las capturas a una carpeta de Drive compartida. Así lo
que sube uno le aparece al otro, y cada celular guarda una copia para verla
sin señal. Hay que hacerlo una sola vez, desde un computador, con la cuenta
de Google dueña de la carpeta. Son unos 10 minutos.

## 1. Crear el script

1. Entrar a <https://script.google.com> y tocar **Nuevo proyecto**.
2. Ponerle un nombre, por ejemplo "Capturas viaje Japón".
3. Borrar lo que trae y pegar todo el contenido de `Codigo.gs`.
4. Cambiar las dos líneas de arriba:
   - `CLAVE`: una frase larga que no usen en otro lado, por ejemplo
     `"tokio-onomichi-caqui-2026"`. Es lo que va a proteger las capturas.
   - `CARPETA_ID`: abrir la carpeta compartida en Drive. El ID es lo que
     viene después de `/folders/` en la dirección.
5. Guardar. Elegir la función **probar** y tocar **Ejecutar**. Google va a
   pedir permisos: aceptarlos. Si aparece "Google no verificó esta app",
   entrar en **Configuración avanzada → Ir a…**, porque la app es suya.
   Después de esto, debería aparecer la subcarpeta "Capturas del sitio".

## 2. Publicarlo

1. **Implementar → Nueva implementación**, tipo **Aplicación web**.
2. Ejecutar como: **Yo**. Quién tiene acceso: **Cualquier usuario**.
   Sin eso, los celulares no pueden conectarse. Lo que protege las
   capturas es la clave.
3. **Implementar** y copiar la URL, la que termina en `/exec`.

Si su cuenta es de una empresa (Google Workspace) y no aparece la opción
"Cualquier usuario", el administrador la tiene bloqueada. En ese caso hay
que hacer todo con una cuenta de Gmail personal que tenga acceso a la
carpeta.

## 3. Conectar el sitio

1. Pegar la URL en `index.html`, en `drive: { script: "…" }`, o pedírselo
   a Claude. La URL puede quedar en el repo público; la clave no.
2. En cada celular: abrir cualquier hotel, tocar **Conectar con Drive** y
   escribir la clave.

## Si cambian el código del script

Una implementación nueva cambia la URL. Para mantener la misma, usar
**Implementar → Gestionar implementaciones → editar → Versión nueva**.
