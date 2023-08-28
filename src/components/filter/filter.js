import { Button, Grid } from "@mui/material";
import * as React from "react";
import { styled } from "@mui/material";
import Paper from "@mui/material/Paper";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

function Filter(props) {
  const navigate = useNavigate();
  const [endDate, setendDate] = React.useState("");
  const [startDate, setstartDate] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  function handleClick() {
    if (category && startDate && endDate) {
      console.log(startDate, endDate, category);
      navigate(
        `/blogs?category=${category}&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
      );
      return;
    }
    if(startDate && endDate){
      console.log(startDate, endDate);
      navigate(`/blogs?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`)
      return;
    }
    navigate(`/blogs?category=${category}`);
  }

  const filterEligibility = () => {
    // console.log(category,endDate,startDate);
    // console.log(category || (endDate && startDate));
    // console.log()
    // if(category ||(endDate & startDate)){
    //     console.log("inside");
    // }
    return !(category | (endDate & startDate));
  };

  const clearFiltersHandler = () => {
    setCategory("");
    setstartDate("");
    setendDate("");
    navigate("/blogs");
  };

  React.useEffect(() => {
    filterEligibility();
  }, [filterEligibility, category, endDate, startDate]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    // <Container maxWidth="md"></Container>
    <Grid
      container
      spacing={2}
      sx={{
        marginBottom: "30px",
      }}
    >
      <Grid item xs={12} sm={6} md={6}>
        <Item>
          {/* {JSON.stringify(endDate)} */}
          {/* {new Date(endDate).toLocaleDateString('en-US', {year: "numeric", month: "2-digit", day: "numeric"})} */}
          {/* {endDate} */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{mr: 2}}
              value={startDate}
              label="From Date"
              onChange={(newValue) => setstartDate(newValue)}
            />
            {/* <span >
                                to
                            </span> */}
            <DatePicker
              value={endDate}
              label="To Date"
              onChange={(newValue) => setendDate(newValue)}
            />
          </LocalizationProvider>
        </Item>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Item>
          <FormControl fullWidth>
            {/* {category} */}
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Category"
              onChange={handleCategoryChange}
            >
              {/* {JSON.stringify(props.category)} */}
              {props.category.map((uniquecat) => (
                <MenuItem value={uniquecat}>{uniquecat}</MenuItem>
              ))}
              {/* <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem> */}
            </Select>
          </FormControl>
        </Item>
      </Grid>
      <Grid item xs={12} sm={6} md={3} sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
        {/* <Item> */}
          <Button
            sx={{mr: 2, backgroundColor: "#5F264A"}}
            onClick={handleClick}
            // loading={loading}
            // loadingPosition="start"
            startIcon={<SearchIcon />}
            variant="contained"
          >
            <span>Search</span>
          </Button>

          <Button
            sx={{backgroundColor: "#5F264A"}}
            variant="contained"
            onClick={clearFiltersHandler}
          >
            <span>Clear</span>
          </Button>
        {/* </Item> */}
      </Grid>
    </Grid>
  );
}

export default Filter;
