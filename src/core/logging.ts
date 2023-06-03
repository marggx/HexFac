const timestamp = "⏱ %c" + (Math.floor(performance.now()) + "").padEnd(6, " ") + "";
consoleMethod.call(console, timestamp + " %c" + context, "color: #7f7;", "color: " + labelColor + ";", ...args);
