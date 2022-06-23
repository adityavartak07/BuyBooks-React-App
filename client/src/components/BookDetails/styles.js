import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    // objectFit: 'cover',
    
    // minWidth: '10vw',
    alignItems:'center',
    maxHeight:'300px',
    maxWidth: '70vw',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '80vw',
      maxHeight:'35vw',
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: '75vw',
      maxHeight:'200px',
    },
  },
  nomedia:{
    height: '200px',
    display: 'flex',
    position: 'flex-center',
    minWidth: '50vw',
    maxHeight: '500px',
    borderRadius: "20px",
    backgroundColor: "#696969",
    justifyContent: 'center',
    alignItems: 'center'
    
  },
  card: {
    display: 'flex',
    
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  cardsmall: {
    
    // margin: '10px',
    maxWidth:'73vw',
    margin: '15px 15px 15px 0px',
    padding: '7px',
    borderRadius: '5px',
    position: 'relative',
    backgroundColor:'#2b6777',
    color:'#ffffff'
  },
  section: {
    display:'flex',
    flexDirection:'column',
    borderRadius: '20px',
    margin: '15px 15px 15px 0px',
    flex: 1,
  },
  imageSection: {
   
    marginRight: '50px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  recommendedPosts: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  loadingPaper: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '39vh',
  },
}));
