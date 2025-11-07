# Project Name

CHILEAUTOS-QA-AUTOMATION *POR ANGHEL TELLO*

## Requirements

| Requisito                | Versión recomendada | Descripción                                      |
| ------------------------ | ------------------- | ------------------------------------------------ |
| **Node.js**              | 18.x o superior     | Entorno de ejecución para Cypress                |
| **npm**                  | 9.x o superior      | Administrador de paquetes de Node                |
| **Visual Studio Code**   | Última versión      | Editor recomendado                               |
| **Git**                  | 2.30 o superior     | Control de versiones                             |
| **Google Chrome o Edge** | Última versión      | Navegadores soportados para ejecución de pruebas |

## Installation
Iniciar Visual Studio Code
1. Clonar repo:
   - git init
   - git clone --branch master https://github.com/ATelloR/chileautos-qa-automation--Anghel-Tello.git
   - cd chileautos-qa-automation--Anghel-Tello
2. Instalar dependencies:
 - npm install cypress --save-dev
 - npm install --save-dev cypress-mochawesome-reporter
 - npm install fs-extra
 - npm install --save-dev mochawesome
 - npm install mochawesome-merge --save-dev

## Usage

## Comando para ejecucion completa con UI de cypress
- npx cypress open

# Comandos para ejecucion por CMD 
1. Completo 
- npx cypress run
2. Por modulo 
- npx cypress run --spec "cypress/e2e/home/homePageTest.cy.js"
- npx cypress run --spec "cypress/e2e/publish/anuncioVentaTest.cy.js"
- npx cypress run --spec "cypress/e2e/search/searchByFiltroTest.cy.js"

NOTA: Son en total 12 casos de pruebas, de los 2 estan visualizados que fallen, en Filtro y pagina de Inicio. Importante denotar que dado que la pagina de Chileautos.cl tiene bloqueos de robotización hay ciertas pantallas imposibles de llegar y automatizar. Los principales flujos que se automotizaron son la pagina de inicio (barra de busqueda) y crear anuncio, este llega previo ingreso de usuario, esto para evitar generar publicaciones falsas en la pagina dado a que no es una ambiente de prueba. Si bien no muchos casos, creo que cumplen en demostrar los usos y tecnicas que se pueden emplear.

IMPORTANTE: Las ejecuciones por comando estan cofiguradas para limpiar las carpetas de screenshoots y reporte, en caso de que se ejecute el full run si se desea ver todo en un reporte unificado ejecutar los comandos 

-  npm run merge:reports
-  npm run generate:html

* Ya hay scripts para ejecuciones por pipeline configuradas, en caso de querer usarlas usarlas por separado dado a que si tu computador no soporta los comandos ingresados por chain, solo se ejecutara el primero, o puede generar errores

## Configuration
- En caso de descargar el proyecto por carpeta copiando esta a una ruta de tu gusto, y utilizando Visual Studio Code, abre el proyecto con > Open Folder

## License
Generado por *@AnghelTello* / El uso de este codigo es solo para usos educativos y de presentacion de Demo para Chileautos.cl

## Parte 1 (Respuestas)

1. Estrategia de Testing 
a) Basándote en el homepage de Chileautos.cl, identifica y prioriza los 5 flujos críticos que consideras más importantes para automatizar. Justifica tu selección desde una perspectiva de negocio y riesgo. 
b) ¿Qué tipos de pruebas (funcionales, regresión, performance, seguridad, usabilidad) implementarías para este homepage? Describe brevemente el alcance de cada tipo. 
c) ¿Cómo determinarías la cobertura de pruebas adecuada para este sitio? ¿Qué métricas utilizarías? 
2. Arquitectura y Diseño 
a) Describe la estructura de carpetas y organización del proyecto que 
implementarás. Justifica tus decisiones arquitectónicas. 
b) ¿Qué patrones de diseño aplicarás en tu suite de automatización (Page Object Model, Screenplay, etc.)? ¿Por qué? 
3. Gestión de Datos y Ambientes 
a) ¿Cómo gestionarías los datos de prueba en este proyecto? 
b) ¿Qué estrategia propondrías para ejecutar estas pruebas en diferentes 
ambientes (dev, staging, production)? 
c) ¿Cómo manejarías elementos dinámicos, tiempos de espera y sincronización en las pruebas? 
4. CI/CD y DevOps 
a) ¿Qué gates de calidad implementarías antes de permitir un despliegue a producción? 
b) ¿Cómo configurarías la ejecución de pruebas para optimizar tiempos 
(paralelización, priorización)? 
Sin título 2
5. Reporting y Análisis 
a) ¿Qué información debería incluir un reporte de ejecución de pruebas para stakeholders técnicos y no técnicos? 
6. Seguridad y Calidad 
a) ¿Qué validaciones de seguridad básicas incluirías en pruebas automatizadas de UI? 
b) ¿Cómo validarías aspectos de accesibilidad (WCAG) en las pruebas? 
c) ¿Qué herramientas complementarias a Cypress integrarías para mejorar la cobertura de seguridad? 

1. Estrategia de Testing
a) Flujos críticos a automatizar en Chileautos.cl

Flujos priorizados (por impacto de negocio y riesgo):

- Búsqueda de vehículos (marca, modelo, año, precio): alta frecuencia y crítica para tipo de uso de la pagina web.

- Filtrado y orden de resultados: asegura precisión en la experiencia del usuario en su busqueda por un vehiculo a cotizar.

- Visualización del detalle del vehículo: punto clave donde se genera interés o contacto para ver detalles relevantes para la decición de la compra (km, años, modelo, etc.).

- Formulario de contacto o cotización: flujo de alta relevancia para cumplir objetivo de la pagina web.

- Publicación de un aviso: flujo de usuario registrado con múltiples validaciones de datos (creación, edición, baja de la publicacion).

Justificación:
Son flujos de alto impacto en el revenue y satisfacción del cliente, además de estar más expuestos a regresiones por cambios de frontend, API o base de datos.

* Los 2 ultimos escenarios no seran completamente automatizados, debido a que la pagina entregada es una pagina real y funcionamiento. Adicionalmente la pagina de registro y de publicacion se encuentran con incidencia de flujo y de API actuales de la pagina.

b) Tipos de pruebas y su alcance

Funcionales: Validar que los componentes del homepage operen según lo esperado (búsqueda, filtros, login, etc.).

Usabilidad: Verificar accesibilidad, claridad de navegación y correcta visualización responsive.

Regresión: Automatizar los flujos principales para detectar fallas tras cada despliegue.

Performance: Validar tiempos de carga del homepage (<3s), respuesta del servidor y estabilidad.

Seguridad: Revisar exposición de datos sensibles, validación de inputs y protección contra XSS.

c) Cobertura de pruebas y métricas

Determinación: Basada en análisis de riesgo, criticidad funcional y volumen de uso.
Métricas clave:

% de cobertura funcional automatizada.

Tasa de defectos encontrados por etapa (shift-left *Metodologia de detección temprana de defectos en ciclos anteriores a la funcional).

Tasa de ejecución exitosa (Dependiendo del proyecto influye el % de aceptacion, pero lo comun es entre 75-80% esto puede variar con solo defectos menores y promesa de mantecion continua de defectos ya conocidos).

Tiempo medio de detección (MTTD).

Tiempo medio de resolución (MTTR).

2. Arquitectura y Diseño

a) Estructura de carpetas (Cypress)

cypress/
  ├─ e2e/
  │   ├─ home/
  │   ├─ publish/
  │   └─ search/
  ├─ fixtures/
  ├─ pages/
  ├─ reports/
  ├─ screenshots/
  └─ support/
  │    ├─ commands.js
  │    └─ e2e.js
  ├── cypress.config.js
  └── package.json

Justificación:
Se separan los test cases, objetos de página y datos para favorecer la mantenibilidad, modularidad y CI/CD.

b) Patrones de diseño

Page Object Model (POM): ideal por su simplicidad, claridad y mantenibilidad.
Permite encapsular localizadores y acciones, evitando duplicación de código.
Alternativa: Screenplay Pattern si el proyecto crece y requiere escalabilidad modular.

3. Gestión de Datos y Ambientes
a) Datos de prueba

Usar fixtures JSON para datos estáticos.

Generar dinámicamente con librerías como Faker.js.

En caso de la necesidar de aislar datos críticos en una base de prueba se pueden utilizar herramientas de lectura de hoja de calculo o conversion de la misma (tambien explorar opciones de bases mock).

b) Estrategia multiambiente

Configurar config.json por entorno (dev, staging, prod).

Parámetros por línea de comando (--env environment=staging).

Ejecutar smoke tests antes del despliegue productivo. En caso de que se requiera y el proyecto lo permita se puede evaluar un cuarto ambiente, dado a que trabajado en ambientes de datos muy sensibles, es comun utilizar un cuarto ambiente entre staging y prod (pre-prod) con la version de pase actual, con la BDD de producción y Servicios, utilizado la automatización para realizar pruebas de smoke test o e2e para disminuir la tasa de % fallo de paso de producción en el ambiente de producción.

c) Elementos dinámicos y sincronización

Esperas explícitas (cy.intercept, cy.wait, cy.contains).

Uso de assertions encadenadas para sincronizar con el DOM.

Evitar esperas fijas (cy.wait(5000)), usar esperas reactivas basadas en condiciones.

4. CI/CD y DevOps
a) Gates de calidad antes de producción

Ejecución automática de pruebas de regresión.

Validación de code coverage > 75-80%. Dependiendo de la flexibilidad del usuario final, y defectos menores pendientes.

Análisis estático (SonarQube / ESLint). (Si el proyecto lo permite)

Smoke tests en entorno staging o ambiente previo.

b) Optimización de ejecución

Paralelizar por módulos (Cypress Dashboard o GitLab CI).

Ejecutar sólo pruebas impactadas por commits o comando.

Priorizar flujos críticos en pipelines nocturnos.

5. Reporting y Análisis
a) Reporte ideal para stakeholders

Para técnicos: logs, errores, screenshots, video, duración por test, trace. *Esto puede depender de las herramientas implementadas en el proyecto y potencia del servidor CI/CD.
Para negocio: resumen de casos ejecutados, defectos abiertos/cerrados, severidad, y cobertura alcanzada. *Dependiendo del tiempo o carga de trabajo se puede configurar un reporte profecional para reportes de alto impacto (autorización paso producción).
Herramientas recomendadas: Mochawesome, Allure, ReportPortal.io.

6. Seguridad y Calidad
a) Validaciones básicas de seguridad

Sanitización de inputs (evitar XSS).

Validación de formularios y HTTPS.

Pruebas de sesión y expiración.

b) Accesibilidad (WCAG)

Integrar axe-core o cypress-axe para validar contrastes, labels y navegación por teclado.

c) Herramientas complementarias a Cypress

OWASP ZAP o Burp Suite(*Aunque este de pago) para escaneo de vulnerabilidades. 

Pa11y / Lighthouse (auditorías de accesibilidad y performance).

Postman / Newman (para validar APIs complementarias). *Aunque cypress tambien tiene la posibilidad de ejecutar y validar APIs