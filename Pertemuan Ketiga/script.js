let fontSize = 16;
let savedColor = "#ffffff";
let taskToDelete = null;

function addTask() {
  const input = document.getElementById("newTask");
  const text = input.value.trim();
  if (!text) return alert("Please enter a task!");

  const li = document.createElement("li");
  li.textContent = text;
  li.onclick = (e) => { if (e.target === li) li.classList.toggle("completed"); };
  li.ondblclick = () => editTask(li);

  const del = document.createElement("span");
  del.textContent = "✖";
  del.className = "close";
  del.onclick = (e) => {
    e.stopPropagation();
    confirmDelete(li);
  };

  li.appendChild(del);
  document.getElementById("taskList").appendChild(li);
  input.value = "";
}

function editTask(el) {
  const oldText = el.firstChild.textContent;
  const wasDone = el.classList.contains("completed");
  const input = document.createElement("input");
  input.type = "text";
  input.value = oldText;
  el.textContent = "";
  el.appendChild(input);
  input.focus();

  const save = () => {
    const newText = input.value.trim() || oldText;
    el.textContent = newText;
    if (wasDone) el.classList.add("completed");
    const del = document.createElement("span");
    del.textContent = "✖";
    del.className = "close";
    del.onclick = (e) => { e.stopPropagation(); confirmDelete(el); };
    el.appendChild(del);
  };

  input.addEventListener("blur", save);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") save(); });
}

function confirmDelete(taskElement) {
  taskToDelete = taskElement;
  const modal = document.getElementById("confirmModal");
  modal.style.display = "flex";

  const yesBtn = document.getElementById("confirmYes");
  const noBtn = document.getElementById("confirmNo");

  yesBtn.onclick = () => {
    taskToDelete.remove();
    closeModal();
  };

  noBtn.onclick = closeModal;
}

function closeModal() {
  document.getElementById("confirmModal").style.display = "none";
  taskToDelete = null;
}

function changeBackgroundColor(color) {
  const body = document.body;
  savedColor = color;
  body.style.background = body.classList.contains("dark-mode") ? "#000" : color;
}

function toggleDarkMode() {
  const body = document.body;
  const btn = document.getElementById("themeToggle");
  body.classList.toggle("dark-mode");
  const isDark = body.classList.contains("dark-mode");
  body.style.background = isDark ? "#000" : savedColor;
  btn.textContent = isDark ? "Toggle Light Mode" : "Toggle Dark Mode";
}

function adjustFontSize(delta) {
  fontSize = Math.max(10, fontSize + delta);
  document.body.style.fontSize = fontSize + "px";
}

function changeFont(font) {
  document.body.style.fontFamily = font;
  document.querySelectorAll("*").forEach((el) => (el.style.fontFamily = font));
}