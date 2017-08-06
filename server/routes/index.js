
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
    person.age = req.body.age;

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
};
