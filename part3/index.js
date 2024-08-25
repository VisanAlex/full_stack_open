require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectToDatabase = require('./mongo'); // MongoDB connection
const Person = require('./models/person'); // Mongoose model

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

connectToDatabase(); // Connect to MongoDB

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

// Get all persons
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons);
  });
});

// Get a single person by ID
app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch(error => {
      console.log(error);
      response.status(400).send({ error: 'malformatted id' });
    });
});

// Delete a person
app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch(error => {
      console.log(error);
      response.status(400).send({ error: 'malformatted id' });
    });
});

// Add a new person
app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'Name or number missing' });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then(savedPerson => {
    response.json(savedPerson);
  });
});

app.get('/info', (request, response) => {
  Person.countDocuments({}).then(count => {
    response.send(`<p>Phonebook has info for ${count} people</p><p>${new Date()}</p>`);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
