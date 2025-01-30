import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function InstrumentCard({name, description, icon, onClick}) {

    return (
        <Card sx={{maxWidth: 345}} onClick={onClick}>
            <CardActionArea>
                <CardContent>
                    {icon || null}
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" sx={{color: 'text.secondary'}}>
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}