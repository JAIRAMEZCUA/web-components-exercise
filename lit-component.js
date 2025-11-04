/**
 * Web Component usando Lit
 * Este componente demuestra cómo crear un componente web con Lit framework
 * que ofrece reactividad automática y templating declarativo
 */
import { LitElement, html, css } from 'https://cdn.skypack.dev/lit';

class LitGreeter extends LitElement {
  // Definir propiedades reactivas
  static properties = {
    name: { type: String },
    counter: { type: Number }
  };
  
  // Definir estilos del componente
  static styles = css`
    :host {
      display: block;
      font-family: system-ui, -apple-system, sans-serif;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      max-width: 400px;
    }
    
    .header {
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    }
    
    .title {
      font-size: 18px;
      font-weight: bold;
      margin: 0 0 8px 0;
    }
    
    .subtitle {
      opacity: 0.8;
      font-size: 14px;
      margin: 0;
    }
    
    .content {
      margin-bottom: 16px;
    }
    
    .greeting {
      background: rgba(255, 255, 255, 0.9);
      color: #333;
      padding: 12px;
      border-radius: 6px;
      border-left: 4px solid #ff6b6b;
      margin-bottom: 12px;
      font-size: 16px;
    }
    
    .counter {
      background: rgba(255, 193, 7, 0.9);
      color: #333;
      padding: 8px 12px;
      border-radius: 4px;
      font-size: 14px;
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
      min-width: 60px;
    }
    
    input {
      flex: 1;
      padding: 8px 12px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 4px;
      font-size: 14px;
      background: rgba(255, 255, 255, 0.9);
      color: #333;
      transition: border-color 0.2s ease;
    }
    
    input:focus {
      outline: none;
      border-color: #ff6b6b;
      box-shadow: 0 0 0 2px rgba(255, 107, 107, 0.3);
    }
    
    button {
      background: #ff6b6b;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s ease;
    }
    
    button:hover {
      background: #ff5252;
      transform: translateY(-1px);
    }
    
    button:active {
      transform: translateY(0);
    }
    
    .slot-content {
      margin-top: 16px;
      padding: 12px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      border: 1px dashed rgba(255, 255, 255, 0.3);
    }
    
    .reactive-demo {
      background: rgba(255, 255, 255, 0.1);
      padding: 8px 12px;
      border-radius: 4px;
      font-size: 12px;
      margin-bottom: 8px;
      opacity: 0.8;
    }
  `;
  
  constructor() {
    super();
    // Valores iniciales
    this.name = 'Mundo';
    this.counter = 0;
  }
  
  // Método público para hacer focus en el input
  focusInput() {
    const input = this.shadowRoot.querySelector('input');
    if (input) {
      input.focus();
    }
  }
  
  // Manejar el cambio del input
  _onNameInput(e) {
    this.name = e.target.value;
  }
  
  // Manejar el click del botón
  _onGreetClick() {
    this.counter++;
    
    // Emitir evento custom
    this.dispatchEvent(new CustomEvent('greet', {
      detail: {
        name: this.name,
        counter: this.counter,
        message: `¡Hola, ${this.name}! (Click #${this.counter})`,
        framework: 'Lit'
      },
      bubbles: true
    }));
  }
  
  // Template del componente - se re-renderiza automáticamente cuando cambian las propiedades
  render() {
    return html`
      <div class="header">
        <h3 class="title">⚡ Lit Web Component</h3>
        <p class="subtitle">Componente con reactividad automática</p>
      </div>
      
      <div class="content">
        <div class="reactive-demo">
          🔄 Propiedades reactivas: name="${this.name}", counter=${this.counter}
        </div>
        
        <div class="greeting">
          👋 ¡Hola, <strong>${this.name}</strong>!
        </div>
        
        <div class="counter">
          🔢 Contador: <strong>${this.counter}</strong> clicks
        </div>
        
        <div class="controls">
          <div class="input-group">
            <label for="nameInput">Nombre:</label>
            <input 
              id="nameInput"
              type="text" 
              .value="${this.name}"
              @input="${this._onNameInput}"
              placeholder="Escribe un nombre..."
            />
          </div>
          
          <button @click="${this._onGreetClick}">
            🎉 Saludar (${this.counter})
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
  
  // Callbacks del ciclo de vida
  connectedCallback() {
    super.connectedCallback();
    console.log('⚡ Lit component conectado al DOM');
  }
  
  disconnectedCallback() {
    super.disconnectedCallback();
    console.log('⚡ Lit component desconectado del DOM');
  }
  
  // Callback que se ejecuta después de cada actualización
  updated(changedProperties) {
    super.updated(changedProperties);
    
    if (changedProperties.has('name') || changedProperties.has('counter')) {
      console.log('⚡ Lit component actualizado:', {
        name: this.name,
        counter: this.counter,
        changedProperties: Array.from(changedProperties.keys())
      });
    }
  }
}

// Registrar el custom element
customElements.define('lit-greeter', LitGreeter);