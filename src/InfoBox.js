import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import './InfoBox.css'
export default function InfoBox({info}) {
    const INIT_URL = "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=500&q=60";
  return (
    <div className="Info-Box">
        <div className="cardContainer">
        <Card sx={{  width: '100%', maxWidth: 400  }}>
      <CardMedia
        sx={{ height: 140 }}
        image={INIT_URL}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {info.city}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary'}} component={"span"}>
         <div>Temparature={info.temperature} &deg;C</div>
         <p>Wind Speed: {info.windspeed} km/h</p>
         <p>Weather Code: {info.weatherCode}</p>
         <p>Time: {info.time}</p>
        </Typography>
      </CardContent>
    </Card>
    </div>
    </div>
  )
}
