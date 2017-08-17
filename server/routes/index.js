
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

    Person.find({name: req.body.name}, (err, docs) => {
      if (docs.length) {
        res.send('Exiting data')
      } else {
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
