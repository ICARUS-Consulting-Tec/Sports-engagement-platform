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

const StartPage = ({ startClick }: { startClick: any }) => {
  return (
      <div className="relative w-full flex items-center justify-center border border-[#d8dee5] p-6" style={{ minHeight: 280 }}>
        <StartButton onClick={startClick}>Start</StartButton>
      </div>
  );
};
export default StartPage;
