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
  Nombre: <input class="jname" t-model="state.text"/>
  Email: <input class="jemail" t-model.lazy="state.othertext"/>
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

    let response_players = await fetch('http://localhost:8000/padel_app/get_players/', {method: 'GET', cache: "no-store"});
    response_players.then
    console.log(response_players)
    let myJson_players = await response_players.json(); //extract JSON from the http response
    console.log(myJson_players)
    let myJson_clubs = {}
    console.log("22222222222")
    let response_clubs = await fetch('http://localhost:8000/padel_app/get_clubs/', {method: 'GET', cache: "no-store"},
    );
    response_clubs.then
    console.log(response_clubs)
    myJson_clubs = await response_clubs.json(); //extract JSON from the http response
    console.log(myJson_clubs)
    // do something with myJson
    // return xxxx
  }

  PassData = async () => {
    console.log("1111111111")
    // let data = { username: "example" };
    const jugadors = document.getElementsByClassName("jugador");
    // let namea = document.getElementsByClassName("jname")[0].value
    //let misEmails = document.getElementsByClassName("jemail");
    for (let i=0; i < jugadors.length; i++) {
      console.log(jugadors[i]);
    }
    
    const requestOptions = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify(misElementos)
    };

    let response_players = await fetch('http://localhost:8000/padel_app/save_player/', requestOptions);

    // const data = { username: "example" };
    // fetch("https://example.com/profile", {
    //   method: "POST", // or 'PUT'
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Success:", data);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });

    response_players.then
    console.log(response_players)
    let myJson_players = await response_players.json(); //extract JSON from the http response
    console.log(myJson_players)
    let myJson_clubs = {}
  }
  

}

Form.template = xml`
    <templates>
    <div class="container" t-name="Form">
      <div class="row">
        <div class="col-6">
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
          <button onclick="window.location.href = '../Loading2/game.html'"> Enviar </button>
          <button t-on-click="SaveData"> TEST API </button>
          <button t-on-click="PassData"> TEST SEND </button>
          <hr/>
        </div>
      </div>  
    </div>
    </templates>
  `
// Application setup
mount(Form, document.body, { dev: true });
