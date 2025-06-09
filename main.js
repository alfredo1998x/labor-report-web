document.getElementById("fileInput").addEventListener("change", handleFileUpload);
document.getElementById("generatePdfBtn").addEventListener("click", generatePdf);
document.getElementById("sendEmailBtn").addEventListener("click", sendEmailPlaceholder);

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    const content = e.target.result;
    if (file.name.endsWith(".csv")) {
      displayCsvData(content);
    } else {
      alert("Only CSV supported for now");
    }
  };

  reader.readAsText(file);
}

function displayCsvData(csv) {
  const rows = csv.trim().split("\n").map(r => r.split(","));
  const head = document.getElementById("tableHead");
  const body = document.getElementById("tableBody");

  head.innerHTML = "";
  body.innerHTML = "";

  // Headers
  const headerRow = rows[0];
  headerRow.forEach(cell => {
    const th = document.createElement("th");
    th.className = "border px-4 py-2 text-left";
    th.textContent = cell;
    head.appendChild(th);
  });

  // Body
  rows.slice(1).forEach(row => {
    const tr = document.createElement("tr");
    row.forEach(cell => {
      const td = document.createElement("td");
      td.className = "border px-4 py-1";
      td.textContent = cell;
      tr.appendChild(td);
    });
    body.appendChild(tr);
  });
}

function generatePdf() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("Labor Report PDF Export", 10, 10);
  doc.save("labor-report.pdf");
}

function sendEmailPlaceholder() {
  alert("Email sending will be added in next phase.");
}
