// Datos iniciales de la tabla
var initialTableData = [
    { pais: "Argentina", puntaje: "800" },
    { pais: "Brasil", puntaje: "600" },
    { pais: "Chile", puntaje: "700" },
    { pais: "Perú", puntaje: "500" },
    { pais: "Uruguay", puntaje: "900" }
];
  
// Elementos HTML
var table = document.getElementById("table");
var addRowBtn = document.getElementById("add-row-btn");
var resetBtn = document.getElementById("reset-btn");
var saveBtn = document.getElementById("save-btn");
var selectInput = document.getElementById("select-input");
var startStopBtn = document.getElementById("start-stop-btn");
  
// Variables globales
var tableData = initialTableData.slice(); // Copia de los datos iniciales
var isRunning = false;
var intervalID = null;
  
// Función para actualizar la tabla
function updateTable() {
    // Ordenar la tabla por puntaje
    tableData.sort(function(a, b) {
      return b.puntaje - a.puntaje;
    });
  
    // Limpiar la tabla existente
    table.innerHTML = "";
  
    // Agregar la fila de encabezado
    var thead = document.createElement("thead");
    var tr = document.createElement("tr");
    var th1 = document.createElement("th");
    var th2 = document.createElement("th");
    th1.textContent = "Nombre del país";
    th2.textContent = "Puntaje";
    th2.classList.add("sortable");
    th2.addEventListener("click", handleSort);
    tr.appendChild(th1);
    tr.appendChild(th2);
    thead.appendChild(tr);
    table.appendChild(thead);
  
    // Agregar las filas de datos
    var tbody = document.createElement("tbody");
    for (var i = 0; i < tableData.length; i++) {
      var tr = document.createElement("tr");
      var td1 = document.createElement("td");
      var td2 = document.createElement("td");
      td1.textContent = tableData[i].pais;
      td1.contentEditable = true;
      td2.textContent = tableData[i].puntaje;
      td2.contentEditable = true;
      tr.appendChild(td1);
      tr.appendChild(td2);
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
}
  
// Función para agregar una fila a la tabla
function addRow() {
    var tbody = table.getElementsByTagName("tbody")[0];
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    td1.contentEditable = true;
    td2.contentEditable = true;
    tr.appendChild(td1);
    tr.appendChild(td2);
    tbody.appendChild(tr);
}
  
// Función para resetear la tabla a su estado inicial
function resetTable() {
    tableData = initialTableData.slice();
    updateTable();
}
  
// Función para guardar el estado actual de la tabla
function saveTable() {
    var selectInputOptions = selectInput.getElementsByTagName("option");
    var currentOption = selectInputOptions[selectInputOptions.length - 1];

    // Crear una nueva opción en el menú desplegable
    var newOption = document.createElement("option");
    newOption.textContent = "Versión " + (selectInputOptions.length + 1);
    selectInput.insertBefore(newOption, currentOption.nextSibling);
  
    // Guardar una copia de los datos actuales en un objeto
    var savedTableData = { version: selectInputOptions.length, data: tableData.slice() };
  
    // Almacenar el objeto en el valor de la opción
    newOption.value = JSON.stringify(savedTableData);
}
  
// Función para cargar una versión guardada de la tabla
function loadTable() {
    var savedTableData = JSON.parse(selectInput.value);
    tableData = savedTableData.data.slice();
    updateTable();
  }
  
  // Función para ordenar la tabla por la columna seleccionada
  function handleSort() {
    var column = this.cellIndex;
    var tbody = table.getElementsByTagName("tbody")[0];
    var rows = [].slice.call(tbody.rows); // Convertir HTMLCollection a Array
    var sortDir = this.classList.contains("desc") ? -1 : 1;
  
    // Remover la clase "desc" de todas las columnas
    var sortableColumns = table.getElementsByClassName("sortable");
    for (var i = 0; i < sortableColumns.length; i++) {
      sortableColumns[i].classList.remove("desc");
    }
  
    // Agregar la clase "desc" a la columna seleccionada si ya estaba ordenada de forma ascendente
    if (sortDir === 1) {
      this.classList.add("desc");
    }
  
    // Ordenar las filas por la columna seleccionada
    rows.sort(function(a, b) {
      var aVal = parseInt(a.cells[column].textContent);
      var bVal = parseInt(b.cells[column].textContent);
      return sortDir * (aVal - bVal);
    });
  
    // Actualizar la tabla con las filas ordenadas
    for (var i = 0; i < rows.length; i++) {
      tbody.appendChild(rows[i]);
    }
}
  
// Función para actualizar el puntaje de forma aleatoria
function updateScore() {
    for (var i = 0; i < tableData.length; i++) {
      tableData[i].puntaje = Math.floor(Math.random() * 1001);
    }
    updateTable();
}
  
// Función para iniciar o detener la actualización de puntajes aleatorios
function toggleUpdateScore() {
    if (!isRunning) {
      isRunning = true;
      startStopBtn.textContent = "Parar";
      intervalID = setInterval(updateScore, 3000);
    } else {
      isRunning = false;
      startStopBtn.textContent = "Iniciar";
      clearInterval(intervalID);
    }
}
  
// Asignar eventos a los elementos
