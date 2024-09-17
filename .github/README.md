# Pipeline de CI para Build y Lint

## Descripción

Esta pipeline de integración continua (CI) está diseñada para verificar el estado de compilación y aplicar reglas de linting al código del repositorio. El objetivo es garantizar que el código esté en buen estado antes de ser fusionado o desplegado en otros entornos.

## Ejecución

La ejecución de la pipeline de `Build On Push` de CI se realiza automáticamente cada vez que se realiza un `Push` en el repositorio. Si se detecta un error en la compilación o en la verificación de la sintaxis, se creará un issue en el repositorio para que se puedan revisar y solucionar los problemas.

La ejecución de la pipeline de `Build` de CI se realiza automáticamente cada vez que se realiza una `Pull Request` en el repositorio a las ramas `Main` y `Develop`. Si se detecta un error en la compilación o en la verificación de la sintaxis, se creará un issue y un comentario en el `Pull Request` para que se puedan revisar y solucionar los problemas.

La ejecución de la pipeline de `Lint` de CI se realiza automáticamente cada vez que se realiza una `Pull Request` en el repositorio. Si se detecta un error en la verificación de la sintaxis, se creará un issue y un comentario en el `Pull Request` para que se puedan revisar y solucionar los problemas.

# Pipeline de CI/CD para Deploy del desarrollo en Render

## Descripción

Esta pipeline de integración continua (CI) está diseñada para desplegar el código del repositorio en un entorno de producción y en un entorno de desarrollo. El objetivo es poder ver el resultado de los cambios antes de que se fusionen en el repositorio principal y su publicación en el entorno de producción.

## Ejecución

La ejecución de la pipeline de `Deploy to Dev` de CI/CD se realiza automáticamente cada vez que se mergea a la rama `develop`. Si se detecta un error en la despliegue o en el Build de la imagen de docker, se creará un issue automáticamente para que se puedan revisar y solucionar los problemas.
