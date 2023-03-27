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




class Form extends Component {
  static template = "Form";
  static components = { Jugador };
  setup() {
    this.state = useState({
      number: 1,
      players: [{id: 0}]
    });
  }
  viewPlayers(){
    let n = parseInt(numPlayers.value)
    if (this.state.players.length > n) {
      this.state.players = this.state.players.slice(0, n-1)
    }
    while (this.state.players.length < n) {
      this.state.players.push({id: this.state.players.length})
    }
  }
  SaveData = async () => {
    console.log("1111111111")
    const response = await fetch('http://localhost:8000/padel_app/get_partner/', {"is_club":1}); // TODO: poner en el metodo de respuesta leer datos
    response.then
    console.log(response)
    const myJson = await response.json(); //extract JSON from the http response
    console.log(myJson)
    // do something with myJson
    // return xxxx
  }
  
}

Form.template = xml`
    <templates>
    <div t-name="Form">
      <h1>PADELMER</h1>
      <div class="nombre">
        Numero jugadores:
        <select  t-model="state.number" id="numPlayers" t-on-change= "viewPlayers">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
        </select>
      </div>
      <div class="row">
      <t t-foreach="state.players" t-as="player" t-key="player.id">
      <Jugador/>
      </t>
      </div>
      <div class="nombre">
        Nivel:
        <select  t-model="state.color">
            <option value="paquete">Paquete</option>
            <option value="amateur">Amateur</option>
            <option value="prof">Profesional</option>
            <option value="top">Top</option>
        </select>
      </div>
      <div class="fecha">
      FECHA
        <input type="date" id="start" name="trip-start"
        value="2018-07-22"
        min="2018-01-01" max="2018-12-31">
        </input>
        <span/> 
        <input type="time" id="hora" name="hora" min="09:00:00" max="18:00:00" step="3600" />
      </div>
      <div class="location">
       Ciudad: <input t-model.lazy="state.location"/>
      </div>
      <button onclick="window.location.href = '../Respuesta/index.html'"> Enviar </button>
      <button t-on-click="SaveData"> TEST API </button>
      <hr/>
    </div>
    </templates>
  `
// Application setup
mount(Form, document.body, { dev: true });
