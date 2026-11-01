\# APPU — Asistente de Prácticas Profesionales



<p align="center">

&#x20; <img src="assets/imagen\_asistente\_practicas.png"

&#x20;      alt="APPU - Asistente de Prácticas Profesionales"

&#x20;      width="100%">

</p>



<p align="center">

&#x20; <strong>Asistente inteligente para orientar a estudiantes durante el proceso de Prácticas Profesionales.</strong>

</p>



<p align="center">

&#x20; Universidad del Caribe · Cancún, Quintana Roo, México

</p>



\---



\## Sobre APPU



\*\*APPU\*\* es un asistente educativo basado en inteligencia artificial diseñado para facilitar la consulta de información relacionada con el proceso de \*\*Prácticas Profesionales\*\*.



El sistema permite que los estudiantes realicen preguntas en lenguaje natural y reciban respuestas simplificadas sobre fechas, requisitos, documentos, procesos administrativos, plataformas institucionales y actividades relacionadas con sus prácticas.



El objetivo principal es centralizar la información y reducir la dificultad de localizar respuestas dentro de documentos, calendarios, lineamientos y procedimientos institucionales.



\---



\## Objetivo



Desarrollar una herramienta digital que ayude a los estudiantes a comprender y consultar de forma rápida la información relacionada con sus Prácticas Profesionales.



APPU busca apoyar principalmente en temas como:



\- Fechas importantes.

\- Registro de prácticas.

\- Consulta de requisitos.

\- Entrega de documentos.

\- Cartas y formatos.

\- Programa de actividades.

\- Reportes periódicos.

\- Evaluaciones.

\- Calificaciones.

\- Uso de plataformas institucionales.

\- Seguimiento del proceso académico.

\- Preguntas frecuentes.



\---



\## Problema que busca resolver



Durante el proceso de Prácticas Profesionales, los estudiantes deben consultar diferentes documentos, plataformas, fechas y procedimientos.



Esto puede generar:



\- Confusión sobre fechas.

\- Omisión de entregas importantes.

\- Dificultad para localizar información.

\- Preguntas repetitivas.

\- Dependencia de consultas administrativas.

\- Interpretaciones incorrectas de los procedimientos.



APPU busca concentrar esta información en una interfaz conversacional sencilla.



\---



\## Cómo funciona



```text

Pregunta del estudiante

&#x20;       ↓

Interfaz web

&#x20;       ↓

Backend / API

&#x20;       ↓

Procesamiento de la consulta

&#x20;       ↓

Búsqueda de contexto relevante

&#x20;       ↓

Base de conocimiento

&#x20;       ↓

Modelo de Inteligencia Artificial

&#x20;       ↓

Respuesta estructurada

&#x20;       ↓

Estudiante

```



El estudiante escribe una pregunta.



El sistema analiza la consulta, identifica información relevante dentro de su base documental y genera una respuesta utilizando el contexto recuperado.



\---



\## Arquitectura general



```text

┌───────────────────────────────┐

│          ESTUDIANTE           │

│                               │

│     Pregunta en lenguaje      │

│           natural             │

└──────────────┬────────────────┘

&#x20;              │

&#x20;              ▼

┌───────────────────────────────┐

│          FRONTEND             │

│                               │

│         React + Vite          │

└──────────────┬────────────────┘

&#x20;              │

&#x20;              │ HTTP / API

&#x20;              ▼

┌───────────────────────────────┐

│          BACKEND              │

│                               │

│  Procesamiento de consultas   │

└──────────────┬────────────────┘

&#x20;              │

&#x20;              ▼

┌───────────────────────────────┐

│     CONTEXTO DOCUMENTAL       │

│                               │

│      infpracticas.txt         │

│   Información institucional   │

└──────────────┬────────────────┘

&#x20;              │

&#x20;              ▼

┌───────────────────────────────┐

│     MODELO DE INTELIGENCIA    │

│          ARTIFICIAL           │

│                               │

│     Generación de respuesta   │

└──────────────┬────────────────┘

&#x20;              │

&#x20;              ▼

┌───────────────────────────────┐

│       RESPUESTA AL USUARIO    │

│                               │

│  Información clara, breve y   │

│        contextualizada        │

└───────────────────────────────┘

```



\---



\## Tecnologías utilizadas



\### Frontend



\- React

\- Vite

\- JavaScript

\- HTML

\- CSS



\### Backend



\- Node.js

\- JavaScript

\- APIs

\- Firebase Functions



\### Servicios



\- Firebase

\- Firebase Hosting

\- Firebase Authentication



\### Inteligencia Artificial



\- Modelos de lenguaje

\- Prompt Engineering

\- Contextual Question Answering

\- Recuperación de información

\- Conceptos de RAG



\### Control de versiones



\- Git

\- GitHub



\---



\## Recuperación de información



Una de las partes principales del proyecto es utilizar información institucional como contexto para responder las preguntas.



La base documental puede incluir:



```text

infpracticas.txt

```



Este archivo contiene información relacionada con los procesos de Prácticas Profesionales.



El flujo conceptual es:



```text

Documento institucional

&#x20;       ↓

Información estructurada

&#x20;       ↓

Búsqueda de contenido relevante

&#x20;       ↓

Contexto de la pregunta

&#x20;       ↓

Modelo de IA

&#x20;       ↓

Respuesta

```



Este enfoque permite reducir respuestas generadas únicamente a partir del conocimiento general del modelo.



\---



\## Concepto RAG



APPU utiliza conceptos relacionados con \*\*Retrieval-Augmented Generation (RAG)\*\*.



RAG combina dos procesos:



```text

Retrieval

&#x20;  +

Generation

```



\### Retrieval



Busca información relevante dentro de una fuente documental.



\### Generation



Utiliza esa información como contexto para construir una respuesta.



El proceso puede representarse así:



```text

Pregunta

&#x20;  ↓

Búsqueda

&#x20;  ↓

Información relevante

&#x20;  ↓

Contexto

&#x20;  ↓

LLM

&#x20;  ↓

Respuesta

```



Esto permite desarrollar asistentes especializados en dominios específicos.



\---



\## Autenticación



El proyecto contempla autenticación para controlar el acceso a la aplicación.



En el entorno universitario, el sistema puede utilizar cuentas institucionales para identificar a los usuarios autorizados.



El objetivo es que el asistente pueda funcionar dentro de un ecosistema académico controlado.



\---



\## Ejemplos de preguntas



Los estudiantes pueden realizar preguntas como:



```text

¿Cuándo inicia el periodo de Prácticas Profesionales?

```



```text

¿Cuándo debo entregar mi carta?

```



```text

¿Qué documentos necesito para iniciar mis prácticas?

```



```text

¿Cuándo debo entregar mi primer reporte?

```



```text

¿Cómo funciona SISPP?

```



```text

¿Qué debo registrar en SIGMAA?

```



```text

¿Cuándo se registran las calificaciones?

```



```text

¿Qué pasa si no entrego un documento en la fecha indicada?

```



\---



\## Ejemplo de flujo



\### Pregunta



```text

¿Cuándo debo entregar el primer reporte?

```



\### Procesamiento



```text

Consulta del usuario

&#x20;       ↓

Identificación de intención

&#x20;       ↓

Consulta de información institucional

&#x20;       ↓

Recuperación de fecha correspondiente

&#x20;       ↓

Generación de respuesta

```



\### Respuesta



El asistente proporciona la información correspondiente de forma clara y contextualizada.



\---



\## Estructura general del repositorio



```text

asistente\_educativo/

│

├── assets/

│   └── imagen\_asistente\_practicas.png

│

├── asistentepracticas/

│   │

│   ├── src/

│   │   ├── App.jsx

│   │   └── App.css

│   │

│   ├── public/

│   │

│   ├── functions/

│   │   ├── index.js

│   │   ├── infpracticas.txt

│   │   ├── package.json

│   │   └── package-lock.json

│   │

│   ├── firebase.json

│   ├── package.json

│   ├── package-lock.json

│   └── vite.config.js

│

└── README.md

```



La estructura puede evolucionar conforme se incorporen nuevas funciones.



\---



\## Instalación



Clona el repositorio:



```bash

git clone https://github.com/LuisBarahonaMX/asistente\_educativo.git

```



Entra al proyecto:



```bash

cd asistente\_educativo

```



Después entra a la aplicación:



```bash

cd asistentepracticas

```



Instala las dependencias:



```bash

npm install

```



Ejecuta el entorno de desarrollo:



```bash

npm run dev

```



\---



\## Firebase Functions



Si el proyecto utiliza funciones de Firebase:



```bash

cd functions

```



Instala las dependencias:



```bash

npm install

```



Después pueden utilizarse las herramientas de Firebase para desarrollo o despliegue según la configuración del proyecto.



\---



\## Variables de entorno



Las credenciales y claves privadas no deben almacenarse directamente en GitHub.



Ejemplo conceptual:



```text

API\_KEY=YOUR\_API\_KEY

PROJECT\_ID=YOUR\_PROJECT\_ID

```



Los archivos que contengan secretos deben excluirse mediante `.gitignore`.



Nunca publiques:



\- API keys.

\- Tokens.

\- Contraseñas.

\- Credenciales privadas.

\- Archivos de servicio con secretos.



\---



\## Principales características



\- Interfaz web conversacional.

\- Preguntas en lenguaje natural.

\- Información especializada sobre Prácticas Profesionales.

\- Recuperación de información institucional.

\- Integración con modelos de inteligencia artificial.

\- Contextualización de respuestas.

\- Backend mediante funciones.

\- Autenticación.

\- Arquitectura web.

\- Base documental especializada.

\- Posibilidad de implementar RAG de mayor escala.



\---



\## Casos de uso



APPU puede utilizarse para:



\### Orientación estudiantil



Ayudar a estudiantes a comprender los diferentes pasos de sus prácticas.



\### Consulta de calendarios



Responder preguntas relacionadas con fechas y periodos.



\### Consulta documental



Encontrar información específica dentro de reglamentos, instrucciones o documentos.



\### Preguntas frecuentes



Automatizar respuestas recurrentes.



\### Apoyo administrativo



Reducir consultas repetitivas sobre procedimientos básicos.



\### Asistentes institucionales



Servir como base para sistemas similares en otras áreas universitarias.



\---



\## Beneficios



\### Para estudiantes



\- Información más accesible.

\- Menor tiempo de búsqueda.

\- Respuestas inmediatas.

\- Mejor comprensión de procedimientos.

\- Mayor facilidad para identificar fechas importantes.



\### Para la institución



\- Menor cantidad de consultas repetitivas.

\- Centralización del conocimiento.

\- Mejor acceso a información institucional.

\- Posibilidad de actualizar la base documental.

\- Escalabilidad hacia otros servicios académicos.



\---



\## Estado del proyecto



```text

\[✓] Interfaz web

\[✓] Frontend React + Vite

\[✓] Backend

\[✓] Integración con Firebase

\[✓] Base documental de Prácticas Profesionales

\[✓] Consultas en lenguaje natural

\[✓] Integración con inteligencia artificial

\[✓] Autenticación



\[→] Mejorar recuperación documental

\[→] Implementar RAG más avanzado

\[→] Incorporar embeddings

\[→] Incorporar base vectorial

\[→] Mejorar trazabilidad de respuestas

\[→] Agregar citas de fuentes

\[→] Ampliar el corpus institucional

\[→] Mejorar administración del conocimiento

```



\---



\## Próximas etapas



\### 1. Corpus institucional



Ampliar la cantidad de documentos disponibles para consulta.



\### 2. Procesamiento documental



Transformar documentos institucionales en información estructurada.



\### 3. Embeddings



Convertir fragmentos de documentos en representaciones vectoriales.



```text

Documento

&#x20;  ↓

Fragmentación

&#x20;  ↓

Embeddings

&#x20;  ↓

Vectores

```



\### 4. Base vectorial



Almacenar embeddings para realizar búsquedas semánticas.



```text

Pregunta

&#x20;  ↓

Embedding

&#x20;  ↓

Similarity Search

&#x20;  ↓

Top-K documentos

```



\### 5. RAG avanzado



Enviar únicamente información relevante al modelo.



```text

Pregunta

&#x20;  ↓

Retriever

&#x20;  ↓

Top-K contexto

&#x20;  ↓

LLM

&#x20;  ↓

Respuesta

```



\### 6. Citado de fuentes



Mostrar al estudiante de dónde se obtuvo la información.



Ejemplo:



```text

Fuente:

Calendario de Prácticas Profesionales

Sección: Entrega de reportes

```



\### 7. Panel administrativo



Permitir a responsables institucionales actualizar información sin modificar directamente el código.



\---



\## Arquitectura futura



```text

&#x20;                   ┌───────────────────┐

&#x20;                   │     ESTUDIANTE    │

&#x20;                   └─────────┬─────────┘

&#x20;                             │

&#x20;                             ▼

&#x20;                   ┌───────────────────┐

&#x20;                   │      FRONTEND     │

&#x20;                   │   React + Vite    │

&#x20;                   └─────────┬─────────┘

&#x20;                             │

&#x20;                             ▼

&#x20;                   ┌───────────────────┐

&#x20;                   │        API        │

&#x20;                   └─────────┬─────────┘

&#x20;                             │

&#x20;                             ▼

&#x20;                   ┌───────────────────┐

&#x20;                   │   QUERY PROCESSOR │

&#x20;                   └─────────┬─────────┘

&#x20;                             │

&#x20;                             ▼

&#x20;                   ┌───────────────────┐

&#x20;                   │     EMBEDDING     │

&#x20;                   │      MODEL        │

&#x20;                   └─────────┬─────────┘

&#x20;                             │

&#x20;                             ▼

&#x20;                   ┌───────────────────┐

&#x20;                   │   VECTOR DATABASE │

&#x20;                   └─────────┬─────────┘

&#x20;                             │

&#x20;                             ▼

&#x20;                   ┌───────────────────┐

&#x20;                   │       TOP-K       │

&#x20;                   │      CONTEXT      │

&#x20;                   └─────────┬─────────┘

&#x20;                             │

&#x20;                             ▼

&#x20;                   ┌───────────────────┐

&#x20;                   │        LLM        │

&#x20;                   └─────────┬─────────┘

&#x20;                             │

&#x20;                             ▼

&#x20;                   ┌───────────────────┐

&#x20;                   │     RESPUESTA     │

&#x20;                   │     + FUENTES     │

&#x20;                   └───────────────────┘

```



\---



\## Posibles aplicaciones futuras



La arquitectura de APPU puede adaptarse a otros escenarios institucionales:



\- Servicio social.

\- Becas.

\- Titulación.

\- Tutorías.

\- Servicios escolares.

\- Movilidad académica.

\- Reglamentos universitarios.

\- Procesos administrativos.

\- Preguntas frecuentes.

\- Orientación para estudiantes de nuevo ingreso.



Esto permitiría evolucionar el proyecto hacia una plataforma de asistentes especializados para diferentes áreas de una universidad.



\---



\## Uso responsable



APPU es una herramienta de apoyo informativo.



Las respuestas generadas por inteligencia artificial no deben sustituir:



\- Comunicados oficiales.

\- Reglamentos institucionales.

\- Indicaciones de coordinadores.

\- Información publicada por la universidad.

\- Resoluciones administrativas.



Cuando exista una diferencia entre la respuesta del asistente y una fuente institucional oficial, debe considerarse válida la información oficial.



\---



\## Limitaciones



El sistema puede presentar limitaciones relacionadas con:



\- Información desactualizada.

\- Documentos incompletos.

\- Preguntas ambiguas.

\- Interpretación incorrecta de una consulta.

\- Información que no se encuentre en la base documental.

\- Errores propios de modelos de lenguaje.



Por esta razón, el proyecto busca avanzar hacia una arquitectura RAG con recuperación verificable y referencias a fuentes.



\---



\## Seguridad



Las buenas prácticas consideradas para el proyecto incluyen:



\- No almacenar credenciales en el repositorio.

\- Utilizar variables de entorno.

\- Mantener dependencias actualizadas.

\- Utilizar autenticación.

\- Validar solicitudes al backend.

\- Limitar acceso a servicios internos.

\- Separar frontend y backend.

\- Proteger claves de APIs.

\- Mantener archivos sensibles fuera del control de versiones.



\---



\## Propósito académico



Este proyecto forma parte del desarrollo de soluciones basadas en:



\- Inteligencia Artificial.

\- Ingeniería de Datos.

\- Sistemas web.

\- Recuperación de información.

\- Procesamiento de lenguaje natural.

\- Automatización.

\- Gestión del conocimiento.



También funciona como una demostración práctica de cómo la inteligencia artificial puede utilizarse para mejorar el acceso a información dentro de instituciones educativas.



\---



\## Autor



\*\*Pedro Luis Pérez Barahona\*\*



Ingeniería en Datos e Inteligencia Organizacional  

Universidad del Caribe  

Quintana Roo, México



GitHub:



```text

LuisBarahonaMX

```



\---



\## Repositorio



```text

https://github.com/LuisBarahonaMX/asistente\_educativo

```



\---



\## Contribuciones



Las contribuciones orientadas a mejorar documentación, recuperación de información, experiencia de usuario, seguridad y arquitectura son bienvenidas.



Antes de realizar cambios importantes, se recomienda crear una rama independiente.



Ejemplo:



```bash

git checkout -b feature/nueva-funcionalidad

```



\---



\## Licencia



La licencia del proyecto deberá consultarse directamente en el repositorio.



Si el proyecto se distribuye públicamente, se recomienda agregar un archivo `LICENSE` para definir claramente los permisos de uso, modificación y distribución.



\---



\## Estado



\*\*Proyecto académico y tecnológico en desarrollo.\*\*



APPU busca evolucionar de un asistente basado en contexto documental hacia una arquitectura de recuperación aumentada por generación más robusta, trazable y escalable.



\---



<p align="center">

&#x20; <strong>APPU — Inteligencia Artificial aplicada a la orientación académica.</strong>

</p>

