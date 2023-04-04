import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export interface DayCardProps {
    day: string;
  }
  
  export interface TextFieldChangeEvent {
    target: {
      value: string;
    };
  }

const DayCard: React.FC<DayCardProps> = ({ day }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [textFields, setTextFields] = useState(Array(3).fill(''));

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  const handleChange = (index: number, event: TextFieldChangeEvent) => {
    const updatedTextFields = [...textFields];
    updatedTextFields[index] = event.target.value;
    setTextFields(updatedTextFields);
  };

  return (
    <Card
      onClick={handleFlip}
      sx={{
        width: '150px',
        height: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
        transition: 'transform 0.6s',
      }}
    >
      {isFlipped ? (
        <Stack spacing={2}>
          {textFields.map((text, index) => (
            <TextField
              key={index}
              value={text}
              onChange={(event) => handleChange(index, event)}
            />
          ))}
        </Stack>
      ) : (
        <CardActionArea>
          <CardContent>
            <Typography align="center" variant="h6">
              {day}
            </Typography>
          </CardContent>
        </CardActionArea>
      )}
    </Card>
  );
};

const DayDecider = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '16px',
      }}
    >
      {daysOfWeek.map((day, index) => (
        <DayCard key={index} day={day} />
      ))}
    </div>
  );
};

export default DayDecider;
