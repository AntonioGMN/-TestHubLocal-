import { useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
//import RestoreIcon from "@mui/icons-material/Restore";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import BusinessIcon from "@mui/icons-material/Business";
import BusinessIcon from "@mui/icons-material/Business";

export default function Header() {
	const [value, setValue] = useState(0);

	return (
		<Box sx={{ width: "100vw", alignSelf: "flex-start" }}>
			<BottomNavigation
				showLabels
				value={value}
				onChange={(event, newValue) => {
					setValue(newValue);
				}}
			>
				<BottomNavigationAction label="Empresas" icon={<BusinessIcon />} />
				<BottomNavigationAction label="Empresas" icon={<BusinessIcon />} />
				<BottomNavigationAction label="Empresas" icon={<BusinessIcon />} />
			</BottomNavigation>
		</Box>
	);
}
