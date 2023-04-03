import { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemAvatar, ListItemText, IconButton, Grid, Button } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from 'axios';

interface Combatant {
  index: string;
  name: string;
  size: string;
  type: string;
  alignment: string;
}

interface Artwork {
  thumbnail: {
    url: string;
  };
}

interface CombatTrackerProps {
  component?: React.ElementType;
}

const CombatTracker = ({ component = 'div' }: CombatTrackerProps) => {
  const [combatants, setCombatants] = useState<Combatant[]>([]);
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchCombatants = async () => {
      try {
        const { data: { results } } = await axios.get('https://www.dnd5eapi.co/api/monsters');
        const indexedCombatants = await Promise.all(results.map(async (result: Combatant) => {
          const { data } = await axios.get(`https://www.dnd5eapi.co/api/monsters/${result.index}`);
          return data;
        }));
        setCombatants(indexedCombatants);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCombatants();
  }, []);

  useEffect(() => {
    const fetchArt = async () => {
      const urls: { [key: string]: string } = {};
      for (const combatant of combatants) {
        try {
          const { data: { data } } = await axios.get(`https://api.artic.edu/api/v1/artworks/search?q=${combatant.index} dnd`);
          const artwork = data[0];
          const imageUrl = artwork ? artwork.thumbnail.url : '';
          urls[combatant.index] = imageUrl;
        } catch (error) {
          console.error(error);
          urls[combatant.index] = '';
        }
      }
      setImageUrls(urls);
    };
    if (combatants.length > 0) {
      fetchArt();
    }
  }, [combatants]);

  const handleDeleteCombatant = (name: string) => {
    const newCombatants = combatants.filter(combatant => combatant.name !== name);
    setCombatants(newCombatants);
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < combatants.length - 1 ? prevIndex + 1 : prevIndex));
  };

  return (
    <Box component={component} width="100%">
      <Typography variant="h4" component="h1" gutterBottom>
        Combat Tracker
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button onClick={handlePrevious} disabled={currentIndex === 0}>
          <ArrowBackIosIcon />
        </Button>
        <List sx={{ overflowX: 'hidden', overflowY: 'auto', display: 'flex', flexDirection: 'row', width: '100%', '&::-webkit-scrollbar': { display: 'none' } }}>
          {combatants.map((combatant, index) => (
            <Box key={`combatant-${combatant.index}`} sx={{ display: index === currentIndex ? 'block' : 'none' }}>
              <ListItem>
                <Grid container alignItems="center">
                  <Grid item xs={10}>
                    <ListItemText primary={combatant.name} secondary={`${combatant.size} ${combatant.type}, ${combatant.alignment}`} />
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton onClick={() => handleDeleteCombatant(combatant.name)}>
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs={12}>
                    <ListItemAvatar>
                      <img src={imageUrls[combatant.index]} alt={combatant.name} />
                    </ListItemAvatar>
                  </Grid>
                </Grid>
              </ListItem>
            </Box>
          ))}
        </List>
        <Button onClick={handleNext} disabled={currentIndex === combatants.length - 1}>
          <ArrowForwardIosIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default CombatTracker;
