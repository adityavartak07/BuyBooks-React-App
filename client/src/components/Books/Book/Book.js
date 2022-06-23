import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase, Chip } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import InfoIcon from '@material-ui/icons/Info';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import { getBook, likeBook, deleteBook } from '../../../actions/books';
import useStyles from './styles';

const Book = ({ book, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  const Likes = () => {
    if (book?.likes?.length > 0) {
      return book.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{book.likes.length > 2 ? `You and ${book.likes.length - 1} others` : `${book.likes.length} like${book.likes.length > 1 ? 's' : ''}`}</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{book.likes.length} {book.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  const openBook = (e) => {
    // dispatch(getBook(book._id, history));

    history.push(`/books/${book._id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openBook}
      >
        <CardMedia className={classes.media} image={book.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={book.title} />
        <div className={classes.overlay}>
          <Typography variant="h6">{book.name}</Typography>
          <Typography variant="body2">{moment(book.createdAt).fromNow()}</Typography>
        </div>
        {(user?.result?.googleId === book?.creator || user?.result?._id === book?.creator) && (
          <div className={classes.overlay2} name="edit">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(book._id);
              }}
              style={{ color: 'white' }}
              size="small"
            >
              <MoreHorizIcon fontSize="default" />
            </Button>
          </div>
        )}
        <Card className={classes.cardsmall} raised elevation={3}>
          <Typography variant="body2" color="textSecondary" component="h2">{`College: ${book.college}`}</Typography>
        </Card>
        <Card className={classes.cardsmall} raised elevation={3}>
          <Typography variant="body2" color="textSecondary" component="h2">{`Year: ${book.year}`}</Typography>
        </Card>
        <Card className={classes.cardsmall} raised elevation={3}>
          <Typography variant="body2" color="textSecondary" component="h2">{`Branch: ${book.branch}`}</Typography>
        </Card>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{`₹${book.title} /-`}</Typography>
        <CardContent>
          <Typography className={classes.titleedit} variant="body2" color="textSecondary" component="p">{book.tags.map((tag) => <Chip  style={{ margin: '3px 3px 2px 3px' ,color:'#2b6777'}} label={tag} size="small" variant="outlined" />)}</Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size="small" style={{ color: '#52ab98' }} disabled={!user?.result} onClick={() => dispatch(likeBook(book._id))}>
          <Likes />
        </Button>
        {(user?.result?.googleId === book?.creator || user?.result?._id === book?.creator) && (
          <Button size="small" style={{ color: '#52ab98' }} onClick={() => dispatch(deleteBook(book._id))}>
            <DeleteIcon fontSize="small" /> &nbsp; <Typography>Delete</Typography>
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Book;
