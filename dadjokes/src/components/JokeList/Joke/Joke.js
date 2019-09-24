import React from "react";

const AddJoke = props => {
	return (
		<div>
			<p>{props.id}</p>
			<p>{props.setup}</p>
			<p>{props.punchline}</p>
		</div>
	);
};

export default AddJoke;
