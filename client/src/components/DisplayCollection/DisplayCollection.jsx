import React from "react";
import Collectible from "../Collectible/Collectible";

const DisplayCollection = () => {
	return (
		<div>
			<h1 className="font-semibold text-white text-left text-[18px]">
				All Collection &#40;3&#41;
			</h1>

			<div className="flex flex-wrap mt-[20px] gap-[26px]">
				<Collectible
					name={"The Yellow King"}
					description={"Speedy boi"}
					attack={1}
					mana={1}
					defense={1}
				/>
				<Collectible
					name={"The purple King"}
					description={"Heals"}
					attack={3}
					mana={5}
					defense={2}
				/>
				<Collectible
					name={"The orange King"}
					description={"Deals 4 damage to the enemy hero"}
					attack={10}
					mana={10}
					defense={1}
				/>
			</div>
		</div>
	);
};

export default DisplayCollection;
