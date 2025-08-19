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