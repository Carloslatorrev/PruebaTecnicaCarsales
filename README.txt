# Prueba Técnica - Carsales

Este repositorio contiene la solución para la prueba técnica de Carsales. La solución está dividida en dos partes: el **Backend** desarrollado en .NET y el **Frontend** desarrollado en Angular. A continuación, se detallan las instrucciones para ejecutar ambas partes en local.

---

## Backend (API) - .NET

### Requisitos previos

- **Visual Studio 2022** o superior con soporte para .NET 8.0.
- **.NET SDK 8.0** instalado.

### Pasos para ejecutar el backend

1. **Clonar el repositorio**:
   Si no se ha clonado el repositorio, puede hacerlo utilizando el siguiente comando en su terminal:
   ```bash
   git clone https://github.com/Carloslatorrev/PruebaTecnicaCarsales.git
   cd <directorio_del_repositorio>/server/PruebaTecnicaCarsales

Abrir el proyecto en Visual Studio:

Abrir el archivo PruebaTecnicaCarsales.sln en Visual Studio.
Restaurar dependencias: En Visual Studio, las dependencias se restauran automáticamente al abrir el proyecto. Sin embargo, si se prefiere hacerlo manualmente, se puede ejecutar el siguiente comando en la terminal dentro de la carpeta del proyecto:


dotnet restore
Ejecutar la API: En Visual Studio, simplemente se debe presionar F5 o hacer clic en "Iniciar" para ejecutar el proyecto. Esto iniciará la API en el puerto 5000 por defecto (puede variar según la configuración).

Verificar el funcionamiento:

La API estará disponible en http://localhost:5000 (o el puerto configurado).
Puede probar que la API está funcionando correctamente accediendo a la documentación de Swagger: http://localhost:5000/swagger.


Frontend (Angular)
Requisitos previos
Node.js (versión 18.x o superior) y npm instalados.
Angular CLI instalado globalmente. Si no está instalado, se puede instalar con el siguiente comando:

npm install -g @angular/cli
Pasos para ejecutar el frontend
Clonar el repositorio: Si no se ha clonado el repositorio, puede hacerlo utilizando el siguiente comando en su terminal:


git clone https://github.com/Carloslatorrev/PruebaTecnicaCarsales.git
cd <directorio_del_repositorio>/web/PruebaTecnicaCarsales-web
Instalar dependencias: En la carpeta del proyecto Angular (/web/PruebaTecnicaCarsales-web), se debe ejecutar el siguiente comando para instalar las dependencias:


npm install
Configurar CORS (si es necesario): Si se está utilizando la API localmente, asegurarse de que se haya configurado correctamente el CORS en el backend (puerto 5000) para permitir solicitudes desde el frontend en el puerto 4200.

Iniciar el servidor de desarrollo: Para iniciar el servidor de desarrollo de Angular, ejecutar el siguiente comando:

ng serve --configuration production
Verificar el funcionamiento:

El frontend estará disponible en http://localhost:4200 y debería poder interactuar con la API en http://localhost:5000.
Si se accede correctamente a la página, la aplicación estará corriendo de manera local.
Consideraciones adicionales
Backend (API): El backend se ejecuta en .NET 8.0 y está configurado para escuchar en el puerto 5000. Asegúrese de que no haya ningún otro servicio ocupando dicho puerto antes de ejecutar la API.

Frontend (Angular): El frontend de la aplicación se ejecuta en el puerto 4200 por defecto. Si se encuentra con problemas de CORS, asegúrese de que la API y el frontend estén configurados correctamente para permitir la comunicación entre dominios.