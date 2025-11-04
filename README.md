# Ejercicio: Web Components (stand‑alone) y Web Components con Lit

## Objetivo
- Entender cómo funcionan los Web Components nativos (Custom Elements + Shadow DOM).
- Ver la ventaja de usar Lit (reactividad y templating) para crear componentes web más concisos.

## Contenido del ejercicio
- `index.html` — página de demostración que usa ambos tipos de componentes.
- `vanilla-component.js` — implementación pura (stand‑alone) usando Custom Elements y Shadow DOM.
- `lit-component.js` — implementación usando Lit (import desde CDN).

## Pasos para ejecutar
1. Abre un servidor local en la carpeta que contiene `index.html`. Por ejemplo:

```bash
cd web-components-exercise
python3 -m http.server 8000
# o (si tienes node): npx http-server -c-1 .  # requiere instalar http-server
```

2. Abre en tu navegador: `http://localhost:8000/index.html`

## Qué observar
- **Encapsulamiento de estilos**: los estilos del Shadow DOM no afectan el documento host.
- **Atributos vs propiedades**: modifica `name` por atributo y por propiedad para ver la diferencia.
- **Eventos custom**: ambos componentes emiten un evento `greet` cuando se hace click en el botón.

## Ejercicios propuestos
1. Añadir una propiedad `counter` que se incremente cada vez que se pulsa el botón y mostrarla en el componente (hacerlo en vanilla y en Lit).
2. Crear un componente que exponga un método público `focusInput()` que ponga foco en un input dentro del Shadow DOM.
3. Probar pasar contenido al componente usando `<slot>`.

## Conceptos clave

### Web Components nativos (stand-alone)
- **Custom Elements**: API para definir elementos HTML personalizados
- **Shadow DOM**: Encapsula CSS y DOM, evita conflictos de estilos
- **Más código**: requiere manejo manual de atributos, propiedades y renderizado

### Web Components con Lit
- **Reactividad**: propiedades reactivas que actualizan automáticamente el UI
- **Templates**: sintaxis declarativa con `html` template literals
- **Menos código**: manejo automático de ciclo de vida y optimizaciones

## Respuestas rápidas / notas
- Web Components nativos requieren más código "boilerplate" para enlazar atributos a propiedades y actualizar el DOM. Ventajas: sin dependencias, interoperables.
- Lit simplifica la renderización y la gestión de propiedades reactivas. Usa un pequeño runtime y ofrece buenas ergonomías (templating, actualizaciones eficientes).

## Recursos
- MDN: Web Components — https://developer.mozilla.org/en-US/docs/Web/Web_Components
- Lit: https://lit.dev/