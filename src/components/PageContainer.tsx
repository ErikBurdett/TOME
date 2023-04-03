// PageContainer.tsx
import { FC } from 'react';
import { Box, Grid } from '@mui/material';
import tomeBackground from '../assets/TomeBackgroundParty.png';

interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer: FC<PageContainerProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto',
        height: '100vh',
        width: '100%', // Add this to take full width
        backgroundSize: 'cover',
        backgroundImage: `url(${tomeBackground})`,
      }}
    >
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={8} lg={6}>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};

export default PageContainer;
