---
title: '⚠️🛑 {{ env.ACTION_TYPE }} Failed in {{ payload.repository.name }}'
labels: 'bug, automation'
---

La acción **{{ env.ACTION_TYPE }}** falló en la ejecución del flujo de trabajo en la rama **{{ env.BRANCH }}**. Por favor, revisa los errores y toma las medidas necesarias.

### Detalles del error:

-   [Enlace al flujo de trabajo fallido]({{ env.URL_ACTION_RUN }})

### Pasos a seguir:

1. Revisa los logs del flujo de trabajo para identificar los errores.
2. Aplica las correcciones necesarias según el contexto del fallo (ya sea de lint, build u otro).
3. Vuelve a hacer commit y push de los cambios para ejecutar el flujo de trabajo nuevamente.
