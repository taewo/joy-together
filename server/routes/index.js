
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
    // console.log(123, req);
    const person = new Person();
    console.log('person', person)
    console.log(321, req.body);
    person.name = req.body.name;
    person.age = req.body.age;
    console.log(123, person.name, person.age);

    person.save((err) => {
      if (err) {
        console.error(err);
        res.json({ result: 0 });
        return;
      }
      res.json({ result: 1 });
    });
  });

  // DELETE PERSON
  app.delete('/api/persons/:person_name', (req, res) => {
    console.log(1, req.params);
    Person.remove({ name: req.params.person_name }, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Delete db failure' });
      }
      res.json({ message: 'person deleted' });
    });
  });

  // DELETE PEOPLE
  app.delete('/api/people', (req, res) => {
    console.log('delete in');
    Person.remove({}, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Delete All data fail' });
      }
      res.json({ message: 'people deleted' });
    });
  });
};
