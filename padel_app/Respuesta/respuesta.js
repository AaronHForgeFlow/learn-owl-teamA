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
    console.log("xxx")
  }

  
}

document.addEventListener('DOMContentLoaded', function() {
  const club_chosen = localStorage.getItem('club_chosen');
  console.log(club_chosen)
  const miparrafo = document.getElementById("club")
  miparrafo.textContent = club_chosen
  const jugadors = JSON.parse(localStorage.getItem('jugadors'));
  console.log(jugadors)
  //const location = JSON.parse(localStorage.getItem('club_chosen'));
  //console.log(club_chosen)
  const miparrafolocation = document.getElementById("location")
  const location = localStorage.getItem('location');
  miparrafolocation.textContent = location
  

  const miparrafopadel1 = document.getElementById("padel1")
  miparrafopadel1.textContent = jugadors[0].nombre + ": " + jugadors[0].email  


  const miparrafopadel2 = document.getElementById("padel2")
  miparrafopadel2.textContent = jugadors[1].nombre + ": " + jugadors[1].email  

  const miparrafopadel3 = document.getElementById("padel3")
  miparrafopadel3.textContent = jugadors[2].nombre + ": " + jugadors[2].email  

  const miparrafopadel4 = document.getElementById("padel4")
  miparrafopadel4.textContent = jugadors[3].nombre + ": " + jugadors[3].email  
});



Respuesta.template = xml`
    <templates>
    <div t-name="Respuesta">
      <h1>Tu reserva</h1>
      <h3>Nombre del club: </h3>
      <p id="club"> ForgeFlow Club</p>
      <h3>Ubicación: </h3>
      <p id="location">Ubicacion Google Maps -> ToDo</p>
      <h3>Dia asignada</h3>
      <p> 04/04/2023 </p>
      <h3>Hora  asignada</h3>
      <p> 22:00</p>
      <h3>Padel friends</h3>
      <p id="padel1">Pablo: coreeo@gmail.com</p>
      <p id="padel2">Pablo: coreeo@gmail.com</p>
      <p id="padel3">Pablo: coreeo@gmail.com</p>
      <p id="padel4">Pablo: coreeo@gmail.com</p>
      <hr/>
    </div>
    </templates>
  `
// Application setup
mount(Respuesta, document.body, { dev: true });
