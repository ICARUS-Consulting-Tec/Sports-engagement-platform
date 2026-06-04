// @ts-nocheck
import React from "react";
import styled from "styled-components";
const StartButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  border: none;
  border-radius: 0.75rem;

  background-color: #0f3d78;
  color: white;

  padding: 1rem 2.5rem;

  font-size: 1.125rem;
  font-weight: 700;

  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background-color: #0b2a55;
    transform: translate(-50%, -50%) scale(1.03);
  }

  &:active {
    transform: translate(-50%, -50%) scale(0.98);
  }

  &:focus {
    outline: none;
  }
`;

const StartPage = ({ startClick }) => {
	return (
		<div className="relative w-full h-full min-h-[640px] overflow-hidden bg-white p-6 text-white shadow-[0_10px_24px_rgba(0,0,0,0.12)]">
			<header >
				<p className="mb-2 text-[12px] font-extrabold tracking-[0.18em] text-[#d62839]">
				TETRIS
				</p>
				<h2 className="mb-2 text-[32px] font-bold text-[#0b2a55] max-[900px]:text-[26px]">
				Titans Cubic adventure!
				</h2>
				<p className="m-0 max-w-3xl leading-[1.6] text-[#516173]">
				Stack, rotate, and clear lines as long as you can. Test your reflexes, strategy, and speed in this Tetris challenge only true Titans can survive!.</p>
			</header>
			<StartButton onClick={startClick}>Start</StartButton>
		</div >
	);
};
export default StartPage;
