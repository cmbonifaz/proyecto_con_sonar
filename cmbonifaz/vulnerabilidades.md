# Reporte de Vulnerabilidad: Command Injection (Inyección de Comandos)

## 1. Vulnerabilidad Detectada
* **Tipo:** Command Injection (Inyección de Comandos) / `detect-child-process`
* **Severidad:** Alta / Crítica (puede resultar en la ejecución de comandos arbitrarios y control total del sistema).
* **Ubicación:** `apps/analisis-vulnerabilidades/backend/index.js` (Línea 151-160, endpoint `/api/exec`).
* **Descripción:** 
  El endpoint `/api/exec` recibía un comando directo a través del parámetro de consulta `req.query.cmd` y lo pasaba sin ningún tipo de saneamiento o validación a la función `exec()` de `child_process`. Esto permitía a un atacante enviar comandos maliciosos usando caracteres especiales (como `;`, `&`, `|`) para ejecutar cualquier instrucción del sistema operativo bajo los privilegios del proceso del contenedor.

### Código Vulnerable Original:
```javascript
app.get('/api/exec', (req, res) => {
  const cmd = req.query.cmd || '';
  // MUY PELIGROSO: ejecuta directamente el comando
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      return res.json({ command: cmd, error: error.message, stderr });
    }
    res.json({ command: cmd, stdout, stderr });
  });
});
```

---

## 2. Implementación de la Corrección
Para remediar esta vulnerabilidad y cumplir con las directrices de seguridad de las herramientas SAST (como Semgrep), se aplicó una estrategia de **Lista Blanca Estricta (Whitelisting)** y se **rompió el flujo de datos no confiables (Taint Flow)** mediante la asignación estática de literales predefinidos.

### Código Corregido:
```javascript
app.get('/api/exec', (req, res) => {
  const cmd = req.query.cmd || '';
  
  // Mitigación: Uso de lista blanca estricta y asignación directa de literales fijos
  // para romper el flujo de datos no confiables (taint flow) hacia exec.
  let safeCmd = '';
  if (cmd === 'whoami') {
    safeCmd = 'whoami';
  } else if (cmd === 'hostname') {
    safeCmd = 'hostname';
  } else if (cmd === 'date') {
    safeCmd = 'date';
  } else {
    return res.status(400).json({ error: 'Comando no permitido. Solo se permiten: whoami, hostname, date.' });
  }

  exec(safeCmd, (error, stdout, stderr) => {
    if (error) {
      return res.json({ command: cmd, error: error.message, stderr });
    }
    res.json({ command: cmd, stdout, stderr });
  });
});
```

### Detalles de la Mitigación:
1. **Restricción estricta:** Solo se permiten tres comandos seguros predeterminados (`whoami`, `hostname`, `date`). Cualquier otra entrada es inmediatamente descartada con una respuesta de error HTTP 400.
2. **Eliminación de Taint Flow:** Al no pasar la variable dinámica `cmd` (que contiene la entrada del usuario) directamente a `exec()`, sino utilizar asignaciones condicionales duras en una nueva variable local (`safeCmd`), el analizador estático no detecta propagación de flujo contaminado, solucionando la alerta SAST.

---

## 3. Resultados
* **Seguridad del Entorno:** Se neutraliza por completo la posibilidad de inyectar comandos remotos (RCE), salvaguardando la integridad del contenedor y de la máquina host.
* **Resolución en SAST:** Las alertas correspondientes a `express-child-process`, `tainted-os-command-child-process-express` y `detect-child-process` en Semgrep quedan resueltas satisfactoriamente.
* **Preservación de Funcionalidad:** La aplicación sigue permitiendo realizar la demostración básica segura de las consultas `whoami`, `hostname` y `date` desde el frontend, bloqueando de manera proactiva cualquier intento de abuso.
