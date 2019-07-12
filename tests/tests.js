import chaiHttp from 'chai-http';
import { describe } from 'mocha';
import itParam from 'mocha-param';
import fs from 'fs';
import app from '../app';
import Question from '../models/Question';
import User from '../models/User';

import chai from 'chai';

chai.use(chaiHttp);
const expect = chai.expect;

let testDataFilePath = './resources/test-cases.csv';

const testCases = () => {
  let testCases = [];

  let csv = fs.readFileSync(testDataFilePath, { encoding: 'utf8' });
  let lines = csv.split('\r\n');

  let headers = lines.shift().split(',');
  for (let i = 1; i < headers.length; i++) {
    testCases.push({ testName: headers[i], answers: [], result: '' })
  }

  let results = lines.pop().split(',');
  for (let i = 1; i < results.length; i++) {
    testCases[i - 1].result = results[i];
  }

  for (const line of lines) {
    let values = line.split(',');
    for (let i = 1; i < values.length; i++) {
      testCases[i - 1].answers.push(values[i]);
    }
  }

  return testCases;
};

describe('Index', () => {
  describe('GET /', () => {
    it('should get all registered endpoints', (done) => {
      chai.request(app)
          .get('/')
          .end((error, response) => {
            expect(response).to.be.json;
            expect(response).to.have.status(200);
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.ownProperty('registered_paths');
            expect(response.body.registered_paths).to.be.an('array').that.is.not.empty;
            done();
          });
    });
  });
});

describe('Question', () => {
  describe('GET /questions', () => {
    it('should get all test questions', (done) => {
      chai.request(app)
          .get('/questions')
          .end((error, response) => {
            expect(response).to.be.json;
            expect(response).to.have.status(200);
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.ownProperty('questions');
            expect(response.body.questions).to.be.an('array').that.has.lengthOf(10);
            done();
          });
    });
  });
});

describe('User', () => {
  describe('GET /users', () => {
    it('should get all registered users', (done) => {
      chai.request(app)
          .get('/users')
          .end((error, response) => {
            expect(response).to.be.json;
            expect(response).to.have.status(200);
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.ownProperty('users');
            expect(response.body.users).to.be.an('array');
            done();
          });
    });
  });

  describe('POST /users', () => {
    itParam('should create ${value.testName} and return ${value.result}', testCases(),
        (done, test) => {
          Question.findAll().then(questions => questions.map(q => q.id))
              .catch(() => new Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
              .then(indices => {
                let answers = indices.map(
                    i => ({ questionId: i, answer: parseInt(test.answers[i - 1]) }));
                let email = `${test.result.toLowerCase()}@gmail.com`;

                chai.request(app)
                    .post('/users')
                    .set('Content-Type', 'application/json')
                    .send(JSON.stringify({ answers, email }))
                    .end((error, response) => {
                      expect(response).to.be.json;
                      expect(response).to.have.status(200);
                      expect(response.body).to.be.an('object');
                      expect(response.body).to.have.property('type', test.result);
                      done();
                    });

              });
        });

    itParam('should detect an invalid email address and fail',
        ['plainaddress', '#@%^%#$@#$@#.com', '@example.com', 'email.example.com'],
        (done, email) => {
          let answers = new Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
              .map(i => ({ questionId: i, answer: parseInt(testCases()[0].answers[i - 1]) }));

          chai.request(app)
              .post('/users')
              .set('Content-Type', 'application/json')
              .send(JSON.stringify({ answers, email }))
              .end((error, response) => {
                expect(response).to.be.json;
                expect(response).to.have.status(500);
                expect(response.body).to.be.an('object');
                expect(response).to.have.property('error').that.is.ok;
                done();
              });
        });
  });
});