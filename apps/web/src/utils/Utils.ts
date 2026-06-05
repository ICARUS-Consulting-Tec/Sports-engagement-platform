export function PrintPlayerInMap(player, map) {
	if (!player) return map;

	const nextMap = map.map(row => row.map(pixel => ({ ...pixel })));

	player.bloco.bloco.forEach((row, rowIndex) => {
		row.forEach((pixel, columnIndex) => {
			if (!pixel) return;
			const y = player.pos[0] + rowIndex;
			const x = player.pos[1] + columnIndex;
			if (nextMap[y] && nextMap[y][x]) {
				nextMap[y][x] = {
					fill: 1,
					color: player.bloco.color || "#e54b4b",
				};
			}
		});
	});

	return nextMap;
}
