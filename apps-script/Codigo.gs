// Recibe las capturas del sitio del viaje y las guarda en Drive.
// Se instala en script.google.com con la cuenta dueña de la carpeta.
// Instrucciones en LEEME.md.

// Cambiar estas dos líneas. Esta copia no va al repositorio.
const CLAVE = "cambia-esta-clave";                // la que van a escribir en cada celular
const CARPETA_ID = "pega-aquí-el-id-de-la-carpeta"; // de la URL de la carpeta compartida

const SUBCARPETA = "Capturas del sitio";
const MARCA = "viaje:"; // va en la descripción; el sitio solo sincroniza estos archivos

function doPost(e) {
  let r;
  try {
    const p = JSON.parse(e.postData.contents);
    if (p.clave !== CLAVE) r = { error: "clave" };
    else if (!ACCIONES[p.accion]) r = { error: "acción desconocida" };
    else r = ACCIONES[p.accion](p);
  } catch (err) {
    r = { error: String(err && err.message || err) };
  }
  return ContentService.createTextOutput(JSON.stringify(r)).setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return ContentService.createTextOutput("Funciona. El sitio del viaje usa este enlace para guardar capturas.");
}

function carpeta() {
  const base = DriveApp.getFolderById(CARPETA_ID);
  const it = base.getFoldersByName(SUBCARPETA);
  return it.hasNext() ? it.next() : base.createFolder(SUBCARPETA);
}

// Solo deja tocar archivos de la subcarpeta, nunca el resto del Drive.
function archivo(id) {
  const f = DriveApp.getFileById(id);
  const id2 = carpeta().getId();
  const padres = f.getParents();
  while (padres.hasNext()) if (padres.next().getId() === id2) return f;
  throw new Error("archivo fuera de la carpeta");
}

const ACCIONES = {
  subir(p) {
    const blob = Utilities.newBlob(Utilities.base64Decode(p.datos), p.tipo || "image/jpeg", p.nombre || "captura");
    const f = carpeta().createFile(blob);
    f.setDescription(MARCA + p.item);
    return { id: f.getId() };
  },
  listar() {
    const archivos = [];
    const it = carpeta().getFiles();
    while (it.hasNext()) {
      const f = it.next();
      const d = f.getDescription() || "";
      if (f.isTrashed() || d.indexOf(MARCA) !== 0) continue;
      archivos.push({ id: f.getId(), item: d.slice(MARCA.length), nombre: f.getName(), fecha: f.getDateCreated().getTime() });
    }
    return { archivos };
  },
  bajar(p) {
    const b = archivo(p.id).getBlob();
    return { tipo: b.getContentType(), datos: Utilities.base64Encode(b.getBytes()) };
  },
  borrar(p) {
    archivo(p.id).setTrashed(true); // queda en la papelera de Drive por 30 días
    return { ok: true };
  }
};

// Para probar desde el editor: Ejecutar → probar. Debe crear la subcarpeta.
function probar() {
  Logger.log("Subcarpeta: " + carpeta().getUrl());
}
