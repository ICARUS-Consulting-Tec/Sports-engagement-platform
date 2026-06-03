// @ts-nocheck
import React, { useState } from "react";

import StartPage from "./startPage";
import Game from "./game";

const Tetris = () => {
	const [runing, setRuning] = useState(false);
	return runing ? (
		<Game stopClick={() => setRuning(false)} />
	) : (
		<StartPage startClick={() => setRuning(true)} />
	);
};

export default Tetris;
