const getRandomColor = () => {
  const colors = [
    '#495057',
    '#f03e3e',
    '#d6336c',
    '#ae3ec9',
    '#7048e8',
    '#4263eb',
    '#1c7cd6',
    '#1098ad',
    '#0ca678',
    '#37b24d',
    '#74b816',
    '#f59f00',
    '#f76707',
  ];
  const random = Math.floor(Math.random() * 13);
  return colors[random];
};

module.exports = (app, Person) => {
  // GET ALL PERSONS
  app.get('/api/persons', (req, res) => {
    Person.find((err, persons) => {
      if (err) return res.status(500).send({ error: 'database fail' });
      res.json(persons);
    });
  });

  // CREATE PERSON
  app.post('/api/persons', (req, res) => {
    const person = new Person();
    person.name = req.body.name;
    person.color = getRandomColor();

    Person.find({name: req.body.name}, (err, docs) => {
      if (docs.length) {
        res.send('Exiting data')
      } else {
        console.log('person ', person)
        person.save((err) => {
          if (err) {
            console.error(err);
            res.json({ message: 'fail' });
          }
          res.json({ message: 'success' });
        });
      }
    })

  });

  // DELETE ONE PERSON
  app.delete('/api/persons', (req, res) => {
    Person.remove({ name: req.body.name }, (err, result) => {
      if (err) {
        return res.json({ error: 'Delete db failure' });
      }
      res.json({ message: 'person deleted' });
    });
  });

  // DELETE ALL PEOPLE
  app.delete('/api/people', (req, res) => {
    Person.remove({}, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Delete All data fail' });
      }
      res.json({ message: 'people deleted' });
    });
  });
};
