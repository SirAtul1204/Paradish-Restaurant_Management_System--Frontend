import { Grid, Link, Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { TRole } from "../pages/dashboard";
import { FC } from "react";

interface NavProps {
  role: TRole;
}

interface INavItem {
  name: string;
  route: string;
  canBeAccessedBy: TRole[];
}

const Nav: FC<NavProps> = ({ role }) => {
  const router = useRouter();

  const NavItems: INavItem[] = [
    {
      name: "Add Employees",
      route: "/addEmployees",

      canBeAccessedBy: ["OWNER"],
    },
    {
      name: "Take Order",
      route: "/takeOrder",

      canBeAccessedBy: ["OWNER", "WAITER"],
    },
  ];

  return (
    <Box sx={{ bgcolor: "primary.main", color: "secondary.main" }}>
      <Grid
        container
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{
          "& div:first-child": {
            borderLeft: "1px solid #DADBBD",
            borderRight: "1px solid #DADBBD",
          },
          "& div:not(:first-child)": {
            borderRight: "1px solid #DADBBD",
          },
        }}
      >
        {NavItems.map((item) => {
          return item.canBeAccessedBy.includes(role) ? (
            <Grid
              item
              key={item.name}
              onClick={async () => {
                await router.push(item.route);
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  p: 2,
                  color: "secondary.main",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "secondary.main",
                    color: "primary.main",
                    cursor: "pointer",
                  },
                }}
                className={
                  router.asPath === item.route ? "nav_link--active" : ""
                }
              >
                {item.name}
              </Typography>
            </Grid>
          ) : (
            <></>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Nav;
