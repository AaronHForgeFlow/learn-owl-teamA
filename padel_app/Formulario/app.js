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


  PassData = async () => {
    console.log("1111111111")
    // let data = { username: "example" };
    const infoJugadors = [];
    const OtherInfo = [];
    const jugadors = document.getElementsByClassName("jugador");
    const nivel_sel = document.getElementById("nivel");
    const location_sel = document.getElementsByClassName("location");
    // let namea = document.getElementsByClassName("jname")[0].value
    //let misEmails = document.getElementsByClassName("jemail");
    for (let i=0; i < jugadors.length; i++) {
       const nombre = jugadors[i].querySelector(".jname").value;
       const email = jugadors[i].querySelector(".jemail").value;

       const jugador = {nombre,email};
       infoJugadors.push(jugador);       
    }    
    const nivel = nivel_sel.value
    OtherInfo.push(nivel);
    const location = location_sel[0].querySelector("input").value
    OtherInfo.push(location);
    console.log(infoJugadors);
    const requestOptions = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({"id": 1, "params": infoJugadors, "other": OtherInfo})
    };

    let response_players = await fetch('http://localhost:8000/padel_app/save_player/', requestOptions);
    response_players.then
    console.log(response_players)
    let myJson_players = await response_players.json(); //extract JSON from the http response
    console.log(myJson_players)
    
  } 


  SaveData = async () => {
    console.log("1111111111")
    this.PassData()
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
    const clubs = Object.values(myJson_clubs)
    const location_sel = document.getElementsByClassName("location");
    const location = location_sel[0].querySelector("input").value
    var club_chosen = null
    for (let i=0; i < clubs.length; i++) {
      if (clubs[i].location == location){
        club_chosen = clubs[i].name 
      }
    }
    console.log(club_chosen)
    var infoJugadors = [];
    const jugadors = document.getElementsByClassName("jugador");
    for (let i=0; i < jugadors.length; i++) {
      const nombre = jugadors[i].querySelector(".jname").value;
      const email = jugadors[i].querySelector(".jemail").value;

      const jugador = {nombre,email};
      infoJugadors.push(jugador);       
   }    
    const players = Object.values(myJson_players)
    const nivel = document.getElementById("nivel").value;
    const num_players = document.getElementById("numPlayers").value;
    for (let i=0; i < 4 - num_players; i++) {
      let sortir = true
      let j = 0
      while (sortir && j < players.length) {
        if (players[j].nivel == nivel){
          let nombre = players[j].name
          let email = players[j].email
          let jugador = {nombre,email};
          infoJugadors.push(jugador)
          console.log("FAIL")
          sortir = false
          players.splice(j, 1)
        }
        j++;

      }
      
    }
    console.log(infoJugadors)  
    localStorage.setItem('jugadors', JSON.stringify(infoJugadors)) 
    localStorage.setItem('club_chosen', club_chosen) 
    //localStorage.setItem('location', location)


    window.location.href = '../Loading2/game.html'

  }
  

}

Form.template = xml`
    <templates>
    <div class="container" t-name="Form">
      <div class="row">
        <div class="col-6">
          <h1 class="deporte-title" >PADELMER</h1>
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
          <div class="nombre2">
            Nivel:
            <select id="nivel" class="nivel" t-model="state.color">
                <option id="paq" value="paquete">Paquete</option>
                <option id="ama" value="amateur">Amateur</option>
                <option id="prof" value="prof">Profesional</option>
                <option id="top" value="top">Top</option>
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
          <button class="my-button" t-on-click="SaveData"> RESERVAR!!! </button>
          <hr/>
          <footer>
          
          <p class="copyright">No te preocupes si pierdes, siempre puedes culpar a la pista.</p>
          </footer>
        </div>
      </div>  
    </div>
    </templates>
  `
// Application setup
mount(Form, document.body, { dev: true });
