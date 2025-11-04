/**
 * Web Component nativo (stand-alone) usando Custom Elements y Shadow DOM
 * Este componente demuestra cómo crear un componente web sin dependencias externas
 */
class VanillaGreeter extends HTMLElement {
  constructor() {
    super();
    
    // Crear Shadow DOM para encapsular estilos y estructura
    this.attachShadow({ mode: 'open' });
    
    // Estado interno
    this._name = 'Mundo';
    this._counter = 0;
    
    // Renderizar el componente
    this.render();
    
    // Configurar event listeners
    this.setupEventListeners();
  }
  
  // Observar cambios en estos atributos
  static get observedAttributes() {
    return ['name'];
  }
  
  // Callback cuando un atributo observado cambia
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'name' && oldValue !== newValue) {
      this._name = newValue || 'Mundo';
      this.render();
    }
  }
  
  // Getter y setter para la propiedad name
  get name() {
    return this._name;
  }
  
  set name(value) {
    this._name = value || 'Mundo';
    this.setAttribute('name', this._name);
    this.render();
  }
  
  // Getter y setter para counter
  get counter() {
    return this._counter;
  }
  
  set counter(value) {
    this._counter = parseInt(value) || 0;
    this.render();
  }
  
  // Método público para hacer focus en el input
  focusInput() {
    const input = this.shadowRoot.querySelector('input');
    if (input) {
      input.focus();
    }
  }
  
  // Renderizar el componente
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: system-ui, -apple-system, sans-serif;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          padding: 20px;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          max-width: 400px;
        }
        
        .header {
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid #ddd;
        }
        
        .title {
          color: #333;
          font-size: 18px;
          font-weight: bold;
          margin: 0 0 8px 0;
        }
        
        .subtitle {
          color: #666;
          font-size: 14px;
          margin: 0;
        }
        
        .content {
          margin-bottom: 16px;
        }
        
        .greeting {
          background: white;
          padding: 12px;
          border-radius: 6px;
          border-left: 4px solid #4CAF50;
          margin-bottom: 12px;
          font-size: 16px;
          color: #333;
        }
        
        .counter {
          background: #fff3cd;
          border: 1px solid #ffeaa7;
          padding: 8px 12px;
          border-radius: 4px;
          font-size: 14px;
          color: #856404;
          margin-bottom: 12px;
        }
        
        .controls {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .input-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        label {
          font-weight: 500;
          color: #555;
          min-width: 60px;
        }
        
        input {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
          transition: border-color 0.2s ease;
        }
        
        input:focus {
          outline: none;
          border-color: #4CAF50;
          box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
        }
        
        button {
          background: #4CAF50;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: background-color 0.2s ease;
        }
        
        button:hover {
          background: #45a049;
        }
        
        button:active {
          transform: translateY(1px);
        }
        
        .slot-content {
          margin-top: 16px;
          padding: 12px;
          background: #f8f9fa;
          border-radius: 4px;
          border: 1px dashed #dee2e6;
        }
      </style>
      
      <div class="header">
        <h3 class="title">🍦 Vanilla Web Component</h3>
        <p class="subtitle">Componente nativo sin dependencias</p>
      </div>
      
      <div class="content">
        <div class="greeting">
          👋 ¡Hola, <strong>${this._name}</strong>!
        </div>
        
        <div class="counter">
          🔢 Contador: <strong>${this._counter}</strong> clicks
        </div>
        
        <div class="controls">
          <div class="input-group">
            <label for="nameInput">Nombre:</label>
            <input 
              id="nameInput" 
              type="text" 
              value="${this._name}" 
              placeholder="Escribe un nombre..."
            />
          </div>
          
          <button id="greetBtn">
            🎉 Saludar (${this._counter})
          </button>
        </div>
      </div>
      
      <div class="slot-content">
        <slot>
          <em>💡 Aquí puedes agregar contenido usando &lt;slot&gt;</em>
        </slot>
      </div>
    `;
  }
  
  // Configurar event listeners
  setupEventListeners() {
    // Event listener para el input
    this.shadowRoot.addEventListener('input', (e) => {
      if (e.target.id === 'nameInput') {
        this.name = e.target.value;
      }
    });
    
    // Event listener para el botón
    this.shadowRoot.addEventListener('click', (e) => {
      if (e.target.id === 'greetBtn') {
        this._counter++;
        this.render();
        this.setupEventListeners(); // Re-setup listeners after render
        
        // Emitir evento custom
        this.dispatchEvent(new CustomEvent('greet', {
          detail: {
            name: this._name,
            counter: this._counter,
            message: `¡Hola, ${this._name}! (Click #${this._counter})`
          },
          bubbles: true
        }));
      }
    });
  }
  
  // Callback cuando el elemento se conecta al DOM
  connectedCallback() {
    console.log('🍦 Vanilla component conectado al DOM');
  }
  
  // Callback cuando el elemento se desconecta del DOM
  disconnectedCallback() {
    console.log('🍦 Vanilla component desconectado del DOM');
  }
}

// Registrar el custom element
customElements.define('vanilla-greeter', VanillaGreeter);