const { Component, mount, xml } = owl;
// -------------------------------------------------------------------------
// Task Component
// -------------------------------------------------------------------------
class Task extends Component {
  static template = xml /* xml */`
    <div class="task" t-att-class="props.task.isCompleted ? 'done' : ''">
      <input type="checkbox" t-att-checked="props.task.isCompleted"/>
      <span><t t-esc="props.task.text"/></span>
    </div>`;
  static props = ["task"];
}

// -------------------------------------------------------------------------
// Root Component
// -------------------------------------------------------------------------
class Root extends Component {
  static template = xml /* xml */`
    <div class="todo-app">
      <input placeholder="Enter a new task" t-on-keyup="addTask"/>
      <div class="task-list">
        <t t-foreach="tasks" t-as="task" t-key="task.id">
          <Task task="task"/>
        </t>
      </div>
    </div>`;
  static components = { Task };

}

addTask(ev) {
  // 13 is keycode for ENTER
  if (ev.keyCode === 13) {
      const text = ev.target.value.trim();
      ev.target.value = "";
      console.log('adding task', text);
      // todo
  }
}

// -------------------------------------------------------------------------
// Setup
// -------------------------------------------------------------------------
mount(Root, document.body, {dev: true});
