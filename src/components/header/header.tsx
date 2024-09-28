import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="static" sx={{ mb: 3 , borderRadius: 2, bgcolor: "Menu", color: "GrayText"}}>
      <Toolbar>
        <IconButton sx={{ mr: 3 }}>
          <Link
            to={"/products"}
            aria-label="Перейти к странице продуктов"
            className="link"
          >
            <HomeIcon fontSize="large"></HomeIcon>
          </Link>
        </IconButton>
        <Typography variant="h4" component="span">
          React Album
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
