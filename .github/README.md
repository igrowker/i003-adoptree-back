[![Deploy to Dev](https://github.com/igrowker/i003-adoptree-back/actions/workflows/devdeploy.yml/badge.svg)](https://github.com/igrowker/i003-adoptree-back/actions/workflows/devdeploy.yml)
[![Build On Push](https://github.com/igrowker/i003-adoptree-back/actions/workflows/build-on-push.yml/badge.svg)](https://github.com/igrowker/i003-adoptree-back/actions/workflows/build-on-push.yml)
[![onPR](https://github.com/igrowker/i003-adoptree-back/actions/workflows/onPR.yml/badge.svg)](https://github.com/igrowker/i003-adoptree-back/actions/workflows/onPR.yml)
[![Lint](https://github.com/igrowker/i003-adoptree-back/actions/workflows/lint.yml/badge.svg)](https://github.com/igrowker/i003-adoptree-back/actions/workflows/lint.yml)
[![deploy to prod](https://github.com/igrowker/i003-adoptree-back/actions/workflows/deploy-to-prod.yml/badge.svg?branch=main)](https://github.com/igrowker/i003-adoptree-back/actions/workflows/deploy-to-prod.yml)

# Pipeline de CI para Build y Lint on Push

## Descripción

Esta pipeline de integración continua (CI) está diseñada para verificar el estado de compilación y aplicar reglas de linting al código del repositorio. El objetivo es garantizar que el código esté en buen estado antes de ser fusionado o desplegado en otros entornos.

## Ejecución

La ejecución de la pipeline de `Build On Push` de CI se realiza automáticamente cada vez que se realiza un `Push` en el repositorio. Si se detecta un error en la compilación o en la verificación de la sintaxis, se creará un issue en el repositorio para que se puedan revisar y solucionar los problemas.

La ejecución de la pipeline de `Lint` de CI se realiza automáticamente cada vez que se realiza un `Push` en el repositorio. Si se detecta un error en la verificación de la sintaxis, se creará un issue en el repositorio para que se puedan revisar y solucionar los problemas.

### Alcance

Todas las ramas del repositorio.

# Pipeline de CI para Build, Lint y Test on Pull Request

## Descripción

Esta pipeline de integración continua (CI) está diseñada para verificar el estado de compilación, aplicar reglas de linting y realizar pruebas al código del repositorio. El objetivo es garantizar que el código esté en buen estado antes de ser fusionado o desplegado en otros entornos.

## Ejecución

La ejecución de la pipeline de `Build` de CI se realiza automáticamente cada vez que se realiza una `Pull Request` en el repositorio a las ramas `Main` y `Develop`. Si se detecta un error en la compilación o en la verificación de la sintaxis, se creará un issue y un comentario en el `Pull Request` para que se puedan revisar y solucionar los problemas.

La ejecución de la pipeline de `Lint` de CI se realiza automáticamente cada vez que se realiza una `Pull Request` en el repositorio. Si se detecta un error en la verificación de la sintaxis, se creará un issue y un comentario en el `Pull Request` para que se puedan revisar y solucionar los problemas.

La ejecución de la pipeline de `Test` de CI se realiza automáticamente cada vez que se realiza una `Pull Request` en el repositorio. Si se detecta un error en la verificación de la sintaxis, se creará un issue y un comentario en el `Pull Request` para que se puedan revisar y solucionar los problemas.

Las actions de Build y Lint se ejecutarán en paralelo y una vez finalizadas, se ejecutará la action de Test, la cual depende de la ejecución de la action de Build y de la ejecución de la action de Lint.

## Alcance

Ramas `main` y `develop`.

# Pipeline de CI/CD para Deploy del desarrollo en Render

## Descripción

Esta pipeline de integración continua (CI) está diseñada para desplegar el código del repositorio en un entorno de producción y en un entorno de desarrollo. El objetivo es poder ver el resultado de los cambios antes de que se fusionen en el repositorio principal y su publicación en el entorno de producción.

## Ejecución

La ejecución de la pipeline de `Deploy to Dev` de CI/CD se realiza automáticamente cada vez que se mergea a la rama `develop`. Si se detecta un error en la despliegue o en el Build de la imagen de docker, se creará un issue automáticamente para que se puedan revisar y solucionar los problemas.

## Alcance

Rama `develop`.

# Pipeline de CI/CD para Deploy de Producción a una VPS

## Descripción

Esta pipeline de integración continua (CI) está diseñada para desplegar el código del repositorio en un entorno de producción.

## Ejecución

La ejecución de la pipeline de `Deploy to Prod` de CI/CD se realiza automáticamente cada vez que se mergea a la rama `main`. Si se detecta un error en la despliegue o en el Build de la imagen de docker, se creará un issue automáticamente para que se puedan revisar y solucionar los problemas.

### Docker Compose

Para desplegar el código en un entorno de producción, se utiliza Docker Compose. Docker Compose es una herramienta de línea de comandos que permite definir y ejecutar aplicaciones y servicios en contenedores. Con Docker Compose, se puede crear y administrar un entorno de desarrollo de aplicaciones de manera eficiente y fácil.

Los archivos de configuración de Docker Compose se encuentran en el directorio `docker-compose.yml`. Este archivo describe los servicios que se desean desplegar en el entorno de producción, incluyendo la imagen de Docker, las variables de entorno, las redes y los volumenes.

Los servicios que se incluyen en el archivo `docker-compose.yml` son:

-   `nginx-proxy`: Un proxy que se utiliza para manejar las solicitudes HTTP y HTTPS y redireccionarlas a los servicios correspondientes.
-   `prometheus`: Un servidor de monitoreo y análisis de sistemas de cómputo que se utiliza para recopilar y analizar datos de rendimiento y estado de los servicios.
-   `grafana`: Un servidor de visualización de datos que se utiliza para crear paneles de gráficos y visualizaciones de datos.
-   `loki`: Un servidor de análisis de log de cómputo que se utiliza para almacenar y analizar los datos de log de los servicios.
-   `promtail`: Un agente de log de cómputo que se utiliza para recopilar y enviar los datos de log a `loki`.
-   `cadvisor`: Un agente de monitorización de cómputo que se utiliza para monitorear y recopilar métricas de rendimiento y uso de recursos de los contenedores.
-   `adoptree-api`: Es el servicio que se desea desplegar en el entorno de producción.
-   `node-exporter`: Es un exportador de Prometheus que se utiliza para recopilar métricas a nivel de sistema, estas métricas se utilizan para monitorear el rendimiento y el uso de los recursos del sistema para luego enviarlas a Prometheus y Grafana.

## Configuración de variables de entorno

Para configurar las variables de entorno, se utiliza el archivo `.env`.

## Alcance

Rama `main`.
