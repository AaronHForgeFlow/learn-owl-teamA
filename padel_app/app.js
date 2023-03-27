// This example illustrate how the t-model directive can be used to synchronize
// data between html inputs (and select/textareas) and the state of a component.
// Note that there are two controls with t-model="color": they are totally
// synchronized.
const { Component, useState, mount, xml} = owl;

const JUGADOR_TEMPLATE = xml /* xml */`
<div class="jugador">

Nombre: <input t-model="state.text"/>
</div>
Email: <input t-model.lazy="state.othertext"/>
</div>
</div>`;

class Jugador extends Component {
  static template = JUGADOR_TEMPLATE;

}




class Form extends Component {
  static template = "Form";
  static components = { Jugador };
  setup() {
    this.state = useState({

    });
  }
  }

  Form.template =xml`
    <templates>
    <div t-name="Form">
      <h1>PADEL AWESOME</h1>
      <div class="nombre">
        Nombre: <input t-model="state.text"/>
      </div>
      <div class="nombre">
        Email: <input t-model.lazy="state.othertext"/>
      </div>
      <div class="nombre">
        Numero jugadores:
        <select  t-model="state.color">
            <option value="uno">1</option>
            <option value="dos">2</option>
            <option value="tres">3</option>
            <option value="cuatro">4</option>
        </select>
        <div class="form-group" id="player2" style="display:none;">
        <label for="player2Name">Player 2 Name:</label>
        <input type="text" class="form-control" id="player2Name" name="player2Name">
        <label for="player2Email">Player 2 Email:</label>
        <input type="email" class="form-control" id="player2Email" name="player2Email">
      </div>
      
      <div class="form-group" id="player3" style="display:none;">
        <label for="player3Name">Player 3 Name:</label>
        <input type="text" class="form-control" id="player3Name" name="player3Name">
        <label for="player3Email">Player 3 Email:</label>
        <input type="email" class="form-control" id="player3Email" name="player3Email">
      </div>
      
      <div class="form-group" id="player4" style="display:none;">
        <label for="player4Name">Player 4 Name:</label>
        <input type="text" class="form-control" id="player4Name" name="player4Name">
        <label for="player4Email">Player 4 Email:</label>
        <input type="email" class="form-control" id="player4Email" name="player4Email">
      </div>
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
      <hr/>
      <h1>State</h1>
      <div>Text: <t t-esc="state.text"/></div>
      <div>Other Text: <t t-esc="state.othertext"/></div>
      <div>Number: <t t-esc="state.number"/></div>
      <div>Boolean: <t t-esc="state.location"/></div>
      <div>Color: <t t-esc="state.color"/></div>
    </div>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
  $(function() {
    $('#numPlayers').change(function() {
      var numPlayers = $(this).val();
      $('#player2, #player3, #player4').hide();
      if (numPlayers >= 2) {
        $('#player2').show();
      }
      if (numPlayers >= 3) {
        $('#player3').show();
      }
      if (numPlayers >= 4) {
        $('#player4').show();
      }
    });
  });
</script>
    </templates>
  `
// Application setup
mount(Form, document.body, {dev: true });
