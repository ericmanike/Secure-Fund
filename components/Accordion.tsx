import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

export default function AccordionUsage() {
  return (
    <div className='w-full'>
      <Accordion  sx={{backgroundColor:'#010463',
        color:'white'
      }} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon  sx={{color:'gold'}}/>}
          aria-controls="panel1-content"
          id="panel1-header"
         
        >
          <Typography component="span">how to apply</Typography>
        </AccordionSummary>
        <AccordionDetails>
     Apply online with your ghana card and details
        </AccordionDetails>
      </Accordion>
      <Accordion  sx={{backgroundColor:'#010463',
        color:'white'
      }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon  sx={{color:'gold'}}/>}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">after application the next step</Typography>
        </AccordionSummary>
        <AccordionDetails>
         After your application is being submitted it is reviewed by our decated team
        </AccordionDetails>
      </Accordion>
      <Accordion  sx={{backgroundColor:'#010463',
        color:'white'
      }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon  sx={{color:'gold'}}/>}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Typography component="span">What are the penelties in delay  payment</Typography>
        </AccordionSummary>
        <AccordionDetails>
          Any who refuse to payback before the due date will face an additional 5% interest rate of increase
        </AccordionDetails>
       
      </Accordion>
    </div>
  );
}
