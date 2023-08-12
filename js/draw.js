export const draw = (ctx, bufferLength, x, barWidth, barHeight, dataArray) => {
  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i] * 1.5;
    ctx.save();
    let x = Math.sin((i * Math.PI) / 180) + 100;
    let y = Math.cos((i * Math.PI) / 180) + 100;
    ctx.translate(canvas.width / 2 + x, canvas.height / 2);
    ctx.rotate(i + (Math.PI * 2) / bufferLength);

    const hue = i * 0.6 + 200;
    ctx.fillStyle = "hsl(" + hue + ",100%, 50%)";
    ctx.strokeStyle = "hsl(" + hue + ",100%, 50%)";

    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 10;
    ctx.shadowBlur = 8;
    ctx.shadowColor = "rgba(0,0,0,1)";

    ctx.globalCompositeOperation = "source-over";

    // line
    ctx.lineWidth = barHeight / 5;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y - barHeight);
    ctx.lineCap = "round";
    ctx.stroke();
    ctx.closePath();

    // circle
    ctx.beginPath();
    ctx.arc(0, y + barHeight, barHeight / 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "hsl(1, 100%, " + i / 3 + "%)";
    ctx.stroke();

    ctx.restore();
    x += barWidth;
  }
};
