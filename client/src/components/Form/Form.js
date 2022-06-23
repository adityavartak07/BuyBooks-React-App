import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Select, MenuItem, InputLabel, FormControl, Modal, Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { createBook, updateBook } from '../../actions/books';
import useStyles from './styles';


const Form = ({ currentId, setCurrentId }) => {
  const [filecheck, setfilecheck] = useState(false);
  const [errorvalue, setErrorvalue] = useState({ price: false, number: false, year: false, college: false, branch: false });
  const [bookData, setBookData] = useState({ title: '', number: '', college: '', year: '', branch: '', tags: [], selectedFile: '' });
  const book = useSelector((state) => (currentId ? state.books.books.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();
  const options = ['CS', 'IT', 'Extc', 'Civil', 'Textile', 'Production', 'Mechanical', 'Electronics'];
  const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const years = [];
  let year = 1;
  for (let i = 0; i < 4; i++) {
    years[i] = year;
    year++;
  }

  const clear = () => {
    setCurrentId(0);
    setBookData({ title: '', number: '', college: '', year: '', branch: '', tags: [], selectedFile: '' });
  };

  let pricecheck = () => {
    if (bookData.title == "" || bookData.title.search("e") != -1) {
      errorvalue.price = true;
    } else {
      errorvalue.price = false;
    }
  }



  let numbercheck = () => {
    if (bookData.number == "" || bookData.number.search("e") != -1) {
      errorvalue.number = true;
    } else {
      errorvalue.number = false;
    }
  }

  useEffect(() => {
    if (!book?.title) clear();
    if (book) setBookData(book);
  }, [book]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(errorvalue)

    pricecheck();
    numbercheck();




    let branchname = bookData.branch;
    let collegename = bookData.college;

    if (branchname == "") {
      errorvalue.branch = true;
    } else {
      errorvalue.branch = false;
    }

    if (collegename == "") {
      errorvalue.college = true;
    } else {
      errorvalue.college = false;
    }




    if (filecheck && !errorvalue.price && !errorvalue.number && !errorvalue.year && !errorvalue.branch && !errorvalue.college) {
      if (currentId === 0) {

        dispatch(createBook({ ...bookData, name: user?.result?.name, email: user?.result?.email }, history));
        clear();

      } else {


        dispatch(updateBook(currentId, { ...bookData, name: user?.result?.name, email: user?.result?.email }));
        clear();

      }
    }




  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In to post your Book.
        </Typography>
      </Paper>
    );
  }


  const handleAddChip = (tag) => {
    setBookData({ ...bookData, tags: [...bookData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setBookData({ ...bookData, tags: bookData.tags.filter((tag) => tag !== chipToDelete) });
  };

  return (

    <Paper className={classes.paper} elevation={6}>


      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${book?.title}"` : 'Creating a Book'}</Typography>
        <TextField name="college" variant="outlined" label="College" fullWidth value={bookData.college} onChange={(e) => setBookData({ ...bookData, college: e.target.value })} />
        <FormControl style={{ width: '94%' }}>
          <InputLabel style={{ marginLeft: '10px' }} id="demo-controlled-open-select-label">Branch</InputLabel>
          <Select required labelId="demo-controlled-open-select-label" options={options} name="branch" variant="outlined" label="Branch" fullWidth value={bookData.branch} onChange={(e) => {
            setBookData({ ...bookData, branch: e.target.value })
          }}>{
              options.map((option) => <MenuItem value={option}>{option}</MenuItem>)
            }</Select>
        </FormControl>

        <FormControl style={{ width: '94%' }}>
          <InputLabel style={{ marginLeft: '10px' }} id="demo-controlled-open-select-label">Year</InputLabel>
          <Select required labelId="demo-controlled-open-select-label" options={options} name="year" variant="outlined" label="Yeaer" fullWidth value={bookData.year} onChange={(e) => {
            setBookData({ ...bookData, year: e.target.value })
          }}>{
              years.map((yearn) => <MenuItem value={yearn}>{yearn}</MenuItem>)
            }</Select>
        </FormControl>
        <>

          {bookData.title.search("e") != -1 ?
            <TextField required error type="number" name="title" variant="outlined" label="Enter a valid number" fullWidth value={bookData.title} onChange={(e) => {

              setBookData({ ...bookData, title: e.target.value })





            }} /> :

            <TextField required type="number" name="title" variant="outlined" label="Price" fullWidth value={bookData.title} onChange={(e) => {

              setBookData({ ...bookData, title: e.target.value })




            }} />


          }

          {bookData.number.search("e") != -1 ?
            <TextField required error type="number" name="number" variant="outlined" label="Enter a valid number" fullWidth value={bookData.number} onChange={(e) => {

              setBookData({ ...bookData, number: e.target.value })
              numbercheck()
            }

            } />

            :

            <TextField required type="number" name="number" variant="outlined" label="Number" fullWidth value={bookData.number} onChange={(e) => {


              setBookData({ ...bookData, number: e.target.value })
              numbercheck()
            }



            } />

          }



        </>




        <div style={{ padding: '5px 0', width: '94%' }}>
          <ChipInput

            name="tags"
            variant="outlined"
            label="Enter Your Books"
            fullWidth
            value={bookData.tags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
        </div>

        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => {
          let i = base64.search("base64")
          console.log((base64), i);
          var x = (base64.slice(0, i - 1));
          if (x.search("jpg") != -1) {
            setfilecheck(false);
            setBookData({ ...bookData, selectedFile: base64 })
          }
          else {

            setfilecheck(true);
            console.log("given file is not jpeg")
          }

        }} /></div>
        
        <Button className={classes.buttonSubmit} variant="contained" style={{backgroundColor:'#52ab98'}} size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" style={{backgroundColor:'#52ab98'}} size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
