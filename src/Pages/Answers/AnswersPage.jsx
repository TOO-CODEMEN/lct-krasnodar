import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { answersData } from '../../data/answers';

import styles from './Answers.module.scss'

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    marginTop: 20,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor: '#F1367D',
    color: 'white',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper': {
        color: 'white'
    },
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export const AnswersPage = () => {
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    function createMarkup(stroke) { 
        return {__html: stroke}; 
    }

    return (
        <div className={styles.answers}>
            <div className={styles.answers__title}>
                Наиболее частые вопросы
            </div>
            {answersData.map((elem, key) => (
                <Accordion expanded={expanded === `panel${elem.id}`} onChange={handleChange(`panel${elem.id}`)} key={key}>
                    <AccordionSummary aria-controls={`panel${elem.id}-content`} id={`panel${elem.id}-header`}>
                        <Typography>{key+1}. {elem.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <div dangerouslySetInnerHTML={createMarkup(elem.desc)}></div>
                        </Typography>
                    </AccordionDetails>
                </Accordion>))}
        </div>
    );
}