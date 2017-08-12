const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: String,
});

// 첫번째 인자 person 은 collection의 단수적 표현
// 즉 이 모델에서는 people collection 을 사용하게 됨.
module.exports = mongoose.model('person', personSchema);
