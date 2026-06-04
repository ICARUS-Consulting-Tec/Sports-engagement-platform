// @ts-nocheck
import React from "react";
import styled from "styled-components";

const Container = styled.div`
	background-color: ${props =>
		props.backgroundColor ? props.backgroundColor : "black"};
	transition: background-color 0.5s;
	${props => !props.portrait && `width: 100%;`}
	padding: ${props => (props.padding ? props.padding : "15")}px
		${props => (props.portrait ? props.padding / 2 : 0)}px; /*15*/
	margin-bottom: ${props => (props.margin ? props.margin : "10")}px; /*10*/
	box-shadow: 0 8px 20px rgba(0, 0, 0, 0.50);
`;

const Title = styled.div`
  width: 100%;
  text-align: center;
  color: white;
  line-height: 1.05;
  font-weight: 800;
`;

const Value = styled.div`
  width: 100%;
  text-align: center;
  color: white;
  line-height: 1.05;
  font-weight: 800;
`;

const StatusRow = ({
	title,
	value,
	padding,
	margin,
	borderSize,
	portrait,
	backgroundColor
}) => (
	<Container
		portrait={portrait}
		padding={padding}
		margin={margin}
		borderSize={borderSize}
		backgroundColor={backgroundColor}
	>
		<Title>{title}</Title>
		<Value>{value}</Value>
	</Container>
);

export default StatusRow;
