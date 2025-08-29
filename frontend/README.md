Distintos mods de react router dom

De momento he optado por el modo Declarativo <BrowserRouter>

Este modo es perfecto para la aplicacion tal y como esta ahora ya que no es demasiado complejo y los datos viven en el localStorage por lo que el router no debe de saber nada sobre estos datos.

Cuando migremos a un backend como flask podemos ver la necesidad de un enrutamiento más complejo o otro modo como el modo de datos. createBrowserRouter, pero de momento esto es algo que se hará en el futuro y como digo de momento usaremos <BrowserRouter>.

Single source of truth ya que si dejamos a cada componente manejar el estado de forma independiente, podríamos acabar con inconsistencias y dificultades para mantener el estado sincronizado entre componentes. Al centralizar el estado en un solo lugar, facilitamos su gestión y evitamos problemas de sincronización. El lugar donde lo centralizamos debe ser un ancestor común que envuelva a todos los componentes que necesiten acceder a ese estado.


Vale con estos recientes cambios el componente ProjectDetail creo que se ha sobrecargado de responsabilidades ya que gestiona el estado de la edicion de tareas gestiona los filtros filtra las tareas maneja el crud y tiene a su cargo 3 componentes. De momento vamos a dejarlo asi ya que mejor un codigo funcional que algo que no funciona pero seria buena idea conforme vamos avanzando ir descomponiendo este componente en otros mas pequeños y manejables.

Hoy hemos terminado el CRUD de las tareas se puede modificar eliminar crear y ver.


Vale tags en los proyectos terminado podriamos hacer que puedas poner varios tags por filtrar (ahora mismo solo puedes uno). Tambien podemos filtrar los proyectos por nombres y tambien podemos en vez de hacer un select mirar otra cosa pq creo que si tienes muchos proyectos puede ser algo incomodo el tener que bajar hasta encontrar maybe añadir un buscador de tags escrito o hacer las tags clickeables para que te filtre automaticamente por esa tag.

Cuando esto avance deberiamos de hacer una clase tag en vez de un string ahora mismo es solo un string pero quiero modificarlo por ahora lo mantendremos simple

Añadido sweet alert para las acciones de eliminar tareas y proyectos
terminado el crud de proyectos.

Revisar el ProjectMainView pq creo que tambien esta bastante cargado de responsabilidades.
Tambien App ya que no se si es correcto poner ahi tanta logica o si deberia de crear un componente separado para manejar la logica de enrutamiento y estado.

Resumen de Symbol en JavaScript

Symbol() crea un valor único e inmutable.

Aunque dos símbolos tengan la misma descripción, nunca son iguales:
```javascript
const sym1 = Symbol("description");
const sym2 = Symbol("description");

console.log(sym1 === sym2); // false
```

🔑 Usos principales

Identificadores únicos
Evitan colisiones en objetos cuando varias propiedades podrían llamarse igual.

Propiedades “privadas” u ocultas
No aparecen en un for...in ni en Object.keys, lo que ayuda a guardar info interna sin riesgo de ser pisada.

Protocolos especiales
Existen Symbol predefinidos en JS (Symbol.iterator, Symbol.asyncIterator, etc.) para hacer objetos iterables o personalizar comportamientos.

🧩 En React

Normalmente no los usas directamente, React ya los usa internamente.

Te pueden servir para:

Generar IDs únicos para listas o estados.

Guardar datos internos en un Context sin riesgo de colisiones.

Implementar estructuras iterables si construyes librerías o hooks avanzados.


Terminamos el dia con la implementacion de los recursos del proyecto.
Tambien hemos hecho los posts todo lo del blog excepto algunas funcionalidades extras que quiero implementar.


Vale hemos hecho lo de los tags clickeables para que en cada proyecto puedas filtrar con el select o con hacer click en cualquiera de los tags para mas comodidad.

Ahora no se si ponerme con css o seguir con la logica de los proyectos.

Añadida funcionalidad de exportar el resumen semanal del blog.

Tambien podriamos instalar husky y prettier para precommits commits estandar etc.


¡Excelente idea! Vamos a configurar **hooks de git** y **herramientas de calidad** para automatizar el formato y commits estándar. 🚀

## 🛠️ **Setup completo de calidad de código:**

### **Paso 1: Instalar herramientas**

```bash
# Formatter y linter
npm install --save-dev prettier eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

# Hooks de git
npm install --save-dev husky lint-staged

# Commits convencionales
npm install --save-dev @commitlint/cli @commitlint/config-conventional

# Commitizen para commits guiados
npm install --save-dev commitizen cz-conventional-changelog
```

### **Paso 2: Configurar Prettier (.prettierrc)**

````json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
````

### **Paso 3: Configurar ESLint (.eslintrc.json)**

````json
{
  "extends": [
    "eslint:recommended",
    "@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "root": true,
  "env": {
    "browser": true,
    "es2021": true
  },
  "rules": {
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "warn"
  }
}
````

### **Paso 4: Configurar Commitlint (commitlint.config.js)**

````js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // Nueva funcionalidad
        'fix',      // Corrección de bug
        'docs',     // Documentación
        'style',    // Formato/estilo
        'refactor', // Refactoring
        'test',     // Tests
        'chore',    // Tareas de mantenimiento
        'perf',     // Mejoras de rendimiento
        'ci',       // CI/CD
        'build'     // Build system
      ]
    ],
    'scope-enum': [
      2,
      'always',
      [
        'blog',      // Sistema de blog/diario
        'filters',   // Filtros y búsqueda
        'export',    // Funcionalidades de export
        'resources', // Sistema de recursos
        'tasks',     // CRUD de tareas
        'projects',  // CRUD de proyectos
        'ui',        // Cambios visuales/CSS
        'types',     // TypeScript types
        'config'     // Configuración
      ]
    ]
  }
};
````

### **Paso 5: Configurar Husky y hooks**

```bash
# Inicializar husky
npx husky install

# Hook pre-commit (formatea código)
npx husky add .husky/pre-commit "npx lint-staged"

# Hook commit-msg (valida formato de commit)
npx husky add .husky/commit-msg "npx commitlint --edit $1"

# Hook pre-push (ejecuta tests si los tienes)
npx husky add .husky/pre-push "npm run type-check"
```

### **Paso 6: Configurar lint-staged (package.json)**

````json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx,json,css,md}\"",
    "type-check": "tsc --noEmit",
    "commit": "cz",
    "prepare": "husky install"
  },
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,css,md}": [
      "prettier --write"
    ]
  },
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  }
}
````

### **Paso 7: Configurar .prettierignore**

```
node_modules
dist
build
.env
*.log
```

## 🎯 **Cómo funciona ahora:**

### **Commits guiados:**
```bash
# En lugar de git commit, usa:
npm run commit

# Te guía paso a paso:
? Select the type of change: feat
? What is the scope? blog
? Write a short description: add weekly export functionality
? Provide a longer description: (optional)
? Are there any breaking changes? No
? Does this change affect any open issues? No
```

### **Formato automático:**
```bash
# Al hacer git add y git commit:
✓ Pre-commit hook formatea automáticamente tu código
✓ Commit-msg hook valida el formato del mensaje
✓ Pre-push hook ejecuta type-check
```

### **Comandos manuales:**
```bash
# Formatear todo el código:
npm run format

# Lint y arreglar:
npm run lint

# Type check:
npm run type-check
```

## ✨ **Lo que conseguimos:**

✅ **Código consistente** - Prettier formatea automáticamente  
✅ **Commits estándar** - Commitlint valida el formato  
✅ **Commits guiados** - Commitizen te ayuda paso a paso  
✅ **Pre-commit hooks** - No puedes commitear código mal formateado  
✅ **Pre-push hooks** - No puedes pushear código que no compile  

## 🚀 **Tu workflow ahora:**

```bash
# 1. Desarrollar normalmente
# 2. git add .
# 3. npm run commit  # En lugar de git commit
# 4. git push        # Con validaciones automáticas
```

## 📝 **Ejemplos de commits que funcionarán:**

```bash
feat(blog): add weekly markdown export functionality
fix(filters): resolve clickable tags not filtering correctly  
style(ui): improve button spacing and hover effects
docs(readme): add installation and setup instructions
```

## ❌ **Commits que serán rechazados:**

```bash
"added stuff"           # No sigue formato
"fix thing"             # Scope obligatorio
"feat(invalid): ..."    # Scope no válido
```

**¿Instalamos todo esto?** Es una configuración profesional que mejorará muchísimo la calidad del código y la colaboración. 🎯

Hacer un servicio de local storage para globalizar esas funciones, tambien deberiamos de repasar el tema de las fechas y parseos para hacer que el componente no tenga la responsabilidad de hacer esas operaciones si no que vengan de un dateUtils o algo asi.

Tambien vamos a hacer un servicio para las notificaciones de momento tendra todas las funciones un poco mezcladas antes de que hagamos el refactor.

Cuando hagamos el refactor de las fechas o incluso ya podriamos instalar algun npm que nos ayude con el tema de las fechas ya que esta siendo un poco complicado manejar todos los casos.

Por ejemplo he visto que date-fns es una buena libreria para manejar fechas en javascript.


Hecho las ideas tanto de un proyecto como en general ideas generales que pueda tener.


Vale he decidido dejar el css para el final ahora mismo me voy a concentrar en terminar todas las features que tenia pensadas de momento solo me falta implementar la zona de dibujos y ya cuando termine esto refactorizamos es decir separamos mas los componente hacemos un poco de polish de algunas feautres y ya añadimos css para rematar despues de esto hariamos lo que es el backend y el sync pero ahora mismo no tengo ni idea de como hacerlo ya se planteará cuando llegue el día de momento vamos a centrarnos en terminar esto.

MI idea con los dibujos era guardarlo en el localStorage, vale problema numero 1 los dibujos se han de guardar en base64 y tienes que tambien guardar cosas como que has utilizado para dibujarlos etc. Como por ejmeplo lapiz goma cuadrados etc. Principalmente es que el localStorage esta limitado entre unos 5 mb hasta 20 mb esto se puede extender si el usuario quiere pero claro no podemos obligar a los usuarios a deslimitar esto ya que cada uno es libre de hacer lo que quiera entonces el problema es como hacemos el tema de los dibujos? lo guardamos en local storage hasta que no se puedan guardar mas segun mis calculos podriamos guardar unos 20 dibujos pero claro tambien mandar esto al backend puede ser una tarea bastante pesado otra solucion seria que no se guardase en el navegador y simplemente se pudiese exportar como imagen pero claro ya hay sitios que hacen esto mucho mas completo y facil por lo que no tendria mucho sentido implementarlo si ya existe mucho mejor en otros lugares, ademas que son herramientas bastante conocidas. Otra opcion seria la de dejarlo en el session storage y simplemente hacer sync si el usuario esta logeado hasta un limite de x dibujos no se tendre que ver pq la solucion no es demasiado obvia


¡**EXCELENTE PREGUNTA**! 🎯 No es una tontería para nada, es una observación **muy inteligente** que hacen developers senior. Tienes razón en ambas cosas.

## 🚨 **SÍ, muchos imports = Code smell**

### **❌ Componente con demasiadas responsabilidades:**
```typescript
// RED FLAG: 20+ imports
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { format, parseISO, startOfWeek, endOfWeek } from 'date-fns';
import { validateEmail, validatePhone, sanitizeInput } from '../utils/validation';
import { exportToPDF, exportToCSV, exportToExcel } from '../utils/export';
import { calculateStats, generateReport } from '../utils/analytics';
import { Project, Task, Idea, QuickSketch, User } from '../types';
import { projectService, taskService, ideaService, sketchService } from '../services';
import { useProjects, useTasks, useIdeas, useSketches, useAuth } from '../hooks';
import { Button, Modal, Form, Table, Chart, FileUpload } from '../components';

// Este componente está haciendo DEMASIADO
function ProjectDashboardAnalyticsExportManagerForm() {
  // 300+ líneas de código...
}
```

### **✅ Componente bien enfocado:**
```typescript
// GOOD: 3-8 imports max
import React from 'react';
import { QuickSketch } from '../../../shared/types';
import { useSketchCanvas } from '../hooks/useSketchCanvas';

// Responsabilidad única: Dibujar
function SketchCanvas({ onSave, onCancel }) {
  // 30-50 líneas de código
}
```

## 🏗️ **Soluciones en proyectos grandes:**

### **1. 📦 Barrel Exports (como Laravel facades):**

```typescript
// src/shared/index.ts - "Dependency Injection Container"
export * from './types';
export * from './services';
export * from './hooks';
export * from './utils';
export * from './config';

// Uso en componentes:
import { 
  QuickSketch, 
  sketchStorageService, 
  useSketches, 
  SKETCH_CONFIG 
} from '../../../shared'; // ← UNA SOLA línea
```

### **2. 🎯 Custom Hooks que agrupan dependencias:**

```typescript
// hooks/useProjectWorkflow.ts - Agrupa toda la lógica relacionada
export const useProjectWorkflow = (projectId: string) => {
  const projects = useProjects();
  const tasks = useTasks(projectId);
  const ideas = useIdeas(projectId);
  const sketches = useSketches(projectId);
  const { showSuccess, showError } = useNotifications();
  
  const createTask = useCallback((taskData) => {
    // Lógica compleja aquí
  }, []);
  
  const linkSketchToTask = useCallback((sketchId, taskId) => {
    // Lógica compleja aquí
  }, []);
  
  return {
    // API simplificada
    project: projects.current,
    tasks: tasks.list,
    ideas: ideas.list,
    sketches: sketches.list,
    actions: {
      createTask,
      linkSketchToTask,
      // ... más acciones
    }
  };
};

// Componente simplificado:
import { useProjectWorkflow } from '../hooks/useProjectWorkflow';

function ProjectDetail({ projectId }) {
  const { project, tasks, sketches, actions } = useProjectWorkflow(projectId);
  
  return (
    <div>
      {/* UI simple, lógica en el hook */}
    </div>
  );
}
```

### **3. 🏭 Context Providers (como Service Containers):**

```typescript
// contexts/ProjectContext.tsx
const ProjectContext = createContext();

export const ProjectProvider = ({ children, projectId }) => {
  const projects = useProjects();
  const tasks = useTasks(projectId);
  const sketches = useSketches(projectId);
  const notifications = useNotifications();
  
  const value = {
    // Toda la lógica aquí
    project: projects.current,
    tasks,
    sketches,
    createTask: tasks.create,
    linkSketchToTask: (sketchId, taskId) => {
      // Lógica compleja
    }
  };
  
  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};

// Componentes sin imports pesados:
function TaskList() {
  const { tasks, createTask } = useContext(ProjectContext);
  return <div>{/* UI simple */}</div>;
}
```

### **4. 📁 Feature-based imports:**

```typescript
// features/projects/index.ts
export { ProjectDetail } from './components/ProjectDetail';
export { ProjectForm } from './components/ProjectForm';
export { useProjects } from './hooks/useProjects';
export { projectService } from './services/projectService';

// App.tsx - Imports organizados
import { ProjectDetail, ProjectForm } from './features/projects';
import { IdeaList, IdeaForm } from './features/ideas';
import { SketchCanvas, SketchList } from './features/sketches';
```

## 🎯 **Estrategias específicas:**

### **🔍 Detectar componentes sobrecargados:**
```bash
# Contar imports por archivo
grep -c "^import" src/**/*.tsx | sort -t: -k2 -nr

# Output:
# src/components/ProjectDetail.tsx:23  ← RED FLAG
# src/components/Dashboard.tsx:18     ← RED FLAG
# src/components/TaskForm.tsx:6       ← OK
```

### **🏗️ Refactoring pattern:**
```typescript
// ANTES: Componente monolítico
function ProjectDetail() {
  // 15+ imports
  // 200+ líneas
  // Multiple responsabilities
}

// DESPUÉS: Componente orquestador + hooks especializados
function ProjectDetail({ projectId }) {
  const workflow = useProjectWorkflow(projectId);
  
  return (
    <ProjectProvider projectId={projectId}>
      <ProjectHeader />
      <ProjectTasks />
      <ProjectSketches />
      <ProjectIdeas />
    </ProjectProvider>
  );
}
```


State explosion

  // Guardar estado en historial para undo/redo
    const saveToHistory = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const imageData = canvas.toDataURL();

    setCanvasHistory(prev => {
        const currentIndex = prev.length - 1; // índice actual
        const newHistory = prev.slice(0, currentIndex + 1);
        newHistory.push(imageData);
        return newHistory;
    });

    setHistoryIndex(prev => prev + 1); // este sí usa prev correctamente
    }, []);


Lo que tenia antes es decir el codigo de abajo dependia de una variables externa como lo es history index lo que puede llegar a desincronizar el estado, desfasos entre componentes y rerenders innecesarios.

“Si estás actualizando un estado en función del valor anterior, usa siempre la forma con prev y evita meter dependencias externas en el cálculo.”

  const saveToHistory = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const imageData = canvas.toDataURL();
    setCanvasHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(imageData);
      return newHistory;
    });
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);



Vale vamos a pararnos aqui un momentin pq hay cosas que no me cuadran. Vale empecemos por el use effect del principio lo he separada para que sea mas limpio es decir el primero se inicializa al principio valga la redundancia y el segundo se ejecuta solo cuando cambian width y height pero la cosa es que claro tu antes estabas rehaciendo todo el canvas es decir lo recreabas. Tambien he hecho el withCtx para centralizar la logica repetida que tenemos (pero no la uso). Ahora tambien me he dado cuenta de una cosa y es que si le damos a clear history pero teniamos un canvas vacio se añadira otro canvas vacio por lo que si le damos a rendu no haria nada visualmente ya que simplemente serian 2 lienzos vacios. Tambien he visto que el rendu undu  esta un poco meh lo de hacer new Image y tal creo que en navegadores modernos esta un poco desfasado eso. Tambien he cambiado el saveToHIstory ya que tenia historyINdex pero esto al ser algo externo puede ser que este desencronizado con el prev actual ya que cada render es como una foto del estado y esto puede llevar a fallos en lo que es la coordinacion dependencias fantasma etc. No se que opinas de mi resumen. Una ultima cosa que queria apuntar es que podriamos poner un limite al rendu/undo rollo 20 e ir quitando las snapshots mas antiguas para que no se llene tanto la RAM. Que opinas de todo?


Sketches done ahora puedes dibujar usando la api de canvas


Primero vamos a refactorizar el tema de las fechas, despues el tema del localStorage, tercero no se si hacer un Swal service o algo asi? que centralice todo el tema del sweet alert y ya despues de esto refactorizar los componentes mas grandes para hacerlos mas manejables. Finalmente añadiriamos un css profesional para que se vea bien. Para el tema de las fechas podriamos usar date-fns o day.js para simplificar la manipulacion de fechas.

De momento todos los archivos que usan fechas son Dashboard.tsx, ProjectBlog, sketchStorage, notificationService, ProjectDetail, app, blogform, blogdetail, projectsmainview, projectresourcer, bloglist, ideasmainview, idealist


Como he dicho he empezado el refactor haciendo una clase de utilidad para centralizar todo el tema de las fechas esto hace que los componentes no tengan que estas haciendo metodos propios para calcular proyectos de x fechas etc de esto se ocupa el DateUtils.

He empezado por Dashboard.tsx y perfecto todo muy bien, tambien me he preguntado como afecta al rendimiento el hecho de que estemos haciendo muchas instancias de date pero segun la documentacion de date-fns, estas funciones son bastante ligeras y optimizadas para su uso, por lo que no deberia haber un impacto significativo en el rendimiento.

Habria que mirar si notification service tendria que ser un singleton o no