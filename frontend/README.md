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

Código similar encontrado con 1 tipo de licencia