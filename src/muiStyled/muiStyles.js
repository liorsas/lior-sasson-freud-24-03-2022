import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    background:
      "linear-gradient(0deg, rgba(34,183,195,1) 0%, rgba(45,201,253,1) 34%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
    float: "right",
  },
  card: {
    background:
      "linear-gradient(0deg, rgba(60,183,195,1) 0%, rgba(45,248,253,1) 34%);",
    border: 0,
    borderRadius: 6,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    width: "150px",
    height: "150px",
    padding: "0 40px",
  },

  favCard: {
    background:
      "linear-gradient(0deg, rgba(60,183,195,1) 0%, rgba(45,248,253,1) 34%);",
    border: 0,
    borderRadius: 6,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    width: "250px",
    height: "250px",
    padding: "0 40px",
    margin: "5px",
  },
});
export { useStyles };
