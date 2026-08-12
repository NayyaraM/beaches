//
 Simple line-chart drawn on the canvas placeholder in the "graph" box.
window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("graphCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  const padding = 30;

  const years = ["2021", "2022", "2023", "2024", "2025"];
  const 
values = [8, 18, 20, 33, 36];
  const maxVal = 40;

  // axes
  ctx.strokeStyle = "#000102";
  ctx.beginPath();
  ctx.moveTo(padding, 10);
  ctx.lineTo(padding, h - padding);
  ctx.lineTo(w - 10, h - padding);
  ctx.stroke();

  // gridlines + y labels
  ctx.fillStyle = "#555";
  ctx.font = "10px Arial";
  for (let v = 0; v <= maxVal; v += 10) {
    const y = h - padding - (v / maxVal) * (h - padding - 10);
    ctx.strokeStyle = "#cdeaea";
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(w - 10, y);
    ctx.stroke();
    ctx.fillText(v, 6, y + 3);
  }

  // line
  const stepX = (w - 10 - padding) / (values.length - 1);
  ctx.strokeStyle = "#2AC9CF";
  ctx.lineWidth = 2;
  ctx.beginPath();
  values.forEach((v, i) => {
    const x = padding + i * stepX;
    const y = h - padding - (v / maxVal) * (h - padding - 10);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  // points + x labels
  ctx.fillStyle = "#2aa6cf";
  values.forEach((v, i) => {
    const x = padding + i * stepX;
    const y = h - padding - (v / maxVal) * (h - padding - 10);
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#545454";
    ctx.fillText(years[i], x - 12, h - padding + 14);
    ctx.fillStyle = "#2AC9CF";
  });
});
