document.addEventListener("DOMContentLoaded", () => {
	const historyElement = document.getElementById("terminal-history");
	const formElement = document.getElementById("terminal-form");
	const inputElement = document.getElementById("terminal-input");

	const uiElements = {
		playerHpBar: document.getElementById("player-hp-bar"),
		enemyHpBar: document.getElementById("enemy-hp-bar"),
		playerLevel: document.getElementById("player-level"),
		enemyLabel: document.getElementById("enemy-label"),
		turnIndicator: document.getElementById("turn-indicator"),
		statusLine: document.getElementById("status-line"),
		playerSpriteWrap: document.getElementById("player-sprite-wrap"),
		enemySpriteWrap: document.getElementById("enemy-sprite-wrap")
	};

	const app = new window.DungeonFighter.GameApp(uiElements);

	const printLine = (text, type = "system") => {
		const line = document.createElement("div");
		line.className = `terminal-line ${type}`;
		line.textContent = text;
		historyElement.appendChild(line);
		historyElement.scrollTop = historyElement.scrollHeight;
	};

	printLine("Dungeon Fighter terminal ready. Type HELP.");

	formElement.addEventListener("submit", async (event) => {
		event.preventDefault();
		const input = inputElement.value.trim();
		if (!input) {
			return;
		}

		printLine(`> ${input}`);
		inputElement.value = "";

		try {
			const output = await app.execute(input);
			if (output) {
				output.split("\n").forEach((line) => printLine(line));
			}
		} catch (error) {
			printLine(`ERROR: ${error.message}`, "error");
		}
	});

	inputElement.focus();
});
