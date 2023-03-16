const express = require('express');
const ical = require('ical-generator');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/generate', (req, res) => {
  const formData = req.body;
  const calendar = ical({name: 'my first iCal'});
  const startTime = new Date(formData.start);
  const endTime = new Date(formData.end);
  const summary = formData.summary;
  const description = formData.description;
  const location = formData.location;
  const url = formData.url;

  calendar.createEvent({
    start: startTime,
    end: endTime,
    summary: summary,
    description: description,
    location: location,
    url: url
  });

  res.set('Content-Type', 'text/calendar');
  res.send(calendar.toString());
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
