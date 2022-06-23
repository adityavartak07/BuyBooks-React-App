import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
    
  },
  cardsmall: {
    backgroundColor:'#c8d8e4',
    margin: '15px',
    padding: '7px',
    borderRadius: '5px',
    position: 'relative',
    color:'#2b6777'
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: 0,
    padding: 0,
  },
  title: {
    padding: '2px 16px 0px 15px',
    color:'#2b6777'
  },
  titleedit:{
    padding: '6px 16px 0px 0px',
    color:'#2b6777'
  },
  cardActions: {
    padding: '0 16px 4px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardAction: {
    display: 'block',
    textAlign: 'initial',
  },
});
