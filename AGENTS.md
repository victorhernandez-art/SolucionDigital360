# 📜 Reglas del Proyecto — Solución Digital 360

Este archivo establece las directivas operativas obligatorias para cualquier agente de IA o desarrollador que trabaje en este repositorio.

---

## 🔒 Regla Obligatoria: Proceso de Despliegue a GitHub y Vercel

Cualquier agente que realice modificaciones en el código o contenido de este proyecto debe conocer y ejecutar el mecanismo estandarizado de despliegue, **con una condición crítica de seguridad**:

> ⚠️ **SOLICITUD DE AUTORIZACIÓN OBLIGATORIA:**
> **NUNCA ejecutes el despliegue a producción de manera automática o silenciosa.** 
> Una vez completados y validados los cambios locales, debes presentar un resumen de lo realizado y **solicitar confirmación explícita al usuario** antes de proceder a subir a GitHub y desplegar en Vercel.

---

### 📋 Flujo de Trabajo Estandarizado (Paso a Paso)

Una vez que el usuario otorgue su autorización, el agente debe ejecutar de forma autónoma el siguiente protocolo:

#### 1. Verificación del Build Local
Antes de tocar Git o Vercel, validar que el proyecto compile limpiamente y sin errores de TypeScript ni rutas:
```powershell
npm run build
```
*(Debe terminar con código 0 y todas las rutas estáticas SSG generadas correctamente).*

#### 2. Registro y Control de Cambios en Documentación
Mantener la trazabilidad del proyecto actualizando los archivos de historial:
- Registrar los cambios en [README.md](file:///c:/xampp/htdocs/Solucion%20Digital%20360/README.md) bajo la sección `Control de Modificaciones del Sistema`.
- Registrar la nueva versión/ajustes en [HISTORIAL.md](file:///c:/xampp/htdocs/Solucion%20Digital%20360/HISTORIAL.md).

#### 3. Sincronización con GitHub
Añadir los archivos modificados, crear un commit descriptivo y enviarlo al repositorio remoto:
```powershell
git add .
git commit -m "tipo(alcance): descripción clara del cambio"
git push origin main
```
*Repositorio remoto:* `https://github.com/victorhernandez-art/SolucionDigital360.git` (rama `main`).

#### 4. Despliegue Directo a Producción en Vercel
Desplegar la versión de producción directamente con Vercel CLI en modo no interactivo:
```powershell
npx vercel --prod --yes
```
*Detalles del proyecto en Vercel:*
- **Proyecto:** `solucion-digital360`
- **Framework Preset:** `Next.js` (No cambiar a Other).
- **Dominio de producción activo:** `https://solucion-digital360.vercel.app`

#### 5. Verificación de Disponibilidad en Vivo
Confirmar que el sitio en producción responda con código 200:
```powershell
try { $res = Invoke-WebRequest -Uri "https://solucion-digital360.vercel.app" -UseBasicParsing; "Status: " + $res.StatusCode } catch { $_.Exception.Message }
```

#### 6. Notificación Final al Usuario
Informar al usuario que el despliegue concluyó exitosamente, proporcionando el enlace directo a la plataforma:
👉 **https://solucion-digital360.vercel.app**
