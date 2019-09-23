import React from "react";
import axios from "axios";

const AddJoke = props => {
	const [addJoke, setAddJoke] = useState({});
	const [setupValue, setSetupValue] = useState("");
	const [punchlineValue, setPunchlineValue] = useState("");

	const handleChange = effect => {
		setAddJoke({
			...addJoke,
			[effect.target.name]: effect.target.value
		});
		if (effect.target.name === "setup") {
			setSetupValue(effect.target.value);
		}
		if (effect.target.name === "punchline") {
			setPunchlineValue(effect.target.value);
		}
	};

	const SubmitJoke = effect => {
		effect.preventDefault();
		axios.post("").then().catch;
	};

	return;
	<div>
		<form onSubmit={SubmitJoke}>
			<input
				type="text"
				name="setup"
				placeholder="Setup"
				value={punchlineValue}
				onChange={handleChange}
			/>
			<input
				type="text"
				name="punchline"
				placeholder="Punchline"
				value={setupValue}
				onChange={handleChange}
			/>
			<input
				type="checkbox"
				name="public"
				checked={addJoke.public}
				onChange={handleChange}
			/>
			<input
				type="checkbox"
				name="private"
				checked={addJoke.private}
				onChange={handleChange}
			/>
			<button type="submit">Save</button>
		</form>
	</div>;
};

export default AddJoke;
