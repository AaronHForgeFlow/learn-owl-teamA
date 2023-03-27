// This example illustrate how the t-model directive can be used to synchronize
// data between html inputs (and select/textareas) and the state of a component.
// Note that there are two controls with t-model="color": they are totally
// synchronized.
const { Component, useState, mount, xml } = owl;

class Jugador extends Component {
  static template = "Jugador";
  setup() {
    this.state = useState({})
  }
}
Jugador.template = xml /* xml */`
<div class="jugador">
  Nombre: <input t-model="state.text"/>
  Email: <input t-model.lazy="state.othertext"/>
</div>`




class Respuesta extends Component {
  static template = "Respuesta";
  static components = { Jugador };
  setup() {
    this.state = useState({

    });
  }
}

Respuesta.template = xml`
    <templates>
    <div t-name="Respuesta">
      <h1>Tu reserva</h1>
      <h3>Nombre del club: </h3>
      <p> ForgeFlow Club</p>
      <h3>Ubicación: </h3>
      <p>Ubicacion Google Maps -> ToDo</p>
      <h3>Dia asignada</h3>
      <p> 14/22/99 </p>
      <h3>Hora  asignada</h3>
      <p> 22:00</p>
      <h3>Padel friends</h3>
      <p>Pablo: coreeo@gmail.com</p>
      <p>Pablo: coreeo@gmail.com</p>
      <p>Pablo: coreeo@gmail.com</p>
      <p>Pablo: coreeo@gmail.com</p>
      <hr/>
    </div>
    </templates>
  `
// Application setup
mount(Respuesta, document.body, { dev: true });
