import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import ListItem from '@material-ui/core/ListItem';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles(theme => ({
  root: {
    maxHeight: '100%',
    overflowY: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
  card: {
    display: 'flex',
    width: '100%',
    height: '120px'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    padding: '10px',
  },
  cover: {
    width: '100px',
    flexShrink: 0,
    padding: 6,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  title: {
    lineHeight: 1,
  },
  rating: {
    marginTop: '8px',
    display: 'inline-flex'
  },
  ratingText: {
    fontSize: '12px',
    marginLeft: '6px',
  },
  address: {
    fontSize: '13px',
    margin: '4px 0px'
  }
}));

export default function Restaurants({restaurants, onClick, onMouseEnter, onMouseLeave}) {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  if (!restaurants) return null;

  restaurants = restaurants.map((restaurant, i) => {
    const {id, name, photos, rating, user_ratings_total, icon, vicinity} = restaurant;
    const avatar = (photos && photos[0] && photos[0].getUrl && photos[0].getUrl()) || icon;

    return (
      <ListItem
        key={id}
        alignItems="flex-start"
        onClick={() => {
          setSelectedIndex(i);
          onClick(i);
        }}
        onMouseEnter={() => onMouseEnter(i)}
        onMouseLeave={() => onMouseLeave(i)}
        selected={selectedIndex === i}
      >
        <Card className={classes.card}>
          <CardMedia
            className={classes.cover}
            component='img'
            title={name}
            image={avatar}
          />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h6" variant="h6" className={classes.title}>
                {name}
              </Typography>
              {rating && (
                <div className={classes.rating}>
                  <Rating
                    name="rating"
                    value={rating}
                    precision={0.1}
                    readOnly
                    title={rating.toFixed(1)}
                    size='small'
                  />
                  <Typography
                    className={classes.ratingText}
                    variant="subtitle2"
                    color="textSecondary"
                  >
                    {rating.toFixed(1)} ({user_ratings_total})
                </Typography>
                </div>
              )}
              {vicinity && (
                <Typography
                  className={classes.address}
                  variant="body2"
                >
                  {vicinity}
                </Typography>
              )}
            </CardContent>
          </div>
        </Card>
      </ListItem>
    )
  });

  return (
    <List className={classes.root}>
      {restaurants}
    </List>
  )
}