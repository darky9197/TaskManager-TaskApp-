import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Employeecard = (props) => {
  const { name, roles, userId } = props;
  return (
    <div className="relative flex flex-col items-center border border-gray-400 rounded p-4">
      <PersonOutlineIcon className="icon" />
      <h2 className="font-bold text-xl">{name.toUpperCase()}</h2>
      <h3 className="text-sm text-gray-700">{roles}</h3>
      <Link to={`${userId}`} className="w-full mt-2">
        <Button
          variant="contained"
          color="warning"
          sx={{ textTransform: "none", width: "100%" }}
        >
          manage
        </Button>
      </Link>
    </div>
  );
};

export default Employeecard;
