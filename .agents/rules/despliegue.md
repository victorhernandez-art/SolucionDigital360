# Regla: Proceso de Despliegue a GitHub y Vercel (Producción)

## Directiva de Seguridad Principal
Cualquier agente que trabaje en este repositorio debe respetar este protocolo:
1. **SIEMPRE solicitar autorización explícita al usuario** antes de subir cambios a GitHub o desplegar a Vercel en producción.
2. No realizar el push ni el comando `vercel --prod` hasta que el usuario responda afirmativamente.

## Protocolo de Ejecución Autorizado
Al recibir la confirmación del usuario, ejecutar automáticamente:
1. `npm run build` (asegurar compilación exitosa 0 errores).
2. Actualizar registro en `README.md` y `HISTORIAL.md`.
3. `git add .` -> `git commit -m "..."` -> `git push origin main`.
4. `npx vercel --prod --yes` (despliegue directo a producción).
5. Verificar respuesta 200 en `https://solucion-digital360.vercel.app`.
6. Entregar confirmación con el enlace de producción.
